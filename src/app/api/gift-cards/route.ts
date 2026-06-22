import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { recordCoinTx } from "@/lib/ledger";

// Durable cashout limits (DB-based, reliable on serverless — unlike the
// in-memory limiter, which doesn't survive cold starts or span instances).
const MAX_CASHOUTS_PER_DAY = 3;

export async function POST() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const sql = getDb();
    const userId = Number(session.userId);

    // 1 redemption per minute per user
    const [recent] = await sql`
      SELECT COUNT(*)::int AS n FROM gift_cards
      WHERE redeemed_by = ${userId} AND redeemed_at > NOW() - INTERVAL '60 seconds'
    `;
    if (recent.n > 0) {
      return NextResponse.json({ error: "Please wait before trying again." }, { status: 429 });
    }

    // Daily cashout cap per user
    const [today] = await sql`
      SELECT COUNT(*)::int AS n FROM gift_cards
      WHERE redeemed_by = ${userId} AND redeemed_at > NOW() - INTERVAL '24 hours'
    `;
    if (today.n >= MAX_CASHOUTS_PER_DAY) {
      return NextResponse.json(
        { error: "You've reached the daily cashout limit. Try again tomorrow!" },
        { status: 429 },
      );
    }

    // Block if another account sharing this visitor's ad click ID has already
    // cashed out — stops one person cashing out across many accounts. A
    // gclid/fbclid/ttclid is unique per ad click and persists in localStorage,
    // so a shared value means the same browser/device.
    const [me] = await sql`SELECT acquisition_source FROM users WHERE id = ${userId}`;
    const acq = me?.acquisition_source && typeof me.acquisition_source === "object" ? me.acquisition_source : {};
    const gclid = typeof acq.gclid === "string" ? acq.gclid : null;
    const fbclid = typeof acq.fbclid === "string" ? acq.fbclid : null;
    const ttclid = typeof acq.ttclid === "string" ? acq.ttclid : null;
    if (gclid || fbclid || ttclid) {
      const dup = await sql`
        SELECT 1 FROM gift_cards gc
        JOIN users other ON other.id = gc.redeemed_by
        WHERE gc.redeemed_by IS NOT NULL
          AND other.id <> ${userId}
          AND (
            (${gclid}::text IS NOT NULL AND other.acquisition_source->>'gclid' = ${gclid})
            OR (${fbclid}::text IS NOT NULL AND other.acquisition_source->>'fbclid' = ${fbclid})
            OR (${ttclid}::text IS NOT NULL AND other.acquisition_source->>'ttclid' = ${ttclid})
          )
        LIMIT 1
      `;
      if (dup.length > 0) {
        console.warn(`Cashout blocked (shared click id): user ${userId}`);
        return NextResponse.json(
          { error: "This reward has already been claimed. Cashouts are limited to one account per player." },
          { status: 403 },
        );
      }
    }

    // Atomic: deduct coins only if user has >= 200
    const deductResult = await sql`
      UPDATE users SET coins = coins - 200
      WHERE id = ${session.userId} AND coins >= 200
      RETURNING id
    `;

    if (deductResult.length === 0) {
      return NextResponse.json({ error: "Not enough coins" }, { status: 400 });
    }

    // Claim an unredeemed gift card
    const cardResult = await sql`
      UPDATE gift_cards
      SET redeemed_by = ${Number(session.userId)}, redeemed_at = NOW()
      WHERE id = (
        SELECT id FROM gift_cards
        WHERE redeemed_by IS NULL
        LIMIT 1
        FOR UPDATE SKIP LOCKED
      )
      RETURNING code
    `;

    if (cardResult.length === 0) {
      // Refund coins — no cards available
      await sql`
        UPDATE users SET coins = coins + 200
        WHERE id = ${session.userId}
      `;
      return NextResponse.json(
        { error: "No gift cards available right now. Please try again later!" },
        { status: 404 }
      );
    }

    // Record the spend only once a card is actually dispensed (the deduct/refund
    // round-trip when no card is available nets zero, so it isn't logged).
    await recordCoinTx(Number(session.userId), -200, "cashout", cardResult[0].code);

    return NextResponse.json({ code: cardResult[0].code });
  } catch (error) {
    console.error("Cashout error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { recordCoinTx } from "@/lib/ledger";
import { rateLimit } from "@/lib/rate-limit";

export async function POST() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Rate limit: 1 redemption per minute per user
    const rl = rateLimit("cashout", session.userId, 1, 60000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Please wait before trying again." }, { status: 429 });
    }

    const sql = getDb();

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

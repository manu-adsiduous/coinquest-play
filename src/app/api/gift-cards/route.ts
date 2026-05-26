import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const sql = getDb();

    // Get user's current coins
    const userResult = await sql`
      SELECT coins FROM users WHERE id = ${session.userId}
    `;
    if (userResult.length === 0 || userResult[0].coins < 400) {
      return NextResponse.json({ error: "Not enough coins" }, { status: 400 });
    }

    // Find an unredeemed gift card
    const cardResult = await sql`
      SELECT id, code FROM gift_cards
      WHERE redeemed_by IS NULL
      LIMIT 1
      FOR UPDATE SKIP LOCKED
    `;

    if (cardResult.length === 0) {
      return NextResponse.json(
        { error: "No gift cards available right now. Please try again later!" },
        { status: 404 }
      );
    }

    const card = cardResult[0];

    // Redeem the card and deduct coins
    await sql`
      UPDATE gift_cards
      SET redeemed_by = ${session.userId}, redeemed_at = NOW()
      WHERE id = ${card.id}
    `;

    await sql`
      UPDATE users SET coins = coins - 400
      WHERE id = ${session.userId}
    `;

    return NextResponse.json({ code: card.code });
  } catch (error) {
    console.error("Cashout error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

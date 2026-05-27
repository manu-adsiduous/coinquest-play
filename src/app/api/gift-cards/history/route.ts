import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ cards: [] });
    }

    const sql = getDb();
    const result = await sql`
      SELECT code, amount, redeemed_at
      FROM gift_cards
      WHERE redeemed_by = ${session.userId}
      ORDER BY redeemed_at DESC
    `;

    return NextResponse.json({ cards: result });
  } catch (error) {
    console.error("Gift card history error:", error);
    return NextResponse.json({ cards: [] });
  }
}

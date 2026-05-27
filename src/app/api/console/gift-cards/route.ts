import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const sql = getDb();
    const cards = await sql`
      SELECT
        gc.id, gc.code, gc.amount, gc.created_at, gc.redeemed_at,
        u.email as redeemed_by_email, u.username as redeemed_by_username
      FROM gift_cards gc
      LEFT JOIN users u ON u.id = gc.redeemed_by
      ORDER BY gc.created_at DESC
    `;

    const available = cards.filter(c => !c.redeemed_at).length;
    const redeemed = cards.filter(c => c.redeemed_at).length;

    return NextResponse.json({ cards, available, redeemed });
  } catch (error) {
    console.error("Console gift cards error:", error);
    return NextResponse.json({ error: "Failed to fetch gift cards" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { codes } = await req.json();
    if (!codes || !Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json({ error: "Provide an array of codes" }, { status: 400 });
    }

    const sql = getDb();
    let added = 0;
    let skipped = 0;

    for (const code of codes) {
      const trimmed = code.trim();
      if (!trimmed) continue;
      try {
        await sql`INSERT INTO gift_cards (code) VALUES (${trimmed})`;
        added++;
      } catch {
        skipped++; // duplicate
      }
    }

    return NextResponse.json({ added, skipped });
  } catch (error) {
    console.error("Console add gift cards error:", error);
    return NextResponse.json({ error: "Failed to add gift cards" }, { status: 500 });
  }
}

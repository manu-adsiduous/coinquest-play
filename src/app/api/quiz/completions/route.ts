import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ completions: [] });
    }

    const sql = getDb();
    const result = await sql`
      SELECT quiz_id, score, coins_earned, coins_claimed FROM quiz_completions
      WHERE user_id = ${session.userId}
    `;

    return NextResponse.json({
      completions: result.map((r) => ({
        quizId: r.quiz_id,
        score: r.score ?? 0,
        coinsEarned: r.coins_earned ?? 0,
        coinsClaimed: r.coins_claimed ?? true,
      })),
    });
  } catch (error) {
    console.error("Completions error:", error);
    return NextResponse.json({ completions: [] });
  }
}

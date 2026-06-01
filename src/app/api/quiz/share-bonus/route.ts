import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Rate limit: 1 share bonus per 30 seconds per user
    const rl = rateLimit("share-bonus", session.userId, 1, 30000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too fast" }, { status: 429 });
    }

    const { quizId } = await req.json();
    if (!quizId) {
      return NextResponse.json({ error: "Quiz ID required" }, { status: 400 });
    }

    const sql = getDb();

    // Check if the user has completed this quiz (must have played it)
    const completion = await sql`
      SELECT id FROM quiz_completions
      WHERE user_id = ${session.userId} AND quiz_id = ${quizId}
    `;
    if (completion.length === 0) {
      return NextResponse.json({ error: "Quiz not completed" }, { status: 400 });
    }

    // Award 2 bonus coins
    const result = await sql`
      UPDATE users SET coins = coins + 2
      WHERE id = ${session.userId}
      RETURNING coins
    `;

    return NextResponse.json({ bonusCoins: 2, totalCoins: result[0].coins });
  } catch (error) {
    console.error("Share bonus error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

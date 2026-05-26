import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { quizId, score } = await req.json();
    if (!quizId) {
      return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
    }

    const sql = getDb();

    // Check if already completed
    const existing = await sql`
      SELECT id FROM quiz_completions
      WHERE user_id = ${session.userId} AND quiz_id = ${quizId}
    `;

    if (existing.length > 0) {
      return NextResponse.json({ coins: 0, alreadyCompleted: true });
    }

    // Record completion and award coins
    const coinsToAdd = 4;

    await sql`
      INSERT INTO quiz_completions (user_id, quiz_id, score)
      VALUES (${session.userId}, ${quizId}, ${score ?? 0})
    `;

    const result = await sql`
      UPDATE users SET coins = coins + ${coinsToAdd}
      WHERE id = ${session.userId}
      RETURNING coins
    `;

    return NextResponse.json({
      coins: coinsToAdd,
      totalCoins: result[0].coins,
      alreadyCompleted: false,
    });
  } catch (error) {
    console.error("Quiz complete error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

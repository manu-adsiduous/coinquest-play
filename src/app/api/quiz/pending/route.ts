import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { scoreToCoins, gradeAnswers } from "@/lib/coins";
import { allQuizzes } from "@/data/quizzes";
import { rateLimit } from "@/lib/rate-limit";

// Save a pending quiz completion (coins not yet claimed)
export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const rl = rateLimit("quiz-pending", session.userId, 2, 5000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too fast" }, { status: 429 });
    }

    const { quizId, answers } = await req.json();
    const quiz = allQuizzes.find((q) => q.id === quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Invalid quiz" }, { status: 400 });
    }

    // Grade server-side against the answer key — never trust a client score.
    const validScore = gradeAnswers(answers, quiz);
    const coinsForAttempt = scoreToCoins(validScore);

    const sql = getDb();

    // Check existing completion
    const existing = await sql`
      SELECT id, score, coins_earned, coins_claimed FROM quiz_completions
      WHERE user_id = ${Number(session.userId)} AND quiz_id = ${quizId}
    `;

    if (existing.length > 0) {
      const prev = existing[0];
      // Update score if better, mark as unclaimed if coins would improve
      if (coinsForAttempt > (prev.coins_earned ?? 0)) {
        await sql`
          UPDATE quiz_completions
          SET score = GREATEST(score, ${validScore}), coins_earned = ${coinsForAttempt}, coins_claimed = FALSE
          WHERE user_id = ${Number(session.userId)} AND quiz_id = ${quizId}
        `;
      } else if (!prev.coins_claimed) {
        // Already pending — just return
      }
      return NextResponse.json({ pending: true, coinsForAttempt });
    }

    // First completion — save as pending
    await sql`
      INSERT INTO quiz_completions (user_id, quiz_id, score, coins_earned, coins_claimed)
      VALUES (${Number(session.userId)}, ${quizId}, ${validScore}, ${coinsForAttempt}, FALSE)
    `;

    return NextResponse.json({ pending: true, coinsForAttempt });
  } catch (error) {
    console.error("Quiz pending error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

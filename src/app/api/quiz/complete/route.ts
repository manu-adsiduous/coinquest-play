import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { scoreToCoins } from "@/lib/coins";
import { allQuizzes } from "@/data/quizzes";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Rate limit: 1 request per 5 seconds per user
    const rl = rateLimit("quiz-complete", session.userId, 1, 5000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too fast. Try again shortly." }, { status: 429 });
    }

    const { quizId, score } = await req.json();

    // Validate quizId exists
    if (!quizId || !allQuizzes.some((q) => q.id === quizId)) {
      return NextResponse.json({ error: "Invalid quiz" }, { status: 400 });
    }

    // Validate score is integer 0-10
    const validScore = Math.max(0, Math.min(10, Math.floor(Number(score) || 0)));

    const sql = getDb();
    const coinsForThisAttempt = scoreToCoins(validScore);

    // Check if already completed
    const existing = await sql`
      SELECT id, coins_earned FROM quiz_completions
      WHERE user_id = ${session.userId} AND quiz_id = ${quizId}
    `;

    if (existing.length > 0) {
      const previousCoins = existing[0].coins_earned ?? 0;

      if (coinsForThisAttempt > previousCoins) {
        const additionalCoins = coinsForThisAttempt - previousCoins;

        await sql`
          UPDATE quiz_completions
          SET score = GREATEST(score, ${validScore}), coins_earned = ${coinsForThisAttempt}
          WHERE user_id = ${session.userId} AND quiz_id = ${quizId}
        `;

        const result = await sql`
          UPDATE users SET coins = coins + ${additionalCoins}
          WHERE id = ${session.userId}
          RETURNING coins
        `;

        return NextResponse.json({
          coinsEarned: coinsForThisAttempt,
          coinsAwarded: additionalCoins,
          previousCoins,
          totalCoins: result[0].coins,
        });
      }

      return NextResponse.json({
        coinsEarned: coinsForThisAttempt,
        coinsAwarded: 0,
        previousCoins,
        totalCoins: null,
      });
    }

    // First completion
    await sql`
      INSERT INTO quiz_completions (user_id, quiz_id, score, coins_earned)
      VALUES (${session.userId}, ${quizId}, ${validScore}, ${coinsForThisAttempt})
    `;

    const result = await sql`
      UPDATE users SET coins = coins + ${coinsForThisAttempt}
      WHERE id = ${session.userId}
      RETURNING coins
    `;

    return NextResponse.json({
      coinsEarned: coinsForThisAttempt,
      coinsAwarded: coinsForThisAttempt,
      previousCoins: 0,
      totalCoins: result[0].coins,
    });
  } catch (error) {
    console.error("Quiz complete error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

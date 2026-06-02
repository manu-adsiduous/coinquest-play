import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { scoreToCoins } from "@/lib/coins";
import { allQuizzes } from "@/data/quizzes";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const rl = rateLimit("quiz-complete", session.userId, 1, 5000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too fast. Try again shortly." }, { status: 429 });
    }

    const { quizId, score } = await req.json();

    if (!quizId || !allQuizzes.some((q) => q.id === quizId)) {
      return NextResponse.json({ error: "Invalid quiz" }, { status: 400 });
    }

    const validScore = Math.max(0, Math.min(10, Math.floor(Number(score) || 0)));
    const sql = getDb();
    const userId = Number(session.userId);
    const coinsForThisAttempt = scoreToCoins(validScore);

    // Check existing completion
    const existing = await sql`
      SELECT id, coins_earned, coins_claimed FROM quiz_completions
      WHERE user_id = ${userId} AND quiz_id = ${quizId}
    `;

    if (existing.length > 0) {
      const prev = existing[0];
      const previousClaimedCoins = prev.coins_claimed ? (prev.coins_earned ?? 0) : 0;
      const bestCoins = Math.max(prev.coins_earned ?? 0, coinsForThisAttempt);

      // Coins to actually award now
      const coinsToAward = bestCoins - previousClaimedCoins;

      if (coinsToAward > 0) {
        await sql`
          UPDATE quiz_completions
          SET score = GREATEST(score, ${validScore}), coins_earned = ${bestCoins}, coins_claimed = TRUE
          WHERE user_id = ${userId} AND quiz_id = ${quizId}
        `;

        const result = await sql`
          UPDATE users SET coins = coins + ${coinsToAward}
          WHERE id = ${userId}
          RETURNING coins
        `;

        return NextResponse.json({
          coinsEarned: coinsForThisAttempt,
          coinsAwarded: coinsToAward,
          previousCoins: previousClaimedCoins,
          totalCoins: result[0].coins,
        });
      }

      // Already claimed equal or more — just mark as claimed
      await sql`
        UPDATE quiz_completions SET coins_claimed = TRUE
        WHERE user_id = ${userId} AND quiz_id = ${quizId}
      `;

      return NextResponse.json({
        coinsEarned: coinsForThisAttempt,
        coinsAwarded: 0,
        previousCoins: previousClaimedCoins,
        totalCoins: null,
      });
    }

    // First completion — save and claim immediately
    await sql`
      INSERT INTO quiz_completions (user_id, quiz_id, score, coins_earned, coins_claimed)
      VALUES (${userId}, ${quizId}, ${validScore}, ${coinsForThisAttempt}, TRUE)
    `;

    const result = await sql`
      UPDATE users SET coins = coins + ${coinsForThisAttempt}
      WHERE id = ${userId}
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

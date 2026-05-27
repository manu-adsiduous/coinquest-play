import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { scoreToCoins, MAX_COINS_PER_QUIZ } from "@/lib/coins";

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
    const coinsForThisAttempt = scoreToCoins(score ?? 0);

    // Check if already completed
    const existing = await sql`
      SELECT id, coins_earned FROM quiz_completions
      WHERE user_id = ${session.userId} AND quiz_id = ${quizId}
    `;

    if (existing.length > 0) {
      const previousCoins = existing[0].coins_earned ?? 0;

      // Only award additional coins if this attempt earned more
      if (coinsForThisAttempt > previousCoins) {
        const additionalCoins = coinsForThisAttempt - previousCoins;

        // Update the completion record with new best
        await sql`
          UPDATE quiz_completions
          SET score = GREATEST(score, ${score ?? 0}), coins_earned = ${coinsForThisAttempt}
          WHERE user_id = ${session.userId} AND quiz_id = ${quizId}
        `;

        // Award the difference
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

      // Same or worse score — no additional coins
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
      VALUES (${session.userId}, ${quizId}, ${score ?? 0}, ${coinsForThisAttempt})
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

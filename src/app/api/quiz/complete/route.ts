import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { scoreToCoins, gradeAnswers } from "@/lib/coins";
import { recordCoinTx } from "@/lib/ledger";
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

    const { quizId, answers } = await req.json();

    const quiz = allQuizzes.find((q) => q.id === quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Invalid quiz" }, { status: 400 });
    }

    const sql = getDb();
    const userId = Number(session.userId);

    // The pending step already graded this attempt server-side and stored the
    // result. coins_paid tracks how much we've actually credited for this quiz,
    // so we only ever award (best earned − already paid) — capping total credit
    // at coins_earned and preventing the retake double-award.
    const existing = await sql`
      SELECT id, coins_earned, coins_paid FROM quiz_completions
      WHERE user_id = ${userId} AND quiz_id = ${quizId}
    `;

    if (existing.length > 0) {
      const prev = existing[0];
      const earned = prev.coins_earned ?? 0;
      const paid = prev.coins_paid ?? 0;
      const coinsToAward = Math.max(0, earned - paid);

      if (coinsToAward > 0) {
        await sql`
          UPDATE quiz_completions SET coins_paid = ${earned}, coins_claimed = TRUE
          WHERE user_id = ${userId} AND quiz_id = ${quizId}
        `;

        const result = await sql`
          UPDATE users SET coins = coins + ${coinsToAward}
          WHERE id = ${userId}
          RETURNING coins
        `;

        await recordCoinTx(userId, coinsToAward, "quiz_complete", quizId);

        return NextResponse.json({
          coinsEarned: earned,
          coinsAwarded: coinsToAward,
          previousCoins: paid,
          totalCoins: result[0].coins,
        });
      }

      // Already fully paid for this quiz — just ensure it's marked claimed
      await sql`
        UPDATE quiz_completions SET coins_claimed = TRUE
        WHERE user_id = ${userId} AND quiz_id = ${quizId}
      `;

      return NextResponse.json({
        coinsEarned: earned,
        coinsAwarded: 0,
        previousCoins: paid,
        totalCoins: null,
      });
    }

    // No pending row (e.g. the pending save failed mid-flow). Grade the submitted
    // answers server-side and record the completion — still never trusting a
    // client-supplied score.
    const validScore = gradeAnswers(answers, quiz);
    const coins = scoreToCoins(validScore);

    await sql`
      INSERT INTO quiz_completions (user_id, quiz_id, score, coins_earned, coins_paid, coins_claimed)
      VALUES (${userId}, ${quizId}, ${validScore}, ${coins}, ${coins}, TRUE)
    `;

    if (coins <= 0) {
      return NextResponse.json({
        coinsEarned: 0,
        coinsAwarded: 0,
        previousCoins: 0,
        totalCoins: null,
      });
    }

    const result = await sql`
      UPDATE users SET coins = coins + ${coins}
      WHERE id = ${userId}
      RETURNING coins
    `;

    await recordCoinTx(userId, coins, "quiz_complete", quizId);

    return NextResponse.json({
      coinsEarned: coins,
      coinsAwarded: coins,
      previousCoins: 0,
      totalCoins: result[0].coins,
    });
  } catch (error) {
    console.error("Quiz complete error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

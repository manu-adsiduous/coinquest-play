import { NextResponse } from "next/server";
import { getAdminUser, ADMIN_EMAILS } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { parseDateRange } from "@/lib/date-range";

export async function GET(req: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "all";
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const { start, end } = parseDateRange(range, from, to);
  const startVal = start ?? null;
  const endVal = end ?? null;

  // Exclude admin accounts/activity so the numbers reflect real users only.
  const adminEmails = ADMIN_EMAILS;

  try {
    const sql = getDb();
    const [userCount, quizzesTaken, adsWatched, totalCoinsEarned] = await Promise.all([
      // Registered users (guests aren't accounts)
      sql`
        SELECT COUNT(*)::int as count FROM users
        WHERE (${startVal}::timestamptz IS NULL OR created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR created_at < ${endVal})
          AND email <> ALL(${adminEmails})
      `,
      // Quizzes taken — event-based, split into guest (NULL user_id) vs
      // registered, excluding admins.
      sql`
        SELECT
          COUNT(*) FILTER (WHERE user_id IS NULL)::int as guest,
          COUNT(*) FILTER (WHERE user_id IS NOT NULL)::int as registered
        FROM events
        WHERE event_name = 'quiz_completed'
          AND (${startVal}::timestamptz IS NULL OR created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR created_at < ${endVal})
          AND (user_id IS NULL OR user_id NOT IN (SELECT id FROM users WHERE email = ANY(${adminEmails})))
      `,
      // Rewarded ad views = unlock ad + claim ad, event-based, guest vs registered
      sql`
        SELECT
          COUNT(*) FILTER (WHERE user_id IS NULL)::int as guest,
          COUNT(*) FILTER (WHERE user_id IS NOT NULL)::int as registered
        FROM events
        WHERE event_name IN ('quiz_unlocked', 'quiz_completed')
          AND (${startVal}::timestamptz IS NULL OR created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR created_at < ${endVal})
          AND (user_id IS NULL OR user_id NOT IN (SELECT id FROM users WHERE email = ANY(${adminEmails})))
      `,
      // Coins earned — persisted coins, registered users only (guest coins are ephemeral)
      sql`
        SELECT COALESCE(SUM(coins_earned), 0)::int as total FROM quiz_completions
        WHERE (${startVal}::timestamptz IS NULL OR completed_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR completed_at < ${endVal})
          AND user_id NOT IN (SELECT id FROM users WHERE email = ANY(${adminEmails}))
      `,
    ]);

    const users = userCount[0].count;
    const takenGuest = quizzesTaken[0].guest;
    const takenReg = quizzesTaken[0].registered;
    const taken = takenGuest + takenReg;
    const adsGuest = adsWatched[0].guest;
    const adsReg = adsWatched[0].registered;
    const ads = adsGuest + adsReg;
    const coins = totalCoinsEarned[0].total;

    return NextResponse.json({
      userCount: users,
      quizzesTaken: taken,
      quizzesTakenGuest: takenGuest,
      quizzesTakenRegistered: takenReg,
      totalAdsWatched: ads,
      adsWatchedGuest: adsGuest,
      adsWatchedRegistered: adsReg,
      adsPerUser: users > 0 ? Math.round((ads / users) * 10) / 10 : 0,
      totalCoinsEarned: coins,
      coinsPerUser: users > 0 ? Math.round((coins / users) * 10) / 10 : 0,
    });
  } catch (error) {
    console.error("Console stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

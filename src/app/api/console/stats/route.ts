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
    const [userCount, totalCompletions, totalCoinsEarned] = await Promise.all([
      sql`
        SELECT COUNT(*)::int as count FROM users
        WHERE (${startVal}::timestamptz IS NULL OR created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR created_at < ${endVal})
          AND email <> ALL(${adminEmails})
      `,
      sql`
        SELECT COUNT(*)::int as count FROM quiz_completions
        WHERE (${startVal}::timestamptz IS NULL OR completed_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR completed_at < ${endVal})
          AND user_id NOT IN (SELECT id FROM users WHERE email = ANY(${adminEmails}))
      `,
      sql`
        SELECT COALESCE(SUM(coins_earned), 0)::int as total FROM quiz_completions
        WHERE (${startVal}::timestamptz IS NULL OR completed_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR completed_at < ${endVal})
          AND user_id NOT IN (SELECT id FROM users WHERE email = ANY(${adminEmails}))
      `,
    ]);

    const users = userCount[0].count;
    const completions = totalCompletions[0].count;
    const coins = totalCoinsEarned[0].total;
    const totalAds = completions * 2;

    return NextResponse.json({
      userCount: users,
      totalAdsWatched: totalAds,
      adsPerUser: users > 0 ? Math.round((totalAds / users) * 10) / 10 : 0,
      totalCoinsEarned: coins,
      coinsPerUser: users > 0 ? Math.round((coins / users) * 10) / 10 : 0,
    });
  } catch (error) {
    console.error("Console stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

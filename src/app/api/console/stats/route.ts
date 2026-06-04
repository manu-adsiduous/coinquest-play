import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
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

  try {
    const sql = getDb();
    let userCount, totalCompletions, totalCoinsEarned;

    if (!start) {
      [userCount, totalCompletions, totalCoinsEarned] = await Promise.all([
        sql`SELECT COUNT(*)::int as count FROM users`,
        sql`SELECT COUNT(*)::int as count FROM quiz_completions`,
        sql`SELECT COALESCE(SUM(coins_earned), 0)::int as total FROM quiz_completions`,
      ]);
    } else if (end) {
      [userCount, totalCompletions, totalCoinsEarned] = await Promise.all([
        sql`SELECT COUNT(*)::int as count FROM users WHERE created_at >= ${start} AND created_at < ${end}`,
        sql`SELECT COUNT(*)::int as count FROM quiz_completions WHERE completed_at >= ${start} AND completed_at < ${end}`,
        sql`SELECT COALESCE(SUM(coins_earned), 0)::int as total FROM quiz_completions WHERE completed_at >= ${start} AND completed_at < ${end}`,
      ]);
    } else {
      [userCount, totalCompletions, totalCoinsEarned] = await Promise.all([
        sql`SELECT COUNT(*)::int as count FROM users WHERE created_at >= ${start}`,
        sql`SELECT COUNT(*)::int as count FROM quiz_completions WHERE completed_at >= ${start}`,
        sql`SELECT COALESCE(SUM(coins_earned), 0)::int as total FROM quiz_completions WHERE completed_at >= ${start}`,
      ]);
    }

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

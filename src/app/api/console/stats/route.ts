import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET(req: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "all";

  let dateFilter = "";
  const now = new Date();
  if (range === "today") {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    dateFilter = start;
  } else if (range === "yesterday") {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    dateFilter = `${start}|${end}`;
  } else if (range === "this_month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    dateFilter = start;
  } else if (range === "last_month") {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    dateFilter = `${start}|${end}`;
  }

  try {
    const sql = getDb();

    let userCount, totalCompletions, totalCoinsEarned;

    if (range === "all") {
      [userCount, totalCompletions, totalCoinsEarned] = await Promise.all([
        sql`SELECT COUNT(*)::int as count FROM users`,
        sql`SELECT COUNT(*)::int as count FROM quiz_completions`,
        sql`SELECT COALESCE(SUM(coins_earned), 0)::int as total FROM quiz_completions`,
      ]);
    } else if (dateFilter.includes("|")) {
      const [start, end] = dateFilter.split("|");
      [userCount, totalCompletions, totalCoinsEarned] = await Promise.all([
        sql`SELECT COUNT(*)::int as count FROM users WHERE created_at >= ${start} AND created_at < ${end}`,
        sql`SELECT COUNT(*)::int as count FROM quiz_completions WHERE completed_at >= ${start} AND completed_at < ${end}`,
        sql`SELECT COALESCE(SUM(coins_earned), 0)::int as total FROM quiz_completions WHERE completed_at >= ${start} AND completed_at < ${end}`,
      ]);
    } else {
      [userCount, totalCompletions, totalCoinsEarned] = await Promise.all([
        sql`SELECT COUNT(*)::int as count FROM users WHERE created_at >= ${dateFilter}`,
        sql`SELECT COUNT(*)::int as count FROM quiz_completions WHERE completed_at >= ${dateFilter}`,
        sql`SELECT COALESCE(SUM(coins_earned), 0)::int as total FROM quiz_completions WHERE completed_at >= ${dateFilter}`,
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

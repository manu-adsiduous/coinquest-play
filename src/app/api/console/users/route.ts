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
    let users;

    if (!start) {
      users = await sql`
        SELECT u.id, u.email, u.username, u.coins, u.created_at, u.acquisition_source,
          COALESCE(qc.quiz_count, 0)::int as quizzes_completed,
          COALESCE(qc.total_coins, 0)::int as total_coins_earned,
          COALESCE(gc.redemption_count, 0)::int as redemptions
        FROM users u
        LEFT JOIN (SELECT user_id, COUNT(*)::int as quiz_count, COALESCE(SUM(coins_earned), 0)::int as total_coins FROM quiz_completions GROUP BY user_id) qc ON qc.user_id = u.id
        LEFT JOIN (SELECT redeemed_by, COUNT(*)::int as redemption_count FROM gift_cards WHERE redeemed_by IS NOT NULL GROUP BY redeemed_by) gc ON gc.redeemed_by = u.id
        ORDER BY u.created_at DESC
      `;
    } else if (end) {
      users = await sql`
        SELECT u.id, u.email, u.username, u.coins, u.created_at, u.acquisition_source,
          COALESCE(qc.quiz_count, 0)::int as quizzes_completed,
          COALESCE(qc.total_coins, 0)::int as total_coins_earned,
          COALESCE(gc.redemption_count, 0)::int as redemptions
        FROM users u
        LEFT JOIN (SELECT user_id, COUNT(*)::int as quiz_count, COALESCE(SUM(coins_earned), 0)::int as total_coins FROM quiz_completions GROUP BY user_id) qc ON qc.user_id = u.id
        LEFT JOIN (SELECT redeemed_by, COUNT(*)::int as redemption_count FROM gift_cards WHERE redeemed_by IS NOT NULL GROUP BY redeemed_by) gc ON gc.redeemed_by = u.id
        WHERE u.created_at >= ${start} AND u.created_at < ${end}
        ORDER BY u.created_at DESC
      `;
    } else {
      users = await sql`
        SELECT u.id, u.email, u.username, u.coins, u.created_at, u.acquisition_source,
          COALESCE(qc.quiz_count, 0)::int as quizzes_completed,
          COALESCE(qc.total_coins, 0)::int as total_coins_earned,
          COALESCE(gc.redemption_count, 0)::int as redemptions
        FROM users u
        LEFT JOIN (SELECT user_id, COUNT(*)::int as quiz_count, COALESCE(SUM(coins_earned), 0)::int as total_coins FROM quiz_completions GROUP BY user_id) qc ON qc.user_id = u.id
        LEFT JOIN (SELECT redeemed_by, COUNT(*)::int as redemption_count FROM gift_cards WHERE redeemed_by IS NOT NULL GROUP BY redeemed_by) gc ON gc.redeemed_by = u.id
        WHERE u.created_at >= ${start}
        ORDER BY u.created_at DESC
      `;
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Console users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

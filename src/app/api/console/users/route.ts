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

  // Exclude admin accounts so the list reflects real users only.
  const adminEmails = ADMIN_EMAILS;

  try {
    const sql = getDb();
    const users = await sql`
      SELECT u.id, u.email, u.username, u.coins, u.created_at, u.acquisition_source,
        COALESCE(qc.quiz_count, 0)::int as quizzes_completed,
        COALESCE(qc.total_coins, 0)::int as total_coins_earned,
        COALESCE(gc.redemption_count, 0)::int as redemptions,
        COALESCE(ec.event_count, 0)::int as events_count
      FROM users u
      LEFT JOIN (SELECT user_id, COUNT(*)::int as quiz_count, COALESCE(SUM(coins_earned), 0)::int as total_coins FROM quiz_completions GROUP BY user_id) qc ON qc.user_id = u.id
      LEFT JOIN (SELECT redeemed_by, COUNT(*)::int as redemption_count FROM gift_cards WHERE redeemed_by IS NOT NULL GROUP BY redeemed_by) gc ON gc.redeemed_by = u.id
      LEFT JOIN (SELECT user_id, COUNT(*)::int as event_count FROM events WHERE user_id IS NOT NULL GROUP BY user_id) ec ON ec.user_id = u.id
      WHERE (${startVal}::timestamptz IS NULL OR u.created_at >= ${startVal})
        AND (${endVal}::timestamptz IS NULL OR u.created_at < ${endVal})
        AND u.email <> ALL(${adminEmails})
      ORDER BY u.created_at DESC
    `;

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Console users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

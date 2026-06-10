import { NextResponse } from "next/server";
import { getAdminUser, ADMIN_EMAILS } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const sql = getDb();

    // Exclude admin accounts so retention reflects real users only.
    const adminEmails = ADMIN_EMAILS;

    // Day-N retention: of all users, what % had activity N days after signup
    const dayNRetention = await sql`
      WITH user_activity AS (
        SELECT
          u.id as user_id,
          u.created_at as signup_date,
          e.created_at as event_date,
          EXTRACT(DAY FROM e.created_at - u.created_at)::int as days_after
        FROM users u
        INNER JOIN events e ON e.user_id = u.id
        WHERE e.created_at > u.created_at + interval '1 hour'
          AND u.email <> ALL(${adminEmails})
      )
      SELECT
        days_after,
        COUNT(DISTINCT user_id)::int as returning_users
      FROM user_activity
      WHERE days_after BETWEEN 1 AND 30
      GROUP BY days_after
      ORDER BY days_after
    `;

    const totalUsers = await sql`SELECT COUNT(*)::int as count FROM users WHERE email <> ALL(${adminEmails})`;
    const total = totalUsers[0].count;

    // Build day-N map
    const dayMap: Record<number, number> = {};
    for (const row of dayNRetention) {
      dayMap[row.days_after] = row.returning_users;
    }

    const dayRetention = [1, 3, 7, 14, 30].map((day) => ({
      day,
      users: dayMap[day] || 0,
      rate: total > 0 ? Math.round(((dayMap[day] || 0) / total) * 1000) / 10 : 0,
    }));

    // Weekly cohort retention
    const cohortData = await sql`
      WITH cohorts AS (
        SELECT
          id as user_id,
          DATE_TRUNC('week', created_at)::date as cohort_week,
          created_at as signup_date
        FROM users
        WHERE email <> ALL(${adminEmails})
      ),
      activity AS (
        SELECT
          c.user_id,
          c.cohort_week,
          FLOOR(EXTRACT(DAY FROM e.created_at - c.signup_date) / 7)::int as week_number
        FROM cohorts c
        INNER JOIN events e ON e.user_id = c.user_id
        WHERE e.created_at > c.signup_date + interval '1 hour'
          AND EXTRACT(DAY FROM e.created_at - c.signup_date) < 56
      )
      SELECT
        cohort_week,
        week_number,
        COUNT(DISTINCT user_id)::int as active_users
      FROM activity
      WHERE week_number BETWEEN 1 AND 7
      GROUP BY cohort_week, week_number
      ORDER BY cohort_week, week_number
    `;

    const cohortSizes = await sql`
      SELECT
        DATE_TRUNC('week', created_at)::date as cohort_week,
        COUNT(*)::int as size
      FROM users
      WHERE email <> ALL(${adminEmails})
      GROUP BY cohort_week
      ORDER BY cohort_week
    `;

    // Build cohort table
    const cohorts = cohortSizes.map((c) => {
      const weeks: Record<number, { users: number; rate: number }> = {};
      for (let w = 1; w <= 7; w++) {
        const match = cohortData.find(
          (d) => String(d.cohort_week) === String(c.cohort_week) && d.week_number === w
        );
        weeks[w] = {
          users: match?.active_users || 0,
          rate: c.size > 0 ? Math.round(((match?.active_users || 0) / c.size) * 1000) / 10 : 0,
        };
      }
      return {
        week: c.cohort_week,
        size: c.size,
        weeks,
      };
    });

    // Quiz depth: how many users completed N quizzes
    const quizDepth = await sql`
      SELECT
        quiz_count,
        COUNT(*)::int as user_count
      FROM (
        SELECT user_id, COUNT(*)::int as quiz_count
        FROM quiz_completions
        WHERE user_id NOT IN (SELECT id FROM users WHERE email = ANY(${adminEmails}))
        GROUP BY user_id
      ) sub
      GROUP BY quiz_count
      ORDER BY quiz_count
    `;

    return NextResponse.json({
      totalUsers: total,
      dayRetention,
      cohorts,
      quizDepth,
    });
  } catch (error) {
    console.error("Retention error:", error);
    return NextResponse.json({ error: "Failed to fetch retention" }, { status: 500 });
  }
}

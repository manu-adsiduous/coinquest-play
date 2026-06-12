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
  const startVal = start ?? null;
  const endVal = end ?? null;

  try {
    const sql = getDb();
    const [transactions, totals, byReason] = await Promise.all([
      sql`
        SELECT t.id, t.delta, t.reason, t.ref, t.created_at, u.username, u.email
        FROM coin_transactions t LEFT JOIN users u ON u.id = t.user_id
        WHERE (${startVal}::timestamptz IS NULL OR t.created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR t.created_at < ${endVal})
        ORDER BY t.created_at DESC
        LIMIT 500
      `,
      sql`
        SELECT
          COUNT(*)::int as count,
          COALESCE(SUM(delta) FILTER (WHERE delta > 0), 0)::int as earned,
          COALESCE(SUM(delta) FILTER (WHERE delta < 0), 0)::int as spent,
          COALESCE(SUM(delta), 0)::int as net
        FROM coin_transactions t
        WHERE (${startVal}::timestamptz IS NULL OR t.created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR t.created_at < ${endVal})
      `,
      sql`
        SELECT reason, COUNT(*)::int as count, COALESCE(SUM(delta), 0)::int as total
        FROM coin_transactions t
        WHERE (${startVal}::timestamptz IS NULL OR t.created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR t.created_at < ${endVal})
        GROUP BY reason ORDER BY count DESC
      `,
    ]);

    return NextResponse.json({ transactions, totals: totals[0], byReason });
  } catch (error) {
    console.error("Console ledger error:", error);
    return NextResponse.json({ error: "Failed to fetch ledger" }, { status: 500 });
  }
}

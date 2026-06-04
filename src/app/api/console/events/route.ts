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
  const limit = Math.min(Number(searchParams.get("limit")) || 500, 1000);

  try {
    const sql = getDb();
    let events, countResult, summary;

    if (!start) {
      [events, countResult, summary] = await Promise.all([
        sql`SELECT e.id, e.event_name, e.properties, e.created_at, u.username, u.email
            FROM events e LEFT JOIN users u ON u.id = e.user_id
            ORDER BY e.created_at DESC LIMIT ${limit}`,
        sql`SELECT COUNT(*)::int as total FROM events`,
        sql`SELECT event_name, COUNT(*)::int as count FROM events GROUP BY event_name ORDER BY count DESC`,
      ]);
    } else if (end) {
      [events, countResult, summary] = await Promise.all([
        sql`SELECT e.id, e.event_name, e.properties, e.created_at, u.username, u.email
            FROM events e LEFT JOIN users u ON u.id = e.user_id
            WHERE e.created_at >= ${start} AND e.created_at < ${end}
            ORDER BY e.created_at DESC LIMIT ${limit}`,
        sql`SELECT COUNT(*)::int as total FROM events WHERE created_at >= ${start} AND created_at < ${end}`,
        sql`SELECT event_name, COUNT(*)::int as count FROM events WHERE created_at >= ${start} AND created_at < ${end} GROUP BY event_name ORDER BY count DESC`,
      ]);
    } else {
      [events, countResult, summary] = await Promise.all([
        sql`SELECT e.id, e.event_name, e.properties, e.created_at, u.username, u.email
            FROM events e LEFT JOIN users u ON u.id = e.user_id
            WHERE e.created_at >= ${start}
            ORDER BY e.created_at DESC LIMIT ${limit}`,
        sql`SELECT COUNT(*)::int as total FROM events WHERE created_at >= ${start}`,
        sql`SELECT event_name, COUNT(*)::int as count FROM events WHERE created_at >= ${start} GROUP BY event_name ORDER BY count DESC`,
      ]);
    }

    return NextResponse.json({
      events,
      total: countResult[0].total,
      summary,
    });
  } catch (error) {
    console.error("Console events error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

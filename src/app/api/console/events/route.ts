import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET(req: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 50, 200);
  const offset = Number(searchParams.get("offset")) || 0;

  try {
    const sql = getDb();

    const [events, countResult, summary] = await Promise.all([
      sql`
        SELECT e.id, e.event_name, e.properties, e.created_at,
               u.username, u.email
        FROM events e
        LEFT JOIN users u ON u.id = e.user_id
        ORDER BY e.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      sql`SELECT COUNT(*)::int as total FROM events`,
      sql`
        SELECT event_name, COUNT(*)::int as count
        FROM events
        GROUP BY event_name
        ORDER BY count DESC
      `,
    ]);

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

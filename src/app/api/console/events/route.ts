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

  // Optional username/email substring filter, applied server-side so we return
  // a user's COMPLETE history rather than whatever falls in the global feed.
  const userQuery = searchParams.get("user")?.trim() || null;
  const userLike = userQuery ? `%${userQuery}%` : null;

  // Optional exact event-name filter, also server-side so filtering by a rare
  // event (e.g. cashout) surfaces every match in range, not just whatever's in
  // the recent feed. Only the feed is filtered by name — the summary/total stay
  // unfiltered so the dropdown keeps showing every event type.
  const eventName = searchParams.get("event")?.trim() || null;

  // When filtering by user or event, return everything; else cap the global feed.
  const limit = userQuery || eventName
    ? 5000
    : Math.min(Number(searchParams.get("limit")) || 500, 1000);

  // Nullable filter params — a NULL value disables that condition (the ::casts
  // give Postgres a type for the NULL-check so it can plan the query).
  const startVal = start ?? null;
  const endVal = end ?? null;

  try {
    const sql = getDb();
    const [events, countResult, summary] = await Promise.all([
      sql`
        SELECT e.id, e.event_name, e.properties, e.created_at, u.username, u.email
        FROM events e LEFT JOIN users u ON u.id = e.user_id
        WHERE (${startVal}::timestamptz IS NULL OR e.created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR e.created_at < ${endVal})
          AND (${userLike}::text IS NULL OR u.username ILIKE ${userLike} OR u.email ILIKE ${userLike})
          AND (${eventName}::text IS NULL OR e.event_name = ${eventName})
        ORDER BY e.created_at DESC
        LIMIT ${limit}
      `,
      sql`
        SELECT COUNT(*)::int as total
        FROM events e LEFT JOIN users u ON u.id = e.user_id
        WHERE (${startVal}::timestamptz IS NULL OR e.created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR e.created_at < ${endVal})
          AND (${userLike}::text IS NULL OR u.username ILIKE ${userLike} OR u.email ILIKE ${userLike})
      `,
      sql`
        SELECT e.event_name, COUNT(*)::int as count
        FROM events e LEFT JOIN users u ON u.id = e.user_id
        WHERE (${startVal}::timestamptz IS NULL OR e.created_at >= ${startVal})
          AND (${endVal}::timestamptz IS NULL OR e.created_at < ${endVal})
          AND (${userLike}::text IS NULL OR u.username ILIKE ${userLike} OR u.email ILIKE ${userLike})
        GROUP BY e.event_name ORDER BY count DESC
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

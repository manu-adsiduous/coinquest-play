import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { trackServerEvent } from "@/lib/track";
import { headers } from "next/headers";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const ALLOWED_EVENTS = new Set([
  "pageview", "quiz_viewed", "quiz_unlocked", "quiz_completed",
  "coins_earned", "sign_up", "login", "cashout", "share_score",
]);

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);

    // Rate limit: 30 events per minute per IP
    const rl = rateLimit("track", ip, 30, 60000);
    if (!rl.allowed) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const { event, properties, eventId, fbc, fbp, sourceUrl } = await req.json();
    if (!event || !ALLOWED_EVENTS.has(event)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Limit properties size
    const safeProps: Record<string, string | number | boolean | null | undefined> = {};
    if (properties && typeof properties === "object") {
      for (const [k, v] of Object.entries(properties).slice(0, 10)) {
        if (typeof v === "string" || typeof v === "number" || typeof v === "boolean" || v === null) {
          safeProps[k] = v;
        }
      }
    }

    const session = await getSessionUser();
    const userAgent = headersList.get("user-agent") || undefined;

    let email: string | undefined;
    if (session) {
      const sql = getDb();
      const result = await sql`SELECT email FROM users WHERE id = ${session.userId}`;
      if (result.length > 0) email = result[0].email;
    }

    await trackServerEvent(
      event,
      session ? Number(session.userId) : null,
      safeProps,
      userAgent,
      ip,
      eventId,
      { fbc, fbp, sourceUrl, email },
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

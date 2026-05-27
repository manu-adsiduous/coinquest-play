import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { trackServerEvent } from "@/lib/track";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { event, properties, eventId } = await req.json();
    if (!event) {
      return NextResponse.json({ error: "Event name required" }, { status: 400 });
    }

    const session = await getSessionUser();
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || undefined;
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;

    await trackServerEvent(
      event,
      session ? Number(session.userId) : null,
      properties || {},
      userAgent,
      ip,
      eventId,
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

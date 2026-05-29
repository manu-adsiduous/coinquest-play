import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { avatar } = await req.json();
    if (!avatar || typeof avatar !== "string" || avatar.length > 4) {
      return NextResponse.json({ error: "Invalid avatar" }, { status: 400 });
    }

    const sql = getDb();
    await sql`UPDATE users SET avatar = ${avatar} WHERE id = ${session.userId}`;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Avatar update error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

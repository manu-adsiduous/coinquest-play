import { NextResponse } from "next/server";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { signToken, sessionCookieOptions } from "@/lib/auth";
import { trackServerEvent } from "@/lib/track";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const sql = getDb();
    const result = await sql`
      SELECT id, email, username, password_hash, coins
      FROM users WHERE email = ${email}
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const user = result[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = signToken({ userId: user.id, email: user.email });
    const h = await headers();
    trackServerEvent("login", user.id, { method: "email" }, h.get("user-agent") || undefined, h.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined);

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, username: user.username, coins: user.coins },
    });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

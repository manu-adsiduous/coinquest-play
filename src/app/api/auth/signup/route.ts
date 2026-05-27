import { NextResponse } from "next/server";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { signToken, sessionCookieOptions } from "@/lib/auth";
import { trackServerEvent } from "@/lib/track";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    if (username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 });
    }

    const sql = getDb();

    // Check if email already exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await sql`
      INSERT INTO users (email, username, password_hash, coins)
      VALUES (${email}, ${username}, ${passwordHash}, 0)
      RETURNING id, email, username, coins, created_at
    `;

    const user = result[0];
    const token = signToken({ userId: user.id, email: user.email });
    const h = await headers();
    trackServerEvent("sign_up", user.id, { method: "email" }, h.get("user-agent") || undefined, h.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined, undefined, { email });

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, username: user.username, coins: user.coins },
    });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

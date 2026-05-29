import { NextResponse } from "next/server";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { signToken, sessionCookieOptions } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export async function POST(req: Request) {
  try {
    const h = await headers();
    const ip = getClientIp(h);

    // Rate limit: 3 signups per minute per IP
    const rl = rateLimit("signup", ip, 3, 60000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Too many attempts. Try again in ${rl.retryAfterSecs}s.` },
        { status: 429 }
      );
    }

    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (!USERNAME_REGEX.test(username)) {
      return NextResponse.json({ error: "Username must be 3-20 characters (letters, numbers, underscores)" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const sql = getDb();

    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: "Could not create account. Try a different email." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await sql`
      INSERT INTO users (email, username, password_hash, coins)
      VALUES (${email}, ${username}, ${passwordHash}, 0)
      RETURNING id, email, username, coins, created_at
    `;

    const user = result[0];
    const token = signToken({ userId: user.id, email: user.email });

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

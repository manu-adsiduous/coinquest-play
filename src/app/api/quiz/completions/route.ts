import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ completions: [] });
    }

    const sql = getDb();
    const result = await sql`
      SELECT quiz_id FROM quiz_completions
      WHERE user_id = ${session.userId}
    `;

    return NextResponse.json({
      completions: result.map((r) => r.quiz_id),
    });
  } catch (error) {
    console.error("Completions error:", error);
    return NextResponse.json({ completions: [] });
  }
}

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getDb } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Returns whether an existing account shares this visitor's ad click ID
 * (gclid/fbclid/ttclid) — used to gently nudge returning users to log in
 * instead of making another account. Returns only a boolean, never any
 * account details, and fails open (existing:false) so it can't block signup.
 */
export async function POST(req: Request) {
  try {
    const h = await headers();
    const rl = rateLimit("check-acq", getClientIp(h), 20, 60000);
    if (!rl.allowed) return NextResponse.json({ existing: false });

    const { acquisition } = await req.json();
    const acq = acquisition && typeof acquisition === "object" ? acquisition : {};
    const gclid = typeof acq.gclid === "string" ? acq.gclid : null;
    const fbclid = typeof acq.fbclid === "string" ? acq.fbclid : null;
    const ttclid = typeof acq.ttclid === "string" ? acq.ttclid : null;

    if (!gclid && !fbclid && !ttclid) {
      return NextResponse.json({ existing: false });
    }

    const sql = getDb();
    const rows = await sql`
      SELECT 1 FROM users
      WHERE (${gclid}::text IS NOT NULL AND acquisition_source->>'gclid' = ${gclid})
         OR (${fbclid}::text IS NOT NULL AND acquisition_source->>'fbclid' = ${fbclid})
         OR (${ttclid}::text IS NOT NULL AND acquisition_source->>'ttclid' = ${ttclid})
      LIMIT 1
    `;
    return NextResponse.json({ existing: rows.length > 0 });
  } catch (e) {
    console.error("check-acquisition error:", e);
    return NextResponse.json({ existing: false });
  }
}

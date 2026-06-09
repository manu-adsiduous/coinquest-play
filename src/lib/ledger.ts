import { getDb } from "./db";

/**
 * Record a coin balance change in the audit ledger.
 *
 * Best-effort by design: the authoritative balance is users.coins, and the
 * ledger is a supplementary audit trail — so a ledger write failure is logged
 * but never throws, ensuring it can't break the coin-award flow.
 */
export async function recordCoinTx(
  userId: number,
  delta: number,
  reason: string,
  ref?: string,
): Promise<void> {
  try {
    const sql = getDb();
    await sql`
      INSERT INTO coin_transactions (user_id, delta, reason, ref)
      VALUES (${userId}, ${delta}, ${reason}, ${ref ?? null})
    `;
  } catch (e) {
    console.error("coin ledger write failed:", e);
  }
}

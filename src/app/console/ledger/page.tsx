"use client";

import { useEffect, useState } from "react";
import type { LedgerByReason, LedgerTotals, LedgerTransaction } from "../_types";
import { useRangeQuery } from "../_lib";

const REASON_LABELS: Record<string, string> = {
  quiz_complete: "Quiz earned",
  guest_signup: "Guest signup",
  cashout: "Cashout",
  email_verify_bonus: "Email verify bonus",
};

const reasonLabel = (r: string) => REASON_LABELS[r] || r;

interface LedgerData {
  transactions: LedgerTransaction[];
  totals: LedgerTotals;
  byReason: LedgerByReason[];
}

export default function LedgerPage() {
  const { qs } = useRangeQuery();
  const [data, setData] = useState<LedgerData | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/console/ledger?${qs}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active && d) setData(d);
      });
    return () => {
      active = false;
    };
  }, [qs]);

  if (!data) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin h-8 w-8 border-4 border-pixel-cyan border-t-transparent rounded-full" />
      </div>
    );
  }

  const { totals, byReason, transactions } = data;

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="pixel-card p-4 text-center">
          <div className="text-2xl font-bold text-roblox-green">+{totals.earned}</div>
          <div className="text-xs text-text-secondary mt-1">Coins Earned</div>
        </div>
        <div className="pixel-card p-4 text-center">
          <div className="text-2xl font-bold text-roblox-red">{totals.spent}</div>
          <div className="text-xs text-text-secondary mt-1">Coins Spent</div>
        </div>
        <div className="pixel-card p-4 text-center">
          <div className="text-2xl font-bold text-coin-gold">{totals.net}</div>
          <div className="text-xs text-text-secondary mt-1">Net Outstanding</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* By reason */}
        <div className="pixel-card p-5">
          <h2 className="font-pixel text-[10px] text-white mb-4">By Reason ({totals.count} txns)</h2>
          <div className="space-y-2">
            {byReason.map((r) => (
              <div key={r.reason} className="flex items-center justify-between bg-[#0d1b2a] rounded-sm p-2 border border-border-pixel">
                <div>
                  <div className="text-pixel-cyan text-xs font-bold">{reasonLabel(r.reason)}</div>
                  <div className="text-text-secondary text-[10px]">{r.count} txns</div>
                </div>
                <span className={`font-bold text-sm ${r.total >= 0 ? "text-roblox-green" : "text-roblox-red"}`}>
                  {r.total >= 0 ? "+" : ""}
                  {r.total}
                </span>
              </div>
            ))}
            {byReason.length === 0 && (
              <p className="text-text-secondary text-xs text-center py-4">No transactions yet</p>
            )}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="pixel-card p-5 lg:col-span-2">
          <h2 className="font-pixel text-[10px] text-white mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border-pixel text-text-secondary text-xs text-left">
                  <th className="pb-2 pr-3">User</th>
                  <th className="pb-2 pr-3">Amount</th>
                  <th className="pb-2 pr-3">Reason</th>
                  <th className="pb-2 pr-3">Ref</th>
                  <th className="pb-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-border-pixel/50">
                    <td className="py-2 pr-3">
                      {t.username ? (
                        <span className="text-white text-xs">{t.username}</span>
                      ) : (
                        <span className="text-text-secondary text-xs">—</span>
                      )}
                    </td>
                    <td className="py-2 pr-3">
                      <span className={`font-bold ${t.delta >= 0 ? "text-roblox-green" : "text-roblox-red"}`}>
                        {t.delta >= 0 ? "+" : ""}
                        {t.delta}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-pixel-cyan text-xs">{reasonLabel(t.reason)}</td>
                    <td className="py-2 pr-3 text-text-secondary text-[10px] max-w-[140px] truncate">{t.ref || "—"}</td>
                    <td className="py-2 text-text-secondary text-[10px] whitespace-nowrap">
                      {new Date(t.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-text-secondary text-xs">
                      No transactions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

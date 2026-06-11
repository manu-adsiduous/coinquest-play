"use client";

import { useEffect, useState } from "react";
import type { CohortData, DayRetention, QuizDepth } from "../_types";

export default function RetentionPage() {
  const [dayRetention, setDayRetention] = useState<DayRetention[]>([]);
  const [cohorts, setCohorts] = useState<CohortData[]>([]);
  const [quizDepth, setQuizDepth] = useState<QuizDepth[]>([]);
  const [retentionTotal, setRetentionTotal] = useState(0);

  useEffect(() => {
    let active = true;
    fetch("/api/console/retention")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active || !data) return;
        setDayRetention(data.dayRetention);
        setCohorts(data.cohorts);
        setQuizDepth(data.quizDepth);
        setRetentionTotal(data.totalUsers);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Day-N Retention */}
        <div className="pixel-card p-5">
          <h3 className="text-text-secondary text-xs font-bold mb-3">Day-N Retention ({retentionTotal} users)</h3>
          <div className="space-y-2">
            {dayRetention.map((d) => (
              <div key={d.day} className="flex items-center gap-3">
                <span className="text-text-secondary text-xs w-12">Day {d.day}</span>
                <div className="flex-1 pixel-progress" style={{ height: "12px" }}>
                  <div className="pixel-progress-fill" style={{ width: `${Math.min(d.rate, 100)}%`, height: "100%" }} />
                </div>
                <span className="text-pixel-cyan text-xs font-bold w-16 text-right">
                  {d.rate}% ({d.users})
                </span>
              </div>
            ))}
            {dayRetention.length === 0 && (
              <p className="text-text-secondary text-xs text-center py-4">Not enough data yet</p>
            )}
          </div>
        </div>

        {/* Quiz Depth */}
        <div className="pixel-card p-5">
          <h3 className="text-text-secondary text-xs font-bold mb-3">Quiz Engagement Depth</h3>
          <div className="space-y-2">
            {quizDepth.map((d) => (
              <div key={d.quiz_count} className="flex items-center justify-between bg-[#0d1b2a] rounded-sm p-2 border border-border-pixel">
                <span className="text-text-secondary text-xs">
                  {d.quiz_count} quiz{d.quiz_count !== 1 ? "zes" : ""}
                </span>
                <span className="text-coin-gold font-bold text-sm">
                  {d.user_count} user{d.user_count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
            {quizDepth.length === 0 && (
              <p className="text-text-secondary text-xs text-center py-4">No quiz data yet</p>
            )}
          </div>
        </div>

        {/* Cohort Table */}
        <div className="pixel-card p-5 lg:col-span-1">
          <h3 className="text-text-secondary text-xs font-bold mb-3">Weekly Cohort Retention</h3>
          <div className="overflow-x-auto max-h-72 overflow-y-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="border-b-2 border-border-pixel text-text-secondary">
                  <th className="pb-1 pr-2 text-left">Cohort</th>
                  <th className="pb-1 pr-1 text-center">Size</th>
                  {[1, 2, 3, 4].map((w) => (
                    <th key={w} className="pb-1 pr-1 text-center">
                      W{w}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohorts.map((c) => (
                  <tr key={c.week} className="border-b border-border-pixel/50">
                    <td className="py-1 pr-2 text-text-secondary whitespace-nowrap">
                      {new Date(c.week).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </td>
                    <td className="py-1 pr-1 text-center text-white font-bold">{c.size}</td>
                    {[1, 2, 3, 4].map((w) => {
                      const rate = c.weeks[w]?.rate || 0;
                      return (
                        <td key={w} className="py-1 pr-1 text-center">
                          {rate > 0 ? (
                            <span className={`font-bold ${rate >= 30 ? "text-roblox-green" : rate >= 15 ? "text-coin-gold" : "text-roblox-red"}`}>
                              {rate}%
                            </span>
                          ) : (
                            <span className="text-text-secondary/30">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {cohorts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-text-secondary">
                      Not enough data yet
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

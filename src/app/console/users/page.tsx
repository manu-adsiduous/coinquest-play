"use client";

import { useEffect, useMemo, useState } from "react";
import type { UserRow } from "../_types";
import { useRangeQuery } from "../_lib";

export default function UsersPage() {
  const { qs } = useRangeQuery();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [userSort, setUserSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "created_at", dir: "desc" });
  const [userSourceFilter, setUserSourceFilter] = useState("");
  const [showSourceFilter, setShowSourceFilter] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/console/users?${qs}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active && d) setUsers(d.users);
      });
    return () => {
      active = false;
    };
  }, [qs]);

  const sortedUsers = useMemo(() => {
    let filtered = users;
    if (userSourceFilter) {
      filtered = users.filter((u) => {
        const src = u.acquisition_source?.utm_source || "—";
        return src === userSourceFilter;
      });
    }
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      const key = userSort.key as keyof UserRow;
      const aVal = a[key];
      const bVal = b[key];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return userSort.dir === "asc" ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal ?? "");
      const bStr = String(bVal ?? "");
      return userSort.dir === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
    return sorted;
  }, [users, userSort, userSourceFilter]);

  const uniqueSources = useMemo(() => {
    const sources = new Map<string, number>();
    for (const u of users) {
      const src = u.acquisition_source?.utm_source || "—";
      sources.set(src, (sources.get(src) || 0) + 1);
    }
    return Array.from(sources.entries()).sort((a, b) => b[1] - a[1]);
  }, [users]);

  const toggleUserSort = (key: string) => {
    setUserSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }
    );
  };

  return (
    <div className="pixel-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-pixel text-[10px] text-white">
          Users ({sortedUsers.length}
          {userSourceFilter ? ` of ${users.length}` : ""})
        </h2>
        {userSourceFilter && (
          <button
            onClick={() => {
              setUserSourceFilter("");
              setShowSourceFilter(false);
            }}
            className="text-roblox-red text-[10px] hover:underline"
          >
            Clear filter
          </button>
        )}
      </div>
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-border-pixel text-text-secondary text-xs text-left">
              {[
                { key: "created_at", label: "User" },
                { key: "coins", label: "Coins" },
                { key: "quizzes_completed", label: "Quizzes" },
                { key: "redemptions", label: "Cashouts" },
              ].map((col) => (
                <th
                  key={col.key}
                  className="pb-2 pr-3 cursor-pointer hover:text-pixel-cyan transition-colors select-none"
                  onClick={() => toggleUserSort(col.key)}
                >
                  {col.label}
                  {userSort.key === col.key && (
                    <span className="ml-1">{userSort.dir === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              ))}
              <th className="pb-2 relative">
                <span className="flex items-center gap-1.5">
                  Source
                  <button
                    onClick={() => setShowSourceFilter(!showSourceFilter)}
                    className={`text-[10px] transition-colors ${userSourceFilter ? "text-pixel-magenta" : "text-pixel-magenta/50 hover:text-pixel-magenta"}`}
                  >
                    ▼
                  </button>
                </span>
                {showSourceFilter && (
                  <div className="absolute right-0 top-full mt-1 w-44 pixel-card p-2 z-50 slide-up max-h-52 overflow-y-auto">
                    <button
                      onClick={() => {
                        setUserSourceFilter("");
                        setShowSourceFilter(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 text-xs rounded-sm transition-colors ${!userSourceFilter ? "text-pixel-cyan bg-pixel-cyan/10" : "text-text-secondary hover:text-white hover:bg-card-hover"}`}
                    >
                      All Sources
                    </button>
                    {uniqueSources.map(([src, count]) => (
                      <button
                        key={src}
                        onClick={() => {
                          setUserSourceFilter(src);
                          setShowSourceFilter(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 text-xs rounded-sm transition-colors flex justify-between ${userSourceFilter === src ? "text-pixel-cyan bg-pixel-cyan/10" : "text-text-secondary hover:text-white hover:bg-card-hover"}`}
                      >
                        <span>{src}</span>
                        <span className="text-coin-gold">{count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((u) => (
              <tr key={u.id} className="border-b border-border-pixel/50">
                <td className="py-2 pr-3">
                  <div className="text-white font-bold text-xs">{u.username}</div>
                  <div className="text-text-secondary text-[10px]">{u.email}</div>
                </td>
                <td className="py-2 pr-3">
                  <span className="text-coin-gold font-bold">{u.coins}</span>
                  {u.total_coins_earned !== u.coins && (
                    <span className="text-text-secondary text-[10px] ml-1">({u.total_coins_earned} earned)</span>
                  )}
                </td>
                <td className="py-2 pr-3 text-pixel-cyan">{u.quizzes_completed}</td>
                <td className="py-2 pr-3">
                  {u.redemptions > 0 ? (
                    <span className="text-roblox-green font-bold">{u.redemptions}</span>
                  ) : (
                    <span className="text-text-secondary">0</span>
                  )}
                </td>
                <td className="py-2">
                  {u.acquisition_source?.utm_source ? (
                    <span
                      className={`text-[10px] font-bold ${
                        u.acquisition_source.utm_source === "meta"
                          ? "text-pixel-blue"
                          : u.acquisition_source.utm_source === "google"
                            ? "text-roblox-green"
                            : u.acquisition_source.utm_source === "tiktok"
                              ? "text-pixel-cyan"
                              : "text-text-secondary"
                      }`}
                    >
                      {u.acquisition_source.utm_source}
                      {u.acquisition_source.utm_campaign && (
                        <span className="text-text-secondary font-normal ml-1">/ {u.acquisition_source.utm_campaign}</span>
                      )}
                    </span>
                  ) : (
                    <span className="text-text-secondary text-[10px]">—</span>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-text-secondary text-xs">
                  No users yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

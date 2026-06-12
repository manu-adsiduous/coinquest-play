"use client";

import { useEffect, useState } from "react";
import type { Stats } from "./_types";
import { useRangeQuery } from "./_lib";

export default function OverviewPage() {
  const { qs } = useRangeQuery();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/console/stats?${qs}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active && d) setStats(d);
      });
    return () => {
      active = false;
    };
  }, [qs]);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin h-8 w-8 border-4 border-pixel-cyan border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="pixel-card p-4 text-center">
        <div className="text-2xl font-bold text-pixel-cyan">{stats.userCount}</div>
        <div className="text-xs text-text-secondary mt-1">Users</div>
      </div>
      <div className="pixel-card p-4 text-center">
        <div className="text-2xl font-bold text-pixel-blue">{stats.quizzesTaken}</div>
        <div className="text-xs text-text-secondary mt-1">Quizzes Taken</div>
        <div className="text-[10px] text-text-secondary/70 mt-0.5">
          {stats.quizzesTakenRegistered} reg · {stats.quizzesTakenGuest} guest
        </div>
      </div>
      <div className="pixel-card p-4 text-center">
        <div className="text-2xl font-bold text-roblox-green">{stats.totalAdsWatched}</div>
        <div className="text-xs text-text-secondary mt-1">Ads Watched</div>
        <div className="text-[10px] text-text-secondary/70 mt-0.5">
          {stats.adsWatchedRegistered} reg · {stats.adsWatchedGuest} guest
        </div>
      </div>
      <div className="pixel-card p-4 text-center">
        <div className="text-2xl font-bold text-pixel-magenta">{stats.adsPerUser}</div>
        <div className="text-xs text-text-secondary mt-1">Ads / User</div>
      </div>
      <div className="pixel-card p-4 text-center">
        <div className="text-2xl font-bold text-coin-gold">{stats.totalCoinsEarned}</div>
        <div className="text-xs text-text-secondary mt-1">Coins Earned</div>
      </div>
      <div className="pixel-card p-4 text-center">
        <div className="text-2xl font-bold text-coin-gold">{stats.coinsPerUser}</div>
        <div className="text-xs text-text-secondary mt-1">Coins / User</div>
      </div>
      <div className="pixel-card p-4 text-center">
        <div className="text-2xl font-bold text-roblox-green">{stats.cashouts}</div>
        <div className="text-xs text-text-secondary mt-1">Cashouts</div>
      </div>
    </div>
  );
}

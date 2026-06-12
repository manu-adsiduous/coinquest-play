"use client";

import { useEffect, useState } from "react";
import type { Stats } from "./_types";
import { useRangeQuery } from "./_lib";

function StatCard({
  icon,
  value,
  label,
  color,
  sub,
}: {
  icon: string;
  value: number | string;
  label: string;
  color: string;
  sub?: string;
}) {
  return (
    <div className="pixel-card p-4 text-center">
      <div className="text-xl mb-1">{icon}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-text-secondary mt-1">{label}</div>
      {sub && <div className="text-[10px] text-text-secondary/70 mt-0.5">{sub}</div>}
    </div>
  );
}

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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Hero: audience size */}
      <div className="pixel-card p-4 col-span-2 flex items-center justify-center gap-3">
        <span className="text-3xl">👥</span>
        <div className="text-left">
          <div className="text-3xl font-bold text-pixel-cyan leading-tight">{stats.userCount}</div>
          <div className="text-xs text-text-secondary">Users</div>
        </div>
      </div>

      <StatCard
        icon="🎮"
        value={stats.quizzesTaken}
        label="Quizzes Taken"
        color="text-pixel-blue"
        sub={`${stats.quizzesTakenRegistered} reg · ${stats.quizzesTakenGuest} guest`}
      />
      <StatCard icon="🎁" value={stats.cashouts} label="Cashouts" color="text-roblox-green" />

      <StatCard
        icon="📺"
        value={stats.totalAdsWatched}
        label="Ads Watched"
        color="text-roblox-green"
        sub={`${stats.adsWatchedRegistered} reg · ${stats.adsWatchedGuest} guest`}
      />
      <StatCard icon="📊" value={stats.adsPerUser} label="Ads / User" color="text-pixel-magenta" />
      <StatCard icon="🪙" value={stats.totalCoinsEarned} label="Coins Earned" color="text-coin-gold" />
      <StatCard icon="💰" value={stats.coinsPerUser} label="Coins / User" color="text-coin-gold" />
    </div>
  );
}

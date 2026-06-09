"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";

interface Stats {
  userCount: number;
  totalAdsWatched: number;
  adsPerUser: number;
  totalCoinsEarned: number;
  coinsPerUser: number;
}

interface UserRow {
  id: number;
  email: string;
  username: string;
  coins: number;
  created_at: string;
  quizzes_completed: number;
  total_coins_earned: number;
  redemptions: number;
  acquisition_source: Record<string, string> | null;
}

interface EventRow {
  id: number;
  event_name: string;
  properties: Record<string, unknown>;
  created_at: string;
  username: string | null;
  email: string | null;
}

interface EventSummary {
  event_name: string;
  count: number;
}

interface GiftCard {
  id: number;
  code: string;
  amount: number;
  created_at: string;
  redeemed_at: string | null;
  redeemed_by_email: string | null;
  redeemed_by_username: string | null;
}

interface DayRetention {
  day: number;
  users: number;
  rate: number;
}

interface CohortData {
  week: string;
  size: number;
  weeks: Record<number, { users: number; rate: number }>;
}

interface QuizDepth {
  quiz_count: number;
  user_count: number;
}

const dateRanges = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "this_month", label: "This Month" },
  { key: "last_month", label: "Last Month" },
  { key: "all", label: "All Time" },
];

export default function ConsolePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [range, setRange] = useState("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [gcAvailable, setGcAvailable] = useState(0);
  const [gcRedeemed, setGcRedeemed] = useState(0);
  const [newCodes, setNewCodes] = useState("");
  const [addingCodes, setAddingCodes] = useState(false);
  const [addResult, setAddResult] = useState<string | null>(null);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [eventSummary, setEventSummary] = useState<EventSummary[]>([]);
  const [eventsTotal, setEventsTotal] = useState(0);
  const [userSort, setUserSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "created_at", dir: "desc" });
  const [eventFilterName, setEventFilterName] = useState("");
  const [eventFilterUser, setEventFilterUser] = useState("");
  const [showEventFilter, setShowEventFilter] = useState(false);
  const [userSourceFilter, setUserSourceFilter] = useState("");
  const [showSourceFilter, setShowSourceFilter] = useState(false);
  const [showUserFilter, setShowUserFilter] = useState(false);
  const [dayRetention, setDayRetention] = useState<DayRetention[]>([]);
  const [cohorts, setCohorts] = useState<CohortData[]>([]);
  const [quizDepth, setQuizDepth] = useState<QuizDepth[]>([]);
  const [retentionTotal, setRetentionTotal] = useState(0);

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
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" }
    );
  };

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesName = !eventFilterName || e.event_name === eventFilterName;
      const matchesUser = !eventFilterUser ||
        (e.username && e.username.toLowerCase().includes(eventFilterUser.toLowerCase())) ||
        (e.email && e.email.toLowerCase().includes(eventFilterUser.toLowerCase()));
      return matchesName && matchesUser;
    });
  }, [events, eventFilterName, eventFilterUser]);

  // Check admin access
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    // Server will reject non-admins on API calls
    setAuthorized(true);
  }, [user, loading, router]);

  const fetchStats = useCallback(async () => {
    let url = `/api/console/stats?range=${range}`;
    if (range === "custom" && customFrom) {
      url += `&from=${customFrom}`;
      if (customTo) url += `&to=${customTo}`;
    }
    const res = await fetch(url);
    if (res.ok) {
      setStats(await res.json());
    } else if (res.status === 403) {
      setAuthorized(false);
    }
  }, [range, customFrom, customTo]);

  const fetchUsers = useCallback(async () => {
    let url = `/api/console/users?range=${range}`;
    if (range === "custom" && customFrom) {
      url += `&from=${customFrom}`;
      if (customTo) url += `&to=${customTo}`;
    }
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
  }, [range, customFrom, customTo]);

  const fetchRetention = useCallback(async () => {
    const res = await fetch("/api/console/retention");
    if (res.ok) {
      const data = await res.json();
      setDayRetention(data.dayRetention);
      setCohorts(data.cohorts);
      setQuizDepth(data.quizDepth);
      setRetentionTotal(data.totalUsers);
    }
  }, []);

  const fetchGiftCards = useCallback(async () => {
    const res = await fetch("/api/console/gift-cards");
    if (res.ok) {
      const data = await res.json();
      setGiftCards(data.cards);
      setGcAvailable(data.available);
      setGcRedeemed(data.redeemed);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    let url = `/api/console/events?range=${range}`;
    if (range === "custom" && customFrom) {
      url += `&from=${customFrom}`;
      if (customTo) url += `&to=${customTo}`;
    }
    // Server-side user filter returns the user's full history (not just the
    // global feed slice), so investigations see every event for that user.
    if (eventFilterUser.trim()) {
      url += `&user=${encodeURIComponent(eventFilterUser.trim())}`;
    }
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setEvents(data.events);
      setEventSummary(data.summary);
      setEventsTotal(data.total);
    }
  }, [range, customFrom, customTo, eventFilterUser]);

  useEffect(() => {
    if (!authorized) return;
    fetchStats();
    fetchUsers();
  }, [authorized, fetchStats, fetchUsers]);

  // Debounced so typing in the user filter doesn't fire a request per keystroke.
  useEffect(() => {
    if (!authorized) return;
    const t = setTimeout(fetchEvents, 300);
    return () => clearTimeout(t);
  }, [authorized, fetchEvents]);

  useEffect(() => {
    if (!authorized) return;
    fetchGiftCards();
    fetchRetention();
  }, [authorized, fetchGiftCards, fetchRetention]);

  const handleAddCodes = async () => {
    const codes = newCodes.split("\n").map(c => c.trim()).filter(Boolean);
    if (codes.length === 0) return;
    setAddingCodes(true);
    setAddResult(null);

    const res = await fetch("/api/console/gift-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codes }),
    });
    const data = await res.json();
    setAddResult(`Added ${data.added} card${data.added !== 1 ? "s" : ""}${data.skipped ? `, ${data.skipped} duplicate${data.skipped !== 1 ? "s" : ""} skipped` : ""}`);
    setNewCodes("");
    setAddingCodes(false);
    fetchGiftCards();
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-pixel-cyan border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="pixel-card p-8 text-center">
          <p className="font-pixel text-xs text-roblox-red mb-2">Access Denied</p>
          <p className="text-text-secondary text-sm">You don&apos;t have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-in">
      <h1 className="font-pixel text-base text-white mb-6">Console</h1>

      {/* Date range picker */}
      <div className="flex flex-wrap gap-2 mb-6">
        {dateRanges.map((dr) => (
          <button
            key={dr.key}
            onClick={() => setRange(dr.key)}
            className={`px-4 py-2 rounded-sm text-sm font-bold border-2 transition-all ${
              range === dr.key
                ? "bg-pixel-cyan text-[#0d1b2a] border-black pixel-btn"
                : "bg-card text-text-secondary border-border-pixel hover:border-pixel-cyan hover:text-pixel-cyan"
            }`}
          >
            {dr.label}
          </button>
        ))}
        <button
          onClick={() => setRange("custom")}
          className={`px-4 py-2 rounded-sm text-sm font-bold border-2 transition-all ${
            range === "custom"
              ? "bg-pixel-cyan text-[#0d1b2a] border-black pixel-btn"
              : "bg-card text-text-secondary border-border-pixel hover:border-pixel-cyan hover:text-pixel-cyan"
          }`}
        >
          Custom
        </button>
      </div>

      {/* Custom date range */}
      {range === "custom" && (
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <label className="text-text-secondary text-sm">From</label>
          <input
            type="date"
            value={customFrom}
            onChange={(e) => setCustomFrom(e.target.value)}
            className="pixel-input px-3 py-2 text-sm"
          />
          <label className="text-text-secondary text-sm">To</label>
          <input
            type="date"
            value={customTo}
            onChange={(e) => setCustomTo(e.target.value)}
            className="pixel-input px-3 py-2 text-sm"
          />
        </div>
      )}

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="pixel-card p-4 text-center">
            <div className="text-2xl font-bold text-pixel-cyan">{stats.userCount}</div>
            <div className="text-xs text-text-secondary mt-1">Users</div>
          </div>
          <div className="pixel-card p-4 text-center">
            <div className="text-2xl font-bold text-roblox-green">{stats.totalAdsWatched}</div>
            <div className="text-xs text-text-secondary mt-1">Ads Watched</div>
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
        </div>
      )}

      {/* Two column layout for users and gift cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User list */}
        <div className="pixel-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-pixel text-[10px] text-white">Users ({sortedUsers.length}{userSourceFilter ? ` of ${users.length}` : ""})</h2>
            {userSourceFilter && (
              <button onClick={() => { setUserSourceFilter(""); setShowSourceFilter(false); }} className="text-roblox-red text-[10px] hover:underline">
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
                        onClick={() => { setShowSourceFilter(!showSourceFilter); }}
                        className={`text-[10px] transition-colors ${userSourceFilter ? "text-pixel-magenta" : "text-pixel-magenta/50 hover:text-pixel-magenta"}`}
                      >
                        ▼
                      </button>
                    </span>
                    {showSourceFilter && (
                      <div className="absolute right-0 top-full mt-1 w-44 pixel-card p-2 z-50 slide-up max-h-52 overflow-y-auto">
                        <button
                          onClick={() => { setUserSourceFilter(""); setShowSourceFilter(false); }}
                          className={`w-full text-left px-2 py-1.5 text-xs rounded-sm transition-colors ${!userSourceFilter ? "text-pixel-cyan bg-pixel-cyan/10" : "text-text-secondary hover:text-white hover:bg-card-hover"}`}
                        >
                          All Sources
                        </button>
                        {uniqueSources.map(([src, count]) => (
                          <button
                            key={src}
                            onClick={() => { setUserSourceFilter(src); setShowSourceFilter(false); }}
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
                        <span className={`text-[10px] font-bold ${
                          u.acquisition_source.utm_source === "meta" ? "text-pixel-blue" :
                          u.acquisition_source.utm_source === "google" ? "text-roblox-green" :
                          u.acquisition_source.utm_source === "tiktok" ? "text-pixel-cyan" :
                          "text-text-secondary"
                        }`}>
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
                    <td colSpan={5} className="py-4 text-center text-text-secondary text-xs">No users yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gift cards */}
        <div className="pixel-card p-5">
          <h2 className="font-pixel text-[10px] text-white mb-4">Gift Cards</h2>

          {/* Summary */}
          <div className="flex gap-4 mb-4">
            <div className="bg-[#0d1b2a] border border-roblox-green rounded-sm px-3 py-2 text-center flex-1">
              <div className="text-roblox-green font-bold text-lg">{gcAvailable}</div>
              <div className="text-text-secondary text-[10px]">Available</div>
            </div>
            <div className="bg-[#0d1b2a] border border-text-secondary rounded-sm px-3 py-2 text-center flex-1">
              <div className="text-text-secondary font-bold text-lg">{gcRedeemed}</div>
              <div className="text-text-secondary text-[10px]">Redeemed</div>
            </div>
          </div>

          {/* Add codes */}
          <div className="mb-4">
            <label className="text-text-secondary text-xs font-bold block mb-1">Add Gift Card Codes</label>
            <textarea
              value={newCodes}
              onChange={(e) => setNewCodes(e.target.value)}
              placeholder="Paste codes here (one per line)"
              rows={3}
              className="pixel-input w-full px-3 py-2 text-sm resize-none"
            />
            <button
              onClick={handleAddCodes}
              disabled={addingCodes || !newCodes.trim()}
              className="mt-2 bg-roblox-green text-white font-bold py-2 px-4 rounded-sm pixel-btn text-sm disabled:opacity-50 w-full"
            >
              {addingCodes ? "Adding..." : "Add Codes"}
            </button>
            {addResult && (
              <p className="text-roblox-green text-xs mt-2">{addResult}</p>
            )}
          </div>

          {/* Card list */}
          <div className="max-h-64 overflow-y-auto space-y-2">
            {giftCards.map((card) => (
              <div
                key={card.id}
                className={`bg-[#0d1b2a] rounded-sm p-3 border ${card.redeemed_at ? "border-border-pixel" : "border-roblox-green"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-pixel text-[8px] select-all ${card.redeemed_at ? "text-text-secondary" : "text-roblox-green"}`}>
                    {card.code}
                  </span>
                  <span className={`text-[10px] font-bold ${card.redeemed_at ? "text-roblox-red" : "text-roblox-green"}`}>
                    {card.redeemed_at ? "USED" : "AVAILABLE"}
                  </span>
                </div>
                {card.redeemed_at && (
                  <div className="text-text-secondary text-[10px]">
                    Redeemed by {card.redeemed_by_username} ({card.redeemed_by_email}) on {new Date(card.redeemed_at).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
            {giftCards.length === 0 && (
              <p className="text-text-secondary text-xs text-center py-4">No gift cards in inventory</p>
            )}
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Event summary */}
        <div className="pixel-card p-5">
          <h2 className="font-pixel text-[10px] text-white mb-4">Event Summary ({eventsTotal} total)</h2>
          <div className="space-y-2">
            {eventSummary.map((s) => (
              <div key={s.event_name} className="flex items-center justify-between bg-[#0d1b2a] rounded-sm p-2 border border-border-pixel">
                <span className="text-pixel-cyan text-xs font-bold">{s.event_name}</span>
                <span className="text-coin-gold font-bold text-sm">{s.count}</span>
              </div>
            ))}
            {eventSummary.length === 0 && (
              <p className="text-text-secondary text-xs text-center py-4">No events yet</p>
            )}
          </div>
        </div>

        {/* Recent events */}
        <div className="pixel-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-pixel text-[10px] text-white">Recent Events</h2>
            {(eventFilterName || eventFilterUser) && (
              <button
                onClick={() => { setEventFilterName(""); setEventFilterUser(""); setShowEventFilter(false); setShowUserFilter(false); }}
                className="text-roblox-red text-[10px] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border-pixel text-text-secondary text-xs text-left">
                  <th className="pb-2 pr-3 relative">
                    <span className="flex items-center gap-1.5">
                      Event
                      <button
                        onClick={() => { setShowEventFilter(!showEventFilter); setShowUserFilter(false); }}
                        className={`text-[10px] transition-colors ${eventFilterName ? "text-pixel-magenta" : "text-pixel-magenta/50 hover:text-pixel-magenta"}`}
                      >
                        ▼
                      </button>
                    </span>
                    {showEventFilter && (
                      <div className="absolute left-0 top-full mt-1 w-48 pixel-card p-2 z-50 slide-up max-h-52 overflow-y-auto">
                        <button
                          onClick={() => { setEventFilterName(""); setShowEventFilter(false); }}
                          className={`w-full text-left px-2 py-1.5 text-xs rounded-sm transition-colors ${!eventFilterName ? "text-pixel-cyan bg-pixel-cyan/10" : "text-text-secondary hover:text-white hover:bg-card-hover"}`}
                        >
                          All Events
                        </button>
                        {eventSummary.map((s) => (
                          <button
                            key={s.event_name}
                            onClick={() => { setEventFilterName(s.event_name); setShowEventFilter(false); }}
                            className={`w-full text-left px-2 py-1.5 text-xs rounded-sm transition-colors flex justify-between ${eventFilterName === s.event_name ? "text-pixel-cyan bg-pixel-cyan/10" : "text-text-secondary hover:text-white hover:bg-card-hover"}`}
                          >
                            <span>{s.event_name}</span>
                            <span className="text-coin-gold">{s.count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </th>
                  <th className="pb-2 pr-3 relative">
                    <span className="flex items-center gap-1.5">
                      User
                      <button
                        onClick={() => { setShowUserFilter(!showUserFilter); setShowEventFilter(false); }}
                        className={`text-[10px] transition-colors ${eventFilterUser ? "text-pixel-magenta" : "text-pixel-magenta/50 hover:text-pixel-magenta"}`}
                      >
                        ▼
                      </button>
                    </span>
                    {showUserFilter && (
                      <div className="absolute left-0 top-full mt-1 w-48 pixel-card p-2 z-50 slide-up">
                        <input
                          type="text"
                          placeholder="Search user..."
                          value={eventFilterUser}
                          onChange={(e) => setEventFilterUser(e.target.value)}
                          autoFocus
                          className="pixel-input w-full px-2 py-1.5 text-xs"
                        />
                      </div>
                    )}
                  </th>
                  <th className="pb-2 pr-3">Details</th>
                  <th className="pb-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((e) => (
                  <tr key={e.id} className="border-b border-border-pixel/50">
                    <td className="py-2 pr-3">
                      <span className="text-pixel-cyan font-bold text-xs">{e.event_name}</span>
                    </td>
                    <td className="py-2 pr-3">
                      {e.username ? (
                        <span className="text-white text-xs">{e.username}</span>
                      ) : (
                        <span className="text-text-secondary text-xs">guest</span>
                      )}
                    </td>
                    <td className="py-2 pr-3">
                      <span className="text-text-secondary text-[10px]">
                        {Object.entries(e.properties || {}).map(([k, v]) => `${k}: ${v}`).join(", ") || "—"}
                      </span>
                    </td>
                    <td className="py-2 text-text-secondary text-[10px] whitespace-nowrap">
                      {new Date(e.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {filteredEvents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-text-secondary text-xs">No events yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Retention */}
      <div className="mt-6">
        <h2 className="font-pixel text-[10px] text-white mb-4">Retention</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Day-N Retention */}
          <div className="pixel-card p-5">
            <h3 className="text-text-secondary text-xs font-bold mb-3">Day-N Retention ({retentionTotal} users)</h3>
            <div className="space-y-2">
              {dayRetention.map((d) => (
                <div key={d.day} className="flex items-center gap-3">
                  <span className="text-text-secondary text-xs w-12">Day {d.day}</span>
                  <div className="flex-1 pixel-progress" style={{ height: "12px" }}>
                    <div
                      className="pixel-progress-fill"
                      style={{ width: `${Math.min(d.rate, 100)}%`, height: "100%" }}
                    />
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
                      <th key={w} className="pb-1 pr-1 text-center">W{w}</th>
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
                      <td colSpan={6} className="py-4 text-center text-text-secondary">Not enough data yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

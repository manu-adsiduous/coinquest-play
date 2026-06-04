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

  const sortedUsers = useMemo(() => {
    const sorted = [...users];
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
  }, [users, userSort]);

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
    const res = await fetch("/api/console/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
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
    const res = await fetch("/api/console/events?limit=50");
    if (res.ok) {
      const data = await res.json();
      setEvents(data.events);
      setEventSummary(data.summary);
      setEventsTotal(data.total);
    }
  }, []);

  useEffect(() => {
    if (!authorized) return;
    fetchStats();
  }, [authorized, fetchStats]);

  useEffect(() => {
    if (!authorized) return;
    fetchUsers();
    fetchGiftCards();
    fetchEvents();
  }, [authorized, fetchUsers, fetchGiftCards, fetchEvents]);

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
          <h2 className="font-pixel text-[10px] text-white mb-4">Users ({users.length})</h2>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
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
                    <td className="py-2">
                      {u.redemptions > 0 ? (
                        <span className="text-roblox-green font-bold">{u.redemptions}</span>
                      ) : (
                        <span className="text-text-secondary">0</span>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-text-secondary text-xs">No users yet</td>
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
          <h2 className="font-pixel text-[10px] text-white mb-3">Recent Events</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            <select
              value={eventFilterName}
              onChange={(e) => setEventFilterName(e.target.value)}
              className="pixel-input px-2 py-1.5 text-xs"
            >
              <option value="">All Events</option>
              {eventSummary.map((s) => (
                <option key={s.event_name} value={s.event_name}>{s.event_name} ({s.count})</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Filter by user..."
              value={eventFilterUser}
              onChange={(e) => setEventFilterUser(e.target.value)}
              className="pixel-input px-2 py-1.5 text-xs flex-1 min-w-[120px]"
            />
            {(eventFilterName || eventFilterUser) && (
              <button
                onClick={() => { setEventFilterName(""); setEventFilterUser(""); }}
                className="text-text-secondary text-xs hover:text-pixel-cyan px-2"
              >
                Clear
              </button>
            )}
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border-pixel text-text-secondary text-xs text-left">
                  <th className="pb-2 pr-3">Event</th>
                  <th className="pb-2 pr-3">User</th>
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
    </div>
  );
}

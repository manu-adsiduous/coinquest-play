"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { EventRow, EventSummary } from "../_types";
import { useRangeQuery } from "../_lib";

export default function EventsPage() {
  const { qs } = useRangeQuery();
  const sp = useSearchParams();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [eventSummary, setEventSummary] = useState<EventSummary[]>([]);
  const [eventsTotal, setEventsTotal] = useState(0);
  const [eventFilterName, setEventFilterName] = useState("");
  // Initialized from a ?user= link (e.g. clicking a user's event count); the
  // server then filters the feed, total, and summary by this user.
  const [eventFilterUser, setEventFilterUser] = useState(() => sp.get("user") || "");
  const [showEventFilter, setShowEventFilter] = useState(false);
  const [showUserFilter, setShowUserFilter] = useState(false);

  const fetchEvents = useCallback(async () => {
    let url = `/api/console/events?${qs}`;
    // Both filters are server-side so a filtered view sees the COMPLETE matching
    // set in range, not just whatever falls in the recent feed.
    if (eventFilterUser.trim()) {
      url += `&user=${encodeURIComponent(eventFilterUser.trim())}`;
    }
    if (eventFilterName) {
      url += `&event=${encodeURIComponent(eventFilterName)}`;
    }
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setEvents(data.events);
      setEventSummary(data.summary);
      setEventsTotal(data.total);
    }
  }, [qs, eventFilterUser, eventFilterName]);

  // Debounced so typing in the user filter doesn't fire a request per keystroke.
  useEffect(() => {
    const t = setTimeout(fetchEvents, 300);
    return () => clearTimeout(t);
  }, [fetchEvents]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              onClick={() => {
                setEventFilterName("");
                setEventFilterUser("");
                setShowEventFilter(false);
                setShowUserFilter(false);
              }}
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
                      onClick={() => {
                        setShowEventFilter(!showEventFilter);
                        setShowUserFilter(false);
                      }}
                      className={`text-[10px] transition-colors ${eventFilterName ? "text-pixel-magenta" : "text-pixel-magenta/50 hover:text-pixel-magenta"}`}
                    >
                      ▼
                    </button>
                  </span>
                  {showEventFilter && (
                    <div className="absolute left-0 top-full mt-1 w-48 pixel-card p-2 z-50 slide-up max-h-52 overflow-y-auto">
                      <button
                        onClick={() => {
                          setEventFilterName("");
                          setShowEventFilter(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 text-xs rounded-sm transition-colors ${!eventFilterName ? "text-pixel-cyan bg-pixel-cyan/10" : "text-text-secondary hover:text-white hover:bg-card-hover"}`}
                      >
                        All Events
                      </button>
                      {eventSummary.map((s) => (
                        <button
                          key={s.event_name}
                          onClick={() => {
                            setEventFilterName(s.event_name);
                            setShowEventFilter(false);
                          }}
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
                      onClick={() => {
                        setShowUserFilter(!showUserFilter);
                        setShowEventFilter(false);
                      }}
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
              {events.map((e) => (
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
              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-text-secondary text-xs">
                    No events yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

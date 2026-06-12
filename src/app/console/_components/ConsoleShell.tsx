"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { dateRanges } from "../_lib";

const NAV = [
  { href: "/console", label: "Overview" },
  { href: "/console/users", label: "Users" },
  { href: "/console/events", label: "Events" },
  { href: "/console/ledger", label: "Ledger" },
  { href: "/console/retention", label: "Retention" },
  { href: "/console/gift-cards", label: "Gift Cards" },
];

// Sections that fetch by date range (so we only show the picker there).
const DATE_ROUTES = new Set(["/console", "/console/users", "/console/events", "/console/ledger"]);

export default function ConsoleShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const sp = useSearchParams();

  const range = sp.get("range") || "all";
  const customFrom = sp.get("from") || "";
  const customTo = sp.get("to") || "";
  const qs = sp.toString();

  const update = (patch: Record<string, string | null>) => {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) params.set(k, v);
      else params.delete(k);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const setRange = (r: string) =>
    r === "custom" ? update({ range: "custom" }) : update({ range: r, from: null, to: null });

  const rangeBtn = (active: boolean) =>
    `px-4 py-2 rounded-sm text-sm font-bold border-2 transition-all ${
      active
        ? "bg-pixel-cyan text-[#0d1b2a] border-black pixel-btn"
        : "bg-card text-text-secondary border-border-pixel hover:border-pixel-cyan hover:text-pixel-cyan"
    }`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="md:w-44 flex-shrink-0">
        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={qs ? `${item.href}?${qs}` : item.href}
                className={`px-3 py-2 rounded-sm text-sm font-bold border-2 whitespace-nowrap transition-all ${
                  active
                    ? "bg-pixel-cyan text-[#0d1b2a] border-black pixel-btn"
                    : "bg-card text-text-secondary border-border-pixel hover:border-pixel-cyan hover:text-pixel-cyan"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 fade-in">
        {DATE_ROUTES.has(pathname) && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {dateRanges.map((dr) => (
                <button key={dr.key} onClick={() => setRange(dr.key)} className={rangeBtn(range === dr.key)}>
                  {dr.label}
                </button>
              ))}
              <button onClick={() => setRange("custom")} className={rangeBtn(range === "custom")}>
                Custom
              </button>
            </div>

            {range === "custom" && (
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <label className="text-text-secondary text-sm">From</label>
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => update({ from: e.target.value })}
                  className="pixel-input px-3 py-2 text-sm"
                />
                <label className="text-text-secondary text-sm">To</label>
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => update({ to: e.target.value })}
                  className="pixel-input px-3 py-2 text-sm"
                />
              </div>
            )}
          </>
        )}

        {children}
      </div>
    </div>
  );
}

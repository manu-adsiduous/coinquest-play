"use client";

import { useSearchParams } from "next/navigation";

export const dateRanges = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "this_month", label: "This Month" },
  { key: "last_month", label: "Last Month" },
  { key: "all", label: "All Time" },
];

/**
 * Reads the date range from the URL (?range=&from=&to=) — shared across console
 * sections so the picker in the shell drives every page. Returns `qs`, the query
 * string to pass to the /api/console/* endpoints.
 */
export function useRangeQuery() {
  const sp = useSearchParams();
  const range = sp.get("range") || "all";
  const from = sp.get("from") || "";
  const to = sp.get("to") || "";

  let qs = `range=${range}`;
  if (range === "custom" && from) {
    qs += `&from=${from}`;
    if (to) qs += `&to=${to}`;
  }

  return { range, from, to, qs };
}

/** Parse date range params into start/end ISO strings */
export function parseDateRange(
  range: string,
  from?: string | null,
  to?: string | null,
): { start?: string; end?: string } {
  const now = new Date();

  if (range === "today") {
    return { start: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString() };
  }
  if (range === "yesterday") {
    return {
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString(),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString(),
    };
  }
  if (range === "this_month") {
    return { start: new Date(now.getFullYear(), now.getMonth(), 1).toISOString() };
  }
  if (range === "last_month") {
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(),
      end: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
    };
  }
  if (range === "custom" && from) {
    const start = new Date(from).toISOString();
    const end = to ? new Date(new Date(to).getTime() + 86400000).toISOString() : undefined;
    return { start, end };
  }

  return {}; // "all" — no filter
}

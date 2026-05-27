interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

function getStore(name: string): Map<string, RateLimitEntry> {
  if (!stores.has(name)) stores.set(name, new Map());
  return stores.get(name)!;
}

/**
 * Simple in-memory rate limiter.
 * Returns { allowed: true } or { allowed: false, retryAfterSecs }.
 */
export function rateLimit(
  name: string,
  key: string,
  maxRequests: number,
  windowMs: number,
): { allowed: boolean; retryAfterSecs?: number } {
  const store = getStore(name);
  const now = Date.now();

  // Clean expired entries periodically
  if (Math.random() < 0.01) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSecs: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true };
}

/** Get client IP from request headers */
export function getClientIp(headersList: Headers): string {
  return headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

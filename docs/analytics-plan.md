# Analytics & Revenue in the Console — Plan

Goal: bring **AdSense revenue** and **engagement analytics** (e.g. time on site)
into the admin console, so revenue sits next to our user/engagement data and we
can compute the cross-metrics that actually matter — **revenue per DAU, revenue
per ad view, ARPU**.

Both follow the same shape: external API → **scheduled ingest into a DB cache** →
console section reads the cache. Admin-only throughout (console auth is already
server-side); secrets in Vercel; no public endpoints.

## A. AdSense revenue

- **Source:** AdSense Management API v2 — the only programmatic source for
  earnings / impressions / RPM. (No API-key option; it's OAuth.)
- **Auth:** one-time OAuth2 with the AdSense scope → store a **refresh token**
  (service accounts are NOT supported for AdSense). Refresh token in a Vercel
  secret; mint access tokens server-side.
- **Ingestion:** a **daily Vercel cron** pulls reports → upserts into an
  `adsense_daily` cache table, re-fetching the last ~3 days (estimates finalize
  late). Keeps the console fast and within API limits.
- **Dimensions/metrics:** by date + ad format (rewarded / display / interstitial)
  and optionally per ad unit; earnings, impressions, ad requests, matched, clicks,
  impression RPM, currency.
- **Console "Revenue" section** (date-range driven): total estimated earnings +
  trend, by-format breakdown, RPM, and **cross-metrics joining our data** —
  revenue ÷ DAU, revenue ÷ ad views (our `quiz_unlocked` + `quiz_completed`),
  ARPU. (AdSense is aggregate, so no per-user revenue — only daily-level joins.)
- **Caveats:** earnings are **estimated and delayed**; **admin-only** display
  (don't surface AdSense earnings publicly, per ToS); single currency.

```sql
CREATE TABLE adsense_daily (
  date DATE NOT NULL,
  ad_format TEXT NOT NULL,        -- rewarded | display | interstitial | total
  earnings NUMERIC,
  impressions INTEGER,
  ad_requests INTEGER,
  matched_requests INTEGER,
  clicks INTEGER,
  impression_rpm NUMERIC,
  currency TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (date, ad_format)
);
```

## B. Engagement analytics (time on site)

Two sources — recommend GA4 because it's already installed, accurate, and covers
guests:

- **Option 1 — GA4 Data API (recommended).** GA is already in the app
  (`NEXT_PUBLIC_GA_MEASUREMENT_ID`). GA4 natively measures **engagement time**,
  sessions, and covers **guests** (own client ID — which our events table can't).
  Auth via a **service account** (easier than AdSense; GA4 supports it). Pull avg
  engagement time / sessions / sessions-per-user into the console, cron-cached.
- **Option 2 — derive from our `events` table (no new auth).** Sessionize by an
  inactivity gap (~30 min), compute session duration, avg session length,
  sessions/user. Works on existing data but **registered users only** (guests have
  no session id — needs the deferred anonymous-id). Rougher; fine as a zero-
  dependency first cut.
- **Console "Engagement"** (or folded into Retention/Overview): avg session
  duration, sessions per user, time-on-site trend.

## Phasing

- [ ] **0. Access setup** (you): Google Cloud project; AdSense OAuth → refresh
      token; (if GA4) service account with GA4 read access. Env secrets +
      `CRON_SECRET` for the cron route.
- [ ] **1. AdSense ingestion:** `adsense_daily` table + fetch lib + daily cron
      (protected route; upsert recent days).
- [ ] **2. Console Revenue section:** trend, by-format, RPM, cross-metrics.
- [ ] **3. Engagement:** GA4 Data API ingestion (or events-derived fallback) →
      Console Engagement section.

## Decisions to align on

1. **AdSense dimensions:** format only, or also per ad-unit (our four slots)?
2. **Engagement source:** GA4 Data API (accurate, covers guests, needs a service
   account) vs events-derived (registered-only, no new auth) — start with which?
3. **Cron cadence:** daily is enough (AdSense data is delayed); GA4 daily too.

## Security

Admin-only (server-side console auth). AdSense refresh token / GA service-account
key as Vercel secrets. The cron ingest route is protected (Vercel `CRON_SECRET`
header), not a public endpoint.

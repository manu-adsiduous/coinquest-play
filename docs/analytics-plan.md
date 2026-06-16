# Analytics, Revenue & Acquisition-Cost in the Console — Plan

Goal: unify in the admin console — AdSense **revenue**, **engagement** (time on
site), and **acquisition cost / ad spend** (Google Ads, Meta, TikTok) — to get a
**marketing P&L**: revenue vs spend, **CAC by source**, **ROAS**, ARPU, net.

Shape (all three): external API → **hourly cron → DB cache tables** → admin-only
console section reads the cache. Admin-only throughout; all secrets in Vercel;
**no ad-platform token ever reaches the browser**.

> Cadence: **hourly**. Caveat — intraday numbers from every source are
> provisional (AdSense earnings are rough estimates; GA4 intraday lags; ad-spend
> settles through the day). Hourly gives near-real-time *trends*; the previous
> day's finalized figures are the authoritative ones. Each hourly run re-fetches
> the last few days so estimates self-correct.

## A. Revenue — AdSense

- AdSense Management API v2; one-time **OAuth → refresh token** (service accounts
  unsupported for AdSense), stored as a Vercel secret.
- Hourly cron → `adsense_daily` cache (by date + ad format). Console **Revenue**
  section: earnings trend, by-format, RPM, plus cross-metrics joining our data —
  revenue ÷ DAU, revenue ÷ ad views, ARPU. Admin-only per ToS.

## B. Engagement — GA4 (preferred) or events-derived

- **GA4 Data API** (recommended): GA already installed, measures engagement time
  accurately, covers **guests** (own client id). Service-account auth.
- Fallback: derive sessions from our `events` table (registered-only, no new auth,
  rougher). Console **Engagement**: avg session duration, sessions/user, trend.

## C. Acquisition cost — ad spend (NEW)

- **Platforms & auth (each is its own integration):**
  - **Google Ads API** — OAuth + a **developer token** (needs Google approval) + customer id.
  - **Meta Marketing API** — long-lived / Business-Manager **system-user token** + ad account id.
  - **TikTok Marketing API** — developer app **access token** + advertiser id.
- **Console-managed ad accounts:** admin adds an ad account (platform + external
  account id + friendly label) and **picks a credential from a dropdown** of
  pre-provisioned access tokens. The dropdown shows **labels only** — raw tokens
  live in Vercel secrets and are resolved to a token **server-side** by the cron;
  they are never sent to the browser or stored in plaintext. Stored in `ad_accounts`.
- **Ingestion:** hourly cron iterates enabled `ad_accounts`, pulls spend (by date,
  ideally by campaign, normalized to a `utm_source`) → `ad_spend` cache.
- **Console "Acquisition" section:** spend by source over time; **CAC by source** =
  spend ÷ signups attributed to that `utm_source` (we already store
  `acquisition_source`); blended **ROAS** = AdSense revenue ÷ total spend; **net**
  = revenue − spend. Pair CAC-by-source with the per-source retention/engagement
  we can already compute → which sources bring *profitable, sticky* users.

```sql
CREATE TABLE ad_accounts (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,            -- google | meta | tiktok
  external_account_id TEXT NOT NULL,
  credential_label TEXT NOT NULL,    -- chosen from the dropdown; resolves to a secret server-side
  label TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (platform, external_account_id)
);

CREATE TABLE ad_spend (
  id SERIAL PRIMARY KEY,
  ad_account_id INTEGER NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  date DATE NOT NULL,
  campaign TEXT,
  utm_source TEXT,                   -- normalized: google | meta | tiktok
  spend NUMERIC,
  clicks INTEGER,
  impressions INTEGER,
  currency TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (ad_account_id, date, campaign)
);
```

## Phasing (each integration lands independently)

- [ ] **0. Access setup** (you): AdSense OAuth refresh token; GA4 service account;
      ad-platform creds (Google Ads dev token + OAuth, Meta system-user token,
      TikTok access token) → Vercel secrets, each with a **label**. `CRON_SECRET`.
      ⚠️ The ad-platform creds have **approval lead times** (esp. Google Ads
      developer token, Meta app review) — start these early.
- [ ] **1. Hourly cron framework** + AdSense ingest + Revenue section.
- [ ] **2. Engagement** ingest (GA4 or events) + Engagement section.
- [ ] **3. Ad-account management** (`ad_accounts` CRUD + credential-label dropdown)
      + per-platform spend ingest + Acquisition section (CAC / ROAS / net).
      Start with whichever platform you spend the most on.

## Decisions to align on

1. **Credential storage:** env-secret + labels (simplest, recommended) vs an
   encrypted DB credentials table.
2. **Spend granularity:** account-level vs campaign-level (campaign maps to
   utm_source/campaign more precisely → better CAC).
3. **CAC attribution:** `utm_source` on signup is our basis — accept its
   imperfection (organic/direct unattributed) or refine later.
4. **Engagement source:** GA4 Data API vs events-derived (still open).
5. **Build vs offload:** maintaining 3 ad-platform APIs is real ongoing work
   (Meta deprecates API versions ~yearly, Google Ads needs token approval). In-house
   gives the custom CAC joins; a connector/Looker could aggregate spend but can't
   join your DB. Recommend in-house for the joins, but go one platform at a time.

## Security

Admin-only (server-side console auth). AdSense/GA/ad-platform secrets in Vercel;
the console only ever shows credential **labels**; cron ingest route protected by
`CRON_SECRET`; no token reaches the browser; never store raw tokens in plaintext.

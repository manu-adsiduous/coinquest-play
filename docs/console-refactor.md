# Console Refactor Plan

Splitting the single monolithic admin console (`src/app/console/page.tsx`, ~770 lines)
into dedicated, routed sections under `/console`, each able to grow into a more robust
tool. The backend is already modular (one API route per section), so this is mostly a
**frontend decomposition + routing + shared-shell** job — not a rewrite.

## Decisions locked for v1

- **Data fetching:** keep client-side `fetch` (reuse existing `/api/console/*` routes).
- **Navigation:** left **sidebar** (scales better as sections grow).
- **Scope:** **re-organize only** — move what exists into routed pages; no new analytics
  in v1. New sections (per-user drill-down, Economy/ledger) come in v2.

## Target structure (Next.js App Router nested routes)

```
src/app/console/
  layout.tsx          ← shared shell: admin auth guard, sidebar nav, date-range picker
  page.tsx            ← Overview (stat cards)
  users/page.tsx      ← Users
  events/page.tsx     ← Events
  gift-cards/page.tsx ← Gift Cards
  retention/page.tsx  ← Retention
```

## Shared concerns to centralize (in the layout)

1. **Auth** — move the guard into `console/layout.tsx`. Prefer a server component that
   calls `getAdminUser()` and `redirect("/login")` for non-admins, so non-admins never
   load the console chrome. Keep the per-route `getAdminUser()` API checks too (defense
   in depth).
2. **Date range** — lift out of per-page React state into **URL query params**
   (`?range=this_month&from=…&to=…`). The picker (in the layout) updates the URL; each
   section reads it; state survives navigation and links are shareable.
3. **Navigation** — sidebar in the layout, highlighting the active section.

## Section breakdown (today → growth room)

| Section | Today | v2+ growth room |
|---|---|---|
| **Overview** | the 6 stat cards | trend charts, headline funnel |
| **Users** | sortable table + source filter | search, pagination, per-user detail page (`users/[id]`) reusing the per-user event history |
| **Events** | summary + recent log | server-side pagination, export, richer filters |
| **Gift Cards** | inventory + add codes | redemption history, low-stock alerts |
| **Retention** | day-N, cohorts, quiz depth | more funnels, segment-by-source |
| **Economy** *(new in v2)* | — | coins/ledger view on the `coin_transactions` table |

## Migration steps (incremental, low-risk — each ships independently)

- [ ] **1. Shell:** add `console/layout.tsx` with sidebar nav + auth guard + URL-based
      date-range picker. Keep the current monolithic page as Overview — nothing breaks.
- [ ] **2. Extract shared bits:** move `Stats`/`UserRow`/`EventRow`/etc. interfaces and
      small UI pieces (`StatCard`, `DateRangePicker`) into shared modules
      (e.g. `src/app/console/_components/`, `src/app/console/_types.ts`).
- [ ] **3. First section (proof of concept):** move **Gift Cards** (most self-contained)
      into `console/gift-cards/page.tsx`; delete it from the old page.
- [ ] **4. Move the rest one at a time:** Users → Events → Retention, deleting each from
      the old page as it lands. The page shrinks until it's just the Overview.
- [ ] **5. Cleanup:** Overview page holds only the stat cards.

## Deferred to v2 (after the structure is in place)

- Server-component data fetching (fetch via `getDb()` directly; interactive bits as
  client islands) — faster + more secure than client `fetch`.
- Per-user drill-down page (`users/[id]`).
- Economy/ledger section.
- Acquisition/marketing analytics section.

## Reference: current API routes (already modular)

`/api/console/stats`, `/api/console/users`, `/api/console/events`,
`/api/console/gift-cards`, `/api/console/retention`.
Admin identification: `ADMIN_EMAILS` (exported from `src/lib/auth.ts`); admins are
already excluded from stats/users/retention (but kept visible in the events table).

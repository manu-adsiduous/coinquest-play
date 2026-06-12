# Email Plan — Transactional + Verification Bonus

Scope for now: **transactional email only** (email verification, with a **20-coin
bonus** for confirming). Marketing/lifecycle emails are explicitly deferred — and
gated behind a COPPA/kids-audience compliance review before we touch them.

Hard requirement: **abuse-proof.** Every endpoint is gated, rate-limited, and
idempotent; the bonus can be earned **exactly once per account** and only via a
valid emailed token. No endpoint grants coins or sends mail without proper auth.

## Provider

**Resend** for sending (simple, Next.js-friendly, good deliverability).
- Phase 0 (your task): create Resend account, add + verify the sending domain
  (DKIM/SPF/DMARC DNS records on `coinquestgames.com`, ideally a `mail.` subdomain),
  get an API key.
- Env vars (Vercel): `RESEND_API_KEY`, `EMAIL_FROM` (e.g. `CoinQuest <noreply@coinquestgames.com>`),
  `APP_URL` (for building ver/link URLs).

## Endpoint security model (the abuse-proofing core)

- **Initial verification email is sent server-side inside the signup route** — no
  public "send me an email" endpoint to abuse for the first send.
- **`POST /api/auth/verify-email`** — the only token-facing endpoint. Auth = the
  token itself (unguessable, hashed-at-rest, single-use, 24h expiry, bound to one
  user). Rate-limited per IP. Without a valid token it does nothing.
- **`POST /api/auth/send-verification`** (resend) — **session-required**, so a user
  can only (re)send to *their own* email. Durable rate limit (≤1 per ~2 min/user)
  + per-IP limit → can't email-bomb anyone, no email enumeration.
- **No standalone "claim bonus" endpoint.** The 20 coins are granted *only* as part
  of a successful verify-email transaction. You cannot call anything to mint coins.
- **Idempotent bonus** via an atomic guard:
  `UPDATE users SET email_verified = TRUE, coins = coins + 20 WHERE id = $1 AND email_verified = FALSE RETURNING coins`
  — 0 rows affected ⇒ already verified ⇒ no double grant (race-safe). The +20 is
  written to the `coin_transactions` ledger (`reason = 'email_verify_bonus'`) only
  when a row was actually updated.

## Data model (migration)

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,        -- sha256 of the random token; raw token only in the email
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_evt_user ON email_verification_tokens(user_id);
```

## Step-by-step build

- [ ] **0. Provider setup** (you): Resend account, verified sending domain, env vars.
- [ ] **1. Migration**: `email_verified` column + `email_verification_tokens` table
      (idempotent; update `neon-schema.sql`).
- [ ] **2. Email + token libs**: `lib/email.ts` (Resend `sendEmail`), `lib/verification.ts`
      (generate 32-byte token, store sha256 hash + 24h expiry, build verify URL).
- [ ] **3. Send on signup**: after user creation in the signup route, generate a token
      and send the verification email. Non-blocking (don't fail signup if mail errors).
- [ ] **4. Verify endpoint + page**: `POST /api/auth/verify-email` (validate token →
      atomic grant 20 coins once → mark verified + token used → ledger row); a
      `/verify-email` page that calls it and shows "Email verified! +20 coins."
- [ ] **5. Resend + UI**: unverified-user banner (e.g. on profile/home) with a
      session-gated, rate-limited resend; show verified status in profile.
- [ ] **6. Hardening pass**: confirm rate limits, idempotency, token single-use,
      ledger entries; add a disposable-email-domain denylist (see below).

## Open decisions (flag before/with build)

- **Require verified email to cash out?** Strong anti-abuse lever — every
  cashout account would need a real, reachable inbox, which throttles the
  multi-account-cashout pattern. Adds friction. (Recommend: yes, eventually.)
- **Disposable/temp-email denylist** at signup or before sending — blocks the
  cheapest throwaway-account route. (Recommend: yes.)
- **Bonus value**: 20 coins (locked per request). Note 200 coins = cashout, so
  ~10 verified accounts = one cashout from bonuses alone — the denylist +
  verify-for-cashout above are what keep this from being farmable.

## Deferred (not now)

Marketing/lifecycle emails (re-engagement, win-back, bonus offers, ad-free
unlocks) — pending a COPPA/kids compliance review and a lifecycle provider
choice (Loops vs Customer.io). Reward redemption for those will reuse the same
tokenized-link + ledger pattern established here.

-- CoinQuest Play - Neon Postgres Database Schema
-- Run this in the Neon SQL Editor or via psql to set up your database

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  coins INTEGER DEFAULT 0,
  avatar TEXT DEFAULT '👤',
  acquisition_source JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz completions tracking
CREATE TABLE IF NOT EXISTS quiz_completions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  coins_earned INTEGER DEFAULT 0,    -- best coins ever earned for this quiz (cap 4)
  coins_paid INTEGER NOT NULL DEFAULT 0,  -- coins actually credited to balance (<= coins_earned)
  coins_claimed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, quiz_id)
);

-- Gift card codes for Robux redemption
CREATE TABLE IF NOT EXISTS gift_cards (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  amount INTEGER DEFAULT 200,
  redeemed_by INTEGER REFERENCES users(id),
  redeemed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events (client-fired via /api/track + server CAPI)
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Immutable coin ledger — one row per balance change, for audit + reconciliation
CREATE TABLE IF NOT EXISTS coin_transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  delta INTEGER NOT NULL,            -- +earned, -spent
  reason TEXT NOT NULL,              -- quiz_complete | guest_signup | cashout
  ref TEXT,                          -- quiz_id or gift card code
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_completions_user ON quiz_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_completions_quiz ON quiz_completions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_gift_cards_unredeemed ON gift_cards(redeemed_by) WHERE redeemed_by IS NULL;
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_events_user ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_coin_tx_user ON coin_transactions(user_id);

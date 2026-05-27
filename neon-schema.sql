-- CoinQuest Play - Neon Postgres Database Schema
-- Run this in the Neon SQL Editor or via psql to set up your database

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  coins INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz completions tracking
CREATE TABLE IF NOT EXISTS quiz_completions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  coins_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, quiz_id)
);

-- Gift card codes for Robux redemption
CREATE TABLE IF NOT EXISTS gift_cards (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  amount INTEGER DEFAULT 400,
  redeemed_by INTEGER REFERENCES users(id),
  redeemed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_completions_user ON quiz_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_completions_quiz ON quiz_completions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_gift_cards_unredeemed ON gift_cards(redeemed_by) WHERE redeemed_by IS NULL;
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

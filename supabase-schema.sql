-- CoinQuest Play - Supabase Database Schema
-- Run this in the Supabase SQL Editor to set up your database

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  coins INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz completions tracking
CREATE TABLE IF NOT EXISTS quiz_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, quiz_id)
);

-- Gift card codes for Robux redemption
CREATE TABLE IF NOT EXISTS gift_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  amount INTEGER DEFAULT 400,
  redeemed_by UUID REFERENCES profiles(id),
  redeemed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Quiz completions: users can read/insert their own completions
CREATE POLICY "Users can view own completions" ON quiz_completions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions" ON quiz_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Gift cards: users can view unredeemed cards (for redemption)
CREATE POLICY "Users can view available gift cards" ON gift_cards
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can redeem gift cards" ON gift_cards
  FOR UPDATE USING (auth.uid() IS NOT NULL AND redeemed_by IS NULL);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_completions_user ON quiz_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_completions_quiz ON quiz_completions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_gift_cards_unredeemed ON gift_cards(redeemed_by) WHERE redeemed_by IS NULL;

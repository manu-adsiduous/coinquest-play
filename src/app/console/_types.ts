export interface Stats {
  userCount: number;
  cashouts: number;
  quizzesTaken: number;
  quizzesTakenGuest: number;
  quizzesTakenRegistered: number;
  totalAdsWatched: number;
  adsWatchedGuest: number;
  adsWatchedRegistered: number;
  adsPerUser: number;
  totalCoinsEarned: number;
  coinsPerUser: number;
}

export interface UserRow {
  id: number;
  email: string;
  username: string;
  coins: number;
  created_at: string;
  quizzes_completed: number;
  total_coins_earned: number;
  redemptions: number;
  events_count: number;
  acquisition_source: Record<string, string> | null;
}

export interface EventRow {
  id: number;
  event_name: string;
  properties: Record<string, unknown>;
  created_at: string;
  username: string | null;
  email: string | null;
}

export interface EventSummary {
  event_name: string;
  count: number;
}

export interface GiftCard {
  id: number;
  code: string;
  amount: number;
  created_at: string;
  redeemed_at: string | null;
  redeemed_by_email: string | null;
  redeemed_by_username: string | null;
}

export interface DayRetention {
  day: number;
  users: number;
  rate: number;
}

export interface CohortData {
  week: string;
  size: number;
  weeks: Record<number, { users: number; rate: number }>;
}

export interface QuizDepth {
  quiz_count: number;
  user_count: number;
}

export interface LedgerTransaction {
  id: number;
  delta: number;
  reason: string;
  ref: string | null;
  created_at: string;
  username: string | null;
  email: string | null;
}

export interface LedgerByReason {
  reason: string;
  count: number;
  total: number;
}

export interface LedgerTotals {
  count: number;
  earned: number;
  spent: number;
  net: number;
}

/** Calculate coins earned based on quiz score (out of 10 questions) */
export function scoreToCoins(score: number): number {
  if (score >= 8) return 4;
  if (score >= 6) return 3;
  if (score >= 4) return 2;
  if (score >= 1) return 1;
  return 0;
}

/** Max coins possible per quiz */
export const MAX_COINS_PER_QUIZ = 4;

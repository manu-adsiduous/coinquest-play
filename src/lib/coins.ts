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

/**
 * Grade submitted answers against a quiz's answer key, server-side.
 * Returns the number of correct answers (0–10). Anything not matching the key
 * (wrong index, missing entry, non-array) simply doesn't count — so a malformed
 * or absent submission grades to 0 rather than throwing.
 */
export function gradeAnswers(
  answers: unknown,
  quiz: { questions: { correctAnswer: number }[] },
): number {
  if (!Array.isArray(answers)) return 0;
  let score = 0;
  for (let i = 0; i < quiz.questions.length; i++) {
    if (answers[i] === quiz.questions[i].correctAnswer) score++;
  }
  return score;
}

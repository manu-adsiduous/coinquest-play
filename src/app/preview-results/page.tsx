"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import ShareSheet from "@/components/ShareSheet";
import { scoreToCoins, MAX_COINS_PER_QUIZ } from "@/lib/coins";

export default function PreviewResultsPage() {
  const { user } = useAuth();
  const [score, setScore] = useState(8);
  const [showShareSheet, setShowShareSheet] = useState(false);

  const quiz = {
    id: "preview",
    title: "Naruto Characters & Jutsu Quiz",
    emoji: "🍥",
    category: "Anime",
    questions: { length: 10 },
  };

  const coinsEarned = scoreToCoins(score);
  const rank = score === 10 ? "🌟" : score >= 5 ? "🎉" : "💪";
  const rankText = score === 10 ? "Perfect Score!" : score >= 5 ? "Great Job!" : "Keep Trying!";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Score picker */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {[0, 2, 4, 6, 8, 10].map((s) => (
          <button
            key={s}
            onClick={() => setScore(s)}
            className={`px-4 py-2 rounded-sm text-sm font-bold border-2 ${
              score === s ? "bg-pixel-cyan text-[#0d1b2a] border-black pixel-btn" : "bg-card text-text-secondary border-border-pixel"
            }`}
          >
            {s}/10
          </button>
        ))}
      </div>

      {/* Simulated results screen */}
      <div className="pixel-card p-8 text-center fade-in">
        <div className="text-6xl mb-4">{rank}</div>
        <h2 className="font-pixel text-xs md:text-sm text-white mb-2">{rankText}</h2>
        <p className="text-4xl font-extrabold text-pixel-cyan mb-2">{score} / 10</p>
        <p className="text-text-secondary mb-4">correct answers</p>

        {coinsEarned > 0 && (
          <div className="bg-coin-gold/10 border-2 border-coin-gold rounded-sm p-4 mb-4 slide-up">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="pixel-coin coin-bounce">C</span>
              <span className="text-coin-gold font-bold text-lg">+{coinsEarned} coin{coinsEarned !== 1 ? "s" : ""} earned!</span>
            </div>
            <p className="text-text-secondary text-xs">
              {coinsEarned}/{MAX_COINS_PER_QUIZ} coins for this quiz
            </p>
          </div>
        )}

        {/* Share button */}
        <div className="mt-6">
          <button
            onClick={() => setShowShareSheet(true)}
            className="w-full pixel-btn bg-pixel-magenta text-white font-bold py-3 rounded-sm text-lg"
          >
            <span className="flex flex-col items-center gap-1">
              <span className="text-base">📸 Share Your Score</span>
              <span className="flex items-center gap-1 text-[10px] opacity-75 font-normal">
                <span className="pixel-coin" style={{ width: 12, height: 12, fontSize: 5 }}>C</span>
                +2 Bonus Coins
              </span>
            </span>
          </button>
        </div>

        {showShareSheet && (
          <ShareSheet
            imageUrl={`/api/share?${new URLSearchParams({
              title: quiz.title,
              emoji: quiz.emoji,
              score: String(score),
              total: "10",
              coins: String(coinsEarned),
              username: user?.username || "Player",
              avatar: user?.avatar || "👤",
              category: quiz.category,
            }).toString()}`}
            quizTitle={quiz.title}
            score={score}
            total={10}
            bonusClaimed={false}
            onClose={() => setShowShareSheet(false)}
            onBonusClaimed={() => {}}
          />
        )}
      </div>

      <p className="text-center text-roblox-red/50 text-xs mt-4 font-pixel">PREVIEW ONLY — DELETE LATER</p>
    </div>
  );
}

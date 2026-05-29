"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { allQuizzes } from "@/data/quizzes";

const avatarEmojis = [
  "😀", "😎", "🤩", "🥳", "😈", "👻", "🤖", "👾",
  "🐱", "🐶", "🦊", "🐸", "🐵", "🦁", "🐼", "🐧",
  "🎮", "🕹️", "🏆", "⚡", "🔥", "💎", "🌟", "🚀",
  "🦸", "🧙", "🥷", "🤠", "👑", "🎯", "🍕", "🌈",
];

export default function ProfilePage() {
  const { user, loading, refreshProfile } = useAuth();
  const router = useRouter();
  const [completedCount, setCompletedCount] = useState(0);
  const [avatar, setAvatar] = useState("👤");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    if (user.avatar) setAvatar(user.avatar);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const res = await fetch("/api/quiz/completions");
      const data = await res.json();
      setCompletedCount(data.completions?.length ?? 0);
    };
    fetchStats();
  }, [user]);

  const pickAvatar = async (emoji: string) => {
    setAvatar(emoji);
    setShowEmojiPicker(false);
    await fetch("/api/auth/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: emoji }),
    });
    await refreshProfile();
  };

  if (loading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-pixel-cyan border-t-transparent rounded-full" />
      </div>
    );
  }

  const progressToGoal = Math.min((user.coins / 400) * 100, 100);
  const coinsNeeded = Math.max(400 - user.coins, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="pixel-card p-8">
        <div className="text-center mb-8">
          {/* Avatar with emoji picker */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-20 h-20 bg-card border-4 border-pixel-cyan rounded-sm flex items-center justify-center mx-auto mb-1 hover:border-coin-gold transition-colors cursor-pointer"
            >
              <span className="text-4xl">{avatar}</span>
            </button>
            <span className="text-text-secondary text-[10px]">tap to change</span>

            {showEmojiPicker && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 pixel-card p-3 z-50 slide-up">
                <p className="text-text-secondary text-xs mb-2 font-bold text-center">Pick Your Avatar</p>
                <div className="grid grid-cols-8 gap-1">
                  {avatarEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => pickAvatar(emoji)}
                      className={`w-8 h-8 flex items-center justify-center rounded-sm text-lg hover:bg-card-hover transition-colors ${avatar === emoji ? "bg-pixel-cyan/20 border border-pixel-cyan" : ""}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h1 className="font-pixel text-xs text-white mt-2">{user.username}</h1>
          <p className="text-text-secondary">{user.email}</p>
        </div>

        {/* Coin balance */}
        <div className="bg-card border-2 border-coin-gold rounded-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary font-medium">Your Coins</span>
            <span className="text-3xl font-bold text-coin-gold flex items-center gap-2">
              <span className="pixel-coin coin-bounce">C</span> {user.coins}
            </span>
          </div>
          <div className="pixel-progress pixel-progress-gold mt-3">
            <div className="pixel-progress-fill" style={{ width: `${progressToGoal}%` }} />
          </div>
          <div className="text-sm mt-2 text-right">
            {coinsNeeded > 0 ? (
              <span className="text-text-secondary">{coinsNeeded} more to cash out</span>
            ) : (
              <span className="text-roblox-green font-bold">Ready to cash out!</span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card border-2 border-pixel-blue rounded-sm p-4 text-center">
            <div className="text-2xl font-bold text-pixel-cyan">{completedCount}</div>
            <div className="text-sm text-text-secondary">Quizzes Completed</div>
          </div>
          <div className="bg-card border-2 border-roblox-green rounded-sm p-4 text-center">
            <div className="text-2xl font-bold text-roblox-green">{allQuizzes.length - completedCount}</div>
            <div className="text-sm text-text-secondary">Quizzes Remaining</div>
          </div>
        </div>

        {user.coins >= 400 && (
          <button
            onClick={() => router.push("/cashout")}
            className="w-full bg-roblox-green text-white font-bold py-4 rounded-sm pixel-btn pixel-glow text-lg"
          >
            Cash Out for Robux!
          </button>
        )}
      </div>
    </div>
  );
}

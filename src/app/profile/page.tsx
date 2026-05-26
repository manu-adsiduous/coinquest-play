"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { allQuizzes } from "@/data/quizzes";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const res = await fetch("/api/quiz/completions");
      const data = await res.json();
      setCompletedCount(data.completions?.length ?? 0);
    };
    fetchStats();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const progressToGoal = Math.min((user.coins / 400) * 100, 100);
  const coinsNeeded = Math.max(400 - user.coins, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">👤</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Coin balance */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Your Coins</span>
            <span className="text-3xl font-bold text-yellow-600 flex items-center gap-2">
              <span className="coin-bounce">🪙</span> {user.coins}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full h-4 transition-all duration-500"
              style={{ width: `${progressToGoal}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">{user.coins} / 400 coins</span>
            {coinsNeeded > 0 ? (
              <span className="text-gray-500">{coinsNeeded} more to cash out</span>
            ) : (
              <span className="text-green-600 font-bold">Ready to cash out!</span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{completedCount}</div>
            <div className="text-sm text-gray-500">Quizzes Completed</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{allQuizzes.length - completedCount}</div>
            <div className="text-sm text-gray-500">Quizzes Remaining</div>
          </div>
        </div>

        {user.coins >= 400 && (
          <button
            onClick={() => router.push("/cashout")}
            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors text-lg pulse-glow"
          >
            🎉 Cash Out for Robux!
          </button>
        )}
      </div>
    </div>
  );
}

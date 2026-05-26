"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function CashoutPage() {
  const { user, loading, refreshProfile } = useAuth();
  const router = useRouter();
  const [redeeming, setRedeeming] = useState(false);
  const [giftCardCode, setGiftCardCode] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const handleCashout = async () => {
    if (!user || user.coins < 400) return;
    setRedeeming(true);
    setError("");

    try {
      const res = await fetch("/api/gift-cards", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setRedeeming(false);
        return;
      }

      await refreshProfile();
      setGiftCardCode(data.code);
      trackEvent("cashout", { coins_spent: 400 });
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setRedeeming(false);
  };

  if (loading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cash Out</h1>
        <p className="text-gray-500 mb-6">Redeem your coins for a Robux gift card!</p>

        {giftCardCode ? (
          <div className="fade-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Congratulations!</h2>
            <p className="text-gray-600 mb-4">Here&apos;s your Robux gift card code:</p>
            <div className="bg-gray-900 text-green-400 font-mono text-2xl py-4 px-6 rounded-xl mb-4 select-all">
              {giftCardCode}
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Copy this code and redeem it on the Roblox website to get your Robux!
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Keep Playing
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 mb-6">
              <div className="text-4xl mb-2 coin-bounce">🪙</div>
              <div className="text-3xl font-bold text-yellow-600">{user.coins} coins</div>
              <div className="text-sm text-gray-500 mt-1">400 coins needed</div>
            </div>

            {user.coins >= 400 ? (
              <>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-green-700 font-medium">
                    You have enough coins! Cash out now to get a 400 Robux gift card code.
                  </p>
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
                    {error}
                  </div>
                )}
                <button
                  onClick={handleCashout}
                  disabled={redeeming}
                  className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors text-lg disabled:opacity-50"
                >
                  {redeeming ? "Redeeming..." : "🎁 Cash Out 400 Coins for Robux"}
                </button>
              </>
            ) : (
              <>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full h-4 transition-all"
                    style={{ width: `${(user.coins / 400) * 100}%` }}
                  />
                </div>
                <p className="text-gray-500 mb-6">
                  You need <span className="font-bold text-purple-600">{400 - user.coins} more coins</span> to cash out.
                  Keep playing quizzes!
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="bg-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Browse Quizzes
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

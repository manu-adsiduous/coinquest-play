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
        <div className="animate-spin h-8 w-8 border-4 border-pixel-cyan border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 fade-in">
      <div className="pixel-card p-8 text-center">
        <h1 className="font-pixel text-sm text-white mb-2">Cash Out</h1>
        <p className="text-text-secondary mb-6">Redeem your coins for a Robux gift card!</p>

        {giftCardCode ? (
          <div className="fade-in">
            <h2 className="font-pixel text-xs text-roblox-green mb-4">Congratulations!</h2>
            <p className="text-text-secondary mb-4">Here&apos;s your Robux gift card code:</p>
            <div className="bg-[#0d1117] text-roblox-green font-pixel text-sm md:text-base py-4 px-6 rounded-sm border-2 border-roblox-green select-all mb-4">
              {giftCardCode}
            </div>
            <p className="text-sm text-text-secondary mb-6">
              Copy this code and redeem it on the Roblox website to get your Robux!
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-pixel-blue text-white font-bold py-3 px-8 rounded-sm pixel-btn"
            >
              Keep Playing
            </button>
          </div>
        ) : (
          <>
            <div className="bg-card border-2 border-coin-gold rounded-sm p-6 mb-6">
              <div className="mb-2">
                <span className="pixel-coin coin-bounce !w-10 !h-10 text-base">C</span>
              </div>
              <div className="text-3xl font-bold text-coin-gold">{user.coins} coins</div>
              <div className="text-text-secondary text-sm mt-1">400 coins needed</div>
            </div>

            {user.coins >= 400 ? (
              <>
                <div className="bg-roblox-green/10 border-2 border-roblox-green rounded-sm p-4 mb-6">
                  <p className="text-roblox-green font-medium">
                    You have enough coins! Cash out now to get a 400 Robux gift card code.
                  </p>
                </div>
                {error && (
                  <div className="bg-roblox-red/10 border-2 border-roblox-red text-roblox-red px-4 py-3 rounded-sm mb-4 text-sm">
                    {error}
                  </div>
                )}
                <button
                  onClick={handleCashout}
                  disabled={redeeming}
                  className="w-full bg-roblox-green text-white font-bold py-4 rounded-sm pixel-btn text-lg disabled:opacity-50"
                >
                  {redeeming ? "Redeeming..." : "Cash Out 400 Coins for Robux"}
                </button>
              </>
            ) : (
              <>
                <div className="pixel-progress pixel-progress-gold mb-3">
                  <div
                    className="pixel-progress-fill"
                    style={{ width: `${(user.coins / 400) * 100}%` }}
                  />
                </div>
                <p className="text-text-secondary mb-6">
                  You need <span className="font-bold text-pixel-cyan">{400 - user.coins} more coins</span> to cash out.
                  Keep playing quizzes!
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="bg-pixel-blue text-white font-bold py-3 px-8 rounded-sm pixel-btn"
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

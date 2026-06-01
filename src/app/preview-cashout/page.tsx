"use client";

import { useState } from "react";

export default function PreviewCashoutPage() {
  const [view, setView] = useState<"ready" | "redeemed">("ready");

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* View switcher */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setView("ready")}
          className={`px-4 py-2 rounded-sm text-sm font-bold border-2 ${view === "ready" ? "bg-pixel-cyan text-[#0d1b2a] border-black pixel-btn" : "bg-card text-text-secondary border-border-pixel"}`}
        >
          Ready to Cash Out
        </button>
        <button
          onClick={() => setView("redeemed")}
          className={`px-4 py-2 rounded-sm text-sm font-bold border-2 ${view === "redeemed" ? "bg-pixel-cyan text-[#0d1b2a] border-black pixel-btn" : "bg-card text-text-secondary border-border-pixel"}`}
        >
          After Redemption
        </button>
      </div>

      <div className="pixel-card p-8 text-center fade-in">
        <h1 className="font-pixel text-sm text-white mb-2">Cash Out</h1>
        <p className="text-text-secondary mb-6">Redeem your coins for a Robux gift card!</p>

        {view === "ready" ? (
          <>
            <div className="bg-card border-2 border-coin-gold rounded-sm p-6 mb-6">
              <div className="mb-2">
                <span className="pixel-coin coin-bounce !w-10 !h-10 text-base">C</span>
              </div>
              <div className="text-3xl font-bold text-coin-gold">432 coins</div>
              <div className="text-text-secondary text-sm mt-1">200 coins needed</div>
            </div>

            <div className="bg-roblox-green/10 border-2 border-roblox-green rounded-sm p-4 mb-6">
              <p className="text-roblox-green font-medium">
                You have enough coins! Cash out now to get a 200 Robux gift card code.
              </p>
            </div>

            <button
              className="w-full bg-roblox-green text-white font-bold py-4 rounded-sm pixel-btn text-lg"
              onClick={() => setView("redeemed")}
            >
              Cash Out 200 Coins for Robux
            </button>
          </>
        ) : (
          <div className="fade-in">
            <h2 className="font-pixel text-xs text-roblox-green mb-4">Congratulations!</h2>
            <p className="text-text-secondary mb-4">Here&apos;s your Robux gift card code:</p>
            <div className="bg-[#0d1117] text-roblox-green font-pixel text-sm md:text-base py-4 px-6 rounded-sm border-2 border-roblox-green select-all mb-4">
              XXXX-XXXX-XXXX-XXXX
            </div>
            <p className="text-sm text-text-secondary mb-6">
              Copy this code and redeem it on the Roblox website to get your Robux!
            </p>
            <button
              onClick={() => setView("ready")}
              className="bg-pixel-blue text-white font-bold py-3 px-8 rounded-sm pixel-btn"
            >
              Keep Playing
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-roblox-red/50 text-xs mt-4 font-pixel">PREVIEW ONLY — DELETE LATER</p>
    </div>
  );
}

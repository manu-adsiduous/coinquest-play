"use client";

import Link from "next/link";
import { playWrong } from "@/lib/sounds";
import { useEffect } from "react";
import { useInterstitialAd } from "@/components/useInterstitialAd";

export default function NotFound() {
  const goHomeWithAd = useInterstitialAd();
  useEffect(() => {
    playWrong();
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="pixel-card p-8 max-w-md w-full text-center fade-in">
        <div className="text-6xl mb-4">👾</div>
        <h1 className="font-pixel text-xl text-roblox-red mb-2">404</h1>
        <h2 className="font-pixel text-[10px] text-white mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-6">
          Oops! This page got lost in the void. But there are plenty of quizzes waiting for you!
        </p>

        <div className="bg-card border-2 border-border-pixel rounded-sm p-4 mb-6">
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-4xl">🪙</span>
            <div className="text-left">
              <p className="text-coin-gold font-bold">Don&apos;t waste time here!</p>
              <p className="text-text-secondary text-xs">Go play quizzes and earn coins for Robux.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            onClick={(e) => { e.preventDefault(); goHomeWithAd("/"); }}
            className="w-full bg-roblox-green text-white font-bold py-3 px-6 rounded-sm pixel-btn text-center"
          >
            Play Quizzes
          </Link>
          <Link
            href="/how-it-works"
            className="w-full bg-card text-pixel-cyan font-bold py-3 px-6 rounded-sm border-2 border-pixel-cyan text-center pixel-btn"
          >
            How It Works
          </Link>
        </div>
      </div>
    </div>
  );
}

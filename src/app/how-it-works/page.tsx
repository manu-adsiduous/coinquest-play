"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const steps = [
  {
    number: 1,
    emoji: "🎮",
    title: "Pick a Quiz",
    description: "Browse quizzes across categories like Roblox, Minecraft, Anime, and more. Each quiz has 10 questions.",
  },
  {
    number: 2,
    emoji: "📺",
    title: "Watch a Short Ad",
    description: "Watch a quick video ad to unlock the quiz. It only takes a few seconds!",
  },
  {
    number: 3,
    emoji: "🧠",
    title: "Answer Questions",
    description: "Answer 10 multiple-choice questions. You'll see right away if you got it right or wrong.",
  },
  {
    number: 4,
    emoji: "🪙",
    title: "Earn Coins",
    description: "The more answers you get right, the more coins you earn. Get 8+ correct for the max 4 coins!",
  },
  {
    number: 5,
    emoji: "🔄",
    title: "Retake for More",
    description: "Didn't get 4 coins? Retake the quiz to improve your score and earn the remaining coins. Max 4 per quiz.",
  },
  {
    number: 6,
    emoji: "💰",
    title: "Cash Out",
    description: "Once you reach 200 coins, head to the Cash Out page to get a Robux gift card code instantly!",
  },
];

const coinTiers = [
  { range: "8–10 correct", coins: 4, color: "text-coin-gold" },
  { range: "6–7 correct", coins: 3, color: "text-coin-gold" },
  { range: "4–5 correct", coins: 2, color: "text-coin-gold" },
  { range: "1–3 correct", coins: 1, color: "text-coin-gold" },
  { range: "0 correct", coins: 0, color: "text-roblox-red" },
];

export default function HowItWorksPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-pixel text-base md:text-lg text-white mb-3">How It Works</h1>
        <p className="text-text-secondary text-lg">
          Earn coins by playing quizzes and cash out for real Robux gift cards!
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-10">
        {steps.map((step) => (
          <div key={step.number} className="pixel-card p-5 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-pixel-cyan/10 border-2 border-pixel-cyan rounded-sm flex items-center justify-center">
              <span className="text-2xl">{step.emoji}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-[8px] text-pixel-cyan">STEP {step.number}</span>
                <span className="text-white font-bold">{step.title}</span>
              </div>
              <p className="text-text-secondary text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Coin rewards breakdown */}
      <div className="pixel-card p-6 mb-8">
        <h2 className="font-pixel text-[10px] text-coin-gold mb-4 text-center">Coin Rewards Per Quiz</h2>
        <div className="space-y-2">
          {coinTiers.map((tier) => (
            <div key={tier.range} className="flex items-center justify-between bg-[#0d1b2a] rounded-sm p-3 border border-border-pixel">
              <span className="text-text-secondary text-sm">{tier.range}</span>
              <span className={`font-bold text-sm flex items-center gap-2 ${tier.color}`}>
                {tier.coins > 0 && <span className="pixel-coin" style={{ width: 14, height: 14, fontSize: 6 }}>C</span>}
                {tier.coins} coin{tier.coins !== 1 ? "s" : ""}
              </span>
            </div>
          ))}
        </div>
        <p className="text-text-secondary text-xs text-center mt-3">
          Max 4 coins per quiz. Retake to improve your score and earn the difference!
        </p>
      </div>

      {/* Cashout info */}
      <div className="pixel-card p-6 mb-8 text-center">
        <h2 className="font-pixel text-[10px] text-roblox-green mb-4">Cashing Out</h2>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-card border-2 border-coin-gold rounded-sm px-4 py-2">
            <span className="pixel-coin inline-block mr-1">C</span>
            <span className="text-coin-gold font-bold">200</span>
          </div>
          <span className="text-text-secondary text-xl">=</span>
          <div className="bg-card border-2 border-roblox-green rounded-sm px-4 py-2">
            <span className="text-roblox-green font-bold">200 Robux</span>
          </div>
        </div>
        <p className="text-text-secondary text-sm mb-2">
          Once you hit 200 coins, go to the <Link href="/cashout" className="text-pixel-cyan hover:underline">Cash Out</Link> page.
        </p>
        <p className="text-text-secondary text-sm">
          You&apos;ll receive a Robux gift card code that you can redeem on the Roblox website.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        {user ? (
          <Link href="/" className="inline-block bg-roblox-green text-white font-bold py-3 px-8 rounded-sm pixel-btn text-lg">
            Browse Quizzes
          </Link>
        ) : (
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="bg-roblox-green text-white font-bold py-3 px-8 rounded-sm pixel-btn text-lg">
              Start Playing
            </Link>
            <Link href="/login" className="bg-transparent text-pixel-cyan font-bold py-3 px-8 rounded-sm border-2 border-pixel-cyan pixel-btn text-lg">
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

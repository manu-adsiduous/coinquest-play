"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useInterstitialAd } from "./useInterstitialAd";
import { useState } from "react";

export default function Navbar() {
  const { user, signOut, loading, sessionCoins } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const goHomeWithAd = useInterstitialAd();
  const inConsole = pathname?.startsWith("/console");
  const isAdmin = user?.isAdmin;
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCoinPopup, setShowCoinPopup] = useState(false);

  const displayCoins = user ? (user.coins ?? 0) : sessionCoins;

  const handleCoinClick = () => {
    if (user) return; // logged-in users don't need the popup
    setShowCoinPopup((prev) => !prev);
  };

  return (
    <nav className="bg-[#0d1b2a] border-b-4 border-pixel-cyan text-text-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            onClick={(e) => { e.preventDefault(); goHomeWithAd("/"); }}
            className="flex items-center gap-2 font-bold"
          >
            <span className="pixel-coin coin-bounce">C</span>
            <span className="font-pixel text-[9px] sm:text-[10px] text-coin-gold">CoinQuest</span>
            {inConsole && (
              <span className="font-pixel text-[9px] sm:text-[10px] text-white">Console</span>
            )}
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/" onClick={(e) => { e.preventDefault(); goHomeWithAd("/"); }} className="hover:text-pixel-cyan transition-colors font-bold text-sm">
              Quizzes
            </Link>
            <Link href="/how-it-works" className="hover:text-pixel-cyan transition-colors font-bold text-sm">
              How It Works
            </Link>
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/profile" className="hover:text-pixel-cyan transition-colors font-bold text-sm">
                      Profile
                    </Link>
                    <Link href="/cashout" className="hover:text-pixel-cyan transition-colors font-bold text-sm">
                      Cash Out
                    </Link>
                    {isAdmin && (
                      <Link href="/console" className="hover:text-pixel-magenta transition-colors font-bold text-sm text-pixel-magenta">
                        Console
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link href="/login" className="hover:text-pixel-cyan transition-colors font-bold text-sm">
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-roblox-green text-white font-bold px-5 py-1.5 rounded-sm pixel-btn text-sm"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                {/* Coin counter - always visible */}
                <div className="relative">
                  <button
                    onClick={user ? () => router.push("/cashout") : handleCoinClick}
                    className="flex items-center gap-2 bg-card border-2 border-coin-gold px-3 py-1 rounded-sm transition-colors cursor-pointer hover:border-coin-gold/80 hover:bg-card-hover"
                  >
                    <span className="pixel-coin">C</span>
                    <span className="font-bold text-coin-gold text-sm">{displayCoins}</span>
                  </button>

                  {/* Guest signup nudge popup */}
                  {showCoinPopup && !user && (
                    <div className="absolute right-0 top-full mt-2 w-64 pixel-card p-4 z-50 slide-up">
                      <p className="text-coin-gold font-bold text-sm mb-1">
                        You&apos;ve earned {sessionCoins} coins!
                      </p>
                      <p className="text-text-secondary text-xs mb-3">
                        Sign up to save your progress and cash out for Robux at 200 coins.
                      </p>
                      <div className="flex gap-2">
                        <Link
                          href="/signup"
                          className="flex-1 bg-roblox-green text-white text-xs font-bold py-2 px-3 rounded-sm pixel-btn text-center"
                          onClick={() => setShowCoinPopup(false)}
                        >
                          Sign Up
                        </Link>
                        <Link
                          href="/login"
                          className="flex-1 bg-card text-pixel-cyan text-xs font-bold py-2 px-3 rounded-sm border-2 border-pixel-cyan text-center"
                          onClick={() => setShowCoinPopup(false)}
                        >
                          Log In
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {user && (
                  <button
                    onClick={signOut}
                    className="bg-roblox-red/80 hover:bg-roblox-red px-4 py-1.5 rounded-sm border-2 border-black text-sm font-bold transition-colors"
                  >
                    Sign Out
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile: coin counter + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {!loading && (
              <div className="relative">
                <button
                  onClick={user ? () => router.push("/cashout") : handleCoinClick}
                  className="flex items-center gap-1.5 bg-card border-2 border-coin-gold px-2 py-1 rounded-sm hover:bg-card-hover"
                >
                  <span className="pixel-coin" style={{ width: 16, height: 16, fontSize: 6 }}>C</span>
                  <span className="font-bold text-coin-gold text-xs">{displayCoins}</span>
                </button>

                {showCoinPopup && !user && (
                  <div className="absolute right-0 top-full mt-2 w-60 pixel-card p-4 z-50 slide-up">
                    <p className="text-coin-gold font-bold text-sm mb-1">
                      You&apos;ve earned {sessionCoins} coins!
                    </p>
                    <p className="text-text-secondary text-xs mb-3">
                      Sign up to save your progress and cash out for Robux.
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href="/signup"
                        className="flex-1 bg-roblox-green text-white text-xs font-bold py-2 px-3 rounded-sm pixel-btn text-center"
                        onClick={() => setShowCoinPopup(false)}
                      >
                        Sign Up
                      </Link>
                      <Link
                        href="/login"
                        className="flex-1 bg-card text-pixel-cyan text-xs font-bold py-2 px-3 rounded-sm border-2 border-pixel-cyan text-center"
                        onClick={() => setShowCoinPopup(false)}
                      >
                        Log In
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button
              className="p-2 hover:text-pixel-cyan transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3 border-t-2 border-border-pixel pt-3">
            <Link href="/" className="hover:text-pixel-cyan font-bold text-sm" onClick={(e) => { e.preventDefault(); setMenuOpen(false); goHomeWithAd("/"); }}>
              Quizzes
            </Link>
            <Link href="/how-it-works" className="hover:text-pixel-cyan font-bold text-sm" onClick={() => setMenuOpen(false)}>
              How It Works
            </Link>
            {!loading && user ? (
              <>
                <Link href="/profile" className="hover:text-pixel-cyan font-bold text-sm" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
                <Link href="/cashout" className="hover:text-pixel-cyan font-bold text-sm" onClick={() => setMenuOpen(false)}>
                  Cash Out
                </Link>
                {isAdmin && (
                  <Link href="/console" className="hover:text-pixel-magenta text-pixel-magenta font-bold text-sm" onClick={() => setMenuOpen(false)}>
                    Console
                  </Link>
                )}
                <button onClick={() => { signOut(); setMenuOpen(false); }} className="text-left hover:text-roblox-red font-bold text-sm">
                  Sign Out
                </button>
              </>
            ) : !loading ? (
              <>
                <Link href="/login" className="hover:text-pixel-cyan font-bold text-sm" onClick={() => setMenuOpen(false)}>
                  Log In
                </Link>
                <Link href="/signup" className="hover:text-pixel-cyan font-bold text-sm" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
}

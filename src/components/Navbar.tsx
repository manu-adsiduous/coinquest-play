"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useState } from "react";

export default function Navbar() {
  const { user, signOut, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0d1b2a] border-b-4 border-pixel-cyan text-text-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="pixel-coin coin-bounce">C</span>
            <span className="font-pixel text-[9px] sm:text-[10px] text-coin-gold">CoinQuest</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="hover:text-pixel-cyan transition-colors font-bold text-sm">
              Quizzes
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
                    <div className="flex items-center gap-2 bg-card border-2 border-coin-gold px-3 py-1 rounded-sm">
                      <span className="pixel-coin">C</span>
                      <span className="font-bold text-coin-gold text-sm">{user?.coins ?? 0}</span>
                    </div>
                    <button
                      onClick={signOut}
                      className="bg-roblox-red/80 hover:bg-roblox-red px-4 py-1.5 rounded-sm border-2 border-black text-sm font-bold transition-colors"
                    >
                      Sign Out
                    </button>
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
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 hover:text-pixel-cyan transition-colors"
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3 border-t-2 border-border-pixel pt-3">
            <Link href="/" className="hover:text-pixel-cyan font-bold text-sm" onClick={() => setMenuOpen(false)}>
              Quizzes
            </Link>
            {!loading && user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="pixel-coin">C</span>
                  <span className="font-bold text-coin-gold">{user?.coins ?? 0} coins</span>
                </div>
                <Link href="/profile" className="hover:text-pixel-cyan font-bold text-sm" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
                <Link href="/cashout" className="hover:text-pixel-cyan font-bold text-sm" onClick={() => setMenuOpen(false)}>
                  Cash Out
                </Link>
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

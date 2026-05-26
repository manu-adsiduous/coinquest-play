"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useState } from "react";

export default function Navbar() {
  const { user, profile, signOut, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🪙</span>
            <span>CoinQuest</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-yellow-300 transition-colors">
              Quizzes
            </Link>
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/profile" className="hover:text-yellow-300 transition-colors">
                      Profile
                    </Link>
                    <Link href="/cashout" className="hover:text-yellow-300 transition-colors">
                      Cash Out
                    </Link>
                    <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
                      <span className="text-yellow-300 text-lg">🪙</span>
                      <span className="font-bold">{profile?.coins ?? 0}</span>
                    </div>
                    <button
                      onClick={signOut}
                      className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="hover:text-yellow-300 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-yellow-400 text-purple-900 font-bold px-5 py-1.5 rounded-full hover:bg-yellow-300 transition-colors"
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
            className="md:hidden p-2"
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
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>
              Quizzes
            </Link>
            {!loading && user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">🪙</span>
                  <span className="font-bold">{profile?.coins ?? 0} coins</span>
                </div>
                <Link href="/profile" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
                <Link href="/cashout" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>
                  Cash Out
                </Link>
                <button onClick={() => { signOut(); setMenuOpen(false); }} className="text-left hover:text-yellow-300">
                  Sign Out
                </button>
              </>
            ) : !loading ? (
              <>
                <Link href="/login" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>
                  Log In
                </Link>
                <Link href="/signup" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>
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

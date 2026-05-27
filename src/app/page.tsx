"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import QuizCard from "@/components/QuizCard";
import { allQuizzes } from "@/data/quizzes";
import { MAX_COINS_PER_QUIZ } from "@/lib/coins";

const categories = [
  "All",
  "Roblox",
  "Minecraft",
  "Fortnite",
  "YouTube",
  "Anime",
  "Movies & TV",
  "Music",
  "Memes",
  "Science",
  "Animals",
  "Sports",
  "Trivia",
];

interface QuizCompletionInfo {
  quizId: string;
  coinsEarned: number;
}

export default function Home() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [completions, setCompletions] = useState<QuizCompletionInfo[]>([]);

  useEffect(() => {
    if (!user) {
      setCompletions([]);
      return;
    }
    const fetchCompletions = async () => {
      const res = await fetch("/api/quiz/completions");
      const data = await res.json();
      if (data.completions) {
        setCompletions(data.completions);
      }
    };
    fetchCompletions();

    // Refetch when user returns to this tab (e.g. after completing a quiz)
    const handleFocus = () => fetchCompletions();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user, user?.coins]);

  const completionMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of completions) {
      map.set(c.quizId, c.coinsEarned);
    }
    return map;
  }, [completions]);

  const filteredQuizzes = useMemo(() => {
    return allQuizzes.filter((q) => {
      const matchesCategory =
        activeCategory === "All" || q.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="font-pixel text-lg md:text-xl font-extrabold mb-4">
          <span className="text-roblox-green">Complete quizzes.</span>{" "}
          <span className="text-coin-gold">Get FREE Robux.</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Each quiz allows you to collect coins that you can cash out as Robux!
        </p>
        {!user && (
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/signup"
              className="pixel-btn bg-roblox-green text-white font-bold px-8 py-3 rounded-sm text-lg"
            >
              Start Playing
            </a>
            <a
              href="/login"
              className="pixel-btn border-3 border-pixel-cyan bg-transparent text-pixel-cyan font-bold px-8 py-3 rounded-sm text-lg"
            >
              Log In
            </a>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pixel-input w-full max-w-md mx-auto block px-4 py-3 transition-colors"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-pixel-cyan text-[#0d1b2a] border-2 border-black pixel-btn shadow-md"
                : "bg-card text-text-secondary border-2 border-border-pixel hover:border-pixel-cyan hover:text-pixel-cyan"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quiz grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredQuizzes.map((quiz) => {
          const coinsEarned = completionMap.get(quiz.id) ?? 0;
          const coinsRemaining = MAX_COINS_PER_QUIZ - coinsEarned;
          return (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              completed={completionMap.has(quiz.id)}
              coinsRemaining={coinsRemaining}
              coinsEarned={coinsEarned}
            />
          );
        })}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-16 text-text-secondary">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">No quizzes found. Try a different search or category!</p>
        </div>
      )}
    </div>
  );
}

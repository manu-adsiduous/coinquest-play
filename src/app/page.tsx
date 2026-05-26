"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import QuizCard from "@/components/QuizCard";
import { allQuizzes } from "@/data/quizzes";
import { supabase } from "@/lib/supabase";

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

export default function Home() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedQuizIds, setCompletedQuizIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) {
      setCompletedQuizIds(new Set());
      return;
    }
    const fetchCompletions = async () => {
      const { data } = await supabase
        .from("quiz_completions")
        .select("quiz_id")
        .eq("user_id", user.id);
      if (data) {
        setCompletedQuizIds(new Set(data.map((d) => d.quiz_id)));
      }
    };
    fetchCompletions();
  }, [user]);

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
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="text-purple-600">Play Quizzes.</span>{" "}
          <span className="text-yellow-500">Earn Coins.</span>{" "}
          <span className="text-green-500">Get Robux!</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Complete quizzes to earn coins — cash out for Robux gift cards at 400 coins!
          Each quiz earns you <span className="font-bold text-yellow-600">4 coins</span>.
        </p>
        {!user && (
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/signup"
              className="bg-purple-600 text-white font-bold px-8 py-3 rounded-full hover:bg-purple-700 transition-colors text-lg"
            >
              Start Playing
            </a>
            <a
              href="/login"
              className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-colors text-lg"
            >
              Log In
            </a>
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <div className="bg-white rounded-xl shadow px-6 py-3 text-center">
          <div className="text-2xl font-bold text-purple-600">{allQuizzes.length}</div>
          <div className="text-sm text-gray-500">Quizzes</div>
        </div>
        <div className="bg-white rounded-xl shadow px-6 py-3 text-center">
          <div className="text-2xl font-bold text-yellow-500">🪙 4</div>
          <div className="text-sm text-gray-500">Coins per Quiz</div>
        </div>
        <div className="bg-white rounded-xl shadow px-6 py-3 text-center">
          <div className="text-2xl font-bold text-green-500">400</div>
          <div className="text-sm text-gray-500">Coins = Robux</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md mx-auto block bg-white border-2 border-purple-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors text-gray-900"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-purple-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quiz grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredQuizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            completed={completedQuizIds.has(quiz.id)}
          />
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">No quizzes found. Try a different search or category!</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import QuizCard from "@/components/QuizCard";
import { allQuizzes } from "@/data/quizzes";

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
      const res = await fetch("/api/quiz/completions");
      const data = await res.json();
      if (data.completions) {
        setCompletedQuizIds(new Set(data.completions));
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
          <span className="text-purple-600">Complete quizzes.</span>{" "}
          <span className="text-green-500">Get FREE Robux.</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Each quiz allows you to collect coins that you can cash out as Robux!
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

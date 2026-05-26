"use client";

import Link from "next/link";
import type { Quiz } from "@/lib/types";

export default function QuizCard({ quiz, completed }: { quiz: Quiz; completed: boolean }) {
  return (
    <Link href={`/quiz/${quiz.id}`} className="group block">
      <div className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${completed ? "border-green-400" : "border-transparent hover:border-purple-400"} group-hover:-translate-y-1`}>
        {completed && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Done!
          </div>
        )}
        <div className="p-5">
          <div className="text-4xl mb-3">{quiz.emoji}</div>
          <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">
            {quiz.title}
          </h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{quiz.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              {quiz.category}
            </span>
            <span className="text-xs text-gray-400">{quiz.questions.length} questions</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-yellow-500 text-sm font-bold">
            <span>🪙</span> +4 coins
          </div>
        </div>
      </div>
    </Link>
  );
}

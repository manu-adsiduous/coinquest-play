"use client";

import Link from "next/link";
import type { Quiz } from "@/lib/types";

export default function QuizCard({ quiz, completed }: { quiz: Quiz; completed: boolean }) {
  return (
    <Link href={`/quiz/${quiz.id}`} className="group block">
      <div className={`relative pixel-card pixel-card-hover transition-all duration-200 overflow-hidden ${completed ? "border-roblox-green" : ""} group-hover:-translate-y-1`}>
        {completed && (
          <div className="absolute top-2 right-2 bg-roblox-green text-white font-pixel text-[7px] px-2 py-1 border-2 border-black rounded-sm">
            DONE
          </div>
        )}
        <div className="p-5">
          <div className="text-4xl mb-3">{quiz.emoji}</div>
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-pixel-cyan transition-colors">
            {quiz.title}
          </h3>
          <p className="text-text-secondary text-sm mb-3 line-clamp-2">{quiz.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-pixel-blue/20 text-pixel-blue px-3 py-1 rounded-sm border border-pixel-blue/40 font-medium">
              {quiz.category}
            </span>
            <span className="text-xs text-text-secondary">{quiz.questions.length} Q</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-coin-gold text-sm font-bold">
            <span className="pixel-coin">C</span> +4 coins
          </div>
        </div>
      </div>
    </Link>
  );
}

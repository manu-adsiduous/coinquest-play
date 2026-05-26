"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { allQuizzes } from "@/data/quizzes";
import { trackEvent } from "@/lib/analytics";
import RewardedAd from "@/components/RewardedAd";

type QuizState = "locked" | "playing" | "finished" | "results";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user, refreshProfile } = useAuth();

  const quiz = allQuizzes.find((q) => q.id === params.id);

  const [state, setState] = useState<QuizState>("locked");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [coinsAwarded, setCoinsAwarded] = useState(false);

  useEffect(() => {
    if (!user || !quiz) return;
    const checkCompletion = async () => {
      const res = await fetch("/api/quiz/completions");
      const data = await res.json();
      if (data.completions?.includes(quiz.id)) {
        setAlreadyCompleted(true);
      }
    };
    checkCompletion();
  }, [user, quiz]);

  const handleUnlockReward = useCallback(() => {
    setState("playing");
    trackEvent("quiz_unlocked", { quiz_id: quiz?.id, quiz_title: quiz?.title });
  }, [quiz]);

  const handleSelectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (quiz && answerIndex === quiz.questions[currentQuestion].correctAnswer) {
      setScore((s) => s + 1);
    }

    // Auto-advance after short delay
    setTimeout(() => {
      if (quiz && currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
      } else {
        setState("finished");
      }
    }, 1000);
  };

  const handleResultsReward = useCallback(async () => {
    setState("results");
    trackEvent("quiz_completed", {
      quiz_id: quiz?.id,
      quiz_title: quiz?.title,
      score,
      total: quiz?.questions.length,
    });

    if (!user || !quiz || alreadyCompleted) return;

    // Award coins via API
    const res = await fetch("/api/quiz/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId: quiz.id, score }),
    });
    const data = await res.json();

    if (data.coins > 0) {
      setCoinsAwarded(true);
      trackEvent("coins_earned", { amount: data.coins, quiz_id: quiz.id });
    }
    await refreshProfile();
  }, [quiz, score, user, alreadyCompleted, refreshProfile]);

  if (!quiz) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="text-xl text-gray-600">Quiz not found</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  // LOCKED state - need to watch ad to unlock
  if (state === "locked") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">{quiz.emoji}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
          <p className="text-gray-500 mb-2">{quiz.description}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-6">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">{quiz.category}</span>
            <span>{quiz.questions.length} questions</span>
            <span className="text-yellow-600 font-bold">🪙 +4 coins</span>
          </div>

          {alreadyCompleted && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl mb-4 text-sm">
              You&apos;ve already completed this quiz. You can play again but won&apos;t earn additional coins.
            </div>
          )}

          {!user ? (
            <div className="space-y-3">
              <p className="text-gray-500">Sign in to play and earn coins!</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => router.push("/login")}
                  className="bg-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-700"
                >
                  Log In
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="bg-white text-purple-600 font-bold py-3 px-6 rounded-xl border-2 border-purple-600 hover:bg-purple-50"
                >
                  Sign Up
                </button>
              </div>
            </div>
          ) : (
            <RewardedAd
              adName="quiz-unlock"
              buttonText="Watch Ad to Start Quiz"
              onReward={handleUnlockReward}
              className="bg-purple-600 text-white hover:bg-purple-700 w-full text-lg"
            />
          )}
        </div>
      </div>
    );
  }

  // PLAYING state
  if (state === "playing") {
    const question = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span>Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full h-3 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
              if (selectedAnswer === null) {
                buttonClass += "border-gray-200 hover:border-purple-400 hover:bg-purple-50 text-gray-800 cursor-pointer";
              } else if (index === question.correctAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 text-gray-400";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // FINISHED state - need to watch ad to see results
  if (state === "finished") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <p className="text-gray-500 mb-6">Watch a short ad to see your results and claim your coins!</p>
          <RewardedAd
            adName="quiz-results"
            buttonText="Watch Ad to See Results & Claim Coins"
            onReward={handleResultsReward}
            className="bg-green-500 text-white hover:bg-green-600 w-full text-lg"
          />
        </div>
      </div>
    );
  }

  // RESULTS state
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">
          {score === quiz.questions.length ? "🌟" : score >= quiz.questions.length / 2 ? "🎉" : "💪"}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {score === quiz.questions.length
            ? "Perfect Score!"
            : score >= quiz.questions.length / 2
            ? "Great Job!"
            : "Keep Trying!"}
        </h2>
        <p className="text-5xl font-extrabold text-purple-600 mb-2">
          {score} / {quiz.questions.length}
        </p>
        <p className="text-gray-500 mb-4">correct answers</p>

        {coinsAwarded && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6 fade-in">
            <span className="text-2xl coin-bounce inline-block">🪙</span>
            <p className="text-yellow-700 font-bold text-lg">+4 coins earned!</p>
          </div>
        )}

        {alreadyCompleted && !coinsAwarded && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-gray-500 text-sm">
            No additional coins — you&apos;ve completed this quiz before.
          </div>
        )}

        {/* Answer review */}
        <div className="text-left mt-6 space-y-3">
          <h3 className="font-bold text-gray-700">Answer Review:</h3>
          {quiz.questions.map((q, i) => (
            <div key={i} className={`p-3 rounded-lg text-sm ${answers[i] === q.correctAnswer ? "bg-green-50" : "bg-red-50"}`}>
              <p className="font-medium text-gray-800">{i + 1}. {q.question}</p>
              <p className={answers[i] === q.correctAnswer ? "text-green-600" : "text-red-600"}>
                Your answer: {q.options[answers[i]]}
                {answers[i] !== q.correctAnswer && (
                  <span className="text-green-600 ml-2">| Correct: {q.options[q.correctAnswer]}</span>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => router.push("/")}
            className="flex-1 bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700"
          >
            More Quizzes
          </button>
          {(user?.coins ?? 0) >= 400 && (
            <button
              onClick={() => router.push("/cashout")}
              className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600"
            >
              Cash Out!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { allQuizzes } from "@/data/quizzes";
import { trackEvent } from "@/lib/analytics";
import RewardedAd from "@/components/RewardedAd";
import { playCorrect, playWrong, playUnlock, playComplete, playCoins } from "@/lib/sounds";

type QuizState = "locked" | "playing" | "finished" | "results";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user, refreshProfile, addSessionCoins } = useAuth();

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
    playUnlock();
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
      playCorrect();
    } else {
      playWrong();
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
    playComplete();
    trackEvent("quiz_completed", {
      quiz_id: quiz?.id,
      quiz_title: quiz?.title,
      score,
      total: quiz?.questions.length,
    });

    if (!quiz) return;

    // Guest users: track session coins
    if (!user) {
      setCoinsAwarded(true);
      addSessionCoins(4);
      playCoins();
      trackEvent("coins_earned", { amount: 4, quiz_id: quiz.id, guest: true });
      return;
    }

    if (alreadyCompleted) return;

    // Award coins via API
    const res = await fetch("/api/quiz/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId: quiz.id, score }),
    });
    const data = await res.json();

    if (data.coins > 0) {
      setCoinsAwarded(true);
      playCoins();
      trackEvent("coins_earned", { amount: data.coins, quiz_id: quiz.id });
    }
    await refreshProfile();
  }, [quiz, score, user, alreadyCompleted, refreshProfile, addSessionCoins]);

  if (!quiz) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="text-xl text-text-secondary">Quiz not found</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 pixel-btn bg-pixel-blue text-white px-6 py-2 rounded-sm"
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
        <div className="pixel-card p-8 text-center">
          <div className="text-6xl mb-4">{quiz.emoji}</div>
          <h1 className="font-pixel text-sm md:text-base text-white mb-2">{quiz.title}</h1>
          <p className="text-text-secondary mb-2">{quiz.description}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-text-secondary mb-6">
            <span className="bg-pixel-blue/20 text-pixel-blue px-3 py-1 rounded-sm border border-pixel-blue/40">{quiz.category}</span>
            <span>{quiz.questions.length} questions</span>
            <span className="text-coin-gold font-bold">🪙 +4 coins</span>
          </div>

          {alreadyCompleted && (
            <div className="bg-coin-gold/10 border-2 border-coin-gold text-coin-gold px-4 py-3 rounded-sm mb-4 text-sm">
              You&apos;ve already completed this quiz. You can play again but won&apos;t earn additional coins.
            </div>
          )}

          <RewardedAd
            adName="quiz-unlock"
            buttonText="Unlock This Quiz"
            adLabel="Watch Ad"
            onReward={handleUnlockReward}
            className="bg-roblox-green text-white hover:brightness-110 w-full text-lg"
          />
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
        <div className="pixel-card p-8">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-text-secondary mb-2">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span className="text-pixel-cyan">Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</span>
            </div>
            <div className="pixel-progress">
              <div className="pixel-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-lg font-bold text-white mb-6">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-sm transition-all font-medium ";
              if (selectedAnswer === null) {
                buttonClass += "border-3 border-border-pixel bg-card text-text-primary hover:border-pixel-cyan hover:bg-card-hover cursor-pointer";
              } else if (index === question.correctAnswer) {
                buttonClass += "border-3 border-roblox-green bg-roblox-green/10 text-roblox-green correct-pulse";
              } else if (index === selectedAnswer) {
                buttonClass += "border-3 border-roblox-red bg-roblox-red/10 text-roblox-red shake";
              } else {
                buttonClass += "border-3 border-border-pixel text-text-secondary/40 bg-card";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="w-8 h-8 rounded-sm bg-[#0d1b2a] border-2 border-border-pixel flex items-center justify-center text-sm font-bold flex-shrink-0">
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
        <div className="pixel-card p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="font-pixel text-sm text-white mb-2">Quiz Complete!</h2>
          <p className="text-text-secondary mb-6">Watch a short ad to see your results and claim your coins!</p>
          <RewardedAd
            adName="quiz-results"
            buttonText={<span className="flex items-center gap-2"><span className="pixel-coin">C</span> Claim Your Coins For This Quiz</span>}
            adLabel="Watch Ad"
            onReward={handleResultsReward}
            className="bg-roblox-green text-white hover:brightness-110 w-full text-lg"
          />
        </div>
      </div>
    );
  }

  // RESULTS state
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="pixel-card p-8 text-center">
        <div className="text-6xl mb-4">
          {score === quiz.questions.length ? "🌟" : score >= quiz.questions.length / 2 ? "🎉" : "💪"}
        </div>
        <h2 className="font-pixel text-xs md:text-sm text-white mb-2">
          {score === quiz.questions.length
            ? "Perfect Score!"
            : score >= quiz.questions.length / 2
            ? "Great Job!"
            : "Keep Trying!"}
        </h2>
        <p className="text-4xl font-extrabold text-pixel-cyan mb-2">
          {score} / {quiz.questions.length}
        </p>
        <p className="text-text-secondary mb-4">correct answers</p>

        {coinsAwarded && (
          <div className="bg-coin-gold/10 border-2 border-coin-gold rounded-sm p-4 mb-6 slide-up">
            <span className="text-2xl coin-bounce inline-block">🪙</span>
            <p className="text-coin-gold font-bold text-lg">+4 coins earned!</p>
          </div>
        )}

        {!user && (
          <div className="bg-pixel-blue/10 border-2 border-pixel-blue rounded-sm p-5 mb-6 fade-in">
            <p className="text-coin-gold font-bold text-lg mb-1">🪙 You earned 4 coins!</p>
            <p className="text-pixel-blue text-sm mb-3">
              Sign up now to save your coins and cash out for Robux gift cards at 400 coins!
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => router.push("/signup")}
                className="bg-roblox-green text-white font-bold py-2.5 px-6 rounded-sm pixel-btn"
              >
                Sign Up & Save Coins
              </button>
              <button
                onClick={() => router.push("/login")}
                className="bg-transparent text-pixel-cyan font-bold py-2.5 px-6 rounded-sm border-2 border-pixel-cyan pixel-btn"
              >
                Log In
              </button>
            </div>
          </div>
        )}

        {alreadyCompleted && !coinsAwarded && (
          <div className="bg-card rounded-sm p-4 mb-6 text-text-secondary text-sm border-2 border-border-pixel">
            No additional coins — you&apos;ve completed this quiz before.
          </div>
        )}

        {/* Answer review */}
        <div className="text-left mt-6 space-y-3">
          <h3 className="font-bold text-text-secondary">Answer Review:</h3>
          {quiz.questions.map((q, i) => (
            <div key={i} className={`p-3 text-sm ${answers[i] === q.correctAnswer ? "bg-roblox-green/10 rounded-sm" : "bg-roblox-red/10 rounded-sm"}`}>
              <p className="font-medium text-white">{i + 1}. {q.question}</p>
              <p className={answers[i] === q.correctAnswer ? "text-roblox-green" : "text-roblox-red"}>
                Your answer: {q.options[answers[i]]}
                {answers[i] !== q.correctAnswer && (
                  <span className="text-roblox-green ml-2">| Correct: {q.options[q.correctAnswer]}</span>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => router.push("/")}
            className="flex-1 pixel-btn bg-pixel-blue text-white font-bold py-3 rounded-sm"
          >
            More Quizzes
          </button>
          {(user?.coins ?? 0) >= 400 && (
            <button
              onClick={() => router.push("/cashout")}
              className="flex-1 pixel-btn bg-roblox-green text-white font-bold py-3 rounded-sm"
            >
              Cash Out!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

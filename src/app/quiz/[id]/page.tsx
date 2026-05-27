"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { allQuizzes } from "@/data/quizzes";
import { trackEvent } from "@/lib/analytics";
import { scoreToCoins, MAX_COINS_PER_QUIZ } from "@/lib/coins";
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
  const [previousCoinsEarned, setPreviousCoinsEarned] = useState(0);
  const [coinsAwarded, setCoinsAwarded] = useState(0);
  const [coinsEarnedThisAttempt, setCoinsEarnedThisAttempt] = useState(0);

  useEffect(() => {
    if (!user || !quiz) return;
    const checkCompletion = async () => {
      const res = await fetch("/api/quiz/completions");
      const data = await res.json();
      const completion = data.completions?.find((c: { quizId: string }) => c.quizId === quiz.id);
      if (completion) {
        setPreviousCoinsEarned(completion.coinsEarned ?? 0);
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

    setTimeout(() => {
      if (quiz && currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
      } else {
        setState("finished");
      }
    }, 1000);
  };

  const handleRetake = () => {
    setState("locked");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setCoinsAwarded(0);
    setCoinsEarnedThisAttempt(0);
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

    const coinsForScore = scoreToCoins(score);
    setCoinsEarnedThisAttempt(coinsForScore);

    // Guest users: track session coins based on score
    if (!user) {
      if (coinsForScore > 0) {
        addSessionCoins(coinsForScore);
        setCoinsAwarded(coinsForScore);
        playCoins();
        trackEvent("coins_earned", { amount: coinsForScore, quiz_id: quiz.id, guest: true });
      }
      return;
    }

    // Logged-in users: award via API (handles retake logic server-side)
    const res = await fetch("/api/quiz/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId: quiz.id, score }),
    });
    const data = await res.json();

    if (data.coinsAwarded > 0) {
      setCoinsAwarded(data.coinsAwarded);
      playCoins();
      trackEvent("coins_earned", { amount: data.coinsAwarded, quiz_id: quiz.id });
    }
    setPreviousCoinsEarned(Math.max(previousCoinsEarned, coinsForScore));
    await refreshProfile();
  }, [quiz, score, user, previousCoinsEarned, refreshProfile, addSessionCoins]);

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

  const canEarnMore = previousCoinsEarned < MAX_COINS_PER_QUIZ;
  const maxedOut = previousCoinsEarned >= MAX_COINS_PER_QUIZ;

  // LOCKED state
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
            {canEarnMore ? (
              <span className="text-coin-gold font-bold flex items-center gap-1">
                <span className="pixel-coin" style={{ width: 14, height: 14, fontSize: 6 }}>C</span>
                +{MAX_COINS_PER_QUIZ - previousCoinsEarned} coin{MAX_COINS_PER_QUIZ - previousCoinsEarned !== 1 ? "s" : ""}
              </span>
            ) : (
              <span className="text-text-secondary font-bold">All coins earned</span>
            )}
          </div>

          {previousCoinsEarned > 0 && canEarnMore && (
            <div className="bg-coin-gold/10 border-2 border-coin-gold text-coin-gold px-4 py-3 rounded-sm mb-4 text-sm">
              You&apos;ve earned {previousCoinsEarned}/{MAX_COINS_PER_QUIZ} coins. Get 8+ correct to earn all 4!
            </div>
          )}

          {maxedOut && (
            <div className="bg-roblox-green/10 border-2 border-roblox-green text-roblox-green px-4 py-3 rounded-sm mb-4 text-sm">
              You&apos;ve earned all {MAX_COINS_PER_QUIZ} coins for this quiz. Play for fun!
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
          <div className="mb-6">
            <div className="flex justify-between text-sm text-text-secondary mb-2">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span className="text-pixel-cyan">Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</span>
            </div>
            <div className="pixel-progress">
              <div className="pixel-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <h2 className="text-lg font-bold text-white mb-6">{question.question}</h2>

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

  // FINISHED state
  if (state === "finished") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
        <div className="pixel-card p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="font-pixel text-sm text-white mb-2">Quiz Complete!</h2>
          <p className="text-text-secondary mb-6">Watch a short ad to see your results and claim your coins!</p>
          <RewardedAd
            adName="quiz-results"
            buttonText={<span className="flex items-center gap-2"><span className="pixel-coin">C</span> Claim Your Coins</span>}
            adLabel="Watch Ad"
            onReward={handleResultsReward}
            className="bg-roblox-green text-white hover:brightness-110 w-full text-lg"
          />
        </div>
      </div>
    );
  }

  // RESULTS state
  const totalCoinsNow = Math.max(previousCoinsEarned, coinsEarnedThisAttempt);
  const coinsStillAvailable = MAX_COINS_PER_QUIZ - totalCoinsNow;
  const canRetakeForMore = coinsStillAvailable > 0 && user;

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

        {/* Coins earned this attempt */}
        {coinsAwarded > 0 && (
          <div className="bg-coin-gold/10 border-2 border-coin-gold rounded-sm p-4 mb-4 slide-up">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="pixel-coin coin-bounce">C</span>
              <span className="text-coin-gold font-bold text-lg">+{coinsAwarded} coin{coinsAwarded !== 1 ? "s" : ""} earned!</span>
            </div>
            <p className="text-text-secondary text-xs">
              {coinsEarnedThisAttempt}/{MAX_COINS_PER_QUIZ} coins for this quiz
              {coinsStillAvailable > 0 && ` — get 8+ correct to earn more!`}
            </p>
          </div>
        )}

        {coinsAwarded === 0 && coinsEarnedThisAttempt > 0 && user && (
          <div className="bg-card rounded-sm p-4 mb-4 text-text-secondary text-sm border-2 border-border-pixel">
            You earned {coinsEarnedThisAttempt} coin{coinsEarnedThisAttempt !== 1 ? "s" : ""} this attempt, but you already had {previousCoinsEarned} from a previous try. No additional coins this time.
          </div>
        )}

        {coinsEarnedThisAttempt === 0 && (
          <div className="bg-roblox-red/10 border-2 border-roblox-red rounded-sm p-4 mb-4 text-roblox-red text-sm">
            Get at least 1 answer correct to earn coins!
          </div>
        )}

        {/* Guest signup prompt */}
        {!user && (
          <div className="bg-pixel-blue/10 border-2 border-pixel-blue rounded-sm p-5 mb-4 fade-in">
            <p className="text-coin-gold font-bold text-lg mb-1">
              <span className="pixel-coin inline-block mr-1">C</span> You earned {coinsEarnedThisAttempt} coin{coinsEarnedThisAttempt !== 1 ? "s" : ""}!
            </p>
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

        {/* Score breakdown */}
        <div className="bg-card border-2 border-border-pixel rounded-sm p-4 mb-4 text-sm text-left">
          <p className="text-text-secondary mb-2 font-bold">Coin Rewards:</p>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <span className={score >= 8 ? "text-coin-gold font-bold" : "text-text-secondary"}>8-10 correct = 4 coins</span>
            <span className={score >= 6 && score < 8 ? "text-coin-gold font-bold" : "text-text-secondary"}>6-7 correct = 3 coins</span>
            <span className={score >= 4 && score < 6 ? "text-coin-gold font-bold" : "text-text-secondary"}>4-5 correct = 2 coins</span>
            <span className={score >= 1 && score < 4 ? "text-coin-gold font-bold" : "text-text-secondary"}>1-3 correct = 1 coin</span>
          </div>
        </div>

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

        <div className="flex flex-col gap-3 mt-8">
          {/* Retake button - show if user can still earn more coins */}
          {canRetakeForMore && (
            <button
              onClick={handleRetake}
              className="w-full pixel-btn bg-coin-gold text-[#0d1b2a] font-bold py-3 rounded-sm text-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="pixel-coin" style={{ borderColor: "#0d1b2a" }}>C</span>
                Retake Quiz — earn up to {coinsStillAvailable} more coin{coinsStillAvailable !== 1 ? "s" : ""}
              </span>
            </button>
          )}

          {/* Guest retake - always allow */}
          {!user && coinsEarnedThisAttempt < MAX_COINS_PER_QUIZ && (
            <button
              onClick={handleRetake}
              className="w-full pixel-btn bg-coin-gold text-[#0d1b2a] font-bold py-3 rounded-sm text-lg"
            >
              Retake Quiz
            </button>
          )}

          <div className="flex gap-3">
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
    </div>
  );
}

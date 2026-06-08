"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { allQuizzes } from "@/data/quizzes";
import { trackEvent } from "@/lib/analytics";
import { scoreToCoins, MAX_COINS_PER_QUIZ } from "@/lib/coins";
import RewardedAd from "@/components/RewardedAd";
import AdBanner from "@/components/AdBanner";
import CreativeGenerator from "@/components/CreativeGenerator";
import { playCorrect, playWrong, playUnlock, playComplete, playCoins } from "@/lib/sounds";
import { useMemo } from "react";

const testimonials = [
  { emoji: "😎", name: "xDarkSlayer99", text: "I didn't think it was real but I actually got my Robux gift card code. Took me a few days of playing quizzes but totally worth it!" },
  { emoji: "🦊", name: "PixelFox_Gamer", text: "The quizzes are actually fun lol. I keep coming back to get more coins. Already cashed out once 🔥" },
  { emoji: "🐸", name: "FroggyPlays", text: "My friend told me about this and I thought it was fake. But nah it actually works, got my Robux code in like a week." },
  { emoji: "👾", name: "NoobMaster2015", text: "I play this during lunch break at school. Already saved up enough for a cashout. The anime quizzes are fire btw." },
  { emoji: "🎮", name: "RblxQueen_Sarah", text: "Easiest way to get Robux without asking my parents lol. Just watch a quick ad and answer some questions." },
  { emoji: "🤖", name: "TurboBot_X", text: "Been using this for 2 weeks now. Cashed out twice already. The Roblox and Minecraft quizzes are my favorite." },
  { emoji: "🐱", name: "KittyKat_Plays", text: "I was scared it was a scam but my friend showed me her gift card code and it worked!! Now I'm hooked 😂" },
  { emoji: "⚡", name: "ZapGamer_YT", text: "Way better than those fake Robux generators. This one actually gives you real gift card codes. 10/10 would recommend." },
  { emoji: "🌟", name: "StardustGirl", text: "The questions are fun and not too hard. I get most of them right and the coins add up pretty fast!" },
  { emoji: "🔥", name: "BlazeMC_Pro", text: "Bro I literally cashed out yesterday and redeemed it on Roblox right away. This site is legit no cap." },
];

type QuizState = "locked" | "playing" | "finished" | "results" | "claim-pending";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user, refreshProfile, addSessionCoins } = useAuth();
  const isAdmin = user?.isAdmin;

  const quiz = allQuizzes.find((q) => q.id === params.id);

  const randomTestimonials = useMemo(() => {
    const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState<QuizState>("locked");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [previousCoinsEarned, setPreviousCoinsEarned] = useState(0);
  const [coinsAwarded, setCoinsAwarded] = useState(0);
  const [coinsEarnedThisAttempt, setCoinsEarnedThisAttempt] = useState(0);
  const [noResultsAd, setNoResultsAd] = useState(false);

  // Preload ads on quiz pages — we know ads are needed here
  useEffect(() => {
    if (typeof window !== "undefined" && window.adConfig) {
      window.adConfig({ preloadAdBreaks: "on" });
    }
    return () => {
      if (typeof window !== "undefined" && window.adConfig) {
        window.adConfig({ preloadAdBreaks: "off" });
      }
    };
  }, []);

  const [pendingScore, setPendingScore] = useState(0);

  useEffect(() => {
    if (!user || !quiz) return;
    const checkCompletion = async () => {
      const res = await fetch("/api/quiz/completions");
      const data = await res.json();
      const completion = data.completions?.find((c: { quizId: string }) => c.quizId === quiz.id);
      if (completion) {
        setPreviousCoinsEarned(completion.coinsEarned ?? 0);
        // If coins aren't claimed yet, show the claim-pending state
        if (!completion.coinsClaimed && completion.coinsEarned > 0) {
          setPendingScore(completion.score ?? 0);
          setScore(completion.score ?? 0);
          setCoinsEarnedThisAttempt(completion.coinsEarned);
          setState("claim-pending");
        }
      }
    };
    checkCompletion();
  }, [user, quiz]);

  useEffect(() => {
    if (quiz) {
      trackEvent("quiz_viewed", { quiz_id: quiz.id, quiz_title: quiz.title, category: quiz.category, coins_available: MAX_COINS_PER_QUIZ - previousCoinsEarned, content_name: quiz.title, content_category: quiz.category });
    }
  }, [quiz]);

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
        // Save pending completion for logged-in users so they can claim later
        if (user && quiz) {
          const finalScore = newAnswers.filter((a, idx) => quiz.questions[idx] && a === quiz.questions[idx].correctAnswer).length;
          fetch("/api/quiz/pending", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quizId: quiz.id, score: finalScore }),
          }).catch(() => {});
        }
      }
    }, 1000);
  };

  const handleRetake = () => {
    // Update previousCoinsEarned to reflect best so far before resetting
    setPreviousCoinsEarned((prev) => Math.max(prev, coinsEarnedThisAttempt));
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
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="font-pixel text-sm md:text-base text-white">{quiz.title}</h1>
            {isAdmin && (
              <CreativeGenerator quizTitle={quiz.title} quizId={quiz.id} category={quiz.category} emoji={quiz.emoji} />
            )}
          </div>
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

          {/* Explainer + testimonials */}
          <div className="mt-6 text-left">
            <div className="bg-card border-2 border-border-pixel rounded-sm p-4 mb-4">
              <p className="text-text-secondary text-sm">
                <span className="text-coin-gold font-bold">How it works:</span> Watch a short ad to unlock this quiz, then answer 10 questions. The more you get right, the more coins you earn. Collect enough coins and cash them out for real Robux gift cards!
              </p>
            </div>

            <div className="space-y-3">
              {randomTestimonials.map((t) => (
                <div key={t.name} className="bg-card/50 rounded-sm p-3 border border-border-pixel/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{t.emoji}</span>
                    <span className="text-pixel-cyan font-bold text-xs">{t.name}</span>
                  </div>
                  <p className="text-text-secondary text-xs italic">&quot;{t.text}&quot;</p>
                </div>
              ))}
            </div>

            {/* Display banner ad — below testimonials */}
            <AdBanner slot="1383895707" className="mt-6" />
          </div>
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

          {/* Display banner ad — inside the card, under the answer options.
              key forces a fresh request per question (10 per quiz). */}
          <AdBanner key={currentQuestion} slot="1268190108" className="mt-6" />
        </div>
      </div>
    );
  }

  // FINISHED state + CLAIM-PENDING state (same UI, different entry point)
  if (state === "finished" || state === "claim-pending") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
        <div className="pixel-card p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="font-pixel text-sm text-white mb-2">
            {state === "claim-pending" ? "Coins Ready to Claim!" : "Quiz Complete!"}
          </h2>
          <p className="text-text-secondary mb-6">
            {state === "claim-pending"
              ? "You completed this quiz earlier. Watch a short ad to claim your coins!"
              : "Watch a short ad to see your results and claim your coins!"}
          </p>
          <RewardedAd
            adName="quiz-results"
            buttonText={<span className="flex items-center gap-2"><span className="pixel-coin">C</span> Claim Your Coins</span>}
            adLabel="Watch Ad"
            onReward={handleResultsReward}
            onDismiss={() => {}}
            onNoAdChange={setNoResultsAd}
            className="bg-roblox-green text-white hover:brightness-110 w-full text-lg"
          />

          {/* Only offer "come back later" when no rewarded ad is available */}
          {noResultsAd && (
            <button
              onClick={() => router.push("/")}
              className="mt-4 text-text-secondary text-sm hover:text-pixel-cyan transition-colors"
            >
              Come back later to claim
            </button>
          )}

          {/* Display banner ad — under the Claim Your Coins button */}
          <AdBanner slot="7830414786" className="mt-6" />
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

        {/* Guest: single merged box with coins + signup nudge */}
        {!user && coinsEarnedThisAttempt > 0 && (
          <div className="bg-pixel-blue/10 border-2 border-pixel-blue rounded-sm p-5 mb-4 slide-up">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="pixel-coin coin-bounce">C</span>
              <span className="text-coin-gold font-bold text-lg">+{coinsEarnedThisAttempt} coin{coinsEarnedThisAttempt !== 1 ? "s" : ""} earned!</span>
            </div>
            <p className="text-text-secondary text-xs mb-3">
              {coinsEarnedThisAttempt}/{MAX_COINS_PER_QUIZ} coins for this quiz
              {coinsStillAvailable > 0 && ` — get 8+ correct to earn more!`}
            </p>
            <p className="text-pixel-blue text-sm mb-3">
              Sign up now to save your coins and cash out for Robux gift cards at 200 coins!
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

        {/* Logged-in: coins earned box */}
        {user && coinsAwarded > 0 && (
          <div className="bg-coin-gold/10 border-2 border-coin-gold rounded-sm p-4 mb-4 slide-up">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="pixel-coin coin-bounce">C</span>
              <span className="text-coin-gold font-bold text-lg">+{coinsAwarded} coin{coinsAwarded !== 1 ? "s" : ""} earned!</span>
            </div>
            <p className="text-text-secondary text-xs">
              {totalCoinsNow}/{MAX_COINS_PER_QUIZ} coins for this quiz
              {coinsStillAvailable > 0 && ` — get 8+ correct to earn more!`}
            </p>
          </div>
        )}

        {user && coinsAwarded === 0 && coinsEarnedThisAttempt > 0 && (
          <div className="bg-card rounded-sm p-4 mb-4 text-text-secondary text-sm border-2 border-border-pixel">
            You earned {coinsEarnedThisAttempt} coin{coinsEarnedThisAttempt !== 1 ? "s" : ""} this attempt, but you already had {previousCoinsEarned} from a previous try. No additional coins this time.
          </div>
        )}

        {coinsEarnedThisAttempt === 0 && (
          <div className="bg-roblox-red/10 border-2 border-roblox-red rounded-sm p-4 mb-4 text-roblox-red text-sm">
            Get at least 1 answer correct to earn coins!
          </div>
        )}

        {/* Guest: no coins earned */}
        {!user && coinsEarnedThisAttempt === 0 && (
          <div className="bg-pixel-blue/10 border-2 border-pixel-blue rounded-sm p-5 mb-4 fade-in">
            <p className="text-pixel-blue text-sm mb-3">
              Sign up to save your progress and cash out for Robux gift cards!
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => router.push("/signup")}
                className="bg-roblox-green text-white font-bold py-2.5 px-6 rounded-sm pixel-btn"
              >
                Sign Up
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
              <span className="flex flex-col items-center gap-1">
                <span className="text-base">Retake Quiz</span>
                <span className="flex items-center gap-1 text-[10px] opacity-75 font-normal">
                  <span className="pixel-coin" style={{ width: 12, height: 12, fontSize: 5, borderColor: "#0d1b2a" }}>C</span>
                  Earn Up to {coinsStillAvailable} More Coin{coinsStillAvailable !== 1 ? "s" : ""}
                </span>
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
            {(user?.coins ?? 0) >= 200 && (
              <button
                onClick={() => router.push("/cashout")}
                className="flex-1 pixel-btn bg-roblox-green text-white font-bold py-3 rounded-sm"
              >
                Cash Out!
              </button>
            )}
          </div>
        </div>

        {/* Display banner ad — under the More Quizzes button (block context so it
            stays contained; inside a flex column it would overflow the card) */}
        <AdBanner slot="5131569023" className="mt-8" />
      </div>
    </div>
  );
}

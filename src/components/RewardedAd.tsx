"use client";

import { useState, useCallback, useEffect } from "react";

declare global {
  interface Window {
    adBreak: (config: AdBreakConfig) => void;
    adConfig: (config: AdConfigOptions) => void;
  }
}

interface AdBreakConfig {
  type: "reward" | "start" | "pause" | "next" | "browse";
  name: string;
  beforeAd?: () => void;
  afterAd?: () => void;
  beforeReward?: (showAdFn: () => void) => void;
  adViewed?: () => void;
  adDismissed?: () => void;
  adBreakDone?: (placementInfo: AdPlacementInfo) => void;
}

interface AdConfigOptions {
  preloadAdBreaks?: string;
  sound?: string;
  onReady?: () => void;
}

interface AdPlacementInfo {
  breakType: string;
  breakName: string;
  breakFormat: string;
  breakStatus: string;
}

interface RewardedAdProps {
  adName: string;
  buttonText: React.ReactNode;
  adLabel?: string;
  onReward: () => void;
  onDismiss?: () => void;
  onNoAdChange?: (noAd: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export default function RewardedAd({
  adName,
  buttonText,
  adLabel,
  onReward,
  onDismiss,
  onNoAdChange,
  className = "",
  disabled = false,
}: RewardedAdProps) {
  const [loading, setLoading] = useState(false);
  const [noAd, setNoAd] = useState(false);

  // Report "no ad available" state up so callers can react (e.g. show a fallback)
  useEffect(() => {
    onNoAdChange?.(noAd);
  }, [noAd, onNoAdChange]);

  const showAd = useCallback(() => {
    if (disabled || loading) return;
    setLoading(true);
    setNoAd(false);

    // Safety timeout — never stay stuck on "Loading..."
    const timeout = setTimeout(() => {
      setLoading(false);
      setNoAd(true);
    }, 15000);

    if (typeof window !== "undefined" && window.adBreak) {
      window.adBreak({
        type: "reward",
        name: adName,
        beforeReward: (showAdFn) => {
          showAdFn();
        },
        beforeAd: () => {},
        afterAd: () => {},
        adViewed: () => {
          clearTimeout(timeout);
          setLoading(false);
          setNoAd(false);
          onReward();
        },
        adDismissed: () => {
          clearTimeout(timeout);
          setLoading(false);
          onDismiss?.();
        },
        adBreakDone: (placementInfo) => {
          // adViewed/adDismissed already handled these
          if (placementInfo.breakStatus === "viewed" || placementInfo.breakStatus === "dismissed") {
            return;
          }
          // No rewarded ad available — show retry message
          clearTimeout(timeout);
          setLoading(false);
          setNoAd(true);
        },
      });
    } else {
      clearTimeout(timeout);
      setLoading(false);
      setNoAd(true);
    }
  }, [adName, onReward, onDismiss, disabled, loading]);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={showAd}
        disabled={disabled || loading}
        className={`flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-sm pixel-btn transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </>
        ) : (
          <span className="flex flex-col items-center gap-1">
            <span className="text-base">{buttonText}</span>
            {adLabel && (
              <span className="flex items-center gap-1 text-[10px] opacity-75 font-normal">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                {adLabel}
              </span>
            )}
          </span>
        )}
      </button>

      {noAd && (
        <div className="bg-coin-gold/10 border-2 border-coin-gold rounded-sm p-3 text-center text-sm w-full fade-in">
          <p className="text-coin-gold font-bold mb-1">No ads available right now</p>
          <p className="text-text-secondary text-xs">Please try again in a few minutes or try other quizzes in the meantime.</p>
        </div>
      )}
    </div>
  );
}

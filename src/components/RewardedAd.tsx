"use client";

import { useState, useCallback } from "react";

declare global {
  interface Window {
    adBreak: (config: AdBreakConfig) => void;
    adConfig: (config: AdConfigOptions) => void;
  }
}

interface AdBreakConfig {
  type: "reward";
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
  buttonText: string;
  onReward: () => void;
  onDismiss?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function RewardedAd({
  adName,
  buttonText,
  onReward,
  onDismiss,
  className = "",
  disabled = false,
}: RewardedAdProps) {
  const [loading, setLoading] = useState(false);

  const showAd = useCallback(() => {
    if (disabled || loading) return;
    setLoading(true);

    if (typeof window !== "undefined" && window.adBreak) {
      window.adBreak({
        type: "reward",
        name: adName,
        beforeReward: (showAdFn) => {
          // User already clicked the button, so show the ad immediately
          showAdFn();
        },
        beforeAd: () => {},
        afterAd: () => {},
        adViewed: () => {
          setLoading(false);
          onReward();
        },
        adDismissed: () => {
          setLoading(false);
          onDismiss?.();
        },
        adBreakDone: (placementInfo) => {
          // If no ad was available, grant reward anyway (dev/low-fill)
          if (placementInfo.breakStatus === "notReady" || placementInfo.breakStatus === "frequencyCapped") {
            setLoading(false);
            onReward();
          }
        },
      });
    } else {
      // Development fallback: no ads available, grant reward
      setTimeout(() => {
        setLoading(false);
        onReward();
      }, 500);
    }
  }, [adName, onReward, onDismiss, disabled, loading]);

  return (
    <button
      onClick={showAd}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading Ad...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
          {buttonText}
        </>
      )}
    </button>
  );
}

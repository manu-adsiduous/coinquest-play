"use client";

import { useState, useCallback } from "react";
import { unlockAudio } from "@/lib/sounds";

declare global {
  interface Window {
    adBreak: (config: AdBreakConfig) => void;
    adConfig: (config: AdConfigOptions) => void;
  }
}

interface AdBreakConfig {
  type: "reward" | "next";
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
  className?: string;
  disabled?: boolean;
}

export default function RewardedAd({
  adName,
  buttonText,
  adLabel,
  onReward,
  onDismiss,
  className = "",
  disabled = false,
}: RewardedAdProps) {
  const [loading, setLoading] = useState(false);

  const showInterstitialFallback = useCallback(() => {
    if (typeof window === "undefined" || !window.adBreak) {
      // No ad API at all — grant reward
      setLoading(false);
      onReward();
      return;
    }

    window.adBreak({
      type: "next",
      name: `${adName}-interstitial`,
      beforeAd: () => {},
      afterAd: () => {},
      adBreakDone: (placementInfo) => {
        setLoading(false);
        // Grant reward regardless — interstitial was either shown or unavailable
        if (placementInfo.breakStatus === "viewed" || placementInfo.breakStatus === "notReady" || placementInfo.breakStatus === "frequencyCapped") {
          onReward();
        } else {
          // dismissed — still grant since this is a fallback
          onReward();
        }
      },
    });
  }, [adName, onReward]);

  const showAd = useCallback(() => {
    if (disabled || loading) return;
    unlockAudio(); // Unlock audio context on user gesture
    setLoading(true);

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
          setLoading(false);
          onReward();
        },
        adDismissed: () => {
          setLoading(false);
          onDismiss?.();
        },
        adBreakDone: (placementInfo) => {
          // Rewarded ad not available — fall back to interstitial
          if (placementInfo.breakStatus === "notReady" || placementInfo.breakStatus === "frequencyCapped") {
            showInterstitialFallback();
          }
        },
      });
    } else {
      // Development fallback
      setTimeout(() => {
        setLoading(false);
        onReward();
      }, 500);
    }
  }, [adName, onReward, onDismiss, disabled, loading, showInterstitialFallback]);

  return (
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
  );
}

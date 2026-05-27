"use client";

import { useState, useCallback } from "react";

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
      console.log("[RewardedAd] No adBreak API — granting reward directly");
      setLoading(false);
      onReward();
      return;
    }

    console.log("[RewardedAd] Falling back to interstitial");
    window.adBreak({
      type: "next",
      name: `${adName}-interstitial`,
      beforeAd: () => { console.log("[RewardedAd] interstitial beforeAd"); },
      afterAd: () => { console.log("[RewardedAd] interstitial afterAd"); },
      adBreakDone: (placementInfo) => {
        console.log("[RewardedAd] interstitial adBreakDone:", JSON.stringify(placementInfo));
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
    setLoading(true);

    if (typeof window !== "undefined" && window.adBreak) {
      console.log("[RewardedAd] Requesting rewarded ad:", adName);
      window.adBreak({
        type: "reward",
        name: adName,
        beforeReward: (showAdFn) => {
          console.log("[RewardedAd] beforeReward called, showing ad");
          showAdFn();
        },
        beforeAd: () => { console.log("[RewardedAd] beforeAd"); },
        afterAd: () => { console.log("[RewardedAd] afterAd"); },
        adViewed: () => {
          console.log("[RewardedAd] adViewed — granting reward");
          setLoading(false);
          onReward();
        },
        adDismissed: () => {
          console.log("[RewardedAd] adDismissed");
          setLoading(false);
          onDismiss?.();
        },
        adBreakDone: (placementInfo) => {
          console.log("[RewardedAd] adBreakDone:", JSON.stringify(placementInfo));
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

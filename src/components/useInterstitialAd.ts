"use client";

import { useCallback } from "react";

/**
 * Navigate to the home/quiz list, showing an H5 interstitial first when one is
 * available (Google frequency-caps these, so it won't appear on every click).
 *
 * Navigation uses a hard `window.location` change rather than the SPA router:
 * the ad SDK interferes with client-side router.push from inside its callbacks,
 * which stranded users on the original page (they had to click twice). A hard
 * navigation always lands. We trigger on afterAd/adBreakDone (whichever the SDK
 * fires) with a timeout fallback for a fully blocked ad script; the beforeAd
 * guard keeps the fallback from interrupting a visible ad.
 */
export function useInterstitialAd() {
  return useCallback((href = "/") => {
    if (typeof window === "undefined") return;

    let navigated = false;
    const go = () => {
      if (navigated) return;
      navigated = true;
      window.location.assign(href);
    };

    if (!window.adBreak) {
      go();
      return;
    }

    let adStarted = false;
    const timeout = setTimeout(() => {
      if (!adStarted) go();
    }, 2000);

    window.adBreak({
      type: "next",
      name: "home-nav",
      beforeAd: () => {
        adStarted = true;
      },
      afterAd: () => {
        clearTimeout(timeout);
        go();
      },
      adBreakDone: () => {
        clearTimeout(timeout);
        go();
      },
    });
  }, []);
}

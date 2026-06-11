"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Returns a navigate-with-interstitial function for going to the home/quiz list.
 *
 * Shows an H5 interstitial ad (when one is available — Google frequency-caps
 * interstitials, so it won't appear on every click), then navigates. It always
 * navigates regardless: immediately if the ad API is unavailable, when the ad is
 * dismissed, or via a short backstop if no ad starts. If an ad does start, we
 * wait for adBreakDone (the user closing it) so we never navigate out from under
 * a visible ad.
 */
export function useInterstitialAd() {
  const router = useRouter();

  return useCallback(
    (href = "/") => {
      let done = false;
      const navigate = () => {
        if (done) return;
        done = true;
        router.push(href);
      };

      if (typeof window === "undefined" || !window.adBreak) {
        navigate();
        return;
      }

      let adStarted = false;
      // Safety net only: when an ad is available it fires beforeAd/adBreakDone
      // in well under a second (it's preloaded), and a frequency-capped/no-fill
      // break fires adBreakDone immediately. This timeout just covers the case
      // where the ad script is blocked entirely (e.g. an ad blocker) so those
      // users still navigate promptly instead of waiting.
      const timeout = setTimeout(() => {
        if (!adStarted) navigate();
      }, 1200);

      window.adBreak({
        type: "next",
        name: "home-nav",
        beforeAd: () => {
          adStarted = true;
        },
        adBreakDone: () => {
          clearTimeout(timeout);
          navigate();
        },
      });
    },
    [router],
  );
}

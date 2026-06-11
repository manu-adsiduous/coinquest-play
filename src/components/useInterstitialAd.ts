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
      // No ad available / frequency-capped → navigate without waiting.
      const timeout = setTimeout(() => {
        if (!adStarted) navigate();
      }, 3000);

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

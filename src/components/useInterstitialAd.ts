"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Returns a navigate-with-interstitial function for going to the home/quiz list.
 *
 * Shows an H5 interstitial ad (when one is available — Google frequency-caps
 * interstitials, so it won't appear on every click), then navigates to `href`.
 *
 * Navigation is guaranteed:
 * - No ad API (SSR) → navigate immediately.
 * - adBreakDone (ad closed / frequency-capped / no fill) → ALWAYS navigate. This
 *   is unconditional on purpose: even if the fallback timeout already fired
 *   during a slow-loading ad, we still land on the page once the ad is
 *   dismissed (a repeat push to the same route is a harmless no-op).
 * - Ad script blocked entirely (e.g. ad blocker) → no callback ever fires, so a
 *   timeout navigates. The `beforeAd` guard suppresses it while an ad is
 *   showing, so it can't pre-empt a visible ad.
 */
export function useInterstitialAd() {
  const router = useRouter();

  return useCallback(
    (href = "/") => {
      if (typeof window === "undefined" || !window.adBreak) {
        router.push(href);
        return;
      }

      let adStarted = false;

      const timeout = setTimeout(() => {
        if (!adStarted) router.push(href);
      }, 2000);

      window.adBreak({
        type: "next",
        name: "home-nav",
        beforeAd: () => {
          adStarted = true;
        },
        adBreakDone: () => {
          clearTimeout(timeout);
          router.push(href);
        },
      });
    },
    [router],
  );
}

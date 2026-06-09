"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AD_CLIENT = "ca-pub-8356035806330431";

interface AdBannerProps {
  /** AdSense ad unit slot ID */
  slot: string;
  /** Extra classes for the wrapper (e.g. margins) */
  className?: string;
}

/**
 * Renders a single AdSense display banner unit. This is separate from the
 * rewarded H5 ad flow (adBreak/adConfig) used to unlock quizzes / claim coins.
 *
 * Responsive: the ad fits the wrapper's width (so it never gets cut off) and
 * AdSense sets the height to match the served creative, so the box hugs the ad
 * with no empty space below. full-width-responsive is off so the ad stays
 * within its container (e.g. a card) instead of expanding to the full mobile
 * screen width. For this to size correctly the ad unit must be a "Responsive"
 * display unit in AdSense (a fixed/Square unit reserves a fixed height and will
 * leave gaps under shorter creatives).
 *
 * Each mounted instance requests exactly one ad. To request a fresh ad (e.g.
 * one per quiz question), give the component a changing `key` so it remounts.
 */
export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    // Skip if this <ins> was already filled (guards React strict-mode double effect)
    if (insRef.current?.getAttribute("data-adsbygoogle-status")) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // adsbygoogle script not ready yet — fail silently
    }
  }, []);

  return (
    <div className={`flex justify-center overflow-hidden ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="false"
      />
    </div>
  );
}

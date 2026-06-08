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
  /** Fixed ad width in px (defaults to a 300x250 medium rectangle) */
  width?: number;
  /** Fixed ad height in px */
  height?: number;
}

/**
 * Renders a single AdSense display banner unit. This is separate from the
 * rewarded H5 ad flow (adBreak/adConfig) used to unlock quizzes / claim coins.
 *
 * We request a fixed size (default 300x250) rather than a responsive unit so the
 * box always exactly matches the creative — no reserved empty space below short
 * creatives. The ad is centered within its wrapper.
 *
 * Each mounted instance requests exactly one ad. To request a fresh ad (e.g.
 * one per quiz question), give the component a changing `key` so it remounts.
 */
export default function AdBanner({
  slot,
  className = "",
  width = 300,
  height = 250,
}: AdBannerProps) {
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
        style={{ display: "inline-block", width: `${width}px`, height: `${height}px` }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
      />
    </div>
  );
}

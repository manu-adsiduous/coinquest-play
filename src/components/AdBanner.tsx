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
  /** AdSense ad format — defaults to responsive "auto" */
  format?: string;
  /** Allow full-width responsive sizing */
  responsive?: boolean;
}

/**
 * Renders a single AdSense display banner unit. This is separate from the
 * rewarded H5 ad flow (adBreak/adConfig) used to unlock quizzes / claim coins.
 *
 * Each mounted instance requests exactly one ad. To request a fresh ad (e.g.
 * one per quiz question), give the component a changing `key` so it remounts.
 */
export default function AdBanner({
  slot,
  className = "",
  format = "auto",
  responsive = true,
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
    <div className={`overflow-hidden ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

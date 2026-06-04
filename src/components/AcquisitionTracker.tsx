"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const STORAGE_KEY = "cq_acquisition";

const TRACKED_PARAMS = [
  "fbclid", "gclid", "ttclid",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
];

export function getAcquisitionData(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function AcquisitionTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only capture on first visit (don't overwrite existing data)
    const existing = getAcquisitionData();
    if (existing.captured) return;

    const data: Record<string, string> = {};
    let hasData = false;

    for (const param of TRACKED_PARAMS) {
      const value = searchParams.get(param);
      if (value) {
        data[param] = value;
        hasData = true;
      }
    }

    // Also capture the landing page and referrer
    data.landing_page = window.location.pathname;
    if (document.referrer) {
      data.referrer = document.referrer;
    }

    // Derive source from click IDs if UTM not present
    if (!data.utm_source) {
      if (data.fbclid) data.utm_source = "meta";
      else if (data.gclid) data.utm_source = "google";
      else if (data.ttclid) data.utm_source = "tiktok";
      else if (data.referrer) {
        const ref = data.referrer.toLowerCase();
        if (ref.includes("google")) data.utm_source = "google_organic";
        else if (ref.includes("facebook") || ref.includes("instagram")) data.utm_source = "meta_organic";
        else if (ref.includes("tiktok")) data.utm_source = "tiktok_organic";
        else data.utm_source = "referral";
      } else {
        data.utm_source = "direct";
      }
    }

    data.captured = "true";
    data.captured_at = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [searchParams]);

  return null;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export default function PageViewTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    // Avoid firing twice for the same path
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    trackEvent("pageview", { page: pathname });
  }, [pathname]);

  return null;
}

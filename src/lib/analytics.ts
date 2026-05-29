declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}

// Map our event names to Meta standard/custom events
const META_EVENT_MAP: Record<string, string> = {
  pageview: "PageView",
  sign_up: "CompleteRegistration",
  login: "Login",
  quiz_viewed: "ViewContent",
  quiz_unlocked: "QuizUnlocked",
  quiz_completed: "QuizCompleted",
  coins_earned: "CoinsEarned",
  cashout: "Purchase",
};

function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const eventId = generateEventId();

  // Google Analytics
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }

  // Meta Pixel (client-side)
  if (window.fbq) {
    const metaEvent = META_EVENT_MAP[eventName] || eventName;
    const metaParams: Record<string, unknown> = { ...params };

    // Add value/currency for standard events that require it
    const eventsNeedingValue = ["CompleteRegistration", "ViewContent", "Purchase"];
    if (eventsNeedingValue.includes(metaEvent)) {
      metaParams.value = metaParams.value ?? 0;
      metaParams.currency = metaParams.currency ?? "USD";
    }

    const standardEvents = ["PageView", "CompleteRegistration", "ViewContent", "Purchase"];
    if (standardEvents.includes(metaEvent)) {
      window.fbq("track", metaEvent, metaParams, { eventID: eventId });
    } else {
      window.fbq("trackCustom", metaEvent, metaParams, { eventID: eventId });
    }
  }

  // Collect Meta browser params for CAPI
  const fbc = getCookie("_fbc");
  const fbp = getCookie("_fbp");
  const sourceUrl = window.location.href;

  // Send to our server (database + Meta CAPI with same eventId for dedup)
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: eventName,
      properties: params || {},
      eventId,
      fbc,
      fbp,
      sourceUrl,
    }),
  }).catch(() => {});
}

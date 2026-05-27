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

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  const eventId = generateEventId();

  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }

  // Meta Pixel (client-side)
  if (typeof window !== "undefined" && window.fbq) {
    const metaEvent = META_EVENT_MAP[eventName] || eventName;
    const metaParams = { ...params, eventID: eventId };

    // Use trackSingle for standard events, trackSingleCustom for custom
    const standardEvents = ["PageView", "CompleteRegistration", "ViewContent", "Purchase"];
    if (standardEvents.includes(metaEvent)) {
      window.fbq("track", metaEvent, metaParams, { eventID: eventId });
    } else {
      window.fbq("trackCustom", metaEvent, metaParams, { eventID: eventId });
    }
  }

  // Send to our server (database + Meta CAPI with same eventId for dedup)
  if (typeof window !== "undefined") {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        properties: params || {},
        eventId,
      }),
    }).catch(() => {});
  }
}

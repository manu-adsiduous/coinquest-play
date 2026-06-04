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

  // Google Analytics + Google Ads conversions
  if (window.gtag) {
    window.gtag("event", eventName, params);

    // Send Google Ads conversion events with specific labels
    const GADS_LABELS: Record<string, string> = {
      sign_up: "AW-18213485612/JMt9CMCciLkcEKz47uxD",
      quiz_viewed: "AW-18213485612/hWEcCNnW8rgcEKz47uxD",
      quiz_unlocked: "AW-18213485612/9YZJCNzW8rgcEKz47uxD",
      quiz_completed: "AW-18213485612/nkQ2CN_W8rgcEKz47uxD",
      cashout: "AW-18213485612/C9o7CNrX8rgcEKz47uxD",
    };
    if (GADS_LABELS[eventName]) {
      window.gtag("event", "conversion", {
        send_to: GADS_LABELS[eventName],
      });
    }
  }

  // Meta Pixel (client-side)
  if (window.fbq) {
    const metaEvent = META_EVENT_MAP[eventName] || eventName;
    const metaParams: Record<string, unknown> = { ...params };

    // Add value/currency for all Meta events
    if (!metaParams.currency) metaParams.currency = "USD";
    if (metaParams.value === undefined) {
      // Set meaningful values per event type
      if (metaEvent === "Purchase") metaParams.value = 2;
      else if (metaEvent === "CompleteRegistration") metaParams.value = 0.5;
      else if (metaEvent === "ViewContent") metaParams.value = metaParams.coins_available ?? 0.1;
      else if (metaEvent === "QuizCompleted") metaParams.value = metaParams.coins_earned ?? 0;
      else if (metaEvent === "QuizUnlocked") metaParams.value = 0.2;
      else metaParams.value = 0;
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

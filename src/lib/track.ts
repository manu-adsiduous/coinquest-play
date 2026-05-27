import { getDb } from "./db";

interface EventProperties {
  [key: string]: string | number | boolean | null | undefined;
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

/** Log an event to the database and send to Meta CAPI */
export async function trackServerEvent(
  eventName: string,
  userId: number | null,
  properties: EventProperties = {},
  userAgent?: string,
  ip?: string,
  eventId?: string,
) {
  // Store in database
  const sql = getDb();
  try {
    await sql`
      INSERT INTO events (event_name, user_id, properties)
      VALUES (${eventName}, ${userId}, ${JSON.stringify(properties)})
    `;
  } catch (e) {
    console.error("Failed to log event:", e);
  }

  // Send to Meta Conversions API
  const datasetId = process.env.META_DATASET_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  if (datasetId && accessToken) {
    sendToMeta(datasetId, accessToken, eventName, userId, properties, userAgent, ip, eventId).catch((e) =>
      console.error("Meta event error:", e)
    );
  }
}

async function sendToMeta(
  datasetId: string,
  accessToken: string,
  eventName: string,
  userId: number | null,
  properties: EventProperties,
  userAgent?: string,
  ip?: string,
  eventId?: string,
) {
  const metaEventName = META_EVENT_MAP[eventName] || eventName;

  const eventData: Record<string, unknown> = {
    event_name: metaEventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: {
      ...(userId ? { external_id: String(userId) } : {}),
      ...(ip ? { client_ip_address: ip } : {}),
      ...(userAgent ? { client_user_agent: userAgent } : {}),
    },
    custom_data: properties,
  };

  // event_id for deduplication with Pixel
  if (eventId) {
    eventData.event_id = eventId;
  }

  await fetch(
    `https://graph.facebook.com/v21.0/${datasetId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [eventData] }),
    }
  );
}

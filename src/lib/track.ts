import { createHash } from "crypto";
import { getDb } from "./db";

interface EventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

interface MetaBrowserData {
  fbc?: string;
  fbp?: string;
  sourceUrl?: string;
  email?: string;
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

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/** Log an event to the database and send to Meta CAPI */
export async function trackServerEvent(
  eventName: string,
  userId: number | null,
  properties: EventProperties = {},
  userAgent?: string,
  ip?: string,
  eventId?: string,
  browserData?: MetaBrowserData,
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
    sendToMeta(datasetId, accessToken, eventName, userId, properties, userAgent, ip, eventId, browserData).catch((e) =>
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
  browserData?: MetaBrowserData,
) {
  const metaEventName = META_EVENT_MAP[eventName] || eventName;

  // Build user_data with all available identifiers
  const userData: Record<string, string> = {};
  if (userId) userData.external_id = sha256(String(userId));
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  if (browserData?.email) userData.em = sha256(browserData.email);
  if (browserData?.fbc) userData.fbc = browserData.fbc;
  if (browserData?.fbp) userData.fbp = browserData.fbp;

  const eventData: Record<string, unknown> = {
    event_name: metaEventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: userData,
    custom_data: properties,
  };

  if (eventId) eventData.event_id = eventId;
  if (browserData?.sourceUrl) eventData.event_source_url = browserData.sourceUrl;

  await fetch(
    `https://graph.facebook.com/v21.0/${datasetId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [eventData] }),
    }
  );
}

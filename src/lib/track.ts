import { getDb } from "./db";

interface EventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

/** Log an event to the database and send to Meta */
export async function trackServerEvent(
  eventName: string,
  userId: number | null,
  properties: EventProperties = {},
  userAgent?: string,
  ip?: string,
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
    sendToMeta(datasetId, accessToken, eventName, userId, properties, userAgent, ip).catch((e) =>
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
) {
  const eventData = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: {
      ...(userId ? { external_id: String(userId) } : {}),
      ...(ip ? { client_ip_address: ip } : {}),
      ...(userAgent ? { client_user_agent: userAgent } : {}),
    },
    custom_data: properties,
  };

  await fetch(
    `https://graph.facebook.com/v21.0/${datasetId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [eventData] }),
    }
  );
}

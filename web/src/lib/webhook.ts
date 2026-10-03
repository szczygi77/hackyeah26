/** Optional outbound webhook stub for Hub integrations (env WEBHOOK_URL). */
export async function notifyWebhook(event: string, payload: Record<string, unknown>) {
  const url = process.env.WEBHOOK_URL;
  if (!url) return { sent: false as const, reason: "no WEBHOOK_URL" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, payload, at: new Date().toISOString() }),
    });
    return { sent: res.ok as boolean, status: res.status };
  } catch (e) {
    return { sent: false as const, reason: String(e) };
  }
}

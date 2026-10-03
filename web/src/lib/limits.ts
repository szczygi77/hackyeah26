/** Simple in-memory rate limits for demo (resets on process restart). */

type Bucket = { count: number; resetAt: number };

const submissionBuckets = new Map<string, Bucket>();
const aiBuckets = new Map<string, Bucket>();

function dayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function checkSubmissionLimit(key: string, maxPerHour = 20): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const bucket = submissionBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    submissionBuckets.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return { ok: true };
  }
  if (bucket.count >= maxPerHour) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true };
}

export function checkAiDailyLimit(): { ok: boolean; remaining: number } {
  const max = Number(process.env.AI_DAILY_LIMIT || 200);
  const key = dayKey();
  const bucket = aiBuckets.get(key);
  if (!bucket) {
    aiBuckets.set(key, { count: 0, resetAt: 0 });
  }
  const b = aiBuckets.get(key)!;
  const remaining = Math.max(0, max - b.count);
  return { ok: b.count < max, remaining };
}

export function consumeAiCall(): boolean {
  const check = checkAiDailyLimit();
  if (!check.ok) return false;
  const key = dayKey();
  const b = aiBuckets.get(key)!;
  b.count += 1;
  return true;
}

export function isHoneypotFilled(formData: FormData): boolean {
  const v = String(formData.get("website") || formData.get("company_url") || "").trim();
  return v.length > 0;
}

import { createHash } from "node:crypto";
import { prisma } from "@/lib/db";
import { notifyWebhook } from "@/lib/webhook";

export function emailHash(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

export async function notifyAdmins(title: string, body: string, href: string, event: string) {
  await prisma.notification.create({
    data: { role: "ADMIN", title, body, href },
  });
  return notifyWebhook(event, { title, href });
}

/** Jeden alert publiczny na stronie naboru. Bez adresu e-mail. */
export async function notifySubscribers(title: string, topic: string, href: string) {
  await prisma.notification.create({
    data: {
      role: "SUBSCRIBER",
      title,
      body: topic || "nabór",
      href,
    },
  });
}

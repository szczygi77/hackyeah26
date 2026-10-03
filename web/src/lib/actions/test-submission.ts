"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { publicSubmissionId } from "@/lib/ids";
import { maskPii } from "@/lib/match/pii";
import { checkSubmissionLimit, isHoneypotFilled } from "@/lib/limits";

export async function submitTestInterest(formData: FormData) {
  if (isHoneypotFilled(formData)) redirect("/");
  const h = await headers();
  if (!checkSubmissionLimit(`test:${h.get("x-forwarded-for") || "local"}`).ok) redirect("/");

  const innovationId = String(formData.get("innovationId") || "");
  if (!innovationId) redirect("/tester");

  const area = String(formData.get("area") || "");
  const roleLabel = String(formData.get("roleLabel") || "");
  const contactEmail = maskPii(String(formData.get("contactEmail") || "")).masked;
  const contactName = String(formData.get("contactName") || "");
  const rating = Number(formData.get("rating") || 0) || null;
  const improvement = String(formData.get("improvement") || "");
  const body = `Chęć testu innowacji. Obszar: ${area}. Rola: ${roleLabel}.`;

  const sub = await prisma.submission.create({
    data: {
      type: "TEST",
      status: "ACCEPTED",
      publicId: publicSubmissionId(),
      title: "Zgłoszenie testu",
      body,
      contactEmail,
      contactName,
      roleLabel,
      area,
      innovationId,
      rating,
      improvement,
      statusEvents: { create: { status: "ACCEPTED", note: "Zgłoszenie testu przyjęte", actorRole: "system" } },
      thread: { create: {} },
    },
  });
  await prisma.notification.create({
    data: {
      role: "ADMIN",
      title: "Nowe zgłoszenie testu",
      body: body.slice(0, 160),
      href: `/admin/zgloszenie/${sub.id}`,
    },
  });
  redirect(`/zgloszenie/${sub.publicId}`);
}

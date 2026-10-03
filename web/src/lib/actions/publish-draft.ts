"use server";

import { AdaptNotFoundError } from "@/lib/adapt";
import { requireRole } from "@/lib/auth-guard";
import { publishPendingDraft } from "@/lib/catalog";
import { RagConfigError, RagUpstreamError } from "@/lib/rag";

export async function publishDraftAction(
  draftId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireRole("ADMIN");
  try {
    await publishPendingDraft(draftId);
    return { ok: true };
  } catch (error) {
    if (error instanceof AdaptNotFoundError) {
      return { ok: false, error: "Ten szkic nie czeka już na zatwierdzenie." };
    }
    if (error instanceof RagConfigError || error instanceof RagUpstreamError) {
      return { ok: false, error: error.message };
    }
    return { ok: false, error: "Nie udało się opublikować szkicu." };
  }
}

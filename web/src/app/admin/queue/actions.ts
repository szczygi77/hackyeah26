"use server";

import { isInnovationId } from "@/lib/adapt";
import { requireRole } from "@/lib/auth-guard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function publishedDescription(rural: string, urban: string) {
  return `Wariant dla dużego miasta: ${urban}\n\nWariant dla wsi i małych miast: ${rural}`;
}

async function adminClient() {
  await requireRole("ADMIN");
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/login?error=config");
  return supabase;
}

export async function publishDraft(formData: FormData) {
  const draftId = String(formData.get("draftId") || "");
  if (!isInnovationId(draftId)) redirect("/admin/queue");

  const supabase = await adminClient();
  const { data: draft } = await supabase
    .from("innovation_drafts")
    .select("id, innovation_id, proposed_variants")
    .eq("id", draftId)
    .eq("status", "PENDING_APPROVAL")
    .maybeSingle();

  if (!draft) redirect("/admin/queue?error=1");

  const variants = draft.proposed_variants as { ruralVariant?: string; urbanVariant?: string } | null;
  const rural = variants?.ruralVariant?.trim() ?? "";
  const urban = variants?.urbanVariant?.trim() ?? "";

  const { error: cardError } = await supabase
    .from("innovations")
    .update({ description: publishedDescription(rural, urban) })
    .eq("id", draft.innovation_id);

  if (cardError) redirect("/admin/queue?error=1");

  const { error } = await supabase
    .from("innovation_drafts")
    .update({ status: "PUBLISHED" })
    .eq("id", draftId)
    .eq("status", "PENDING_APPROVAL");

  if (error) redirect("/admin/queue?error=1");
  redirect("/admin/queue?opublikowano=1");
}

export async function rejectDraft(formData: FormData) {
  const draftId = String(formData.get("draftId") || "");
  const feedback = String(formData.get("feedback") || "").trim();
  if (!isInnovationId(draftId) || !feedback) redirect("/admin/queue?error=1");

  const supabase = await adminClient();
  const { error } = await supabase
    .from("innovation_drafts")
    .update({ status: "REJECTED", feedback })
    .eq("id", draftId)
    .eq("status", "PENDING_APPROVAL");

  if (error) redirect("/admin/queue?error=1");
  redirect("/admin/queue?odrzucono=1");
}

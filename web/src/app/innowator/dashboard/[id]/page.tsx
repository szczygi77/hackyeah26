import { isInnovationId } from "@/lib/adapt";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type DraftDetail = {
  id: string;
  status: string;
  proposed_variants: { ruralVariant?: string; urbanVariant?: string } | null;
  innovations: { title: string; author_id: string } | { title: string; author_id: string }[] | null;
};

function one<T>(value: T | T[] | null): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

async function sendToRops(formData: FormData) {
  "use server";
  const draftId = String(formData.get("draftId") || "");
  if (!isInnovationId(draftId)) redirect("/innowator/dashboard");

  const ruralVariant = String(formData.get("ruralVariant") || "").trim();
  const urbanVariant = String(formData.get("urbanVariant") || "").trim();

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/login?error=config");
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) redirect("/login");

  const { data: owned } = await supabase
    .from("innovation_drafts")
    .select("id, status, innovations!inner(author_id)")
    .eq("id", draftId)
    .eq("innovations.author_id", userId)
    .eq("status", "DRAFT")
    .maybeSingle();

  if (!owned) redirect("/innowator/dashboard");

  const { error } = await supabase
    .from("innovation_drafts")
    .update({
      status: "PENDING_APPROVAL",
      proposed_variants: { ruralVariant, urbanVariant },
    })
    .eq("id", draftId)
    .eq("status", "DRAFT");

  if (error) redirect(`/innowator/dashboard/${draftId}?error=1`);
  redirect("/innowator/dashboard?wyslano=1");
}

const fieldClass =
  "mt-1 w-full min-h-36 border-2 border-neutral-900 bg-white px-3 py-2 text-lg text-neutral-950 outline-none focus:ring-2 focus:ring-blue-600";

export default async function DraftReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  if (!isInnovationId(id)) notFound();

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/login?error=config");
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) redirect("/login");

  const { data } = await supabase
    .from("innovation_drafts")
    .select("id, status, proposed_variants, innovations!inner(title, author_id)")
    .eq("id", id)
    .eq("innovations.author_id", userId)
    .maybeSingle();

  const draft = data as DraftDetail | null;
  const innovation = one(draft?.innovations ?? null);
  if (!draft || !innovation) notFound();

  const rural = draft.proposed_variants?.ruralVariant ?? "";
  const urban = draft.proposed_variants?.urbanVariant ?? "";
  const locked = draft.status !== "DRAFT";

  return (
    <div className="mx-auto w-full max-w-2xl bg-white px-1 py-8 text-neutral-950">
      <p>
        <Link href="/innowator/dashboard" className="text-neutral-950">
          Twoje Innowacje
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{innovation.title}</h1>
      <p className="mt-2 text-lg">Tekst przygotowany przez AI na podstawie ankiet z wdrożeń.</p>

      {error && (
        <p className="mt-4 border-2 border-red-800 bg-red-50 px-3 py-2 text-red-950" role="alert">
          Nie udało się wysłać szkicu.
        </p>
      )}

      <form action={sendToRops} className="mt-6">
        <input type="hidden" name="draftId" value={draft.id} />
        <div>
          <label className="text-base font-semibold" htmlFor="ruralVariant">
            Wariant dla wsi i małych miast
          </label>
          <textarea
            id="ruralVariant"
            name="ruralVariant"
            defaultValue={rural}
            readOnly={locked}
            required
            className={fieldClass}
          />
        </div>
        <div className="mt-4">
          <label className="text-base font-semibold" htmlFor="urbanVariant">
            Wariant dla dużego miasta
          </label>
          <textarea
            id="urbanVariant"
            name="urbanVariant"
            defaultValue={urban}
            readOnly={locked}
            required
            className={fieldClass}
          />
        </div>
        {locked ? (
          <p className="mt-6 border-2 border-neutral-900 px-3 py-2" role="status">
            Ten szkic ma status {draft.status}.
          </p>
        ) : (
          <button
            className="mt-6 min-h-12 bg-blue-800 px-4 text-lg font-semibold text-white focus:ring-2 focus:ring-blue-600"
            type="submit"
          >
            Wyślij do akceptacji ROPS
          </button>
        )}
      </form>
    </div>
  );
}

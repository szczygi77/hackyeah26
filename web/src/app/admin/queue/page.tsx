import { requireRole } from "@/lib/auth-guard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ReviewCard } from "./review-card";

type InnovationEmbed = {
  id: string;
  title: string;
  description: string;
  requirements: string;
};

type DraftRow = {
  id: string;
  proposed_variants: { ruralVariant?: string; urbanVariant?: string } | null;
  innovations: InnovationEmbed | InnovationEmbed[] | null;
};

function one<T>(value: T | T[] | null): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

export default async function AdminQueuePage({
  searchParams,
}: {
  searchParams: Promise<{ opublikowano?: string; odrzucono?: string; error?: string }>;
}) {
  await requireRole("ADMIN");
  const notice = await searchParams;
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/login?error=config");

  const { data, error } = await supabase
    .from("innovation_drafts")
    .select("id, proposed_variants, innovations(id, title, description, requirements)")
    .eq("status", "PENDING_APPROVAL")
    .order("id");

  const message = notice.opublikowano
    ? "Opublikowano kartę."
    : notice.odrzucono
      ? "Odrzucono szkic do poprawy."
      : notice.error
        ? "Nie udało się zapisać decyzji."
        : null;

  return (
    <div className="mx-auto w-full max-w-5xl bg-white px-1 py-8 text-neutral-950">
      <p className="text-base">
        <Link href="/admin" className="text-neutral-950 underline">
          Panel administratora
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Kolejka akceptacji</h1>
      <p className="mt-2 text-lg">
        Szkice wysłane przez innowatorów, czekające na decyzję ROPS.{" "}
        <Link href="/admin/warianty" className="text-neutral-950 underline">
          Porównanie obok siebie
        </Link>
      </p>

      {message && (
        <p
          className={`mt-4 border-2 px-3 py-2 ${notice.error ? "border-red-800 bg-red-50 text-red-950" : "border-neutral-900 bg-neutral-50"}`}
          role={notice.error ? "alert" : "status"}
        >
          {message}
        </p>
      )}

      {error ? (
        <p className="mt-6 border-2 border-red-800 bg-red-50 px-3 py-2 text-red-950" role="alert">
          Nie udało się pobrać kolejki.
        </p>
      ) : !data?.length ? (
        <p className="mt-6 text-lg">Brak szkiców oczekujących na akceptację.</p>
      ) : (
        <div className="mt-6 grid gap-8">
          {(data as DraftRow[]).map((draft) => {
            const card = one(draft.innovations);
            if (!card) return null;
            return (
              <ReviewCard
                key={draft.id}
                draftId={draft.id}
                innovationId={card.id}
                title={card.title}
                description={card.description}
                requirements={card.requirements}
                ruralVariant={draft.proposed_variants?.ruralVariant ?? ""}
                urbanVariant={draft.proposed_variants?.urbanVariant ?? ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

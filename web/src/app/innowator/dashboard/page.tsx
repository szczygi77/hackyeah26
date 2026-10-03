import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

type DraftRow = {
  id: string;
  status: string;
  proposed_variants: { ruralVariant?: string; urbanVariant?: string } | null;
};

type InnovationRow = {
  id: string;
  title: string;
  category: string;
  innovation_drafts: DraftRow[] | null;
};

function variantText(draft: DraftRow) {
  const rural = draft.proposed_variants?.ruralVariant?.trim() ?? "";
  const urban = draft.proposed_variants?.urbanVariant?.trim() ?? "";
  return { rural, urban, hasText: Boolean(rural || urban) };
}

function reviewDraft(drafts: DraftRow[] | null) {
  return (drafts ?? []).find((draft) => draft.status === "DRAFT" && variantText(draft).hasText);
}

export default async function InnovatorDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ wyslano?: string }>;
}) {
  const { wyslano } = await searchParams;
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/login?error=config");

  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) redirect("/login");

  const { data, error } = await supabase
    .from("innovations")
    .select("id, title, category, innovation_drafts(id, status, proposed_variants)")
    .eq("author_id", userId)
    .order("title");

  if (error) {
    return (
      <div className="mx-auto w-full max-w-2xl bg-white px-1 py-8 text-neutral-950">
        <h1 className="text-3xl font-semibold tracking-tight">Twoje Innowacje</h1>
        <p className="mt-4 border-2 border-red-800 bg-red-50 px-3 py-2 text-red-950" role="alert">
          Nie udało się pobrać listy.
        </p>
      </div>
    );
  }

  const innovations = (data ?? []) as InnovationRow[];

  return (
    <div className="mx-auto w-full max-w-2xl bg-white px-1 py-8 text-neutral-950">
      <h1 className="text-3xl font-semibold tracking-tight">Twoje Innowacje</h1>

      {wyslano === "1" && (
        <p className="mt-4 border-2 border-neutral-900 bg-neutral-50 px-3 py-2" role="status">
          Wysłano do akceptacji ROPS.
        </p>
      )}

      {innovations.length === 0 ? (
        <p className="mt-6 text-lg">Nie masz jeszcze zapisanych innowacji.</p>
      ) : (
        <ul className="mt-6 divide-y-2 divide-neutral-900 border-y-2 border-neutral-900">
          {innovations.map((innovation) => {
            const draft = reviewDraft(innovation.innovation_drafts);
            return (
              <li key={innovation.id} className="py-4">
                <h2 className="text-xl font-semibold">{innovation.title}</h2>
                <p className="mt-1 text-neutral-800">{innovation.category}</p>
                {draft && (
                  <Link
                    href={`/innowator/dashboard/${draft.id}`}
                    className="mt-3 block border-2 border-amber-900 bg-amber-50 px-3 py-3 text-lg font-semibold text-amber-950 no-underline focus:ring-2 focus:ring-blue-600"
                  >
                    ✨ AI przeanalizowało nowe wdrożenia. Kliknij, by przejrzeć.
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

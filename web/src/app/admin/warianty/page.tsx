import { AdminDiffPanel } from "@/components/AdminDiffPanel";
import { requireRole } from "@/lib/auth-guard";
import { listPendingDrafts } from "@/lib/catalog";
import { RagConfigError, RagUpstreamError } from "@/lib/rag";

export default async function AdminWariantyPage() {
  await requireRole("ADMIN");

  let drafts;
  try {
    drafts = await listPendingDrafts();
  } catch (error) {
    const message =
      error instanceof RagConfigError || error instanceof RagUpstreamError
        ? error.message
        : "Nie udało się wczytać szkiców.";
    return (
      <div className="py-8">
        <h1 className="m-0 text-3xl font-semibold text-[var(--ink)]">Szkice do zatwierdzenia</h1>
        <p className="mt-4 text-lg text-[var(--low)]" role="alert">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="m-0 text-3xl font-semibold text-[var(--ink)]">Szkice do zatwierdzenia</h1>
      <p className="mb-6 mt-2 text-lg text-[var(--ink-muted)]">
        Porównaj oryginalną kartę z wariantami i opublikuj te, które mają trafić do biblioteki.
      </p>
      <AdminDiffPanel drafts={drafts} />
    </div>
  );
}

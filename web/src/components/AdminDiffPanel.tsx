"use client";

import { useState } from "react";
import Link from "next/link";
import type { PendingDraft } from "@/lib/catalog";
import { publishDraftAction } from "@/lib/actions/publish-draft";

export function AdminDiffPanel({ drafts }: { drafts: PendingDraft[] }) {
  const [items, setItems] = useState(drafts);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function publish(id: string) {
    setPendingId(id);
    setErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    const result = await publishDraftAction(id);
    setPendingId(null);
    if (result.ok) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setErrors((current) => ({ ...current, [id]: result.error }));
  }

  if (items.length === 0) {
    return <p className="m-0 py-8 text-lg text-[var(--ink-muted)]">Brak szkiców oczekujących na zatwierdzenie.</p>;
  }

  return (
    <div className="flex flex-col gap-10 py-4">
      {items.map((draft) => (
        <section key={draft.id} aria-labelledby={`draft-${draft.id}`} className="flex flex-col gap-4">
          <h2 id={`draft-${draft.id}`} className="m-0 text-2xl font-semibold text-[var(--ink)]">
            <Link href={`/innowacja/${draft.innovationId}`} className="text-[var(--ink)] underline-offset-4 hover:underline">
              {draft.title}
            </Link>
          </h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--line-strong)] md:grid-cols-2">
            <div className="bg-[var(--paper)] p-5">
              <h3 className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Oryginalna Karta</h3>
              <p className="mb-0 mt-3 whitespace-pre-wrap text-lg leading-relaxed text-[var(--ink)]">{draft.description}</p>
            </div>
            <div className="bg-[var(--secondary-container)] p-5 text-[var(--on-secondary-container)]">
              <h3 className="m-0 text-sm font-semibold uppercase tracking-wide">Nowe warianty z AI/od innowatora</h3>
              <p className="mb-0 mt-3 whitespace-pre-wrap text-lg leading-relaxed">
                <span className="font-semibold">Miasto. </span>
                {draft.urbanVariant || "Brak wariantu."}
              </p>
              <p className="mb-0 mt-3 whitespace-pre-wrap text-lg leading-relaxed">
                <span className="font-semibold">Wieś. </span>
                {draft.ruralVariant || "Brak wariantu."}
              </p>
            </div>
          </div>
          {errors[draft.id] && (
            <p className="m-0 text-[var(--low)]" role="alert">
              {errors[draft.id]}
            </p>
          )}
          <button
            type="button"
            onClick={() => publish(draft.id)}
            disabled={pendingId === draft.id}
            className="w-full rounded-2xl bg-[var(--cta)] px-6 py-5 text-2xl font-semibold text-[var(--on-cta)] outline-none hover:bg-[var(--cta-deep)] focus-visible:ring-4 focus-visible:ring-[var(--primary-ring)] disabled:opacity-70"
          >
            {pendingId === draft.id ? "Publikuję…" : "Zatwierdź i Publikuj"}
          </button>
        </section>
      ))}
    </div>
  );
}

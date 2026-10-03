"use client";

import { useEffect, useId, useState } from "react";
import type { CatalogInnovation } from "@/lib/catalog";

type Variants = {
  urbanVariant: string;
  ruralVariant: string;
};

type Tab = "miasto" | "wies";

export function InnovationCard({ innovation }: { innovation: CatalogInnovation }) {
  const baseId = useId();
  const [tab, setTab] = useState<Tab>("miasto");
  const [variants, setVariants] = useState<Variants | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError("");
    setVariants(null);

    fetch("/api/warianty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ innovationId: innovation.id }),
      signal: controller.signal,
    })
      .then(async (res) => {
        const data = (await res.json()) as Partial<Variants> & { error?: string };
        if (!res.ok || typeof data.urbanVariant !== "string" || typeof data.ruralVariant !== "string") {
          throw new Error(data.error || "Nie udało się wygenerować wariantów.");
        }
        setVariants({ urbanVariant: data.urbanVariant, ruralVariant: data.ruralVariant });
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setStatus("error");
        setError(err instanceof Error ? err.message : "Nie udało się wygenerować wariantów.");
      });

    return () => controller.abort();
  }, [innovation.id]);

  const text = tab === "miasto" ? variants?.urbanVariant : variants?.ruralVariant;
  const panelId = `${baseId}-panel`;

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-10">
      <header className="flex flex-col gap-3">
        <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">{innovation.category}</p>
        <h1 className="m-0 text-3xl font-semibold text-[var(--ink)]">{innovation.title}</h1>
      </header>

      <section aria-labelledby={`${baseId}-opis`} className="flex flex-col gap-3">
        <h2 id={`${baseId}-opis`} className="m-0 text-xl font-semibold text-[var(--ink)]">
          Oryginalny opis
        </h2>
        <p className="m-0 whitespace-pre-wrap text-lg leading-relaxed text-[var(--ink)]">{innovation.description}</p>
        <p className="m-0 text-lg leading-relaxed text-[var(--ink)]">
          <span className="font-semibold">Wymagania. </span>
          {innovation.requirements}
        </p>
      </section>

      <section
        aria-labelledby={`${baseId}-warianty`}
        className="rounded-2xl border-2 border-[var(--secondary)] bg-[var(--secondary-container)] p-6 text-[var(--on-secondary-container)]"
      >
        <h2 id={`${baseId}-warianty`} className="m-0 text-2xl font-semibold">
          Warianty wdrożeniowe AI
        </h2>
        <p className="mb-4 mt-2 text-base">Na podstawie ankiet z wdrożeń.</p>

        {status === "loading" && <p className="m-0">Generuję warianty.</p>}
        {status === "error" && (
          <p className="m-0" role="alert">
            {error}
          </p>
        )}
        {status === "ready" && variants && (
          <>
            <div
              role="tablist"
              aria-label="Warianty wdrożeniowe"
              className="flex flex-wrap gap-2"
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                event.preventDefault();
                const next = tab === "miasto" ? "wies" : "miasto";
                setTab(next);
                document.getElementById(`${baseId}-${next}`)?.focus();
              }}
            >
              {(
                [
                  ["miasto", "Miasto"],
                  ["wies", "Wieś"],
                ] as const
              ).map(([value, label]) => {
                const selected = tab === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    id={`${baseId}-${value}`}
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(value)}
                    className={`rounded-full px-5 py-2 text-lg font-semibold outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary-ring)] ${
                      selected
                        ? "bg-[var(--primary)] text-[var(--on-primary)]"
                        : "bg-[var(--paper)] text-[var(--ink)]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div
              role="tabpanel"
              id={panelId}
              aria-labelledby={`${baseId}-${tab}`}
              className="mt-4 whitespace-pre-wrap text-lg leading-relaxed"
            >
              {text}
            </div>
          </>
        )}
      </section>
    </article>
  );
}

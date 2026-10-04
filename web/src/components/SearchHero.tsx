"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Match = {
  id: string;
  title: string;
  similarity: number;
  explanation: string;
};

function matchPercent(similarity: number): number {
  if (!Number.isFinite(similarity)) return 0;
  return Math.min(100, Math.max(0, Math.round(similarity * 100)));
}

export function SearchHero() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchQuery = query.trim();
    if (!searchQuery) return;
    setStatus("loading");
    setError("");
    setMatches(null);
    try {
      const res = await fetch("/api/szukaj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery }),
      });
      const data = (await res.json()) as { matches?: Match[]; error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Nie udało się wyszukać.");
        return;
      }
      setMatches(Array.isArray(data.matches) ? data.matches : []);
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Nie udało się wyszukać.");
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 py-16">
      <form onSubmit={onSubmit} className="flex flex-col gap-4" aria-labelledby="search-heading">
        <h2 id="search-heading" className="m-0 text-center text-3xl font-semibold text-[var(--ink)]">
          Opisz problem swoimi słowami
        </h2>
        <label htmlFor="problem" className="sr-only">
          Opisz problem swoimi słowami
        </label>
        <textarea
          id="problem"
          name="problem"
          required
          rows={4}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Opisz problem swoimi słowami"
          className="w-full resize-y rounded-2xl border-2 border-[var(--line-strong)] bg-[var(--paper)] px-5 py-4 text-xl text-[var(--ink)] shadow-[var(--shadow-card)] outline-none focus-visible:border-[var(--focus)] focus-visible:ring-4 focus-visible:ring-[var(--primary-ring)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="self-center rounded-full bg-[var(--cta)] px-10 py-4 text-xl font-semibold text-[var(--on-cta)] outline-none hover:bg-[var(--cta-deep)] focus-visible:ring-4 focus-visible:ring-[var(--primary-ring)] disabled:opacity-70"
        >
          {status === "loading" ? "Szukam…" : "Szukaj"}
        </button>
      </form>

      <section aria-live="polite" aria-busy={status === "loading"} className="flex flex-col gap-4">
        {status === "loading" && <p className="m-0 text-center text-[var(--ink-muted)]">Szukam dopasowań.</p>}
        {status === "error" && (
          <p className="m-0 rounded-xl border border-[var(--low-border)] bg-[var(--low-bg)] px-4 py-3 text-[var(--low)]" role="alert">
            {error}
          </p>
        )}
        {matches && matches.length === 0 && (
          <p className="m-0 text-center text-[var(--ink-muted)]">Brak dopasowanych innowacji.</p>
        )}
        {matches?.map((match) => (
          <article
            key={match.id}
            className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[var(--shadow-card)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="m-0 text-2xl font-semibold text-[var(--ink)]">
                <Link href={`/innowacja/${match.id}`} className="text-[var(--ink)] underline-offset-4 hover:underline">
                  {match.title}
                </Link>
              </h2>
              <p className="m-0 rounded-full bg-[var(--tertiary-container)] px-4 py-1 text-lg font-semibold text-[var(--on-tertiary)]">
                Dopasowanie {matchPercent(match.similarity)}%
              </p>
            </div>
            <p className="mb-0 mt-4 text-lg leading-relaxed text-[var(--ink)]">
              <span className="font-semibold">Dlaczego to pasuje. </span>
              {match.explanation}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}

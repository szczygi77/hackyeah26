import Link from "next/link";
import { listCatalogInnovations } from "@/lib/catalog";
import { RagConfigError, RagUpstreamError } from "@/lib/rag";

export default async function SzukajPage() {
  let cards: Awaited<ReturnType<typeof listCatalogInnovations>> = [];
  let error = "";
  try {
    cards = await listCatalogInnovations();
  } catch (err) {
    error =
      err instanceof RagConfigError || err instanceof RagUpstreamError
        ? err.message
        : "Nie udało się wczytać katalogu.";
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 py-10">
      <section aria-labelledby="katalog-heading">
        <h1 id="katalog-heading" className="m-0 text-3xl font-semibold text-[var(--ink)]">
          Karty w katalogu
        </h1>
        <p className="mt-2 text-lg text-[var(--ink-muted)]">
          Dopasowanie problemu do karty jest na{" "}
          <Link href="/" className="text-[var(--ink)] underline-offset-4 hover:underline">
            stronie głównej
          </Link>
          . Tutaj jest tylko lista kart z drugiego katalogu. Ankiety wdrożeń pokazujemy wyłącznie wtedy, gdy są zapisane
          przy tej karcie.
        </p>
        {error ? (
          <p className="mt-4 text-lg text-[var(--low)]" role="alert">
            {error}
          </p>
        ) : cards.length === 0 ? (
          <p className="mt-4 text-lg text-[var(--ink-muted)]">Katalog jest pusty.</p>
        ) : (
          <ul className="mt-4 flex list-none flex-col gap-3 p-0">
            {cards.map((card) => (
              <li key={card.id} className="rounded-lg border border-[var(--line)] bg-[var(--paper)] p-4">
                <Link href={`/innowacja/${card.id}`} className="text-xl font-semibold text-[var(--ink)] underline-offset-4 hover:underline">
                  {card.title}
                </Link>
                <p className="m-0 mt-1 text-lg text-[var(--ink)]">{card.category}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

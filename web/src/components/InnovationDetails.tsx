import { useId } from "react";
import Link from "next/link";
import type { CatalogInnovation, CatalogSurvey } from "@/lib/catalog";

export function InnovationDetails({
  innovation,
  surveys,
}: {
  innovation: CatalogInnovation;
  surveys: CatalogSurvey[];
}) {
  const baseId = useId();

  return (
    <article className="mx-auto grid w-full max-w-6xl gap-8 py-10 lg:grid-cols-2">
      <p className="m-0 text-base lg:col-span-2">
        <Link href="/szukaj" className="text-[var(--ink)] underline-offset-4 hover:underline">
          Katalog kart
        </Link>
      </p>
      <section
        aria-labelledby={`${baseId}-karta`}
        className="flex flex-col gap-5 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-6 text-[var(--ink)]"
      >
        <header className="flex flex-col gap-2">
          <h2 id={`${baseId}-karta`} className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
            Karta Innowacji
          </h2>
          <h1 className="m-0 text-3xl font-semibold">{innovation.title}</h1>
        </header>

        <dl className="m-0 flex flex-col gap-4">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Grupa docelowa</dt>
            <dd className="m-0 mt-1 text-lg leading-relaxed">{innovation.category}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Opis</dt>
            <dd className="m-0 mt-1 whitespace-pre-wrap text-lg leading-relaxed">{innovation.description}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Wymagane zasoby</dt>
            <dd className="m-0 mt-1 whitespace-pre-wrap text-lg leading-relaxed">{innovation.requirements}</dd>
          </div>
        </dl>

        <a
          href="https://rops.krakow.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-fit text-base text-[var(--ink-muted)] underline decoration-[var(--line-strong)] underline-offset-4 outline-none hover:text-[var(--ink)] focus-visible:ring-4 focus-visible:ring-[var(--primary-ring)]"
        >
          Link do oryginalnej karty na rops.krakow.pl
        </a>
      </section>

      <section
        aria-labelledby={`${baseId}-ai`}
        className="flex flex-col gap-5 rounded-lg border-2 border-[var(--secondary)] p-6 text-[var(--ink)]"
        style={{ background: "linear-gradient(160deg, var(--secondary-container), var(--paper) 55%)" }}
      >
        <h2 id={`${baseId}-ai`} className="m-0 text-2xl font-semibold">
          Ankiety wdrożeń tej karty
        </h2>
        {surveys.length === 0 ? (
          <p className="m-0 text-lg leading-relaxed">
            Przy tej karcie nie ma ankiet wdrożeń. Nie pokazujemy ogólnych ryzyk dla wsi i miasta, bo nie wynikają z
            tej innowacji.
          </p>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {surveys.map((survey) => (
              <li key={`${survey.municipalityType}-${survey.successRating}-${survey.missingResources}`} className="rounded-lg border border-[var(--line)] bg-[var(--paper)] p-4">
                <p className="m-0 font-semibold">Typ gminy: {survey.municipalityType}</p>
                <p className="mb-0 mt-2 text-lg leading-relaxed">Braki: {survey.missingResources}</p>
                <p className="mb-0 mt-2 text-lg leading-relaxed">Obejścia: {survey.implementedWorkarounds}</p>
                <p className="mb-0 mt-2 text-lg leading-relaxed">Ocena wdrożenia: {survey.successRating}/5</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/db";
import { ListingCard } from "@/components/ListingCard";
import { MarketplaceFilters } from "@/components/MarketplaceFilters";
import { EmptyFilterIllustration } from "@/components/CategoryGlyph";
import { EVIDENCE_FILTERS } from "@/lib/taxonomy";
import { Steps } from "@/components/Steps";
import { READER_ARTICLES } from "@/lib/czytelnia";

export default async function ZasobnikPage({
  searchParams,
}: {
  searchParams: Promise<{ kat?: string; e?: string; wyz?: string }>;
}) {
  const { kat, e, wyz } = await searchParams;
  const evidenceOk = e && (EVIDENCE_FILTERS as readonly string[]).includes(e) ? e : undefined;

  const [cards, films] = await Promise.all([
    prisma.innovation.findMany({
      where: {
        status: "PUBLISHED",
        ...(kat ? { category: kat } : {}),
        ...(evidenceOk ? { evidenceLevel: evidenceOk } : {}),
        ...(wyz ? { challengeAreasJson: { contains: wyz } } : {}),
      },
      orderBy: { title: "asc" },
    }),
    prisma.innovation.findMany({
      where: { status: "PUBLISHED", videoUrl: { not: null } },
      orderBy: { title: "asc" },
      select: { id: true, slug: true, title: true, transcript: true, summary: true },
    }),
  ]);

  const filters = { kat, e: evidenceOk, wyz };

  return (
    <div className="rise">
      <Steps />
      <h1>Zasobnik wiedzy</h1>
      <p className="lead">
        Katalog innowacji Hubu, filmy z transkrypcją i krótkie omówienia materiałów edukacyjnych.
      </p>

      <nav className="module-map" aria-label="Części Zasobnika">
        <a href="#ogloszenia">Katalog</a>
        <a href="#filmy">Filmy</a>
        <Link href="/wyzwania">Wyzwania Małopolski</Link>
        <a href="#czytelnia">Czytelnia</a>
      </nav>

      <section id="filmy" style={{ marginTop: "1.25rem" }}>
        <h2>Filmy o innowacjach</h2>
        {films.length === 0 ? (
          <p className="hint">W opublikowanych kartach nie ma jeszcze adresu filmu.</p>
        ) : (
          <ul>
            {films.map((film) => (
              <li key={film.id}>
                <Link href={`/karta/${film.slug}`}>{film.title}</Link>
                <span className="hint"> — transkrypcja na karcie</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="market-layout" id="ogloszenia" style={{ marginTop: "1.25rem" }}>
        <MarketplaceFilters current={filters} />
        <div>
          <p className="hint" style={{ marginTop: 0 }}>
            Wyników: <strong>{cards.length}</strong>
            {kat ? ` · kategoria: ${kat}` : ""}
            {evidenceOk ? ` · dowody: ${evidenceOk}` : ""}
            {wyz ? ` · wyzwanie: ${wyz}` : ""}
            {(kat || evidenceOk || wyz) && (
              <>
                {" · "}
                <Link href="/zasobnik">wyczyść filtry</Link>
              </>
            )}
          </p>
          {cards.length === 0 ? (
            <div className="empty-filter">
              <EmptyFilterIllustration className="empty-filter-art" />
              <p>Brak ogłoszeń dla wybranych filtrów.</p>
              <Link href="/zasobnik">Wyczyść filtry</Link>
            </div>
          ) : (
            <div className="listing-grid">
              {cards.map((card) => (
                <ListingCard
                  key={card.id}
                  slug={card.slug}
                  title={card.title}
                  summary={card.summary}
                  category={card.category}
                  evidenceLevel={card.evidenceLevel}
                  hasVideo={Boolean(card.videoUrl)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <section style={{ marginTop: "2rem" }} id="czytelnia">
        <h2>Czytelnia</h2>
        <p className="hint">
          Poniższe akapity są omówieniem własnym. Pełne publikacje zostają u źródła.
        </p>
        <div className="stack">
          {READER_ARTICLES.map((article) => (
            <article key={article.title} className="panel">
              <h3 style={{ marginTop: 0, fontSize: "1.15rem" }}>
                {article.title} <span className="hint">({article.year})</span>
              </h3>
              <p>{article.summary}</p>
              <p>
                <strong>W Hubie: </strong>
                {article.useInHub}
              </p>
              <p>
                <a href={article.sourceUrl} rel="noopener noreferrer">
                  {article.sourceLabel}
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/db";
import { ListingCard } from "@/components/ListingCard";
import { MarketplaceFilters } from "@/components/MarketplaceFilters";
import { EmptyFilterIllustration } from "@/components/CategoryGlyph";
import { EVIDENCE_FILTERS } from "@/lib/taxonomy";
import { Steps } from "@/components/Steps";

const PUBLICATIONS = [
  {
    title: "Połącz kropki — innowacje społeczne włączenia społecznego",
    year: 2023,
    url: "https://rops.krakow.pl/innowacje-spoleczne/publikacje-ze-swiata-innowacji",
  },
  {
    title: "Innowacje społeczne dla dostępności",
    year: 2022,
    url: "https://rops.krakow.pl/innowacje-spoleczne/publikacje-ze-swiata-innowacji",
  },
  {
    title: "Przewodnik po innowacjach społecznych",
    year: 2019,
    url: "https://rops.krakow.pl/innowacje-spoleczne/publikacje-ze-swiata-innowacji",
  },
];

export default async function ZasobnikPage({
  searchParams,
}: {
  searchParams: Promise<{ kat?: string; e?: string; wyz?: string }>;
}) {
  const { kat, e, wyz } = await searchParams;
  const evidenceOk = e && (EVIDENCE_FILTERS as readonly string[]).includes(e) ? e : undefined;

  const cards = await prisma.innovation.findMany({
    where: {
      status: "PUBLISHED",
      ...(kat ? { category: kat } : {}),
      ...(evidenceOk ? { evidenceLevel: evidenceOk } : {}),
      ...(wyz ? { challengeAreasJson: { contains: wyz } } : {}),
    },
    orderBy: { title: "asc" },
  });

  const filters = { kat, e: evidenceOk, wyz };

  return (
    <div className="rise">
      <Steps />
      <h1>Ogłoszenia</h1>
      <p className="lead">Katalog innowacji Hubu (Biblioteka ROPS Kraków).</p>

      <nav className="module-map" aria-label="Części Zasobnika">
        <a href="#ogloszenia">Ogłoszenia</a>
        <Link href="/wyzwania">Wyzwania Małopolski</Link>
        <a href="#czytelnia">Czytelnia</a>
      </nav>

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
        <ul>
          {PUBLICATIONS.map((p) => (
            <li key={p.title}>
              <a href={p.url} rel="noopener noreferrer" target="_blank">
                {p.title}
              </a>{" "}
              <span className="hint">({p.year})</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

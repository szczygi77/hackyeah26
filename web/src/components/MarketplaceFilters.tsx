import Link from "next/link";
import { CHALLENGE_AREAS, EVIDENCE_FILTERS, LIBRARY_CATEGORIES } from "@/lib/taxonomy";

export type MarketplaceFilterState = {
  kat?: string;
  e?: string;
  wyz?: string;
};

function hrefFor(next: MarketplaceFilterState) {
  const params = new URLSearchParams();
  if (next.kat) params.set("kat", next.kat);
  if (next.e) params.set("e", next.e);
  if (next.wyz) params.set("wyz", next.wyz);
  const q = params.toString();
  return q ? `/zasobnik?${q}` : "/zasobnik";
}

export function MarketplaceFilters({ current }: { current: MarketplaceFilterState }) {
  return (
    <aside className="market-filters" aria-label="Filtry ogłoszeń">
      <h2 className="market-filters-title">Filtry</h2>

      <div className="market-filter-group">
        <h3>Kategoria Biblioteki</h3>
        <ul>
          <li>
            <Link href={hrefFor({ ...current, kat: undefined })} aria-current={!current.kat ? "page" : undefined}>
              Wszystkie
            </Link>
          </li>
          {LIBRARY_CATEGORIES.map((c) => (
            <li key={c}>
              <Link href={hrefFor({ ...current, kat: c })} aria-current={current.kat === c ? "page" : undefined}>
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="market-filter-group">
        <h3>Poziom dowodów</h3>
        <ul>
          <li>
            <Link href={hrefFor({ ...current, e: undefined })} aria-current={!current.e ? "page" : undefined}>
              Wszystkie
            </Link>
          </li>
          {EVIDENCE_FILTERS.map((e) => (
            <li key={e}>
              <Link href={hrefFor({ ...current, e })} aria-current={current.e === e ? "page" : undefined}>
                {e}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="market-filter-group">
        <h3>Obszar wyzwania</h3>
        <ul>
          <li>
            <Link href={hrefFor({ ...current, wyz: undefined })} aria-current={!current.wyz ? "page" : undefined}>
              Wszystkie
            </Link>
          </li>
          {CHALLENGE_AREAS.map((a) => (
            <li key={a.slug}>
              <Link
                href={hrefFor({ ...current, wyz: a.slug })}
                aria-current={current.wyz === a.slug ? "page" : undefined}
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

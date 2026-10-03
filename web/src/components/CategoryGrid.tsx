import Link from "next/link";
import { LIBRARY_CATEGORIES } from "@/lib/taxonomy";
import { CategoryGlyph } from "@/components/CategoryGlyph";

export function CategoryGrid({
  counts,
  active,
}: {
  counts?: Record<string, number>;
  active?: string;
}) {
  return (
    <div className="category-grid" role="list">
      {LIBRARY_CATEGORIES.map((c) => (
        <Link
          key={c}
          href={`/zasobnik?kat=${encodeURIComponent(c)}`}
          className="category-tile"
          role="listitem"
          aria-current={active === c ? "page" : undefined}
        >
          <div className="category-tile-icon-wrapper">
            <CategoryGlyph category={c} size={36} className="category-tile-glyph" />
          </div>
          <strong>{c}</strong>
          {counts ? <span className="hint">{counts[c] ?? 0} ogłoszeń</span> : null}
        </Link>
      ))}
    </div>
  );
}

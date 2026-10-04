import Link from "next/link";
import { redirect } from "next/navigation";
import { PrivacyNote } from "@/components/PrivacyNote";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ListingCard } from "@/components/ListingCard";
import { prisma } from "@/lib/db";

async function searchAction(formData: FormData) {
  "use server";
  const q = String(formData.get("q") || "").trim();
  if (!q) return;
  redirect(`/wyniki?q=${encodeURIComponent(q)}`);
}

const EXAMPLES = [
  "samotni seniorzy po zamknięciu klubu",
  "rodzeństwo z niepełnosprawnością",
  "młody dorosły po pieczy zastępczej",
  "asysta dla niesłyszących w urzędzie",
];

export default async function HomePage() {
  const latest = await prisma.innovation.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { title: "asc" },
    take: 8,
    select: {
      slug: true,
      title: true,
      summary: true,
      category: true,
      evidenceLevel: true,
      videoUrl: true,
    },
  });

  return (
    <div className="home">
      <section className="home-hero" id="szukaj" aria-labelledby="search-heading">
        <div className="home-hero-content">
        <h1 id="search-heading">Znajdź innowację do wdrożenia w gminie</h1>
        <form action={searchAction} className="home-search">
          <div className="field">
            <label htmlFor="q" className="sr-only">
              Problem własnymi słowami
            </label>
            <textarea
              id="q"
              name="q"
              required
              rows={2}
              placeholder="np. samotni seniorzy po zamknięciu klubu w małej gminie"
              aria-describedby="q-hint"
            />
          </div>
          <button type="submit" className="btn">
            Szukaj
          </button>
        </form>
        <PrivacyNote id="q-hint" />
        <p className="hint">
          <Link href="/zasobnik">Przeglądaj karty w katalogu</Link>
        </p>
        <div className="example-links">
          <span className="example-label">Przykłady:</span>
          <ul>
            {EXAMPLES.map((ex) => (
              <li key={ex}>
                <Link href={`/wyniki?q=${encodeURIComponent(ex)}`}>{ex}</Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </section>

      <section className="home-block" aria-labelledby="kategorie-heading">
        <h2 id="kategorie-heading">Kategorie</h2>
        <CategoryGrid />
      </section>

      <section className="home-block" aria-labelledby="ogloszenia-heading">
        <div className="home-block-head">
          <h2 id="ogloszenia-heading">Najnowsze innowacje</h2>
          <Link href="/zasobnik" className="home-block-more">
            Przeglądaj wszystkie
          </Link>
        </div>
        <div className="listing-grid">
          {latest.map((card) => (
            <ListingCard
              key={card.slug}
              slug={card.slug}
              title={card.title}
              summary={card.summary}
              category={card.category}
              evidenceLevel={card.evidenceLevel}
              hasVideo={Boolean(card.videoUrl)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

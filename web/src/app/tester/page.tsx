import Link from "next/link";
import { prisma } from "@/lib/db";
import { TestInterestForm } from "@/components/TestInterestForm";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import type { EvidenceLevel } from "@/lib/types";
import { Steps } from "@/components/Steps";

export default async function TesterPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const cards = await prisma.innovation.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { title: "asc" },
    select: { id: true, slug: true, title: true, summary: true, evidenceLevel: true, category: true },
  });
  const selected = slug ? cards.find((c) => c.slug === slug) : null;

  return (
    <div className="rise">
      <Steps active={3} />
      <h1>Tester innowacji</h1>
      <p className="lead">
        Zgłoś chęć udziału w teście, oceń rozwiązanie i zaproponuj usprawnienie. Zgłoszenia trafiają do panelu ROPS.
      </p>

      <section className="panel" style={{ marginBottom: "1.25rem" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>1. Wybierz innowację</h2>
        <ul className="stack" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {cards.map((card) => (
            <li key={card.id}>
              <Link
                href={`/tester?slug=${encodeURIComponent(card.slug)}`}
                className="cat-link"
                aria-current={selected?.slug === card.slug ? "page" : undefined}
              >
                <strong>{card.title}</strong>
                <span className="hint">{card.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {selected ? (
        <section className="panel" id="formularz-testu">
          <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>2. Zgłoś chęć testu</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <EvidenceBadge level={selected.evidenceLevel as EvidenceLevel} />
            <Link href={`/karta/${selected.slug}`}>Otwórz kartę</Link>
          </div>
          <p>{selected.summary}</p>
          <TestInterestForm innovationId={selected.id} innovationTitle={selected.title} />
        </section>
      ) : (
        <p className="hint">Wybierz innowację z listy, aby otworzyć formularz zgłoszenia testu.</p>
      )}
    </div>
  );
}

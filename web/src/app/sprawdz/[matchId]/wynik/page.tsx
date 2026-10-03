import Link from "next/link";
import { notFound } from "next/navigation";
import { Steps } from "@/components/Steps";
import { prisma } from "@/lib/db";
import { evaluateFit } from "@/lib/fit";
import { parseJsonObject } from "@/lib/json";

export default async function FitResultPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params;
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      innovation: { include: { prerequisites: true } },
      profile: true,
    },
  });
  if (!match || !match.profile) notFound();

  const answers = parseJsonObject<Record<string, string>>(match.profile.answersJson);
  const fit = evaluateFit(match.innovation.prerequisites, answers);

  let muniNote: string | null = null;
  if (match.profile.municipality) {
    const snap = await prisma.municipalitySnapshot.findUnique({
      where: { name: match.profile.municipality },
    });
    if (snap) {
      const stats = parseJsonObject<{
        share65plus?: number;
        socialAidBeneficiariesPer1k?: number;
        note?: string;
      }>(snap.statsJson);
      muniNote = `${snap.name}: udział 65+ ≈ ${stats.share65plus}%; beneficjenci pomocy ≈ ${stats.socialAidBeneficiariesPer1k}/1000. ${stats.note || ""}`;
    }
  }

  return (
    <div className="rise">
      <Steps active={2} />
      <h1>Lista zgodności</h1>
      <p className="lead">
        Dla <strong>{match.innovation.title}</strong>. {fit.summary}
      </p>

      {muniNote && (
        <aside className="panel" style={{ marginBottom: "1rem" }}>
          <strong>Kontekst gminy (snapshot IOSS):</strong>
          <p style={{ marginBottom: 0 }}>{muniNote}</p>
        </aside>
      )}

      <div className="fit-cols">
        <section className="panel fit-have">
          <h3>Macie to</h3>
          <ul>
            {fit.have.length ? fit.have.map((p) => <li key={p.id}>{p.description}</li>) : <li className="hint">—</li>}
          </ul>
        </section>
        <section className="panel fit-missing">
          <h3>Brakuje</h3>
          <ul>
            {fit.missing.length ? fit.missing.map((p) => <li key={p.id}>{p.description}</li>) : <li className="hint">—</li>}
          </ul>
        </section>
        <section className="panel fit-check">
          <h3>Do sprawdzenia</h3>
          <ul>
            {fit.toCheck.length ? fit.toCheck.map((p) => <li key={p.id}>{p.description}</li>) : <li className="hint">—</li>}
          </ul>
        </section>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.5rem" }}>
        <Link className="btn" href={`/middleman/${match.innovation.slug}?matchId=${match.id}`}>
          Dostosuj do mojej instytucji (Middleman)
        </Link>
        <Link className="btn btn-accent" href={`/tester?slug=${encodeURIComponent(match.innovation.slug)}`}>
          Chcę przetestować
        </Link>
        <Link className="btn btn-secondary" href={`/karta/${match.innovation.slug}`}>
          Karta innowacji
        </Link>
        <Link className="btn btn-secondary" href="/">
          Nowe wyszukiwanie
        </Link>
      </div>
    </div>
  );
}

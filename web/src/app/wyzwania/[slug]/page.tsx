import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Steps } from "@/components/Steps";
export default async function ChallengeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = await prisma.challenge.findUnique({ where: { slug } });
  if (!challenge) notFound();

  let reports: { title: string; url: string }[] = [];
  try {
    const parsed = JSON.parse(challenge.reportLinksJson);
    if (Array.isArray(parsed)) reports = parsed;
  } catch {
    reports = [];
  }

  const cards = await prisma.innovation.findMany({
    where: {
      status: "PUBLISHED",
      challengeAreasJson: { contains: slug },
    },
    orderBy: { title: "asc" },
  });

  return (
    <div className="rise">
      <Steps />
      <p className="hint">
        <Link href="/wyzwania">Wyzwania</Link> / {challenge.title}
      </p>
      <h1>{challenge.title}</h1>
      <p className="lead">{challenge.definition}</p>

      <section className="panel" style={{ marginTop: "1.25rem" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.25rem" }}>Kluczowe wyzwania</h2>
        <p>{challenge.keyChallenges}</p>
      </section>

      <section className="panel" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.25rem" }}>Persona: {challenge.personaName}</h2>
        <p>{challenge.personaSummary}</p>
        <p>
          <strong>Potrzeby / motywacje:</strong> {challenge.personaNeeds}
        </p>
        <p>
          <Link
            className="btn"
            href={`/wyniki?q=${encodeURIComponent(challenge.personaNeeds.split(";")[0] || challenge.title)}`}
          >
            Szukaj rozwiązań dla tej persony
          </Link>
        </p>
      </section>

      {reports.length > 0 && (
        <section style={{ marginTop: "1.25rem" }}>
          <h2>Raporty (Małopolska / powiązane)</h2>
          <ul>
            {reports.map((r) => (
              <li key={r.title}>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Powiązane karty w Zasobniku</h2>
        {cards.length === 0 ? (
          <p className="hint">Brak powiązanych kart w katalogu.</p>
        ) : (
          <ul className="stack" style={{ listStyle: "none", padding: 0 }}>
            {cards.map((card) => (
              <li key={card.id} className="panel">
                <Link href={`/karta/${card.slug}`}>
                  <strong>{card.title}</strong>
                </Link>
                <p style={{ margin: "0.35rem 0 0" }}>{card.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

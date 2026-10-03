import Link from "next/link";
import { prisma } from "@/lib/db";
import { Steps } from "@/components/Steps";

export default async function ChallengesPage() {
  const challenges = await prisma.challenge.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="rise">
      <Steps />
      <h1>Wyzwania Małopolski</h1>
      <p className="lead">
        Osiem obszarów z Mapy Wyzwań Społecznych (IWS 2.0). Dane Mapu są ogólnopolskie; diagnozę regionalną
        uzupełniają raporty ROPS i IOSS.
      </p>

      <div className="stack" style={{ marginTop: "1.5rem" }}>
        {challenges.map((c) => (
          <article key={c.id} className="panel">
            <h2 style={{ marginTop: 0, fontSize: "1.4rem" }}>
              <Link href={`/wyzwania/${c.slug}`}>{c.title}</Link>
            </h2>
            <p>{c.definition}</p>
            <p className="hint">
              Persona: <strong>{c.personaName}</strong> — {c.personaSummary}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

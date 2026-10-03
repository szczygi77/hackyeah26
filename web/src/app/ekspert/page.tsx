import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth-guard";

export default async function ExpertPage() {
  await requireRole(["EXPERT", "ADMIN"]);

  const questions = await prisma.submission.findMany({
    where: { type: "MENTOR" },
    orderBy: { createdAt: "desc" },
    include: { innovation: true },
    take: 40,
  });

  return (
    <div className="rise">
      <h1>Panel eksperta / mentora</h1>
      <p className="lead">Pytania z kontekstem karty i historią zgłoszenia.</p>
      <div className="stack">
        {questions.map((q) => (
          <article key={q.id} className="panel">
            <p className="hint" style={{ marginTop: 0 }}>
              {q.publicId} · {q.status}
            </p>
            <h2 style={{ margin: "0 0 0.35rem", fontSize: "1.15rem" }}>
              <Link href={`/zgloszenie/${q.publicId}`}>{q.title}</Link>
            </h2>
            <p>{q.body}</p>
            {q.innovation && (
              <p>
                Kontekst karty: <Link href={`/karta/${q.innovation.slug}`}>{q.innovation.title}</Link>
              </p>
            )}
          </article>
        ))}
        {questions.length === 0 && <p className="hint">Brak pytań.</p>}
      </div>
    </div>
  );
}

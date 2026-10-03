import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth-guard";

export default async function AdminCardsPage() {
  await requireRole("ADMIN");
  const cards = await prisma.innovation.findMany({
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { submissions: true, prerequisites: true } } },
  });

  return (
    <div className="rise">
      <p>
        <Link href="/admin">← Panel</Link>
      </p>
      <h1>Karty innowacji</h1>
      <p className="lead">
        Edycja zatwierdzonych kart z wersjonowaniem.{" "}
        <Link href="/admin/karta/nowa">Dodaj nową ze szkicu</Link>.
      </p>
      <div className="stack">
        {cards.map((c) => (
          <article key={c.id} className="panel">
            <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>
              <Link href={`/admin/karta/${c.id}`}>{c.title}</Link>
            </h2>
            <p className="hint" style={{ marginTop: 0 }}>
              {c.status} · v{c.version} · {c.category} · warunki: {c._count.prerequisites} · zgłoszenia:{" "}
              {c._count.submissions}
            </p>
            <p style={{ marginBottom: 0 }}>{c.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

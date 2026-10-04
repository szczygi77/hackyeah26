import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth-guard";
import { clusterGaps } from "@/lib/gaps";
import { buildTrends } from "@/lib/trends";

const STATUS_LABEL: Record<string, string> = {
  NEW: "Nowe",
  ACCEPTED: "Przyjęte",
  IN_REVIEW: "W ocenie",
  ANSWERED: "Odpowiedziano",
  CLOSED: "Zamknięte",
  ASSIGNED_EXPERT: "U eksperta",
};

export default async function AdminPage() {
  await requireRole("ADMIN");

  const [subs, gaps, notifications, calls, unread] = await Promise.all([
    prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
      take: 40,
      include: { innovation: true },
    }),
    prisma.submission.findMany({
      where: { possibleGap: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.notification.findMany({
      where: { role: "ADMIN", read: false },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.call.findMany({ orderBy: { startsAt: "desc" } }),
    prisma.notification.count({ where: { role: "ADMIN", read: false } }),
  ]);

  const allForTrends = await prisma.submission.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 16) } },
    select: { challengeSlug: true, type: true, area: true, createdAt: true },
  });
  const trends = buildTrends(
    allForTrends.map((s) => ({
      area: s.challengeSlug || s.area || s.type || "inne",
      createdAt: s.createdAt,
    }))
  );

  // Missing conditions aggregation from profiles
  const profiles = await prisma.localProfile.findMany({ include: { match: { include: { innovation: { include: { prerequisites: true } } } } } });
  const missingCount = new Map<string, number>();
  for (const p of profiles) {
    let answers: Record<string, string> = {};
    try {
      answers = JSON.parse(p.answersJson);
    } catch {
      answers = {};
    }
    for (const pr of p.match.innovation.prerequisites) {
      if (answers[pr.id] === "NO" && pr.weight === "REQUIRED") {
        missingCount.set(pr.description, (missingCount.get(pr.description) || 0) + 1);
      }
    }
  }
  const missingTop = [...missingCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  const gapClusters = clusterGaps(
    gaps.map((g) => ({ id: g.id, publicId: g.publicId, body: g.body, createdAt: g.createdAt }))
  );

  const testers = await prisma.submission.findMany({
    where: { type: "TEST" },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: { innovation: true },
  });

  return (
    <div className="rise">
      <h1>Panel administratora</h1>
      <p className="lead">
        Kolejka zgłoszeń, luki, trendy i nabory. Powiadomienia nieprzeczytane: <strong>{unread}</strong>.
      </p>

      <p className="hint">
        <a href="/api/export/karty">Eksport kart JSON</a>
        {" · "}
        <a href="/api/export/zgloszenia">Eksport zgłoszeń JSON</a>
      </p>

      {notifications.length > 0 && (
        <section className="panel" style={{ marginBottom: "1rem" }}>
          <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>Powiadomienia</h2>
          <ul>
            {notifications.map((n) => (
              <li key={n.id}>
                {n.href ? <Link href={n.href}>{n.title}</Link> : n.title}: {n.body}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>Kolejka zgłoszeń</h2>
        <div className="stack">
          {subs.map((s) => (
            <article key={s.id} className="panel">
              <p className="hint" style={{ marginTop: 0 }}>
                {s.publicId} · {STATUS_LABEL[s.status] || s.status} · {s.type}
                {s.possibleGap ? " · brak w Bibliotece" : ""}
                {s.area === "warunki" ? " · lista braków" : ""}
              </p>
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.15rem" }}>
                <Link href={`/admin/zgloszenie/${s.id}`}>{s.title || s.body.slice(0, 60)}</Link>
              </h3>
              <p style={{ margin: 0 }}>{s.body.slice(0, 180)}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Ranking luk (zgrupowane)</h2>
        <p className="hint">
          Tylko zgłoszenia oznaczone jako możliwy brak w Bibliotece. Krótkie zapytanie nie wchodzi do tego rankingu.
        </p>
        {gapClusters.length === 0 ? (
          <p className="hint">Brak zgłoszeń luk.</p>
        ) : (
          <div className="stack">
            {gapClusters.map((c) => (
              <article key={c.id} className="panel">
                <h3 style={{ marginTop: 0, fontSize: "1.1rem" }}>
                  {c.label} — <strong>{c.count}</strong> zgłoszeń
                </h3>
                <ul>
                  {c.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
                <p className="hint">ID: {c.publicIds.join(", ")}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Testerzy innowacji</h2>
        {testers.length === 0 ? (
          <p className="hint">Brak zgłoszeń testu.</p>
        ) : (
          <ul>
            {testers.map((t) => (
              <li key={t.id}>
                <Link href={`/admin/zgloszenie/${t.id}`}>{t.publicId}</Link>
                {t.innovation ? (
                  <>
                    {" "}
                    · <Link href={`/karta/${t.innovation.slug}`}>{t.innovation.title}</Link>
                  </>
                ) : null}
                {t.rating ? ` · ocena ${t.rating}/5` : ""}
                {t.improvement ? ` · usprawnienie: ${t.improvement.slice(0, 80)}` : ""}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Trendy potrzeb</h2>
        <p className="hint">
          Widok tylko dla administratora. Bieżące 8 tygodni wobec poprzednich 8 tygodni. Liczby tygodni są w tabeli,
          nie na wykresie kolorowym.
        </p>
        {trends.length === 0 ? (
          <p className="hint">Brak zgłoszeń w ostatnich 16 tygodniach.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <caption>Zgłoszenia według obszaru: ten okres, poprzedni okres i kolejne tygodnie</caption>
              <thead>
                <tr>
                  <th scope="col">Obszar</th>
                  <th scope="col">Ostatnie 8 tygodni</th>
                  <th scope="col">Poprzednie 8 tygodni</th>
                  <th scope="col">Zmiana</th>
                  {trends[0].weeks.map((week) => (
                    <th scope="col" key={week.label}>
                      tydz. {week.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trends.map((row) => (
                  <tr key={row.area}>
                    <th scope="row">{row.area}</th>
                    <td>{row.current}</td>
                    <td>{row.previous}</td>
                    <td>
                      {row.delta > 0 ? `+${row.delta}` : row.delta}
                      {row.delta > 0 ? " wzrost" : row.delta < 0 ? " spadek" : " bez zmiany"}
                    </td>
                    {row.weeks.map((week) => (
                      <td key={week.label}>{week.count}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Najczęściej brakujące warunki</h2>
        <ul>
          {missingTop.length ? (
            missingTop.map(([desc, n]) => (
              <li key={desc}>
                {desc} — <strong>{n}</strong>
              </li>
            ))
          ) : (
            <li className="hint">Brak danych z kontroli warunków.</li>
          )}
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Nabory</h2>
        <ul>
          {calls.map((c) => (
            <li key={c.id}>
              {c.name} {c.active ? "(aktywny)" : "(nieaktywny)"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

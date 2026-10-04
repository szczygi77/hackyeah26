import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth-guard";
import { tokenEmbedding } from "@/lib/match/embed";
import { parseJsonArray } from "@/lib/json";
import { getSession } from "@/lib/session";

async function saveCardAction(formData: FormData) {
  "use server";
  await requireRole("ADMIN");
  const id = String(formData.get("id"));
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const category = String(formData.get("category") || "seniorzy");
  const evidenceLevel = String(formData.get("evidenceLevel") || "UNKNOWN");
  const evidenceNote = String(formData.get("evidenceNote") || "");
  const authorContact = String(formData.get("authorContact") || "");
  const status = String(formData.get("status") || "PUBLISHED");
  const problems = String(formData.get("problems") || "")
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const elements = String(formData.get("elements") || "")
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const targets = String(formData.get("target") || "")
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const existing = await prisma.innovation.findUnique({ where: { id } });
  if (!existing) return;

  const searchText = [title, summary, ...problems, ...elements, category].join(" ");
  const session = await getSession();
  await prisma.innovationRevision.create({
    data: {
      innovationId: existing.id,
      version: existing.version,
      authorLabel: session.name || session.email || "admin",
      snapshotJson: JSON.stringify({
        title: existing.title,
        summary: existing.summary,
        category: existing.category,
        problemsJson: existing.problemsJson,
        elementsJson: existing.elementsJson,
        targetGroupsJson: existing.targetGroupsJson,
        evidenceLevel: existing.evidenceLevel,
        evidenceNote: existing.evidenceNote,
        authorContact: existing.authorContact,
        status: existing.status,
        savedAt: existing.updatedAt.toISOString(),
      }),
    },
  });
  await prisma.innovation.update({
    where: { id },
    data: {
      title,
      summary,
      category,
      problemsJson: JSON.stringify(problems),
      elementsJson: JSON.stringify(elements),
      targetGroupsJson: JSON.stringify(targets),
      evidenceLevel,
      evidenceNote,
      authorContact,
      status,
      searchText,
      embeddingJson: JSON.stringify(tokenEmbedding(searchText)),
      version: existing.version + 1,
    },
  });
  redirect(`/admin/karta/${id}?saved=1`);
}

export default async function EditCardPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireRole("ADMIN");
  const { id } = await params;
  const { saved } = await searchParams;
  const card = await prisma.innovation.findUnique({
    where: { id },
    include: {
      prerequisites: true,
      revisions: { orderBy: { version: "desc" }, take: 8 },
      submissions: { where: { type: "TEST" }, orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
  if (!card) notFound();

  const problems = parseJsonArray(card.problemsJson).join(", ");
  const elements = parseJsonArray(card.elementsJson).join(", ");
  const targets = parseJsonArray(card.targetGroupsJson).join(", ");

  return (
    <div className="rise">
      <p>
        <Link href="/admin/karty">← Karty</Link>
      </p>
      <h1>Edycja karty</h1>
      <p className="lead">
        Wersja aktualna: <strong>v{card.version}</strong>. Zapis odkłada poprzednią wersję z datą i autorem.
        {saved ? " Zapisano." : ""}
      </p>

      <form action={saveCardAction} className="panel">
        <input type="hidden" name="id" value={card.id} />
        <div className="field">
          <label htmlFor="title">Tytuł</label>
          <input id="title" name="title" required defaultValue={card.title} />
        </div>
        <div className="field">
          <label htmlFor="summary">Streszczenie</label>
          <textarea id="summary" name="summary" required defaultValue={card.summary} />
        </div>
        <div className="field">
          <label htmlFor="category">Kategoria</label>
          <input id="category" name="category" defaultValue={card.category} />
        </div>
        <div className="field">
          <label htmlFor="problems">Problemy (przecinki)</label>
          <input id="problems" name="problems" defaultValue={problems} />
        </div>
        <div className="field">
          <label htmlFor="target">Grupa docelowa</label>
          <input id="target" name="target" defaultValue={targets} />
        </div>
        <div className="field">
          <label htmlFor="elements">Elementy</label>
          <input id="elements" name="elements" defaultValue={elements} />
        </div>
        <div className="field">
          <label htmlFor="evidenceLevel">Poziom dowodów</label>
          <select id="evidenceLevel" name="evidenceLevel" defaultValue={card.evidenceLevel}>
            <option value="E0">E0</option>
            <option value="E1">E1</option>
            <option value="E2">E2</option>
            <option value="E3">E3</option>
            <option value="UNKNOWN">UNKNOWN</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="evidenceNote">Opis dowodów</label>
          <textarea id="evidenceNote" name="evidenceNote" defaultValue={card.evidenceNote} />
        </div>
        <div className="field">
          <label htmlFor="authorContact">Kontakt autora</label>
          <input id="authorContact" name="authorContact" defaultValue={card.authorContact} />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={card.status}>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="DRAFT">DRAFT</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
        <button className="btn" type="submit">
          Zapisz nową wersję
        </button>
      </form>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Historia wersji</h2>
        {card.revisions.length === 0 ? (
          <p className="hint">Brak starszych wersji. Pierwszy zapis utworzy wpis z datą i autorem.</p>
        ) : (
          <ul>
            {card.revisions.map((rev) => (
              <li key={rev.id}>
                v{rev.version} · {rev.authorLabel} · {rev.createdAt.toLocaleString("pl-PL")}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Warunki wstępne</h2>
        <ul>
          {card.prerequisites.map((p) => (
            <li key={p.id}>
              {p.description} ({p.weight}, {p.origin})
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Testerzy tej karty</h2>
        {card.submissions.length === 0 ? (
          <p className="hint">Brak zgłoszeń testu.</p>
        ) : (
          <ul>
            {card.submissions.map((s) => (
              <li key={s.id}>
                <Link href={`/admin/zgloszenie/${s.id}`}>{s.publicId}</Link>
                {s.rating ? ` · ${s.rating}/5` : ""} — {s.body.slice(0, 100)}
              </li>
            ))}
          </ul>
        )}
      </section>

      <p>
        <Link href={`/karta/${card.slug}`}>Podgląd publiczny</Link>
      </p>
    </div>
  );
}

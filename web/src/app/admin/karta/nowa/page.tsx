import Link from "next/link";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth-guard";
import { extractCardDraft } from "@/lib/ai";
import { prisma } from "@/lib/db";
import { tokenEmbedding } from "@/lib/match/embed";

async function draftAction(formData: FormData) {
  "use server";
  await requireRole("ADMIN");
  const raw = String(formData.get("raw") || "");
  const draft = await extractCardDraft(raw);
  const params = new URLSearchParams({
    title: draft.title || "",
    summary: draft.summary || "",
    problems: draft.problems || "",
    target: draft.target || "",
    elements: draft.elements || "",
    raw: raw.slice(0, 1500),
  });
  redirect(`/admin/karta/nowa?${params.toString()}`);
}

async function publishAction(formData: FormData) {
  "use server";
  await requireRole("ADMIN");
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const category = String(formData.get("category") || "seniorzy");
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
  const slug =
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) +
    "-" +
    Date.now().toString(36);

  const searchText = [title, summary, ...problems, ...elements, category].join(" ");
  await prisma.innovation.create({
    data: {
      slug,
      title,
      summary,
      category,
      problemsJson: JSON.stringify(problems),
      elementsJson: JSON.stringify(elements),
      targetGroupsJson: JSON.stringify(targets),
      challengeAreasJson: JSON.stringify([]),
      evidenceLevel: "E0",
      evidenceNote: "Szkic zatwierdzony w panelu admina (demo).",
      authorContact: "Admin demo",
      searchText,
      embeddingJson: JSON.stringify(tokenEmbedding(searchText)),
      status: "PUBLISHED",
      prerequisites: {
        create: elements.slice(0, 2).map((e) => ({
          type: "STAFF",
          weight: "HELPFUL",
          description: `Czy możecie zapewnić: ${e}?`,
          quote: e,
          origin: "DERIVED",
        })),
      },
    },
  });
  redirect(`/karta/${slug}`);
}

export default async function NewCardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  await requireRole("ADMIN");
  const sp = await searchParams;

  return (
    <div className="rise">
      <p>
        <Link href="/admin">← Panel</Link>
      </p>
      <h1>Wczytywanie karty — szkic</h1>
      <p className="lead">
        Wklej tekst karty. System przygotuje szkic pól; publikacja dopiero po Twojej korekcie.
      </p>

      <form action={draftAction} className="panel">
        <div className="field">
          <label htmlFor="raw">Tekst karty / PDF (wklejony)</label>
          <textarea id="raw" name="raw" required defaultValue={sp.raw || ""} />
        </div>
        <button className="btn btn-secondary" type="submit">
          Wygeneruj szkic
        </button>
      </form>

      <form action={publishAction} className="panel" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>Szkic do zatwierdzenia</h2>
        <div className="field">
          <label htmlFor="title">Tytuł</label>
          <input id="title" name="title" required defaultValue={sp.title || ""} />
        </div>
        <div className="field">
          <label htmlFor="summary">Streszczenie</label>
          <textarea id="summary" name="summary" required defaultValue={sp.summary || ""} />
        </div>
        <div className="field">
          <label htmlFor="category">Kategoria Biblioteki</label>
          <select id="category" name="category" defaultValue="seniorzy">
            <option>niepełnosprawność intelektualna</option>
            <option>kryzys bezdomności</option>
            <option>cudzoziemcy</option>
            <option>rynek pracy</option>
            <option>zdrowie i medycyna</option>
            <option>niepełnosprawność sensoryczna</option>
            <option>ograniczona mobilność</option>
            <option>dzieci, młodzież i rodziny</option>
            <option>seniorzy</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="problems">Problemy (przecinki)</label>
          <input id="problems" name="problems" defaultValue={sp.problems || ""} />
        </div>
        <div className="field">
          <label htmlFor="target">Grupa docelowa</label>
          <input id="target" name="target" defaultValue={sp.target || ""} />
        </div>
        <div className="field">
          <label htmlFor="elements">Elementy</label>
          <input id="elements" name="elements" defaultValue={sp.elements || ""} />
        </div>
        <button className="btn" type="submit">
          Zatwierdź i opublikuj
        </button>
      </form>
    </div>
  );
}

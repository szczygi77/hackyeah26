import Link from "next/link";
import { Steps } from "@/components/Steps";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { generateMiddlemanPlan } from "@/lib/ai";
import { parseJsonObject } from "@/lib/json";

type PlanPayload = {
  sections: { title: string; body: string }[];
  source: "ai" | "template";
  savedAt: string;
};

export default async function MiddlemanPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ matchId?: string }>;
}) {
  const { slug } = await params;
  const { matchId } = await searchParams;

  const card = await prisma.innovation.findUnique({
    where: { slug },
    include: { prerequisites: true },
  });
  if (!card || card.status !== "PUBLISHED") notFound();

  let answers: Record<string, string> = {};
  let municipality: string | undefined;
  let matchRecord: { id: string; middlemanPlanJson: string | null } | null = null;

  if (matchId) {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { profile: true },
    });
    if (match && match.innovationId === card.id) {
      matchRecord = match;
      if (match.profile) {
        answers = parseJsonObject(match.profile.answersJson);
        municipality = match.profile.municipality || undefined;
      }
    }
  }

  let plan: PlanPayload;
  const existing = matchRecord?.middlemanPlanJson
    ? parseJsonObject<PlanPayload>(matchRecord.middlemanPlanJson)
    : null;

  if (existing?.sections?.length) {
    plan = existing;
  } else {
    const generated = await generateMiddlemanPlan(card, answers, municipality);
    plan = { ...generated, savedAt: new Date().toISOString() };
    if (matchRecord) {
      await prisma.match.update({
        where: { id: matchRecord.id },
        data: { middlemanPlanJson: JSON.stringify(plan) },
      });
    }
  }

  return (
    <div className="rise">
      <Steps active={3} />
      <p className="hint">
        <Link href={`/karta/${slug}`}>← Karta</Link>
        {matchId ? (
          <>
            {" "}
            · <Link href={`/sprawdz/${matchId}/wynik`}>Lista zgodności</Link>
          </>
        ) : null}
      </p>
      <h1>Middleman — dostosuj innowację do instytucji</h1>
      <p className="lead">
        Szkic usługi wdrożeniowej dla «{card.title}». Wersja robocza {plan.source === "ai" ? "z AI" : "szablonowa"} — do
        weryfikacji. Platforma <strong>nie sprawdza zgodności z prawem</strong>.
      </p>

      {matchRecord && (
        <p className="hint">
          Szkic zapisany przy dopasowaniu (match) · {new Date(plan.savedAt).toLocaleString("pl-PL")}
        </p>
      )}

      <div className="stack">
        {plan.sections.map((s) => (
          <section key={s.title} className="panel">
            <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>{s.title}</h2>
            <p style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>{s.body}</p>
          </section>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.25rem" }}>
        <Link className="btn btn-accent" href={`/tester?slug=${encodeURIComponent(slug)}`}>
          Chcę przetestować
        </Link>
        <Link className="btn btn-secondary" href="/partnerstwa">
          Szukaj partnerów
        </Link>
      </div>

      <p className="hint" style={{ marginTop: "1rem" }}>
        Źródło generowania: {plan.source}. Koszty i terminy tylko jeśli są w karcie.
        {!matchRecord && " Aby zapisać szkic, przejdź przez „Sprawdź, czy zadziała u Was”."}
      </p>
    </div>
  );
}

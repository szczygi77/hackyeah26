import { notFound, redirect } from "next/navigation";
import { Steps } from "@/components/Steps";
import { prisma } from "@/lib/db";
import { evaluateFit, originLabel } from "@/lib/fit";
import { publicSubmissionId } from "@/lib/ids";
import { parseJsonObject } from "@/lib/json";
async function handoffAction(formData: FormData) {
  "use server";
  const matchId = String(formData.get("matchId") || "");
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: { innovation: { include: { prerequisites: true } }, profile: true },
  });
  if (!match?.profile) return;

  const answers = parseJsonObject<Record<string, string>>(match.profile.answersJson);
  const fit = evaluateFit(match.innovation.prerequisites, answers);
  const line = (items: { description: string; origin: string }[]) =>
    items.length ? items.map((p) => `- ${p.description} (${originLabel(p.origin)})`).join("\n") : "- brak";
  const body = [
    `Karta: ${match.innovation.title}`,
    `Zapytanie: ${match.queryText}`,
    fit.summary,
    "",
    "Brakuje:",
    line(fit.missing),
    "",
    "Do sprawdzenia:",
    line(fit.toCheck),
    "",
    "Macie:",
    line(fit.have),
  ].join("\n");

  const sub = await prisma.submission.create({
    data: {
      type: "PROBLEM",
      status: "ACCEPTED",
      publicId: publicSubmissionId(),
      title: "Lista braków do ROPS",
      body,
      area: "warunki",
      innovationId: match.innovationId,
      statusEvents: {
        create: { status: "ACCEPTED", note: "Lista warunków przekazana do ROPS", actorRole: "system" },
      },
      thread: { create: {} },
    },
  });
  await prisma.match.update({ where: { id: match.id }, data: { submissionId: sub.id } });
  await prisma.notification.create({
    data: {
      role: "ADMIN",
      title: "Lista braków do ROPS",
      body: match.innovation.title,
      href: `/admin/zgloszenie/${sub.id}`,
    },
  });
  redirect(`/zgloszenie/${sub.publicId}`);
}

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
          <strong>Kontekst gminy, nie odpowiedź na warunki karty:</strong>
          <p style={{ marginBottom: 0 }}>{muniNote}</p>
        </aside>
      )}

      <div className="fit-cols">
        <section className="panel fit-have">
          <h3>Macie to</h3>
          <ul>
            {fit.have.length ? (
              fit.have.map((p) => (
                <li key={p.id}>
                  {p.description} <span className="hint">({originLabel(p.origin)})</span>
                </li>
              ))
            ) : (
              <li className="hint">—</li>
            )}
          </ul>
        </section>
        <section className="panel fit-missing">
          <h3>Brakuje</h3>
          <ul>
            {fit.missing.length ? (
              fit.missing.map((p) => (
                <li key={p.id}>
                  {p.description} <span className="hint">({originLabel(p.origin)})</span>
                </li>
              ))
            ) : (
              <li className="hint">—</li>
            )}
          </ul>
        </section>
        <section className="panel fit-check">
          <h3>Do sprawdzenia</h3>
          <ul>
            {fit.toCheck.length ? (
              fit.toCheck.map((p) => (
                <li key={p.id}>
                  {p.description} <span className="hint">({originLabel(p.origin)})</span>
                </li>
              ))
            ) : (
              <li className="hint">—</li>
            )}
          </ul>
        </section>
      </div>

      <form action={handoffAction} style={{ marginTop: "1.5rem" }}>
        <input type="hidden" name="matchId" value={match.id} />
        <button className="btn" type="submit">
          Przekaż ROPS listę braków
        </button>
      </form>
      <p className="hint">Plan wdrożenia, test, mentor i partnerstwo są dostępne po przekazaniu tej listy.</p>
    </div>
  );
}

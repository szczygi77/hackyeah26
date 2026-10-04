import Link from "next/link";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseJsonArray } from "@/lib/json";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { Honeypot } from "@/components/Honeypot";
import { CardMedia } from "@/components/CardMedia";
import { TestInterestForm } from "@/components/TestInterestForm";
import type { EvidenceLevel } from "@/lib/types";
import { publicSubmissionId } from "@/lib/ids";
import { maskPii } from "@/lib/match/pii";
import { simplifyLanguage } from "@/lib/ai";
import { checkSubmissionLimit, isHoneypotFilled } from "@/lib/limits";
import { startFitFromCard } from "@/lib/actions/start-fit";
import { Steps } from "@/components/Steps";
import { PrivacyNote } from "@/components/PrivacyNote";

async function mentorAction(formData: FormData) {
  "use server";
  if (isHoneypotFilled(formData)) redirect("/");
  const h = await headers();
  if (!checkSubmissionLimit(`mentor:${h.get("x-forwarded-for") || "local"}`).ok) redirect("/");
  const innovationId = String(formData.get("innovationId"));
  const question = maskPii(String(formData.get("question") || "")).masked;
  const contactEmail = maskPii(String(formData.get("contactEmail") || "")).masked;
  const sub = await prisma.submission.create({
    data: {
      type: "MENTOR",
      status: "ACCEPTED",
      publicId: publicSubmissionId(),
      title: "Pytanie do mentora",
      body: question,
      contactEmail,
      innovationId,
      statusEvents: { create: { status: "ACCEPTED", note: "Pytanie przyjęte", actorRole: "system" } },
      thread: { create: { messages: { create: { authorRole: "author", body: question } } } },
    },
  });
  await prisma.notification.create({
    data: {
      role: "EXPERT",
      title: "Nowe pytanie do mentora",
      body: question.slice(0, 160),
      href: `/ekspert`,
    },
  });
  redirect(`/zgloszenie/${sub.publicId}`);
}

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = await prisma.innovation.findUnique({
    where: { slug },
    include: { prerequisites: true },
  });
  if (!card || card.status !== "PUBLISHED") notFound();

  const problems = parseJsonArray(card.problemsJson);
  const targets = parseJsonArray(card.targetGroupsJson);
  const elements = parseJsonArray(card.elementsJson);
  const challenges = parseJsonArray(card.challengeAreasJson);
  const prosty = (await cookies()).get("szczep_prosty")?.value === "1";
  const summary = prosty ? simplifyLanguage(card.summary) : card.summary;

  return (
    <div className="rise">
      <Steps active={1} />
      <p className="hint">
        <Link href="/zasobnik">Ogłoszenia</Link> / {card.category}
        {prosty ? " · tekst uproszczony automatycznie" : ""}
      </p>

      <div className="listing-detail">
        <div>
          <div className="card-title-row">
            <h1 style={{ margin: 0 }}>{card.title}</h1>
            <a href={prosty ? "/api/prosty?on=0" : "/api/prosty?on=1"}>
              {prosty ? "Tekst standardowy" : "Prosty tekst"}
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            <EvidenceBadge level={card.evidenceLevel as EvidenceLevel} />
            <span className="badge">{card.category}</span>
          </div>

          <section className="panel" aria-labelledby="k60">
            <h2 id="k60" style={{ marginTop: 0, fontSize: "1.35rem" }}>
              Karta w 60 sekund
            </h2>
            <p>
              <strong>Problem:</strong> {problems.join("; ") || "nie podano"}
            </p>
            <p>
              <strong>Dla kogo:</strong> {targets.join("; ") || "nie podano"}
            </p>
            <p>
              <strong>Co robi:</strong> {summary}
            </p>
            <p>
              <strong>Elementy:</strong> {elements.join("; ") || "nie podano"}
            </p>
            <p>
              <strong>Dowody:</strong> {card.evidenceNote || "nie podano"}
            </p>
            <p>
              <strong>Warunki:</strong>
            </p>
            <ul>
              {card.prerequisites.map((p) => (
                <li key={p.id}>
                  {p.description}{" "}
                  <span className="hint">
                    ({p.weight === "REQUIRED" ? "konieczny" : "pomocny"}
                    {p.origin === "DERIVED" ? ", wyprowadzony z elementów" : ""})
                  </span>
                </li>
              ))}
            </ul>
            <p>
              <strong>Kontakt autora:</strong> {card.authorContact || "nie podano"}
            </p>
            {challenges.length > 0 && (
              <p>
                <strong>Wyzwania:</strong>{" "}
                {challenges.map((c, i) => (
                  <span key={c}>
                    {i > 0 && ", "}
                    <Link href={`/wyzwania/${c}`}>{c}</Link>
                  </span>
                ))}
              </p>
            )}
            <CardMedia materialsJson={card.materialsJson} videoUrl={card.videoUrl} transcript={card.transcript} />
          </section>

          <section className="panel" style={{ marginTop: "1rem" }} id="test">
            <h2 style={{ marginTop: 0, fontSize: "1.25rem" }}>Chcę przetestować</h2>
            <TestInterestForm innovationId={card.id} innovationTitle={card.title} />
          </section>

          <section className="panel" style={{ marginTop: "1rem" }} id="mentor">
            <h2 style={{ marginTop: 0, fontSize: "1.25rem" }}>Zapytaj mentora</h2>
            <form action={mentorAction} style={{ position: "relative" }}>
              <Honeypot />
              <input type="hidden" name="innovationId" value={card.id} />
              <div className="field">
                <label htmlFor="question">Pytanie</label>
                <textarea id="question" name="question" required aria-describedby="question-hint" />
                <PrivacyNote id="question-hint" />
              </div>
              <div className="field">
                <label htmlFor="mEmail">E-mail kontaktowy</label>
                <input id="mEmail" name="contactEmail" type="email" />
              </div>
              <button className="btn btn-secondary" type="submit">
                Wyślij do mentora
              </button>
            </form>
          </section>
        </div>

        <aside className="listing-cta panel" aria-label="Akcje ogłoszenia">
          <h2 style={{ marginTop: 0, fontSize: "1.15rem" }}>Działaj</h2>
          <form action={startFitFromCard}>
            <input type="hidden" name="innovationId" value={card.id} />
            <input type="hidden" name="queryText" value={problems[0] || card.title} />
            <button type="submit" className="btn">
              Sprawdź u siebie
            </button>
          </form>
          <Link className="btn btn-secondary" href={`/wyniki?q=${encodeURIComponent(problems[0] || card.title)}`}>
            Szukaj podobnych
          </Link>
          <p className="hint" style={{ marginBottom: 0 }}>
            Ogłoszenie z Biblioteki Innowacji (demo). Nie zawiera prawdziwych danych osobowych.
          </p>
        </aside>
      </div>
    </div>
  );
}

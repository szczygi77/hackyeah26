import Link from "next/link";
import { cookies } from "next/headers";
import { Steps } from "@/components/Steps";
import { ListingCard } from "@/components/ListingCard";
import { searchInnovations } from "@/lib/match/search";
import { prisma } from "@/lib/db";
import { publicSubmissionId } from "@/lib/ids";
import { redirect } from "next/navigation";
import { generateJustification, aiEnabled, simplifyLanguage } from "@/lib/ai";
import { isHoneypotFilled, checkSubmissionLimit } from "@/lib/limits";

async function saveGapAction(formData: FormData) {
  "use server";
  if (isHoneypotFilled(formData)) redirect("/");
  const q = String(formData.get("q") || "");
  const limit = checkSubmissionLimit(`gap:${q.slice(0, 20)}`);
  if (!limit.ok) redirect(`/wyniki?q=${encodeURIComponent(q)}&err=limit`);

  const sub = await prisma.submission.create({
    data: {
      type: "GAP",
      status: "ACCEPTED",
      publicId: publicSubmissionId(),
      title: "Możliwa luka w Bibliotece",
      body: q,
      possibleGap: true,
      statusEvents: {
        create: { status: "ACCEPTED", note: "Zgłoszenie luki przyjęte automatycznie", actorRole: "system" },
      },
      thread: { create: {} },
    },
  });
  await prisma.notification.create({
    data: {
      role: "ADMIN",
      title: "Nowa możliwa luka",
      body: q.slice(0, 160),
      href: `/admin/zgloszenie/${sub.id}`,
    },
  });
  redirect(`/zgloszenie/${sub.publicId}`);
}

async function startFitAction(formData: FormData) {
  "use server";
  const innovationId = String(formData.get("innovationId") || "");
  const queryText = String(formData.get("queryText") || "");
  const rank = Number(formData.get("rank") || 1);
  const score = Number(formData.get("score") || 0);
  const confidence = String(formData.get("confidence") || "LOW");
  const justification = String(formData.get("justification") || "");
  const quote = String(formData.get("quote") || "");

  const m = await prisma.match.create({
    data: {
      innovationId,
      queryText,
      rank,
      score,
      confidence,
      justification,
      quote,
    },
  });
  redirect(`/sprawdz/${m.id}`);
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; err?: string }>;
}) {
  const { q = "" } = await searchParams;
  if (!q.trim()) redirect("/");

  const { query, masked, results, possibleGap, flags } = await searchInnovations(q);
  const prosty = (await cookies()).get("szczep_prosty")?.value === "1";
  const droga = (await cookies()).get("szczep_droga")?.value === "pomoc" ? "pomoc" : "gmina";
  const skipAi = flags.crisis;
  const useAi = !skipAi && aiEnabled();

  const enriched = await Promise.all(
    results.map(async (r) => {
      if (!useAi) {
        return { ...r, justificationSource: "template" as const };
      }
      const j = await generateJustification(r.innovation, query, {
        text: r.justification,
        quote: r.quote,
      });
      return {
        ...r,
        justification: j.text,
        quote: j.quote,
        justificationSource: j.source,
      };
    })
  );

  const anyAi = enriched.some((r) => r.justificationSource === "ai");

  return (
    <div className="rise">
      <Steps active={1} />
      <h1>Dopasowane ogłoszenia</h1>
      <p className="droga-now">
        {droga === "pomoc" ? "Szukasz pomocy" : "Szukasz dla gminy"}
        {" · "}
        <Link href="/">zmień</Link>
      </p>
      <p className="lead">
        Zapytanie: <em>«{query}»</em>
        {masked ? " (ukryto dane osobowe)" : ""}.
      </p>
      <p className="hint">
        Tryb uzasadnień: {anyAi ? "AI (z weryfikacją cytatu)" : "szablonowy (bez zewnętrznego modelu)"}.
        {skipAi ? " AI wyłączone z powodu sygnału kryzysu." : ""}
      </p>

      {flags.crisis && (
        <aside
          className="panel"
          role="alert"
          style={{ marginBottom: "1rem", borderLeft: "4px solid var(--low)", background: "#f8e8e5" }}
        >
          <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>Potrzebujesz natychmiastowej pomocy?</h2>
          <p>
            Ta platforma <strong>nie zastępuje pomocy kryzysowej</strong>. W nagłym zagrożeniu życia lub zdrowia:
          </p>
          <ul>
            <li>
              <strong>112</strong> — numer alarmowy
            </li>
            <li>
              <strong>116 123</strong> — Telefon Zaufania dla Dorosłych
            </li>
            <li>
              <strong>800 70 2222</strong> — Telefon Zaufania dla Dzieci i Młodzieży (oraz 116 111)
            </li>
          </ul>
          <p className="hint" style={{ marginBottom: 0 }}>
            Poniżej pokazujemy najbliższe karty z katalogu innowacji społecznych — to nie jest porada medyczna ani
            interwencja kryzysowa.
          </p>
        </aside>
      )}

      {flags.outOfScope && (
        <aside className="panel" style={{ marginBottom: "1rem", borderLeft: "4px solid var(--warn)" }}>
          <p style={{ margin: 0 }}>
            Szczep pomaga znaleźć <strong>innowacje społeczne do wdrożenia lokalnego</strong>, a nie diagnozować ani
            leczyć. W sprawach medycznych skontaktuj się z lekarzem lub NFZ (800 190 590).
          </p>
        </aside>
      )}

      {flags.shortQuery && (
        <aside className="panel" style={{ marginBottom: "1rem" }}>
          <p style={{ margin: 0 }}>
            Zapytanie jest bardzo krótkie ({flags.wordCount}{" "}
            {flags.wordCount === 1 ? "słowo" : "słowa"}). Pokazujemy najbliższe wyniki — doprecyzuj problem (kto,
            gdzie, co się stało), aby poprawić trafność.
          </p>
        </aside>
      )}

      <div className="listing-grid" style={{ marginTop: "1.5rem" }}>
        {enriched.map((r, i) => {
          const summary = prosty ? simplifyLanguage(r.innovation.summary) : r.innovation.summary;
          return (
            <ListingCard
              key={r.innovation.id}
              slug={r.innovation.slug}
              title={r.innovation.title}
              summary={summary + (prosty ? " (uproszczone automatycznie)" : "")}
              category={r.innovation.category}
              evidenceLevel={r.innovation.evidenceLevel}
              hasVideo={Boolean(r.innovation.videoUrl)}
              confidence={r.confidence}
              justification={r.justification}
              rank={i + 1}
              footer={
                <>
                  <Link href={`/karta/${r.innovation.slug}`}>Zobacz ogłoszenie</Link>
                  {droga === "gmina" ? (
                    <Link href={`/middleman/${r.innovation.slug}`}>Plan wdrożenia</Link>
                  ) : null}
                  <form action={startFitAction}>
                    <input type="hidden" name="innovationId" value={r.innovation.id} />
                    <input type="hidden" name="queryText" value={query} />
                    <input type="hidden" name="rank" value={i + 1} />
                    <input type="hidden" name="score" value={r.score} />
                    <input type="hidden" name="confidence" value={r.confidence} />
                    <input type="hidden" name="justification" value={r.justification} />
                    <input type="hidden" name="quote" value={r.quote} />
                    <button type="submit" className="btn btn-compact">
                      {droga === "pomoc" ? "Zapytaj, czy to u nas działa" : "Sprawdź warunki u siebie"}
                    </button>
                  </form>
                  <p className="hint" style={{ width: "100%", margin: 0 }}>
                    Cytat: «{r.quote}» ·{" "}
                    {r.unknowns.length ? `Nie wiemy: ${r.unknowns.join("; ")}` : "Pola karty uzupełnione"} ·{" "}
                    {r.justificationSource === "ai" ? "AI" : "szablon"}
                  </p>
                </>
              }
            />
          );
        })}
      </div>

      {possibleGap && !flags.crisis && (
        <aside className="panel gap-invite">
          <h2 style={{ fontSize: "1.25rem", marginTop: 0 }}>W Bibliotece nie ma mocnego dopasowania</h2>
          <p>
            To sygnał dla ROPS, nie błąd wyszukiwania. Możesz opisać problem dokładniej albo zgłosić potrzebę.
          </p>
          <form action={saveGapAction}>
            <input type="hidden" name="q" value={query} />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", height: 0, width: 0 }}
            />
            <button type="submit" className="btn btn-secondary">
              Zgłoś potrzebę
            </button>
          </form>
        </aside>
      )}

      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/">← Nowe wyszukiwanie</Link>
      </p>
    </div>
  );
}

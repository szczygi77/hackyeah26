import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Steps } from "@/components/Steps";
import { Honeypot } from "@/components/Honeypot";
import { PrivacyNote } from "@/components/PrivacyNote";
import { prisma } from "@/lib/db";
import { publicSubmissionId } from "@/lib/ids";
import { maskPii } from "@/lib/match/pii";
import { searchInnovations } from "@/lib/match/search";
import { checkSubmissionLimit, isHoneypotFilled } from "@/lib/limits";
import { notifyWebhook } from "@/lib/webhook";

async function submitIdeaAction(formData: FormData) {
  "use server";
  if (isHoneypotFilled(formData)) redirect("/");
  const h = await headers();
  const ip = h.get("x-forwarded-for") || "local";
  const lim = checkSubmissionLimit(`idea:${ip}`);
  if (!lim.ok) redirect("/pomysl?err=limit");

  const title = String(formData.get("title") || "").trim();
  const body = maskPii(String(formData.get("body") || "")).masked;
  const roleLabel = String(formData.get("roleLabel") || "");
  const area = String(formData.get("area") || "");
  const contactEmail = maskPii(String(formData.get("contactEmail") || "")).masked;
  const intensity = String(formData.get("intensity") || "");
  const frequency = String(formData.get("frequency") || "");
  const scale = String(formData.get("scale") || "");
  const readiness = String(formData.get("readiness") || "");
  const supporters = String(formData.get("supporters") || "");
  const blockers = String(formData.get("blockers") || "");
  const audience = String(formData.get("audience") || "");
  const payer = String(formData.get("payer") || "");
  const valueTags = String(formData.get("valueTags") || "");

  const canvas = {
    intensity,
    frequency,
    scale,
    readiness,
    supporters,
    blockers,
    audience,
    payer,
    valueTags,
  };

  const sub = await prisma.submission.create({
    data: {
      type: "IDEA",
      status: "ACCEPTED",
      publicId: publicSubmissionId(),
      title: title || "Fiszka pomysłu",
      body,
      roleLabel,
      area,
      contactEmail,
      canvasJson: JSON.stringify(canvas),
      statusEvents: { create: { status: "ACCEPTED", note: "Fiszka przyjęta", actorRole: "system" } },
      thread: { create: {} },
    },
  });
  await prisma.notification.create({
    data: {
      role: "ADMIN",
      title: "Nowa fiszka pomysłu",
      body: title || body.slice(0, 120),
      href: `/admin/zgloszenie/${sub.id}`,
    },
  });
  await notifyWebhook("idea.created", { publicId: sub.publicId, title: sub.title });

  if (formData.get("prepareApplication") === "1") {
    redirect(`/pomysl/wniosek/${sub.publicId}`);
  }
  redirect(`/zgloszenie/${sub.publicId}`);
}

export default async function IdeaPage({ searchParams }: { searchParams: Promise<{ similar?: string }> }) {
  const { similar } = await searchParams;
  const activeCall = await prisma.call.findFirst({ where: { active: true } });
  let similarCards: Awaited<ReturnType<typeof searchInnovations>>["results"] = [];
  if (similar?.trim()) {
    similarCards = (await searchInnovations(similar)).results;
  }

  return (
    <div className="rise">
      <Steps active={3} />
      <h1>Kreator pomysłów</h1>
      <p className="lead">
        Trzy pola obowiązkowe + opcjonalna kanwa Social Canvas.{" "}
        {activeCall ? (
          <>
            Aktywny nabór: <strong>{activeCall.name}</strong>.
          </>
        ) : (
          "Brak aktywnego naboru — generator wniosku ukryty."
        )}
      </p>

      <form action={submitIdeaAction} className="panel" style={{ position: "relative" }}>
        <Honeypot />
        <div className="field">
          <label htmlFor="title">Istota pomysłu (krótki tytuł)</label>
          <input id="title" name="title" required aria-describedby="title-hint" />
          <PrivacyNote id="title-hint" />
        </div>
        <div className="field">
          <label htmlFor="body">Opis istoty</label>
          <textarea id="body" name="body" required aria-describedby="body-hint" />
          <PrivacyNote id="body-hint" />
        </div>
        <div className="field">
          <label htmlFor="roleLabel">Komu dedykowany</label>
          <input id="roleLabel" name="roleLabel" required placeholder="np. seniorzy w małych gminach" aria-describedby="role-hint" />
          <PrivacyNote id="role-hint" />
        </div>
        <div className="field">
          <label htmlFor="area">Na jakim etapie</label>
          <select id="area" name="area" defaultValue="pomysł">
            <option value="pomysł">Pomysł</option>
            <option value="prototyp">Prototyp</option>
            <option value="test">Przetestowane</option>
            <option value="gotowe">Gotowe do wdrożenia</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="contactEmail">E-mail kontaktowy</label>
          <input id="contactEmail" name="contactEmail" type="email" />
        </div>

        <h2 style={{ fontSize: "1.2rem" }}>Kanwa (opcjonalnie)</h2>
        <div className="field">
          <label htmlFor="intensity">Intensywność problemu</label>
          <select id="intensity" name="intensity" defaultValue="">
            <option value="">—</option>
            <option>Bardzo poważny</option>
            <option>Mocno przeszkadza</option>
            <option>Utrudnia działanie</option>
            <option>Lekko przeszkadza</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="frequency">Częstotliwość</label>
          <select id="frequency" name="frequency" defaultValue="">
            <option value="">—</option>
            <option>Bardzo często</option>
            <option>Często</option>
            <option>Czasami</option>
            <option>Rzadko</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="scale">Skala</label>
          <select id="scale" name="scale" defaultValue="">
            <option value="">—</option>
            <option>Pojedyncze osoby</option>
            <option>Wąska grupa</option>
            <option>Duża grupa</option>
            <option>Bardzo szeroka grupa</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="readiness">Gotowość rozwiązania</label>
          <select id="readiness" name="readiness" defaultValue="">
            <option value="">—</option>
            <option>Pomysł</option>
            <option>Prototyp</option>
            <option>Przetestowane rozwiązanie</option>
            <option>Gotowe do wdrożenia</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="supporters">Aktorzy wspierający</label>
          <input id="supporters" name="supporters" aria-describedby="supporters-hint" />
          <PrivacyNote id="supporters-hint" />
        </div>
        <div className="field">
          <label htmlFor="blockers">Aktorzy utrudniający</label>
          <input id="blockers" name="blockers" aria-describedby="blockers-hint" />
          <PrivacyNote id="blockers-hint" />
        </div>
        <div className="field">
          <label htmlFor="audience">Główny odbiorca</label>
          <input id="audience" name="audience" aria-describedby="audience-hint" />
          <PrivacyNote id="audience-hint" />
        </div>
        <div className="field">
          <label htmlFor="payer">Płatnik / budżet</label>
          <input id="payer" name="payer" aria-describedby="payer-hint" />
          <PrivacyNote id="payer-hint" />
        </div>
        <div className="field">
          <label htmlFor="valueTags">Propozycja wartości (2–3 tagi)</label>
          <input id="valueTags" name="valueTags" placeholder="np. zmniejszenie samotności, oszczędza czas" aria-describedby="value-hint" />
          <PrivacyNote id="value-hint" />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <button className="btn" type="submit" name="prepareApplication" value="0">
            Wyślij fiszkę
          </button>
          {activeCall && (
            <button className="btn btn-secondary" type="submit" name="prepareApplication" value="1">
              Przygotuj wniosek do naboru
            </button>
          )}
        </div>
      </form>

      <section className="panel" style={{ marginTop: "1.25rem" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>Podobne rozwiązania już istnieją?</h2>
        <form>
          <div className="field">
            <label htmlFor="similar">Wpisz istotę, by sprawdzić podobne karty</label>
            <input id="similar" name="similar" defaultValue={similar || ""} aria-describedby="similar-hint" />
            <PrivacyNote id="similar-hint" />
          </div>
          <button className="btn btn-secondary" formAction="/pomysl" formMethod="get">
            Sprawdź
          </button>
        </form>
        {similarCards.length > 0 && (
          <ul>
            {similarCards.map((r) => (
              <li key={r.innovation.id}>
                <Link href={`/karta/${r.innovation.slug}`}>{r.innovation.title}</Link> — {r.innovation.summary}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

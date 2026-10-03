import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Honeypot } from "@/components/Honeypot";
import { prisma } from "@/lib/db";
import { publicSubmissionId } from "@/lib/ids";
import { maskPii } from "@/lib/match/pii";
import { checkSubmissionLimit, isHoneypotFilled } from "@/lib/limits";
import { Steps } from "@/components/Steps";
import { PrivacyNote } from "@/components/PrivacyNote";

async function partnershipAction(formData: FormData) {
  "use server";
  if (isHoneypotFilled(formData)) redirect("/");
  const h = await headers();
  const lim = checkSubmissionLimit(`partner:${h.get("x-forwarded-for") || "local"}`);
  if (!lim.ok) redirect("/partnerstwa?err=limit");
  const kind = String(formData.get("kind") || "szukam");
  const area = String(formData.get("area") || "");
  const body = maskPii(String(formData.get("body") || "")).masked;
  const contactEmail = maskPii(String(formData.get("contactEmail") || "")).masked;

  const sub = await prisma.submission.create({
    data: {
      type: "PARTNERSHIP",
      status: "ACCEPTED",
      publicId: publicSubmissionId(),
      title: kind === "oferuje" ? "Oferuję wsparcie" : "Szukam partnera",
      body,
      area,
      contactEmail,
      partnershipKind: kind,
      statusEvents: {
        create: { status: "ACCEPTED", note: "Wpis partnerstwa — oczekuje moderacji kontaktu", actorRole: "system" },
      },
      thread: { create: {} },
    },
  });
  await prisma.notification.create({
    data: {
      role: "ADMIN",
      title: "Nowe partnerstwo",
      body: body.slice(0, 140),
      href: `/admin/zgloszenie/${sub.id}`,
    },
  });
  redirect(`/zgloszenie/${sub.publicId}`);
}

export default async function PartnershipsPage() {
  const items = await prisma.submission.findMany({
    where: { type: "PARTNERSHIP", status: { not: "CLOSED" } },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <div className="rise">
      <Steps />
      <h1>Tablica partnerstw</h1>
      <p className="lead">
        Szukam partnera / oferuję wsparcie. Kontakt przez platformę — bez publikowania prywatnych danych.
      </p>

      <form action={partnershipAction} className="panel" style={{ position: "relative" }}>
        <Honeypot />
        <div className="field">
          <label htmlFor="kind">Typ wpisu</label>
          <select id="kind" name="kind" defaultValue="szukam">
            <option value="szukam">Szukam partnera</option>
            <option value="oferuje">Oferuję wsparcie</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="area">Temat / obszar</label>
          <input id="area" name="area" required placeholder="np. seniorzy, piecza, cudzoziemcy" aria-describedby="area-hint" />
          <PrivacyNote id="area-hint" />
        </div>
        <div className="field">
          <label htmlFor="body">Opis</label>
          <textarea id="body" name="body" required aria-describedby="body-hint" />
          <PrivacyNote id="body-hint" />
        </div>
        <div className="field">
          <label htmlFor="contactEmail">E-mail do kontaktu przez admina (niepublikowany)</label>
          <input id="contactEmail" name="contactEmail" type="email" />
        </div>
        <button className="btn" type="submit">
          Opublikuj wpis
        </button>
      </form>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Aktualne wpisy</h2>
        <div className="stack">
          {items.map((i) => (
            <article key={i.id} className="panel">
              <p className="hint" style={{ marginTop: 0 }}>
                {i.partnershipKind === "oferuje" ? "Oferuję" : "Szukam"} · {i.area}
              </p>
              <p style={{ marginBottom: 0 }}>{i.body}</p>
              <p className="hint">
                Kontakt: przez zgłoszenie <Link href={`/zgloszenie/${i.publicId}`}>{i.publicId}</Link> (e-mail nie jest
                publiczny)
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

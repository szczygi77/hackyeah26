import Link from "next/link";
import { redirect } from "next/navigation";
import { Honeypot } from "@/components/Honeypot";
import { prisma } from "@/lib/db";
import { isHoneypotFilled, checkSubmissionLimit } from "@/lib/limits";
import { headers } from "next/headers";
import { emailHash } from "@/lib/notify";

async function subscribeAction(formData: FormData) {
  "use server";
  if (isHoneypotFilled(formData)) redirect("/");
  const h = await headers();
  if (!checkSubmissionLimit(`sub:${h.get("x-forwarded-for") || "local"}`).ok) {
    redirect("/nabor/subskrypcja?err=limit");
  }
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const topic = String(formData.get("topic") || "").trim();
  if (!email || !topic) redirect("/nabor/subskrypcja?err=limit");
  await prisma.subscription.create({
    data: { emailHash: emailHash(email), topic },
  });
  await prisma.notification.create({
    data: {
      role: "ADMIN",
      title: "Nowa subskrypcja alertu naboru",
      body: `Temat: ${topic}. Adres nie jest pokazywany w panelu.`,
      href: "/admin/nabory",
    },
  });
  redirect("/nabor/subskrypcja?ok=1");
}

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; err?: string }>;
}) {
  const { ok, err } = await searchParams;
  const [call, alerts] = await Promise.all([
    prisma.call.findFirst({ where: { active: true } }),
    prisma.notification.findMany({
      where: { role: "SUBSCRIBER" },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return (
    <div className="rise">
      <h1>Powiadomienie o naborze</h1>
      <p className="lead">
        Zapisujemy skrót adresu i temat. Zmiana naboru oraz nowy pomysł w tym temacie pojawiają się na liście alertów poniżej. Adres nie trafia do treści alertu.
        {call ? (
          <>
            {" "}
            Aktywny nabór: <strong>{call.name}</strong>.
          </>
        ) : (
          " Brak aktywnego naboru — możesz zapisać zainteresowanie tematem."
        )}
      </p>
      {ok && <p role="status">Zapisano alert. Lista poniżej odświeża się po zmianie naboru i po nowym pomyśle.</p>}
      {err && (
        <p role="alert" style={{ color: "var(--low)" }}>
          Limit zgłoszeń — spróbuj później.
        </p>
      )}
      <form action={subscribeAction} className="panel" style={{ position: "relative", maxWidth: "28rem" }}>
        <Honeypot />
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field">
          <label htmlFor="topic">Temat / obszar</label>
          <input id="topic" name="topic" required placeholder="np. seniorzy" />
        </div>
        <button className="btn" type="submit">
          Zapisz zainteresowanie
        </button>
      </form>
      <section style={{ marginTop: "1.5rem" }} aria-labelledby="alerty-naboru">
        <h2 id="alerty-naboru">Alerty naborów i pomysłów</h2>
        {alerts.length === 0 ? (
          <p className="hint">Brak alertów. Pojawią się po zapisie i po zmianie naboru albo nowej fiszce.</p>
        ) : (
          <ul>
            {alerts.map((a) => (
              <li key={a.id}>
                <Link href={a.href || "/pomysl"}>{a.title}</Link>
                <span className="hint">
                  {" "}
                  · {a.body} · {a.createdAt.toLocaleString("pl-PL")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <p>
        <Link href="/pomysl">Kreator pomysłów</Link>
      </p>
    </div>
  );
}

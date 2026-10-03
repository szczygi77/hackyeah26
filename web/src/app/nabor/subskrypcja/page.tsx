import Link from "next/link";
import { redirect } from "next/navigation";
import { Honeypot } from "@/components/Honeypot";
import { prisma } from "@/lib/db";
import { isHoneypotFilled, checkSubmissionLimit } from "@/lib/limits";
import { headers } from "next/headers";
import { maskPii } from "@/lib/match/pii";

async function subscribeAction(formData: FormData) {
  "use server";
  if (isHoneypotFilled(formData)) redirect("/");
  const h = await headers();
  if (!checkSubmissionLimit(`sub:${h.get("x-forwarded-for") || "local"}`).ok) {
    redirect("/nabor/subskrypcja?err=limit");
  }
  const email = maskPii(String(formData.get("email") || "")).masked;
  const topic = String(formData.get("topic") || "");
  await prisma.notification.create({
    data: {
      role: "ADMIN",
      title: "Subskrypcja naboru (symulacja e-mail)",
      body: `${email} · temat: ${topic}`,
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
  const call = await prisma.call.findFirst({ where: { active: true } });

  return (
    <div className="rise">
      <h1>Powiadomienie o naborze</h1>
      <p className="lead">
        Zostaw kontakt — w MVP zapisujemy zgłoszenie w panelu admina (e-mail nie jest wysyłany; symulacja).
        {call ? (
          <>
            {" "}
            Aktywny nabór: <strong>{call.name}</strong>.
          </>
        ) : (
          " Brak aktywnego naboru — możesz zapisać zainteresowanie tematem."
        )}
      </p>
      {ok && <p role="status">Zapisano zainteresowanie (symulacja).</p>}
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
      <p>
        <Link href="/pomysl">Kreator pomysłów</Link>
      </p>
    </div>
  );
}

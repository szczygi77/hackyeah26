import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth-guard";
import { notifySubscribers } from "@/lib/notify";

async function createCallAction(formData: FormData) {
  "use server";
  await requireRole("ADMIN");
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "");
  const active = formData.get("active") === "on";
  await prisma.call.create({
    data: {
      name,
      description,
      active,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
      fieldsJson: JSON.stringify([
        { key: "title", label: "Tytuł", from: "title" },
        { key: "essence", label: "Istota", from: "body" },
        { key: "audience", label: "Dla kogo", from: "roleLabel" },
        { key: "stage", label: "Etap", from: "area" },
      ]),
    },
  });
  await notifySubscribers(
    active ? `Nowy nabór: ${name}` : `Nabór zapisany jako nieaktywny: ${name}`,
    name,
    "/pomysl"
  );
  redirect("/admin/nabory");
}

async function toggleCallAction(formData: FormData) {
  "use server";
  await requireRole("ADMIN");
  const id = String(formData.get("id"));
  const call = await prisma.call.findUnique({ where: { id } });
  if (!call) return;
  const next = !call.active;
  await prisma.call.update({ where: { id }, data: { active: next } });
  await notifySubscribers(
    next ? `Nabór aktywny: ${call.name}` : `Nabór zamknięty: ${call.name}`,
    call.name,
    "/pomysl"
  );
  redirect("/admin/nabory");
}

const APP_STATUS: Record<string, string> = {
  SUBMITTED: "Złożony",
  IN_REVIEW: "W ocenie finansowania",
  RECOMMENDED: "Rekomendowany do finansowania",
  REJECTED: "Bez rekomendacji finansowania",
};

async function decideApplicationAction(formData: FormData) {
  "use server";
  await requireRole("ADMIN");
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const decisionNote = String(formData.get("decisionNote") || "").trim();
  if (status !== "RECOMMENDED" && status !== "REJECTED") return;
  const app = await prisma.application.update({
    where: { id },
    data: { status, decisionNote },
    include: { submission: true, call: true },
  });
  await prisma.submission.update({
    where: { id: app.submissionId },
    data: { status: "ANSWERED" },
  });
  await prisma.statusEvent.create({
    data: {
      submissionId: app.submissionId,
      status: "ANSWERED",
      note:
        status === "RECOMMENDED"
          ? `Rekomendacja finansowania w naborze „${app.call.name}”. ${decisionNote}`.trim()
          : `Brak rekomendacji finansowania w naborze „${app.call.name}”. ${decisionNote}`.trim(),
      actorRole: "ADMIN",
    },
  });
  await prisma.notification.create({
    data: {
      role: "SUBSCRIBER",
      title:
        status === "RECOMMENDED"
          ? `Decyzja naboru: rekomendacja (${app.submission.publicId})`
          : `Decyzja naboru: bez finansowania (${app.submission.publicId})`,
      body: app.call.name,
      href: `/zgloszenie/${app.submission.publicId}`,
    },
  });
  redirect("/admin/nabory");
}

export default async function CallsAdminPage() {
  await requireRole("ADMIN");
  const [calls, applications] = await Promise.all([
    prisma.call.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      include: { call: true, submission: true },
    }),
  ]);

  return (
    <div className="rise">
      <p>
        <Link href="/admin">← Panel</Link>
      </p>
      <h1>Nabory</h1>
      <p className="lead">Aktywny nabór odblokowuje generator wniosku w kreatorze pomysłów.</p>

      <div className="stack">
        {calls.map((c) => (
          <article key={c.id} className="panel">
            <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>{c.name}</h2>
            <p>{c.description}</p>
            <p className="hint">{c.active ? "Aktywny" : "Nieaktywny"}</p>
            <form action={toggleCallAction}>
              <input type="hidden" name="id" value={c.id} />
              <button className="btn btn-secondary" type="submit">
                {c.active ? "Dezaktywuj" : "Aktywuj"}
              </button>
            </form>
          </article>
        ))}
      </div>

      <section style={{ marginTop: "2rem" }}>
        <h2>Wnioski w naborach</h2>
        <p className="hint">
          Rekomendacja jest decyzją w prototypie Hubu. Nie uruchamia przelewu.
        </p>
        {applications.length === 0 ? (
          <p className="hint">Brak złożonych wniosków.</p>
        ) : (
          <ul className="stack" style={{ listStyle: "none", padding: 0 }}>
            {applications.map((app) => (
              <li key={app.id} className="panel">
                <p style={{ marginTop: 0 }}>
                  <Link href={`/zgloszenie/${app.submission.publicId}`}>{app.submission.publicId}</Link>
                  {" · "}
                  {app.call.name}
                  {" · "}
                  <strong>{APP_STATUS[app.status] || app.status}</strong>
                </p>
                <p>{app.submission.title}</p>
                {app.decisionNote ? <p className="hint">{app.decisionNote}</p> : null}
                {app.status === "SUBMITTED" || app.status === "IN_REVIEW" ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    <form action={decideApplicationAction}>
                      <input type="hidden" name="id" value={app.id} />
                      <input type="hidden" name="status" value="RECOMMENDED" />
                      <div className="field">
                        <label htmlFor={`note-yes-${app.id}`}>Uzasadnienie rekomendacji</label>
                        <textarea id={`note-yes-${app.id}`} name="decisionNote" />
                      </div>
                      <button className="btn" type="submit">
                        Rekomenduj finansowanie
                      </button>
                    </form>
                    <form action={decideApplicationAction}>
                      <input type="hidden" name="id" value={app.id} />
                      <input type="hidden" name="status" value="REJECTED" />
                      <div className="field">
                        <label htmlFor={`note-no-${app.id}`}>Uzasadnienie odmowy</label>
                        <textarea id={`note-no-${app.id}`} name="decisionNote" />
                      </div>
                      <button className="btn btn-secondary" type="submit">
                        Odmów rekomendacji
                      </button>
                    </form>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <form action={createCallAction} className="panel" style={{ marginTop: "1.5rem" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>Nowy nabór</h2>
        <div className="field">
          <label htmlFor="name">Nazwa</label>
          <input id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="description">Opis</label>
          <textarea id="description" name="description" />
        </div>
        <label>
          <input type="checkbox" name="active" defaultChecked /> Aktywny od razu
        </label>
        <div style={{ marginTop: "1rem" }}>
          <button className="btn" type="submit">
            Utwórz
          </button>
        </div>
      </form>
    </div>
  );
}

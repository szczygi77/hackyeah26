import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth-guard";

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
  redirect("/admin/nabory");
}

async function toggleCallAction(formData: FormData) {
  "use server";
  await requireRole("ADMIN");
  const id = String(formData.get("id"));
  const call = await prisma.call.findUnique({ where: { id } });
  if (!call) return;
  await prisma.call.update({ where: { id }, data: { active: !call.active } });
  redirect("/admin/nabory");
}

export default async function CallsAdminPage() {
  await requireRole("ADMIN");
  const calls = await prisma.call.findMany({ orderBy: { createdAt: "desc" } });

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

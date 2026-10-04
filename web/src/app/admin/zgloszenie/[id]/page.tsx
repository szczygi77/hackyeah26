import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth-guard";

async function updateStatusAction(formData: FormData) {
  "use server";
  await requireRole("ADMIN");
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const note = String(formData.get("note") || "");
  const reply = String(formData.get("reply") || "");

  const sub = await prisma.submission.update({
    where: { id },
    data: { status },
    include: { thread: true },
  });
  await prisma.statusEvent.create({
    data: { submissionId: id, status, note, actorRole: "ADMIN" },
  });
  if (reply && sub.thread) {
    await prisma.message.create({
      data: { threadId: sub.thread.id, body: reply, authorRole: "ADMIN" },
    });
  }
  await prisma.notification.updateMany({
    where: { href: `/admin/zgloszenie/${id}`, read: false },
    data: { read: true },
  });
  redirect(`/admin/zgloszenie/${id}`);
}

const STATUS_LABEL: Record<string, string> = {
  NEW: "Nowe",
  ACCEPTED: "Przyjęte",
  IN_REVIEW: "W ocenie",
  ANSWERED: "Odpowiedziano",
  CLOSED: "Zamknięte",
  ASSIGNED_EXPERT: "U eksperta",
};

export default async function AdminSubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole("ADMIN");
  const { id } = await params;
  const sub = await prisma.submission.findUnique({
    where: { id },
    include: {
      statusEvents: { orderBy: { createdAt: "asc" } },
      thread: { include: { messages: { orderBy: { createdAt: "asc" } } } },
      innovation: true,
    },
  });
  if (!sub) notFound();

  return (
    <div className="rise">
      <p>
        <Link href="/admin">← Panel</Link>
      </p>
      <h1>{sub.publicId}</h1>
      <p className="lead">
        {sub.type} · status {STATUS_LABEL[sub.status] || sub.status}
        {sub.possibleGap ? " · możliwy brak w Bibliotece" : ""}
        {sub.area === "warunki" ? " · lista braków" : ""}
      </p>
      <div className="panel">
        <p>{sub.body}</p>
        {sub.contactEmail && <p className="hint">Kontakt: {sub.contactEmail}</p>}
        <p>
          Widok autora: <Link href={`/zgloszenie/${sub.publicId}`}>{sub.publicId}</Link>
        </p>
      </div>

      <form action={updateStatusAction} className="panel" style={{ marginTop: "1rem" }}>
        <input type="hidden" name="id" value={sub.id} />
        <div className="field">
          <label htmlFor="status">Zmień status</label>
          <select id="status" name="status" defaultValue={sub.status}>
            <option value="ACCEPTED">Przyjęte</option>
            <option value="IN_REVIEW">W ocenie</option>
            <option value="ASSIGNED_EXPERT">Przekazane do eksperta</option>
            <option value="ANSWERED">Odpowiedziano</option>
            <option value="CLOSED">Zamknięte</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="note">Notatka do osi statusów</label>
          <input id="note" name="note" />
        </div>
        <div className="field">
          <label htmlFor="reply">Szablon / odpowiedź do autora</label>
          <textarea
            id="reply"
            name="reply"
            defaultValue={`Dziękujemy za zgłoszenie ${sub.publicId}. Przeanalizowaliśmy opis i wracamy z rekomendacją.`}
          />
        </div>
        <button className="btn" type="submit">
          Zapisz i wyślij
        </button>
      </form>

      <section style={{ marginTop: "1.25rem" }}>
        <h2>Historia</h2>
        <ul className="timeline">
          {sub.statusEvents.map((e) => (
            <li key={e.id}>
              <strong>{STATUS_LABEL[e.status] || e.status}</strong> · {e.createdAt.toLocaleString("pl-PL")} — {e.note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Steps } from "@/components/Steps";
import { PrivacyNote } from "@/components/PrivacyNote";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

const STATUS_LABEL: Record<string, string> = {
  NEW: "Nowe",
  ACCEPTED: "Przyjęte",
  IN_REVIEW: "W ocenie",
  ANSWERED: "Odpowiedziano",
  CLOSED: "Zamknięte",
  ASSIGNED_EXPERT: "Przekazane do eksperta",
};

async function replyAction(formData: FormData) {
  "use server";
  const publicId = String(formData.get("publicId"));
  const body = String(formData.get("body") || "").trim();
  if (!body) return;
  const session = await getSession();
  const sub = await prisma.submission.findUnique({
    where: { publicId },
    include: { thread: true },
  });
  if (!sub?.thread) return;

  const isStaff = session.isLoggedIn && (session.role === "ADMIN" || session.role === "EXPERT");
  await prisma.message.create({
    data: {
      threadId: sub.thread.id,
      body,
      authorId: session.userId || null,
      authorRole: isStaff ? session.role || "staff" : "author",
    },
  });

  if (isStaff) {
    await prisma.submission.update({
      where: { id: sub.id },
      data: { status: "ANSWERED" },
    });
    await prisma.statusEvent.create({
      data: {
        submissionId: sub.id,
        status: "ANSWERED",
        note: "Odpowiedź wysłana",
        actorRole: session.role || "staff",
      },
    });
  }

  redirect(`/zgloszenie/${publicId}`);
}

export default async function SubmissionPage({ params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
  const sub = await prisma.submission.findUnique({
    where: { publicId },
    include: {
      statusEvents: { orderBy: { createdAt: "asc" } },
      thread: { include: { messages: { orderBy: { createdAt: "asc" } } } },
      innovation: true,
    },
  });
  if (!sub) notFound();
  const session = await getSession();

  return (
    <div className="rise">
      <Steps active={3} />
      <h1>Zgłoszenie {sub.publicId}</h1>
      <p className="lead">
        Status: <strong>{STATUS_LABEL[sub.status] || sub.status}</strong>
        {sub.possibleGap ? " · oznaczone jako możliwa luka" : ""}
      </p>
      {sub.type === "GAP" || sub.possibleGap ? (
        <p>
          To trafia do kolejki ROPS. Gdy kilka osób opisze to samo, Hub widzi lukę.
        </p>
      ) : null}

      <section className="panel">
        <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>{sub.title || sub.type}</h2>
        <p>{sub.body}</p>
        {sub.innovation && (
          <p>
            Powiązana karta: <Link href={`/karta/${sub.innovation.slug}`}>{sub.innovation.title}</Link>
          </p>
        )}
      </section>

      <section style={{ marginTop: "1.25rem" }}>
        <h2>Oś statusów</h2>
        <ol className="timeline">
          {sub.statusEvents.map((e) => (
            <li key={e.id}>
              <strong>{STATUS_LABEL[e.status] || e.status}</strong>
              <span className="hint">
                {" "}
                · {e.createdAt.toLocaleString("pl-PL")} · {e.actorRole}
              </span>
              {e.note && <div>{e.note}</div>}
            </li>
          ))}
        </ol>
      </section>

      <section style={{ marginTop: "1.25rem" }}>
        <h2>Wątek</h2>
        <div className="stack">
          {sub.thread?.messages.length ? (
            sub.thread.messages.map((m) => (
              <div key={m.id} className="panel">
                <p className="hint" style={{ marginTop: 0 }}>
                  {m.authorRole} · {m.createdAt.toLocaleString("pl-PL")}
                </p>
                <p style={{ marginBottom: 0 }}>{m.body}</p>
              </div>
            ))
          ) : (
            <p className="hint">Brak wiadomości.</p>
          )}
        </div>

        <form action={replyAction} className="panel" style={{ marginTop: "1rem" }}>
          <input type="hidden" name="publicId" value={publicId} />
          <div className="field">
            <label htmlFor="body">
              {session.isLoggedIn ? "Odpowiedź (admin/ekspert)" : "Dodaj wiadomość"}
            </label>
            <textarea id="body" name="body" required aria-describedby="reply-hint" />
            <PrivacyNote id="reply-hint" />
          </div>
          <button className="btn" type="submit">
            Wyślij
          </button>
        </form>
      </section>
    </div>
  );
}

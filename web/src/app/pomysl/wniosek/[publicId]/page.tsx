import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseCallFields, prefillFromSubmission } from "@/lib/call-fields";
import { notifyAdmins } from "@/lib/notify";

const APP_STATUS: Record<string, string> = {
  SUBMITTED: "Złożony w naborze",
  IN_REVIEW: "W ocenie finansowania",
  RECOMMENDED: "Rekomendowany do finansowania",
  REJECTED: "Bez rekomendacji finansowania",
};

async function submitApplicationAction(formData: FormData) {
  "use server";
  const publicId = String(formData.get("publicId") || "");
  const sub = await prisma.submission.findUnique({
    where: { publicId },
    include: { application: true },
  });
  if (!sub || sub.type !== "IDEA" || sub.application) return;
  const call = await prisma.call.findFirst({ where: { active: true } });
  if (!call) redirect(`/pomysl/wniosek/${publicId}?err=brak`);

  const fields = parseCallFields(call.fieldsJson);
  const payload = fields.map((field) => ({
    key: field.key,
    label: field.label,
    value: String(formData.get(field.key) || "").trim(),
  }));
  if (payload.some((row) => !row.value)) redirect(`/pomysl/wniosek/${publicId}?err=pola`);

  const app = await prisma.application.create({
    data: {
      submissionId: sub.id,
      callId: call.id,
      payloadJson: JSON.stringify(payload),
      status: "SUBMITTED",
    },
  });
  await prisma.submission.update({
    where: { id: sub.id },
    data: { status: "IN_REVIEW" },
  });
  await prisma.statusEvent.create({
    data: {
      submissionId: sub.id,
      status: "IN_REVIEW",
      note: `Wniosek złożony w naborze „${call.name}”.`,
      actorRole: "author",
    },
  });
  await notifyAdmins(
    "Nowy wniosek w naborze",
    `${sub.publicId} · ${call.name}`,
    "/admin/nabory",
    "application.submitted"
  );
  void app;
  redirect(`/zgloszenie/${publicId}`);
}

export default async function ApplicationDraftPage({
  params,
  searchParams,
}: {
  params: Promise<{ publicId: string }>;
  searchParams: Promise<{ err?: string }>;
}) {
  const { publicId } = await params;
  const { err } = await searchParams;
  const sub = await prisma.submission.findUnique({
    where: { publicId },
    include: { application: { include: { call: true } } },
  });
  if (!sub || sub.type !== "IDEA") notFound();
  const call = sub.application?.call || (await prisma.call.findFirst({ where: { active: true } }));
  const fields = call ? parseCallFields(call.fieldsJson) : [];
  let saved: { key: string; label: string; value: string }[] = [];
  if (sub.application) {
    try {
      saved = JSON.parse(sub.application.payloadJson);
    } catch {
      saved = [];
    }
  }

  return (
    <div className="rise">
      <h1>Wniosek w naborze</h1>
      <p className="lead">
        Fiszka {sub.publicId}. Pola biorą się z definicji aktywnego naboru, więc inny nabór ma inny formularz.
      </p>
      {!call ? (
        <p role="alert">Brak aktywnego naboru. Wniosek można złożyć tylko w otwartym naborze.</p>
      ) : (
        <p>
          Nabór: <strong>{call.name}</strong>. {call.description}
        </p>
      )}
      {err === "pola" ? <p role="alert">Uzupełnij wszystkie pola wniosku.</p> : null}
      {err === "brak" ? <p role="alert">Nabór został zamknięty przed złożeniem.</p> : null}

      {sub.application ? (
        <section className="panel">
          <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>
            {APP_STATUS[sub.application.status] || sub.application.status}
          </h2>
          <p>
            Decyzja dotyczy naboru „{sub.application.call.name}”. Rekomendacja w prototypie jest rozstrzygnięciem
            Hubu, nie przelewem środków.
          </p>
          {sub.application.decisionNote ? <p>{sub.application.decisionNote}</p> : null}
          <dl>
            {saved.map((row) => (
              <div key={row.key}>
                <dt>{row.label}</dt>
                <dd style={{ marginLeft: 0, whiteSpace: "pre-wrap" }}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : call ? (
        <form action={submitApplicationAction} className="panel">
          <input type="hidden" name="publicId" value={publicId} />
          {fields.map((field) => (
            <div className="field" key={field.key}>
              <label htmlFor={field.key}>{field.label}</label>
              <textarea
                id={field.key}
                name={field.key}
                required
                defaultValue={prefillFromSubmission(field, sub)}
              />
            </div>
          ))}
          <button className="btn" type="submit">
            Złóż wniosek w tym naborze
          </button>
        </form>
      ) : null}

      <p>
        <Link className="btn btn-secondary" href={`/zgloszenie/${publicId}`}>
          Status zgłoszenia
        </Link>
      </p>
    </div>
  );
}

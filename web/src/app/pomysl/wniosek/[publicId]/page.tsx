import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { buildPayload, missingRequired, parseCallFields } from "@/lib/call-fields";
import { notifyAdmins } from "@/lib/notify";
import { WniosekForm } from "@/components/WniosekForm";
import { WniosekAnswers, type SavedAnswer } from "@/components/WniosekAnswers";

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
  if (missingRequired(fields, formData)) redirect(`/pomysl/wniosek/${publicId}?err=pola`);
  const payload = buildPayload(fields, formData);

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
  let saved: SavedAnswer[] = [];
  if (sub.application) {
    try {
      saved = JSON.parse(sub.application.payloadJson);
    } catch {
      saved = [];
    }
  }
  const draftFields = call ? parseCallFields(call.fieldsJson) : [];

  return (
    <div className="rise">
      <h1>Wniosek w naborze</h1>
      <p className="lead">
        Fiszka {sub.publicId}. Pola biorą się z definicji aktywnego naboru, więc inny nabór ma inny formularz.
      </p>
      {!call ? (
        <p role="alert">Brak aktywnego naboru. Wniosek można złożyć tylko w otwartym naborze.</p>
      ) : (
        <>
          <p>
            Nabór: <strong>{call.name}</strong>. {call.description}
          </p>
          <p className="hint">Prototyp nie wysyła wniosku do systemów ROPS.</p>
        </>
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
          <WniosekAnswers answers={saved} />
        </section>
      ) : call ? (
        <WniosekForm
          action={submitApplicationAction}
          publicId={publicId}
          fields={draftFields}
          source={sub}
          showRodo={draftFields.some((field) => field.section === "12")}
        />
      ) : null}

      <p>
        <Link className="btn btn-secondary" href={`/zgloszenie/${publicId}`}>
          Status zgłoszenia
        </Link>
      </p>
    </div>
  );
}

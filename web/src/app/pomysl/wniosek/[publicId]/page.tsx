import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function ApplicationDraftPage({ params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
  const sub = await prisma.submission.findUnique({ where: { publicId } });
  if (!sub || sub.type !== "IDEA") notFound();
  const call = await prisma.call.findFirst({ where: { active: true } });

  const draft = {
    nabór: call?.name || "brak aktywnego naboru",
    tytuł: sub.title,
    istota: sub.body,
    dlaKogo: sub.roleLabel,
    etap: sub.area,
    kanwa: sub.canvasJson ? JSON.parse(sub.canvasJson) : null,
    uwagi:
      "Wersja robocza do pobrania — nie jest jeszcze wysyłana do systemów ROPS.",
  };

  const json = JSON.stringify(draft, null, 2);

  return (
    <div className="rise">
      <h1>Wniosek — wersja robocza</h1>
      <p className="lead">
        Dane przeniesione z fiszki {sub.publicId}. Możesz skopiować lub pobrać JSON.
      </p>
      <pre
        className="panel"
        style={{ whiteSpace: "pre-wrap", overflow: "auto", fontSize: "0.9rem" }}
      >
        {json}
      </pre>
      <p>
        <a
          className="btn"
          href={`data:application/json;charset=utf-8,${encodeURIComponent(json)}`}
          download={`wniosek-${publicId}.json`}
        >
          Pobierz JSON
        </a>{" "}
        <Link className="btn btn-secondary" href={`/zgloszenie/${publicId}`}>
          Status fiszki
        </Link>
      </p>
    </div>
  );
}

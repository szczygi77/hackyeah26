import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Steps } from "@/components/Steps";
import { prisma } from "@/lib/db";
async function fitAction(formData: FormData) {
  "use server";
  const matchId = String(formData.get("matchId"));
  const municipality = String(formData.get("municipality") || "");
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: { innovation: { include: { prerequisites: true } } },
  });
  if (!match) return;

  const answers: Record<string, string> = {};
  for (const p of match.innovation.prerequisites) {
    answers[p.id] = String(formData.get(`p_${p.id}`) || "UNKNOWN");
  }

  await prisma.localProfile.upsert({
    where: { matchId },
    create: {
      matchId,
      answersJson: JSON.stringify(answers),
      municipality: municipality || null,
    },
    update: {
      answersJson: JSON.stringify(answers),
      municipality: municipality || null,
    },
  });

  redirect(`/sprawdz/${matchId}/wynik`);
}

export default async function CheckPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params;
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: { innovation: { include: { prerequisites: true } } },
  });
  if (!match) notFound();

  const municipalities = await prisma.municipalitySnapshot.findMany();
  const prereqs = match.innovation.prerequisites.slice(0, 3);

  return (
    <div className="rise">
      <Steps active={2} />
      <h1>Czy to zadziała u Was?</h1>
      <p className="lead">
        Kontrola warunków dla <strong>{match.innovation.title}</strong>. To lista zgodności, nie prognoza sukcesu.
      </p>

      <form action={fitAction} className="panel" style={{ marginTop: "1.25rem" }}>
        <input type="hidden" name="matchId" value={matchId} />
        <div className="field">
          <label htmlFor="municipality">Gmina (opcjonalnie — snapshot IOSS)</label>
          <select id="municipality" name="municipality" defaultValue="">
            <option value="">— pomiń —</option>
            {municipalities.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {prereqs.map((p) => (
          <fieldset key={p.id} className="field" style={{ border: "none", padding: 0 }}>
            <legend style={{ fontWeight: 700, marginBottom: "0.35rem" }}>
              {p.description}{" "}
              <span className="hint">({p.weight === "REQUIRED" ? "konieczny" : "pomocny"})</span>
            </legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <label>
                <input type="radio" name={`p_${p.id}`} value="YES" /> Tak
              </label>
              <label>
                <input type="radio" name={`p_${p.id}`} value="NO" /> Nie
              </label>
              <label>
                <input type="radio" name={`p_${p.id}`} value="UNKNOWN" defaultChecked /> Nie wiem
              </label>
            </div>
          </fieldset>
        ))}

        <button className="btn" type="submit">
          Pokaż listę zgodności
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        <Link href={`/karta/${match.innovation.slug}`}>← Wróć do karty</Link>
      </p>
    </div>
  );
}

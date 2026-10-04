import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Steps } from "@/components/Steps";
import { prisma } from "@/lib/db";
import { originLabel } from "@/lib/fit";
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
  const prereqs = [...match.innovation.prerequisites]
    .sort((a, b) => {
      const rank = (weight: string, origin: string) =>
        (weight === "REQUIRED" ? 0 : 2) + (origin === "FROM_CARD" ? 0 : 1);
      return rank(a.weight, a.origin) - rank(b.weight, b.origin);
    })
    .slice(0, 5);

  return (
    <div className="rise">
      <Steps active={2} />
      <h1>Warunki z tej karty</h1>
      <p className="lead">
        Kontrola warunków dla <strong>{match.innovation.title}</strong>. Odpowiedzi mówią, co deklarujecie. To nie jest
        prognoza, że wdrożenie się przyjmie.
      </p>

      <form action={fitAction} className="panel" style={{ marginTop: "1.25rem" }}>
        <input type="hidden" name="matchId" value={matchId} />
        <div className="field">
          <label htmlFor="municipality">Gmina (opcjonalnie)</label>
          <p className="hint" id="municipality-hint">
            Snapshot IOSS jest kontekstem gminy. Nie odpowiada na warunki tej karty.
          </p>
          <select id="municipality" name="municipality" defaultValue="" aria-describedby="municipality-hint">
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
              <span className="hint">
                ({p.weight === "REQUIRED" ? "konieczny" : "pomocny"} · {originLabel(p.origin)})
              </span>
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

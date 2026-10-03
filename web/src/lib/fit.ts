import type { Prerequisite } from "@prisma/client";

export type FitResult = {
  have: Prerequisite[];
  missing: Prerequisite[];
  toCheck: Prerequisite[];
  summary: string;
};

export function evaluateFit(
  prerequisites: Prerequisite[],
  answers: Record<string, "YES" | "NO" | "UNKNOWN" | string>
): FitResult {
  const have: Prerequisite[] = [];
  const missing: Prerequisite[] = [];
  const toCheck: Prerequisite[] = [];

  for (const p of prerequisites) {
    const a = answers[p.id] || "UNKNOWN";
    if (a === "YES") have.push(p);
    else if (a === "NO") {
      if (p.weight === "REQUIRED") missing.push(p);
      else toCheck.push(p);
    } else toCheck.push(p);
  }

  let summary = "Warunki wstępne zestawione z Waszymi odpowiedziami.";
  if (missing.length) {
    summary = `Brakuje warunków koniecznych (${missing.length}). To ostrzeżenie, nie prognoza niepowodzenia.`;
  } else if (toCheck.length) {
    summary = "Część warunków wymaga doprecyzowania z autorem rozwiązania.";
  } else if (have.length) {
    summary = "Deklarujecie spełnienie kluczowych warunków z karty.";
  }

  return { have, missing, toCheck, summary };
}

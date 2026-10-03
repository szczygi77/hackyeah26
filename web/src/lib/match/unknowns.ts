import type { Innovation, Prerequisite } from "@prisma/client";
import { parseJsonArray } from "@/lib/json";

/** Fields meaningful for transfer that are missing / "nie podano". */
export function unknownFields(
  card: Innovation & { prerequisites?: Prerequisite[] }
): string[] {
  const unknowns: string[] = [];
  const problems = parseJsonArray(card.problemsJson);
  const targets = parseJsonArray(card.targetGroupsJson);
  const elements = parseJsonArray(card.elementsJson);

  if (!problems.length) unknowns.push("jakie problemy rozwiązuje");
  if (!targets.length) unknowns.push("grupa docelowa");
  if (!elements.length) unknowns.push("elementy innowacji");
  if (!card.authorContact || /nie podano/i.test(card.authorContact)) {
    unknowns.push("kontakt do autora");
  }
  if (!card.evidenceNote || card.evidenceLevel === "UNKNOWN") {
    unknowns.push("szczegóły dowodów / ewaluacji");
  }
  if (!card.videoUrl) unknowns.push("film / materiał wideo");
  if (!card.prerequisites?.length) unknowns.push("warunki wstępne wdrożenia");
  if (card.prerequisites?.some((p) => p.origin === "DERIVED")) {
    unknowns.push("część warunków jest wyprowadzona z elementów (do potwierdzenia z autorem)");
  }

  return unknowns;
}

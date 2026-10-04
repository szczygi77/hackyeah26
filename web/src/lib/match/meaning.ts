import { normalizeTokens } from "@/lib/match/embed";

/** Pojęcia z 9 kategorii Biblioteki i 8 obszarów Mapy. Trafienie liczy się tylko, gdy karta ma tę kategorię. */
const CONCEPTS: { stems: string[]; needles: string[] }[] = [
  { stems: ["senior", "starsz", "emeryt", "dziad"], needles: ["senior"] },
  { stems: ["nieslysz", "gluch", "migow", "niewidom", "slabowid", "slaboslysz"], needles: ["sensorycz", "migow", "nieslysz", "gluch"] },
  { stems: ["wozek", "barier"], needles: ["mobiln"] },
  { stems: ["bezdom", "nocleg"], needles: ["bezdom"] },
  { stems: ["uchodz", "migrant", "cudzoziem", "ukrain"], needles: ["cudzoziem"] },
  { stems: ["bezrobot", "zatrudn"], needles: ["pracy", "zatrudn"] },
  { stems: ["piecz", "rodzic", "mlodzie"], needles: ["rodzin", "piecz", "dzieci"] },
  { stems: ["depres", "psychicz"], needles: ["psychicz"] },
  { stems: ["intelekt"], needles: ["intelekt"] },
];

function fold(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

/** Udział pojęć z zapytania, które występują w kategorii lub tytule tej karty. 0, gdy zapytanie nie trafia w taksonomię. */
export function meaningScore(query: string, categoryAndTitle: string): number {
  const tokens = normalizeTokens(query);
  const blob = fold(categoryAndTitle);
  let applicable = 0;
  let hits = 0;
  for (const concept of CONCEPTS) {
    const touched = tokens.some((token) => concept.stems.some((stem) => token.startsWith(stem)));
    if (!touched) continue;
    applicable += 1;
    if (concept.needles.some((needle) => blob.includes(needle))) hits += 1;
  }
  if (!applicable) return 0;
  return hits / applicable;
}

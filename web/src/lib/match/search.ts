import { prisma } from "@/lib/db";
import { parseJsonNumberArray } from "@/lib/json";
import { cosine, tokenEmbedding, tokenOverlap } from "@/lib/match/embed";
import { maskPii } from "@/lib/match/pii";
import { analyzeQueryFlags, type QueryFlags } from "@/lib/match/safety";
import { unknownFields } from "@/lib/match/unknowns";
import type { Innovation, Prerequisite } from "@prisma/client";
import type { ConfidenceLabel } from "@/lib/types";

export type RankedMatch = {
  innovation: Innovation & { prerequisites: Prerequisite[] };
  score: number;
  confidence: ConfidenceLabel;
  justification: string;
  quote: string;
  unknowns: string[];
};

export type SearchResult = {
  query: string;
  masked: boolean;
  results: RankedMatch[];
  possibleGap: boolean;
  flags: QueryFlags;
};

function pickQuote(card: Innovation, query: string): string {
  const chunks = [card.summary, card.searchText]
    .join(" ")
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const qTokens = new Set(query.toLowerCase().split(/\s+/));
  let best = chunks[0] || card.summary;
  let bestScore = -1;
  for (const c of chunks) {
    const words = c.toLowerCase().split(/\s+/);
    const score = words.filter((w) => qTokens.has(w) || [...qTokens].some((t) => w.includes(t))).length;
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best.slice(0, 220);
}

export function buildJustification(
  card: Innovation,
  quote: string,
  confidence: ConfidenceLabel
): string {
  if (confidence === "LOW") {
    return `Słabe dopasowanie. Najbliższy fragment karty: «${quote}». Warto doprecyzować opis albo zgłosić potrzebę do ROPS.`;
  }
  if (confidence === "MEDIUM") {
    return `Możliwe dopasowanie — karta «${card.title}» dotyczy podobnego obszaru. Cytat: «${quote}».`;
  }
  return `Mocne dopasowanie do «${card.title}», bo opis problemu pokrywa się z kartą. Cytat: «${quote}».`;
}

export async function searchInnovations(rawQuery: string): Promise<SearchResult> {
  const { masked, found } = maskPii(rawQuery.trim());
  const query = masked.slice(0, 2000);
  const flags = analyzeQueryFlags(query);

  if (!query) {
    return { query, masked: found, results: [], possibleGap: true, flags };
  }

  // Crisis: still return nearest cards, but caller must show emergency banner first and skip AI
  const cards = await prisma.innovation.findMany({
    where: { status: "PUBLISHED" },
    include: { prerequisites: true },
  });

  const qEmb = tokenEmbedding(query);
  const scored = cards.map((card) => {
    const emb = parseJsonNumberArray(card.embeddingJson);
    const semantic = emb.length ? cosine(qEmb, emb) : 0;
    const lexical = tokenOverlap(query, card.searchText);
    const score = 0.4 * semantic + 0.6 * lexical;
    return { card, score, lexical };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3);

  const results: RankedMatch[] = top.map((t) => {
    let confidence: ConfidenceLabel = "LOW";
    if (t.lexical >= 0.5) confidence = "HIGH";
    else if (t.lexical >= 0.25 || t.score >= 0.22) confidence = "MEDIUM";

    const quote = pickQuote(t.card, query);
    return {
      innovation: t.card,
      score: t.score,
      confidence,
      justification: buildJustification(t.card, quote, confidence),
      quote,
      unknowns: unknownFields(t.card),
    };
  });

  const possibleGap = !results.length || results[0].confidence === "LOW";

  return { query, masked: found, results, possibleGap, flags };
}

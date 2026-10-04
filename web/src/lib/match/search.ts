import { prisma } from "@/lib/db";
import { tokenOverlap } from "@/lib/match/embed";
import { meaningScore } from "@/lib/match/meaning";
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

export type GapKind = "none" | "wording" | "library";

export type SearchResult = {
  query: string;
  masked: boolean;
  results: RankedMatch[];
  possibleGap: boolean;
  gapKind: GapKind;
  flags: QueryFlags;
};

const EVIDENCE_RANK: Record<string, number> = { E3: 4, E2: 3, E1: 2, E0: 1 };

function evidenceRank(level: string): number {
  return EVIDENCE_RANK[level] ?? 0;
}

function explicitConditions(card: Innovation & { prerequisites: Prerequisite[] }): number {
  return card.prerequisites.filter((p) => p.origin === "FROM_CARD").length;
}

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
    return { query, masked: found, results: [], possibleGap: false, gapKind: "none", flags };
  }

  // Crisis: still return nearest cards, but caller must show emergency banner first and skip AI
  const cards = await prisma.innovation.findMany({
    where: { status: "PUBLISHED" },
    include: { prerequisites: true },
  });

  const scored = cards.map((card) => {
    const lexical = tokenOverlap(query, `${card.title} ${card.summary} ${card.searchText}`);
    const meaning = meaningScore(query, `${card.category} ${card.challengeAreasJson} ${card.title}`);
    const score = 0.65 * lexical + 0.35 * meaning;
    return { card, score, lexical, meaning };
  });

  scored.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 0.02) return b.score - a.score;
    const byEvidence = evidenceRank(b.card.evidenceLevel) - evidenceRank(a.card.evidenceLevel);
    if (byEvidence) return byEvidence;
    return explicitConditions(b.card) - explicitConditions(a.card);
  });

  const ranked: RankedMatch[] = scored.map((t) => {
    let confidence: ConfidenceLabel = "LOW";
    if (t.lexical >= 0.5 || (t.lexical >= 0.34 && t.meaning >= 0.99)) confidence = "HIGH";
    else if (t.lexical >= 0.25 || (t.meaning >= 0.99 && t.lexical >= 0.12)) confidence = "MEDIUM";

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

  const passed = ranked.filter((r) => r.confidence !== "LOW");
  const results = (flags.crisis ? ranked : passed).slice(0, 3);
  const contentTokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2);
  const concrete = !flags.shortQuery && contentTokens.length >= 3;
  let gapKind: GapKind = "none";
  if (!flags.crisis && passed.length === 0) {
    gapKind = concrete ? "library" : "wording";
  }

  return { query, masked: found, results, possibleGap: gapKind === "library", gapKind, flags };
}

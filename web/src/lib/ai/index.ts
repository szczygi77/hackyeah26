import type { Innovation, Prerequisite } from "@prisma/client";
import { parseJsonArray } from "@/lib/json";
import { checkAiDailyLimit, consumeAiCall } from "@/lib/limits";

const hasOpenAI = () => Boolean(process.env.OPENAI_API_KEY);
const hasAnthropic = () => Boolean(process.env.ANTHROPIC_API_KEY);

export function aiEnabled() {
  if (!hasOpenAI() && !hasAnthropic()) return false;
  return checkAiDailyLimit().ok;
}

function quoteInCard(quote: string, card: Innovation): boolean {
  const hay = `${card.title} ${card.summary} ${card.searchText}`.toLowerCase();
  return hay.includes(quote.toLowerCase().slice(0, 40));
}

export async function generateJustification(
  card: Innovation,
  query: string,
  fallback: { text: string; quote: string }
): Promise<{ text: string; quote: string; source: "ai" | "template" }> {
  void query;
  if (!aiEnabled()) {
    return { ...fallback, source: "template" };
  }

  try {
    if (!consumeAiCall()) return { ...fallback, source: "template" };
    const prompt = `Na podstawie WYŁĄCZNIE poniższych pól karty napisz 1–2 zdania po polsku, dlaczego karta pasuje do zapytania. Dołącz krótki cytat z karty w cudzysłowie.\nZapytanie: ${query}\nTytuł: ${card.title}\nStreszczenie: ${card.summary}\nProblemy: ${card.problemsJson}`;
    const text = await callLlm(prompt);
    const quoteMatch = text.match(/„([^”]+)"|"([^"]+)"/);
    const quote = quoteMatch?.[1] || quoteMatch?.[2] || fallback.quote;
    if (!quoteInCard(quote, card)) {
      return { ...fallback, source: "template" };
    }
    return { text, quote, source: "ai" };
  } catch {
    return { ...fallback, source: "template" };
  }
}

export async function generateMiddlemanPlan(
  card: Innovation & { prerequisites: Prerequisite[] },
  profileAnswers: Record<string, string>,
  municipality?: string
): Promise<{ sections: { title: string; body: string }[]; source: "ai" | "template" }> {
  const problems = parseJsonArray(card.problemsJson);
  const elements = parseJsonArray(card.elementsJson);
  const targets = parseJsonArray(card.targetGroupsJson);

  const have = card.prerequisites.filter((p) => profileAnswers[p.id] === "YES").map((p) => p.description);
  const missing = card.prerequisites.filter((p) => profileAnswers[p.id] === "NO").map((p) => p.description);
  const unknown = card.prerequisites.filter((p) => profileAnswers[p.id] === "UNKNOWN" || !profileAnswers[p.id]).map((p) => p.description);

  const template = {
    sections: [
      {
        title: "Cel i grupa odbiorców",
        body: `Wdrożenie „${card.title}" dla: ${targets.join(", ") || "nie podano"}. Problemy: ${problems.join(", ")}.${municipality ? ` Kontekst: ${municipality}.` : ""}`,
      },
      {
        title: "Kroki wdrożenia",
        body: elements.length
          ? elements.map((e, i) => `${i + 1}. Zapewnij element: ${e}`).join("\n")
          : "Kroki do ustalenia z autorem rozwiązania — elementy nie podane w karcie.",
      },
      {
        title: "Zasoby potrzebne i dostępne",
        body: `Macie: ${have.join("; ") || "—"}.\nBrakuje: ${missing.join("; ") || "—"}.\nDo sprawdzenia: ${unknown.join("; ") || "—"}.`,
      },
      {
        title: "Partnerzy lokalni",
        body: "Sprawdź tablicę partnerstw w Szczepie oraz kontakt autora karty. (Propozycja asystenta — do weryfikacji.)",
      },
      {
        title: "Ryzyka i pytania otwarte",
        body: missing.length
          ? `Główne ryzyko: brak ${missing[0]}. Potwierdź warunki z autorem przed startem.`
          : "Największe ryzyko: niekompletne dane w karcie — dopytaj autora.",
      },
      {
        title: "Czego nie wiemy",
        body: `Kontakt do autora: ${card.authorContact || "nie podano"}. Poziom dowodów: ${card.evidenceLevel}. ${card.evidenceNote}`,
      },
    ],
    source: "template" as const,
  };

  if (!aiEnabled()) return template;

  try {
    if (!consumeAiCall()) return template;
    const prompt = `Przygotuj szkic planu wdrożenia innowacji społecznej po polsku w 6 sekcjach. Opieraj się TYLKO na danych karty. Oznacz propozycje jako propozycje.\nKarta: ${card.title}\n${card.summary}\nElementy: ${elements.join(", ")}\nWarunki: ${card.prerequisites.map((p) => p.description).join("; ")}\nProfil: ${JSON.stringify(profileAnswers)}`;
    const text = await callLlm(prompt);
    const sections = template.sections.map((s, i) => ({
      title: s.title,
      body: text.split(/\n\n/)[i] || s.body,
    }));
    return { sections, source: "ai" };
  } catch {
    return template;
  }
}

export async function extractCardDraft(rawText: string): Promise<Record<string, string>> {
  const lines = rawText.split(/\n/).map((l) => l.trim()).filter(Boolean);
  const draft = {
    title: lines[0]?.slice(0, 120) || "Bez tytułu",
    summary: lines.slice(1, 3).join(" ").slice(0, 400) || "Brak streszczenia",
    problems: lines.find((l) => /problem/i.test(l)) || "",
    target: lines.find((l) => /dla kogo|grupa/i.test(l)) || "",
    elements: lines.find((l) => /element/i.test(l)) || "",
  };

  if (!aiEnabled()) return draft;

  try {
    const prompt = `Wyodrębnij z tekstu karty innowacji pola JSON: title, summary, problems, target, elements. Tylko fakty z tekstu.\nTekst:\n${rawText.slice(0, 4000)}`;
    const text = await callLlm(prompt);
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    if (json) return { ...draft, ...JSON.parse(json) };
  } catch {
    /* fallback */
  }
  return draft;
}

export function simplifyLanguage(text: string): string {
  return text
    .replace(/deinstytucjonalizacja/gi, "wyjście z dużych placówek do wsparcia w domu i społeczności")
    .replace(/beneficjent/gi, "osoba, której pomagamy")
    .replace(/implementacja/gi, "wdrożenie")
    .replace(/\s+/g, " ")
    .trim();
}

async function callLlm(prompt: string): Promise<string> {
  if (hasOpenAI()) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "Jesteś asystentem Hubu Innowacji Społecznych. Nie wymyślaj faktów spoza podanych danych. Odpowiadaj po polsku." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 800,
      }),
    });
    if (!res.ok) throw new Error("OpenAI error");
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  }

  if (hasAnthropic()) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-latest",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) throw new Error("Anthropic error");
    const data = await res.json();
    return data.content?.[0]?.text || "";
  }

  throw new Error("No LLM");
}

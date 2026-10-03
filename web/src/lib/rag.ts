import { cosine, tokenEmbedding, tokenOverlap } from "@/lib/match/embed";

const EXPLAIN_SYSTEM_PROMPT =
  "Wyjaśnij w jednym, krótkim zdaniu, dlaczego ta innowacja rozwiązuje problem użytkownika";

export type InnovationMatch = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  category: string;
  similarity: number;
  explanation: string;
};

type InnovationMatchRow = Omit<InnovationMatch, "explanation">;

export class RagConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RagConfigError";
  }
}

export class RagUpstreamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RagUpstreamError";
  }
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new RagConfigError(`Brak zmiennej ${name}`);
  return value;
}

export async function semanticSearch(searchQuery: string): Promise<{
  matches: InnovationMatch[];
}> {
  const apiKey = requireEnv("GROQ_API_KEY");
  const supabaseUrl = requireEnv("SUPABASE_URL").replace(/\/$/, "");
  const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const rows = await matchInnovations(supabaseUrl, serviceKey, searchQuery);
  const matches = await Promise.all(
    rows.map(async (row) => ({
      ...row,
      explanation: await explainMatch(row, searchQuery, apiKey),
    }))
  );
  return { matches };
}

async function matchInnovations(
  supabaseUrl: string,
  serviceKey: string,
  searchQuery: string
): Promise<InnovationMatchRow[]> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/innovations?select=id,title,description,requirements,category`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Accept: "application/json",
      },
    }
  );
  if (!res.ok) throw new RagUpstreamError("Supabase niedostępne");
  const rows = (await res.json()) as InnovationMatchRow[];
  if (!Array.isArray(rows)) throw new RagUpstreamError("Supabase zwróciło nieoczekiwany wynik");

  return rows
    .map((row) => ({ ...row, similarity: scoreMatch(searchQuery, row) }))
    .filter((row) => row.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);
}

function scoreMatch(searchQuery: string, row: InnovationMatchRow): number {
  const hay = `${row.title} ${row.description} ${row.requirements} ${row.category}`;
  const overlap = tokenOverlap(searchQuery, hay);
  const similar = cosine(tokenEmbedding(searchQuery), tokenEmbedding(hay));
  return Math.max(overlap, similar);
}

async function explainMatch(
  match: InnovationMatchRow,
  searchQuery: string,
  apiKey: string
): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      temperature: 0.2,
      max_tokens: 800,
      messages: [
        { role: "system", content: EXPLAIN_SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            `Problem użytkownika: ${searchQuery}`,
            "",
            "Innowacja:",
            `Tytuł: ${match.title}`,
            `Opis: ${match.description}`,
            `Wymagania: ${match.requirements}`,
          ].join("\n"),
        },
      ],
    }),
  });
  if (!res.ok) throw new RagUpstreamError("Groq chat niedostępne");
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new RagUpstreamError("Groq nie zwróciło uzasadnienia");
  return text;
}

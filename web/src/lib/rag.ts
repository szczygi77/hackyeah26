const EMBEDDING_MODEL = "text-embedding-3-small";
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
  const apiKey = requireEnv("OPENAI_API_KEY");
  const supabaseUrl = requireEnv("SUPABASE_URL").replace(/\/$/, "");
  const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const embedding = await embedQuery(searchQuery, apiKey);
  const rows = await matchInnovations(supabaseUrl, serviceKey, embedding);
  const matches = await Promise.all(
    rows.map(async (row) => ({
      ...row,
      explanation: await explainMatch(row, searchQuery, apiKey),
    }))
  );
  return { matches };
}

async function embedQuery(searchQuery: string, apiKey: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: searchQuery,
    }),
  });
  if (!res.ok) throw new RagUpstreamError("OpenAI embeddings niedostępne");
  const data = (await res.json()) as {
    data?: { embedding?: number[] }[];
  };
  const embedding = data.data?.[0]?.embedding;
  if (!embedding || embedding.length !== 1536) {
    throw new RagUpstreamError("OpenAI zwróciło embedding o złym wymiarze");
  }
  return embedding;
}

async function matchInnovations(
  supabaseUrl: string,
  serviceKey: string,
  embedding: number[]
): Promise<InnovationMatchRow[]> {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/match_innovations`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query_embedding: `[${embedding.join(",")}]`,
      match_count: 3,
    }),
  });
  if (!res.ok) throw new RagUpstreamError("Supabase niedostępne");
  const rows = (await res.json()) as InnovationMatchRow[];
  if (!Array.isArray(rows)) throw new RagUpstreamError("Supabase zwróciło nieoczekiwany wynik");
  return rows;
}

async function explainMatch(
  match: InnovationMatchRow,
  searchQuery: string,
  apiKey: string
): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 120,
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
  if (!res.ok) throw new RagUpstreamError("OpenAI chat niedostępne");
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new RagUpstreamError("OpenAI nie zwróciło uzasadnienia");
  return text;
}

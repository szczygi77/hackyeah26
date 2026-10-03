import { RagConfigError, RagUpstreamError } from "@/lib/rag";

/** System prompt adaptacji. Miejsca {innovation_description} i {surveys_text} są uzupełniane danymi z bazy. */
export const ADAPTATION_SYSTEM_PROMPT = `Jesteś ekspertem ds. innowacji społecznych i socjologii. Twoim zadaniem jest analiza ankiet ewaluacyjnych z wdrożeń innowacji i stworzenie rekomendacji adaptacyjnych.
Zwróć szczególną uwagę na udokumentowane różnice behawioralne: na wsiach występuje mniejsza anonimowość (ryzyko stygmatyzacji), wykluczenie transportowe, ale silne więzi lokalne (OSP, KGW, parafie). W miastach jest większa anonimowość, łatwy dostęp do lokali, ale słabsze więzi sąsiedzkie.

BAZOWA INNOWACJA: {innovation_description}
ANKIETY Z WDROŻEŃ: {surveys_text}

Przeanalizuj te dane i wygeneruj JSON z rekomendacjami:

'ruralVariant': Jak zmodyfikować projekt dla wsi i małych miasteczek (uwzględnij obejścia braków z ankiet).

'urbanVariant': Jak zoptymalizować to dla dużego miasta.
Odpowiedź ma być wyłącznie prawidłowym obiektem JSON, gotowym do zapisu w bazie danych.`;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type AdaptationVariants = {
  ruralVariant: string;
  urbanVariant: string;
};

export class AdaptNotFoundError extends Error {
  constructor() {
    super("Nie znaleziono innowacji");
    this.name = "AdaptNotFoundError";
  }
}

type InnovationRow = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  category: string;
};

type SurveyRow = {
  municipality_type: string;
  missing_resources: string;
  implemented_workarounds: string;
  success_rating: number;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new RagConfigError(`Brak zmiennej ${name}`);
  return value;
}

export function isInnovationId(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

export async function generateAdaptationVariants(innovationId: string): Promise<AdaptationVariants> {
  const apiKey = requireEnv("GROQ_API_KEY");
  const supabaseUrl = requireEnv("SUPABASE_URL").replace(/\/$/, "");
  const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const innovation = await fetchInnovation(supabaseUrl, serviceKey, innovationId);
  const surveys = await fetchSurveys(supabaseUrl, serviceKey, innovationId);
  const systemPrompt = ADAPTATION_SYSTEM_PROMPT.replaceAll(
    "{innovation_description}",
    formatInnovation(innovation)
  ).replaceAll("{surveys_text}", formatSurveys(surveys));
  return requestVariants(apiKey, systemPrompt);
}

async function supabaseGet<T>(url: string, serviceKey: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new RagUpstreamError("Supabase niedostępne");
  return (await res.json()) as T;
}

async function fetchInnovation(
  supabaseUrl: string,
  serviceKey: string,
  innovationId: string
): Promise<InnovationRow> {
  const rows = await supabaseGet<InnovationRow[]>(
    `${supabaseUrl}/rest/v1/innovations?id=eq.${innovationId}&select=id,title,description,requirements,category`,
    serviceKey
  );
  const row = rows[0];
  if (!row) throw new AdaptNotFoundError();
  return row;
}

async function fetchSurveys(
  supabaseUrl: string,
  serviceKey: string,
  innovationId: string
): Promise<SurveyRow[]> {
  const rows = await supabaseGet<SurveyRow[]>(
    `${supabaseUrl}/rest/v1/surveys?innovation_id=eq.${innovationId}&select=municipality_type,missing_resources,implemented_workarounds,success_rating`,
    serviceKey
  );
  if (!Array.isArray(rows)) throw new RagUpstreamError("Supabase zwróciło nieoczekiwany wynik");
  return rows;
}

function formatInnovation(innovation: InnovationRow): string {
  return [
    `Tytuł: ${innovation.title}`,
    `Opis: ${innovation.description}`,
    `Wymagania: ${innovation.requirements}`,
    `Kategoria: ${innovation.category}`,
  ].join("\n");
}

function formatSurveys(surveys: SurveyRow[]): string {
  if (!surveys.length) return "Brak ankiet.";
  return surveys
    .map((survey, index) =>
      [
        `Ankieta ${index + 1}:`,
        `Typ gminy: ${survey.municipality_type}`,
        `Braki: ${survey.missing_resources}`,
        `Obejścia: ${survey.implemented_workarounds}`,
        `Ocena: ${survey.success_rating}`,
      ].join("\n")
    )
    .join("\n\n");
}

async function requestVariants(apiKey: string, systemPrompt: string): Promise<AdaptationVariants> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content:
            'Wygeneruj obiekt JSON. Pola "ruralVariant" i "urbanVariant" mają być niepustymi stringami, nie obiektami.',
        },
      ],
    }),
  });
  if (!res.ok) throw new RagUpstreamError("Groq chat niedostępne");

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new RagUpstreamError("OpenAI nie zwróciło wariantów");

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new RagUpstreamError("OpenAI zwróciło niepoprawny JSON");
  }

  if (
    !parsed ||
    typeof parsed !== "object" ||
    !("ruralVariant" in parsed) ||
    !("urbanVariant" in parsed)
  ) {
    throw new RagUpstreamError("OpenAI zwróciło JSON bez wymaganych pól");
  }

  const record = parsed as Record<string, unknown>;
  const ruralVariant = asVariantText(record.ruralVariant);
  const urbanVariant = asVariantText(record.urbanVariant);
  if (!ruralVariant) throw new RagUpstreamError("Groq zwróciło pusty ruralVariant");
  if (!urbanVariant) throw new RagUpstreamError("Groq zwróciło pusty urbanVariant");

  return { ruralVariant, urbanVariant };
}

function asVariantText(value: unknown): string | null {
  if (typeof value === "string") {
    const text = value.trim();
    return text || null;
  }
  if (Array.isArray(value)) {
    const text = value.map(asVariantText).filter((item): item is string => Boolean(item)).join("\n");
    return text || null;
  }
  if (value && typeof value === "object") {
    const text = Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => {
        const part = asVariantText(item);
        return part ? `${key}: ${part}` : null;
      })
      .filter((item): item is string => Boolean(item))
      .join("\n");
    return text || null;
  }
  return null;
}

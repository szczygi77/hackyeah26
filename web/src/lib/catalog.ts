import { AdaptNotFoundError, isInnovationId } from "@/lib/adapt";
import { RagConfigError, RagUpstreamError } from "@/lib/rag";

export type CatalogInnovation = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  category: string;
};

export type PendingDraft = {
  id: string;
  innovationId: string;
  title: string;
  description: string;
  urbanVariant: string;
  ruralVariant: string;
};

type InnovationRow = CatalogInnovation;

type DraftRow = {
  id: string;
  innovation_id: string;
  proposed_variants: unknown;
  innovations: { title: string; description: string } | { title: string; description: string }[] | null;
};

function supabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!supabaseUrl) throw new RagConfigError("Brak zmiennej SUPABASE_URL");
  if (!serviceKey) throw new RagConfigError("Brak zmiennej SUPABASE_SERVICE_ROLE_KEY");
  return { supabaseUrl, serviceKey };
}

async function supabaseFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const { supabaseUrl, serviceKey } = supabaseConfig();
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new RagUpstreamError("Supabase niedostępne");
  return (await res.json()) as T;
}

export async function listCatalogInnovations(): Promise<CatalogInnovation[]> {
  const rows = await supabaseFetch<InnovationRow[]>(
    "innovations?select=id,title,description,requirements,category&order=title.asc"
  );
  if (!Array.isArray(rows)) throw new RagUpstreamError("Supabase zwróciło nieoczekiwany wynik");
  return rows;
}

export type CatalogSurvey = {
  municipalityType: string;
  missingResources: string;
  implementedWorkarounds: string;
  successRating: number;
};

export async function listSurveys(innovationId: string): Promise<CatalogSurvey[]> {
  if (!isInnovationId(innovationId)) return [];
  try {
    const rows = await supabaseFetch<
      {
        municipality_type: string;
        missing_resources: string;
        implemented_workarounds: string;
        success_rating: number;
      }[]
    >(
      `surveys?innovation_id=eq.${innovationId}&select=municipality_type,missing_resources,implemented_workarounds,success_rating`
    );
    if (!Array.isArray(rows)) return [];
    return rows.map((row) => ({
      municipalityType: row.municipality_type,
      missingResources: row.missing_resources,
      implementedWorkarounds: row.implemented_workarounds,
      successRating: row.success_rating,
    }));
  } catch {
    return [];
  }
}

export async function getCatalogInnovation(id: string): Promise<CatalogInnovation> {
  if (!isInnovationId(id)) throw new AdaptNotFoundError();
  const rows = await supabaseFetch<InnovationRow[]>(
    `innovations?id=eq.${id}&select=id,title,description,requirements,category`
  );
  const row = rows[0];
  if (!row) throw new AdaptNotFoundError();
  return row;
}

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readVariants(value: unknown): { urbanVariant: string; ruralVariant: string } {
  let parsed = value;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      parsed = null;
    }
  }
  if (!parsed || typeof parsed !== "object") {
    return { urbanVariant: "", ruralVariant: "" };
  }
  const record = parsed as { urbanVariant?: unknown; ruralVariant?: unknown };
  return {
    urbanVariant: asText(record.urbanVariant),
    ruralVariant: asText(record.ruralVariant),
  };
}

function readInnovation(
  value: DraftRow["innovations"]
): { title: string; description: string } | null {
  const row = Array.isArray(value) ? value[0] : value;
  if (!row || typeof row.title !== "string") return null;
  return { title: row.title, description: typeof row.description === "string" ? row.description : "" };
}

export async function listPendingDrafts(): Promise<PendingDraft[]> {
  const rows = await supabaseFetch<DraftRow[]>(
    "innovation_drafts?status=eq.PENDING_APPROVAL&select=id,innovation_id,proposed_variants,innovations(title,description)&order=id.asc"
  );
  if (!Array.isArray(rows)) throw new RagUpstreamError("Supabase zwróciło nieoczekiwany wynik");
  return rows.flatMap((row) => {
    const innovation = readInnovation(row.innovations);
    if (!innovation) return [];
    const variants = readVariants(row.proposed_variants);
    return [
      {
        id: row.id,
        innovationId: row.innovation_id,
        title: innovation.title,
        description: innovation.description,
        urbanVariant: variants.urbanVariant,
        ruralVariant: variants.ruralVariant,
      },
    ];
  });
}

export async function publishPendingDraft(id: string): Promise<void> {
  if (!isInnovationId(id)) throw new AdaptNotFoundError();
  const rows = await supabaseFetch<{ id: string }[]>(
    `innovation_drafts?id=eq.${id}&status=eq.PENDING_APPROVAL`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ status: "PUBLISHED" }),
    }
  );
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new AdaptNotFoundError();
  }
}

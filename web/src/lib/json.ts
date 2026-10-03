export function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export type MaterialLink = { label: string; url: string };

export function parseMaterials(value: string | null | undefined): MaterialLink[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const label = String((item as { label?: unknown }).label || "").trim();
        const url = String((item as { url?: unknown }).url || "").trim();
        if (!label || !url || url === "#") return null;
        return { label, url };
      })
      .filter((m): m is MaterialLink => Boolean(m));
  } catch {
    return [];
  }
}

/** YouTube watch/shorts/youtu.be → embed URL; otherwise null. */
export function youtubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
    else if (u.hostname.includes("youtube.com")) {
      id = u.searchParams.get("v") || "";
      if (!id && u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2] || "";
      if (!id && u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2] || "";
    }
    if (!id || !/^[\w-]{6,}$/.test(id)) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}

export function parseJsonObject<T extends Record<string, unknown>>(value: string | null | undefined): T {
  if (!value) return {} as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return {} as T;
  }
}

export function parseJsonNumberArray(value: string | null | undefined): number[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(Number) : [];
  } catch {
    return [];
  }
}

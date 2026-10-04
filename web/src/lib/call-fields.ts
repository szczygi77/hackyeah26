export type CallField = { key: string; label: string; from: string };

export function parseCallFields(fieldsJson: string): CallField[] {
  try {
    const parsed = JSON.parse(fieldsJson) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (f): f is CallField =>
        Boolean(f) &&
        typeof f === "object" &&
        typeof (f as CallField).key === "string" &&
        typeof (f as CallField).label === "string" &&
        typeof (f as CallField).from === "string"
    );
  } catch {
    return [];
  }
}

export function prefillFromSubmission(
  field: CallField,
  source: {
    title: string;
    body: string;
    roleLabel: string | null;
    area: string | null;
    canvasJson: string | null;
  }
): string {
  const map: Record<string, string> = {
    title: source.title,
    body: source.body,
    roleLabel: source.roleLabel || "",
    area: source.area || "",
    canvasJson: source.canvasJson || "",
  };
  return map[field.from] ?? "";
}

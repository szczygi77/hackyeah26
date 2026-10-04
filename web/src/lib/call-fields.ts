export type CallFieldType = "text" | "textarea" | "select" | "checkbox" | "rows";

export type CallField = {
  key: string;
  label: string;
  from: string;
  type?: CallFieldType;
  section?: string;
  sectionTitle?: string;
  sectionHint?: string;
  hint?: string;
  options?: string[];
  showIf?: { key: string; equals: string | string[] };
  columns?: string[];
  rowCount?: number;
  required?: boolean;
};

const FIELD_TYPES = new Set<CallFieldType>(["text", "textarea", "select", "checkbox", "rows"]);

function isShowIf(value: unknown): value is CallField["showIf"] {
  if (!value || typeof value !== "object") return false;
  const row = value as { key?: unknown; equals?: unknown };
  const equalsOk =
    typeof row.equals === "string" ||
    (Array.isArray(row.equals) && row.equals.every((item) => typeof item === "string"));
  return typeof row.key === "string" && equalsOk;
}

export function parseCallFields(fieldsJson: string): CallField[] {
  try {
    const parsed = JSON.parse(fieldsJson) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const field = item as CallField;
      if (typeof field.key !== "string" || typeof field.label !== "string" || typeof field.from !== "string") {
        return [];
      }
      const type = field.type && FIELD_TYPES.has(field.type) ? field.type : undefined;
      return [
        {
          key: field.key,
          label: field.label,
          from: field.from,
          type,
          section: typeof field.section === "string" ? field.section : undefined,
          sectionTitle: typeof field.sectionTitle === "string" ? field.sectionTitle : undefined,
          sectionHint: typeof field.sectionHint === "string" ? field.sectionHint : undefined,
          hint: typeof field.hint === "string" ? field.hint : undefined,
          options: Array.isArray(field.options) ? field.options.filter((option) => typeof option === "string") : undefined,
          showIf: isShowIf(field.showIf) ? field.showIf : undefined,
          columns: Array.isArray(field.columns) ? field.columns.filter((column) => typeof column === "string") : undefined,
          rowCount: typeof field.rowCount === "number" ? field.rowCount : undefined,
          required: field.required === false ? false : true,
        },
      ];
    });
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

export function isFieldVisible(field: CallField, values: Record<string, string>): boolean {
  if (!field.showIf) return true;
  const current = values[field.showIf.key] || "";
  const expected = field.showIf.equals;
  return Array.isArray(expected) ? expected.includes(current) : current === expected;
}

export function rowCountOf(field: CallField): number {
  return field.rowCount && field.rowCount > 0 ? field.rowCount : 3;
}

export function readFieldValue(field: CallField, formData: FormData): string {
  if (field.type === "rows") {
    const columns = field.columns ?? [];
    const rows = Array.from({ length: rowCountOf(field) }, (_, row) => ({
      cells: columns.map((_, column) => String(formData.get(`${field.key}__${row}__${column}`) || "").trim()),
    }));
    return JSON.stringify(rows);
  }
  if (field.type === "checkbox") {
    return formData.get(field.key) === "tak" ? "tak" : "";
  }
  return String(formData.get(field.key) || "").trim();
}

export function fieldValues(fields: CallField[], formData: FormData): Record<string, string> {
  return Object.fromEntries(fields.map((field) => [field.key, readFieldValue(field, formData)]));
}

export function missingRequired(fields: CallField[], formData: FormData): boolean {
  const values = fieldValues(fields, formData);
  return fields.some((field) => {
    if (!isFieldVisible(field, values) || field.required === false) return false;
    if (field.type === "rows") {
      const rows = JSON.parse(values[field.key]) as { cells: string[] }[];
      return !rows.some((row) => row.cells.some(Boolean));
    }
    return !values[field.key];
  });
}

export type ApplicationAnswer = { key: string; label: string; value: string; section?: string };

export function buildPayload(fields: CallField[], formData: FormData): ApplicationAnswer[] {
  const values = fieldValues(fields, formData);
  return fields
    .filter((field) => isFieldVisible(field, values))
    .map((field) => ({
      key: field.key,
      label: field.label,
      value: values[field.key],
      section: field.section,
    }));
}

export type FieldSection = { id: string; title: string; hint?: string; fields: CallField[] };

export function groupFields(fields: CallField[]): FieldSection[] {
  const sections: FieldSection[] = [];
  for (const field of fields) {
    const id = field.section || "_";
    let section = sections.find((item) => item.id === id);
    if (!section) {
      section = { id, title: field.sectionTitle || field.label, hint: field.sectionHint, fields: [] };
      sections.push(section);
    }
    if (!section.hint && field.sectionHint) section.hint = field.sectionHint;
    section.fields.push(field);
  }
  return sections;
}

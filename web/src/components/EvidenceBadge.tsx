import type { EvidenceLevel } from "@/lib/types";

const LABELS: Record<EvidenceLevel, { label: string; className: string }> = {
  E0: { label: "E0 — pomysł", className: "badge badge-e0" },
  E1: { label: "E1 — mikrotest", className: "badge badge-e1" },
  E2: { label: "E2 — z oceną", className: "badge badge-e2" },
  E3: { label: "E3 — skalowalne", className: "badge badge-e3" },
  UNKNOWN: { label: "Dowody: nie podano", className: "badge badge-e0" },
};

export function EvidenceBadge({ level }: { level: EvidenceLevel | string }) {
  const item = LABELS[level as EvidenceLevel] || LABELS.UNKNOWN;
  return <span className={item.className}>{item.label}</span>;
}

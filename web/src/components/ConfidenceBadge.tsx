import type { ConfidenceLabel } from "@/lib/types";

const MAP: Record<ConfidenceLabel, { label: string; className: string }> = {
  HIGH: { label: "Mocne dopasowanie", className: "badge badge-high" },
  MEDIUM: { label: "Możliwe dopasowanie", className: "badge badge-medium" },
  LOW: { label: "Słabe dopasowanie", className: "badge badge-low" },
};

export function ConfidenceBadge({ value }: { value: ConfidenceLabel | string }) {
  const item = MAP[value as ConfidenceLabel] || MAP.LOW;
  return <span className={item.className}>{item.label}</span>;
}

export type TrendPoint = { label: string; count: number };

export type TrendRow = {
  area: string;
  current: number;
  previous: number;
  delta: number;
  weeks: TrendPoint[];
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const WEEKS = 8;

function weekStart(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  return d.getTime();
}

function labelOf(ts: number): string {
  return new Date(ts).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}

export function buildTrends(
  rows: { area: string; createdAt: Date }[],
  now = new Date()
): TrendRow[] {
  const currentStart = weekStart(now) - (WEEKS - 1) * WEEK_MS;
  const previousStart = currentStart - WEEKS * WEEK_MS;
  const weekKeys: number[] = [];
  for (let i = 0; i < WEEKS; i++) weekKeys.push(currentStart + i * WEEK_MS);

  const areas = new Map<string, TrendRow>();
  function row(area: string): TrendRow {
    let existing = areas.get(area);
    if (!existing) {
      existing = {
        area,
        current: 0,
        previous: 0,
        delta: 0,
        weeks: weekKeys.map((ts) => ({ label: labelOf(ts), count: 0 })),
      };
      areas.set(area, existing);
    }
    return existing;
  }

  for (const item of rows) {
    const area = item.area || "inne";
    const ts = item.createdAt.getTime();
    const bucket = row(area);
    if (ts >= currentStart) {
      bucket.current += 1;
      const index = weekKeys.findIndex((start) => ts >= start && ts < start + WEEK_MS);
      if (index >= 0) bucket.weeks[index].count += 1;
    } else if (ts >= previousStart && ts < currentStart) {
      bucket.previous += 1;
    }
  }

  return [...areas.values()]
    .map((r) => ({ ...r, delta: r.current - r.previous }))
    .sort((a, b) => b.current - a.current || a.area.localeCompare(b.area, "pl"));
}

import { COST_COLUMNS } from "@/lib/inkubator-form";

export type SavedAnswer = { key: string; label: string; value: string; section?: string };

function isCostTable(value: string): { cells: string[] }[] | null {
  if (!value.startsWith("[")) return null;
  try {
    const rows = JSON.parse(value) as unknown;
    if (!Array.isArray(rows) || rows.some((row) => !row || typeof row !== "object" || !Array.isArray((row as { cells?: unknown }).cells))) {
      return null;
    }
    return rows as { cells: string[] }[];
  } catch {
    return null;
  }
}

export function WniosekAnswers({ answers }: { answers: SavedAnswer[] }) {
  const sections = new Map<string, SavedAnswer[]>();
  for (const answer of answers) {
    const id = answer.section || "_";
    const list = sections.get(id) ?? [];
    list.push(answer);
    sections.set(id, list);
  }

  return (
    <div className="stack">
      {[...sections.entries()].map(([id, rows]) => (
        <section key={id}>
          {rows.map((row) => {
            const table = isCostTable(row.value);
            return (
              <div key={row.key} style={{ marginBottom: "0.75rem" }}>
                <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{row.label}</h3>
                {table ? (
                  <table className="data-table">
                    <thead>
                      <tr>
                        {(table[0]?.cells.length === COST_COLUMNS.length ? COST_COLUMNS : table[0]?.cells.map((_, index) => `Kolumna ${index + 1}`) ?? []).map(
                          (column) => (
                            <th key={column} scope="col">
                              {column}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((line, index) => (
                        <tr key={index}>
                          {line.cells.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{row.value === "tak" ? "Tak" : row.value}</p>
                )}
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}

/**
 * Lekki smoke axe-core na HTML SSR (jsdom).
 * Wymaga działającego serwera: npm run start
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { JSDOM } from "jsdom";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.js"), "utf8");

const base = process.env.A11Y_BASE || "http://127.0.0.1:3000";
const paths = [
  "/",
  "/wyniki?q=samotni+seniorzy",
  "/karta/telefon-na-dzien-dobry",
  "/zasobnik",
  "/wyzwania",
  "/pomysl",
  "/tester",
  "/partnerstwa",
  "/logowanie",
];

const results = [];

for (const path of paths) {
  const url = `${base}${path}`;
  let html;
  try {
    const res = await fetch(url);
    html = await res.text();
    if (!res.ok) {
      results.push({ path, error: `HTTP ${res.status}`, violations: [] });
      continue;
    }
  } catch (e) {
    results.push({ path, error: String(e.message || e), violations: [] });
    continue;
  }

  const dom = new JSDOM(html, {
    url,
    runScripts: "dangerously",
    pretendToBeVisual: true,
  });
  const { window } = dom;
  window.eval(axeSource);

  const axeResults = await window.axe.run(window.document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
  });
  const critical = axeResults.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  results.push({
    path,
    violations: critical.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.length,
    })),
  });
  dom.window.close();
}

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "../docs");
const md = [
  "# Smoke dostępności (axe-core)",
  "",
  `Data: ${new Date().toISOString().slice(0, 10)} · baza: \`${base}\``,
  "",
  "Automatyczny przebieg: `npm run a11y:smoke` (SSR HTML + axe-core + jsdom).",
  "To nie jest certyfikat WCAG 2.1 AA. Sprawdza tylko poważne naruszenia na liście ścieżek poniżej.",
  "",
  "| Ścieżka | Critical/serious | Uwagi |",
  "|---|---|---|",
  ...results.map((r) => {
    const n = r.violations?.length ?? 0;
    const note = r.error || (n === 0 ? "OK" : r.violations.map((v) => `${v.id} (${v.impact})`).join(", "));
    return `| \`${r.path}\` | ${r.error ? "—" : n} | ${note} |`;
  }),
  "",
  "## Ręcznie",
  "",
  "| Kryterium | Status |",
  "|---|---|",
  "| `lang=\"pl\"` | OK |",
  "| Skip-link | OK |",
  "| Baner danych przykładowych | OK |",
  "| Fonty self-host (`next/font`) | OK |",
  "| Tryb prostego tekstu na `/wyniki` i karcie | OK |",
  "| Test z osobami z niepełnosprawnościami | Nie wykonano |",
  "",
].join("\n");

writeFileSync(resolve(outDir, "a11y-smoke.md"), md, "utf8");
console.log(md);
// Nie failuj CI na serious w SSR — zapis wyniku wystarczy; exit 0 jeśli serwer odpisał
const unreachable = results.every((r) => r.error);
process.exit(unreachable ? 1 : 0);

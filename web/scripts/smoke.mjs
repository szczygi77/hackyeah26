#!/usr/bin/env node
/**
 * Smoke ścieżek głównych (HTTP 200 + kluczowe frazy).
 * Użycie: node scripts/smoke.mjs [baseUrl]
 */
const BASE = process.argv[2] || "http://localhost:3000";

const checks = [
  ["/", /Opisz problem|Szukaj dopasowań/i],
  ["/wyniki?q=samotni%20seniorzy", /Dopasowane ogłoszenia|listing-card|Dlaczego pasuje/i],
  ["/zasobnik", /Ogłoszenia|Filtry|Zasobnik/i],
  ["/wyzwania", /Wyzwan/i],
  ["/karta/telefon-na-dzien-dobry", /video-frame|Materiały|Sprawdź u siebie/i],
  ["/tester", /Tester innowacji/i],
  ["/pomysl", /pomysł|fiszka|Kreator/i],
  ["/partnerstwa", /Partnerstw/i],
  ["/middleman/telefon-na-dzien-dobry", /Middleman/i],
  ["/logowanie", /Logowanie|Hasło|hasło|email/i],
];

let failed = 0;
for (const [path, re] of checks) {
  const url = BASE + path;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const text = await res.text();
    if (res.status !== 200) {
      console.error(`FAIL ${res.status} ${url}`);
      failed++;
      continue;
    }
    if (!re.test(text)) {
      console.error(`FAIL content ${url}`);
      failed++;
      continue;
    }
    console.log(`OK  ${res.status} ${path}`);
  } catch (e) {
    console.error(`FAIL ${url}: ${e.message}`);
    failed++;
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nSmoke OK");

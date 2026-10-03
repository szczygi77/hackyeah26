# Zależności zewnętrzne (Szczep)

Wygenerowano na podstawie `package.json` (stan implementacji MVP).

| Pakiet | Rola | Licencja (typowo) |
|--------|------|-------------------|
| next | Framework aplikacji web | MIT |
| react / react-dom | UI | MIT |
| typescript | Typowanie | Apache-2.0 |
| prisma / @prisma/client | ORM + SQLite | Apache-2.0 |
| iron-session | Sesje cookie | MIT |
| bcryptjs | Hash haseł kont demo | MIT |
| zod | Walidacja (gotowość) | MIT |
| nanoid | Publiczne ID zgłoszeń | MIT |
| tsx | Uruchamianie seeda | MIT |
| tailwindcss | Style użytkowe | MIT |
| eslint / eslint-config-next | Lint | MIT |

## Fonty

- Source Serif 4, Source Sans 3 — SIL Open Font License (Google Fonts)

## Modele AI (opcjonalnie, przez API)

- OpenAI Chat Completions / embeddings — zgodnie z umową dostawcy
- Anthropic Messages API — zgodnie z umową dostawcy

Lokalny silnik wyszukiwania używa deterministycznych osadzeń tokenowych (bez zewnętrznego modelu).

## Dane merytoryczne (źródła publiczne ROPS)

Zob. `../docs/szczep/zrodla.md` — Biblioteka, Mapa Wyzwań, IOSS, Social Canvas, raporty. W demo karty są syntetyczne.

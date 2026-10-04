# Szczep — platforma HubMI / ROPS Kraków

Prototyp centralnej platformy Małopolskiego Hubu Innowacji Społecznych: matchmaking innowacji, kontrola warunków wdrożenia, zasobnik, kreator pomysłów, komunikacja i panel ROPS. Rozwijany pod wdrożenie do codziennego użytku.

## Szybki start

```bash
cd web
cp .env.example .env
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Otwórz http://localhost:3000 — to adres dema na stanowisku jury.

### Docker

```bash
cd web
docker compose up --build
```

## Konta pilotażowe

| Rola   | E-mail              | Hasło    |
|--------|---------------------|----------|
| Admin  | admin@demo.szczep   | demo1234 |
| Ekspert| ekspert@demo.szczep | demo1234 |

## Moduły I–VII

| # | Moduł | URL |
|---|--------|-----|
| I | Matchmaking | `/` → `/wyniki` → `/sprawdz/...` |
| II | Zasobnik / ogłoszenia | `/zasobnik`, `/wyzwania`, `/karta/[slug]` |
| III | Kreator | `/pomysl` (+ wniosek przy aktywnym naborze) |
| IV | Tester | `/tester` |
| V | Komunikacja | `/zgloszenie/[id]`, mentor, `/partnerstwa` |
| VI | Admin | `/admin` |
| VII | Middleman | `/middleman/[slug]?matchId=` |

### Smoke

```bash
npm run smoke
```

## AI (opcjonalnie)

Bez kluczy działa tryb szablonowy w `src/lib/ai/index.ts`.  
`OPENAI_API_KEY` lub `ANTHROPIC_API_KEY` — uzasadnienia i Middleman w tym pliku.  
`GROQ_API_KEY` — osobna ścieżka w `src/lib/rag.ts` i `src/lib/adapt.ts`.  
Limit: `AI_DAILY_LIMIT` (domyślnie 200). Webhook: `WEBHOOK_URL` przy nowej fiszce i przy złożeniu wniosku. Szczegóły: `AI_USE.md`.

## Skala prototypu

SQLite, jeden proces. Eksport JSON: `/api/export/karty`, `/api/export/zgloszenia` (konto admina).  
Brak testu wielu użytkowników jednocześnie. Opis zgodny z kodem: `../docs/szczep/zgloszenie/skala-i-integracja.md`.

## Przydatne URL

- `/admin/karty` — edycja i wersjonowanie  
- `/api/export/karty` — eksport JSON (wymaga admina)  
- `/nabor/subskrypcja` — powiadomienie o naborze  

## Dane

Katalog startowy to zestaw syntetyczny do pilotażu (baner na stronie).  
Taksonomia: 8 wyzwań (Mapa Wyzwań) + 9 kategorii Biblioteki ROPS.

## Dokumentacja

- Wartość dla instytucji: `../docs/szczep/wartosc-dla-instytucji.md`
- Opis produktowy: `../docs/szczep/opis-produktowy.md`
- Design system: `docs/DESIGN.md`
- Źródła: `../docs/szczep/zrodla.md`
- Licencje zależności: `THIRD_PARTY.md`
- Użycie AI: `AI_USE.md`

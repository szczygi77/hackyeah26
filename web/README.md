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

Otwórz http://localhost:3000

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

Bez kluczy API działa tryb szablonowy.  
Z `OPENAI_API_KEY` lub `ANTHROPIC_API_KEY` — lepsze uzasadnienia i Middleman.  
Limit: `AI_DAILY_LIMIT` (domyślnie 200). Webhook: `WEBHOOK_URL` przy nowej fiszce.

## Przydatne URL

- `/admin/karty` — edycja i wersjonowanie  
- `/api/export/karty` — eksport JSON (wymaga admina)  
- `/nabor/subskrypcja` — powiadomienie o naborze  

## Dane

Katalog startowy to zestaw syntetyczny do pilotażu (baner na stronie).  
Taksonomia: 8 wyzwań (Mapa Wyzwań) + 9 kategorii Biblioteki ROPS.

## Dokumentacja

- Opis produktowy: `../szczep_opis_platformy.md`
- Design system: `docs/DESIGN.md`
- Źródła: `../źródła.md`
- Licencje zależności: `THIRD_PARTY.md`
- Użycie AI: `AI_USE.md`

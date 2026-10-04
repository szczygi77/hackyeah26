# Skala i integracja — stan prototypu Szczep

Nazwa rozwiązania: Szczep.  
Demo na stanowisku: http://localhost:3000 (`cd web && npm run dev`).  
Prezentacja: `Szczep-prezentacja.pdf` (10 stron). Film: `Szczep-prezentacja.mp4` (poniżej 3 minut).

## Co jest w kodzie

- Baza: SQLite, jeden plik, jeden proces Node (`web/prisma/schema.prisma`).
- Jednoczesność: brak testu obciążenia. Zapis wielu użytkowników naraz opiera się na jednym procesie i jednym pliku bazy.
- Limity zgłoszeń: pamięć procesu, znikają po restarcie (`web/src/lib/limits.ts`).
- Webhook: `WEBHOOK_URL`. Zdarzenia `idea.created` i `application.submitted`. Bez zmiennej funkcja zwraca `no WEBHOOK_URL` i nic nie wysyła (`web/src/lib/webhook.ts`).
- Eksport administratora: `GET /api/export/karty` i `GET /api/export/zgloszenia` (JSON, rola ADMIN).
- Nabór: pola wniosku z `Call.fieldsJson`. To nie jest połączenie z bazą grantową ROPS.

## Koszt utrzymania pilotażu (założenia z opisu produktowego, rozdz. 18)

Infrastruktura i model językowy: około 140 zł miesięcznie (wariant oszczędny) do około 540 zł (wariant ostrożny).  
Praca merytoryczna: około 50 godzin miesięcznie przy przyjętym pilotażu. Utrzymanie techniczne: około 8–16 godzin miesięcznie.  
Stawki ROPS nie są dane. Przy przykładzie 80 zł za godzinę koszt pracy przekracza koszt serwera.

## Identyfikator zespołu

HackTribe nadaje identyfikator przy zgłoszeniu. W repozytorium go nie ma. Tytuł projektu do formularza: Szczep.

# HackYeah 2026

Dwa osobne zadania. Aplikacja w tym repozytorium to **Szczep** (HubMI / ROPS Kraków).

## Szczep — Hub innowacji społecznych

Opis dla instytucji: [docs/szczep/wartosc-dla-instytucji.md](docs/szczep/wartosc-dla-instytucji.md)

```bash
cd web && cp .env.example .env && npm install && npx prisma db push && npm run db:seed && npm run dev
```

## Gdzie co leży

| Ścieżka | Co to jest |
|---|---|
| `web/` | Aplikacja (Next.js). Start: [web/README.md](web/README.md) |
| `web/src/app/` | Strony: wyszukiwanie, karty, sprawdzenie, pomysł, zgłoszenie, panel |
| `web/src/components/` | Wspólne elementy interfejsu |
| `web/src/lib/` | Dopasowanie, baza, sesja, akcje |
| `web/docs/` | Design, makiety, audyt potrzeb |
| `docs/szczep/wartosc-dla-instytucji.md` | Funkcje i wartość dla ROPS |
| `docs/szczep/opis-produktowy.md` | Pełny opis produktowy (v2.1) |
| `docs/szczep/zrodla.md` | Źródła jury |
| `docs/szczep/zadanie/` | Kryteria zadania HubMI |
| `docs/szczep/archiwum/` | Starsza wersja opisu |
| `docs/szczep/media/` | Obrazy robocze, poza aplikacją |
| `docs/pauza/` | Drugie zadanie (Bank Pekao). Osobny opis, bez kodu w tym repo |

## Pauza

[docs/pauza/opis-zaktualizowany.md](docs/pauza/opis-zaktualizowany.md) — aktualny opis. [docs/pauza/opis.md](docs/pauza/opis.md) — wcześniejsza wersja.

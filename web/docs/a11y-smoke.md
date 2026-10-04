# Smoke dostępności (axe-core)

Data: 2026-10-04 · baza: `http://127.0.0.1:3002`

Automatyczny przebieg: `npm run a11y:smoke` (SSR HTML + axe-core + jsdom).
To nie jest certyfikat WCAG 2.1 AA. Sprawdza tylko poważne naruszenia na liście ścieżek poniżej.

| Ścieżka | Critical/serious | Uwagi |
|---|---|---|
| `/` | 0 | OK |
| `/wyniki?q=samotni+seniorzy` | 0 | OK |
| `/karta/telefon-na-dzien-dobry` | 0 | OK |
| `/zasobnik` | 0 | OK |
| `/wyzwania` | 0 | OK |
| `/pomysl` | 0 | OK |
| `/tester` | 0 | OK |
| `/partnerstwa` | 0 | OK |
| `/logowanie` | 0 | OK |

## Ręcznie

| Kryterium | Status |
|---|---|
| `lang="pl"` | OK |
| Skip-link | OK |
| Baner danych przykładowych | OK |
| Fonty self-host (`next/font`) | OK |
| Tryb prostego tekstu na `/wyniki` i karcie | OK |
| Test z osobami z niepełnosprawnościami | Nie wykonano |

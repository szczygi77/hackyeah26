# Smoke dostępności (axe-core)

Automatyczny przebieg: `npm run a11y:smoke` (SSR HTML + axe-core + jsdom).
Pełny audyt przeglądarkowy (axe DevTools / Lighthouse) zalecany przed wdrożeniem.

| Ścieżka | Uwagi |
|---|---|
| `/` | skip-link, `lang=pl` |
| `/wyniki` | badge pewności nie tylko kolorem |
| `/karta/...` | etykiety pól |
| `/zasobnik` | katalog |
| `/logowanie` | formularz |

Fonty: self-host (`next/font`). Tryb prostego języka na wynikach i karcie.

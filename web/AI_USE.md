# Użycie AI w projekcie Szczep

## W produkcie (runtime)

| Funkcja | Bez klucza API | Z kluczem OpenAI/Anthropic |
|---------|----------------|----------------------------|
| Uzasadnienie dopasowania | Szablon + cytat z karty | LLM ograniczony do pól karty; cytat weryfikowany |
| Middleman (szkic planu) | Szablon 6 sekcji z pól karty | LLM + te same reguły |
| Szkic karty w adminie | Heurystyka linii tekstu | LLM → JSON pól |
| Prosty język | Reguły zamiany fraz | (MVP: reguły) |
| Wyszukiwanie semantyczne | Osadzenia tokenowe lokalne | Te same (API embeddings nie jest wymagane) |

AI **nie** decyduje o grantach, nie publikuje kart bez admina i nie wymyśla faktów spoza karty (cytat musi występować w tekście karty).

## Przy tworzeniu kodu

Kod aplikacji powstawał z asystą AI (Cursor) na podstawie dokumentu `szczep_opis_platformy.md`. Odpowiedzialność za treść i decyzje produktowe ponosi zespół.

## Wyłączenie

Usuń `OPENAI_API_KEY` i `ANTHROPIC_API_KEY` z środowiska — platforma działa w trybie szablonowym.

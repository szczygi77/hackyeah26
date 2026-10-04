# Użycie AI w projekcie Szczep

## W produkcie 

| Funkcja | Bez klucza | Z kluczem |
|---|---|---|
| Uzasadnienie dopasowania w `web/src/lib/ai/index.ts` | Szablon i cytat z karty | `OPENAI_API_KEY` albo `ANTHROPIC_API_KEY` |
| Middleman w `web/src/lib/ai/index.ts` | Szablon sekcji z pól karty | Ten sam wybór OpenAI / Anthropic |
| Wyszukiwanie semantyczne i uzasadnienie w `web/src/lib/rag.ts` | Nie działa bez klucza | `GROQ_API_KEY`, model `GROQ_MODEL` (domyślnie `openai/gpt-oss-120b`) |
| Szkic planu w `web/src/lib/adapt.ts` | Nie działa bez klucza | Ten sam Groq |
| Prosty język i ranking lokalny | Reguły i nakładanie tokenów w procesie aplikacji | Bez osobnego API embeddingów |
docs/szczep/opis-produktowy.md`. Odpowiedzialność za treść i decyzje produktowe ponosi zespół.

# Szczep — kompletny opis projektu

Nazwa: **Szczep**.  
Dla kogo: Małopolski Hub Innowacji Społecznych (ROPS Kraków).  
Forma: działający prototyp webowy w katalogu `web/` (Next.js, jeden proces, SQLite).  
Dane startowe: syntetyczne. Nie pochodzą z prawdziwych spraw mieszkańców.

Szczep jest miejscem, w którym ktoś opisuje problem społeczny zwykłymi słowami i dostaje trzy najbliższe innowacje z katalogu — z powodem dopasowania, oceną dowodów i listą warunków, bez których przeniesienie rozwiązania w nowe miejsce jest ryzykowne. Gdy katalog nie ma odpowiedzi, zgłoszenie zostaje sygnałem dla Hubu. Gdy nabór jest otwarty, ten sam pomysł staje się wnioskiem o rekomendację finansowania w Hubie.

## 1. Problem społeczny

Małopolska ma już blisko 200 innowacji społecznych: od prostych praktyk po usługi i narzędzia. Leżą w Bibliotece ROPS, w kategoriach fachowych. Osoba z problemem — mieszkaniec, pracownik CUS, NGO, urząd gminy — zwykle nie zna tych nazw.

Skutek jest podwójny.

- Gmina zaczyna od zera, choć podobne rozwiązanie było testowane gdzie indziej.
- Hub nie widzi, czego ludzie szukają. Pytanie bez karty ginie. Nabory i uzupełnianie Biblioteki nie dostają tego sygnału.

Drugi problem jest transfer. To, że coś zadziałało w jednym miejscu, nie znaczy, że zadziała bez lokalu, wolontariuszy, partnera albo budżetu. Sam katalog tego nie mówi.

Szczep nie zastępuje decyzji urzędu, mentora ani autora innowacji. Skraca drogę od opisu problemu do karty, która ma szansę się przyjąć, i zostawia ślad, gdy takiej karty nie ma.

## 2. Kto z tego korzysta

| Kto | Co robi w Szczepie | Czego potrzebuje |
|---|---|---|
| Mieszkaniec, NGO | Opisuje problem, zgłasza pomysł, test, pytanie do mentora | Krótki formularz, status sprawy, język bez żargonu |
| JST, CUS | Szuka gotowego rozwiązania i sprawdza warunki wdrożenia | Katalog, lista braków, szkic planu |
| Pracownik ROPS | Prowadzi karty, nabory, kolejkę, trendy | Panel z powiadomieniem o nowej fiszce i wniosku |
| Ekspert / mentor | Odpowiada na pytania przy karcie | Wątek ze statusem, nie pusta skrzynka |

Wyszukiwanie i czytanie kart nie wymaga konta. Kontakt pojawia się dopiero przy zgłoszeniu, teście albo pytaniu.

## 3. Logika, która spina całość

Jedna karta innowacji jest źródłem dla wszystkich modułów. Ma tytuł, skrót, problemy, kategorię Biblioteki, obszary wyzwań, grupę, elementy, poziom dowodów (E0–E3), warunki wstępne, materiały i opcjonalnie film z transkrypcją.

Cztery kroki użytkownika:

1. **Opisz.** Jedno pole, zwykłe słowa.
2. **Dopasuj.** Do trzech kart powyżej progu pewności. Przy każdej: dlaczego pasuje, cytat z karty, czego karta nie mówi.
3. **Sprawdź.** Odpowiedzi tak / nie / nie wiem wobec warunków karty. Wynik to lista: macie to, brakuje tego, do ustalenia. To nie jest prognoza sukcesu.
4. **Przekaż.** Test, mentor, partnerstwo, własny pomysł albo szkic planu wdrożenia. Sprawa dostaje numer i oś statusów.

Gdy dopasowanie jest słabe, system mówi to wprost. Gdy konkretne zapytanie nie ma żadnej karty powyżej progu, trafia do panelu jako luka Biblioteki. Krótkie, niekonkretne zapytanie jest traktowane jako problem sformułowania, nie jako brak w katalogu.

Przed liczeniem podobieństwa z tekstu znikają typowe dane osobowe: e-mail, telefon, IBAN, poprawny PESEL. Zostaje znacznik „ukryte”.

## 4. Jak liczone jest dopasowanie

Silnik jest w `web/src/lib/match/search.ts`. Nie wysyła zapytania do modelu, żeby ułożyć ranking.

- **Podobieństwo słów** (waga 0,65): nakładanie tokenów zapytania na tytuł, skrót i tekst wyszukiwania karty.
- **Znaczenie** (waga 0,35): słownik pojęć z 9 kategorii Biblioteki i 8 obszarów Mapy Wyzwań (senior, piecza, bezdomność, cudzoziemcy, praca, zdrowie psychiczne i inne). Punkt liczy się tylko wtedy, gdy karta naprawdę jest w tej kategorii.
- Przy niemal równym wyniku wygrywa wyższy poziom dowodów, potem karta z większą liczbą warunków wprost z opisu.

Pewność:

- **Wysoka** — duże pokrycie słów albo mocne pojęcie i przyzwoite słowa.
- **Średnia** — częściowe pokrycie.
- **Niska** — nie wchodzi do trójki, chyba że zapytanie jest oznaczone jako kryzys. Wtedy i tak wracają najbliższe karty, a interfejs ma najpierw pokazać informację o pomocy, nie „rozwiązanie AI”.

Uzasadnienie domyślne jest szablonem z cytatem wyciętym z karty. Jeśli są klucze `OPENAI_API_KEY` albo `ANTHROPIC_API_KEY`, model może napisać 1–2 zdania, ale cytat musi występować w tekście karty. Inaczej zostaje szablon. Model nie publikuje kart i nie przyznaje finansowania.

Osobna ścieżka Groq (`GROQ_API_KEY`) jest w `web/src/lib/rag.ts` i `web/src/lib/adapt.ts` (wyszukiwanie semantyczne po stronie Supabase oraz warianty miejski/wiejski). Główny matchmaking strony startowej działa bez tego klucza.

## 5. Moduły

### I. Matchmaking — obowiązkowy

Adresy: `/`, `/wyniki`, `/sprawdz/[id]`, `/sprawdz/[id]/wynik`.

Użytkownik wpisuje problem. Dostaje do trzech kart. Z wybranej przechodzi do sprawdzenia warunków. Po liście braków może iść dalej: plan, test, mentor, partnerstwo, własny pomysł.

### II. Zasobnik wiedzy

Adresy: `/zasobnik`, `/wyzwania`, `/wyzwania/[slug]`, `/karta/[slug]`.

- Katalog 9 kategorii Biblioteki i filtr poziomu dowodów oraz obszaru wyzwania.
- Półka filmów. Na karcie film jest osadzony tylko z transkrypcją albo opisem jako alternatywą tekstową. Napisy samego serwisu wideo pozostają po stronie YouTube.
- Osiem obszarów Mapy Wyzwań: definicja, persona, linki do raportów.
- Czytelnia: trzy własne, krótkie omówienia publikacji o innowacjach społecznych plus link do źródła. To nie są fragmenty książek.

Aktualizacja treści: administrator edytuje kartę. Każdy zapis podnosi numer wersji i odkłada poprzedni stan z datą i autorem sesji (`InnovationRevision`).

Trendy potrzeb są tylko w panelu administratora. Tabela liczy zgłoszenia z ostatnich 8 tygodni wobec poprzednich 8 tygodni, obszar po obszarze, tydzień po tygodniu. Bez wykresu opartego wyłącznie na kolorze.

### III. Kreator pomysłów i wniosek

Adresy: `/pomysl`, `/pomysl/wniosek/[numer]`.

Fiszka ma trzy pola obowiązkowe: istota, dla kogo, etap. Kanwa (intensywność, częstość, skala, gotowość, aktorzy, odbiorca, płatnik, wartość) jest opcjonalna.

Gdy nabór jest aktywny, pola wniosku biorą się z definicji tego naboru (`Call.fieldsJson`). Inny nabór — inny formularz. Złożenie zmienia status sprawy na „w ocenie” i otwiera powiadomienie administratora.

Administrator na `/admin/nabory` rekomenduje finansowanie albo odmawia, z uzasadnieniem. Autor widzi to na stronie zgłoszenia. Rekomendacja jest decyzją w prototypie Hubu. Nie uruchamia przelewu i nie wysyła wniosku do zewnętrznej bazy grantowej ROPS.

Asystent, który rysuje przedmiot innowacji, nie jest w prototypie. Middleman dotyczy wdrożenia istniejącej karty, nie rysowania nowego pomysłu.

### IV. Tester

Adres: `/tester` oraz formularz na karcie.

Zgłoszenie chęci testu, ocena 1–5 i propozycja usprawnienia. Lista trafia do panelu i do edycji karty. Zbiorcze średnie nie są pokazywane publicznie, bo dane są syntetyczne.

### V. Komunikacja, mentor, partnerstwa

Adresy: `/zgloszenie/[numer]`, pytanie na karcie, `/ekspert`, `/partnerstwa`, `/nabor/subskrypcja`.

Każde zgłoszenie może mieć wątek. Autor dopisuje wiadomość. Administrator albo ekspert odpowiada i status przechodzi na „odpowiedziano”. Oś czasu zapisuje kto i kiedy zmienił status.

Partnerstwa: ogłoszenia „szukam” i „oferuję”. Kontakt nie jest publikowany jako otwarta lista prywatnych danych.

Alerty: zapis subskrypcji trzyma skrót e-maila (hash), nie adres w treści alertu. Nowa fiszka i zmiana naboru dopisują wpis na `/nabor/subskrypcja`.

### VI. Panel administratora

Adresy: `/admin`, `/admin/queue`, `/admin/karty`, `/admin/karta/nowa`, `/admin/karta/[id]`, `/admin/nabory`, `/admin/warianty`.

Logowanie pracowników: `/logowanie`, konta demo `admin@demo.szczep` i `ekspert@demo.szczep`.

Na pulpicie: kolejka, luki Biblioteki, testerzy, trendy, nabory, licznik nieprzeczytanych. Nowa fiszka i nowy wniosek pokazują baner nad panelem, z linkiem do sprawy.

Eksport JSON (tylko admin): `/api/export/karty`, `/api/export/zgloszenia`.

### VII. Middleman

Adres: `/middleman/[slug]`.

Wejście: karta i, jeśli jest, profil odpowiedzi ze sprawdzenia warunków. Wyjście: szkic sekcji (cel, kroki, zasoby, ryzyka, czego karta nie mówi). Bez klucza modelu szkic składa się z pól karty. Z kluczem model jest ograniczony do tych pól. Szkic jest oznaczony jako wersja robocza do weryfikacji. Platforma nie sprawdza zgodności z prawem.

## 6. Systemy techniczne

| Warstwa | Co jest w prototypie |
|---|---|
| Aplikacja | Next.js, strony renderowane na serwerze, język interfejsu polski |
| Baza główna | SQLite, jeden plik. Karty, warunki, nabory, wnioski, zgłoszenia, wątki, powiadomienia, subskrypcje, rewizje kart |
| Konta innowatora | Osobna ścieżka Supabase (`/login`, `/innowator`) na szkice wariantów. Panel ROPS prototypu opiera się na sesji Szczep, nie na tym koncie |
| Dopasowanie | Lokalne, na opublikowanych kartach. Bez osobnej bazy wektorowej w ścieżce strony startowej |
| Powiadomienie zewnętrzne | `POST` na `WEBHOOK_URL` przy zdarzeniach `idea.created` i `application.submitted`. Bez zmiennej nic nie wychodzi |
| Limity | Licznik zgłoszeń w pamięci procesu. Znika po restarcie |
| Skala | Setki kart i tysiące zgłoszeń rocznie mieszczą się w jednym pliku. Nie ma testu wielu użytkowników jednocześnie |

Koszt pilotażu (założenia, nie cennik ROPS): infrastruktura i model językowy około 140–540 zł miesięcznie. Praca merytoryczna około 50 godzin miesięcznie, utrzymanie techniczne około 8–16 godzin. Przy stawce przykładowej 80 zł/h praca ludzi jest większym kosztem niż serwer.

## 7. Wpływ społeczny

**Szybsze użycie tego, co już działa.** Mieszkaniec albo gmina nie musi znać taksonomii Biblioteki, żeby dojść do karty o samotności seniorów, pieczy, bezdomności czy wykluczeniu cyfrowym.

**Mniej wdrożeń „na ślepo”.** Lista braków (lokal, ludzie, partner, pieniądze) jest widoczna zanim ktoś ogłosi, że rozwiązanie „wystarczy skopiować”.

**Głos dla potrzeb bez odpowiedzi.** Powtarzające się pytania bez karty stają się trendem w panelu. Hub może uzupełniać Bibliotekę i nabory według tego, czego ludzie faktycznie szukają, a nie tylko według tego, co już opisano.

**Krótsza droga pomysłu.** Fiszka, wniosek dopasowany do naboru i rekomendacja są w jednym wątku. Autor widzi status. Pracownik nie składa sprawy z kilku skrzynek.

**Dostępność jako warunek, nie ozdoba.** Grupy, dla których Hub pracuje — seniorzy, osoby z niepełnosprawnością, rodziny — mają móc wejść bez konta, dużym polem i klawiaturą. Smoke axe na ścieżkach jury nie wykazał poważnych naruszeń automatycznych. To nie jest certyfikat WCAG 2.1 AA. Transkrypcja jest przy filmie, bo sam osadzony film jej nie gwarantuje.

## 8. Czego Szczep nie robi

- Nie decyduje za urząd, mentora ani autora karty.
- Nie obiecuje, że wdrożenie się powiedzie.
- Nie przelewa pieniędzy. Rekomendacja finansowania jest zapisem w prototypie.
- Nie łączy się na żywo z bazą grantową ROPS. Integracja to webhook i eksport JSON.
- W demonstracji nie trzyma prawdziwych danych osobowych z materiałów ROPS. Formularze i tak maskują typowe identyfikatory przed zapisem i przed modelem.

## 9. Jedno zdanie

Małopolska ma katalog sprawdzonych innowacji, a gmina z problemem wciąż zaczyna od zera. Szczep łączy opis problemu z kartą, która ma szansę pasować, pokazuje braki przeniesienia i oddaje Hubowi zarówno nowy pomysł, jak i to, czego w katalogu jeszcze nie ma.

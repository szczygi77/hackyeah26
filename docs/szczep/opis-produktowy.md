# Szczep — platforma, która pomaga dobrym rozwiązaniom społecznym trafić tam, gdzie są potrzebne

**Platforma HubMI / ROPS Kraków · wersja 2.1 · aktualizacja pod prototyp wdrożeniowy**

> **Status dokumentu.** Prototyp zaimplementowany w katalogu **`web/`** (z katalogu głównego repozytorium; Next.js + SQLite). Opis wartości dla ROPS: `wartosc-dla-instytucji.md`. Siedem modułów ma ścieżkę end-to-end; UI jest prowadzony jak produkt do codziennego użytku (bez warstwy konkursowej). Nazwa „Szczep" jest robocza. Znaczniki: **[REG]** — regulamin zadania HubMI.pl; **[OPIS]** — opis wyzwania (dokument CRITERIA); **[UMOWA]** — wzór umowy przeniesienia praw (załącznik do regulaminu); **[WEB]** — źródło internetowe; **[JURY]** — źródło z listy materiałów dla uczestników HubMI; **[ZAŁ]** — moje założenie lub propozycja do weryfikacji. Dane startowe w prototypie są **syntetyczne**. Zmiany względem wersji 1 opisuje Załącznik A. Rejestr źródeł: Załącznik C.

---

# CZĘŚĆ I — OPIS PROSTY

## Co to jest

Szczep to strona internetowa dla Małopolskiego Hubu Innowacji Społecznych. Pomaga w jednej sprawie: **gdy ktoś ma problem społeczny, szybko znaleźć sprawdzone rozwiązanie, które już gdzieś zadziałało, i dowiedzieć się, czy zadziała także u niego.**

ROPS Kraków ma w portfolio blisko 200 innowacji społecznych [OPIS]. Wiele z nich pozostaje mało znanych, bo trudno je znaleźć i trudno ocenić, czy nadają się do innego miejsca. Szczep ma to ułatwić.

## Dla kogo

- **Mieszkańcy i organizacje pozarządowe** — opisują problem własnymi słowami albo zgłaszają pomysł.
- **Urzędy i jednostki samorządu (np. Centra Usług Społecznych)** — szukają gotowych rozwiązań, które da się wdrożyć lokalnie.
- **Pracownicy ROPS** — dostają uporządkowane zgłoszenia i narzędzie do prowadzenia wiedzy oraz rozmowy z użytkownikami.
- **Eksperci i mentorzy** — odpowiadają na pytania i wspierają wdrożenia.

## Jak to działa — cztery kroki

1. **Opisz.** Jedno pole, zwykłe słowa, np. „samotni seniorzy po zamknięciu klubu". Bez długiego formularza.
2. **Dopasuj.** Dostajesz trzy najbliższe rozwiązania. Przy każdym widzisz: dlaczego pasuje, czego może Wam brakować i jak mocne są dowody, że działa.
3. **Sprawdź** (opcjonalnie). Odpowiadasz na kilka pytań o swoją gminę lub organizację i dostajesz listę: „macie to, brakuje tego, do sprawdzenia".
4. **Wdróż.** Zgłaszasz chęć przetestowania rozwiązania, piszesz do ROPS lub mentora, szukasz partnera, składasz własny pomysł albo prosisz asystenta o szkic planu wdrożenia. Zawsze widzisz status swojego zgłoszenia.

## Co jest w Szczepie wyjątkowe

- **Nie tylko „co podobnego istnieje", ale „czy to się u nas przyjmie".** Katalogi pokazują przykłady. Szczep dodatkowo zestawia warunki, w jakich rozwiązanie działało, z sytuacją pytającego.
- **Uczciwość wobec użytkownika.** Gdy dopasowanie jest słabe, system to mówi. Gdy czegoś nie wie, pisze „do ustalenia z autorem" zamiast zgadywać.
- **Zgłoszenia bez dobrej odpowiedzi nie przepadają.** Jeśli wiele osób opisuje problem, dla którego Biblioteka nie ma rozwiązania, ROPS widzi to w panelu jako sygnał do działania.
- **Prostota.** Jeden ekran startowy, duże elementy, praca samą klawiaturą, tryb prostego języka.

## Czego Szczep nie robi

- Nie zastępuje decyzji urzędników ani doradców ROPS. Podpowiada i porządkuje.
- Nie przewiduje, „czy rozwiązanie na pewno się powiedzie". Pokazuje listę zgodności warunków, a to nie jest prognoza.
- W wersji demonstracyjnej nie przechowuje prawdziwych danych osobowych [OPIS].

## Pitch w 30 sekund

> Małopolska ma blisko 200 sprawdzonych innowacji społecznych, a gmina z problemem wciąż zaczyna od zera, bo nie wie, że rozwiązanie istnieje, ani czy będzie pasować. Szczep to centralna platforma Hubu: opisujesz problem zwykłymi słowami, dostajesz trzy dopasowane innowacje z uzasadnieniem, listą braków i oceną dowodów, a gdy nic nie pasuje, ROPS dostaje sygnał, czego brakuje w Bibliotece.

---

# CZĘŚĆ II — OPIS SZCZEGÓŁOWY

## 1. Kontekst, wymagania i zasady konkursu

### 1.1. Co wynika z regulaminu [REG] — to jest dokument wiążący

| Obszar | Zapis | Skutek dla projektu |
|---|---|---|
| Termin | Start 3.10.2026, 11:00; koniec 4.10.2026, 11:00 (§2). Zgłoszenia po terminie nie są oceniane (§4 ust. 8) | Cel złożenia: do 9:30 |
| Miejsce | Wyłącznie stacjonarnie, Tauron Arena Kraków; organizator nie zapewnia sprzętu ani wsparcia technicznego (§4 ust. 4–5) | Własny sprzęt; ryzyko sieci przy demo (rozdz. 16) |
| Zespół | Do 6 osób (§3 ust. 4) | Dwie osoby: tylko pełnoletni uczestnicy, tak jest |
| Platforma zgłoszeń | HackTribe, hackyeah2026.hacktribe.co (§4 ust. 3 i 8) | Próbny upload w trakcie pracy |
| Skład zgłoszenia | **Obowiązkowo: tytuł, identyfikator zespołu, opis, PDF do 10 slajdów oraz film MP4 do 3 minut.** Opcjonalnie: zrzuty ekranu, repozytorium, linki do dema, materiały graficzne (§4 ust. 9) | **Film jest obowiązkowy razem z PDF** |
| Język | Zgłoszenie po polsku; prezentacja przed jury po polsku (§4 ust. 9, §5 ust. 5) | Cały interfejs, materiały i film po polsku |
| Jury | Głównie przedstawiciele Województwa Małopolskiego (§5 ust. 1) | Komunikacja bez żargonu technicznego |
| Ocena | Skala 1–10, średnia ważona: **spełnienie wyzwania 40%, potencjał wdrożeniowy 20%, dostępność i intuicyjność 20%, kryteria premiujące 20% (interfejs 10% + materiały i MVP 10%)** (§5 ust. 3) | Rozdz. 22 |
| Próg nagrody | Co najmniej 50% maksymalnej oceny (§5 ust. 4) | — |
| Rozstrzygnięcie | 4.10.2026, ok. 17:45 (§6 ust. 1) | Demo musi działać stabilnie do ogłoszenia wyników |
| Nagrody | 6 000 / 5 000 / 4 000 zł, dzielone proporcjonalnie na członków zespołu, pomniejszone o podatki (§6) | — |
| Prawa autorskie | Warunek wypłaty nagrody: umowa przeniesienia autorskich praw majątkowych na PROIDEA. Odmowa = rezygnacja z nagrody (§6 ust. 6, §7 ust. 3). Dotyczy **nagrodzonych** rozwiązań, w tym kodu źródłowego | Rozdz. 16 |
| Regulamin Hackathonu | Regulamin zadania odsyła do ogólnego regulaminu Hackathonu (§3 ust. 5, §10 ust. 5). **Nie mam go w dokumentach projektu** | Przeczytać przed startem (rozdz. 25) |

### 1.2. Co dodaje opis wyzwania [OPIS]

- Wymagane w zgłoszeniu (ponad regulamin): link do działającej wersji demo, makiety UX/UI, przewidywany koszt obsługi i utrzymania wraz z opisem zasobów.
- Siedem modułów, z obowiązkowym matchmakingiem. Wzór punktacji w „Kryteriach oceny": stopień spełnienia wyzwania to 40%, z czego **10% za moduł obowiązkowy i po 5% za każdy kolejny**. Regulamin mówi ogólniej o „liczbie dodatkowych funkcjonalności". Przyjmuję, że wzór z opisu jest obowiązujący, ale nie jest to zapis regulaminu.
- Standard dostępności **WCAG 2.1 AA** (również w regulaminie §5).
- Zasoby dla uczestników: Mapa Wyzwań Społecznych i raporty, link do Biblioteki, materiały ROPS, plansze Canw Innowacji Społecznych, mentorzy, **przykładowe dane do MVP**.
- Zakaz używania prawdziwych danych osobowych i wrażliwych z materiałów ROPS.

### 1.3. Cztery „kluczowe kryteria" — korekta względem wersji 1

Intuicyjność, szybkość komunikacji, trafność dopasowania i pomysłowość pochodzą z sekcji „Sposób testowania i/lub walidacji" tego samego dokumentu [OPIS]. **To nie jest alternatywny zestaw ocen.** To aspekty, na które jury zwróci uwagę wewnątrz czterech kryteriów z regulaminu. Wagi z regulaminu obowiązują. Wersja 1 błędnie sugerowała, że nowszy tekst może te wagi zastępować.

### 1.4. Co wynika z materiałów ROPS i źródeł jury [WEB] [JURY]

**Inkubatory i karty**

- Projekt „Inkubator Włączenia Społecznego" zakładał przetestowanie 60 innowacji w mikroskali i upowszechnienie 6, z grantami do 100 000 zł i małymi grupami testującymi (8–12 osób). Źródło: materiały partnerskie projektu.
- ROPS prowadzi osobne przedsięwzięcie poświęcone wdrażaniu istniejących innowacji w środowiskach lokalnych („Usługa Wrażliwa").
- Ogłoszenia naborowe z 2021 r. wskazywały składanie wniosków przez Generator Wniosków na stronie ROPS. **Nie wiem, czy to nadal aktualny sposób.**
- Publikowane karty innowacji mają zwykle stały układ (krótki opis, jakie problemy rozwiązuje, kto może skorzystać, elementy innowacji, grupa docelowa) i bywają PDF-ami. Na stronie Biblioteki przy kartach są akcje: materiały, zasady wykorzystania, film, „otwórz w telefonie" [JURY].

**Biblioteka Innowacji Społecznych** [JURY: rops.krakow.pl/…/biblioteka-innowacji-spolecznych]

- Dziewięć kategorii nawigacyjnych: (1) niepełnosprawność intelektualna, (2) kryzys bezdomności, (3) cudzoziemcy, (4) rynek pracy, (5) zdrowie i medycyna, (6) niepełnosprawność sensoryczna, (7) ograniczona mobilność, (8) dzieci, młodzież i rodziny, (9) seniorzy.
- Strona Biblioteki jest w przebudowie; część linków nieaktywna. Kontakt awaryjny: `iws@rops.krakow.pl`. **W demo nie zakładamy live API** — wczytujemy karty ręcznie / z danych przykładowych od ROPS.

**Mapa Wyzwań Społecznych** [JURY: PDF IWS 2.0]

- Publiczny PDF (projekt „Inkubator Włączenia Społecznego 2.0"). **Dane w Mapie są ogólnopolskie** — tak jest napisane w dokumencie; kontekst Małopolski bierzemy z raportów ROPS i Obserwatora.
- Osiem obszarów, każdy z: definicją, analizą danych, kluczowymi wyzwaniami, personą (cele / wyzwania / motywacje) i listą „dowiedz się więcej":
  1. Rodzina i piecza zastępcza (persona: Ania i Staś)
  2. Bezdomność (Kuba)
  3. Niepełnosprawność (Krystian)
  4. Ubóstwo (Tomek)
  5. Integracja cudzoziemców (Swietłana)
  6. Zdrowie (Stanisław)
  7. Zdrowie psychiczne (Mateusz, Karina)
  8. Seniorzy (Janina)

**Raporty z badań ROPS** [JURY: rops.krakow.pl/…/raporty-z-badan]

Priorytet do Zasobnika i slajdu skali (wiele na licencji CC BY 4.0):

| Rok | Tytuł | Do czego w Szczepie |
|---|---|---|
| 2026 | Wyzwania i potrzeby sektora opiekuńczego w Małopolsce | Wyzwanie: seniorzy / zdrowie; luka kadrowa |
| 2025 | Usługi społeczne w Małopolsce – deficyty, potrzeby, potencjał (aktualizacja) | Diagnoza regionalna → „Wyzwania Małopolski" |
| 2025 | Mieszkania wspomagane i treningowe w Małopolsce | Wyzwanie: niepełnosprawność / piecza |
| 2025 | DPS w Małopolsce wobec deinstytucjonalizacji | Wyzwanie: seniorzy / niepełnosprawność |
| 2024 | Piecza zastępcza w Małopolsce | Wyzwanie: rodzina i piecza |

**Internetowy Obserwator Statystyk Społecznych (IOSS)** [JURY: obserwator.rops.krakow.pl]

- Wskaźniki na poziomie gmin i powiatów Małopolski: demografia, pomoc społeczna, piecza zastępcza, zdrowie, kultura, rynek pracy, edukacja, migracje.
- Widoki: mapa, tabela, wykres; „Portret gminy/powiatu"; eksport XLS. Źródła m.in. BDL GUS, OZPS, sprawozdania branżowe.
- **To lepsze źródło profilu lokalnego niż surowe API GUS** — dane już regionalne i opisane. W MVP: snapshot 3–5 wskaźników dla 1–2 gmin demo, bez live API.

**Social Canvas (INNO AGH)** [JURY: PDF]

- Publiczny PDF z polami: problem (intensywność, częstotliwość, skala), aktorzy (wspierają / utrudniają), rozwiązanie (jasność, gotowość, wartość vs koszt), koszty stałe/zmienne, odbiorcy, płatnik, autorytet, propozycja wartości, kanały, partnerzy, wpływ. Mapowanie na fiszkę: rozdz. 9.2.

**Publikacje ze świata innowacji** [JURY]

- *Połącz kropki…* (IWS, 2023); *Innowacje społeczne dla dostępności* (2022); *Przewodnik po innowacjach społecznych* (2019). Warstwa edukacyjna Zasobnika i kontekst poziomów dowodów E0–E3.

**Wniosek krytyczny:** wąskim gardłem jest przejście od „działa tam" do „działa u nas", a nie samo znalezienie kolejnej innowacji. Biblioteka i generator wniosków już w jakiejś formie istnieją, więc platforma, która je tylko odtworzy, nie spełni kryterium „pomysłowość". Źródła jury dają gotową **taksonomię wyzwań**, **kategorie kart**, **pola kanwy** i **wskaźniki gminne** — nie trzeba ich wymyślać od zera.

### 1.5. Czego nie wiem (i co sprawdzić na miejscu)

| Pytanie | Dlaczego ważne | Jak sprawdzić |
|---|---|---|
| Ile kart w Bibliotece i czy ROPS da pełny eksport / dane przykładowe do MVP? (strona w przebudowie) | Jakość wczytywania = trafność | Stoisko ROPS; mail `iws@rops.krakow.pl` |
| Czy filmy z Biblioteki mają napisy i audiodeskrypcję? | WCAG 1.2.2 i 1.2.5 przy osadzaniu filmów | Stoisko ROPS |
| Czy wolno przekazywać materiały ROPS do zewnętrznego modelu językowego? | Zgoda właściciela treści, prywatność | Pytanie do mentora ROPS |
| Jak przekazać repozytorium i dema jury bez „publikacji"? | Oświadczenie z umowy (rozdz. 16) | Pytanie do organizatora |
| Czy film może być linkiem niepublicznym? Opis żąda „otwartego repozytorium" | Sprzeczność z oświadczeniem o niepublikowaniu | Pytanie do organizatora |
| Kiedy i w jakiej formie odbywa się prezentacja przed jury? | Planowanie próby | Harmonogram HackYeah |
| Ogólny regulamin Hackathonu: praca przedwydarzeniowa, ujawnianie użycia AI | Zgodność | Strona hackyeah.pl / organizator |

**Już wiadomo z publicznych PDF [JURY]:** układ Mapy Wyzwań (8 obszarów + persony), układ Social Canvas, 9 kategorii Biblioteki, zakres IOSS. Nie czekamy z tym na stoisko.

## 2. Sformułowanie problemu

Trzy hipotezy. Żadna nie jest potwierdzona danymi.

- **H1 — Odkrywalność.** Osoba z problemem nie wie, że w regionie istnieje rozwiązanie, albo nie potrafi go znaleźć, bo nie zna fachowych nazw. [ZAŁ; zgodne z opisem wyzwania]
- **H2 — Przenaszalność.** Po znalezieniu rozwiązania trudno ocenić, czy jego warunki sukcesu (lokal, kompetencje, partnerzy, grupa) są spełnione u pytającego. Kosztem jest nieudane lub porzucone wdrożenie. [ZAŁ; poparte założeniem projektów ROPS „60 przetestowanych, 6 upowszechnionych", które nie jest pomiarem skuteczności]
- **H3 — Ślepa plamka instytucji.** Instytucja nie widzi, jakich rozwiązań ludzie szukają i nie znajdują. [ZAŁ]

**Konsekwencje:** ten sam problem jest wielokrotnie rozwiązywany od zera, dobre rozwiązania pozostają lokalne, a nabory grantowe nie są ukierunkowane na rzeczywiste luki. Raporty ROPS 2024–2026 (opieka, usługi społeczne, piecza, mieszkania wspomagane) [JURY] pokazują skalę deficytów w Małopolsce — to materiał na slajd 1, nie na osobną hipotezę.

**Jak zmierzymy poprawę** (w pilotażu, nie na hackathonie): odsetek zapytań prowadzących do kontaktu lub zgłoszenia testu; czas od zgłoszenia do pierwszej odpowiedzi; liczba wdrożeń zainicjowanych przez platformę. Na hackathonie zmierzymy tylko trafność wyszukiwania na własnym małym zestawie (rozdz. 19).

## 3. Użytkownicy i ich zadania

| Rola [OPIS] | Główne zadanie | Czego się obawia [ZAŁ] | Co dostaje |
|---|---|---|---|
| Mieszkaniec / NGO | Opisać problem albo pomysł | Skomplikowany formularz, brak odpowiedzi | Jedno pole, wyniki z uzasadnieniem, widoczny status |
| JST, CUS | Znaleźć rozwiązanie do wdrożenia | Wdrożenie, które się nie przyjmie; brak czasu | Lista zgodności, szkic planu, kontakt do autora |
| Pracownik ROPS | Zarządzać wiedzą i rozmową | Zalew zgłoszeń, utrzymanie danych | Kolejka, szkice kart do zatwierdzenia, luki i trendy |
| Ekspert / mentor | Doradzać | Brak kontekstu | Zgłoszenie z historią i dopasowaniami |

**Wyszukiwanie jest dostępne bez logowania.** Dane kontaktowe podaje się dopiero przy czynnościach, które ich wymagają.

## 4. Konkurencja i luka [WEB, wstępny przegląd]

Przegląd opiera się na stronach opisowych. Nie testowałem tych produktów w działaniu.

| Rozwiązanie | Co robi | Ograniczenia widoczne w opisie | Co zostaje otwarte |
|---|---|---|---|
| **ChangeX** | Platforma sprawdzonych innowacji połączona z finansowaniem i lokalnymi zespołami | Skala globalna, bez kontekstu polskich instytucji | Dopasowanie do polskiego regionu i instytucji |
| **Social Innovation Match** (UE) | Przykłady inicjatyw z filtrami (typ, kraj, obszar, finansowanie), walidatorzy krajowi | Przeglądanie i filtry, bez oceny przenaszalności do konkretnego miejsca | Ocena przenaszalności |
| **Ashoka Impact Transfer** | Ocena gotowości do replikacji, kojarzenie partnerów | Usługa doradcza z udziałem ekspertów | Narzędzie samoobsługowe |
| **Toolkity Eurocities** | Opracowane materiały transferu dla wybranych innowacji | Kilka wybranych przypadków | Skalowanie na cały katalog |

**Wniosek:** kategoria „katalog sprawdzonych innowacji" jest zajęta. Hipoteza różnicy Szczepa: (1) zestawienie warunków sukcesu innowacji z profilem pytającego, (2) jawne traktowanie braku dopasowania jako informacji dla instytucji, (3) polski kontekst instytucjonalny ROPS. **Nie twierdzę, że żadne narzędzie tego nie robi.**

## 5. Zasada konstrukcji: jeden silnik, siedem widoków

Siedem osobnych aplikacji w 24 godziny przez dwie osoby jest nierealne i tworzy dokładnie tę „odtwórczą integrację", o którą pyta kryterium pomysłowości. Dlatego:

- **Jeden model danych** (karty, problemy, profile, zgłoszenia, wątki, nabory).
- **Jeden silnik dopasowania** (wyszukiwanie, ocena dowodów, lista zgodności).
- **Jeden mechanizm statusów i powiadomień.**
- **Moduły jako widoki** tego samego rdzenia. Każdy z siedmiu modułów ma w prototypie **działającą ścieżkę**, choć o różnej głębokości (rozdz. 9). Punktacja premiuje liczbę dostarczonych modułów, więc pomijanie tanich modułów jest nieopłacalne.

```
┌──────────────┐  ┌─────────────────┐  ┌──────────────────┐
│ Mieszkaniec  │  │ JST / CUS       │  │ ROPS, eksperci   │
└──────┬───────┘  └────────┬────────┘  └────────┬─────────┘
       └──────────┬────────┴─────────────────────┘
                  ▼
        Widoki: moduły I–VII
                  ▼
 ┌────────────────────────────────────────────────────────┐
 │ Silnik: wyszukiwanie · dowody · zgodność · statusy     │
 └───────┬───────────────────┬───────────────────┬────────┘
         ▼                   ▼                   ▼
   Baza (karty,       Model osadzeń +      LLM (wyciąganie pól,
   zgłoszenia, wątki, indeks tekstowy      uzasadnienia, szkice)
   nabory)
```

## 6. Model danych

### 6.1. Karta innowacji

| Pole | Opis | Źródło wartości | Zatwierdzenie admina |
|---|---|---|---|
| `id`, `tytuł`, `streszczenie` | Podstawowe dane | Karta ROPS | — |
| `problemy[]` | Jakie problemy rozwiązuje (tagi + opis) | Karta | tak, jeśli wyciągnięte automatycznie |
| `kategoria_biblioteki` | Jedna z 9 kategorii Biblioteki ROPS [JURY] | Karta / nawigacja | zawsze |
| `obszary_wyzwan[]` | Powiązane obszary z Mapy Wyzwań (1–8) [JURY] | Mapowanie (1.4) + admin | zawsze |
| `grupa_docelowa[]` | Dla kogo | Karta | j.w. |
| `elementy[]` | Z czego składa się innowacja | Karta | j.w. |
| `warunki_wstępne[]` | Czego wymaga wdrożenie (6.2) | Karta; jeśli brak: wyprowadzone z `elementy` i oznaczone jako takie | zawsze |
| `dowody` | Poziom dowodów + opis, gdzie i na ilu osobach testowano | Karta | zawsze |
| `kontakt_autora` | Dane kontaktowe instytucji (nie prywatne) | Karta | zawsze |
| `materiały[]` | Pliki, filmy (z informacją o napisach), linki | ROPS | — |
| `wersja`, `zaktualizowano` | Śledzenie zmian | System | — |

**Reguła:** pole, którego nie ma w źródle, ma wartość „nie podano". System nigdy nie uzupełnia go domysłem.

### 6.2. Warunki wstępne

Każdy warunek ma typ (zasób/lokal, kadra/kompetencja, partner, grupa docelowa, finansowanie, czas), wagę (`konieczny` / `pomocny`), opis oraz cytat z karty. Pole `pochodzenie`: `z karty` albo `wyprowadzone z elementów innowacji`.

**Dlaczego pole `pochodzenie`:** karty ROPS mogą nie zawierać jawnej listy warunków. Wtedy przekształcamy „elementy innowacji" w pytania typu „Czy możecie zapewnić: …?". Użytkownik widzi, że to propozycja do potwierdzenia, a admin zatwierdza listę przed publikacją.

Przykład (syntetyczny): „potrzebny lokal na spotkania raz w tygodniu" — typ: zasób, waga: konieczny, pochodzenie: z karty.

### 6.3. Poziomy dowodów [ZAŁ]

| Poziom | Znaczenie |
|---|---|
| E0 | Pomysł, bez testów |
| E1 | Testowany w mikroskali (mała grupa), zgodnie z etapem testowania w inkubatorach ROPS [WEB] |
| E2 | Testowany z udokumentowaną oceną |
| E3 | Wdrożony w co najmniej dwóch miejscach |

Poziom wynika z danych karty. Jeśli karta go nie określa — „poziom dowodów: nie podano". Model językowy nie nadaje poziomu bez zatwierdzenia admina.

### 6.4. Pozostałe obiekty

- **Zgłoszenie problemu:** opis, rola, opcjonalny kontakt, opcjonalny profil lokalny, czas, status.
- **Profil lokalny:** deklaracja zasobów i warunków (6.5), bez danych osobowych.
- **Dopasowanie:** zgłoszenie ↔ karta, wynik, etykieta pewności, uzasadnienie, lista zgodności.
- **Fiszka pomysłu:** istota, komu dedykowany, na jakim etapie [OPIS]; opcjonalnie pola z Social Canvas [JURY] — lista w 9.2.
- **Wyzwanie:** jeden z 8 obszarów Mapy + krótki opis + linki do raportów + powiązane karty.
- **Zgłoszenie gotowości:** typ (test innowacji, partnerstwo „szukam" / „oferuję", wsparcie eksperckie), obszar, kontakt.
- **Nabór:** nazwa, daty, status aktywny/nieaktywny, pola wymagane wniosku, tematy (do powiadomień). Tworzy go admin.
- **Subskrypcja tematu:** zainteresowanie tematem lub naborem → powiadomienie o nowej karcie, pomyśle lub zmianie naboru.
- **Wątek:** wiadomości powiązane ze zgłoszeniem, dopasowaniem, fiszką lub gotowością; autor (rola), znaczniki czasu.

### 6.5. Profil lokalny

Pytania pojawiają się **dopiero** po kliknięciu „Sprawdź, czy to zadziała u nas", nigdy przed pierwszymi wynikami. Zestaw jest dynamiczny: system pyta tylko o warunki konieczne dla wybranych rozwiązań (maks. 3–5 naraz; odpowiedzi „tak / nie / nie wiem"). „Nie wiem" daje „do sprawdzenia", nie „brak".

**Dane publiczne jako uzupełnienie [JURY] [ZAŁ].**

1. **IOSS (Obserwator ROPS)** — preferowane źródło dla Małopolski: wskaźniki gmin/powiatów, Portret gminy, eksport XLS [JURY]. W MVP: ręczny snapshot dla 1–2 gmin demo, np. udział osób 65+, beneficjenci pomocy społecznej, dzieci w pieczy zastępczej (dobór do scenariusza). Bez live API.
2. **GUS BDL** — zapas, gdy IOSS nie ma wskaźnika [WEB]. Limity zapytań API bywają niskie; dane pobrać jednorazowo i zapisać lokalnie.

**W MVP profil opiera się głównie na deklaracji użytkownika.** Snapshot IOSS pokazujemy przy „Sprawdź, czy to zadziała u nas" jako kontekst („w Waszej gminie…"), nie jako automatyczną odpowiedź na warunki wdrożenia.

## 7. Matchmaking społeczny (moduł I, obowiązkowy)

### 7.1. Cel i kryterium sukcesu

„Czy narzędzie skutecznie sugeruje istniejące innowacje na podstawie słów kluczowych wpisanych w opisie potrzeb użytkownika?" [OPIS]. Jury prawdopodobnie wpisze **krótkie, potoczne hasła**, np. „samotność seniorów", „dzieci w kryzysie", „tłumacz migowy". Matchmaking musi działać dla takich zapytań, a nie tylko dla zdań w języku karty.

### 7.2. Potok przetwarzania

1. **Normalizacja:** małe litery, maskowanie danych osobowych (7.5), podstawowa lematyzacja lub stemming dla polskiego.
2. **Wyszukiwanie tekstowe** (słowa kluczowe i fraza, z odmianą) po polach karty.
3. **Wyszukiwanie semantyczne:** wielojęzyczny model osadzeń. Kandydat: BGE-M3, model open source obsługujący ponad 100 języków, dostępny m.in. w rejestrze Ollama; według opisu na licencji MIT [WEB — licencję potwierdzić na karcie modelu]. Karty indeksujemy z wyprzedzeniem. Liczba kart (rząd 200) jest tak mała, że **osobna baza wektorowa nie jest potrzebna**.
4. **Połączenie wyników** (np. ważona suma rang). Wagi dobieramy na zestawie testowym (rozdz. 19), nie „na oko".
5. **Ocena dowodów i etykieta pewności** (7.3).
6. **Uzasadnienie** z cytatem (7.4).
7. **Lista zgodności** (rozdz. 8), jeśli użytkownik poda profil.
8. **Flaga możliwej luki** (7.6).

### 7.3. Etykieta pewności

Trzy poziomy: **wysoka / średnia / niska**. Wyznaczane z: wyniku najlepszego dopasowania, różnicy względem kolejnych oraz zgodności obu metod wyszukiwania. Progi dobieramy na zestawie testowym. **Etykieta nie jest prawdopodobieństwem.** Użytkownik widzi słowa („mocne", „możliwe", „słabe dopasowanie"), nie procenty.

### 7.4. Uzasadnienie z cytatem

Dla każdego wyniku:

- **Dlaczego pasuje:** 1–2 zdania.
- **Cytat z karty** (krótki, z miejscem w karcie).
- **Czego nie wiemy:** pola „nie podano", które mają znaczenie.
- **Dowody:** poziom E0–E3 z jednozdaniowym opisem.

Generator dostaje tylko wybrane pola karty i polecenie, by nie dodawać faktów spoza nich. Po wygenerowaniu **automatycznie sprawdzamy, czy cytat występuje w karcie**. Jeśli nie — pokazujemy sam fragment karty, bez generowanego uzasadnienia.

### 7.5. Ochrona danych w zapytaniach

Opis problemu może zawierać dane osobowe wpisane przez nieuwagę. Przed zapisem lub wysłaniem do modelu zewnętrznego maskujemy numery telefonów, adresy e-mail, PESEL (z kontrolą sumy) i numery rachunków. Nazwiska i adresy w tekście swobodnym wykrywamy tylko częściowo, więc przy polu stoi komunikat: „Nie wpisuj danych innych osób". Ograniczenie jest jawnie opisane w dokumentacji.

### 7.6. Możliwa luka zamiast „brak wyników"

Jury, widząc „brak dopasowania", może uznać to za błąd. Dlatego:

- Użytkownik **zawsze** widzi trzy najbliższe wyniki z etykietami.
- Jeśli najlepszy wynik ma etykietę „słabe", pod wynikami pojawia się komunikat: „Nie znaleźliśmy mocnego dopasowania. Opisz problem dokładniej albo zgłoś potrzebę do ROPS." Zgłoszenie zapisuje się jako **możliwa luka**.
- W panelu admina luki są grupowane (klasteryzacja po osadzeniach) i pokazane jako ranking: temat, liczba zgłoszeń, rozrzut lokalizacji, zanonimizowane przykłady.
- Admin ocenia, czy to luka w Bibliotece, czy błąd wyszukiwania (wtedy poprawia słownictwo lub kartę).

### 7.7. Zachowanie w przypadkach brzegowych

| Sytuacja | Zachowanie |
|---|---|
| Zapytanie 1–2 słowa | Wyniki + prośba o doprecyzowanie |
| Zapytanie bardzo długie lub chaotyczne | Skrót do fraz kluczowych (LLM) z pokazaniem, co zrozumiano |
| Zapytanie spoza obszaru (np. porada medyczna) | Komunikat o zakresie platformy i wskazanie, że to nie miejsce na pomoc w kryzysie [ZAŁ: treść do ustalenia z ROPS] |
| Zapytanie sygnalizujące zagrożenie życia | Natychmiast informacja o numerach alarmowych przed wynikami [ZAŁ: numery do potwierdzenia]; brak odpowiedzi generowanej przez AI |
| Awaria LLM | Wyniki z pól karty, bez generowanego uzasadnienia; widoczna informacja o trybie ograniczonym |
| Awaria osadzeń | Wyszukiwanie tekstowe z komunikatem |

## 8. Dopasowanie transferowe — „czy to u nas zadziała"

### 8.1. Co to jest, a czym nie jest

To **lista kontrolna**: warunki wstępne karty zestawione z odpowiedziami użytkownika.

| Warunek | Odpowiedź | Wynik |
|---|---|---|
| konieczny | tak | spełniony |
| konieczny | nie | brak |
| konieczny | nie wiem | do sprawdzenia |
| pomocny | nie | uwaga (nie blokuje) |

Wynik: trzy sekcje — **Macie to · Brakuje · Do sprawdzenia** — i jedno zdanie podsumowania. Warunki `wyprowadzone z elementów` są oznaczone jako propozycja.

**To nie jest model predykcyjny.** Nie mamy danych, że takie reguły przewidują powodzenie. W interfejsie i w prezentacji mówimy „kontrola warunków", nie „prognoza sukcesu". Żadnych procentów.

### 8.2. Dlaczego i tak jest wartościowe

Lista oszczędza pytającemu pierwszą rozmowę z ROPS, a ROPS widzi, jakich warunków brakuje najczęściej (informacja przydatna przy planowaniu naborów).

### 8.3. Główne ograniczenie

Jakość listy zależy od jakości warunków w kartach. Dlatego każda karta przechodzi zatwierdzenie człowieka (rozdz. 11).

## 9. Moduły I–VII: zakres, głębokość, koszt i stawka punktowa

**Zasada:** każdy moduł ma w prototypie ścieżkę, którą jury może przejść od początku do końca i zobaczyć skutek w panelu admina. „Cienki" oznacza mały zakres, ale działający, nie makietę.

Szacunki godzin to moje założenia [ZAŁ] dla dwóch osób pracujących z asystą AI. „Stawka" to udział w maksymalnej łącznej ocenie przy założeniu wzoru 10% + 5% za moduł z [OPIS]; faktyczna ocena zależy też od jakości działania.

| # | Moduł [OPIS] | Minimalna wersja rzeczywista | Głębokość | Godz. [ZAŁ] | Stawka |
|---|---|---|---|---|---|
| I | Matchmaking | Rozdz. 7 i 8 | **pełny** | 9 | 10% + jakość |
| II | Zasobnik wiedzy | Siatka tematów, strona karty z filmem i materiałami, widok „Wyzwania Małopolski" z dostępnych danych, **trendy potrzeb dla admina**, szybka edycja treści | średni | 3 | 5% |
| III | Kreator pomysłów | Fiszka (3 pola), pola kanwy, **generator wniosku w aktywnym naborze** (rozdz. 9.2), podpowiedź „podobne rozwiązania istnieją" | średni | 3,5 | 5% |
| IV | Tester innowacji | Zgłoszenie chęci testu, ocena i uwagi, propozycja usprawnienia, lista dla admina | cienki | 1,5 | 5% |
| V | Platforma komunikacji | Wątki, statusy, powiadomienia admina, szablony odpowiedzi, „Zapytaj mentora", tablica partnerstw „szukam / oferuję" | **średni–pełny** | 5 | 5% |
| VI | Panel admina | Kolejka, zatwierdzanie kart ze szkicu, luki, trendy, zarządzanie naborami | średni | 5 | 5% |
| VII | Middleman Innowacji | Szkic planu wdrożenia z cytatami | średni | 3 | 5% |

**Najtańsze punkty** to moduły IV i II (1,5 h i 3 h za 5% każdy). W wersji 1 proponowałem je ciąć jako pierwsze — to był błąd. Wzór punktacji sprawia, że cienki, ale działający moduł jest opłacalny.

### 9.1. Moduł II — zasobnik wiedzy

- **Strona główna Zasobnika:** siatka **9 kategorii Biblioteki** [JURY] z liczbą kart (nie luźne tagi).
- **„Karta w 60 sekund":** na jednym ekranie: problem, dla kogo, co robi, dowody, warunki, kategoria, powiązane wyzwania, kontakt, film. To nasza odpowiedź na „ciekawą, pomysłową, ale dostępną formę prezentacji" [OPIS]. Film osadzony z transkrypcją tekstową (jeśli ROPS dostarczy napisy).
- **„Wyzwania Małopolski":** 8 obszarów z Mapy Wyzwań [JURY]. Dla każdego: skrót kluczowych wyzwań, persona (cele/motywacje — do scenariuszy demo), linki do raportów ROPS (priorytet: tabela w 1.4), powiązane kategorie Biblioteki. **Nie budujemy GIS** — Mapa to taksonomia + treści, nie warstwa mapowa. Nota w UI: „dane Mapu = ogólnopolskie; diagnoza regionalna = raporty ROPS i IOSS".
- **Mapowanie wyzwanie → kategorie Biblioteki** (do filtrów i matchmakingu):

| Obszar Mapy [JURY] | Kategorie Biblioteki [JURY] |
|---|---|
| Rodzina i piecza zastępcza | Dzieci, młodzież i rodziny |
| Bezdomność | Kryzys bezdomności |
| Niepełnosprawność | Niepełnosprawność intelektualna / sensoryczna / ograniczona mobilność |
| Ubóstwo | Rynek pracy (+ często kryzys bezdomności) |
| Integracja cudzoziemców | Cudzoziemcy |
| Zdrowie | Zdrowie i medycyna |
| Zdrowie psychiczne | Zdrowie i medycyna (+ dzieci/młodzież lub seniorzy zależnie od persony) |
| Seniorzy | Seniorzy |

- **Publikacje IS** [JURY]: sekcja „Czytelnia" z trzema publikacjami ze świata innowacji (linki, bez pełnego OCR).
- **Szybka aktualizacja treści** [OPIS]: panel admina z edycją pól i wersjonowaniem (rozdz. 11).
- **Trendy potrzeb (tylko admin)** [OPIS]: zgłoszenia agregowane po 8 obszarach Mapy, z liczbą w tygodniach (rozdz. 11). Opcjonalnie: porównanie z 1 wskaźnikiem IOSS dla gminy demo.

### 9.2. Moduł III — kreator pomysłów i generator wniosków

- **Fiszka:** trzy pola z opisu (istota, komu dedykowany, etap realizacji) [OPIS]. Po wysłaniu: numer zgłoszenia, potwierdzenie, status.
- **Kanwa (Social Canvas)** [JURY: PDF INNO AGH]: układ jest znany. W MVP opcjonalna sekcja po trzech polach obowiązkowych — **maks. 7 pól**, reszta w rozwoju:

| Pole Canvas | W fiszce MVP? | Uwaga |
|---|---|---|
| Problem: intensywność / częstotliwość / skala | tak (3 przełączniki) | Skale z PDF |
| Gotowość rozwiązania (pomysł → gotowe do wdrożenia) | tak | Zgodne z poziomami E0–E3 |
| Aktorzy wspierający / utrudniający | tak (2 listy krótkie) | Wejście do Middlemana i partnerstw |
| Odbiorca główny + płatnik | tak | |
| Propozycja wartości (2–3 tagi) | tak | Emocjonalna / funkcjonalna z listy Canvas |
| Koszty stałe/zmienne, kanały, wpływ, skalowanie dochodu | nie w MVP | Rozwój / asystent kreatora |

- **Podpowiedź „podobne rozwiązania":** po wpisaniu istoty pomysłu pokazujemy podobne karty (i opcjonalnie obszar Mapy).
- **Generator wniosku — wersja minimalna, rzeczywista.** Admin tworzy **nabór** (nazwa, daty, pola wniosku, status aktywny). Tylko gdy nabór jest aktywny, w kreatorze pojawia się przycisk „Przygotuj wniosek do naboru…". System przenosi dane z fiszki (w tym wypełnione pola kanwy) do pól wniosku zdefiniowanych dla tego naboru (to spełnia „każdorazowo modyfikowany do konkretnego naboru" [OPIS]) i tworzy **wersję roboczą do pobrania**. **Nie wysyła niczego do systemów ROPS.** Format pól konkretnego naboru jest hipotetyczny, więc w demo używamy naboru syntetycznego i tak go oznaczamy.
- **Asystent kreatora** (mile widziany [OPIS]): w MVP tylko, jeśli zostanie czas, jako dopytywanie o brakujące elementy fiszki/kanwy. Wizualizacja pomysłu poza zakresem.

### 9.3. Moduł IV — tester

- Na stronie karty: „Chcę przetestować" (obszar, rola, kontakt), ocena rozwiązania (skala + komentarz) i pole „Proponuję usprawnienie".
- Dla admina: lista chętnych i uwag per karta.
- **Nie pokazujemy zbiorczych ocen** w demo, bo dane są syntetyczne i uśrednianie wprowadzałoby w błąd.

### 9.4. Moduł V — komunikacja, mentorzy, partnerstwa

Szczegóły przepływu w rozdz. 10. Elementy, które spełniają zapis „wsparcie od mentorów oraz budowanie międzysektorowych partnerstw" [OPIS]:

- **„Zapytaj mentora":** pytanie trafia do kolejki ekspertów z kontekstem (zgłoszenie, dopasowania).
- **Tablica partnerstw:** wpisy „szukam partnera do…" i „oferuję wsparcie w…", z filtrem tematu; kontakt przez platformę, bez publikowania prywatnych danych.

### 9.5. Moduł VII — Middleman innowacji

**Cel [OPIS]:** dostosowanie innowacji do formy usługi według potrzeb instytucji zgłaszającej się.

**Wejście:** karta innowacji + krótki profil instytucji (typ, wielkość, grupa, zasoby).
**Wyjście:** szkic dokumentu:

1. Cel i grupa odbiorców.
2. Kroki wdrożenia.
3. Zasoby potrzebne i dostępne (z listy zgodności).
4. Partnerzy lokalni (z tablicy partnerstw, jeśli są).
5. Ryzyka i pytania otwarte.
6. Czego nie wiemy z karty i z kim to ustalić.

**Zasady:** każde zdanie opiera się na polu karty albo jest oznaczone jako propozycja asystenta; koszty, terminy i liczby tylko jeśli występują w karcie; szkic jest oznaczony „Wersja robocza wygenerowana przez AI — do weryfikacji"; platforma **nie sprawdza zgodności z prawem** i tak to komunikuje. Wariant awaryjny bez AI: szablon sekcji wypełniony polami karty.

## 10. Komunikacja i statusy

„W jaki sposób system powiadamia administratora o nowym pomyśle i jak wygląda ścieżka odpowiedzi do autora?" [OPIS]. **Szybkość odpowiedzi zależy od ludzi w ROPS, nie od oprogramowania.** Platforma zapewnia: natychmiastowe potwierdzenie, widoczność kolejki i mniejszy wysiłek odpowiedzi.

### 10.1. Statusy zgłoszenia

```
Nowe ──► Przyjęte (automatycznie) ──► W ocenie ──► Odpowiedziano ──► Zamknięte
                                          │
                                          └──► Przekazane do eksperta ──► Odpowiedziano
```

Każda zmiana zapisuje: kto, kiedy, jaki status. Autor widzi oś czasu zgłoszenia.

### 10.2. Powiadomienia

| Zdarzenie | Odbiorca | Kanał w MVP | Uwagi |
|---|---|---|---|
| Nowe zgłoszenie lub fiszka | Admin | Licznik i lista w panelu; e-mail tylko jeśli skonfigurujemy realną wysyłkę | Inaczej oznaczone jako **symulacja** |
| Potwierdzenie przyjęcia | Autor | Ekran + opcjonalnie e-mail | Natychmiastowe |
| Odpowiedź admina | Autor | Status w widoku zgłoszenia + e-mail | |
| Przekazanie do eksperta | Ekspert | Panel eksperta | Rola demonstracyjna |
| Nowa karta / zmiana naboru w subskrybowanym temacie | Subskrybent | Lista powiadomień + opcjonalnie e-mail | Spełnia „automatyzację powiadamiania o zmianach w naborach" [OPIS] |

### 10.3. Redukcja wysiłku admina

- **Wstępna klasyfikacja:** temat, grupa, podobne karty i wcześniejsze zgłoszenia (propozycja, nie decyzja).
- **Szablony odpowiedzi** z uzupełnionymi polami (karta, kontakt autora).
- **Wskaźnik czasu oczekiwania** w kolejce; docelowy czas ustala ROPS.

### 10.4. Czego nie obiecujemy

Nie podajemy liczb typu „odpowiedź w X godzin". Pokazujemy, że ścieżka jest **mierzalna** (znaczniki czasu, kolejka) i że ROPS może ustawić własne cele.

### 10.5. Moderacja i nadużycia

- Zgłoszenia publiczne nie są wyświetlane innym użytkownikom bez zatwierdzenia admina.
- Limity zgłoszeń z jednego adresu; pole pułapka przeciw botom (bez CAPTCHA wymagającej obrazów, ze względu na dostępność).
- Wpisy na tablicy partnerstw przechodzą moderację.

## 11. Panel administratora (moduł VI)

### 11.1. Widoki

1. **Kolejka zgłoszeń:** filtr statusu, tematu, daty; znacznik „możliwa luka".
2. **Wczytywanie kart:** admin wrzuca PDF lub wkleja tekst; system (LLM) wyciąga pola jako **szkic**; admin widzi szkic obok oryginału, poprawia i zatwierdza; dopiero po zatwierdzeniu karta jest publiczna i indeksowana.
3. **Luki:** klastry zgłoszeń bez dobrego dopasowania (liczba, temat, przykłady).
4. **Trendy potrzeb** [OPIS: widoczne wyłącznie dla administratora]: liczba zgłoszeń per obszar tematyczny per tydzień, z porównaniem do poprzedniego okresu. Wykres z tabelą tekstową jako równoważnikiem.
5. **Najczęściej brakujące warunki:** jakich warunków wstępnych użytkownicy najczęściej nie spełniają.
6. **Nabory:** tworzenie, daty, pola wniosku, aktywacja.
7. **Zarządzanie treścią:** edycja kart, wersje, dezaktywacja.

Panel admina także musi spełniać WCAG 2.1 AA.

### 11.2. Dlaczego wczytywanie przez szkic

Automatyczne wyciąganie pól z PDF będzie czasem błędne (źle rozpoznana tabela, pominięty warunek). Błąd na etapie karty psuje wyszukiwanie, listę zgodności i szkic Middlemana. Zatwierdzenie człowieka jest częścią projektu, a nie opcją.

### 11.3. Wersjonowanie

Każde zatwierdzenie tworzy nową wersję karty z datą i autorem. Zgłoszenia i dopasowania odnoszą się do konkretnej wersji, więc po aktualizacji widać, które dopasowania mogą być nieaktualne.

## 12. Zastosowanie sztucznej inteligencji

### 12.1. Role i granice

| Zastosowanie | Wejście | Wyjście | Weryfikacja | Zachowanie przy błędzie |
|---|---|---|---|---|
| Osadzenia i wyszukiwanie semantyczne | Zapytanie, karty | Wektory, ranking | Zestaw testowy | Wyszukiwanie tekstowe |
| Wyciąganie pól z karty (szkic) | PDF/tekst karty | Pola 6.1 + cytaty | **Zatwierdzenie admina** | Admin wypełnia ręcznie |
| Uzasadnienie dopasowania | Pola karty + zapytanie | 1–2 zdania + cytat | Automatyczne sprawdzenie cytatu | Sam fragment karty |
| Streszczenie długiego zapytania | Opis | Frazy kluczowe | Użytkownik widzi, co zrozumiano | Oryginalny tekst |
| Klasteryzacja luk i trendów | Zgłoszenia | Grupy tematyczne | Przegląd admina | Lista chronologiczna |
| Middleman | Karta + profil | Szkic z sekcjami | Cytaty, oznaczenie „do weryfikacji" | Szablon sekcji z polami karty |
| Tryb prostego tekstu | Opis karty | Uproszczony opis | Oznaczenie „uproszczone automatycznie" | Oryginalny tekst |

### 12.2. Zasady

1. AI **nie tworzy faktów o innowacjach**. Odpowiada wyłącznie na podstawie zatwierdzonych kart.
2. AI **nie podejmuje decyzji** o zgłoszeniach, grantach ani dopuszczeniu treści.
3. Treści generowane są oznaczone w interfejsie.
4. Każda funkcja AI ma tryb awaryjny, więc platforma działa bez modelu.
5. Nie ma ogólnego chatbota. AI jest wbudowana w konkretne kroki.

### 12.3. Wybór modeli — decyzje na miejscu

- **Osadzenia:** BGE-M3 lokalnie (CPU lub GPU). Do sprawdzenia: czas osadzenia zapytania na serwerze demo i jakość dla polskiego tekstu. Alternatywa: osadzenia przez API zewnętrzne.
- **LLM:** dwie ścieżki.
  - *Zewnętrzne API:* wyższa jakość, szybkie uruchomienie, koszt zmienny (rozdz. 18); dane zapytań opuszczają serwer.
  - *Model lokalny:* prywatność i brak kosztu zmiennego; wolniejszy i słabszy w polskim; ryzyko dla demo online.
  - **Rekomendacja robocza [ZAŁ]:** zewnętrzne API w demo, z maskowaniem danych i z **limitem dziennych wydatków oraz limitem zapytań na adres** (publiczne demo z płatnym API można nadużyć). W dokumentacji — ścieżka lokalna jako opcja wdrożeniowa.
- **Warunek wstępny:** zgoda ROPS na przekazywanie ich materiałów do zewnętrznego modelu (pytanie w 1.5). Bez niej — tylko dane syntetyczne i publicznie dostępne treści w ścieżce zewnętrznej.
- **Regulamin HubMI** (przeczytany w części dotyczącej oceny, praw i danych) nie zawiera zakazu płatnych API ani zapisu o ujawnianiu użycia AI. Ogólny regulamin Hackathonu może mieć własne wymogi — nie znam go. Mimo to przygotowujemy plik `AI_USE.md` z opisem, jak AI była użyta w kodzie i w produkcie.

## 13. Dostępność i prostota użycia

**WCAG 2.1 poziom AA jest wymogiem regulaminu (§5) i opisu wyzwania.** To 20% oceny („Dostępność i intuicyjność prototypu") oraz część oceny makiet. Obejmuje także panel admina.

### 13.1. Zasady interfejsu

- **Jeden ekran startowy, jedna czynność:** duże pole „Opisz problem" i przycisk.
- Maks. trzy pytania doprecyzowujące naraz; odpowiedzi „tak / nie / nie wiem".
- Układ mobilny jako pierwszy (seniorzy często korzystają z telefonu); duże elementy dotykowe.
- Informacja nigdy nie jest przekazywana samym kolorem (etykiety słowne przy pewności i zgodności).
- Błędy opisane słowami z podpowiedzią naprawy.
- Brak limitów czasu na wypełnianie formularza.
- Czcionki hostowane lokalnie, bez zewnętrznych CDN (prywatność i niezawodność).
- Wszystkie filmy z napisami i transkrypcją. Filmy ROPS bez napisów oznaczamy jako brak i zgłaszamy administratorowi.

### 13.2. Mapa kryteriów WCAG 2.1, które sprawdzamy

Numeracja według WCAG 2.1; **przed złożeniem zweryfikować w oficjalnej specyfikacji W3C.**

| Obszar | Kryteria sukcesu | Co robimy |
|---|---|---|
| Alternatywy tekstowe | 1.1.1 | Opisy obrazów; wykresy z tabelą; mapa z listą |
| Filmy | 1.2.2 (napisy), 1.2.5 (audiodeskrypcja AA) | Napisy i transkrypcja; wskazanie braków w materiałach ROPS |
| Struktura | 1.3.1, 1.3.4, 1.3.5 | Semantyczny HTML, etykiety, `autocomplete`, brak blokady orientacji |
| Kolor i kontrast | 1.4.1, 1.4.3, 1.4.11 | Kontrast tekstu 4,5:1, elementów interfejsu 3:1; weryfikacja narzędziem |
| Skalowanie | 1.4.4, 1.4.10, 1.4.12, 1.4.13 | 200% bez utraty treści; reflow do 320 px; odstępy tekstu; treść na hover/focus |
| Klawiatura | 2.1.1, 2.1.2 | Pełna obsługa, brak pułapek fokusu |
| Nawigacja | 2.4.1, 2.4.2, 2.4.3, 2.4.6, 2.4.7, 3.2.3, 3.2.4 | Link „przejdź do treści", tytuły stron, kolejność, widoczny fokus, spójna nawigacja |
| Język | 3.1.1 | `lang="pl"` |
| Formularze | 3.3.1, 3.3.2, 3.3.3 | Etykiety, opis błędu, sugestia poprawy |
| Programowa dostępność | 4.1.2, 4.1.3 | Role i nazwy; komunikaty statusu (np. „przyjęto zgłoszenie") ogłaszane czytnikom |

### 13.3. Tryb prostego języka

Przełącznik „Prosty tekst" upraszcza opis karty i wyniki. ROPS sam publikuje materiały w łatwym tekście [WEB], więc to naturalne rozszerzenie. Tekst jest generowany z karty, oznaczony („Uproszczone automatycznie") i **nie zastępuje certyfikowanego łatwego tekstu**.

### 13.4. Jak będziemy to sprawdzać

1. Automatyczny audyt (np. axe lub Lighthouse) na kluczowych ekranach, **wynik w prezentacji**.
2. Ręcznie: pełna ścieżka tylko klawiaturą, powiększenie 200%, widok mobilny.
3. Test z czytnikiem ekranu dostępnym w systemie.
4. **Jeśli się uda:** krótki test z 2–3 osobami spoza branży IT na miejscu (np. 5 minut: „znajdź rozwiązanie dla…"). To nie jest badanie reprezentatywne i tak go opisujemy.

Zgłaszamy: „sprawdzone automatycznie i ręcznie, bez testów z osobami z niepełnosprawnościami", dopóki takie testy faktycznie się nie odbędą.

## 14. Interfejs i makiety (10% + wymóg zgłoszenia)

Kryterium premiujące „atrakcyjność, pomysłowość i jakość interfejsu" (10%) ocenia **nowatorskie, nieszablonowe podejście oraz wizualną atrakcyjność makiet UX/UI** [REG]. Makiety są też wymogiem zgłoszenia [OPIS].

### 14.1. Kierunek wizualny [ZAŁ]

- **Spokojny, czytelny, publiczny** — nie „startupowy". Odbiorcy to samorządy i seniorzy.
- Jedna paleta z tokenami kolorów, każda para tekst/tło z weryfikowanym kontrastem; tryb ciemny opcjonalny.
- Krój pisma z dobrą czytelnością, hostowany lokalnie; bazowo duża czcionka.
- Znak: pędowy motyw szczepu (łączenie dwóch elementów), użyty oszczędnie.

### 14.2. Elementy „nieszablonowe", które są funkcjonalne

- **Ścieżka czterech kroków** (Opisz → Dopasuj → Sprawdź → Wdróż) widoczna na każdym ekranie wyników jako wskaźnik postępu.
- **Karta w 60 sekund** zamiast długiej karty PDF.
- **Trzy sekcje zgodności** (Macie to · Brakuje · Do sprawdzenia) jako główny element wizualny wyniku.
- **Luka pokazana otwarcie**, jako zaproszenie do zgłoszenia potrzeby, a nie jako błąd.

### 14.3. Ekrany do makiet (komplet, nie wszystkie muszą być w pełni klikalne)

1. Strona główna: pole „Opisz problem". 2. Wyniki: trzy karty z etykietami. 3. Karta w 60 sekund. 4. Sprawdzenie warunków (pytania). 5. Lista zgodności. 6. Szkic Middlemana. 7. Fiszka pomysłu. 8. Wniosek do naboru. 9. Zgłoszenie testu. 10. Wątek i status. 11. Panel admina: kolejka. 12. Panel admina: luki i trendy. Dodatkowo wersja mobilna ekranów 1–3.

Format: eksport do PDF/PNG dołączony do zgłoszenia oraz dostępny jako link; czas realizacji ok. 2 godzin [ZAŁ].

## 15. Bezpieczeństwo, prywatność, odpowiedzialność

### 15.1. Dane

- **W demo:** wyłącznie dane syntetyczne i materiały udostępnione przez ROPS, **bez prawdziwych danych osobowych** [OPIS]. Dane syntetyczne mają widoczny baner „Dane przykładowe".
- **Minimalizacja:** wyszukiwanie bez logowania; kontakt tylko przy zgłoszeniach.
- **Retencja [ZAŁ]:** zgłoszenia przechowywane przez określony czas, potem anonimizacja; usunięcie na żądanie. Okresy ustala administrator danych (ROPS).
- **Dostęp:** role (publiczny, ekspert, admin). W demo — konta demonstracyjne wyraźnie oznaczone, dane syntetyczne, możliwość resetu stanu. Dane logowania podajemy w opisie zgłoszenia dla jury.
- **Środowisko produkcyjne:** wymaga umów powierzenia z dostawcami, oceny skutków dla ochrony danych, wyboru lokalizacji danych. Poza zakresem hackathonu.

### 15.2. Zagrożenia i środki

| Zagrożenie | Środek |
|---|---|
| Dane osobowe w opisie problemu | Maskowanie, komunikat przy polu, brak publikacji bez zatwierdzenia |
| Wstrzyknięcie poleceń do LLM przez tekst zgłoszenia lub PDF | Rozdzielenie danych od instrukcji, wyjście ograniczone do pól strukturalnych, sprawdzanie cytatów, model nie wykonuje akcji |
| Złośliwe lub błędne karty | Każda karta zatwierdzana przez admina |
| Spam i nadużycie płatnego API | Limity na adres i dzienny limit wydatków, pole pułapka, wyłącznik awaryjny przełączający na tryb bez AI |
| Wyciek sekretów | Klucze w zmiennych środowiskowych, nie w kodzie ani w repozytorium |
| Błędne dopasowanie niosące szkodę | Zakres platformy, oznaczenia, kontakt z człowiekiem |
| Użytkownik w kryzysie wpisuje zgłoszenie | Komunikat o zakresie i informacja o pomocy (7.7) |

### 15.3. Zgodność prawna — do sprawdzenia

RODO (administrator, podstawa prawna, powierzenie), wymogi dostępności cyfrowej dla podmiotów publicznych, wymogi przejrzystości dotyczące AI. **Nie jestem prawnikiem i niczego tu nie rozstrzygam.**

## 16. Zgodność z regulaminem, prawa autorskie, publikacja

### 16.1. Wzór umowy przeniesienia praw — co wynika z treści [UMOWA]

Twórcy oświadczają m.in., że utwór: został wykonany osobiście; **nie został dotychczas opublikowany, a jedynie udostępniony na potrzeby oceny**; nie stanowi opracowania cudzego dzieła; nie jest obciążony prawami osób trzecich. Twórcy pokrywają koszty i odszkodowania, jeśli zapewnienia okażą się nieprawdziwe. Organizator ma prawo do **pierwszej publikacji** i decyduje o oznaczeniu autorstwa. Twórcy dostarczają kod źródłowy wraz z **kompletnym wykazem narzędzi, bibliotek i innych elementów** potrzebnych do uruchomienia, bez zabezpieczeń utrudniających odczyt.

To przenosi na nas konkretne obowiązki robocze (nie jest to porada prawna):

| # | Zasada | Konsekwencja dla pracy |
|---|---|---|
| 1 | **Nie publikować projektu publicznie przed rozstrzygnięciem** | Repozytorium prywatne, udostępnione organizatorowi lub jury przez zaproszenie lub archiwum; demo pod niepublicznym adresem z `noindex`; brak postów w mediach społecznościowych; film jako link niepubliczny **po potwierdzeniu u organizatora**, bo opis wyzwania mówi o „otwartym repozytorium" (pytanie w 1.5) |
| 2 | Praca „osobiście", bez cudzego dzieła | Nie przynosimy własnego kodu spoza hackathonu; używamy tylko publicznych bibliotek na ich licencjach |
| 3 | Wykaz bibliotek i narzędzi | Plik `THIRD_PARTY.md`: nazwa, wersja, licencja, rola (w tym modele, np. osadzenia i LLM); lista generowana narzędziem z menedżera pakietów |
| 4 | Kod do uruchomienia przez osobę trzecią | `README` po polsku, `docker-compose`, `.env.example`, brak sekretów w repozytorium, brak obfuskacji |
| 5 | Użycie AI przy pisaniu kodu | Opis w `AI_USE.md`. Czy asysta AI jest zgodna z oświadczeniem „wykonany osobiście", rozstrzyga organizator — zapytać |
| 6 | Treści ROPS w demo | Używamy materiałów udostępnionych uczestnikom; oznaczamy źródło |
| 7 | Poufność | Umowa zawiera zobowiązanie do poufności; nie ujawniamy jej postanowień |

### 16.2. Skutki strategiczne

- Przeniesienie praw dotyczy **nagrodzonych** rozwiązań i następuje przy wypłacie nagrody. Odmowa zawarcia umowy oznacza rezygnację z nagrody [REG]. **Decyzję podejmujecie przed startem.** Jeśli planujecie komercjalizację Szczepa, ten konkurs jest niezgodny z tym planem.
- Nagroda dzielona na członków zespołu; przy dwóch osobach po połowie, po potrąceniu podatków.

### 16.3. Sprzęt i sieć

Praca stacjonarna na własnym sprzęcie [REG]. Sieć w hali może być przeciążona. Środki: lokalna kopia całej aplikacji uruchamialna jednym poleceniem, nagrane demo jako zapas (jawnie oznaczone jako nagranie), hotspot z telefonu, pamięć podręczna wyników **tylko** w trybie awaryjnym i oznaczona.

## 17. Architektura techniczna (propozycja)

Zasada: jedna aplikacja, prosta i możliwa do utrzymania przez małą instytucję. Mikroserwisów nie używamy.

| Warstwa | Propozycja [ZAŁ] | Uzasadnienie |
|---|---|---|
| Frontend | Aplikacja webowa z renderowaniem po stronie serwera lub lekki framework; semantyczny HTML jako baza | Dostępność, szybkość |
| Backend | Jedna aplikacja z modułami: wyszukiwanie, karty, zgłoszenia, wątki, nabory, administracja | Szybkie prototypowanie, jedno wdrożenie |
| Baza | PostgreSQL lub SQLite; wektory ~200 kart w bazie lub pamięci | Prostota |
| Wyszukiwanie tekstowe | Pełnotekstowe wyszukiwanie bazy + polska normalizacja | Brak dodatkowej usługi |
| Osadzenia | BGE-M3 lub inny wielojęzyczny; wektory liczone przy zatwierdzaniu karty | Indeksowanie z wyprzedzeniem |
| LLM | Interfejs zamienny (zewnętrzne API / lokalny) | Możliwość zmiany dostawcy |
| Powiadomienia | Warstwa abstrakcji; w MVP panel + opcjonalnie e-mail | Prosta wymiana kanałów |
| Hosting | Jeden serwer lub platforma kontenerowa; niepubliczny adres dema | Wymóg zgłoszenia + zasada niepublikowania |
| Repozytorium | **Prywatne**, udostępnione zgodnie z 16.1 | Oświadczenie z umowy |

### 17.1. Skalowalność i integracje [OPIS]

- **Dane z całego województwa:** wolumen kart (setki) i zgłoszeń (tysiące rocznie) jest mały. Wąskim gardłem będzie jakość danych i praca moderatorów, nie technologia.
- **Duża liczba użytkowników:** obciążenie to głównie model osadzeń i LLM. Środki: pamięć podręczna popularnych zapytań, kolejka dla szkiców, limity. Testów obciążeniowych na hackathonie nie zrobimy; opiszemy to jako ograniczenie.
- **Integracja z innymi systemami Hubu (np. bazą grantową):** otwarte API (odczyt kart, zapis zgłoszeń), webhooki, eksport CSV/JSON. W MVP: eksport i prosty webhook, jeśli starczy czasu. Format bazy grantowej nieznany.
- **Elastyczność:** tematy, pola kart i pola naborów konfigurowane z panelu, bez zmiany kodu [ZAŁ].

## 18. Koszt utrzymania i zasoby

Wymóg [OPIS] i część kryterium potencjału wdrożeniowego („wysoka efektywność kosztowa i prostota utrzymania" [REG]). Poniżej model z jawnymi założeniami. Wszystkie ilości są moimi założeniami pilotażu [ZAŁ]; ceny z podanych źródeł.

### 18.1. Założenia pilotażu

- 3 000 wyszukiwań miesięcznie (ok. 100 dziennie), 300 szkiców Middlemana, 150 zgłoszeń, 20 nowych kart.
- Wyszukiwanie: jedno wywołanie LLM na zapytanie (uzasadnienia dla trzech wyników): 3 000 tokenów wejścia, 500 wyjścia.
- Middleman: 4 000 wejścia, 1 500 wyjścia. Wczytanie karty: 12 000 wejścia, 1 500 wyjścia.
- Ceny API (USD za milion tokenów) [WEB]: Haiku 4.5 — 1 / 5; Sonnet 5 — 3 / 15 po zakończeniu ceny promocyjnej 31.08.2026. Zestawienia cenowe publikowane są także przez zewnętrzne serwisy, więc **sprawdzić aktualny cennik producenta przed złożeniem**.

### 18.2. Obliczenie kosztu modelu językowego

| Pozycja | Haiku 4.5 | Sonnet 5 (górne) |
|---|---|---|
| Wyszukiwanie: koszt jednego zapytania | 3 000 × 1 + 500 × 5 → 0,0055 USD | 3 000 × 3 + 500 × 15 → 0,0165 USD |
| × 3 000 miesięcznie | 16,50 USD | 49,50 USD |
| Middleman: jeden szkic | 4 000 × 1 + 1 500 × 5 → 0,0115 USD | 0,0345 USD |
| × 300 miesięcznie | 3,45 USD | 10,35 USD |
| Wczytanie karty: jedna | 0,0195 USD | 0,0585 USD |
| × 20 miesięcznie | 0,39 USD | 1,17 USD |
| **Razem miesięcznie** | **ok. 20 USD** | **ok. 61 USD; z 30% zapasem na liczbę tokenów ok. 80 USD** |

Przy dziesięciokrotnie większym ruchu wyszukiwań koszt tej pozycji rośnie liniowo (ok. 165–640 USD miesięcznie); obniżają go pamięć podręczna, tańszy model do prostych zadań i przetwarzanie wsadowe tam, gdzie nie potrzeba odpowiedzi natychmiast.

### 18.3. Hosting i inne usługi

- Serwer 2–4 vCPU i 4–8 GB RAM (osadzenia na CPU potrzebują pamięci [ZAŁ]). Ceny takich serwerów u popularnego europejskiego dostawcy w 2026 roku zmieniały się i w przeglądanych źródłach są **rozbieżne** (od kilkunastu do kilkudziesięciu euro miesięcznie). Przyjmuję zakres 12–40 EUR miesięcznie [ZAŁ]. ROPS może też wykorzystać własną infrastrukturę, co zmieni tę pozycję.
- Kopie zapasowe i monitoring: 10–50 zł miesięcznie [ZAŁ]. Domena i certyfikat: pomijalne wobec reszty [ZAŁ].

### 18.4. Podsumowanie: infrastruktura i AI

Przy założonych kursach 4,0 zł/USD i 4,3 zł/EUR [ZAŁ — zaktualizować przed złożeniem]:

| Wariant | Hosting | LLM | Kopie, monitoring | Razem miesięcznie |
|---|---|---|---|---|
| Oszczędny (Haiku, mały serwer) | ok. 52 zł | ok. 80 zł | ok. 10 zł | **ok. 140 zł** |
| Ostrożny (Sonnet, większy serwer) | ok. 172 zł | ok. 320 zł | ok. 50 zł | **ok. 540 zł** |

### 18.5. Koszt pracy ludzi

Przy założeniach pilotażu [ZAŁ]: obsługa zgłoszeń (150 × ok. 10 min) ≈ 25 h; zatwierdzanie kart (20 × ok. 45 min) ≈ 15 h; utrzymanie treści i naborów ≈ 10 h. Razem ok. **50 godzin miesięcznie**. Utrzymanie techniczne (aktualizacje, bezpieczeństwo, drobne poprawki) ok. **8–16 godzin miesięcznie**. Jednorazowo: audyt dostępności (zewnętrzny, wycena po wyborze zakresu), szkolenie pracowników, ocena skutków dla ochrony danych.

Stawek godzinowych ROPS nie znam. Przykład ilustracyjny: przy 80 zł/godz. kosztu pracodawcy [ZAŁ przykład, nie dane ROPS] praca 50 h to ok. 4 000 zł miesięcznie, czyli **kilkukrotnie więcej niż infrastruktura i AI razem**.

**Wniosek do zgłoszenia:** największym kosztem utrzymania będzie praca merytoryczna. Rozwiązanie ją zmniejsza (szkice kart, klasyfikacja, szablony), ale jej nie eliminuje. Koszt techniczny w pilotażu jest niski i przewidywalny; ograniczamy go limitami, pamięcią podręczną i trybem bez AI.

## 19. Ocena trafności i testy

### 19.1. Zestaw testowy trafności

- 25–30 zapytań w stylu różnych użytkowników: potoczne, urzędowe, jednosłowne, nietypowe i niezwiązane z żadną kartą.
- **Rdzeń zestawu z person Mapy Wyzwań** [JURY] — język potoczny, bliski temu, co może wpisać jury:

| Persona (Mapa) | Przykładowe zapytanie |
|---|---|
| Janina (seniorzy) | „samotni starsi ludzie po śmierci męża" |
| Ania i Staś (piecza) | „rodzeństwo z niepełnosprawnością do rodziny zastępczej" |
| Kuba (bezdomność) | „młody bezdomny po placówce" |
| Krystian (niepełnosprawność) | „samodzielne życie przy porażeniu, bez ciągłej asysty" |
| Tomek (ubóstwo) | „renta rolnicza, nie starcza na opał" |
| Swietłana (cudzoziemcy) | „mama z Ukrainy szuka pracy i przedszkola" |
| Stanisław (zdrowie) | „opiekuję się chorą matką i sam choruję" |
| Mateusz (zdrowie psychiczne) | „nastolatek w kryzysie, siedzi tylko w sieci" |
| Karina (zdrowie psychiczne) | „powrót do pracy po leczeniu psychiatrycznym" |

- Do tego: warianty urzędowe („zapobieganie wykluczeniu osób starszych"), jednosłowne („tłumacz", „piecza"), oraz 3–5 zapytań celowo poza katalogiem.
- Dla każdego zapytania, **zanim uruchomimy wyszukiwanie**, zapisujemy, które karty uważamy za trafne (najlepiej po konsultacji z mentorem ROPS).
- Metryka: czy trafna karta jest w pierwszej trójce. Porównanie: (a) słowa kluczowe, (b) semantyka, (c) hybryda.
- Wagi hybrydy dobieramy na **połowie** zestawu; wynik raportujemy na **drugiej połowie**.

**Ograniczenia:** mały zbiór, napisany przez nas na bazie publicznych person. To **wstępny test**, nie dowód skuteczności, i tak go nazywamy.

### 19.2. Testy funkcjonalne

| Obszar | Przypadek |
|---|---|
| Wyszukiwanie | Zapytania z zestawu; puste; bardzo długie; z danymi osobowymi (maskowanie) |
| Zgodność | Wszystkie kombinacje tak/nie/nie wiem dla warunku koniecznego i pomocniczego |
| Uzasadnienie | Cytat obecny w karcie; cytat sfałszowany → odrzucenie |
| Statusy i wątki | Pełna ścieżka od zgłoszenia do zamknięcia; zmiany zapisane |
| Admin | Zatwierdzenie karty ze szkicu; edycja; nowa wersja; dezaktywacja; trendy z danych testowych |
| Nabór | Aktywny nabór → generator widoczny; nieaktywny → niewidoczny; powiadomienie subskrybenta |
| Awarie | Wyłączony LLM; wyłączone osadzenia; brak sieci |
| Dostępność | Ścieżka klawiaturą; audyt automatyczny; 200%; mobilny |
| Bezpieczeństwo | Wstrzyknięcie poleceń w zgłoszeniu i w PDF; limity zapytań; limit wydatków |

## 20. Plan budowy na 24 godziny (dwie osoby)

Start 3.10.2026, 11:00; koniec 4.10.2026, 11:00 [REG]. **Cel złożenia: 9:30.** Szacunki wg rozdz. 9 dają ok. 43 godziny pracy, a dwie osoby mają realnie ok. 40 godzin produktywnych [ZAŁ]. Plan jest więc napięty i wymaga linii cięcia (20.2).

### 20.1. Harmonogram

| Godz. od startu | Cel | Rezultat kontrolny |
|---|---|---|
| 0–1 | Stoisko ROPS: liczba kart, dane przykładowe, napisy w filmach, zgoda na LLM; **taksonomia 8+9 i Canvas już mamy z PDF** [JURY]; decyzja o prawach | Notatka; seed wyzwań gotowy do wczytania |
| 1–3 | Szkielet, baza, model danych, seed 8 wyzwań + 9 kategorii, wczytanie 15–20 kart (ręcznie sprawdzonych) | Karty i wyzwania widoczne na stronie |
| 3–7 | **Matchmaking** (tekst + semantyka, trzy wyniki, etykieta); równolegle makiety | Hasła testowe działają |
| 7–11 | **Komunikacja i panel:** zgłoszenia, statusy, kolejka, odpowiedź, luki | Pełna ścieżka zgłoszenie → odpowiedź |
| 11–13 | Uzasadnienia z cytatami, kontrola cytatów | Wynik z cytatem |
| 13–16 | Zgodność (lista), Middleman, tester, nabory + generator | Szkic dla przykładowej gminy; wniosek w aktywnym naborze |
| 16–19 | Zasobnik, trendy, tablica partnerstw, dostępność (audyt, poprawki), tryb awaryjny, limity | Raport audytu |
| 19–20 | Zestaw testowy trafności, pomiar | Wynik na drugiej połowie zestawu |
| 20 | **Próbny upload na HackTribe** z wersją roboczą (rozmiary plików, format MP4) | Upload przeszedł |
| 20–22,5 | Prezentacja (10 slajdów), **film MP4 do 3 min**, `README`, `THIRD_PARTY.md`, `AI_USE.md`, opis kosztów | Materiały gotowe |
| 22,5–23,5 | Złożenie zgłoszenia, sprawdzenie linków w oknie prywatnym | Potwierdzenie złożenia |
| po złożeniu | Próba prezentacji przed jury (po polsku), zamrożenie wdrożenia | Stabilne demo do ok. 17:45 |

### 20.2. Linie cięcia (od najpierw odcinanego)

1. Funkcje poza opisem: asystent kreatora, dane GUS, poprawki wizualne ponad dostępność.
2. Tablica partnerstw → pojedynczy formularz „szukam / oferuję" bez filtrów.
3. Generator wniosku → ekran z podglądem pól bez pobierania (oznaczony jako uproszczony).
4. Middleman → szablon sekcji bez generowania (oznaczony).

**Nie tniemy:** modułów I, V, VI, a także tańszych modułów II i IV (stawka punktowa za godzinę jest tam najwyższa). Co 4 godziny przegląd: czy rdzeń działa? Jeśli nie — wstrzymujemy nowe funkcje. Zamrożenie nowych funkcji o 20:00 godziny pracy.

### 20.3. Po złożeniu

Rozstrzygnięcie ok. 17:45 [REG]. Między złożeniem a ogłoszeniem demo musi działać. Zasada: po złożeniu tylko poprawki krytyczne, każde wdrożenie poprzedzone kopią i testem. Kopia lokalna i nagranie w razie awarii sieci (16.3).

## 21. Demo, film, prezentacja

**Jury to głównie przedstawiciele Województwa Małopolskiego** [REG], więc mówimy o skutkach dla mieszkańców, gminy i ROPS, nie o modelach i wektorach. Pojęcia techniczne tylko w jednym zdaniu, w razie pytania.

### 21.1. Scenariusz demo na żywo (3–4 minuty, po polsku)

1. **Kontekst (15 s):** „Gmina ma problem, a w Małopolsce jest blisko 200 sprawdzonych innowacji. Skąd ma wiedzieć, która pasuje?"
2. **Opisz → Dopasuj (45 s):** pracownik fikcyjnego ośrodka wpisuje problem własnymi słowami. Trzy wyniki z uzasadnieniem i cytatem z karty.
3. **Sprawdź (45 s):** trzy pytania; lista Macie / Brakuje / Do sprawdzenia; jedno rozwiązanie wypada.
4. **Hasło od jury (30 s):** jury wpisuje własne hasło; pokazujemy uzasadnienie lub flagę luki.
5. **Komunikacja (45 s):** zgłoszenie fiszki → powiadomienie w panelu → odpowiedź → status u autora ze znacznikami czasu.
6. **Panel (30 s):** luki, trendy, zatwierdzanie karty ze szkicu.
7. **Wdróż (30 s):** Middleman, zgłoszenie testu, nabór i wniosek.
8. **Koszt i rozwój (15 s).**

Dane w demo mają baner „Dane przykładowe".

### 21.2. Film MP4 do 3 minut [REG: obowiązkowy]

Ta sama historia w wersji skróconej, z napisami, po polsku. Plik MP4 wgrywamy na HackTribe i, jeśli organizator potwierdzi, dodajemy link niepubliczny. Sprawdzamy odtwarzanie w oknie prywatnym. Film nie jest elementem platformy, ale i tak dajemy napisy.

### 21.3. Prezentacja PDF (maks. 10 slajdów)

1. Problem i skala (dane z dokumentów, ze źródłem). 2. Użytkownicy. 3. Rozwiązanie w jednym zdaniu i zrzut. 4. Matchmaking i dowody. 5. Sprawdzanie warunków. 6. Komunikacja, partnerstwa i panel. 7. Middleman, nabory, wniosek. 8. Dostępność (wynik audytu) i bezpieczeństwo. 9. Wdrożenie i koszt (rozdz. 18). 10. Ograniczenia i droga rozwoju.

### 21.4. Pytania, których można się spodziewać — przygotowane odpowiedzi

| Pytanie | Odpowiedź (uczciwa) |
|---|---|
| Czym to różni się od strony ROPS z Biblioteką? | Biblioteka pokazuje, co istnieje. Szczep dodatkowo sprawdza, czy to pasuje do konkretnego miejsca, prowadzi rozmowę ze zgłaszającym i pokazuje ROPS luki. |
| Czy AI się nie myli? | Może. Dlatego każda karta jest zatwierdzana przez człowieka, każde uzasadnienie ma cytat z karty, a brak informacji jest nazwany. Przy awarii AI platforma działa dalej. |
| Ile to kosztuje w utrzymaniu? | Infrastruktura i AI w pilotażu od kilkuset do kilku setek złotych miesięcznie przy podanych założeniach; głównym kosztem jest praca merytoryczna (ok. 50 godz./mies. w pilotażu). |
| Czy to działa dla seniora? | Zaprojektowane zgodnie z WCAG 2.1 AA, sprawdzone automatycznie i ręcznie. Testów z seniorami jeszcze nie robiliśmy i to pierwszy krok pilotażu. |
| Dlaczego generator wniosków jest uproszczony? | Nie znamy formatu systemu naborowego ROPS; pokazujemy mechanizm przenoszenia danych w aktywnym naborze, bez wysyłania do systemów ROPS. |
| Co z danymi osobowymi? | W demo wyłącznie dane przykładowe. W produkcji potrzebna ocena skutków i decyzja o lokalizacji danych. |
| Jak sprawdziliście trafność? | Na małym zestawie własnych zapytań, z podziałem na dobór i sprawdzenie; to test wstępny. |

## 22. Mapa wymagań i punktów

### 22.1. Wymagania formalne i funkcjonalne

| ID | Wymaganie | Źródło | Mechanizm | Test | Status |
|---|---|---|---|---|---|
| R1 | Matchmaking społeczny | REG, OPIS | Rozdz. 7–8 | 19.1–19.2 | Planowany |
| R2 | Wyszukiwanie podobnych przypadków | OPIS | Podobne zgłoszenia i karty | 19.2 | Planowany |
| R3 | Propozycja gotowych rozwiązań | OPIS | Trzy wyniki z uzasadnieniem | 19.2 | Planowany |
| R4 | Zasobnik: wyzwania, Biblioteka, materiały | OPIS | 9.1 | Przegląd | Planowany |
| R5 | Zasobnik: szybka aktualizacja | OPIS | Panel + wersjonowanie | 19.2 | Planowany |
| R6 | Zasobnik: trendy potrzeb tylko dla admina | OPIS | 11.1 pkt 4 | 19.2 | Planowany |
| R7 | Kreator: fiszka | OPIS | 9.2 | 19.2 | Planowany |
| R8 | Kreator: generator wniosku w naborze | OPIS | 9.2, nabory | 19.2 | Planowany (minimalny) |
| R9 | Kreator: kanwy innowacji | OPIS | Pola opcjonalne | Przegląd | Zależne od materiałów |
| R10 | Kreator: asystent (mile widziany) | OPIS | Dopytywanie | — | Opcjonalny |
| R11 | Tester | OPIS | 9.3 | 19.2 | Planowany |
| R12 | Komunikacja, mentorzy, partnerstwa | OPIS | Rozdz. 10, 9.4 | 19.2 | Planowany |
| R13 | Panel admina | OPIS | Rozdz. 11 | 19.2 | Planowany |
| R14 | Middleman | OPIS | 9.5 | 19.2 | Planowany |
| R15 | Powiadamianie o nowych pomysłach i zmianach naborów | OPIS | 10.2 | 19.2 | Planowany |
| R16 | Integracja z innymi systemami (docelowo) | OPIS | API, webhook, eksport | Opis | Częściowo |
| R17 | Skalowalność | OPIS | 17.1 | Opis | Opis |
| R18 | WCAG 2.1 AA | REG, OPIS | Rozdz. 13 | 13.4 | Planowany |
| R19 | Brak prawdziwych danych osobowych | OPIS | 15.1 | Przegląd danych | Planowany |
| R20 | Tytuł, identyfikator zespołu, opis | REG | Ten dokument | — | Szkic |
| R21 | PDF do 10 slajdów | REG | 21.3 | Sprawdzenie | Planowany |
| R22 | Film MP4 do 3 min | REG | 21.2 | Odtwarzanie | Planowany |
| R23 | Link do działającego dema | OPIS | Hosting niepubliczny | Test z innej przeglądarki | Planowany |
| R24 | Makiety UX/UI | OPIS | Rozdz. 14 | Przegląd | Planowany |
| R25 | Koszt utrzymania i zasoby | OPIS | Rozdz. 18 | — | Szkic z liczbami |
| R26 | Zgłoszenie przez HackTribe do 11:00 | REG | Plan, próbny upload | Upload | Planowany |
| R27 | Język polski (zgłoszenie, prezentacja) | REG | Całość po polsku | — | Planowany |
| R28 | Umowa praw: oświadczenia, wykaz bibliotek, kod | UMOWA | 16.1 | Lista kontrolna | Planowany |

### 22.2. Punkty: gdzie je zdobywamy (wagi z [REG])

To lista kontrolna do samooceny. **Nie jest to prognoza ani oficjalna punktacja.**

| Kryterium (waga) | Co widzi jury | Nasz dowód | Najsłabszy punkt | Czy działa wariant awaryjny? |
|---|---|---|---|---|
| **Spełnienie wyzwania (40%)** | Jakość kluczowych elementów i liczba działających modułów | Siedem działających ścieżek; matchmaking na hasłach jury | Cienkie moduły IV, III; mało kart w demo | Tak (20.2) |
| **Potencjał wdrożeniowy (20%)** | Gotowość, skalowalność, elastyczność, koszt, prostota utrzymania | Koszt z liczbami (rozdz. 18), prosta architektura, eksport i webhook, konfiguracja z panelu | Brak realnej integracji z systemem grantowym; brak testów obciążeniowych | Opis ograniczeń |
| **Dostępność i intuicyjność (20%)** | Przejrzystość dla każdej grupy; WCAG 2.1 AA | Audyt automatyczny, test ręczny, tryb prosty, jedno pole | Brak testów z osobami z niepełnosprawnościami | Opisane jawnie |
| **Interfejs i makiety (10%)** | Nowatorskość i atrakcyjność | Rozdz. 14, ścieżka czterech kroków, karta w 60 sekund | Mało czasu na dopracowanie | Priorytet makiet przed ozdobami |
| **Materiały i MVP (10%)** | Sposób komunikacji koncepcji i jakość przesłanych materiałów | PDF, film, README, opis kosztów | Zmęczenie na końcu | Bufor 1,5 godz. |

Cztery aspekty walidacji z [OPIS] (intuicyjność, szybkość komunikacji, trafność, pomysłowość) są realizowane odpowiednio: rozdz. 13, 10, 7 i 5/8.

## 23. Rejestr uczciwości — co jest czym

Obecnie wszystko ma status „zaplanowane". Docelowo każda funkcja dostaje etykietę:

| Etykieta | Znaczenie |
|---|---|
| Zaimplementowana i przetestowana | Działa, a przypadki z 19.2 przeszły |
| Zaimplementowana | Działa, bez pełnych testów |
| Tryb demonstracyjny | Dane syntetyczne lub symulowany kanał (np. e-mail) |
| Częściowa | Główna ścieżka działa, bez przypadków brzegowych |
| Makieta | Tylko wygląd |
| Zaplanowana | W planie rozwoju |

Szczególnie jawnie oznaczamy: powiadomienia e-mail (jeśli symulowane), nabór i generator wniosku (dane syntetyczne, bez wysyłki), dane GUS (jeśli nie zweryfikowane), wynik testu trafności (wstępny), brak testów z osobami z niepełnosprawnościami, brak testów obciążeniowych, nagranie demo użyte jako zapas.

## 24. Krytyczny przegląd: gdzie projekt może zawieść

| # | Ryzyko | Skutek [ZAŁ] | Środek |
|---|---|---|---|
| 1 | Karty ROPS nie nadają się do wyciągnięcia warunków | Osłabia kontrolę warunków | Warunki wyprowadzane z elementów, ręczna weryfikacja 15–20 kart; w ostateczności nacisk na dowody i podobieństwo |
| 2 | Hasła jury nie trafiają w karty | Uderza w trafność | Hybryda, słownik synonimów, trzy wyniki zawsze, zestaw testowy |
| 3 | Zarzut „katalog + chatbot" | Pomysłowość | Kontrola warunków, luki, trendy i Middleman jako główne punkty demo |
| 4 | Zakres ponad możliwości dwóch osób (ok. 43 h pracy na ok. 40 h) | Wysokie | Linie cięcia, przegląd co 4 godziny |
| 5 | **Publikacja kodu, dema lub filmu narusza oświadczenie z umowy** | Utrata nagrody lub odpowiedzialność | Rozdz. 16.1; potwierdzenie u organizatora |
| 6 | Film MP4 pominięty przez założenie „PDF lub film" | Zgłoszenie niekompletne | R22; test uploadu o godz. 20 |
| 7 | Awaria sieci lub API w czasie demo | Wysoki skutek | Kopia lokalna, nagranie oznaczone, tryb bez AI |
| 8 | Nadużycie publicznego dema, koszt API | Koszty, odcięcie | Limity i dzienny limit wydatków, wyłącznik |
| 9 | Halucynacje w uzasadnieniach | Zaufanie | Cytaty sprawdzane automatycznie |
| 10 | Dane osobowe w zgłoszeniach | RODO | Maskowanie, komunikat, brak publikacji |
| 11 | Jury nietechniczne nie rozumie wyróżnika | Pomysłowość, spełnienie wyzwania | Język skutków, jedna historia, pytania z 21.4 |
| 12 | Brak ogólnego regulaminu Hackathonu | Nieznane wymogi | Przeczytać przed startem |
| 13 | Zgoda ROPS na użycie materiałów w zewnętrznym LLM | Zgodność | Pytanie; w razie odmowy tylko dane syntetyczne |
| 14 | Cesja praw jako warunek nagrody | Strategiczny | Decyzja przed startem |
| 15 | Zmęczenie, błędy w ostatnich godzinach | Wysokie | Zamrożenie funkcji o 20:00, bufor |

## 25. Decyzje przed lub na początku pracy

1. **Prawa:** czy akceptujecie przeniesienie praw na PROIDEA dla nagrodzonego rozwiązania? [REG]
2. **Ogólny regulamin Hackathonu:** przeczytać (praca przedwydarzeniowa, AI, zachowanie).
3. **Organizator:** jak przekazać repozytorium i dema jury bez „publikacji"; czy film może być linkiem niepublicznym; czy asysta AI w kodzie jest zgodna z oświadczeniem „wykonany osobiście".
4. **ROPS:** liczba kart / eksport / dane przykładowe (strona Biblioteki w przebudowie), napisy w filmach, zgoda na zewnętrzny LLM. Układ Mapy i Canvas oraz 9 kategorii — już z PDF [JURY].
5. **LLM:** zewnętrzne API z limitami czy model lokalny.
6. **Harmonogram:** godzina i forma prezentacji przed jury.
7. **Zakres po godzinie 7:** jeśli rdzeń idzie szybciej — dopracowanie dostępności i trafności zamiast nowych funkcji.

## 26. Plan po hackathonie

| Etap | Zakres | Wymaga |
|---|---|---|
| Natychmiast | Uwagi jury i ROPS; poprawa wyszukiwania na pełnym zbiorze kart | Dane ROPS |
| Krótkoterminowo | Pełny import Biblioteki z zatwierdzaniem; badania z użytkownikami (seniorzy, osoby z niepełnosprawnościami); zewnętrzny audyt dostępności | Czas pracowników ROPS, budżet |
| Średnioterminowo | Integracja z bazą grantową; realne powiadomienia; prawdziwe uwierzytelnianie; zgodność z RODO | Decyzje instytucjonalne |
| Rozwój | Asystent kreatora; generator wniosków zgodny z formatem naboru; mapa luk w skali gmin; pilotaż z kilkoma CUS | Współpraca z ROPS i gminami |
| Eksperyment weryfikujący wartość | Pilotaż z 3–5 gminami: ile zapytań kończy się kontaktem, ile próbą wdrożenia; porównanie z dotychczasowym szukaniem | Zgoda uczestników |

## 27. Lista kontrolna zgłoszenia

- [ ] Tytuł, identyfikator zespołu, opis (po polsku) **[REG]**
- [ ] PDF do 10 slajdów **[REG]**
- [ ] **Film MP4 do 3 minut** **[REG]**
- [ ] Link do działającego dema, bez wymaganego konta, niepubliczny **[OPIS + 16.1]**
- [ ] Makiety UX/UI **[OPIS]**
- [ ] Koszt utrzymania i zasoby, z założeniami i datą cen **[OPIS]**
- [ ] Dane logowania demonstracyjne dla jury (konta syntetyczne)
- [ ] Repozytorium prywatne z `README`, `THIRD_PARTY.md`, `AI_USE.md`, `.env.example`, bez sekretów
- [ ] Zrzuty ekranu (opcjonalnie)
- [ ] Rejestr uczciwości zaktualizowany
- [ ] Dane demo oznaczone jako przykładowe; brak danych osobowych
- [ ] Próbny upload wykonany; złożenie do 9:30 w dniu 4.10.2026

---

# ZAŁĄCZNIK A — Rejestr przeglądu: co zmieniono względem wersji 1

| # | Waga | Ustalenie | Źródło | Zmiana |
|---|---|---|---|---|
| F1 | Krytyczna | Wersja 1: „PDF **lub** film". Regulamin wymaga **obu**: PDF i filmu MP4 | REG §4 ust. 9 | Film obowiązkowy w całym dokumencie, plan, lista kontrolna, test uploadu |
| F2 | Krytyczna | Wersja 1 zakładała publiczne repozytorium i otwarty film. Umowa zawiera oświadczenie, że utwór nie został opublikowany, i daje organizatorowi prawo pierwszej publikacji | UMOWA §1 ust. 4 b, §2 ust. 12, 14 | Repozytorium prywatne, demo niepubliczne, pytania do organizatora, rozdz. 16 |
| F3 | Krytyczna | Wersja 1 przedstawiła cztery aspekty walidacji jako alternatywny zestaw kryteriów i uznała wagi za niepewne. Wagi są w regulaminie, a cztery aspekty należą do sekcji walidacji | REG §5 ust. 3; OPIS sekcja 6 | Rozdz. 1.3 i 22; usunięto „wariant A/B" |
| F4 | Wysoka | Wersja 1 napisała, że WCAG nie jest wymieniony wprost. Regulamin go wymienia | REG §5 | WCAG 2.1 AA jako wymóg; mapa kryteriów sukcesu (13.2) |
| F5 | Wysoka | Wersja 1 uznała trendy potrzeb dla admina i szybką aktualizację za niewymagane. Nadal są w opisie zadania | OPIS moduł II | Dodano trendy i szybką edycję (9.1, 11.1) |
| F6 | Wysoka | Liczba modułów waży do 40% oceny. Wersja 1 odcinałaby najtańsze moduły i traktowała generator jako makietę | OPIS kryteria; REG §5 | Siedem działających ścieżek, linie cięcia według punktów za godzinę (rozdz. 9, 20.2) |
| F7 | Wysoka | Koszt utrzymania bez liczb, a „efektywność kosztowa" to część 20% | REG §5; OPIS | Model z jawnymi założeniami i obliczeniem (rozdz. 18) |
| F8 | Średnia | Brak planu makiet i kierunku wizualnego, a to wymóg zgłoszenia i 10% oceny | OPIS; REG §5 | Rozdz. 14 |
| F9 | Średnia | Jury głównie z Województwa Małopolskiego, prezentacja po polsku, żywa prezentacja | REG §5 | Rozdz. 21, pytania jury |
| F10 | Średnia | Platforma zgłoszeń HackTribe; limity plików nieznane | REG §4 | Próbny upload o godz. 20 |
| F11 | Średnia | Praca stacjonarna na własnym sprzęcie; ryzyko sieci | REG §4 ust. 4–5 | 16.3, kopia lokalna |
| F12 | Średnia | Publiczne demo z płatnym API można nadużyć | — | Limity, dzienny limit wydatków, wyłącznik (12.3, 15.2) |
| F13 | Średnia | Umowa wymaga wykazu narzędzi i bibliotek oraz kodu do uruchomienia | UMOWA §1 ust. 7 | `THIRD_PARTY.md`, `README`, `docker-compose` |
| F14 | Średnia | Automatyzacja powiadomień o naborach była „zaplanowana" | OPIS wymagania techniczne | Model naboru i subskrypcji (6.4, 10.2) |
| F15 | Średnia | Nie wiadomo, czy ROPS pozwala wysyłać swoje materiały do zewnętrznego modelu | — | Pytanie i ścieżka awaryjna (12.3) |
| F16 | Średnia | Brak ogólnego regulaminu Hackathonu | REG §3 ust. 5, §10 ust. 5 | Decyzja 2 w rozdz. 25 |
| F17 | Niska | Karty mogą nie mieć jawnych warunków | — | Warunki wyprowadzone z elementów, oznaczone (6.2) |
| F18 | Niska | Dane o generatorze wniosków pochodzą z 2021 r.; opis limitów GUS pochodzi ze starszego źródła | WEB | Dopisano zastrzeżenia (1.4, 6.5) |
| F19 | Niska | Szacunek pracy przekracza dostępny czas | — | Jawne ostrzeżenie i linie cięcia (rozdz. 20) |
| F20 | Niska | Brak tablicy partnerstw i „Zapytaj mentora" mimo zapisu w module V | OPIS | Dodano (9.4) |
| F21 | Wysoka | Wersja 2 pisała „nie znam formatu Mapy/Canvas"; PDF-y z listy jury są publiczne | JURY | Weryfikacja źródeł 3.10.2026 → rozdz. 1.4, 6.1, 6.5, 9.1, 9.2, 19.1, Załącznik C (wersja 2.1) |

**Czego przegląd nie obejmował:** nie wczytywałem pełnej treści poszczególnych kart Biblioteki (strona w przebudowie); nie czytałem ogólnego regulaminu Hackathonu; numerację kryteriów WCAG podaję według WCAG 2.1 z pamięci i należy ją sprawdzić w specyfikacji; ceny API i hostingu pochodzą ze źródeł wtórnych i wymagają potwierdzenia u dostawców; niczego nie rozstrzygam prawnie.

---

# ZAŁĄCZNIK C — Rejestr źródeł jury (zweryfikowane 3.10.2026)

| # | Źródło | URL / plik | Co wzięliśmy do Szczepa | Ograniczenie |
|---|---|---|---|---|
| J1 | Biblioteka Innowacji — kategorie | https://rops.krakow.pl/innowacje-spoleczne/biblioteka-innowacji-spolecznych/kategorie | 9 kategorii; akcje karty (materiały, film, zasady) | Strona w przebudowie; brak pełnego eksportu |
| J2 | Raporty z badań ROPS | https://rops.krakow.pl/badania-analizy-raporty/raporty-z-badan | Lista priorytetowych raportów 2024–2026; CC BY 4.0 | Pełne PDF-y do skrótów w Zasobniku, nie do OCR w MVP |
| J3 | IOSS — Obserwator | https://obserwator.rops.krakow.pl/ | Profil lokalny (snapshot gminy); trendy dla admina | Brak publicznego API — eksport XLS / ręczny snapshot |
| J4 | Mapa Wyzwań Społecznych | https://rops.krakow.pl/mpliki/IS/IWS_20/za._nr_2._Mapa_Wyzwa_Spoecznych.pdf | 8 obszarów, wyzwania, persony, mapowanie → Biblioteka | Dane ogólnopolskie (nota w UI) |
| J5 | Publikacje ze świata innowacji | https://rops.krakow.pl/innowacje-spoleczne/publikacje-ze-swiata-innowacji | 3 publikacje do Czytelni; kontekst E0–E3 | Linki, bez pełnego tekstu w MVP |
| J6 | Social Canvas (INNO AGH) | https://rops.krakow.pl/mpliki/IS/Moj_folder/INNO_AGH_-_SOCIAL_CANVAS.pdf | Pola fiszki / kanwy (9.2) | MVP = 7 pól; reszta rozwój |

Lista skrócona: plik `zrodla.md` w tym samym katalogu.

---

# ZAŁĄCZNIK B — przykładowa karta innowacji (SYNTETYCZNA)

> Wymyślony przykład struktury. **Nie jest to innowacja ROPS ani rzeczywista inicjatywa.**

**Tytuł:** „Telefon na dzień dobry" (przykład)
**Streszczenie:** Wolontariusze dzwonią raz w tygodniu do osób starszych, które zgłosiły chęć rozmowy.
**Problemy:** samotność, brak codziennego kontaktu społecznego.
**Grupa docelowa:** osoby 70+, mieszkające samodzielnie, z dostępem do telefonu.
**Elementy:** lista chętnych, grupa wolontariuszy, krótkie szkolenie z rozmowy, koordynator.
**Warunki wstępne:**
- koordynator, 4 godziny tygodniowo (kadra, konieczny, pochodzenie: z karty);
- grupa 8–12 wolontariuszy (kadra, konieczny, z karty);
- lokal na szkolenie wstępne (zasób, pomocny, z karty);
- lokalna instytucja, która zna odbiorców (partner, konieczny, wyprowadzone z elementów — do potwierdzenia).
**Dowody:** poziom E1 — testowane w mikroskali przez grupę 10 osób, bez formalnej ewaluacji.
**Kontakt:** instytucja prowadząca (dane przykładowe).

**Przykładowe zapytanie:** „samotni seniorzy po zamknięciu klubu".
**Przykładowy wynik:** mocne dopasowanie; cytat z opisu problemu; czego nie wiemy: koszt i czas szkolenia; dowody E1.
**Lista zgodności dla gminy bez koordynatora:** Macie: lokal. Brakuje: koordynator. Do sprawdzenia: partner lokalny.

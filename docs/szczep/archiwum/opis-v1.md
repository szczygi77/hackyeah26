# Szczep — platforma, która pomaga dobrym rozwiązaniom społecznym trafić tam, gdzie są potrzebne

> **Wersja 1 — archiwum.** Aktualny opis produktowy: `../opis-produktowy.md` (wersja 2.1). Opis wartości dla instytucji: `../wartosc-dla-instytucji.md`.

**Projekt na wyzwanie HubMI.pl (ROPS Kraków) · HackYeah 2026 · wersja robocza z 3 października 2026 (zastąpiona przez v2.1)**

> **Status dokumentu.** To opis projektowy przed implementacją. Nic z opisanych funkcji nie jest jeszcze zbudowane ani przetestowane. Nazwa „Szczep" jest robocza. Znaczniki: **\[DOK\]** — z dokumentów wyzwania; **\[WEB\]** — ze źródła internetowego; **\[ZAŁ\]** — moje założenie lub propozycja do weryfikacji. Wszystkie dane przykładowe w tym dokumencie są **syntetyczne**.

---

# CZĘŚĆ I — OPIS PROSTY

## Co to jest

Szczep to strona internetowa dla Małopolskiego Hubu Innowacji Społecznych. Pomaga w jednej sprawie: **gdy ktoś ma problem społeczny, szybko znaleźć sprawdzone rozwiązanie, które już gdzieś zadziałało, i dowiedzieć się, czy zadziała także u niego.**

ROPS Kraków ma w portfolio blisko 200 innowacji społecznych \[DOK\]. Wiele z nich pozostaje jednak mało znanych, bo trudno je znaleźć i trudno ocenić, czy nadają się do innego miejsca. Szczep ma to ułatwić.

## Dla kogo

- **Mieszkańcy i organizacje pozarządowe** — opisują problem własnymi słowami albo zgłaszają pomysł.
- **Urzędy i jednostki samorządu (np. Centra Usług Społecznych)** — szukają gotowych rozwiązań, które da się wdrożyć lokalnie.
- **Pracownicy ROPS** — dostają uporządkowane zgłoszenia i narzędzie do prowadzenia wiedzy oraz rozmowy z użytkownikami.
- **Eksperci i mentorzy** — odpowiadają na pytania i wspierają wdrożenia.

## Jak to działa — cztery kroki

1. **Opisujesz problem.** Jedno pole, zwykłe słowa, np. „samotni seniorzy po zamknięciu klubu". Bez formularza z dwudziestoma pytaniami.
2. **Dostajesz trzy najbliższe rozwiązania.** Przy każdym widzisz: dlaczego pasuje, czego może Wam brakować i jak mocne są dowody, że działa (czy to pomysł, czy rozwiązanie sprawdzone w praktyce).
3. **Sprawdzasz, czy zadziała u Ciebie** (opcjonalnie). Odpowiadasz na kilka pytań o swoją gminę lub organizację i dostajesz listę: „macie to, brakuje tego".
4. **Działasz.** Zgłaszasz chęć przetestowania rozwiązania, piszesz do ROPS, składasz własny pomysł albo prosisz asystenta o szkic planu wdrożenia w swoim miejscu. Zawsze widzisz status swojego zgłoszenia.

## Co jest w Szczepie wyjątkowe

- **Nie tylko „co podobnego istnieje", ale „czy to się u nas przyjmie".** Wiele katalogów rozwiązań pokazuje przykłady. Szczep dodatkowo zestawia warunki, w jakich rozwiązanie działało, z sytuacją pytającego.
- **Uczciwość wobec użytkownika.** Gdy dopasowanie jest słabe, system to mówi. Gdy czegoś nie wie, pisze „do ustalenia z autorem rozwiązania" zamiast zgadywać.
- **Zgłoszenia, na które nie ma odpowiedzi, nie przepadają.** Jeśli wiele osób opisuje problem, dla którego Biblioteka nie ma rozwiązania, ROPS widzi to w panelu jako sygnał do działania.
- **Prostota.** Jeden ekran startowy, duże elementy, możliwość pracy samą klawiaturą i tryb prostego języka.

## Czego Szczep nie robi

- Nie zastępuje decyzji urzędników ani doradców ROPS. Podpowiada i porządkuje.
- Nie ocenia, „czy rozwiązanie na pewno się powiedzie". Pokazuje listę zgodności warunków, a to nie jest prognoza.
- Nie przechowuje w wersji demonstracyjnej żadnych prawdziwych danych osobowych \[DOK: zakaz użycia prawdziwych danych osobowych z materiałów ROPS\].

## Pitch w 30 sekund

> Małopolska ma blisko 200 sprawdzonych innowacji społecznych, a gmina z problemem wciąż zaczyna od zera, bo nie wie, że rozwiązanie istnieje, ani czy będzie pasować. Szczep to centralna platforma Hubu: opisujesz problem zwykłymi słowami, dostajesz trzy dopasowane innowacje z uzasadnieniem, listą braków i oceną dowodów, a gdy nic nie pasuje, ROPS dostaje sygnał, czego brakuje w Bibliotece.

---

# CZĘŚĆ II — OPIS SZCZEGÓŁOWY

## 1. Kontekst i diagnoza

### 1.1. Co wynika z dokumentów wyzwania \[DOK\]

- ROPS Kraków od 10 lat działa jako regionalny inkubator innowacji społecznych i ma w portfolio blisko 200 rozwiązań.
- Wiele oddolnych mikro-rozwiązań nie ma narzędzi do rozwoju i skalowania. Brakuje miejsca, które systematycznie łączy diagnozowanie problemów, rozwój pomysłów, testowanie, upowszechnianie i budowanie partnerstw.
- Oczekiwany rezultat: działający prototyp („cyfrowe serce Hubu"), z obowiązkowym matchmakingiem społecznym i dodatkowo punktowanymi modułami.
- Zgłoszenie: nazwa i opis, PDF do 10 slajdów lub film do 3 minut (w otwartym repozytorium, link), link do działającego dema, makiety UX/UI, szacunek kosztów obsługi i utrzymania. Opcjonalnie repozytorium kodu, zrzuty ekranu, materiały graficzne.
- Zgłoszenie i prezentacja po polsku.

### 1.2. Co wynika z materiałów ROPS dostępnych publicznie \[WEB\]

- W projektach inkubacyjnych ROPS przewidziano przetestowanie dziesiątek pomysłów w mikroskali i upowszechnienie tylko części z nich. Projekt „Inkubator Włączenia Społecznego" zakładał przetestowanie 60 innowacji i upowszechnienie 6, z grantami do 100 000 zł i małymi grupami testującymi (8–12 osób). Źródło: materiały partnerskie projektu IWS.
- ROPS prowadzi osobne przedsięwzięcie poświęcone wdrażaniu istniejących innowacji w środowiskach lokalnych („Usługa Wrażliwa").
- Wnioski grantowe składa się przez istniejący Generator Wniosków na stronie ROPS.
- Publikowane karty innowacji mają zwykle stały układ: krótki opis, jakie problemy rozwiązuje, kto może skorzystać, elementy innowacji, grupa docelowa. Są to często PDF-y.

**Wniosek krytyczny:** wąskim gardłem jest **przejście od „działa tam" do „działa u nas"**, a nie samo znalezienie kolejnej innowacji. Dwie z wymaganych funkcji (generator wniosków, biblioteka kart) już w jakiejś formie istnieją. Platforma, która je tylko odtworzy, nie spełni kryterium „pomysłowość".

### 1.3. Czego nie wiem (i co trzeba sprawdzić na miejscu)

| Pytanie | Dlaczego ważne | Jak sprawdzić |
| --- | --- | --- |
| W jakim formacie jest Biblioteka Innowacji i Mapa Wyzwań (PDF, strona, plik danych)? | Decyduje o jakości wczytywania danych, a więc o trafności dopasowania | Stoisko ROPS, w pierwszej godzinie |
| Czy punktacja 40/20/20/20 z wcześniejszej wersji dokumentu nadal obowiązuje? | Decyduje, czy opłaca się budować wszystkie moduły | Pytanie do mentora ROPS |
| Ile jest kart i czy mają wspólną strukturę? | Zakres wczytywania i test trafności | Przykładowe dane od ROPS |
| Czy są dostępne filmy o innowacjach w formie plików lub linków? | Prezentacja „w ciekawej formie" | Stoisko ROPS |
| Czy cesja praw na PROIDEA jest akceptowalna? | Warunek odbioru nagrody | Decyzja zespołu przed startem |

## 2. Sformułowanie problemu

Problem rozpisuję na trzy konkretne hipotezy. Żadna nie jest jeszcze potwierdzona danymi.

- **H1 — Odkrywalność.** Osoba z problemem nie wie, że w regionie istnieje rozwiązanie, albo nie potrafi go znaleźć, bo nie zna fachowych nazw. \[ZAŁ; zgodne z opisem wyzwania\]
- **H2 — Przenaszalność.** Nawet po znalezieniu rozwiązania trudno ocenić, czy jego warunki sukcesu (lokal, kompetencje, partnerzy, grupa docelowa) są spełnione u pytającego. Kosztem jest nieudane lub porzucone wdrożenie. \[ZAŁ; poparte skalą „60 przetestowanych, 6 upowszechnionych" z projektów ROPS, choć ta relacja wynika z założeń projektu, a nie z pomiaru skuteczności\]
- **H3 — Ślepa plamka instytucji.** Instytucja nie widzi, jakich rozwiązań ludzie szukają i nie znajdują. \[ZAŁ\]

**Konsekwencje braku rozwiązania:** ten sam problem jest wielokrotnie rozwiązywany od zera, dobre rozwiązania pozostają lokalne, a nowe nabory grantowe nie są ukierunkowane na rzeczywiste luki.

**Jak miarą sprawdzimy poprawę** (w przyszłym pilotażu, nie na hackathonie): odsetek zapytań, w których użytkownik przechodzi od wyniku do kontaktu lub zgłoszenia testu; czas od zgłoszenia do pierwszej odpowiedzi; liczba wdrożeń zainicjowanych przez platformę. Na hackathonie zmierzymy tylko trafność wyszukiwania na własnym małym zestawie (punkt 17).

## 3. Użytkownicy i ich zadania

| Rola \[DOK\] | Główne zadanie | Czego się obawia \[ZAŁ\] | Co dostaje |
| --- | --- | --- | --- |
| Mieszkaniec / NGO | Opisać problem albo pomysł | Skomplikowany formularz, brak odpowiedzi | Jedno pole, wyniki z uzasadnieniem, widoczny status |
| JST, CUS | Znaleźć rozwiązanie do wdrożenia | Wdrożenie, które się nie przyjmie; brak czasu | Lista zgodności warunków, szkic planu, kontakt do autora |
| Pracownik ROPS | Zarządzać wiedzą i rozmową | Zalew zgłoszeń, utrzymanie danych | Kolejka, szkice kart do zatwierdzenia, ranking luk |
| Ekspert / mentor | Doradzać | Brak kontekstu | Zgłoszenie z historią i dopasowaniami |

Rolę „mieszkaniec/NGO/JST" wybiera się dopiero przy czynnościach, które wymagają danych kontaktowych. **Wyszukiwanie jest dostępne bez logowania.**

## 4. Konkurencja i luka \[WEB, wstępny przegląd\]

Przegląd opiera się na stronach opisowych. Nie testowałem tych produktów w działaniu.

| Rozwiązanie | Co robi | Ograniczenia widoczne w opisie | Co zostaje otwarte |
| --- | --- | --- | --- |
| **ChangeX** | Platforma sprawdzonych innowacji połączona z finansowaniem i lokalnymi zespołami | Skala globalna, bez kontekstu regionalnego i polskiego | Dopasowanie do polskiego regionu i instytucji |
| **Social Innovation Match** (UE) | Przykłady inicjatyw z filtrami (typ, kraj, obszar, finansowanie), walidatorzy krajowi | Filtry i przeglądanie, bez oceny przenaszalności do konkretnego miejsca | Ocena przenaszalności |
| **Ashoka Impact Transfer** | Ocena gotowości do replikacji, kojarzenie partnerów | Usługa doradcza z udziałem ekspertów | Narzędzie samoobsługowe |
| **Toolkity Eurocities** | Opracowane materiały transferu dla wybranych innowacji | Dla kilku wybranych przypadków | Skalowanie na cały katalog |

**Wniosek:** kategoria „katalog sprawdzonych innowacji" jest zajęta. Hipoteza różnicy Szczepa: (1) zestawienie warunków sukcesu innowacji z profilem pytającego, (2) jawne traktowanie braku dopasowania jako informacji dla instytucji, (3) wszystko w polskim kontekście instytucjonalnym ROPS. **Nie twierdzę, że żadne istniejące narzędzie tego nie robi.** Pełny przegląd wymagałby czasu poza hackathonem.

## 5. Zasada konstrukcji: jeden silnik, siedem widoków

Wymagania HubMI wymieniają siedem modułów. Zbudowanie siedmiu osobnych aplikacji w 24 godziny przez dwie osoby jest nierealne i tworzy dokładnie tę „odtwórczą integrację", o którą pyta kryterium pomysłowości. Dlatego:

- **Jeden model danych** (innowacje, problemy, profile, zgłoszenia, wątki).
- **Jeden silnik dopasowania** (wyszukiwanie, ocena dowodów, lista zgodności).
- **Jeden mechanizm statusów i powiadomień** (komunikacja).
- **Moduły jako widoki** tego samego rdzenia, o różnej głębokości (punkt 9).

```
┌──────────────┐  ┌─────────────────┐  ┌──────────────────┐
│ Mieszkaniec  │  │ JST / CUS       │  │ ROPS (admin)     │
└──────┬───────┘  └────────┬────────┘  └────────┬─────────┘
       └──────────┬────────┴─────────────────────┘
                  ▼
        Warstwa widoków (moduły I–VII)
                  ▼
 ┌────────────────────────────────────────────────────────┐
 │ Silnik: wyszukiwanie · dowody · zgodność · statusy     │
 └───────┬───────────────────┬───────────────────┬────────┘
         ▼                   ▼                   ▼
   Baza (karty,       Model osadzeń +      LLM (wyciąganie pól,
   zgłoszenia, wątki) indeks tekstowy      uzasadnienia, szkice)
```

## 6. Model danych

### 6.1. Karta innowacji

| Pole | Opis | Źródło wartości | Wymaga zatwierdzenia admina |
| --- | --- | --- | --- |
| `id`, `tytuł`, `streszczenie` | Podstawowe dane | Karta ROPS | — |
| `problemy[]` | Jakie problemy rozwiązuje (tagi + opis) | Karta | tak, jeśli wyciągnięte automatycznie |
| `grupa_docelowa[]` | Dla kogo | Karta | j.w. |
| `elementy[]` | Z czego składa się innowacja | Karta | j.w. |
| `warunki_wstępne[]` | Czego wymaga wdrożenie (patrz 6.2) | Karta; brak = „nie podano" | zawsze |
| `dowody` | Poziom dowodów + opis, gdzie i na ilu osobach testowano | Karta | zawsze |
| `kontakt_autora` | Dane kontaktowe instytucji (nie prywatne) | Karta | zawsze |
| `materiały[]` | Pliki, filmy, linki | ROPS | — |
| `wersja`, `zaktualizowano` | Śledzenie zmian | System | — |

**Reguła:** każde pole, którego nie ma w źródle, ma wartość „nie podano". System nigdy nie uzupełnia go domysłem. To podstawa uczciwości całej platformy.

### 6.2. Warunki wstępne

Każdy warunek ma typ i wagę:

- **typ:** zasób materialny / lokal, kompetencja lub kadra, partner instytucjonalny, grupa docelowa, finansowanie, czas;
- **waga:** `konieczny` lub `pomocny`;
- **opis** swobodnym tekstem + cytat z karty, z której wynika.

Przykład (syntetyczny): „potrzebny lokal użytkowy dla spotkań raz w tygodniu" — typ: zasób, waga: konieczny, cytat: „spotkania odbywają się w świetlicy".

### 6.3. Poziomy dowodów (propozycja \[ZAŁ\])

| Poziom | Znaczenie | Uwaga |
| --- | --- | --- |
| E0 | Pomysł, bez testów |  |
| E1 | Testowany w mikroskali (mała grupa) | odpowiada etapowi testowania w inkubatorach ROPS \[WEB\] |
| E2 | Testowany z udokumentowaną oceną | wymaga ewaluacji w karcie |
| E3 | Wdrożony w co najmniej dwóch miejscach |  |

Poziom wynika z danych karty. Jeśli karta nie pozwala go ustalić, pokazujemy „poziom dowodów: nie podano". **Nie nadajemy poziomu na podstawie opinii modelu** bez zatwierdzenia admina.

### 6.4. Pozostałe obiekty

- **Zgłoszenie problemu:** tekst opisu, wybrana rola, opcjonalny kontakt, opcjonalny profil (6.5), czas utworzenia, status.
- **Profil lokalny:** deklaracja zasobów i warunków (6.5), bez danych osobowych.
- **Dopasowanie:** zgłoszenie ↔ karta, wynik, etykieta pewności, uzasadnienie, lista zgodności.
- **Fiszka pomysłu:** istota, dla kogo, etap realizacji \[DOK: te trzy elementy są wymienione w opisie modułu III\].
- **Zgłoszenie gotowości (tester/partner):** typ (test, partnerstwo), obszar, kontakt, zakres.
- **Wątek:** wiadomości powiązane ze zgłoszeniem, dopasowaniem lub fiszką, ze znacznikami czasu i autorem (rola).

### 6.5. Profil lokalny

Pytania pojawiają się **dopiero** po kliknięciu „Sprawdź, czy to zadziała u nas", nigdy przed pierwszymi wynikami. Zestaw jest dynamiczny: system pyta tylko o warunki, które wybrane rozwiązania uznają za konieczne (maks. 3–5 pytań naraz, odpowiedzi „tak / nie / nie wiem"). Odpowiedź „nie wiem" daje wynik „do sprawdzenia", nie „brak".

**Dane publiczne jako uzupełnienie \[ZAŁ\]:** GUS udostępnia API Banku Danych Lokalnych z danymi na poziomie gmin \[WEB\], co pozwala opcjonalnie wypełnić część cech (np. struktura wieku, gęstość zaludnienia). Dostępne źródła mają ograniczenia liczby zapytań, więc dane trzeba pobrać jednorazowo i zapisać lokalnie. Konkretne wskaźniki do użycia trzeba jeszcze zweryfikować. **W MVP profil opiera się głównie na deklaracji użytkownika,** a dane GUS są dodatkiem tylko wtedy, gdy zdążymy je rzetelnie zweryfikować.

## 7. Matchmaking społeczny (moduł I, obowiązkowy)

### 7.1. Cel i kryterium sukcesu

Z dokumentu: „Czy narzędzie skutecznie sugeruje istniejące innowacje na podstawie słów kluczowych wpisanych w opisie potrzeb?" \[DOK\]. Jury prawdopodobnie wpisze **krótkie, potoczne hasła**, często nietypowe. Matchmaking musi więc działać dobrze dla zapytań typu „samotność seniorów", „dzieci w kryzysie", „tłumacz migowy", „jak pomóc głuchym", a nie tylko dla zdań pisanych językiem karty.

### 7.2. Potok przetwarzania

1. **Normalizacja zapytania:** małe litery, usunięcie danych osobowych (7.5), podstawowa lematyzacja lub stemming dla polskiego.
2. **Wyszukiwanie tekstowe** (słowa kluczowe i fraza, z odmianą) po polach karty.
3. **Wyszukiwanie semantyczne:** wielojęzyczny model osadzeń. Kandydat: BGE-M3, model open source wspierający ponad 100 języków i długie teksty, dostępny m.in. w rejestrze Ollama \[WEB\]. Karty indeksujemy z wyprzedzeniem; liczba kart (rzędu 200) jest na tyle mała, że **osobna baza wektorowa nie jest potrzebna** — wystarczą wektory trzymane w pamięci lub w zwykłej bazie.
4. **Połączenie wyników** (np. ważona suma rang obu metod). Wagi dobieramy na zestawie testowym (17), nie „na oko".
5. **Ocena dowodów i etykieta pewności** (7.3).
6. **Uzasadnienie:** krótki tekst „dlaczego ta karta", generowany przez LLM **wyłącznie z pól karty**, z cytatem źródłowym (7.4).
7. **Lista zgodności** (8), jeśli użytkownik poda profil.
8. **Flaga możliwej luki** (7.6).

### 7.3. Etykieta pewności

Trzy poziomy: **wysoka / średnia / niska**. Wyznaczane z: wyniku najlepszego dopasowania, różnicy względem kolejnych, zgodności obu metod wyszukiwania (czy tekstowa i semantyczna wskazują tę samą kartę). Progi dobieramy na zestawie testowym. **Etykieta nie jest prawdopodobieństwem** i nie jest tak opisywana w interfejsie. Użytkownik widzi słowa („mocne dopasowanie", „możliwe dopasowanie", „słabe dopasowanie"), a nie procenty.

### 7.4. Uzasadnienie z cytatem

Format odpowiedzi dla jednego wyniku:

- **Dlaczego pasuje:** 1–2 zdania.
- **Cytat z karty** (krótki, z oznaczeniem źródła i miejscem w karcie), który za tym przemawia.
- **Czego nie wiemy:** pola „nie podano", które mają znaczenie.
- **Dowody:** poziom E0–E3 z jednozdaniowym opisem.

Wymóg techniczny: generator ma dostać tylko wybrane pola karty i polecenie, by nie dodawać faktów spoza nich. Po wygenerowaniu **sprawdzamy automatycznie**, czy cytat występuje w karcie. Jeśli nie — pokazujemy wynik bez uzasadnienia generowanego i z samym fragmentem karty.

### 7.5. Ochrona danych w zapytaniach

Opis problemu może zawierać dane osobowe wpisane przez nieuwagę (imię, telefon, adres, PESEL). Przed zapisem lub wysłaniem do modelu zewnętrznego wykrywamy i maskujemy: numery telefonów, adresy e-mail, PESEL (z kontrolą sumy), numery rachunków. Nazwiska i adresy w tekście swobodnym wykrywamy tylko częściowo, więc **dodajemy komunikat przy polu**: „Nie wpisuj danych osób trzecich". To ograniczenie jest jawnie opisane w dokumentacji.

### 7.6. Możliwa luka (zamiast „brak wyników")

Jury, wpisując hasło i widząc „brak dopasowania", może uznać to za błąd. Dlatego:

- Użytkownik **zawsze** widzi trzy najbliższe wyniki z etykietami.
- Jeśli najlepszy wynik ma etykietę „niska", pod wynikami pojawia się komunikat: „Nie znaleźliśmy mocnego dopasowania. Możesz opisać problem dokładniej albo zgłosić potrzebę do ROPS." Zgłoszenie zapisuje się jako **możliwa luka**.
- W panelu admina zgłoszenia luk są **grupowane** (klasteryzacja po osadzeniach) i widoczne jako ranking: temat, liczba zgłoszeń, rozrzut lokalizacji, przykładowe sformułowania (zanonimizowane).
- Admin ocenia, czy to rzeczywiście luka, czy błąd wyszukiwania (wtedy poprawia słownictwo lub kartę).

To zamienia „nietrafiony wynik" w informację zwrotną dla systemu i dla ROPS.

### 7.7. Zachowanie w przypadkach brzegowych

| Sytuacja | Zachowanie |
| --- | --- |
| Zapytanie 1–2 słowa | Wyszukiwanie tekstowe i semantyczne; prośba o doprecyzowanie, ale z wynikami |
| Zapytanie bardzo długie lub chaotyczne | Skrót do kilku fraz kluczowych (LLM), ze wskazaniem co zrozumiano |
| Zapytanie w innym języku | Obsługa dzięki wielojęzycznym osadzeniom; interfejs po polsku |
| Zapytanie spoza obszaru (np. prośba o poradę medyczną) | Komunikat o zakresie platformy i wskazanie, że to nie jest miejsce na pomoc w kryzysie; link do informacji o pomocy \[ZAŁ: treść do ustalenia z ROPS\] |
| Zapytanie sygnalizujące zagrożenie życia | Natychmiastowe wyświetlenie informacji o numerach alarmowych przed wynikami \[ZAŁ: lista numerów do potwierdzenia\]; brak automatycznej odpowiedzi AI |
| Awaria LLM | Wyniki z pól karty, bez uzasadnienia generowanego; widoczna informacja o trybie ograniczonym |
| Awaria modelu osadzeń | Samo wyszukiwanie tekstowe z odpowiednim komunikatem |
| Pusta baza w demo | Nie występuje: demo ma wczytane dane (syntetyczne lub udostępnione przez ROPS) |

## 8. Dopasowanie transferowe — „czy to u nas zadziała"

### 8.1. Co to jest, a czym nie jest

To **lista kontrolna**: warunki wstępne karty zestawione z odpowiedziami użytkownika.

| Warunek | Odpowiedź użytkownika | Wynik |
| --- | --- | --- |
| konieczny | tak | spełniony |
| konieczny | nie | brak (blokuje lub ostrzega) |
| konieczny | nie wiem | do sprawdzenia |
| pomocny | nie | uwaga (nie blokuje) |

Wynik: trzy sekcje — **Macie to** · **Brakuje** · **Do sprawdzenia** — oraz jedno zdanie podsumowania.

**To nie jest model predykcyjny.** Nie mamy danych, które pokazywałyby, że takie reguły przewidują powodzenie wdrożenia. W interfejsie i w prezentacji nazywamy to „kontrolą warunków", nie „prognozą sukcesu". Żadnej liczby procentowej nie pokazujemy.

### 8.2. Dlaczego i tak jest to wartościowe

Nawet prosta lista oszczędza pytającemu pierwszą rozmowę z ROPS (`czy potrzebujemy lokalu?`), a ROPS widzi, jakich warunków brakuje najczęściej (wartościowa informacja dla naborów grantowych, patrz 11).

### 8.3. Główne ograniczenie

Jakość listy zależy od jakości warunków wyciągniętych z kart. Jeśli karty są opisowe i mało ustrukturyzowane, warunków będzie mało lub będą ogólne. Dlatego proces wczytywania kart zawsze przechodzi przez zatwierdzenie człowieka (11).

## 9. Moduły I–VII — zakres i głębokość

Legenda głębokości: **pełny** = działa od początku do końca; **średni** = główna ścieżka działa; **cienki** = ścieżka demonstracyjna z zapisem w bazie; **makieta** = jawnie oznaczona makieta bez działania.

| # | Moduł \[DOK\] | Opis w Szczepie | Głębokość | Sposób pokazania |
| --- | --- | --- | --- | --- |
| I | Matchmaking | Rozdz. 7 i 8 | **pełny** | Na żywo, z hasłami jury |
| II | Zasobnik wiedzy | Przegląd kart po tematach i grupach; strona karty z materiałami i filmem; widok „Wyzwania Małopolski" | średni | Strona karty, filtr tematów |
| III | Kreator pomysłów | Fiszka (istota, dla kogo, etap); status zgłoszenia; **generator wniosków jako makieta**, bo ROPS ma już działający generator \[WEB\] | średni (fiszka), makieta (wniosek) | Zgłoszenie fiszki do odpowiedzi admina |
| IV | Tester innowacji | Zgłoszenie chęci udziału, krótka ocena i uwagi do karty | cienki | Zgłoszenie widoczne w panelu |
| V | Platforma komunikacji | Wątki przy zgłoszeniu, dopasowaniu i fiszce; statusy; powiadomienia admina; szablony odpowiedzi | **średni–pełny** (kryterium „szybkość komunikacji") | Pełna ścieżka na żywo |
| VI | Panel admina | Kolejka zgłoszeń, zatwierdzanie kart, ranking luk, edycja treści | średni | Ekran admina |
| VII | Middleman Innowacji | Asystent tworzy szkic planu wdrożenia innowacji w formie usługi lokalnej, z cytatami z karty | średni | Szkic dla przykładowej gminy |

**Zasada cięcia zakresu:** jeśli czas się kończy, najpierw tracimy moduły IV i III (wniosek), potem II (film, wyzwania). **Nie tracimy** I, V i VI.

### 9.1. Moduł II — zasobnik wiedzy

- Strona główna Zasobnika: siatka tematów (np. seniorzy, zdrowie psychiczne, dostępność) z liczbą kart.
- Strona karty: czytelny układ z polami z 6.1, osadzonym filmem (jeśli dostępny), linkami do materiałów, poziomem dowodów, listą warunków.
- „Wyzwania Małopolski": widok na podstawie Mapy Wyzwań i raportów, **w takim zakresie, w jakim ROPS dostarczy dane**. Jeśli to tylko dokumenty, pokażemy listę wyzwań z opisem i linkami, bez wizualizacji map.
- Aktualizacja treści: panel admina z edycją pól i wersjonowaniem (11).

### 9.2. Moduł III — kreator pomysłów

- Fiszka: **trzy pola z dokumentu** (istota pomysłu, komu dedykowany, na jakim etapie). Opcjonalnie dodatkowy kontakt.
- Po wysłaniu: numer zgłoszenia, potwierdzenie, status.
- Podpowiedź „podobne rozwiązania już istnieją": po wpisaniu istoty pomysłu system pokazuje podobne karty, by autor mógł zdecydować, czy rozwijać własny pomysł, czy zapoznać się z istniejącym.
- Asystent kreatora (mile widziany w poprzedniej wersji dokumentu; w obecnej brak) — **poza zakresem MVP**; do rozwoju.
- Generator wniosków: ekran pokazujący, jak wniosek mógłby być wstępnie wypełniony z fiszki dla konkretnego naboru. **Oznaczony jako makieta**, bez wysyłania wniosku.

### 9.3. Moduł IV — tester

- Na stronie karty: przycisk „Chcę przetestować" z krótkim formularzem (obszar, rola, kontakt).
- Ocena: krótka skala z komentarzem. **Nie pokazujemy zbiorczych ocen w demo,** bo mielibyśmy tylko dane syntetyczne i byłoby to wprowadzające w błąd.
- Dla admina: lista chętnych per innowacja.

### 9.4. Moduł VII — Middleman innowacji

**Cel \[DOK\]:** dostosowanie innowacji do formy usługi według potrzeb instytucji zgłaszającej się.

**Wejście:** karta innowacji + krótki opis instytucji (typ, wielkość, grupa, zasoby; z formularza profilu). **Wyjście:** szkic dokumentu z sekcjami:

1. Cel i grupa odbiorców.
2. Kroki wdrożenia (kolejność, od czego zacząć).
3. Zasoby potrzebne i dostępne (z listy zgodności).
4. Partnerzy lokalni (z zarejestrowanych chętnych, jeśli są).
5. Ryzyka i pytania otwarte.
6. Czego **nie wiemy** z karty i z kim to ustalić (kontakt do autora).

**Zasady:**

- każde zdanie opiera się na polu karty lub wyraźnie jest oznaczone jako propozycja asystenta;
- koszty, terminy i liczby podajemy tylko jeśli występują w karcie;
- szkic jest oznaczony „Wersja robocza wygenerowana przez AI — do weryfikacji", a przed użyciem trzeba go przejrzeć;
- brak związku z formalnymi wymogami prawnymi (np. przepisami o usługach społecznych); platforma **nie sprawdza zgodności z prawem** i tak to komunikuje.

## 10. Komunikacja i statusy (kryterium „szybkość komunikacji")

Kryterium pyta: „W jaki sposób system powiadamia administratora o nowym pomyśle i jak wygląda ścieżka odpowiedzi do autora?" \[DOK\]. **Szybkość odpowiedzi zależy od ludzi w ROPS, a nie od oprogramowania.** Platforma może zapewnić trzy rzeczy: natychmiastowe potwierdzenie, widoczność kolejki i zmniejszenie wysiłku odpowiedzi.

### 10.1. Maszyna statusów zgłoszenia

```
Nowe ──► Przyjęte (automatycznie) ──► W ocenie ──► Odpowiedziano ──► Zamknięte
                                          │
                                          └──► Przekazane do eksperta ──► Odpowiedziano
```

Każda zmiana statusu zapisuje: kto, kiedy, jaki status. Autor widzi oś czasu własnego zgłoszenia.

### 10.2. Powiadomienia

| Zdarzenie | Odbiorca | Kanał w MVP | Uwagi |
| --- | --- | --- | --- |
| Nowe zgłoszenie lub fiszka | Admin | Licznik i lista w panelu | Powiadomienie e-mail tylko jeśli skonfigurujemy realną wysyłkę; w przeciwnym razie oznaczone jako **symulacja** |
| Potwierdzenie przyjęcia | Autor | Ekran + (opcjonalnie) e-mail | Natychmiastowe |
| Odpowiedź admina | Autor | Status w widoku zgłoszenia + e-mail |  |
| Przypisanie do eksperta | Ekspert | Panel eksperta | Rola demonstracyjna |

### 10.3. Redukcja wysiłku admina

- **Wstępna klasyfikacja** zgłoszenia: temat, grupa, podobne karty i podobne wcześniejsze zgłoszenia (propozycja, nie decyzja).
- **Szablony odpowiedzi** z uzupełnionymi polami (karta, kontakt autora).
- **Wskaźnik czasu oczekiwania** w kolejce; ROPS sam ustala docelowy czas.

### 10.4. Czego nie obiecujemy

Nie podajemy w prezentacji liczb typu „odpowiedź w X godzin". Pokazujemy, że ścieżka jest **mierzalna** (znaczniki czasu, kolejka) i że ROPS może ustawić własne cele.

### 10.5. Moderacja i nadużycia

- Zgłoszenia publiczne nie są wyświetlane innym użytkownikom bez zatwierdzenia admina.
- Limit zgłoszeń z jednego adresu w krótkim czasie; pole pułapka przeciw botom (bez CAPTCHA wymagającej obrazów, ze względu na dostępność).
- Treści obraźliwe: zgłoszenie oznaczane przez admina; baza słów nie jest w MVP.

## 11. Panel administratora (moduł VI)

### 11.1. Widoki

1. **Kolejka zgłoszeń:** filtr statusu, tematu, daty; znacznik „możliwa luka".
2. **Wczytywanie kart:**
   - admin wrzuca PDF lub wkleja tekst,
   - system (LLM) wyciąga pola z 6.1 **jako szkic**,
   - admin widzi szkic obok oryginału, poprawia i zatwierdza,
   - dopiero po zatwierdzeniu karta jest widoczna publicznie i indeksowana.
3. **Ranking luk:** klastry zgłoszeń bez dobrego dopasowania, z liczbą, tematem, przykładami.
4. **Najczęściej brakujące warunki:** zestawienie, jakich warunków wstępnych użytkownicy najczęściej nie spełniają (wartościowe dla planowania naborów).
5. **Zarządzanie treścią:** edycja kart, wersje, dezaktywacja.

### 11.2. Dlaczego wczytywanie przez szkic

Automatyczne wyciąganie pól z PDF będzie czasem błędne (źle rozpoznana tabela, pominięty warunek, pomylona grupa). Błąd na etapie karty psuje wszystko dalej: wyszukiwanie, listę zgodności, szkic Middlemana. Zatwierdzenie człowieka jest więc elementem projektu, a nie opcją. Wpisujemy to w opis jako zaletę (szybkość z zachowaniem kontroli).

### 11.3. Wersjonowanie

Każde zatwierdzenie tworzy nową wersję karty z datą i autorem zmiany. Zgłoszenia i dopasowania odnoszą się do konkretnej wersji, więc po aktualizacji karty widać, które dopasowania mogą być nieaktualne.

## 12. Zastosowanie sztucznej inteligencji

### 12.1. Role i granice

| Zastosowanie | Wejście | Wyjście | Weryfikacja | Zachowanie przy błędzie |
| --- | --- | --- | --- | --- |
| Osadzenia i wyszukiwanie semantyczne | Tekst zapytania, tekst kart | Wektory, ranking | Zestaw testowy (17) | Wyszukiwanie tekstowe |
| Wyciąganie pól z karty (szkic) | PDF/tekst karty | Pola 6.1 + cytaty | **Zatwierdzenie admina** | Admin wypełnia ręcznie |
| Uzasadnienie dopasowania | Pola karty + zapytanie | 1–2 zdania + cytat | Automatyczne sprawdzenie, czy cytat występuje w karcie | Sam fragment karty |
| Streszczenie zapytania | Długi opis | Słowa kluczowe | Użytkownik widzi, co zrozumiano | Oryginalny tekst |
| Klasteryzacja luk | Zgłoszenia | Grupy tematyczne | Przegląd admina | Lista chronologiczna |
| Middleman: szkic planu | Karta + profil | Szkic z sekcjami | Cytaty i oznaczenie „do weryfikacji" | Szablon pustych sekcji z polami karty |

### 12.2. Zasady

1. AI **nigdy nie tworzy faktów o innowacjach.** Odpowiada wyłącznie na podstawie zatwierdzonych kart.
2. AI **nie podejmuje decyzji** o zgłoszeniach, grantach ani dopuszczeniu treści.
3. Wszystkie treści generowane są oznaczone w interfejsie.
4. Każda funkcja AI ma tryb awaryjny (tabela wyżej), więc platforma działa bez modelu.
5. Nie ma ogólnego chatbota. AI jest wbudowana w konkretne kroki.

### 12.3. Wybór modeli — decyzje do podjęcia na miejscu

- **Osadzenia:** BGE-M3 (lokalnie, na CPU lub GPU) jako kandydat. Wymaga sprawdzenia: czas osadzenia zapytania na serwerze demo i jakość dla polskiego tekstu. Alternatywa: osadzenia przez API zewnętrzne (kosztem zależności i wysyłania tekstu zapytań poza serwer).
- **LLM:** dwie ścieżki.
  - *Zewnętrzne API:* wyższa jakość i szybkie uruchomienie; koszt zmienny; dane zapytań opuszczają serwer (wymaga maskowania z 7.5 i zapisu w polityce prywatności).
  - *Model lokalny:* prywatność i brak kosztu zmiennego; wolniejszy i słabszy w polskim; ryzyko dla demo online.
  - **Rekomendacja robocza \[ZAŁ\]:** zewnętrzne API w demo (z maskowaniem) i dokumentacja ścieżki lokalnej jako opcji wdrożeniowej. Wyniki tego kompromisu trzeba przedstawić uczciwie. Dla instytucji publicznej wybór dostawcy i lokalizacji danych będzie odrębną decyzją.
- Regulamin HubMI nie zawiera zakazu płatnych API w tym zadaniu (zakaz dotyczył innego wyzwania), ale **nie przeczytałem regulaminu w całości**. Potwierdzić.

## 13. Dostępność i prostota użycia

**Standard docelowy:** WCAG 2.1 poziom AA \[DOK w wcześniejszej wersji opisu; w obecnym tekście wymóg nie jest wymieniony wprost, ale traktujemy go jako standard wewnętrzny — dotyczy instytucji publicznej i odbiorców, w tym seniorów i osób z niepełnosprawnościami\].

### 13.1. Zasady interfejsu

- **Jeden ekran startowy, jedna czynność:** duże pole „Opisz problem" i przycisk.
- Maks. trzy pytania doprecyzowujące naraz; odpowiedzi „tak / nie / nie wiem".
- Duża czcionka bazowa, możliwość powiększenia do 200% bez utraty treści.
- Kontrast tekstu spełniający AA; **informacja nigdy nie jest przekazywana samym kolorem** (etykiety słowne przy pewności i zgodności).
- Pełna obsługa klawiaturą, widoczny fokus, logiczna kolejność, link „przejdź do treści".
- Semantyczny HTML, etykiety pól, role i komunikaty dla czytników ekranu (komunikaty statusu ogłaszane programowo).
- Błędy opisane słowami z podpowiedzią naprawy, nie samym podświetleniem.
- Bez limitów czasowych na wypełnianie formularza; zapis szkicu w przeglądarce \[ZAŁ: ostrożnie, bez danych wrażliwych\].
- Filmy z napisami; transkrypcja tekstowa dla materiałów z Biblioteki **jeśli ROPS dostarczy materiały**. Bez napisów nie możemy tego zagwarantować.

### 13.2. Tryb prostego języka

Przełącznik „Prosty tekst": skraca i upraszcza opis karty i wyniki. ROPS sam publikuje materiały w łatwym tekście \[WEB\], więc to naturalna zgodność. Zasady:

- tekst generowany jest oznaczony („Uproszczone automatycznie");
- jest generowany z karty, nie „z głowy";
- nie zastępuje certyfikowanego łatwego tekstu i tak jest opisany.

### 13.3. Jak będziemy to sprawdzać

1. Automatyczny audyt (np. axe lub Lighthouse) na kluczowych ekranach.
2. Ręczny test: pełna ścieżka tylko klawiaturą.
3. Test z czytnikiem ekranu (co najmniej jeden dostępny w systemie).
4. Powiększenie 200% i widok mobilny.
5. **Jeśli się uda:** krótki test z 2–3 osobami spoza branży IT na miejscu. Nie jest to badanie reprezentatywne i nie wolno tak go przedstawiać.

Wynik zgłaszamy jako „sprawdzone automatycznie i ręcznie, bez testów z udziałem osób z niepełnosprawnościami", chyba że takie testy faktycznie się odbędą.

## 14. Bezpieczeństwo, prywatność, odpowiedzialność

### 14.1. Dane

- **W demo:** wyłącznie dane syntetyczne oraz materiały udostępnione przez ROPS, **bez prawdziwych danych osobowych** \[DOK\]. Dane syntetyczne są wyraźnie oznaczone w interfejsie (np. baner „Dane przykładowe").
- **Minimalizacja:** wyszukiwanie bez logowania i bez zapisu tożsamości; kontakt tylko przy zgłoszeniach, w których jest potrzebny.
- **Retencja \[ZAŁ\]:** zgłoszenia przechowywane przez określony czas, następnie anonimizacja; usunięcie na żądanie. Konkretne okresy ustala administrator danych (ROPS).
- **Dostęp:** role (publiczny, admin, ekspert), uwierzytelnianie dla paneli. W demo — konta demonstracyjne wyraźnie oznaczone.
- **Środowisko produkcyjne:** wymaga umowy powierzenia z dostawcami, oceny skutków, wyboru lokalizacji danych. Poza zakresem hackathonu.

### 14.2. Zagrożenia i środki

| Zagrożenie | Środek |
| --- | --- |
| Dane osobowe w opisie problemu | Maskowanie (7.5), komunikat przy polu, brak publikacji bez zatwierdzenia |
| Wstrzyknięcie poleceń do LLM przez tekst zgłoszenia lub PDF | Rozdzielenie danych od instrukcji, ograniczenie wyjścia do pól strukturalnych, sprawdzanie cytatów, brak wykonywania akcji przez model |
| Sfałszowane lub złośliwe karty | Każda karta zatwierdzana przez admina |
| Spam | Limity, pole pułapka |
| Wyciek sekretów | Klucze w zmiennych środowiskowych, nie w kodzie |
| Błędne dopasowanie niosące szkodę | Zakres platformy (7.7), oznaczenia, kontakt z człowiekiem |
| Użytkownik w kryzysie wpisuje zgłoszenie na platformie | Komunikat o zakresie i informacja o pomocy (7.7) |

### 14.3. Zgodność prawna — co trzeba sprawdzić

Poza zakresem opisu, ale do wpisania w plan: RODO (administrator, podstawa prawna, powierzenie), wymogi dostępności cyfrowej dla podmiotów publicznych (ROPS opublikował deklarację dostępności własnej strony \[WEB\]), wymogi przejrzystości dotyczące AI. **Nie jestem prawnikiem; niczego tu nie rozstrzygam.**

## 15. Architektura techniczna (propozycja)

Zasada: jedna aplikacja, prosta i możliwa do utrzymania przez małą instytucję. Mikroserwisów nie używamy.

| Warstwa | Propozycja \[ZAŁ\] | Uzasadnienie |
| --- | --- | --- |
| Frontend | Aplikacja webowa z renderowaniem po stronie serwera lub lekki framework; semantyczny HTML jako baza | Dostępność, szybkość ładowania, prostota |
| Backend | Jedna aplikacja (np. Python/FastAPI lub Node) z modułami: wyszukiwanie, karty, zgłoszenia, wątki, administracja | Szybkie prototypowanie, jedno wdrożenie |
| Baza | PostgreSQL lub SQLite (przy tej skali dane i wektory \~200 kart nie wymagają osobnej bazy wektorowej) | Prostota |
| Wyszukiwanie tekstowe | Wbudowane wyszukiwanie pełnotekstowe bazy + polska normalizacja | Brak dodatkowej usługi |
| Osadzenia | BGE-M3 lub inny model wielojęzyczny; wektory liczone przy zatwierdzaniu karty | Indeksowanie z wyprzedzeniem |
| LLM | Interfejs zamienny (zewnętrzne API / model lokalny) | Możliwość zmiany dostawcy |
| Powiadomienia | Warstwa abstrakcji; w MVP panel + opcjonalnie e-mail | Prosta podmiana na realne kanały |
| Hosting | Jeden serwer lub platforma kontenerowa; publiczny link do dema | Wymóg zgłoszenia |
| Repozytorium | Publiczne lub udostępnione jury | Element opcjonalny, ale wzmacnia wiarygodność |

### 15.1. Skalowalność i integracje \[DOK: wymagania techniczne\]

- **Dane z całego województwa:** wolumen kart (rząd setek) i zgłoszeń (tysiące rocznie) jest mały dla współczesnych baz. Wąskim gardłem nie będzie technologia, tylko **jakość i aktualność danych** oraz **pracownicy moderujący**.
- **Duża liczba użytkowników jednocześnie:** wyszukiwanie obciąża głównie model osadzeń i LLM. Środki: pamięć podręczna dla popularnych zapytań, kolejka dla generowania szkiców, limity. Testów obciążeniowych na hackathonie nie przeprowadzimy; opiszemy to jako ograniczenie.
- **Integracja z innymi systemami Hubu (np. bazą grantową):** otwarte API (odczyt kart, zapis zgłoszeń), webhooki na zdarzenia (nowa fiszka, zmiana naboru), eksport danych (CSV/JSON). **W MVP zaimplementujemy eksport i prosty webhook, jeśli starczy czasu; pełna integracja to rozwój.** Format bazy grantowej nie jest nam znany.
- **Automatyzacja powiadomień o zmianach w naborach:** w MVP — model „nabór" z datami i stanem; powiadomienie dla zainteresowanych tematem jest zaplanowane, nie zbudowane.

## 16. Koszt utrzymania i niezbędne zasoby

Wymóg \[DOK\]: przewidywany koszt obsługi i utrzymania oraz opis zasobów. **Nie podam kwot, których nie umiem uzasadnić.** Poniżej struktura kosztu z parametrami do wypełnienia, a pod nią to, co da się powiedzieć już teraz.

### 16.1. Składniki

| Składnik | Od czego zależy | Jak oszacować |
| --- | --- | --- |
| Hosting aplikacji i bazy | Liczba użytkowników, wymagania dostępności | Cennik wybranego dostawcy po wyborze konfiguracji |
| Inferencja LLM i osadzeń | Liczba zapytań miesięcznie × średnia długość × cena modelu; przy modelu lokalnym — koszt serwera | `koszt = zapytania × (tokeny_wej × cena_wej + tokeny_wyj × cena_wyj)`; ceny pobrać z aktualnego cennika |
| Kopie zapasowe, monitoring, domena, certyfikaty | Standardowe usługi | Cenniki dostawców |
| Praca merytoryczna: aktualizacja kart, moderacja, odpowiedzi | Liczba nowych kart i zgłoszeń | godziny tygodniowo × stawka |
| Utrzymanie techniczne: aktualizacje, bezpieczeństwo, naprawy | Złożoność aplikacji | godziny miesięcznie |
| Audyt dostępności (zewnętrzny) | Zakres ekranów | Wycena audytora; zwykle jednorazowo i po zmianach |
| Szkolenie pracowników ROPS | Liczba osób | jednorazowo |

### 16.2. Co można już powiedzieć

- **Największym kosztem będzie najpewniej praca ludzi** (moderacja, aktualizacja treści, odpowiedzi), a nie infrastruktura. To założenie \[ZAŁ\] wynikające z małej skali danych; do sprawdzenia po wycenie.
- Konstrukcja ogranicza koszt zmienny: AI wywoływana tylko w konkretnych krokach, pamięć podręczna, tryb awaryjny bez AI.
- Konstrukcja ogranicza zależność od dostawcy: wymienne interfejsy LLM i osadzeń.
- Dopiero po wyborze hostingu i modelu wpiszemy do zgłoszenia konkretne kwoty z aktualnych cenników, z datą pobrania i jawnymi założeniami o liczbie zapytań. **Jeśli nie zdążymy tego zrobić rzetelnie, w zgłoszeniu zapiszemy parametry i wzór, a nie zgadniętą liczbę.**

## 17. Ocena trafności i testy

### 17.1. Zestaw testowy trafności

- 25–30 zapytań napisanych przez nas w stylu różnych użytkowników: potoczne („samotni starsi ludzie"), urzędowe („zapobieganie wykluczeniu osób starszych"), jednosłowne („tłumacz"), nietypowe i niezwiązane z żadną kartą.
- Dla każdego zapytania wcześniej (przed uruchomieniem wyszukiwania) zapisujemy, które karty uważamy za trafne — najlepiej po konsultacji z mentorem ROPS, który zna zasoby.
- Metryki: czy trafna karta jest w pierwszej trójce; porównanie trzech wariantów: (a) tylko słowa kluczowe, (b) tylko semantyka, (c) hybryda.
- Wagi hybrydy dobieramy na **połowie** zestawu, a wynik raportujemy na **drugiej połowie**, żeby nie oceniać siebie na tym, na czym się strojono.

**Uczciwe ograniczenia:** mały zbiór, napisany przez autorów i wcześniej przejrzany. To **wstępny test**, nie dowód skuteczności. W prezentacji tak go nazywamy.

### 17.2. Testy funkcjonalne

| Obszar | Przypadek |
| --- | --- |
| Wyszukiwanie | Zapytania z zestawu 17.1; zapytanie puste; bardzo długie; z danymi osobowymi (maskowanie) |
| Zgodność | Wszystkie kombinacje tak/nie/nie wiem dla warunku koniecznego i pomocniczego |
| Uzasadnienie | Cytat obecny w karcie; cytat sfałszowany → odrzucenie |
| Statusy | Pełna ścieżka od zgłoszenia do zamknięcia; zmiany statusu zapisane |
| Admin | Zatwierdzenie karty z szkicu; edycja; nowa wersja; dezaktywacja |
| Awarie | Wyłączony LLM; wyłączone osadzenia; brak sieci do API |
| Dostępność | Ścieżka klawiaturą; audyt automatyczny; powiększenie 200% |
| Bezpieczeństwo | Wstrzyknięcie poleceń w tekście zgłoszenia i w PDF (test z oznaczonymi próbami) |

## 18. Plan budowy na 24 godziny (dwie osoby)

Termin: start 3.10.2026, godz. 11:00, koniec 4.10.2026, godz. 11:00 \[DOK: regulamin HubMI\]. Zgłoszenie po terminie nie jest oceniane \[DOK\]. **Planujemy zakończenie pracy z zapasem co najmniej 1,5 godziny.** Podział poniżej jest propozycją i zakłada, że obie osoby potrafią wykonać oba rodzaje pracy; role warto zamienić, jeśli ktoś blokuje się na zadaniu.

| Godz. od startu | Cel | Rezultat kontrolny |
| --- | --- | --- |
| 0–1 | Rozpoznanie: stoisko ROPS (format kart, Mapa Wyzwań, filmy, dane przykładowe), potwierdzenie wag i terminów, decyzja o prawach | Notatka z ustaleniami |
| 1–3 | Szkielet aplikacji, baza, model danych, wczytanie pierwszych 15–20 kart (ręcznie sprawdzonych) | Karty widoczne na stronie |
| 3–7 | **Matchmaking:** wyszukiwanie tekstowe + semantyczne, trzy wyniki, etykieta pewności; równolegle makiety UX | Działa wyszukiwanie na hasłach testowych |
| 7–11 | **Komunikacja i panel:** zgłoszenie, statusy, kolejka admina, odpowiedź; flagi luk | Pełna ścieżka zgłoszenie → odpowiedź |
| 11–13 | Uzasadnienia z cytatami, kontrola cytatów | Wynik z cytatem i sprawdzeniem |
| 13–16 | Zgodność (lista) i Middleman (szkic) | Szkic dla przykładowej gminy |
| 16–19 | Dostępność (audyt, poprawki), tryb awaryjny, zestaw testowy trafności i pomiar | Raport audytu, wynik testu trafności |
| 19–21 | Moduły cienkie (tester, zasobnik), dane demo, uporządkowanie | Pełne demo bez ręcznych poprawek |
| 21–23 | Prezentacja (10 slajdów), film do 3 min, dokument kosztów, makiety, repozytorium | Materiały gotowe |
| 23–23,5 | Złożenie zgłoszenia, sprawdzenie linków z osobnej przeglądarki bez logowania | Potwierdzenie złożenia |

**Zasady zarządzania ryzykiem czasu:**

- Co ok. 4 godziny przegląd: czy rdzeń nadal działa? Jeśli nie — wstrzymujemy nowe funkcje.
- Nic nowego po godzinie 21. Poprawiamy tylko błędy.
- Dane demo i film nagrywamy na wersji, która **już działa**, z zapasem czasu na ewentualny powtórny nagrywany materiał.
- Odpoczynek: przy pracy dwuosobowej planujemy co najmniej krótkie, naprzemienne przerwy; błędy z przemęczenia kosztują więcej niż godzina snu na miejscu.

## 19. Demo i film

### 19.1. Scenariusz demo na żywo (ok. 3–4 minuty)

1. **Kontekst (15 s):** „Gmina ma problem, a w Małopolsce jest blisko 200 sprawdzonych innowacji. Skąd ma wiedzieć, która pasuje?"
2. **Wyszukiwanie (45 s):** pracownik fikcyjnego GOPS wpisuje problem własnymi słowami. Trzy wyniki z etykietą pewności, uzasadnieniem i cytatem.
3. **„Czy zadziała u nas" (45 s):** trzy pytania, lista Macie / Brakuje / Do sprawdzenia. Jedno rozwiązanie wypada, bo wymaga czegoś, czego nie ma.
4. **Hasło od jury (30 s):** jury wpisuje własne hasło; system odpowiada i pokazuje, jak uzasadnia wynik. Jeśli wynik jest słaby, pokazujemy flagę możliwej luki.
5. **Komunikacja (45 s):** zgłoszenie fiszki jako mieszkaniec → panel admina z powiadomieniem → odpowiedź → status widoczny u autora, ze znacznikami czasu.
6. **Panel i luki (30 s):** ranking luk, brakujące warunki, zatwierdzanie szkicu nowej karty.
7. **Middleman (30 s):** szkic planu z cytatami i sekcją „czego nie wiemy".
8. **Koszty i rozwój (15 s):** jeden slajd.

Dane przykładowe w całym demo mają widoczny baner „Dane przykładowe".

### 19.2. Film do 3 minut

Ta sama historia w wersji skróconej, z napisami. Hostowany w miejscu, które nie wymaga logowania \[DOK: dostępne, otwarte repozytorium, link\]. Przed złożeniem sprawdzamy odtwarzanie w oknie prywatnym.

### 19.3. Prezentacja PDF (maks. 10 slajdów)

1. Problem i dowód skali (dane z dokumentów, z oznaczeniem źródła). 2. Użytkownicy. 3. Rozwiązanie w jednym zdaniu i zrzut. 4. Matchmaking. 5. Kontrola warunków i dowody. 6. Komunikacja i panel. 7. Middleman. 8. Dostępność i bezpieczeństwo. 9. Wdrożenie i koszty. 10. Ograniczenia i droga rozwoju.

## 20. Mapa wymagań

Dla każdego wymagania podaję źródło, mechanizm, test i **status planowany** (na tym etapie nic nie jest zrealizowane). Dwa warianty kryteriów oceny są podane obok siebie, bo nie wiem, który obowiązuje.

### 20.1. Wymagania formalne i funkcjonalne

| ID | Wymaganie | Źródło | Mechanizm | Test | Status |
| --- | --- | --- | --- | --- | --- |
| R1 | Matchmaking społeczny | \[DOK\] oba | Rozdz. 7 | 17.1 | Planowany |
| R2 | Wyszukiwanie podobnych przypadków i informacji | \[DOK\] | Wyszukiwanie + podobne zgłoszenia/karty | 17.2 | Planowany |
| R3 | Propozycja gotowych rozwiązań | \[DOK\] | Trzy wyniki z uzasadnieniem | 17.2 | Planowany |
| R4 | Zasobnik wiedzy | \[DOK\] | 9.1 | Przegląd | Planowany |
| R5 | Kreator pomysłów (fiszka) | \[DOK\] | 9.2 | 17.2 | Planowany |
| R6 | Generator wniosków | \[DOK\] | Makieta | — | Planowany jako makieta |
| R7 | Tester | \[DOK\] | 9.3 | 17.2 | Planowany |
| R8 | Platforma komunikacji | \[DOK\] | Rozdz. 10 | 17.2 | Planowany |
| R9 | Panel admina | \[DOK\] | Rozdz. 11 | 17.2 | Planowany |
| R10 | Middleman innowacji | \[DOK\] | 9.4 | 17.2 | Planowany |
| R11 | Nazwa i opis rozwiązania | \[DOK\] | Ten dokument | — | Szkic |
| R12 | PDF do 10 slajdów lub film do 3 min | \[DOK\] | 19.2–19.3 | Sprawdzenie dostępu | Planowany |
| R13 | Link do działającego dema | \[DOK\] | Hosting | Test z innej przeglądarki | Planowany |
| R14 | Makiety UX/UI | \[DOK\] | Makiety ekranów | Przegląd | Planowany |
| R15 | Koszt obsługi i utrzymania | \[DOK\] | Rozdz. 16 | — | Szkic |
| R16 | Brak prawdziwych danych osobowych | \[DOK\] | 14.1 | Przegląd danych | Planowany |
| R17 | Skalowalność, integracje, bezpieczeństwo | \[DOK\] | 15.1, 14 | Opis; bez testu obciążenia | Częściowo (opis) |
| R18 | Zgłoszenie po polsku | \[DOK\] | Polski interfejs i materiały | — | Planowany |

### 20.2. Kryteria oceny — dwa warianty

**Wariant A: cztery kryteria z nowszego opisu (bez wag) \[DOK\]**

| Kryterium | Odpowiedź projektu | Weryfikacja | Ryzyko |
| --- | --- | --- | --- |
| Intuicyjność | Jedno pole, trzy pytania, tryb prosty | Ścieżka klawiaturą, ewentualny test z osobami spoza IT | Brak testów z seniorami |
| Szybkość komunikacji | Statusy, powiadomienia, szablony, znaczniki czasu | Pełna ścieżka na żywo | Realna szybkość zależy od ROPS |
| Trafność dopasowania | Hybryda, etykieta pewności, test trafności | Zestaw 17.1, hasła jury | Jakość danych w kartach |
| Pomysłowość | Kontrola warunków, luki jako sygnał, Middleman z cytatami | Demo | Zarzut „katalog z AI" |

**Wariant B: wcześniejszy PDF — wagi \[DOK\]**

| Kryterium | Waga | Odpowiedź projektu | Ryzyko |
| --- | --- | --- | --- |
| Stopień spełnienia wyzwania | 40% (obowiązkowy 10%, każdy dodatkowy +5%) | Siedem modułów jako widoki jednego silnika | Cienkie moduły IV i III |
| Potencjał wdrożeniowy | 20% | Prosta architektura, wymienne interfejsy, wzór kosztów | Brak liczb kosztów, jeśli nie zdążymy |
| Dostępność i intuicyjność | 20% | Rozdz. 13 | Brak testów z użytkownikami |
| Atrakcyjność i jakość interfejsu | 10% | Makiety, spójny interfejs | — |
| Jakość materiałów i MVP | 10% | Prezentacja, film, demo | Zmęczenie pod koniec |

Liczba punktów za dodatkowe moduły wynika z mojego odczytu wzoru „10% + 5% za każdy kolejny", a nie z odrębnego zapisu organizatora.

## 21. Rejestr uczciwości — co jest czym

Rejestr zostanie zaktualizowany na koniec pracy. **Obecnie wszystko ma status „zaplanowane".** Docelowo każda funkcja dostaje jedną z etykiet:

| Etykieta | Znaczenie |
| --- | --- |
| Zaimplementowana i przetestowana | Działa, a przypadki z 17.2 przeszły |
| Zaimplementowana | Działa, bez pełnych testów |
| Tryb demonstracyjny | Działa na danych syntetycznych lub z symulowanym kanałem (np. e-mail) |
| Częściowa | Opisana ścieżka działa, brak przypadków brzegowych |
| Makieta | Tylko wygląd |
| Zaplanowana | W planie rozwoju |

Szczególnie jawnie oznaczamy: powiadomienia e-mail (jeśli symulowane), generator wniosków (makieta), dane GUS (jeśli nie zweryfikowane), wyniki testu trafności (wstępny, mały zestaw), brak testów z osobami z niepełnosprawnościami, brak testów obciążeniowych.

## 22. Krytyczny przegląd: gdzie ten projekt może zawieść

| # | Ryzyko | Prawdopodobieństwo i skutek \[ZAŁ\] | Środek |
| --- | --- | --- | --- |
| 1 | Dane w Bibliotece nie nadają się do automatycznego wyciągnięcia warunków (karty zbyt ogólne) | Średnie; osłabia mechanizm kontroli warunków | Ręczna weryfikacja 15–20 kart; jeśli warunków brak, pokazujemy „nie podano" i skupiamy się na dowodach i podobieństwie |
| 2 | Hasła jury nie trafiają w karty | Średnie; uderza w „trafność dopasowania" | Hybryda, słowniczek synonimów z kart, trzy wyniki zawsze, test z różnymi stylami zapytań |
| 3 | Zarzut „katalog + chatbot, nic nowego" | Średnie | Kontrola warunków i luki; demo koncentruje się na tym, czego katalog nie robi |
| 4 | Zbyt szeroki zakres dla dwóch osób | Wysokie | Linie cięcia (rozdz. 9); stały przegląd co 4 godziny |
| 5 | Awaria zewnętrznego API w czasie demo | Niskie–średnie; wysoki skutek | Tryb awaryjny; nagranie demo jako zapas; pamięć podręczna wyników dla haseł demo — **oznaczona**, bez udawania działania na żywo |
| 6 | Halucynacje w uzasadnieniach i szkicach | Średnie | Cytat sprawdzany automatycznie; ograniczenie do pól karty |
| 7 | Zgłoszenia z danymi osobowymi lub w kryzysie | Pewne w realnym użyciu | Maskowanie, komunikat o zakresie, informacja o pomocy |
| 8 | Brak informacji o formacie danych bazy grantowej | Pewne | Eksport i webhook jako interfejs; pełna integracja w rozwoju |
| 9 | Nieznane wagi kryteriów | Pewne | Plan działa przy obu wariantach (20.2); pytanie do mentora |
| 10 | Cesja praw na PROIDEA jako warunek wypłaty | Pewne; skutek strategiczny | Decyzja przed startem; przy odmowie rezygnujemy z nagrody |
| 11 | Zmęczenie, błędy w ostatnich godzinach | Wysokie | Zamrożenie funkcji po godz. 21, bufor na zgłoszenie |
| 12 | Użytkownicy nie zaufają dopasowaniom AI | Średnie | Cytaty, jawne braki, kontakt z człowiekiem |

## 23. Decyzje do podjęcia przed lub na początku pracy

1. **Prawa:** czy akceptujecie przeniesienie praw majątkowych na PROIDEA jako warunek nagrody? \[DOK\]
2. **Wagi kryteriów:** zapytać mentora ROPS, czy 40/20/20/20 nadal obowiązuje.
3. **Dane:** zapytać o format Biblioteki Innowacji i Mapy Wyzwań oraz o liczbę kart.
4. **LLM:** zewnętrzne API z maskowaniem czy model lokalny (12.3).
5. **Zakres dodatkowych modułów:** czy po godzinie 7, jeśli rdzeń działa szybciej niż planowano, dokładamy asystenta kreatora, czy dopracowujemy dostępność i trafność? Moja rekomendacja: dopracowywać rdzeń.
6. **Dostęp do filmów:** czy ROPS udostępni filmy i napisy.

## 24. Plan po hackathonie

| Etap | Zakres | Wymaga |
| --- | --- | --- |
| Natychmiast | Zebranie uwag jury i ROPS; poprawa wyszukiwania na pełnym zbiorze kart | Dane od ROPS |
| Krótkoterminowo | Pełny import Biblioteki z procesem zatwierdzania; badania z użytkownikami (w tym seniorzy i osoby z niepełnosprawnościami); audyt dostępności | Czas pracowników ROPS, budżet na audyt |
| Średnioterminowo | Integracja z bazą grantową; powiadomienia o naborach; prawdziwe uwierzytelnianie; pełna zgodność RODO | Decyzje instytucjonalne |
| Rozwój | Asystent kreatora; generator wniosków pod konkretny nabór; mapa luk w skali gmin; pilotaż z kilkoma CUS | Współpraca z ROPS i gminami |
| Eksperyment weryfikujący wartość | Pilotaż z 3–5 gminami: ile zapytań prowadzi do kontaktu, ile do próby wdrożenia; porównanie z dotychczasowym sposobem szukania | Zgoda uczestników |

## 25. Lista kontrolna zgłoszenia

- [ ] Nazwa i opis rozwiązania (po polsku)
- [ ] PDF do 10 slajdów lub film do 3 min w otwartym repozytorium (link sprawdzony w oknie prywatnym)
- [ ] Link do działającego dema, bez wymaganego konta
- [ ] Makiety UX/UI (dostępne publicznie lub dołączone)
- [ ] Szacunek kosztów utrzymania i opis zasobów (z parametrami i założeniami)
- [ ] Repozytorium kodu (opcjonalnie) bez sekretów
- [ ] Zrzuty ekranu (opcjonalnie)
- [ ] Rejestr uczciwości zaktualizowany
- [ ] Dane demo oznaczone jako przykładowe; brak danych osobowych
- [ ] Złożenie przed 4.10.2026, godz. 11:00, z zapasem

---

# ZAŁĄCZNIK — przykładowa karta innowacji (SYNTETYCZNA)

> To wymyślony przykład do demonstracji struktury. **Nie jest to innowacja ROPS ani rzeczywista inicjatywa.**

**Tytuł:** „Telefon na dzień dobry" (przykład) **Streszczenie:** Wolontariusze dzwonią raz w tygodniu do osób starszych, które zgłosiły chęć rozmowy. **Problemy:** samotność, brak codziennego kontaktu społecznego. **Grupa docelowa:** osoby 70+, mieszkające samodzielnie, z dostępem do telefonu. **Elementy:** lista chętnych, grupa wolontariuszy, krótkie szkolenie z rozmowy, prowadzący koordynator. **Warunki wstępne:**

- koordynator, 4 godziny tygodniowo (typ: kadra, waga: konieczny);
- grupa 8–12 wolontariuszy (typ: kadra, waga: konieczny);
- lokal na szkolenie wstępne (typ: zasób, waga: pomocny);
- współpraca z lokalną instytucją, która zna odbiorców (typ: partner, waga: konieczny). **Dowody:** poziom E1 — testowane w mikroskali przez grupę 10 osób, bez formalnej ewaluacji. **Kontakt:** instytucja prowadząca (dane przykładowe).

**Przykładowe zapytanie:** „samotni seniorzy po zamknięciu klubu". **Przykładowy wynik:** mocne dopasowanie; cytat z opisu problemu; czego nie wiemy: koszt i liczba godzin szkolenia; dowody E1. **Lista zgodności dla gminy bez koordynatora:** Macie: lokal. Brakuje: koordynator. Do sprawdzenia: partner lokalny.
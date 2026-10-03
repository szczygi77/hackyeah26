# PAUZA — lokalna warstwa ochrony przed manipulacją w trakcie oszustwa finansowego

**Zadanie:** HackYeah 2026 · Defence (partner: Bank Pekao)
**Zespół:** Michał + Marlena (2 osoby)
**Status dokumentu:** opis koncepcji i planu. **Nic nie jest jeszcze zaimplementowane ani przetestowane.** „Pauza" to nazwa robocza (do zmiany; bez nazwy i logo banku).

**Oznaczenia:** **[DOK]** z dokumentacji zadania · **[WEB]** ze źródła internetowego (dostęp 3.10.2026) · **[ZAŁ]** założenie lub hipoteza do weryfikacji.

---

## 1. Streszczenie

Oszustwa „na pracownika banku" nie są pojedynczą podejrzaną wiadomością. To scenariusz: SMS z linkiem, telefon od „konsultanta", presja czasu, polecenie wykonania przelewu lub podania kodu BLIK. Kontrole po stronie banku widzą dopiero ostatni krok (przelew), często już w pełni autoryzowany przez ofiarę. Dzieje się to w momencie, gdy człowiek jest pod presją i nie ma kogo zapytać.

**Pauza** to aplikacja na Androida, która **lokalnie, na telefonie** łączy kilka słabych sygnałów (nieznany rozmówca, link w SMS-ie, otwarcie aplikacji bankowej w trakcie rozmowy, nietypowy przelew) w jedną ocenę sytuacji. Gdy sytuacja wygląda jak atak, **przerywa automatyzm działania**: ostrzega w trakcie rozmowy, a przy przelewie zleconym przez aplikację wymusza krótką, realną pauzę. Nie blokuje decyzji finansowych i nie wysyła treści wiadomości ani rozmów nigdzie poza telefon.

**Trzy zasady projektu:**
1. **Bezobsługowość:** zero codziennej obsługi. Jednorazowy onboarding (1–2 minuty), potem cisza aż do chwili, gdy trzeba zadziałać.
2. **Prywatność z architektury:** analiza na urządzeniu, na zewnątrz nie wychodzi treść, lista kontaktów ani log połączeń.
3. **Człowiek decyduje:** system nie podejmuje decyzji finansowych za użytkownika, tylko daje mu czas i konkretny następny krok.

---

## 2. Problem

### 2.1 Kogo dotyczy i w jakich okolicznościach
Każdego użytkownika telefonu i bankowości mobilnej. Szczególnie narażone są osoby, które nie znają mechanizmów socjotechniki (np. seniorzy), ale atak jest skuteczny także wobec osób świadomych, bo opiera się na presji i autentycznie wyglądającym kontekście. Typowa sekwencja [DOK z waszego opisu scenariusza; wzorzec powszechnie opisywany]: wiadomość o „zagrożeniu konta" → telefon „z banku" → presja i izolacja („nie rozłączaj się") → przelew „zabezpieczający" lub kod BLIK.

### 2.2 Jak ludzie radzą sobie dziś
Opierają się na własnej czujności, ostrzeżeniach banku i ogólnych kampaniach edukacyjnych. W momencie ataku nikt nie przypomina im zasady „rozłącz się i oddzwoń".

### 2.3 Dlaczego obecne rozwiązania są niewystarczające
- Kontrole bankowe widzą sesję i transakcję, ale nie widzą, **co wydarzyło się wcześniej na telefonie**.
- W oszustwach socjotechnicznych ofiara sama autoryzuje przelew, więc poprawne dane logowania i prawidłowe uwierzytelnienie niczego nie zdradzają.
- Rozwiązania antyfraudowe po stronie banku już dziś wykorzystują m.in. sygnał aktywnej rozmowy w trakcie sesji bankowej **[WEB]**: BioCatch opisuje wykrywanie aktywnej rozmowy podczas transferu oraz zachowań takich jak niecodzienne wpisywanie czy zawahanie; Discovery Bank pokazuje użytkownikom ostrzeżenia, gdy rozmawiają przez telefon, korzystając z aplikacji. Według BioCatch mniej niż 1% użytkowników Androida rozmawia przez telefon w trakcie bankowości mobilnej, co czyni ten sygnał bardzo selektywnym.

### 2.4 Luka (hipoteza)
**[ZAŁ — do weryfikacji]** Rozwiązania te działają **po stronie banku i w jego aplikacji**. Brakuje lokalnej warstwy po stronie klienta, która: (a) działa niezależnie od tego, której aplikacji bankowej używa człowiek, (b) widzi kontekst *przed* otwarciem aplikacji (SMS z linkiem, nieznany rozmówca), (c) nie przekazuje nikomu treści. Trzeba to potwierdzić przeglądem konkurencji (część 11).

### 2.5 Konsekwencje braku rozwiązania
Utrata środków przez ofiarę, spadek zaufania do bankowości, koszty obsługi reklamacji i dochodzeń. **Skala problemu w Polsce nie jest tu zweryfikowana danymi** i musi być uzupełniona źródłem przed prezentacją.

---

## 3. Rozwiązanie

### 3.1 Co robi system
1. Obserwuje na telefonie kilka sygnałów (część 4).
2. Ocenia je **razem** w ruchomym oknie czasowym, nie osobno.
3. Gdy ocena przekroczy próg: ostrzega w trakcie rozmowy (poziom miękki) lub wymusza pauzę przed przelewem (poziom twardy).
4. Zapisuje lokalnie tylko etykiety zdarzeń, nie treść, z krótkim czasem przechowywania.
5. Daje użytkownikowi pełny wgląd w to, co „widzi", oraz przycisk usunięcia wszystkiego i wypisania się.

### 3.2 Czego system **nie** robi
- Nie zapisuje ani nie wysyła treści SMS-ów, rozmów, kontaktów ani historii połączeń.
- Nie blokuje przelewów i nie podejmuje decyzji za użytkownika.
- Nie twierdzi, że rozmówca jest oszustem. Komunikuje ryzyko i zaleca niezależną weryfikację.
- Nie jest gwarancją bezpieczeństwa ani systemem ratunkowym.

---

## 4. Sygnały i uprawnienia

Wszystkie sygnały są przetwarzane wyłącznie na urządzeniu. Nazwy mechanizmów Androida to wstępny kierunek **[ZAŁ — do potwierdzenia w dokumentacji i testu na waszym telefonie]**.

| ID | Sygnał | Źródło (kierunek) | Wymagane uprawnienie | Opuszcza telefon? |
|---|---|---|---|---|
| S1 | Trwa lub trwała rozmowa z numerem spoza kontaktów albo podającym się za bank/instytucję (lista) | Stan połączenia | Dostęp do stanu telefonu | Nie |
| S2 | Rozmowa dłuższa niż próg (np. 3 min) | Stan połączenia | j.w. | Nie |
| S3 | W oknie czasowym przyszedł SMS/powiadomienie z linkiem od nadawcy spoza kontaktów | Odczyt powiadomień (metadane: nadawca, obecność URL) | Dostęp do powiadomień | Nie |
| S4 | Link wygląda podejrzanie (analiza lokalna adresu: skracacze, domeny łudząco podobne do banków, punycode, nietypowe końcówki) | Analiza ciągu URL, **bez ładowania strony** | brak | Nie |
| S5 | W treści powiadomienia występują frazy presji lub podszycia (lokalna lista wzorców PL) | Odczyt powiadomień (treść przetwarzana w pamięci, **nie zapisywana**) | j.w. | Nie |
| S6 | W trakcie rozmowy otwarto aplikację bankową z listy | Detekcja aplikacji na pierwszym planie (nazwa pakietu z listy banków) | Dostęp do statystyk użycia (nadawany ręcznie w ustawieniach) | Nie |
| S7 | Przelew do nowego odbiorcy (brak w historii rachunku) | Historia rachunku (adapter banku) | Zgoda klienta w banku (tylko ścieżka PIS/AIS) | Zapytanie do banku (standardowe) |
| S8 | Kwota nietypowa lub duży odsetek salda | j.w. | j.w. | j.w. |

**Wyjaśnienie S6 (kluczowe):** to sygnał, który obejmuje także **BLIK** i przelewy w oficjalnej aplikacji banku. Nie wymaga integracji z API banku. Czy działa niezawodnie na waszym telefonie, trzeba sprawdzić w pierwszej godzinie.

**Spoofing:** wyświetlany numer nie jest dowodem tożsamości. Dlatego S1 obejmuje nie tylko „nieznane numery", ale też numery podające się za bank (lista skonfigurowana w aplikacji), traktowane jako **niezaufane**.

---

## 5. Silnik oceny (reguły)

Silnik jest **deterministyczny**, bez modelu językowego w rdzeniu. Reguły i wagi leżą w jednym pliku `rules.json`, używanym przez aplikację i symulator webowy.

### 5.1 Okno i punktacja
Ruchome okno zdarzeń (np. 60 minut). Wstępne wagi **[ZAŁ — hipotezy do skalibrowania na zestawie testowym, nie wyniki empiryczne]**:

| Sygnał | Waga |
|---|---|
| S1 niezaufany rozmówca | 2 |
| S2 długa rozmowa | 1 |
| S3 SMS z linkiem od obcego | 1 |
| S4 link podejrzany | 2 |
| S5 frazy presji/podszycia | 1–2 |
| S6 aplikacja bankowa w trakcie rozmowy | 3 |
| S7 nowy odbiorca | 2 |
| S8 nietypowa kwota | 1–2 |

### 5.2 Progi i warunek konieczny
- **Warunek konieczny ostrzeżenia:** wystąpił sygnał niezaufanego kontaktu (S1 lub S4). Sam nowy odbiorca albo sama kwota nie uruchamiają ostrzeżenia (to robi bank).
- **Poziom 0 (cisza):** suma poniżej progu ostrzeżenia.
- **Poziom 1 (miękki):** suma ≥ 4. Powiadomienie w trakcie rozmowy.
- **Poziom 2 (twardy):** suma ≥ 7 przy zleceniu przelewu przez aplikację, lub po otwarciu aplikacji bankowej w trakcie rozmowy z wysokim wynikiem.

### 5.3 Zapobieganie zmęczeniu ostrzeżeniami
- Maksymalnie jedno ostrzeżenie na „epizod" (np. na 10 minut).
- Przycisk „to znany numer" dodaje numer do lokalnej listy zaufanych (powrót do poziomu 0 dla tego numeru).
- Każde ostrzeżenie pokazuje **przyczynę** w języku zwykłego człowieka („Rozmawiasz z nieznanym numerem po SMS-ie z linkiem").

### 5.4 Rola AI
W MVP AI nie jest potrzebna do rdzenia. Reguły i lokalne wzorce wystarczają, a prostszy algorytm jest tu bardziej przewidywalny i weryfikowalny. Opcjonalnie (poza MVP): funkcja „sprawdź tę wiadomość" na wyraźne życzenie użytkownika, z komunikatem, że treść opuści telefon przy użyciu modelu zdalnego, lub lokalny model, jeśli sprzęt pozwoli.

---

## 6. Interwencje

### 6.1 Poziom miękki — ostrzeżenie w trakcie rozmowy
Powiadomienie systemowe, widoczne nad każdą aplikacją, bez konieczności otwierania Pauzy. Treść (przykład):

> **Zatrzymaj się na chwilę.** Rozmawiasz z numerem spoza kontaktów po otrzymaniu SMS-a z linkiem. Bank nie prosi o przelew „zabezpieczający" ani o kod BLIK. **Rozłącz się i zadzwoń na numer z karty lub ze strony banku.**

### 6.2 Poziom twardy — pauza przed przelewem
Dotyczy przelewu zleconego **przez aplikację Pauza** (ścieżka PIS). Elementy, które mają **łamać skrypt oszusta**, a nie tylko wyświetlić baner:
- Krótkie odliczanie przed aktywacją przycisku „Kontynuuj" (np. 60 s) dla poziomu wysokiego.
- Jedno pytanie kontrolne: „Czy rozmówca prosił o przelew, kod lub instalację aplikacji?"
- Wyraźny krok: „Rozłącz się i oddzwoń."
- Opcja: zadzwoń do zaufanej osoby jednym dotknięciem.

Użytkownik **zachowuje kontrolę**: może kontynuować po pauzie.

### 6.3 Alert dla zaufanej osoby (dodatek, poza MVP)
Opcjonalna wiadomość do wskazanej osoby (np. członka rodziny) o fakcie wystąpienia sytuacji wysokiego ryzyka, **bez treści i bez danych rozmówcy**. Najprostsza zgodna z prywatnością wersja: aplikacja przygotowuje wiadomość, a **użytkownik sam ją wysyła** (brak dodatkowego uprawnienia do wysyłania SMS).

### 6.4 Bezpieczne otwieranie linków
Pauza oferuje otwarcie linków przez własny, izolowany widok: **najpierw analiza adresu bez ładowania strony** (S4), a dopiero potem opcjonalne otwarcie z wyłączonymi skryptami. Pełne przejęcie otwierania linków w systemie może wymagać ustawienia domyślnej przeglądarki **[ZAŁ — do sprawdzenia]**. Alternatywa: akcja „Sprawdź link" w powiadomieniu.

---

## 7. Architektura

### 7.1 Komponenty

```text
┌────────────────────────── TELEFON (Android) ──────────────────────────┐
│                                                                         │
│  Usługa w tle (Kotlin, foreground service)                              │
│   ├─ CallMonitor            (stan połączenia, numer: kontakt / nie)     │
│   ├─ NotificationMonitor    (nadawca, URL, frazy; treść NIE zapisywana) │
│   ├─ ForegroundAppMonitor   (czy otwarta aplikacja z listy banków)      │
│   └─ LinkAnalyzer           (lokalna analiza adresu URL)                │
│              │ zdarzenia (etykiety, bez treści)                         │
│              ▼                                                          │
│  RuleEngine  ◄──────  rules.json (wagi, progi, listy)                   │
│              │ ocena + przyczyny                                        │
│              ├────► Powiadomienie systemowe (poziom miękki)             │
│              ▼                                                          │
│  Magazyn lokalny (szyfrowany, TTL, tylko etykiety)                      │
│              ▲                                                          │
│  Interfejs (React w Capacitor)                                          │
│   ├─ Onboarding i zgody       ├─ Pauza przed przelewem (poziom twardy)  │
│   ├─ „Co widzę, a czego nie"  └─ Usuń wszystko / Wypisz się             │
│              │                                                          │
│              ▼                                                          │
│  BankAdapter (interfejs)                                                │
│   ├─ MockBank        (lokalna makieta, jawnie oznaczona)                │
│   └─ PekaoSandbox    (PolishAPI 2.1.1, jeśli uda się uzyskać dostęp)    │
└─────────────────────────────────────────────────────────────────────────┘
                    │ (tylko zlecenie przelewu i historia rachunku)
                    ▼
              API banku (PSD2/PolishAPI)

Symulator webowy (TypeScript): ten sam rules.json, scenariusze sterowane
z panelu, bez dostępu do prawdziwego telefonu (plan zapasowy demo).
```

### 7.2 Wybory techniczne i uzasadnienie
- **Capacitor + React (interfejs) + Kotlin (usługa w tle):** React sam nie obsłuży stanu połączenia ani powiadomień, a ten sam interfejs służy aplikacji i demo webowemu. Ryzyko: stabilność usługi w tle zależy od producenta telefonu. Kluczowy test w pierwszej godzinie.
- **Reguły w Kotlinie przy źródle sygnałów**, a nie w WebView: WebView w tle jest zawodny. Plik `rules.json` jest wspólną specyfikacją, a symulator ma prosty port tej samej logiki. Ryzyko rozjazdu logiki trzeba ograniczyć wspólnym zestawem testów scenariuszy.
- **BankAdapter jako interfejs:** pozwala podmienić makietę na sandbox bez zmian w reszcie systemu.
- **Brak backendu w rdzeniu:** nic nie wysyłamy na serwer, więc nie ma co wyciec.
- **Aplikacja instalowana z pliku `.apk`:** wystarcza na hackathon. Wdrożenie przez sklep wymagałoby zgodności z zasadami uprawnień Google **[ZAŁ — sprawdzić]**.

### 7.3 Integracja z bankiem
- **Co daje API [DOK z opisu Pekao]:** PIS (zlecenie przelewu), AIS (informacje o rachunku), CAF, autoryzacja. **Nie daje:** SMS-ów, połączeń, zdarzeń sesji aplikacji bankowej ani sygnałów antyfraudowych.
- **Dostęp do sandboxa — niepotwierdzony [WEB]:** rejestracja według dokumentacji odbywa się przez dynamiczną rejestrację klienta ze `software_statement` i rolami w `QC_Statement`, a nieoficjalny projekt społeczności wskazuje na konieczność certyfikatów testowych. Pytania: organizator, mentor Pekao, developerportal@pekao.com.pl.
- **Plan awaryjny:** `MockBank` o kształcie zgodnym z PolishAPI, **zawsze jawnie oznaczony jako makieta**.
- **Produkcja:** korzystanie z produkcyjnego API wymaga zgody organu nadzoru **[DOK z opisu Pekao]**. Realistyczna droga wdrożenia to moduł dostarczony **bankowi** (patrz część 14), a nie samodzielny TPP.
- **Dane w sandboxie są syntetyczne:** „typowa kwota klienta" to demonstracja mechanizmu, nie dowód skuteczności.

---

## 8. Prywatność i bezpieczeństwo

### 8.1 Zasady
- **Minimalizacja:** analiza treści powiadomień odbywa się w pamięci, bez zapisu. Przechowywane są wyłącznie etykiety (np. „SMS z linkiem od obcego, 10:31", „rozmowa niezaufana, 10:34, 6 min").
- **Retencja:** krótki czas przechowywania etykiet (np. 24 h, do ustalenia). Po upływie automatyczne usunięcie.
- **Szyfrowanie magazynu** lokalnego mechanizmami systemu.
- **Brak transferu poza telefon**, z wyjątkiem standardowych zapytań do banku przy przelewie.
- **Transparentność:** ekran „Co widzę, a czego nie" pokazuje aktualnie odczytywane typy sygnałów i ostatnie zapisane etykiety.
- **Kontrola użytkownika:** jeden przycisk usuwający wszystkie dane oraz wypisanie się z usługi (wyłączenie usług w tle i wycofanie uprawnień).
- **Klauzula informacyjna:** musi odpowiadać faktom. Przy architekturze lokalnej: dane przetwarzane i przechowywane wyłącznie na urządzeniu użytkownika, bez administrowania nimi przez zespół. **Treść klauzuli i podstawy prawne wymagają weryfikacji prawnej** (nie jestem prawnikiem).

### 8.2 Zagrożenia dla samego systemu

| Zagrożenie | Ograniczenie |
|---|---|
| Fałszywe powiadomienia udające Pauzę (phishing) | Ostrzeżenia wyłącznie z własnej, rozpoznawalnej ikony i kanału; w instrukcji zasada „Pauza nigdy nie prosi o kod ani przelew" |
| Spoofing numeru banku | Numer nigdy nie jest dowodem; lista numerów podszywających się traktowana jako niezaufana |
| Złośliwa aplikacja czyta magazyn | Szyfrowanie, minimalna zawartość (etykiety), krótka retencja |
| Oszust nakłania do kliknięcia „Kontynuuj" | Odliczanie, pytanie kontrolne, krok „rozłącz się i oddzwoń" |
| Użytkownik wyłącza uprawnienia | Prosty komunikat o ograniczonej ochronie; brak nacisku |

### 8.3 Granice odpowiedzialności
Pauza **zmniejsza ryzyko**, nie eliminuje go. Nie obejmuje oszustw bez rozmowy i SMS-a (np. fałszywa inwestycja w serwisie), ani sytuacji, w której użytkownik świadomie zignoruje ostrzeżenie. Ta lista trafia do prezentacji.

---

## 9. Mapowanie wymagań zadania Defence [DOK]

| Kryterium (waga) | Odpowiedź projektu | Weryfikacja w demo | Braki / ryzyko |
|---|---|---|---|
| Idea & Innovation (30%) | Ocena **całej sytuacji** lokalnie, wielokanałowo, bez wysyłania treści; interwencja łamiąca skrypt | Scenariusz na żywo, ekran „Co widzę" | Sygnały składowe znane (część 11); nowość to kombinacja, nie pojedyncza funkcja |
| Relation to Category (20%) | Zadanie wprost: „lepsze decyzje pod presją", wspieranie weryfikacji podejrzanych treści, utrudnione warunki | Realistyczny atak, niepełne informacje, brak sieci | — |
| Practical Applicability / Usability (20%) | Zero codziennej obsługi, jasny komunikat, konkretny następny krok | Reakcja bez dotykania telefonu | Zależność od uprawnień Androida; fałszywe alarmy |
| Design (20%) | Spójny, uspokajający interfejs w duchu bankowości (bez kopiowania marki) | Ekran ostrzeżenia, pauzy, „Co widzę" | Czas na dopracowanie |
| Completeness & Implementation Value (10%) | Działający rdzeń + mock banku + testy scenariuszy | Przebieg end-to-end | Brak testów z użytkownikami |

**Wymagania formalne [DOK]:** tytuł, nazwa zespołu, skład, opis, PDF do 10 slajdów. Opcjonalnie repozytorium, demo, zrzuty. Nagroda 8 000 PLN; do nagrody min. 50% punktów w pierwszym etapie. Prawa autorskie zostają przy autorach. **Istotne użycie AI i zewnętrznych komponentów trzeba ujawnić; zespół musi umieć wyjaśnić swój kod. Elementy sprzed startu trzeba jasno oddzielić.**

**Do potwierdzenia u organizatora:** godzina startu i końca (regulamin Defence: od 23:00 3.10 do 23:00 4.10), platforma zgłoszeń (regulamin: HackTribe; opis: Challenge Rocket), użycie nazwy banku w materiałach.

---

## 10. Zakres MVP i statusy

Status wszystkich pozycji na dziś: **planowane** (nic nie zbudowano).

**Poziom 1 — MVP (wymagany do demo):**
1. Onboarding i zgody; ekran „Co widzę, a czego nie".
2. CallMonitor + NotificationMonitor + ForegroundAppMonitor (S1, S3, S5, S6).
3. Silnik reguł z `rules.json` i lokalnym magazynem etykiet.
4. Ostrzeżenie miękkie w trakcie rozmowy.
5. Usuń wszystko / wypisz się.
6. Przelew przez `MockBank` z pauzą (poziom twardy) i S7/S8.
7. Symulator webowy z tymi samymi regułami.

**Poziom 2 — wyróżniki (dopiero po działającym rdzeniu):**
- LinkAnalyzer (S4) i bezpieczne otwieranie linków.
- Lista numerów podszywających się + obsługa spoofingu.
- Alert dla zaufanej osoby (wiadomość wysyłana przez użytkownika).
- `PekaoSandbox`, jeśli dostęp się uda.

**Poziom 3 — po hackathonie:** screening połączeń przez rolę systemową, wersja iOS (ograniczenia systemu), pilotaż z bankiem, kalibracja na realnych danych, audyt bezpieczeństwa.

---

## 11. Przegląd istniejących rozwiązań [WEB, wstępny]

| Rozwiązanie | Co robi | Ograniczenie wobec Pauzy |
|---|---|---|
| BioCatch (po stronie banku) | Wykrywa aktywną rozmowę podczas sesji, zachowania behawioralne (m.in. zawahanie, nietypowe wpisywanie), modele przeciw oszustwom socjotechnicznym | Działa w kanale bankowym; nie widzi SMS-a i rozmówcy sprzed otwarcia aplikacji (hipoteza) |
| Discovery Bank (aplikacja banku) | Wykrywa rozmowę podczas korzystania z aplikacji, wyświetla ostrzeżenia | Tylko w aplikacji tego banku |

**Do sprawdzenia przed budową (30–60 min):** funkcje ochrony przed oszustwami w Google Messages i Google Phone, narzędzia producentów telefonów, ostrzeżenia w polskich aplikacjach bankowych (w tym Pekao), inne projekty hackathonowe. **Jeśli któreś z nich robi lokalną, wielokanałową ocenę sytuacji, trzeba zmienić uzasadnienie innowacji.**

---

## 12. Scenariusze demonstracji

Wszystkie dane testowe jawnie oznaczone jako testowe.

**A. Atak „na pracownika banku" (główny, ~60 s):**
1. Drugi telefon wysyła SMS z linkiem „zagrożenie konta".
2. Dzwoni z nieznanego numeru.
3. Telefon z Pauzą: cisza (jeden sygnał to za mało).
4. Użytkownik otwiera aplikację bankową w trakcie rozmowy → **ostrzeżenie miękkie** z przyczyną.
5. Próba przelewu na nowego odbiorcę przez aplikację → **pauza twarda** z krokiem „rozłącz się i oddzwoń".
6. Ekran „Co widzę" pokazuje, że żadna treść nie została zapisana.

**B. Scenariusz niewinny (kurier):** nieznany numer, brak SMS-a z linkiem, brak aplikacji bankowej → **cisza**. Pokazuje, że system nie krzyczy bez przyczyny.

**C. Spoofing:** numer z listy „podszywających się pod bank" traktowany jako niezaufany.

**D. BLIK:** otwarcie aplikacji bankowej w trakcie rozmowy z niezaufanym numerem → ostrzeżenie bez udziału API banku.

**E. Link:** podejrzany adres analizowany lokalnie, strona nieładowana.

**Warstwy demo:** na żywo na telefonie (drugi dowolny telefon jako „oszust") → symulator webowy (plan zapasowy) → nagranie.

---

## 13. Testy

- Zestaw scenariuszy w JSON (atakujące i niewinne), uruchamiany tym samym silnikiem w aplikacji i symulatorze.
- Kryterium akceptacji: każdy scenariusz A–E daje oczekiwany poziom (0/1/2).
- Test dymny: usługa w tle działa kilka minut z wyłączonym ekranem.
- Raport: liczba wykrytych i fałszywych alarmów **na zestawie syntetycznym**. Opisujemy to wyraźnie jako test mechanizmu, **nie dowód skuteczności w rzeczywistości**. Testów z użytkownikami nie przeprowadzono.

---

## 14. Potencjał wdrożeniowy

- **Użytkownik:** klient bankowości mobilnej.
- **Płatny odbiorca [ZAŁ]:** bank, jako moduł (biblioteka lub funkcja w aplikacji), motywowany ograniczeniem strat i kosztów obsługi oszustw. Model rozliczeń to hipoteza, nie ustalenie.
- **Bariery:** uprawnienia Androida i zasady sklepu Google, brak odpowiednika na iOS, kwestie prawne i RODO, konieczność kalibracji na realnych danych, ryzyko fałszywych alarmów.
- **Eksperyment weryfikujący:** pilotaż z małą grupą ochotników, pomiar liczby ostrzeżeń, odsetka uznanych za zasadne i odsetka użytkowników, którzy po ostrzeżeniu się rozłączyli.

---

## 15. Ryzyka i plan awaryjny

| Ryzyko | Prawdopodobieństwo/skutek (moja ocena) | Ograniczenie |
|---|---|---|
| Wykrywanie aplikacji na pierwszym planie nie działa na telefonie | M / wysokie | Test w 1. godzinie; plan A: jawne wejście od użytkownika („ktoś do mnie dzwoni") |
| Usługa w tle ubijana przez system | M / wysokie | Foreground service, test, wyłączenie optymalizacji baterii na demo |
| Brak sandboxa banku | M–H / średnie | `MockBank`, jawnie oznaczony |
| Fałszywe alarmy w demo | M / średnie | Progi, scenariusz B, jawne przyczyny |
| Rozjazd logiki aplikacji i symulatora | M / średnie | Wspólny `rules.json` i wspólne scenariusze testowe |
| Okazuje się, że lokalne rozwiązanie już istnieje | L–M / wysokie | Przegląd konkurencji; zmiana uzasadnienia innowacji |
| Zbyt duży zakres na 2 osoby | H / wysokie | Ścisły podział na poziomy; Poziom 2 dopiero po działającym Poziomie 1 |

**Plan A przy porażce wykrywania systemowego:** wersja z jawnym wejściem od użytkownika (przycisk lub udostępnienie podejrzanej wiadomości), nadal z lokalną oceną i pauzą.

---

## 16. Plan 24 godzin (propozycja)

| Czas od startu | Zadanie |
|---|---|
| 0–1 h | Testy wykonalności: stan połączenia, powiadomienia, aplikacja na pierwszym planie, usługa w tle; zapytanie o sandbox; przegląd konkurencji |
| 1–6 h | Rdzeń: monitory + silnik + `rules.json` + ostrzeżenie miękkie |
| 6–12 h | Interfejs, `MockBank`, pauza twarda, „Co widzę", usuń wszystko |
| 12–16 h | Symulator webowy, zestaw scenariuszy, testy |
| 16–20 h | Wyróżniki Poziomu 2 (linki, spoofing); alert dla zaufanej osoby tylko jeśli starczy czasu |
| 20–23 h | Prezentacja (PDF do 10 slajdów), film, próba demo |
| 23–24 h | Zgłoszenie, bufor; zamrożenie zmian |

---

## 17. Plan rozwoju po hackathonie

Kalibracja progów na realnych (zanonimizowanych, zgodnych z prawem) danych; screening połączeń przez rolę systemową; lokalny model do klasyfikacji treści; rozszerzenie na oszustwa na przedsiębiorców i fałszywe faktury; wersja na iOS w granicach możliwości systemu; pilotaż z bankiem; audyt bezpieczeństwa i analiza prawna.

---

## 18. Otwarte pytania (do weryfikacji)

1. Czy dostęp do sandboxa Pekao jest dostępny dla uczestników i na jakich warunkach?
2. Czy wykrywanie aplikacji bankowej na pierwszym planie działa niezawodnie na waszym telefonie?
3. Czy podobne lokalne, wielokanałowe rozwiązanie już istnieje?
4. Jaka jest godzina startu i końca oraz właściwa platforma zgłoszeń?
5. Czy wolno użyć nazwy banku w materiałach?
6. Jaki jest akceptowalny prawnie zakres odczytu powiadomień i treść klauzuli informacyjnej?
7. Jakie dane o skali oszustw w Polsce można uczciwie przytoczyć w prezentacji (źródło)?

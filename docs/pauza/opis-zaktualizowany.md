# PAUZA — lokalna warstwa ochrony przed manipulacją w trakcie oszustwa finansowego

**Zadanie:** HackYeah 2026 · Defence (partner: Bank Pekao)
**Zespół:** Michał + Marlena (2 osoby)
**Status dokumentu:** opis koncepcji i planu. **Nic nie jest jeszcze zaimplementowane ani przetestowane.** „Pauza" to nazwa robocza (do zmiany; bez nazwy i logo banku).

**Oznaczenia:** **[DOK]** z dokumentacji zadania · **[WEB]** ze źródła internetowego (dostęp 3.10.2026) · **[ZAŁ]** założenie lub hipoteza do weryfikacji.

---

## 1. Streszczenie

Oszustwa „na pracownika banku" nie są pojedynczą podejrzaną wiadomością. To scenariusz: SMS z linkiem, telefon od „konsultanta", presja czasu, polecenie wykonania przelewu lub podania kodu BLIK. Kontrole po stronie banku widzą dopiero ostatni krok (przelew), często już w pełni autoryzowany przez ofiarę. Dzieje się to w momencie, gdy człowiek jest pod presją i nie ma kogo zapytać.

**Pauza** to opcjonalny moduł bezpieczeństwa w istniejącej aplikacji bankowej. Łączy kontekst transakcji, sandbox linków, opcjonalny sygnał aktywnej rozmowy oraz — po osobnej zgodzie — lokalne etykiety ryzyka głosowego (presja, prośba o BLIK/przelew, podszywanie). Gdy sytuacja wygląda na próbę manipulacji, **przerywa automatyzm działania**: pokazuje twarde powiadomienie, blokuje przelew/BLIK/kod do przejścia pauzy i daje ścieżkę zgłoszenia. Nie przesądza, że rozmówca jest oszustem. Użytkownik zachowuje kontrolę, ale przy wysokim ryzyku bank może dodatkowo **schłodzić wypływ środków na ok. 24 h**.

**Zdanie na jury:** Pauza to warstwa decyzji pod presją w appce banku: łączy kontekst transakcji, sandbox linków, sygnał rozmowy i lokalne etykiety ryzyka, a potem łamie skrypt oszusta pauzą oraz ścieżką zgłoszenia — bez nagrywania rozmów do chmury.

**Pięć filarów innowacji:**
1. **Kombinacja w oknie czasowym** — ocena sytuacji, nie pojedynczego sygnału.
2. **Sandbox linków** — analiza URL przed renderem; skrypty wyłączone.
3. **Detekcja presji głosowej on-device** — etykiety ryzyka w RAM; zero audio i zero transkryptu poza urządzeniem.
4. **Friction UX łamiący skrypt** — odliczanie, pytanie, kod z ekranu, wymóg rozłączenia przy twardej rozmowie.
5. **Most do reakcji** — raport do banku / Policji / CERT.PL + chłodzenie transakcji 24 h.

**Zasady projektu:**
1. **Bezobsługowość:** zero codziennej obsługi. Jednorazowy onboarding (1–2 minuty), potem cisza aż do chwili, gdy trzeba zadziałać.
2. **Prywatność z architektury:** minimalny zakres danych; brak stałego odczytu SMS-ów; brak nagrywania i wysyłki rozmów. Audio (opcjonalne) = wyłącznie lokalne etykiety w pamięci.
3. **Człowiek decyduje:** system nie podejmuje ostatecznej decyzji finansowej za użytkownika, tylko daje czas, tarcie i konkretny następny krok.
4. **Model bankowy:** Pauza jest funkcją banku; bank kontroluje autoryzację, dane, bezpieczeństwo i komunikację z klientem.
5. **Działa też bez sygnału rozmowy (S1):** sandbox linków, tryb świadka („Jestem na telefonie”), S7/S8 i pauza przed operacją pozostają aktywne.

**Persona:** każdy klient bankowości mobilnej (nie tylko seniorzy).

---

## 2. Problem

### 2.1 Kogo dotyczy i w jakich okolicznościach
Każdego użytkownika telefonu i bankowości mobilnej. Szczególnie narażone są osoby, które nie znają mechanizmów socjotechniki (np. seniorzy), ale atak jest skuteczny także wobec osób świadomych, bo opiera się na presji i autentycznie wyglądającym kontekście. Typowa sekwencja [DOK z waszego opisu scenariusza; wzorzec powszechnie opisywany]: wiadomość o „zagrożeniu konta" → telefon „z banku" → presja i izolacja („nie rozłączaj się") → przelew „zabezpieczający" lub kod BLIK.

### 2.2 Jak ludzie radzą sobie dziś
Opierają się na własnej czujności, ostrzeżeniach banku i ogólnych kampaniach edukacyjnych. W momencie ataku nikt nie przypomina im zasady „rozłącz się i oddzwoń". Brakuje też mostu do zgłoszenia (bank / Policja / CERT) bez zbędnych danych.

### 2.3 Dlaczego obecne rozwiązania są niewystarczające
- Kontrole bankowe widzą sesję i transakcję, ale nie łączą ich z kontekstem linku, kontaktów i etykiet presji w jednym flow decyzji.
- W oszustwach socjotechnicznych ofiara sama autoryzuje przelew, więc poprawne dane logowania i prawidłowe uwierzytelnienie niczego nie zdradzają.
- Rozwiązania antyfraudowe po stronie banku już dziś wykorzystują m.in. sygnał aktywnej rozmowy w trakcie sesji bankowej **[WEB]**: BioCatch opisuje wykrywanie aktywnej rozmowy podczas transferu oraz zachowań takich jak niecodzienne wpisywanie czy zawahanie; Discovery Bank pokazuje użytkownikom ostrzeżenia, gdy rozmawiają przez telefon, korzystając z aplikacji. Według BioCatch mniej niż 1% użytkowników Androida rozmawia przez telefon w trakcie bankowości mobilnej, co czyni ten sygnał bardzo selektywnym — ale sam w sobie nie łamie skryptu ani nie prowadzi do zgłoszenia.

### 2.4 Luka (hipoteza)
**[ZAŁ — do weryfikacji]** Istnieją sygnały rozmowy w kanale bankowym, ale brakuje spójnej warstwy, która jednocześnie: (a) łączy transakcję + link sandbox + kontakty + opcjonalne etykiety głosowe, (b) wprowadza tarcie UX uniemożliwiające natychmiastową autoryzację BLIK/przelewu pod dyktando, (c) generuje ścieżkę zgłoszenia bez treści rozmowy, (d) działa także gdy OS nie odda stanu połączenia (tryb świadka). Trzeba to potwierdzić przeglądem konkurencji (część 11).

### 2.5 Konsekwencje braku rozwiązania
Utrata środków przez ofiarę, spadek zaufania do bankowości, koszty obsługi reklamacji i dochodzeń. **Skala problemu w Polsce nie jest tu zweryfikowana danymi** i musi być uzupełniona źródłem przed prezentacją.

---

## 3. Rozwiązanie

### 3.1 Co robi system
1. Ocenia sygnały dostępne w aplikacji banku: etap sesji, odbiorcę, kwotę, porę i wzorce transakcji.
2. Opcjonalnie wykorzystuje sygnał aktywnej rozmowy oraz porównanie z kontaktami / listą numerów banku, jeżeli zgoda i OS na to pozwalają.
3. Opcjonalnie (osobna zgoda) uruchamia **ochronę głosową on-device**: lekki detektor klas zdarzeń (presja, BLIK/przelew, podszywanie) → wyłącznie etykieta w RAM; **zero zapisu audio, zero transkryptu, zero wysyłki rozmowy**.
4. Ocenia sygnały razem w ruchomym oknie czasowym, nie osobno.
5. Gdy ocena przekroczy próg: heads-up / pełny ekran ostrzeżenia; przed autoryzacją przelewu, BLIK lub kodu — twarda pauza.
6. Po epizodzie wysokiego ryzyka: proponuje zgłoszenie do banku, generuje raport dla Policji i proponuje wysyłkę do CERT.PL.
7. Przy poziomie 2: bank może ustawić flagę chłodzenia wypływu na ok. 24 h — także gdy użytkownik wybierze „Kontynuuj".
8. Zapisuje wyłącznie etykiety / wynik ryzyka zgodnie z tabelą danych (część 8).
9. Daje wgląd: ekran „Co widzę, a czego nie".

### 3.2 Czego system **nie** robi
- Nie odczytuje stale SMS-ów ani pełnej historii połączeń w MVP.
- Nie nagrywa rozmów, nie przechowuje audio na dysku i nie wysyła treści rozmowy do banku ani chmury.
- Nie twierdzi, że rozmówca jest oszustem; komunikuje sygnały podwyższonego ryzyka.
- Nie inicjuje przelewu jako niezależny dostawca PIS — przelew wykonuje bank w swojej aplikacji.
- Nie jest gwarancją bezpieczeństwa ani systemem ratunkowym.
- **Poza zakresem:** recovery po już wysłanym kodzie BLIK / środkach, które opuściły rachunek.

### 3.3 Ograniczenia prawne i model wdrożenia

Pauza jest funkcją wbudowaną w istniejącą aplikację bankową, a nie osobną aplikacją ani samodzielnym dostawcą usług płatniczych. Bank pozostaje administratorem danych, właścicielem procesu antyfraudowego oraz podmiotem realizującym przelew i jego autoryzację. W produkcji moduł korzysta z wewnętrznych systemów banku, dlatego nie tworzy własnej ścieżki AIS/PIS ani nie działa jako niezależny TPP.

Przed wdrożeniem bank powinien przygotować DPIA, analizę ryzyka, klauzulę informacyjną, politykę retencji, zasady kontroli dostępu oraz testy bezpieczeństwa i fałszywych alarmów. Podstawa uruchomienia funkcji opcjonalnych (rozmowa, kontakty, ochrona głosowa): **zgoda użytkownika** + jasny zakres przetwarzania na slajdzie / w klauzuli. Użytkownik może aktywować i wycofać funkcje zgodnie z wymaganiami banku i systemu operacyjnego.

Google Play ogranicza dostęp do uprawnień SMS i historii połączeń. Dlatego MVP nie zakłada stałego odczytu SMS-ów ani pełnej historii połączeń. **Kontakty (READ_CONTACTS)** wchodzą do MVP po wyjaśnieniu i zgodzie — służą wyłącznie do lokalnego rozróżnienia „znany / nieznany"; treść kontaktów nie wychodzi z urządzenia. Sprawdzenie linku lub wiadomości odbywa się ręcznie albo przez sandbox po działaniu użytkownika.

Pauza może opóźnić i utrudnić ryzykowną operację oraz uruchomić chłodzenie bankowe, ale komunikaty muszą być warunkowe, np. „Wykryliśmy sygnały podwyższonego ryzyka”, a nie „Rozmówca jest oszustem”.

---

## 4. Sygnały i uprawnienia

Wszystkie sygnały są przetwarzane w aplikacji banku, lokalnie lub w bezpiecznym środowisku bankowym. Każda opcjonalna funkcja systemowa wymaga odrębnego wyjaśnienia i działania użytkownika.

| ID | Sygnał | Źródło | Status MVP | Warunek prywatności / wdrożenia |
|---|---|---|---|---|
| S1 | Aktywna rozmowa podczas sesji bankowej | Stan połączenia, jeśli OS i zgoda na to pozwalają | Opcjonalny | Bez nagrywania i bez zapisu treści rozmowy |
| S1b | Numer spoza kontaktów / spoza listy banku | Kontakty (lokalnie) + kanoniczna lista numerów banku | Tak (przy zgodzie na kontakty) | Kontakty nie opuszczają urządzenia; lista banku z backendu |
| S2 | Długa rozmowa | Stan połączenia | Poza podstawowym MVP | Tylko jeśli wdrożono S1 |
| S3 | SMS lub powiadomienie z linkiem | Ręczne udostępnienie przez użytkownika | Opcjonalny | Bez stałego odczytu SMS w MVP |
| S4 | Podejrzany link (sandbox) | Lokalna analiza adresu URL + izolowany widok | Tak (MVP) | Analiza przed załadowaniem strony; skrypty off |
| S5 | Frazy presji w udostępnionej treści | Treść świadomie udostępniona przez użytkownika | Opcjonalny | Analiza jednorazowa, minimalizacja |
| S5v | Etykieta presji głosowej | On-device detektor klas (opcjonalna zgoda) | Mock w demo; produkcja po audycie | Tylko etykieta w RAM → potem flaga; zero audio/transkryptu |
| S6 | Sesja bankowa podczas rozmowy / trybu świadka | Własna aplikacja banku + S1 lub jawne wejście | Tak | Bank zna własną sesję |
| S7 | Przelew / BLIK / kod do nowego lub ryzykownego kontekstu | Wewnętrzne dane banku | Tak | Bez odrębnej ścieżki AIS/PIS |
| S8 | Nietypowa kwota lub zachowanie transakcyjne | Wewnętrzne dane banku | Tak | Reguły dokumentowane i audytowalne |
| S9 | Tryb świadka („Jestem na telefonie") | Jawne wejście użytkownika (1 tap) | Tak | Fallback gdy brak S1 z OS |

**Kluczowa zmiana:** S6 nie wymaga wykrywania obcej aplikacji bankowej. Moduł jest osadzony w aplikacji banku.

**Spoofing:** wyświetlany numer nie jest dowodem tożsamości. Sygnał rozmowy i etykieta głosowa mogą podwyższyć ryzyko, ale nie przesądzają winy rozmówcy.

**Zaufane numery (ochrona przed „dodaj mnie"):**
- Warstwa A: kontakty użytkownika (lokalnie).
- Warstwa B: podpisana lista numerów banku.
- Nie wolno dodać numeru do zaufanych podczas aktywnej rozmowy ani w ciągu 15 min po epizodzie poziomu ≥ 1.
- Dodanie wymaga biometrii / PINu aplikacji.
- Numery z listy „podszywających się" nie mogą stać się zaufane bez cooldownu 24 h + biometrii.

---

## 5. Silnik oceny (reguły)

Silnik jest **deterministyczny**, bez modelu językowego w rdzeniu. Reguły i wagi leżą w jednym pliku `rules.json`, używanym przez aplikację (`.apk`) i symulator webowy (Vercel). W produkcji `rules.json` zmieniają **wyłącznie developerzy / release banku** — nie klient końcowy.

### 5.1 Okno i punktacja
Ruchome okno zdarzeń (np. 60 minut). Wstępne wagi **[ZAŁ — hipotezy do skalibrowania na zestawie testowym, nie wyniki empiryczne]**:

| Sygnał | Waga |
|---|---|
| S1 + S1b niezaufany rozmówca | 2 |
| S2 długa rozmowa | 1 |
| S3 SMS z linkiem od obcego | 1 |
| S4 link podejrzany | 2 |
| S5 / S5v frazy lub etykieta presji | 1–2 |
| S6 sesja bankowa w trakcie rozmowy / trybu świadka | 3 |
| S7 nowy odbiorca / ryzykowny BLIK | 2 |
| S8 nietypowa kwota | 1–2 |
| S9 tryb świadka (jawny) | 2 |

### 5.2 Progi i warunek konieczny
- **Warunek konieczny ostrzeżenia:** co najmniej jeden z: S1b (niezaufany kontakt), S4 (podejrzany link), S5/S5v (presja), S9 (tryb świadka). Sam nowy odbiorca albo sama kwota nie uruchamiają ostrzeżenia Pauzy (to pozostaje w klasycznym scoringu banku).
- **Poziom 0 (cisza):** suma poniżej progu ostrzeżenia.
- **Poziom 1 (miękki):** suma ≥ 4. Heads-up / ostrzeżenie w aplikacji.
- **Poziom 2 (twardy):** suma ≥ 7 przy zleceniu przelewu, BLIK lub kodu, albo sesja bankowa w trakcie rozmowy/trybu świadka z wysokim wynikiem → pauza + ewentualne chłodzenie 24 h.

### 5.3 Zapobieganie zmęczeniu ostrzeżeniami
- Maksymalnie jedno ostrzeżenie na „epizod" (np. na 10 minut).
- Cel prezentacyjny: **FPR ≤ 2%** sesji „rozmowa + bankowość" przy powyższym warunku koniecznym (kalibracja syntetyczna).
- Każde ostrzeżenie pokazuje **przyczynę** po ludzku („Rozmawiasz z nieznanym numerem po SMS-ie z linkiem").

### 5.4 Rola AI
W MVP AI nie jest potrzebna do rdzenia reguł. Opcjonalny detektor S5v w produkcji to lekki model on-device; w demo hackathonu — **mock etykiety**. Funkcja „sprawdź tę wiadomość" modelem zdalnym tylko na wyraźne życzenie, z komunikatem o opuszczeniu urządzenia.

---

## 6. Interwencje

### 6.1 Poziom miękki — ostrzeżenie
Heads-up / pełny komunikat w aplikacji bankowej (nie nakładka nad obcymi appkami). Treść (przykład):

> **Zatrzymaj się na chwilę.** Ktoś może wywierać presję. Bank nigdy nie każe robić przelewu ani podawać BLIK podczas rozmowy. **Rozłącz się i zadzwoń na numer z karty lub ze strony banku.**

### 6.2 Poziom twardy — pauza przed przelewem / BLIK / kodem
Działa **przed autoryzacją bankową**. Elementy łamiące skrypt:
1. CTA #1: **Rozłącz się i oddzwoń** (preferowana ścieżka; deep link do oficjalnego numeru banku z aplikacji).
2. Odliczanie **20 s** przed odblokowaniem dalszych kroków.
3. Pytanie kontrolne: „Czy rozmówca prosił o przelew, kod lub instalację aplikacji?"
4. **Kod odblokowania** 4–6 znaków widoczny tylko na ekranie pauzy — trzeba go przepisać (utrudnia dyktowanie przez telefon).
5. Przy wykrytej aktywnej rozmowie (S1) lub trybie świadka (S9) i score ≥ progu twardego: samo przepisanie kodu **nie wystarczy** — wymagane rozłączenie **albo** potwierdzenie oddzwonienia na oficjalny numer.
6. BLIK, kod autoryzacyjny i przycisk przelewu pozostają ukryte / zablokowane do przejścia pauzy.
7. Po „Kontynuuj": bank może ustawić **chłodzenie wypływu ~24 h** (flaga antyfraud).

Użytkownik **zachowuje kontrolę** nad anulowaniem lub kontynuacją po pełnej ścieżce tarcia.

### 6.3 Po epizodzie — zgłoszenie (MVP)
Po anulowaniu lub po poziomie 2 system oferuje:
- zgłoszenie zdarzenia do banku,
- wygenerowanie **raportu dla Policji** (szablon bez treści rozmowy),
- propozycję wysyłki / przekazania do **CERT.PL**.

Najprostsza wersja zgodna z prywatnością: aplikacja przygotowuje treść, **użytkownik potwierdza wysyłkę**.

### 6.4 Alert dla zaufanej osoby (poza MVP / cut list)
Opcjonalna wiadomość do wskazanej osoby o fakcie wysokiego ryzyka, bez treści i bez danych rozmówcy; user sam wysyła.

### 6.5 Bezpieczne otwieranie linków (sandbox — MVP)
Najpierw analiza adresu bez ładowania strony (S4), potem opcjonalne otwarcie w izolowanym widoku z wyłączonymi skryptami. Alternatywa: akcja „Sprawdź link". Sandbox jest też główną ścieżką działania **bez S1**.

### 6.6 Tryb świadka (Plan A demo / fallback bez S1)
Przycisk na starcie przelewu/BLIK: **„Jestem na telefonie — włącz ochronę"** (1 tap) → natychmiast pauza + możliwość wklejenia linku do sandboxa → blokada BLIK → raport zgłoszeniowy. Narracja: nawet gdy OS nie odda stanu rozmowy, ofiara ma jeden oczywisty gest awaryjny łamiący izolację.

---

## 7. Architektura

### 7.1 Komponenty
```text
┌────────────────────── ISTNIEJĄCA APLIKACJA BANKU ──────────────────────┐
│ Moduł Pauza                                                            │
│  ├─ SessionMonitor          (własna sesja, etap przelewu/BLIK)         │
│  ├─ TransactionRiskContext  (odbiorca, kwota, wzorce)                  │
│  ├─ OptionalCallSignal      (S1; po zgodzie i wsparciu OS)             │
│  ├─ ContactsTrustCheck      (S1b; lokalnie, po zgodzie)                │
│  ├─ OptionalVoiceLabels     (S5v; on-device, mock w demo)              │
│  ├─ UserInitiatedLinkCheck  (S4 sandbox)                               │
│  ├─ WitnessMode             (S9; jawne „Jestem na telefonie")          │
│  ├─ RuleEngine              (rules.json — tylko release banku)         │
│  ├─ PauseScreen             (20 s, pytanie, kod, rozłącz)              │
│  ├─ ReportBuilder           (bank / Policja / CERT)                    │
│  └─ Bank Security Services  (scoring, hold 24 h, autoryzacja)          │
└────────────────────────────────────────────────────────────────────────┘

Artefakty demo: .apk + symulator webowy na Vercel (ten sam rules.json).
MockBank: makieta wizualnie w duchu bankowości (jak Pekao), bez logo i nazwy banku.
```

### 7.2 Wybory techniczne i uzasadnienie
- **Moduł natywny lub biblioteka bankowa:** logika autoryzacji w kontrolowanym środowisku banku.
- **Reguły deterministyczne:** wspólny `rules.json` dla `.apk` i Vercel.
- **Brak osobnego PIS/AIS.**
- **Brak stałego monitoringu SMS/call log w MVP.**
- **Audio tylko jako etykiety on-device** (w demo: mock).
- **MockBank** jawnie oznaczony; bez logo partnera.

### 7.3 Integracja z bankiem
- Bank realizuje przelew, BLIK, uwierzytelnienie, hold 24 h i ocenę transakcji.
- Brak automatycznego dostępu do treści SMS i treści rozmów.
- Produkcja: akceptacja właściciela appki, security, compliance, IOD, płatności, audyt.

---

## 8. Prywatność i bezpieczeństwo

### 8.1 Zasady
- **Minimalizacja:** treść SMS i audio nie są zapisywane; audio (jeśli włączone) żyje w krótkim buforze RAM i znika.
- **Transparentność:** ekran „Co widzę, a czego nie".
- **Kontrola użytkownika:** wyłączenie funkcji opcjonalnych; wgląd w sygnały.
- **Podstawa prawna (kierunek na slajd):** zgoda + klauzula przetwarzania; **wymaga weryfikacji prawnej banku**.

### 8.2 Tabela danych

| Dane | Gdzie | Retencja | Uwagi |
|---|---|---|---|
| `callActive` (bool) | lokalnie → opcjonalnie flaga do silnika banku | epizod / 24 h | bez numeru w plain text do logów |
| Hash numeru (SHA-256 + salt urządzenia) | lokalnie; opcjonalnie do scoringu | 24 h | nie do LE w raw |
| Zaufany / z kontaktów (bool) | lokalnie + sync listy bankowej | do wycofania zgody | kontakty nie wychodzą z urządzenia |
| Etykiety ryzyka (S1…S9, score, poziom) | lokalnie + zdarzenie antyfraud banku | lokalnie 24 h; bank wg polityki fraud | bez treści SMS/audio |
| URL (domena, wynik S4) | lokalnie w sesji sprawdzenia | sesja / 24 h | pełny URL nie do LE domyślnie |
| Decyzja użytkownika | bank event | jak fraud events | klucz do ISR |
| Raport zgłoszeniowy | generowany lokalnie; wysyłka po akcji usera | kontrola usera | bank / Policja / CERT |
| Audio / transkrypt | **nigdzie** | — | nie zapisywane, nie wysyłane |

**Minimalny ślad antyfraudowy (pakiet zdarzenia):**  
`incident_id`, `timestamp`, `channel`, `signals[]`, `score`, `level`, `user_decision`, `txn_ref?`, `hold_applied`, `report_generated`.

### 8.3 Zagrożenia dla samego systemu

| Zagrożenie | Ograniczenie |
|---|---|
| Phishing udający Pauzę | Tylko inline w flow autoryzacji/BLIK; nigdy jako zewnętrzny link w SMS; zasada „Pauza nigdy nie prosi o hasło, BLIK ani instalację" |
| Spoofing numeru banku | Numer ≠ tożsamość; lista podszywających się; brak zaufania bez cooldownu |
| Malware czyta magazyn | Szyfrowanie, same etykiety, krótka retencja; skompromitowany OS poza gwarancją modułu |
| Oszust dyktuje „Kontynuuj" | 20 s + pytanie + kod z ekranu + wymóg rozłączenia / oddzwonienia + hold 24 h |
| Insider w banku | Minimalny zakres flag, RBAC, audyt dostępu do eventów Pauza |
| Użytkownik wyłącza zgody | Komunikat o ograniczonej ochronie; sandbox i tryb świadka nadal dostępne |

### 8.4 Threat model (warstwy)

| Aktor | Co MVP adresuje | Limit |
|---|---|---|
| Oszust telefoniczny | Pauza, friction, hold 24 h, raport | User może kontynuować po pełnej ścieżce |
| Malware na telefonie | Minimalizacja danych, brak audio na dysku | Skompromitowany OS = poza gwarancją; kontrole serwerowe banku zostają |
| Insider w banku | Minimalne flagi, retencja, RBAC, audyt | Pełny insider threat = proces banku / SOC |

### 8.5 Granice odpowiedzialności (linia na slajd)

> Pauza zmniejsza ryzyko manipulacji i daje czas oraz ścieżkę zgłoszenia. Nie zastępuje czujności klienta ani kontroli banku i nie jest gwarancją braku straty. Ostateczna decyzja o operacji pozostaje po stronie klienta; przy wysokim ryzyku bank może dodatkowo czasowo wstrzymać wypływ środków zgodnie z własnymi procedurami.

Shared responsibility: klient + bank + Pauza. Poza zakresem m.in. recovery po już wysłanym BLIK oraz oszustwa bez kanału rozmowa/link (np. część fałszywych inwestycji online).

---

## 9. Mapowanie wymagań zadania Defence [DOK]

| Kryterium (waga) | Odpowiedź projektu | Weryfikacja w demo | Braki / ryzyko |
|---|---|---|---|
| Idea & Innovation (30%) | 5 filarów: kombinacja + sandbox + etykiety głosowe on-device + friction + most zgłoszeniowy | Scenariusz na żywo, „Co widzę", raport | Sygnał rozmowy znany na rynku; nowość = kombinacja i ścieżka reakcji |
| Relation to Category (20%) | Decyzje pod presją, weryfikacja treści/linków, utrudnione warunki | Realistyczny atak, tryb świadka | — |
| Practical Applicability / Usability (20%) | Zero codziennej obsługi; działa też bez S1; `.apk` + Vercel | Reakcja, blokada BLIK, fallback | Zgody, FPR |
| Design (20%) | Uspokajający UI bankowy; MockBank bez logo | Ekran pauzy, kod, raport | Czas na dopracowanie |
| Completeness & Implementation Value (10%) | Rdzeń + MockBank + testy + raport | End-to-end | Brak testów z użytkownikami |

**Wymagania formalne [DOK]:** tytuł, nazwa zespołu, skład, opis, PDF do 10 slajdów. Opcjonalnie repozytorium, demo, zrzuty. Nagroda 8 000 PLN; do nagrody min. 50% punktów w pierwszym etapie. Prawa zmian zostają przy autorach. **Istotne użycie AI i zewnętrznych komponentów trzeba ujawnić; zespół musi umieć wyjaśnić swój kod. Elementy sprzed startu trzeba jasno oddzielić.**

**Do potwierdzenia u organizatora:** godzina startu i końca, platforma zgłoszeń, użycie nazwy banku w materiałach.

---

## 10. Zakres MVP i statusy

Status wszystkich pozycji na dziś: **planowane** (nic nie zbudowano).

**Poziom 1 — MVP (wymagany do demo):**
1. Onboarding i zgody (w tym kontakty, opcjonalnie rozmowa / ochrona głosowa); ekran „Co widzę, a czego nie".
2. SessionMonitor + TransactionRiskContext (S6, S7, S8) + opcjonalny S1 + S1b (kontakty).
3. Silnik reguł z `rules.json` i lokalnym magazynem etykiet.
4. Sandbox linków (S4).
5. Tryb świadka (S9).
6. Ostrzeżenie miękkie + pauza twarda (20 s, pytanie, kod, rozłącz) z blokadą przelewu/BLIK/kodu.
7. ReportBuilder (bank / Policja / CERT) — przygotowanie + potwierdzenie usera.
8. Mock hold 24 h w MockBank.
9. Usuń wszystko / wypisz się.
10. Artefakty: `.apk` + symulator na Vercel.

**Poziom 2 — wyróżniki (po rdzeniu; pierwsze do cutu):**
- Mock / prototyp S5v (etykieta głosowa) — bez realnego modelu produkcyjnego.
- Lista numerów podszywających się.
- Alert dla zaufanej osoby.
- Integracja z sandboxem banku tylko jeśli dostępna; inaczej MockBank.

**Poziom 3 — po hackathonie:** realny detektor on-device po audycie, iOS, pilotaż, kalibracja, DPIA produkcyjna.

**Cut list przy spóźnieniu 4 h (kolejność wyrzucania):**
1. Alert dla zaufanej osoby  
2. Realny detektor audio (zostaje mock etykiety)  
3. Rozbudowana lista spoofing  
4. Dopieszczanie wizualne MockBank  
5. **Nigdy nie wyrzucaj:** silnik, pauza+kod, blokada BLIK, „Co widzę", raport, scenariusz B, `.apk` lub Vercel  

---

## 11. Przegląd istniejących rozwiązań [WEB, wstępny]

| Rozwiązanie | Co robi | Ograniczenie wobec Pauzy |
|---|---|---|
| BioCatch (po stronie banku) | Wykrywa aktywną rozmowę podczas sesji, zachowania behawioralne, modele vs socjotechnika | Brak sandbox linków + friction kodu + mostu zgłoszeniowego w jednym module klienckim (hipoteza) |
| Discovery Bank (aplikacja banku) | Ostrzeżenia przy rozmowie w aplikacji | Tylko ostrzeżenie; bez opisanej ścieżki raport/CERT/hold 24 h jak w Pauzie |

**Do sprawdzenia przed budową (30–60 min):** Google Messages/Phone, OEM, polskie appki bankowe (w tym Pekao), inne projekty hackathonowe. **Jeśli któreś robi pełną kombinację 5 filarów, trzeba zmienić uzasadnienie innowacji.**

---

## 12. Scenariusze demonstracji

Wszystkie dane testowe jawnie oznaczone jako testowe. Artefakty: `.apk` + Vercel.

**A. Atak „na pracownika banku" (główny, ~60 s):**
1. Drugi telefon: SMS z linkiem „zagrożenie konta".
2. Połączenie z nieznanego numeru.
3. Otwarcie appki → ostrzeżenie miękkie (S1/S1b + kontekst).
4. Próba przelewu / BLIK → **pauza twarda** (20 s, pytanie, kod, rozłącz).
5. Anulowanie → raport bank / Policja / CERT.
6. Ekran „Co widzę": brak zapisu treści rozmowy i SMS.

**B. Scenariusz niewinny (kurier):** nieznany numer, brak linku, brak operacji bankowej → **cisza** (FPR).

**C. Spoofing:** numer z listy podszywających się = niezaufany.

**D. BLIK hard lock:** próba BLIK w trakcie rozmowy / trybu świadka → zablokowane do przejścia pauzy; heads-up czytelny dla każdego.

**E. Link sandbox:** podejrzany adres analizowany lokalnie, strona nieładowana / skrypty off.

**F. Tryb świadka (Plan A bez S1 z OS):** 1 tap „Jestem na telefonie" → pauza → wklejenie linku → blokada BLIK → raport.

**Warstwy demo:** telefon na żywo → Vercel (zapas) → nagranie.

---

## 13. Testy

- Zestaw scenariuszy w JSON (atakujące i niewinne), ten sam silnik w `.apk` i na Vercel.
- Kryterium akceptacji: scenariusze A–F dają oczekiwany poziom (0/1/2).
- Test dymny: MockBank + pauza + blokada BLIK + raport.
- Raport: wykrycia i fałszywe alarmy **na zestawie syntetycznym** — nie dowód skuteczności w rzeczywistości.
- Cel kalibracji syntetycznej: FPR ≤ 2% przy warunku koniecznym z §5.2.

---

## 14. Potencjał wdrożeniowy

- **Użytkownik:** każdy klient bankowości mobilnej.
- **Płatny odbiorca [ZAŁ]:** bank (moduł / biblioteka).
- **Metryka główna — Intervention Success Rate (ISR):** % epizodów poziomu 2, w których użytkownik anulował operację **lub** rozłączył się w ciągu 2 minut od pauzy. Hipoteza pilotażowa: **ISR ≥ 35%** przy **FPR ≤ 2%**.
- **Metryka secondary:** spadek strat z kategorii „socjotechnika telefoniczna" w kohorcie z Pauzą vs kontrola.
- **Bariery:** security/compliance, RODO/DPIA, zgody (kontakty, głos), Google Play, iOS, kalibracja, FPR.
- **Eksperyment:** pilotaż ochotniczy — ISR, uznanie ostrzeżeń za zasadne, odsetek rozłączeń.

---

## 15. Ryzyka i plan awaryjny

| Ryzyko | Prawdopodobieństwo/skutek | Ograniczenie |
|---|---|---|
| S1 (stan połączenia) nie działa | M / wysokie | Tryb świadka S9 + sandbox S4 |
| Realny detektor głosowy niegotowy | H / średnie | Mock etykiety S5v w demo; produkcja po audycie |
| Brak sandboxa Pekao | M–H / średnie | MockBank bez logo/nazwy |
| Fałszywe alarmy | M / średnie | Warunek konieczny, scenariusz B, FPR ≤ 2% |
| Rozjazd `.apk` vs Vercel | M / średnie | Wspólny `rules.json` i scenariusze |
| Konkurencja już ma kombinację | L–M / wysokie | Przegląd; pivot narracji na friction + raport + hold |
| Zbyt duży zakres (2 osoby) | H / wysokie | Cut list z §10 |
| Compliance wokół kontaktów / głosu | M / wysokie | Osobne zgody; audio bez zapisu; DPIA |

**Plan A:** Tryb świadka + sandbox linków + pauza twarda + raport — niezależnie od S1 i S5v.

---

## 16. Plan 24 godzin (propozycja)

| Czas od startu | Zadanie |
|---|---|
| 0–1 h | Testy: stan połączenia, kontakty, foreground; przegląd konkurencji; decyzja S1 vs S9 |
| 1–6 h | Rdzeń: monitory + `rules.json` + ostrzeżenie + tryb świadka |
| 6–12 h | MockBank (bez logo), pauza twarda (20 s/kod/BLIK lock), „Co widzę", usuń wszystko |
| 12–16 h | Sandbox linków, ReportBuilder, hold 24 h (mock), zestaw scenariuszy |
| 16–20 h | Vercel simulator; mock S5v tylko jeśli starczy czasu; cut zgodnie z listą |
| 20–23 h | PDF ≤ 10 slajdów, film, próba demo `.apk` |
| 23–24 h | Zgłoszenie, bufor; zamrożenie zmian |

---

## 17. Plan rozwoju po hackathonie

Kalibracja ISR/FPR; DPIA i analiza prawna zgód (kontakty, głos); pilotaż z bankiem; audyt bezpieczeństwa; produkcyjny detektor on-device po akceptacji IOD; rozszerzenie na oszustwa B2B / fałszywe faktury. Screening połączeń wyłącznie jako opcjonalne rozszerzenie po zgodności z OS, Google Play, RODO i polityką banku.

---

## 18. Otwarte pytania (do weryfikacji)

1. Czy dostęp do sandboxa Pekao jest dostępny dla uczestników i na jakich warunkach?
2. Czy podobne rozwiązanie łączy już 5 filarów Pauzy (przegląd konkurencji)?
3. Jaka jest godzina startu i końca oraz właściwa platforma zgłoszeń?
4. Czy wolno użyć nazwy banku w materiałach (MockBank i tak bez logo/nazwy)?
5. Jaki dokładnie zakres zgody i DPIA bank przyjmie dla kontaktów oraz opcjonalnych etykiet głosowych on-device?
6. Jakie dane o skali oszustw w Polsce można uczciwie przytoczyć w prezentacji (źródło)?
7. Czy hold 24 h po „Kontynuuj" jest akceptowalny operacyjnie dla banku (limity, wyjątki, ścieżka odwołania)?

**Zamknięte w tej wersji dokumentu:** persona (każdy klient); metryki ISR/FPR; innowacja (5 filarów); działanie bez S1; model audio bez zapisu; BLIK lock + kod; kontakty w MVP; trusted = kontakty + baza banku; post-incident bank/Policja/CERT; hold ~24 h; recovery po BLIK poza zakresem; MockBank bez logo; artefakty `.apk` + Vercel; `rules.json` tylko dla developerów; linia odpowiedzialności (shared responsibility).

---

## 19. Nota prawna

Ten dokument opisuje koncepcję i nie jest opinią prawną. Przed pilotażem lub wdrożeniem bank powinien zweryfikować model przez dział prawny, IOD, compliance, bezpieczeństwo oraz właścicieli kanału mobilnego i płatności. W szczególności: zgody na kontakty i opcjonalną ochronę głosową on-device, retencję flag antyfraud, hold transakcyjny oraz treść raportów przekazywanych organom / CERT.

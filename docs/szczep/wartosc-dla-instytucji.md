# Szczep — wartość dla Małopolskiego Hubu Innowacji Społecznych

Platforma dla Regionalnego Ośrodka Polityki Społecznej w Krakowie. Jedno miejsce, w którym gmina, organizacja albo mieszkaniec opisuje problem zwykłymi słowami, a Hub oddaje sprawdzone innowacje z Biblioteki — z uzasadnieniem, czy da się je przenieść w nowe miejsce.

Nazwa „Szczep” jest robocza. Prototyp działa w katalogu `web/`. Dane startowe są syntetyczne.

## Problem, który Hub już ma

ROPS zebrał blisko 200 innowacji społecznych. Wiedza jest. Trudno z niej skorzystać w codziennej pracy urzędu, CUS albo NGO:

1. **Trudno znaleźć.** Karty są w kategoriach fachowych. Osoba z problemem nie zna tych nazw.
2. **Trudno przenieść.** To, że rozwiązanie zadziałało w jednym miejscu, nie znaczy, że zadziała w gminie bez lokalu, partnera albo kadry.
3. **Hub nie widzi luk.** Gdy ktoś szuka i nic nie pasuje, sygnał ginie. Nabory i rozwój Biblioteki nie dostają tej informacji.

Szczep nie zastępuje Biblioteki, mentorów ani decyzji urzędnika. Skraca drogę od problemu do karty, która ma szansę się przyjąć.

## Co platforma robi

Siedem modułów na jednym katalogu kart, jednym dopasowaniu i jednej kolejce zgłoszeń.

| Moduł | Adres | Co dostaje użytkownik | Co dostaje ROPS |
|---|---|---|---|
| Dopasowanie | `/`, `/wyniki` | Trzy najbliższe innowacje, powód dopasowania, siła dowodów | Zapytania bez dobrego wyniku jako luka w Bibliotece |
| Sprawdzenie warunków | `/sprawdz/…` | Lista: macie to / brakuje tego / do ustalenia z autorem | Mniej nietrafionych wdrożeń „na ślepo” |
| Zasobnik i wyzwania | `/zasobnik`, `/wyzwania`, `/karta/…` | Karta w krótkiej formie: problem, dla kogo, dowody, film | 9 kategorii Biblioteki i 8 obszarów Mapy Wyzwań w jednym układzie |
| Pomysł i wniosek | `/pomysl` | Fiszka pomysłu; przy otwartym naborze szkic wniosku | Zgłoszenie z numerem, bez ręcznego przepisywania pól |
| Test | `/tester` | Chęć przetestowania, ocena, propozycja poprawki | Lista chętnych przy karcie |
| Kontakt i partnerstwa | `/zgloszenie/…`, `/partnerstwa` | Status sprawy, pytanie do mentora, „szukam / oferuję” | Kolejka z kontekstem, bez publikowania danych kontaktowych |
| Plan wdrożenia | `/middleman/…` | Szkic planu: kroki, zasoby, ryzyka, czego karta nie mówi | Materiał do rozmowy, oznaczony jako wersja robocza |
| Panel | `/admin` | — | Karty, nabory, zgłoszenia, eksport |

Wyszukiwanie działa bez konta. Kontakt podaje się dopiero przy zgłoszeniu, teście albo pytaniu do mentora.

## Wartość dla instytucji

**Jedna brama do wiedzy, którą Hub już posiada.** Mieszkaniec, NGO, JST i pracownik ROPS wchodzą w to samo miejsce. Nie trzeba znać struktury strony Biblioteki.

**Mniej powtórnej pracy.** Gmina nie zaczyna od zera, jeśli podobne rozwiązanie jest w katalogu. Przy słabym dopasowaniu system mówi to wprost, zamiast podsuwać „coś podobnego”.

**Bezpieczniejszy transfer.** Sprawdzenie warunków zestawia to, czego innowacja potrzebowała (lokal, ludzie, partnerzy, grupa), z tym, co deklaruje pytający. To lista braków, nie obietnica sukcesu.

**Sygnał do rozwoju oferty.** Powtarzające się pytania bez karty trafiają do panelu. Hub widzi, czego ludzie szukają, zanim ogłosi kolejny nabór.

**Mniej ręcznej obsługi zgłoszeń.** Pomysł, test i pytanie do mentora dostają numer i status. Autor widzi, na jakim etapie jest sprawa. Pracownik odpowiada z kontekstem, nie z pustej skrzynki.

**Dostępność jako warunek użycia, nie dodatek.** Duży start, proste słowa, praca z klawiatury, tryb prostego języka. Grupy, dla których Hub pracuje (seniorzy, osoby z niepełnosprawnością, rodziny), mają móc z tego skorzystać same.

## Czego platforma nie obiecuje

- Nie podejmuje decyzji za urząd ani za doradcę ROPS.
- Nie prognozuje, że wdrożenie się powiedzie.
- Nie wysyła wniosków do systemów ROPS. Szkic wniosku zostaje wersją roboczą.
- W wersji demonstracyjnej nie przechowuje prawdziwych danych osobowych.

## Jak to brzmi w jednym zdaniu

Małopolska ma katalog sprawdzonych innowacji, a gmina z problemem wciąż zaczyna od zera. Szczep łączy opis problemu z kartą, która ma szansę pasować, i oddaje Hubowi to, czego w katalogu jeszcze nie ma.

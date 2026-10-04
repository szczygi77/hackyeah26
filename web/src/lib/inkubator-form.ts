import type { CallField } from "./call-fields";

export const INKUBATOR_CALL_NAME =
  "Nabór pomysłów na innowacje społeczne — Inkubator Włączenia Społecznego 2.0";

export const INKUBATOR_CALL_DESCRIPTION =
  "Załącznik nr 3 do ogłoszenia ROPS, projekt „Inkubator Włączenia Społecznego 2.0”, FERS 2021–2027, działanie 5.1. Prototyp nie wysyła wniosku do systemów ROPS.";

export const COST_COLUMNS = ["Działanie", "Termin realizacji", "Koszt działania"] as const;

const PERSON = "Osoba fizyczna";
const ENTITY = "Podmiot";
const GROUP = "Grupa nieformalna";

type Section = { id: string; title: string; hint: string };

const SECTIONS: Section[] = [
  {
    id: "1",
    title: "Tytuł innowacji",
    hint: "Krótki i kojarzący się z przedmiotem innowacji.",
  },
  {
    id: "2",
    title: "Dane pomysłodawcy",
    hint: "Do wyboru: osoba fizyczna, podmiot albo grupa nieformalna.",
  },
  {
    id: "3",
    title: "Opis innowacji",
    hint: "Na czym polega, jaki ma charakter i jak wspiera włączenie społeczne oraz deinstytucjonalizację.",
  },
  {
    id: "4",
    title: "Innowacyjność rozwiązania",
    hint: "Czy podobne rozwiązania są stosowane w Polsce albo na świecie i czym ten pomysł się wyróżnia.",
  },
  {
    id: "5",
    title: "Diagnoza problemu, na który odpowiada Twoja innowacja",
    hint: "Skala w danych, podstawa diagnozy i zgodność z Mapą Wyzwań Społecznych.",
  },
  {
    id: "6",
    title: "Opis odbiorców innowacji",
    hint: "Do kogo jest skierowana, co tę grupę wyróżnia i dlaczego jest wykluczona albo zagrożona wykluczeniem.",
  },
  {
    id: "7",
    title: "Zmiana jaką wprowadza innowacja",
    hint: "Wpływ na problem, na życie odbiorców i na włączenie społeczne.",
  },
  {
    id: "8",
    title: "Wizja przyszłości innowacji",
    hint: "Czy da się ją stosować szerzej, u innych grup, w innym miejscu, i na czym polega łatwość wdrażania.",
  },
  {
    id: "9",
    title: "Plan działania i koszty",
    hint: "Przygotowanie do 3 miesięcy, test do 9 miesięcy. W teście: Faza I i Faza II.",
  },
  {
    id: "10",
    title: "Wnioskowana kwota grantu",
    hint: "Całość grantu, zgodna z kosztami z planu działania.",
  },
  {
    id: "11",
    title: "Zespół projektowy i jego doświadczenie",
    hint: "Kto realizuje zadania i jakie ma doświadczenie z odbiorcami oraz z innowacjami społecznymi.",
  },
  {
    id: "12",
    title: "Oświadczenia",
    hint: "Oświadczenia dla osoby fizycznej albo dla reprezentanta podmiotu. Grupa nieformalna składa oświadczenia reprezentanta.",
  },
];

const PERSON_STATEMENTS = [
  "Posiadam miejsce zamieszkania na terenie Polski.",
  "Posiadam pełną zdolność do czynności prawnych.",
  "Nie byłem/am skazany/a prawomocnym wyrokiem za umyślne przestępstwo ścigane z oskarżenia publicznego lub umyślne przestępstwo skarbowe.",
  "Nie jestem wykluczony/a z możliwości otrzymania środków na podstawie art. 207 ust. 4 ustawy o finansach publicznych.",
  "Nie podlegam wykluczeniu z powodu sankcji związanych z agresją Federacji Rosyjskiej na Ukrainę.",
  "Nie zalegam z uiszczaniem podatków, opłat lub składek na ubezpieczenia społeczne lub zdrowotne.",
  "Dobrowolnie deklaruję uczestnictwo w projekcie „Inkubator Włączenia Społecznego 2.0”.",
  "Zapoznałem/am się z Procedurami realizacji projektu grantowego i akceptuję warunki w nich zawarte.",
  "Dane zawarte w niniejszym formularzu są zgodne z prawdą.",
  "Nie jestem zatrudniony/a w ROPS ani w INNOAGH i nie łączy mnie z ich pracownikiem związek rodzinny do II stopnia.",
  "Nie aplikuję równolegle o wsparcie na ten sam pomysł w innym projekcie FERS, działanie 5.1, ani z innego funduszu.",
  "Składana innowacja nie powiela standardowych form wsparcia ani innowacji już wdrożonych lub inkubowanych w Polsce.",
  "Nie będę pobierał/a wpłat i opłat od osób biorących udział w testowaniu innowacji.",
  "W ramach naboru składam nie więcej niż 2 aplikacje.",
  "Innowacja przedstawiona w aplikacji nie ma charakteru wdrożeniowego.",
  "Jestem świadomy/a, że formularz zostanie udostępniony Komisji Oceny Innowacji, Radzie Innowacji Społecznych i innym inkubatorom.",
  "W realizacji będą stosowane zasady równości szans i niedyskryminacji, dostępności, równości kobiet i mężczyzn oraz DNSH.",
  "Potwierdzam wypełnienie wobec mnie obowiązku informacyjnego ROPS w Krakowie.",
  "Wypełniłem/am obowiązki informacyjne z art. 13 lub 14 RODO wobec osób, których dane pozyskałem.",
];

const ENTITY_STATEMENTS = [
  "Podmiot, który reprezentuję, posiada siedzibę lub oddział na terenie Polski.",
  "Urzędujący członek organu, wspólnik albo komplementariusz nie został skazany za umyślne przestępstwo.",
  "Podmiot nie został wykluczony z możliwości otrzymania środków na podstawie art. 207 ust. 4 ustawy o finansach publicznych.",
  "Podmiot nie podlega wykluczeniu z powodu sankcji związanych z agresją Federacji Rosyjskiej na Ukrainę.",
  "Podmiot nie zalega z uiszczaniem podatków, opłat lub składek na ubezpieczenia społeczne lub zdrowotne.",
  "Wspólnik ani członkowie organów nie są zatrudnieni w ROPS ani w INNOAGH.",
  "Nie łączy mnie z personelem projektu oraz władzami ROPS lub INNOAGH związek rodzinny ani inny związek budzący wątpliwość co do bezstronności.",
  "Podmiot nie jest jednostką organizacyjną ani osobą prawną Województwa Małopolskiego.",
  "Podmiot nie jest powiązany kapitałowo z Akademią Górniczo-Hutniczą im. Stanisława Staszica w Krakowie.",
  "W imieniu podmiotu dobrowolnie deklaruję uczestnictwo w projekcie „Inkubator Włączenia Społecznego 2.0”.",
  "Zapoznałem/am się z Procedurami realizacji projektu grantowego i akceptuję warunki w nich zawarte.",
  "Dane zawarte w niniejszym formularzu są zgodne z prawdą.",
  "Podmiot nie aplikuje równolegle o wsparcie na ten sam pomysł w innym projekcie FERS, działanie 5.1, ani z innego funduszu.",
  "Składana innowacja nie powiela standardowych form wsparcia ani innowacji już wdrożonych lub inkubowanych w Polsce.",
  "Podmiot nie będzie pobierał wpłat i opłat od osób biorących udział w testowaniu innowacji.",
  "W ramach naboru podmiot składa nie więcej niż 2 aplikacje.",
  "Innowacja przedstawiona w aplikacji nie ma charakteru wdrożeniowego.",
  "Jestem świadomy/a, że formularz zostanie udostępniony Komisji Oceny Innowacji, Radzie Innowacji Społecznych i innym inkubatorom.",
  "W realizacji będą stosowane zasady równości szans i niedyskryminacji, dostępności, równości kobiet i mężczyzn oraz DNSH.",
  "Potwierdzam wypełnienie wobec mnie obowiązku informacyjnego ROPS w Krakowie.",
  "Wypełniłem/am obowiązki informacyjne z art. 13 lub 14 RODO wobec osób, których dane pozyskałem.",
];

function belongs(section: Section, field: Omit<CallField, "section" | "sectionTitle" | "sectionHint">): CallField {
  return {
    ...field,
    section: section.id,
    sectionTitle: section.title,
    sectionHint: section.hint,
  };
}

function text(
  section: Section,
  key: string,
  label: string,
  extra: Partial<CallField> = {}
): CallField {
  return belongs(section, { key, label, from: "", type: "text", ...extra });
}

function area(
  section: Section,
  key: string,
  label: string,
  extra: Partial<CallField> = {}
): CallField {
  return belongs(section, { key, label, from: "", type: "textarea", ...extra });
}

function statements(section: Section, prefix: string, items: string[], equals: string | string[]): CallField[] {
  return items.map((label, index) =>
    belongs(section, {
      key: `${prefix}_${index + 1}`,
      label,
      from: "",
      type: "checkbox",
      showIf: { key: "applicantKind", equals },
    })
  );
}

const s = (id: string) => SECTIONS.find((section) => section.id === id)!;

export const INKUBATOR_FIELDS: CallField[] = [
  text(s("1"), "title", "Tytuł innowacji", { from: "title" }),

  belongs(s("2"), {
    key: "applicantKind",
    label: "Rodzaj pomysłodawcy",
    from: "",
    type: "select",
    options: [PERSON, ENTITY, GROUP],
  }),
  text(s("2"), "personFirstName", "Imię", { showIf: { key: "applicantKind", equals: PERSON } }),
  text(s("2"), "personLastName", "Nazwisko", { showIf: { key: "applicantKind", equals: PERSON } }),
  text(s("2"), "personAddress", "Adres korespondencyjny (ulica, nr budynku, nr lokalu)", {
    showIf: { key: "applicantKind", equals: PERSON },
  }),
  text(s("2"), "personPostal", "Kod pocztowy", { showIf: { key: "applicantKind", equals: PERSON } }),
  text(s("2"), "personCity", "Miejscowość", { showIf: { key: "applicantKind", equals: PERSON } }),
  text(s("2"), "personPhone", "Telefon", { showIf: { key: "applicantKind", equals: PERSON } }),
  text(s("2"), "personEmail", "E-mail", { showIf: { key: "applicantKind", equals: PERSON } }),

  text(s("2"), "orgName", "Nazwa podmiotu", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "orgKrs", "KRS", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "orgRegon", "REGON", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "orgNip", "NIP", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "orgAddress", "Adres siedziby (ulica, nr budynku, nr lokalu)", {
    showIf: { key: "applicantKind", equals: ENTITY },
  }),
  text(s("2"), "orgPostal", "Kod pocztowy", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "orgCity", "Miejscowość", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "orgPhone", "Telefon", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "orgEmail", "E-mail", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "repRole", "Osoba upoważniona — funkcja", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "repName", "Osoba upoważniona — imię i nazwisko", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "repPhone", "Osoba upoważniona — telefon", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "repEmail", "Osoba upoważniona — e-mail", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "contactRole", "Kontakt roboczy — funkcja", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "contactName", "Kontakt roboczy — imię i nazwisko", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "contactPhone", "Kontakt roboczy — telefon", { showIf: { key: "applicantKind", equals: ENTITY } }),
  text(s("2"), "contactEmail", "Kontakt roboczy — e-mail", { showIf: { key: "applicantKind", equals: ENTITY } }),

  ...[1, 2, 3, 4, 5].map((index) =>
    area(s("2"), `partner${index}`, `Partner ${index}`, {
      hint: "Osoba fizyczna albo podmiot — te same dane, co dla osoby albo podmiotu.",
      showIf: { key: "applicantKind", equals: GROUP },
      required: index <= 2,
    })
  ),
  text(s("2"), "groupRepName", "Reprezentant grupy — imię i nazwisko", {
    showIf: { key: "applicantKind", equals: GROUP },
  }),
  text(s("2"), "groupRepPhone", "Reprezentant grupy — telefon", {
    showIf: { key: "applicantKind", equals: GROUP },
  }),
  text(s("2"), "groupRepEmail", "Reprezentant grupy — e-mail", {
    showIf: { key: "applicantKind", equals: GROUP },
  }),

  area(s("3"), "description", "Opis innowacji", { from: "body" }),
  area(s("4"), "novelty", "Innowacyjność rozwiązania"),
  area(s("5"), "diagnosis", "Diagnoza problemu"),
  area(s("6"), "audience", "Opis odbiorców innowacji", { from: "roleLabel" }),
  area(s("7"), "change", "Zmiana jaką wprowadza innowacja"),
  area(s("8"), "future", "Wizja przyszłości innowacji"),

  area(s("9"), "prepNarrative", "Okres przygotowawczy", {
    hint: "Co trzeba zrobić, żeby przystąpić do testu, kogo zaangażować i w jakim terminie. Okres nie może przekroczyć 3 miesięcy.",
  }),
  belongs(s("9"), {
    key: "prepCosts",
    label: "Koszty okresu przygotowawczego",
    from: "",
    type: "rows",
    columns: [...COST_COLUMNS],
    rowCount: 3,
  }),
  area(s("9"), "testNarrative", "Okres testowania", {
    hint: "Jak przebiegnie test, kogo zaangażować, ile osób testuje i w jakim terminie. Okres nie może przekroczyć 9 miesięcy.",
  }),
  belongs(s("9"), {
    key: "testPhase1",
    label: "Faza I testu",
    from: "",
    type: "rows",
    columns: [...COST_COLUMNS],
    rowCount: 2,
  }),
  belongs(s("9"), {
    key: "testPhase2",
    label: "Faza II testu",
    from: "",
    type: "rows",
    columns: [...COST_COLUMNS],
    rowCount: 2,
  }),

  text(s("10"), "grantAmount", "Wnioskowana kwota grantu"),
  area(s("11"), "team", "Zespół projektowy i jego doświadczenie"),
  ...statements(s("12"), "stmtPerson", PERSON_STATEMENTS, [PERSON, GROUP]),
  ...statements(s("12"), "stmtEntity", ENTITY_STATEMENTS, ENTITY),
];

export const INKUBATOR_FIELDS_JSON = JSON.stringify(INKUBATOR_FIELDS);

export const INKUBATOR_SECTION_TITLES = SECTIONS.map((section) => section.title);

export const INKUBATOR_RODO =
  "Administratorem danych jest Regionalny Ośrodek Polityki Społecznej w Krakowie, ul. Piastowska 32, 30-070 Kraków (iod@rops.krakow.pl). Drugim administratorem jest minister właściwy do spraw rozwoju regionalnego. Dane służą naborowi, ocenie i realizacji FERS. Przysługuje dostęp, sprostowanie, ograniczenie, sprzeciw, usunięcie w granicach prawa i skarga do Prezesa UODO. Prototyp Hubu nie przekazuje wpisanych danych do ROPS.";

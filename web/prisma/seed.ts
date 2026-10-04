import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

type EvidenceLevel = "E0" | "E1" | "E2" | "E3" | "UNKNOWN";
type PrerequisiteType = "RESOURCE" | "STAFF" | "PARTNER" | "TARGET_GROUP" | "FUNDING" | "TIME";
type PrerequisiteWeight = "REQUIRED" | "HELPFUL";
type PrerequisiteOrigin = "FROM_CARD" | "DERIVED";

const CATEGORIES = [
  "niepełnosprawność intelektualna",
  "kryzys bezdomności",
  "cudzoziemcy",
  "rynek pracy",
  "zdrowie i medycyna",
  "niepełnosprawność sensoryczna",
  "ograniczona mobilność",
  "dzieci, młodzież i rodziny",
  "seniorzy",
] as const;

type CardSeed = {
  slug: string;
  title: string;
  summary: string;
  problems: string[];
  category: string;
  challenges: string[];
  targets: string[];
  elements: string[];
  evidenceLevel: EvidenceLevel;
  evidenceNote: string;
  authorContact: string;
  videoUrl?: string;
  transcript?: string;
  materials?: { label: string; url: string }[];
  prerequisites: {
    type: PrerequisiteType;
    weight: PrerequisiteWeight;
    description: string;
    quote: string;
    origin?: PrerequisiteOrigin;
  }[];
};

const DEFAULT_MATERIALS = [
  {
    label: "Mapa Wyzwań Społecznych (ROPS / IWS)",
    url: "https://rops.krakow.pl/mpliki/IS/IWS_20/za._nr_2._Mapa_Wyzwa_Spoecznych.pdf",
  },
  {
    label: "Publikacje ze świata innowacji (ROPS)",
    url: "https://rops.krakow.pl/innowacje-spoleczne/publikacje-ze-swiata-innowacji",
  },
];

const cards: CardSeed[] = [
  {
    slug: "telefon-na-dzien-dobry",
    title: "Telefon na dzień dobry",
    summary: "Wolontariusze dzwonią raz w tygodniu do osób starszych, które zgłosiły chęć rozmowy.",
    problems: ["samotność", "brak codziennego kontaktu społecznego", "izolacja seniorów"],
    category: "seniorzy",
    challenges: ["seniorzy", "zdrowie-psychiczne"],
    targets: ["osoby 70+", "mieszkające samodzielnie"],
    elements: ["lista chętnych", "grupa wolontariuszy", "szkolenie z rozmowy", "koordynator"],
    evidenceLevel: "E1",
    evidenceNote: "Testowane w mikroskali przez grupę 10 osób, bez formalnej ewaluacji.",
    authorContact: "Fundacja Przykładowa Kontakt",
    videoUrl: "https://www.youtube.com/watch?v=t7Xr3AsBEK4",
    transcript:
      "Materiał poglądowy (TED): o samotności w erze połączeń cyfrowych. Nie jest oficjalnym filmem z karty ROPS — ilustracja osadzenia wideo w Zasobniku.",
    materials: [
      ...DEFAULT_MATERIALS,
      {
        label: "Biblioteka innowacji — kategorie (ROPS)",
        url: "https://rops.krakow.pl/innowacje-spoleczne/biblioteka-innowacji-spolecznych/kategorie",
      },
    ],
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Koordynator, 4 godziny tygodniowo", quote: "spotkania koordynuje stała osoba" },
      { type: "STAFF", weight: "REQUIRED", description: "Grupa 8–12 wolontariuszy", quote: "wolontariusze dzwonią raz w tygodniu" },
      { type: "RESOURCE", weight: "HELPFUL", description: "Lokal na szkolenie wstępne", quote: "szkolenie odbywa się w świetlicy" },
      { type: "PARTNER", weight: "REQUIRED", description: "Lokalna instytucja znająca odbiorców", quote: "współpraca z GOPS przy rekrutacji", origin: "DERIVED" },
    ],
  },
  {
    slug: "klub-seniora-mobilny",
    title: "Mobilny klub seniora",
    summary: "Zespół dojazdowy prowadzi zajęcia aktywizujące w sołectwach bez stałego klubu.",
    problems: ["brak oferty dla seniorów na wsi", "izolacja", "ograniczona mobilność"],
    category: "seniorzy",
    challenges: ["seniorzy"],
    targets: ["seniorzy na obszarach wiejskich"],
    elements: ["bus z wyposażeniem", "animator", "kalendarz wyjazdów"],
    evidenceLevel: "E2",
    evidenceNote: "Przetestowane w 3 gminach z krótką ewaluacją satysfakcji.",
    authorContact: "Stowarzyszenie Aktywni Razem",
    videoUrl: "https://www.youtube.com/watch?v=iCvmsMzlF7o",
    transcript:
      "Materiał poglądowy (TED) o więziach społecznych. Nie pochodzi z karty ROPS — ilustracja prezentacji innowacji z filmem.",
    materials: [
      ...DEFAULT_MATERIALS,
      {
        label: "Raporty z badań ROPS Kraków",
        url: "https://rops.krakow.pl/badania-analizy-raporty/raporty-z-badan",
      },
    ],
    prerequisites: [
      { type: "RESOURCE", weight: "REQUIRED", description: "Środek transportu zespołu", quote: "dojazdy busem do sołectw" },
      { type: "STAFF", weight: "REQUIRED", description: "Animator i kierowca", quote: "stały zespół dwóch osób" },
      { type: "FUNDING", weight: "REQUIRED", description: "Budżet na paliwo i materiały", quote: "koszty dojazdów pokrywa gmina" },
    ],
  },
  {
    slug: "asystent-cyfrowy-senior",
    title: "Asystent cyfrowy seniora",
    summary: "Indywidualne wsparcie w obsłudze telefonu i e-usług dla osób starszych wykluczonych cyfrowo.",
    problems: ["wykluczenie cyfrowe", "brak dostępu do e-usług", "samotność"],
    category: "seniorzy",
    challenges: ["seniorzy"],
    targets: ["seniorzy z niskimi kompetencjami cyfrowymi"],
    elements: ["asystenci", "tablety na wypożyczenie", "scenariusze lekcji"],
    evidenceLevel: "E1",
    evidenceNote: "Mikrotest z 12 seniorami.",
    authorContact: "Centrum Aktywności Lokalnej",
    videoUrl: "https://www.youtube.com/watch?v=6y57F2rWWsM",
    transcript:
      "Materiał poglądowy (TED) o starzeniu się społeczeństw. Nie jest oficjalnym filmem karty ROPS.",
    materials: [
      ...DEFAULT_MATERIALS,
      {
        label: "IOSS — Obserwator Statystyk Społecznych",
        url: "https://obserwator.rops.krakow.pl/",
      },
    ],
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Asystenci przeszkoleni (min. 2)", quote: "każdy senior ma stałego asystenta" },
      { type: "RESOURCE", weight: "HELPFUL", description: "Tablety lub telefony do wypożyczenia", quote: "sprzęt na czas szkoleń" },
    ],
  },
  {
    slug: "mieszkanie-treningowe-start",
    title: "Start w mieszkaniu treningowym",
    summary: "Program przygotowania do samodzielnego mieszkania dla osób z niepełnosprawnością intelektualną.",
    problems: ["brak samodzielności mieszkaniowej", "zależność od placówki", "trudność wejścia w dorosłość"],
    category: "niepełnosprawność intelektualna",
    challenges: ["niepelnosprawnosc", "rodzina-i-piecza"],
    targets: ["osoby z niepełnosprawnością intelektualną 18–35"],
    elements: ["mieszkanie treningowe", "trener samodzielności", "plan indywidualny"],
    evidenceLevel: "E2",
    evidenceNote: "Wdrożone w dwóch lokalizacjach z dokumentacją postępów.",
    authorContact: "Fundacja Dom Otwarty",
    prerequisites: [
      { type: "RESOURCE", weight: "REQUIRED", description: "Lokal mieszkalny (2–4 miejsca)", quote: "mieszkanie treningowe z dwoma pokojami" },
      { type: "STAFF", weight: "REQUIRED", description: "Trener samodzielności", quote: "stałe wsparcie trenera" },
      { type: "PARTNER", weight: "HELPFUL", description: "Współpraca z PCPR lub CUS", quote: "rekrutacja przez PCPR" },
    ],
  },
  {
    slug: "kolo-wsparcia-rodzicow",
    title: "Koło wsparcia rodziców",
    summary: "Grupy rówieśnicze dla rodziców dzieci z niepełnosprawnością intelektualną z opieką wytchnieniową.",
    problems: ["wypalenie opiekunów", "brak wytchnienia", "izolacja rodzin"],
    category: "niepełnosprawność intelektualna",
    challenges: ["niepelnosprawnosc", "rodzina-i-piecza"],
    targets: ["rodzice dzieci z niepełnosprawnością"],
    elements: ["grupa wsparcia", "opieka wytchnieniowa", "facylitator"],
    evidenceLevel: "E1",
    evidenceNote: "Test z 8 rodzinami.",
    authorContact: "Stowarzyszenie Rodzice Razem",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Facylitator grupy", quote: "spotkania prowadzi facylitator" },
      { type: "STAFF", weight: "REQUIRED", description: "Opiekunowie wytchnieniowi na czas spotkań", quote: "dzieci mają opiekę równolegle" },
      { type: "RESOURCE", weight: "REQUIRED", description: "Dwa pomieszczenia (grupa + dzieci)", quote: "spotkania w dwóch salach" },
    ],
  },
  {
    slug: "nocleg-pomost-mlodzi",
    title: "Nocleg pomost dla młodych",
    summary: "Krótkoterminowe bezpieczne noclegi i asysta dla młodych dorosłych w kryzysie bezdomności.",
    problems: ["młoda bezdomność", "brak oferty dla 18–25", "luka po pieczy"],
    category: "kryzys bezdomności",
    challenges: ["bezdomnosc", "rodzina-i-piecza"],
    targets: ["osoby 18–25 w kryzysie bezdomności"],
    elements: ["miejsca noclegowe", "asystent młodego dorosłego", "ścieżka do mieszkania"],
    evidenceLevel: "E1",
    evidenceNote: "Mikrotest 6 miesięcy, 9 osób.",
    authorContact: "Fundacja Pomost",
    prerequisites: [
      { type: "RESOURCE", weight: "REQUIRED", description: "Lokale noclegowe (min. 4 miejsca)", quote: "cztery miejsca w mieszkaniu pomostowym" },
      { type: "STAFF", weight: "REQUIRED", description: "Asystent dostępny wieczorami", quote: "asysta w godzinach wieczornych" },
      { type: "PARTNER", weight: "REQUIRED", description: "Współpraca z placówką pieczy lub schroniskiem", quote: "kierowanie z placówek" },
    ],
  },
  {
    slug: "szafa-pierwsza-pomoc",
    title: "Szafa pierwszej pomocy",
    summary: "Punkt wydający odzież, środki higieny i informacje o usługach osobom w kryzysie bezdomności.",
    problems: ["brak podstawowych środków", "trudny dostęp do informacji", "stygmatyzacja"],
    category: "kryzys bezdomności",
    challenges: ["bezdomnosc", "ubostwo"],
    targets: ["osoby w kryzysie bezdomności"],
    elements: ["punkt wydawniczy", "ulotki usług", "dyżur wolontariuszy"],
    evidenceLevel: "E0",
    evidenceNote: "Pomysł w fazie prototypu.",
    authorContact: "Inicjatywa Uliczna",
    prerequisites: [
      { type: "RESOURCE", weight: "REQUIRED", description: "Lokal lub kontener na punkt", quote: "punkt w dostępnym miejscu" },
      { type: "STAFF", weight: "HELPFUL", description: "Wolontariusze na dyżurach", quote: "dyżury trzy razy w tygodniu" },
    ],
  },
  {
    slug: "asysta-kulturowa-szkola",
    title: "Asysta kulturowa w szkole",
    summary: "Asystenci kulturowi wspierają dzieci migrantów i nauczycieli w adaptacji szkolnej.",
    problems: ["bariera językowa", "izolacja dzieci migrantów", "trudności nauczycieli"],
    category: "cudzoziemcy",
    challenges: ["cudzoziemcy"],
    targets: ["dzieci migrantów", "szkoły podstawowe"],
    elements: ["asystent kulturowy", "warsztaty dla kadry", "materiały dwujęzyczne"],
    evidenceLevel: "E2",
    evidenceNote: "Wdrożone w 4 szkołach z oceną nauczycieli.",
    authorContact: "Centrum Integracji",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Asystent kulturowy (min. 0,5 etatu)", quote: "asystent obecny w szkole" },
      { type: "PARTNER", weight: "REQUIRED", description: "Umowa ze szkołą", quote: "porozumienie z dyrekcją" },
      { type: "FUNDING", weight: "REQUIRED", description: "Finansowanie etatu asystenta", quote: "koszt etatu pokryty z projektu" },
    ],
  },
  {
    slug: "kurs-jezyka-branzoowego",
    title: "Język branżowy do pracy",
    summary: "Krótkie kursy języka polskiego zawodowego dla cudzoziemców wchodzących na rynek pracy.",
    problems: ["bariera językowa w pracy", "niedopasowanie kwalifikacji", "izolacja"],
    category: "cudzoziemcy",
    challenges: ["cudzoziemcy", "ubostwo"],
    targets: ["cudzoziemcy szukający pracy"],
    elements: ["kurs 40h", "materiały branżowe", "doradca zawodowy"],
    evidenceLevel: "E1",
    evidenceNote: "Test z 15 uczestnikami.",
    authorContact: "Fundacja Praca Otwarta",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Lektor języka polskiego", quote: "zajęcia prowadzi lektor" },
      { type: "RESOURCE", weight: "REQUIRED", description: "Sala i materiały", quote: "zajęcia w sali szkoleniowej" },
      { type: "PARTNER", weight: "HELPFUL", description: "Współpraca z pracodawcami lokalnymi", quote: "staże u partnerów" },
    ],
  },
  {
    slug: "zatrudnienie-wspomagane",
    title: "Zatrudnienie wspomagane lokalnie",
    summary: "Job coaching i wsparcie pracodawcy przy zatrudnianiu osób z niepełnosprawnościami.",
    problems: ["niskie zatrudnienie OzN", "brak wsparcia po zatrudnieniu", "obawy pracodawców"],
    category: "rynek pracy",
    challenges: ["niepelnosprawnosc", "ubostwo"],
    targets: ["osoby z niepełnosprawnościami", "pracodawcy lokalni"],
    elements: ["job coach", "profilowanie stanowisk", "wsparcie 6 miesięcy"],
    evidenceLevel: "E3",
    evidenceNote: "Wdrożone w co najmniej dwóch powiatach.",
    authorContact: "CIS Partner",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Job coach", quote: "coach towarzyszy w miejscu pracy" },
      { type: "PARTNER", weight: "REQUIRED", description: "Min. 3 pracodawców partnerskich", quote: "sieć pracodawców otwartych" },
      { type: "TIME", weight: "REQUIRED", description: "Wsparcie min. 6 miesięcy na osobę", quote: "towarzyszenie przez pół roku" },
    ],
  },
  {
    slug: "spoldzielnia-sasiedzka",
    title: "Spółdzielnia sąsiedzka usług",
    summary: "Lokalna spółdzielnia świadcząca proste usługi sąsiedzkie i zatrudniająca osoby z trudnościami na rynku pracy.",
    problems: ["długotrwałe bezrobocie", "brak usług sąsiedzkich", "ubóstwo pracujących"],
    category: "rynek pracy",
    challenges: ["ubostwo"],
    targets: ["osoby długotrwale bezrobotne", "mieszkańcy osiedla"],
    elements: ["spółdzielnia", "katalog usług", "koordynator"],
    evidenceLevel: "E1",
    evidenceNote: "Mikrotest 8–12 osób.",
    authorContact: "Spółdzielnia Przykład",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Koordynator spółdzielni", quote: "koordynacja zleceń" },
      { type: "FUNDING", weight: "REQUIRED", description: "Kapitał na start (narzędzia, ubezpieczenie)", quote: "grant na wyposażenie" },
      { type: "PARTNER", weight: "HELPFUL", description: "Wsparcie OWES lub gminy", quote: "doradztwo OWES" },
    ],
  },
  {
    slug: "grupa-wsparcia-opiekunow",
    title: "Grupa dla opiekunów rodzinnych",
    summary: "Spotkania i dyżur telefoniczny dla osób opiekujących się chorym członkiem rodziny.",
    problems: ["wypalenie opiekunów", "zaniedbanie własnego zdrowia", "izolacja"],
    category: "zdrowie i medycyna",
    challenges: ["zdrowie", "seniorzy"],
    targets: ["opiekunowie rodzinni osób zależnych"],
    elements: ["grupa wsparcia", "telefon zaufania", "edukacja zdrowotna"],
    evidenceLevel: "E2",
    evidenceNote: "Ewaluacja jakościowa po 6 miesiącach.",
    authorContact: "Poradnia Zdrowia Społecznego",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Psycholog lub terapeuta prowadzący", quote: "grupę prowadzi specjalista" },
      { type: "RESOURCE", weight: "REQUIRED", description: "Sala na spotkania", quote: "spotkania co dwa tygodnie" },
      { type: "STAFF", weight: "HELPFUL", description: "Dyżur telefoniczny 4h/tydzień", quote: "telefon dyżurny" },
    ],
  },
  {
    slug: "pierwsza-pomoc-psychiczna-szkola",
    title: "Pierwsza pomoc psychiczna w szkole",
    summary: "Szkolenie nauczycieli i dyżury interwencyjne dla młodzieży w kryzysie psychicznym.",
    problems: ["kryzys psychiczny młodzieży", "brak szybkiej reakcji", "stygmatyzacja"],
    category: "zdrowie i medycyna",
    challenges: ["zdrowie-psychiczne"],
    targets: ["uczniowie szkół ponadpodstawowych", "nauczyciele"],
    elements: ["szkolenie kadry", "protokół interwencji", "mapa lokalnych usług"],
    evidenceLevel: "E1",
    evidenceNote: "Pilotaż w 2 liceach.",
    authorContact: "Fundacja Spokojna Głowa",
    prerequisites: [
      { type: "PARTNER", weight: "REQUIRED", description: "Zgoda dyrekcji szkoły", quote: "porozumienie ze szkołą" },
      { type: "STAFF", weight: "REQUIRED", description: "Trener pierwszej pomocy psychicznej", quote: "szkolenie prowadzi certyfikowany trener" },
      { type: "TIME", weight: "REQUIRED", description: "8 godzin szkolenia kadry", quote: "warsztat dwudniowy" },
    ],
  },
  {
    slug: "powrot-do-pracy-po-kryzysie",
    title: "Powrót do pracy po kryzysie",
    summary: "Indywidualne wsparcie aktywizacyjne dla osób wracających na rynek po leczeniu psychiatrycznym.",
    problems: ["powrót po kryzysie psychicznym", "lęk przed odrzuceniem", "bezrobocie"],
    category: "zdrowie i medycyna",
    challenges: ["zdrowie-psychiczne", "ubostwo"],
    targets: ["dorośli po kryzysie psychicznym"],
    elements: ["doradca", "plan stopniowego powrotu", "kontakt z pracodawcą"],
    evidenceLevel: "E1",
    evidenceNote: "Test z małą grupą 8 osób.",
    authorContact: "Środowiskowy Dom Wsparcia",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Doradca zawodowy ze znajomością tematu zdrowia psychicznego", quote: "doradca towarzyszy w procesie" },
      { type: "PARTNER", weight: "HELPFUL", description: "Współpraca z poradnią zdrowia psychicznego", quote: "konsultacje z terapeutą" },
    ],
  },
  {
    slug: "tlumacz-migowy-mobilny",
    title: "Mobilny tłumacz migowy",
    summary: "Sieć dyżurów tłumacza PJM on-line i stacjonarnie w urzędach i przychodniach.",
    problems: ["bariera komunikacyjna", "brak dostępu do usług", "wykluczenie"],
    category: "niepełnosprawność sensoryczna",
    challenges: ["niepelnosprawnosc"],
    targets: ["osoby głuche i słabosłyszące"],
    elements: ["platforma wideo", "dyżury tłumaczy", "szkolenie urzędników"],
    evidenceLevel: "E2",
    evidenceNote: "Udokumentowana ocena dostępności w 5 urzędach.",
    authorContact: "Fundacja Migaj z Nami",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Tłumacze PJM na dyżurach", quote: "dyżur tłumacza 3× w tygodniu" },
      { type: "RESOURCE", weight: "REQUIRED", description: "Sprzęt do połączeń wideo", quote: "stanowisko wideo w urzędzie" },
      { type: "PARTNER", weight: "REQUIRED", description: "Umowy z urzędami/przychodniami", quote: "punkty stacjonarne u partnerów" },
    ],
  },
  {
    slug: "audiodeskrypcja-lokalna",
    title: "Audiodeskrypcja lokalnych wydarzeń",
    summary: "Szkolenie wolontariuszy i realizacja audiodeskrypcji wydarzeń kulturalnych w gminie.",
    problems: ["brak dostępności kultury", "izolacja osób niewidomych"],
    category: "niepełnosprawność sensoryczna",
    challenges: ["niepelnosprawnosc"],
    targets: ["osoby niewidome i słabowidzące"],
    elements: ["szkolenie AD", "pula wolontariuszy", "kalendarz wydarzeń"],
    evidenceLevel: "E1",
    evidenceNote: "Mikrotest na 4 wydarzeniach.",
    authorContact: "Dom Kultury Otwarty",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Trener audiodeskrypcji", quote: "szkolenie prowadzi specjalista AD" },
      { type: "PARTNER", weight: "REQUIRED", description: "Organizatorzy wydarzeń otwarci na AD", quote: "współpraca z domem kultury" },
    ],
  },
  {
    slug: "transport-sasiedzki",
    title: "Transport sąsiedzki na żądanie",
    summary: "Koordynacja przejazdów wolontariuszy dla osób o ograniczonej mobilności do lekarza i urzędu.",
    problems: ["brak transportu", "ograniczona mobilność", "izolacja"],
    category: "ograniczona mobilność",
    challenges: ["niepelnosprawnosc", "seniorzy"],
    targets: ["osoby z ograniczoną mobilnością", "seniorzy bez auta"],
    elements: ["dyspozytornia", "kierowcy-wolontariusze", "regulamin bezpieczeństwa"],
    evidenceLevel: "E2",
    evidenceNote: "Działa w dwóch gminach z ewaluacją liczby przejazdów.",
    authorContact: "Gminne Centrum Wolontariatu",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Koordynator dyspozytorni", quote: "przyjmowanie zgłoszeń telefonicznie" },
      { type: "STAFF", weight: "REQUIRED", description: "Min. 5 kierowców-wolontariuszy", quote: "stała grupa kierowców" },
      { type: "FUNDING", weight: "HELPFUL", description: "Dofinansowanie paliwa", quote: "zwrot kosztów paliwa" },
    ],
  },
  {
    slug: "dom-bez-barier-doradztwo",
    title: "Dom bez barier — doradztwo",
    summary: "Bezpłatne doradztwo w adaptacji mieszkań dla osób z ograniczoną mobilnością.",
    problems: ["bariery w mieszkaniu", "kosztowne błędy adaptacji", "brak wiedzy"],
    category: "ograniczona mobilność",
    challenges: ["niepelnosprawnosc", "seniorzy"],
    targets: ["osoby z ograniczoną mobilnością", "opiekunowie"],
    elements: ["doradca dostępności", "wizyta w domu", "checklist adaptacji"],
    evidenceLevel: "E1",
    evidenceNote: "Test 10 wizyt domowych.",
    authorContact: "Fundacja Przestrzeń Dostępna",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Doradca dostępności / architekt", quote: "wizyty prowadzi doradca" },
      { type: "TIME", weight: "REQUIRED", description: "Czas na wizyty terenowe", quote: "wizyta trwa ok. 2 godzin" },
    ],
  },
  {
    slug: "rodzina-zastepcza-tandem",
    title: "Tandem rodzin zastępczych",
    summary: "Parowanie doświadczonych i nowych rodzin zastępczych z mentoringiem i wytchnieniem.",
    problems: ["niedobór rodzin zastępczych", "wypalenie", "rozdzielanie rodzeństw"],
    category: "dzieci, młodzież i rodziny",
    challenges: ["rodzina-i-piecza"],
    targets: ["rodziny zastępcze", "kandydaci na rodziny"],
    elements: ["mentorstwo", "grupy wsparcia", "opieka wytchnieniowa"],
    evidenceLevel: "E2",
    evidenceNote: "Ocena satysfakcji w pilotażu powiatowym.",
    authorContact: "PCPR Demo",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Koordynator tandemów", quote: "koordynacja par rodzin" },
      { type: "PARTNER", weight: "REQUIRED", description: "Współpraca z PCPR", quote: "rekrutacja przez PCPR" },
      { type: "STAFF", weight: "HELPFUL", description: "Opieka wytchnieniowa", quote: "urlop wytchnieniowy dla rodzin" },
    ],
  },
  {
    slug: "swietlica-pomost",
    title: "Świetlica pomost po lekcjach",
    summary: "Popołudniowa świetlica z pomocą w nauce i wsparciem emocjonalnym dla dzieci z rodzin w kryzysie.",
    problems: ["brak opieki po lekcjach", "trudności szkolne", "kryzys w rodzinie"],
    category: "dzieci, młodzież i rodziny",
    challenges: ["rodzina-i-piecza", "ubostwo"],
    targets: ["dzieci 7–14 z rodzin w trudnej sytuacji"],
    elements: ["świetlica", "pedagog", "posiłek", "współpraca z szkołą"],
    evidenceLevel: "E1",
    evidenceNote: "Mikrotest 12 dzieci przez semestr.",
    authorContact: "OPS Przykład",
    prerequisites: [
      { type: "RESOURCE", weight: "REQUIRED", description: "Lokal świetlicy", quote: "zajęcia w świetlicy osiedlowej" },
      { type: "STAFF", weight: "REQUIRED", description: "Pedagog lub wychowawca", quote: "stała kadra dwóch osób" },
      { type: "FUNDING", weight: "HELPFUL", description: "Budżet na posiłki", quote: "ciepły posiłek po lekcjach" },
    ],
  },
  {
    slug: "bank-czasu-sasiedzkiego",
    title: "Bank czasu sąsiedzkiego",
    summary: "Wymiana drobnych usług między mieszkańcami bez gotówki — godzina za godzinę.",
    problems: ["ubóstwo", "brak sieci wsparcia", "samotność"],
    category: "rynek pracy",
    challenges: ["ubostwo", "seniorzy"],
    targets: ["mieszkańcy osiedla lub sołectwa"],
    elements: ["platforma wymiany", "koordynator lokalny", "katalog usług"],
    evidenceLevel: "E0",
    evidenceNote: "Pomysł bez testów terenowych.",
    authorContact: "Inicjatywa Sąsiedzka",
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Koordynator lokalny", quote: "ktoś prowadzi listę wymian" },
      { type: "RESOURCE", weight: "HELPFUL", description: "Proste narzędzie do zapisów", quote: "zeszyt lub aplikacja" },
    ],
  },
  {
    slug: "punkt-informacji-uchodzczej",
    title: "Punkt informacji dla cudzoziemców",
    summary: "Jedno okienko z informacją o mieszkaniu, pracy, szkole i zdrowiu w języku prostym i ukraińskim.",
    problems: ["chaos informacyjny", "bariera językowa", "utrudniony dostęp do usług"],
    category: "cudzoziemcy",
    challenges: ["cudzoziemcy"],
    targets: ["cudzoziemcy i uchodźcy", "gminy przyjmujące"],
    elements: ["punkt stacjonarny", "infolinia", "ulotki wielojęzyczne"],
    evidenceLevel: "E2",
    evidenceNote: "Działa w dwóch miastach z pomiarem liczby porad.",
    authorContact: "Centrum Pomocy Cudzoziemcom",
    prerequisites: [
      { type: "RESOURCE", weight: "REQUIRED", description: "Lokal punktu", quote: "punkt w centrum miasta" },
      { type: "STAFF", weight: "REQUIRED", description: "Doradcy dwujęzyczni", quote: "obsługa PL/UA" },
      { type: "PARTNER", weight: "HELPFUL", description: "Sieć instytucji kierujących", quote: "kierowanie z urzędu pracy i szkoły" },
    ],
  },
  // Inspirowane publicznymi tematami ROPS Kraków (aktualności IX–X 2026) — karty syntetyczne, nie oficjalne wpisy Biblioteki
  {
    slug: "trener-zatrudnienia-wspomaganego",
    title: "Trener zatrudnienia wspomaganego",
    summary:
      "Model szkolenia i pracy trenera zatrudnienia wspomaganego w PES (WTZ, ZAZ, CIS, KIS) — od profilowania stanowiska po wsparcie pracodawcy.",
    problems: ["niskie zatrudnienie OzN", "brak kompetencji job coachingu w PES", "obawy pracodawców"],
    category: "rynek pracy",
    challenges: ["niepelnosprawnosc", "ubostwo"],
    targets: ["podmioty ekonomii społecznej", "osoby z niepełnosprawnościami"],
    elements: ["program szkolenia trenerów", "profilowanie stanowisk", "towarzyszenie w miejscu pracy", "sieć pracodawców"],
    evidenceLevel: "E2",
    evidenceNote:
      "Inspirowane naborem ROPS na szkolenie „Trener zatrudnienia wspomaganego” (IX 2026). Karta syntetyczna do dema Hubu.",
    authorContact: "OWES / PES Małopolska",
    materials: [
      ...DEFAULT_MATERIALS,
      {
        label: "ROPS Kraków — aktualności (zatrudnienie wspomagane)",
        url: "https://rops.krakow.pl/",
      },
    ],
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Trener przeszkolony w modelu zatrudnienia wspomaganego", quote: "trener towarzyszy w miejscu pracy" },
      { type: "PARTNER", weight: "REQUIRED", description: "PES prowadzący WTZ/ZAZ/CIS/KIS", quote: "wdrożenie w podmiocie ekonomii społecznej" },
      { type: "PARTNER", weight: "HELPFUL", description: "Min. 2 pracodawców otwartych na współpracę", quote: "sieć pracodawców partnerskich" },
    ],
  },
  {
    slug: "punkt-interwencji-kryzysowej",
    title: "Punkt interwencji kryzysowej w gminie",
    summary:
      "Lokalny punkt szybkiej reakcji dla osób i rodzin w kryzysie: dyżur specjalistów, protokół przekierowań, współpraca z pomocą społeczną.",
    problems: ["brak szybkiej pomocy w kryzysie", "przeciążenie OPS", "izolacja rodzin w kryzysie"],
    category: "dzieci, młodzież i rodziny",
    challenges: ["zdrowie-psychiczne", "rodzina-i-piecza"],
    targets: ["rodziny i osoby w sytuacji kryzysowej", "pracownicy pomocy społecznej"],
    elements: ["dyżur interwencyjny", "protokół przekierowań", "mapa lokalnych usług", "szkolenie kadry"],
    evidenceLevel: "E1",
    evidenceNote:
      "Inspirowane naborem ROPS na studia podyplomowe z interwencji kryzysowej (IX 2026). Karta syntetyczna.",
    authorContact: "Zespół interwencji kryzysowej",
    materials: [
      ...DEFAULT_MATERIALS,
      {
        label: "ROPS Kraków — nabory i szkolenia",
        url: "https://rops.krakow.pl/",
      },
    ],
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Specjaliści przeszkoleni z interwencji kryzysowej", quote: "dyżur prowadzi przeszkolona kadra" },
      { type: "RESOURCE", weight: "REQUIRED", description: "Lokal lub dyżur telefoniczny 24/7 / w godzinach kryzysowych", quote: "punkt dostępny w ustalonych godzinach" },
      { type: "PARTNER", weight: "REQUIRED", description: "Porozumienie z OPS/CUS i służbami", quote: "ścieżka przekierowań do instytucji" },
    ],
  },
  {
    slug: "wsparcie-traumy-w-pieczy",
    title: "Wsparcie traumy wczesnodziecięcej w pieczy",
    summary:
      "Superwizja i szkolenie opiekunów oraz specjalistów pracujących z dziećmi poza rodziną biologiczną — trauma, lękowe style więzi, stabilizacja.",
    problems: ["trauma dzieci w pieczy", "wypalenie opiekunów", "brak specjalistycznego wsparcia"],
    category: "dzieci, młodzież i rodziny",
    challenges: ["rodzina-i-piecza", "zdrowie-psychiczne"],
    targets: ["dzieci i młodzież w pieczy zastępczej", "rodziny zastępcze", "kadra placówek"],
    elements: ["szkolenie z traumy i więzi", "superwizja opiekunów", "plan stabilizacji dziecka"],
    evidenceLevel: "E1",
    evidenceNote:
      "Inspirowane szkoleniem ROPS „Trauma wczesnodziecięca i lękowe style więzi” (IX 2026). Karta syntetyczna.",
    authorContact: "PCPR / organizacja pieczy",
    materials: [
      ...DEFAULT_MATERIALS,
      {
        label: "ROPS — raporty piecza / rodzina",
        url: "https://rops.krakow.pl/badania-analizy-raporty/raporty-z-badan",
      },
    ],
    prerequisites: [
      { type: "STAFF", weight: "REQUIRED", description: "Trener / psycholog specjalizujący się w traumie dziecięcej", quote: "szkolenie prowadzi specjalista" },
      { type: "PARTNER", weight: "REQUIRED", description: "Współpraca z PCPR lub placówką pieczy", quote: "rekrutacja opiekunów przez PCPR" },
      { type: "TIME", weight: "REQUIRED", description: "Min. 2 dni szkolenia + cykl superwizji", quote: "cykl spotkań superwizyjnych" },
    ],
  },
  {
    slug: "partnerstwo-uslug-es",
    title: "Partnerstwo JST ↔ ekonomia społeczna",
    summary:
      "Ścieżka budowania partnerstwa gminy z PES przy zlecaniu i współprojektowaniu usług społecznych — wizyty studyjne, umowy, wspólny katalog usług.",
    problems: ["słaba współpraca JST–PES", "trudność zlecania usług", "rozproszona oferta lokalna"],
    category: "rynek pracy",
    challenges: ["ubostwo", "niepelnosprawnosc"],
    targets: ["gminy i powiaty", "podmioty ekonomii społecznej"],
    elements: ["mapa lokalnych PES", "wzór umowy partnerskiej", "katalog usług", "wizyta studyjna"],
    evidenceLevel: "E1",
    evidenceNote:
      "Inspirowane naborem ROPS „Partnerstwo dla usług społecznych – współpraca samorządu z sektorem ES” (X 2026). Karta syntetyczna.",
    authorContact: "OWES Małopolska",
    materials: [
      ...DEFAULT_MATERIALS,
      {
        label: "ROPS Kraków — partnerstwa i ES",
        url: "https://rops.krakow.pl/",
      },
    ],
    prerequisites: [
      { type: "PARTNER", weight: "REQUIRED", description: "Deklaracja współpracy gminy i min. 1 PES", quote: "porozumienie JST–PES" },
      { type: "STAFF", weight: "REQUIRED", description: "Koordynator partnerstwa po stronie JST", quote: "stała osoba kontaktowa w urzędzie" },
      { type: "TIME", weight: "HELPFUL", description: "Czas na wizytę studyjną / warsztat startowy", quote: "wspólne spotkanie robocze" },
    ],
  },
];

const challenges = [
  {
    slug: "rodzina-i-piecza",
    title: "Rodzina i piecza zastępcza",
    definition: "Wsparcie rodzin w kryzysie oraz rozwój rodzinnej pieczy zastępczej zamiast instytucjonalnej.",
    keyChallenges: "Niedobór rodzin zastępczych; rozdzielanie rodzeństw; dzieci z niepełnosprawnościami w pieczy; słaba współpraca gmina–powiat.",
    personaName: "Ania i Staś",
    personaSummary: "Rodzeństwo z dysfunkcyjnej rodziny; Ania ma zespół Downa, Staś jest niedosłyszący; trafiali do wielu miejsc.",
    personaNeeds: "Nie być rozdzielonymi; mieć stabilną opiekę; specjalistyczne wsparcie.",
    reportLinksJson: JSON.stringify([
      { title: "Piecza zastępcza w Małopolsce (2024)", url: "https://rops.krakow.pl/badania-analizy-raporty/raporty-z-badan" },
    ]),
    sortOrder: 1,
  },
  {
    slug: "bezdomnosc",
    title: "Bezdomność",
    definition: "Kryzys braku schronienia, ze szczególnym naciskiem na młodych dorosłych.",
    keyChallenges: "Rosnąca liczba młodych bezdomnych; niewidzialność; luka po pieczy; brak oferty 18–25.",
    personaName: "Kuba",
    personaSummary: "22 lata, były wychowanek placówki, rotacyjne noclegi, ryzyko uzależnienia.",
    personaNeeds: "Bezpieczny nocleg; ktoś po stronie dorosłości; ścieżka do mieszkania.",
    reportLinksJson: JSON.stringify([]),
    sortOrder: 2,
  },
  {
    slug: "niepelnosprawnosc",
    title: "Niepełnosprawność",
    definition: "Wsparcie samodzielności, pracy, mieszkalnictwa i dostępności dla osób z niepełnosprawnościami.",
    keyChallenges: "Niskie zatrudnienie; przejście edukacja–praca; mieszkalnictwo; dostęp do informacji.",
    personaName: "Krystian",
    personaSummary: "38 lat, porażenie czterokończynowe, pracuje zdalnie, chce decydować o sobie.",
    personaNeeds: "Samodzielność; relacje; dostępność techniczna i mieszkaniowa.",
    reportLinksJson: JSON.stringify([
      { title: "Mieszkania wspomagane i treningowe w Małopolsce (2025)", url: "https://rops.krakow.pl/badania-analizy-raporty/raporty-z-badan" },
    ]),
    sortOrder: 3,
  },
  {
    slug: "ubostwo",
    title: "Ubóstwo",
    definition: "Przeciwdziałanie ubóstwu ekonomicznemu i energetycznemu oraz wzmacnianie sieci wsparcia.",
    keyChallenges: "Ubóstwo skrajne; working poor; ubóstwo seniorów i osób z niepełnosprawnościami; izolacja.",
    personaName: "Tomek",
    personaSummary: "60 lat, renta rolnicza, samotność, trudności z opałem i jedzeniem.",
    personaNeeds: "Bezpieczeństwo bytowe; kontakt z ludźmi; dorywcza praca.",
    reportLinksJson: JSON.stringify([
      { title: "Usługi społeczne w Małopolsce – deficyty (2025)", url: "https://rops.krakow.pl/badania-analizy-raporty/raporty-z-badan" },
    ]),
    sortOrder: 4,
  },
  {
    slug: "cudzoziemcy",
    title: "Integracja cudzoziemców",
    definition: "Równy dostęp do usług i włączanie migrantów w życie lokalne.",
    keyChallenges: "Język; szkoła; praca zgodna z kwalifikacjami; zdrowie psychiczne; mieszkanie.",
    personaName: "Swietłana",
    personaSummary: "37 lat, z Ukrainy, dwoje dzieci, szuka pracy i przedszkola.",
    personaNeeds: "Praca; mieszkanie; szkoła/przedszkole; bezpieczeństwo.",
    reportLinksJson: JSON.stringify([]),
    sortOrder: 5,
  },
  {
    slug: "zdrowie",
    title: "Zdrowie",
    definition: "Promocja zdrowia, opieka długoterminowa i wsparcie opiekunów rodzinnych.",
    keyChallenges: "Choroby przewlekłe; opieka długoterminowa; samotność; obciążenie opiekunów.",
    personaName: "Stanisław",
    personaSummary: "56 lat, pracuje i opiekuje się chorą matką, zaniedbuje własne zdrowie.",
    personaNeeds: "Wytchnienie; wsparcie zdrowotne; relacje społeczne.",
    reportLinksJson: JSON.stringify([
      { title: "Wyzwania sektora opiekuńczego w Małopolsce (2026)", url: "https://rops.krakow.pl/badania-analizy-raporty/raporty-z-badan" },
      { title: "DPS wobec deinstytucjonalizacji (2025)", url: "https://rops.krakow.pl/badania-analizy-raporty/raporty-z-badan" },
    ]),
    sortOrder: 6,
  },
  {
    slug: "zdrowie-psychiczne",
    title: "Zdrowie psychiczne",
    definition: "Wsparcie dobrostanu psychicznego dzieci, młodzieży i dorosłych; przejście do opieki środowiskowej.",
    keyChallenges: "Kryzys młodzieży; stygmatyzacja; niski dostęp do usług; powrót do pracy po kryzysie.",
    personaName: "Mateusz / Karina",
    personaSummary: "Mateusz 17 lat w kryzysie; Karina 41 lat wraca do pracy po leczeniu.",
    personaNeeds: "Wsparcie emocjonalne; przynależność; aktywizacja zawodowa.",
    reportLinksJson: JSON.stringify([]),
    sortOrder: 7,
  },
  {
    slug: "seniorzy",
    title: "Seniorzy",
    definition: "Aktywizacja, przeciwdziałanie samotności i rozwój usług opiekuńczych dla osób starszych.",
    keyChallenges: "Samotność; zdrowie; finanse; cyfryzacja; bariery architektoniczne; dostęp do opieki.",
    personaName: "Janina",
    personaSummary: "73 lata, mieszka sama, po stracie męża, rzadko wychodzi z domu.",
    personaNeeds: "Kontakt; aktywność; wsparcie zdrowotne; poczucie użyteczności.",
    reportLinksJson: JSON.stringify([
      { title: "Wyzwania sektora opiekuńczego w Małopolsce (2026)", url: "https://rops.krakow.pl/badania-analizy-raporty/raporty-z-badan" },
    ]),
    sortOrder: 8,
  },
];

function tokenEmbedding(text: string): number[] {
  const tokens = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .split(/[^a-z0-9ąćęłńóśźż]+/i)
    .filter((t) => t.length > 2);
  const dims = 64;
  const vec = new Array(dims).fill(0);
  for (const t of tokens) {
    let h = 0;
    for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0;
    vec[h % dims] += 1;
  }
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

async function main() {
  await prisma.application.deleteMany();
  await prisma.innovationRevision.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.message.deleteMany();
  await prisma.thread.deleteMany();
  await prisma.localProfile.deleteMany();
  await prisma.match.deleteMany();
  await prisma.statusEvent.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.prerequisite.deleteMany();
  await prisma.innovation.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.call.deleteMany();
  await prisma.municipalitySnapshot.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = hashSync("demo1234", 10);
  await prisma.user.createMany({
    data: [
      { email: "admin@demo.szczep", name: "Admin Demo", passwordHash, role: "ADMIN" },
      { email: "ekspert@demo.szczep", name: "Ekspert Demo", passwordHash, role: "EXPERT" },
    ],
  });

  for (const c of challenges) {
    await prisma.challenge.create({ data: c });
  }

  for (const card of cards) {
    const searchText = [card.title, card.summary, ...card.problems, ...card.elements, ...card.targets, card.category].join(" ");
    const emb = tokenEmbedding(searchText);
    await prisma.innovation.create({
      data: {
        slug: card.slug,
        title: card.title,
        summary: card.summary,
        problemsJson: JSON.stringify(card.problems),
        category: card.category,
        challengeAreasJson: JSON.stringify(card.challenges),
        targetGroupsJson: JSON.stringify(card.targets),
        elementsJson: JSON.stringify(card.elements),
        evidenceLevel: card.evidenceLevel,
        evidenceNote: card.evidenceNote,
        authorContact: card.authorContact,
        materialsJson: JSON.stringify(card.materials?.length ? card.materials : DEFAULT_MATERIALS),
        videoUrl: card.videoUrl || null,
        transcript: card.transcript || null,
        searchText,
        embeddingJson: JSON.stringify(emb),
        status: "PUBLISHED",
        prerequisites: {
          create: card.prerequisites.map((p) => ({
            type: p.type,
            weight: p.weight,
            description: p.description,
            quote: p.quote,
            origin: p.origin ?? "FROM_CARD",
          })),
        },
      },
    });
  }

  await prisma.call.create({
    data: {
      name: "Nabór innowacji społecznych HubMI",
      description: "Syntetyczny nabór na potrzeby dema — nie jest naborem ROPS.",
      startsAt: new Date("2026-09-01"),
      endsAt: new Date("2026-12-31"),
      active: true,
      fieldsJson: JSON.stringify([
        { key: "title", label: "Tytuł pomysłu", from: "title" },
        { key: "essence", label: "Istota pomysłu", from: "body" },
        { key: "audience", label: "Dla kogo", from: "roleLabel" },
        { key: "stage", label: "Etap", from: "area" },
        { key: "canvas", label: "Kanwa (JSON)", from: "canvasJson" },
      ]),
    },
  });

  const trendAreas = ["seniorzy", "zdrowie-psychiczne", "cudzoziemcy"];
  for (let i = 0; i < 24; i++) {
    const daysAgo = 3 + (i % 12) * 7;
    await prisma.submission.create({
      data: {
        type: "IDEA",
        status: "ACCEPTED",
        publicId: `TREND-${String(i + 1).padStart(2, "0")}`,
        title: `Zgłoszenie trendu ${i + 1}`,
        body: "Syntetyczne zgłoszenie do szeregu tygodniowego w panelu administratora.",
        challengeSlug: trendAreas[i % trendAreas.length],
        area: trendAreas[i % trendAreas.length],
        createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
        statusEvents: { create: { status: "ACCEPTED", note: "Dane szeregu", actorRole: "system" } },
      },
    });
  }

  await prisma.municipalitySnapshot.createMany({
    data: [
      {
        name: "Gmina Wieliczka",
        powiat: "wielicki",
        year: 2023,
        statsJson: JSON.stringify({
          share65plus: 18.2,
          socialAidBeneficiariesPer1k: 42,
          childrenInFosterCare: 87,
          note: "Snapshot syntetyczny na podstawie typowych wskaźników IOSS — nie są to oficjalne dane gminy.",
        }),
      },
      {
        name: "Gmina Myślenice",
        powiat: "myślenicki",
        year: 2023,
        statsJson: JSON.stringify({
          share65plus: 19.1,
          socialAidBeneficiariesPer1k: 38,
          childrenInFosterCare: 64,
          note: "Snapshot syntetyczny na podstawie typowych wskaźników IOSS — nie są to oficjalne dane gminy.",
        }),
      },
    ],
  });

  console.log(`Seed OK: ${CATEGORIES.length} kategorii ref, ${challenges.length} wyzwań, ${cards.length} kart`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

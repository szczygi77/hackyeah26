/** Krótkie omówienia własne. To nie są fragmenty publikacji źródłowych. */

export type ReaderArticle = {
  title: string;
  year: number;
  sourceUrl: string;
  sourceLabel: string;
  summary: string;
  useInHub: string;
};

export const READER_ARTICLES: ReaderArticle[] = [
  {
    title: "Połącz kropki — jak czytać innowację społeczną",
    year: 2023,
    sourceUrl: "https://rops.krakow.pl/innowacje-spoleczne/publikacje-ze-swiata-innowacji",
    sourceLabel: "Publikacje ze świata innowacji (ROPS)",
    summary:
      "Innowacja społeczna nie jest pojedynczym gadżetem. Składa się z problemu, grupy, sposobu działania i warunków, bez których pomysł zostaje w jednym miejscu. Łączenie tych elementów pozwala porównać rozwiązania, które na pierwszy rzut oka wyglądają różnie.",
    useInHub:
      "W Szczepie te elementy są polami karty: problem, grupa, dowody i warunki wdrożenia. Matchmaking szuka podobieństwa po nich, a nie tylko po tytule.",
  },
  {
    title: "Innowacje społeczne dla dostępności",
    year: 2022,
    sourceUrl: "https://rops.krakow.pl/innowacje-spoleczne/publikacje-ze-swiata-innowacji",
    sourceLabel: "Publikacje ze świata innowacji (ROPS)",
    summary:
      "Dostępność zaczyna się od tego, czy osoba z niepełnosprawnością, senior albo ktoś z niskimi kompetencjami cyfrowymi może w ogóle skorzystać z usługi. Rozwiązanie, które działa tylko dla biegłych użytkowników sieci, nie domyka wykluczenia, które opisuje.",
    useInHub:
      "Dlatego karty i formularze mają etykiety, transkrypcję przy filmie i prosty język. Film bez tekstu zastępczego nie jest traktowany jako kompletna prezentacja.",
  },
  {
    title: "Przewodnik po innowacjach społecznych — od pomysłu do próby",
    year: 2019,
    sourceUrl: "https://rops.krakow.pl/innowacje-spoleczne/publikacje-ze-swiata-innowacji",
    sourceLabel: "Publikacje ze świata innowacji (ROPS)",
    summary:
      "Pomysł staje się innowacją, gdy da się powiedzieć, dla kogo jest, na jakim jest etapie i czego potrzebuje, żeby go sprawdzić. Sam opis entuzjazmu nie wystarcza do naboru ani do testu w gminie.",
    useInHub:
      "Fiszka w kreatorze ma trzy pola obowiązkowe: istota, odbiorca, etap. Kanwa i wniosek naboru dokładają pola, które definiuje konkretny nabór.",
  },
];

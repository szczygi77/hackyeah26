/** 9 kategorii Biblioteki Innowacji Społecznych ROPS [JURY] */
export const LIBRARY_CATEGORIES = [
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

/** 8 obszarów Mapy Wyzwań Społecznych [JURY] */
export const CHALLENGE_AREAS = [
  { slug: "rodzina-i-piecza", title: "Rodzina i piecza" },
  { slug: "bezdomnosc", title: "Bezdomność" },
  { slug: "niepelnosprawnosc", title: "Niepełnosprawność" },
  { slug: "ubostwo", title: "Ubóstwo" },
  { slug: "cudzoziemcy", title: "Cudzoziemcy" },
  { slug: "zdrowie", title: "Zdrowie" },
  { slug: "zdrowie-psychiczne", title: "Zdrowie psychiczne" },
  { slug: "seniorzy", title: "Seniorzy" },
] as const;

export const EVIDENCE_FILTERS = ["E0", "E1", "E2", "E3"] as const;

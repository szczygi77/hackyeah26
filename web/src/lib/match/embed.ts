/** Lightweight deterministic bag-of-tokens embedding for offline hybrid search. */
export function tokenEmbedding(text: string, dims = 64): number[] {
  const tokens = normalizeTokens(text);
  const vec = new Array(dims).fill(0);
  for (const t of tokens) {
    let h = 0;
    for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0;
    vec[h % dims] += 1;
  }
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

export function cosine(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const d = Math.sqrt(na) * Math.sqrt(nb);
  return d ? dot / d : 0;
}

export function normalizeTokens(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ę/g, "e")
    .replace(/ą/g, "a")
    .replace(/ś/g, "s")
    .replace(/ć/g, "c")
    .replace(/ż|ź/g, "z")
    .replace(/ń/g, "n")
    .replace(/ł/g, "l")
    .replace(/ó/g, "o")
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2);
}

const SYN_GROUPS = [
  ["samotnosc", "samotni", "samotny", "samotna", "samotnego", "samotnej"],
  ["senior", "seniorzy", "seniora", "seniorow", "seniorze", "seniorom", "starszych", "starsze", "starsza"],
  ["klub", "klubu", "klubie", "kluby"],
  ["zamkniecie", "zamknieciu", "zamkniety", "zamknietego", "zamknietym"],
  ["urzad", "urzedzie", "urzedu", "urzedach", "urzednik", "urzednikow", "urzednicy"],
  ["nieslyszacy", "nieslyszacych", "nieslyszacego", "gluche", "gluchych", "gluchy", "slaboslyszace", "slaboslyszacy", "migowy", "migowego"],
  ["piecza", "pieczy", "piecze"],
  ["zastepcza", "zastepczej", "zastepczych", "zastepczej"],
];

const SYN = new Map<string, string>();
for (const group of SYN_GROUPS) {
  for (const word of group) SYN.set(word, group[0]);
}

function canon(token: string): string {
  return SYN.get(token) || token;
}

const STOP = new Set([
  "dla", "oraz", "przy", "jest", "sie", "nie", "lub", "albo", "bez", "pod", "nad", "przez",
  "jako", "tym", "ten", "tej", "tego", "po", "na", "do", "od", "we", "ze", "ich", "jej",
  "jego", "czy", "jak", "tak", "juz", "tez", "tylko", "aby", "albo", "ktory", "ktora", "ktore",
]);

/** Udział tokenów zapytania, które występują w karcie (odmiany i synonimy liczą się raz). */
export function tokenOverlap(a: string, b: string): number {
  const ta = [...new Set(normalizeTokens(a).map(canon).filter((t) => !STOP.has(t)))];
  const tb = new Set(normalizeTokens(b).map(canon).filter((t) => !STOP.has(t)));
  if (!ta.length || !tb.size) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / ta.length;
}

export type QueryFlags = {
  crisis: boolean;
  outOfScope: boolean;
  shortQuery: boolean;
  wordCount: number;
};

const CRISIS =
  /\b(samob[oó]j|zabij[eę]|chc[eę]\s+umrze|odebra[cć]\s+sobie\s+[zż]ycie|nie\s+chc[eę]\s+[zż]y[cć]|pogotowie|ratunku)\b/i;

const OUT_OF_SCOPE =
  /\b(recept[ae]|dawkowanie|diagnoz[au]|lekarstw|antybiotyk|chemioterapi|operacj[aei]|jak\s+leczy[cć])\b/i;

export function analyzeQueryFlags(query: string): QueryFlags {
  const words = query.trim().split(/\s+/).filter(Boolean);
  return {
    crisis: CRISIS.test(query),
    outOfScope: OUT_OF_SCOPE.test(query),
    shortQuery: words.length > 0 && words.length <= 2,
    wordCount: words.length,
  };
}

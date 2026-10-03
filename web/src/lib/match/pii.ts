/** PESEL checksum (weights 1,3,7,9,1,3,7,9,1,3). */
export function isValidPesel(digits: string): boolean {
  if (!/^\d{11}$/.test(digits)) return false;
  const w = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(digits[i]) * w[i];
  const check = (10 - (sum % 10)) % 10;
  return check === Number(digits[10]);
}

/** Mask common PII before storing or sending to external models. */
export function maskPii(text: string): { masked: string; found: boolean } {
  let masked = text;
  let found = false;

  const email = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
  if (email.test(masked)) {
    found = true;
    masked = masked.replace(email, "[ukryte]");
  }

  const phone = /\b(?:\+48\s?)?(?:\d{3}[\s-]?){2}\d{3}\b/g;
  if (phone.test(masked)) {
    found = true;
    masked = masked.replace(phone, "[ukryte]");
  }

  const iban = /\bPL\d{2}(?:\s?\d{4}){6}\b/gi;
  if (iban.test(masked)) {
    found = true;
    masked = masked.replace(iban, "[ukryte]");
  }

  masked = masked.replace(/\b\d{11}\b/g, (m) => {
    if (isValidPesel(m)) {
      found = true;
      return "[ukryte]";
    }
    return m;
  });

  return { masked, found };
}

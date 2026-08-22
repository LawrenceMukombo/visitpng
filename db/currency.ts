export type CurrencyCode = "PGK" | "AUD" | "USD" | "EUR" | "GBP" | "JPY";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstPgk: number; // e.g. 1 PGK = 0.40 AUD
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  PGK: { code: "PGK", symbol: "K", name: "Papua New Guinea Kina", rateAgainstPgk: 1.0, flag: "🇵🇬" },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", rateAgainstPgk: 0.40, flag: "🇦🇺" },
  USD: { code: "USD", symbol: "$", name: "US Dollar", rateAgainstPgk: 0.26, flag: "🇺🇸" },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rateAgainstPgk: 0.24, flag: "🇪🇺" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rateAgainstPgk: 0.21, flag: "🇬🇧" },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", rateAgainstPgk: 40.5, flag: "🇯🇵" }
};

export function convertFromPgk(amountInPgk: number, targetCurrency: CurrencyCode): number {
  if (!amountInPgk || amountInPgk <= 0) return 0;
  const curr = CURRENCIES[targetCurrency] || CURRENCIES.PGK;
  const converted = amountInPgk * curr.rateAgainstPgk;
  if (targetCurrency === "JPY") {
    return Math.round(converted);
  }
  return Math.round(converted * 100) / 100;
}

export function formatPrice(amountInPgk: number, targetCurrency: CurrencyCode = "PGK"): string {
  if (amountInPgk === null || amountInPgk === undefined) return "Free";
  if (amountInPgk === 0) return "Free";
  const curr = CURRENCIES[targetCurrency] || CURRENCIES.PGK;
  const val = convertFromPgk(amountInPgk, targetCurrency);
  if (targetCurrency === "JPY") {
    return `${curr.symbol} ${val.toLocaleString()}`;
  }
  return `${curr.symbol} ${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export type CurrencyCode = "PGK" | "USD" | "AUD" | "EUR" | "GBP" | "JPY" | "NZD";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstPgk: number; // 1 PGK = X target currency
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  PGK: { code: "PGK", symbol: "K", name: "Papua New Guinea Kina", rateAgainstPgk: 1.0, flag: "🇵🇬" },
  USD: { code: "USD", symbol: "$", name: "US Dollar", rateAgainstPgk: 0.258, flag: "🇺🇸" },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", rateAgainstPgk: 0.395, flag: "🇦🇺" },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rateAgainstPgk: 0.242, flag: "🇪🇺" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rateAgainstPgk: 0.205, flag: "🇬🇧" },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", rateAgainstPgk: 38.5, flag: "🇯🇵" },
  NZD: { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", rateAgainstPgk: 0.435, flag: "🇳🇿" }
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

// Backward compatibility alias for any existing legacy functions
export function convertFromZmw(amount: number, targetCurrency: CurrencyCode): number {
  return convertFromPgk(amount, targetCurrency);
}

export function formatPrice(amount: number, targetCurrency: CurrencyCode = "PGK"): string {
  if (amount === null || amount === undefined) return "Free";
  if (amount === 0) return "Free";
  const curr = CURRENCIES[targetCurrency] || CURRENCIES.PGK;
  const val = convertFromPgk(amount, targetCurrency);
  if (targetCurrency === "JPY") {
    return `${curr.symbol} ${val.toLocaleString()}`;
  }
  return `${curr.symbol} ${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

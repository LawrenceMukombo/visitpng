export type CurrencyCode = "ZMW" | "USD" | "EUR" | "GBP" | "AUD" | "JPY";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstZmw: number; // e.g. 1 ZMW = 0.0364 USD
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  ZMW: { code: "ZMW", symbol: "ZK", name: "Zambian Kwacha", rateAgainstZmw: 1.0, flag: "🇿🇲" },
  USD: { code: "USD", symbol: "$", name: "US Dollar", rateAgainstZmw: 0.0364, flag: "🇺🇸" },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rateAgainstZmw: 0.0333, flag: "🇪🇺" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rateAgainstZmw: 0.0286, flag: "🇬🇧" },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", rateAgainstZmw: 0.0556, flag: "🇦🇺" },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", rateAgainstZmw: 5.55, flag: "🇯🇵" }
};

export function convertFromZmw(amountInZmw: number, targetCurrency: CurrencyCode): number {
  if (!amountInZmw || amountInZmw <= 0) return 0;
  const curr = CURRENCIES[targetCurrency] || CURRENCIES.ZMW;
  const converted = amountInZmw * curr.rateAgainstZmw;
  if (targetCurrency === "JPY") {
    return Math.round(converted);
  }
  return Math.round(converted * 100) / 100;
}

// Backward compatibility alias for existing price calculations
export function convertFromPgk(amount: number, targetCurrency: CurrencyCode): number {
  return convertFromZmw(amount, targetCurrency);
}

export function formatPrice(amount: number, targetCurrency: CurrencyCode = "ZMW"): string {
  if (amount === null || amount === undefined) return "Free";
  if (amount === 0) return "Free";
  const curr = CURRENCIES[targetCurrency] || CURRENCIES.ZMW;
  const val = convertFromZmw(amount, targetCurrency);
  if (targetCurrency === "JPY") {
    return `${curr.symbol} ${val.toLocaleString()}`;
  }
  return `${curr.symbol} ${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

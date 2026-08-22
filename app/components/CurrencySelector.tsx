"use client";
import {CURRENCIES, CurrencyCode} from "../../db/currency";

interface CurrencySelectorProps {
  currentCurrency: CurrencyCode;
  onChange: (newCurrency: CurrencyCode) => void;
}

export default function CurrencySelector({currentCurrency, onChange}: CurrencySelectorProps) {
  const selected = CURRENCIES[currentCurrency] || CURRENCIES.PGK;

  return (
    <div className="currencySelector">
      <span className="currencyFlag">{selected.flag}</span>
      <select
        value={currentCurrency}
        onChange={e => onChange(e.target.value as CurrencyCode)}
        aria-label="Display currency"
        className="currencySelect"
      >
        {Object.values(CURRENCIES).map(curr => (
          <option key={curr.code} value={curr.code}>
            {curr.code} ({curr.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}

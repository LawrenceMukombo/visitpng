"use client";
import {CURRENCIES, CurrencyCode} from "../../db/currency";

interface CurrencySelectorProps {
  currentCurrency: CurrencyCode;
  onChange: (newCurrency: CurrencyCode) => void;
}

export default function CurrencySelector({currentCurrency, onChange}: CurrencySelectorProps) {
  const selected = CURRENCIES[currentCurrency] || CURRENCIES.PGK;

  return (
    <div
      className="currencySelector"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: "rgba(255, 255, 255, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.22)",
        borderRadius: "6px",
        padding: "4px 8px"
      }}
    >
      <span style={{ fontSize: "11px", lineHeight: 1 }}>{selected.flag}</span>
      <select
        value={currentCurrency}
        onChange={e => onChange(e.target.value as CurrencyCode)}
        aria-label="Display currency"
        className="currencySelect"
        style={{
          background: "transparent",
          color: "#FFFFFF",
          border: "none",
          outline: "none",
          fontSize: "11px",
          fontWeight: 700,
          padding: 0,
          cursor: "pointer",
          lineHeight: 1.2
        }}
      >
        {Object.values(CURRENCIES).map(curr => (
          <option key={curr.code} value={curr.code} style={{ background: "#FFFFFF", color: "#1E2A24", fontSize: "12px" }}>
            {curr.code} ({curr.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}

"use client";
import {CURRENCIES, CurrencyCode} from "../../db/currency";

interface CurrencySelectorProps {
  currentCurrency: CurrencyCode;
  onChange: (newCurrency: CurrencyCode) => void;
}

export default function CurrencySelector({currentCurrency, onChange}: CurrencySelectorProps) {
  const selected = CURRENCIES[currentCurrency] || CURRENCIES.ZMW;

  return (
    <div
      className="currencySelector"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        background: "rgba(255, 255, 255, 0.14)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        borderRadius: "99px",
        padding: "0 10px",
        height: "34px",
        boxSizing: "border-box",
        lineHeight: 1,
        verticalAlign: "middle"
      }}
    >
      <span style={{ fontSize: "12px", lineHeight: 1, display: "inline-flex", alignItems: "center" }}>{selected.flag}</span>
      <select
        value={currentCurrency}
        onChange={e => onChange(e.target.value as CurrencyCode)}
        aria-label="Display currency"
        className="currencySelect"
        style={{
          background: "transparent",
          color: "rgba(255, 255, 255, 1)",
          border: "none",
          outline: "none",
          fontSize: "11.5px",
          fontWeight: 700,
          padding: 0,
          margin: 0,
          cursor: "pointer",
          lineHeight: "34px",
          height: "34px",
          display: "inline-flex",
          alignItems: "center"
        }}
      >
        {Object.values(CURRENCIES).map(curr => (
          <option key={curr.code} value={curr.code} style={{ background: "rgba(255, 255, 255, 1)", color: "rgba(30, 42, 36, 1)", fontSize: "12px" }}>
            {curr.code} ({curr.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}

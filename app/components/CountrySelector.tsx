"use client";

import { useEffect, useState, useRef } from "react";
import type { CountryWithSettings } from "../../db/countries";

interface CountrySelectorProps {
  currentCountry: string;
  onCountryChange: (countryCode: string) => void;
}

export default function CountrySelector({ currentCountry, onCountryChange }: CountrySelectorProps) {
  const [countries, setCountries] = useState<CountryWithSettings[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/countries")
      .then(res => res.json())
      .then(data => {
        if (active && data.countries) {
          setCountries(data.countries);
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  // Click away listener
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const current = countries.find(c => c.code.toUpperCase() === currentCountry.toUpperCase()) || {
    code: "ZMB",
    name: "Zambia (ZamRoam)",
    currencyCode: "ZMW"
  };

  const getCountryFlag = (code: string) => {
    if (code.toUpperCase() === "ZMB") return "🇿🇲";
    return "🇿🇲";
  };

  const isZambia = true;

  return (
    <div ref={containerRef} className="countrySelectorDropdown">
      <button
        type="button"
        className="countryTriggerBtn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch destination country"
        aria-expanded={isOpen}
      >
        <span style={{ fontSize: "12px", lineHeight: 1 }}>{getCountryFlag(current.code)}</span>
        <span>Zambia</span>
        <span style={{ fontSize: "7px", opacity: 0.8, marginLeft: "1px" }}>▼</span>
      </button>

      {isOpen && (
        <div className="countryMenuCard">
          <div style={{ padding: "4px 8px 6px", fontSize: "9px", color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid var(--border-default)", marginBottom: "3px" }}>
            Select Tourism Portal
          </div>
          {(countries.length ? countries : [
            { code: "ZMB", name: "Zambia (ZamRoam)", currencyCode: "ZMW" }
          ]).map(c => {
            const isSelected = c.code.toUpperCase() === currentCountry.toUpperCase();
            return (
              <button
                key={c.code}
                type="button"
                className={isSelected ? "selected" : ""}
                onClick={() => {
                  onCountryChange(c.code);
                  setIsOpen(false);
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "15px" }}>{getCountryFlag(c.code)}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "11px", color: isSelected ? "var(--brand-deep-teal)" : "var(--text-primary)" }}>
                      {c.code === "ZMB" ? "Zambia (ZamRoam)" : c.name}
                    </div>
                    <small style={{ color: "var(--text-secondary)", fontSize: "9px", display: "block" }}>
                      {c.currencyCode} Currency
                    </small>
                  </div>
                </div>
                {isSelected && <span style={{ color: "var(--brand-deep-teal)", fontWeight: 800, fontSize: "12px" }}>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

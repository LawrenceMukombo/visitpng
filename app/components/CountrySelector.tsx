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
    code: "PNG",
    name: "Papua New Guinea (VisitPNG)",
    currencyCode: "PGK"
  };

  const getCountryFlag = (code: string) => {
    if (code.toUpperCase() === "PNG") return "🇵🇬";
    if (code.toUpperCase() === "ZMB") return "🇿🇲";
    return "🇵🇬";
  };

  return (
    <div ref={containerRef} className="countrySelectorDropdown">
      <button
        type="button"
        className="countryTriggerBtn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch destination country"
      >
        <span className="flagIcon">{getCountryFlag(current.code)}</span>
        <span className="countryName">{current.name.split(" ")[0]}</span>
        <span className="dropdownArrow">▾</span>
      </button>

      {isOpen && (
        <div className="countryMenu">
          <div className="menuHeader">
            <small>Active Destination Hub</small>
          </div>
          {countries.length > 0 ? (
            countries.map(c => (
              <button
                key={c.code}
                type="button"
                className={`countryOption ${c.code.toUpperCase() === currentCountry.toUpperCase() ? "active" : ""}`}
                onClick={() => {
                  onCountryChange(c.code);
                  setIsOpen(false);
                }}
              >
                <span className="flagIcon">{getCountryFlag(c.code)}</span>
                <div className="optionText">
                  <strong>{c.name}</strong>
                  <small>{c.currencyCode} · Official Tourism Hub</small>
                </div>
                {c.code.toUpperCase() === currentCountry.toUpperCase() && <span className="checkMark">✓</span>}
              </button>
            ))
          ) : (
            <button
              type="button"
              className="countryOption active"
              onClick={() => setIsOpen(false)}
            >
              <span className="flagIcon">🇵🇬</span>
              <div className="optionText">
                <strong>Papua New Guinea</strong>
                <small>PGK · VisitPNG Official Hub</small>
              </div>
              <span className="checkMark">✓</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { ZAMBIAN_LANGUAGE_ZONES, ZambianLanguageZone, ZambianPhrase } from "@/db/zambianLanguages";

export default function ZambianPhrasebook() {
  const [selectedZoneCode, setSelectedZoneCode] = useState<string>("nyanja");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeZone: ZambianLanguageZone =
    ZAMBIAN_LANGUAGE_ZONES.find((z) => z.code === selectedZoneCode) || ZAMBIAN_LANGUAGE_ZONES[3];

  const filteredPhrases = activeZone.phrases.filter((phrase: ZambianPhrase) => {
    const matchCategory = selectedCategory === "all" || phrase.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.localText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.phonetic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCopy = (phrase: ZambianPhrase) => {
    const copyText = `${phrase.localText} (${phrase.english}) — Pronounced: [${phrase.phonetic}]`;
    navigator.clipboard.writeText(copyText);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="zambianPhrasebookContainer" style={{ padding: "0 4px" }}>
      {/* Header */}
      <div className="phrasebookHero" style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ fontSize: "20px" }}>🗣️</span>
          <div>
            <p className="eyebrow" style={{ color: "#C86428", fontSize: "10px", margin: 0, letterSpacing: "0.12em", fontWeight: 800 }}>
              REGIONAL ZAMBIAN LANGUAGES & TRAVEL PHRASES
            </p>
            <h2 style={{ fontSize: "20px", margin: "2px 0 4px", fontWeight: 700 }}>
              Speak Like a Local in Zambia
            </h2>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.45", margin: 0 }}>
          Select the region you are visiting to learn essential polite phrases in the local tongue. Showing cultural respect creates instant warmth across Zambia&apos;s 73 ethnic groups.
        </p>
      </div>

      {/* Region / Language Zone Selector Pills */}
      <div style={{ marginBottom: "16px" }}>
        <small style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "6px" }}>
          Select Destination Region:
        </small>
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "6px", scrollbarWidth: "thin" }}>
          {ZAMBIAN_LANGUAGE_ZONES.map((zone) => {
            const isActive = zone.code === selectedZoneCode;
            return (
              <button
                key={zone.code}
                type="button"
                onClick={() => setSelectedZoneCode(zone.code)}
                style={{
                  whiteSpace: "nowrap",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: isActive ? "1px solid #0A4D3C" : "1px solid var(--border-default)",
                  background: isActive ? "#0A4D3C" : "var(--surface-card)",
                  color: isActive ? "#FFFFFF" : "var(--text-primary)",
                  fontSize: "11px",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "all 0.15s ease"
                }}
              >
                <span>{zone.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Zone Info Banner */}
      <div
        style={{
          background: "rgba(10, 77, 60, 0.06)",
          border: "1px solid rgba(10, 77, 60, 0.2)",
          borderRadius: "10px",
          padding: "10px 12px",
          marginBottom: "16px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <strong style={{ fontSize: "13px", color: "#0A4D3C" }}>
            📍 {activeZone.regionLabel}
          </strong>
          <span style={{ fontSize: "10px", background: "rgba(200, 100, 40, 0.15)", color: "#C86428", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>
            {activeZone.speakerCount} Speakers
          </span>
        </div>
        <p style={{ fontSize: "11px", color: "var(--text-primary)", margin: "0 0 6px", lineHeight: "1.4" }}>
          {activeZone.description}
        </p>
        <div style={{ borderTop: "1px dashed rgba(10, 77, 60, 0.2)", paddingTop: "6px" }}>
          <small style={{ fontSize: "10px", fontWeight: 700, color: "#0A4D3C", display: "block", marginBottom: "3px" }}>
            ✨ Local Etiquette & Customary Respect:
          </small>
          <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "10px", color: "var(--text-secondary)", lineHeight: "1.35" }}>
            {activeZone.culturalEtiquette.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Category Filter & Search Bar */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${activeZone.name} or English phrases...`}
          style={{
            flex: "1 1 200px",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border-default)",
            background: "var(--surface-card)",
            fontSize: "11px",
            color: "var(--text-primary)"
          }}
        />
        <div style={{ display: "flex", gap: "4px", overflowX: "auto" }}>
          {[
            { id: "all", label: "All Phrases" },
            { id: "greetings", label: "🤝 Greetings" },
            { id: "safari", label: "🦁 Safari" },
            { id: "market", label: "🛍️ Market" },
            { id: "emergency", label: "🚑 Emergency" }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: "6px 9px",
                borderRadius: "6px",
                border: "1px solid var(--border-default)",
                background: selectedCategory === cat.id ? "#C86428" : "var(--surface-card)",
                color: selectedCategory === cat.id ? "#FFFFFF" : "var(--text-secondary)",
                fontSize: "10px",
                fontWeight: selectedCategory === cat.id ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Cards List */}
      <div style={{ display: "grid", gap: "8px", marginBottom: "20px" }}>
        {filteredPhrases.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px", color: "var(--text-secondary)", fontSize: "11px" }}>
            No phrases found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredPhrases.map((phrase) => {
            const isCopied = copiedId === phrase.id;
            return (
              <div
                key={phrase.id}
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "10px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", flexWrap: "wrap", marginBottom: "2px" }}>
                    <strong style={{ fontSize: "13px", color: "#0A4D3C" }}>
                      {phrase.localText}
                    </strong>
                    <span style={{ fontSize: "10px", color: "#C86428", fontStyle: "italic" }}>
                      [{phrase.phonetic}]
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--text-primary)", margin: "0 0 2px", fontWeight: 600 }}>
                    {phrase.english}
                  </p>
                  {phrase.culturalNote && (
                    <small style={{ fontSize: "9px", color: "var(--text-secondary)", display: "block" }}>
                      💡 {phrase.culturalNote}
                    </small>
                  )}
                  {phrase.literalMeaning && (
                    <small style={{ fontSize: "9px", color: "var(--text-secondary)", display: "block" }}>
                      📖 Literal: &ldquo;{phrase.literalMeaning}&rdquo;
                    </small>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(phrase)}
                  title="Copy phrase"
                  style={{
                    border: "1px solid var(--border-default)",
                    background: isCopied ? "#0A4D3C" : "var(--surface-subtle)",
                    color: isCopied ? "#FFFFFF" : "var(--text-primary)",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    fontSize: "10px",
                    cursor: "pointer",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    flexShrink: 0
                  }}
                >
                  {isCopied ? "✓ Copied" : "📋 Copy"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

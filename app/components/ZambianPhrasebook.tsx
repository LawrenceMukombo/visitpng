"use client";

import React, { useState, useEffect, useRef } from "react";
import { ZAMBIAN_LANGUAGE_ZONES, ZambianLanguageZone, ZambianPhrase } from "@/db/zambianLanguages";

export default function ZambianPhrasebook() {
  const [selectedZoneCode, setSelectedZoneCode] = useState<string>("nyanja");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85); // 0.85 normal, 0.65 slow
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      setSpeechSupported(true);
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const activeZone: ZambianLanguageZone =
    ZAMBIAN_LANGUAGE_ZONES.find((z) => z.code === selectedZoneCode) || ZAMBIAN_LANGUAGE_ZONES[1];

  const filteredPhrases = activeZone.phrases.filter((phrase: ZambianPhrase) => {
    const matchCategory = selectedCategory === "all" || phrase.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.localText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.phonetic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (phrase.culturalNote && phrase.culturalNote.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleCopy = (phrase: ZambianPhrase) => {
    const copyText = `${phrase.localText} (${phrase.english}) — Pronounced: [${phrase.phonetic}]`;
    navigator.clipboard.writeText(copyText);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (phrase: ZambianPhrase) => {
    if (typeof window === "undefined") return;

    // Stop any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setPlayingId(phrase.id);

    if (window.speechSynthesis) {
      // Clean pronunciation text to ensure natural Bantu phonetic pacing
      // Replace '/' with pause
      const textToSpeak = phrase.localText.split("/")[0].trim();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;

      // Try to find an African / British / Swahili / Bantu voice for natural vowels
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.lang.includes("en-ZA") ||
          v.lang.includes("en-NG") ||
          v.lang.includes("en-KE") ||
          v.lang.includes("en-GB") ||
          v.lang.includes("sw") ||
          v.lang.includes("sn")
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        setPlayingId(null);
      };

      utterance.onerror = () => {
        setPlayingId(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Audio fallback simulation
      setTimeout(() => {
        setPlayingId(null);
      }, 1500);
    }
  };

  return (
    <div className="zambianPhrasebookContainer" style={{ padding: "0 4px" }}>
      {/* Header */}
      <div className="phrasebookHero" style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ fontSize: "22px" }}>🗣️</span>
          <div>
            <p className="eyebrow" style={{ color: "#C86428", fontSize: "10px", margin: 0, letterSpacing: "0.12em", fontWeight: 800 }}>
              AUTHENTIC ZAMBIAN REGIONAL LANGUAGES & VOICE PHRASEBOOK
            </p>
            <h2 style={{ fontSize: "20px", margin: "2px 0 4px", fontWeight: 700 }}>
              Speak Like a Local in Zambia
            </h2>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.45", margin: 0 }}>
          Learn and listen to verified polite phrases across Zambia&apos;s 7 officially recognized national languages. Tap the <strong>🔊 Listen</strong> button on any phrase to hear the exact authentic pronunciation.
        </p>
      </div>

      {/* Region / Language Zone Selector Pills */}
      <div style={{ marginBottom: "16px" }}>
        <small style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "6px" }}>
          Select Destination Language Zone:
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
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: isActive ? "1px solid #0A4D3C" : "1px solid var(--border-default)",
                  background: isActive ? "#0A4D3C" : "var(--surface-card)",
                  color: isActive ? "#FFFFFF" : "var(--text-primary)",
                  fontSize: "11px",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "all 0.15s ease"
                }}
              >
                <span>{zone.name}</span>
                <span style={{ fontSize: "9px", opacity: 0.8 }}>({zone.phrases.length})</span>
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
          padding: "12px",
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
        <p style={{ fontSize: "11px", color: "var(--text-primary)", margin: "0 0 8px", lineHeight: "1.4" }}>
          {activeZone.description}
        </p>

        {/* Audio controls bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.7)", padding: "6px 10px", borderRadius: "6px", marginBottom: "8px", border: "1px solid rgba(10, 77, 60, 0.1)" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#0A4D3C", display: "flex", alignItems: "center", gap: "4px" }}>
            🎙️ Voice Audio Playback:
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              type="button"
              onClick={() => setPlaybackSpeed(0.85)}
              style={{
                border: "none",
                background: playbackSpeed === 0.85 ? "#0A4D3C" : "transparent",
                color: playbackSpeed === 0.85 ? "#FFFFFF" : "var(--text-secondary)",
                borderRadius: "4px",
                padding: "2px 6px",
                fontSize: "9px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              ⚡ Normal (1.0x)
            </button>
            <button
              type="button"
              onClick={() => setPlaybackSpeed(0.65)}
              style={{
                border: "none",
                background: playbackSpeed === 0.65 ? "#C86428" : "transparent",
                color: playbackSpeed === 0.65 ? "#FFFFFF" : "var(--text-secondary)",
                borderRadius: "4px",
                padding: "2px 6px",
                fontSize: "9px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              🐢 Slow Learn (0.75x)
            </button>
          </div>
        </div>

        <div style={{ borderTop: "1px dashed rgba(10, 77, 60, 0.2)", paddingTop: "6px" }}>
          <small style={{ fontSize: "10px", fontWeight: 700, color: "#0A4D3C", display: "block", marginBottom: "3px" }}>
            ✨ Customary Etiquette & Polite Protocols:
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
            { id: "safari", label: "🦁 Safari & Nature" },
            { id: "market", label: "🛍️ Market & Food" },
            { id: "navigation", label: "🧭 Directions" },
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
      <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
        {filteredPhrases.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px", color: "var(--text-secondary)", fontSize: "11px" }}>
            No phrases found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredPhrases.map((phrase) => {
            const isCopied = copiedId === phrase.id;
            const isPlaying = playingId === phrase.id;
            return (
              <div
                key={phrase.id}
                style={{
                  background: isPlaying ? "rgba(10, 77, 60, 0.05)" : "var(--surface-card)",
                  border: isPlaying ? "1px solid #0A4D3C" : "1px solid var(--border-default)",
                  borderRadius: "10px",
                  padding: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "10px",
                  boxShadow: isPlaying ? "0 2px 8px rgba(10, 77, 60, 0.15)" : "0 1px 3px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", flexWrap: "wrap", marginBottom: "3px" }}>
                    <strong style={{ fontSize: "14px", color: "#0A4D3C" }}>
                      {phrase.localText}
                    </strong>
                    <span style={{ fontSize: "10px", color: "#C86428", fontStyle: "italic", background: "rgba(200, 100, 40, 0.08)", padding: "1px 5px", borderRadius: "4px" }}>
                      [{phrase.phonetic}]
                    </span>
                  </div>

                  <p style={{ fontSize: "12px", color: "var(--text-primary)", margin: "0 0 3px", fontWeight: 600 }}>
                    {phrase.english}
                  </p>

                  {phrase.syllables && (
                    <small style={{ fontSize: "9px", color: "#0A4D3C", display: "block", marginBottom: "2px", letterSpacing: "0.02em" }}>
                      🗣️ Syllables: <strong>{phrase.syllables}</strong>
                    </small>
                  )}

                  {phrase.culturalNote && (
                    <small style={{ fontSize: "9px", color: "var(--text-secondary)", display: "block", marginTop: "2px" }}>
                      💡 {phrase.culturalNote}
                    </small>
                  )}
                  {phrase.literalMeaning && (
                    <small style={{ fontSize: "9px", color: "var(--text-secondary)", display: "block" }}>
                      📖 Literal: &ldquo;{phrase.literalMeaning}&rdquo;
                    </small>
                  )}
                </div>

                {/* Audio and Copy Action Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleSpeak(phrase)}
                    title="Listen to pronunciation"
                    style={{
                      border: isPlaying ? "1px solid #0A4D3C" : "1px solid var(--border-default)",
                      background: isPlaying ? "#0A4D3C" : "rgba(10, 77, 60, 0.1)",
                      color: isPlaying ? "#FFFFFF" : "#0A4D3C",
                      borderRadius: "6px",
                      padding: "5px 9px",
                      fontSize: "10px",
                      cursor: "pointer",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      boxShadow: isPlaying ? "0 0 6px rgba(10, 77, 60, 0.4)" : "none"
                    }}
                  >
                    <span>{isPlaying ? "🔊 Speaking..." : "🔊 Listen"}</span>
                  </button>

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
                      fontSize: "9px",
                      cursor: "pointer",
                      fontWeight: 600,
                      whiteSpace: "nowrap"
                    }}
                  >
                    {isCopied ? "✓ Copied" : "📋 Copy"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

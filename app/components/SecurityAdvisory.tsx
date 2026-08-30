"use client";

import React, { useState } from "react";
import {
  PNG_EMERGENCY_CONTACTS,
  PNG_REGIONAL_ADVISORIES,
  PNG_SAFETY_GUIDELINES
} from "@/db/securityAdvisory";

export function SecurityAdvisory({ countryCode = "PNG" }: { countryCode?: string } = {}) {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const contacts = PNG_EMERGENCY_CONTACTS;
  const advisories = PNG_REGIONAL_ADVISORIES;
  const guidelines = PNG_SAFETY_GUIDELINES;

  const filteredAdvisories =
    selectedRegion === "all"
      ? advisories
      : advisories.filter((r) => r.regionId === selectedRegion);

  const filteredContacts =
    selectedCategory === "all"
      ? contacts
      : contacts.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const quickDials = [
    { label: "St John Ambulance", sub: "National Paramedic", phone: "111", icon: "🚑", bg: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)", border: "#EF4444" },
    { label: "RPNGC Police", sub: "National Emergency", phone: "112", icon: "🚓", bg: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)", border: "#3B82F6" },
    { label: "PIH Trauma Center", sub: "24/7 Medevac Hospital", phone: "+675 7998 8000", rawPhone: "+67579988000", icon: "🏥", bg: "linear-gradient(135deg, #0D9488 0%, #115E59 100%)", border: "#14B8A6" },
    { label: "PNGTPA Tourist Desk", sub: "Official Visitor Link", phone: "+675 321 4188", rawPhone: "+6753214188", icon: "🌴", bg: "linear-gradient(135deg, #059669 0%, #065F46 100%)", border: "#10B981" }
  ];

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #09211C 0%, #051613 100%)",
        borderRadius: "20px",
        padding: "32px 24px",
        color: "#FFFFFF",
        border: "1px solid rgba(234, 88, 12, 0.25)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        maxWidth: "100%",
        overflowX: "hidden"
      }}
    >
      {/* Hero Header Banner */}
      <div style={{ marginBottom: "28px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
          <span
            style={{
              background: "#EA580C",
              color: "#FFFFFF",
              padding: "4px 12px",
              borderRadius: "6px",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}
          >
            🛡️ SafeTravel & Wantok Advisory Matrix ({countryCode})
          </span>
          <span style={{ color: "#34D399", fontSize: "0.76rem", fontWeight: 700 }}>
            ✓ Verified August 2026 · Official Tourism Security Posture
          </span>
        </div>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "1.85rem", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
          Travel With Confidence Across Papua New Guinea
        </h2>
        <p style={{ margin: 0, fontSize: "0.92rem", color: "#CBD5E1", maxWidth: "850px", lineHeight: 1.55 }}>
          Papua New Guinea offers extraordinary cultural warmth, ancient traditions, and breathtaking landscapes. Following Wantok community protocols, trekking with accredited operators, and utilizing licensed logistics guarantees an unforgettable, secure expedition across all 22 provinces.
        </p>
      </div>

      {/* Emergency Quick Dial Tiles */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#FDBA74", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.06em" }}>
          24/7 National Emergency & Rapid Dispatch Hotline
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "12px" }}>
          {quickDials.map((qd, i) => (
            <div
              key={i}
              style={{
                background: "rgba(15, 48, 42, 0.7)",
                borderRadius: "14px",
                border: `1px solid ${qd.border}44`,
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <span style={{ fontSize: "1.1rem" }}>{qd.icon}</span>
                  <strong style={{ fontSize: "0.85rem", color: "#FFFFFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {qd.label}
                  </strong>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{qd.sub}</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#FDBA74", marginTop: "4px" }}>
                  {qd.phone}
                </div>
              </div>

              <a
                href={`tel:${qd.rawPhone || qd.phone}`}
                style={{
                  background: qd.bg,
                  color: "#FFFFFF",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}
              >
                📞 Call
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Safety Matrix Section */}
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "14px", marginBottom: "18px" }}>
          <div>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "1.4rem", fontWeight: 900, color: "#FFFFFF" }}>
              Regional Safety & Travel Advisories
            </h3>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#94A3B8" }}>
              Real-time security posture and travel guidance across PNG&apos;s 4 geographic regions.
            </p>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Regions" },
              { id: "southern", label: "Southern (Papua)" },
              { id: "highlands", label: "Highlands" },
              { id: "islands", label: "Islands" },
              { id: "momase", label: "Momase (Sepik)" }
            ].map(r => {
              const isActive = selectedRegion === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegion(r.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    border: "1px solid",
                    borderColor: isActive ? "#34D399" : "rgba(255,255,255,0.15)",
                    background: isActive ? "rgba(52, 211, 153, 0.2)" : "rgba(0,0,0,0.25)",
                    color: isActive ? "#6EE7B7" : "#CBD5E1",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "20px" }}>
          {filteredAdvisories.map((adv) => {
            const isNormal = adv.advisoryLevel === "exercise_normal_caution";
            return (
              <div
                key={adv.regionId}
                style={{
                  background: "rgba(15, 48, 42, 0.75)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "22px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 700 }}>
                      📍 {adv.provinces.join(", ")}
                    </span>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        background: isNormal ? "rgba(16,185,129,0.2)" : "rgba(234,88,12,0.2)",
                        border: `1px solid ${isNormal ? "#10B981" : "#EA580C"}`,
                        color: isNormal ? "#6EE7B7" : "#FDBA74"
                      }}
                    >
                      {adv.advisoryLevel.replaceAll("_", " ").toUpperCase()}
                    </span>
                  </div>

                  <h4 style={{ margin: "4px 0 0 0", fontSize: "1.25rem", fontWeight: 800, color: "#FFFFFF" }}>
                    {adv.regionName}
                  </h4>
                </div>

                <p style={{ margin: 0, fontSize: "0.85rem", color: "#CBD5E1", lineHeight: 1.5 }}>
                  {adv.summary}
                </p>

                <div style={{ background: "rgba(0,0,0,0.25)", padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <strong style={{ fontSize: "0.72rem", color: "#34D399", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    🚗 Recommended Transport:
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#E2E8F0", lineHeight: 1.45 }}>
                    {adv.recommendedTransport}
                  </p>
                </div>

                <div style={{ background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "10px" }}>
                  <strong style={{ fontSize: "0.72rem", color: "#FDBA74", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    🛡️ Key Safety & Community Protocols:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.76rem", color: "#CBD5E1", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {adv.keySafetyTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wantok Protocols & Cultural Guidelines Grid */}
      <div style={{ marginBottom: "36px" }}>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "1.4rem", fontWeight: 900, color: "#FFFFFF" }}>
          Essential Papua New Guinea Safety & Cultural Etiquette
        </h3>
        <p style={{ margin: "0 0 18px 0", fontSize: "0.85rem", color: "#94A3B8" }}>
          Local customary knowledge (Kastom), trekking precautions, and health guidelines for traveling respectfully.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "18px" }}>
          {guidelines.map((g) => (
            <div
              key={g.id}
              style={{
                background: "rgba(15, 48, 42, 0.65)",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              <div style={{ fontSize: "2rem" }}>{g.icon}</div>
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF" }}>
                {g.title}
              </h4>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#FDBA74", lineHeight: 1.45, fontWeight: 600 }}>
                {g.summary}
              </p>
              <ul style={{ margin: "6px 0 0 0", paddingLeft: "16px", fontSize: "0.75rem", color: "#CBD5E1", display: "flex", flexDirection: "column", gap: "5px" }}>
                {g.protocols.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency & Medical Directory */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "14px", marginBottom: "18px" }}>
          <div>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "1.4rem", fontWeight: 900, color: "#FFFFFF" }}>
              Emergency, Medevac & Tourism Directory
            </h3>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#94A3B8" }}>
              Verified direct dispatch contact numbers for accredited trauma hospitals, police commands, air rescue, and tourism authorities.
            </p>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Contacts" },
              { id: "medical", label: "Hospitals & Medevac" },
              { id: "police", label: "Police & Security" },
              { id: "rescue", label: "Air Rescue" },
              { id: "tourism", label: "Tourism Authorities" }
            ].map(c => {
              const isActive = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    border: "1px solid",
                    borderColor: isActive ? "#EA580C" : "rgba(255,255,255,0.15)",
                    background: isActive ? "rgba(234, 88, 12, 0.25)" : "rgba(0,0,0,0.25)",
                    color: isActive ? "#FDBA74" : "#CBD5E1",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px" }}>
          {filteredContacts.map((c, i) => (
            <div
              key={i}
              style={{
                background: "rgba(15, 48, 42, 0.7)",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ background: "rgba(234,88,12,0.2)", border: "1px solid rgba(234,88,12,0.3)", color: "#FED7AA", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase" }}>
                    {c.category}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "#34D399", fontWeight: 700 }}>
                    📍 {c.location}
                  </span>
                </div>

                <h4 style={{ margin: "4px 0 6px 0", fontSize: "1.05rem", fontWeight: 800, color: "#FFFFFF" }}>
                  {c.name}
                </h4>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#CBD5E1", lineHeight: 1.45 }}>
                  {c.notes}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
                <strong style={{ fontSize: "1rem", color: "#FDBA74", fontFamily: "monospace" }}>
                  {c.phone}
                </strong>

                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={() => handleCopy(c.phone)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: copiedPhone === c.phone ? "#059669" : "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#FFFFFF",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {copiedPhone === c.phone ? "✓ Copied" : "📋 Copy"}
                  </button>
                  <a
                    href={`tel:${c.phone}`}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
                      color: "#FFFFFF",
                      textDecoration: "none",
                      fontSize: "0.74rem",
                      fontWeight: 800
                    }}
                  >
                    📞 Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

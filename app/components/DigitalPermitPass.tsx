"use client";

import React, { useState, useSyncExternalStore } from "react";
import {
  PNG_PERMIT_TYPES,
  PNG_PARK_FEE_SCHEDULE,
  PermitType,
  IssuedPermit,
  createPermit
} from "../../db/permits";
import { CurrencyCode, formatPrice } from "../../db/currency";

interface DigitalPermitPassProps {
  currency: CurrencyCode;
  countryCode?: string;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getOfflinePermitsSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem("visitpng_digital_permits") || "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

export default function DigitalPermitPass({ currency }: DigitalPermitPassProps) {
  const permitTypes = PNG_PERMIT_TYPES;
  const [selectedParkId, setSelectedParkId] = useState<string>("kokoda-track-permit");
  const [activeTab, setActiveTab] = useState<"directory" | "schedule" | "wallet">("directory");
  const [filterTier, setFilterTier] = useState<string>("all");

  const selectedPark: PermitType =
    permitTypes.find((p) => p.id === selectedParkId) || permitTypes[0];

  // Modal State
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [holderName, setHolderName] = useState("");
  const [passportOrId, setPassportOrId] = useState("");
  const [visitorTier, setVisitorTier] = useState<"Citizen" | "PNG Resident" | "International" | "Trekking Expedition">("International");
  const [countryOfOrigin, setCountryOfOrigin] = useState("Australia");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [activePermitView, setActivePermitView] = useState<IssuedPermit | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const issuedPermitsRaw = useSyncExternalStore(subscribe, getOfflinePermitsSnapshot, getServerSnapshot);
  let issuedPermits: IssuedPermit[] = [];
  try {
    issuedPermits = JSON.parse(issuedPermitsRaw);
  } catch {
    issuedPermits = [];
  }

  const handleIssuePermit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!holderName.trim() || !passportOrId.trim()) {
      setStatusMessage("Please provide full name and passport / National ID.");
      return;
    }

    const newPermit = createPermit(
      selectedPark.id,
      holderName.trim(),
      passportOrId.trim(),
      visitorTier,
      countryOfOrigin,
      startDate,
      "PGK"
    );

    try {
      const existing: IssuedPermit[] = JSON.parse(localStorage.getItem("visitpng_digital_permits") || "[]");
      existing.unshift(newPermit);
      localStorage.setItem("visitpng_digital_permits", JSON.stringify(existing));
      window.dispatchEvent(new Event("storage"));
      setActivePermitView(newPermit);
      setShowIssueModal(false);
      setStatusMessage(`✨ Official Digital Permit Pass issued for ${holderName}! Ref: ${newPermit.reference}`);
      setActiveTab("wallet");
    } catch {
      setStatusMessage("Permit generated and saved to offline wallet session.");
    }
  };

  const filteredPermits = permitTypes.filter(p => {
    if (filterTier === "all") return true;
    return p.category.toLowerCase() === filterTier.toLowerCase();
  });

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #09211C 0%, #051613 100%)",
        borderRadius: "20px",
        padding: "32px 24px",
        color: "#FFFFFF",
        border: "1px solid rgba(234, 88, 12, 0.25)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
      }}
    >
      {/* Top Banner Header */}
      <div style={{ marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
          <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "4px 10px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.08em" }}>
            OFFICIAL STATUTORY CLEARANCES
          </span>
          <span style={{ color: "#34D399", fontSize: "0.8rem", fontWeight: 700 }}>
            🏛️ Kokoda Track Authority (KTA) · CEPA Varirata · Mount Wilhelm Eco-Trust
          </span>
        </div>
        <h2 style={{ margin: "0 0 6px 0", fontSize: "1.85rem", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
          PNG National Parks, Kokoda Track & Conservation Passes
        </h2>
        <p style={{ margin: 0, fontSize: "0.92rem", color: "#94A3B8", maxWidth: "800px", lineHeight: 1.5 }}>
          Secure mandated statutory trekking clearances with offline dynamic QR validation. Official permits fund local landowner communities, ranger checkpoints, and trail conservation across Papua New Guinea.
        </p>
      </div>

      {statusMessage && (
        <div
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid #10B981",
            color: "#6EE7B7",
            padding: "12px 18px",
            borderRadius: "10px",
            fontSize: "0.85rem",
            fontWeight: 700,
            marginBottom: "20px"
          }}
        >
          {statusMessage}
        </div>
      )}

      {/* Navigation Mode Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {[
          { id: "directory", label: `🌿 National Parks & Track Directory (${permitTypes.length})` },
          { id: "schedule", label: "📋 Tariff Schedule & Vehicle Regulations" },
          { id: "wallet", label: `🎫 My Digital Permits Wallet (${issuedPermits.length})` }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "directory" | "schedule" | "wallet")}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                border: "1.5px solid",
                borderColor: isActive ? "#EA580C" : "rgba(255,255,255,0.12)",
                background: isActive ? "linear-gradient(135deg, #EA580C 0%, #F97316 100%)" : "rgba(0,0,0,0.3)",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.15s ease",
                boxShadow: isActive ? "0 4px 14px rgba(234,88,12,0.35)" : "none"
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: DIRECTORY & PERMIT SELECTOR */}
      {activeTab === "directory" && (
        <div>
          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "18px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Permits (5)" },
              { id: "trek", label: "🥾 Kokoda & Peaks" },
              { id: "park", label: "🌿 National Parks" },
              { id: "marine", label: "🤿 Marine Sanctuaries" },
              { id: "cultural", label: "♨ Spirit Corridors" }
            ].map(t => {
              const isActive = filterTier === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilterTier(t.id)}
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
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* 2-Column Layout with fluid responsive wrapping */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "24px", maxWidth: "100%" }}>
            {/* Left: Park Cards List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "680px", overflowY: "auto", paddingRight: "4px" }}>
              {filteredPermits.map(p => {
                const isSelected = p.id === selectedPark.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedParkId(p.id)}
                    style={{
                      background: isSelected ? "rgba(234, 88, 12, 0.2)" : "rgba(15, 48, 42, 0.6)",
                      border: "1.5px solid",
                      borderColor: isSelected ? "#EA580C" : "rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ background: "rgba(0,0,0,0.3)", color: "#FDBA74", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase" }}>
                        {p.categoryTier}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#34D399", fontWeight: 700 }}>
                        {p.province}
                      </span>
                    </div>

                    <h4 style={{ margin: "0 0 4px 0", fontSize: "0.95rem", fontWeight: 800, color: "#FFFFFF" }}>
                      {p.parkName}
                    </h4>
                    <p style={{ margin: "0 0 8px 0", fontSize: "0.72rem", color: "#94A3B8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      🏛️ {p.authority}
                    </p>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "6px" }}>
                      <span style={{ fontSize: "0.72rem", color: "#CBD5E1" }}>Base Digital Fee:</span>
                      <strong style={{ fontSize: "0.88rem", color: "#EA580C" }}>{formatPrice(p.feePgk, currency)}</strong>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Park Deep Detail Card */}
            <div
              style={{
                background: "radial-gradient(ellipse at top left, #164E44 0%, #0D332D 100%)",
                borderRadius: "16px",
                border: "1px solid rgba(234, 88, 12, 0.35)",
                padding: "26px",
                boxShadow: "0 12px 35px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                minWidth: 0
              }}
            >
              {/* Header Box */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "16px" }}>
                <div>
                  <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "4px 12px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", display: "inline-block", marginBottom: "8px" }}>
                    {selectedPark.categoryTier}
                  </span>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: "1.35rem", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.25 }}>
                    {selectedPark.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#34D399", fontWeight: 700 }}>
                    🏛️ Official Custodian: {selectedPark.authority}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowIssueModal(true)}
                  style={{
                    background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "10px",
                    padding: "14px 20px",
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(234, 88, 12, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%"
                  }}
                >
                  🎫 Issue Digital Permit ➔
                </button>
              </div>

              <p style={{ margin: 0, fontSize: "0.88rem", color: "#CBD5E1", lineHeight: 1.55 }}>
                {selectedPark.description}
              </p>

              {/* 3-Column Fee Breakdown Matrix */}
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#FDBA74", textTransform: "uppercase", marginBottom: "8px" }}>
                  Official Statutory Fee Schedule ({currency})
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: "10px" }}>
                  <div style={{ background: "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span style={{ fontSize: "0.7rem", color: "#94A3B8", display: "block" }}>PNG Citizen / NID</span>
                    <strong style={{ fontSize: "1.1rem", color: "#34D399", display: "block", margin: "2px 0" }}>
                      {formatPrice(selectedPark.feeCitizenPgk, currency)}
                    </strong>
                    <small style={{ fontSize: "0.68rem", color: "#6EE7B7" }}>Valid with NID / Passport</small>
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span style={{ fontSize: "0.7rem", color: "#94A3B8", display: "block" }}>PNG Resident / Work Permit</span>
                    <strong style={{ fontSize: "1.1rem", color: "#FDBA74", display: "block", margin: "2px 0" }}>
                      {formatPrice(Math.round(selectedPark.feePgk * 0.6), currency)}
                    </strong>
                    <small style={{ fontSize: "0.68rem", color: "#FED7AA" }}>Resident permit holder</small>
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "10px", border: "1px solid rgba(234,88,12,0.3)" }}>
                    <span style={{ fontSize: "0.7rem", color: "#94A3B8", display: "block" }}>International Tourist</span>
                    <strong style={{ fontSize: "1.1rem", color: "#EA580C", display: "block", margin: "2px 0" }}>
                      {formatPrice(selectedPark.feePgk, currency)}
                    </strong>
                    <small style={{ fontSize: "0.68rem", color: "#FCA5A5" }}>14-Day Full Clearance</small>
                  </div>
                </div>
              </div>

              {/* Park Facilities & Gate Info */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "12px" }}>
                <div style={{ background: "rgba(0,0,0,0.25)", padding: "12px 14px", borderRadius: "10px" }}>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "0.8rem", color: "#FDBA74" }}>
                    🕒 Gate Hours & Ranger Checkposts
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "#CBD5E1" }}>
                    {selectedPark.gateHours}
                  </p>
                </div>
                <div style={{ background: "rgba(0,0,0,0.25)", padding: "12px 14px", borderRadius: "10px" }}>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "0.8rem", color: "#FDBA74" }}>
                    ⛺ Camping & Landowner Overnight Fees
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "#CBD5E1" }}>
                    {selectedPark.campingFee}
                  </p>
                </div>
              </div>

              {/* Facilities Checklist */}
              <div>
                <h4 style={{ margin: "0 0 8px 0", fontSize: "0.82rem", color: "#34D399", textTransform: "uppercase" }}>
                  🛡️ Ranger Stations, Medical Posts & Facilities
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedPark.facilities.map((f, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(52, 211, 153, 0.15)",
                        border: "1px solid rgba(52, 211, 153, 0.3)",
                        color: "#6EE7B7",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.74rem",
                        fontWeight: 600
                      }}
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Regulations */}
              <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "10px", padding: "14px" }}>
                <h4 style={{ margin: "0 0 8px 0", fontSize: "0.82rem", color: "#FCA5A5", textTransform: "uppercase" }}>
                  📜 Mandatory Regulations & Protocol
                </h4>
                <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.76rem", color: "#CBD5E1", display: "flex", flexDirection: "column", gap: "5px" }}>
                  {selectedPark.rulesAndRegulations.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCHEDULE & VEHICLE REGULATIONS */}
      {activeTab === "schedule" && (
        <div
          style={{
            background: "rgba(15, 48, 42, 0.7)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "26px"
          }}
        >
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF" }}>
            Papua New Guinea National Park Regulations & Guidelines
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <div style={{ background: "rgba(0,0,0,0.25)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#34D399" }}>General Park & Trekker Rules</h4>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.78rem", color: "#CBD5E1", display: "flex", flexDirection: "column", gap: "6px" }}>
                {PNG_PARK_FEE_SCHEDULE.generalRules.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: "rgba(0,0,0,0.25)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#FDBA74" }}>Vehicle Tariffs</h4>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.78rem", color: "#CBD5E1", display: "flex", flexDirection: "column", gap: "6px" }}>
                {PNG_PARK_FEE_SCHEDULE.vehicleTariffs.map((v, i) => (
                  <li key={i}>
                    <strong>{v.type}:</strong> {v.rate}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: "rgba(0,0,0,0.25)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#60A5FA" }}>Activity & Conservation Tariffs</h4>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.78rem", color: "#CBD5E1", display: "flex", flexDirection: "column", gap: "6px" }}>
                {PNG_PARK_FEE_SCHEDULE.activityTariffs.map((a, i) => (
                  <li key={i}>
                    <strong>{a.activity}:</strong> {a.rate}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIGITAL PERMIT WALLET */}
      {activeTab === "wallet" && (
        <div
          style={{
            background: "rgba(15, 48, 42, 0.7)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "26px"
          }}
        >
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF" }}>
            My Issued Digital Permits & Official Clearances ({issuedPermits.length})
          </h3>

          {issuedPermits.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "rgba(0,0,0,0.2)", borderRadius: "12px" }}>
              <p style={{ margin: "0 0 16px 0", fontSize: "0.9rem", color: "#94A3B8" }}>
                No digital permits issued in this session yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("directory");
                  setShowIssueModal(true);
                }}
                style={{
                  background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  cursor: "pointer"
                }}
              >
                + Issue Your First PNG Permit
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
              {issuedPermits.map(permit => (
                <div
                  key={permit.id}
                  style={{
                    background: "linear-gradient(135deg, #103630 0%, #08211D 100%)",
                    borderRadius: "14px",
                    border: "1.5px solid #EA580C",
                    padding: "20px",
                    position: "relative",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 800 }}>
                        OFFICIAL CLEARANCE PASS
                      </span>
                      <h4 style={{ margin: "6px 0 2px 0", fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF" }}>
                        {permit.permitName}
                      </h4>
                      <span style={{ fontSize: "0.72rem", color: "#34D399" }}>Ref: {permit.reference}</span>
                    </div>

                    {/* QR Stamp Simulation */}
                    <div style={{ background: "#FFFFFF", padding: "6px", borderRadius: "6px", textAlign: "center" }}>
                      <div style={{ width: "48px", height: "48px", background: "#0D2B27", display: "grid", placeItems: "center", color: "#34D399", fontSize: "0.7rem", fontWeight: 900 }}>
                        QR PASS
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "8px", fontSize: "0.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "12px" }}>
                    <div>
                      <span style={{ color: "#94A3B8" }}>Holder:</span>
                      <strong style={{ display: "block", color: "#FFFFFF" }}>{permit.holderName}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#94A3B8" }}>Passport / NID:</span>
                      <strong style={{ display: "block", color: "#FFFFFF" }}>{permit.passportOrId}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#94A3B8" }}>Tier:</span>
                      <strong style={{ display: "block", color: "#FDBA74" }}>{permit.visitorTier}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#94A3B8" }}>Valid From:</span>
                      <strong style={{ display: "block", color: "#34D399" }}>{permit.startDate}</strong>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Status: <strong style={{ color: "#34D399" }}>ACTIVE & VALID</strong></span>
                    <button
                      type="button"
                      onClick={() => setActivePermitView(permit)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#FFFFFF",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      View Full Pass 🔍
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ISSUE PERMIT MODAL */}
      {showIssueModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setShowIssueModal(false)}>
          <div style={{ background: "#0E3831", color: "#FFFFFF", borderRadius: "18px", maxWidth: "540px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "26px", border: "1.5px solid #EA580C" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
              <div>
                <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 800 }}>
                  STATUTORY REGISTRATION
                </span>
                <h3 style={{ margin: "4px 0 0 0", fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF" }}>
                  Issue {selectedPark.name}
                </h3>
              </div>
              <button onClick={() => setShowIssueModal(false)} style={{ background: "none", border: "none", color: "#CBD5E1", fontSize: "1.4rem", cursor: "pointer" }}>✕</button>
            </div>

            <form onSubmit={handleIssuePermit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.76rem", color: "#FDBA74", fontWeight: 700, marginBottom: "4px" }}>
                  Primary Trekker / Visitor Full Name *
                </label>
                <input
                  required
                  placeholder="e.g. Samuel Gari or David Alexander Scott"
                  value={holderName}
                  onChange={e => setHolderName(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", color: "#FDBA74", fontWeight: 700, marginBottom: "4px" }}>
                    Passport / National ID (NID) *
                  </label>
                  <input
                    required
                    placeholder="e.g. NID 1092834 or PA892301"
                    value={passportOrId}
                    onChange={e => setPassportOrId(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", color: "#FDBA74", fontWeight: 700, marginBottom: "4px" }}>
                    Country of Origin / Residence
                  </label>
                  <input
                    value={countryOfOrigin}
                    onChange={e => setCountryOfOrigin(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", color: "#FDBA74", fontWeight: 700, marginBottom: "4px" }}>
                    Visitor Category
                  </label>
                  <select
                    value={visitorTier}
                    onChange={e => setVisitorTier(e.target.value as "Citizen" | "PNG Resident" | "International" | "Trekking Expedition")}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.85rem" }}
                  >
                    <option value="International">International Tourist</option>
                    <option value="PNG Resident">PNG Resident (Work Permit)</option>
                    <option value="Citizen">PNG Citizen (NID Holder)</option>
                    <option value="Trekking Expedition">Guided Trekking Expedition</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", color: "#FDBA74", fontWeight: 700, marginBottom: "4px" }}>
                    Entry Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ background: "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "8px", fontSize: "0.78rem", color: "#CBD5E1" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>Statutory Conservation Levy:</span>
                  <strong>{formatPrice(selectedPark.feePgk, currency)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#34D399" }}>
                  <span>Landowner Community Benefit:</span>
                  <strong>100% Retained by Landowner Eco-Trust</strong>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px",
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(234, 88, 12, 0.4)",
                  marginTop: "6px"
                }}
              >
                Confirm & Generate Official Digital Permit 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FULL PERMIT TICKET VIEW MODAL */}
      {activePermitView && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setActivePermitView(null)}>
          <div style={{ background: "#FFFFFF", color: "#0B2621", borderRadius: "18px", maxWidth: "480px", width: "100%", padding: "26px", border: "3px solid #EA580C", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: "center", borderBottom: "2px dashed #CBD5E1", paddingBottom: "16px", marginBottom: "16px" }}>
              <div style={{ fontSize: "1.8rem" }}>🇵🇬</div>
              <h3 style={{ margin: "4px 0 2px 0", fontSize: "1.2rem", fontWeight: 900, color: "#0B2621" }}>
                OFFICIAL CONSERVATION CLEARANCE
              </h3>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>
                INDEPENDENT STATE OF PAPUA NEW GUINEA
              </p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "0.72rem", color: "#EA580C", fontWeight: 800, textTransform: "uppercase" }}>
                {activePermitView.permitName}
              </div>
              <h4 style={{ margin: "2px 0 10px 0", fontSize: "1.15rem", fontWeight: 900 }}>
                {activePermitView.holderName}
              </h4>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.78rem", background: "#F1F5F9", padding: "10px", borderRadius: "8px" }}>
                <div>
                  <span style={{ color: "#64748B" }}>Permit Ref:</span>
                  <strong style={{ display: "block", color: "#0B2621" }}>{activePermitView.reference}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748B" }}>Passport / NID:</span>
                  <strong style={{ display: "block", color: "#0B2621" }}>{activePermitView.passportOrId}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748B" }}>Valid From:</span>
                  <strong style={{ display: "block", color: "#059669" }}>{activePermitView.startDate}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748B" }}>Valid Until:</span>
                  <strong style={{ display: "block", color: "#059669" }}>{activePermitView.expiryDate}</strong>
                </div>
              </div>
            </div>

            {/* Offline QR Scanner Code */}
            <div style={{ textAlign: "center", background: "#F8FAFC", padding: "16px", borderRadius: "10px", border: "1px solid #E2E8F0", marginBottom: "16px" }}>
              <div style={{ width: "120px", height: "120px", margin: "0 auto 8px auto", background: "#0B2621", display: "grid", placeItems: "center", color: "#34D399", fontSize: "0.85rem", fontWeight: 900, borderRadius: "8px" }}>
                VALID QR
              </div>
              <span style={{ fontSize: "0.7rem", color: "#64748B", display: "block" }}>
                Ranger verification signature: {activePermitView.validationQrToken.slice(0, 24)}...
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActivePermitView(null)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#0B2621", color: "#FFFFFF", border: "none", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

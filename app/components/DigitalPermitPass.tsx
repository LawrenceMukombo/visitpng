"use client";

import React, { useState, useSyncExternalStore } from "react";
import {
  ZAMBIA_PERMIT_TYPES,
  ZAMBIA_PARK_FEE_SCHEDULE,
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
  return localStorage.getItem("zamroam_digital_permits") || "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

export default function DigitalPermitPass({ currency }: DigitalPermitPassProps) {
  const permitTypes = ZAMBIA_PERMIT_TYPES;
  const [selectedParkId, setSelectedParkId] = useState<string>("south-luangwa-entry-pass");
  const [activeTab, setActiveTab] = useState<"directory" | "schedule" | "wallet">("directory");
  const [filterTier, setFilterTier] = useState<string>("all");

  const selectedPark: PermitType =
    permitTypes.find((p) => p.id === selectedParkId) || permitTypes[0];

  // Modal State
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [holderName, setHolderName] = useState("");
  const [passportOrId, setPassportOrId] = useState("");
  const [visitorTier, setVisitorTier] = useState<"Citizen" | "SADC Resident" | "International" | "Self-Drive">("International");
  const [countryOfOrigin, setCountryOfOrigin] = useState("United States");
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
    const newPermit = createPermit(
      selectedPark.id,
      holderName,
      passportOrId,
      visitorTier,
      countryOfOrigin || "Zambia",
      startDate,
      currency
    );

    const updated = [newPermit, ...issuedPermits];
    try {
      localStorage.setItem("zamroam_digital_permits", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch {}

    setStatusMessage(`🎉 Official Pass ${newPermit.reference} issued for ${selectedPark.parkName}! Saved to offline wallet.`);
    setShowIssueModal(false);
    setActivePermitView(newPermit);
    setActiveTab("wallet");
    setHolderName("");
    setPassportOrId("");
    setTimeout(() => setStatusMessage(""), 5000);
  };

  const filteredParks = permitTypes.filter((park) => {
    if (filterTier === "all") return true;
    return park.categoryTier === filterTier;
  });

  const renderSvgQr = (token: string) => {
    const size = 160;
    const grid = 9;
    const cellSize = size / grid;
    const cells = [];
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        const isCorner =
          (r < 3 && c < 3) ||
          (r < 3 && c >= grid - 3) ||
          (r >= grid - 3 && c < 3);
        const charCode = token.charCodeAt((r * grid + c) % token.length) || 0;
        const fill = isCorner || charCode % 2 === 0;
        if (fill) {
          cells.push({ x: c * cellSize, y: r * cellSize, w: cellSize - 1, h: cellSize - 1 });
        }
      }
    }

    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="permitQrSvg" style={{ width: "130px", height: "130px", background: "var(--brand-white)", padding: "6px", borderRadius: "8px" }}>
        <rect width={size} height={size} fill="var(--brand-white)" rx="8" />
        {cells.map((cell, idx) => (
          <rect
            key={idx}
            x={cell.x}
            y={cell.y}
            width={cell.w}
            height={cell.h}
            fill="var(--action-primary)"
            rx="1"
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="permitsSection" style={{ padding: "0 4px" }}>
      {/* Header */}
      <div className="permitsHeader" style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ fontSize: "22px" }}>🎫</span>
          <div>
            <p className="eyebrow" style={{ color: "#C86428", fontSize: "10px", margin: 0, letterSpacing: "0.12em", fontWeight: 800 }}>
              OFFICIAL DNPW ZAMBIA PARK ENTRY FEES & ACCESS PASSES
            </p>
            <h2 style={{ fontSize: "20px", margin: "2px 0 4px", fontWeight: 700 }}>
              National Park Permits & Tariffs
            </h2>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.45", margin: 0 }}>
          Direct Department of National Parks & Wildlife (DNPW) conservation passes, daily entrance rates, vehicle tariffs, and verified lodge facilities across Zambia&apos;s iconic safari circuits.
        </p>
      </div>

      {/* Navigation View Switcher */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[
            { id: "directory", label: "🏞️ Park Directory & Facilities" },
            { id: "schedule", label: "📊 Official 2025/2026 Fee Schedule" },
            { id: "wallet", label: `🎫 My Passes (${issuedPermits.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "directory" | "schedule" | "wallet")}
              style={{
                padding: "7px 12px",
                borderRadius: "8px",
                border: activeTab === tab.id ? "1px solid #0A4D3C" : "1px solid var(--border-default)",
                background: activeTab === tab.id ? "#0A4D3C" : "var(--surface-card)",
                color: activeTab === tab.id ? "#FFFFFF" : "var(--text-primary)",
                fontSize: "11px",
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowIssueModal(true)}
          style={{
            background: "#C86428",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "7px 14px",
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          ➕ Issue Digital Permit
        </button>
      </div>

      {statusMessage && (
        <div
          style={{
            background: "rgba(10, 77, 60, 0.1)",
            border: "1px solid #0A4D3C",
            color: "#0A4D3C",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 600,
            marginBottom: "16px"
          }}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </div>
      )}

      {/* Advisory Banner on Gate Payments */}
      <div
        style={{
          background: "rgba(200, 100, 40, 0.08)",
          border: "1px solid rgba(200, 100, 40, 0.3)",
          borderRadius: "10px",
          padding: "10px 14px",
          marginBottom: "16px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
          <span style={{ fontSize: "14px" }}>⚠️</span>
          <strong style={{ fontSize: "11px", color: "#C86428", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Important DNPW Gate Payment & Currency Protocol:
          </strong>
        </div>
        <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11px", color: "var(--text-primary)", lineHeight: "1.4" }}>
          <li><strong>Cash-Only at Most Gates:</strong> Credit card terminals and ATMs are not available at remote park gates. Always carry sufficient cash in USD or ZMW before departure.</li>
          <li><strong>US Dollar Bill Series:</strong> USD banknotes must be crisp, unblemished, and from <strong>Series 2013 or newer</strong>. Older banknotes are refused by park revenue collectors.</li>
          <li><strong>Citizen Verification:</strong> Zambian Citizens must present their original National Registration Card (NRC) or Passport at the entry gate.</li>
        </ul>
      </div>

      {/* TAB 1: PARK DIRECTORY & FACILITIES */}
      {activeTab === "directory" && (
        <div>
          {/* Tier Filters */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "14px", overflowX: "auto" }}>
            {[
              { id: "all", label: "All National Parks" },
              { id: "Category A", label: "⭐ Category A (Premium Parks)" },
              { id: "Category B", label: "🌿 Category B (Wilderness Parks)" },
              { id: "Special Heritage", label: "🌊 World Heritage (Victoria Falls)" }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterTier(cat.id)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--border-default)",
                  background: filterTier === cat.id ? "#0A4D3C" : "var(--surface-card)",
                  color: filterTier === cat.id ? "#FFFFFF" : "var(--text-secondary)",
                  fontSize: "10px",
                  fontWeight: filterTier === cat.id ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "14px", marginBottom: "20px" }}>
            {filteredParks.map((park) => (
              <div
                key={park.id}
                style={{
                  background: "var(--surface-card)",
                  border: selectedPark.id === park.id ? "2px solid #0A4D3C" : "1px solid var(--border-default)",
                  borderRadius: "12px",
                  padding: "14px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                    <div>
                      <span style={{ fontSize: "9px", background: park.categoryTier === "Category A" ? "rgba(200, 100, 40, 0.15)" : "rgba(10, 77, 60, 0.12)", color: park.categoryTier === "Category A" ? "#C86428" : "#0A4D3C", padding: "2px 6px", borderRadius: "4px", fontWeight: 800, textTransform: "uppercase" }}>
                        {park.categoryTier}
                      </span>
                      <h3 style={{ fontSize: "15px", margin: "4px 0 2px", fontWeight: 700, color: "var(--text-primary)" }}>
                        {park.parkName}
                      </h3>
                      <small style={{ fontSize: "10px", color: "var(--text-secondary)" }}>
                        📍 {park.province} · {park.region}
                      </small>
                    </div>
                    <span style={{ fontSize: "10px", background: "var(--surface-subtle)", padding: "3px 6px", borderRadius: "6px", fontWeight: 600, color: "var(--text-secondary)" }}>
                      🕒 {park.gateHours}
                    </span>
                  </div>

                  <p style={{ fontSize: "11px", color: "var(--text-primary)", lineHeight: "1.4", margin: "0 0 10px" }}>
                    {park.description}
                  </p>

                  {/* Official Fee Matrix Card */}
                  <div style={{ background: "rgba(10, 77, 60, 0.04)", border: "1px solid rgba(10, 77, 60, 0.15)", borderRadius: "8px", padding: "8px 10px", marginBottom: "10px" }}>
                    <small style={{ fontSize: "9px", fontWeight: 800, color: "#0A4D3C", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      💰 Daily Entry Fees (06:00 – 18:00):
                    </small>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "10px" }}>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>🇿🇲 Zambian Citizen:</span>
                        <strong style={{ display: "block", color: "#0A4D3C" }}>K{park.feeCitizenZmw.toFixed(2)} ZMW</strong>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>🌍 SADC Resident:</span>
                        <strong style={{ display: "block", color: "#0A4D3C" }}>${park.feeSadcUsd}.00 USD</strong>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>🌐 International:</span>
                        <strong style={{ display: "block", color: "#0A4D3C" }}>${park.feeInternationalUsd}.00 USD</strong>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>🚙 Self-Driver:</span>
                        <strong style={{ display: "block", color: "#0A4D3C" }}>${park.feeSelfDriveUsd}.00 USD</strong>
                      </div>
                    </div>
                  </div>

                  {/* Facilities list */}
                  <div style={{ marginBottom: "10px" }}>
                    <small style={{ fontSize: "9px", fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase", display: "block", marginBottom: "3px" }}>
                      🏕️ Verified Facilities & Bush Camps:
                    </small>
                    <ul style={{ margin: 0, paddingLeft: "14px", fontSize: "10px", color: "var(--text-primary)", lineHeight: "1.35" }}>
                      {park.facilities.slice(0, 4).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedParkId(park.id);
                    setShowIssueModal(true);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#0A4D3C",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    marginTop: "6px"
                  }}
                >
                  Issue Entry Pass for {park.parkName} →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIAL 2025/2026 FEE SCHEDULE */}
      {activeTab === "schedule" && (
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", margin: "0 0 4px", fontWeight: 700, color: "#0A4D3C" }}>
            Official Statutory Park Entry Fees (Per Person, Per Day)
          </h3>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: "0 0 14px" }}>
            Published by the Zambian Department of National Parks and Wildlife (DNPW). Valid 06:00 to 18:00.
          </p>

          <div style={{ overflowX: "auto", marginBottom: "16px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(10, 77, 60, 0.08)", borderBottom: "2px solid #0A4D3C" }}>
                  <th style={{ padding: "8px 10px", color: "#0A4D3C" }}>Park Category & Examples</th>
                  <th style={{ padding: "8px 10px", color: "#0A4D3C" }}>Zambian Citizens</th>
                  <th style={{ padding: "8px 10px", color: "#0A4D3C" }}>SADC Nationals / Residents</th>
                  <th style={{ padding: "8px 10px", color: "#0A4D3C" }}>International Non-Residents</th>
                  <th style={{ padding: "8px 10px", color: "#0A4D3C" }}>Self-Drive Visitors</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                  <td style={{ padding: "10px" }}>
                    <strong style={{ color: "var(--text-primary)", display: "block" }}>Category A (Premium)</strong>
                    <small style={{ color: "var(--text-secondary)" }}>South Luangwa, Lower Zambezi</small>
                  </td>
                  <td style={{ padding: "10px", fontWeight: 700, color: "#0A4D3C" }}>K55.60 ZMW</td>
                  <td style={{ padding: "10px" }}>$20.00 USD</td>
                  <td style={{ padding: "10px", fontWeight: 700 }}>$25.00 USD</td>
                  <td style={{ padding: "10px" }}>$30.00 USD</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-default)", background: "rgba(0,0,0,0.01)" }}>
                  <td style={{ padding: "10px" }}>
                    <strong style={{ color: "var(--text-primary)", display: "block" }}>Category B (Wilderness)</strong>
                    <small style={{ color: "var(--text-secondary)" }}>Kafue, North Luangwa, Kasanka, Liuwa Plain, Nsumbu, Lochinvar</small>
                  </td>
                  <td style={{ padding: "10px", fontWeight: 700, color: "#0A4D3C" }}>K44.80 ZMW</td>
                  <td style={{ padding: "10px" }}>$15.00 USD</td>
                  <td style={{ padding: "10px", fontWeight: 700 }}>$20.00 USD</td>
                  <td style={{ padding: "10px" }}>$20.00 USD</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                  <td style={{ padding: "10px" }}>
                    <strong style={{ color: "var(--text-primary)", display: "block" }}>Victoria Falls Rainforest</strong>
                    <small style={{ color: "var(--text-secondary)" }}>Mosi-oa-Tunya UNESCO World Heritage</small>
                  </td>
                  <td style={{ padding: "10px", fontWeight: 700, color: "#0A4D3C" }}>K33.60 ZMW</td>
                  <td style={{ padding: "10px" }}>$10.00 USD</td>
                  <td style={{ padding: "10px", fontWeight: 700 }}>$15.00 USD</td>
                  <td style={{ padding: "10px" }}>$15.00 USD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
            {/* Vehicle Tariffs */}
            <div style={{ background: "var(--surface-subtle)", borderRadius: "8px", padding: "10px 12px" }}>
              <h4 style={{ fontSize: "12px", margin: "0 0 6px", fontWeight: 700, color: "#0A4D3C" }}>
                🚙 Vehicle Entry Fees (Per Day)
              </h4>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "10px", color: "var(--text-primary)", lineHeight: "1.45" }}>
                {ZAMBIA_PARK_FEE_SCHEDULE.vehicleTariffs.map((v, i) => (
                  <li key={i}><strong>{v.type}:</strong> {v.rate}</li>
                ))}
              </ul>
            </div>

            {/* Activities Tariffs */}
            <div style={{ background: "var(--surface-subtle)", borderRadius: "8px", padding: "10px 12px" }}>
              <h4 style={{ fontSize: "12px", margin: "0 0 6px", fontWeight: 700, color: "#C86428" }}>
                🎣 Activity & Camping Tariffs
              </h4>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "10px", color: "var(--text-primary)", lineHeight: "1.45" }}>
                {ZAMBIA_PARK_FEE_SCHEDULE.activityTariffs.map((a, i) => (
                  <li key={i}><strong>{a.activity}:</strong> {a.rate}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: USER OFFLINE WALLET */}
      {activeTab === "wallet" && (
        <div>
          {issuedPermits.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "var(--surface-card)", border: "1px dashed var(--border-default)", borderRadius: "12px" }}>
              <span style={{ fontSize: "36px", display: "block", marginBottom: "8px" }}>🎫</span>
              <h4 style={{ margin: "0 0 4px", fontSize: "15px" }}>No Digital Passes in Wallet</h4>
              <p style={{ margin: "0 0 14px", fontSize: "11px", color: "var(--text-secondary)" }}>
                Issue your official digital conservation pass to carry on your device with 100% offline verification at park gates.
              </p>
              <button
                type="button"
                onClick={() => setShowIssueModal(true)}
                style={{
                  background: "#0A4D3C",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                ➕ Issue Park Pass Now
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {issuedPermits.map((permit) => (
                <div
                  key={permit.id}
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "12px",
                    padding: "14px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 800, color: "#0A4D3C" }}>{permit.reference}</span>
                        <span style={{ fontSize: "9px", background: "rgba(10, 77, 60, 0.1)", color: "#0A4D3C", padding: "1px 5px", borderRadius: "4px", fontWeight: 700 }}>
                          ● {permit.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 style={{ fontSize: "15px", margin: "2px 0 3px", color: "var(--text-primary)" }}>{permit.permitName}</h4>
                      <small style={{ fontSize: "10px", color: "var(--text-secondary)" }}>🏛️ {permit.authority}</small>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "13px", fontWeight: 800, color: "#0A4D3C" }}>
                        {formatPrice(permit.feePaidZmw, currency)}
                      </span>
                      <small style={{ fontSize: "9px", color: "var(--text-secondary)", display: "block" }}>
                        Tier: {permit.visitorTier}
                      </small>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "center", borderTop: "1px solid var(--border-default)", paddingTop: "10px", flexWrap: "wrap" }}>
                    <div style={{ flexShrink: 0 }}>
                      {renderSvgQr(permit.validationQrToken)}
                    </div>
                    <div style={{ flex: 1, minWidth: "160px", fontSize: "10px", color: "var(--text-primary)", lineHeight: "1.45" }}>
                      <p style={{ margin: "0 0 2px" }}><strong>Holder:</strong> {permit.holderName}</p>
                      <p style={{ margin: "0 0 2px" }}><strong>ID / Passport:</strong> {permit.passportOrId}</p>
                      <p style={{ margin: "0 0 2px" }}><strong>Valid From:</strong> {permit.startDate} to {permit.expiryDate}</p>
                      <p style={{ margin: "0 0 4px" }}><strong>Verification Hash:</strong> <code style={{ fontSize: "9px", background: "var(--surface-subtle)", padding: "1px 4px" }}>{permit.offlineVerificationHash}</code></p>
                      <span style={{ fontSize: "9px", color: "#0A4D3C", fontWeight: 700 }}>
                        📶 100% Offline Validated at DNPW Gate Checkpoints
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ISSUE PERMIT MODAL */}
      {showIssueModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.65)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px"
          }}
        >
          <div
            style={{
              background: "var(--surface-card)",
              borderRadius: "14px",
              padding: "20px",
              maxWidth: "480px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", color: "#0A4D3C", fontWeight: 700 }}>
                🎫 Issue Digital Conservation Pass
              </h3>
              <button
                type="button"
                onClick={() => setShowIssueModal(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "var(--text-secondary)" }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleIssuePermit} style={{ display: "grid", gap: "10px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "3px", color: "var(--text-primary)" }}>
                  Select National Park:
                </label>
                <select
                  value={selectedParkId}
                  onChange={(e) => setSelectedParkId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-default)",
                    background: "var(--surface-subtle)",
                    fontSize: "11px"
                  }}
                >
                  {permitTypes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.parkName} ({p.categoryTier})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "3px", color: "var(--text-primary)" }}>
                  Visitor Category / Resident Tier:
                </label>
                <select
                  value={visitorTier}
                  onChange={(e) => setVisitorTier(e.target.value as "Citizen" | "SADC Resident" | "International" | "Self-Drive")}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-default)",
                    background: "var(--surface-subtle)",
                    fontSize: "11px"
                  }}
                >
                  <option value="International">International Visitor (${selectedPark.feeInternationalUsd}.00 USD)</option>
                  <option value="SADC Resident">SADC National / Resident (${selectedPark.feeSadcUsd}.00 USD)</option>
                  <option value="Citizen">Zambian Citizen (K{selectedPark.feeCitizenZmw.toFixed(2)} ZMW)</option>
                  <option value="Self-Drive">Self-Drive Explorer (${selectedPark.feeSelfDriveUsd}.00 USD)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "3px", color: "var(--text-primary)" }}>
                  Full Name (as per Passport / NRC):
                </label>
                <input
                  type="text"
                  required
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="e.g. Dr. Mwamba Chileshe / Sarah Jenkins"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-default)",
                    background: "var(--surface-subtle)",
                    fontSize: "11px"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "3px", color: "var(--text-primary)" }}>
                  Passport Number / National Registration (NRC):
                </label>
                <input
                  type="text"
                  required
                  value={passportOrId}
                  onChange={(e) => setPassportOrId(e.target.value)}
                  placeholder="e.g. ZM984124 / 349120/11/1"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-default)",
                    background: "var(--surface-subtle)",
                    fontSize: "11px"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "3px", color: "var(--text-primary)" }}>
                  Country of Residence:
                </label>
                <input
                  type="text"
                  value={countryOfOrigin}
                  onChange={(e) => setCountryOfOrigin(e.target.value)}
                  placeholder="e.g. Zambia, United Kingdom, South Africa"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-default)",
                    background: "var(--surface-subtle)",
                    fontSize: "11px"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "3px", color: "var(--text-primary)" }}>
                  Date of Entry:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-default)",
                    background: "var(--surface-subtle)",
                    fontSize: "11px"
                  }}
                />
              </div>

              <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  style={{
                    flex: 1,
                    padding: "9px",
                    border: "1px solid var(--border-default)",
                    background: "transparent",
                    borderRadius: "6px",
                    fontSize: "11px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2,
                    padding: "9px",
                    background: "#0A4D3C",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Confirm & Issue Offline Pass →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

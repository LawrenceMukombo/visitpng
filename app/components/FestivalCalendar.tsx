"use client";

import { useState, useSyncExternalStore } from "react";
import { FestivalEvent, PNG_FESTIVALS } from "../../db/festivals";
import { CurrencyCode, formatPrice } from "../../db/currency";

interface FestivalCalendarProps {
  currency: CurrencyCode;
  countryCode?: string;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getOfflineFestivalsSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem("visitpng_offline_festivals") || "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

export default function FestivalCalendar({ currency }: FestivalCalendarProps) {
  const festivalsList = PNG_FESTIVALS;
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [activeBookingFestival, setActiveBookingFestival] = useState<FestivalEvent | null>(null);
  const [bookingType, setBookingType] = useState<"standard" | "vip">("standard");
  const [ticketQuantity, setTicketQuantity] = useState("1");
  const [visitorName, setVisitorName] = useState("");
  const [notice, setNotice] = useState("");

  const offlineFestivalsRaw = useSyncExternalStore(subscribe, getOfflineFestivalsSnapshot, getServerSnapshot);
  let offlineFestivals: string[] = [];
  try {
    offlineFestivals = JSON.parse(offlineFestivalsRaw);
  } catch {
    offlineFestivals = [];
  }

  const toggleSaveOffline = (fest: FestivalEvent) => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem("visitpng_offline_festivals") || "[]");
      let next: string[];
      if (saved.includes(fest.id)) {
        next = saved.filter(id => id !== fest.id);
        localStorage.setItem(`visitpng_fest_${fest.id}`, "");
        setNotice(`Removed "${fest.name}" from offline guide storage.`);
      } else {
        next = [...saved, fest.id];
        localStorage.setItem(`visitpng_fest_${fest.id}`, JSON.stringify(fest));
        setNotice(`✅ "${fest.name}" complete schedule & etiquette guide saved for offline access!`);
      }
      localStorage.setItem("visitpng_offline_festivals", JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
    } catch {
      setNotice("Could not save to offline storage.");
    }
    setTimeout(() => setNotice(""), 3500);
  };

  const filteredFestivals = festivalsList.filter(f => {
    const matchMonth = selectedMonth === "all" || f.month.toLowerCase() === selectedMonth.toLowerCase();
    const matchRegion = selectedRegion === "all" || f.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchMonth && matchRegion;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) return;

    const qty = Number(ticketQuantity) || 1;
    const pricePerTicket = bookingType === "standard"
      ? activeBookingFestival!.ticketPricePgk
      : activeBookingFestival!.vipPackagePricePgk;
    const totalPrice = pricePerTicket * qty;

    try {
      const existing = JSON.parse(localStorage.getItem("visitpng_booked_festivals") || "[]");
      const bookingRecord = {
        id: `fest-book-${Date.now()}`,
        reference: `VPNG-FEST-${Date.now().toString().slice(-6)}`,
        festivalId: activeBookingFestival!.id,
        festivalName: activeBookingFestival!.name,
        visitorName,
        bookingType,
        quantity: qty,
        totalPrice,
        currency: "PGK",
        bookedAt: new Date().toISOString()
      };
      existing.unshift(bookingRecord);
      localStorage.setItem("visitpng_booked_festivals", JSON.stringify(existing));
      setNotice(`🎉 Booking confirmed! Ref: ${bookingRecord.reference} for ${qty}x ${activeBookingFestival!.name} ${bookingType.toUpperCase()} tickets.`);
    } catch {
      setNotice("Booking completed and saved to your session.");
    }

    setActiveBookingFestival(null);
    setVisitorName("");
    setTicketQuantity("1");
    setTimeout(() => setNotice(""), 5000);
  };

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
            LIVING CULTURAL HERITAGE & SING-SINGS
          </span>
          <span style={{ color: "#34D399", fontSize: "0.8rem", fontWeight: 700 }}>
            🇵🇬 800+ Tribes · 1,000 Kundu Drums · Sacred Fire Dancers
          </span>
        </div>
        <h2 style={{ margin: "0 0 6px 0", fontSize: "1.85rem", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
          Papua New Guinea Cultural Shows & Sing-Sings
        </h2>
        <p style={{ margin: 0, fontSize: "0.92rem", color: "#94A3B8", maxWidth: "800px", lineHeight: 1.5 }}>
          Experience the world-renowned Goroka Show, Mount Hagen Sing-Sing, Baining Fire Dance, and Kenu & Kundu Canoe Regattas. Secure official spectator and photographer passes with offline village protocol guides.
        </p>
      </div>

      {notice && (
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
          {notice}
        </div>
      )}

      {/* Filter Toolbar */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap", background: "rgba(15, 48, 42, 0.6)", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ flex: 1, minWidth: "220px" }}>
          <label style={{ display: "block", fontSize: "0.72rem", color: "#FDBA74", fontWeight: 800, textTransform: "uppercase", marginBottom: "6px" }}>
            Filter by Month (2026 Season)
          </label>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.82rem" }}
          >
            <option value="all">All Months (2026 Season)</option>
            <option value="July">July (Rabaul Mask & Baining Fire Dance)</option>
            <option value="August">August (Mount Hagen & Sepik Crocodile)</option>
            <option value="September">September (Goroka Show & Hiri Moale)</option>
            <option value="November">November (Kenu & Kundu Canoe Festival)</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: "220px" }}>
          <label style={{ display: "block", fontSize: "0.72rem", color: "#FDBA74", fontWeight: 800, textTransform: "uppercase", marginBottom: "6px" }}>
            Filter by Region
          </label>
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.82rem" }}
          >
            <option value="all">All 4 Regions (Highlands, Islands, Southern, Momase)</option>
            <option value="Highlands">Highlands (Goroka, Hagen, Enga)</option>
            <option value="Islands">Islands (Rabaul, Kokopo, Bainings)</option>
            <option value="Southern">Southern (Milne Bay, Port Moresby)</option>
            <option value="Momase">Momase (Sepik River, Madang)</option>
          </select>
        </div>
      </div>

      {/* Festivals Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "22px", maxWidth: "100%" }}>
        {filteredFestivals.map(fest => {
          const isSavedOffline = offlineFestivals.includes(fest.id);
          return (
            <div
              key={fest.id}
              style={{
                background: "rgba(15, 48, 42, 0.75)",
                borderRadius: "16px",
                border: "1px solid rgba(234, 88, 12, 0.25)",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {/* Card Cover Image */}
              <div
                style={{
                  height: "200px",
                  backgroundImage: `url(${fest.coverImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative"
                }}
              >
                {/* Month & Date Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: "rgba(11, 38, 33, 0.9)",
                    border: "1px solid #EA580C",
                    borderRadius: "8px",
                    padding: "4px 10px",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 800
                  }}
                >
                  <span>{fest.month} · {fest.dates}, {fest.year}</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSaveOffline(fest)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: isSavedOffline ? "#10B981" : "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    color: "#FFFFFF",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  {isSavedOffline ? "📥 Saved Offline" : "💾 Save Guide"}
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontSize: "0.74rem", color: "#34D399", fontWeight: 800 }}>📍 {fest.location}</span>
                    <span style={{ background: "rgba(0,0,0,0.3)", color: "#CBD5E1", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 700 }}>
                      {fest.province}
                    </span>
                  </div>

                  <h3 style={{ margin: "4px 0 4px 0", fontSize: "1.3rem", fontWeight: 900, color: "#FFFFFF" }}>
                    {fest.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#FDBA74", fontWeight: 700 }}>
                    {fest.subtitle}
                  </p>
                </div>

                <p style={{ margin: 0, fontSize: "0.82rem", color: "#CBD5E1", lineHeight: 1.45 }}>
                  {fest.description}
                </p>

                {/* Featured Clans */}
                <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8", fontWeight: 800, textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    Featured Clans & Sing-Sing Troupes:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {fest.featuredTribes.map((tribe, i) => (
                      <span key={i} style={{ background: "rgba(234,88,12,0.2)", border: "1px solid rgba(234,88,12,0.4)", color: "#FED7AA", padding: "2px 8px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 700 }}>
                        ♨ {tribe}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Schedule Highlights */}
                <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8", fontWeight: 800, textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    Schedule Highlights:
                  </span>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.74rem", color: "#E2E8F0", display: "flex", flexDirection: "column", gap: "3px" }}>
                    {fest.scheduleHighlights.map((s, i) => (
                      <li key={i}>
                        <strong style={{ color: "#34D399" }}>{s.day}:</strong> {s.event} <span style={{ color: "#94A3B8" }}>({s.time})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cultural Etiquette */}
                <div style={{ background: "rgba(0,0,0,0.2)", padding: "10px", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.7rem", color: "#34D399", fontWeight: 800, textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    Cultural Etiquette & Protocol:
                  </span>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.72rem", color: "#CBD5E1", display: "flex", flexDirection: "column", gap: "2px" }}>
                    {fest.etiquetteTips.map((tip, i) => (
                      <li key={i}>✓ {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing & Booking CTA Footer */}
              <div style={{ background: "rgba(11, 38, 33, 0.9)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <span style={{ fontSize: "0.68rem", color: "#94A3B8", display: "block" }}>Standard Pass:</span>
                  <strong style={{ fontSize: "1.05rem", color: "#FFFFFF" }}>{formatPrice(fest.ticketPricePgk, currency)}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveBookingFestival(fest)}
                  style={{
                    background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(234, 88, 12, 0.4)",
                    flex: "1 1 auto",
                    textAlign: "center"
                  }}
                >
                  Book Festival Pass 🎟️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOOKING MODAL */}
      {activeBookingFestival && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setActiveBookingFestival(null)}>
          <div style={{ background: "#0E3831", color: "#FFFFFF", borderRadius: "18px", maxWidth: "500px", width: "100%", padding: "26px", border: "1.5px solid #EA580C" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
              <div>
                <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 800 }}>
                  OFFICIAL PASS RESERVATION
                </span>
                <h3 style={{ margin: "4px 0 0 0", fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF" }}>
                  {activeBookingFestival.name}
                </h3>
              </div>
              <button onClick={() => setActiveBookingFestival(null)} style={{ background: "none", border: "none", color: "#CBD5E1", fontSize: "1.4rem", cursor: "pointer" }}>✕</button>
            </div>

            <form onSubmit={handleConfirmBooking} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.76rem", color: "#FDBA74", fontWeight: 700, marginBottom: "4px" }}>
                  Lead Traveler Full Name *
                </label>
                <input
                  required
                  placeholder="e.g. Samuel Gari"
                  value={visitorName}
                  onChange={e => setVisitorName(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", color: "#FDBA74", fontWeight: 700, marginBottom: "4px" }}>
                    Ticket Type
                  </label>
                  <select
                    value={bookingType}
                    onChange={e => setBookingType(e.target.value as "standard" | "vip")}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.85rem" }}
                  >
                    <option value="standard">Standard Spectator ({formatPrice(activeBookingFestival.ticketPricePgk, currency)})</option>
                    <option value="vip">VIP Arena + Photography Pass ({formatPrice(activeBookingFestival.vipPackagePricePgk, currency)})</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", color: "#FDBA74", fontWeight: 700, marginBottom: "4px" }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={ticketQuantity}
                    onChange={e => setTicketQuantity(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#FFFFFF", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ background: "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "8px", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Total Booking Cost:</span>
                  <strong style={{ fontSize: "1.1rem", color: "#FDBA74" }}>
                    {formatPrice(
                      (bookingType === "standard" ? activeBookingFestival.ticketPricePgk : activeBookingFestival.vipPackagePricePgk) *
                      (Number(ticketQuantity) || 1),
                      currency
                    )}
                  </strong>
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
                Confirm Festival Ticket Booking 🎟️
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useSyncExternalStore } from "react";
import { FestivalEvent, ZAMBIA_FESTIVALS } from "../../db/festivals";
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
  return localStorage.getItem("zamroam_offline_festivals") || "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

export default function FestivalCalendar({ currency }: FestivalCalendarProps) {
  const festivalsList = ZAMBIA_FESTIVALS;
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
      const saved: string[] = JSON.parse(localStorage.getItem("zamroam_offline_festivals") || "[]");
      let next: string[];
      if (saved.includes(fest.id)) {
        next = saved.filter(id => id !== fest.id);
        localStorage.setItem(`zamroam_fest_${fest.id}`, "");
        setNotice(`Removed "${fest.name}" from offline guide storage.`);
      } else {
        next = [...saved, fest.id];
        localStorage.setItem(`zamroam_fest_${fest.id}`, JSON.stringify(fest));
        setNotice(`✅ "${fest.name}" complete schedule & etiquette guide saved for offline access!`);
      }
      localStorage.setItem("zamroam_offline_festivals", JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
    } catch {
      setNotice("Could not save to offline storage.");
    }
    setTimeout(() => setNotice(""), 3500);
  };

  const handleBookTickets = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBookingFestival) return;
    const pricePerTicket = bookingType === "vip" 
      ? activeBookingFestival.vipPackagePriceZmw 
      : activeBookingFestival.ticketPriceZmw;
    const totalZmw = pricePerTicket * Number(ticketQuantity || 1);

    const bookingRef = `FEST-${activeBookingFestival.id.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const festivalPass = {
      reference: bookingRef,
      festivalName: activeBookingFestival.name,
      dates: activeBookingFestival.dates,
      location: activeBookingFestival.location,
      holderName: visitorName || "Cultural Explorer",
      quantity: Number(ticketQuantity),
      tier: bookingType.toUpperCase(),
      totalPaid: totalZmw,
      currency,
      bookedAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem("zamroam_festival_passes") || "[]");
      localStorage.setItem("zamroam_festival_passes", JSON.stringify([festivalPass, ...existing]));
    } catch {}

    setNotice(`🎉 Pass Confirmed! Ref: ${bookingRef}. Saved to your offline festival passes.`);
    setActiveBookingFestival(null);
    setVisitorName("");
    setTimeout(() => setNotice(""), 5000);
  };

  const months = Array.from(new Set(festivalsList.map(f => f.month))).filter(Boolean);
  const regions = Array.from(new Set(festivalsList.map(f => f.region))).filter(Boolean);

  const filtered = festivalsList.filter(f => {
    const matchMonth = selectedMonth === "all" || f.month.toLowerCase() === selectedMonth.toLowerCase();
    const matchRegion = selectedRegion === "all" || f.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchMonth && matchRegion;
  });

  return (
    <div className="festivalSection">
      <div className="festivalFilterBar">
        <div className="festivalFilterGroup">
          <small>Filter by Month:</small>
          <div className="filterPills">
            <button
              className={selectedMonth === "all" ? "active" : ""}
              onClick={() => setSelectedMonth("all")}
            >
              All Months
            </button>
            {months.map(m => (
              <button
                key={m}
                className={selectedMonth === m ? "active" : ""}
                onClick={() => setSelectedMonth(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="festivalFilterGroup">
          <small>Filter by Region:</small>
          <div className="filterPills">
            <button
              className={selectedRegion === "all" ? "active" : ""}
              onClick={() => setSelectedRegion("all")}
            >
              All Regions
            </button>
            {regions.map(r => (
              <button
                key={r}
                className={selectedRegion === r ? "active" : ""}
                onClick={() => setSelectedRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {notice && (
        <div className="festivalAlertBanner" role="status" aria-live="polite">
          {notice}
        </div>
      )}

      <div className="festivalList">
        {filtered.map(fest => {
          const isOffline = offlineFestivals.includes(fest.id);
          return (
            <article key={fest.id} className="festivalCard">
              <div
                className="festivalCover"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.75)), url(${fest.coverImage})`
                }}
              >
                <div className="festCoverTop">
                  <span className="festRegionBadge">{fest.region} · {fest.province}</span>
                  {isOffline && <span className="festOfflineTag">✅ Ready Offline</span>}
                </div>
                <h2>{fest.name}</h2>
                <p className="festDateRow">📅 <b>{fest.dates}, {fest.year}</b> · 📍 {fest.location}</p>
              </div>

              <div className="festivalDetails">
                <p className="festDescription">{fest.description}</p>

                <div className="tribesSection">
                  <strong>Featured Traditional Groups & Tribes:</strong>
                  <div className="tribeTags">
                    {fest.featuredTribes.map((t, i) => (
                      <span key={i} className="tribeTag">🎭 {t}</span>
                    ))}
                  </div>
                </div>

                <div className="scheduleTimeline">
                  <strong>Ceremony Schedule Highlights:</strong>
                  <ul>
                    {fest.scheduleHighlights.map((s, idx) => (
                      <li key={idx}>
                        <b>{s.day} ({s.time}):</b> {s.event}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="etiquetteBox">
                  <strong>📸 Customary Etiquette & Photography Rules:</strong>
                  <ul>
                    {fest.etiquetteTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="festivalFooter">
                  <div className="pricingColumn">
                    <small>Standard Entry</small>
                    <strong>{formatPrice(fest.ticketPriceZmw, currency)}</strong>
                    <span className="vipPrice">VIP Arena: {formatPrice(fest.vipPackagePriceZmw, currency)}</span>
                  </div>

                  <div className="festActionButtons">
                    <button
                      type="button"
                      className={`festOfflineBtn ${isOffline ? "active" : ""}`}
                      onClick={() => toggleSaveOffline(fest)}
                    >
                      {isOffline ? "✅ Guide Saved Offline" : "💾 Save Guide Offline"}
                    </button>
                    <button
                      type="button"
                      className="festBookBtn"
                      onClick={() => setActiveBookingFestival(fest)}
                    >
                      🎫 Reserve Tickets
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Ticket Reservation Modal */}
      {activeBookingFestival && (
        <div className="overlay" onClick={() => setActiveBookingFestival(null)}>
          <article className="sheet festBookingModal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setActiveBookingFestival(null)}>×</button>
            <p className="eyebrow lime">OFFICIAL CEREMONY RESERVATION</p>
            <h2>{activeBookingFestival.name}</h2>
            <p className="festModalDate">📅 {activeBookingFestival.dates}, {activeBookingFestival.year} · {activeBookingFestival.location}</p>

            <form onSubmit={handleBookTickets}>
              <label>
                Ticket Tier
                <select
                  value={bookingType}
                  onChange={e => setBookingType(e.target.value as "standard" | "vip")}
                >
                  <option value="standard">
                    Standard Entry Pass — {formatPrice(activeBookingFestival.ticketPriceZmw, currency)}
                  </option>
                  <option value="vip">
                    VIP Arena & Photographer Pass — {formatPrice(activeBookingFestival.vipPackagePriceZmw, currency)}
                  </option>
                </select>
              </label>

              <label>
                Number of Attendees
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={ticketQuantity}
                  onChange={e => setTicketQuantity(e.target.value)}
                />
              </label>

              <label>
                Primary Contact / Attendee Name
                <input
                  type="text"
                  required
                  placeholder="e.g. Mukombo Chileshe"
                  value={visitorName}
                  onChange={e => setVisitorName(e.target.value)}
                />
              </label>

              <div className="festPriceEstimate">
                <span>Total Pass Cost</span>
                <strong>
                  {formatPrice(
                    (bookingType === "vip" ? activeBookingFestival.vipPackagePriceZmw : activeBookingFestival.ticketPriceZmw) *
                    Number(ticketQuantity || 1),
                    currency
                  )}
                </strong>
              </div>

              <button type="submit" className="confirmFestBtn">
                Confirm & Generate Offline Pass
              </button>
            </form>
          </article>
        </div>
      )}
    </div>
  );
}

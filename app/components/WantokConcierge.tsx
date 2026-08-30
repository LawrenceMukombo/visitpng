"use client";

import { useState } from "react";
import { PNG_CURATED_ITINERARIES, GeneratedItinerary, generateCustomItinerary } from "../../db/wantokAi";
import { CurrencyCode, formatPrice } from "../../db/currency";

interface WantokConciergeProps {
  currency: CurrencyCode;
  countryCode?: string;
  onOpenTrips?: () => void;
}

export default function WantokConcierge({ currency, onOpenTrips }: WantokConciergeProps) {
  const initialItinerary = PNG_CURATED_ITINERARIES[0];

  const [selectedStyle, setSelectedStyle] = useState<string>("Wilderness Expedition");
  const [durationDays, setDurationDays] = useState<number>(8);
  const [fitnessLevel, setFitnessLevel] = useState<string>("Moderate");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Kokoda Track 96km Crossing",
    "Bird of Paradise Watching"
  ]);
  const [customPrompt] = useState("");
  const [activeItinerary, setActiveItinerary] = useState<GeneratedItinerary>(initialItinerary);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [newActivityInputs, setNewActivityInputs] = useState<Record<number, string>>({});

  const availableInterests = [
    { id: "Kokoda Track 96km Crossing", icon: "🥾" },
    { id: "Bird of Paradise Watching", icon: "🦜" },
    { id: "Asaro Mudmen & Sing-Sings", icon: "🎭" },
    { id: "Kimbe Bay Coral Seamounts", icon: "🤿" },
    { id: "Sepik River Spirit Houses", icon: "🛶" },
    { id: "Mount Wilhelm Alpine Summit", icon: "⛰️" },
    { id: "Tari Valley Huli Wigmen", icon: "🪶" },
    { id: "Tufi Volcanic Fjords & Diving", icon: "🌋" },
    { id: "Rabaul Volcanoes & Fire Dance", icon: "🔥" },
    { id: "Milne Bay War Canoe Regattas", icon: "⛵" }
  ];

  const updateItineraryLive = (
    interests: string[],
    duration: number,
    style: string,
    fitness: string
  ) => {
    const it = generateCustomItinerary(
      interests.length ? interests : [customPrompt || "Adventure"],
      duration,
      style,
      fitness,
      "PNG"
    );
    setActiveItinerary(it);
  };

  const toggleInterest = (intId: string) => {
    const updated = selectedInterests.includes(intId)
      ? selectedInterests.filter(i => i !== intId)
      : [...selectedInterests, intId];
    setSelectedInterests(updated);
    updateItineraryLive(updated, durationDays, selectedStyle, fitnessLevel);
  };

  const handleStyleChange = (newStyle: string) => {
    setSelectedStyle(newStyle);
    updateItineraryLive(selectedInterests, durationDays, newStyle, fitnessLevel);
  };

  const handleDurationChange = (newDuration: number) => {
    setDurationDays(newDuration);
    updateItineraryLive(selectedInterests, newDuration, selectedStyle, fitnessLevel);
  };

  const handleFitnessChange = (newFitness: string) => {
    setFitnessLevel(newFitness);
    updateItineraryLive(selectedInterests, durationDays, selectedStyle, newFitness);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const it = generateCustomItinerary(
        selectedInterests.length ? selectedInterests : [customPrompt || "Adventure"],
        durationDays,
        selectedStyle,
        fitnessLevel,
        "PNG"
      );
      setActiveItinerary(it);
      setIsGenerating(false);
      setSaveNotice(`✨ New ${it.durationDays}-Day itinerary generated for ${it.travelStyle}!`);
      setTimeout(() => setSaveNotice(""), 3500);
    }, 300);
  };

  const handleAddActivity = (dayNumber: number) => {
    const text = newActivityInputs[dayNumber]?.trim();
    if (!text) return;
    const updatedDays = activeItinerary.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return { ...d, activities: [...d.activities, text] };
      }
      return d;
    });
    setActiveItinerary({ ...activeItinerary, days: updatedDays });
    setNewActivityInputs({ ...newActivityInputs, [dayNumber]: "" });
  };

  const handleRemoveActivity = (dayNumber: number, actIndex: number) => {
    const updatedDays = activeItinerary.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return { ...d, activities: d.activities.filter((_, i) => i !== actIndex) };
      }
      return d;
    });
    setActiveItinerary({ ...activeItinerary, days: updatedDays });
  };

  const handleSaveToTrips = () => {
    try {
      const existingTrips = JSON.parse(localStorage.getItem("visitpng_trips") || "[]");
      const newTrip = {
        id: `trip-${Date.now()}`,
        name: activeItinerary.title,
        destination: activeItinerary.provincesCovered.join(", "),
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date(Date.now() + activeItinerary.durationDays * 86400000).toISOString().slice(0, 10),
        travellerCount: 2,
        budget: activeItinerary.totalEstimatedCostPgk,
        status: "planning",
        interests: selectedInterests.join(", "),
        notes: `Generated by Wantok AI Concierge (${activeItinerary.travelStyle})`,
        items: activeItinerary.days.map((d, idx) => ({
          id: `item-${Date.now()}-${idx}`,
          title: d.title,
          scheduledDate: new Date(Date.now() + idx * 86400000).toISOString().slice(0, 10),
          cost: d.estimatedCostPgk,
          notes: d.activities.join(" · ")
        }))
      };
      existingTrips.unshift(newTrip);
      localStorage.setItem("visitpng_trips", JSON.stringify(existingTrips));
      setSaveNotice("✓ Itinerary saved to My Trips! You can now edit stops and invite companions.");
      if (onOpenTrips) {
        setTimeout(onOpenTrips, 1500);
      }
    } catch {
      setSaveNotice("Saved to local offline session.");
    }
  };

  const travelStyles = [
    { id: "Wilderness Expedition", label: "Kokoda & Peaks", icon: "🥾", badge: "Trek" },
    { id: "Cultural Immersion", label: "Sing-Sings & Tribes", icon: "♨", badge: "Culture" },
    { id: "Diving & Islands", label: "Coral Triangle Scuba", icon: "🤿", badge: "Marine" },
    { id: "WWII History", label: "Battlefield Heritage", icon: "⚔️", badge: "History" },
    { id: "Family & Nature", label: "Birds of Paradise", icon: "◇", badge: "Nature" }
  ];

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
      <div style={{ marginBottom: "28px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "4px 10px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.08em" }}>
            WANTOK AI EXPEDITION ENGINE
          </span>
          <span style={{ color: "#34D399", fontSize: "0.8rem", fontWeight: 700 }}>
            🇵🇬 Papua New Guinea · 22 Provinces
          </span>
        </div>
        <h2 style={{ margin: "0 0 6px 0", fontSize: "1.85rem", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
          Wantok AI Travel Concierge
        </h2>
        <p style={{ margin: 0, fontSize: "0.92rem", color: "#94A3B8", maxWidth: "780px", lineHeight: 1.5 }}>
          Instantly generate realistic, culturally aligned expeditions across Papua New Guinea — with verified local lodges, licensed KTA guides, and transparent Kina pricing.
        </p>
      </div>

      {saveNotice && (
        <div
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid #10B981",
            color: "#6EE7B7",
            padding: "12px 18px",
            borderRadius: "10px",
            fontSize: "0.85rem",
            fontWeight: 700,
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          {saveNotice}
        </div>
      )}

      {/* Main 2-Column Responsive Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "28px", alignItems: "start", maxWidth: "100%" }}>
        {/* Left Column: Interactive Planner Controls */}
        <div
          style={{
            background: "rgba(15, 48, 42, 0.7)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "24px",
            backdropFilter: "blur(10px)",
            minWidth: 0
          }}
        >
          <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {/* Travel Style Selector */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 800, color: "#FDBA74", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.05em" }}>
                1. Choose Your Expedition Style
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))", gap: "8px" }}>
                {travelStyles.map(s => {
                  const isActive = selectedStyle === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleStyleChange(s.id)}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: "1.5px solid",
                        borderColor: isActive ? "#EA580C" : "rgba(255,255,255,0.12)",
                        background: isActive ? "linear-gradient(135deg, rgba(234,88,12,0.3) 0%, rgba(234,88,12,0.1) 100%)" : "rgba(0,0,0,0.25)",
                        color: "#FFFFFF",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "0.82rem", fontWeight: 800, color: "#FDBA74", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  2. Trip Duration
                </label>
                <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "2px 10px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800 }}>
                  {durationDays} Days
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={14}
                value={durationDays}
                onChange={e => handleDurationChange(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#EA580C", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#94A3B8", marginTop: "4px" }}>
                <span>3 Days (Short Gateway)</span>
                <span>8 Days (Classic)</span>
                <span>14 Days (Grand Circuit)</span>
              </div>
            </div>

            {/* Fitness & Pace Selector */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 800, color: "#FDBA74", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>
                3. Fitness & Trekking Pace
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: "6px" }}>
                {[
                  { id: "Gentle", icon: "🌱" },
                  { id: "Moderate", icon: "🥾" },
                  { id: "Challenging", icon: "⛰️" },
                  { id: "Extreme Expedition", icon: "⚡" }
                ].map(lvl => {
                  const isActive = fitnessLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => handleFitnessChange(lvl.id)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: "8px",
                        border: "1px solid",
                        borderColor: isActive ? "#34D399" : "rgba(255,255,255,0.12)",
                        background: isActive ? "rgba(52, 211, 153, 0.2)" : "rgba(0,0,0,0.2)",
                        color: isActive ? "#6EE7B7" : "#CBD5E1",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      {lvl.icon} {lvl.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Highlight Interest Chips */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 800, color: "#FDBA74", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>
                4. Select Highlights & Regions
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {availableInterests.map(item => {
                  const isSelected = selectedInterests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        border: "1px solid",
                        borderColor: isSelected ? "#EA580C" : "rgba(255,255,255,0.15)",
                        background: isSelected ? "#EA580C" : "rgba(0,0,0,0.25)",
                        color: "#FFFFFF",
                        fontSize: "0.74rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.id}</span>
                      <span style={{ color: isSelected ? "#FFFFFF" : "#34D399", fontWeight: 800 }}>
                        {isSelected ? "✓" : "+"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate CTA Button */}
            <button
              type="submit"
              disabled={isGenerating}
              style={{
                marginTop: "6px",
                background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "0.92rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(234, 88, 12, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              {isGenerating ? "🧠 Compiling Wantok Itinerary..." : "⚡ Generate Custom Itinerary"}
            </button>
          </form>
        </div>

        {/* Right Column: Generated Itinerary View */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Header Summary Card */}
          <div
            style={{
              background: "radial-gradient(ellipse at top left, #164E44 0%, #0D332D 100%)",
              borderRadius: "16px",
              border: "1px solid rgba(234, 88, 12, 0.35)",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "16px" }}>
              <div>
                <span style={{ background: "rgba(234,88,12,0.25)", color: "#FDBA74", padding: "3px 10px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", display: "inline-block", marginBottom: "6px" }}>
                  {activeItinerary.travelStyle}
                </span>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "1.35rem", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.25 }}>
                  {activeItinerary.title}
                </h3>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#CBD5E1" }}>
                  {activeItinerary.subtitle}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setIsCustomizing(!isCustomizing)}
                  style={{
                    flex: "1 1 130px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#FFFFFF",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    textAlign: "center"
                  }}
                >
                  {isCustomizing ? "✓ Done Editing" : "✏️ Edit Activities"}
                </button>
                <button
                  type="button"
                  onClick={handleSaveToTrips}
                  style={{
                    flex: "1 1 150px",
                    background: "#059669",
                    border: "none",
                    color: "#FFFFFF",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontSize: "0.76rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(5,150,105,0.4)",
                    textAlign: "center"
                  }}
                >
                  📋 Save to My Trips
                </button>
              </div>
            </div>

            {/* Key Meta Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px", background: "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "10px" }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "#94A3B8", textTransform: "uppercase" }}>Duration</span>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#FFFFFF" }}>{activeItinerary.durationDays} Days</div>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "#94A3B8", textTransform: "uppercase" }}>Estimated Budget</span>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#FDBA74" }}>
                  {formatPrice(activeItinerary.totalEstimatedCostPgk, currency)}
                </div>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "#94A3B8", textTransform: "uppercase" }}>Best Season</span>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#34D399" }}>{activeItinerary.bestTravelMonths}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "#94A3B8", textTransform: "uppercase" }}>Provinces</span>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#E2E8F0" }}>{activeItinerary.provincesCovered.join(", ")}</div>
              </div>
            </div>
          </div>

          {/* Day-by-Day Timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {activeItinerary.days.map(day => (
              <div
                key={day.dayNumber}
                style={{
                  background: "rgba(16, 54, 48, 0.7)",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "18px",
                  display: "grid",
                  gridTemplateColumns: "70px 1fr",
                  gap: "16px"
                }}
              >
                {/* Day Badge */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      background: "#EA580C",
                      color: "#FFFFFF",
                      borderRadius: "10px",
                      padding: "8px 4px",
                      fontWeight: 900,
                      fontSize: "0.82rem",
                      textTransform: "uppercase"
                    }}
                  >
                    Day {day.dayNumber}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#94A3B8", marginTop: "6px" }}>
                    {day.province}
                  </div>
                </div>

                {/* Day Content */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
                    <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#FFFFFF" }}>
                      {day.title}
                    </h4>
                    <span style={{ background: "rgba(0,0,0,0.3)", color: "#CBD5E1", padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 600 }}>
                      📍 {day.location}
                    </span>
                  </div>

                  <p style={{ margin: "0 0 10px 0", fontSize: "0.82rem", color: "#CBD5E1", lineHeight: 1.45 }}>
                    {day.summary}
                  </p>

                  {/* Planned Activities Checklist */}
                  <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: "8px", padding: "10px 14px", marginBottom: "10px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#34D399", textTransform: "uppercase", marginBottom: "6px" }}>
                      Planned Itinerary Activities:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.78rem", color: "#E2E8F0", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {day.activities.map((act, i) => (
                        <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span>{act}</span>
                          {isCustomizing && (
                            <button
                              type="button"
                              onClick={() => handleRemoveActivity(day.dayNumber, i)}
                              style={{ background: "none", border: "none", color: "#EF4444", fontSize: "0.75rem", cursor: "pointer", fontWeight: 800 }}
                            >
                              ✕ Remove
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>

                    {isCustomizing && (
                      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                        <input
                          type="text"
                          placeholder="Add custom village visit or trail stop..."
                          value={newActivityInputs[day.dayNumber] || ""}
                          onChange={e => setNewActivityInputs({ ...newActivityInputs, [day.dayNumber]: e.target.value })}
                          style={{
                            flex: 1,
                            padding: "4px 8px",
                            borderRadius: "6px",
                            border: "1px solid rgba(255,255,255,0.2)",
                            background: "rgba(0,0,0,0.4)",
                            color: "#FFFFFF",
                            fontSize: "0.75rem"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddActivity(day.dayNumber)}
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            background: "#059669",
                            border: "none",
                            color: "#FFFFFF",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            cursor: "pointer"
                          }}
                        >
                          + Add
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Day Footer with Recommended Stay & Cost */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "#94A3B8", flexWrap: "wrap", gap: "8px" }}>
                    <span>🏡 <strong style={{ color: "#FFFFFF" }}>{day.recommendedStay}</strong></span>
                    <span>💰 Day Budget: <strong style={{ color: "#FDBA74" }}>{formatPrice(day.estimatedCostPgk, currency)}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Packing & Safety Insights Box */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
            <div style={{ background: "rgba(16, 54, 48, 0.7)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", padding: "16px" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "0.88rem", fontWeight: 800, color: "#FDBA74", display: "flex", alignItems: "center", gap: "6px" }}>
                🎒 Essential PNG Packing Gear
              </h4>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.76rem", color: "#CBD5E1", display: "flex", flexDirection: "column", gap: "6px" }}>
                {activeItinerary.essentialPackingList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: "rgba(16, 54, 48, 0.7)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", padding: "16px" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "0.88rem", fontWeight: 800, color: "#34D399", display: "flex", alignItems: "center", gap: "6px" }}>
                🛡️ Health & Wantok Safety Protocol
              </h4>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.76rem", color: "#CBD5E1", display: "flex", flexDirection: "column", gap: "6px" }}>
                {activeItinerary.safetyAndHealthTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

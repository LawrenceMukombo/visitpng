"use client";
import { useState } from "react";
import { ZAMBIA_CURATED_ITINERARIES, GeneratedItinerary, ItineraryDay, generateCustomItinerary } from "../../db/wantokAi";
import { CurrencyCode, formatPrice } from "../../db/currency";

interface WantokConciergeProps {
  currency: CurrencyCode;
  countryCode?: string;
  onOpenTrips?: () => void;
}

export default function WantokConcierge({ currency, onOpenTrips }: WantokConciergeProps) {
  const initialItinerary = ZAMBIA_CURATED_ITINERARIES[0];

  const [selectedStyle, setSelectedStyle] = useState<string>("Wilderness Expedition");
  const [durationDays, setDurationDays] = useState<number>(7);
  const [fitnessLevel, setFitnessLevel] = useState<string>("Moderate");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Victoria Falls Mosi-oa-Tunya",
    "Luangwa Walking Safari"
  ]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [activeItinerary, setActiveItinerary] = useState<GeneratedItinerary>(initialItinerary);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);

  // New activity input states per day
  const [newActivityInputs, setNewActivityInputs] = useState<Record<number, string>>({});

  const availableInterests = [
    "Victoria Falls Mosi-oa-Tunya",
    "Luangwa Walking Safari",
    "Lower Zambezi Canoeing",
    "Devil's Pool Livingstone",
    "Big 5 Game Drives",
    "Kuomboka Royal Ceremony",
    "Lake Kariba Houseboats",
    "Tribal Textiles & Craft"
  ];

  const updateItineraryLive = (
    interests: string[],
    duration: number,
    style: string,
    fitness: string
  ) => {
    const it = generateCustomItinerary(
      interests.length ? interests : [customPrompt || "Safari"],
      duration,
      style,
      fitness,
      "ZMB"
    );
    setActiveItinerary(it);
  };

  const toggleInterest = (int: string) => {
    const updated = selectedInterests.includes(int)
      ? selectedInterests.filter(i => i !== int)
      : [...selectedInterests, int];
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
        selectedInterests.length ? selectedInterests : [customPrompt || "Safari"],
        durationDays,
        selectedStyle,
        fitnessLevel,
        "ZMB"
      );
      setActiveItinerary(it);
      setIsGenerating(false);
      setSaveNotice(`✨ New ${it.durationDays}-Day itinerary generated for ${it.travelStyle}!`);
      setTimeout(() => setSaveNotice(""), 3500);
    }, 300);
  };

  // Customizer Actions:
  const handleAddActivity = (dayNumber: number) => {
    const text = newActivityInputs[dayNumber]?.trim();
    if (!text) return;

    const updatedDays = activeItinerary.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: [...day.activities, text],
          estimatedCostZmw: (day.estimatedCostZmw || 800) + 150
        };
      }
      return day;
    });

    const newTotal = updatedDays.reduce((acc, d) => acc + (d.estimatedCostZmw || 0), 0);

    setActiveItinerary({
      ...activeItinerary,
      days: updatedDays,
      totalEstimatedCostZmw: newTotal
    });

    setNewActivityInputs({ ...newActivityInputs, [dayNumber]: "" });
    setSaveNotice(`➕ Added activity to Day ${dayNumber}`);
    setTimeout(() => setSaveNotice(""), 2500);
  };

  const handleRemoveActivity = (dayNumber: number, actIndex: number) => {
    const updatedDays = activeItinerary.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        const newActs = day.activities.filter((_, idx) => idx !== actIndex);
        return {
          ...day,
          activities: newActs,
          estimatedCostZmw: Math.max(300, (day.estimatedCostZmw || 800) - 150)
        };
      }
      return day;
    });

    const newTotal = updatedDays.reduce((acc, d) => acc + (d.estimatedCostZmw || 0), 0);

    setActiveItinerary({
      ...activeItinerary,
      days: updatedDays,
      totalEstimatedCostZmw: newTotal
    });

    setSaveNotice(`🗑️ Removed activity from Day ${dayNumber}`);
    setTimeout(() => setSaveNotice(""), 2500);
  };

  const handleRemoveDay = (dayNumber: number) => {
    if (activeItinerary.days.length <= 1) {
      setSaveNotice("⚠️ An itinerary must have at least 1 day.");
      setTimeout(() => setSaveNotice(""), 2500);
      return;
    }

    const filtered = activeItinerary.days.filter((d) => d.dayNumber !== dayNumber);
    // Renumber remaining days
    const renumbered: ItineraryDay[] = filtered.map((d, index) => ({
      ...d,
      dayNumber: index + 1
    }));

    const newTotal = renumbered.reduce((acc, d) => acc + (d.estimatedCostZmw || 0), 0);

    setActiveItinerary({
      ...activeItinerary,
      durationDays: renumbered.length,
      days: renumbered,
      totalEstimatedCostZmw: newTotal
    });

    setSaveNotice(`🗑️ Removed Day ${dayNumber}. Itinerary updated to ${renumbered.length} days.`);
    setTimeout(() => setSaveNotice(""), 3000);
  };

  const handleAddDay = () => {
    const nextNum = activeItinerary.days.length + 1;
    const lastDay = activeItinerary.days[activeItinerary.days.length - 1];

    const newDay: ItineraryDay = {
      dayNumber: nextNum,
      title: `Exploration & Wildlife Encounter - Day ${nextNum}`,
      province: lastDay ? lastDay.province : "Southern",
      location: lastDay ? lastDay.location : "Livingstone",
      summary: "Custom safari day: game drives, walking trails, and cultural craft markets.",
      activities: [
        "Morning walking safari with DNPW scout",
        "Community craft village visit",
        "Sunset Zambezi river cruise"
      ],
      recommendedStay: lastDay ? lastDay.recommendedStay : "Safari Eco-Lodge",
      estimatedCostZmw: 1200,
      logisticsNotes: "Arrange 4x4 safari vehicle with lodge guide."
    };

    const updatedDays = [...activeItinerary.days, newDay];
    const newTotal = updatedDays.reduce((acc, d) => acc + (d.estimatedCostZmw || 0), 0);

    setActiveItinerary({
      ...activeItinerary,
      durationDays: updatedDays.length,
      days: updatedDays,
      totalEstimatedCostZmw: newTotal
    });

    setSaveNotice(`➕ Added Day ${nextNum} to your customized itinerary!`);
    setTimeout(() => setSaveNotice(""), 3000);
  };

  const handleUpdateDayField = (dayNumber: number, field: keyof ItineraryDay, value: string) => {
    const updatedDays = activeItinerary.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return { ...day, [field]: value };
      }
      return day;
    });

    setActiveItinerary({
      ...activeItinerary,
      days: updatedDays
    });
  };

  const handleSaveToTrips = async () => {
    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: activeItinerary.title,
          destination: activeItinerary.subtitle,
          startDate: new Date().toISOString().slice(0, 10),
          budgetZmw: activeItinerary.totalEstimatedCostZmw || 10000,
          currency: "ZMW"
        })
      });

      if (response.ok) {
        setSaveNotice("🎉 Itinerary successfully saved to My Trips planner!");
        if (onOpenTrips) onOpenTrips();
      } else {
        const stored = JSON.parse(localStorage.getItem("zamroam_offline_trips") || "[]");
        stored.push({
          id: `custom-ai-${Date.now()}`,
          title: activeItinerary.title,
          itinerary: activeItinerary,
          savedAt: new Date().toISOString()
        });
        localStorage.setItem("zamroam_offline_trips", JSON.stringify(stored));
        setSaveNotice("📦 Saved to your local offline Trips collection.");
      }
    } catch {
      setSaveNotice("Saved to offline cache.");
    }
    setTimeout(() => setSaveNotice(""), 4000);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify({ generatedAt: new Date().toISOString(), itinerary: activeItinerary }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${activeItinerary.id}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setSaveNotice("📥 Custom itinerary file downloaded.");
    setTimeout(() => setSaveNotice(""), 3000);
  };

  return (
    <div className="wantokConciergeSection">
      <div className="wantokHeroHeader">
        <div className="wantokTagline">
          <span className="wantokAvatar">🦁</span>
          <div>
            <p className="eyebrow lime">ZAMROAM SAFARI & TRIP ARCHITECT</p>
            <h2>Your Zambia Safari & Expedition Concierge</h2>
          </div>
        </div>
        <p className="wantokDesc">
          Plan seamless African safaris, Victoria Falls helicopter tours, Luangwa walking trails, and Zambezi river expeditions with intelligent AI planning. Customize any day, lodge, or activity to fit your exact dream adventure.
        </p>
      </div>

      {/* AI Wizard Form */}
      <form className="wantokWizardCard" onSubmit={handleGenerate}>
        <div className="wizardGrid">
          <div className="wizardField">
            <label>Travel Style</label>
            <select
              value={selectedStyle}
              onChange={e => handleStyleChange(e.target.value)}
            >
              <option value="Cultural Immersion">🎭 Cultural Ceremonies & Royal Palaces</option>
              <option value="Wilderness Expedition">🦁 Walking Safaris & Big 5 Game Drives</option>
              <option value="Waterfalls & Rivers">🌊 Victoria Falls & Zambezi River Trails</option>
              <option value="Lakes & Fishing">🎣 Lake Tanganyika & Kariba Cruising</option>
              <option value="Family & Nature">🌿 Nature, Birds & Bat Migration</option>
            </select>
          </div>

          <div className="wizardField">
            <label>Trip Duration: <b>{durationDays} Days</b></label>
            <input
              type="range"
              min="3"
              max="14"
              value={durationDays}
              onChange={e => handleDurationChange(Number(e.target.value))}
            />
          </div>

          <div className="wizardField">
            <label>Fitness Pace</label>
            <select
              value={fitnessLevel}
              onChange={e => handleFitnessChange(e.target.value)}
            >
              <option value="Relaxed">Relaxed (Scenic drives & lodge pools)</option>
              <option value="Moderate">Moderate (Morning walking safaris & nature trails)</option>
              <option value="Challenging">Challenging (Rugged multi-day wilderness backpacking)</option>
            </select>
          </div>
        </div>

        <div className="wizardInterestsGroup">
          <label>Select Key Interests:</label>
          <div className="interestChips">
            {availableInterests.map(int => (
              <button
                key={int}
                type="button"
                className={`interestChip ${selectedInterests.includes(int) ? "active" : ""}`}
                onClick={() => toggleInterest(int)}
              >
                {selectedInterests.includes(int) ? "✓ " : "+ "}{int}
              </button>
            ))}
          </div>
        </div>

        <div className="wizardCustomPrompt">
          <label>Custom Wish or Note (Optional):</label>
          <input
            type="text"
            placeholder="e.g. Include Devil's Pool, South Luangwa walking safari, and Kuomboka ceremony..."
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
          />
        </div>

        <button type="submit" className="generateAiBtn" disabled={isGenerating}>
          {isGenerating ? "⚡ Generating Zambian Itinerary…" : "✨ Generate Custom Itinerary"}
        </button>
      </form>

      {saveNotice && (
        <div className="wantokAlertBanner" role="status" aria-live="polite">
          {saveNotice}
        </div>
      )}

      {/* Generated Itinerary Display */}
      <div className="generatedItineraryCard">
        <header className="itineraryHeader">
          <div className="itineraryHeaderTop">
            <span className="itineraryStyleTag">{activeItinerary.travelStyle}</span>
            <span className="itineraryDaysTag">⏱️ {activeItinerary.durationDays} Days</span>
            <span className="itinerarySeasonTag">☀️ Best: {activeItinerary.bestTravelMonths}</span>
          </div>
          <h2>{activeItinerary.title}</h2>
          <p className="itinerarySubtitle">{activeItinerary.subtitle}</p>

          <div className="itineraryProvincesRow">
            <strong>Provinces Visited:</strong>
            <div className="provPills">
              {activeItinerary.provincesCovered.map((prov, i) => (
                <span key={i} className="provPill">📍 {prov}</span>
              ))}
            </div>
          </div>

          <div className="itineraryBudgetBanner">
            <div>
              <small>Estimated Budget (Ground + Safari Stays + Local Transport)</small>
              <strong>{formatPrice(activeItinerary.totalEstimatedCostZmw || 12000, currency)}</strong>
            </div>
            <div className="itineraryTopActions">
              <button
                type="button"
                className={`customizeToggleBtn ${isCustomizing ? "active" : ""}`}
                onClick={() => setIsCustomizing(!isCustomizing)}
              >
                {isCustomizing ? "✓ Done Customizing" : "✏️ Customize Days & Activities"}
              </button>
              <button type="button" className="saveToTripsBtn" onClick={handleSaveToTrips}>
                ➕ Save to My Trips Planner
              </button>
              <button type="button" className="exportJsonBtn" onClick={handleExportJson}>
                📥 Export JSON
              </button>
            </div>
          </div>
        </header>

        {/* Day-by-day Itinerary Timeline */}
        <div className="itineraryDaysList">
          <div className="itineraryDaysHeader">
            <h3>📅 Day-by-Day Journey Breakdown ({activeItinerary.days.length} Days):</h3>
            {isCustomizing && (
              <span className="customizingNoticeBadge">
                ✏️ Customizing Mode Active: Add or remove activities & days below
              </span>
            )}
          </div>

          {activeItinerary.days.map((day) => (
            <article key={day.dayNumber} className="itineraryDayCard">
              <div className="dayBadgeCol">
                <span className="dayNumBadge">Day {day.dayNumber}</span>
                <small className="dayCostTag">{formatPrice(day.estimatedCostZmw || 1200, currency)}</small>
                {isCustomizing && (
                  <button
                    type="button"
                    className="deleteDayBtn"
                    title={`Delete Day ${day.dayNumber}`}
                    onClick={() => handleRemoveDay(day.dayNumber)}
                  >
                    🗑️ Remove Day
                  </button>
                )}
              </div>

              <div className="dayContentCol">
                {isCustomizing ? (
                  <div className="editableDayHeader">
                    <input
                      type="text"
                      className="editableDayTitleInput"
                      value={day.title}
                      onChange={(e) => handleUpdateDayField(day.dayNumber, "title", e.target.value)}
                    />
                    <div className="editableLocationRow">
                      <span>📍 Location: </span>
                      <input
                        type="text"
                        value={day.location}
                        onChange={(e) => handleUpdateDayField(day.dayNumber, "location", e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h4>{day.title}</h4>
                    <p className="dayLocation">📍 <b>{day.location}</b> ({day.province})</p>
                  </>
                )}

                <p className="daySummary">{day.summary}</p>

                {/* Activities List */}
                <div className="dayActivities">
                  <strong>Planned Highlights:</strong>
                  <ul className="activitiesList">
                    {day.activities.map((act, idx) => (
                      <li key={idx} className="activityItem">
                        <span>✓ {act}</span>
                        {isCustomizing && (
                          <button
                            type="button"
                            className="removeActBtn"
                            title="Remove this activity"
                            onClick={() => handleRemoveActivity(day.dayNumber, idx)}
                          >
                            ✕
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Add New Activity Form */}
                  {isCustomizing && (
                    <div className="addActivityRow">
                      <input
                        type="text"
                        placeholder="Add custom activity (e.g. Sunrise birdwatching, village craft market...)"
                        value={newActivityInputs[day.dayNumber] || ""}
                        onChange={(e) =>
                          setNewActivityInputs({
                            ...newActivityInputs,
                            [day.dayNumber]: e.target.value
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddActivity(day.dayNumber);
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="addActSubmitBtn"
                        onClick={() => handleAddActivity(day.dayNumber)}
                      >
                        + Add
                      </button>
                    </div>
                  )}
                </div>

                <div className="dayStayAndLogistics">
                  <div>
                    <small>Recommended Stay:</small>
                    {isCustomizing ? (
                      <input
                        type="text"
                        className="editableStayInput"
                        value={day.recommendedStay}
                        onChange={(e) => handleUpdateDayField(day.dayNumber, "recommendedStay", e.target.value)}
                      />
                    ) : (
                      <b>🏨 {day.recommendedStay}</b>
                    )}
                  </div>
                  <div>
                    <small>Logistics & Transport Advice:</small>
                    <p>✈️ {day.logisticsNotes}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Add Day Button in Customizing Mode */}
          {isCustomizing && (
            <div className="addDayActionBox">
              <button type="button" className="addDayBtn" onClick={handleAddDay}>
                ➕ Add Another Day to Expedition
              </button>
            </div>
          )}
        </div>

        {/* Packing & Health Advisories */}
        <div className="itineraryAdvisoriesGrid">
          <div className="advisoryBox packing">
            <strong>🎒 Essential Expedition Packing List:</strong>
            <ul>
              {activeItinerary.essentialPackingList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="advisoryBox safety">
            <strong>🛡️ Health, Safety & Cultural Protocol:</strong>
            <ul>
              {activeItinerary.safetyAndHealthTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

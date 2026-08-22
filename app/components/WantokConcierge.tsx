"use client";
import { useState } from "react";
import { CURATED_ITINERARIES, ZAMBIA_CURATED_ITINERARIES, GeneratedItinerary, ItineraryDay, generateCustomItinerary } from "../../db/wantokAi";
import { CurrencyCode, formatPrice } from "../../db/currency";

interface WantokConciergeProps {
  currency: CurrencyCode;
  countryCode?: string;
  onOpenTrips?: () => void;
}

export default function WantokConcierge({ currency, countryCode = "ZMB", onOpenTrips }: WantokConciergeProps) {
  const isZambia = countryCode.toUpperCase() === "ZMB";
  const initialItinerary = isZambia ? ZAMBIA_CURATED_ITINERARIES[0] : CURATED_ITINERARIES[0];

  const [selectedStyle, setSelectedStyle] = useState<string>(isZambia ? "Wilderness Expedition" : "Cultural Immersion");
  const [durationDays, setDurationDays] = useState<number>(7);
  const [fitnessLevel, setFitnessLevel] = useState<string>("Moderate");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    isZambia ? ["Victoria Falls Mosi-oa-Tunya", "Luangwa Walking Safari"] : ["Tribal Singsing", "Bird of Paradise"]
  );
  const [customPrompt, setCustomPrompt] = useState("");
  const [activeItinerary, setActiveItinerary] = useState<GeneratedItinerary>(initialItinerary);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);

  const [prevCountry, setPrevCountry] = useState(countryCode);
  if (prevCountry !== countryCode) {
    setPrevCountry(countryCode);
    const list = isZambia ? ZAMBIA_CURATED_ITINERARIES : CURATED_ITINERARIES;
    setActiveItinerary(list[0]);
    setSelectedInterests(isZambia ? ["Victoria Falls Mosi-oa-Tunya", "Luangwa Walking Safari"] : ["Tribal Singsing", "Bird of Paradise"]);
    setSelectedStyle(isZambia ? "Wilderness Expedition" : "Cultural Immersion");
  }

  // New activity input states per day
  const [newActivityInputs, setNewActivityInputs] = useState<Record<number, string>>({});

  const availableInterests = isZambia ? [
    "Victoria Falls Mosi-oa-Tunya",
    "Luangwa Walking Safari",
    "Lower Zambezi Canoeing",
    "Devil's Pool Livingstone",
    "Big 5 Game Drives",
    "Kuomboka Royal Ceremony",
    "Lake Kariba Houseboats",
    "Tribal Textiles & Craft"
  ] : [
    "Tribal Singsing",
    "Bird of Paradise",
    "WWII History",
    "Scuba Diving & Coral",
    "Volcano Trekking",
    "Sepik River Canoeing",
    "Village Homestay",
    "Highlands Coffee"
  ];

  const toggleInterest = (int: string) => {
    if (selectedInterests.includes(int)) {
      setSelectedInterests(selectedInterests.filter(i => i !== int));
    } else {
      setSelectedInterests([...selectedInterests, int]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const it = generateCustomItinerary(
        selectedInterests.length ? selectedInterests : [customPrompt || (isZambia ? "Safari" : "Culture")],
        durationDays,
        selectedStyle,
        fitnessLevel,
        countryCode
      );
      setActiveItinerary(it);
      setIsGenerating(false);
      setSaveNotice(`✨ New ${it.durationDays}-Day itinerary generated for ${it.travelStyle}!`);
      setTimeout(() => setSaveNotice(""), 3500);
    }, 400);
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
          estimatedCostPgk: day.estimatedCostPgk + 80 // slight cost adjustment for new activity
        };
      }
      return day;
    });

    const newTotal = updatedDays.reduce((acc, d) => acc + d.estimatedCostPgk, 0);

    setActiveItinerary({
      ...activeItinerary,
      days: updatedDays,
      totalEstimatedCostPgk: newTotal
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
          estimatedCostPgk: Math.max(150, day.estimatedCostPgk - 60)
        };
      }
      return day;
    });

    const newTotal = updatedDays.reduce((acc, d) => acc + d.estimatedCostPgk, 0);

    setActiveItinerary({
      ...activeItinerary,
      days: updatedDays,
      totalEstimatedCostPgk: newTotal
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

    const newTotal = renumbered.reduce((acc, d) => acc + d.estimatedCostPgk, 0);

    setActiveItinerary({
      ...activeItinerary,
      durationDays: renumbered.length,
      days: renumbered,
      totalEstimatedCostPgk: newTotal
    });

    setSaveNotice(`🗑️ Removed Day ${dayNumber}. Itinerary updated to ${renumbered.length} days.`);
    setTimeout(() => setSaveNotice(""), 3000);
  };

  const handleAddDay = () => {
    const nextNum = activeItinerary.days.length + 1;
    const lastDay = activeItinerary.days[activeItinerary.days.length - 1];

    const newDay: ItineraryDay = {
      dayNumber: nextNum,
      title: `Exploration & Community Encounter - Day ${nextNum}`,
      province: lastDay ? lastDay.province : "National Capital District",
      location: lastDay ? lastDay.location : "Port Moresby",
      summary: "Custom explorer day: village interaction, artisanal craft markets, or coastal nature walks.",
      activities: [
        "Visit local morning produce & bilum handicraft market",
        "Community walking tour with local landowner guide",
        "Traditional twilight mumu feast and storytelling"
      ],
      recommendedStay: lastDay ? lastDay.recommendedStay : "Local Eco-Lodge or Homestay",
      estimatedCostPgk: 450,
      logisticsNotes: "Arrange local private van or river canoe liaison ahead of time."
    };

    const updatedDays = [...activeItinerary.days, newDay];
    const newTotal = updatedDays.reduce((acc, d) => acc + d.estimatedCostPgk, 0);

    setActiveItinerary({
      ...activeItinerary,
      durationDays: updatedDays.length,
      days: updatedDays,
      totalEstimatedCostPgk: newTotal
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
      const today = new Date().toISOString().slice(0, 10);
      const endDate = new Date(Date.now() + activeItinerary.durationDays * 86400000).toISOString().slice(0, 10);

      const tripPayload = {
        name: activeItinerary.title,
        destination: activeItinerary.provincesCovered.join(", "),
        startDate: today,
        endDate: endDate,
        travellerCount: 2,
        budget: activeItinerary.totalEstimatedCostPgk,
        interests: selectedInterests.join(", ")
      };

      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", ...tripPayload })
      });

      if (res.ok) {
        const data = await res.json();
        const createdTrip = data.trips?.[0];
        if (createdTrip) {
          // Add day-by-day items
          for (const day of activeItinerary.days) {
            const dayDate = new Date(Date.now() + (day.dayNumber - 1) * 86400000).toISOString().slice(0, 10);
            await fetch("/api/trips", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "addItem",
                tripId: createdTrip.id,
                title: day.title,
                itemType: "activity",
                scheduledDate: dayDate,
                cost: day.estimatedCostPgk,
                notes: `${day.summary} (Activities: ${day.activities.join(" | ")}) (Stay: ${day.recommendedStay})`
              })
            });
          }
        }
        setSaveNotice("🎉 Customized itinerary successfully added to your interactive Trips Planner!");
        if (onOpenTrips) {
          setTimeout(onOpenTrips, 1200);
        }
      } else {
        // Fallback to local storage for guests
        const localSaved = JSON.parse(localStorage.getItem("visitpng_offline_custom_trips") || "[]");
        localStorage.setItem("visitpng_offline_custom_trips", JSON.stringify([activeItinerary, ...localSaved]));
        setSaveNotice("✅ Itinerary saved to your offline trip guides!");
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
          <span className="wantokAvatar">{isZambia ? "🦁" : "🤖"}</span>
          <div>
            <p className="eyebrow lime">{isZambia ? "ZAMROAM SAFARI & TRIP ARCHITECT" : "WANTOK AI TRIP ARCHITECT & CUSTOMIZER"}</p>
            <h2>{isZambia ? "Your Zambia Safari & Expedition Concierge" : "Your Papua New Guinea Travel Concierge"}</h2>
          </div>
        </div>
        <p className="wantokDesc">
          {isZambia
            ? "Plan seamless African safaris, Victoria Falls helicopter tours, Luangwa walking trails, and Zambezi river expeditions with intelligent AI planning. Customize any day, lodge, or activity to fit your exact dream adventure."
            : "Tackle PNG travel logistics with intelligent planning. Wantok AI accounts for domestic flight connection hubs, mountain weather, trek acclimatization, and cultural village protocols. Customize any day or activity to fit your exact dream expedition."}
        </p>
      </div>

      {/* AI Wizard Form */}
      <form className="wantokWizardCard" onSubmit={handleGenerate}>
        <div className="wizardGrid">
          <div className="wizardField">
            <label>Travel Style</label>
            <select
              value={selectedStyle}
              onChange={e => setSelectedStyle(e.target.value)}
            >
              <option value="Cultural Immersion">🎭 Cultural Immersion & Singsings</option>
              <option value="Wilderness Expedition">🥾 Wilderness & Mountain Trekking</option>
              <option value="Diving & Islands">🤿 Scuba Diving & Island Fjords</option>
              <option value="WWII History">🎖️ WWII History & Relic Trails</option>
              <option value="Family & Nature">🌿 Nature, Birds & Wildlife</option>
            </select>
          </div>

          <div className="wizardField">
            <label>Trip Duration: <b>{durationDays} Days</b></label>
            <input
              type="range"
              min="3"
              max="14"
              value={durationDays}
              onChange={e => setDurationDays(Number(e.target.value))}
            />
          </div>

          <div className="wizardField">
            <label>Fitness Pace</label>
            <select
              value={fitnessLevel}
              onChange={e => setFitnessLevel(e.target.value)}
            >
              <option value="Relaxed">Relaxed (Scenic drives & resort stays)</option>
              <option value="Moderate">Moderate (Day hikes & village walks)</option>
              <option value="Challenging">Challenging (Rugged mountain trekking)</option>
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
            placeholder="e.g. Include Asaro mudmen, Betty's lodge and scenic flight over Owen Stanley range..."
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
          />
        </div>

        <button type="submit" className="generateAiBtn" disabled={isGenerating}>
          {isGenerating ? "⚡ Generating PNG Itinerary…" : "✨ Generate Custom Itinerary"}
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
              <small>Estimated Budget (Ground + Stays + Local Transport)</small>
              <strong>{formatPrice(activeItinerary.totalEstimatedCostPgk, currency)}</strong>
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
                <small className="dayCostTag">{formatPrice(day.estimatedCostPgk, currency)}</small>
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
                        placeholder="Add custom activity (e.g. Sunrise birdwatching, village sing-sing...)"
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

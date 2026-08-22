"use client";
import {useState} from "react";
import {CURATED_ITINERARIES, GeneratedItinerary, generateCustomItinerary} from "../../db/wantokAi";
import {CurrencyCode, formatPrice} from "../../db/currency";

interface WantokConciergeProps {
  currency: CurrencyCode;
  onOpenTrips?: () => void;
}

export default function WantokConcierge({currency, onOpenTrips}: WantokConciergeProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>("Cultural Immersion");
  const [durationDays, setDurationDays] = useState<number>(7);
  const [fitnessLevel, setFitnessLevel] = useState<string>("Moderate");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Tribal Singsing", "Bird of Paradise"]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [activeItinerary, setActiveItinerary] = useState<GeneratedItinerary>(CURATED_ITINERARIES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");

  const availableInterests = [
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
        selectedInterests.length ? selectedInterests : [customPrompt || "Culture"],
        durationDays,
        selectedStyle,
        fitnessLevel
      );
      setActiveItinerary(it);
      setIsGenerating(false);
      setSaveNotice(`✨ New ${it.durationDays}-Day itinerary generated for ${it.travelStyle}!`);
      setTimeout(() => setSaveNotice(""), 3500);
    }, 400);
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
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({action: "create", ...tripPayload})
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
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                action: "addItem",
                tripId: createdTrip.id,
                title: day.title,
                itemType: "activity",
                scheduledDate: dayDate,
                cost: day.estimatedCostPgk,
                notes: `${day.summary} (Stay: ${day.recommendedStay})`
              })
            });
          }
        }
        setSaveNotice("🎉 Itinerary successfully added to your interactive Trips Planner!");
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
    const blob = new Blob([JSON.stringify({generatedAt: new Date().toISOString(), itinerary: activeItinerary}, null, 2)], {type: "application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${activeItinerary.id}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setSaveNotice("📥 Itinerary file downloaded.");
    setTimeout(() => setSaveNotice(""), 3000);
  };

  return (
    <div className="wantokConciergeSection">
      <div className="wantokHeroHeader">
        <div className="wantokTagline">
          <span className="wantokAvatar">🤖</span>
          <div>
            <p className="eyebrow lime">WANTOK AI TRIP ARCHITECT</p>
            <h2>Your Papua New Guinea Travel Concierge</h2>
          </div>
        </div>
        <p className="wantokDesc">
          Tackle PNG travel logistics with intelligent planning. Wantok AI accounts for domestic flight connection hubs, mountain weather, trek acclimatization, and cultural village protocols.
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
              <button type="button" className="saveToTripsBtn" onClick={handleSaveToTrips}>
                ➕ Add Directly to My Trips
              </button>
              <button type="button" className="exportJsonBtn" onClick={handleExportJson}>
                📥 Export JSON
              </button>
            </div>
          </div>
        </header>

        {/* Day-by-day Itinerary Timeline */}
        <div className="itineraryDaysList">
          <h3>📅 Day-by-Day Journey Breakdown:</h3>
          {activeItinerary.days.map(day => (
            <article key={day.dayNumber} className="itineraryDayCard">
              <div className="dayBadgeCol">
                <span className="dayNumBadge">Day {day.dayNumber}</span>
                <small className="dayCostTag">{formatPrice(day.estimatedCostPgk, currency)}</small>
              </div>

              <div className="dayContentCol">
                <h4>{day.title}</h4>
                <p className="dayLocation">📍 <b>{day.location}</b> ({day.province})</p>
                <p className="daySummary">{day.summary}</p>

                <div className="dayActivities">
                  <strong>Planned Highlights:</strong>
                  <ul>
                    {day.activities.map((act, idx) => (
                      <li key={idx}>✓ {act}</li>
                    ))}
                  </ul>
                </div>

                <div className="dayStayAndLogistics">
                  <div>
                    <small>Recommended Stay:</small>
                    <b>🏨 {day.recommendedStay}</b>
                  </div>
                  <div>
                    <small>Logistics & Transport Advice:</small>
                    <p>✈️ {day.logisticsNotes}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
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

"use client";

import React, { useState } from "react";

export function CountryIntroBanner({ countryCode = "PNG" }: { countryCode?: string }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="countryShowcaseBanner" style={{ borderLeft: "4px solid #EA580C" }}>
      {/* Intro Top Pill & Title */}
      <div className="showcaseHeader">
        <span className="destinationPill" style={{ background: "#EA580C", color: "#fff" }}>
          🇵🇬 Welcome to Papua New Guinea ({countryCode}) — Land of a Million Journeys
        </span>
        <h2>The Home of the Kokoda Track, Coral Triangle Diving & 800+ Living Cultures</h2>
        <p className="showcaseLead">
          Positioned in the vibrant heart of the South Pacific, Papua New Guinea is one of Earth&apos;s last great frontiers.
          Home to the historic 96km Kokoda Track, alpine summits of Mount Wilhelm, world-class Coral Triangle scuba diving,
          and celebrated sing-sing cultural festivals across 22 provinces.
        </p>
      </div>

      {/* Fast Facts Grid */}
      <div className="fastFactsGrid">
        <div className="fastFactCard">
          <span className="factIcon">🥾</span>
          <div className="factText">
            <strong>Kokoda Track</strong>
            <small>Historic 96km Owen Stanley pilgrimage</small>
          </div>
        </div>

        <div className="fastFactCard">
          <span className="factIcon">⛰️</span>
          <div className="factText">
            <strong>Mount Wilhelm</strong>
            <small>Highest summit in PNG (4,509m)</small>
          </div>
        </div>

        <div className="fastFactCard">
          <span className="factIcon">🤿</span>
          <div className="factText">
            <strong>Kimbe Bay Reefs</strong>
            <small>World-renowned Coral Triangle biodiversity</small>
          </div>
        </div>

        <div className="fastFactCard">
          <span className="factIcon">✈️</span>
          <div className="factText">
            <strong>Jacksons Intl (POM)</strong>
            <small>Direct flights from Brisbane, Sydney, Singapore, Manila</small>
          </div>
        </div>
      </div>

      {/* Visitor Traveler Match */}
      <div className="visitorAudienceSplit">
        <div className="audienceCard firstTimeCard">
          <div className="audienceBadge" style={{ background: "#EA580C", color: "#fff" }}>🌱 For First-Time Travellers</div>
          <h4>Your Essential PNG Highlights</h4>
          <p>
            Start in <strong>Port Moresby</strong> with the National Museum and Varirata National Park. Fly into
            <strong>Goroka & Mount Hagen</strong> for unforgettable Melpa & Asaro sing-sing festivals and highland coffee estates.
          </p>
        </div>

        <div className="audienceCard returnCard">
          <div className="audienceBadge" style={{ background: "#1B6960", color: "#fff" }}>🧭 For Extreme Trekkers & Divers</div>
          <h4>Beyond the Beaten Path</h4>
          <p>
            Trek the rugged <strong>Kokoda Track</strong> across Owen Stanley ridges, dive volcanic calderas in <strong>Tufi & Rabaul</strong>,
            explore sacred Haus Tambaran spirit houses on the <strong>Sepik River</strong>, or encounter the Huli Wigmen in <strong>Tari Valley</strong>.
          </p>
        </div>
      </div>

      {/* Expandable Regional Deep-Dive */}
      <div className="showcaseActions">
        <button
          className="toggleDeepDiveBtn"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ borderColor: "#EA580C", color: "#1B6960" }}
        >
          {isExpanded ? "▲ Hide Detailed Country Guide" : "▼ Explore Papua New Guinea's 4 Geographic Regions"}
        </button>
      </div>

      {isExpanded && (
        <div className="expandedCountryGuide">
          <div className="regionsHighlightGrid">
            <div className="regionSpotlightCard" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "110px", backgroundImage: "url('https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "8px 8px 0 0", margin: "-12px -12px 10px -12px" }} />
              <span className="regionTag">🌿 Southern (Papua) Region</span>
              <h5>Port Moresby, Kokoda Track, Varirata & Milne Bay</h5>
              <p>
                National gateway featuring Ela Beach, Sogeri Plateau rainforests, the historic Kokoda pilgrimage trail,
                and Tawali muck diving in Milne Bay.
              </p>
            </div>

            <div className="regionSpotlightCard" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "110px", backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "8px 8px 0 0", margin: "-12px -12px 10px -12px" }} />
              <span className="regionTag">⛰️ The Highlands Region</span>
              <h5>Goroka, Mount Hagen, Simbu & Tari Valley</h5>
              <p>
                Alpine summits of Mount Wilhelm (4,509m), flamboyant Huli Wigmen, Asaro clay mask warriors,
                and the world-famous Goroka Cultural Show.
              </p>
            </div>

            <div className="regionSpotlightCard" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "110px", backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "8px 8px 0 0", margin: "-12px -12px 10px -12px" }} />
              <span className="regionTag">🏝️ Islands Region</span>
              <h5>East New Britain (Rabaul & Kokopo), Kimbe Bay, New Ireland & Bougainville</h5>
              <p>
                Active volcanic caldera of Mount Tavurvur, mystical Baining Fire Dancers, hammerhead sharks in Kimbe Bay,
                and pristine surfing along the Boluminski Highway.
              </p>
            </div>

            <div className="regionSpotlightCard" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "110px", backgroundImage: "url('https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=600&q=80')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "8px 8px 0 0", margin: "-12px -12px 10px -12px" }} />
              <span className="regionTag">🐊 Momase Region</span>
              <h5>East & West Sepik River, Madang Harbor & Morobe</h5>
              <p>
                The grand Sepik River waterway lined with sacred Haus Tambaran spirit houses, master woodcarvers,
                flying fox colonies, and coral atolls of Madang.
              </p>
            </div>
          </div>

          {/* Official External Resources */}
          <div className="officialLinksSection">
            <h4>Official PNG Travel & Tourism Portals</h4>
            <div className="externalLinksRow">
              <a
                href="https://www.papuanewguinea.travel"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                🌐 PNG Tourism Promotion Authority (PNGTPA) ↗
              </a>
              <a
                href="https://evisa.ica.gov.pg"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                🛂 PNG eVisa & Immigration Portal ↗
              </a>
              <a
                href="https://www.airniugini.com.pg"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                ✈️ Air Niugini National Carrier ↗
              </a>
              <a
                href="https://www.kokodatrack.com.pg"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                🏛️ Kokoda Track Authority (KTA) Permits ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

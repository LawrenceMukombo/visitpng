"use client";

import React, { useState } from "react";

export function CountryIntroBanner() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="countryShowcaseBanner">
      {/* Intro Top Pill & Title */}
      <div className="showcaseHeader">
        <span className="destinationPill">🌴 Welcome to Papua New Guinea</span>
        <h2>The Land of a Million Journeys & 800+ Living Cultures</h2>
        <p className="showcaseLead">
          Positioned just south of the equator, Papua New Guinea is one of the last true frontiers on Earth.
          Where snow-capped mountain peaks give way to ancient cloud forests, and wild crocodile rivers meet
          the world&apos;s richest coral reefs—PNG offers an extraordinary voyage for curious adventurers.
        </p>
      </div>

      {/* Fast Facts Grid */}
      <div className="fastFactsGrid">
        <div className="fastFactCard">
          <span className="factIcon">🗣️</span>
          <div className="factText">
            <strong>850+ Languages</strong>
            <small>Most linguistically diverse nation</small>
          </div>
        </div>

        <div className="fastFactCard">
          <span className="factIcon">🦜</span>
          <div className="factText">
            <strong>38 Bird of Paradise Species</strong>
            <small>Home to the world&apos;s rarest avifauna</small>
          </div>
        </div>

        <div className="fastFactCard">
          <span className="factIcon">🤿</span>
          <div className="factText">
            <strong>Coral Triangle Epicenter</strong>
            <small>World-class diving & volcanic fjords</small>
          </div>
        </div>

        <div className="fastFactCard">
          <span className="factIcon">✈️</span>
          <div className="factText">
            <strong>Jackson&apos;s Int&apos;l (POM)</strong>
            <small>Direct flights from AU, SG, HK, PH, FJ</small>
          </div>
        </div>
      </div>

      {/* Visitor Traveler Match */}
      <div className="visitorAudienceSplit">
        <div className="audienceCard firstTimeCard">
          <div className="audienceBadge">🌱 For First-Time Adventurers</div>
          <h4>Your First PNG Expedition</h4>
          <p>
            Start with the vibrant cultural shows of <strong>Goroka & Mount Hagen</strong>, snorkel the tranquil
            crystal fjords of <strong>Tufi</strong>, or explore Port Moresby&apos;s world-class National Museum and
            Nature Park. Always travel with certified local Wantok guides for effortless transfers and authentic village welcomes.
          </p>
        </div>

        <div className="audienceCard returnCard">
          <div className="audienceBadge">🧭 For Seasoned Explorers</div>
          <h4>Going Beyond the Beaten Track</h4>
          <p>
            Venture up the mighty <strong>Sepik River</strong> in dugout canoes to see sacred Spirit Houses (Haus Tambaran),
            scale Oceania&apos;s highest peak at <strong>Mount Wilhelm (4,509m)</strong>, dive pristine WWII aircraft wrecks in
            <strong>Rabaul & Kimbe Bay</strong>, or trek the historic 96km <strong>Kokoda Track</strong>.
          </p>
        </div>
      </div>

      {/* Expandable Regional Deep-Dive */}
      <div className="showcaseActions">
        <button
          className="toggleDeepDiveBtn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "▲ Hide Detailed Country Guide" : "▼ Explore PNG&apos;s 4 Unique Geographic Regions & Official Portals"}
        </button>
      </div>

      {isExpanded && (
        <div className="expandedCountryGuide">
          <div className="regionsHighlightGrid">
            <div className="regionSpotlightCard">
              <span className="regionTag">🏔️ The Highlands Spine</span>
              <h5>Eastern, Western, Simbu & Southern Highlands</h5>
              <p>
                A high mountain realm of fertile valleys, world-class Arabica coffee, sacred bird sanctuaries,
                and vivid tribal sing-sings including the iconic Asaro Mudmen and Huli Wigmen.
              </p>
            </div>

            <div className="regionSpotlightCard">
              <span className="regionTag">🛶 The Momase & Sepik Basin</span>
              <h5>East & West Sepik, Madang, Morobe</h5>
              <p>
                The cultural heartbeat of Melanesian art, famous for elaborate woodcarvings, crocodile initiation
                ceremonies, freshwater river deltas, and tranquil coastline harbors.
              </p>
            </div>

            <div className="regionSpotlightCard">
              <span className="regionTag">🌋 The Bismarck & Solomon Islands</span>
              <h5>East & West New Britain, New Ireland, Manus, Bougainville</h5>
              <p>
                Smoking volcanoes overlooking turquoise lagoons, Duke of York spinner dolphins, world-class pelagic
                shark diving in Kimbe Bay, and the sacred Baining Fire Dances of Rabaul.
              </p>
            </div>

            <div className="regionSpotlightCard">
              <span className="regionTag">🏝️ The Southern Coral Seas</span>
              <h5>Milne Bay, Oro (Tufi Fjords), Central & National Capital</h5>
              <p>
                Ancient Kula Ring trading routes, breathtaking volcanic sea-fjords, untouched coral atolls,
                manta ray cleaning stations, and historic WWII battlegrounds.
              </p>
            </div>
          </div>

          {/* Official External Resources */}
          <div className="officialLinksSection">
            <h4>Official Travel & Tourism Portals</h4>
            <div className="externalLinksRow">
              <a
                href="https://www.papuanewguinea.travel"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                🌐 PNG Tourism Promotion Authority (Official TPA) ↗
              </a>
              <a
                href="https://www.ica.gov.pg/evisa"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                🛂 PNG Immigration & eVisa Portal ↗
              </a>
              <a
                href="https://www.airniugini.com.pg"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                ✈️ Air Niugini Domestic Network ↗
              </a>
              <a
                href="https://www.pngtourism.org.pg"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                🏛️ PNG National Cultural Commission ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

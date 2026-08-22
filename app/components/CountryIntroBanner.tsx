"use client";

import React, { useState } from "react";

export function CountryIntroBanner({ countryCode = "ZMB" }: { countryCode?: string }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="countryShowcaseBanner" style={{ borderLeft: "4px solid #DE7739" }}>
      {/* Intro Top Pill & Title */}
      <div className="showcaseHeader">
        <span className="destinationPill" style={{ background: "#DE7739", color: "#fff" }}>
          🦁 Welcome to Zambia — The Real Africa
        </span>
        <h2>The Home of Victoria Falls & Legendary Walking Safaris</h2>
        <p className="showcaseLead">
          Positioned in the warm heart of Southern Africa, Zambia is one of the world&apos;s premier safari destinations.
          Home to the majestic Victoria Falls (Mosi-oa-Tunya), the wildlife-rich Luangwa Valley, peaceful Zambezi waterways,
          and legendary African hospitality across 10 peaceful provinces.
        </p>
      </div>

      {/* Fast Facts Grid */}
      <div className="fastFactsGrid">
        <div className="fastFactCard">
          <span className="factIcon">🌊</span>
          <div className="factText">
            <strong>Victoria Falls</strong>
            <small>Mosi-oa-Tunya World Wonder</small>
          </div>
        </div>

        <div className="fastFactCard">
          <span className="factIcon">🦁</span>
          <div className="factText">
            <strong>South Luangwa</strong>
            <small>Birthplace of walking safaris</small>
          </div>
        </div>

        <div className="fastFactCard">
          <span className="factIcon">🛶</span>
          <div className="factText">
            <strong>Lower Zambezi</strong>
            <small>World-class river & canoe trails</small>
          </div>
        </div>

        <div className="fastFactCard">
          <span className="factIcon">✈️</span>
          <div className="factText">
            <strong>Kenneth Kaunda (LUN)</strong>
            <small>Direct flights from Addis, JNB, DXB, DOH</small>
          </div>
        </div>
      </div>

      {/* Visitor Traveler Match */}
      <div className="visitorAudienceSplit">
        <div className="audienceCard firstTimeCard">
          <div className="audienceBadge" style={{ background: "#DE7739", color: "#fff" }}>🌱 For First-Time Safari Travellers</div>
          <h4>Your Classic Zambia Safari</h4>
          <p>
            Start in <strong>Livingstone</strong> with the thunder of Victoria Falls, Devil&apos;s Pool, and a sunset cruise on the Zambezi. Fly into
            <strong>South Luangwa</strong> for intimate walking safaris with legendary guides and lodge-side wildlife viewing.
          </p>
        </div>

        <div className="audienceCard returnCard">
          <div className="audienceBadge" style={{ background: "#1B6960", color: "#fff" }}>🧭 For Seasoned African Explorers</div>
          <h4>Beyond the Classic Circuits</h4>
          <p>
            Venture to the remote floodplains of <strong>Kafue & Busanga</strong> for tree-climbing lions, witness 10 million fruit bats in
            <strong>Kasanka</strong>, see the Shoebill stork in <strong>Bangweulu</strong>, or dive crystal-clear <strong>Lake Tanganyika</strong>.
          </p>
        </div>
      </div>

      {/* Expandable Regional Deep-Dive */}
      <div className="showcaseActions">
        <button
          className="toggleDeepDiveBtn"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ borderColor: "#DE7739", color: "#1B6960" }}
        >
          {isExpanded ? "▲ Hide Detailed Country Guide" : "▼ Explore Zambia's 4 Iconic Safari & Cultural Circuits"}
        </button>
      </div>

      {isExpanded && (
        <div className="expandedCountryGuide">
          <div className="regionsHighlightGrid">
            <div className="regionSpotlightCard">
              <span className="regionTag">🌊 Victoria Falls & Southern Zambezi</span>
              <h5>Livingstone, Siavonga & Lake Kariba</h5>
              <p>
                Adventure capital of Africa featuring bungee jumping, microlight flights, luxury Zambezi river lodges,
                and relaxing houseboat holidays on Lake Kariba.
              </p>
            </div>

            <div className="regionSpotlightCard">
              <span className="regionTag">🐾 The Luangwa Valley & Eastern Highlands</span>
              <h5>South & North Luangwa, Chipata & Luambe</h5>
              <p>
                The walking safari capital of Africa boasting dense leopard populations, endemic Thornicroft&apos;s giraffes,
                and vibrant Ngoni cultural ceremonies at Mutenguleni.
              </p>
            </div>

            <div className="regionSpotlightCard">
              <span className="regionTag">🛶 The Lower Zambezi & Central Plateau</span>
              <h5>Lower Zambezi, Lusaka Capital, Kafue National Park</h5>
              <p>
                Pristine riverine canoeing alongside elephant herds, tree-climbing lions in the Busanga Plains,
                and cosmopolitan dining in Lusaka.
              </p>
            </div>

            <div className="regionSpotlightCard">
              <span className="regionTag">🦅 Northern Waterfalls & Great Rift Lakes</span>
              <h5>Bangweulu, Kasanka, Lake Tanganyika & Lumangwe</h5>
              <p>
                The Great Bat Migration, prehistoric Shoebill storks, deep freshwater diving in Lake Tanganyika,
                and cascading waterfalls of Luapula.
              </p>
            </div>
          </div>

          {/* Official External Resources */}
          <div className="officialLinksSection">
            <h4>Official Travel & Tourism Portals</h4>
            <div className="externalLinksRow">
              <a
                href="https://www.zambiatourism.com"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                🌐 Zambia Tourism Agency (Official ZTA) ↗
              </a>
              <a
                href="https://eservices.zambiaimmigration.gov.zm"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                🛂 Zambia Immigration & eVisa Portal ↗
              </a>
              <a
                href="https://www.zambiaairways.co.zm"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                ✈️ Zambia Airways Domestic Network ↗
              </a>
              <a
                href="https://nhcczambia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="officialLinkBadge"
              >
                🏛️ National Heritage Conservation Commission ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

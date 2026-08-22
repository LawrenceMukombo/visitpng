"use client";

import React, { useState } from "react";
import {
  EMERGENCY_CONTACTS,
  REGIONAL_ADVISORIES,
  SAFETY_GUIDELINES
} from "@/db/securityAdvisory";

export function SecurityAdvisory() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const filteredAdvisories =
    selectedRegion === "all"
      ? REGIONAL_ADVISORIES
      : REGIONAL_ADVISORIES.filter((r) => r.regionId === selectedRegion);

  const filteredContacts =
    selectedCategory === "all"
      ? EMERGENCY_CONTACTS
      : EMERGENCY_CONTACTS.filter((c) => c.category === selectedCategory);

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  return (
    <section className="securityAdvisorySection">
      {/* Hero Header */}
      <div className="securityHero">
        <div className="securityBadgeRow">
          <span className="securityStatusPill">🛡️ PNG SafeTravel Advisory Matrix</span>
          <span className="lastUpdatedBadge">Verified August 2026</span>
        </div>
        <h2>Travel With Confidence in Papua New Guinea</h2>
        <p>
          Papua New Guinea is one of the most rewarding and culturally rich destinations on Earth.
          Like all adventurous frontiers, informed planning, certified local guides, and respecting
          customary clan protocols ensure a safe, memorable expedition.
        </p>
      </div>

      {/* Emergency Quick Dial Bar */}
      <div className="emergencyQuickDialBar">
        <div className="quickDialItem emergencyRed">
          <div className="quickDialInfo">
            <span className="quickDialLabel">🚑 National Ambulance (St. John)</span>
            <strong>111</strong>
          </div>
          <a href="tel:111" className="quickCallBtn">📞 Call 111</a>
        </div>

        <div className="quickDialItem emergencyBlue">
          <div className="quickDialInfo">
            <span className="quickDialLabel">🚓 Police Emergency (RPNGC)</span>
            <strong>112</strong>
          </div>
          <a href="tel:112" className="quickCallBtn">📞 Call 112</a>
        </div>

        <div className="quickDialItem emergencyTeal">
          <div className="quickDialInfo">
            <span className="quickDialLabel">🏥 PIH Trauma & Medevac</span>
            <strong>+675 7998 8000</strong>
          </div>
          <a href="tel:+67579988000" className="quickCallBtn">📞 Call Medevac</a>
        </div>

        <div className="quickDialItem emergencyGold">
          <div className="quickDialInfo">
            <span className="quickDialLabel">🌴 Tourism Safety Unit (TPA)</span>
            <strong>+675 321 4188</strong>
          </div>
          <a href="tel:+6753214188" className="quickCallBtn">📞 Tourist Help</a>
        </div>
      </div>

      {/* Regional Advisories Breakdown */}
      <div className="advisorySectionBlock">
        <div className="blockHeader">
          <h3>🗺️ Regional Safety Assessments</h3>
          <p>Select a region to view specific security tips, transport guidelines, and village protocols.</p>
        </div>

        {/* Region Filter Chips */}
        <div className="regionFilterPills">
          <button
            className={selectedRegion === "all" ? "active" : ""}
            onClick={() => setSelectedRegion("all")}
          >
            All Regions ({REGIONAL_ADVISORIES.length})
          </button>
          {REGIONAL_ADVISORIES.map((reg) => (
            <button
              key={reg.regionId}
              className={selectedRegion === reg.regionId ? "active" : ""}
              onClick={() => setSelectedRegion(reg.regionId)}
            >
              {reg.regionName}
            </button>
          ))}
        </div>

        {/* Advisory Cards Grid */}
        <div className="regionalCardsGrid">
          {filteredAdvisories.map((reg) => (
            <div key={reg.regionId} className="regionalAdvisoryCard">
              <div className="cardTopRow">
                <h4>{reg.regionName}</h4>
                <span
                  className={`advisoryLevelTag ${
                    reg.advisoryLevel === "exercise_normal_caution"
                      ? "levelNormal"
                      : "levelCaution"
                  }`}
                >
                  {reg.advisoryLevel === "exercise_normal_caution"
                    ? "🟢 Normal Caution"
                    : "🟡 High Caution"}
                </span>
              </div>

              <div className="provincesCovered">
                <strong>Provinces: </strong>
                <span>{reg.provinces.join(" • ")}</span>
              </div>

              <p className="regSummary">{reg.summary}</p>

              <div className="keyTipsBox">
                <strong>Essential Safety Practices:</strong>
                <ul>
                  {reg.keySafetyTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="regLogisticsMeta">
                <div className="metaRow">
                  <span className="metaLabel">Recommended Transport:</span>
                  <span className="metaVal">{reg.recommendedTransport}</span>
                </div>
                <div className="metaRow">
                  <span className="metaLabel">Night Travel Advised:</span>
                  <span className={`metaVal ${reg.nightTravelAdvised ? "ok" : "warn"}`}>
                    {reg.nightTravelAdvised ? "✅ Daylight & Evening Resorts" : "⚠️ Daylight Only"}
                  </span>
                </div>
                <div className="metaRow">
                  <span className="metaLabel">Local Guide Recommendation:</span>
                  <span className="metaVal">
                    {reg.localGuideRequired
                      ? "🤝 Certified Local Guide Strongly Recommended"
                      : "ℹ️ Optional for Resort/Island Tours"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Travel Safety Guidelines */}
      <div className="advisorySectionBlock">
        <div className="blockHeader">
          <h3>🧭 Golden Rules for PNG Travelers</h3>
          <p>Practical steps every traveler should take for a smooth, enriching PNG journey.</p>
        </div>

        <div className="guidelinesGrid">
          {SAFETY_GUIDELINES.map((guide) => (
            <div key={guide.id} className="safetyGuideCard">
              <div className="guideHeader">
                <span className="guideIcon">{guide.icon}</span>
                <div>
                  <h4>{guide.title}</h4>
                  <span className="guideCatTag">{guide.category}</span>
                </div>
              </div>
              <p className="guideSummary">{guide.summary}</p>
              <ul className="guideProtocols">
                {guide.protocols.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Full Emergency Contact Directory */}
      <div className="advisorySectionBlock emergencyDirectoryBlock">
        <div className="blockHeader">
          <h3>📞 National Emergency & Consular Directory</h3>
          <p>Keep these numbers handy or copy them to your device before departing.</p>
        </div>

        <div className="contactCategoryTabs">
          <button
            className={selectedCategory === "all" ? "active" : ""}
            onClick={() => setSelectedCategory("all")}
          >
            All Contacts
          </button>
          <button
            className={selectedCategory === "medical" ? "active" : ""}
            onClick={() => setSelectedCategory("medical")}
          >
            🏥 Medical & Medevac
          </button>
          <button
            className={selectedCategory === "police" ? "active" : ""}
            onClick={() => setSelectedCategory("police")}
          >
            🚓 Police & Security
          </button>
          <button
            className={selectedCategory === "tourism" ? "active" : ""}
            onClick={() => setSelectedCategory("tourism")}
          >
            🌴 Tourism Support
          </button>
          <button
            className={selectedCategory === "diplomatic" ? "active" : ""}
            onClick={() => setSelectedCategory("diplomatic")}
          >
            🏛️ Consular
          </button>
        </div>

        <div className="contactsList">
          {filteredContacts.map((contact, i) => (
            <div key={i} className="contactRowCard">
              <div className="contactDetails">
                <div className="contactNameRow">
                  <h4>{contact.name}</h4>
                  <span className="contactCatPill">{contact.category}</span>
                </div>
                <p className="contactLoc">📍 {contact.location}</p>
                <p className="contactNotes">{contact.notes}</p>
              </div>

              <div className="contactActions">
                <a href={`tel:${contact.phone}`} className="callLink">
                  📞 {contact.phone}
                </a>
                <button
                  className="copyBtn"
                  onClick={() => handleCopy(contact.phone)}
                >
                  {copiedPhone === contact.phone ? "✓ Copied" : "📋 Copy"}
                </button>
                {contact.altPhone && (
                  <small className="altPhone">Alt: {contact.altPhone}</small>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

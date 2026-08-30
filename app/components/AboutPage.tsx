"use client";
import React from "react";

export interface AboutPageProps {
  countryCode?: string;
  onClose?: () => void;
}

export function AboutPage({
  onClose
}: AboutPageProps) {
  const brandName = "VisitPNG";
  const legalOwner = "VisitPNG Tourism Services Ltd";

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "2rem 1.5rem 4rem",
      fontFamily: "Ubuntu, sans-serif",
      color: "#1a2e2b"
    }}>
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "2rem" }}>🇵🇬</span>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "800", color: "#1B6960" }}>
              About {brandName}
            </h1>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "#52796F" }}>
              Discover Papua New Guinea · Land of a Million Journeys
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "#e8f3f1",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              fontWeight: "700",
              color: "#1B6960"
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Main Mission Card */}
      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "2.5rem",
        border: "1px solid #d8e8e4",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        marginBottom: "2.5rem",
        lineHeight: "1.7"
      }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#1B6960", margin: "0 0 1rem 0" }}>
          Our Mission & Tourism Vision
        </h2>
        <p style={{ fontSize: "1.05rem", color: "#333", marginBottom: "1.5rem" }}>
          <strong>{brandName}</strong> is Papua New Guinea&apos;s dedicated digital tourism platform designed to help travellers discover, experience, and book the finest of Papua New Guinea while connecting verified local lodges, trekking operators, dive masters, and cultural hosts directly with global and domestic travelers.
        </p>
        <p style={{ fontSize: "0.95rem", color: "#555" }}>
          From the historic pilgrimage of the Kokoda Track in Central and Oro provinces, to alpine summits on Mount Wilhelm, world-class Coral Triangle scuba diving in Kimbe Bay, sacred Haus Tambaran spirit houses along the Sepik River, and legendary sing-sing cultural shows across all 22 provinces, {brandName} brings the authentic spirit and biodiversity of Papua New Guinea directly to your fingertips.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
        marginBottom: "3rem"
      }}>
        <div style={{
          background: "#f0f7f5",
          padding: "1.75rem",
          borderRadius: "12px",
          border: "1px solid #d4e8e3"
        }}>
          <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>🗺️</div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1B6960", margin: "0 0 0.5rem 0" }}>
            Authentic Discovery
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#444", margin: 0, lineHeight: "1.5" }}>
            Curated 22 provinces, Kokoda Track GPS routes, Coral Triangle dive spots, and verified listings with zero fake reviews.
          </p>
        </div>

        <div style={{
          background: "#f0f7f5",
          padding: "1.75rem",
          borderRadius: "12px",
          border: "1px solid #d4e8e3"
        }}>
          <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>💳</div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1B6960", margin: "0 0 0.5rem 0" }}>
            Member Privileges
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#444", margin: 0, lineHeight: "1.5" }}>
            The VisitPNG Pass unlocks exclusive rates and instant dynamic QR discounts across verified PNG eco-lodges and tour operators.
          </p>
        </div>

        <div style={{
          background: "#f0f7f5",
          padding: "1.75rem",
          borderRadius: "12px",
          border: "1px solid #d4e8e3"
        }}>
          <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>🤝</div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1B6960", margin: "0 0 0.5rem 0" }}>
            Partner Empowerment
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#444", margin: 0, lineHeight: "1.5" }}>
            Empowering Papua New Guinean lodge owners, trekking guides, and transport providers with direct digital bookings and performance analytics.
          </p>
        </div>
      </div>

      {/* Corporate & Legal Ownership Box */}
      <div style={{
        background: "linear-gradient(135deg, #0d2b27 0%, #1B6960 100%)",
        color: "#ffffff",
        borderRadius: "14px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "800", margin: 0 }}>
          Corporate Governance & Legal Ownership
        </h3>
        <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6", color: "#e0eeea" }}>
          {brandName} is a commercial tourism technology platform owned and operated by <strong>{legalOwner}</strong>. All contractual agreements, partner subscriptions, payment processing, taxation compliance, and platform operations are administered directly under {legalOwner}.
        </p>
        <div style={{ fontSize: "0.85rem", color: "#a3cfc9", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem 1.5rem", alignItems: "center" }}>
          <span>Headquarters: Champion Parade, Downtown Port Moresby, National Capital District, Papua New Guinea</span>
          <span>Phone: +675 321 4188</span>
          <span>Email: <a href="mailto:info@visitpng.com" style={{ color: "#ffffff", textDecoration: "underline", fontWeight: "600" }}>info@visitpng.com</a></span>
        </div>
      </div>
    </div>
  );
}

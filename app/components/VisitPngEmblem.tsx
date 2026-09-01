"use client";

import React from "react";

/**
 * Official VisitPNG Kumul Emblem & Typography
 */
export function VisitPngLogo({
  size = "medium",
  showTagline = true,
  variant = "light"
}: {
  size?: "small" | "medium" | "large";
  showTagline?: boolean;
  variant?: "light" | "dark";
}) {
  const imgHeight = size === "small" ? 38 : size === "large" ? 64 : 48;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size === "small" ? "8px" : "12px", textDecoration: "none" }}>
      <img
        src="/branding/visitpng_logo.png"
        alt="Visit PNG Official Logo"
        style={{
          height: `${imgHeight}px`,
          width: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.35))",
          borderRadius: "6px",
          display: "block"
        }}
      />
      {showTagline && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <span
            style={{
              fontFamily: "'Ubuntu', sans-serif",
              fontSize: size === "small" ? "11px" : size === "large" ? "14px" : "12px",
              fontWeight: 800,
              color: variant === "dark" ? "#1B6960" : "#FDBA74",
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}
          >
            PAPUA NEW GUINEA
          </span>
          <span
            style={{
              fontFamily: "'Ubuntu', sans-serif",
              fontSize: size === "small" ? "8.5px" : size === "large" ? "10.5px" : "9.5px",
              fontWeight: 600,
              color: variant === "dark" ? "#64748B" : "#CBD5E1",
              letterSpacing: "0.5px"
            }}
          >
            Land of a Million Journeys
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * VisitPNG Hero Ribbon Banner
 */
export function VisitPngHeroBanner({ onExploreClick }: { onExploreClick?: () => void }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(16, 54, 48, 0.95) 0%, rgba(27, 105, 96, 0.9) 100%)",
        border: "1px solid rgba(234, 88, 12, 0.4)",
        borderRadius: "16px",
        padding: "20px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        margin: "16px 0 24px 0",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <VisitPngLogo size="medium" showTagline={false} />
        <div>
          <h3 style={{ margin: 0, color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 700 }}>
            Official Tourism Platform of Papua New Guinea
          </h3>
          <p style={{ margin: "4px 0 0 0", color: "#CBD5E1", fontSize: "0.85rem" }}>
            22 Provinces · Kokoda Track · Coral Triangle Diving · 800+ Tribes & Sing-Sings
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            background: "rgba(234, 88, 12, 0.2)",
            border: "1px solid #EA580C",
            color: "#FDBA74",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.5px"
          }}
        >
          🇵🇬 PNGTPA PARTNER
        </span>
        {onExploreClick && (
          <button
            onClick={onExploreClick}
            style={{
              background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(234, 88, 12, 0.35)"
            }}
          >
            Explore Map 🗺️
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * VisitPNG Trust & Verification Ribbon
 */
export function VisitPngTrustRibbon() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "6px 12px",
        padding: "4px 10px",
        background: "rgba(16, 54, 48, 0.75)",
        borderBottom: "1px solid rgba(234, 88, 12, 0.2)",
        fontSize: "0.68rem",
        fontWeight: 600,
        color: "#CBD5E1",
        lineHeight: "1.2"
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
        <span style={{ color: "#22C55E", fontWeight: 800 }}>✓</span> PNGTPA Aligned
      </span>
      <span style={{ opacity: 0.3 }}>•</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
        <span style={{ color: "#F97316", fontWeight: 800 }}>✓</span> KTA Certified
      </span>
      <span style={{ opacity: 0.3 }}>•</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
        <span style={{ color: "#38BDF8", fontWeight: 800 }}>✓</span> Secure PGK & PayPal
      </span>
      <span style={{ opacity: 0.3 }}>•</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
        <span style={{ color: "#FBBF24", fontWeight: 800 }}>✓</span> 24/7 Medevac Link
      </span>
    </div>
  );
}

// Backward compatibility alias for any component still importing ZamRoamLogo
export const ZamRoamLogo = VisitPngLogo;
export const ZamRoamHeroBanner = VisitPngHeroBanner;
export const ZamRoamTrustRibbon = VisitPngTrustRibbon;

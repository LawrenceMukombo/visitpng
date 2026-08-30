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
  const pinSize = size === "small" ? 34 : size === "large" ? 58 : 44;
  const fontSize = size === "small" ? "19px" : size === "large" ? "32px" : "24px";
  const taglineSize = size === "small" ? "8.5px" : size === "large" ? "11px" : "9.5px";

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size === "small" ? "8px" : "12px", textDecoration: "none" }}>
      {/* Official VisitPNG Kumul SVG Icon */}
      <svg
        width={pinSize}
        height={pinSize * 1.15}
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))", flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="pngOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <linearGradient id="pngTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E3D35" />
            <stop offset="100%" stopColor="#1B6960" />
          </linearGradient>
          <linearGradient id="kumulGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="coralRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>

        {/* Outer Shield / Pin Contour */}
        <path
          d="M50 4C24.595 4 4 24.595 4 50c0 14.2 6.5 27 16.8 35.3L50 112l29.2-26.7C89.5 77 96 64.2 96 50 96 24.595 75.405 4 50 4z"
          fill="#103630"
          stroke="#EA580C"
          strokeWidth="6"
        />

        {/* Kumul Sun Halo */}
        <path
          d="M20 38C26 22 37 14 50 14s24 8 30 24"
          stroke="url(#pngOrangeGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Golden Sun / Kundu Emblem */}
        <circle cx="50" cy="38" r="12" fill="url(#kumulGoldGrad)" />

        {/* Kumul Bird of Paradise Flight Plumes */}
        <path
          d="M32 58 C 42 46, 58 46, 68 58 C 60 70, 40 70, 32 58 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <path
          d="M50 50 L 50 82"
          stroke="#FBBF24"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M40 64 L 50 74 L 60 64"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Typography */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span
            style={{
              fontFamily: "'Ubuntu', sans-serif",
              fontSize: fontSize,
              fontWeight: 800,
              color: variant === "dark" ? "#1B6960" : "#FFFFFF",
              letterSpacing: "-0.5px"
            }}
          >
            Visit
          </span>
          <span
            style={{
              fontFamily: "'Ubuntu', sans-serif",
              fontSize: fontSize,
              fontWeight: 800,
              color: "#F97316",
              letterSpacing: "-0.5px"
            }}
          >
            PNG
          </span>
        </div>

        {showTagline && (
          <span
            style={{
              fontFamily: "'Ubuntu', sans-serif",
              fontSize: taglineSize,
              fontWeight: 600,
              color: variant === "dark" ? "#64748B" : "#FDBA74",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginTop: "2px"
            }}
          >
            LAND OF A MILLION JOURNEYS
          </span>
        )}
      </div>
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

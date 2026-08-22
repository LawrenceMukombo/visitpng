"use client";

import React from "react";

/**
 * Official ZamRoam Pin Emblem & Typography
 * Matches the official branding:
 * - Orange & Deep Green GPS Pin
 * - African Acacia Tree & Setting Sun
 * - Winding Zambezi River
 * - "ZamRoam" Typography with "DISCOVER ZAMBIA. EXPERIENCE MORE."
 */
export function ZamRoamLogo({
  size = "medium",
  showTagline = true,
  variant = "light"
}: {
  size?: "small" | "medium" | "large";
  showTagline?: boolean;
  variant?: "light" | "dark";
}) {
  const pinSize = size === "small" ? 32 : size === "large" ? 56 : 42;
  const fontSize = size === "small" ? "18px" : size === "large" ? "32px" : "24px";
  const taglineSize = size === "small" ? "8px" : size === "large" ? "11px" : "9.5px";

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size === "small" ? "8px" : "12px", textDecoration: "none" }}>
      {/* Official ZamRoam Pin SVG Icon */}
      <svg
        width={pinSize}
        height={pinSize * 1.15}
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))", flexShrink: 0 }}
      >
        <defs>
          {/* Orange gradient for upper ring */}
          <linearGradient id="pinOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          {/* Green gradient for lower base */}
          <linearGradient id="pinGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E3D35" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          {/* Sun gradient */}
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          {/* River gradient */}
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>

        {/* Outer Pin Body */}
        {/* Upper Orange Arch */}
        <path
          d="M50 4C24.595 4 4 24.595 4 50c0 14.2 6.5 27 16.8 35.3L50 112l29.2-26.7C89.5 77 96 64.2 96 50 96 24.595 75.405 4 50 4z"
          fill="#103630"
          stroke="#EA580C"
          strokeWidth="6"
        />

        {/* Orange Top Arc Accent */}
        <path
          d="M20 38C26 22 37 14 50 14s24 8 30 24"
          stroke="url(#pinOrangeGrad)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Inner Sky & Sun Circle */}
        <path
          d="M26 50a24 24 0 0 1 48 0H26z"
          fill="url(#sunGrad)"
        />

        {/* Acacia Tree Silhouette */}
        <g fill="#0B2722">
          {/* Tree Canopy */}
          <ellipse cx="40" cy="38" rx="16" ry="6" />
          <ellipse cx="36" cy="35" rx="11" ry="4" />
          <ellipse cx="45" cy="36" rx="9" ry="3.5" />
          {/* Trunk & Branches */}
          <path d="M40 38v12h-3v-12c-2-1-4-3-6-5l2-1c2 2 4 3 5 4v-1c1-1 3-3 5-4l1.5 1c-2 2-3 3-4.5 5z" />
        </g>

        {/* Lower Deep Green Landscape */}
        <path
          d="M16 52c0 18.778 15.222 34 34 34s34-15.222 34-34H16z"
          fill="url(#pinGreenGrad)"
        />

        {/* Winding Zambezi River Ribbon */}
        <path
          d="M48 50c-2 8 6 14 2 22-3 6-7 10-4 14h8c-3-4 1-8 4-14 4-8-4-14-2-22h-8z"
          fill="url(#riverGrad)"
        />
      </svg>

      {/* Typography */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
        <div style={{ fontSize, fontWeight: 900, letterSpacing: "-0.03em" }}>
          <span style={{ color: variant === "dark" ? "#0F3E36" : "#FFFFFF" }}>Zam</span>
          <span style={{ color: "#F97316" }}>Roam</span>
        </div>
        {showTagline && (
          <div
            style={{
              fontSize: taglineSize,
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: variant === "dark" ? "#15803D" : "#34D399",
              textTransform: "uppercase",
              marginTop: "3px"
            }}
          >
            DISCOVER ZAMBIA. <span style={{ color: "#FB923C" }}>EXPERIENCE MORE.</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ZamRoam Circular Brand Seal
 */
export function ZamRoamCircularSeal({ size = 160 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle, #FFFFFF 0%, #F8FAFC 100%)",
        border: "5px solid #0E3D35",
        boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "12px",
        textAlign: "center"
      }}
    >
      {/* Outer decorative ring */}
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "4px",
          right: "4px",
          bottom: "4px",
          borderRadius: "50%",
          border: "1.5px solid #EA580C",
          pointerEvents: "none"
        }}
      />

      <ZamRoamLogo size="small" showTagline={false} variant="dark" />

      <div style={{ fontSize: "14px", fontWeight: 900, marginTop: "2px" }}>
        <span style={{ color: "#0E3D35" }}>Zam</span>
        <span style={{ color: "#EA580C" }}>Roam</span>
      </div>

      <div style={{ fontSize: "7px", fontWeight: 800, color: "#166534", letterSpacing: "0.08em", marginTop: "2px" }}>
        DISCOVER ZAMBIA.
      </div>
      <div style={{ fontSize: "7px", fontWeight: 800, color: "#EA580C", letterSpacing: "0.08em" }}>
        EXPERIENCE MORE.
      </div>

      {/* Birds */}
      <div style={{ fontSize: "10px", marginTop: "4px", opacity: 0.8 }}>
        🦅 🦅 🦅
      </div>
    </div>
  );
}

/**
 * Golden Vintage Lion Compass Rose (Safari Overland Route)
 */
export function ZamRoamLionCompass({ size = 120 }: { size?: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.4))"
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Compass Outer Rings */}
        <circle cx="100" cy="100" r="70" stroke="url(#goldGrad)" strokeWidth="3" />
        <circle cx="100" cy="100" r="64" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="50" stroke="url(#goldGrad)" strokeWidth="1.5" />

        {/* Compass Star Points */}
        {/* North */}
        <polygon points="100,10 93,85 100,75 107,85" fill="url(#goldLight)" stroke="url(#goldGrad)" strokeWidth="1" />
        {/* South */}
        <polygon points="100,190 93,115 100,125 107,115" fill="url(#goldLight)" stroke="url(#goldGrad)" strokeWidth="1" />
        {/* East */}
        <polygon points="190,100 115,93 125,100 115,107" fill="url(#goldLight)" stroke="url(#goldGrad)" strokeWidth="1" />
        {/* West */}
        <polygon points="10,100 85,93 75,100 85,107" fill="url(#goldLight)" stroke="url(#goldGrad)" strokeWidth="1" />

        {/* Compass Lettering */}
        <text x="100" y="24" fill="#FDE68A" fontSize="13" fontWeight="900" textAnchor="middle">N</text>
        <text x="100" y="185" fill="#FDE68A" fontSize="13" fontWeight="900" textAnchor="middle">S</text>
        <text x="182" y="104" fill="#FDE68A" fontSize="13" fontWeight="900" textAnchor="middle">E</text>
        <text x="18" y="104" fill="#FDE68A" fontSize="13" fontWeight="900" textAnchor="middle">W</text>

        {/* Overland Safari Route Waypoint Path */}
        <path
          d="M30 150 Q 55 140, 80 120 T 130 90 T 170 70"
          stroke="url(#goldGrad)"
          strokeWidth="2.5"
          strokeDasharray="4 2"
          fill="none"
        />

        {/* Waypoint Location Pins */}
        <circle cx="30" cy="150" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="150" cy="80" r="4" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="170" cy="70" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Center Lion Head Emblem */}
        <circle cx="100" cy="100" r="38" fill="#1C1917" stroke="url(#goldGrad)" strokeWidth="2.5" />
        <text x="100" y="112" fontSize="32" textAnchor="middle">🦁</text>
      </svg>

      <span
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "14px",
          fontWeight: "bold",
          letterSpacing: "0.15em",
          background: "linear-gradient(135deg, #FDE68A 0%, #D97706 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textTransform: "uppercase"
        }}
      >
        ZamRoam
      </span>
    </div>
  );
}

/**
 * Six Official ZamRoam Category Icons (From Banner)
 */
export const ZAMROAM_NAV_CATEGORIES = [
  {
    id: "stay",
    slug: "stays",
    label: "STAY",
    iconName: "Bed",
    symbol: "🛏️",
    desc: "Luxury safari lodges, river chalets & heritage hotels"
  },
  {
    id: "explore",
    slug: "tours",
    label: "EXPLORE",
    iconName: "Camera",
    symbol: "📷",
    desc: "Game drives, walking safaris & expedition circuits"
  },
  {
    id: "experience",
    slug: "nature",
    label: "EXPERIENCE",
    iconName: "Pin",
    symbol: "📍",
    desc: "Victoria Falls, lakes, canoe trails & wilderness"
  },
  {
    id: "events",
    slug: "culture",
    label: "EVENTS",
    iconName: "Calendar",
    symbol: "📅",
    desc: "Kuomboka, Nc'wala & 10 Royal Ceremonies"
  },
  {
    id: "deals",
    slug: "pass",
    label: "DEALS",
    iconName: "Tag",
    symbol: "🏷️",
    desc: "ZamRoam Tourist Pass & exclusive travel perks"
  },
  {
    id: "local_businesses",
    slug: "partners",
    label: "LOCAL BUSINESSES",
    iconName: "Users",
    symbol: "👥",
    desc: "Registered Zambian tour operators & artisans"
  }
];

/**
 * Four Trust & Value Props Ribbon (From Banner)
 */
export function ZamRoamTrustRibbon() {
  const valueProps = [
    { title: "TOP DESTINATIONS", desc: "Handpicked Zambian Wonders" },
    { title: "EXCLUSIVE OFFERS", desc: "Best Verified Rates in ZMW" },
    { title: "TRUSTED PARTNERS", desc: "ZTA Licensed Tour Guides" },
    { title: "MEMBER BENEFITS", desc: "VIP Access & Offline Passes" }
  ];

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #092B24 0%, #0E3D35 50%, #092B24 100%)",
        borderTop: "1px solid rgba(37, 211, 102, 0.25)",
        borderBottom: "1px solid rgba(37, 211, 102, 0.25)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "12px",
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)"
      }}
    >
      {valueProps.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "#FFFFFF",
            fontWeight: 800,
            letterSpacing: "0.06em"
          }}
        >
          {/* Orange Checkmark Pill */}
          <span
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#EA580C",
              color: "#FFFFFF",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 900,
              boxShadow: "0 2px 5px rgba(234, 88, 12, 0.4)"
            }}
          >
            ✓
          </span>
          <span style={{ textTransform: "uppercase" }}>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Official ZamRoam Top Banner Component
 */
export function ZamRoamHeroBanner({
  onSelectCategory,
  onOpenMap,
  onOpenPass
}: {
  onSelectCategory?: (slug: string) => void;
  onOpenMap?: () => void;
  onOpenPass?: () => void;
}) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #071C18 0%, #0B2B24 100%)",
        borderRadius: "16px",
        border: "1px solid rgba(37, 211, 102, 0.3)",
        overflow: "hidden",
        marginBottom: "24px",
        boxShadow: "0 18px 40px rgba(0,0,0,0.55)"
      }}
    >
      {/* Banner Graphic Header with Zambian Flag */}
      <div
        style={{
          position: "relative",
          padding: "28px 24px 20px",
          background: "linear-gradient(135deg, rgba(8, 38, 32, 0.95) 0%, rgba(14, 61, 53, 0.85) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        {/* Zambian Flag Accent in Top Right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "60px",
            background: "linear-gradient(135deg, #15803D 50%, #B91C1C 50%, #B91C1C 66%, #1E293B 66%, #1E293B 83%, #EA580C 83%)",
            opacity: 0.85,
            borderBottomLeftRadius: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "10px",
            color: "#F59E0B",
            fontWeight: 900,
            fontSize: "18px"
          }}
        >
          🦅
        </div>

        {/* Brand & Tagline */}
        <div style={{ maxWidth: "600px" }}>
          <ZamRoamLogo size="large" showTagline={true} />
          <p
            style={{
              margin: "12px 0 0",
              fontSize: "14.5px",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.5,
              fontWeight: 500
            }}
          >
            Your premier gateway to Zambia&apos;s 10 provinces, 116 districts, legendary walking safaris, and ancient royal pageants.
          </p>
        </div>

        {/* Lion Compass Graphic */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <ZamRoamLionCompass size={110} />
        </div>
      </div>

      {/* Six Main Category Navigation Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "10px",
          padding: "16px 20px",
          background: "rgba(5, 20, 16, 0.95)"
        }}
      >
        {ZAMROAM_NAV_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              if (cat.slug === "pass" && onOpenPass) {
                onOpenPass();
              } else if (onSelectCategory) {
                onSelectCategory(cat.slug);
              }
            }}
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "10px",
              padding: "12px 8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <span style={{ fontSize: "24px" }}>{cat.symbol}</span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.06em"
              }}
            >
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* Trust Ribbon */}
      <ZamRoamTrustRibbon />

      {/* Contact & Domain Verification Footer Strip */}
      <div
        style={{
          background: "#041512",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: "12px",
          color: "rgba(255, 255, 255, 0.7)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <span>🌐 <strong style={{ color: "#34D399" }}>zamroam.com</strong></span>
          <span>✉️ <strong style={{ color: "#FB923C" }}>info@zamroam.com</strong></span>
          <span>💬 WhatsApp: <strong style={{ color: "#34D399" }}>+260 573 506 598</strong></span>
        </div>
        <div>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>Owned & Operated by </span>
          <strong style={{ color: "#FFFFFF" }}>Lamton Investments Ltd</strong>
        </div>
      </div>
    </div>
  );
}

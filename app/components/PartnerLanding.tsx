"use client";
import React, { useState } from "react";

export interface PartnerLandingProps {
  countryCode?: string;
  currency?: string;
  onOpenRegister?: () => void;
  onClose?: () => void;
}

export function PartnerLanding({
  currency = "ZMW",
  onOpenRegister,
  onClose
}: PartnerLandingProps) {
  const brandName = "ZamRoam";
  const partnerProgram = "ZamRoam Partners";
  const verifiedBadge = "ZamRoam Verified";
  const dealsName = "ZamRoam Deals";
  const currencySymbol = "ZK";

  const [campaignSlots] = useState({
    total: 100,
    allocated: 63,
    remaining: 37,
    promoPrice: 1499,
    regularPrice: 2999
  });

  const tiers = [
    {
      name: "Starter Partner",
      price: 0,
      period: "Free",
      features: [
        "Basic Directory Listing",
        "Direct Contact & WhatsApp Enquiries",
        "Public Review Display",
        "Standard Map Marker"
      ],
      cta: "Register Free",
      highlight: false
    },
    {
      name: "Verified Partner",
      price: 899,
      period: "/ year",
      features: [
        `Official ${verifiedBadge} Trust Badge`,
        `Publish Unlimited ${dealsName}`,
        "Front-Desk QR Verification Terminal",
        "Anti-Scam Verified Profile",
        "Monthly Visibility & Analytics Report"
      ],
      cta: "Get Verified",
      highlight: true
    },
    {
      name: "Premium Safari Partner",
      price: 1899,
      period: "/ year",
      features: [
        "All Verified Partner Features",
        "Featured Hero Banner Placement",
        "Priority Search Ranking across Province",
        "Commission Settlement Dashboard (5% + VAT)",
        "Social Media & Newsletter Spotlight"
      ],
      cta: "Join Premium",
      highlight: false
    }
  ];

  return (
    <div style={{
      maxWidth: "1140px",
      margin: "0 auto",
      padding: "2rem 1.5rem 4rem",
      fontFamily: "Ubuntu, sans-serif",
      color: "#1a2e2b"
    }}>
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "2rem" }}>🇿🇲</span>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "800", color: "#1B6960" }}>
              {partnerProgram}
            </h1>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "#52796F" }}>
              Grow Your Tourism Business with {brandName} & Lamton Investments Ltd.
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

      {/* 100 Founding Partners Launch Campaign Widget */}
      <div style={{
        background: "linear-gradient(135deg, #DE7739 0%, #B8591E 100%)",
        color: "#ffffff",
        padding: "2rem",
        borderRadius: "16px",
        marginBottom: "2.5rem",
        boxShadow: "0 8px 24px rgba(222, 119, 57, 0.25)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1.5rem"
      }}>
        <div style={{ maxWidth: "600px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(0,0,0,0.2)",
            color: "#fff",
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: "800",
            letterSpacing: "0.05em",
            marginBottom: "0.75rem"
          }}>
            ⭐ LIMITED LAUNCH CAMPAIGN
          </div>
          <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.8rem", fontWeight: "800" }}>
            Become One of the First 100 Founding Partners
          </h2>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.5", color: "#ffe8dc" }}>
            Join the launch cohort to receive a permanent <strong>Founding Partner Badge</strong>, 12 months top-tier search priority, and 50% lifetime subscription discount.
          </p>
        </div>

        <div style={{
          background: "#ffffff",
          color: "#1a2e2b",
          padding: "1.25rem 1.5rem",
          borderRadius: "12px",
          textAlign: "center",
          minWidth: "220px"
        }}>
          <div style={{ fontSize: "0.85rem", color: "#666", fontWeight: "600" }}>SLOTS REMAINING</div>
          <div style={{ fontSize: "2rem", fontWeight: "900", color: "#DE7739", margin: "0.25rem 0" }}>
            {campaignSlots.remaining} / {campaignSlots.total}
          </div>
          <div style={{ fontSize: "0.85rem", color: "#333", marginBottom: "0.75rem" }}>
            <strong>{currencySymbol}{campaignSlots.promoPrice}</strong> <span style={{ textDecoration: "line-through", color: "#999" }}>{currencySymbol}{campaignSlots.regularPrice}</span>
          </div>
          <button
            onClick={onOpenRegister}
            style={{
              background: "#1B6960",
              color: "#ffffff",
              border: "none",
              padding: "0.6rem 1rem",
              borderRadius: "6px",
              fontWeight: "700",
              fontSize: "0.85rem",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Claim Founding Slot
          </button>
        </div>
      </div>

      {/* Subscription Plans Grid */}
      <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#1B6960", marginBottom: "1.5rem" }}>
        Partner Membership Plans
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
        marginBottom: "3rem"
      }}>
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: tier.highlight ? "2px solid #DE7739" : "1px solid #d8e8e4",
              padding: "1.75rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              boxShadow: tier.highlight ? "0 8px 24px rgba(222, 119, 57, 0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1B6960" }}>
                {tier.name}
              </h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={idx === 1 ? "/icons/verified_business_badge.png" : idx === 2 ? "/icons/trusted_partner_badge.png" : "/icons/partners.png"}
                alt={tier.name}
                style={{ width: "32px", height: "32px", objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1a2e2b" }}>
                {tier.price === 0 ? "Free" : `${currencySymbol}${tier.price}`}
              </span>
              {tier.period && (
                <span style={{ fontSize: "0.85rem", color: "#888" }}>
                  {tier.price > 0 ? `${tier.period} (${currency})` : tier.period}
                </span>
              )}
            </div>

            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 1.5rem 0",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              flexGrow: 1
            }}>
              {tier.features.map((feat, fidx) => (
                <li key={fidx} style={{ fontSize: "0.88rem", color: "#444", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span style={{ color: "#1B6960", fontWeight: "800" }}>✓</span> {feat}
                </li>
              ))}
            </ul>

            <button
              onClick={onOpenRegister}
              style={{
                background: tier.highlight ? "#DE7739" : "#1B6960",
                color: "#ffffff",
                border: "none",
                padding: "0.8rem 1rem",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "0.95rem",
                cursor: "pointer",
                width: "100%"
              }}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Commercial Terms Wording */}
      <div style={{
        background: "#f0f7f5",
        borderRadius: "12px",
        padding: "1.5rem 2rem",
        border: "1px solid #d4e8e3",
        fontSize: "0.9rem",
        color: "#2d4a45",
        lineHeight: "1.6"
      }}>
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#1B6960", fontSize: "1.05rem" }}>
          Commercial & Contracting Terms
        </h4>
        <p style={{ margin: 0 }}>
          The {partnerProgram} ecosystem is operated by <strong>Lamton Investments Ltd</strong>. Subscribed providers agree to transparent commission processing (standard 5% platform commission + statutory VAT) only on verified completed member bookings, with full automated receipting and monthly settlement ledgers.
        </p>
      </div>
    </div>
  );
}

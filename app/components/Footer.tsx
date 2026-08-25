"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ZamRoamLogo } from "./ZamRoamEmblem";

export interface FooterProps {
  countryCode?: string;
  brandName?: string;
  tagline?: string;
  legalOwner?: string;
  onOpenPass?: () => void;
  onOpenPartnerRegistration?: () => void;
  onOpenFoundingPartners?: () => void;
  onOpenAbout?: () => void;
  onSelectCategory?: (categorySlug: string) => void;
  onOpenDeals?: () => void;
  onOpenDestinations?: () => void;
  onOpenMap?: () => void;
  onOpenMembershipHub?: () => void;
}

export function Footer({
  brandName = "ZamRoam",
  tagline = "Roam Zambia. Experience More.",
  legalOwner = "Lamton Investments Ltd",
  onOpenPass,
  onOpenPartnerRegistration,
  onOpenFoundingPartners,
  onOpenAbout,
  onSelectCategory,
  onOpenDeals,
  onOpenDestinations,
  onOpenMap,
  onOpenMembershipHub
}: FooterProps) {
  const passLabel = "ZamRoam Pass";
  const dealsLabel = "ZamRoam Deals";

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleDestinationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenDestinations) {
      onOpenDestinations();
    } else {
      window.location.href = "/#destinations";
    }
  };

  const handleCategoryClick = (categorySlug: string) => {
    if (onSelectCategory) {
      onSelectCategory(categorySlug);
    } else {
      window.location.href = `/?cat=${categorySlug}`;
    }
  };

  const handleDealsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenDeals) {
      onOpenDeals();
    } else if (onOpenPass) {
      onOpenPass();
    } else {
      window.location.href = "/pass";
    }
  };

  const handleMapClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenMap) {
      onOpenMap();
    } else {
      window.location.href = "/#map";
    }
  };

  const handlePassClick = () => {
    if (onOpenPass) {
      onOpenPass();
    } else {
      window.location.href = "/pass";
    }
  };

  const handleMembershipClick = () => {
    if (onOpenMembershipHub) {
      onOpenMembershipHub();
    } else if (onOpenPass) {
      onOpenPass();
    } else {
      window.location.href = "/pass";
    }
  };

  const handlePartnerRegisterClick = () => {
    if (onOpenPartnerRegistration) {
      onOpenPartnerRegistration();
    } else {
      window.location.href = "/partners";
    }
  };

  const handleFoundingPartnersClick = () => {
    if (onOpenFoundingPartners) {
      onOpenFoundingPartners();
    } else if (onOpenPartnerRegistration) {
      onOpenPartnerRegistration();
    } else {
      window.location.href = "/partners";
    }
  };

  const handleAboutClick = () => {
    if (onOpenAbout) {
      onOpenAbout();
    } else {
      window.location.href = "/about";
    }
  };

  const linkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#a3cfc9",
    padding: "0.25rem 0",
    font: "inherit",
    cursor: "pointer",
    fontSize: "0.92rem",
    textAlign: "left",
    display: "block",
    width: "100%",
    textDecoration: "none",
    transition: "color 0.15s ease, transform 0.15s ease"
  };

  const highlightLinkStyle: React.CSSProperties = {
    ...linkStyle,
    color: "#DE7739",
    fontWeight: "700"
  };

  return (
    <>
      <footer style={{
        background: "#0d2b27",
        color: "#e6f4f1",
        padding: "3.5rem 1.5rem 2rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        marginTop: "4rem",
        fontFamily: "Ubuntu, sans-serif"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3rem"
        }}>
          {/* Brand & Corporate Column */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <ZamRoamLogo size="medium" showTagline={true} />
            </div>
            <p style={{ fontSize: "0.95rem", color: "#a3cfc9", lineHeight: "1.5", marginBottom: "1rem" }}>
              {tagline}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", color: "#c2e2dc", marginBottom: "1.25rem" }}>
              <Link href="/" style={{ color: "#c2e2dc", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                🌐 <strong>zamroam.com</strong>
              </Link>
              <a href="mailto:info@zamroam.com" style={{ color: "#c2e2dc", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                ✉️ <strong>info@zamroam.com</strong>
              </a>
              <a href="https://wa.me/260573506598" target="_blank" rel="noopener noreferrer" style={{ color: "#c2e2dc", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                💬 WhatsApp: <strong>+260 573 506 598</strong>
              </a>
            </div>
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              borderLeft: "3px solid #EA580C",
              fontSize: "0.85rem",
              color: "#c2e2dc",
              lineHeight: "1.4"
            }}>
              <strong>Legal Ownership:</strong><br />
              {brandName} is a tourism technology platform owned and operated by <strong>{legalOwner}</strong>.
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "1rem" }}>
              Explore Zambia
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <button
                  type="button"
                  onClick={handleDestinationsClick}
                  style={linkStyle}
                >
                  Top Destinations & Parks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick("stays")}
                  style={linkStyle}
                >
                  Safari Lodges & Stays
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick("tours")}
                  style={linkStyle}
                >
                  Walking Safaris & Experiences
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleDealsClick}
                  style={highlightLinkStyle}
                >
                  {dealsLabel} & Discounts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleMapClick}
                  style={linkStyle}
                >
                  Interactive Zambian Map
                </button>
              </li>
            </ul>
          </div>

          {/* Membership Column */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "1rem" }}>
              Membership & Pass
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <button
                  type="button"
                  onClick={handlePassClick}
                  style={highlightLinkStyle}
                >
                  {passLabel} Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handlePassClick}
                  style={linkStyle}
                >
                  Member Benefits & Savings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handlePassClick}
                  style={linkStyle}
                >
                  Digital Pass & Instant QR
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleMembershipClick}
                  style={linkStyle}
                >
                  My Membership & Passport
                </button>
              </li>
            </ul>
          </div>

          {/* Partners & Corporate Column */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "1rem" }}>
              Partners & Company
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <button
                  type="button"
                  onClick={handlePartnerRegisterClick}
                  style={highlightLinkStyle}
                >
                  Become a Partner (List Business)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleFoundingPartnersClick}
                  style={linkStyle}
                >
                  100 Founding ZamRoam Partners
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleAboutClick}
                  style={linkStyle}
                >
                  About {brandName}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  style={linkStyle}
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  style={linkStyle}
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Connect & Trust Badges Strip */}
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.25rem 0",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.25rem"
        }}>
          {/* Social Links with Crisp Vector Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", color: "#a3cfc9", fontWeight: 700, marginRight: "4px" }}>Follow ZamRoam:</span>
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/260573506598"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "15px",
                boxShadow: "0 2px 8px rgba(37, 211, 102, 0.35)",
                textDecoration: "none",
                transition: "transform 0.15s ease"
              }}
            >
              💬
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/zamroam"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on Facebook"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#1877F2",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "15px",
                boxShadow: "0 2px 8px rgba(24, 119, 242, 0.35)",
                textDecoration: "none",
                fontFamily: "sans-serif"
              }}
            >
              f
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/zamroam"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on Instagram"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "15px",
                boxShadow: "0 2px 8px rgba(220, 39, 67, 0.35)",
                textDecoration: "none"
              }}
            >
              📷
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/zamroam"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on X"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#000000",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "13px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
                textDecoration: "none",
                fontFamily: "sans-serif"
              }}
            >
              𝕏
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@zamroam"
              target="_blank"
              rel="noopener noreferrer"
              title="Watch on YouTube"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#FF0000",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "14px",
                boxShadow: "0 2px 8px rgba(255, 0, 0, 0.35)",
                textDecoration: "none"
              }}
            >
              ▶
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@zamroam"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on TikTok"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#010101",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "14px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
                textDecoration: "none"
              }}
            >
              🎵
            </a>
          </div>

          {/* Trust Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              color: "#34D399",
              fontWeight: 700
            }}>
              <span>🛡️</span>
              <span>ZTA Licensed Partner</span>
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              color: "#FBBF24",
              fontWeight: 700
            }}>
              <span>⭐</span>
              <span>Top Rated Experiences</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "1.25rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.85rem",
          color: "#7faeac"
        }}>
          <div>
            © {new Date().getFullYear()} {brandName}. Owned and operated by <strong>{legalOwner}</strong>. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Lusaka • Livingstone • Ndola • Mfuwe</span>
            <span>Commercial Tourism Technology</span>
          </div>
        </div>
      </footer>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setShowTermsModal(false)}>
          <div style={{ background: "#ffffff", color: "#1a2e2b", borderRadius: "16px", maxWidth: "720px", width: "100%", maxHeight: "85vh", overflowY: "auto", padding: "2rem", fontFamily: "Ubuntu, sans-serif" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "2px solid #e0eeea", paddingBottom: "0.75rem" }}>
              <h2 style={{ margin: 0, color: "#1B6960", fontSize: "1.4rem" }}>Terms & Conditions — {legalOwner}</h2>
              <button onClick={() => setShowTermsModal(false)} style={{ background: "#e8f3f1", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontWeight: "700" }}>✕</button>
            </div>
            <div style={{ fontSize: "0.92rem", lineHeight: "1.6", color: "#333", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p>Welcome to <strong>{brandName}</strong>, a tourism technology platform operated by <strong>{legalOwner}</strong> (Registered Address: Plot 10444, Great East Road, Rhodes Park, Lusaka, Zambia • Tel: +260573506598 • info@lamtoninvestments.com).</p>
              <h4 style={{ margin: 0, color: "#1B6960" }}>1. Commercial Terms & Platform Use</h4>
              <p>By accessing {brandName} and purchasing any {passLabel} or booking partner experiences, you agree to comply with all applicable tourism regulations, park wildlife policies, and verified provider booking rules.</p>
              <h4 style={{ margin: 0, color: "#1B6960" }}>2. Membership Pass & Digital QR Codes</h4>
              <p>All issued {passLabel} memberships provide authenticated benefits across verified partner lodges, safaris, and transport operators. Dynamic QR code tokens refresh periodically for anti-fraud security and are non-transferable.</p>
              <h4 style={{ margin: 0, color: "#1B6960" }}>3. Invoicing, Payments & Settlement</h4>
              <p>Commercial transactions and invoices (ZR-INV-...) are administered under {legalOwner}. Refunds and cancellations are governed by individual partner policies and statutory consumer rights.</p>
            </div>
            <div style={{ marginTop: "2rem", textAlign: "right" }}>
              <button onClick={() => setShowTermsModal(false)} style={{ background: "#1B6960", color: "#ffffff", border: "none", padding: "0.6rem 1.4rem", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>I Understand & Agree</button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setShowPrivacyModal(false)}>
          <div style={{ background: "#ffffff", color: "#1a2e2b", borderRadius: "16px", maxWidth: "720px", width: "100%", maxHeight: "85vh", overflowY: "auto", padding: "2rem", fontFamily: "Ubuntu, sans-serif" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "2px solid #e0eeea", paddingBottom: "0.75rem" }}>
              <h2 style={{ margin: 0, color: "#1B6960", fontSize: "1.4rem" }}>Privacy Policy — {legalOwner}</h2>
              <button onClick={() => setShowPrivacyModal(false)} style={{ background: "#e8f3f1", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontWeight: "700" }}>✕</button>
            </div>
            <div style={{ fontSize: "0.92rem", lineHeight: "1.6", color: "#333", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p>At <strong>{brandName}</strong> and <strong>{legalOwner}</strong>, your data privacy and digital safety are fundamental priorities.</p>
              <h4 style={{ margin: 0, color: "#1B6960" }}>1. Information We Collect</h4>
              <p>We collect essential traveler profile details, offline itinerary preferences, and digital pass verification tokens required to execute verified tourism bookings and deliver QR discounts.</p>
              <h4 style={{ margin: 0, color: "#1B6960" }}>2. Offline-First Security & Encryption</h4>
              <p>Downloaded offline trail packs and digital passes are stored securely on your local device. We never sell your personal data or share payment credentials with unauthorized third parties.</p>
              <h4 style={{ margin: 0, color: "#1B6960" }}>3. Contact & Inquiries</h4>
              <p>For any privacy inquiries or account data requests, contact our Data Protection Officer at <strong>info@lamtoninvestments.com</strong> or call <strong>+260573506598</strong>.</p>
            </div>
            <div style={{ marginTop: "2rem", textAlign: "right" }}>
              <button onClick={() => setShowPrivacyModal(false)} style={{ background: "#1B6960", color: "#ffffff", border: "none", padding: "0.6rem 1.4rem", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React from "react";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { VisitPngLogo } from "../components/VisitPngEmblem";

export const metadata = {
  title: "Terms of Service | VisitPNG - Land of a Million Journeys",
  description: "Terms and Conditions of Use for VisitPNG web and mobile application, operated by VisitPNG Tourism Services Ltd.",
};

export default function TermsOfServicePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fbfb", color: "#1a2e2b", fontFamily: "Ubuntu, sans-serif" }}>
      {/* Header Bar */}
      <header style={{ background: "#0D2B27", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", color: "#ffffff" }}>
          <VisitPngLogo size="small" showTagline={false} />
        </Link>
        <Link href="/" style={{ color: "#E2E8F0", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600", padding: "0.5rem 1rem", borderRadius: "6px", background: "rgba(255,255,255,0.08)" }}>
          ← Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: "920px", width: "100%", margin: "2.5rem auto", padding: "0 1.5rem" }}>
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "3rem 2.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #e2ece9" }}>
          
          <div style={{ display: "inline-block", background: "#fef3c7", color: "#b45309", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "1rem" }}>
            Terms & Conditions
          </div>

          <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0D2B27", marginBottom: "0.5rem", lineHeight: "1.2" }}>
            Terms of Service
          </h1>
          <p style={{ color: "#718096", fontSize: "0.95rem", marginBottom: "2rem", borderBottom: "1px solid #edf2f7", paddingBottom: "1rem" }}>
            Effective Date: <strong>August 30, 2026</strong>
          </p>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>1. Acceptance of Terms</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              By accessing or using the <strong>VisitPNG mobile app</strong> or website at <a href="https://visitpng.com" style={{ color: "#EA580C", fontWeight: "600" }}>https://visitpng.com</a>, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>2. Use of the Platform</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              VisitPNG provides curated travel guides, destination directories, cultural festival calendars, statutory permit portals, and accommodation listings across Papua New Guinea&apos;s 22 provinces. You agree to use the platform in compliance with all applicable local, national, and international laws.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>3. Contact & Inquiries</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              For legal inquiries regarding these terms, please contact <strong>VisitPNG Tourism Services Ltd</strong> at <a href="mailto:info@visitpng.com" style={{ color: "#EA580C", fontWeight: "700" }}>info@visitpng.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer countryCode="PNG" brandName="VisitPNG" />
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Footer } from "../components/Footer";

export const metadata = {
  title: "Terms of Service | ZamRoam - Explore Zambia",
  description: "Terms and Conditions of Use for ZamRoam web and mobile application, operated by Lamton Investments Ltd.",
};

export default function TermsOfServicePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fbfb", color: "#1a2e2b", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Header Bar */}
      <header style={{ background: "#0D2B27", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", color: "#ffffff" }}>
          <img src="/icons/mobile_app.png" alt="ZamRoam Logo" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
          <div>
            <div style={{ fontSize: "1.3rem", fontWeight: "800", letterSpacing: "-0.5px", color: "#ffffff" }}>ZamRoam</div>
            <div style={{ fontSize: "0.75rem", color: "#68d391", fontWeight: "600" }}>Explore Zambia</div>
          </div>
        </Link>
        <Link href="/" style={{ color: "#E2E8F0", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600", padding: "0.5rem 1rem", borderRadius: "6px", background: "rgba(255,255,255,0.08)" }}>
          ← Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: "920px", width: "100%", margin: "2.5rem auto", padding: "0 1.5rem" }}>
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "3rem 2.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #e2ece9" }}>
          
          <div style={{ display: "inline-block", background: "#e6f4f1", color: "#1B6960", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "1rem" }}>
            Terms & Conditions
          </div>

          <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0D2B27", marginBottom: "0.5rem", lineHeight: "1.2" }}>
            Terms of Service
          </h1>
          <p style={{ color: "#718096", fontSize: "0.95rem", marginBottom: "2rem", borderBottom: "1px solid #edf2f7", paddingBottom: "1rem" }}>
            Effective Date: <strong>August 24, 2026</strong>
          </p>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>1. Acceptance of Terms</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              By accessing or using the <strong>ZamRoam mobile app</strong> or website at <a href="https://zamroam.com" style={{ color: "#1B6960", fontWeight: "600" }}>https://zamroam.com</a>, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>2. Use of the Platform</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              ZamRoam provides curated travel guides, destination information, wildlife safari directories, and accommodation listings across Zambia. You agree to use the platform in compliance with all applicable local, national, and international laws.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>3. Contact & Inquiries</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              For legal inquiries regarding these terms, please contact <strong>Lamton Investments Limited</strong> at <a href="mailto:info@lamtoninvestments.com" style={{ color: "#1B6960", fontWeight: "700" }}>info@lamtoninvestments.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer countryCode="ZMB" brandName="ZamRoam" />
    </div>
  );
}

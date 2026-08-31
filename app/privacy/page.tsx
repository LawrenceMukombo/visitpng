import React from "react";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { VisitPngLogo } from "../components/VisitPngEmblem";

export const metadata = {
  title: "Privacy Policy | VisitPNG - Official Tourism Platform of Papua New Guinea",
  description: "Official Privacy Policy and Data Safety disclosures for the VisitPNG web and Android mobile application, operated by VisitPNG Tourism Services Ltd.",
};

export default function PrivacyPolicyPage() {
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
          
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#fef3c7", color: "#b45309", padding: "0.35rem 0.85rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "1rem" }}>
            <span>🛡️</span>
            <span>Google Play & Global Data Safety Compliant</span>
          </div>

          <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0D2B27", marginBottom: "0.5rem", lineHeight: "1.2" }}>
            Privacy Policy & Data Safety Disclosures
          </h1>
          <p style={{ color: "#718096", fontSize: "0.95rem", marginBottom: "2rem", borderBottom: "1px solid #edf2f7", paddingBottom: "1rem" }}>
            Effective Date: <strong>August 31, 2026</strong> | Last Reviewed: <strong>August 31, 2026</strong>
          </p>

          {/* 1. Introduction */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>1. Introduction & Scope</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              Welcome to <strong>VisitPNG</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), the official digital tourism and travel companion platform for Papua New Guinea, operated by <strong>VisitPNG Tourism Services Ltd</strong> (registered in Port Moresby, Papua New Guinea).
            </p>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              This Privacy Policy applies to our <strong>VisitPNG Android application</strong> distributed on Google Play (Package: <code>com.visitpng.travel</code>) and our web services accessible at <a href="https://visitpng.lamtoninvestments.com" style={{ color: "#EA580C", fontWeight: "600" }}>https://visitpng.lamtoninvestments.com</a>. It details how we collect, store, utilize, protect, and delete personal information in strict compliance with the <strong>Google Play Developer Distribution Agreement</strong>, the <strong>General Data Protection Regulation (GDPR)</strong>, and the <strong>Digital Government & Data Protection Laws of Papua New Guinea</strong>.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>2. Information We Collect & Why</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              We adhere to the principle of data minimization. We only collect data essential for delivering verified tourism information, safe navigation, and authorized travel services across PNG&apos;s 22 provinces:
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#4a5568" }}>
              <li>
                <strong>Location Data (Foreground Only):</strong> With your explicit runtime permission, the app accesses your device&apos;s approximate or precise GPS location solely to display nearby provincial attractions, calculate travel distances, plot Kokoda Track waypoints, and center the interactive GIS map. <em>We do not track your location in the background when the app is closed.</em>
              </li>
              <li>
                <strong>Account & Profile Information:</strong> When you voluntarily register an account or create a traveler profile, we collect your name, email address, phone number, and preferred display currency.
              </li>
              <li>
                <strong>Travel Wishlists & Itineraries:</strong> User-created itineraries, saved stays, offline expedition packs, and offline-cached emergency guides stored locally on your device for low-connectivity highland/island travel.
              </li>
              <li>
                <strong>Technical & Diagnostic Data:</strong> Device model, operating system version, crash reports, and anonymized performance metrics to ensure app stability and optimize battery usage.
              </li>
            </ul>
          </section>

          {/* 3. Permissions Requested */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>3. Device Permissions & Purpose</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem", color: "#4a5568", marginBottom: "1rem" }}>
                <thead>
                  <tr style={{ background: "#F1F5F9", textAlign: "left" }}>
                    <th style={{ padding: "10px", border: "1px solid #E2E8F0" }}>Permission</th>
                    <th style={{ padding: "10px", border: "1px solid #E2E8F0" }}>Required / Optional</th>
                    <th style={{ padding: "10px", border: "1px solid #E2E8F0" }}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #E2E8F0" }}><code>ACCESS_FINE_LOCATION</code></td>
                    <td style={{ padding: "10px", border: "1px solid #E2E8F0" }}>Optional</td>
                    <td style={{ padding: "10px", border: "1px solid #E2E8F0" }}>Locate nearby lodges, airstrips, and cultural festival grounds on the interactive map.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #E2E8F0" }}><code>INTERNET & ACCESS_NETWORK_STATE</code></td>
                    <td style={{ padding: "10px", border: "1px solid #E2E8F0" }}>Required</td>
                    <td style={{ padding: "10px", border: "1px solid #E2E8F0" }}>Fetch live destination details, Wantok AI concierge responses, and sync cached offline guides.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #E2E8F0" }}><code>POST_NOTIFICATIONS</code></td>
                    <td style={{ padding: "10px", border: "1px solid #E2E8F0" }}>Optional</td>
                    <td style={{ padding: "10px", border: "1px solid #E2E8F0" }}>Deliver cultural festival reminders, weather updates, and SafeTravel alerts.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Payment Security & Data Sharing */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>4. Payment Security & Third-Party Services</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              <strong>Zero Card Data Storage:</strong> VisitPNG does not process, store, or transmit raw credit card numbers or banking passwords on our servers. All booking settlements and digital pass purchases are handled directly through certified, PCI-DSS Level 1 compliant gateways (PayPal and regulated PGK Mobile Money providers).
            </p>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              <strong>No Sale of Personal Data:</strong> We never sell, rent, or trade your personal information to third-party data brokers or advertisers under any circumstances.
            </p>
          </section>

          {/* 5. Data Retention & User Deletion Rights */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>5. Data Retention & Account Deletion (Google Play Compliance)</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              You retain full control over your personal data at all times. In compliance with Google Play&apos;s Account Deletion Requirement:
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#4a5568", marginBottom: "0.8rem" }}>
              <li><strong>In-App Deletion:</strong> You can delete your account, saved wishlists, and travel records directly inside the app under <em>Profile &gt; Settings &gt; Delete Account</em>.</li>
              <li><strong>Web Deletion Request:</strong> You can submit an account and data deletion request at any time by emailing our Data Protection Officer at <a href="mailto:privacy@visitpng.com" style={{ color: "#EA580C", fontWeight: "600" }}>privacy@visitpng.com</a> with the subject &quot;Account Deletion Request&quot;. Requests are processed within 48 hours.</li>
            </ul>
          </section>

          {/* 6. Children's Privacy */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>6. Children&apos;s Privacy</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              VisitPNG is a general audience travel application intended for individuals aged 13 and older (or 16 in certain jurisdictions). We do not knowingly collect personal identifiable information from children under the age of 13. If you believe a minor has provided us with personal data, please contact us immediately for prompt deletion.
            </p>
          </section>

          {/* 7. Security Standards */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>7. Security Safeguards</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              All network communications between your device and VisitPNG servers are encrypted using industry-standard <strong>Transport Layer Security (TLS 1.3 / HTTPS)</strong>. Administrative controls, encrypted databases, and role-based access restrictions protect your information from unauthorized access, loss, or alteration.
            </p>
          </section>

          {/* 8. Contact Information */}
          <section style={{ background: "#F8FAFC", padding: "1.5rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0D2B27", marginBottom: "0.5rem" }}>8. Contact Our Data Protection Officer</h2>
            <p style={{ lineHeight: "1.6", color: "#4a5568", marginBottom: "0.6rem" }}>
              If you have any questions, concerns, or data requests regarding this Privacy Policy, please contact us:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.92rem", color: "#334155" }}>
              <span>🏢 <strong>VisitPNG (Developed by LanFrame)</strong></span>
              <span>📍 National Capital District, Port Moresby, Papua New Guinea</span>
              <span>✉️ Email: <a href="mailto:privacy@visitpng.com" style={{ color: "#EA580C", fontWeight: "600" }}>privacy@visitpng.com</a> / <a href="mailto:info@visitpng.com" style={{ color: "#EA580C", fontWeight: "600" }}>info@visitpng.com</a></span>
              <span>📞 Hotline: <strong>+675 321 4188</strong></span>
              <span>🌐 Web: <a href="https://visitpng.lamtoninvestments.com/privacy" style={{ color: "#EA580C", fontWeight: "600" }}>https://visitpng.lamtoninvestments.com/privacy</a></span>
            </div>
          </section>

        </div>
      </main>

      <Footer countryCode="PNG" brandName="VisitPNG" />
    </div>
  );
}

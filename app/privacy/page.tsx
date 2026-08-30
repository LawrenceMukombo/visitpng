import React from "react";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { VisitPngLogo } from "../components/VisitPngEmblem";

export const metadata = {
  title: "Privacy Policy | VisitPNG - Land of a Million Journeys",
  description: "Official Privacy Policy for VisitPNG web and mobile application, operated by VisitPNG Tourism Services Ltd.",
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
          
          <div style={{ display: "inline-block", background: "#fef3c7", color: "#b45309", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "1rem" }}>
            Official Legal Policy
          </div>

          <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0D2B27", marginBottom: "0.5rem", lineHeight: "1.2" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#718096", fontSize: "0.95rem", marginBottom: "2rem", borderBottom: "1px solid #edf2f7", paddingBottom: "1rem" }}>
            Effective Date: <strong>August 30, 2026</strong> | Last Updated: <strong>August 30, 2026</strong>
          </p>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>1. Introduction & Overview</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              Welcome to <strong>VisitPNG</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operated by <strong>VisitPNG Tourism Services Ltd</strong>, registered under the laws of Papua New Guinea. VisitPNG is committed to protecting the privacy, confidentiality, and security of our users (&quot;you&quot; or &quot;traveler&quot;).
            </p>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              This Privacy Policy applies to the <strong>VisitPNG mobile application</strong> on Google Play & App Store and our web platform at <a href="https://visitpng.com" style={{ color: "#EA580C", fontWeight: "600" }}>https://visitpng.com</a>. It describes how we collect, store, process, protect, and handle your information in full compliance with the <strong>Papua New Guinea Data Protection & Digital Government Framework</strong>, <strong>GDPR</strong>, and <strong>Google Play Developer Policies</strong>.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#EA580C", marginBottom: "0.75rem" }}>2. Information We Collect</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              We only collect data that is strictly necessary to deliver, enhance, and secure your travel experience:
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#4a5568" }}>
              <li><strong>Account & Contact Information:</strong> When you register an account, request a booking, or contact support, we may collect your full name, email address, and phone number.</li>
              <li><strong>Location Data (Optional):</strong> With your explicit runtime permission, we use approximate or precise GPS coordinates to show nearby attractions, eco-lodges, sing-sing festivals, and provide interactive map navigation. We do not track your location in the background when the app is closed.</li>
              <li><strong>Saved Preferences & Wishlists:</strong> Information regarding your saved destinations, itinerary notes, and bookmarks stored securely with offline cache availability.</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer countryCode="PNG" brandName="VisitPNG" />
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Footer } from "../components/Footer";

export const metadata = {
  title: "Privacy Policy | ZamRoam - Explore Zambia",
  description: "Official Privacy Policy for ZamRoam web and mobile application, operated by Lamton Investments Ltd.",
};

export default function PrivacyPolicyPage() {
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
            Official Legal Policy
          </div>

          <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0D2B27", marginBottom: "0.5rem", lineHeight: "1.2" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#718096", fontSize: "0.95rem", marginBottom: "2rem", borderBottom: "1px solid #edf2f7", paddingBottom: "1rem" }}>
            Effective Date: <strong>August 24, 2026</strong> | Last Updated: <strong>August 24, 2026</strong>
          </p>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>1. Introduction & Overview</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              Welcome to <strong>ZamRoam</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operated by <strong>Lamton Investments Limited</strong>, registered under the laws of Zambia. ZamRoam is committed to protecting the privacy, confidentiality, and security of our users (&quot;you&quot; or &quot;traveler&quot;).
            </p>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              This Privacy Policy applies to the <strong>ZamRoam mobile application</strong> on Google Play and our web platform at <a href="https://zamroam.com" style={{ color: "#1B6960", fontWeight: "600" }}>https://zamroam.com</a>. It describes how we collect, store, process, protect, and handle your information in full compliance with the <strong>Zambia Data Protection Act No. 3 of 2021</strong>, the <strong>General Data Protection Regulation (GDPR)</strong>, and <strong>Google Play Developer Policies</strong>.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>2. Information We Collect</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              We only collect data that is strictly necessary to deliver, enhance, and secure your travel experience:
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#4a5568" }}>
              <li><strong>Account & Contact Information:</strong> When you register an account, request a booking, or contact support, we may collect your full name, email address, and phone number.</li>
              <li><strong>Location Data (Optional):</strong> With your explicit runtime permission, we use approximate or precise GPS coordinates to show nearby safari attractions, lodges, cultural ceremonies, and provide interactive navigation. We do not track your location in the background when the app is closed.</li>
              <li><strong>Saved Preferences & Wishlists:</strong> Information regarding your saved destinations, itinerary notes, and bookmarks.</li>
              <li><strong>Device & Technical Diagnostics:</strong> Standard technical information such as device model, operating system version, app version, and crash logs to troubleshoot errors and optimize performance.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>3. How We Use Your Information</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              We use your data solely for the following legitimate purposes:
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#4a5568" }}>
              <li>To provide, operate, and maintain the ZamRoam platform and interactive travel guides.</li>
              <li>To facilitate reservations, inquiries, and communication between you and verified local tourism providers.</li>
              <li>To display personalized location-based recommendations and distance calculations.</li>
              <li>To detect, prevent, and address security incidents or fraudulent activity.</li>
              <li>To fulfill statutory requirements under the laws of Zambia.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>4. Data Sharing & Third-Party Disclosure</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              <strong>We do NOT sell, rent, monetize, or trade your personal information to third parties or advertisers.</strong>
            </p>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              We may only share information with:
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#4a5568" }}>
              <li><strong>Verified Service Providers:</strong> Local lodges, tour operators, or safari guides that you explicitly choose to book with.</li>
              <li><strong>Cloud & Infrastructure Partners:</strong> Secure hosting and database providers operating under strict data confidentiality agreements.</li>
              <li><strong>Legal Authorities:</strong> Only when required by law, subpoena, or statutory regulation.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>5. Data Security & Encryption</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              All communications between the ZamRoam app and our servers are encrypted in transit using industry-standard <strong>Transport Layer Security (TLS 1.3 / HTTPS)</strong>. Database storage is protected using encrypted volumes, strict role-based access controls, and regular vulnerability audits.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>6. Your Rights & Data Deletion</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.8rem" }}>
              Under applicable data protection laws, you have the right to:
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#4a5568" }}>
              <li>Access and receive a copy of your personal data held by ZamRoam.</li>
              <li>Request correction of any inaccurate or incomplete personal records.</li>
              <li><strong>Request complete deletion of your account and associated personal data.</strong></li>
            </ul>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginTop: "0.8rem" }}>
              To request account deletion or data export, you can either use the in-app profile settings or send an email to <a href="mailto:info@lamtoninvestments.com" style={{ color: "#1B6960", fontWeight: "700" }}>info@lamtoninvestments.com</a>. Requests are processed within 48 hours.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.75rem" }}>7. Children&apos;s Privacy</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568" }}>
              ZamRoam is intended for general audiences and travelers aged 13 and above. We do not knowingly collect or solicit personal data from children under the age of 13.
            </p>
          </section>

          <section style={{ marginBottom: "1rem", background: "#f0f8f7", padding: "1.5rem", borderRadius: "12px", border: "1px solid #d1e7e4" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1B6960", marginBottom: "0.5rem" }}>8. Contact Us & Data Protection Officer</h2>
            <p style={{ lineHeight: "1.7", color: "#4a5568", marginBottom: "0.5rem" }}>
              If you have questions, concerns, or requests regarding this Privacy Policy, please contact our Data Protection Team:
            </p>
            <div style={{ color: "#2d3748", lineHeight: "1.6", fontSize: "0.95rem" }}>
              <div><strong>Operating Entity:</strong> Lamton Investments Limited</div>
              <div><strong>Platform:</strong> ZamRoam — Explore Zambia</div>
              <div><strong>Email:</strong> <a href="mailto:info@lamtoninvestments.com" style={{ color: "#1B6960", fontWeight: "700" }}>info@lamtoninvestments.com</a></div>
              <div><strong>Phone:</strong> +260 573 506 598</div>
              <div><strong>Headquarters:</strong> Lusaka, Zambia</div>
              <div><strong>Website:</strong> <a href="https://zamroam.com" target="_blank" rel="noreferrer" style={{ color: "#1B6960", fontWeight: "700" }}>https://zamroam.com</a></div>
            </div>
          </section>

        </div>
      </main>

      <Footer countryCode="ZMB" brandName="ZamRoam" />
    </div>
  );
}

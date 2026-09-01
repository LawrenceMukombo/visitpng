"use client";
import React from "react";

export interface AboutPageProps {
  countryCode?: string;
  onClose?: () => void;
}

export function AboutPage({
  onClose
}: AboutPageProps) {
  const brandName = "Visit PNG";
  const developerName = "LanFrame";

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "2rem 1.5rem 4rem",
      fontFamily: "Ubuntu, sans-serif",
      color: "#1a2e2b"
    }}>
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "2.2rem" }}>🇵🇬</span>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "800", color: "#0D2B27" }}>
              {brandName}
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "0.95rem", color: "#EA580C", fontWeight: "600" }}>
              Connecting People to PNG · Your Digital Guide to Papua New Guinea
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
              color: "#0D2B27"
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Main Mission Card */}
      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "2.5rem",
        border: "1px solid #d8e8e4",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        marginBottom: "2.5rem",
        lineHeight: "1.7"
      }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0D2B27", margin: "0 0 1rem 0" }}>
          Connecting People to Papua New Guinea
        </h2>
        <p style={{ fontSize: "1.05rem", color: "#333", marginBottom: "1.2rem" }}>
          <strong>{brandName}</strong> is a locally developed mobile tourism platform designed to make exploring Papua New Guinea easier, more convenient, and more accessible.
        </p>
        <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "1.2rem" }}>
          We provide visitors, tourists, and locals with a digital travel pocket guide to discover accommodation, restaurants, attractions, tours, activities, events, and other tourism services across PNG — all in one place.
        </p>
        <p style={{ fontSize: "0.95rem", color: "#555" }}>
          At the same time, Visit PNG helps local businesses, hotels, restaurants, tour operators, small businesses, and tourism operators promote their services, reach new customers, and increase their online visibility.
        </p>
      </div>

      {/* What We Deliver Grid */}
      <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0D2B27", marginBottom: "1.25rem" }}>
        What We Deliver
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.25rem",
        marginBottom: "2.5rem"
      }}>
        <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>📍</div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0D2B27", margin: "0 0 0.4rem 0" }}>
            Discover
          </h3>
          <p style={{ fontSize: "0.88rem", color: "#475569", margin: 0, lineHeight: "1.5" }}>
            Find places to stay, eat, visit, and explore across all 22 provinces.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>🏨</div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0D2B27", margin: "0 0 0.4rem 0" }}>
            Accommodation
          </h3>
          <p style={{ fontSize: "0.88rem", color: "#475569", margin: 0, lineHeight: "1.5" }}>
            Connect visitors with verified hotels, safari lodges, island retreats, and community homestays.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>🍽️</div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0D2B27", margin: "0 0 0.4rem 0" }}>
            Dining
          </h3>
          <p style={{ fontSize: "0.88rem", color: "#475569", margin: 0, lineHeight: "1.5" }}>
            Discover restaurants, cafés, fresh food markets, and authentic local culinary experiences.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>🌿</div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0D2B27", margin: "0 0 0.4rem 0" }}>
            Experiences
          </h3>
          <p style={{ fontSize: "0.88rem", color: "#475569", margin: 0, lineHeight: "1.5" }}>
            Find attractions, trekking tours (Kokoda Track, Mt Wilhelm), Coral Triangle scuba diving, and cultural sing-sings.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>📣</div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0D2B27", margin: "0 0 0.4rem 0" }}>
            Business Promotion
          </h3>
          <p style={{ fontSize: "0.88rem", color: "#475569", margin: 0, lineHeight: "1.5" }}>
            Give PNG businesses a modern digital platform to showcase their products, offerings, and direct contact details.
          </p>
        </div>

        <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>🌏</div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0D2B27", margin: "0 0 0.4rem 0" }}>
            Tourism Connectivity
          </h3>
          <p style={{ fontSize: "0.88rem", color: "#475569", margin: 0, lineHeight: "1.5" }}>
            Connect travellers directly with local guides, transport operators, and community tourism experiences.
          </p>
        </div>
      </div>

      {/* Goal Summary Card */}
      <div style={{
        background: "linear-gradient(135deg, #0D2B27 0%, #164E44 100%)",
        color: "#ffffff",
        borderRadius: "14px",
        padding: "2rem 2.5rem",
        marginBottom: "2rem"
      }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#EA580C", margin: "0 0 0.75rem 0" }}>
          Our Goal
        </h3>
        <p style={{ margin: "0 0 1rem 0", fontSize: "1.02rem", lineHeight: "1.6", color: "#f1f5f9" }}>
          Our goal is simple: make it easier for people to discover PNG, while helping PNG businesses become more visible, accessible, and connected in the digital tourism space.
        </p>
        <p style={{ margin: 0, fontSize: "0.95rem", color: "#cbd5e1", fontStyle: "italic" }}>
          Visit PNG — Your Digital Guide to Papua New Guinea. 🇵🇬
        </p>
      </div>

      {/* Corporate & Developer Attribution Box */}
      <div style={{
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "1.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}>
        <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0D2B27" }}>
          Platform Development & Stewardship
        </div>
        <div style={{ fontSize: "0.88rem", color: "#475569", lineHeight: "1.6" }}>
          Visit PNG is proudly engineered and operated by <strong>{developerName}</strong> in Papua New Guinea.
        </div>
        <div style={{ fontSize: "0.82rem", color: "#64748b", borderTop: "1px solid #e2e8f0", paddingTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem 1.5rem" }}>
          <span>📍 Port Moresby, Papua New Guinea</span>
          <span>✉️ Contact: <a href="mailto:info@visitpng.com" style={{ color: "#EA580C", fontWeight: "600", textDecoration: "underline" }}>info@visitpng.com</a></span>
          <span>🌐 Web: <a href="https://visitpng.lamtoninvestments.com" style={{ color: "#EA580C", fontWeight: "600" }}>https://visitpng.lamtoninvestments.com</a></span>
        </div>
      </div>
    </div>
  );
}

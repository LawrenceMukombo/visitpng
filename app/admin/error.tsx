"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Portal Error:", error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#081c15",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "36px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
          <img
            src="/branding/visitpng_logo.png"
            alt="VisitPNG Logo"
            style={{ height: "64px", width: "auto", objectFit: "contain", borderRadius: "8px" }}
          />
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0D2B27", margin: "0 0 8px 0" }}>
          VISITPNG ADMINISTRATION
        </h2>
        <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 20px 0" }}>
          The administration portal encountered a temporary connection or session issue.
        </p>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "12px",
            color: "#475569",
            textAlign: "left",
            wordBreak: "break-word",
            marginBottom: "24px",
          }}
        >
          <strong>Notice:</strong> {error.message || "An unexpected error occurred while loading the control center."}
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "12px 20px",
              background: "#D96B27",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            🔄 Reload Portal
          </button>
          <a
            href="/signin?return_to=%2Fadmin"
            style={{
              padding: "12px 20px",
              background: "#0A4D3C",
              color: "#ffffff",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            🔐 Sign In Again
          </a>
          <Link
            href="/"
            style={{
              padding: "12px 20px",
              background: "#f1f5f9",
              color: "#334155",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Return to App
          </Link>
        </div>
      </div>
    </main>
  );
}

"use client";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ZamRoam runtime error caught:", error);
  }, [error]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D2B27",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        maxWidth: "440px",
        width: "100%",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "16px",
        padding: "32px 24px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
      }}>
        <div style={{ fontSize: "42px", marginBottom: "16px" }}>🇿🇲</div>
        <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "#ffffff" }}>
          Welcome to ZamRoam
        </h2>
        <p style={{ fontSize: "14px", color: "#a3cfc9", lineHeight: 1.5, margin: "0 0 24px" }}>
          Explore Zambia's national parks, safari lodges, and verified local tourism providers.
        </p>
        <button
          onClick={() => reset()}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
          }}
        >
          Explore Places
        </button>
      </div>
    </div>
  );
}

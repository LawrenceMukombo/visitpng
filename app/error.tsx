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
    console.error("VisitPNG runtime error caught:", error);
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
        <div style={{ fontSize: "42px", marginBottom: "16px" }}>🇵🇬</div>
        <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "#ffffff" }}>
          Welcome to VisitPNG
        </h2>
        <p style={{ fontSize: "14px", color: "#a3cfc9", lineHeight: 1.5, margin: "0 0 16px" }}>
          Explore Papua New Guinea&apos;s 22 provinces, Kokoda trekking expeditions, dive sanctuaries, and verified local tourism providers.
        </p>
        {error?.message && (
          <div style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "10px 14px",
            fontSize: "12px",
            color: "#fca5a5",
            textAlign: "left",
            wordBreak: "break-word",
            marginBottom: "20px"
          }}>
            <strong>Notice:</strong> {error.message}
          </div>
        )}
        <button
          onClick={() => reset()}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(234, 88, 12, 0.3)"
          }}
        >
          Explore Destinations
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { PNG_REGIONS, PNG_PROVINCES, PngRegion, PngProvinceData } from "../../db/pngGeography";

export interface ProvinceQuickNavigatorProps {
  selectedProvince?: string | null;
  onSelectProvince: (provinceCode: string | null, provinceName?: string) => void;
  onOpenMap?: () => void;
}

export function ProvinceQuickNavigator({
  selectedProvince,
  onSelectProvince,
  onOpenMap
}: ProvinceQuickNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<PngRegion | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const activeProvObj = PNG_PROVINCES.find(
    p => p.code.toLowerCase() === selectedProvince?.toLowerCase() ||
         p.name.toLowerCase() === selectedProvince?.toLowerCase() ||
         p.name.toLowerCase().includes(selectedProvince?.toLowerCase() || "___none___")
  );

  const filteredProvinces = PNG_PROVINCES.filter(prov => {
    const matchesRegion = activeRegion === "All" || prov.region === activeRegion;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesRegion;
    const matchesName = prov.name.toLowerCase().includes(q) || prov.capital.toLowerCase().includes(q) || prov.code.toLowerCase().includes(q);
    const matchesDistrict = prov.districts.some(d => 
      d.name.toLowerCase().includes(q) || d.keyDestinations.some(k => k.toLowerCase().includes(q))
    );
    return matchesRegion && (matchesName || matchesDistrict);
  });

  const getRegionEmoji = (region: PngRegion) => {
    switch (region) {
      case "Highlands": return "⛰️";
      case "Southern": return "🌿";
      case "Islands": return "🏝️";
      case "Momase": return "🐊";
      default: return "📍";
    }
  };

  const displayName = activeProvObj
    ? activeProvObj.name.replace(" Province", "").replace("District", "").trim()
    : "22 Provinces";

  return (
    <div className="provinceNavigatorWrapper" ref={dropdownRef} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      {/* Smart Trigger Button */}
      <button
        type="button"
        className="provTriggerBtn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Filter destination by province or region"
        style={{
          width: "auto",
          minWidth: "105px",
          height: "34px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          padding: "0 10px",
          borderRadius: "99px",
          background: activeProvObj ? "rgba(234, 88, 12, 0.28)" : "rgba(255, 255, 255, 0.14)",
          border: activeProvObj ? "1.5px solid #EA580C" : "1px solid rgba(255, 255, 255, 0.25)",
          color: "#ffffff",
          fontSize: "11.5px",
          fontWeight: 700,
          cursor: "pointer",
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          lineHeight: 1,
          transition: "all 0.2s ease"
        }}
      >
        <span style={{ fontSize: "12px", lineHeight: 1 }}>
          {activeProvObj ? getRegionEmoji(activeProvObj.region) : "📍"}
        </span>
        <span style={{ maxWidth: "85px", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1 }}>
          {displayName}
        </span>
        <span style={{ fontSize: "8px", opacity: 0.8, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", lineHeight: 1 }}>
          ▼
        </span>
      </button>

      {/* Floating Navigator Card */}
      {isOpen && (
        <div
          className="provinceDropdownCard"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            left: "auto",
            zIndex: 99999,
            width: "320px",
            maxWidth: "calc(100vw - 28px)",
            background: "#ffffff",
            color: "#1e293b",
            borderRadius: "16px",
            boxShadow: "0 16px 36px rgba(0,0,0,0.35)",
            border: "1px solid #e2e8f0",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            boxSizing: "border-box"
          }}
        >
          {/* Header & Quick Clear */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#032F2B", lineHeight: 1.2 }}>
                Explore 22 PNG Provinces
              </div>
              <div style={{ fontSize: "10.5px", color: "#64748b", lineHeight: 1.2, marginTop: "2px" }}>
                Filter across 4 national regions
              </div>
            </div>
            {activeProvObj && (
              <button
                type="button"
                onClick={() => {
                  onSelectProvince(null);
                  setIsOpen(false);
                }}
                style={{
                  width: "auto",
                  height: "auto",
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                Clear ✕
              </button>
            )}
          </div>

          {/* Quick Search */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search province, Kokoda, Goroka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "7px 10px 7px 28px",
                fontSize: "11.5px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                color: "#1e293b",
                outline: "none"
              }}
            />
            <span style={{ position: "absolute", left: "8px", top: "7px", fontSize: "11px", color: "#94a3b8" }}>
              🔍
            </span>
          </div>

          {/* 4 Regions Tab Switcher */}
          <div style={{ display: "flex", gap: "4px", overflowX: "auto", paddingBottom: "2px" }}>
            <button
              type="button"
              className="regionTabBtn"
              onClick={() => setActiveRegion("All")}
              style={{
                width: "auto",
                height: "auto",
                padding: "4px 9px",
                borderRadius: "20px",
                fontSize: "10.5px",
                fontWeight: activeRegion === "All" ? 800 : 600,
                background: activeRegion === "All" ? "#032F2B" : "#f1f5f9",
                color: activeRegion === "All" ? "#ffffff" : "#475569",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              All (22)
            </button>
            {PNG_REGIONS.map(reg => (
              <button
                key={reg.name}
                type="button"
                className="regionTabBtn"
                onClick={() => setActiveRegion(reg.name)}
                style={{
                  width: "auto",
                  height: "auto",
                  padding: "4px 9px",
                  borderRadius: "20px",
                  fontSize: "10.5px",
                  fontWeight: activeRegion === reg.name ? 800 : 600,
                  background: activeRegion === reg.name ? "#EA580C" : "#f1f5f9",
                  color: activeRegion === reg.name ? "#ffffff" : "#475569",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                {getRegionEmoji(reg.name)} {reg.name}
              </button>
            ))}
          </div>

          {/* Provinces List */}
          <div style={{ maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "3px" }}>
            {filteredProvinces.map((p: PngProvinceData) => {
              const isSelected = activeProvObj?.code === p.code;
              return (
                <button
                  key={p.code}
                  type="button"
                  className="provItemBtn"
                  onClick={() => {
                    onSelectProvince(p.name, p.name);
                    setIsOpen(false);
                  }}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "7px 9px",
                    borderRadius: "8px",
                    background: isSelected ? "#fff7ed" : "transparent",
                    border: isSelected ? "1px solid #fdba74" : "1px solid transparent",
                    color: isSelected ? "#c2410c" : "#1e293b",
                    textAlign: "left",
                    cursor: "pointer",
                    lineHeight: 1.3,
                    boxSizing: "border-box"
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1, paddingRight: "8px" }}>
                    <div style={{ fontWeight: isSelected ? 800 : 700, fontSize: "11.5px" }}>
                      {getRegionEmoji(p.region)} {p.name}
                    </div>
                    <div style={{ fontSize: "10px", color: "#64748b" }}>
                      Capital: {p.capital} · {p.region}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 700,
                      color: "#EA580C",
                      background: "rgba(234, 88, 12, 0.1)",
                      padding: "2px 5px",
                      borderRadius: "4px",
                      flexShrink: 0
                    }}
                  >
                    {p.code}
                  </span>
                </button>
              );
            })}
            {filteredProvinces.length === 0 && (
              <div style={{ textAlign: "center", padding: "14px", color: "#94a3b8", fontSize: "11px" }}>
                No matching provinces found.
              </div>
            )}
          </div>

          {/* Interactive Map Quick-Access Footer */}
          {onOpenMap && (
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "10.5px", color: "#64748b" }}>Topographic map?</span>
              <button
                type="button"
                onClick={() => {
                  onOpenMap();
                  setIsOpen(false);
                }}
                style={{
                  width: "auto",
                  height: "auto",
                  background: "linear-gradient(135deg, #032F2B 0%, #1B6960 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "7px",
                  padding: "5px 10px",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Open 22-Province Map 🗺️
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

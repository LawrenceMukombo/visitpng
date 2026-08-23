"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  ZAMBIA_AIRPORTS,
  ZAMBIA_AMENITIES,
  ZAMBIA_HIGHWAY_CORRIDORS,
  ZAMBIA_PROVINCIAL_CAPITALS,
  LUSAKA_NATIONAL_HQ,
  calculateDistanceBreakdown,
  getDestinationTransportGuide,
  type DestinationDistanceBreakdown,
  type DestinationTransportGuide,
  type ZambiaAirport,
  type ZambiaAmenity,
  type ZambiaHighwayCorridor
} from "../../db/zambiaTransportAmenities";
import { ZAMBIA_TOURISM_PINS, type MapDestinationPin } from "./ZambiaInteractiveMap";

interface ZambiaOsmMapProps {
  initialSelectedPin?: MapDestinationPin | null;
  onSelectDestination?: (slug: string) => void;
}

export type OsmBaseLayer = "standard" | "humanitarian" | "satellite";

export default function ZambiaOsmMap({
  initialSelectedPin,
  onSelectDestination
}: ZambiaOsmMapProps) {
  // Center coordinates (Center of Zambia)
  const [center, setCenter] = useState<{ lat: number; lon: number }>({
    lat: initialSelectedPin?.latitude ?? -14.2,
    lon: initialSelectedPin?.longitude ?? 27.8
  });
  const [zoom, setZoom] = useState<number>(6.5);
  const [baseLayer, setBaseLayer] = useState<OsmBaseLayer>("standard");

  // Selection states
  const [selectedPin, setSelectedPin] = useState<MapDestinationPin | null>(
    initialSelectedPin || ZAMBIA_TOURISM_PINS[0]
  );
  const [selectedAirport, setSelectedAirport] = useState<ZambiaAirport | null>(null);
  const [selectedAmenity, setSelectedAmenity] = useState<ZambiaAmenity | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<ZambiaHighwayCorridor | null>(null);

  // Layer toggles
  const [showDestinations, setShowDestinations] = useState<boolean>(true);
  const [showAirports, setShowAirports] = useState<boolean>(true);
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [showAmenities, setShowAmenities] = useState<boolean>(true);
  const [showProvincialHqs, setShowProvincialHqs] = useState<boolean>(true);

  // Search
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Map container width & height state to avoid accessing refs during render
  const [mapDimensions, setMapDimensions] = useState<{ width: number; height: number }>({
    width: 750,
    height: 620
  });

  // Dragging / Pan state for custom tile canvas
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mapViewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (mapViewportRef.current) {
        setMapDimensions({
          width: mapViewportRef.current.clientWidth || 750,
          height: 620
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Calculate dynamic distance breakdown for selected location
  const distanceBreakdown: DestinationDistanceBreakdown = useMemo(() => {
    const lat = selectedPin?.latitude ?? center.lat;
    const lon = selectedPin?.longitude ?? center.lon;
    const districtName = selectedPin?.districtName;
    const provinceName = selectedPin?.provinceName;
    return calculateDistanceBreakdown(lat, lon, districtName, provinceName);
  }, [selectedPin, center]);

  // Calculate dynamic transport guide
  const transportGuide: DestinationTransportGuide = useMemo(() => {
    const lat = selectedPin?.latitude ?? center.lat;
    const lon = selectedPin?.longitude ?? center.lon;
    const provinceName = selectedPin?.provinceName;
    return getDestinationTransportGuide(lat, lon, provinceName);
  }, [selectedPin, center]);

  // Filtered Pins
  const filteredPins = useMemo(() => {
    return ZAMBIA_TOURISM_PINS.filter((pin) => {
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matches =
          pin.name.toLowerCase().includes(term) ||
          pin.provinceName.toLowerCase().includes(term) ||
          (pin.districtName && pin.districtName.toLowerCase().includes(term)) ||
          pin.summary.toLowerCase().includes(term);
        if (!matches) return false;
      }
      return true;
    });
  }, [searchTerm]);

  // Coordinate Conversion Helper: Lat/Lon -> Pixel coordinates relative to center
  const projectToPixels = useCallback(
    (lat: number, lon: number) => {
      const { width: viewportWidth, height: viewportHeight } = mapDimensions;
      const scale = 256 * Math.pow(2, zoom);
      const centerX = ((center.lon + 180) / 360) * scale;
      const centerY =
        ((1 -
          Math.log(
            Math.tan((center.lat * Math.PI) / 180) + 1 / Math.cos((center.lat * Math.PI) / 180)
          ) /
            Math.PI) /
          2) *
        scale;

      const pointX = ((lon + 180) / 360) * scale;
      const pointY =
        ((1 -
          Math.log(
            Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
          ) /
            Math.PI) /
          2) *
        scale;

      return {
        x: viewportWidth / 2 + (pointX - centerX),
        y: viewportHeight / 2 + (pointY - centerY)
      };
    },
    [center, zoom, mapDimensions]
  );

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(13, prev + 0.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(5, prev - 0.5));

  // Center on specific pin
  const handleSelectPin = (pin: MapDestinationPin) => {
    setSelectedPin(pin);
    setSelectedAirport(null);
    setSelectedAmenity(null);
    setSelectedRoute(null);
    setCenter({ lat: pin.latitude, lon: pin.longitude });
  };

  // Handle Drag / Pan Events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragStart({ x: e.clientX, y: e.clientY });

    // Convert pixel delta to lat/lon delta based on zoom
    const scale = 256 * Math.pow(2, zoom);
    const dLon = (-dx / scale) * 360;
    const dLat = (dy / scale) * 180;

    setCenter((prev) => ({
      lat: Math.max(-18.5, Math.min(-8.0, prev.lat + dLat)),
      lon: Math.max(21.5, Math.min(34.0, prev.lon + dLon))
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch Support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });

    const scale = 256 * Math.pow(2, zoom);
    const dLon = (-dx / scale) * 360;
    const dLat = (dy / scale) * 180;

    setCenter((prev) => ({
      lat: Math.max(-18.5, Math.min(-8.0, prev.lat + dLat)),
      lon: Math.max(21.5, Math.min(34.0, prev.lon + dLon))
    }));
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Compute OSM Tiles to render in viewport
  const tiles = useMemo(() => {
    const intZoom = Math.floor(zoom);
    const scale = 256 * Math.pow(2, intZoom);

    // Center tile coords
    const centerTileX = Math.floor(((center.lon + 180) / 360) * Math.pow(2, intZoom));
    const centerTileY = Math.floor(
      ((1 -
        Math.log(
          Math.tan((center.lat * Math.PI) / 180) + 1 / Math.cos((center.lat * Math.PI) / 180)
        ) /
          Math.PI) /
        2) *
        Math.pow(2, intZoom)
    );

    const tileList: { x: number; y: number; z: number; key: string }[] = [];
    const radius = 3; // 7x7 grid of tiles

    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const tx = centerTileX + dx;
        const ty = centerTileY + dy;
        const maxTiles = Math.pow(2, intZoom);
        if (tx >= 0 && tx < maxTiles && ty >= 0 && ty < maxTiles) {
          tileList.push({
            x: tx,
            y: ty,
            z: intZoom,
            key: `${intZoom}-${tx}-${ty}`
          });
        }
      }
    }
    return { tileList, intZoom, scale };
  }, [center, zoom]);

  // Tile URL resolver
  const getTileUrl = (x: number, y: number, z: number) => {
    if (baseLayer === "humanitarian") {
      const subdomains = ["a", "b", "c"];
      const s = subdomains[(x + y) % subdomains.length];
      return `https://${s}.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png`;
    }
    if (baseLayer === "satellite") {
      return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
    }
    // Standard OSM
    const subdomains = ["a", "b", "c"];
    const s = subdomains[(x + y) % subdomains.length];
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        fontFamily: "inherit"
      }}
    >
      {/* Map Control Bar: Layers, Search & Category Filters */}
      <div
        style={{
          background: "rgba(10, 32, 32, 0.95)",
          borderRadius: "14px",
          border: "1px solid rgba(37, 211, 102, 0.25)",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
        }}
      >
        {/* Left: Layer Selectors */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#34D399", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            🗺️ OSM Base:
          </span>
          <button
            type="button"
            onClick={() => setBaseLayer("standard")}
            style={{
              background: baseLayer === "standard" ? "var(--brand-deep-teal, #0d3838)" : "rgba(255,255,255,0.06)",
              border: baseLayer === "standard" ? "1.5px solid #10b981" : "1px solid rgba(255,255,255,0.12)",
              color: baseLayer === "standard" ? "#fff" : "#cbd5e1",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "11.5px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            OSM Standard
          </button>
          <button
            type="button"
            onClick={() => setBaseLayer("humanitarian")}
            style={{
              background: baseLayer === "humanitarian" ? "var(--brand-deep-teal, #0d3838)" : "rgba(255,255,255,0.06)",
              border: baseLayer === "humanitarian" ? "1.5px solid #10b981" : "1px solid rgba(255,255,255,0.12)",
              color: baseLayer === "humanitarian" ? "#fff" : "#cbd5e1",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "11.5px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            🌿 Topo / Outdoors
          </button>
          <button
            type="button"
            onClick={() => setBaseLayer("satellite")}
            style={{
              background: baseLayer === "satellite" ? "var(--brand-deep-teal, #0d3838)" : "rgba(255,255,255,0.06)",
              border: baseLayer === "satellite" ? "1.5px solid #10b981" : "1px solid rgba(255,255,255,0.12)",
              color: baseLayer === "satellite" ? "#fff" : "#cbd5e1",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "11.5px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            🛰️ Satellite Hybrid
          </button>
        </div>

        {/* Center: Overlays Toggle (Routes, Airports, Amenities) */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setShowDestinations((v) => !v)}
            style={{
              background: showDestinations ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.04)",
              border: showDestinations ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.1)",
              color: showDestinations ? "#a7f3d0" : "#94a3b8",
              padding: "5px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            📍 Places ({filteredPins.length})
          </button>
          <button
            type="button"
            onClick={() => setShowRoutes((v) => !v)}
            style={{
              background: showRoutes ? "rgba(250, 204, 21, 0.2)" : "rgba(255,255,255,0.04)",
              border: showRoutes ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.1)",
              color: showRoutes ? "#fef08a" : "#94a3b8",
              padding: "5px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            🛣️ Highways ({ZAMBIA_HIGHWAY_CORRIDORS.length})
          </button>
          <button
            type="button"
            onClick={() => setShowAirports((v) => !v)}
            style={{
              background: showAirports ? "rgba(56, 189, 248, 0.2)" : "rgba(255,255,255,0.04)",
              border: showAirports ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
              color: showAirports ? "#bae6fd" : "#94a3b8",
              padding: "5px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            ✈️ Airstrips ({ZAMBIA_AIRPORTS.length})
          </button>
          <button
            type="button"
            onClick={() => setShowAmenities((v) => !v)}
            style={{
              background: showAmenities ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.04)",
              border: showAmenities ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.1)",
              color: showAmenities ? "#a7f3d0" : "#94a3b8",
              padding: "5px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            ⛽ Amenities ({ZAMBIA_AMENITIES.length})
          </button>
          <button
            type="button"
            onClick={() => setShowProvincialHqs((v) => !v)}
            style={{
              background: showProvincialHqs ? "rgba(245, 158, 11, 0.2)" : "rgba(255,255,255,0.04)",
              border: showProvincialHqs ? "1px solid #f59e0b" : "1px solid rgba(255,255,255,0.1)",
              color: showProvincialHqs ? "#fde68a" : "#94a3b8",
              padding: "5px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            🏛️ Capitals
          </button>
        </div>

        {/* Right: Quick Search */}
        <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.08)", borderRadius: "8px", padding: "5px 10px", border: "1px solid rgba(255,255,255,0.15)" }}>
          <span style={{ marginRight: "6px", fontSize: "13px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search destination, airport, or amenity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "12px",
              width: "200px"
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "14px" }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Interactive Map + Distance & Amenities Inspector */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "16px",
          alignItems: "start"
        }}
        className="zambiaOsmGrid"
      >
        {/* Left Column: OpenStreetMap Canvas & Interactive Markers */}
        <div
          style={{
            position: "relative",
            height: "620px",
            background: "#0d201d",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(37, 211, 102, 0.3)",
            boxShadow: "0 16px 36px rgba(0,0,0,0.6)",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none"
          }}
          ref={mapViewportRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Tile Layer Container */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none"
            }}
          >
            {tiles.tileList.map((t) => {
              const tileScale = 256 * Math.pow(2, zoom);
              const centerX = ((center.lon + 180) / 360) * tileScale;
              const centerY =
                ((1 -
                  Math.log(
                    Math.tan((center.lat * Math.PI) / 180) + 1 / Math.cos((center.lat * Math.PI) / 180)
                  ) /
                    Math.PI) /
                  2) *
                tileScale;

              const tileX = (t.x / Math.pow(2, t.z)) * tileScale;
              const tileY = (t.y / Math.pow(2, t.z)) * tileScale;

              const left = mapDimensions.width / 2 + (tileX - centerX);
              const top = 310 + (tileY - centerY);

              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={t.key}
                  src={getTileUrl(t.x, t.y, t.z)}
                  alt="OSM Tile"
                  style={{
                    position: "absolute",
                    left: `${left}px`,
                    top: `${top}px`,
                    width: `${256 * Math.pow(2, zoom - t.z)}px`,
                    height: `${256 * Math.pow(2, zoom - t.z)}px`,
                    opacity: baseLayer === "satellite" ? 0.95 : 0.88,
                    filter: baseLayer === "standard" ? "contrast(1.05) brightness(0.95)" : "none"
                  }}
                  loading="lazy"
                />
              );
            })}
          </div>

          {/* SVG Overlay: Highways, Connectors & Distance Vectors */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none"
            }}
          >
            {/* Highway Routes */}
            {showRoutes &&
              ZAMBIA_HIGHWAY_CORRIDORS.map((corridor) => {
                const points = corridor.coordinates.map((coord) => {
                  const p = projectToPixels(coord[0], coord[1]);
                  return `${p.x},${p.y}`;
                });
                const isSelected = selectedRoute?.code === corridor.code;

                return (
                  <g key={corridor.code}>
                    <polyline
                      points={points.join(" ")}
                      fill="none"
                      stroke={isSelected ? "#38bdf8" : "rgba(250, 204, 21, 0.85)"}
                      strokeWidth={isSelected ? "5" : "3"}
                      strokeDasharray={corridor.roadCondition.includes("Gravel") ? "6 4" : "none"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                );
              })}

            {/* Direct Distance Ray from Lusaka to Selected Pin */}
            {selectedPin && (
              <g>
                {(() => {
                  const lusakaPos = projectToPixels(
                    LUSAKA_NATIONAL_HQ.latitude,
                    LUSAKA_NATIONAL_HQ.longitude
                  );
                  const pinPos = projectToPixels(
                    selectedPin.latitude,
                    selectedPin.longitude
                  );

                  return (
                    <>
                      <line
                        x1={lusakaPos.x}
                        y1={lusakaPos.y}
                        x2={pinPos.x}
                        y2={pinPos.y}
                        stroke="rgba(52, 211, 153, 0.7)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <circle
                        cx={(lusakaPos.x + pinPos.x) / 2}
                        cy={(lusakaPos.y + pinPos.y) / 2}
                        r="14"
                        fill="rgba(13, 56, 56, 0.9)"
                        stroke="#10b981"
                        strokeWidth="1.5"
                      />
                      <text
                        x={(lusakaPos.x + pinPos.x) / 2}
                        y={(lusakaPos.y + pinPos.y) / 2 + 4}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="9"
                        fontWeight="800"
                      >
                        {distanceBreakdown.nationalHq.distanceKm}km
                      </text>
                    </>
                  );
                })()}
              </g>
            )}
          </svg>

          {/* Interactive HTML Markers: Destinations, Airports, Amenities */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "auto"
            }}
          >
            {/* 1. National Capital Lusaka Marker */}
            {(() => {
              const pos = projectToPixels(
                LUSAKA_NATIONAL_HQ.latitude,
                LUSAKA_NATIONAL_HQ.longitude
              );
              return (
                <div
                  style={{
                    position: "absolute",
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 20
                  }}
                  onClick={() => setCenter({ lat: LUSAKA_NATIONAL_HQ.latitude, lon: LUSAKA_NATIONAL_HQ.longitude })}
                  title="Lusaka - National Capital & Government HQ"
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "26px",
                      height: "26px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      border: "2px solid #fff",
                      boxShadow: "0 0 12px rgba(16,185,129,0.8)"
                    }}
                  >
                    🇿🇲
                  </div>
                  <span
                    style={{
                      background: "rgba(0,0,0,0.85)",
                      color: "#34D399",
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 6px",
                      borderRadius: "4px",
                      marginTop: "2px",
                      border: "1px solid rgba(52,211,153,0.4)"
                    }}
                  >
                    LUSAKA (HQ)
                  </span>
                </div>
              );
            })()}

            {/* 2. Provincial Capitals */}
            {showProvincialHqs &&
              ZAMBIA_PROVINCIAL_CAPITALS.filter((p) => p.name !== "Lusaka").map((prov) => {
                const pos = projectToPixels(prov.latitude, prov.longitude);
                return (
                  <div
                    key={prov.provinceCode}
                    style={{
                      position: "absolute",
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      zIndex: 15
                    }}
                    onClick={() => setCenter({ lat: prov.latitude, lon: prov.longitude })}
                    title={`${prov.name} - ${prov.provinceName} Capital`}
                  >
                    <div
                      style={{
                        background: "#1e293b",
                        color: "#f59e0b",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        border: "1.5px solid #f59e0b"
                      }}
                    >
                      🏛️
                    </div>
                    <span
                      style={{
                        background: "rgba(0,0,0,0.8)",
                        color: "#fef08a",
                        fontSize: "9px",
                        fontWeight: 700,
                        padding: "1px 4px",
                        borderRadius: "3px",
                        marginTop: "1px"
                      }}
                    >
                      {prov.name}
                    </span>
                  </div>
                );
              })}

            {/* 3. Airports & Bush Airstrips */}
            {showAirports &&
              ZAMBIA_AIRPORTS.map((air) => {
                const pos = projectToPixels(air.latitude, air.longitude);
                const isSelected = selectedAirport?.name === air.name;
                const isInternational = air.type === "international";

                return (
                  <div
                    key={air.name}
                    style={{
                      position: "absolute",
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      zIndex: isSelected ? 25 : 12
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAirport(air);
                    }}
                    title={`${air.name} (${air.code}) - ${air.runway}`}
                  >
                    <div
                      style={{
                        background: isInternational ? "#0284c7" : "#0f766e",
                        color: "#fff",
                        borderRadius: "50%",
                        width: isSelected ? "24px" : isInternational ? "20px" : "16px",
                        height: isSelected ? "24px" : isInternational ? "20px" : "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: isSelected ? "12px" : "10px",
                        border: isSelected ? "2px solid #38bdf8" : "1.5px solid #fff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
                      }}
                    >
                      ✈️
                    </div>
                    {(zoom >= 7 || isInternational || isSelected) && (
                      <span
                        style={{
                          background: "rgba(0,0,0,0.85)",
                          color: isInternational ? "#7dd3fc" : "#99f6e4",
                          fontSize: "8.5px",
                          fontWeight: 700,
                          padding: "1px 4px",
                          borderRadius: "3px",
                          marginTop: "1px",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {air.code}
                      </span>
                    )}
                  </div>
                );
              })}

            {/* 4. Amenities (Fuel & Hospitals) */}
            {showAmenities &&
              ZAMBIA_AMENITIES.map((amenity) => {
                const pos = projectToPixels(amenity.latitude, amenity.longitude);
                const isSelected = selectedAmenity?.id === amenity.id;

                return (
                  <div
                    key={amenity.id}
                    style={{
                      position: "absolute",
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      zIndex: isSelected ? 22 : 10
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAmenity(amenity);
                    }}
                    title={`${amenity.name} (${amenity.typeName})`}
                  >
                    <div
                      style={{
                        background: amenity.type === "hospital_clinic" ? "#dc2626" : "#ea580c",
                        color: "#fff",
                        borderRadius: "50%",
                        width: isSelected ? "22px" : "18px",
                        height: isSelected ? "22px" : "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        border: "1.5px solid #fff",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.5)"
                      }}
                    >
                      {amenity.icon}
                    </div>
                  </div>
                );
              })}

            {/* 5. Destination & Ceremony Pins */}
            {showDestinations &&
              filteredPins.map((pin) => {
                const pos = projectToPixels(pin.latitude, pin.longitude);
                const isSelected = selectedPin?.id === pin.id;
                const isCeremony = pin.category === "ceremony";

                return (
                  <div
                    key={pin.id}
                    style={{
                      position: "absolute",
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      zIndex: isSelected ? 30 : 18
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPin(pin);
                    }}
                  >
                    <div
                      style={{
                        background: isSelected
                          ? isCeremony
                            ? "#f59e0b"
                            : "#10b981"
                          : isCeremony
                          ? "#d97706"
                          : "#0d9488",
                        color: "#fff",
                        borderRadius: "50%",
                        width: isSelected ? "28px" : "22px",
                        height: isSelected ? "28px" : "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: isSelected ? "13px" : "11px",
                        border: isSelected ? "2.5px solid #fff" : "1.5px solid #fff",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.6)"
                      }}
                    >
                      {pin.categoryIcon}
                    </div>

                    <span
                      style={{
                        background: "rgba(0,0,0,0.88)",
                        color: isCeremony ? "#fbbf24" : "#fff",
                        fontSize: "9.5px",
                        fontWeight: isSelected ? 800 : 600,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        marginTop: "2px",
                        border: isSelected
                          ? `1px solid ${isCeremony ? "#f59e0b" : "#10b981"}`
                          : "1px solid rgba(255,255,255,0.2)",
                        whiteSpace: "nowrap",
                        maxWidth: "110px",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {pin.name}
                    </span>
                  </div>
                );
              })}
          </div>

          {/* Map Controls (Zoom In, Zoom Out, Reset Center) */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              zIndex: 40
            }}
          >
            <button
              type="button"
              onClick={handleZoomIn}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "rgba(10,32,32,0.9)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: "18px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              title="Zoom In"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "rgba(10,32,32,0.9)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: "18px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              title="Zoom Out"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => {
                setCenter({ lat: -14.2, lon: 27.8 });
                setZoom(6.5);
              }}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "rgba(10,32,32,0.9)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#34D399",
                fontSize: "14px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              title="Recenter Zambia"
            >
              🇿🇲
            </button>
          </div>

          {/* OSM Attribution Bar */}
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              right: "8px",
              background: "rgba(0,0,0,0.65)",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "9px",
              color: "rgba(255,255,255,0.7)",
              pointerEvents: "none"
            }}
          >
            © OpenStreetMap contributors · OpenTopoMap · Esri
          </div>
        </div>

        {/* Right Column: Distance Calculator, Transport Logistics & Amenities Inspector */}
        <div
          style={{
            background: "rgba(10, 32, 32, 0.95)",
            borderRadius: "16px",
            border: "1px solid rgba(37, 211, 102, 0.3)",
            padding: "20px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxHeight: "620px",
            overflowY: "auto"
          }}
        >
          {/* Header of Selected Item */}
          {selectedPin ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#34D399", textTransform: "uppercase" }}>
                  {selectedPin.categoryIcon} {selectedPin.provinceName}
                </span>
                <span style={{ fontSize: "11px", background: "rgba(250,204,21,0.2)", color: "#fef08a", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>
                  ★ {selectedPin.rating.toFixed(1)}
                </span>
              </div>
              <h3 style={{ margin: "0 0 6px", fontSize: "18px", color: "#fff", fontWeight: 800 }}>
                {selectedPin.name}
              </h3>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>
                {selectedPin.summary}
              </p>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "16px", color: "#fff" }}>Zambia Live OSM Navigator</h3>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                Click any destination pin or airport to compute live distances and transport routes.
              </p>
            </div>
          )}

          {/* ================================================================= */}
          {/* 1. THREE-TIER HEADQUARTERS DISTANCE MATRIX */}
          {/* ================================================================= */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "14px"
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#34D399", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>📏</span>
              <span>CALCULATED DISTANCE BREAKDOWN</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Distance 1: District Headquarters */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.3)", padding: "8px 10px", borderRadius: "8px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", display: "block" }}>📍 District HQ</span>
                  <strong style={{ fontSize: "12.5px", color: "#fff" }}>{distanceBreakdown.districtHq.name}</strong>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#38bdf8" }}>{distanceBreakdown.districtHq.distanceKm} km</span>
                  <small style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>~{distanceBreakdown.districtHq.driveTime}</small>
                </div>
              </div>

              {/* Distance 2: Provincial Headquarters */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.3)", padding: "8px 10px", borderRadius: "8px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", display: "block" }}>🏛️ Provincial HQ</span>
                  <strong style={{ fontSize: "12.5px", color: "#fff" }}>{distanceBreakdown.provincialHq.capitalName} ({distanceBreakdown.provincialHq.provinceName.split(" ")[0]})</strong>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#facc15" }}>{distanceBreakdown.provincialHq.distanceKm} km</span>
                  <small style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>~{distanceBreakdown.provincialHq.driveTime}</small>
                </div>
              </div>

              {/* Distance 3: Lusaka National Capital */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", padding: "8px 10px", borderRadius: "8px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#34D399", display: "block", fontWeight: 700 }}>🇿🇲 National Capital</span>
                  <strong style={{ fontSize: "12.5px", color: "#fff" }}>Lusaka Central</strong>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "13.5px", fontWeight: 800, color: "#34D399" }}>{distanceBreakdown.nationalHq.distanceKm} km</span>
                  <small style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>
                    ~{distanceBreakdown.nationalHq.driveTime} drive · {distanceBreakdown.nationalHq.flightTimeMinutes}m flight
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 2. CLOSEST AIRSTRIP & AIR ACCESSIBILITY */}
          {/* ================================================================= */}
          <div
            style={{
              background: "rgba(56, 189, 248, 0.08)",
              borderRadius: "12px",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              padding: "12px 14px"
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#7dd3fc", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>✈️</span>
              <span>NEARBY AIRSTRIP & FLIGHT ROUTING</span>
            </div>
            <div style={{ fontSize: "12.5px", color: "#fff", fontWeight: 700, marginBottom: "2px" }}>
              {distanceBreakdown.nearestAirport.name}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
              <strong>Distance:</strong> {distanceBreakdown.nearestAirport.distanceKm} km ({distanceBreakdown.nearestAirport.driveTime} ground transfer)
              <br />
              <strong>Runway:</strong> {distanceBreakdown.nearestAirport.runway}
              <br />
              <strong>Lusaka Flight Time:</strong> ~{distanceBreakdown.nearestAirport.flightTimeFromLusaka} minutes
            </div>
          </div>

          {/* ================================================================= */}
          {/* 3. GROUND TRANSPORT LOGISTICS */}
          {/* ================================================================= */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "12px 14px"
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#fb923c", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>🚐</span>
              <span>GROUND TRANSPORT & VEHICLE GUIDE</span>
            </div>
            <div style={{ fontSize: "11.5px", color: "#fff", lineHeight: 1.45 }}>
              <strong>Vehicle Recommendation:</strong>
              <div style={{ color: "#fef08a", fontWeight: 700, margin: "2px 0 4px" }}>
                {transportGuide.roadAccess.recommendedVehicle}
              </div>
              <strong>Primary Highway:</strong> {transportGuide.roadAccess.primaryHighway}
              <br />
              <strong>Express Buses:</strong> {transportGuide.roadAccess.expressBuses.join(", ")}
              {transportGuide.waterOrRail && (
                <>
                  <br />
                  <strong>Water / Rail:</strong> {transportGuide.waterOrRail}
                </>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* 4. EN-ROUTE AMENITIES & EMERGENCY MEDICAL */}
          {/* ================================================================= */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "12px 14px"
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#a7f3d0", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>🏪</span>
              <span>NEARBY AMENITIES & EMERGENCY CARE</span>
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", lineHeight: 1.45 }}>
              ⛽ <strong>24/7 Fuel:</strong> {transportGuide.roadAccess.fuelStationsEnRoute}
              <br />
              🏥 <strong>Emergency Health:</strong> District / Provincial Teaching Hospital with Level 1 trauma care & air evac support.
              <br />
              📶 <strong>Cellular Network:</strong> Airtel 4G/5G, MTN 4G+, Zamtel Coverage
            </div>
          </div>

          {/* Action Button: Explore destination details */}
          {selectedPin && (
            <button
              type="button"
              onClick={() => {
                if (onSelectDestination) {
                  onSelectDestination(selectedPin.slug);
                } else {
                  window.location.href = `/?q=${encodeURIComponent(selectedPin.name)}`;
                }
              }}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#fff",
                border: "none",
                padding: "12px 16px",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(16,185,129,0.35)"
              }}
            >
              Explore {selectedPin.name.split(" ")[0]} Listings & Passes →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

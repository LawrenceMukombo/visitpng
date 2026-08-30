"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  PNG_PROVINCES_GEOJSON,
  PNG_DISTRICTS_GEOJSON,
  KOKODA_TRACK_ROUTE_GEOJSON,
  ProvinceBoundaryProps,
  DistrictBoundaryProps,
  GeoJsonGeometry
} from "../../db/pngShapefiles";
import { PNG_REGIONS, PngRegion } from "../../db/pngGeography";

export interface DestinationPin {
  id: string;
  name: string;
  provinceCode: string;
  provinceName: string;
  region: PngRegion;
  category: "stays" | "tours" | "nature" | "culture" | "events" | "marine" | "trek";
  lng: number;
  lat: number;
  summary: string;
  elevation?: string;
  highlightTag: string;
  priceEstimate: string;
  imageUrl: string;
}

export const PNG_DESTINATION_PINS: DestinationPin[] = [
  {
    id: "port-moresby",
    name: "Port Moresby Waterfront & Nature Sanctuary",
    provinceCode: "NCD",
    provinceName: "National Capital District",
    region: "Southern",
    category: "nature",
    lng: 147.18,
    lat: -9.44,
    summary: "National Capital featuring National Museum & Art Gallery, Ela Beach, and Port Moresby Nature Park.",
    elevation: "35m",
    highlightTag: "Capital Gateway",
    priceEstimate: "K 35 entry",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "kokoda-track",
    name: "Kokoda Track & Owen Stanley Range",
    provinceCode: "CP",
    provinceName: "Central & Oro Provinces",
    region: "Southern",
    category: "trek",
    lng: 147.74,
    lat: -8.88,
    summary: "Historic 96km pilgrimage through rugged mountain cloud forests between Owers' Corner and Kokoda Station.",
    elevation: "2,190m (Mount Bellamy)",
    highlightTag: "Historic Trekking Trail",
    priceEstimate: "K 650 KTA Permit",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mount-wilhelm",
    name: "Mount Wilhelm & Keglsugl Basecamp",
    provinceCode: "SIM",
    provinceName: "Simbu (Chimbu) Province",
    region: "Highlands",
    category: "trek",
    lng: 145.03,
    lat: -5.78,
    summary: "Papua New Guinea's highest alpine summit (4,509m / 14,793ft), glacial tarns Piunde and Aunde.",
    elevation: "4,509m (Highest Peak)",
    highlightTag: "Highest Peak in PNG",
    priceEstimate: "K 220 Climb Permit",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "goroka-asaro",
    name: "Goroka & Asaro Mudmen Valley",
    provinceCode: "EHP",
    provinceName: "Eastern Highlands Province",
    region: "Highlands",
    category: "culture",
    lng: 145.39,
    lat: -6.08,
    summary: "Home to the annual Goroka Cultural Show, organic highland coffee plantations, and Asaro clay mask warriors.",
    elevation: "1,546m",
    highlightTag: "Goroka Cultural Show",
    priceEstimate: "K 100 Show Entry",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mount-hagen",
    name: "Mount Hagen & Wahgi Valley",
    provinceCode: "WHP",
    provinceName: "Western Highlands Province",
    region: "Highlands",
    category: "culture",
    lng: 144.23,
    lat: -5.86,
    summary: "Highland commercial hub renowned for Melpa warrior sing-sings, Rondon Ridge cloud forests, and coffee estates.",
    elevation: "1,677m",
    highlightTag: "Mount Hagen Show",
    priceEstimate: "K 120 Show Pass",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rabaul-tavurvur",
    name: "Rabaul Volcanoes & Baining Fire Dance",
    provinceCode: "ENB",
    provinceName: "East New Britain Province",
    region: "Islands",
    category: "nature",
    lng: 152.18,
    lat: -4.20,
    summary: "Dramatic caldera of Mount Tavurvur, Japanese WWII submarine tunnels, and sacred nocturnal Baining Fire Dancers.",
    elevation: "Caldera Sealevel",
    highlightTag: "Active Volcano & Fire Dance",
    priceEstimate: "K 120 Volcano Guide",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "kimbe-bay",
    name: "Kimbe Bay Coral Seamounts & Walindi",
    provinceCode: "WNB",
    provinceName: "West New Britain Province",
    region: "Islands",
    category: "marine",
    lng: 150.15,
    lat: -5.55,
    summary: "Epicentre of the Coral Triangle with 70% of all Indo-Pacific coral species, hammerhead sharks, and seamounts.",
    elevation: "Marine Sanctuary",
    highlightTag: "Coral Triangle Diving",
    priceEstimate: "K 350 Boat Dive",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sepik-river",
    name: "Sepik River & Haus Tambaran Spirit Houses",
    provinceCode: "ESP",
    provinceName: "East Sepik Province",
    region: "Momase",
    category: "culture",
    lng: 143.65,
    lat: -4.18,
    summary: "Ancient water kingdom of wood carvers, crocodile initiation ceremonies, and soaring Haus Tambaran spirit temples.",
    elevation: "50m",
    highlightTag: "Sepik River Spirit Houses",
    priceEstimate: "K 250 Canoe Charter",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "madang-resort",
    name: "Madang Lagoon & Kalibobo Lighthouse",
    provinceCode: "MAD",
    provinceName: "Madang Province",
    region: "Momase",
    category: "marine",
    lng: 145.79,
    lat: -5.22,
    summary: "Pristine coastal lagoon known as the prettiest town in the South Pacific with WWII shipwrecks and diving.",
    elevation: "Sea level",
    highlightTag: "Flying Foxes & Scuba Reefs",
    priceEstimate: "K 380 Harbor Tour",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tari-huli",
    name: "Tari Valley & Huli Wigmen Sanctuary",
    provinceCode: "HEL",
    provinceName: "Hela Province",
    region: "Highlands",
    category: "culture",
    lng: 142.95,
    lat: -5.85,
    summary: "Legendary Huli Wigmen bachelor schools, ornate human-hair headdresses, and Tari Basin birdwatching.",
    elevation: "1,700m - 2,800m",
    highlightTag: "Huli Wigmen & Birding",
    priceEstimate: "K 150 Cultural Tour",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  }
];

export interface PngInteractiveMapProps {
  onSelectDestination?: (name: string) => void;
  onSelectProvince?: (provinceCode: string) => void;
}

// Convert Lat/Lng to Web Mercator Tile Canvas Pixel coordinates
function latLngToTilePixel(
  lat: number,
  lng: number,
  zoom: number,
  centerLat: number,
  centerLng: number,
  width: number,
  height: number
): [number, number] {
  const scale = 256 * Math.pow(2, zoom);

  const centerWorldX = ((centerLng + 180) / 360) * scale;
  const sinCenterLat = Math.sin((centerLat * Math.PI) / 180);
  const centerWorldY =
    (0.5 - Math.log((1 + sinCenterLat) / (1 - sinCenterLat)) / (4 * Math.PI)) * scale;

  const worldX = ((lng + 180) / 360) * scale;
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const worldY =
    (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale;

  const screenX = worldX - centerWorldX + width / 2;
  const screenY = worldY - centerWorldY + height / 2;

  return [screenX, screenY];
}

// Generate real visible OpenStreetMap tiles
function getVisibleOsmTiles(
  centerLat: number,
  centerLng: number,
  zoom: number,
  width: number,
  height: number,
  tileUrlTemplate: string
) {
  const scale = 256 * Math.pow(2, zoom);

  const centerWorldX = ((centerLng + 180) / 360) * scale;
  const sinCenterLat = Math.sin((centerLat * Math.PI) / 180);
  const centerWorldY =
    (0.5 - Math.log((1 + sinCenterLat) / (1 - sinCenterLat)) / (4 * Math.PI)) * scale;

  const minWorldX = centerWorldX - width / 2;
  const maxWorldX = centerWorldX + width / 2;
  const minWorldY = centerWorldY - height / 2;
  const maxWorldY = centerWorldY + height / 2;

  const startTileX = Math.floor(minWorldX / 256);
  const endTileX = Math.floor(maxWorldX / 256);
  const startTileY = Math.floor(minWorldY / 256);
  const endTileY = Math.floor(maxWorldY / 256);

  const maxTileIndex = Math.pow(2, zoom) - 1;
  const tiles: { key: string; url: string; x: number; y: number }[] = [];

  for (let tx = startTileX; tx <= endTileX; tx++) {
    for (let ty = startTileY; ty <= endTileY; ty++) {
      if (ty < 0 || ty > maxTileIndex) continue;
      const wrappedX = ((tx % (maxTileIndex + 1)) + (maxTileIndex + 1)) % (maxTileIndex + 1);
      const posX = tx * 256 - minWorldX;
      const posY = ty * 256 - minWorldY;

      const url = tileUrlTemplate
        .replace("{z}", zoom.toString())
        .replace("{x}", wrappedX.toString())
        .replace("{y}", ty.toString());

      tiles.push({
        key: `${zoom}-${tx}-${ty}`,
        url,
        x: posX,
        y: posY
      });
    }
  }
  return tiles;
}

export default function PngInteractiveMap({
  onSelectDestination,
  onSelectProvince
}: PngInteractiveMapProps) {
  // Map View State (WGS84 Coordinates)
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: -6.3, lng: 147.0 });
  const [zoom, setZoom] = useState<number>(6);
  const [tileLayer, setTileLayer] = useState<"osm" | "esriStreet" | "esriTopo">("osm");

  // Selection & Layer States
  const [mapLevel, setMapLevel] = useState<"country" | "provinces" | "districts" | "trail">("provinces");
  const [selectedRegion, setSelectedRegion] = useState<PngRegion | "All">("All");
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceBoundaryProps | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceBoundaryProps | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictBoundaryProps | null>(null);
  const [activePin, setActivePin] = useState<DestinationPin | null>(PNG_DESTINATION_PINS[0]);
  const [showDistrictsLayer, setShowDistrictsLayer] = useState(true);
  const [showKokodaRoute, setShowKokodaRoute] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Dragging / Pan state
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 680, height: 480 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (mapContainerRef.current) {
        const w = mapContainerRef.current.clientWidth || 680;
        setDimensions({ width: w, height: Math.max(440, Math.min(560, w * 0.65)) });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const visibleTiles = useMemo(() => {
    const tileTemplates = {
      osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      esriStreet: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      esriTopo: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
    };
    return getVisibleOsmTiles(
      center.lat,
      center.lng,
      zoom,
      dimensions.width,
      dimensions.height,
      tileTemplates[tileLayer]
    );
  }, [center.lat, center.lng, zoom, dimensions.width, dimensions.height, tileLayer]);

  // Handle Drag / Pan Mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragStart({ x: e.clientX, y: e.clientY });

    // Convert pixel delta to lat/lng delta
    const scale = 256 * Math.pow(2, zoom);
    const dLng = (-dx / scale) * 360;
    const dLat = (dy / scale) * 180;

    setCenter(prev => ({
      lat: Math.max(-13, Math.min(-0.5, prev.lat + dLat)),
      lng: Math.max(139, Math.min(158, prev.lng + dLng))
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  // Handle Touch Pan for Mobile
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
    const dLng = (-dx / scale) * 360;
    const dLat = (dy / scale) * 180;

    setCenter(prev => ({
      lat: Math.max(-13, Math.min(-0.5, prev.lat + dLat)),
      lng: Math.max(139, Math.min(158, prev.lng + dLng))
    }));
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Zoom Helpers
  const zoomIn = () => setZoom(z => Math.min(13, z + 1));
  const zoomOut = () => setZoom(z => Math.max(5, z - 1));

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else if (e.deltaY > 0) {
      zoomOut();
    }
  };

  // Level Presets
  const handleSetLevel = (level: "country" | "provinces" | "districts" | "trail") => {
    setMapLevel(level);
    if (level === "country") {
      setCenter({ lat: -6.3, lng: 147.0 });
      setZoom(6);
      setSelectedProvince(null);
    } else if (level === "provinces") {
      setCenter({ lat: -6.0, lng: 145.5 });
      setZoom(7);
    } else if (level === "districts") {
      setCenter({ lat: -6.0, lng: 144.5 });
      setZoom(9);
      setShowDistrictsLayer(true);
    } else if (level === "trail") {
      setCenter({ lat: -8.95, lng: 147.74 });
      setZoom(10);
      setShowKokodaRoute(true);
    }
  };

  const handleProvinceClick = useCallback((props: ProvinceBoundaryProps) => {
    setSelectedProvince(props);
    setSelectedDistrict(null);
    setCenter({ lat: props.centroid[1], lng: props.centroid[0] });
    setZoom(8);
  }, []);

  const handleDistrictClick = useCallback((dist: DistrictBoundaryProps) => {
    setSelectedDistrict(dist);
    setCenter({ lat: dist.centroid[1], lng: dist.centroid[0] });
    setZoom(10);
  }, []);

  const handlePinClick = useCallback((pin: DestinationPin) => {
    setActivePin(pin);
    setCenter({ lat: pin.lat, lng: pin.lng });
    setZoom(10);
  }, []);

  // Regional styling helpers
  const getRegionTheme = (region: PngRegion) => {
    switch (region) {
      case "Highlands": return { stroke: "#F59E0B", fill: "rgba(245, 158, 11, 0.16)", glow: "rgba(245, 158, 11, 0.4)" };
      case "Southern": return { stroke: "#10B981", fill: "rgba(16, 185, 129, 0.16)", glow: "rgba(16, 185, 129, 0.4)" };
      case "Momase": return { stroke: "#06B6D4", fill: "rgba(6, 182, 212, 0.16)", glow: "rgba(6, 182, 212, 0.4)" };
      case "Islands": return { stroke: "#F97316", fill: "rgba(249, 115, 22, 0.16)", glow: "rgba(249, 115, 22, 0.4)" };
      default: return { stroke: "#CBD5E1", fill: "rgba(255, 255, 255, 0.1)", glow: "rgba(255, 255, 255, 0.3)" };
    }
  };

  // Project GeoJSON geometry to SVG path on OSM tile canvas
  const renderGeoJsonToSvgPath = useCallback((geom: GeoJsonGeometry) => {
    const project = (lng: number, lat: number) => {
      const [x, y] = latLngToTilePixel(lat, lng, zoom, center.lat, center.lng, dimensions.width, dimensions.height);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    };

    if (geom.type === "Polygon") {
      const coords = geom.coordinates as number[][][];
      return coords
        .map((ring: number[][]) => "M " + ring.map(([lng, lat]) => project(lng, lat)).join(" L ") + " Z")
        .join(" ");
    } else if (geom.type === "MultiPolygon") {
      const coords = geom.coordinates as number[][][][];
      return coords
        .map((poly: number[][][]) =>
          poly.map((ring: number[][]) => "M " + ring.map(([lng, lat]) => project(lng, lat)).join(" L ") + " Z").join(" ")
        )
        .join(" ");
    } else if (geom.type === "LineString") {
      const coords = geom.coordinates as number[][];
      return "M " + coords.map(([lng, lat]: number[]) => project(lng, lat)).join(" L ");
    }
    return "";
  }, [center.lat, center.lng, zoom, dimensions.width, dimensions.height]);

  const provinceFeatures = PNG_PROVINCES_GEOJSON.features.filter(
    f => selectedRegion === "All" || f.properties.region === selectedRegion
  );

  const filteredPins = PNG_DESTINATION_PINS.filter(pin => {
    const matchesRegion = selectedRegion === "All" || pin.region === selectedRegion;
    const matchesCategory = selectedCategory === "all" || pin.category === selectedCategory;
    const matchesProvince = !selectedProvince || pin.provinceCode === selectedProvince.code;
    return matchesRegion && matchesCategory && matchesProvince;
  });

  return (
    <div
      className="pngInteractiveMap"
      style={{
        background: "linear-gradient(180deg, #09211C 0%, #051613 100%)",
        borderRadius: "20px",
        padding: "24px 20px",
        color: "#FFFFFF",
        border: "1px solid rgba(234, 88, 12, 0.25)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        maxWidth: "100%",
        overflowX: "hidden"
      }}
    >
      {/* Top Header & Map Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
            <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "3px 10px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800 }}>
              LIVE OPENSTREETMAP GIS ENGINE
            </span>
            <span style={{ color: "#34D399", fontSize: "0.76rem", fontWeight: 700 }}>
              WGS84 EPSG:3857 · All Administrative Levels
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.01em" }}>
            Papua New Guinea OpenStreetMap & Shapefile Explorer
          </h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: "#94A3B8" }}>
            Real OSM tile cartography with interactive ADM0 Country, ADM1 22 Provinces, ADM2 Districts, and 96km Kokoda Trail route.
          </p>
        </div>

        {/* Tile Layers & Visibility Toggles */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* Tile Layer Selector */}
          <div style={{ display: "flex", background: "rgba(0,0,0,0.4)", padding: "3px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)" }}>
            {[
              { id: "osm", label: "🗺️ Standard OSM" },
              { id: "esriStreet", label: "🌍 Street" },
              { id: "esriTopo", label: "⛰️ Topo" }
            ].map(l => (
              <button
                key={l.id}
                type="button"
                onClick={() => setTileLayer(l.id as "osm" | "esriStreet" | "esriTopo")}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "none",
                  background: tileLayer === l.id ? "#EA580C" : "transparent",
                  color: "#FFFFFF",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <label style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.74rem", color: "#6EE7B7", cursor: "pointer", background: "rgba(0,0,0,0.3)", padding: "5px 10px", borderRadius: "6px", border: "1px solid rgba(52, 211, 153, 0.3)" }}>
            <input
              type="checkbox"
              checked={showDistrictsLayer}
              onChange={(e) => setShowDistrictsLayer(e.target.checked)}
            />
            District Hubs
          </label>

          <label style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.74rem", color: "#FDBA74", cursor: "pointer", background: "rgba(0,0,0,0.3)", padding: "5px 10px", borderRadius: "6px", border: "1px solid rgba(234, 88, 12, 0.3)" }}>
            <input
              type="checkbox"
              checked={showKokodaRoute}
              onChange={(e) => setShowKokodaRoute(e.target.checked)}
            />
            Kokoda 96km GPS
          </label>
        </div>
      </div>

      {/* Level Zoom Selectors & Region Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
        {/* Administrative Level Switching */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {[
            { id: "country", label: "National (ADM0)" },
            { id: "provinces", label: "22 Provinces (ADM1)" },
            { id: "districts", label: "89+ Districts (ADM2)" },
            { id: "trail", label: "Kokoda Corridor" }
          ].map(lvl => (
            <button
              key={lvl.id}
              type="button"
              onClick={() => handleSetLevel(lvl.id as "country" | "provinces" | "districts" | "trail")}
              style={{
                padding: "5px 12px",
                borderRadius: "16px",
                border: "1px solid",
                borderColor: mapLevel === lvl.id ? "#34D399" : "rgba(255,255,255,0.15)",
                background: mapLevel === lvl.id ? "rgba(52, 211, 153, 0.2)" : "rgba(0,0,0,0.3)",
                color: mapLevel === lvl.id ? "#6EE7B7" : "#CBD5E1",
                fontSize: "0.74rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* Region Filter */}
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          <button
            key="All"
            type="button"
            onClick={() => setSelectedRegion("All")}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid",
              borderColor: selectedRegion === "All" ? "#EA580C" : "rgba(255,255,255,0.1)",
              background: selectedRegion === "All" ? "rgba(234, 88, 12, 0.25)" : "transparent",
              color: selectedRegion === "All" ? "#FDBA74" : "#94A3B8",
              fontSize: "0.7rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            All Regions
          </button>
          {PNG_REGIONS.map(reg => {
            const isSelected = selectedRegion === reg.name;
            return (
              <button
                key={reg.name}
                type="button"
                onClick={() => setSelectedRegion(reg.name)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "1px solid",
                  borderColor: isSelected ? "#EA580C" : "rgba(255,255,255,0.1)",
                  background: isSelected ? "rgba(234, 88, 12, 0.25)" : "transparent",
                  color: isSelected ? "#FDBA74" : "#94A3B8",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {reg.name}
              </button>
            );
          })}
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Types" },
            { id: "stays", label: "🏨 Stays" },
            { id: "trek", label: "🥾 Kokoda & Peaks" },
            { id: "marine", label: "🤿 Marine & Reef" },
            { id: "culture", label: "🎭 Sing-Sings" },
            { id: "nature", label: "🦜 Wildlife" }
          ].map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: "3px 8px",
                borderRadius: "6px",
                border: "1px solid",
                borderColor: selectedCategory === cat.id ? "#F59E0B" : "rgba(255,255,255,0.1)",
                background: selectedCategory === cat.id ? "rgba(245, 158, 11, 0.2)" : "rgba(0,0,0,0.2)",
                color: selectedCategory === cat.id ? "#FDE68A" : "#94A3B8",
                fontSize: "0.68rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map View & Details Inspector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "18px", maxWidth: "100%" }}>
        {/* Live OpenStreetMap Interactive Canvas */}
        <div
          ref={mapContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={(e) => {
            handleMouseMove(e);
            if (mapContainerRef.current) {
              const rect = mapContainerRef.current.getBoundingClientRect();
              setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp();
            setHoveredProvince(null);
            setHoverPos(null);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          style={{
            position: "relative",
            background: "#081E1A",
            borderRadius: "14px",
            border: "1px solid rgba(234, 88, 12, 0.35)",
            overflow: "hidden",
            height: `${dimensions.height}px`,
            cursor: isDragging ? "grabbing" : "grab",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)",
            userSelect: "none",
            touchAction: "none"
          }}
        >
          {/* 1. Real OpenStreetMap Raster Tiles Layer */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {visibleTiles.map(t => (
              <img
                key={t.key}
                src={t.url}
                alt=""
                style={{
                  position: "absolute",
                  left: `${t.x}px`,
                  top: `${t.y}px`,
                  width: "256px",
                  height: "256px",
                  display: "block"
                }}
                loading="eager"
              />
            ))}
          </div>

          {/* 2. SVG Vector Layer Over OpenStreetMap Tiles */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "auto"
            }}
          >
            {/* Province Boundary Polygons - Clean Boundary Lines without Obscuring Fill */}
            {provinceFeatures.map(f => {
              const p = f.properties;
              const theme = getRegionTheme(p.region);
              const isSelected = selectedProvince?.code === p.code;
              const isHovered = hoveredProvince?.code === p.code;
              const pathData = renderGeoJsonToSvgPath(f.geometry);

              return (
                <path
                  key={p.code}
                  d={pathData}
                  fill={isSelected ? "rgba(234, 88, 12, 0.12)" : isHovered ? "rgba(255, 255, 255, 0.08)" : "none"}
                  stroke={isSelected ? "#EA580C" : isHovered ? "#FFFFFF" : theme.stroke}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                  strokeDasharray={isSelected ? undefined : "5 3"}
                  strokeOpacity={isSelected ? 1 : isHovered ? 1 : 0.75}
                  style={{ cursor: "pointer", transition: "all 0.15s ease" }}
                  onMouseEnter={() => setHoveredProvince(p)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProvinceClick(p);
                  }}
                >
                  <title>{p.name} ({p.capital})</title>
                </path>
              );
            })}

            {/* Province Centroid Badge Markers */}
            {zoom <= 8 && provinceFeatures.map(f => {
              const p = f.properties;
              const [px, py] = latLngToTilePixel(p.centroid[1], p.centroid[0], zoom, center.lat, center.lng, dimensions.width, dimensions.height);
              if (px < -40 || px > dimensions.width + 40 || py < -40 || py > dimensions.height + 40) return null;
              const isSelected = selectedProvince?.code === p.code;
              const isHovered = hoveredProvince?.code === p.code;

              return (
                <g
                  key={`lbl-${p.code}`}
                  transform={`translate(${px}, ${py})`}
                  onClick={(e) => { e.stopPropagation(); handleProvinceClick(p); }}
                  onMouseEnter={() => setHoveredProvince(p)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={-24}
                    y={-10}
                    width={48}
                    height={20}
                    rx={10}
                    fill={isSelected ? "#EA580C" : isHovered ? "#0D9488" : "rgba(3, 47, 43, 0.85)"}
                    stroke={isSelected ? "#FFFFFF" : isHovered ? "#5EEAD4" : "rgba(255,255,255,0.4)"}
                    strokeWidth={isSelected ? 1.5 : 1}
                    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
                  />
                  <text
                    y={3.5}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9px"
                    fontWeight="800"
                    letterSpacing="0.04em"
                  >
                    {p.code}
                  </text>
                </g>
              );
            })}

            {/* Kokoda Track GPS Line (96km) */}
            {showKokodaRoute && (
              <path
                d={renderGeoJsonToSvgPath(KOKODA_TRACK_ROUTE_GEOJSON.geometry)}
                fill="none"
                stroke="#DC2626"
                strokeWidth={3.5}
                strokeDasharray="6 3"
                style={{ filter: "drop-shadow(0 0 6px rgba(220, 38, 38, 0.8))" }}
              >
                <title>Kokoda Track 96km Historical Route</title>
              </path>
            )}

            {/* District Centroids (ADM2) */}
            {showDistrictsLayer && zoom >= 7 && PNG_DISTRICTS_GEOJSON.features.map(f => {
              const d = f.properties;
              const [px, py] = latLngToTilePixel(d.centroid[1], d.centroid[0], zoom, center.lat, center.lng, dimensions.width, dimensions.height);
              if (px < -20 || px > dimensions.width + 20 || py < -20 || py > dimensions.height + 20) return null;

              return (
                <g key={d.id} transform={`translate(${px}, ${py})`} onClick={(e) => { e.stopPropagation(); handleDistrictClick(d); }} style={{ cursor: "pointer" }}>
                  <circle r={zoom >= 9 ? 6 : 4} fill="#10B981" stroke="#FFFFFF" strokeWidth={1.5} />
                  {zoom >= 9 && (
                    <text y={-9} textAnchor="middle" fill="#FFFFFF" fontSize="9.5px" fontWeight="800" style={{ textShadow: "0 2px 4px #000000" }}>
                      {d.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Tourism Hotspot Destination Pins */}
            {filteredPins.map(pin => {
              const [px, py] = latLngToTilePixel(pin.lat, pin.lng, zoom, center.lat, center.lng, dimensions.width, dimensions.height);
              if (px < -30 || px > dimensions.width + 30 || py < -30 || py > dimensions.height + 30) return null;
              const isPinActive = activePin?.id === pin.id;

              return (
                <g
                  key={pin.id}
                  transform={`translate(${px}, ${py})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePinClick(pin);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <circle r={isPinActive ? 18 : 12} fill={isPinActive ? "#EA580C" : "#0D9488"} opacity={0.4} />
                  <circle r={isPinActive ? 11 : 8} fill={isPinActive ? "#EA580C" : "#14B8A6"} stroke="#FFFFFF" strokeWidth={2} />
                  <text y={isPinActive ? -16 : -12} textAnchor="middle" fill="#FFFFFF" fontSize={isPinActive ? "11px" : "9px"} fontWeight="800" style={{ textShadow: "0 2px 5px rgba(0,0,0,0.95)" }}>
                    {pin.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Tooltip */}
          {hoveredProvince && hoverPos && (
            <div
              style={{
                position: "absolute",
                left: `${Math.min(dimensions.width - 200, Math.max(10, hoverPos.x + 15))}px`,
                top: `${Math.min(dimensions.height - 80, Math.max(10, hoverPos.y - 45))}px`,
                background: "rgba(5, 22, 19, 0.94)",
                color: "#FFFFFF",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #EA580C",
                boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
                pointerEvents: "none",
                zIndex: 10,
                fontSize: "0.74rem"
              }}
            >
              <div style={{ fontWeight: 800, color: "#FDBA74" }}>{hoveredProvince.name}</div>
              <div style={{ color: "#34D399", fontSize: "0.68rem" }}>Capital: {hoveredProvince.capital} · {hoveredProvince.districtsCount} Districts</div>
            </div>
          )}

          {/* Map Overlay On-Screen Navigation Controls */}
          <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <button
              type="button"
              onClick={zoomIn}
              style={{ width: "32px", height: "32px", background: "rgba(11, 38, 33, 0.9)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", fontSize: "1.1rem", fontWeight: 800, cursor: "pointer", display: "grid", placeItems: "center" }}
              title="Zoom In"
            >
              +
            </button>
            <button
              type="button"
              onClick={zoomOut}
              style={{ width: "32px", height: "32px", background: "rgba(11, 38, 33, 0.9)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", fontSize: "1.1rem", fontWeight: 800, cursor: "pointer", display: "grid", placeItems: "center" }}
              title="Zoom Out"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => handleSetLevel("country")}
              style={{ width: "32px", height: "32px", background: "rgba(11, 38, 33, 0.9)", color: "#34D399", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer", display: "grid", placeItems: "center" }}
              title="Reset Country View"
            >
              🇵🇬
            </button>
          </div>

          {/* Current GPS Position Indicator */}
          <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "rgba(0,0,0,0.7)", padding: "4px 8px", borderRadius: "6px", fontSize: "0.68rem", color: "#CBD5E1" }}>
            Lat: {center.lat.toFixed(2)}°S · Lng: {center.lng.toFixed(2)}°E · Zoom {zoom}
          </div>
        </div>

        {/* Right Inspector Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Province / District / Hotspot Deep Detail Card */}
          <div
            style={{
              background: "rgba(15, 48, 42, 0.7)",
              borderRadius: "14px",
              border: "1px solid rgba(234, 88, 12, 0.3)",
              padding: "20px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
            }}
          >
            {selectedProvince ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 800 }}>
                    {selectedProvince.region.toUpperCase()} REGION · PROVINCE (ADM1)
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "#34D399", fontWeight: 700 }}>
                    Code: {selectedProvince.code}
                  </span>
                </div>

                <h3 style={{ margin: "4px 0 2px 0", fontSize: "1.3rem", fontWeight: 900, color: "#FFFFFF" }}>
                  {selectedProvince.name}
                </h3>
                <p style={{ margin: "0 0 12px 0", fontSize: "0.82rem", color: "#FDBA74", fontWeight: 700 }}>
                  Provincial Capital: {selectedProvince.capital}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", background: "rgba(0,0,0,0.25)", padding: "10px", borderRadius: "8px", fontSize: "0.75rem", marginBottom: "12px" }}>
                  <div>
                    <span style={{ color: "#94A3B8" }}>Land Area:</span>
                    <strong style={{ display: "block", color: "#FFFFFF" }}>{selectedProvince.areaKm2.toLocaleString()} km²</strong>
                  </div>
                  <div>
                    <span style={{ color: "#94A3B8" }}>Population:</span>
                    <strong style={{ display: "block", color: "#FFFFFF" }}>{selectedProvince.populationEstimate.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#94A3B8" }}>Districts (ADM2):</span>
                    <strong style={{ display: "block", color: "#34D399" }}>{selectedProvince.districtsCount} Districts</strong>
                  </div>
                  <div>
                    <span style={{ color: "#94A3B8" }}>Max Elevation:</span>
                    <strong style={{ display: "block", color: "#FDBA74" }}>{selectedProvince.elevationPeakMeters}m</strong>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: 800, display: "block", marginBottom: "4px" }}>
                    Key Tourism Hotspots:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
                    {selectedProvince.keyHotspots.map((h, i) => (
                      <span key={i} style={{ background: "rgba(52, 211, 153, 0.15)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#6EE7B7", padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700 }}>
                        {h}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectProvince) onSelectProvince(selectedProvince.code);
                      else if (onSelectDestination) onSelectDestination(selectedProvince.name);
                    }}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(234, 88, 12, 0.4)"
                    }}
                  >
                    Browse Stays & Tours in {selectedProvince.name} ➔
                  </button>
                </div>
              </div>
            ) : selectedDistrict ? (
              <div>
                <span style={{ background: "#059669", color: "#FFFFFF", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 800 }}>
                  DISTRICT (ADM2)
                </span>
                <h3 style={{ margin: "6px 0 2px 0", fontSize: "1.25rem", fontWeight: 900, color: "#FFFFFF" }}>
                  {selectedDistrict.name} District
                </h3>
                <p style={{ margin: "0 0 10px 0", fontSize: "0.8rem", color: "#34D399" }}>
                  HQ: {selectedDistrict.headquarters} · {selectedDistrict.provinceName}
                </p>
                <div style={{ fontSize: "0.78rem", color: "#CBD5E1", marginBottom: "12px" }}>
                  Primary Focus: <strong style={{ color: "#FDBA74", textTransform: "capitalize" }}>{selectedDistrict.category}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectDestination) onSelectDestination(selectedDistrict.name);
                  }}
                  style={{
                    width: "100%",
                    background: "rgba(5, 150, 105, 0.85)",
                    color: "#FFFFFF",
                    border: "1px solid #10B981",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                >
                  Explore {selectedDistrict.name} Experiences ➔
                </button>
              </div>
            ) : (
              <div>
                <span style={{ background: "#EA580C", color: "#FFFFFF", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 800 }}>
                  HOVER OR CLICK TO INSPECT
                </span>
                <h3 style={{ margin: "6px 0 4px 0", fontSize: "1.15rem", fontWeight: 800, color: "#FFFFFF" }}>
                  Explore 22 Provinces & 89+ Districts
                </h3>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#CBD5E1", lineHeight: 1.45 }}>
                  Click on any province polygon or district node directly on the OpenStreetMap canvas to inspect geography, airstrips, population, and tour attractions.
                </p>
              </div>
            )}
          </div>

          {/* Active Hotspot Preview Card */}
          {activePin && (
            <div
              style={{
                background: "rgba(15, 48, 42, 0.7)",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  height: "120px",
                  backgroundImage: `url(${activePin.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative"
                }}
              >
                <span style={{ position: "absolute", top: "8px", left: "8px", background: "rgba(0,0,0,0.7)", color: "#FDBA74", padding: "2px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 800 }}>
                  {activePin.highlightTag}
                </span>
              </div>

              <div style={{ padding: "14px" }}>
                <span style={{ fontSize: "0.72rem", color: "#34D399", fontWeight: 700 }}>
                  {activePin.provinceName}
                </span>
                <h4 style={{ margin: "2px 0 4px 0", fontSize: "1.05rem", fontWeight: 800, color: "#FFFFFF" }}>
                  {activePin.name}
                </h4>
                <p style={{ margin: "0 0 10px 0", fontSize: "0.78rem", color: "#CBD5E1", lineHeight: 1.4 }}>
                  {activePin.summary}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.92rem", color: "#EA580C" }}>{activePin.priceEstimate}</strong>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectDestination) onSelectDestination(activePin.id);
                    }}
                    style={{
                      background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 14px",
                      fontSize: "0.76rem",
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                  >
                    Explore Place ➔
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { ZAMBIA_PROVINCES } from "../../db/zambiaGeography";

export interface MapDestinationPin {
  id: string | number;
  name: string;
  category: "stays" | "tours" | "nature" | "culture" | "events" | "transport";
  categoryName: string;
  categoryIcon: string;
  provinceCode: string;
  provinceName: string;
  region: string;
  summary: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  // SVG coordinates projected to [0, 800] x [0, 600]
  x: number;
  y: number;
  highlights: string[];
  price?: string;
  rating: number;
  slug: string;
}

// Coordinates projection for Zambia:
// Longitude: 22.0°E to 33.7°E -> map width 800
// Latitude: -8.2°S to -18.1°S -> map height 600
function projectCoords(lat: number, lon: number): { x: number; y: number } {
  const minLon = 21.8;
  const maxLon = 34.0;
  const minLat = -18.2; // Southern tip (Livingstone / Kazungula)
  const maxLat = -8.0;  // Northern tip (Lake Tanganyika / Mbala)

  const x = ((lon - minLon) / (maxLon - minLon)) * 740 + 30;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 540 + 30;
  return { x: Math.round(x), y: Math.round(y) };
}

export const ZAMBIA_TOURISM_PINS: MapDestinationPin[] = [
  {
    id: "vic-falls",
    slug: "victoria-falls-livingstone",
    name: "Victoria Falls (Mosi-oa-Tunya)",
    category: "nature",
    categoryName: "Nature & Falls",
    categoryIcon: "◇",
    provinceCode: "ZM-SOU",
    provinceName: "Southern Province",
    region: "Southern Safari & Zambezi",
    summary: "UNESCO World Heritage wonder of the world where the Zambezi river cascades 108 metres into Batoka Gorge.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82",
    latitude: -17.9243,
    longitude: 25.8572,
    ...projectCoords(-17.9243, 25.8572),
    highlights: ["Devil's Pool Swim", "Rainforest Walking Tour", "Helicopter Flight of Angels", "Batoka Gorge Rafting"],
    price: "From ZMW 450",
    rating: 5.0
  },
  {
    id: "south-luangwa",
    slug: "south-luangwa-mfuwe",
    name: "South Luangwa National Park",
    category: "tours",
    categoryName: "Safari Tours",
    categoryIcon: "◒",
    provinceCode: "ZM-EAS",
    provinceName: "Eastern Province",
    region: "Eastern & Luangwa Valley",
    summary: "Birthplace of the legendary African walking safari with unmatched leopard densities and elephant lagoons.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82",
    latitude: -13.0833,
    longitude: 31.8000,
    ...projectCoords(-13.0833, 31.8000),
    highlights: ["Pioneering Walking Safaris", "Night Predator Drives", "Elephant Lagoon Stays", "Nsefu Carmine Bee-eaters"],
    price: "From ZMW 3,800",
    rating: 5.0
  },
  {
    id: "lower-zambezi",
    slug: "lower-zambezi-valley",
    name: "Lower Zambezi National Park",
    category: "nature",
    categoryName: "Nature & Safaris",
    categoryIcon: "◇",
    provinceCode: "ZM-LUS",
    provinceName: "Lusaka / Southern",
    region: "Southern Safari & Zambezi",
    summary: "Pristine wilderness facing Zimbabwe's Mana Pools, offering thrilling canoe trails and riverfront luxury lodges.",
    imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82",
    latitude: -15.6500,
    longitude: 29.4167,
    ...projectCoords(-15.6500, 29.4167),
    highlights: ["Zambezi River Canoeing", "Tiger Fishing Catch & Release", "Chiawa Luxury Tented Stays", "Night Leopard Spotting"],
    price: "From ZMW 4,900",
    rating: 4.9
  },
  {
    id: "kafue-np",
    slug: "kafue-national-park",
    name: "Kafue National Park & Busanga",
    category: "tours",
    categoryName: "Safari Tours",
    categoryIcon: "◒",
    provinceCode: "ZM-CEN",
    provinceName: "Central Province",
    region: "Central & Kafue Basin",
    summary: "One of Africa's largest national parks, featuring the mist-shrouded Busanga Plains and tree-climbing lions.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82",
    latitude: -14.6000,
    longitude: 26.0000,
    ...projectCoords(-14.6000, 26.0000),
    highlights: ["Busanga Plains Hot Air Ballooning", "Tree-Climbing Lions", "Kafue River Boat Safaris", "Wild Dog Tracking"],
    price: "From ZMW 2,800",
    rating: 4.9
  },
  {
    id: "lake-kariba",
    slug: "lake-kariba-siavonga",
    name: "Lake Kariba & Siavonga",
    category: "stays",
    categoryName: "Stays & Leisure",
    categoryIcon: "⌂",
    provinceCode: "ZM-SOU",
    provinceName: "Southern Province",
    region: "Southern Safari & Zambezi",
    summary: "The Zambian Riviera offering houseboat charters, scenic sunset cruises, and fresh Kariba bream dining.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82",
    latitude: -16.5383,
    longitude: 28.7089,
    ...projectCoords(-16.5383, 28.7089),
    highlights: ["Houseboat Charters", "Siavonga Hilltop Sunsets", "Kariba Dam Wall Tour", "Freshwater Angling"],
    price: "From ZMW 1,750",
    rating: 4.8
  },
  {
    id: "liuwa-plain",
    slug: "barotseland-mongu",
    name: "Liuwa Plain National Park",
    category: "nature",
    categoryName: "Nature & Expeditions",
    categoryIcon: "◇",
    provinceCode: "ZM-WES",
    provinceName: "Western Province",
    region: "Western & Barotseland",
    summary: "Africa's second-largest wildebeest migration across vast golden plains managed in partnership with African Parks.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82",
    latitude: -14.4000,
    longitude: 22.6000,
    ...projectCoords(-14.4000, 22.6000),
    highlights: ["45,000 Blue Wildebeest Migration", "Lady Liuwa Lion Heritage", "Kuomboka Royal Ceremony Gate", "Star-Bed Decks"],
    price: "From ZMW 5,200",
    rating: 5.0
  },
  {
    id: "lake-bangweulu",
    slug: "samfya-beach-bangweulu",
    name: "Lake Bangweulu & Samfya Beach",
    category: "stays",
    categoryName: "Stays & Wetlands",
    categoryIcon: "⌂",
    provinceCode: "ZM-LUA",
    provinceName: "Luapula Province",
    region: "Northern & Great Lakes",
    summary: "Zambia's inland white sand beaches and wetland sanctuary for the prehistoric Shoebill Stork.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82",
    latitude: -11.3667,
    longitude: 29.5500,
    ...projectCoords(-11.3667, 29.5500),
    highlights: ["Shoebill Stork Canoe Search", "Samfya White Sand Beach", "Chita Beach Chalets", "Black Lechwe Herds"],
    price: "From ZMW 1,600",
    rating: 4.8
  },
  {
    id: "lake-tanganyika",
    slug: "lake-tanganyika-mbala",
    name: "Lake Tanganyika & Ndole Bay",
    category: "stays",
    categoryName: "Stays & Diving",
    categoryIcon: "⌂",
    provinceCode: "ZM-NOR",
    provinceName: "Northern Province",
    region: "Northern & Great Lakes",
    summary: "The world's longest freshwater lake featuring pristine scuba diving, endemic cichlid fish, and Nsumbu National Park.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82",
    latitude: -8.8333,
    longitude: 31.0000,
    ...projectCoords(-8.8333, 31.0000),
    highlights: ["Freshwater Scuba & Snorkeling", "Ndole Bay Sandy Beach Chalets", "Kalambo Falls Expedition", "Nsumbu Park Boat Safaris"],
    price: "From ZMW 2,200",
    rating: 4.9
  },
  {
    id: "kasanka-bat",
    slug: "kasanka-national-park",
    name: "Kasanka National Park (Bat Migration)",
    category: "events",
    categoryName: "Nature Events",
    categoryIcon: "♨",
    provinceCode: "ZM-CEN",
    provinceName: "Central Province",
    region: "Central & Northern Circuit",
    summary: "Home to the world's largest mammal migration where 10 million fruit bats arrive between October and December.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82",
    latitude: -12.5667,
    longitude: 30.2500,
    ...projectCoords(-12.5667, 30.2500),
    highlights: ["10 Million Fruit Bat Swarm", "Tree Canopy Hide Sunrises", "Rare Sitatunga Antelope", "Fibwe Treehouse Stays"],
    price: "From ZMW 1,950",
    rating: 4.9
  },
  {
    id: "zambezi-source",
    slug: "solwezi-zambezi-west",
    name: "Source of the Zambezi (Ikelenge)",
    category: "culture",
    categoryName: "Culture & Heritage",
    categoryIcon: "♨",
    provinceCode: "ZM-NW",
    provinceName: "North-Western Province",
    region: "North-Western Circuit",
    summary: "The sacred, forested birthplace where Africa's fourth-longest river begins its journey to the Indian Ocean.",
    imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82",
    latitude: -11.3667,
    longitude: 24.3167,
    ...projectCoords(-11.3667, 24.3167),
    highlights: ["Sacred Springhead Botanical Reserve", "Zambezi River Wooden Footbridge", "Lunda Royal Heritage", "Pineapple Farmlands"],
    price: "From ZMW 350",
    rating: 4.7
  },
  {
    id: "lusaka-heritage",
    slug: "lusaka-capital-circuit",
    name: "Lusaka City & Kabwata Cultural Village",
    category: "culture",
    categoryName: "Culture & Crafts",
    categoryIcon: "♨",
    provinceCode: "ZM-LUS",
    provinceName: "Lusaka Province",
    region: "Lusaka Central",
    summary: "Zambia's vibrant cosmopolitan capital featuring traditional artisan carving villages, wildlife sanctuaries, and top dining.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82",
    latitude: -15.4167,
    longitude: 28.2833,
    ...projectCoords(-15.4167, 28.2833),
    highlights: ["Kabwata Woodcarving Workshops", "Lusaka National Museum", "Elephant Orphanage Nursery", "Chitenge Fabric Bazaars"],
    price: "From ZMW 250",
    rating: 4.6
  },
  {
    id: "lochinvar-np",
    slug: "lochinvar-national-park",
    name: "Lochinvar National Park & Kafue Flats",
    category: "nature",
    categoryName: "Wetlands & Birding",
    categoryIcon: "◇",
    provinceCode: "ZM-SOU",
    provinceName: "Southern Province",
    region: "Southern Safari & Zambezi",
    summary: "World-renowned wetland paradise hosting over 420 bird species and massive herds of endemic Kafue Lechwe.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82",
    latitude: -15.9833,
    longitude: 27.2500,
    ...projectCoords(-15.9833, 27.2500),
    highlights: ["420+ Avian Species Birding", "Endemic Kafue Lechwe Herds", "Gwisho Prehistoric Hot Springs", "Chunga Lagoon Canoe Trails"],
    price: "From ZMW 850",
    rating: 4.7
  }
];

interface ZambiaInteractiveMapProps {
  onSelectDestination?: (slug: string) => void;
  onClose?: () => void;
}

export default function ZambiaInteractiveMap({ onSelectDestination, onClose }: ZambiaInteractiveMapProps) {
  const [selectedPin, setSelectedPin] = useState<MapDestinationPin | null>(ZAMBIA_TOURISM_PINS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredPins = useMemo(() => {
    return ZAMBIA_TOURISM_PINS.filter((pin) => {
      const matchCat = selectedCategory === "all" || pin.category === selectedCategory;
      const matchProv = selectedProvinceCode === "all" || pin.provinceCode === selectedProvinceCode;
      const matchSearch =
        !searchTerm.trim() ||
        pin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pin.provinceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pin.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pin.highlights.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchProv && matchSearch;
    });
  }, [selectedCategory, selectedProvinceCode, searchTerm]);

  return (
    <div className="zambiaMapWrapper">
      {/* Map Header */}
      <div className="zambiaMapHeader">
        <div>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#25d366", textTransform: "uppercase" }}>
            🗺️ GEOGRAPHIC TOURISM EXPLORER
          </span>
          <h2 style={{ fontSize: "20px", margin: "4px 0 0", color: "#ffffff", fontWeight: 700 }}>
            Interactive Zambia Tourism & Safari Map
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.08)", borderRadius: "8px", padding: "6px 12px", border: "1px solid rgba(255,255,255,0.15)" }}>
            <span style={{ marginRight: "6px" }}>🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Victoria Falls, Mfuwe, Kafue..."
              style={{ background: "transparent", border: "none", color: "#fff", outline: "none", fontSize: "13px", width: "190px" }}
            />
            {searchTerm && <button onClick={() => setSearchTerm("")} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer" }}>×</button>}
          </div>
          {onClose && (
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
              Close ×
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="zambiaMapFilters">
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Filters:</span>
        <button
          onClick={() => setSelectedCategory("all")}
          style={{ padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", background: selectedCategory === "all" ? "#25d366" : "rgba(255,255,255,0.1)", color: selectedCategory === "all" ? "#000" : "#fff" }}
        >
          All Categories ({ZAMBIA_TOURISM_PINS.length})
        </button>
        <button
          onClick={() => setSelectedCategory("nature")}
          style={{ padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", background: selectedCategory === "nature" ? "#25d366" : "rgba(255,255,255,0.1)", color: selectedCategory === "nature" ? "#000" : "#fff" }}
        >
          ◇ Nature & Falls
        </button>
        <button
          onClick={() => setSelectedCategory("tours")}
          style={{ padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", background: selectedCategory === "tours" ? "#25d366" : "rgba(255,255,255,0.1)", color: selectedCategory === "tours" ? "#000" : "#fff" }}
        >
          ◒ Safari Tours
        </button>
        <button
          onClick={() => setSelectedCategory("stays")}
          style={{ padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", background: selectedCategory === "stays" ? "#25d366" : "rgba(255,255,255,0.1)", color: selectedCategory === "stays" ? "#000" : "#fff" }}
        >
          ⌂ Luxury Stays & Lodges
        </button>
        <button
          onClick={() => setSelectedCategory("culture")}
          style={{ padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", background: selectedCategory === "culture" ? "#25d366" : "rgba(255,255,255,0.1)", color: selectedCategory === "culture" ? "#000" : "#fff" }}
        >
          ♨ Culture & Heritage
        </button>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Province:</label>
          <select
            value={selectedProvinceCode}
            onChange={(e) => setSelectedProvinceCode(e.target.value)}
            style={{ background: "#103333", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", outline: "none" }}
          >
            <option value="all">All 10 Provinces</option>
            {ZAMBIA_PROVINCES.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name} ({p.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map Body: Canvas on Left, Details on Right (Stacking on mobile) */}
      <div className="zambiaMapBody">
        {/* SVG Map Canvas */}
        <div className="zambiaMapCanvasWrapper">
          {/* Compass Rose */}
          <div style={{ position: "absolute", top: "14px", left: "16px", opacity: 0.8, pointerEvents: "none", textAlign: "center", fontSize: "11px", fontWeight: 700, color: "#25d366", zIndex: 5 }}>
            <span style={{ fontSize: "18px", display: "block" }}>🧭</span>
            <span>N</span>
          </div>

          <svg viewBox="0 0 800 600" style={{ width: "100%", height: "auto", maxHeight: "480px", minHeight: "300px", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.6))" }}>
            {/* Outline shape of Zambia with national boundaries & rivers */}
            <path
              d="M 120 220 
                 L 220 180 
                 L 280 190 
                 L 360 160 
                 L 400 130 
                 L 460 70 
                 L 540 50 
                 L 640 90 
                 L 690 140 
                 L 720 230 
                 L 740 310 
                 L 700 370 
                 L 640 400 
                 L 580 430 
                 L 520 440 
                 L 480 490 
                 L 410 520 
                 L 330 540 
                 L 270 550 
                 L 210 520 
                 L 140 450 
                 L 90 380 
                 L 80 290 Z"
              fill="#0d2828"
              stroke="#25d366"
              strokeWidth="2"
              strokeDasharray="4 2"
              opacity="0.9"
            />

            {/* Major Rivers (Zambezi, Luangwa, Kafue, Luapula) */}
            {/* Zambezi River from West to South to East */}
            <path
              d="M 80 300 Q 140 420 210 510 T 330 540 T 480 480 T 640 390"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="3"
              opacity="0.6"
            />
            {/* Kafue River */}
            <path
              d="M 370 170 Q 320 260 350 360 T 460 480"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              opacity="0.4"
            />
            {/* Luangwa River */}
            <path
              d="M 680 140 Q 640 250 560 380 T 520 440"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              opacity="0.4"
            />

            {/* Provincial Regional Overlays */}
            <text x="240" y="525" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">SOUTHERN</text>
            <text x="440" y="440" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">LUSAKA</text>
            <text x="630" y="270" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">EASTERN (LUANGWA)</text>
            <text x="320" y="320" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">CENTRAL (KAFUE)</text>
            <text x="130" y="340" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">WESTERN (LIUWA)</text>
            <text x="460" y="190" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">LUAPULA</text>
            <text x="560" y="120" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">NORTHERN (TANGANYIKA)</text>
            <text x="590" y="200" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">MUCHINGA</text>
            <text x="360" y="210" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">COPPERBELT</text>
            <text x="180" y="230" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="700">NORTH-WESTERN</text>

            {/* Interactive Pins */}
            {filteredPins.map((pin) => {
              const isSelected = selectedPin?.id === pin.id;
              const pinColor =
                pin.category === "stays" ? "#f59e0b" :
                pin.category === "tours" ? "#10b981" :
                pin.category === "nature" ? "#06b6d4" :
                pin.category === "culture" ? "#ec4899" : "#a855f7";

              return (
                <g
                  key={pin.id}
                  transform={`translate(${pin.x}, ${pin.y})`}
                  onClick={() => setSelectedPin(pin)}
                  style={{ cursor: "pointer", transition: "transform 0.2s ease" }}
                >
                  {/* Pulse ring if selected */}
                  {isSelected && (
                    <circle r="22" fill="none" stroke="#25d366" strokeWidth="2" opacity="0.8">
                      <animate attributeName="r" values="16;26;16" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Pin Background Bubble */}
                  <circle
                    r={isSelected ? "14" : "11"}
                    fill={isSelected ? "#25d366" : pinColor}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                  />

                  {/* Pin Icon */}
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill={isSelected ? "#000000" : "#ffffff"}
                    fontSize={isSelected ? "11" : "9"}
                    fontWeight="bold"
                  >
                    {pin.categoryIcon}
                  </text>

                  {/* Pin Label */}
                  <rect
                    x="-45"
                    y={isSelected ? "-32" : "-26"}
                    width="90"
                    height="16"
                    rx="4"
                    fill="rgba(0,0,0,0.85)"
                    stroke={isSelected ? "#25d366" : "rgba(255,255,255,0.2)"}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y={isSelected ? "-20" : "-14"}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight={isSelected ? "bold" : "normal"}
                  >
                    {pin.name.length > 15 ? pin.name.slice(0, 14) + "…" : pin.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Region Legend Placed Cleanly as a Strip Below Map */}
          <div className="zambiaMapCircuitsBar">
            <span style={{ fontWeight: 700, color: "#25d366", marginRight: "4px" }}>Safaris Circuits:</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "#10b981", display: "inline-block" }} />
              <span>Southern (Livingstone / Kariba)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "#f59e0b", display: "inline-block" }} />
              <span>Luangwa Valley (Mfuwe)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "#3b82f6", display: "inline-block" }} />
              <span>Northern Lakes (Tanganyika)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "#8b5cf6", display: "inline-block" }} />
              <span>Greater Kafue & Liuwa Plain</span>
            </div>
          </div>
        </div>

        {/* Selected Destination Preview Drawer */}
        <div className="zambiaMapDetailPanel">
          {selectedPin ? (
            <div>
              <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", marginBottom: "14px", height: "160px", background: "#000" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPin.imageUrl}
                  alt={selectedPin.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(0,0,0,0.75)", color: "#25d366", fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px" }}>
                  {selectedPin.categoryIcon} {selectedPin.categoryName}
                </span>
                <span style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,0.75)", color: "#facc15", fontSize: "12px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px" }}>
                  ★ {selectedPin.rating.toFixed(1)}
                </span>
              </div>

              <span style={{ fontSize: "11px", fontWeight: 700, color: "#25d366", textTransform: "uppercase" }}>
                {selectedPin.provinceName} · {selectedPin.region}
              </span>
              <h3 style={{ fontSize: "18px", margin: "4px 0 8px", color: "#fff", fontWeight: 700, lineHeight: 1.3 }}>
                {selectedPin.name}
              </h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5, margin: "0 0 14px" }}>
                {selectedPin.summary}
              </p>

              <div style={{ marginBottom: "14px" }}>
                <strong style={{ fontSize: "12px", color: "#fff", display: "block", marginBottom: "6px" }}>Key Highlights:</strong>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  {selectedPin.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              {selectedPin.price && (
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>Estimated Rate:</span>
                  <strong style={{ fontSize: "15px", color: "#25d366" }}>{selectedPin.price}</strong>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 10px", color: "rgba(255,255,255,0.5)" }}>
              <span style={{ fontSize: "36px", display: "block", marginBottom: "10px" }}>📍</span>
              <p>Click on any pin on the map to inspect safari details, highlights, and lodge bookings.</p>
            </div>
          )}

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
              style={{ width: "100%", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}
            >
              Explore {selectedPin.name.split(" ")[0]} Listings →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

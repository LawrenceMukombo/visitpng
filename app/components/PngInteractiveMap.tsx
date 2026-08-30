"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  PNG_PROVINCES_GEOJSON,
  PNG_DISTRICTS_GEOJSON,
  KOKODA_TRACK_ROUTE_GEOJSON,
  ProvinceBoundaryProps,
  DistrictBoundaryProps,
  GeoJsonGeometry,
  projectLngLatToSvg,
  coordinatesToSvgPath
} from "../../db/pngShapefiles";
import { PNG_REGIONS, PngRegion } from "../../db/pngGeography";
import {
  calculatePngDistanceBreakdown,
  getPngDestinationTransportGuide,
  type DestinationDistanceBreakdown,
  type DestinationTransportGuide
} from "../../db/pngTransportAmenities";

export interface DestinationPin {
  id: string;
  name: string;
  provinceCode: string;
  provinceName: string;
  region: PngRegion;
  category: "stays" | "tours" | "nature" | "culture" | "events" | "marine" | "trek";
  categoryIcon: string;
  categoryName: string;
  lng: number;
  lat: number;
  summary: string;
  elevation?: string;
  highlightTag: string;
  priceEstimate: string;
  imageUrl: string;
  highlights: string[];
  contactPhone?: string;
  contactWhatsApp?: string;
}

export const PNG_DESTINATION_PINS: DestinationPin[] = [
  {
    id: "port-moresby",
    name: "Port Moresby Waterfront & Nature Sanctuary",
    provinceCode: "NCD",
    provinceName: "National Capital District",
    region: "Southern",
    category: "nature",
    categoryIcon: "🌿",
    categoryName: "National Capital & Sanctuary",
    lng: 147.18,
    lat: -9.44,
    summary: "National Capital gateway featuring the National Museum & Art Gallery, Ela Beach Boardwalk, and Port Moresby Nature Park.",
    elevation: "35m",
    highlightTag: "Capital Gateway",
    priceEstimate: "K 35 Nature Park Entry",
    imageUrl: "/facilities/airways_hotel_pom.jpg",
    highlights: [
      "Port Moresby Nature Park native bird sanctuary & tree kangaroos",
      "National Parliament House traditional Haus Tambaran architecture",
      "National Museum & Art Gallery historical bilas exhibits",
      "Ela Beach sunset boardwalk & Harbour City marina dining"
    ],
    contactPhone: "+6753214188",
    contactWhatsApp: "67579988000"
  },
  {
    id: "kokoda-track",
    name: "Kokoda Track & Owen Stanley Range",
    provinceCode: "CP",
    provinceName: "Central & Oro Provinces",
    region: "Southern",
    category: "trek",
    categoryIcon: "🥾",
    categoryName: "Historic Wilderness Trek",
    lng: 147.74,
    lat: -8.88,
    summary: "Historic 96km pilgrimage through rugged mountain cloud forests between Owers' Corner and Kokoda Station.",
    elevation: "2,190m (Mount Bellamy Summit)",
    highlightTag: "Historic 96km Memorial Trail",
    priceEstimate: "K 650 KTA Trek Permit",
    imageUrl: "/facilities/kokoda_track_memorial.jpg",
    highlights: [
      "96km historical Owen Stanley mountain crossing",
      "Isurava Memorial & Kingsbury VC Rock pilgrimage",
      "Brigade Hill sacred battlefield & Menari Village homestays",
      "Mount Bellamy rainforest cloud forest crossing (2,190m)"
    ],
    contactPhone: "+6753230071",
    contactWhatsApp: "67579988000"
  },
  {
    id: "mount-wilhelm",
    name: "Mount Wilhelm Alpine Summit & Lakes",
    provinceCode: "SIM",
    provinceName: "Simbu (Chimbu) Province",
    region: "Highlands",
    category: "trek",
    categoryIcon: "⛰️",
    categoryName: "Alpine Summit Expedition",
    lng: 145.03,
    lat: -5.78,
    summary: "Papua New Guinea's highest alpine summit (4,509m / 14,793ft), glacial tarns Lake Piunde and Aunde, and Keglsugl Basecamp.",
    elevation: "4,509m (Highest Peak in PNG)",
    highlightTag: "Highest Summit in Oceania",
    priceEstimate: "K 220 Climb Clearance",
    imageUrl: "/facilities/bettys_lodge_wilhelm.jpg",
    highlights: [
      "Summit sunrise over Bismarck Range and both coasts on clear dawn",
      "Glacial tarns Lake Piunde and Lake Aunde alpine camps",
      "Keglsugl traditional trout farms and orchid gardens",
      "Sub-alpine rhododendron and cycad high-altitude wilderness"
    ],
    contactPhone: "+6757351000",
    contactWhatsApp: "67579988000"
  },
  {
    id: "goroka-asaro",
    name: "Goroka & Asaro Mudmen Valley",
    provinceCode: "EHP",
    provinceName: "Eastern Highlands Province",
    region: "Highlands",
    category: "culture",
    categoryIcon: "🎭",
    categoryName: "Highland Cultural Festival",
    lng: 145.39,
    lat: -6.08,
    summary: "Home to the annual Goroka Cultural Show, organic highland coffee estates, and Asaro clay-mask warrior re-enactments.",
    elevation: "1,546m",
    highlightTag: "Goroka Show & Asaro Mudmen",
    priceEstimate: "K 100 Show Entry",
    imageUrl: "/facilities/asaro_mudmen_goroka.jpg",
    highlights: [
      "World-famous Asaro Mudmen ghost warrior dance performances",
      "Goroka Cultural Show with 100+ tribal sing-sing groups",
      "JK McCarthy Museum ancestral artifacts and WWII relics",
      "Highland Arabica coffee plantation tastings & roasteries"
    ],
    contactPhone: "+6757321155",
    contactWhatsApp: "67579988000"
  },
  {
    id: "mount-hagen",
    name: "Mount Hagen & Wahgi Valley",
    provinceCode: "WHP",
    provinceName: "Western Highlands Province",
    region: "Highlands",
    category: "culture",
    categoryIcon: "🌿",
    categoryName: "Melpa Tribal Sing-Sings",
    lng: 144.23,
    lat: -5.86,
    summary: "Highland commercial capital renowned for Melpa warrior sing-sings, Rondon Ridge birding cloud forests, and organic tea farms.",
    elevation: "1,677m",
    highlightTag: "Mount Hagen Sing-Sing",
    priceEstimate: "K 150 Cultural Pass",
    imageUrl: "/facilities/ambua_lodge_tari.jpg",
    highlights: [
      "Melpa warrior headdresses with Raggiana Bird of Paradise plumes",
      "Mount Hagen Cultural Show arena & traditional exchanges",
      "Baiyer River Wildlife Sanctuary birding trails",
      "Wahgi Valley organic tea and coffee estates"
    ],
    contactPhone: "+6755421255",
    contactWhatsApp: "67579988000"
  },
  {
    id: "kimbe-bay",
    name: "Kimbe Bay & Walindi Coral Seamounts",
    provinceCode: "WNB",
    provinceName: "West New Britain Province",
    region: "Islands",
    category: "marine",
    categoryIcon: "🤿",
    categoryName: "Coral Triangle Scuba Haven",
    lng: 150.15,
    lat: -5.55,
    summary: "Global epicenter of marine biodiversity with 60% of all Indo-Pacific coral species, volcanic seamounts, and pelagic shark dives.",
    elevation: "Sea level",
    highlightTag: "World's Best Coral Seamounts",
    priceEstimate: "K 450 Scuba 2-Tank Dive",
    imageUrl: "/facilities/walindi_resort_kimbe.jpg",
    highlights: [
      "Over 900 reef fish species and 400+ hard coral varieties",
      "South Emma & Inglis volcanic deepwater seamount dives",
      "Frequent encounters with hammerhead sharks, dolphins & turtles",
      "Walindi Plantation Resort eco-diving & conservation outpost"
    ],
    contactPhone: "+6759835441",
    contactWhatsApp: "67579988000"
  },
  {
    id: "rabaul-tavurvur",
    name: "Rabaul Volcanoes & Baining Fire Dance",
    provinceCode: "ENB",
    provinceName: "East New Britain Province",
    region: "Islands",
    category: "culture",
    categoryIcon: "🌋",
    categoryName: "Volcanoes & Sacred Fire Dance",
    lng: 152.17,
    lat: -4.20,
    summary: "Spectacular active volcanoes Mount Tavurvur and Vulcan overlooking Simpson Harbour, with sacred Baining masked fire dancing.",
    elevation: "Sea level to 688m",
    highlightTag: "Baining Fire Dance & Volcanoes",
    priceEstimate: "K 180 Fire Dance Pass",
    imageUrl: "/facilities/rapopo_resort_kokopo.jpg",
    highlights: [
      "Baining spirit dancers leaping barefoot across blazing bonfires",
      "Mount Tavurvur steaming volcanic crater climbs & hot springs",
      "Simpson Harbour WWII submarine pens & coral wreck diving",
      "Duke of York Islands dolphin swimming & white sand lagoons"
    ],
    contactPhone: "+6759828255",
    contactWhatsApp: "67579988000"
  },
  {
    id: "tufi-fjords",
    name: "Tufi Volcanic Fjords & Coral Atolls",
    provinceCode: "ORO",
    provinceName: "Oro (Northern) Province",
    region: "Southern",
    category: "marine",
    categoryIcon: "🛶",
    categoryName: "Tropical Volcanic Fjords",
    lng: 149.02,
    lat: -9.08,
    summary: "Dramatic volcanic rias (tropical fjords) carved by prehistoric lava flows, secluded village homestays, and pristine reef diving.",
    elevation: "Sea level",
    highlightTag: "Tropical Volcanic Fjords",
    priceEstimate: "K 320 Fjord Kayak Tour",
    imageUrl: "/facilities/tufi_resort_fjords.jpg",
    highlights: [
      "Traditional outrigger canoe safaris into vertical mossy fjords",
      "Outer reef hammerhead shark and manta ray scuba diving",
      "Traditional Oro face-tattooing (Tatu) cultural demonstrations",
      "Gofirra and McLaren fjord secret waterfall lagoons"
    ],
    contactPhone: "+6753231455",
    contactWhatsApp: "67579988000"
  },
  {
    id: "sepik-river",
    name: "Sepik River & Middle Sepik Haus Tambaran",
    provinceCode: "ESP",
    provinceName: "East Sepik Province",
    region: "Momase",
    category: "culture",
    categoryIcon: "🐊",
    categoryName: "River Spirit Houses & Carvings",
    lng: 143.20,
    lat: -4.15,
    summary: "The cultural soul of PNG featuring monumental Haus Tambaran (Spirit Houses), crocodile initiation scars, and master woodcarvers.",
    elevation: "20m - 100m",
    highlightTag: "Crocodile Spirit Houses",
    priceEstimate: "K 280 River Canoe Safari",
    imageUrl: "/facilities/sepik_haus_tambaran.jpg",
    highlights: [
      "Kanganaman & Palembei soaring Spirit Houses (UNESCO Tentative)",
      "Iatmul crocodile initiation rites and sacred wood carvings",
      "Motorized dug-out canoe journeys through Sepik lotus lagoons",
      "Chambri Lakes pottery villages & Blackwater river channels"
    ],
    contactPhone: "+6758561122",
    contactWhatsApp: "67579988000"
  },
  {
    id: "alotau-milne-bay",
    name: "Milne Bay & Kula Ring Canoe Regattas",
    provinceCode: "MBP",
    provinceName: "Milne Bay Province",
    region: "Southern",
    category: "culture",
    categoryIcon: "⛵",
    categoryName: "War Canoe Regattas & Tawali",
    lng: 150.45,
    lat: -10.31,
    summary: "Ancient Kula trade ring maritime culture, National Canoe & Kundu Festival war canoe regattas, and Tawali dive seamounts.",
    elevation: "Sea level",
    highlightTag: "Kula Ring Maritime Culture",
    priceEstimate: "K 120 Festival Pass",
    imageUrl: "/facilities/tawali_resort_milne.jpg",
    highlights: [
      "National Canoe & Kundu Festival with 40-warrior paddling regattas",
      "Tawali Resort liveaboard dive drop-offs & manta cleaning stations",
      "Trobriand Islands (Islands of Love) sacred Yam harvest dances",
      "Deidei thermal geysers & volcanic boiling springs on Fergusson Island"
    ],
    contactPhone: "+6756411222",
    contactWhatsApp: "67579988000"
  },
  {
    id: "madang-lagoon",
    name: "Madang Lagoon & Kalibobo Lighthouse",
    provinceCode: "MAD",
    provinceName: "Madang Province",
    region: "Momase",
    category: "marine",
    categoryIcon: "🤿",
    categoryName: "Coastal Lagoon & WWII Wrecks",
    lng: 145.79,
    lat: -5.22,
    summary: "Pristine coastal lagoon known as the prettiest town in the South Pacific with giant flying foxes, WWII shipwrecks, and diving.",
    elevation: "Sea level",
    highlightTag: "Flying Foxes & Scuba Reefs",
    priceEstimate: "K 380 Harbor Tour",
    imageUrl: "/facilities/walindi_resort_kimbe.jpg",
    highlights: [
      "Kalibobo Coast Guard memorial lighthouse and harbor gardens",
      "Pig Island and Kranket Island protected snorkeling lagoons",
      "Over 10,000 giant fruit bats roosting in town center canopy",
      "Balek Wildlife Sanctuary sulphur springs & eel feeding"
    ],
    contactPhone: "+6758522655",
    contactWhatsApp: "67579988000"
  },
  {
    id: "tari-huli",
    name: "Tari Valley & Huli Wigmen Sanctuary",
    provinceCode: "HEL",
    provinceName: "Hela Province",
    region: "Highlands",
    category: "culture",
    categoryIcon: "🪶",
    categoryName: "Huli Wigmen & Cloud Forest",
    lng: 142.95,
    lat: -5.85,
    summary: "Legendary Huli Wigmen bachelor schools, ornate human-hair ceremonial headdresses, and Tari Basin bird-of-paradise watching.",
    elevation: "1,700m - 2,800m",
    highlightTag: "Huli Wigmen Bachelor Schools",
    priceEstimate: "K 150 Cultural Tour",
    imageUrl: "/facilities/ambua_lodge_tari.jpg",
    highlights: [
      "Traditional Huli Wigmen bachelor initiation schools & hair growing",
      "Red & yellow ochre facial paint ceremonial sing-sing demonstrations",
      "Ambua Lodge bird-of-paradise canopy trail (13 distinct species)",
      "Tagari River gorge limestone cliff suspension footbridges"
    ],
    contactPhone: "+6755421555",
    contactWhatsApp: "67579988000"
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

// Generate real visible OpenStreetMap tiles (100% free, watermark-free)
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
        key: `${zoom}-${wrappedX}-${ty}`,
        url,
        x: Math.round(posX),
        y: Math.round(posY)
      });
    }
  }

  return tiles;
}

export default function PngInteractiveMap({
  onSelectDestination,
  onSelectProvince
}: PngInteractiveMapProps) {
  // Map Mode: Vector GIS Explorer vs Live OpenStreetMap
  const [mapMode, setMapMode] = useState<"vector" | "osm">("vector");

  // Map View State (WGS84 Coordinates)
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: -6.3, lng: 147.0 });
  const [zoom, setZoom] = useState<number>(6);
  const [tileLayer, setTileLayer] = useState<"osm" | "esriStreet" | "esriTopo">("osm");

  // Selection & Layer States
  const [selectedRegion, setSelectedRegion] = useState<PngRegion | "All">("All");
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceBoundaryProps | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceBoundaryProps | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictBoundaryProps | null>(null);
  const [selectedPin, setSelectedPin] = useState<DestinationPin | null>(PNG_DESTINATION_PINS[0]);
  const [showDistrictsLayer, setShowDistrictsLayer] = useState(true);
  const [showKokodaRoute, setShowKokodaRoute] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Dragging / Pan state
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 680, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (mapContainerRef.current) {
        const w = mapContainerRef.current.clientWidth || 680;
        setDimensions({ width: w, height: Math.max(460, Math.min(580, w * 0.65)) });
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

  // Reset View
  const handleResetView = () => {
    setCenter({ lat: -6.3, lng: 147.0 });
    setZoom(6);
    setSelectedProvince(null);
    setSelectedDistrict(null);
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
    setSelectedPin(pin);
    setSelectedDistrict(null);
    setCenter({ lat: pin.lat, lng: pin.lng });
    setZoom(9);
  }, []);

  // Regional styling helpers
  const getRegionTheme = (region: PngRegion) => {
    switch (region) {
      case "Highlands": return { stroke: "#F59E0B", fill: "rgba(245, 158, 11, 0.14)", glow: "rgba(245, 158, 11, 0.4)" };
      case "Southern": return { stroke: "#10B981", fill: "rgba(16, 185, 129, 0.14)", glow: "rgba(16, 185, 129, 0.4)" };
      case "Momase": return { stroke: "#06B6D4", fill: "rgba(6, 182, 212, 0.14)", glow: "rgba(6, 182, 212, 0.4)" };
      case "Islands": return { stroke: "#F97316", fill: "rgba(249, 115, 22, 0.14)", glow: "rgba(249, 115, 22, 0.4)" };
      default: return { stroke: "#CBD5E1", fill: "rgba(255, 255, 255, 0.08)", glow: "rgba(255, 255, 255, 0.3)" };
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

  // Calculate distance breakdown and transport guide for the active pin
  const distanceBreakdown: DestinationDistanceBreakdown | null = useMemo(() => {
    if (!selectedPin) return null;
    return calculatePngDistanceBreakdown(
      selectedPin.lat,
      selectedPin.lng,
      selectedPin.name,
      selectedPin.provinceCode,
      selectedPin.provinceName
    );
  }, [selectedPin]);

  const transportGuide: DestinationTransportGuide | null = useMemo(() => {
    if (!selectedPin) return null;
    return getPngDestinationTransportGuide(
      selectedPin.name,
      selectedPin.provinceCode,
      selectedPin.provinceName
    );
  }, [selectedPin]);

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
              VISITPNG GIS ATLAS
            </span>
            <span style={{ color: "#34D399", fontSize: "0.76rem", fontWeight: 700 }}>
              22 Provinces · 89+ Districts · Kokoda 96km GPS Route
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.01em" }}>
            Papua New Guinea Interactive Tourism & GIS Map
          </h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: "#94A3B8" }}>
            Explore cultural sing-sings, Kokoda Track wilderness, coral seamounts, flight times from Port Moresby, and 4WD access.
          </p>
        </div>

        {/* View Mode Toggle & Layer Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* Map Style Mode Switcher */}
          <div style={{ display: "flex", background: "rgba(0,0,0,0.4)", padding: "3px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)" }}>
            <button
              type="button"
              onClick={() => setMapMode("vector")}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                border: "none",
                background: mapMode === "vector" ? "linear-gradient(135deg, #EA580C 0%, #F97316 100%)" : "transparent",
                color: "#FFFFFF",
                fontSize: "0.74rem",
                fontWeight: 800,
                cursor: "pointer"
              }}
            >
              🗺️ Vector GIS Map
            </button>
            <button
              type="button"
              onClick={() => setMapMode("osm")}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                border: "none",
                background: mapMode === "osm" ? "linear-gradient(135deg, #059669 0%, #10B981 100%)" : "transparent",
                color: "#FFFFFF",
                fontSize: "0.74rem",
                fontWeight: 800,
                cursor: "pointer"
              }}
            >
              🌍 OpenStreetMap (OSM)
            </button>
          </div>

          {/* Layer Visibility Toggles */}
          <label style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.74rem", color: "#6EE7B7", cursor: "pointer", background: "rgba(0,0,0,0.3)", padding: "5px 10px", borderRadius: "6px", border: "1px solid rgba(52, 211, 153, 0.3)" }}>
            <input
              type="checkbox"
              checked={showBoundaries}
              onChange={(e) => setShowBoundaries(e.target.checked)}
            />
            Boundaries (ADM1)
          </label>

          <label style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.74rem", color: "#38BDF8", cursor: "pointer", background: "rgba(0,0,0,0.3)", padding: "5px 10px", borderRadius: "6px", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
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
            Kokoda 96km
          </label>
        </div>
      </div>

      {/* Region & Category Filter Tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
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
            All 4 Regions
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
            { id: "all", label: "All Categories" },
            { id: "culture", label: "🎭 Sing-Sings & Tribes" },
            { id: "trek", label: "🥾 Kokoda & Peaks" },
            { id: "marine", label: "🤿 Coral Triangle Diving" },
            { id: "nature", label: "🦜 Rainforest Wildlife" }
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "18px", maxWidth: "100%" }}>
        {/* Map Canvas */}
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
          {/* 1. OpenStreetMap Mode Raster Tiles */}
          {mapMode === "osm" && (
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
          )}

          {/* 2. Vector Map Background Ocean Grid (in Vector mode) */}
          {mapMode === "vector" && (
            <svg
              viewBox="0 0 1000 600"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, #03201B 0%, #021612 100%)",
                pointerEvents: "none"
              }}
            >
              {/* Ocean Latitude / Longitude Subtle Grid */}
              <defs>
                <pattern id="oceanGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(52, 211, 153, 0.05)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="1000" height="600" fill="url(#oceanGrid)" />
            </svg>
          )}

          {/* 3. SVG Vector GIS Layer */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "auto"
            }}
          >
            {/* Vector Mode: Render Full Province Polygons */}
            {mapMode === "vector" && provinceFeatures.map(f => {
              const p = f.properties;
              const theme = getRegionTheme(p.region);
              const isSelected = selectedProvince?.code === p.code;
              const isHovered = hoveredProvince?.code === p.code;
              const pathData = coordinatesToSvgPath(f.geometry, dimensions.width, dimensions.height);

              return (
                <path
                  key={p.code}
                  d={pathData}
                  fill={isSelected ? "rgba(234, 88, 12, 0.35)" : isHovered ? theme.glow : theme.fill}
                  stroke={isSelected ? "#EA580C" : isHovered ? "#FFFFFF" : theme.stroke}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
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

            {/* OSM Mode: Render Clean Boundary Strokes (No Obscuring Fill) */}
            {mapMode === "osm" && showBoundaries && provinceFeatures.map(f => {
              const p = f.properties;
              const theme = getRegionTheme(p.region);
              const isSelected = selectedProvince?.code === p.code;
              const isHovered = hoveredProvince?.code === p.code;
              const pathData = renderGeoJsonToSvgPath(f.geometry);

              return (
                <path
                  key={`osm-${p.code}`}
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

            {/* Kokoda Track GPS Line (96km) */}
            {showKokodaRoute && (
              <path
                d={mapMode === "vector"
                  ? coordinatesToSvgPath(KOKODA_TRACK_ROUTE_GEOJSON.geometry, dimensions.width, dimensions.height)
                  : renderGeoJsonToSvgPath(KOKODA_TRACK_ROUTE_GEOJSON.geometry)
                }
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
            {showDistrictsLayer && PNG_DISTRICTS_GEOJSON.features.map(f => {
              const d = f.properties;
              const [px, py] = mapMode === "vector"
                ? projectLngLatToSvg(d.centroid[0], d.centroid[1], dimensions.width, dimensions.height)
                : latLngToTilePixel(d.centroid[1], d.centroid[0], zoom, center.lat, center.lng, dimensions.width, dimensions.height);

              if (px < -20 || px > dimensions.width + 20 || py < -20 || py > dimensions.height + 20) return null;

              return (
                <g key={d.id} transform={`translate(${px}, ${py})`} onClick={(e) => { e.stopPropagation(); handleDistrictClick(d); }} style={{ cursor: "pointer" }}>
                  <circle r={4.5} fill="#10B981" stroke="#FFFFFF" strokeWidth={1.2} />
                  <text y={-8} textAnchor="middle" fill="#FFFFFF" fontSize="9px" fontWeight="800" style={{ textShadow: "0 1px 3px #000000" }}>
                    {d.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}

            {/* Tourism Hotspot Destination Pins */}
            {filteredPins.map(pin => {
              const [px, py] = mapMode === "vector"
                ? projectLngLatToSvg(pin.lng, pin.lat, dimensions.width, dimensions.height)
                : latLngToTilePixel(pin.lat, pin.lng, zoom, center.lat, center.lng, dimensions.width, dimensions.height);

              if (px < -30 || px > dimensions.width + 30 || py < -30 || py > dimensions.height + 30) return null;
              const isPinActive = selectedPin?.id === pin.id;

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
                    {pin.categoryIcon} {pin.name.split(" ")[0]}
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

          {/* Map Overlay On-Screen Controls */}
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
              onClick={handleResetView}
              style={{ width: "32px", height: "32px", background: "rgba(11, 38, 33, 0.9)", color: "#34D399", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer", display: "grid", placeItems: "center" }}
              title="Reset Country View"
            >
              🇵🇬
            </button>
          </div>

          {/* Current GPS Coordinates Badge */}
          <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "rgba(0,0,0,0.7)", padding: "4px 8px", borderRadius: "6px", fontSize: "0.68rem", color: "#CBD5E1" }}>
            Lat: {center.lat.toFixed(2)}°S · Lng: {center.lng.toFixed(2)}°E · {mapMode === "vector" ? "Vector Mode" : `OSM Zoom ${zoom}`}
          </div>
        </div>

        {/* Right Inspector Column: Deep Location Profile & Transport Routing */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {selectedPin ? (
            <div
              style={{
                background: "rgba(15, 48, 42, 0.8)",
                borderRadius: "14px",
                border: "1px solid rgba(234, 88, 12, 0.3)",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)"
              }}
            >
              {/* Photo Hero Banner */}
              <div
                style={{
                  height: "135px",
                  backgroundImage: `url(${selectedPin.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative"
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)" }} />
                <span style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(0,0,0,0.8)", color: "#FDBA74", padding: "3px 8px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 800 }}>
                  {selectedPin.categoryIcon} {selectedPin.categoryName}
                </span>
                <span style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(5, 150, 105, 0.9)", color: "#FFFFFF", padding: "3px 8px", borderRadius: "6px", fontSize: "0.68rem", fontWeight: 800 }}>
                  ✓ VERIFIED DESTINATION
                </span>
                <div style={{ position: "absolute", bottom: "8px", left: "12px", right: "12px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 900, color: "#FFFFFF", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                    {selectedPin.name}
                  </h3>
                  <div style={{ fontSize: "0.75rem", color: "#6EE7B7", fontWeight: 700 }}>
                    {selectedPin.provinceName} · Elevation: {selectedPin.elevation}
                  </div>
                </div>
              </div>

              {/* Details Body */}
              <div style={{ padding: "16px" }}>
                <p style={{ margin: "0 0 12px 0", fontSize: "0.82rem", color: "#E2E8F0", lineHeight: 1.45 }}>
                  {selectedPin.summary}
                </p>

                {/* 3-Tier Distance & Transit Breakdown */}
                {distanceBreakdown && (
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", marginBottom: "12px", fontSize: "0.74rem" }}>
                    <div style={{ fontWeight: 800, color: "#FDBA74", marginBottom: "6px" }}>
                      📍 Access & Distance Routing:
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", color: "#CBD5E1" }}>
                      <div>
                        <span>Port Moresby (POM): </span>
                        <strong style={{ color: "#34D399" }}>{distanceBreakdown.flightTimeToPortMoresby}</strong>
                      </div>
                      <div>
                        <span>Provincial Capital: </span>
                        <strong style={{ color: "#FFFFFF" }}>{distanceBreakdown.driveTimeToCapital}</strong>
                      </div>
                    </div>
                    <div style={{ marginTop: "6px", color: "#94A3B8" }}>
                      Nearest Airport: <strong style={{ color: "#38BDF8" }}>{distanceBreakdown.nearestAirport.name} ({distanceBreakdown.nearestAirport.code})</strong>
                    </div>
                  </div>
                )}

                {/* Transport & Vehicle Guide */}
                {transportGuide && (
                  <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: "8px", padding: "8px 10px", marginBottom: "12px", fontSize: "0.72rem", color: "#CBD5E1" }}>
                    <strong style={{ color: "#EA580C" }}>🚐 Vehicle & Access: </strong>
                    <span>{transportGuide.roadAccess.recommendedVehicle}</span>
                  </div>
                )}

                {/* Verified Tariff Rates */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.35)", padding: "8px 12px", borderRadius: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.74rem", color: "#94A3B8" }}>Official Access / Clearance:</span>
                  <strong style={{ fontSize: "0.88rem", color: "#F59E0B" }}>{selectedPin.priceEstimate}</strong>
                </div>

                {/* Direct Emergency & Operator Inquiries Strip */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
                  <a
                    href={`tel:${selectedPin.contactPhone || "+6753214188"}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      textDecoration: "none"
                    }}
                  >
                    📞 Direct Call
                  </a>
                  <a
                    href={`https://wa.me/${selectedPin.contactWhatsApp || "67579988000"}?text=${encodeURIComponent(`Hello, I am inquiring about ${selectedPin.name} in Papua New Guinea on VisitPNG.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "rgba(37, 211, 102, 0.2)",
                      border: "1px solid rgba(37, 211, 102, 0.4)",
                      color: "#4ADE80",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      textDecoration: "none"
                    }}
                  >
                    💬 WhatsApp Wantok
                  </a>
                </div>

                {/* CTA Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectDestination) onSelectDestination(selectedPin.id);
                  }}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 16px",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(234, 88, 12, 0.4)"
                  }}
                >
                  Explore {selectedPin.name.split(" ")[0]} Listings & Passes ➔
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 10px", color: "rgba(255,255,255,0.5)" }}>
              <span style={{ fontSize: "36px", display: "block", marginBottom: "10px" }}>📍</span>
              <p>Click on any pin or district on the map to inspect cultural details, Kokoda waypoints, GPS points, and transport guides.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Horizontal Quick Selection Tray: All Filtered Map Points */}
      <div style={{ marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>📍</span>
            <strong style={{ fontSize: "0.82rem", color: "#FFFFFF" }}>
              All Filtered Map Locations ({filteredPins.length} Available):
            </strong>
          </div>
          <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>
            Click any card to center and inspect details
          </span>
        </div>

        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "8px" }}>
          {filteredPins.map((pin) => {
            const isSelected = selectedPin?.id === pin.id;
            return (
              <div
                key={pin.id}
                onClick={() => handlePinClick(pin)}
                style={{
                  flex: "0 0 190px",
                  background: isSelected ? "rgba(234, 88, 12, 0.2)" : "rgba(255, 255, 255, 0.04)",
                  border: isSelected ? "1.5px solid #EA580C" : "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{ height: "85px", width: "100%", position: "relative", overflow: "hidden", background: "rgba(0,0,0,0.5)" }}>
                  <img
                    src={pin.imageUrl}
                    alt={pin.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                  <span style={{ position: "absolute", top: "5px", left: "5px", background: "rgba(0,0,0,0.85)", fontSize: "0.68rem", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", color: "#FDBA74" }}>
                    {pin.categoryIcon} {pin.categoryName.split(" ")[0]}
                  </span>
                </div>
                <div style={{ padding: "8px" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.76rem", color: isSelected ? "#FDBA74" : "#FFFFFF", lineHeight: 1.3, marginBottom: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {pin.name}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#94A3B8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{pin.provinceName.split(" ")[0]}</span>
                    <span>📍 {pin.lat.toFixed(1)}°, {pin.lng.toFixed(1)}°</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Backward compatibility alias
export const ZambiaInteractiveMap = PngInteractiveMap;
export const ZAMBIA_TOURISM_PINS = PNG_DESTINATION_PINS;
export type { DestinationPin as MapDestinationPin };

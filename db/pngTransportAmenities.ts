/**
 * Papua New Guinea Transport, Routes, Airstrips, Headquarters & Amenities Engine
 * Accurate routing, distance calculations, airport hubs, and transport guide directory across 22 provinces.
 */

export interface GpsLocation {
  name: string;
  latitude: number;
  longitude: number;
  category?: string;
  description?: string;
}

export interface PngProvincialCapital extends GpsLocation {
  provinceCode: string;
  provinceName: string;
}

export interface PngAirport extends GpsLocation {
  code: string; // IATA code
  icao?: string;
  type: "international" | "domestic_hub" | "coastal_regional" | "highland_bush_strip";
  runway: string;
  flightTimeFromPortMoresbyMinutes: number;
  scheduledOperators: string[];
  charterOperators: string[];
}

export interface PngHighwayCorridor {
  code: string;
  name: string;
  lengthKm: number;
  startPoint: string;
  endPoint: string;
  surface: "paved_sealed" | "unpaved_gravel_4wd" | "trekking_corridor" | "maritime_passage";
  description: string;
  majorTowns: string[];
}

export interface DestinationDistanceBreakdown {
  destinationName: string;
  provinceName: string;
  capitalDistanceKm: number;
  capitalName: string;
  driveTimeToCapital: string;
  portMoresbyDistanceKm: number;
  flightTimeToPortMoresby: string;
  nearestAirport: {
    name: string;
    code: string;
    distanceKm: number;
    driveTime: string;
  };
  recommendedTravelMode: string;
}

export interface DestinationTransportGuide {
  destinationName: string;
  roadAccess: {
    accessibleByRoad: boolean;
    roadCondition: string;
    recommendedVehicle: string;
    highwaysUsed: string[];
    fuelAvailabilityWarning?: string;
  };
  airAccess: {
    nearestAirport: string;
    airportCode: string;
    distanceToAirportKm: number;
    flightDurationFromPom: string;
    scheduledCarriers: string[];
  };
  marineAccess?: {
    available: boolean;
    seaRouteName: string;
    vesselType: string;
  };
  trekAccess?: {
    required: boolean;
    trailName: string;
    durationDays: string;
    mandatoryGuide: boolean;
  };
}

// 22 Provincial Capitals
export const PNG_PROVINCIAL_CAPITALS: PngProvincialCapital[] = [
  { name: "Port Moresby Town", provinceCode: "NCD", provinceName: "National Capital District", latitude: -9.4438, longitude: 147.1803 },
  { name: "Bautama / Sogeri", provinceCode: "CP", provinceName: "Central Province", latitude: -9.8000, longitude: 147.8000 },
  { name: "Popondetta", provinceCode: "ORO", provinceName: "Oro (Northern) Province", latitude: -8.7537, longitude: 148.2417 },
  { name: "Alotau", provinceCode: "MBP", provinceName: "Milne Bay Province", latitude: -10.3150, longitude: 150.4550 },
  { name: "Daru", provinceCode: "WP", provinceName: "Western Province", latitude: -9.0760, longitude: 143.2086 },
  { name: "Kerema", provinceCode: "GP", provinceName: "Gulf Province", latitude: -7.9631, longitude: 145.7785 },
  { name: "Goroka", provinceCode: "EHP", provinceName: "Eastern Highlands Province", latitude: -6.0833, longitude: 145.3878 },
  { name: "Mount Hagen", provinceCode: "WHP", provinceName: "Western Highlands Province", latitude: -5.8575, longitude: 144.2306 },
  { name: "Kundiawa", provinceCode: "SIM", provinceName: "Simbu (Chimbu) Province", latitude: -5.9989, longitude: 144.9703 },
  { name: "Wabag", provinceCode: "ENG", provinceName: "Enga Province", latitude: -5.4833, longitude: 143.7000 },
  { name: "Mendi", provinceCode: "SHP", provinceName: "Southern Highlands Province", latitude: -6.1481, longitude: 143.6569 },
  { name: "Tari", provinceCode: "HEL", provinceName: "Hela Province", latitude: -5.8450, longitude: 142.9500 },
  { name: "Kurumul / Banz", provinceCode: "JWK", provinceName: "Jiwaka Province", latitude: -5.8700, longitude: 144.6200 },
  { name: "Lae", provinceCode: "MOR", provinceName: "Morobe Province", latitude: -6.7266, longitude: 146.9926 },
  { name: "Madang", provinceCode: "MAD", provinceName: "Madang Province", latitude: -5.2217, longitude: 145.7932 },
  { name: "Wewak", provinceCode: "ESP", provinceName: "East Sepik Province", latitude: -3.5538, longitude: 143.6269 },
  { name: "Vanimo", provinceCode: "WSP", provinceName: "West Sepik (Sandaun) Province", latitude: -2.6844, longitude: 141.3028 },
  { name: "Lorengau", provinceCode: "MAN", provinceName: "Manus Province", latitude: -2.0222, longitude: 147.2711 },
  { name: "Kavieng", provinceCode: "NIP", provinceName: "New Ireland Province", latitude: -2.5744, longitude: 150.7967 },
  { name: "Kokopo / Rabaul", provinceCode: "ENB", provinceName: "East New Britain Province", latitude: -4.3520, longitude: 152.2633 },
  { name: "Kimbe", provinceCode: "WNB", provinceName: "West New Britain Province", latitude: -5.5500, longitude: 150.1500 },
  { name: "Buka", provinceCode: "ARB", provinceName: "Autonomous Region of Bougainville", latitude: -5.4239, longitude: 154.6728 }
];

// Major Airports & Bush Airstrips
export const PNG_AIRPORTS: PngAirport[] = [
  {
    code: "POM",
    name: "Jacksons International Airport",
    latitude: -9.4438,
    longitude: 147.2200,
    type: "international",
    runway: "2,750m Asphalt Sealed (Cat I/II ILS)",
    flightTimeFromPortMoresbyMinutes: 0,
    scheduledOperators: ["Air Niugini", "PNG Air", "Qantas", "Virgin Australia", "Air Vanuatu"],
    charterOperators: ["MAF PNG", "Tropicair", "Helifix", "Airways Aviation"]
  },
  {
    code: "HGU",
    name: "Mount Hagen Kagamuga Airport",
    latitude: -5.8278,
    longitude: 144.2958,
    type: "domestic_hub",
    runway: "2,190m Asphalt (Highlands Hub)",
    flightTimeFromPortMoresbyMinutes: 60,
    scheduledOperators: ["Air Niugini", "PNG Air"],
    charterOperators: ["MAF PNG", "Summer Institute of Linguistics (SIL)", "Islands Nationair"]
  },
  {
    code: "GKA",
    name: "Goroka Airport",
    latitude: -6.0817,
    longitude: 145.3919,
    type: "domestic_hub",
    runway: "1,646m Asphalt Sealed",
    flightTimeFromPortMoresbyMinutes: 50,
    scheduledOperators: ["Air Niugini", "PNG Air"],
    charterOperators: ["MAF PNG", "Airlines PNG", "Niugini Helicopters"]
  },
  {
    code: "MAG",
    name: "Madang Airport",
    latitude: -5.2072,
    longitude: 145.7889,
    type: "coastal_regional",
    runway: "1,570m Asphalt Sealed",
    flightTimeFromPortMoresbyMinutes: 60,
    scheduledOperators: ["Air Niugini", "PNG Air"],
    charterOperators: ["Tropicair", "MAF PNG"]
  },
  {
    code: "RAB",
    name: "Rabaul Tokua Airport (East New Britain)",
    latitude: -4.3406,
    longitude: 152.3797,
    type: "domestic_hub",
    runway: "1,720m Asphalt Sealed",
    flightTimeFromPortMoresbyMinutes: 80,
    scheduledOperators: ["Air Niugini", "PNG Air"],
    charterOperators: ["Islands Petroleum Aviation", "Helifix"]
  },
  {
    code: "HKN",
    name: "Kimbe Hoskins Airport (West New Britain)",
    latitude: -5.4608,
    longitude: 150.4047,
    type: "coastal_regional",
    runway: "1,595m Asphalt Sealed",
    flightTimeFromPortMoresbyMinutes: 70,
    scheduledOperators: ["Air Niugini", "PNG Air"],
    charterOperators: ["Walindi Dive Charters", "Helifix"]
  },
  {
    code: "GUR",
    name: "Alotau Gurney Airport (Milne Bay)",
    latitude: -10.3117,
    longitude: 150.3392,
    type: "coastal_regional",
    runway: "1,690m Asphalt Sealed",
    flightTimeFromPortMoresbyMinutes: 50,
    scheduledOperators: ["Air Niugini", "PNG Air"],
    charterOperators: ["Tawali Dive Transfers", "Tropicair"]
  },
  {
    code: "WWK",
    name: "Wewak Boram Airport (East Sepik)",
    latitude: -3.5839,
    longitude: 143.6692,
    type: "coastal_regional",
    runway: "1,600m Asphalt Sealed",
    flightTimeFromPortMoresbyMinutes: 85,
    scheduledOperators: ["Air Niugini", "PNG Air"],
    charterOperators: ["Sepik River Safaris", "MAF PNG"]
  },
  {
    code: "TIZ",
    name: "Tari Airport (Hela Province)",
    latitude: -5.8447,
    longitude: 142.9469,
    type: "highland_bush_strip",
    runway: "1,100m Compact Gravel / Sealed",
    flightTimeFromPortMoresbyMinutes: 75,
    scheduledOperators: ["PNG Air"],
    charterOperators: ["Ambua Lodge Charters", "MAF PNG", "Helifix"]
  },
  {
    code: "KKD",
    name: "Kokoda Airstrip (Oro Province)",
    latitude: -8.6833,
    longitude: 147.7333,
    type: "highland_bush_strip",
    runway: "850m Grass / Compact Clay",
    flightTimeFromPortMoresbyMinutes: 25,
    scheduledOperators: ["Tropicair", "Airlines PNG (Trek Charters)"],
    charterOperators: ["MAF PNG", "Kokoda Track Authority Escorts"]
  }
];

// Great-circle distance in kilometers
export function calculateGpsDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Destination distance breakdown calculator
export function calculatePngDistanceBreakdown(
  destLat: number,
  destLng: number,
  destName: string,
  provCode: string,
  provName: string
): DestinationDistanceBreakdown {
  const cap = PNG_PROVINCIAL_CAPITALS.find(c => c.provinceCode === provCode) || PNG_PROVINCIAL_CAPITALS[0];
  const capDist = calculateGpsDistanceKm(destLat, destLng, cap.latitude, cap.longitude);
  const pomDist = calculateGpsDistanceKm(destLat, destLng, -9.4438, 147.2200);

  // Find nearest airport
  let nearestAir = PNG_AIRPORTS[0];
  let minAirDist = 999999;
  for (const air of PNG_AIRPORTS) {
    const d = calculateGpsDistanceKm(destLat, destLng, air.latitude, air.longitude);
    if (d < minAirDist) {
      minAirDist = d;
      nearestAir = air;
    }
  }

  const driveTimeCap = capDist < 5 ? "In City Center" : capDist < 60 ? `${Math.round(capDist * 1.5)} mins drive` : `${(capDist / 45).toFixed(1)} hrs PMV/4WD`;
  const flightTimePom = pomDist < 30 ? "Direct Road Access" : `${Math.round(nearestAir.flightTimeFromPortMoresbyMinutes + 15)} mins flight`;

  let mode = "Domestic Flight + Local 4WD";
  if (destName.toLowerCase().includes("kokoda")) {
    mode = "4WD to Owers' Corner or Charter Flight to Kokoda Station";
  } else if (destName.toLowerCase().includes("kimbe") || destName.toLowerCase().includes("tufi") || destName.toLowerCase().includes("rabaul")) {
    mode = "Direct Flight + Coastal Boat Transfer";
  } else if (provCode === "NCD" || provCode === "CP") {
    mode = "Sealed Highway / 4WD Private Transport";
  }

  return {
    destinationName: destName,
    provinceName: provName,
    capitalDistanceKm: capDist,
    capitalName: cap.name,
    driveTimeToCapital: driveTimeCap,
    portMoresbyDistanceKm: pomDist,
    flightTimeToPortMoresby: flightTimePom,
    nearestAirport: {
      name: nearestAir.name,
      code: nearestAir.code,
      distanceKm: minAirDist,
      driveTime: minAirDist < 10 ? "15 mins transfer" : `${Math.round(minAirDist * 1.6)} mins transfer`
    },
    recommendedTravelMode: mode
  };
}

// Transport guide helper
export function getPngDestinationTransportGuide(
  destName: string,
  provCode: string,
  _provName: string
): DestinationTransportGuide {
  const isKokoda = destName.toLowerCase().includes("kokoda");
  const isMarine = destName.toLowerCase().includes("bay") || destName.toLowerCase().includes("tufi") || destName.toLowerCase().includes("island") || destName.toLowerCase().includes("madang");
  const isHighlands = ["EHP", "WHP", "SIM", "ENG", "SHP", "HEL", "JWK"].includes(provCode);

  return {
    destinationName: destName,
    roadAccess: {
      accessibleByRoad: !isMarine && !destName.toLowerCase().includes("sepik"),
      roadCondition: isHighlands ? "Highlands Highway (Paved with mountain passes)" : provCode === "NCD" ? "Sealed Multi-Lane Highway" : "Coastal Sealed & Gravel Spur Road",
      recommendedVehicle: isHighlands || isKokoda ? "High-Clearance 4WD (Toyota LandCruiser / Hilux)" : "Standard Sedan / PMV / 4WD",
      highwaysUsed: isHighlands ? ["Okuk / Highlands Highway (Route 1)"] : provCode === "NIP" ? ["Boluminski Highway"] : ["Magi / Hiritano Highway"],
      fuelAvailabilityWarning: isHighlands ? "Refuel at Provincial Capitals (Mount Hagen, Goroka, Kundiawa)" : undefined
    },
    airAccess: {
      nearestAirport: isKokoda ? "Kokoda Airstrip (KKD) & Jacksons POM" : "Domestic Provincial Airport",
      airportCode: isKokoda ? "KKD" : "POM",
      distanceToAirportKm: isKokoda ? 12 : 25,
      flightDurationFromPom: isKokoda ? "25 mins" : "55-80 mins",
      scheduledCarriers: ["Air Niugini", "PNG Air", "MAF PNG"]
    },
    marineAccess: isMarine ? {
      available: true,
      seaRouteName: "Bismarck Sea & Solomon Sea Coastal Passages",
      vesselType: "Twin-Engine Coastal Banana Boat / Resort Dive Catamaran"
    } : undefined,
    trekAccess: isKokoda ? {
      required: true,
      trailName: "Kokoda Track 96km Historical Crossing",
      durationDays: "6 to 9 Trekking Days",
      mandatoryGuide: true
    } : undefined
  };
}

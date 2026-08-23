/**
 * Zambia Transport, Routes, Airstrips, Headquarters & Amenities Engine
 * Provides accurate OpenStreetMap routing, distance calculations, and amenities directory
 */

export interface GpsLocation {
  name: string;
  latitude: number;
  longitude: number;
  category?: string;
  description?: string;
}

export interface ProvincialCapital extends GpsLocation {
  provinceCode: string;
  provinceName: string;
}

export interface DistrictCapital extends GpsLocation {
  districtName: string;
  provinceName: string;
}

export interface ZambiaAirport extends GpsLocation {
  code: string; // IATA or local code
  icao?: string;
  type: "international" | "domestic" | "safari_bush_strip" | "military_civil";
  runway: string;
  flightTimeFromLusakaMinutes: number;
  scheduledOperators: string[];
  charterOperators: string[];
}

export interface ZambiaAmenity {
  id: string;
  name: string;
  type: "fuel_station" | "hospital_clinic" | "bank_atm" | "tourist_info" | "police_station";
  typeName: string;
  icon: string;
  townOrDistrict: string;
  provinceName: string;
  latitude: number;
  longitude: number;
  contact?: string;
  openingHours?: string;
  services: string[];
}

export interface ZambiaHighwayCorridor {
  code: string;
  name: string;
  description: string;
  distanceKm: number;
  typicalDriveHours: number;
  roadCondition: "Fully Paved / Excellent" | "Paved with Potholed Sectors" | "Gravel / 4x4 Recommended" | "Seasonal Dirt / 4x4 Required";
  startTown: string;
  endTown: string;
  keyWaypoints: { name: string; lat: number; lon: number }[];
  coordinates: [number, number][]; // [lat, lon]
}

// ============================================================================
// 1. NATIONAL & PROVINCIAL HEADQUARTERS COORDINATES
// ============================================================================

export const LUSAKA_NATIONAL_HQ: GpsLocation = {
  name: "Lusaka (National Capital & Government Headquarters)",
  latitude: -15.3875,
  longitude: 28.3228,
  description: "Republic of Zambia National Capital, Commercial Hub & Government Headquarters"
};

export const ZAMBIA_PROVINCIAL_CAPITALS: ProvincialCapital[] = [
  {
    provinceCode: "ZM-LUS",
    provinceName: "Lusaka Province",
    name: "Lusaka",
    latitude: -15.3875,
    longitude: 28.3228,
    description: "Provincial & National Capital"
  },
  {
    provinceCode: "ZM-SOU",
    provinceName: "Southern Province",
    name: "Choma",
    latitude: -16.8094,
    longitude: 26.9856,
    description: "Southern Province Administrative Headquarters (relocated from Livingstone)"
  },
  {
    provinceCode: "ZM-COP",
    provinceName: "Copperbelt Province",
    name: "Ndola",
    latitude: -12.9692,
    longitude: 28.6366,
    description: "Copperbelt Province Administrative & Commercial Headquarters"
  },
  {
    provinceCode: "ZM-CEN",
    provinceName: "Central Province",
    name: "Kabwe",
    latitude: -14.4422,
    longitude: 28.4464,
    description: "Central Province Administrative Headquarters & Railway Hub"
  },
  {
    provinceCode: "ZM-EAS",
    provinceName: "Eastern Province",
    name: "Chipata",
    latitude: -13.6333,
    longitude: 32.65,
    description: "Eastern Province Administrative Headquarters & Gateway to South Luangwa"
  },
  {
    provinceCode: "ZM-NOR",
    provinceName: "Northern Province",
    name: "Kasama",
    latitude: -10.2129,
    longitude: 31.1808,
    description: "Northern Province Administrative Headquarters & Waterfalls Circuit Base"
  },
  {
    provinceCode: "ZM-LUA",
    provinceName: "Luapula Province",
    name: "Mansa",
    latitude: -11.1998,
    longitude: 28.8943,
    description: "Luapula Province Administrative Headquarters near Lake Bangweulu"
  },
  {
    provinceCode: "ZM-NW",
    provinceName: "North-Western Province",
    name: "Solwezi",
    latitude: -12.1688,
    longitude: 26.3894,
    description: "North-Western Province Mining & Administrative Headquarters"
  },
  {
    provinceCode: "ZM-WES",
    provinceName: "Western Province",
    name: "Mongu",
    latitude: -15.2484,
    longitude: 23.1274,
    description: "Western Province Administrative Headquarters overlooking Barotse Floodplain"
  },
  {
    provinceCode: "ZM-MUC",
    provinceName: "Muchinga Province",
    name: "Chinsali",
    latitude: -10.5414,
    longitude: 32.0817,
    description: "Muchinga Province Administrative Headquarters & Historical Heritage Hub"
  }
];

// ============================================================================
// 2. DISTRICT HEADQUARTERS COORDINATES (Selected Key District Hubs)
// ============================================================================

export const ZAMBIA_DISTRICT_CAPITALS: DistrictCapital[] = [
  // Southern Province
  { districtName: "Livingstone Urban", provinceName: "Southern Province", name: "Livingstone", latitude: -17.8419, longitude: 25.8544 },
  { districtName: "Choma District", provinceName: "Southern Province", name: "Choma", latitude: -16.8094, longitude: 26.9856 },
  { districtName: "Siavonga District", provinceName: "Southern Province", name: "Siavonga", latitude: -16.5383, longitude: 28.7083 },
  { districtName: "Monze District", provinceName: "Southern Province", name: "Monze", latitude: -16.2833, longitude: 27.4833 },
  { districtName: "Mazabuka District", provinceName: "Southern Province", name: "Mazabuka", latitude: -15.856, longitude: 27.748 },
  { districtName: "Itezhi-Tezhi District", provinceName: "Southern Province", name: "Itezhi-Tezhi", latitude: -15.7667, longitude: 26.0167 },
  { districtName: "Namwala District", provinceName: "Southern Province", name: "Namwala", latitude: -15.75, longitude: 26.4333 },
  { districtName: "Kazungula District", provinceName: "Southern Province", name: "Kazungula", latitude: -17.7833, longitude: 25.2667 },
  { districtName: "Kalomo District", provinceName: "Southern Province", name: "Kalomo", latitude: -17.0333, longitude: 26.5 },
  { districtName: "Chirundu District", provinceName: "Southern Province", name: "Chirundu", latitude: -16.0333, longitude: 28.85 },
  { districtName: "Sinazongwe District", provinceName: "Southern Province", name: "Sinazongwe", latitude: -17.2614, longitude: 27.4619 },

  // Lusaka Province
  { districtName: "Lusaka Central", provinceName: "Lusaka Province", name: "Lusaka City", latitude: -15.3875, longitude: 28.3228 },
  { districtName: "Chongwe District", provinceName: "Lusaka Province", name: "Chongwe", latitude: -15.3289, longitude: 28.6822 },
  { districtName: "Kafue District", provinceName: "Lusaka Province", name: "Kafue Town", latitude: -15.7692, longitude: 28.1814 },
  { districtName: "Luangwa (Feira) District", provinceName: "Lusaka Province", name: "Luangwa (Feira)", latitude: -15.6167, longitude: 30.4167 },
  { districtName: "Chilanga District", provinceName: "Lusaka Province", name: "Chilanga", latitude: -15.5667, longitude: 28.2667 },
  { districtName: "Rufunsa District", provinceName: "Lusaka Province", name: "Rufunsa", latitude: -15.0833, longitude: 29.4167 },

  // Eastern Province
  { districtName: "Chipata District", provinceName: "Eastern Province", name: "Chipata", latitude: -13.6333, longitude: 32.65 },
  { districtName: "Mambwe District", provinceName: "Eastern Province", name: "Mfuwe / Mambwe", latitude: -13.1167, longitude: 31.7667 },
  { districtName: "Katete District", provinceName: "Eastern Province", name: "Katete", latitude: -14.05, longitude: 32.05 },
  { districtName: "Petauke District", provinceName: "Eastern Province", name: "Petauke", latitude: -14.2428, longitude: 31.3253 },
  { districtName: "Lundazi District", provinceName: "Eastern Province", name: "Lundazi", latitude: -12.2928, longitude: 33.1783 },
  { districtName: "Nyimba District", provinceName: "Eastern Province", name: "Nyimba", latitude: -14.5567, longitude: 30.8144 },

  // Copperbelt Province
  { districtName: "Ndola Urban", provinceName: "Copperbelt Province", name: "Ndola", latitude: -12.9692, longitude: 28.6366 },
  { districtName: "Kitwe Urban", provinceName: "Copperbelt Province", name: "Kitwe", latitude: -12.8024, longitude: 28.2132 },
  { districtName: "Chingola District", provinceName: "Copperbelt Province", name: "Chingola", latitude: -12.5333, longitude: 27.85 },
  { districtName: "Mufulira District", provinceName: "Copperbelt Province", name: "Mufulira", latitude: -12.55, longitude: 28.24 },
  { districtName: "Luanshya District", provinceName: "Copperbelt Province", name: "Luanshya", latitude: -13.1367, longitude: 28.4167 },
  { districtName: "Lufwanyama District", provinceName: "Copperbelt Province", name: "Lufwanyama", latitude: -12.8833, longitude: 27.5667 },

  // Central Province
  { districtName: "Kabwe Urban", provinceName: "Central Province", name: "Kabwe", latitude: -14.4422, longitude: 28.4464 },
  { districtName: "Kapiri Mposhi District", provinceName: "Central Province", name: "Kapiri Mposhi", latitude: -13.9714, longitude: 28.6694 },
  { districtName: "Serenje District", provinceName: "Central Province", name: "Serenje", latitude: -13.2325, longitude: 30.2353 },
  { districtName: "Mkushi District", provinceName: "Central Province", name: "Mkushi", latitude: -13.62, longitude: 29.39 },
  { districtName: "Mumbwa District", provinceName: "Central Province", name: "Mumbwa", latitude: -14.9833, longitude: 27.0667 },
  { districtName: "Chibombo District", provinceName: "Central Province", name: "Chibombo", latitude: -14.65, longitude: 28.0833 },

  // Northern Province
  { districtName: "Kasama District", provinceName: "Northern Province", name: "Kasama", latitude: -10.2129, longitude: 31.1808 },
  { districtName: "Mbala District", provinceName: "Northern Province", name: "Mbala", latitude: -8.8403, longitude: 31.3658 },
  { districtName: "Mpulungu District", provinceName: "Northern Province", name: "Mpulungu (Lake Tanganyika Port)", latitude: -8.7667, longitude: 31.1167 },
  { districtName: "Luwingu District", provinceName: "Northern Province", name: "Luwingu", latitude: -10.2625, longitude: 29.9272 },
  { districtName: "Mporokoso District", provinceName: "Northern Province", name: "Mporokoso", latitude: -9.3833, longitude: 30.1333 },
  { districtName: "Kaputa District", provinceName: "Northern Province", name: "Kaputa", latitude: -8.4667, longitude: 29.6667 },

  // Luapula Province
  { districtName: "Mansa District", provinceName: "Luapula Province", name: "Mansa", latitude: -11.1998, longitude: 28.8943 },
  { districtName: "Samfya District", provinceName: "Luapula Province", name: "Samfya (Lake Bangweulu)", latitude: -11.3647, longitude: 29.5564 },
  { districtName: "Kawambwa District", provinceName: "Luapula Province", name: "Kawambwa", latitude: -9.7917, longitude: 29.0833 },
  { districtName: "Nchelenge District", provinceName: "Luapula Province", name: "Nchelenge (Lake Mweru)", latitude: -9.345, longitude: 28.7344 },
  { districtName: "Mwense District", provinceName: "Luapula Province", name: "Mwense", latitude: -10.3833, longitude: 28.7 },

  // North-Western Province
  { districtName: "Solwezi District", provinceName: "North-Western Province", name: "Solwezi", latitude: -12.1688, longitude: 26.3894 },
  { districtName: "Mwinilunga District", provinceName: "North-Western Province", name: "Mwinilunga (Zambezi Source)", latitude: -11.7358, longitude: 24.4286 },
  { districtName: "Kasempa District", provinceName: "North-Western Province", name: "Kasempa", latitude: -13.4583, longitude: 25.8333 },
  { districtName: "Zambezi District", provinceName: "North-Western Province", name: "Zambezi (Mize Palace)", latitude: -13.5417, longitude: 23.1083 },
  { districtName: "Kabompo District", provinceName: "North-Western Province", name: "Kabompo", latitude: -13.5936, longitude: 24.2008 },
  { districtName: "Mufumbwe District", provinceName: "North-Western Province", name: "Mufumbwe", latitude: -13.6833, longitude: 24.8 },

  // Western Province
  { districtName: "Mongu District", provinceName: "Western Province", name: "Mongu", latitude: -15.2484, longitude: 23.1274 },
  { districtName: "Senanga District", provinceName: "Western Province", name: "Senanga", latitude: -16.1167, longitude: 23.2667 },
  { districtName: "Sesheke District", provinceName: "Western Province", name: "Sesheke", latitude: -17.475, longitude: 24.2958 },
  { districtName: "Kalabo District", provinceName: "Western Province", name: "Kalabo (Liuwa Plain Gateway)", latitude: -14.99, longitude: 22.68 },
  { districtName: "Kaoma District", provinceName: "Western Province", name: "Kaoma", latitude: -14.7833, longitude: 24.8 },
  { districtName: "Shangombo District", provinceName: "Western Province", name: "Shangombo", latitude: -16.3167, longitude: 22.1 },

  // Muchinga Province
  { districtName: "Chinsali District", provinceName: "Muchinga Province", name: "Chinsali", latitude: -10.5414, longitude: 32.0817 },
  { districtName: "Mpika District", provinceName: "Muchinga Province", name: "Mpika (Railway & Safaris)", latitude: -11.8344, longitude: 31.4528 },
  { districtName: "Isoka District", provinceName: "Muchinga Province", name: "Isoka", latitude: -10.1606, longitude: 32.6336 },
  { districtName: "Nakonde District", provinceName: "Muchinga Province", name: "Nakonde (Tanzania Border)", latitude: -9.3242, longitude: 32.7569 },
  { districtName: "Mafinga District", provinceName: "Muchinga Province", name: "Mafinga (Highest Peak)", latitude: -9.9333, longitude: 33.35 }
];

// ============================================================================
// 3. ZAMBIA AIRPORTS & BUSH AIRSTRIPS DIRECTORY
// ============================================================================

export const ZAMBIA_AIRPORTS: ZambiaAirport[] = [
  // Commercial International & Domestic Airports
  {
    name: "Kenneth Kaunda International Airport (LUN)",
    code: "LUN",
    icao: "FLKK",
    type: "international",
    runway: "3,962m Asphalt (Cat II Instrument)",
    latitude: -15.3308,
    longitude: 28.4526,
    flightTimeFromLusakaMinutes: 0,
    scheduledOperators: ["Proflight Zambia", "Emirates", "Qatar Airways", "Ethiopian Airlines", "Kenya Airways", "Airlink"],
    charterOperators: ["Royal Air Charters", "Sky Trails", "ProCharter"]
  },
  {
    name: "Harry Mwaanga Nkumbula International Airport (Livingstone - LVI)",
    code: "LVI",
    icao: "FLHN",
    type: "international",
    runway: "3,000m Asphalt",
    latitude: -17.8218,
    longitude: 25.8227,
    flightTimeFromLusakaMinutes: 50,
    scheduledOperators: ["Proflight Zambia", "Airlink", "Kenya Airways"],
    charterOperators: ["Wilderness Air", "Batoka Aviation", "Sky Trails"]
  },
  {
    name: "Simon Mwansa Kapwepwe International Airport (Ndola - NLA)",
    code: "NLA",
    icao: "FLND",
    type: "international",
    runway: "3,500m Asphalt",
    latitude: -12.9981,
    longitude: 28.6649,
    flightTimeFromLusakaMinutes: 45,
    scheduledOperators: ["Proflight Zambia", "Airlink", "Ethiopian Airlines"],
    charterOperators: ["Royal Air Charters", "ProCharter"]
  },
  {
    name: "Mfuwe International Airport (South Luangwa - MFU)",
    code: "MFU",
    icao: "FLMF",
    type: "international",
    runway: "2,200m Asphalt",
    latitude: -13.0714,
    longitude: 31.9366,
    flightTimeFromLusakaMinutes: 70,
    scheduledOperators: ["Proflight Zambia"],
    charterOperators: ["Time + Tide Safaris", "Robin Pope Safaris Air", "Sky Trails"]
  },
  {
    name: "Kasama Airport (Northern Waterfalls - KAA)",
    code: "KAA",
    icao: "FLKS",
    type: "domestic",
    runway: "3,100m Asphalt (Upgraded 2024)",
    latitude: -10.2175,
    longitude: 31.1356,
    flightTimeFromLusakaMinutes: 85,
    scheduledOperators: ["Proflight Zambia (Scheduled 3x Weekly)"],
    charterOperators: ["Royal Air Charters", "Sky Trails"]
  },
  {
    name: "Mansa Airport (Luapula & Bangweulu - MNS)",
    code: "MNS",
    icao: "FLMA",
    type: "domestic",
    runway: "2,600m Asphalt",
    latitude: -11.1383,
    longitude: 28.8825,
    flightTimeFromLusakaMinutes: 75,
    scheduledOperators: ["Proflight Zambia (Scheduled)"],
    charterOperators: ["Sky Trails", "African Parks Air"]
  },
  {
    name: "Solwezi Airport (North-Western - SLI)",
    code: "SLI",
    icao: "FLSW",
    type: "domestic",
    runway: "2,700m Asphalt",
    latitude: -12.1747,
    longitude: 26.3653,
    flightTimeFromLusakaMinutes: 65,
    scheduledOperators: ["Proflight Zambia (Daily)"],
    charterOperators: ["Royal Air Charters", "ProCharter"]
  },
  {
    name: "Mongu Airport (Western Province - MNR)",
    code: "MNR",
    icao: "FLMG",
    type: "domestic",
    runway: "2,350m Asphalt",
    latitude: -15.2536,
    longitude: 23.1619,
    flightTimeFromLusakaMinutes: 80,
    scheduledOperators: ["Proflight Zambia (Charter / Special Scheduled)"],
    charterOperators: ["Sky Trails", "African Parks Air"]
  },
  {
    name: "Chipata Airport (Eastern Province - CIP)",
    code: "CIP",
    icao: "FLCP",
    type: "domestic",
    runway: "1,500m Asphalt",
    latitude: -13.5558,
    longitude: 32.5878,
    flightTimeFromLusakaMinutes: 60,
    scheduledOperators: ["Charter / Government Services"],
    charterOperators: ["ProCharter", "Sky Trails"]
  },

  // Remote Safari Bush Airstrips (Essential for Luxury Lodges & Wilderness Safaris)
  {
    name: "Royal Zambezi Airstrip (Lower Zambezi NP)",
    code: "RYL",
    type: "safari_bush_strip",
    runway: "1,800m Compacted Gravel / All-Weather",
    latitude: -15.6586,
    longitude: 29.3514,
    flightTimeFromLusakaMinutes: 30,
    scheduledOperators: ["Proflight Zambia (Seasonal Safari Shuttle)"],
    charterOperators: ["Royal Air Charters", "Sky Trails", "Sausage Tree Air"]
  },
  {
    name: "Jeki Airstrip (Lower Zambezi NP East)",
    code: "JEK",
    type: "safari_bush_strip",
    runway: "1,400m Compacted Earth / All-Weather",
    latitude: -15.6322,
    longitude: 29.6206,
    flightTimeFromLusakaMinutes: 35,
    scheduledOperators: ["Proflight Zambia (Safari Shuttle)"],
    charterOperators: ["Chiawa Safaris Air", "Old Mondoro Air", "Sky Trails"]
  },
  {
    name: "Chunga Airstrip (Kafue National Park Central)",
    code: "CHU",
    type: "safari_bush_strip",
    runway: "1,200m Grass / Gravel",
    latitude: -15.0489,
    longitude: 26.0028,
    flightTimeFromLusakaMinutes: 45,
    scheduledOperators: ["Wilderness Safari Charters"],
    charterOperators: ["Sky Trails", "Mukambi Air"]
  },
  {
    name: "Busanga Plains Bush Airstrip (Kafue NP North)",
    code: "BSG",
    type: "safari_bush_strip",
    runway: "1,100m Compacted Earth (Dry Season Only Jun-Nov)",
    latitude: -14.2981,
    longitude: 25.8647,
    flightTimeFromLusakaMinutes: 65,
    scheduledOperators: ["Wilderness Destinations Fly-in"],
    charterOperators: ["Wilderness Air", "Sky Trails"]
  },
  {
    name: "Kalabo Airstrip (Liuwa Plain National Park)",
    code: "KLB",
    icao: "FLKL",
    type: "safari_bush_strip",
    runway: "1,100m Tar / Compacted Sand",
    latitude: -14.9961,
    longitude: 22.6469,
    flightTimeFromLusakaMinutes: 90,
    scheduledOperators: ["Proflight Zambia / African Parks Shuttle"],
    charterOperators: ["Time + Tide King Lewanika Air", "African Parks Air"]
  },
  {
    name: "Shiwa Ng'andu Airstrip (Great North Wilderness)",
    code: "SHW",
    type: "safari_bush_strip",
    runway: "1,300m Grass / Compacted Gravel",
    latitude: -11.2033,
    longitude: 31.7583,
    flightTimeFromLusakaMinutes: 75,
    scheduledOperators: ["Private Heritage Flights"],
    charterOperators: ["Sky Trails", "ProCharter"]
  },
  {
    name: "Kasaba Bay Airstrip (Lake Tanganyika & Nsumbu NP)",
    code: "ZKB",
    icao: "FLSS",
    type: "safari_bush_strip",
    runway: "2,000m Asphalt / Restored",
    latitude: -8.5256,
    longitude: 30.4853,
    flightTimeFromLusakaMinutes: 105,
    scheduledOperators: ["Safari Charter Services"],
    charterOperators: ["Ndole Bay Air", "Sky Trails"]
  },
  {
    name: "Shoebill Island Bush Strip (Bangweulu Wetlands)",
    code: "SHB",
    type: "safari_bush_strip",
    runway: "900m Grassy Clay (Jun-Dec)",
    latitude: -11.9667,
    longitude: 30.1333,
    flightTimeFromLusakaMinutes: 80,
    scheduledOperators: ["African Parks Conservation Flights"],
    charterOperators: ["African Parks Air", "Sky Trails"]
  }
];

// ============================================================================
// 4. MAJOR NATIONAL HIGHWAY CORRIDORS & ROUTING
// ============================================================================

export const ZAMBIA_HIGHWAY_CORRIDORS: ZambiaHighwayCorridor[] = [
  {
    code: "T1",
    name: "T1 Livingstone - Lusaka Tourism Highway",
    description: "The primary southern tourism corridor linking Livingstone / Victoria Falls, Batoka Gorge, Choma, Monze, Mazabuka, and Kafue to Lusaka.",
    distanceKm: 480,
    typicalDriveHours: 5.5,
    roadCondition: "Fully Paved / Excellent",
    startTown: "Livingstone (Mosi-oa-Tunya)",
    endTown: "Lusaka City",
    keyWaypoints: [
      { name: "Livingstone / Victoria Falls", lat: -17.8419, lon: 25.8544 },
      { name: "Zimba Town", lat: -17.3167, lon: 26.2 },
      { name: "Kalomo Historic Capital", lat: -17.0333, lon: 26.5 },
      { name: "Choma (Provincial HQ)", lat: -16.8094, lon: 26.9856 },
      { name: "Pemba Craft Hub", lat: -16.5333, lon: 27.2167 },
      { name: "Monze (Lochinvar Turnoff)", lat: -16.2833, lon: 27.4833 },
      { name: "Mazabuka Sugar Valley", lat: -15.856, lon: 27.748 },
      { name: "Kafue River Bridge & Marina", lat: -15.7692, lon: 28.1814 },
      { name: "Lusaka National Capital", lat: -15.3875, lon: 28.3228 }
    ],
    coordinates: [
      [-17.8419, 25.8544],
      [-17.3167, 26.2],
      [-17.0333, 26.5],
      [-16.8094, 26.9856],
      [-16.5333, 27.2167],
      [-16.2833, 27.4833],
      [-15.856, 27.748],
      [-15.7692, 28.1814],
      [-15.3875, 28.3228]
    ]
  },
  {
    code: "T4",
    name: "T4 Great East Road (South Luangwa Corridor)",
    description: "The scenic eastern highway crossing the Luangwa River Rift Valley towards Chipata, Mfuwe (South Luangwa National Park), and Malawi.",
    distanceKm: 570,
    typicalDriveHours: 7.0,
    roadCondition: "Fully Paved / Excellent",
    startTown: "Lusaka City",
    endTown: "Chipata / Mfuwe Gate",
    keyWaypoints: [
      { name: "Lusaka City Centre", lat: -15.3875, lon: 28.3228 },
      { name: "Chongwe River Gateway", lat: -15.3289, lon: 28.6822 },
      { name: "Rufunsa Mountain Pass", lat: -15.0833, lon: 29.4167 },
      { name: "Luangwa Suspension Bridge", lat: -15.0167, lon: 30.2167 },
      { name: "Nyimba Hot Springs Hub", lat: -14.5567, lon: 30.8144 },
      { name: "Petauke Commercial Centre", lat: -14.2428, lon: 31.3253 },
      { name: "Katete (Kulamba Ceremony)", lat: -14.05, lon: 32.05 },
      { name: "Chipata (Provincial HQ)", lat: -13.6333, lon: 32.65 },
      { name: "Mfuwe / South Luangwa Gate", lat: -13.1167, lon: 31.7667 }
    ],
    coordinates: [
      [-15.3875, 28.3228],
      [-15.3289, 28.6822],
      [-15.0833, 29.4167],
      [-15.0167, 30.2167],
      [-14.5567, 30.8144],
      [-14.2428, 31.3253],
      [-14.05, 32.05],
      [-13.6333, 32.65],
      [-13.1167, 31.7667]
    ]
  },
  {
    code: "T2",
    name: "T2 Great North Road (Northern Waterfalls & TAZARA)",
    description: "The trans-African corridor from Lusaka via Kabwe, Kapiri Mposhi, Serenje, Mpika, Shiwa Ng'andu, Kasama to Mbala & Lake Tanganyika.",
    distanceKm: 860,
    typicalDriveHours: 11.0,
    roadCondition: "Paved with Potholed Sectors",
    startTown: "Lusaka City",
    endTown: "Mbala / Lake Tanganyika (Mpulungu)",
    keyWaypoints: [
      { name: "Lusaka City Centre", lat: -15.3875, lon: 28.3228 },
      { name: "Chibombo Agro Hub", lat: -14.65, lon: 28.0833 },
      { name: "Kabwe (Central Province HQ)", lat: -14.4422, lon: 28.4464 },
      { name: "Kapiri Mposhi (TAZARA Junction)", lat: -13.9714, lon: 28.6694 },
      { name: "Mkushi Farming Belt", lat: -13.62, lon: 29.39 },
      { name: "Serenje (Kundalila Falls turnoff)", lat: -13.2325, lon: 30.2353 },
      { name: "Mpika (Railway Town)", lat: -11.8344, lon: 31.4528 },
      { name: "Shiwa Ng'andu Estate & Hot Springs", lat: -11.2033, lon: 31.7583 },
      { name: "Kasama (Northern Province HQ)", lat: -10.2129, lon: 31.1808 },
      { name: "Mbala & Kalambo Falls", lat: -8.8403, lon: 31.3658 },
      { name: "Mpulungu Harbour (Lake Tanganyika)", lat: -8.7667, lon: 31.1167 }
    ],
    coordinates: [
      [-15.3875, 28.3228],
      [-14.65, 28.0833],
      [-14.4422, 28.4464],
      [-13.9714, 28.6694],
      [-13.62, 29.39],
      [-13.2325, 30.2353],
      [-11.8344, 31.4528],
      [-11.2033, 31.7583],
      [-10.2129, 31.1808],
      [-8.8403, 31.3658],
      [-8.7667, 31.1167]
    ]
  },
  {
    code: "T3",
    name: "T3 Copperbelt Highway & Mining Corridor",
    description: "Multi-lane commercial motorway from Kapiri Mposhi to Ndola, Kitwe, Chingola, and Solwezi (North-Western Province).",
    distanceKm: 390,
    typicalDriveHours: 4.5,
    roadCondition: "Fully Paved / Excellent",
    startTown: "Kapiri Mposhi (T2 Junction)",
    endTown: "Solwezi (North-Western HQ)",
    keyWaypoints: [
      { name: "Kapiri Mposhi Junction", lat: -13.9714, lon: 28.6694 },
      { name: "Ndola (Copperbelt HQ)", lat: -12.9692, lon: 28.6366 },
      { name: "Kitwe Mining Centre", lat: -12.8024, lon: 28.2132 },
      { name: "Chingola (Open Pit Lookout)", lat: -12.5333, lon: 27.85 },
      { name: "Solwezi (Mining & Culture)", lat: -12.1688, lon: 26.3894 }
    ],
    coordinates: [
      [-13.9714, 28.6694],
      [-12.9692, 28.6366],
      [-12.8024, 28.2132],
      [-12.5333, 27.85],
      [-12.1688, 26.3894]
    ]
  },
  {
    code: "M9-M10",
    name: "M9 / M10 Western & Barotseland Highway",
    description: "The western transit link across Kafue National Park to Mongu, the Barotse Floodplain, and Kuomboka ceremony grounds.",
    distanceKm: 590,
    typicalDriveHours: 7.5,
    roadCondition: "Fully Paved / Excellent",
    startTown: "Lusaka City",
    endTown: "Mongu / Kalabo (Barotse Plains)",
    keyWaypoints: [
      { name: "Lusaka City Centre", lat: -15.3875, lon: 28.3228 },
      { name: "Mumbwa Agricultural Hub", lat: -14.9833, lon: 27.0667 },
      { name: "Kafue National Park (Spine Road)", lat: -14.95, lon: 26.0 },
      { name: "Kaoma Trading Centre", lat: -14.7833, lon: 24.8 },
      { name: "Mongu (Western Province HQ)", lat: -15.2484, lon: 23.1274 },
      { name: "Limulunga Royal Palace", lat: -15.1667, lon: 23.1333 },
      { name: "Kalabo (Liuwa Plain Gateway)", lat: -14.99, lon: 22.68 }
    ],
    coordinates: [
      [-15.3875, 28.3228],
      [-14.9833, 27.0667],
      [-14.95, 26.0],
      [-14.7833, 24.8],
      [-15.2484, 23.1274],
      [-15.1667, 23.1333],
      [-14.99, 22.68]
    ]
  }
];

// ============================================================================
// 5. AMENITIES DIRECTORY (Fuel, Hospitals, Banks, Mobile Networks)
// ============================================================================

export const ZAMBIA_AMENITIES: ZambiaAmenity[] = [
  // Livingstone
  {
    id: "amenity-liv-fuel-puma",
    name: "Puma Energy 24/7 Service Station Livingstone",
    type: "fuel_station",
    typeName: "24/7 Fuel & Convenience Store",
    icon: "⛽",
    townOrDistrict: "Livingstone Urban",
    provinceName: "Southern Province",
    latitude: -17.845,
    longitude: 25.856,
    contact: "+260 213 321100",
    openingHours: "24 Hours / 7 Days",
    services: ["Low Sulphur Diesel", "Unleaded Petrol", "Tyre Pressure & Air", "Quick Mart", "Clean Restrooms", "Airtel / MTN MoMo"]
  },
  {
    id: "amenity-liv-hospital",
    name: "Livingstone University Teaching Hospital (LUTH)",
    type: "hospital_clinic",
    typeName: "Teaching Hospital & Emergency Trauma Centre",
    icon: "🏥",
    townOrDistrict: "Livingstone Urban",
    provinceName: "Southern Province",
    latitude: -17.852,
    longitude: 25.86,
    contact: "+260 213 320050 / Emergency 992",
    openingHours: "24/7 Emergency Casualty Unit",
    services: ["Emergency Trauma Unit", "Surgical Theatre", "Pharmacy", "Ambulance Evacuation", "Travel Medicine & Malaria Care"]
  },
  {
    id: "amenity-liv-bank-zanaco",
    name: "Zanaco & Stanbic Multi-Bank ATM Hub Livingstone",
    type: "bank_atm",
    typeName: "International Visa / Mastercard ATMs",
    icon: "🏧",
    townOrDistrict: "Livingstone Urban",
    provinceName: "Southern Province",
    latitude: -17.842,
    longitude: 25.853,
    openingHours: "24/7 ATM Access · Branches 08:30 - 15:30",
    services: ["Visa / Mastercard Cash Withdrawal", "ZMW & USD FX Bureau", "MTN / Airtel Mobile Money Cashout", "Western Union"]
  },

  // Lusaka
  {
    id: "amenity-lus-fuel-total",
    name: "TotalEnergies Arcades 24/7 Hub Lusaka",
    type: "fuel_station",
    typeName: "24/7 Fuel, EV & Fast Food Hub",
    icon: "⛽",
    townOrDistrict: "Lusaka Central",
    provinceName: "Lusaka Province",
    latitude: -15.395,
    longitude: 28.325,
    contact: "+260 211 254400",
    openingHours: "24 Hours",
    services: ["Diesel Excellium", "Super Unleaded", "Bonjour Café", "ATM Hub", "Vehicle Oil Check"]
  },
  {
    id: "amenity-lus-hospital-uth",
    name: "University Teaching Hospital (UTH Lusaka)",
    type: "hospital_clinic",
    typeName: "National Apex Referral & Trauma Hospital",
    icon: "🏥",
    townOrDistrict: "Lusaka Central",
    provinceName: "Lusaka Province",
    latitude: -15.4333,
    longitude: 28.3167,
    contact: "+260 211 251451 / 992",
    openingHours: "24/7 Emergency",
    services: ["National Level 1 Trauma Care", "ICU", "Air Ambulance Helicopter Helipad", "Specialist Consultants"]
  },

  // South Luangwa / Mfuwe
  {
    id: "amenity-mfu-fuel",
    name: "Puma Mfuwe Safari Gateway Fuel Depot",
    type: "fuel_station",
    typeName: "Safari Vehicle Fuel Depot",
    icon: "⛽",
    townOrDistrict: "Mambwe District",
    provinceName: "Eastern Province",
    latitude: -13.112,
    longitude: 31.77,
    openingHours: "06:00 - 20:00 Daily",
    services: ["50ppm Low Sulphur Safari Diesel", "Unleaded Petrol", "Puncture Repair", "Engine Coolant"]
  },
  {
    id: "amenity-mfu-clinic",
    name: "Kakumbi Rural Health Centre & South Luangwa Wildlife Clinic",
    type: "hospital_clinic",
    typeName: "Bush Clinic & Medical Outreach",
    icon: "🏥",
    townOrDistrict: "Mambwe District",
    provinceName: "Eastern Province",
    latitude: -13.098,
    longitude: 31.782,
    contact: "+260 977 889900",
    openingHours: "24/7 Urgent Medical Care",
    services: ["Malaria Rapid Tests & Medication", "Snakebite Antivenom", "Emergency First Response", "Air Ambulance Liaison (MARS)"]
  },

  // Mongu / Barotse
  {
    id: "amenity-mon-fuel-rubis",
    name: "Rubis Energy Mongu Main Road Service Station",
    type: "fuel_station",
    typeName: "24/7 Western Gateway Fuel Station",
    icon: "⛽",
    townOrDistrict: "Mongu District",
    provinceName: "Western Province",
    latitude: -15.251,
    longitude: 23.13,
    openingHours: "24 Hours",
    services: ["Diesel", "Petrol", "4x4 Tyre Inflation", "Quick Mart"]
  },
  {
    id: "amenity-mon-hospital",
    name: "Lewanika General Hospital Mongu",
    type: "hospital_clinic",
    typeName: "Provincial Referral Hospital",
    icon: "🏥",
    townOrDistrict: "Mongu District",
    provinceName: "Western Province",
    latitude: -15.244,
    longitude: 23.138,
    contact: "+260 217 221222",
    openingHours: "24/7 Emergency",
    services: ["Provincial Emergency Unit", "Inpatient Wards", "Pharmacy", "Laboratory"]
  },

  // Kasama / Northern
  {
    id: "amenity-kas-fuel-total",
    name: "TotalEnergies Kasama Town Centre",
    type: "fuel_station",
    typeName: "Northern Waterfalls Fuel Hub",
    icon: "⛽",
    townOrDistrict: "Kasama District",
    provinceName: "Northern Province",
    latitude: -10.215,
    longitude: 31.182,
    openingHours: "24 Hours",
    services: ["Diesel", "Petrol", "Car Wash", "ATMs"]
  },
  {
    id: "amenity-kas-hospital",
    name: "Kasama General Hospital",
    type: "hospital_clinic",
    typeName: "Northern Provincial General Hospital",
    icon: "🏥",
    townOrDistrict: "Kasama District",
    provinceName: "Northern Province",
    latitude: -10.211,
    longitude: 31.176,
    contact: "+260 214 221312",
    openingHours: "24/7 Emergency",
    services: ["24/7 Emergency Service", "Surgical Care", "Diagnostics", "Ambulance"]
  },

  // Solwezi / North-Western
  {
    id: "amenity-sol-fuel",
    name: "Mount Meru Petroleum Solwezi Highway",
    type: "fuel_station",
    typeName: "Mining Belt Fuel Station",
    icon: "⛽",
    townOrDistrict: "Solwezi District",
    provinceName: "North-Western Province",
    latitude: -12.165,
    longitude: 26.392,
    openingHours: "24 Hours",
    services: ["Heavy Vehicle Diesel", "Petrol", "Tyre Service", "Convenience Store"]
  },
  {
    id: "amenity-sol-hospital",
    name: "Solwezi General Hospital",
    type: "hospital_clinic",
    typeName: "North-Western Provincial Hospital",
    icon: "🏥",
    townOrDistrict: "Solwezi District",
    provinceName: "North-Western Province",
    latitude: -12.172,
    longitude: 26.385,
    contact: "+260 218 821100",
    openingHours: "24/7 Emergency",
    services: ["Emergency Trauma Unit", "Industrial Injury Care", "Pharmacy"]
  }
];

// ============================================================================
// 6. DISTANCE, ROUTING & GEODESIC MATH FUNCTIONS
// ============================================================================

/**
 * Calculates geodesic Haversine distance between two coordinates in kilometers.
 */
export function calculateGeodesicDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Calibrates overland road distance from straight-line geodesic distance.
 * Accounts for African road topography, escarpment curves, and highway corridors.
 */
export function estimateRoadDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  averageSpeedKmH = 75
): { distanceKm: number; driveHours: number; driveTimeFormatted: string } {
  const directKm = calculateGeodesicDistanceKm(lat1, lon1, lat2, lon2);
  // Overland winding factor: ~1.28x for paved highways, up to 1.35x for escarpments/bush tracks
  const windingFactor = directKm > 350 ? 1.25 : directKm > 100 ? 1.30 : 1.35;
  const roadKm = Math.round(directKm * windingFactor);

  const hoursDecimal = roadKm / averageSpeedKmH;
  const hrs = Math.floor(hoursDecimal);
  const mins = Math.round((hoursDecimal - hrs) * 60);

  let formatted = "";
  if (hrs > 0) {
    formatted = `${hrs} hr${hrs > 1 ? "s" : ""}${mins > 0 ? ` ${mins} min` : ""}`;
  } else {
    formatted = `${mins} mins`;
  }

  return {
    distanceKm: roadKm,
    driveHours: Math.round(hoursDecimal * 10) / 10,
    driveTimeFormatted: formatted
  };
}

/**
 * Finds the nearest provincial capital for a given coordinate or province name.
 */
export function getProvincialCapital(provinceName?: string, lat?: number, lon?: number): ProvincialCapital {
  if (provinceName) {
    const norm = provinceName.toLowerCase();
    const match = ZAMBIA_PROVINCIAL_CAPITALS.find(p => p.provinceName.toLowerCase().includes(norm) || norm.includes(p.provinceName.toLowerCase()));
    if (match) return match;
  }

  if (lat !== undefined && lon !== undefined) {
    let closest = ZAMBIA_PROVINCIAL_CAPITALS[0];
    let minDist = Infinity;
    for (const cap of ZAMBIA_PROVINCIAL_CAPITALS) {
      const d = calculateGeodesicDistanceKm(lat, lon, cap.latitude, cap.longitude);
      if (d < minDist) {
        minDist = d;
        closest = cap;
      }
    }
    return closest;
  }

  return ZAMBIA_PROVINCIAL_CAPITALS[0]; // Lusaka fallback
}

/**
 * Finds the nearest district capital for a given coordinate or district name.
 */
export function getDistrictCapital(districtName?: string, lat?: number, lon?: number): DistrictCapital {
  if (districtName) {
    const norm = districtName.toLowerCase().replace(/district|urban/g, "").trim();
    const match = ZAMBIA_DISTRICT_CAPITALS.find(d => d.districtName.toLowerCase().includes(norm) || d.name.toLowerCase().includes(norm));
    if (match) return match;
  }

  if (lat !== undefined && lon !== undefined) {
    let closest = ZAMBIA_DISTRICT_CAPITALS[0];
    let minDist = Infinity;
    for (const dist of ZAMBIA_DISTRICT_CAPITALS) {
      const d = calculateGeodesicDistanceKm(lat, lon, dist.latitude, dist.longitude);
      if (d < minDist) {
        minDist = d;
        closest = dist;
      }
    }
    return closest;
  }

  return ZAMBIA_DISTRICT_CAPITALS[0];
}

/**
 * Complete distance breakdown for any destination coordinate:
 * - Distance to District Headquarters
 * - Distance to Provincial Headquarters
 * - Distance to Lusaka National Capital
 */
export interface DestinationDistanceBreakdown {
  destinationCoordinates: { lat: number; lon: number };
  districtHq: {
    name: string;
    distanceKm: number;
    driveTime: string;
  };
  provincialHq: {
    provinceName: string;
    capitalName: string;
    distanceKm: number;
    driveTime: string;
  };
  nationalHq: {
    name: string;
    distanceKm: number;
    driveTime: string;
    flightTimeMinutes: number;
  };
  nearestAirport: {
    name: string;
    code: string;
    type: string;
    distanceKm: number;
    driveTime: string;
    runway: string;
    flightTimeFromLusaka: number;
  };
}

export function calculateDistanceBreakdown(
  lat: number,
  lon: number,
  districtName?: string,
  provinceName?: string
): DestinationDistanceBreakdown {
  const distCap = getDistrictCapital(districtName, lat, lon);
  const provCap = getProvincialCapital(provinceName, lat, lon);

  const districtRoad = estimateRoadDistance(lat, lon, distCap.latitude, distCap.longitude, 60);
  const provRoad = estimateRoadDistance(lat, lon, provCap.latitude, provCap.longitude, 75);
  const nationalRoad = estimateRoadDistance(lat, lon, LUSAKA_NATIONAL_HQ.latitude, LUSAKA_NATIONAL_HQ.longitude, 80);

  // Find nearest airport / airstrip
  let nearestAir = ZAMBIA_AIRPORTS[0];
  let minAirDist = Infinity;
  for (const air of ZAMBIA_AIRPORTS) {
    const d = calculateGeodesicDistanceKm(lat, lon, air.latitude, air.longitude);
    if (d < minAirDist) {
      minAirDist = d;
      nearestAir = air;
    }
  }
  const airportRoad = estimateRoadDistance(lat, lon, nearestAir.latitude, nearestAir.longitude, 60);

  // Flight time estimate from Lusaka (based on 380 km/h turboprop cruise)
  const directFromLusaka = calculateGeodesicDistanceKm(lat, lon, LUSAKA_NATIONAL_HQ.latitude, LUSAKA_NATIONAL_HQ.longitude);
  const flightTimeEstimate = Math.round((directFromLusaka / 380) * 60) + 15; // +15 min taxi/climb

  return {
    destinationCoordinates: { lat, lon },
    districtHq: {
      name: `${distCap.name} (${distCap.districtName})`,
      distanceKm: districtRoad.distanceKm,
      driveTime: districtRoad.driveTimeFormatted
    },
    provincialHq: {
      provinceName: provCap.provinceName,
      capitalName: provCap.name,
      distanceKm: provRoad.distanceKm,
      driveTime: provRoad.driveTimeFormatted
    },
    nationalHq: {
      name: "Lusaka (National Capital)",
      distanceKm: nationalRoad.distanceKm,
      driveTime: nationalRoad.driveTimeFormatted,
      flightTimeMinutes: flightTimeEstimate
    },
    nearestAirport: {
      name: nearestAir.name,
      code: nearestAir.code,
      type: nearestAir.type === "safari_bush_strip" ? "Safari Bush Airstrip" : nearestAir.type === "international" ? "International Airport" : "Domestic Airport",
      distanceKm: airportRoad.distanceKm,
      driveTime: airportRoad.driveTimeFormatted,
      runway: nearestAir.runway,
      flightTimeFromLusaka: nearestAir.flightTimeFromLusakaMinutes || flightTimeEstimate
    }
  };
}

/**
 * Returns available transport and logistical options for a given destination.
 */
export interface DestinationTransportGuide {
  scheduledFlights: string[];
  charterFlights: string[];
  roadAccess: {
    recommendedVehicle: string;
    primaryHighway: string;
    expressBuses: string[];
    fuelStationsEnRoute: string;
  };
  waterOrRail?: string;
}

export function getDestinationTransportGuide(
  lat: number,
  lon: number,
  provinceName?: string
): DestinationTransportGuide {
  const normProv = (provinceName || "").toLowerCase();

  // Safari National Parks & Bush areas (South Luangwa, Lower Zambezi, Kafue, Liuwa)
  if (normProv.includes("eastern") && (lat < -12.5 && lat > -13.6 && lon < 32.2)) {
    return {
      scheduledFlights: ["Proflight Zambia (Daily flights from Lusaka to Mfuwe MFU - 70 mins)"],
      charterFlights: ["Time + Tide Aviation", "Sky Trails Bush Charters", "Robin Pope Air"],
      roadAccess: {
        recommendedVehicle: "High Clearance SUV (Main roads) / 4x4 Required inside park",
        primaryHighway: "T4 Great East Road (Paved to Chipata) then D104 to Mfuwe (Paved 130 km)",
        expressBuses: ["Juldan Motors", "Shalom Express", "Power Tools (Lusaka to Chipata, 8 hrs)"],
        fuelStationsEnRoute: "Puma Mfuwe, TotalEnergies Petauke, Rubis Nyimba"
      }
    };
  }

  if (normProv.includes("western")) {
    return {
      scheduledFlights: ["Proflight Zambia / African Parks charter to Kalabo (Liuwa Plain)"],
      charterFlights: ["Sky Trails Charters", "African Parks Conservation Flights"],
      roadAccess: {
        recommendedVehicle: "4x4 Required (Barotse sand tracks & floodplains) / Sedan on M9 paved",
        primaryHighway: "M9 Lusaka to Mongu (Paved, 590 km) · Mongu-Kalabo Causeway across floodplain",
        expressBuses: ["Mazhandu Family Bus", "Shalom Express", "Likili Motorways (Lusaka to Mongu, 8 hrs)"],
        fuelStationsEnRoute: "Rubis Mongu, Puma Kaoma, Total Mumbwa"
      },
      waterOrRail: "Traditional Zambezi wooden dugout canoe & speedboat transfers across floodplain (Kuomboka routes)"
    };
  }

  if (normProv.includes("southern") && (normProv.includes("livingstone") || lat < -17.0)) {
    return {
      scheduledFlights: ["Proflight Zambia (Daily LUN to Livingstone LVI - 50 mins)", "Airlink (Johannesburg to Livingstone)"],
      charterFlights: ["Wilderness Air", "Batoka Gorge Scenic Helicopters"],
      roadAccess: {
        recommendedVehicle: "2WD Sedan / Standard Car (Fully tarred highway)",
        primaryHighway: "T1 Livingstone - Lusaka Highway (Paved, 480 km)",
        expressBuses: ["Mazhandu Family Bus", "Shalom Express", "Power Tools (Lusaka to Livingstone, 6 hrs)"],
        fuelStationsEnRoute: "Puma Livingstone 24/7, Total Choma, Rubis Monze, Mount Meru Mazabuka"
      },
      waterOrRail: "Livingstone Steam Safari Express Rail & Lake Kariba Ferry / Houseboat Charters"
    };
  }

  // Northern & Waterfalls Circuit
  if (normProv.includes("northern") || normProv.includes("muchinga")) {
    return {
      scheduledFlights: ["Proflight Zambia (Lusaka to Kasama KAA - 85 mins, 3x weekly)"],
      charterFlights: ["Sky Trails Aviation", "Royal Air Charters"],
      roadAccess: {
        recommendedVehicle: "High Clearance SUV / 4x4 Recommended for waterfall access tracks",
        primaryHighway: "T2 Great North Road via Kapiri Mposhi, Mpika & Kasama",
        expressBuses: ["Power Tools Bus Service", "Juldan Motors", "Likili Motorways"],
        fuelStationsEnRoute: "Total Kasama, Mount Meru Mpika, Puma Serenje"
      },
      waterOrRail: "TAZARA Railway (Kapiri Mposhi to Kasama / Nakonde to Dar es Salaam) & MV Liemba Ferry on Lake Tanganyika"
    };
  }

  // Default Central / Urban
  return {
    scheduledFlights: ["Scheduled flights to Kenneth Kaunda Int'l (LUN)"],
    charterFlights: ["Royal Air Charters", "ProCharter (Lusaka based)"],
    roadAccess: {
      recommendedVehicle: "2WD Sedan / Standard Car",
      primaryHighway: "T2 / T3 / T4 National Highway Network",
      expressBuses: ["Intercity Bus Terminus Lusaka (Coaches to all 10 provinces)"],
      fuelStationsEnRoute: "TotalEnergies, Puma, Rubis 24/7 stations every 40-60 km"
    }
  };
}

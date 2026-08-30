export interface PermitType {
  id: string;
  name: string;
  parkName: string;
  categoryTier: "Category A" | "Category B" | "Special Heritage" | "Waterway / Marine";
  authority: string;
  category: "Trek" | "Park" | "Marine" | "Cultural";
  province: string;
  region: string;
  feeCitizenPgk: number;
  feeInternationalUsd: number;
  feePgk: number; // Default base price in Kina for digital booking
  validityDays: number;
  gateHours: string;
  facilities: string[];
  vehicleFees?: { localUnder3T: string; foreignUnder3T: string; heavyVehicle: string };
  campingFee: string;
  description: string;
  includedBenefits: string[];
  rulesAndRegulations: string[];
}

export interface IssuedPermit {
  id: string;
  reference: string;
  permitTypeId: string;
  permitName: string;
  authority: string;
  holderName: string;
  passportOrId: string;
  visitorTier: "Citizen" | "PNG Resident" | "International" | "Trekking Expedition";
  countryOfOrigin: string;
  startDate: string;
  expiryDate: string;
  feePaidPgk: number;
  feePaidZmw?: number; // Backward compatibility
  currencyPaid: string;
  issuedAt: string;
  status: "active" | "verified" | "expired";
  validationQrToken: string;
  offlineVerificationHash: string;
}

export const PNG_PARK_FEE_SCHEDULE = {
  generalRules: [
    "Kokoda Track trekking requires a mandatory licensed guide or Kokoda Track Authority accredited operator.",
    "Children under 5 years of age enter CEPA national parks FREE of charge.",
    "All trekkers on Kokoda and Mount Wilhelm must carry medical insurance with emergency helicopter evacuation coverage.",
    "Park entry and trekking fees contribute directly to local landowner community development funds and trail maintenance.",
    "Papua New Guinea Citizens must present a valid National ID Card (NID), Driver's Licence, or Passport."
  ],
  vehicleTariffs: [
    { type: "Standard 4x4 / PMV Park Entry", rate: "K 15.00 PGK / vehicle" },
    { type: "Commercial Tour Bus / Coaster", rate: "K 50.00 PGK / vehicle" }
  ],
  activityTariffs: [
    { activity: "Varirata National Park Designated Campsite", rate: "K 25.00 PGK (Citizen) / $15.00 USD (Intl) per person/night" },
    { activity: "Kokoda Track Community Landowner Guesthouse Camp", rate: "K 40.00 PGK per trekker/night" },
    { activity: "Kimbe Bay Marine Sanctuary Diving Pass", rate: "$12.00 USD per diver/day" },
    { activity: "Sepik River Haus Tambaran Photography Clearance", rate: "K 30.00 PGK per village" },
    { activity: "Mount Wilhelm Alpine Guide & Porter Escort", rate: "K 80.00 PGK per guide/day" }
  ]
};

export const PNG_PERMIT_TYPES: PermitType[] = [
  {
    id: "kokoda-track-permit",
    name: "Kokoda Track Authority (KTA) Official Trekking Permit & Landowner Access Pass",
    parkName: "Kokoda Track Memorial Reserve & Owen Stanley Range",
    categoryTier: "Special Heritage",
    authority: "Kokoda Track Authority (KTA PNG)",
    category: "Trek",
    province: "Central & Oro (Northern) Provinces",
    region: "Southern",
    feeCitizenPgk: 150,
    feeInternationalUsd: 185,
    feePgk: 650, // Approx K650 for international trekking permit
    validityDays: 14,
    gateHours: "Trail checkposts open 06:00 – 18:00 Daily",
    facilities: [
      "Owers' Corner Ranger Station & Southern Trailhead Memorial Arches",
      "Kokoda Station Ranger Command & WWII Historical Museum",
      "Designated wilderness campsites (Ua-Ule, Nauro, Menari, Efogi, Alola)",
      "Satellite emergency SOS ranger posts at Brigade Hill & Efogi Airstrip",
      "Suspension bridges and safe river crossing lines",
      "Medical aid posts at Menari, Efogi, and Kokoda Hospital"
    ],
    campingFee: "Included in community landowner trekking levy",
    description: "Official statutory trekking permit mandated by the Government of Papua New Guinea for all individuals crossing the 96km Kokoda Track. Funds trail maintenance, environmental conservation, and health/education services for Koiari and Orokaiva landowner communities.",
    includedBenefits: [
      "Full 14-day clearance across the entire 96km Owers' Corner to Kokoda Station corridor",
      "Emergency radio beacon registration with KTA Search & Rescue Operations",
      "Official Kokoda Track Completion Certificate & Commemorative Medallion",
      "Direct contribution to Kokoda village school and medical aid post trusts"
    ],
    rulesAndRegulations: [
      "Trekkers must trek under the guidance of an accredited KTA tour operator or licensed local guide.",
      "Strict 'Leave No Trace' policy: all non-biodegradable waste must be carried out.",
      "Respect local Sunday church observances in Koiari Seventh-day Adventist villages (Nauro, Menari, Efogi); avoid disruptive noise.",
      "Do not remove or disturb wartime relics, ordnance, or historical artifacts along the track."
    ]
  },
  {
    id: "varirata-national-park-pass",
    name: "Varirata National Park Conservation & Nature Pass",
    parkName: "Varirata National Park & Sogeri Plateau Rainforest",
    categoryTier: "Category A",
    authority: "Conservation and Environment Protection Authority (CEPA PNG)",
    category: "Park",
    province: "Central Province",
    region: "Southern",
    feeCitizenPgk: 10,
    feeInternationalUsd: 15,
    feePgk: 45,
    validityDays: 1,
    gateHours: "06:00 – 18:00 Daily",
    facilities: [
      "Varirata Visitor Information Center & Orchid Botanical Garden",
      "Main Lookout Deck with panoramic views over Port Moresby and the Coral Sea",
      "Signposted Rainforest Nature Trails (Gada Bird Trail, Circuit Trail, Scarp Trail)",
      "Designated birding hides for observing Raggiana Bird of Paradise mating displays",
      "Covered BBQ picnic pavilions and freshwater taps",
      "Overnight campsite grounds with toilet amenities"
    ],
    vehicleFees: { localUnder3T: "K 10.00 PGK", foreignUnder3T: "$5.00 USD", heavyVehicle: "$15.00 USD" },
    campingFee: "K 25.00 PGK (Citizen) / $15.00 USD (Intl) per person/night",
    description: "Papua New Guinea's first declared national park, encompassing 1,063 hectares of pristine coastal and mountain rainforest on the Sogeri Plateau. Renowned for spectacular Raggiana Bird of Paradise lekking trees, kingfishers, and wallabies.",
    includedBenefits: [
      "Unlimited daily entry to all walking trails and scenic cliffside lookouts",
      "Access to Raggiana Bird of Paradise observation hides at dawn",
      "Use of covered picnic and BBQ facilities"
    ],
    rulesAndRegulations: [
      "Open fires are permitted only in designated barbecue pits.",
      "No hunting or capture of wildlife or flora.",
      "Speed limit of 30 km/h within park boundaries to protect wildlife."
    ]
  },
  {
    id: "mount-wilhelm-permit",
    name: "Mount Wilhelm Alpine Conservation & Landowner Summit Clearance",
    parkName: "Mount Wilhelm Protected Area (4,509m / 14,793ft)",
    categoryTier: "Special Heritage",
    authority: "Simbu Provincial Government & Keglsugl Community Eco-Trust",
    category: "Trek",
    province: "Simbu (Chimbu) Province",
    region: "Highlands",
    feeCitizenPgk: 50,
    feeInternationalUsd: 65,
    feePgk: 220,
    validityDays: 5,
    gateHours: "Trail access 24/7 (Summit departures typically 01:00 AM)",
    facilities: [
      "Betty's Lodge & Trout Farm Basecamp Reception at Keglsugl",
      "A-frame wooden alpine huts at Lake Piunde (3,500m)",
      "Lake Aunde scenic tarn lookout and cycad nature trail",
      "Emergency radio link with Kundiawa Search & Rescue Base",
      "Certified local Simbu high-altitude guide station"
    ],
    campingFee: "K 40.00 PGK (Citizen) / $20.00 USD (Intl) per night at Lake Piunde hut",
    description: "Mandatory conservation permit for scaling Papua New Guinea's highest peak (4,509m). Protects fragile sub-alpine grasslands, glacial tarns, and WWII aviation heritage wreckage while supporting Keglsugl mountain village guides.",
    includedBenefits: [
      "5-day alpine climbing permit covering Keglsugl to Trig Point summit",
      "Overnight accommodation access to Lake Piunde wooden alpine refuge huts",
      "Official Mount Wilhelm Summit Certificate issued at Betty's Lodge"
    ],
    rulesAndRegulations: [
      "All climbers must be accompanied by an accredited local guide from Keglsugl.",
      "Extreme sub-zero night temperatures: proper thermal alpine gear is mandatory.",
      "Strict waste removal: pack out all rubbish from alpine lakes and summit ridges."
    ]
  },
  {
    id: "kimbe-bay-marine-pass",
    name: "Kimbe Bay Marine Sanctuary Conservation & Dive Pass",
    parkName: "Kimbe Bay Coral Triangle Marine Conservation Area",
    categoryTier: "Waterway / Marine",
    authority: "Mahonia Na Dari Research Center & West New Britain Provincial Government",
    category: "Marine",
    province: "West New Britain Province",
    region: "Islands",
    feeCitizenPgk: 25,
    feeInternationalUsd: 12,
    feePgk: 45,
    validityDays: 7,
    gateHours: "Marine patrols active 24/7",
    facilities: [
      "Walindi Plantation Resort dive jetty and hyperbaric support link",
      "Mahonia Na Dari Marine Research Center & Nature Trail",
      "Mooring buoys installed across 30+ pristine coral seamounts (South Emma, Inglis Shoal, Restorf Island)",
      "Whale shark and hammerhead patrol vessel checkposts"
    ],
    campingFee: "K 50.00 PGK per island camping permit",
    description: "Kimbe Bay contains over 860 species of reef fish and 60% of all coral species in the entire Indo-Pacific region. This marine pass directly funds local reef rangers, mooring maintenance to prevent anchor damage, and marine education in coastal schools.",
    includedBenefits: [
      "7-day scuba diving and snorkeling access to all protected reefs and seamounts in Kimbe Bay",
      "Tour of Mahonia Na Dari Marine Conservation Center",
      "Direct contribution to coastal coral nursery rehabilitation"
    ],
    rulesAndRegulations: [
      "Zero contact with live coral; gloves and touch knives prohibited while diving.",
      "Boats must use installed permanent mooring buoys; anchoring on reef tops is strictly prohibited."
    ]
  },
  {
    id: "sepik-river-cultural-permit",
    name: "Sepik River Cultural Heritage & Haus Tambaran Exploration Pass",
    parkName: "Middle & Upper Sepik River Protected Cultural Corridor",
    categoryTier: "Special Heritage",
    authority: "East Sepik Provincial Tourism Bureau & Ambunti-Dreikikier Council",
    category: "Cultural",
    province: "East Sepik Province",
    region: "Momase",
    feeCitizenPgk: 40,
    feeInternationalUsd: 35,
    feePgk: 120,
    validityDays: 10,
    gateHours: "River village landings daylight hours (06:00 – 18:00)",
    facilities: [
      "Ambunti River Gateway Station & Tour Dispatch Jetty",
      "Historic Haus Tambaran (Spirit Houses) at Kanganaman, Palimbe, and Korogo",
      "Traditional motorized dugout canoe expedition landings",
      "Village riverbank guest houses with mosquito-netted bedding"
    ],
    campingFee: "K 35.00 PGK per night in village stilt homestays",
    description: "Enables respectful cultural exploration across Middle Sepik River villages. Covers spirit house entry protocols, photography clearances for ceremonial artifacts, and village landing fees along the great Sepik waterway.",
    includedBenefits: [
      "Authorized village landing clearances across Middle Sepik Iatmul clan communities",
      "Entry to the famous UNESCO-listed Kanganaman Haus Tambaran",
      "Exemption from separate individual village photographic levy demands"
    ],
    rulesAndRegulations: [
      "Always greet village chiefs and elders upon landing before photographing community members.",
      "Women must check with local guides before entering upper sacred chambers of Haus Tambaran.",
      "Support local artisans by buying wood carvings directly at village markets."
    ]
  }
];

export const ALL_PERMIT_TYPES: PermitType[] = PNG_PERMIT_TYPES;

export function createPermit(
  permitTypeId: string,
  holderName: string,
  passportOrId: string,
  visitorTier: "Citizen" | "PNG Resident" | "International" | "Trekking Expedition" = "International",
  countryOfOrigin: string = "Papua New Guinea",
  startDate: string = new Date().toISOString().slice(0, 10),
  currency: string = "PGK"
): IssuedPermit {
  const permitType = PNG_PERMIT_TYPES.find(p => p.id === permitTypeId) || PNG_PERMIT_TYPES[0];
  const start = new Date(startDate);
  const expiry = new Date(start);
  expiry.setDate(start.getDate() + (permitType.validityDays || 1));

  let calculatedFee = permitType.feePgk;
  if (visitorTier === "Citizen") {
    calculatedFee = permitType.feeCitizenPgk;
  } else if (visitorTier === "PNG Resident") {
    calculatedFee = Math.round(permitType.feePgk * 0.6);
  } else if (visitorTier === "Trekking Expedition") {
    calculatedFee = permitType.feePgk;
  } else {
    calculatedFee = permitType.feePgk;
  }

  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const prefix = permitType.id.includes("kokoda") ? "PNG-KTA" : "PNG-CEPA";
  const reference = `${prefix}-${new Date().getFullYear()}-${randomNum}`;
  const validationQrToken = `VISITPNG-PERMIT-VERIFIED|${reference}|${holderName}|${permitType.parkName}|${visitorTier}|VALID:${startDate}TO${expiry.toISOString().slice(0,10)}`;
  const offlineVerificationHash = `SHA256-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

  return {
    id: `permit-${Date.now()}-${randomNum}`,
    reference,
    permitTypeId: permitType.id,
    permitName: permitType.name,
    authority: permitType.authority,
    holderName,
    passportOrId,
    visitorTier,
    countryOfOrigin,
    startDate,
    expiryDate: expiry.toISOString().slice(0, 10),
    feePaidPgk: calculatedFee,
    feePaidZmw: calculatedFee,
    currencyPaid: currency || "PGK",
    issuedAt: new Date().toISOString(),
    status: "active",
    validationQrToken,
    offlineVerificationHash
  };
}

export const ZAMBIA_PERMIT_TYPES = PNG_PERMIT_TYPES;


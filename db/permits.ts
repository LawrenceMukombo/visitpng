export interface PermitType {
  id: string;
  name: string;
  authority: string;
  category: "Trek" | "Park" | "Marine" | "Cultural";
  province: string;
  feePgk: number;
  validityDays: number;
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
  countryOfOrigin: string;
  startDate: string;
  expiryDate: string;
  feePaidPgk: number;
  currencyPaid: string;
  issuedAt: string;
  status: "active" | "verified" | "expired";
  validationQrToken: string;
  offlineVerificationHash: string;
}

export const PNG_PERMIT_TYPES: PermitType[] = [
  {
    id: "kokoda-track-permit",
    name: "Kokoda Track Authority Official Trekking Permit",
    authority: "Kokoda Track Authority (KTA)",
    category: "Trek",
    province: "Central & Oro (Northern)",
    feePgk: 350,
    validityDays: 14,
    description: "Mandatory official trekking permit for walking the Kokoda Track. Directly funds landowner track maintenance, village medical supplies, school support, and emergency ranger search-and-rescue posts.",
    includedBenefits: [
      "Official KTA Track Registration & Ranger Manifest Entry",
      "Landowner Track Access across all Koiari & Oro customary lands",
      "Emergency Ranger Station Radio Check-in Privileges",
      "Official Kokoda Finisher Certificate verification"
    ],
    rulesAndRegulations: [
      "Permit must be carried at all times (digitally offline or printed).",
      "All trekkers must be accompanied by an accredited local trek leader or porter.",
      "Stay on designated track routes; do not damage historic wartime artifacts."
    ]
  },
  {
    id: "mount-wilhelm-pass",
    name: "Mount Wilhelm Summit & Conservation Pass",
    authority: "Keglsugl Community Eco-Tourism Trust",
    category: "Trek",
    province: "Simbu (Chimbu)",
    feePgk: 150,
    validityDays: 7,
    description: "Official mountain summit permit for climbing Mount Wilhelm. Funds high-altitude alpine hut maintenance at Lake Piunde and local Simbu conservation rangers.",
    includedBenefits: [
      "Access to Lake Piunde & Aunde alpine huts",
      "Simbu Community Guide coordination",
      "High-altitude mountain rescue registry"
    ],
    rulesAndRegulations: [
      "Carry out all personal rubbish and plastic bottles (Strict Zero Waste).",
      "Open fires are strictly prohibited in the alpine moss forest zone."
    ]
  },
  {
    id: "varirata-national-park",
    name: "Varirata National Park Conservation Day Pass",
    authority: "Conservation and Environment Protection Authority (CEPA)",
    category: "Park",
    province: "Central Province (Sogeri)",
    feePgk: 25,
    validityDays: 1,
    description: "Entry pass for Papua New Guinea's first national park, featuring Raggiana Bird of Paradise displays, rainforest walking circuits, and scenic lookouts over the Coral Sea.",
    includedBenefits: [
      "All-day vehicle & visitor entry to Varirata National Park",
      "Access to birdwatching hides, lookouts, and picnic facilities",
      "CEPA rainforest trail map guide"
    ],
    rulesAndRegulations: [
      "Park gates open 06:00 AM to 06:00 PM.",
      "No hunting or removal of native plants and orchids."
    ]
  },
  {
    id: "tufi-marine-reef-tag",
    name: "Tufi Marine Protected Area Reef Tag",
    authority: "Cape Nelson Marine Conservation Committee",
    category: "Marine",
    province: "Oro (Northern)",
    feePgk: 80,
    validityDays: 10,
    description: "Marine conservation reef tag for scuba diving, snorkeling, and sea kayaking across the 30 volcanic fjords and outer coral atolls of Cape Nelson.",
    includedBenefits: [
      "Authorized diving and snorkeling across all Tufi outer barrier reefs",
      "Support for community coral nurseries and giant clam sanctuaries",
      "Traditional outrigger canoe landing rights in fjord villages"
    ],
    rulesAndRegulations: [
      "Strict No-Touch rule on all living corals and marine life.",
      "Use only reef-safe biodegradable sunscreen."
    ]
  },
  {
    id: "kimbe-bay-coral-tag",
    name: "Kimbe Bay Coral Reef Ecology Tag",
    authority: "Mahonia Na Dari Conservation Centre & West New Britain Provincial Government",
    category: "Marine",
    province: "West New Britain",
    feePgk: 90,
    validityDays: 10,
    description: "Conservation tag for exploring Kimbe Bay, home to over 860 species of reef fish and 60% of all Indo-Pacific coral species in the Coral Triangle.",
    includedBenefits: [
      "Diving & marine research access across Kimbe Bay seamounts",
      "Contribution to local school marine education programmes",
      "Mooring buoy maintenance and reef protection patrols"
    ],
    rulesAndRegulations: [
      "Diving boats must only attach to permanent moorings.",
      "Spearfishing is strictly prohibited within marine sanctuary zones."
    ]
  },
  {
    id: "sepik-river-pass",
    name: "Sepik River Tribal Council Cultural Permit",
    authority: "East Sepik Provincial Council & Iatmul Landowners",
    category: "Cultural",
    province: "East Sepik",
    feePgk: 120,
    validityDays: 14,
    description: "Cultural access permit for traveling along the Middle and Upper Sepik River communities, visiting historic Haus Tambarans, and attending ceremonial crocodile dances.",
    includedBenefits: [
      "Authorized entry to village communal grounds and ceremonial sites",
      "Permission to photograph traditional wood carvings and village architecture",
      "Direct village landowner development fund contribution"
    ],
    rulesAndRegulations: [
      "Do not enter the upper chambers of a Haus Tambaran without invitation by village elders.",
      "Respect village chiefs and customary gift protocols upon arrival."
    ]
  }
];

export const ZAMBIA_PERMIT_TYPES: PermitType[] = [
  {
    id: "south-luangwa-entry-pass",
    name: "DNPW South Luangwa National Park Entry & Conservation Pass",
    authority: "Department of National Parks & Wildlife (DNPW Zambia)",
    category: "Park",
    province: "Eastern Province",
    feePgk: 380,
    validityDays: 7,
    description: "Official DNPW conservation permit for South Luangwa National Park. Funds anti-poaching wildlife scouts, community wildlife trusts, and game corridor maintenance.",
    includedBenefits: [
      "Access to Mfuwe & Nsefu Game Sectors",
      "Night Game Drive Ranger Authorization",
      "Walking Safari Armed Scout Escort Registration",
      "Complimentary DNPW Park Map & Bird Checklist"
    ],
    rulesAndRegulations: [
      "Keep digital permit available for inspection at Mfuwe Main Gate.",
      "Off-road driving is strictly prohibited in wilderness zones.",
      "Speed limit inside national park is 40 km/h."
    ]
  },
  {
    id: "victoria-falls-heritage-pass",
    name: "Victoria Falls (Mosi-oa-Tunya) World Heritage Conservation Pass",
    authority: "National Heritage Conservation Commission (NHCC Zambia)",
    category: "Park",
    province: "Southern Province",
    feePgk: 220,
    validityDays: 3,
    description: "Mandatory rainforest conservation pass granting full access to Devil's Cataract, Main Falls, Knife-Edge Bridge, and Batoka Gorge trails.",
    includedBenefits: [
      "Multi-entry access to Victoria Falls Rainforest Reserve",
      "Knife-Edge Bridge & Boiling Pot Trail Access",
      "Lunar Rainbow night opening access during full moon"
    ],
    rulesAndRegulations: [
      "Stay on paved stone pathways at all times.",
      "No littering or feeding baboons and vervet monkeys."
    ]
  },
  {
    id: "lower-zambezi-river-pass",
    name: "Lower Zambezi National Park Waterway & Safari Permit",
    authority: "Department of National Parks & Wildlife (DNPW Zambia)",
    category: "Marine",
    province: "Lusaka Province",
    feePgk: 320,
    validityDays: 5,
    description: "Official waterway navigation, canoeing, and game viewing permit along the Zambezi River channels opposite Mana Pools.",
    includedBenefits: [
      "Canoe trail channel access and island camping registration",
      "Catch-and-release tiger fishing authorization",
      "Chongwe Gate ranger dispatch clearance"
    ],
    rulesAndRegulations: [
      "Life jackets must be worn at all times while canoeing.",
      "Strict catch-and-release policy for all Tigerfish."
    ]
  }
];

export const ALL_PERMIT_TYPES = [...PNG_PERMIT_TYPES, ...ZAMBIA_PERMIT_TYPES];

export function createPermit(
  permitTypeId: string,
  holderName: string,
  passportOrId: string,
  countryOfOrigin: string,
  startDate: string,
  currencyPaid: string = "PGK"
): IssuedPermit {
  const permitType = ALL_PERMIT_TYPES.find(p => p.id === permitTypeId) || ALL_PERMIT_TYPES[0];
  const randCode = Math.floor(1000 + Math.random() * 9000);
  const prefix = permitType.id.slice(0, 3).toUpperCase();
  const year = new Date().getFullYear();
  const reference = `${currencyPaid === "ZMW" ? "ZV" : "PNG"}-${prefix}-${year}-${randCode}`;

  const start = new Date(startDate || Date.now());
  const expiry = new Date(start.getTime() + permitType.validityDays * 86400000);

  const issuedAt = new Date().toISOString();
  
  // Compact payload for QR verification
  const qrPayload = JSON.stringify({
    ref: reference,
    auth: permitType.authority,
    holder: holderName,
    id: passportOrId,
    start: start.toISOString().slice(0, 10),
    exp: expiry.toISOString().slice(0, 10),
    issued: issuedAt.slice(0, 10),
    status: "active"
  });

  const offlineVerificationHash = Buffer.from(qrPayload).toString("base64");

  return {
    id: `permit_${Date.now()}_${randCode}`,
    reference,
    permitTypeId: permitType.id,
    permitName: permitType.name,
    authority: permitType.authority,
    holderName: holderName.trim() || "Visiting Explorer",
    passportOrId: passportOrId.trim().toUpperCase() || "UNSPECIFIED",
    countryOfOrigin: countryOfOrigin.trim() || "Papua New Guinea",
    startDate: start.toISOString().slice(0, 10),
    expiryDate: expiry.toISOString().slice(0, 10),
    feePaidPgk: permitType.feePgk,
    currencyPaid,
    issuedAt,
    status: "active",
    validationQrToken: qrPayload,
    offlineVerificationHash
  };
}

export interface PermitType {
  id: string;
  name: string;
  authority: string;
  category: "Trek" | "Park" | "Marine" | "Cultural";
  province: string;
  feeZmw: number;
  feePgk?: number; // Backward compatibility
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
  feePaidZmw: number;
  feePaidPgk?: number; // Backward compatibility
  currencyPaid: string;
  issuedAt: string;
  status: "active" | "verified" | "expired";
  validationQrToken: string;
  offlineVerificationHash: string;
}

export const ZAMBIA_PERMIT_TYPES: PermitType[] = [
  {
    id: "south-luangwa-entry-pass",
    name: "DNPW South Luangwa National Park Entry & Conservation Pass",
    authority: "Department of National Parks & Wildlife (DNPW Zambia)",
    category: "Park",
    province: "Eastern Province",
    feeZmw: 450,
    feePgk: 450,
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
    feeZmw: 350,
    feePgk: 350,
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
    feeZmw: 420,
    feePgk: 420,
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
  },
  {
    id: "kafue-national-park-pass",
    name: "Kafue National Park & Busanga Wilderness Pass",
    authority: "Department of National Parks & Wildlife (DNPW Zambia)",
    category: "Park",
    province: "Central Province",
    feeZmw: 400,
    feePgk: 400,
    validityDays: 7,
    description: "Conservation entry permit for Kafue National Park, Itezhi-Tezhi lake waters, and the Busanga Plains wildlife sector.",
    includedBenefits: [
      "Access to northern Busanga and southern Lake Itezhi-Tezhi sectors",
      "River launch clearance at Kafue River crossings",
      "Game ranger check-in at Hook Bridge Gate"
    ],
    rulesAndRegulations: [
      "Entry allowed from sunrise (06:00) to sunset (18:30).",
      "Keep digital QR code ready for gate inspection."
    ]
  }
];

export const PNG_PERMIT_TYPES: PermitType[] = ZAMBIA_PERMIT_TYPES;
export const ALL_PERMIT_TYPES: PermitType[] = ZAMBIA_PERMIT_TYPES;

export function createPermit(
  permitTypeId: string,
  holderName: string,
  passportOrId: string,
  countryOfOrigin: string,
  startDate: string,
  currencyPaid: string = "ZMW"
): IssuedPermit {
  const permitType = ALL_PERMIT_TYPES.find(p => p.id === permitTypeId) || ALL_PERMIT_TYPES[0];
  const randCode = Math.floor(1000 + Math.random() * 9000);
  const prefix = permitType.id.slice(0, 3).toUpperCase();
  const year = new Date().getFullYear();
  const reference = `ZR-${prefix}-${year}-${randCode}`;

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
    countryOfOrigin: countryOfOrigin.trim() || "Zambia",
    startDate: start.toISOString().slice(0, 10),
    expiryDate: expiry.toISOString().slice(0, 10),
    feePaidZmw: permitType.feeZmw,
    feePaidPgk: permitType.feeZmw,
    currencyPaid,
    issuedAt,
    status: "active",
    validationQrToken: qrPayload,
    offlineVerificationHash
  };
}

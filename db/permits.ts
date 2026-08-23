export interface PermitType {
  id: string;
  name: string;
  parkName: string;
  categoryTier: "Category A" | "Category B" | "Special Heritage" | "Waterway / Marine";
  authority: string;
  category: "Trek" | "Park" | "Marine" | "Cultural";
  province: string;
  region: string;
  feeCitizenZmw: number;
  feeSadcUsd: number;
  feeInternationalUsd: number;
  feeSelfDriveUsd: number;
  feeZmw: number; // Default base price in Kwacha for digital booking
  validityDays: number;
  gateHours: string;
  facilities: string[];
  vehicleFees: { localUnder3T: string; foreignUnder3T: string; heavyVehicle: string };
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
  visitorTier: "Citizen" | "SADC Resident" | "International" | "Self-Drive";
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

export const ZAMBIA_PARK_FEE_SCHEDULE = {
  generalRules: [
    "Park entry is valid daily from 06:00 (sunrise) to 18:00 (sunset).",
    "Children under 5 years of age enter FREE of charge.",
    "Children aged 5 to 13 years pay 50% of the standard adult entry fee.",
    "Gate payments are CASH-ONLY in most national parks. Card machines and ATMs are not available at gates.",
    "US Dollar notes must be from 2013 or newer series, undamaged and unblemished.",
    "Zambian Citizens must present a valid National Registration Card (NRC) or Passport."
  ],
  vehicleTariffs: [
    { type: "Local Vehicles (< 3 tonnes)", rate: "K34.00 ZMW / day" },
    { type: "Local Heavy Vehicles (> 3 tonnes)", rate: "K56.00 ZMW / day" },
    { type: "Foreign Registered Vehicles (< 3 tonnes)", rate: "$15.00 USD / day" },
    { type: "Foreign Heavy Vehicles (> 3 tonnes)", rate: "$30.00 USD / day" }
  ],
  activityTariffs: [
    { activity: "Designated Wilderness Camping", rate: "K42.00 ZMW (Citizen) / $15.00 USD (Intl) per person/day" },
    { activity: "Boat Cruising / Motorized Vessel", rate: "$15.00 USD per boat/day" },
    { activity: "Canoeing River Permit (Lower Zambezi)", rate: "$10.00 USD per canoe/day" },
    { activity: "Sport Fishing & Angling (Catch & Release)", rate: "$15.00 USD per angler/day" },
    { activity: "Night Game Drive Scout Escort", rate: "$20.00 USD per vehicle" }
  ]
};

export const ZAMBIA_PERMIT_TYPES: PermitType[] = [
  {
    id: "south-luangwa-entry-pass",
    name: "South Luangwa National Park Conservation & Entry Pass",
    parkName: "South Luangwa National Park",
    categoryTier: "Category A",
    authority: "Department of National Parks & Wildlife (DNPW Zambia)",
    category: "Park",
    province: "Eastern Province",
    region: "Eastern & Luangwa Valley",
    feeCitizenZmw: 55.60,
    feeSadcUsd: 20,
    feeInternationalUsd: 25,
    feeSelfDriveUsd: 30,
    feeZmw: 700, // Intl equivalent in ZMW
    validityDays: 1,
    gateHours: "06:00 – 18:00 Daily",
    facilities: [
      "Mfuwe Main Gate Visitor Center & DNPW Ranger Post",
      "Mfuwe Lodge & Bushcamp Company remote camps (Bilimungwe, Chamilandu, Chindeni, Kapamba, Kuyenda, Zungulila)",
      "Time + Tide Luwi, Nsolo & Kakuli walking camps",
      "Mfuwe International Airport safari transfers",
      "Designated Luangwa riverbank picnic and game-viewing hides",
      "Armed scout walking safari escort stations"
    ],
    vehicleFees: { localUnder3T: "K34.00 ZMW", foreignUnder3T: "$15.00 USD", heavyVehicle: "$30.00 USD" },
    campingFee: "K42.00 ZMW (Citizen) / $15.00 USD (Intl) per person/night",
    description: "Official DNPW entry permit for South Luangwa National Park—the world's birthplace of the walking safari. Famous for exceptional leopard densities, wild dog packs, and elephant herds.",
    includedBenefits: [
      "Full daily entry to Mfuwe, Nsefu & Luamfwa game sectors",
      "Walking safari registration with armed DNPW wildlife scout",
      "Night game drive ranger checkpoint clearance",
      "Official DNPW Luangwa wildlife checklist & gate clearance"
    ],
    rulesAndRegulations: [
      "Keep digital permit and photo ID available for inspection at Mfuwe Gate.",
      "Off-road driving is strictly prohibited in pristine riverine zones.",
      "Speed limit inside the park is 40 km/h."
    ]
  },
  {
    id: "lower-zambezi-national-park-pass",
    name: "Lower Zambezi National Park & Waterway Pass",
    parkName: "Lower Zambezi National Park",
    categoryTier: "Category A",
    authority: "Department of National Parks & Wildlife (DNPW Zambia)",
    category: "Marine",
    province: "Lusaka / Southern Province",
    region: "Lower Zambezi & Chiawa",
    feeCitizenZmw: 55.60,
    feeSadcUsd: 20,
    feeInternationalUsd: 25,
    feeSelfDriveUsd: 30,
    feeZmw: 700,
    validityDays: 1,
    gateHours: "06:00 – 18:00 Daily",
    facilities: [
      "Chongwe Gate & Jeki Airstrip Ranger Station",
      "Sausage Tree Camp, Potato Bush Camp & Chongwe River Camp",
      "Chiawa Camp & Old Mondoro luxury bush retreats",
      "Pontoon boat launches and canoe staging platforms along the Zambezi River",
      "Wilderness river island campsites opposite Mana Pools"
    ],
    vehicleFees: { localUnder3T: "K34.00 ZMW", foreignUnder3T: "$15.00 USD", heavyVehicle: "$30.00 USD" },
    campingFee: "K42.00 ZMW (Citizen) / $15.00 USD (Intl) per person/night",
    description: "Conservation permit for the Lower Zambezi National Park, famous for dramatic escarpment scenery, canoe safaris along river channels, and catch-and-release tiger fishing.",
    includedBenefits: [
      "Zambezi River waterway navigation and canoe trail access",
      "Island and riverbank game-viewing boat access",
      "Catch-and-release sport fishing registration",
      "Chongwe Gate clearance and wildlife guide registration"
    ],
    rulesAndRegulations: [
      "Life jackets must be worn at all times when navigating the Zambezi channels.",
      "Strict catch-and-release policy for all Tigerfish and Vundu.",
      "Maintain safe distance from elephant herds crossing channels."
    ]
  },
  {
    id: "victoria-falls-mosi-oa-tunya-pass",
    name: "Mosi-oa-Tunya & Victoria Falls World Heritage Pass",
    parkName: "Mosi-oa-Tunya National Park (Victoria Falls)",
    categoryTier: "Special Heritage",
    authority: "National Heritage Conservation Commission (NHCC) / DNPW",
    category: "Park",
    province: "Southern Province",
    region: "Livingstone & Victoria Falls",
    feeCitizenZmw: 33.60,
    feeSadcUsd: 10,
    feeInternationalUsd: 15,
    feeSelfDriveUsd: 15,
    feeZmw: 420,
    validityDays: 1,
    gateHours: "06:00 – 18:00 (Night Lunar Rainbow open on Full Moon: 19:00 – 22:00)",
    facilities: [
      "Main Rainforest Gate & Curio Craft Market",
      "The Royal Livingstone Hotel by Anantara & Avani Victoria Falls Resort",
      "Livingstone Island launch jetty (Devil's Pool & Angel's Pool excursions)",
      "Knife-Edge Bridge, Boiling Pot Trail, and Batoka Gorge viewpoints",
      "Helicopter flight pads and Maramba Cultural Village"
    ],
    vehicleFees: { localUnder3T: "K34.00 ZMW", foreignUnder3T: "$15.00 USD", heavyVehicle: "$30.00 USD" },
    campingFee: "Victoria Falls Waterfront & Maramba River campsites available in Livingstone",
    description: "Official UNESCO World Heritage conservation pass for Victoria Falls (Mosi-oa-Tunya). Grants access to the knife-edge bridge, rainforest paths, and boiling pot gorge trails.",
    includedBenefits: [
      "Full day multi-entry pass to Victoria Falls rainforest",
      "Access to Knife-Edge Bridge, Eastern Cataract & Boiling Pot trail",
      "Photographic access to lunar rainbow openings on full moon dates"
    ],
    rulesAndRegulations: [
      "Stay on designated stone paths and viewing safety barriers at all times.",
      "Do not feed wild baboons or vervet monkeys.",
      "Waterproof camera protection recommended during peak high water spray (March – June)."
    ]
  },
  {
    id: "kafue-national-park-pass",
    name: "Kafue National Park & Busanga Wilderness Pass",
    parkName: "Kafue National Park",
    categoryTier: "Category B",
    authority: "Department of National Parks & Wildlife (DNPW Zambia)",
    category: "Park",
    province: "Central / Southern / North-Western",
    region: "Kafue & Busanga Plains",
    feeCitizenZmw: 44.80,
    feeSadcUsd: 15,
    feeInternationalUsd: 20,
    feeSelfDriveUsd: 20,
    feeZmw: 560,
    validityDays: 1,
    gateHours: "06:00 – 18:00 Daily",
    facilities: [
      "Hook Bridge Gate & Chunga DNPW Headquarters",
      "Busanga Plains luxury camps (Wilderness Shumba, Busanga Bush Camp)",
      "Mukambi Safari Lodge, KaingU Safari Lodge & Musekese Camp",
      "Lake Itezhi-Tezhi boating marina and angling chalets",
      "Transit route on M9 Lusaka-Mongu road across the park"
    ],
    vehicleFees: { localUnder3T: "K34.00 ZMW", foreignUnder3T: "$15.00 USD", heavyVehicle: "$30.00 USD" },
    campingFee: "K42.00 ZMW (Citizen) / $15.00 USD (Intl) per person/night",
    description: "Entry permit for Kafue National Park—one of the largest conservation sanctuaries in Africa (22,400 sq km), celebrated for the tree-climbing lions of Busanga and 20 antelope species.",
    includedBenefits: [
      "Access to northern Busanga Plains and southern Itezhi-Tezhi sectors",
      "Kafue River boat launch clearance",
      "Official DNPW wildlife map & guide registration"
    ],
    rulesAndRegulations: [
      "Straight transit along the M9 paved road is exempt from entry fees if completed without turning off.",
      "Stay on marked tracks across the Busanga floodplain."
    ]
  },
  {
    id: "north-luangwa-national-park-pass",
    name: "North Luangwa National Park & Black Rhino Sanctuary Pass",
    parkName: "North Luangwa National Park",
    categoryTier: "Category B",
    authority: "Department of National Parks & Wildlife (DNPW / FZS)",
    category: "Park",
    province: "Muchinga Province",
    region: "Muchinga & Northern Escarpment",
    feeCitizenZmw: 44.80,
    feeSadcUsd: 15,
    feeInternationalUsd: 20,
    feeSelfDriveUsd: 20,
    feeZmw: 560,
    validityDays: 1,
    gateHours: "06:00 – 18:00 (Advance Booking Required for Rhino Zone)",
    facilities: [
      "Mwaleshi Walking Camp & Takwela Camp",
      "Mano DNPW / Frankfurt Zoological Society Conservation Base",
      "Mwaleshi River natural rock pools and walking trails",
      "Intensive Black Rhino Protection Zone"
    ],
    vehicleFees: { localUnder3T: "K34.00 ZMW", foreignUnder3T: "$15.00 USD", heavyVehicle: "$30.00 USD" },
    campingFee: "Designated wilderness camps only with DNPW authorization",
    description: "Exclusive wild sanctuary featuring Zambia's only population of Black Rhinos, managed with Frankfurt Zoological Society. Pure foot safaris in untouched wilderness.",
    includedBenefits: [
      "Walking safari access along Mwaleshi River with armed scouts",
      "Conservation contribution to the North Luangwa Rhino Project"
    ],
    rulesAndRegulations: [
      "Access strictly regulated; unguided self-drive into Rhino core zone is not permitted.",
      "All walking safaris require accredited DNPW armed guide."
    ]
  },
  {
    id: "kasanka-bat-migration-pass",
    name: "Kasanka National Park & Fruit Bat Migration Pass",
    parkName: "Kasanka National Park",
    categoryTier: "Category B",
    authority: "Kasanka Trust / DNPW Zambia",
    category: "Park",
    province: "Central Province",
    region: "Central & Serenje",
    feeCitizenZmw: 44.80,
    feeSadcUsd: 15,
    feeInternationalUsd: 20,
    feeSelfDriveUsd: 20,
    feeZmw: 560,
    validityDays: 1,
    gateHours: "06:00 – 18:00 (Bat viewing platform access: 17:30 – 19:00 & 05:00 – 06:30)",
    facilities: [
      "Wasa Lodge & Luwombwa River Fishing Lodge",
      "Fibwe Bat Canopy Tree Platforms (highest public tree hides in Africa)",
      "Luwombwa River canoe launches and sitatunga marsh hides",
      "Pontoon campsite and visitor education center"
    ],
    vehicleFees: { localUnder3T: "K34.00 ZMW", foreignUnder3T: "$15.00 USD", heavyVehicle: "$30.00 USD" },
    campingFee: "K42.00 ZMW (Citizen) / $15.00 USD (Intl) per night",
    description: "Home to the world's largest mammal migration (October – December), when 10 million straw-colored fruit bats descend on Kasanka's swamp forest.",
    includedBenefits: [
      "Access to Fibwe tree platform bat viewing slots (Oct – Dec)",
      "Luwombwa river canoe trails and Sitatunga marsh hides",
      "Conservation support to Kasanka Community Trusts"
    ],
    rulesAndRegulations: [
      "Silence must be maintained on canopy tree platforms.",
      "Red light torch filters must be used during twilight bat flights."
    ]
  },
  {
    id: "liuwa-plain-wildebeest-pass",
    name: "Liuwa Plain National Park & Wildebeest Migration Pass",
    parkName: "Liuwa Plain National Park",
    categoryTier: "Category B",
    authority: "African Parks / DNPW / Barotse Royal Establishment",
    category: "Park",
    province: "Western Province",
    region: "Western & Barotseland",
    feeCitizenZmw: 44.80,
    feeSadcUsd: 15,
    feeInternationalUsd: 20,
    feeSelfDriveUsd: 20,
    feeZmw: 560,
    validityDays: 1,
    gateHours: "06:00 – 18:00 Daily",
    facilities: [
      "King Lewanika Luxury Lodge (Time + Tide)",
      "African Parks Kalabo Operations Headquarters",
      "Community campsites (Lyangu, Katoyana, Sikale)",
      "Kalabo airstrip transfers and Luanginga river pontoon ferry"
    ],
    vehicleFees: { localUnder3T: "K34.00 ZMW", foreignUnder3T: "$15.00 USD", heavyVehicle: "$30.00 USD" },
    campingFee: "K42.00 ZMW (Citizen) / $15.00 USD (Intl) per night",
    description: "Host to Africa's second-largest wildebeest migration (over 30,000 wildebeest), thriving hyena clans, cheetah, and the historic legacy of Lady Liuwa.",
    includedBenefits: [
      "Migration tracking access across open grassy plains",
      "Luanginga pontoon ferry river clearance at Kalabo",
      "African Parks conservation fee contribution"
    ],
    rulesAndRegulations: [
      "4x4 vehicles with high clearance and GPS navigation are mandatory.",
      "Carry spare fuel and water; facilities across the plain are remote."
    ]
  },
  {
    id: "nsumbu-lake-tanganyika-pass",
    name: "Nsumbu National Park & Lake Tanganyika Marine Pass",
    parkName: "Nsumbu National Park",
    categoryTier: "Category B",
    authority: "Department of National Parks & Wildlife (DNPW / FZS)",
    category: "Marine",
    province: "Northern Province",
    region: "Northern & Lake Tanganyika",
    feeCitizenZmw: 44.80,
    feeSadcUsd: 15,
    feeInternationalUsd: 20,
    feeSelfDriveUsd: 20,
    feeZmw: 560,
    validityDays: 1,
    gateHours: "06:00 – 18:00 Daily",
    facilities: [
      "Ndole Bay Resort (diving center, boat charters & private beach)",
      "Nkamba Bay Lodge in Nsumbu Bay",
      "Lake Tanganyika scuba diving, snorkeling, and boat cruise jetties",
      "Kasaba Bay historical airstrip and park ranger post"
    ],
    vehicleFees: { localUnder3T: "K34.00 ZMW", foreignUnder3T: "$15.00 USD", heavyVehicle: "$30.00 USD" },
    campingFee: "K42.00 ZMW (Citizen) / $15.00 USD (Intl) per night",
    description: "Where African wildlife meets pristine freshwater beaches. Elephant herds roam along sandy shores, and crystal-clear waters house 250+ endemic cichlid fish species.",
    includedBenefits: [
      "Lake Tanganyika national park shoreline access",
      "Snorkeling and beach game viewing clearance",
      "Ndole Bay boat launch registration"
    ],
    rulesAndRegulations: [
      "Do not disturb endemic fish sanctuaries in shallow bays.",
      "Observe designated swimming areas free from hippos and crocodiles."
    ]
  }
];

export const PNG_PERMIT_TYPES: PermitType[] = ZAMBIA_PERMIT_TYPES;
export const ALL_PERMIT_TYPES: PermitType[] = ZAMBIA_PERMIT_TYPES;

export function createPermit(
  permitTypeId: string,
  holderName: string,
  passportOrId: string,
  visitorTier: "Citizen" | "SADC Resident" | "International" | "Self-Drive" = "International",
  countryOfOrigin: string = "Zambia",
  startDate: string = new Date().toISOString().slice(0, 10),
  currency: string = "ZMW"
): IssuedPermit {
  const permitType = ZAMBIA_PERMIT_TYPES.find(p => p.id === permitTypeId) || ZAMBIA_PERMIT_TYPES[0];
  const start = new Date(startDate);
  const expiry = new Date(start);
  expiry.setDate(start.getDate() + (permitType.validityDays || 1));

  let calculatedFee = permitType.feeZmw;
  if (visitorTier === "Citizen") {
    calculatedFee = permitType.feeCitizenZmw;
  } else if (visitorTier === "SADC Resident") {
    calculatedFee = permitType.feeSadcUsd * 28; // Standard conversion rate
  } else if (visitorTier === "Self-Drive") {
    calculatedFee = permitType.feeSelfDriveUsd * 28;
  } else {
    calculatedFee = permitType.feeInternationalUsd * 28;
  }

  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const reference = `ZAM-DNPW-${new Date().getFullYear()}-${randomNum}`;
  const validationQrToken = `ZAMROAM-DNPW-VERIFIED|${reference}|${holderName}|${permitType.parkName}|${visitorTier}|VALID:${startDate}TO${expiry.toISOString().slice(0,10)}`;
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
    feePaidZmw: calculatedFee,
    feePaidPgk: calculatedFee,
    currencyPaid: currency || "ZMW",
    issuedAt: new Date().toISOString(),
    status: "active",
    validationQrToken,
    offlineVerificationHash
  };
}

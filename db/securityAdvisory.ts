export interface EmergencyContact {
  name: string;
  category: "police" | "medical" | "diplomatic" | "tourism" | "rescue";
  phone: string;
  altPhone?: string;
  location: string;
  notes: string;
}

export interface RegionalSafetyAdvisory {
  regionId: string;
  regionName: string;
  provinces: string[];
  advisoryLevel: "exercise_normal_caution" | "exercise_high_caution" | "reconsider_travel_isolated_areas";
  summary: string;
  keySafetyTips: string[];
  recommendedTransport: string;
  nightTravelAdvised: boolean;
  localGuideRequired: boolean;
}

export interface TravelSafetyGuideline {
  id: string;
  title: string;
  category: "urban" | "highlands" | "wilderness" | "cultural" | "health";
  icon: string;
  summary: string;
  protocols: string[];
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: "St. John Ambulance PNG (National Emergency Dispatch)",
    category: "medical",
    phone: "111",
    altPhone: "+675 7111 1234",
    location: "National (Port Moresby, Lae, Kokopo, Mt Hagen)",
    notes: "24/7 National medical emergency ambulance service and paramedic response."
  },
  {
    name: "Royal PNG Constabulary (Police Emergency Hotline)",
    category: "police",
    phone: "112",
    altPhone: "+675 324 4331",
    location: "National HQ - Konedobu, Port Moresby",
    notes: "National police emergency dispatch."
  },
  {
    name: "Pacific International Hospital (PIH Emergency & Medevac)",
    category: "medical",
    phone: "+675 7998 8000",
    altPhone: "+675 304 2000",
    location: "3 Mile, Port Moresby (Private Trauma Centre)",
    notes: "Full trauma care, ICU, hyperbaric decompression chamber coordination, and domestic medevac."
  },
  {
    name: "PNG Tourism Promotion Authority (Visitor Safety Unit)",
    category: "tourism",
    phone: "+675 321 4188",
    altPhone: "+675 7091 2345",
    location: "PNCB Building, Port Moresby",
    notes: "Official tourist assistance, registered operator validation, and regional liaison."
  },
  {
    name: "Kokoda Track Authority (KTA Ranger Dispatch)",
    category: "rescue",
    phone: "+675 323 1500",
    altPhone: "+675 7373 4400",
    location: "Port Moresby / Kokoda Track",
    notes: "Trekker search and rescue coordination along the Owen Stanley Range."
  },
  {
    name: "Australian High Commission Consular Emergency",
    category: "diplomatic",
    phone: "+675 325 9333",
    altPhone: "+61 2 6261 3305",
    location: "Godwit Road, Waigani, Port Moresby",
    notes: "24/7 Consular emergency assistance for international travelers."
  },
  {
    name: "United States Embassy Consular Section",
    category: "diplomatic",
    phone: "+675 308 2100",
    location: "Harbour City, Port Moresby",
    notes: "Citizen services and emergency assistance."
  }
];

export const REGIONAL_ADVISORIES: RegionalSafetyAdvisory[] = [
  {
    regionId: "coastal-islands",
    regionName: "Islands & Milne Bay Coastal Waters",
    provinces: ["Milne Bay", "East New Britain", "West New Britain", "New Ireland", "Manus", "Bougainville"],
    advisoryLevel: "exercise_normal_caution",
    summary: "Generally very peaceful and welcoming for international tourists. Excellent for diving, cultural festivals, island hopping, and volcanic exploration.",
    keySafetyTips: [
      "Use registered dive boats with VHF marine radio and life jackets.",
      "Check tidal currents and seasonal trade winds (Laurabada vs Taleo) before sea crossings.",
      "Observe local marine clan 'Tambo' reef protected zones."
    ],
    recommendedTransport: "Scheduled commercial flights (Air Niugini / PNG Air) and registered resort water taxis.",
    nightTravelAdvised: true,
    localGuideRequired: false
  },
  {
    regionId: "port-moresby",
    regionName: "National Capital District (Port Moresby)",
    provinces: ["National Capital District", "Central"],
    advisoryLevel: "exercise_high_caution",
    summary: "The primary international gateway. Enjoyable when sticking to reputable hotel transfers, organized city tours (National Museum, Port Moresby Nature Park, Varirata), and daylight hours.",
    keySafetyTips: [
      "Arrange hotel airport transfers or registered private driver services ahead of arrival.",
      "Avoid walking around public streets unaccompanied after dark.",
      "Keep valuables, passports, and large cash out of plain sight in crowded markets.",
      "Use modern shopping and dining precincts (Harbour City, Waterfront, Vision City, Stanley/Airways)."
    ],
    recommendedTransport: "Hotel shuttles, pre-arranged tour company vans, or reputable private chauffeur.",
    nightTravelAdvised: false,
    localGuideRequired: true
  },
  {
    regionId: "highlands-valleys",
    regionName: "Highlands Region (Goroka, Hagen, Simbu)",
    provinces: ["Eastern Highlands", "Western Highlands", "Simbu", "Jiwaka", "Southern Highlands", "Enga", "Hela"],
    advisoryLevel: "exercise_high_caution",
    summary: "Breathtaking mountain landscapes, rich tribal sing-sing festivals, and world-class birdwatching. Inter-tribal disputes occasionally flare up in remote rural pockets but do not target tourists.",
    keySafetyTips: [
      "Always travel with a reputable local guide who understands clan relationships and customary protocols.",
      "Check road condition reports before driving the Highlands Highway between Goroka and Mt Hagen.",
      "Attend major cultural shows (Goroka Show, Hagen Show) through official tour operators with reserved grandstand/tribal area passes.",
      "Dress conservatively in rural villages as a sign of respect."
    ],
    recommendedTransport: "Fly between regional airports (Goroka, Mt Hagen) and use 4WD vehicles arranged by your lodge/tour operator.",
    nightTravelAdvised: false,
    localGuideRequired: true
  },
  {
    regionId: "remote-wilderness",
    regionName: "Sepik River & Remote Wilderness Trails",
    provinces: ["East Sepik", "West Sepik", "Oro (Northern)", "Gulf", "Western"],
    advisoryLevel: "exercise_high_caution",
    summary: "Incredible untamed expeditions into the Amazon of the Pacific and historic Kokoda Trail. Demanding logistics require licensed wilderness guides and satellite communications.",
    keySafetyTips: [
      "Carry satellite communicators (Garmin inReach / Iridium) and full comprehensive medevac insurance.",
      "Only trek Kokoda with a licensed Kokoda Track Authority (KTA) registered operator with porters and wilderness first aiders.",
      "Drink purified or boiled water exclusively; carry tropical electrolyte packs.",
      "Follow village chief protocol upon arrival at new river settlements."
    ],
    recommendedTransport: "Motorized dugout canoes with experienced river skippers; chartered bush flights (MAF / Tropicair).",
    nightTravelAdvised: false,
    localGuideRequired: true
  }
];

export const SAFETY_GUIDELINES: TravelSafetyGuideline[] = [
  {
    id: "guide-verified",
    title: "Travel with Certified Wantok Guides",
    category: "cultural",
    icon: "🤝",
    summary: "PNG is built on clan relationships. A respected local guide bridges communication and ensures warm village hospitality everywhere you go.",
    protocols: [
      "Book stays and tours through verified operators on Visit PNG or official TPA members.",
      "Your guide acts as your clan liaison and handles village greeting protocols (Toktok bilong ples).",
      "Tip porters and guides fairly for their invaluable dedication and local knowledge."
    ]
  },
  {
    id: "cash-communications",
    title: "Currency & Offline Connectivity",
    category: "urban",
    icon: "💳",
    summary: "Outside major urban centres (Port Moresby, Lae), cash in local Kina (PGK) is essential. Electronic POS is limited in highland and river villages.",
    protocols: [
      "Withdraw cash in Port Moresby ATMs before flying into regional airstrips.",
      "Carry small denominations (K5, K10, K20 notes) for village markets, bilum handicrafts, and fresh fruit.",
      "Pick up a local Digicel or Telikom 4G SIM at Jackson's Airport for reliable regional coverage.",
      "Download your Visit PNG trail maps, permits, and itineraries for 100% offline access."
    ]
  },
  {
    id: "health-tropical",
    title: "Health & Tropical Wellness",
    category: "health",
    icon: "🩺",
    summary: "PNG offers pure mountain air and pristine rainforests. Simple health precautions ensure your trip remains unforgettable and worry-free.",
    protocols: [
      "Take recommended malaria prophylaxis (Malarone or Doxycycline) as advised by your travel doctor.",
      "Use DEET/Picaridin insect repellent, especially at dusk in coastal and river regions.",
      "Always travel with comprehensive medical evacuation (Medevac) travel insurance covering remote repatriation.",
      "Drink bottled, filtered, or boiled water in rural areas; stay well hydrated during tropical treks."
    ]
  },
  {
    id: "customary-respect",
    title: "Customary Land & Sacred Protocols",
    category: "cultural",
    icon: "🌿",
    summary: "97% of Papua New Guinea is customary clan-owned land. Showing respect for traditional laws creates deep friendships with local communities.",
    protocols: [
      "Always ask permission before photographing individuals, particularly elders, women, and sacred ceremonial artifacts.",
      "Respect 'Tambo' signs (such as crossed leaves across paths) designating restricted or sacred clan grounds.",
      "Wear modest clothing (covering shoulders and knees) when walking through traditional villages.",
      "Gently decline offers of betel nut (buai) if you prefer not to partake; a polite 'Nogat, tenkyu tru' is always appreciated."
    ]
  }
];

export const ZAMBIA_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: "Zambia Police National Emergency Dispatch",
    category: "police",
    phone: "999",
    altPhone: "+260 211 228950",
    location: "National HQ - Lusaka / All 10 Provinces",
    notes: "24/7 Police emergency response and tourism security hotline."
  },
  {
    name: "National Emergency Ambulance & Medical Evacuation",
    category: "medical",
    phone: "991",
    altPhone: "+260 211 253000",
    location: "University Teaching Hospital (UTH) Lusaka / Provincial Hospitals",
    notes: "24/7 Emergency medical response and trauma services."
  },
  {
    name: "Livingstone Tourism Police Unit",
    category: "police",
    phone: "+260 213 320115",
    altPhone: "+260 977 123456",
    location: "Livingstone / Victoria Falls Tourism Corridor",
    notes: "Dedicated tourist security and assistance squad for Victoria Falls visitors."
  },
  {
    name: "Zambia Tourism Agency (Visitor Assistance & Info)",
    category: "tourism",
    phone: "+260 211 229087",
    altPhone: "+260 211 229090",
    location: "Abacus Square, Thabo Mbeki Road, Lusaka",
    notes: "Official visitor support, verified lodge directory, and complaints registry."
  },
  {
    name: "Specialty Emergency Services (SES Zambia Medevac)",
    category: "medical",
    phone: "+260 962 740300",
    altPhone: "+260 211 262333",
    location: "Kafue Road, Lusaka (Private Air Ambulance & Medevac)",
    notes: "Air ambulance evacuation from South Luangwa, Lower Zambezi, and Kafue."
  }
];

export const ZAMBIA_REGIONAL_ADVISORIES: RegionalSafetyAdvisory[] = [
  {
    regionId: "southern-lusaka",
    regionName: "Southern & Lusaka Province",
    provinces: ["Southern Province", "Lusaka Province"],
    advisoryLevel: "exercise_normal_caution",
    summary: "One of Africa's safest, most peaceful tourism corridors. Livingstone, Victoria Falls, and Lusaka offer modern infrastructure, paved highways, and secure international resorts.",
    keySafetyTips: [
      "Keep vehicle windows up when driving through Baboon-heavy stretches near Victoria Falls Bridge.",
      "Use metered taxis or licensed ride apps when moving around Lusaka at night.",
      "Ensure life vests are worn during all Zambezi River boating and rafting excursions."
    ],
    recommendedTransport: "Paved Highways, Transfer Shuttles & Domestic Flights (LUN/LVI)",
    nightTravelAdvised: true,
    localGuideRequired: false
  },
  {
    regionId: "central-eastern",
    regionName: "Central & Eastern Province (South Luangwa)",
    provinces: ["Eastern Province", "Central Province"],
    advisoryLevel: "exercise_normal_caution",
    summary: "Premier wildlife safari territory. South Luangwa operates under strict professional guiding standards with armed scouts ensuring exceptional visitor safety.",
    keySafetyTips: [
      "Never walk outside safari lodges or unfenced camps after dark without a guide or night watchman.",
      "Store all fruit and snacks securely inside chalet cupboards to deter elephants.",
      "Stay hydrated during hot October 'suicide month' walking safaris."
    ],
    recommendedTransport: "Scheduled Safaris Flights (Proflight to Mfuwe) & 4x4 Game Vehicles",
    nightTravelAdvised: false,
    localGuideRequired: true
  },
  {
    regionId: "western-northwestern",
    regionName: "Western & North-Western Province",
    provinces: ["Western Province", "North-Western Province"],
    advisoryLevel: "exercise_normal_caution",
    summary: "Wilderness rivers, floodplains, and rich cultural traditions. Mongu, Liuwa Plain, and Zambezi source require 4x4 vehicles during rainy seasons.",
    keySafetyTips: [
      "Carry satellite phone or GPS tracking when crossing remote Liuwa Plain wilderness.",
      "Check Barotse floodplain water levels before travelling by vehicle during April Kuomboka.",
      "Engage certified local community guides for Zambezi river navigation."
    ],
    recommendedTransport: "4x4 Safari Vehicles, Charter Flights & River Boats",
    nightTravelAdvised: false,
    localGuideRequired: true
  },
  {
    regionId: "northern-luapula",
    regionName: "Northern, Luapula & Muchinga Province",
    provinces: ["Northern Province", "Luapula Province", "Muchinga Province"],
    advisoryLevel: "exercise_normal_caution",
    summary: "Pristine waterfall country, Lake Tanganyika sandy beaches, and Bangweulu wetlands. Exceptionally peaceful and welcoming rural communities.",
    keySafetyTips: [
      "Exercise standard water safety when swimming in Lake Tanganyika (bilharzia-free in deep water).",
      "Stay on designated trail railings around Kalambo Falls sheer cliffs.",
      "Support local community shoebill conservation scouts in Bangweulu."
    ],
    recommendedTransport: "Paved Highways (Great North Road) & Safari Boats",
    nightTravelAdvised: true,
    localGuideRequired: false
  }
];

export const ZAMBIA_SAFETY_GUIDELINES: TravelSafetyGuideline[] = [
  {
    id: "wildlife-encounters",
    title: "Wildlife & Safari Safety Etiquette",
    category: "wilderness",
    icon: "🐘",
    summary: "Zambia's wildlife is wild and free-roaming. Respecting animal body language ensures exhilarating and safe encounters.",
    protocols: [
      "Always follow the instructions of your licensed professional walking safari guide and armed DNPW wildlife scout.",
      "Maintain quiet voices during game drives and do not stand up in open vehicles when close to big cats.",
      "Keep a safe distance (minimum 25m) from elephants and hippos at all times.",
      "Never swim in rivers or dams outside designated resort pools due to crocodiles and hippos."
    ]
  },
  {
    id: "health-wellness-zambia",
    title: "Health & Tropical Wellness in Zambia",
    category: "health",
    icon: "🩺",
    summary: "Zambia's high-altitude plateau enjoys pleasant weather. Standard travel vaccinations and malaria precautions ensure a healthy safari.",
    protocols: [
      "Take recommended malaria prophylaxis when travelling through river valleys (Luangwa and Zambezi).",
      "Drink bottled or filtered water; lodges provide complimentary purified drinking water.",
      "Pack high-SPF sunscreen, sun hat, and neutral/khaki colored clothing for walking safaris.",
      "Carry comprehensive travel insurance with medevac coverage for bush flights."
    ]
  }
];


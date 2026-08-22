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

export const ZAMBIA_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: "National Emergency Ambulance Dispatch (Zambia)",
    category: "medical",
    phone: "991",
    altPhone: "+260 211 252622",
    location: "National (Lusaka, Ndola, Livingstone, Kitwe, Chipata)",
    notes: "24/7 National Ministry of Health emergency ambulance dispatch."
  },
  {
    name: "Zambia Police Service Emergency Operations Control",
    category: "police",
    phone: "999",
    altPhone: "+260 211 254280",
    location: "National Police HQ - Lusaka",
    notes: "National police response and highway patrol dispatch."
  },
  {
    name: "Specialty Emergency Services (SES Zambia Medevac)",
    category: "medical",
    phone: "+260 962 740300",
    altPhone: "+260 762 740300",
    location: "Lusaka & Countrywide Aero-Medical Helicopter & Fixed Wing Dispatch",
    notes: "Premier private 24/7 bush medevac and trauma air evacuation service across all Zambian national parks."
  },
  {
    name: "Zambia Tourism Agency (ZTA Visitor Assistance Desk)",
    category: "tourism",
    phone: "+260 211 229087",
    altPhone: "+260 573 506 598",
    location: "ZTA Head Office, Petroda House, Great East Road, Lusaka",
    notes: "Official tourist support bureau for travel verification, park access guidance, and operator licensing inquiries."
  },
  {
    name: "Department of National Parks & Wildlife (DNPW Ranger HQ)",
    category: "rescue",
    phone: "+260 211 278524",
    altPhone: "+260 977 788901",
    location: "Chilanga Central Command & Park Field Stations",
    notes: "Park safety, anti-poaching patrol dispatch, and wilderness tracking assistance across all 20 National Parks."
  },
  {
    name: "Livingstone Central Hospital (Victoria Falls Trauma Unit)",
    category: "medical",
    phone: "+260 213 321200",
    location: "Akapelwa Street, Livingstone",
    notes: "Full tertiary trauma center, rapid response, and cross-border medical stabilization for Victoria Falls visitors."
  },
  {
    name: "Zambia Fire and Rescue Service",
    category: "rescue",
    phone: "993",
    location: "National Municipal Fire Brigades",
    notes: "Emergency fire response and structural rescue."
  }
];

export const ZAMBIA_REGIONAL_ADVISORIES: RegionalSafetyAdvisory[] = [
  {
    regionId: "southern-livingstone-kariba",
    regionName: "Victoria Falls, Livingstone & Lake Kariba",
    provinces: ["Southern Province"],
    advisoryLevel: "exercise_normal_caution",
    summary: "One of Africa's safest and most welcoming tourism gateways. World-class safari lodges, professional helicopter operations, and well-lit resort corridors.",
    keySafetyTips: [
      "Follow licensed guides on Knife-Edge Bridge trails during high water flow spray.",
      "Do not feed wild baboons or monkeys around Victoria Falls rainforest paths.",
      "Wear certified lifejackets during white-water rafting or Zambezi boat cruises.",
      "Use authorized hotel taxis or registered ride-hail operators when traveling at night in Livingstone."
    ],
    recommendedTransport: "Scheduled airport transfers, lodge shuttles, licensed taxis, and Zambezi river cruisers.",
    nightTravelAdvised: true,
    localGuideRequired: false
  },
  {
    regionId: "eastern-luangwa-valley",
    regionName: "South Luangwa & Lower Zambezi Valley",
    provinces: ["Eastern Province", "Lusaka Province"],
    advisoryLevel: "exercise_normal_caution",
    summary: "Pristine wilderness with the highest concentration of leopards in Africa. Walking safaris are strictly guided by armed DNPW wildlife scouts.",
    keySafetyTips: [
      "Never walk outside safari camp chalets after dark without an armed night escort.",
      "Maintain a safe distance from elephant corridors and riverbanks populated by hippos and crocodiles.",
      "Take prescribed malaria prophylaxis (Malarone/Doxycycline) before visiting the river valleys.",
      "Carry ample drinking water and electrolyte tablets during morning walking safaris."
    ],
    recommendedTransport: "Open 4x4 safari vehicles, guided river canoes, and scheduled bush flights into Mfuwe (MFU) / Jeki (JEK).",
    nightTravelAdvised: false,
    localGuideRequired: true
  },
  {
    regionId: "central-lusaka-kafue",
    regionName: "Lusaka Capital & Kafue National Park",
    provinces: ["Lusaka Province", "Central Province"],
    advisoryLevel: "exercise_normal_caution",
    summary: "Modern cosmopolitan capital and vast wilderness plains. Excellent communications, private healthcare, and secure residential/commercial zones.",
    keySafetyTips: [
      "Use reputable private taxis or hotel shuttles when visiting Lusaka city nightlife hubs.",
      "Keep vehicle doors locked and valuables concealed when driving through crowded downtown intersections.",
      "In Kafue National Park, carry a satellite communicator or GPS navigation kit for remote tracks in Busanga Plains.",
      "Observe 40 km/h speed limits inside national park boundaries."
    ],
    recommendedTransport: "Chauffeured car rental, 4x4 overland vehicles, and domestic scheduled flights from KKIA (LUN).",
    nightTravelAdvised: true,
    localGuideRequired: false
  },
  {
    regionId: "northern-lakes-waterfalls",
    regionName: "Lake Tanganyika, Bangweulu & Luapula Waterfalls",
    provinces: ["Northern Province", "Luapula Province", "Muchinga Province"],
    advisoryLevel: "exercise_normal_caution",
    summary: "Off-the-beaten-track adventure frontier with crystal-clear rift valley waters, peaceful fishing villages, and sacred waterfalls.",
    keySafetyTips: [
      "Swim only in designated bilharzia-free zones such as deep open waters of Lake Tanganyika (Ndole Bay).",
      "Engage local community guides when visiting sacred cultural waterfalls like Chishimba and Lumangwe.",
      "Carry sufficient cash (ZMW) for park entry fees in remote rural districts where POS terminals may have intermittent mobile network.",
      "Check 4x4 road conditions during the green rainy season (December to March)."
    ],
    recommendedTransport: "High-clearance 4x4 vehicle with dual spare wheels, lake ferries, or charter flights to Kasama / Mansa.",
    nightTravelAdvised: false,
    localGuideRequired: true
  }
];

export const ZAMBIA_SAFETY_GUIDELINES: TravelSafetyGuideline[] = [
  {
    id: "zambia-safari-etiquette",
    title: "Walking Safari & Wildlife Protocols",
    category: "wilderness",
    icon: "🦁",
    summary: "Essential wildlife safety rules for walking safaris and open game drives in South Luangwa, Kafue, and Lower Zambezi.",
    protocols: [
      "Always walk in single file behind your armed DNPW wildlife scout and professional naturalist guide.",
      "Never run from a wild animal; stop, stay calm, and follow your guide's instructions immediately.",
      "Wear neutral safari colors (khaki, olive green, brown, tan). Avoid bright neon colors and dark blue/black (which attracts tsetse flies).",
      "Never stand up or hang limbs outside open 4x4 safari vehicles while in the vicinity of big cats or elephants.",
      "Do not swim in rivers or lagoons unless explicitly permitted by your lodge guide."
    ]
  },
  {
    id: "zambia-health-prevention",
    title: "Health, Water & Malaria Prevention",
    category: "health",
    icon: "💊",
    summary: "Medical precautions for a comfortable, healthy journey across Zambia's tropical climates.",
    protocols: [
      "Malaria is endemic in low-altitude valleys (Luangwa, Zambezi, Kariba); start prophylaxis prior to arrival.",
      "Sleep under treated mosquito nets and apply DEET or Picaridin repellent from sunset onwards.",
      "Drink bottled or UV-filtered water provided by certified lodges; avoid untreated tap water in rural zones.",
      "Carry a comprehensive personal medical kit including antihistamines, rehydration salts, and broad-spectrum antibiotics."
    ]
  },
  {
    id: "zambia-cultural-respect",
    title: "Traditional Ceremony & Community Etiquette",
    category: "cultural",
    icon: "👑",
    summary: "Respectful customs when attending traditional ceremonies and visiting rural royal palaces.",
    protocols: [
      "Dress modestly (covered knees and shoulders) when entering royal palaces, chiefdom courts, and church services.",
      "Always greet village elders with a respectful slight bow or traditional clapping where customary.",
      "Ask permission before photographing residents, ceremonial dancers, or sacred shrine groves.",
      "When shopping for authentic handicrafts in cultural markets, negotiate with warmth and mutual respect."
    ]
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = ZAMBIA_EMERGENCY_CONTACTS;
export const REGIONAL_ADVISORIES: RegionalSafetyAdvisory[] = ZAMBIA_REGIONAL_ADVISORIES;
export const SAFETY_GUIDELINES: TravelSafetyGuideline[] = ZAMBIA_SAFETY_GUIDELINES;

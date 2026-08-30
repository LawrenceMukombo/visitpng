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

export const PNG_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: "St John Ambulance Papua New Guinea (National Dispatch)",
    category: "medical",
    phone: "111",
    altPhone: "+675 7111 1234",
    location: "National Emergency Operations Centre (Port Moresby, Lae, Kokopo, Kundiawa)",
    notes: "24/7 National emergency paramedic and ambulance dispatch across Papua New Guinea."
  },
  {
    name: "Royal Papua New Guinea Constabulary (RPNGC Police Emergency)",
    category: "police",
    phone: "112",
    altPhone: "1800 100",
    location: "National Police HQ, Konedobu, Port Moresby",
    notes: "National police emergency toll-free hotline and provincial commander dispatch."
  },
  {
    name: "Pacific International Hospital (PIH 24/7 Trauma & Emergency)",
    category: "medical",
    phone: "+675 7998 8000",
    altPhone: "+675 304 0000",
    location: "3 Mile, Taurama Road, Port Moresby",
    notes: "Premier private tertiary trauma hospital with 24/7 emergency medicine, CT/MRI, surgery, and hyperbaric medicine support."
  },
  {
    name: "Tropicair PNG Aero-Medical Evacuation & Air Charter",
    category: "rescue",
    phone: "+675 311 2800",
    altPhone: "+675 7090 9200",
    location: "Jacksons International Airport, Port Moresby (Nationwide Dispatch)",
    notes: "24/7 fixed-wing air ambulance and medevac aircraft equipped with intensive care life support for emergency airstrip evacuations."
  },
  {
    name: "Papua New Guinea Tourism Promotion Authority (PNGTPA Visitor Desk)",
    category: "tourism",
    phone: "+675 321 4188",
    altPhone: "+675 321 4187",
    location: "Level 5, Pacific MMI Building, Champion Parade, Port Moresby",
    notes: "Official national tourism authority for travel verification, safety advisories, and accredited operator directory assistance."
  },
  {
    name: "Kokoda Track Authority (KTA Ranger Operations Command)",
    category: "rescue",
    phone: "+675 323 1244",
    altPhone: "+675 7235 4800",
    location: "Kokoda Ranger HQ & Field Radio Network (Owers' Corner / Kokoda Station)",
    notes: "Search, rescue, emergency radio dispatch, and trekker tracking along the 96km Kokoda Track corridor."
  },
  {
    name: "Papua New Guinea Fire and Rescue Service",
    category: "rescue",
    phone: "110",
    altPhone: "+675 325 5088",
    location: "National Fire Service HQ & Provincial Brigades",
    notes: "National structural fire response and vehicle rescue operations."
  }
];

export const PNG_REGIONAL_ADVISORIES: RegionalSafetyAdvisory[] = [
  {
    regionId: "islands-region",
    regionName: "Islands Region (New Britain, New Ireland, Milne Bay, Manus, Bougainville)",
    provinces: ["East New Britain", "West New Britain", "New Ireland", "Milne Bay", "Manus", "Bougainville"],
    advisoryLevel: "exercise_normal_caution",
    summary: "One of the most tranquil and welcoming tourism regions in the Pacific. Renowned for pristine scuba diving, world-class resort hospitality in Walindi & Tawali, friendly island villages, and historic wartime relics.",
    keySafetyTips: [
      "Follow certified divemasters and boat captains when exploring outer coral atolls.",
      "Check volcano advisory levels before hiking near Mount Tavurvur in Rabaul.",
      "Respect local marine protected areas (tabu reefs) marked by village elders.",
      "Enjoy island village homestays with warmth and mutual respect."
    ],
    recommendedTransport: "Scheduled Air Niugini / PNG Air domestic flights and registered resort water taxis.",
    nightTravelAdvised: true,
    localGuideRequired: false
  },
  {
    regionId: "southern-region",
    regionName: "Southern (Papua) Region & Kokoda Corridor",
    provinces: ["National Capital District", "Central", "Oro (Northern)", "Western", "Gulf"],
    advisoryLevel: "exercise_normal_caution",
    summary: "Home to the nation's capital Port Moresby, the historic Kokoda Track, and Tufi Fjords. Major hotels (Airways, The Stanley, Loloata) provide world-class security and airport transfers.",
    keySafetyTips: [
      "Use hotel shuttles or registered taxis when moving around Port Moresby at night.",
      "Trek Kokoda only with a Kokoda Track Authority (KTA) accredited tour operator.",
      "Keep digital and printed copies of your passport and KTA permit.",
      "Enjoy the Ela Beach boardwalk and Nature Park during daylight hours."
    ],
    recommendedTransport: "Pre-arranged hotel transfers, accredited tour 4x4s, and licensed domestic aviation.",
    nightTravelAdvised: false,
    localGuideRequired: true
  },
  {
    regionId: "highlands-region",
    regionName: "Highlands Region (Eastern Highlands, Western Highlands, Simbu, Enga, Hela)",
    provinces: ["Eastern Highlands", "Western Highlands", "Simbu", "Enga", "Hela", "Southern Highlands", "Jiwaka"],
    advisoryLevel: "exercise_high_caution",
    summary: "Spectacular mountainous wonderland featuring Mount Wilhelm (4,509m), the famous Goroka & Mount Hagen Cultural Shows, and fertile valleys. Travel with an experienced local guide or tour operator.",
    keySafetyTips: [
      "Always travel between towns during daylight hours; avoid night driving on the Highlands Highway.",
      "Hire an accredited local guide from Betty's Lodge when climbing Mount Wilhelm.",
      "Dress warmly for sub-zero alpine nights at high altitudes above 3,000m.",
      "Respect local tribal customs and heed community elder advice."
    ],
    recommendedTransport: "Private 4x4 tour vehicle with professional driver-guide; domestic flights between regional hubs.",
    nightTravelAdvised: false,
    localGuideRequired: true
  },
  {
    regionId: "momase-region",
    regionName: "Momase Region (Madang, Morobe, East Sepik, Sandaun)",
    provinces: ["Morobe", "Madang", "East Sepik", "Sandaun (West Sepik)"],
    advisoryLevel: "exercise_normal_caution",
    summary: "The northern mainland coastline offering lush rainforests, surfing at Vanimo, diving in Madang, and adventurous cultural canoe journeys along the mighty Sepik River.",
    keySafetyTips: [
      "Arrange Sepik River expeditions through established lodges (Karawari Lodge) or licensed local tour operators.",
      "Wear high-strength insect repellent (DEET/Picaridin) and sleep under treated mosquito nets along the Sepik River.",
      "Respect sacred Haus Tambaran (Spirit House) rules and request permission before entering.",
      "Take precautions against strong ocean currents when swimming or surfing along exposed coastal beaches."
    ],
    recommendedTransport: "Scheduled domestic flights, motorized river dugout canoes with lifejackets, and lodge shuttles.",
    nightTravelAdvised: false,
    localGuideRequired: true
  }
];

export const PNG_SAFETY_GUIDELINES: TravelSafetyGuideline[] = [
  {
    id: "png-wantok-etiquette",
    title: "Wantok System & Village Customs (Kastom)",
    category: "cultural",
    icon: "🤝",
    summary: "Understanding Papua New Guinea's communal kinship system (Wantok) and traditional village etiquette.",
    protocols: [
      "Always greet village elders (Hetman) upon entering rural communities with a warm handshake and 'Gude / Moning'.",
      "Ask permission before photographing residents, ceremonial sing-sing dancers, or sacred ancestral shrines (Tambu places).",
      "Respect 'Tambu' signs: these indicate sacred, protected, or taboo customary land.",
      "Support community artisans by purchasing hand-crafted Bilums, wood carvings, and shell jewelry directly from creators."
    ]
  },
  {
    id: "png-trekking-altitude",
    title: "Kokoda & Mount Wilhelm Trekking Safety",
    category: "wilderness",
    icon: "🥾",
    summary: "Essential preparation protocols for Kokoda Track expeditions and climbing Mount Wilhelm (4,509m).",
    protocols: [
      "Trek only with a registered Kokoda Track Authority (KTA) operator or accredited local guide.",
      "Break in heavy-duty trekking boots well in advance to prevent blisters in wet tropical conditions.",
      "Carry water purification tablets or a high-grade micro-filter; drink 4–5 litres of electrolytes daily.",
      "Acclimatize gradually for Mount Wilhelm summit day to prevent Acute Mountain Sickness (AMS).",
      "Ensure personal travel insurance explicitly covers high-altitude trekking and emergency helicopter evacuation."
    ]
  },
  {
    id: "png-health-prevention",
    title: "Tropical Health & Malaria Prevention",
    category: "health",
    icon: "💊",
    summary: "Health guidelines for a safe, comfortable adventure across Papua New Guinea's tropical regions.",
    protocols: [
      "Malaria and dengue are prevalent in lowland coastal and river areas; consult your doctor for prophylaxis (e.g. Doxycycline or Malarone) before arrival.",
      "Apply DEET or Picaridin mosquito repellent from dusk to dawn and sleep under treated bed nets.",
      "Drink only bottled, boiled, or UV-filtered water; avoid untreated tap water outside major luxury hotels.",
      "Carry a personalized first aid kit containing antiseptic cream, rehydration salts, blister pads, and antihistamines."
    ]
  },
  {
    id: "png-marine-safety",
    title: "Coral Reef & Marine Expeditions",
    category: "wilderness",
    icon: "🤿",
    summary: "Best practices for scuba diving and boat expeditions in Kimbe Bay, Milne Bay, and Tufi Fjords.",
    protocols: [
      "Always dive with a certified PADI/SSI operator; carry safety sausages (SMB) and dive computers.",
      "Never touch or step on living corals, sea anemones, or cone shells.",
      "Wear certified lifejackets on open boat transfers between islands and coastal fjords.",
      "Stay hydrated in tropical sun and wear rash guards for UV and jellyfish protection."
    ]
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = PNG_EMERGENCY_CONTACTS;
export const REGIONAL_ADVISORIES: RegionalSafetyAdvisory[] = PNG_REGIONAL_ADVISORIES;
export const SAFETY_GUIDELINES: TravelSafetyGuideline[] = PNG_SAFETY_GUIDELINES;

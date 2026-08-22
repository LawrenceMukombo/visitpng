export interface ItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  province: string;
  summary: string;
  activities: string[];
  recommendedStay: string;
  logisticsNotes: string;
  estimatedCostZmw: number;
  estimatedCostPgk?: number; // Backward compatibility
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  subtitle: string;
  travelStyle: "Cultural Immersion" | "Wilderness Expedition" | "Diving & Islands" | "WWII History" | "Family & Nature";
  durationDays: number;
  bestTravelMonths: string;
  totalEstimatedCostZmw: number;
  totalEstimatedCostPgk?: number; // Backward compatibility
  provincesCovered: string[];
  days: ItineraryDay[];
  essentialPackingList: string[];
  safetyAndHealthTips: string[];
}

export const ZAMBIA_CURATED_ITINERARIES: GeneratedItinerary[] = [
  {
    id: "zambia-falls-and-luangwa-safari",
    title: "Victoria Falls & South Luangwa Walking Safari Expedition",
    subtitle: "Experience the thunder of Victoria Falls, Zambezi river sunsets, and the world's premier walking safaris in the Luangwa Valley",
    travelStyle: "Wilderness Expedition",
    durationDays: 7,
    bestTravelMonths: "May to November",
    totalEstimatedCostZmw: 14500,
    totalEstimatedCostPgk: 14500,
    provincesCovered: ["Southern Province", "Lusaka Province", "Eastern Province"],
    days: [
      {
        dayNumber: 1,
        title: "Arrival in Livingstone & Victoria Falls Sunset",
        location: "Livingstone",
        province: "Southern Province",
        summary: "Arrive at Harry Mwaanga Nkumbula International Airport, transfer to your river lodge, and witness the majesty of Victoria Falls.",
        activities: ["Guided walk through Victoria Falls rainforest reserve", "Knife-Edge bridge rainbow viewing", "Zambezi Royal sunset cruise with wildlife viewing"],
        recommendedStay: "The Royal Livingstone Resort or Avani Victoria Falls",
        logisticsNotes: "Complimentary hotel shuttle from Livingstone Airport (LVI).",
        estimatedCostZmw: 2200,
        estimatedCostPgk: 2200
      },
      {
        dayNumber: 2,
        title: "Devil's Pool Livingstone Island & Batoka Gorge",
        location: "Victoria Falls",
        province: "Southern Province",
        summary: "Morning boat transfer to Livingstone Island to swim in the world-famous Devil's Pool on the edge of the falls.",
        activities: ["Livingstone Island guided tour & breakfast", "Devil's Pool natural infinity swim", "Helicopter Flight of Angels over the gorge"],
        recommendedStay: "The Royal Livingstone Resort",
        logisticsNotes: "Advance booking required for Devil's Pool seasonal water permits.",
        estimatedCostZmw: 2800,
        estimatedCostPgk: 2800
      },
      {
        dayNumber: 3,
        title: "Flight to South Luangwa (Mfuwe)",
        location: "South Luangwa National Park",
        province: "Eastern Province",
        summary: "Direct safari flight from Livingstone/Lusaka into Mfuwe Airport, the gateway to Africa's greatest wildlife valley.",
        activities: ["Proflight flight into Mfuwe Valley", "Afternoon open 4x4 game drive into the park", "Spotlight night drive searching for hunting leopards"],
        recommendedStay: "Mfuwe Lodge or Flatdogs Camp",
        logisticsNotes: "Transfer from Mfuwe Airport to lodge included (approx. 45 mins).",
        estimatedCostZmw: 2900,
        estimatedCostPgk: 2900
      },
      {
        dayNumber: 4,
        title: "Pioneer Walking Safari in Luangwa Valley",
        location: "South Luangwa National Park",
        province: "Eastern Province",
        summary: "Set off on foot at dawn with a master tracking guide and armed DNPW scout following wildlife tracks along the river sandbars.",
        activities: ["Dawn 4-hour walking safari through ebony groves", "Midday relaxation watching elephants at the lagoon", "Evening bush dinner under the African stars"],
        recommendedStay: "Chichele Presidential Lodge or Nsefu Bushcamp",
        logisticsNotes: "Wear neutral khaki/green colors; broken-in walking shoes mandatory.",
        estimatedCostZmw: 2200,
        estimatedCostPgk: 2200
      },
      {
        dayNumber: 5,
        title: "Deep Game Drives & Carmine Bee-Eater Colonies",
        location: "Nsefu Game Sector",
        province: "Eastern Province",
        summary: "Explore the remote Nsefu sector featuring high lion densities, Thornicroft's giraffes, and nesting carmine bee-eaters.",
        activities: ["All-day game drive to Pelican Lagoon", "Birding at the carmine bee-eater clay banks", "Sunset drinks overlooking the Luangwa oxbow"],
        recommendedStay: "Nsefu Bushcamp",
        logisticsNotes: "4x4 game vehicle with experienced local wildlife guide.",
        estimatedCostZmw: 2100,
        estimatedCostPgk: 2100
      },
      {
        dayNumber: 6,
        title: "Tribal Textiles & Community Village Tour",
        location: "Mfuwe Village",
        province: "Eastern Province",
        summary: "Visit Tribal Textiles workshop and the local community clinic and schools supported by tourism levies.",
        activities: ["Handmade artisan batik textile painting workshop", "Mulberry Mongoose anti-snare jewellery visit", "Farewell bush sundowner"],
        recommendedStay: "Mfuwe Lodge",
        logisticsNotes: "Support local women's cooperatives directly.",
        estimatedCostZmw: 1400,
        estimatedCostPgk: 1400
      },
      {
        dayNumber: 7,
        title: "Return Flight to Lusaka & Departure",
        location: "Lusaka",
        province: "Lusaka Province",
        summary: "Morning flight from Mfuwe to Kenneth Kaunda International Airport (LUN) for international departure.",
        activities: ["Morning game drive transfer to Mfuwe airstrip", "Arrival at Lusaka KKIA", "Duty-free Zambian coffee and crafts shopping"],
        recommendedStay: "Radisson Blu Lusaka (if overnighting)",
        logisticsNotes: "Proflight domestic flight connects directly with international departures.",
        estimatedCostZmw: 900,
        estimatedCostPgk: 900
      }
    ],
    essentialPackingList: [
      "Khaki / beige lightweight cotton shirts and trousers",
      "Sturdy walking boots with thick socks",
      "Quality binoculars (8x42 or 10x42)",
      "High SPF sunscreen and wide-brim sunhat",
      "Insect repellent (DEET/Picaridin)",
      "Camera with telephoto lens (300mm+)"
    ],
    safetyAndHealthTips: [
      "Always obey your professional walking guide and armed wildlife scout.",
      "Take recommended malaria prophylaxis when visiting river valleys.",
      "Stay hydrated during hot game drives; purified water is always provided."
    ]
  },
  {
    id: "zambia-grand-traditional-ceremonies",
    title: "Grand Zambian Royal Ceremonies & Cultural Journey",
    subtitle: "Experience the Kuomboka water pageant in Barotseland, the Nc'wala warrior dance, and the Umutomboko sword conquest",
    travelStyle: "Cultural Immersion",
    durationDays: 6,
    bestTravelMonths: "February to October",
    totalEstimatedCostZmw: 11800,
    totalEstimatedCostPgk: 11800,
    provincesCovered: ["Western Province", "Eastern Province", "Luapula Province"],
    days: [
      {
        dayNumber: 1,
        title: "Lusaka to Mongu & Barotse Royal Welcome",
        location: "Mongu & Limulunga",
        province: "Western Province",
        summary: "Fly or travel overland to the Barotseland capital of Mongu to prepare for the sacred Kuomboka royal flotilla.",
        activities: ["Nayuma Cultural Museum visit", "Lozi royal basketry artisans", "Sunset overlooking the Zambezi floodplains"],
        recommendedStay: "Country Lodge Mongu",
        logisticsNotes: "Advance royal protocol registration via Barotse Royal Establishment.",
        estimatedCostZmw: 2100,
        estimatedCostPgk: 2100
      },
      {
        dayNumber: 2,
        title: "Kuomboka Royal Flotilla & The Nalikwanda Barge",
        location: "Lealui to Limulunga",
        province: "Western Province",
        summary: "Witness King Litunga in royal regalia board the giant black-and-white Nalikwanda barge propelled by 120 royal paddlers.",
        activities: ["Kuomboka VIP viewing pavilion", "Traditional Lozi royal drumming and singing", "Highland arrival celebration at Limulunga palace"],
        recommendedStay: "Country Lodge Mongu",
        logisticsNotes: "Wear comfortable shoes and sun protection for riverbank viewing.",
        estimatedCostZmw: 2600,
        estimatedCostPgk: 2600
      },
      {
        dayNumber: 3,
        title: "Journey to Chipata for Nc'wala First-Fruits",
        location: "Chipata & Mutenguleni",
        province: "Eastern Province",
        summary: "Travel to Eastern Zambia to witness the Ngoni warriors gathering at Mtenguleni for the ancient Nc'wala celebration.",
        activities: ["Mutenguleni royal arena setup", "Ngoni impis warrior mock battles in leopard skins", "Paramount Chief Mpezeni royal procession"],
        recommendedStay: "Protea Hotel Chipata",
        logisticsNotes: "Proflight connecting flights via Lusaka to Chipata/Mfuwe.",
        estimatedCostZmw: 2400,
        estimatedCostPgk: 2400
      },
      {
        dayNumber: 4,
        title: "Nc'wala Sacred Bull Sacrifice & Warrior Singsing",
        location: "Mutenguleni Arena",
        province: "Eastern Province",
        summary: "Experience the peak of Nc'wala as Paramount Chief Mpezeni tastes the fresh first fruits and blesses the harvest.",
        activities: ["Sacred Ingoma dance competitions", "Tasting of fresh maize harvest", "Traditional craft and beadwork showcase"],
        recommendedStay: "Protea Hotel Chipata",
        logisticsNotes: "Respect local protocol regarding ceremonial photography.",
        estimatedCostZmw: 1900,
        estimatedCostPgk: 1900
      },
      {
        dayNumber: 5,
        title: "Mwansabombwe & The Umutomboko Royal Sword Dance",
        location: "Mwansabombwe",
        province: "Luapula Province",
        summary: "Visit the Luapula waterfalls kingdom to witness Mwata Kazembe perform the Mutomboko victory dance with the royal sword.",
        activities: ["Mwata Kazembe royal palace archives", "Mutomboko victory dance", "Lumangwe waterfall scenic detour"],
        recommendedStay: "Luapula River Chalets",
        logisticsNotes: "Overland 4x4 or charter flight to Mansa airstrip.",
        estimatedCostZmw: 1800,
        estimatedCostPgk: 1800
      },
      {
        dayNumber: 6,
        title: "Luapula Waterfalls & Return to Lusaka",
        location: "Samfya & Lusaka",
        province: "Luapula Province",
        summary: "Relax at the white sand beaches of Lake Bangweulu in Samfya before returning to Lusaka.",
        activities: ["Samfya white beach stroll", "Fresh bream fish lunch on the lake", "Return flight to Lusaka"],
        recommendedStay: "Lusaka Grand Hotel",
        logisticsNotes: "Connect to evening international flights.",
        estimatedCostZmw: 1000,
        estimatedCostPgk: 1000
      }
    ],
    essentialPackingList: [
      "Respectful attire for royal palace visits (covered shoulders and knees)",
      "Sun hat, sunglasses, and high SPF sunscreen",
      "Sturdy walking sandals or sneakers",
      "Camera with spare memory cards"
    ],
    safetyAndHealthTips: [
      "Follow guidance from royal ceremonial marshals at all times.",
      "Stay hydrated during outdoor ceremonies in sunny weather."
    ]
  }
];

export const CURATED_ITINERARIES: GeneratedItinerary[] = ZAMBIA_CURATED_ITINERARIES;

export function generateCustomItinerary(
  interests: string[],
  durationDays: number,
  travelStyle: string,
  fitnessLevel: string = "moderate",
  countryCode: string = "ZMB"
): GeneratedItinerary {
  const catalog = ZAMBIA_CURATED_ITINERARIES;

  const matching = catalog.find(it => 
    it.travelStyle.toLowerCase().includes(travelStyle.toLowerCase()) ||
    interests.some(int => it.title.toLowerCase().includes(int.toLowerCase()))
  ) || catalog[0];

  // Tailor duration if custom days requested
  const days: ItineraryDay[] = [];
  const count = Math.min(Math.max(3, durationDays || 7), 14);

  for (let i = 0; i < count; i++) {
    const baseDay = matching.days[i % matching.days.length];
    days.push({
      ...baseDay,
      dayNumber: i + 1,
      title: i === 0 ? baseDay.title : (i === count - 1 ? `Final Day: ${baseDay.title}` : `Day ${i + 1}: ${baseDay.title}`)
    });
  }

  const costPerDay = Math.round(matching.totalEstimatedCostZmw / matching.durationDays);

  return {
    ...matching,
    id: `custom_itinerary_${Date.now()}`,
    title: `Customized ZamRoam Zambia ${travelStyle || "Safari"} Journey`,
    subtitle: `Tailored for ${count} days based on your interests in ${interests.join(", ") || "safari & nature"} (${fitnessLevel} pace)`,
    durationDays: count,
    totalEstimatedCostZmw: costPerDay * count,
    totalEstimatedCostPgk: costPerDay * count,
    days
  };
}

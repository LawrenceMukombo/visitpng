export interface ItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  province: string;
  summary: string;
  activities: string[];
  recommendedStay: string;
  logisticsNotes: string;
  estimatedCostPgk: number;
  estimatedCostZmw?: number; // Backward compatibility
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  subtitle: string;
  travelStyle: "Cultural Immersion" | "Wilderness Expedition" | "Diving & Islands" | "WWII History" | "Family & Nature";
  durationDays: number;
  bestTravelMonths: string;
  totalEstimatedCostPgk: number;
  totalEstimatedCostZmw?: number; // Backward compatibility
  provincesCovered: string[];
  days: ItineraryDay[];
  essentialPackingList: string[];
  safetyAndHealthTips: string[];
}

export const PNG_CURATED_ITINERARIES: GeneratedItinerary[] = [
  {
    id: "png-kokoda-historic-trek",
    title: "Kokoda Track Historical Pilgrimage & Rainforest Crossing",
    subtitle: "Trek the legendary 96km Owen Stanley Range, honoring WWII history, Fuzzy Wuzzy Angel heritage, and pristine mountain villages",
    travelStyle: "Wilderness Expedition",
    durationDays: 8,
    bestTravelMonths: "April to November (Dry Season)",
    totalEstimatedCostPgk: 4200,
    totalEstimatedCostZmw: 4200,
    provincesCovered: ["National Capital District", "Central Province", "Oro (Northern) Province"],
    days: [
      {
        dayNumber: 1,
        title: "Port Moresby to Owers' Corner & Ua-Ule Creek",
        location: "Owers' Corner to Ua-Ule",
        province: "Central Province",
        summary: "Depart Port Moresby by 4x4 up the Sogeri Plateau to Owers' Corner trailhead arches, descending to Goldie River and climbing to Ua-Ule campsite.",
        activities: ["Owers' Corner Memorial Arches & 25-pounder gun briefing", "Goldie River crossing", "Ua-Ule Creek jungle camp setup"],
        recommendedStay: "Ua-Ule River Campsite",
        logisticsNotes: "Mandatory KTA trekking permit check at Owers' Corner ranger station.",
        estimatedCostPgk: 600,
        estimatedCostZmw: 600
      },
      {
        dayNumber: 2,
        title: "Ioribaiwa Ridge to Nauro Village",
        location: "Ioribaiwa to Nauro",
        province: "Central Province",
        summary: "Climb the historic Ioribaiwa Ridge, the southernmost point of the 1942 Japanese advance, before descending into the tranquil Maguli Range.",
        activities: ["Ioribaiwa defensive ridge history talk", "Ofi Creek refreshing swim and water refill", "Nauro mountain village campsite"],
        recommendedStay: "Nauro Village Guesthouse",
        logisticsNotes: "Steep ascents; stay hydrated with electrolyte tablets.",
        estimatedCostPgk: 500,
        estimatedCostZmw: 500
      },
      {
        dayNumber: 3,
        title: "Menari Village & The Ball of Gold",
        location: "Menari Village",
        province: "Central Province",
        summary: "Trek through the ancient moss forest of the Swamp and climb the ridge down into welcoming Menari village with its grassy airstrip.",
        activities: ["Menari village welcome and fresh fruit garden gifts", "Historical 39th Battalion parade ground inspection", "Koiari cultural songs around the campfire"],
        recommendedStay: "Menari Village Community Homestay",
        logisticsNotes: "Support local Koiari women's vegetable cooperative.",
        estimatedCostPgk: 450,
        estimatedCostZmw: 450
      },
      {
        dayNumber: 4,
        title: "Brigade Hill Memorial & Efogi Village",
        location: "Brigade Hill to Efogi",
        province: "Central Province",
        summary: "Scale the sacred heights of Brigade Hill (Mission Ridge) for a solemn dawn memorial service honoring fallen Australian and Papuan soldiers.",
        activities: ["Brigade Hill battlefield dawn memorial service", "Commemorative tree planting", "Descent into Efogi, the largest Koiari village along the track"],
        recommendedStay: "Efogi Community Lodge",
        logisticsNotes: "Satellite phone and emergency radio post active at Efogi airstrip.",
        estimatedCostPgk: 550,
        estimatedCostZmw: 550
      },
      {
        dayNumber: 5,
        title: "Mount Bellamy (Highest Point) to Templeton's Crossing",
        location: "Mount Bellamy & Eora Creek",
        province: "Oro (Northern) Province",
        summary: "Cross the highest point on the Kokoda Track at Mount Bellamy (2,190m) through enchanting moss-draped cloud rainforest.",
        activities: ["High-altitude moss forest photography", "Crossing the provincial border into Oro Province", "Templeton's Crossing river camp"],
        recommendedStay: "Templeton's Crossing Wilderness Hut",
        logisticsNotes: "Cool temperatures (12°C); thermal fleece required at night.",
        estimatedCostPgk: 500,
        estimatedCostZmw: 500
      },
      {
        dayNumber: 6,
        title: "Eora Creek Battlefields & Alola Village",
        location: "Eora Creek to Alola",
        province: "Oro (Northern) Province",
        summary: "Trek past historical mortar positions and weapon pits overlooking the roaring torrents of Eora Creek gorge.",
        activities: ["Eora Creek battlefield relic observation", "Alola cliffside panoramic valley view", "Local sugarcane and sweet potato (Kaukau) tasting"],
        recommendedStay: "Alola Village Guesthouse",
        logisticsNotes: "Respect all war relics; removing artifacts is strictly prohibited.",
        estimatedCostPgk: 450,
        estimatedCostZmw: 450
      },
      {
        dayNumber: 7,
        title: "Isurava Battlefield Memorial & Hoi Village",
        location: "Isurava Memorial to Hoi",
        province: "Oro (Northern) Province",
        summary: "Stand before the iconic Four Granite Pillars at Isurava Memorial: Courage, Endurance, Mateship, Sacrifice.",
        activities: ["Isurava Memorial service and Kingsbury VC site", "Choko tree plantation walks", "Hoi village river camp"],
        recommendedStay: "Hoi Community Campsite",
        logisticsNotes: "Gentle descent towards the northern coastal plain.",
        estimatedCostPgk: 550,
        estimatedCostZmw: 550
      },
      {
        dayNumber: 8,
        title: "Triumphant Arrival at Kokoda Station & Port Moresby Return",
        location: "Kokoda Station & Port Moresby",
        province: "Oro / NCD",
        summary: "Walk beneath the Kokoda Station memorial arches, explore the historical museum, receive completion certificates, and fly back to Port Moresby.",
        activities: ["Kokoda Station memorial parade", "Kokoda Museum and military hospital visit", "Charter / scheduled flight to Jacksons Airport Port Moresby"],
        recommendedStay: "Airways Hotel Port Moresby or The Stanley",
        logisticsNotes: "Air Niugini / PNG Air flight from Popondetta (Gurney/Girua) to Port Moresby.",
        estimatedCostPgk: 600,
        estimatedCostZmw: 600
      }
    ],
    essentialPackingList: [
      "Heavy-duty broken-in trekking boots with spare laces",
      "Electrolyte replacement tabs and water purification micro-filter",
      "Lightweight rain poncho and waterproof dry-sacks for gear",
      "Thermal fleece and light sleeping bag",
      "Blister prevention kit and personal medical supplies",
      "Headlamp with spare batteries"
    ],
    safetyAndHealthTips: [
      "Always obey your licensed KTA guide and local porter.",
      "Stay hydrated (4–5 litres daily) to prevent heat exhaustion in humid valleys.",
      "Take prescribed malaria prophylaxis consistently."
    ]
  },
  {
    id: "png-highlands-sing-sing-odyssey",
    title: "Highlands Cultural Sing-Sing & Bird of Paradise Odyssey",
    subtitle: "Immerse in the world-famous Goroka & Mount Hagen shows, meet the legendary Asaro Mudmen and Huli Wigmen",
    travelStyle: "Cultural Immersion",
    durationDays: 7,
    bestTravelMonths: "August to October",
    totalEstimatedCostPgk: 4800,
    totalEstimatedCostZmw: 4800,
    provincesCovered: ["National Capital District", "Eastern Highlands", "Western Highlands", "Hela Province"],
    days: [
      {
        dayNumber: 1,
        title: "Fly Port Moresby to Goroka in the Eastern Highlands",
        location: "Goroka",
        province: "Eastern Highlands Province",
        summary: "Scenic flight over the central mountain spine to Goroka. Visit the J.K. McCarthy Museum and explore local organic Arabica coffee mills.",
        activities: ["J.K. McCarthy Museum historical artifacts tour", "Goroka highland coffee tasting", "Sunset over Mount Kiss"],
        recommendedStay: "Bird of Paradise Hotel Goroka or Pacific Gardens Hotel",
        logisticsNotes: "Direct Air Niugini flight from Port Moresby to Goroka Airport (GKA).",
        estimatedCostPgk: 750,
        estimatedCostZmw: 750
      },
      {
        dayNumber: 2,
        title: "Asaro Valley & The Legendary Mudmen Village",
        location: "Asaro Valley",
        province: "Eastern Highlands Province",
        summary: "Travel into the misty Asaro Valley to witness the eerie ancestral Mudmen perform their silent, creeping clay-masked war dance.",
        activities: ["Asaro Mudmen mask-making and secret clay ceremony", "Traditional Mumu earth-oven lunch feast", "Bamboo mouth harp and flute demonstration"],
        recommendedStay: "Bird of Paradise Hotel Goroka",
        logisticsNotes: "Private 4x4 transport with local Eastern Highlands guide.",
        estimatedCostPgk: 800,
        estimatedCostZmw: 800
      },
      {
        dayNumber: 3,
        title: "Highlands Highway Scenic Drive to Mount Hagen",
        location: "Simbu & Western Highlands",
        province: "Simbu & Western Highlands",
        summary: "Drive along the spectacular mountain highway past the foothills of Mount Wilhelm and through Simbu Province into the fertile Wahgi Valley.",
        activities: ["Daulo Pass scenic lookout (2,478m)", "Kundiawa town and Simbu basket weavers", "Arrival in Mount Hagen coffee country"],
        recommendedStay: "Highlander Hotel Mount Hagen or Rondon Ridge Lodge",
        logisticsNotes: "Comfortable air-conditioned 4x4 with professional driver.",
        estimatedCostPgk: 650,
        estimatedCostZmw: 650
      },
      {
        dayNumber: 4,
        title: "Mount Hagen Cultural Sing-Sing Spectacle",
        location: "Mount Hagen Showgrounds",
        province: "Western Highlands Province",
        summary: "Full day VIP access to the Mount Hagen Show, marveling at over 80 tribes in colorful feather bilas, Kundu drumming, and warrior chants.",
        activities: ["Early morning VIP access for face-painting photography", "Grand Sing-Sing arena parade", "Melpa warrior war-cries and Kundu drum rhythms"],
        recommendedStay: "Rondon Ridge Luxury Eco-Lodge",
        logisticsNotes: "VIP enclosure pass with shaded seating and refreshments included.",
        estimatedCostPgk: 900,
        estimatedCostZmw: 900
      },
      {
        dayNumber: 5,
        title: "Tari Valley & The Sacred Huli Wigmen",
        location: "Tari Valley",
        province: "Hela Province",
        summary: "Fly or drive to Tari Valley in Hela Province to meet the Huli Wigmen, who grow their own hair in sacred bachelor schools to create ceremonial wigs.",
        activities: ["Huli Wigman bachelor school visit and hair-growing rituals", "Yellow & red ochre face-painting demonstration", "Bird of Paradise rainforest canopy walk (King of Saxony & Blue Bird of Paradise)"],
        recommendedStay: "Ambua Lodge (Trans Niugini Tours)",
        logisticsNotes: "Stay at Ambua Lodge perched high on the Tari Valley rim.",
        estimatedCostPgk: 950,
        estimatedCostZmw: 950
      },
      {
        dayNumber: 6,
        title: "Birdwatching in the Ambua Cloud Forest",
        location: "Tari Cloud Forest",
        province: "Hela Province",
        summary: "Morning nature trek with expert local naturalist spotters seeking up to 13 species of Birds of Paradise and endemic alpine orchids.",
        activities: ["Dawn bird of paradise mating lek observation", "Highland suspension bridge rainforest canopy trail", "Village cultural exchange with Tari clan matriarchs"],
        recommendedStay: "Ambua Lodge",
        logisticsNotes: "Quality binoculars (8x42 or 10x42) recommended.",
        estimatedCostPgk: 500,
        estimatedCostZmw: 500
      },
      {
        dayNumber: 7,
        title: "Return to Port Moresby & Cultural Market Shopping",
        location: "Port Moresby",
        province: "National Capital District",
        summary: "Flight from Tari / Mount Hagen back to Port Moresby. Afternoon visit to the National Museum and Art Gallery and Ela Beach craft market.",
        activities: ["Flight to Port Moresby Jacksons Airport", "National Museum & Art Gallery master collection", "Authentic hand-woven Bilum shopping at Port Moresby Craft Market"],
        recommendedStay: "Airways Hotel Port Moresby",
        logisticsNotes: "Connect seamlessly to international departures.",
        estimatedCostPgk: 250,
        estimatedCostZmw: 250
      }
    ],
    essentialPackingList: [
      "Camera with telephoto lens (200mm–400mm) and extra memory cards",
      "Warm fleece jacket for chilly highland nights (10°C–14°C)",
      "Comfortable walking shoes and lightweight rain jacket",
      "Cash (PGK) for purchasing Bilums and tribal wood carvings directly from makers"
    ],
    safetyAndHealthTips: [
      "Highland sun is strong; wear a sunhat and sunglasses.",
      "Stay with your designated tour guide in crowded festival showgrounds."
    ]
  },
  {
    id: "png-coral-triangle-scuba-marine",
    title: "Kimbe Bay & Milne Bay Coral Triangle Scuba Odyssey",
    subtitle: "Dive world-famous coral seamounts, swim with hammerhead sharks, explore WWII wrecks and pristine volcanic fjords",
    travelStyle: "Diving & Islands",
    durationDays: 8,
    bestTravelMonths: "April to December",
    totalEstimatedCostPgk: 5400,
    totalEstimatedCostZmw: 5400,
    provincesCovered: ["West New Britain Province", "Milne Bay Province", "National Capital District"],
    days: [
      {
        dayNumber: 1,
        title: "Fly to Hoskins & Walindi Plantation Resort in Kimbe Bay",
        location: "Kimbe Bay",
        province: "West New Britain Province",
        summary: "Arrive at Hoskins Airport on New Britain Island. Transfer through oil palm plantations to the world-renowned Walindi Plantation Resort.",
        activities: ["Hoskins scenic coastal arrival", "Walindi beachfront check-in and dive gear briefing", "Sunset drinks overlooking Kimbe Bay's dormant volcanoes"],
        recommendedStay: "Walindi Plantation Resort",
        logisticsNotes: "Air Niugini flight from Port Moresby (POM) to Hoskins (HKN).",
        estimatedCostPgk: 850,
        estimatedCostZmw: 850
      },
      {
        dayNumber: 2,
        title: "Kimbe Bay Coral Seamounts (South Emma & Inglis Shoal)",
        location: "Kimbe Bay Seamounts",
        province: "West New Britain Province",
        summary: "Double boat dive on Kimbe Bay's offshore underwater volcanic pinnacles, teeming with schooling barracuda, trevally, and giant sea fans.",
        activities: ["Morning dive on South Emma seamount", "Inglis Shoal drift dive with pelagic grey reef sharks", "Visit to Mahonia Na Dari Marine Conservation Center"],
        recommendedStay: "Walindi Plantation Resort",
        logisticsNotes: "PADI dive boat with experienced local divemaster.",
        estimatedCostPgk: 750,
        estimatedCostZmw: 750
      },
      {
        dayNumber: 3,
        title: "Restorf Island & Hanging Gardens",
        location: "Restorf Island",
        province: "West New Britain Province",
        summary: "Dive the vibrant soft coral walls of Restorf Island and picnic on a deserted white sand islet surrounded by turquoise lagoons.",
        activities: ["Hanging Gardens soft coral wall dive", "White sand beach picnic on Restorf Island", "Snorkeling over shallow mandarin fish reef"],
        recommendedStay: "Walindi Plantation Resort",
        logisticsNotes: "Marine sanctuary pass included in dive rate.",
        estimatedCostPgk: 700,
        estimatedCostZmw: 700
      },
      {
        dayNumber: 4,
        title: "Fly to Alotau & Tawali Leisure & Dive Resort",
        location: "Milne Bay",
        province: "Milne Bay Province",
        summary: "Fly via Port Moresby to Gurney Airport in Milne Bay. Scenic boat transfer through tranquil coral fjords to the cliffside Tawali Resort.",
        activities: ["Scenic flight into Milne Bay", "Boat transfer past traditional stilt fishing villages", "Tawali timber cliffside check-in"],
        recommendedStay: "Tawali Leisure & Dive Resort",
        logisticsNotes: "Boat transfer from East Cape dock to Tawali Resort.",
        estimatedCostPgk: 900,
        estimatedCostZmw: 900
      },
      {
        dayNumber: 5,
        title: "Muck Diving & Macro Paradise (Dinah's Beach / Lauadi)",
        location: "Lauadi Coast",
        province: "Milne Bay Province",
        summary: "Dive the birthplace of 'muck diving' at Dinah's Beach, searching for rare pygmy seahorses, blue-ringed octopuses, and mimic octopuses.",
        activities: ["Dinah's Beach black sand macro dive", "Pygmy seahorse and ghost pipefish photography", "Deacon's Reef lush hard coral garden dive"],
        recommendedStay: "Tawali Leisure & Dive Resort",
        logisticsNotes: "Macro photography lighting support provided on dive boats.",
        estimatedCostPgk: 750,
        estimatedCostZmw: 750
      },
      {
        dayNumber: 6,
        title: "WWII Black Jack B-17 Bomber Wreck & Coral Walls",
        location: "Boga Boga & Milne Bay",
        province: "Milne Bay Province",
        summary: "Explore historic WWII wartime heritage underwater, diving intact coral-encrusted aircraft and sheer oceanic drop-offs.",
        activities: ["B-17 Flying Fortress bomber wreck dive", "Oceanic coral wall dive at Tania's Reef", "Milne Bay sunset catamaran cruise"],
        recommendedStay: "Tawali Leisure & Dive Resort",
        logisticsNotes: "Advanced open water certification required for deep wreck dive.",
        estimatedCostPgk: 750,
        estimatedCostZmw: 750
      },
      {
        dayNumber: 7,
        title: "Skull Caves & Traditional Village Cultural Visit",
        location: "East Cape & Tawali",
        province: "Milne Bay Province",
        summary: "Trek through the coastal rainforest to visit the ancestral sacred limestone Skull Caves and learn about ancient Milne Bay burial rituals.",
        activities: ["Guided walk to ancient limestone burial caves", "Village woodcarving demonstration (Ebora bowl artisans)", "Traditional Kundu drum dance performance"],
        recommendedStay: "Tawali Leisure & Dive Resort",
        logisticsNotes: "Wear comfortable walking shoes with good grip on limestone paths.",
        estimatedCostPgk: 400,
        estimatedCostZmw: 400
      },
      {
        dayNumber: 8,
        title: "Return to Port Moresby & Loloata Island Relaxation",
        location: "Port Moresby / Loloata",
        province: "NCD / Central Province",
        summary: "Morning flight from Gurney Airport back to Port Moresby. Afternoon relaxation at Loloata Island Marine Resort in Bootless Bay.",
        activities: ["Flight to Port Moresby", "Loloata Island 20-minute catamaran transfer", "Overwater suite sunset dinner"],
        recommendedStay: "Loloata Island Marine Resort",
        logisticsNotes: "Complimentary boat shuttle from Tahira Marina.",
        estimatedCostPgk: 300,
        estimatedCostZmw: 300
      }
    ],
    essentialPackingList: [
      "Dive computer, mask, and safety sausage (SMB)",
      "Reef-safe biodegradable sunscreen and rash guard",
      "Underwater camera with strobe lighting",
      "Logbook and PADI/SSI certification card"
    ],
    safetyAndHealthTips: [
      "Observe minimum 24-hour pre-flight surface interval after diving.",
      "Stay hydrated in tropical climates; drink plenty of fresh coconut water and electrolytes."
    ]
  }
];

export const CURATED_ITINERARIES: GeneratedItinerary[] = PNG_CURATED_ITINERARIES;

export function generateCustomItinerary(
  interests: string[],
  durationDays: number,
  travelStyle: string,
  fitnessLevel: string = "moderate",
  countryCode: string = "PNG"
): GeneratedItinerary {
  const catalog = PNG_CURATED_ITINERARIES;

  const matching = catalog.find(it => 
    it.travelStyle.toLowerCase().includes(travelStyle.toLowerCase()) ||
    interests.some(int => it.title.toLowerCase().includes(int.toLowerCase()))
  ) || catalog[0];

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

  const costPerDay = Math.round(matching.totalEstimatedCostPgk / matching.durationDays);

  return {
    ...matching,
    id: `custom_itinerary_${Date.now()}`,
    title: `Customized VisitPNG ${travelStyle || "Adventure"} Journey`,
    subtitle: `Tailored for ${count} days based on your interests in ${interests.join(", ") || "culture & nature"} (${fitnessLevel} pace)`,
    durationDays: count,
    totalEstimatedCostPgk: costPerDay * count,
    totalEstimatedCostZmw: costPerDay * count,
    days
  };
}

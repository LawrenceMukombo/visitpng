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
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  subtitle: string;
  travelStyle: "Cultural Immersion" | "Wilderness Expedition" | "Diving & Islands" | "WWII History" | "Family & Nature";
  durationDays: number;
  bestTravelMonths: string;
  totalEstimatedCostPgk: number;
  provincesCovered: string[];
  days: ItineraryDay[];
  essentialPackingList: string[];
  safetyAndHealthTips: string[];
}

export const CURATED_ITINERARIES: GeneratedItinerary[] = [
  {
    id: "highlands-tribal-expedition",
    title: "Highlands Tribal & Bird of Paradise Expedition",
    subtitle: "Experience the vibrant Asaro Mudmen, Mount Hagen Melpa warriors, and high-altitude rainforest birding",
    travelStyle: "Cultural Immersion",
    durationDays: 7,
    bestTravelMonths: "July to October",
    totalEstimatedCostPgk: 4200,
    provincesCovered: ["National Capital District", "Eastern Highlands", "Western Highlands", "Simbu"],
    days: [
      {
        dayNumber: 1,
        title: "Arrival in Port Moresby & National Museum",
        location: "Port Moresby",
        province: "National Capital District",
        summary: "Arrive at Jackson's International Airport, visit the National Museum & Art Gallery and Port Moresby Nature Park.",
        activities: ["National Museum tribal art collection", "Port Moresby Nature Park birdwatching", "Traditional dinner in town"],
        recommendedStay: "Airways Hotel or The Stanley Hotel",
        logisticsNotes: "Pre-book airport transfer shuttle with your hotel.",
        estimatedCostPgk: 650
      },
      {
        dayNumber: 2,
        title: "Fly to Goroka & Asaro Mudmen Village",
        location: "Goroka",
        province: "Eastern Highlands",
        summary: "Morning domestic flight into Goroka Valley. Private transfer to Komunive village to witness the legendary Asaro Mudmen dance.",
        activities: ["Scenic Highlands flight over Bismarck Range", "Komunive Village traditional Holosa performance", "Local coffee plantation tasting tour"],
        recommendedStay: "Bird of Paradise Hotel, Goroka",
        logisticsNotes: "Air Niugini / PNG Air flight POM to GKA (approx. 55 mins).",
        estimatedCostPgk: 800
      },
      {
        dayNumber: 3,
        title: "Highlands Highway Journey to Simbu & Mount Wilhelm Base",
        location: "Keglsugl, Simbu",
        province: "Simbu",
        summary: "Travel along the dramatic Highlands Highway into the Simbu mountain valleys up to Betty's Lodge at the base of Mt Wilhelm.",
        activities: ["Scenic mountain pass road trip", "Keglsugl trout farm visit", "Alpine forest acclimatization walk"],
        recommendedStay: "Betty's Lodge, Keglsugl",
        logisticsNotes: "4WD private chartered vehicle required for mountain ascent.",
        estimatedCostPgk: 550
      },
      {
        dayNumber: 4,
        title: "Lake Piunde Alpine Hike & Orchid Sanctuary",
        location: "Mount Wilhelm Foothills",
        province: "Simbu",
        summary: "Day trek up to glacial Lake Piunde surrounded by high-altitude cycads and tree ferns with local Simbu mountain guides.",
        activities: ["Guided alpine lake trek", "Highland orchid spotting", "Evening fireplace storytelling at lodge"],
        recommendedStay: "Betty's Lodge, Keglsugl",
        logisticsNotes: "Carry warm thermal layers; temperatures drop below 8°C at night.",
        estimatedCostPgk: 400
      },
      {
        dayNumber: 5,
        title: "Drive to Mount Hagen & Melpa Cultural Encounter",
        location: "Mount Hagen",
        province: "Western Highlands",
        summary: "Travel to the Western Highlands commercial hub and visit a Melpa village for a private traditional singsing and mumu feast.",
        activities: ["Highlands Highway scenic drive through Wahgi Valley", "Melpa tribe feathered warrior presentation", "Traditional earth oven Mumu feast"],
        recommendedStay: "Highlander Hotel or Rondon Ridge Lodge",
        logisticsNotes: "Highlands Highway transit approx. 3.5 hours.",
        estimatedCostPgk: 750
      },
      {
        dayNumber: 6,
        title: "Kumul Lodge Cloud Forest Birding",
        location: "Mount Hagen / Enga Border",
        province: "Western Highlands",
        summary: "Dawn birdwatching at Kumul Lodge to see the Ribbon-tailed Astrapia, King of Saxony Bird of Paradise, and Crested Berrypeckers.",
        activities: ["Early morning birding feeding table photography", "Cloud forest moss trail walk", "Highlands artisan craft market"],
        recommendedStay: "Rondon Ridge Lodge, Mt Hagen",
        logisticsNotes: "Spotting scopes and telephoto lenses highly recommended.",
        estimatedCostPgk: 600
      },
      {
        dayNumber: 7,
        title: "Return Flight to Port Moresby & Departure",
        location: "Port Moresby",
        province: "National Capital District",
        summary: "Morning flight from Kagamuga Airport (HGU) back to Port Moresby for onward international connection.",
        activities: ["Morning flight from Mount Hagen to Port Moresby", "Last-minute Bilum bag shopping at craft market", "International departure"],
        recommendedStay: "Day transit lounge or evening departure",
        logisticsNotes: "Allow at least 3 hours transit buffer before international flights.",
        estimatedCostPgk: 450
      }
    ],
    essentialPackingList: [
      "Lightweight rain jacket & fleece thermal layers (Highlands nights are cold)",
      "Sturdy waterproof hiking boots with high-ankle support",
      "Insect repellent (DEET 40%+) & Malaria prophylactic tablets",
      "Power bank (20,000mAh) for remote village photo sessions",
      "Cash (PGK) in small denominations (K10, K20, K50) for village crafts"
    ],
    safetyAndHealthTips: [
      "Always travel with accredited local guides when exploring village communities.",
      "Stay hydrated in the higher elevations (Mount Hagen is at 1,675m altitude).",
      "Ask permission before photographing individuals, especially initiated elders."
    ]
  },
  {
    id: "coral-fjords-diving-escape",
    title: "Tufi Volcanic Fjords & Coral Sea Escape",
    subtitle: "Pristine coral wall diving, traditional outrigger canoeing, and MacLaren fjord waterfalls",
    travelStyle: "Diving & Islands",
    durationDays: 6,
    bestTravelMonths: "Year-round (Best diving October to May)",
    totalEstimatedCostPgk: 3800,
    provincesCovered: ["National Capital District", "Oro (Northern)"],
    days: [
      {
        dayNumber: 1,
        title: "Fly Port Moresby to Tufi Dive Resort",
        location: "Cape Nelson, Tufi",
        province: "Oro (Northern)",
        summary: "Direct charter or scheduled flight over the Owen Stanley Range landing on the dramatic Tufi grass runway atop fjord sea cliffs.",
        activities: ["Scenic flight over volcanic caldera coast", "Check-in to ocean-view bungalow", "Sunset fjord lookout walk"],
        recommendedStay: "Tufi Dive Resort",
        logisticsNotes: "Flights depart Port Moresby (POM) to Tufi (TFI) on selected days.",
        estimatedCostPgk: 950
      },
      {
        dayNumber: 2,
        title: "Outer Barrier Reef Shark & Coral Wall Diving",
        location: "Cyclone Reef, Cape Nelson",
        province: "Oro (Northern)",
        summary: "Two morning boat dives on pristine outer coral walls with 40m+ visibility, schooling barracuda, and reef sharks.",
        activities: ["Outer barrier reef drift dive", "Snorkeling shallow hard-coral gardens", "Afternoon paddle-boarding in fjord calm waters"],
        recommendedStay: "Tufi Dive Resort",
        logisticsNotes: "Dive gear rental available on-site; PADI certifications recognized.",
        estimatedCostPgk: 750
      },
      {
        dayNumber: 3,
        title: "Traditional MacLaren Fjord & Village Cultural Tour",
        location: "Gobi & MacLaren Fjord",
        province: "Oro (Northern)",
        summary: "Travel by traditional hand-carved outrigger canoe deep into the mangroves of MacLaren Fjord to meet local Oro villagers in traditional tapa cloth.",
        activities: ["Outrigger canoe paddle through fjord mangroves", "Traditional Tapa bark cloth beating demonstration", "Hidden waterfall swimming hole"],
        recommendedStay: "Tufi Dive Resort or Village Homestay",
        logisticsNotes: "Waterproof dry bags recommended for canoe trips.",
        estimatedCostPgk: 500
      },
      {
        dayNumber: 4,
        title: "Muck Diving & Macro Photography at Tufi Wharf",
        location: "Tufi Harbour",
        province: "Oro (Northern)",
        summary: "Explore world-renowned muck diving under the historic Tufi jetty: Mandarin fish, ghost pipefish, pygmy seahorses, and nudibranchs.",
        activities: ["Tufi jetty macro dive", "Sunset Mandarin fish mating dive", "BBQ seafood dinner overlooking the Solomon Sea"],
        recommendedStay: "Tufi Dive Resort",
        logisticsNotes: "Macro lens and underwater strobe recommended.",
        estimatedCostPgk: 550
      },
      {
        dayNumber: 5,
        title: "Cape Nelson Rainforest Birding & Sea Kayaking",
        location: "Cape Nelson Headland",
        province: "Oro (Northern)",
        summary: "Early morning rainforest walk for eclectus parrots and hornbills, followed by sea kayaking between fjord cliffs.",
        activities: ["Morning jungle bird walk", "Sea kayak along volcanic basalt cliffs", "Stargazing over the Coral Triangle"],
        recommendedStay: "Tufi Dive Resort",
        logisticsNotes: "Wear reef-safe mineral sunscreen.",
        estimatedCostPgk: 450
      },
      {
        dayNumber: 6,
        title: "Return Flight to Port Moresby",
        location: "Port Moresby",
        province: "National Capital District",
        summary: "Morning flight from Tufi back to Jackson's International Airport in Port Moresby for departure.",
        activities: ["Morning scenic departure from Tufi airstrip", "Connection in Port Moresby", "Departure"],
        recommendedStay: "Day transit or international departure",
        logisticsNotes: "Observe 18-hour surface interval after scuba diving before flying.",
        estimatedCostPgk: 600
      }
    ],
    essentialPackingList: [
      "Reef-safe biodegradable sunscreen (Oxybenzone-free)",
      "Dry bags (10L & 20L) for canoe and boat excursions",
      "Mask, snorkel and dive computer (if diving)",
      "Polarized sunglasses & UV rash guard shirts",
      "Lightweight sandals or reef booties"
    ],
    safetyAndHealthTips: [
      "Maintain at least 18 hours between your last scuba dive and your flight back to POM.",
      "Always drink bottled or filtered rainwater at coastal resorts.",
      "Wear life jackets when traveling in deep fjords by outrigger canoe."
    ]
  },
  {
    id: "rabaul-wwii-volcano-trail",
    title: "Rabaul Volcanoes, Wreck Diving & WWII Relics",
    subtitle: "Active Tavurvur volcano caldera, Japanese subterranean tunnels, and Kokopo island waters",
    travelStyle: "WWII History",
    durationDays: 5,
    bestTravelMonths: "May to November",
    totalEstimatedCostPgk: 3200,
    provincesCovered: ["East New Britain"],
    days: [
      {
        dayNumber: 1,
        title: "Fly to Tokua & Historical Kokopo Welcome",
        location: "Kokopo",
        province: "East New Britain",
        summary: "Arrive at Tokua Airport with stunning views of the Duke of York Islands. Visit the Kokopo War Museum and German colonial relics.",
        activities: ["Flight to Tokua Airport (RAB)", "Kokopo War Museum & Japanese tank collection", "Sunset view of Simpson Harbour"],
        recommendedStay: "Kokopo Beach Bungalow Resort or Rapopo Plantation Resort",
        logisticsNotes: "Airport is 20 minutes drive from Kokopo town center.",
        estimatedCostPgk: 800
      },
      {
        dayNumber: 2,
        title: "Mount Tavurvur Crater Trek & Matupit Hot Springs",
        location: "Rabaul Volcano Plains",
        province: "East New Britain",
        summary: "Cross the dramatic black ash desert of the 1994 eruption and hike the active rim of Mount Tavurvur and natural sulfur hot springs.",
        activities: ["Hike Tavurvur active volcanic cinder cone", "Dip feet in Matupit geothermal hot springs", "Watch local Megapode bird egg harvesters"],
        recommendedStay: "Kokopo Beach Bungalow Resort",
        logisticsNotes: "Wear closed shoes; volcanic ash is hot in sunny weather.",
        estimatedCostPgk: 650
      },
      {
        dayNumber: 3,
        title: "Japanese WWII Submarine Base & Tunnel Network",
        location: "Karavia Bay & Rabaul",
        province: "East New Britain",
        summary: "Explore the vast underground military complex constructed by the Japanese Imperial Navy during WWII.",
        activities: ["Explore Karavia Bay submarine barge tunnels", "Visit Admiral Yamamoto's underground bunker", "Panoramic lookout from Rabaul Volcanological Observatory"],
        recommendedStay: "Rapopo Plantation Resort",
        logisticsNotes: "Bring a reliable flashlight / headlamp for subterranean tunnel exploration.",
        estimatedCostPgk: 550
      },
      {
        dayNumber: 4,
        title: "Duke of York Islands & Wild Spinner Dolphins",
        location: "Duke of York Archipelago",
        province: "East New Britain",
        summary: "Boat excursion across St George's Channel accompanied by pods of spinner dolphins to the white sand beaches of Mioko Island.",
        activities: ["Dolphin watching boat crossing", "Snorkeling pristine coral atolls at Mioko Island", "Traditional Tolai seafood lunch on the beach"],
        recommendedStay: "Kokopo Beach Bungalow Resort",
        logisticsNotes: "Marine transfer takes approx. 40 minutes across calm morning waters.",
        estimatedCostPgk: 700
      },
      {
        dayNumber: 5,
        title: "Rabaul Mask Market & Return Flight",
        location: "Kokopo & Tokua",
        province: "East New Britain",
        summary: "Morning visit to Kokopo local market to see Tolai shell money (Tabu) and carved wood items before boarding return flight.",
        activities: ["Kokopo vibrant local craft market", "Tolai shell money demonstration", "Return flight to Port Moresby"],
        recommendedStay: "Return flight departure",
        logisticsNotes: "Check-in at Tokua Airport 90 minutes before flight.",
        estimatedCostPgk: 500
      }
    ],
    essentialPackingList: [
      "Comfortable closed walking shoes for volcanic ash plains",
      "Bright LED headlamp/torch for WWII tunnel exploration",
      "Wide-brim sun hat and UV protective sunglasses",
      "Snorkeling gear & reef booties for Duke of York Islands",
      "Camera with dust-protective casing against volcanic ash"
    ],
    safetyAndHealthTips: [
      "Follow local volcanologist guidelines when approaching Tavurvur crater.",
      "Do not enter unguided underground WWII bunker shafts.",
      "Stay hydrated during hot coastal excursions."
    ]
  }
];

export const ZAMBIA_CURATED_ITINERARIES: GeneratedItinerary[] = [
  {
    id: "zambia-falls-and-luangwa-safari",
    title: "Victoria Falls & South Luangwa Walking Safari Expedition",
    subtitle: "Experience the thunder of Victoria Falls, Zambezi river sunsets, and the world's premier walking safaris in the Luangwa Valley",
    travelStyle: "Wilderness Expedition",
    durationDays: 7,
    bestTravelMonths: "May to November",
    totalEstimatedCostPgk: 4600,
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
        estimatedCostPgk: 750
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
        estimatedCostPgk: 850
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
        estimatedCostPgk: 900
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
        estimatedCostPgk: 700
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
        estimatedCostPgk: 650
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
        estimatedCostPgk: 450
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
        estimatedCostPgk: 300
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
  }
];

export function generateCustomItinerary(
  interests: string[],
  durationDays: number,
  travelStyle: string,
  fitnessLevel: string = "moderate",
  countryCode: string = "PNG"
): GeneratedItinerary {
  const isZambia = (countryCode || "PNG").toUpperCase() === "ZMB";
  const catalog = isZambia ? ZAMBIA_CURATED_ITINERARIES : CURATED_ITINERARIES;

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

  const costPerDay = Math.round(matching.totalEstimatedCostPgk / matching.durationDays);

  return {
    ...matching,
    id: `custom_itinerary_${Date.now()}`,
    title: `Customized ${isZambia ? "ZamRoam Zambia" : "Papua New Guinea"} ${travelStyle || "Safari"} Journey`,
    subtitle: `Tailored for ${count} days based on your interests in ${interests.join(", ") || "safari & nature"} (${fitnessLevel} pace)`,
    durationDays: count,
    totalEstimatedCostPgk: costPerDay * count,
    days
  };
}

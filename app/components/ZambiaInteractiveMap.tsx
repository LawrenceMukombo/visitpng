"use client";

import { useState, useMemo } from "react";
import { ZAMBIA_PROVINCES } from "../../db/zambiaGeography";

export interface MapDestinationPin {
  id: string | number;
  name: string;
  category: "ceremony" | "stays" | "tours" | "nature" | "culture" | "events" | "transport";
  categoryName: string;
  categoryIcon: string;
  provinceCode: string;
  provinceName: string;
  region: string;
  summary: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  x: number;
  y: number;
  royalHost?: string;
  season?: string;
  sacredRegalia?: string;
  dressCode?: string;
  highlights: string[];
  price?: string;
  rating: number;
  slug: string;
}

// Precise Geographic Projection for Zambia:
// Longitude: 21.6°E (West) to 34.0°E (East) -> width = 12.4°
// Latitude: -18.2°S (South) to -8.0°S (North) -> height = 10.2°
// SVG ViewBox: 960 x 720
function projectCoords(lat: number, lon: number): { x: number; y: number } {
  const minLon = 21.6;
  const maxLon = 34.0;
  const minLat = -18.2;
  const maxLat = -8.0;

  const x = ((lon - minLon) / (maxLon - minLon)) * 860 + 50;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 620 + 50;
  return { x: Math.round(x), y: Math.round(y) };
}

export const ZAMBIA_TOURISM_PINS: MapDestinationPin[] = [
  // ==========================================
  // MAJOR TRADITIONAL CEREMONIES (👑)
  // ==========================================
  {
    id: "ceremony-kuomboka",
    slug: "barotseland-mongu",
    name: "Kuomboka Traditional Ceremony",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "👑",
    provinceCode: "ZM-WES",
    provinceName: "Western Province",
    region: "Western & Barotseland",
    royalHost: "His Majesty The Litunga (King of the Lozi) & Barotse Royal Establishment",
    season: "March / April (Peak Zambezi Flood)",
    sacredRegalia: "Nalikwanda Royal Barge, Royal Maoma War Drums, Elephant Crest Canopy",
    dressCode: "Traditional Siziba (Men: kilt, shirt, red beret) & Musisi (Women: tiered silk dresses)",
    summary: "The world's most spectacular royal water pageant. As floodwaters submerge the Barotse plains, the King sails in the colossal 100-oarsmen Nalikwanda barge from Lealui to the highlands of Limulunga.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82",
    latitude: -15.2819,
    longitude: 23.1311,
    ...projectCoords(-15.2819, 23.1311),
    highlights: [
      "Royal Nalikwanda barge with 100+ singing royal oarsmen",
      "Thunderous Royal Maoma war drums echoing across the floodwaters",
      "Queen's Notila barge royal flotilla escort",
      "Limulunga Royal Palace landing & nocturnal royal victory dance (Lishoma)",
      "Feast of fresh Barotse bream, sour milk, and royal delicacies"
    ],
    price: "VIP Pavilion from ZMW 1,800 · Public Attendance Free",
    rating: 5.0
  },
  {
    id: "ceremony-likumbi",
    slug: "solwezi-zambezi-west",
    name: "Likumbi Lya Mize (Makishi Festival)",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "🎭",
    provinceCode: "ZM-NW",
    provinceName: "North-Western Province",
    region: "North-Western Circuit",
    royalHost: "His Royal Highness Senior Chief Ndungu & Luvale Royal Council",
    season: "Last Week of August (UNESCO Masterpiece)",
    sacredRegalia: "Sacred Makishi Masked Spirits (Kayipu, Chizaluke, Mwana Pwevo, Utenu)",
    dressCode: "Chitenge fabric attire with respect for sacred arena boundary gates",
    summary: "UNESCO-inscribed Masterpiece of Oral and Intangible Heritage. Over 50 sacred Makishi masked spirit masquerades emerge from the ancestral graveyard to celebrate the Mukanda initiation graduation at Mize Palace.",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1100&q=82",
    latitude: -13.5417,
    longitude: 23.1083,
    ...projectCoords(-13.5417, 23.1083),
    highlights: [
      "Procession of 50+ sacred Makishi masked dancers representing ancestral spirits",
      "Kayipu (Father of Makishi) grand entrance with royal flywhisk salutes",
      "Mwana Pwevo graceful female spirit dance acrobatics",
      "Chilombola guardian songs & traditional silimba xylophone melodies",
      "Zambezi River canoe crossings into the historic Mize Royal Capital"
    ],
    price: "VIP Enclosure from ZMW 750 · Public Attendance Free",
    rating: 5.0
  },
  {
    id: "ceremony-lunda-lubanza",
    slug: "solwezi-zambezi-west",
    name: "Lunda Lubanza Traditional Ceremony",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "⚔️",
    provinceCode: "ZM-NW",
    provinceName: "North-Western Province",
    region: "North-Western Circuit",
    royalHost: "His Royal Highness Senior Chief Ishindi of the Lunda Kingdom",
    season: "August / September",
    sacredRegalia: "Royal Mpok (Lunda Double-Edged Battle Sword) & Royal Palanquin",
    dressCode: "Formal traditional attire / Lunda royal colors",
    summary: "Ancient celebration of Lunda royal sovereignty and cultural solidarity at Mukanda Nkambo. Senior Chief Ishindi is borne aloft on the royal palanquin accompanied by royal drummers and ceremonial sword salutes.",
    imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82",
    latitude: -13.5167,
    longitude: 23.1500,
    ...projectCoords(-13.5167, 23.1500),
    highlights: [
      "Royal procession of Senior Chief Ishindi on the sacred palanquin",
      "Mpok sword battle dance honoring legendary warrior kings",
      "Muyinda traditional praise singing and war drumming",
      "Presentation of harvest tributes from surrounding chiefdoms",
      "Cultural banquet featuring wild honey and indigenous game delicacies"
    ],
    price: "Guest Seating from ZMW 650",
    rating: 4.9
  },
  {
    id: "ceremony-umutomboko",
    slug: "luapula-waterfalls-kingdom",
    name: "Umutomboko Ceremony (Lunda Kingdom)",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "👑",
    provinceCode: "ZM-LUA",
    provinceName: "Luapula Province",
    region: "Northern & Luapula",
    royalHost: "His Royal Highness Mwata Kazembe, King of the Eastern Lunda",
    season: "Last Weekend of July",
    sacredRegalia: "Mukonzo Skirt, Mpok Sword, Imfukutu & Chinkwisha Royal Drums",
    dressCode: "Traditional Chitenge or formal dress (respectful at Ng'ona sacred river)",
    summary: "Spectacular royal victory pageant celebrating the great Lunda conquest of the Luapula valley. King Mwata Kazembe, draped in majestic flowing Mukonzo robes, performs the exhilarating Mutomboko victory sword dance.",
    imageUrl: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82",
    latitude: -9.8167,
    longitude: 28.7500,
    ...projectCoords(-9.8167, 28.7500),
    highlights: [
      "Mwata Kazembe performing the electrifying Mutomboko victory dance with sword",
      "Solemn libations and cleansing ritual at the sacred Ng'ona River",
      "Booming Imfukutu royal drums heard across the entire valley",
      "Musumbanzala royal court procession with hundreds of court dignitaries",
      "Traditional feast featuring fresh Luapula Chisense and yellow cassava"
    ],
    price: "VIP Grandstand from ZMW 800",
    rating: 5.0
  },
  {
    id: "ceremony-kusefya",
    slug: "kasama-chishimba-falls",
    name: "Ukusefya Pa Ng'wena (Bemba Royal)",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "🐊",
    provinceCode: "ZM-NOR",
    provinceName: "Northern Province",
    region: "Northern & Great Lakes",
    royalHost: "His Royal Highness Paramount Chief Chitimukulu (Mwine Lubemba)",
    season: "August",
    sacredRegalia: "Icipuna ca Ng'wena (Sacred Crocodile Throne) & Royal Spears",
    dressCode: "Bemba red, white & black royal attire or smart cultural dress",
    summary: "The grand annual national ceremony of the Bemba people reenacting their historic 17th-century migration from Kola (Congo) to finding the dead crocodile totem at Ng'wena.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82",
    latitude: -10.1667,
    longitude: 31.3667,
    ...projectCoords(-10.1667, 31.3667),
    highlights: [
      "Paramount Chief Chitimukulu carried on the giant crocodile litter by 30 warriors",
      "Dramatic reenactment of crossing the Chambeshi River into Lubemba",
      "Abemba praise poets reciting genealogical royal praises (Imilombo)",
      "Traditional Kalela and Chilili war dances",
      "Traditional warrior salutes with muzzle-loading flintlock musket volleys"
    ],
    price: "VIP Enclosure from ZMW 780",
    rating: 4.9
  },
  {
    id: "ceremony-ncwala",
    slug: "chipata-mutenguleni-heritage",
    name: "Nc'wala Traditional Ceremony (Ngoni)",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "🛡️",
    provinceCode: "ZM-EAS",
    provinceName: "Eastern Province",
    region: "Eastern & Luangwa Valley",
    royalHost: "His Royal Highness Paramount Chief Mpezeni, King of the Ngoni",
    season: "Last Saturday of February",
    sacredRegalia: "Injobo Leopard Skins, Cowhide Shields, Assegai Spears, Headgear",
    dressCode: "Ngoni animal skins / Chitenge attire",
    summary: "Ancient first-fruits harvest and warrior thanksgiving celebration. Thousands of Ngoni impis in majestic leopard skins and shields dance the thunderous Ingoma before Paramount Chief Mpezeni.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82",
    latitude: -13.6333,
    longitude: 32.6500,
    ...projectCoords(-13.6333, 32.6500),
    highlights: [
      "Massive warrior regiments (Impis) stamping earth in unison in the Ingoma dance",
      "Paramount Chief Mpezeni tasting the first fresh harvest maize (Mthunzi)",
      "Sacred black bull ritual offering and warrior blessings",
      "Ngoni praise poets chanting ancestral Zulu lineage war chronicles",
      "Vibrant cultural crafts market with authentic beadwork and snuff gourds"
    ],
    price: "VIP Arena Seating from ZMW 850",
    rating: 5.0
  },
  {
    id: "ceremony-shimunenga",
    slug: "lochinvar-monze-sanctuary",
    name: "Shimunenga Traditional Cattle Ceremony",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "🐂",
    provinceCode: "ZM-SOU",
    provinceName: "Southern Province",
    region: "Southern Safari & Zambezi",
    royalHost: "Ba-Ila Royal Elders & Chiefs of Namwala",
    season: "September / October (Full Moon on the Kafue Flats)",
    sacredRegalia: "Long Ila Spears, Impandala Feathered Headgear, Ancestral Horns",
    dressCode: "Light safari or cultural clothing suitable for floodplain heat",
    summary: "One of Africa's most breathtaking pastoral spectacles. Thousands of prized horned Ila cattle swim across the flooded Kafue River as fearless young warriors dive alongside them singing heroic cattle praises.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82",
    latitude: -15.7500,
    longitude: 26.4333,
    ...projectCoords(-15.7500, 26.4333),
    highlights: [
      "Thousands of prized long-horned cattle swimming across the Kafue River channels",
      "Fearless Ila youth swimming with cattle and demonstrating equestrian skills",
      "Mock hunting expeditions with traditional spears and impandala headgear",
      "Kukonkola cattle poetry praises passed down over 300 years",
      "Traditional Ila warrior parades and village communal feasts"
    ],
    price: "Guide & Entry from ZMW 600",
    rating: 4.9
  },
  {
    id: "ceremony-kulamba",
    slug: "chipata-mutenguleni-heritage",
    name: "Kulamba Ceremony (Chewa Kingdom)",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "🎭",
    provinceCode: "ZM-EAS",
    provinceName: "Eastern Province",
    region: "Eastern & Luangwa Valley",
    royalHost: "His Majesty Kalonga Gawa Undi, King of the Chewa (Zambia, Malawi, Mozambique)",
    season: "Last Saturday of August",
    sacredRegalia: "Gule Wamkulu (Great Dance - UNESCO Intangible Masterpiece) Masquerades",
    dressCode: "Modest cultural clothing; absolute reverence for masked performers",
    summary: "Tri-national royal convergence where over 130 subordinate Chewa chiefs from Zambia, Malawi, and Mozambique assemble at Mkaika to pay tribute and present governance reports to King Kalonga Gawa Undi.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82",
    latitude: -14.0500,
    longitude: 32.0333,
    ...projectCoords(-14.0500, 32.0333),
    highlights: [
      "Unrivaled showcase of the sacred Gule Wamkulu (The Great Dance)",
      "Over 130 international Chewa chiefs in full royal court regalia",
      "Nyau secret brotherhood masquerades displaying spiritual mastery",
      "King Kalonga Gawa Undi delivering the annual state-of-the-kingdom decree",
      "Cross-border cultural arts, food, and music exhibition"
    ],
    price: "VIP Pavilion from ZMW 820",
    rating: 5.0
  },
  {
    id: "ceremony-lwiindi",
    slug: "lochinvar-monze-sanctuary",
    name: "Lwiindi Gonde Thanksgiving Ceremony",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "🌧️",
    provinceCode: "ZM-SOU",
    provinceName: "Southern Province",
    region: "Southern Safari & Zambezi",
    royalHost: "Chief Monze, Spiritual Leader of the Tonga People",
    season: "First Weekend of July",
    sacredRegalia: "Budima War Drums, Sacred Gonde Shrine Libation Gourds",
    dressCode: "Chitenge attire / Traditional Tonga beadwork",
    summary: "Sacred Tonga thanksgiving and rainmaking ceremony held at the ancient Gonde Shrine near Monze, honoring the spiritual lineage of the ancient Chief Monze dynasty.",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1100&q=82",
    latitude: -16.2833,
    longitude: 27.4833,
    ...projectCoords(-16.2833, 27.4833),
    highlights: [
      "Sacred ancestral prayers at the ancient Gonde shrine",
      "Thunderous Budima warrior drumming with giant hollowed tree drums",
      "Traditional Tonga harvest displays and prize bull showcases",
      "Communal tasting of traditional fermented seven-day sweet brew",
      "Tonga folklore storytelling and spiritual cleansing rites"
    ],
    price: "Guest Entry from ZMW 400",
    rating: 4.8
  },
  {
    id: "ceremony-chibwela",
    slug: "muchinga-shiwa-ngandu",
    name: "Chibwela Kumushi Ceremony (Lala/Swaka)",
    category: "ceremony",
    categoryName: "Traditional Ceremony",
    categoryIcon: "🌾",
    provinceCode: "ZM-CEN",
    provinceName: "Central Province",
    region: "Central & Northern Circuit",
    royalHost: "Council of Chiefs of the Bisa, Swaka, and Lala Peoples",
    season: "September",
    sacredRegalia: "Traditional Seed Baskets, Bows & Arrows, Akalela Drums",
    dressCode: "Traditional African wear / comfortable outdoor clothing",
    summary: "'Returning from the fields' harvest celebration marking the successful end of the crop season, blessing seeds for the coming rains across Mkushi and the Luano Valley.",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82",
    latitude: -13.9167,
    longitude: 29.4000,
    ...projectCoords(-13.9167, 29.4000),
    highlights: [
      "Blessing of agricultural seeds by royal elders",
      "Lala & Swaka traditional harvest dances and archery contests",
      "Akalela and Chilili royal court drumming ensembles",
      "Traditional exhibition of indigenous crops and medicinal plants",
      "Communal feast with traditional roasted game and honey beer"
    ],
    price: "Guest Access from ZMW 350",
    rating: 4.7
  },

  // ==========================================
  // NATURE & SAFARI DESTINATIONS (◇, ◒, ⌂)
  // ==========================================
  {
    id: "vic-falls",
    slug: "victoria-falls-livingstone",
    name: "Victoria Falls (Mosi-oa-Tunya)",
    category: "nature",
    categoryName: "Nature & Falls",
    categoryIcon: "◇",
    provinceCode: "ZM-SOU",
    provinceName: "Southern Province",
    region: "Southern Safari & Zambezi",
    summary: "UNESCO World Heritage wonder of the world where the Zambezi river cascades 108 metres into Batoka Gorge.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82",
    latitude: -17.9243,
    longitude: 25.8572,
    ...projectCoords(-17.9243, 25.8572),
    highlights: ["Devil's Pool Swim", "Rainforest Walking Tour", "Helicopter Flight of Angels", "Batoka Gorge Rafting"],
    price: "From ZMW 450",
    rating: 5.0
  },
  {
    id: "south-luangwa",
    slug: "south-luangwa-mfuwe",
    name: "South Luangwa National Park",
    category: "tours",
    categoryName: "Safari Tours",
    categoryIcon: "◒",
    provinceCode: "ZM-EAS",
    provinceName: "Eastern Province",
    region: "Eastern & Luangwa Valley",
    summary: "Birthplace of the legendary African walking safari with unmatched leopard densities and elephant lagoons.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82",
    latitude: -13.0833,
    longitude: 31.8000,
    ...projectCoords(-13.0833, 31.8000),
    highlights: ["Pioneering Walking Safaris", "Night Predator Drives", "Elephant Lagoon Stays", "Nsefu Carmine Bee-eaters"],
    price: "From ZMW 3,800",
    rating: 5.0
  },
  {
    id: "lower-zambezi",
    slug: "lower-zambezi-valley",
    name: "Lower Zambezi National Park",
    category: "nature",
    categoryName: "Nature & Safaris",
    categoryIcon: "◇",
    provinceCode: "ZM-LUS",
    provinceName: "Lusaka / Southern",
    region: "Southern Safari & Zambezi",
    summary: "Pristine wilderness facing Zimbabwe's Mana Pools, offering thrilling canoe trails and riverfront luxury lodges.",
    imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82",
    latitude: -15.6500,
    longitude: 29.4167,
    ...projectCoords(-15.6500, 29.4167),
    highlights: ["Zambezi River Canoeing", "Tiger Fishing Catch & Release", "Chiawa Luxury Tented Stays", "Night Leopard Spotting"],
    price: "From ZMW 4,900",
    rating: 4.9
  },
  {
    id: "kafue-np",
    slug: "kafue-national-park",
    name: "Kafue National Park & Busanga",
    category: "tours",
    categoryName: "Safari Tours",
    categoryIcon: "◒",
    provinceCode: "ZM-CEN",
    provinceName: "Central Province",
    region: "Central & Kafue Basin",
    summary: "One of Africa's largest national parks, featuring the mist-shrouded Busanga Plains and tree-climbing lions.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82",
    latitude: -14.6000,
    longitude: 26.0000,
    ...projectCoords(-14.6000, 26.0000),
    highlights: ["Busanga Plains Hot Air Ballooning", "Tree-Climbing Lions", "Kafue River Boat Safaris", "Wild Dog Tracking"],
    price: "From ZMW 2,800",
    rating: 4.9
  },
  {
    id: "lake-kariba",
    slug: "lake-kariba-siavonga",
    name: "Lake Kariba & Siavonga",
    category: "stays",
    categoryName: "Stays & Leisure",
    categoryIcon: "⌂",
    provinceCode: "ZM-SOU",
    provinceName: "Southern Province",
    region: "Southern Safari & Zambezi",
    summary: "The Zambian Riviera offering houseboat charters, scenic sunset cruises, and fresh Kariba bream dining.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82",
    latitude: -16.5383,
    longitude: 28.7089,
    ...projectCoords(-16.5383, 28.7089),
    highlights: ["Houseboat Charters", "Siavonga Hilltop Sunsets", "Kariba Dam Wall Tour", "Freshwater Angling"],
    price: "From ZMW 1,750",
    rating: 4.8
  },
  {
    id: "liuwa-plain",
    slug: "barotseland-mongu",
    name: "Liuwa Plain National Park",
    category: "nature",
    categoryName: "Nature & Expeditions",
    categoryIcon: "◇",
    provinceCode: "ZM-WES",
    provinceName: "Western Province",
    region: "Western & Barotseland",
    summary: "Africa's second-largest wildebeest migration across vast golden plains managed in partnership with African Parks.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82",
    latitude: -14.4000,
    longitude: 22.6000,
    ...projectCoords(-14.4000, 22.6000),
    highlights: ["45,000 Blue Wildebeest Migration", "Lady Liuwa Lion Heritage", "Kuomboka Royal Ceremony Gate", "Star-Bed Decks"],
    price: "From ZMW 5,200",
    rating: 5.0
  },
  {
    id: "lake-bangweulu",
    slug: "samfya-beach-bangweulu",
    name: "Lake Bangweulu & Samfya Beach",
    category: "stays",
    categoryName: "Stays & Wetlands",
    categoryIcon: "⌂",
    provinceCode: "ZM-LUA",
    provinceName: "Luapula Province",
    region: "Northern & Great Lakes",
    summary: "Zambia's inland white sand beaches and wetland sanctuary for the prehistoric Shoebill Stork.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82",
    latitude: -11.3667,
    longitude: 29.5500,
    ...projectCoords(-11.3667, 29.5500),
    highlights: ["Shoebill Stork Canoe Search", "Samfya White Sand Beach", "Chita Beach Chalets", "Black Lechwe Herds"],
    price: "From ZMW 1,600",
    rating: 4.8
  },
  {
    id: "lake-tanganyika",
    slug: "lake-tanganyika-mbala",
    name: "Lake Tanganyika & Ndole Bay",
    category: "stays",
    categoryName: "Stays & Diving",
    categoryIcon: "⌂",
    provinceCode: "ZM-NOR",
    provinceName: "Northern Province",
    region: "Northern & Great Lakes",
    summary: "The world's longest freshwater lake featuring pristine scuba diving, endemic cichlid fish, and Nsumbu National Park.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82",
    latitude: -8.8333,
    longitude: 31.0000,
    ...projectCoords(-8.8333, 31.0000),
    highlights: ["Freshwater Scuba & Snorkeling", "Ndole Bay Sandy Beach Chalets", "Kalambo Falls Expedition", "Nsumbu Park Boat Safaris"],
    price: "From ZMW 2,200",
    rating: 4.9
  },
  {
    id: "kasanka-bat",
    slug: "kasanka-national-park",
    name: "Kasanka National Park (Bat Migration)",
    category: "nature",
    categoryName: "Nature Events",
    categoryIcon: "◇",
    provinceCode: "ZM-CEN",
    provinceName: "Central Province",
    region: "Central & Northern Circuit",
    summary: "Home to the world's largest mammal migration where 10 million fruit bats arrive between October and December.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82",
    latitude: -12.5667,
    longitude: 30.2500,
    ...projectCoords(-12.5667, 30.2500),
    highlights: ["10 Million Fruit Bat Swarm", "Tree Canopy Hide Sunrises", "Rare Sitatunga Antelope", "Fibwe Treehouse Stays"],
    price: "From ZMW 1,950",
    rating: 4.9
  },
  {
    id: "zambezi-source",
    slug: "solwezi-zambezi-west",
    name: "Source of the Zambezi (Ikelenge)",
    category: "culture",
    categoryName: "Culture & Heritage",
    categoryIcon: "♨",
    provinceCode: "ZM-NW",
    provinceName: "North-Western Province",
    region: "North-Western Circuit",
    summary: "The sacred, forested birthplace where Africa's fourth-longest river begins its journey to the Indian Ocean.",
    imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82",
    latitude: -11.3667,
    longitude: 24.3167,
    ...projectCoords(-11.3667, 24.3167),
    highlights: ["Sacred Springhead Botanical Reserve", "Zambezi River Wooden Footbridge", "Lunda Royal Heritage", "Pineapple Farmlands"],
    price: "From ZMW 350",
    rating: 4.7
  },
  {
    id: "lusaka-heritage",
    slug: "lusaka-capital-circuit",
    name: "Lusaka City & Kabwata Cultural Village",
    category: "culture",
    categoryName: "Culture & Crafts",
    categoryIcon: "♨",
    provinceCode: "ZM-LUS",
    provinceName: "Lusaka Province",
    region: "Lusaka Central",
    summary: "Zambia's vibrant cosmopolitan capital featuring traditional artisan carving villages, wildlife sanctuaries, and top dining.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82",
    latitude: -15.4167,
    longitude: 28.2833,
    ...projectCoords(-15.4167, 28.2833),
    highlights: ["Kabwata Woodcarving Workshops", "Lusaka National Museum", "Elephant Orphanage Nursery", "Chitenge Fabric Bazaars"],
    price: "From ZMW 250",
    rating: 4.6
  },
  {
    id: "lochinvar-np",
    slug: "lochinvar-national-park",
    name: "Lochinvar National Park & Kafue Flats",
    category: "nature",
    categoryName: "Wetlands & Birding",
    categoryIcon: "◇",
    provinceCode: "ZM-SOU",
    provinceName: "Southern Province",
    region: "Southern Safari & Zambezi",
    summary: "World-renowned wetland paradise hosting over 420 bird species and massive herds of endemic Kafue Lechwe.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82",
    latitude: -15.9833,
    longitude: 27.2500,
    ...projectCoords(-15.9833, 27.2500),
    highlights: ["420+ Avian Species Birding", "Endemic Kafue Lechwe Herds", "Gwisho Prehistoric Hot Springs", "Chunga Lagoon Canoe Trails"],
    price: "From ZMW 850",
    rating: 4.7
  }
];

interface ZambiaInteractiveMapProps {
  onSelectDestination?: (slug: string) => void;
  onClose?: () => void;
}

export default function ZambiaInteractiveMap({ onSelectDestination, onClose }: ZambiaInteractiveMapProps) {
  const [selectedPin, setSelectedPin] = useState<MapDestinationPin | null>(ZAMBIA_TOURISM_PINS[0]);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  // Toggable Legend Categories (Multi-toggle state)
  const [visibleCategories, setVisibleCategories] = useState<{
    ceremony: boolean;
    nature: boolean;
    tours: boolean;
    stays: boolean;
    culture: boolean;
  }>({
    ceremony: true,
    nature: true,
    tours: true,
    stays: true,
    culture: true
  });

  // Toggable Map Layers
  const [showRivers, setShowRivers] = useState<boolean>(true);
  const [showBorders, setShowBorders] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [copiedGps, setCopiedGps] = useState<boolean>(false);

  const toggleCategory = (cat: keyof typeof visibleCategories) => {
    setVisibleCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const selectAllCategories = () => {
    setVisibleCategories({ ceremony: true, nature: true, tours: true, stays: true, culture: true });
    setSelectedProvinceCode("all");
    setSearchTerm("");
  };

  const filteredPins = useMemo(() => {
    return ZAMBIA_TOURISM_PINS.filter((pin) => {
      const catKey = pin.category as keyof typeof visibleCategories;
      const isCatEnabled = visibleCategories[catKey] ?? true;
      if (!isCatEnabled) return false;

      const matchProv = selectedProvinceCode === "all" || pin.provinceCode === selectedProvinceCode;

      const matchSearch =
        !searchTerm.trim() ||
        pin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pin.provinceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pin.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pin.royalHost && pin.royalHost.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (pin.sacredRegalia && pin.sacredRegalia.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pin.highlights.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchProv && matchSearch;
    });
  }, [visibleCategories, selectedProvinceCode, searchTerm]);

  const handleCopyGps = (lat: number, lon: number) => {
    const text = `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`;
    try {
      navigator.clipboard.writeText(text);
      setCopiedGps(true);
      setTimeout(() => setCopiedGps(false), 2000);
    } catch {}
  };

  const ceremonyCount = useMemo(() => {
    return ZAMBIA_TOURISM_PINS.filter(p => p.category === "ceremony").length;
  }, []);

  return (
    <div className="zambiaMapWrapper">
      {/* Map Header */}
      <div className="zambiaMapHeader">
        <div>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "rgba(37, 211, 102, 1)", textTransform: "uppercase" }}>
            🗺️ AUTHENTIC GEOGRAPHIC EXPLORER
          </span>
          <h2 style={{ fontSize: "20px", margin: "4px 0 0", color: "var(--brand-white)", fontWeight: 700 }}>
            Real Map of Zambia · Safaris & Traditional Ceremonies
          </h2>
          <p style={{ margin: "3px 0 0", fontSize: "12px", color: "rgba(255, 255, 255, 0.75)" }}>
            Click on any province or toggable legend to filter royal ceremonies, national parks, lakes, and rivers.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.08)", borderRadius: "8px", padding: "6px 12px", border: "1px solid rgba(255,255,255,0.15)" }}>
            <span style={{ marginRight: "6px" }}>🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Kuomboka, Nc'wala, Falls, Kafue..."
              style={{ background: "transparent", border: "none", color: "var(--brand-white)", outline: "none", fontSize: "13px", width: "210px" }}
            />
            {searchTerm && <button onClick={() => setSearchTerm("")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>×</button>}
          </div>
          {onClose && (
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "var(--brand-white)", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
              Close ×
            </button>
          )}
        </div>
      </div>

      {/* TOGGABLE LEGENDS PANEL (Interactive Filters) */}
      <div style={{ background: "rgba(6, 20, 20, 0.95)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(37, 211, 102, 1)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Interactive Toggable Legends:
          </span>
          <button
            type="button"
            onClick={selectAllCategories}
            style={{ background: "transparent", border: "none", color: "rgba(255, 255, 255, 0.6)", fontSize: "11px", textDecoration: "underline", cursor: "pointer" }}
          >
            Show All
          </button>
        </div>

        {/* Category Toggle Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => toggleCategory("ceremony")}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              border: visibleCategories.ceremony ? "1px solid rgba(245, 158, 11, 1)" : "1px solid rgba(255, 255, 255, 0.15)",
              background: visibleCategories.ceremony ? "rgba(245, 158, 11, 0.25)" : "rgba(255, 255, 255, 0.05)",
              color: visibleCategories.ceremony ? "rgba(251, 191, 36, 1)" : "rgba(255, 255, 255, 0.4)"
            }}
          >
            <span>{visibleCategories.ceremony ? "✓" : "○"}</span>
            <span>👑 Traditional Ceremonies ({ceremonyCount})</span>
          </button>

          <button
            type="button"
            onClick={() => toggleCategory("tours")}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              border: visibleCategories.tours ? "1px solid rgba(16, 185, 129, 1)" : "1px solid rgba(255, 255, 255, 0.15)",
              background: visibleCategories.tours ? "rgba(16, 185, 129, 0.25)" : "rgba(255, 255, 255, 0.05)",
              color: visibleCategories.tours ? "rgba(52, 211, 153, 1)" : "rgba(255, 255, 255, 0.4)"
            }}
          >
            <span>{visibleCategories.tours ? "✓" : "○"}</span>
            <span>◒ Safari Game Drives</span>
          </button>

          <button
            type="button"
            onClick={() => toggleCategory("nature")}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              border: visibleCategories.nature ? "1px solid rgba(6, 182, 212, 1)" : "1px solid rgba(255, 255, 255, 0.15)",
              background: visibleCategories.nature ? "rgba(6, 182, 212, 0.25)" : "rgba(255, 255, 255, 0.05)",
              color: visibleCategories.nature ? "rgba(103, 232, 249, 1)" : "rgba(255, 255, 255, 0.4)"
            }}
          >
            <span>{visibleCategories.nature ? "✓" : "○"}</span>
            <span>◇ Waterfalls & Lakes</span>
          </button>

          <button
            type="button"
            onClick={() => toggleCategory("stays")}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              border: visibleCategories.stays ? "1px solid rgba(234, 88, 12, 1)" : "1px solid rgba(255, 255, 255, 0.15)",
              background: visibleCategories.stays ? "rgba(234, 88, 12, 0.25)" : "rgba(255, 255, 255, 0.05)",
              color: visibleCategories.stays ? "rgba(251, 146, 60, 1)" : "rgba(255, 255, 255, 0.4)"
            }}
          >
            <span>{visibleCategories.stays ? "✓" : "○"}</span>
            <span>⌂ Luxury Lodges</span>
          </button>

          <button
            type="button"
            onClick={() => toggleCategory("culture")}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              border: visibleCategories.culture ? "1px solid rgba(236, 72, 153, 1)" : "1px solid rgba(255, 255, 255, 0.15)",
              background: visibleCategories.culture ? "rgba(236, 72, 153, 0.25)" : "rgba(255, 255, 255, 0.05)",
              color: visibleCategories.culture ? "rgba(244, 114, 182, 1)" : "rgba(255, 255, 255, 0.4)"
            }}
          >
            <span>{visibleCategories.culture ? "✓" : "○"}</span>
            <span>♨ Cultural Sites</span>
          </button>

          {/* Map Layer Toggles */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setShowRivers(!showRivers)}
              style={{
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 600,
                border: "1px solid rgba(14, 165, 233, 0.4)",
                background: showRivers ? "rgba(14, 165, 233, 0.2)" : "transparent",
                color: showRivers ? "rgba(56, 189, 248, 1)" : "rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}
            >
              🌊 Rivers {showRivers ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => setShowBorders(!showBorders)}
              style={{
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 600,
                border: "1px solid rgba(37, 211, 102, 0.4)",
                background: showBorders ? "rgba(37, 211, 102, 0.2)" : "transparent",
                color: showBorders ? "rgba(37, 211, 102, 1)" : "rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}
            >
              🗺️ Provinces {showBorders ? "ON" : "OFF"}
            </button>
            <select
              value={selectedProvinceCode}
              onChange={(e) => setSelectedProvinceCode(e.target.value)}
              style={{ background: "rgba(16, 51, 51, 1)", color: "var(--brand-white)", border: "1px solid rgba(255,255,255,0.2)", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", outline: "none" }}
            >
              <option value="all">All 10 Provinces</option>
              {ZAMBIA_PROVINCES.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Map Body: Full-Width Stacked Layout */}
      <div className="zambiaMapBody">
        {/* Real Zambia SVG Map Canvas */}
        <div className="zambiaMapCanvasWrapper">
          {/* Compass Rose */}
          <div style={{ position: "absolute", top: "16px", left: "18px", opacity: 0.9, pointerEvents: "none", textAlign: "center", fontSize: "11px", fontWeight: 800, color: "rgba(37, 211, 102, 1)", zIndex: 5 }}>
            <span style={{ fontSize: "20px", display: "block" }}>🧭</span>
            <span>NORTH</span>
          </div>

          {/* Map Scale Bar */}
          <div style={{ position: "absolute", bottom: "18px", right: "18px", background: "rgba(0,0,0,0.75)", padding: "4px 8px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.15)", fontSize: "10px", color: "rgba(255,255,255,0.8)", pointerEvents: "none", zIndex: 5 }}>
            <span>Scale: ~200 km</span>
          </div>

          <svg
            viewBox="0 0 960 720"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "380px",
              maxHeight: "600px",
              filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.65))",
              pointerEvents: "auto"
            }}
          >
            <defs>
              <linearGradient id="zambiaLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(16, 52, 52, 1)" />
                <stop offset="50%" stopColor="rgba(10, 36, 36, 1)" />
                <stop offset="100%" stopColor="rgba(6, 24, 24, 1)" />
              </linearGradient>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(14, 165, 233, 0.85)" />
                <stop offset="100%" stopColor="rgba(2, 132, 199, 0.95)" />
              </linearGradient>
            </defs>

            {/* REAL AUTHENTIC ZAMBIA COUNTRY OUTLINE (True Geographic Border with Congo Pedicle, Lake Tanganyika, Kariba & Barotseland) */}
            <path
              d="
                M 342 652 
                C 300 646, 260 635, 238 627 
                C 200 610, 175 580, 168 555 
                C 150 515, 130 480, 126 475 
                C 120 440, 124 425, 126 415 
                C 135 340, 160 290, 203 263 
                C 215 245, 225 235, 231 232 
                C 290 240, 380 260, 481 311 
                C 510 330, 525 345, 536 354 
                C 530 310, 520 260, 543 159 
                C 540 145, 538 135, 543 129 
                C 570 110, 640 90, 703 80 
                C 740 90, 780 110, 821 129 
                C 840 180, 845 220, 848 245 
                C 850 310, 835 360, 821 391 
                C 780 430, 720 480, 661 512 
                C 620 535, 570 555, 543 567 
                C 500 590, 470 605, 453 609 
                C 400 635, 370 648, 342 652 
                Z
              "
              fill="url(#zambiaLandGradient)"
              stroke="rgba(37, 211, 102, 0.95)"
              strokeWidth="3.5"
            />

            {/* 10 AUTHENTIC PROVINCIAL POLYGONS WITH REAL GEOGRAPHIC BOUNDARIES */}
            {showBorders && (
              <g opacity="0.88">
                {/* Western Province (Barotseland / Mongu / Liuwa) */}
                <path
                  d="M 126 415 C 135 340, 160 290, 203 263 L 290 350 L 340 480 L 300 600 L 238 627 C 200 610, 175 580, 168 555 C 150 515, 130 480, 126 475 Z"
                  fill={hoveredProvince === "ZM-WES" || selectedProvinceCode === "ZM-WES" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-WES")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-WES" ? "all" : "ZM-WES")}
                  style={{ cursor: "pointer" }}
                />

                {/* North-Western Province (Solwezi / Zambezi / Source of Zambezi) */}
                <path
                  d="M 203 263 C 215 245, 225 235, 231 232 C 290 240, 360 250, 420 280 L 400 370 L 290 350 Z"
                  fill={hoveredProvince === "ZM-NW" || selectedProvinceCode === "ZM-NW" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-NW")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-NW" ? "all" : "ZM-NW")}
                  style={{ cursor: "pointer" }}
                />

                {/* Copperbelt Province (Ndola / Kitwe / Sakania border) */}
                <path
                  d="M 420 280 C 450 295, 470 305, 481 311 C 510 330, 525 345, 536 354 L 480 390 L 400 370 Z"
                  fill={hoveredProvince === "ZM-COP" || selectedProvinceCode === "ZM-COP" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-COP")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-COP" ? "all" : "ZM-COP")}
                  style={{ cursor: "pointer" }}
                />

                {/* Central Province (Kabwe / Serenje / Kafue NP) */}
                <path
                  d="M 290 350 L 400 370 L 480 390 L 560 410 L 540 470 L 460 480 L 340 480 Z"
                  fill={hoveredProvince === "ZM-CEN" || selectedProvinceCode === "ZM-CEN" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-CEN")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-CEN" ? "all" : "ZM-CEN")}
                  style={{ cursor: "pointer" }}
                />

                {/* Lusaka Province (Capital & Chongwe) */}
                <path
                  d="M 460 480 L 540 470 L 590 530 L 510 550 L 460 510 Z"
                  fill={hoveredProvince === "ZM-LUS" || selectedProvinceCode === "ZM-LUS" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-LUS")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-LUS" ? "all" : "ZM-LUS")}
                  style={{ cursor: "pointer" }}
                />

                {/* Southern Province (Livingstone / Victoria Falls / Lake Kariba / Monze) */}
                <path
                  d="M 238 627 L 300 600 L 340 480 L 460 510 L 510 550 L 543 567 C 500 590, 470 605, 453 609 C 400 635, 370 648, 342 652 Z"
                  fill={hoveredProvince === "ZM-SOU" || selectedProvinceCode === "ZM-SOU" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-SOU")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-SOU" ? "all" : "ZM-SOU")}
                  style={{ cursor: "pointer" }}
                />

                {/* Eastern Province (Chipata / South Luangwa / Petauke) */}
                <path
                  d="M 560 410 L 720 340 L 821 391 C 780 430, 720 480, 661 512 L 590 530 L 540 470 Z"
                  fill={hoveredProvince === "ZM-EAS" || selectedProvinceCode === "ZM-EAS" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-EAS")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-EAS" ? "all" : "ZM-EAS")}
                  style={{ cursor: "pointer" }}
                />

                {/* Luapula Province (Mansabombwe / Mwata Kingdom / Samfya) */}
                <path
                  d="M 536 354 C 530 310, 520 260, 543 159 C 540 145, 538 135, 543 129 L 600 160 L 610 260 L 560 360 Z"
                  fill={hoveredProvince === "ZM-LUA" || selectedProvinceCode === "ZM-LUA" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-LUA")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-LUA" ? "all" : "ZM-LUA")}
                  style={{ cursor: "pointer" }}
                />

                {/* Northern Province (Kasama / Lake Tanganyika / Mpulungu / Mbala) */}
                <path
                  d="M 543 129 C 570 110, 640 90, 703 80 L 730 150 L 680 230 L 600 160 Z"
                  fill={hoveredProvince === "ZM-NOR" || selectedProvinceCode === "ZM-NOR" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-NOR")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-NOR" ? "all" : "ZM-NOR")}
                  style={{ cursor: "pointer" }}
                />

                {/* Muchinga Province (Mpika / Shiwa Ng'andu / Chama) */}
                <path
                  d="M 703 80 C 740 90, 780 110, 821 129 C 840 180, 845 220, 848 245 L 720 340 L 560 410 L 610 260 L 680 230 L 730 150 Z"
                  fill={hoveredProvince === "ZM-MUC" || selectedProvinceCode === "ZM-MUC" ? "rgba(37, 211, 102, 0.25)" : "rgba(255, 255, 255, 0.02)"}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  onMouseEnter={() => setHoveredProvince("ZM-MUC")}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvinceCode(selectedProvinceCode === "ZM-MUC" ? "all" : "ZM-MUC")}
                  style={{ cursor: "pointer" }}
                />
              </g>
            )}

            {/* REAL RIVERS & LAKES (Zambezi, Kafue, Luangwa, Tanganyika, Kariba, Bangweulu, Mweru) */}
            {showRivers && (
              <g>
                {/* Lake Tanganyika (Deep Blue North Horn) */}
                <path
                  d="M 685 70 C 705 78, 730 95, 725 120 C 700 95, 680 80, 685 70 Z"
                  fill="url(#waterGradient)"
                  stroke="rgba(56, 189, 248, 1)"
                  strokeWidth="1.5"
                />
                <text x="690" y="65" fill="rgba(56, 189, 248, 1)" fontSize="9.5" fontWeight="800">LAKE TANGANYIKA</text>

                {/* Lake Mweru (North Luapula) */}
                <ellipse cx="550" cy="115" rx="14" ry="24" fill="url(#waterGradient)" stroke="rgba(56, 189, 248, 0.85)" strokeWidth="1" />
                <text x="525" y="118" fill="rgba(255,255,255,0.85)" fontSize="8" fontWeight="700">L. MWERU</text>

                {/* Lake Bangweulu & Swamps */}
                <ellipse cx="585" cy="245" rx="30" ry="18" fill="url(#waterGradient)" stroke="rgba(56, 189, 248, 0.85)" strokeWidth="1" />
                <text x="555" y="248" fill="rgba(255,255,255,0.9)" fontSize="8" fontWeight="700">L. BANGWEULU</text>

                {/* Lake Kariba (Southern Blue Reservoir) */}
                <path
                  d="M 453 609 C 485 590, 520 575, 543 567 C 520 595, 480 615, 453 609 Z"
                  fill="url(#waterGradient)"
                  stroke="rgba(56, 189, 248, 1)"
                  strokeWidth="1.5"
                />
                <text x="470" y="605" fill="rgba(56, 189, 248, 1)" fontSize="9.5" fontWeight="800">LAKE KARIBA</text>

                {/* Zambezi River Course */}
                <path
                  d="M 231 232 C 160 320, 126 415, 140 490 C 160 560, 238 627, 342 652 C 453 609, 543 567, 661 512"
                  fill="none"
                  stroke="rgba(14, 165, 233, 0.95)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <text x="180" y="530" fill="rgba(56, 189, 248, 0.9)" fontSize="9" fontWeight="700" transform="rotate(-65 180 530)">ZAMBEZI RIVER</text>

                {/* Kafue River */}
                <path
                  d="M 420 300 C 340 380, 360 480, 480 505"
                  fill="none"
                  stroke="rgba(14, 165, 233, 0.8)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <text x="350" y="430" fill="rgba(56, 189, 248, 0.85)" fontSize="8" fontWeight="700" transform="rotate(75 350 430)">KAFUE RIVER</text>

                {/* Luangwa River */}
                <path
                  d="M 780 180 C 740 310, 680 430, 661 512"
                  fill="none"
                  stroke="rgba(14, 165, 233, 0.8)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <text x="710" y="340" fill="rgba(56, 189, 248, 0.85)" fontSize="8" fontWeight="700" transform="rotate(-60 710 340)">LUANGWA RIVER</text>
              </g>
            )}

            {/* PROVINCE LABELS */}
            {showLabels && (
              <g pointerEvents="none">
                <text x="180" y="440" fill="rgba(255,255,255,0.45)" fontSize="12" fontWeight="800">WESTERN</text>
                <text x="270" y="310" fill="rgba(255,255,255,0.45)" fontSize="11" fontWeight="800">NORTH-WESTERN</text>
                <text x="430" y="340" fill="rgba(255,255,255,0.45)" fontSize="10" fontWeight="800">COPPERBELT</text>
                <text x="400" y="440" fill="rgba(255,255,255,0.45)" fontSize="11" fontWeight="800">CENTRAL</text>
                <text x="480" y="500" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="800">LUSAKA</text>
                <text x="360" y="570" fill="rgba(255,255,255,0.45)" fontSize="12" fontWeight="800">SOUTHERN</text>
                <text x="700" y="450" fill="rgba(255,255,255,0.45)" fontSize="12" fontWeight="800">EASTERN</text>
                <text x="545" y="210" fill="rgba(255,255,255,0.45)" fontSize="11" fontWeight="800">LUAPULA</text>
                <text x="630" y="160" fill="rgba(255,255,255,0.45)" fontSize="11" fontWeight="800">NORTHERN</text>
                <text x="690" y="280" fill="rgba(255,255,255,0.45)" fontSize="11" fontWeight="800">MUCHINGA</text>
              </g>
            )}

            {/* REAL GPS INTERACTIVE DESTINATION & CEREMONY PINS */}
            {filteredPins.map((pin) => {
              const isSelected = selectedPin?.id === pin.id;
              const isCeremony = pin.category === "ceremony";
              const pinColor =
                pin.category === "ceremony" ? "rgba(245, 158, 11, 1)" :
                pin.category === "stays" ? "rgba(234, 88, 12, 1)" :
                pin.category === "tours" ? "rgba(16, 185, 129, 1)" :
                pin.category === "nature" ? "rgba(6, 182, 212, 1)" :
                pin.category === "culture" ? "rgba(236, 72, 153, 1)" : "rgba(168, 85, 247, 1)";

              return (
                <g
                  key={pin.id}
                  transform={`translate(${pin.x}, ${pin.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPin(pin);
                  }}
                  style={{ cursor: "pointer", pointerEvents: "all" }}
                >
                  <circle r="28" fill="transparent" />

                  {/* Pulsing radar ring for selected pin */}
                  {isSelected && (
                    <circle r="22" fill="none" stroke={isCeremony ? "rgba(245, 158, 11, 1)" : "rgba(37, 211, 102, 1)"} strokeWidth="3" opacity="0.9">
                      <animate attributeName="r" values="16;28;16" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Ceremony special aura ring */}
                  {isCeremony && !isSelected && (
                    <circle r="16" fill="none" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
                  )}

                  {/* Pin Background Circle */}
                  <circle
                    r={isSelected ? "15" : isCeremony ? "13" : "11"}
                    fill={isSelected ? (isCeremony ? "rgba(245, 158, 11, 1)" : "rgba(37, 211, 102, 1)") : pinColor}
                    stroke="rgba(255, 255, 255, 1)"
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    filter="drop-shadow(0 3px 6px rgba(0,0,0,0.65))"
                  />

                  {/* Pin Category Icon */}
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill={isSelected ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)"}
                    fontSize={isSelected ? "11" : "9"}
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    {pin.categoryIcon}
                  </text>

                  {/* Pin Name Badge */}
                  <rect
                    x="-50"
                    y={isSelected ? "-34" : "-26"}
                    width="100"
                    height="17"
                    rx="5"
                    fill="rgba(0, 0, 0, 0.88)"
                    stroke={isSelected ? (isCeremony ? "rgba(245, 158, 11, 1)" : "rgba(37, 211, 102, 1)") : "rgba(255,255,255,0.25)"}
                    strokeWidth={isSelected ? "1.5" : "1"}
                    pointerEvents="none"
                  />
                  <text
                    x="0"
                    y={isSelected ? "-22" : "-14"}
                    textAnchor="middle"
                    fill={isCeremony ? "rgba(251, 191, 36, 1)" : "rgba(255,255,255,1)"}
                    fontSize="9.5"
                    fontWeight={isSelected ? "800" : "600"}
                    pointerEvents="none"
                  >
                    {pin.name.length > 16 ? pin.name.slice(0, 15) + "…" : pin.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Real Circuits Strip */}
          <div className="zambiaMapCircuitsBar">
            <span style={{ fontWeight: 700, color: "rgba(37, 211, 102, 1)", marginRight: "4px" }}>Safaris & Royal Circuits:</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "rgba(245, 158, 11, 1)", display: "inline-block" }} />
              <span>👑 Traditional Ceremonies</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(16, 185, 129, 1)", display: "inline-block" }} />
              <span>Southern (Livingstone / Kariba)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(6, 182, 212, 1)", display: "inline-block" }} />
              <span>Luangwa Valley (Mfuwe)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(59, 130, 246, 1)", display: "inline-block" }} />
              <span>Northern Lakes (Tanganyika / Bangweulu)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(139, 92, 246, 1)", display: "inline-block" }} />
              <span>Greater Kafue & Barotseland</span>
            </div>
          </div>
        </div>

        {/* Selected Destination Preview Drawer with FULL GPS Details */}
        <div className="zambiaMapDetailPanel">
          {selectedPin ? (
            <div>
              <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", marginBottom: "14px", height: "180px", background: "rgba(0,0,0,1)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPin.imageUrl}
                  alt={selectedPin.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(0,0,0,0.85)", color: selectedPin.category === "ceremony" ? "rgba(251, 191, 36, 1)" : "rgba(37, 211, 102, 1)", fontSize: "11px", fontWeight: 800, padding: "4px 9px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)" }}>
                  {selectedPin.categoryIcon} {selectedPin.categoryName}
                </span>
                <span style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,0.85)", color: "rgba(250, 204, 21, 1)", fontSize: "12px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px" }}>
                  ★ {selectedPin.rating.toFixed(1)}
                </span>
              </div>

              {/* Province & Region */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(37, 211, 102, 1)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {selectedPin.provinceName} · {selectedPin.region}
                </span>
              </div>

              {/* Exact GPS Coordinates Bar */}
              <div className="zambiaGpsBadge">
                <span>📍 GPS: {selectedPin.latitude.toFixed(4)}° S, {selectedPin.longitude.toFixed(4)}° E</span>
                <button
                  type="button"
                  onClick={() => handleCopyGps(selectedPin.latitude, selectedPin.longitude)}
                  style={{ background: "none", border: "none", color: "var(--brand-white)", cursor: "pointer", fontSize: "10px", textDecoration: "underline", padding: "0 2px" }}
                >
                  {copiedGps ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <h3 style={{ fontSize: "19px", margin: "10px 0 6px", color: "var(--brand-white)", fontWeight: 700, lineHeight: 1.3 }}>
                {selectedPin.name}
              </h3>

              {/* Royal Host / Lineage if ceremony */}
              {selectedPin.royalHost && (
                <div style={{ background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "8px", padding: "8px 12px", margin: "10px 0", fontSize: "12px" }}>
                  <strong style={{ color: "rgba(251, 191, 36, 1)", display: "block", marginBottom: "2px" }}>👑 Royal Host & Palace:</strong>
                  <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>{selectedPin.royalHost}</span>
                </div>
              )}

              {/* Ceremony Season / Timing */}
              {selectedPin.season && (
                <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.8)", marginBottom: "8px" }}>
                  <strong style={{ color: "rgba(37, 211, 102, 1)" }}>📅 Best Season / Month:</strong> {selectedPin.season}
                </div>
              )}

              {/* Sacred Regalia */}
              {selectedPin.sacredRegalia && (
                <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.8)", marginBottom: "8px" }}>
                  <strong style={{ color: "rgba(251, 191, 36, 1)" }}>🛡️ Sacred Regalia:</strong> {selectedPin.sacredRegalia}
                </div>
              )}

              {/* Dress Code */}
              {selectedPin.dressCode && (
                <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.8)", marginBottom: "10px" }}>
                  <strong style={{ color: "rgba(37, 211, 102, 1)" }}>👗 Visitor Dress Code:</strong> {selectedPin.dressCode}
                </div>
              )}

              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.55, margin: "0 0 14px" }}>
                {selectedPin.summary}
              </p>

              <div style={{ marginBottom: "14px" }}>
                <strong style={{ fontSize: "12px", color: "var(--brand-white)", display: "block", marginBottom: "6px" }}>
                  {selectedPin.category === "ceremony" ? "Ceremonial Highlights & Rituals:" : "Key Highlights & Activities:"}
                </strong>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "rgba(255,255,255,0.8)", lineHeight: 1.65 }}>
                  {selectedPin.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              {selectedPin.price && (
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>Visitor Access & Rates:</span>
                  <strong style={{ fontSize: "14px", color: selectedPin.category === "ceremony" ? "rgba(251, 191, 36, 1)" : "rgba(37, 211, 102, 1)" }}>{selectedPin.price}</strong>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 10px", color: "rgba(255,255,255,0.5)" }}>
              <span style={{ fontSize: "36px", display: "block", marginBottom: "10px" }}>📍</span>
              <p>Click on any pin on the map to inspect safari details, royal ceremonies, GPS points, and bookings.</p>
            </div>
          )}

          {selectedPin && (
            <button
              type="button"
              onClick={() => {
                if (onSelectDestination) {
                  onSelectDestination(selectedPin.slug);
                } else {
                  window.location.href = `/?q=${encodeURIComponent(selectedPin.name)}`;
                }
              }}
              style={{
                width: "100%",
                background: selectedPin.category === "ceremony"
                  ? "linear-gradient(135deg, rgba(245, 158, 11, 1) 0%, rgba(217, 119, 6, 1) 100%)"
                  : "linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 100%)",
                color: selectedPin.category === "ceremony" ? "rgba(0,0,0,1)" : "var(--brand-white)",
                border: "none",
                padding: "13px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)"
              }}
            >
              Explore {selectedPin.name.split(" ")[0]} Listings & Passes →
            </button>
          )}
        </div>
      </div>

      {/* Quick Selection Tray: All Ceremonies & Safari Destinations */}
      <div className="zambiaMapCardsTray">
        <div className="zambiaMapCardsHeader">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "16px" }}>📍</span>
            <strong style={{ fontSize: "13px", color: "var(--brand-white)" }}>
              Select Any Point on Map ({filteredPins.length} Locations Available):
            </strong>
          </div>
          <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
            Click to center and view full ceremony details
          </span>
        </div>

        <div className="zambiaMapCardsScroll">
          {filteredPins.map((pin) => {
            const isSelected = selectedPin?.id === pin.id;
            return (
              <div
                key={pin.id}
                className={`zambiaMiniCard ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedPin(pin)}
              >
                <div style={{ height: "90px", width: "100%", position: "relative", overflow: "hidden", background: "rgba(0,0,0,0.5)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pin.imageUrl}
                    alt={pin.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span style={{ position: "absolute", top: "6px", left: "6px", background: "rgba(0,0,0,0.8)", fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", color: pin.category === "ceremony" ? "rgba(251, 191, 36, 1)" : "rgba(37, 211, 102, 1)" }}>
                    {pin.categoryIcon} {pin.category === "ceremony" ? "Ceremony" : pin.categoryName.split(" ")[0]}
                  </span>
                </div>
                <div style={{ padding: "8px 10px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 700, fontSize: "11.5px", color: isSelected ? "rgba(37, 211, 102, 1)" : "var(--brand-white)", lineHeight: 1.3, marginBottom: "4px" }}>
                    {pin.name}
                  </div>
                  <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,0.6)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{pin.provinceName.split(" ")[0]}</span>
                    <span>📍 {pin.latitude.toFixed(1)}°, {pin.longitude.toFixed(1)}°</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

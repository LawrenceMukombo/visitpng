"use client";

import { useState, useMemo, useRef } from "react";
import { ZAMBIA_PROVINCES } from "../../db/zambiaGeography";
import {
  projectGpsToSvg,
  ZAMBIA_COUNTRY_OUTLINE_PATH,
  ZAMBIA_PROVINCES_SHAPEFILES,
  ZAMBIA_NATIONAL_PARKS_GIS,
  ZAMBIA_WATERBODIES_GIS,
  ZAMBIA_HIGHWAYS_GIS
} from "../../db/zambiaShapefilesData";

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
  royalHost?: string;
  season?: string;
  sacredRegalia?: string;
  dressCode?: string;
  highlights: string[];
  price?: string;
  rating: number;
  slug: string;
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
  const [showParks, setShowParks] = useState<boolean>(true);
  const [showRivers, setShowRivers] = useState<boolean>(true);
  const [showHighways, setShowHighways] = useState<boolean>(true);
  const [showBorders, setShowBorders] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [copiedGps, setCopiedGps] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleCategory = (cat: keyof typeof visibleCategories) => {
    setVisibleCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const selectAllCategories = () => {
    setVisibleCategories({ ceremony: true, nature: true, tours: true, stays: true, culture: true });
    setSelectedProvinceCode("all");
    setSearchTerm("");
    setShowParks(true);
    setShowRivers(true);
    setShowHighways(true);
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

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.2, Math.max(0.85, Number((prev + delta).toFixed(2)))));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div
      ref={mapContainerRef}
      className={`zambiaMapWrapper ${isFullscreen ? "fullscreenMode" : ""}`}
      style={{
        background: "linear-gradient(180deg, rgba(8, 26, 26, 0.98) 0%, rgba(4, 16, 16, 1) 100%)",
        borderRadius: isFullscreen ? "0" : "18px",
        border: "1px solid rgba(37, 211, 102, 0.25)",
        boxShadow: "0 20px 45px rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
        position: isFullscreen ? "fixed" : "relative",
        top: isFullscreen ? "0" : "auto",
        left: isFullscreen ? "0" : "auto",
        right: isFullscreen ? "0" : "auto",
        bottom: isFullscreen ? "0" : "auto",
        zIndex: isFullscreen ? 99999 : 1,
        width: "100%",
        maxWidth: isFullscreen ? "100vw" : "100%"
      }}
    >
      {/* Map Header with Real GIS Tag & Search */}
      <div className="zambiaMapHeader" style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", background: "rgba(10, 32, 32, 0.95)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "rgba(37, 211, 102, 1)", textTransform: "uppercase" }}>
              🗺️ OFFICIAL ZAMBIA GEODETIC SHAPEFILE MAP (WGS84)
            </span>
            <span style={{ fontSize: "10px", background: "rgba(37, 211, 102, 0.2)", color: "rgba(37, 211, 102, 1)", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>
              10 Provinces · 9 National Parks · 4 Rivers · 4 Lakes
            </span>
          </div>
          <h2 style={{ fontSize: "21px", margin: "4px 0 0", color: "var(--brand-white)", fontWeight: 800 }}>
            Real Map of Zambia · Royal Ceremonies & Safari Ecosystem
          </h2>
          <p style={{ margin: "3px 0 0", fontSize: "12.5px", color: "rgba(255, 255, 255, 0.8)" }}>
            Rendered from authentic national geodata shapefiles with millimeter-precision GPS, interactive provincial borders, and live layers.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.08)", borderRadius: "8px", padding: "6px 12px", border: "1px solid rgba(255,255,255,0.15)" }}>
            <span style={{ marginRight: "6px" }}>🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Kuomboka, South Luangwa, Devil's Pool..."
              style={{ background: "transparent", border: "none", color: "var(--brand-white)", outline: "none", fontSize: "13px", width: "230px" }}
            />
            {searchTerm && <button onClick={() => setSearchTerm("")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>×</button>}
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "var(--brand-white)",
              padding: "7px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 700
            }}
          >
            {isFullscreen ? "⤓ Normal View" : "⤢ Expand Map"}
          </button>

          {onClose && (
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "var(--brand-white)", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
              Close ×
            </button>
          )}
        </div>
      </div>

      {/* TOGGABLE LEGENDS & SHAPEFILE LAYERS BAR */}
      <div style={{ background: "rgba(6, 20, 20, 0.95)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", padding: "12px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(37, 211, 102, 1)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Toggable GIS Layers & Destination Categories:
          </span>
          <button
            type="button"
            onClick={selectAllCategories}
            style={{ background: "transparent", border: "none", color: "rgba(255, 255, 255, 0.7)", fontSize: "11px", textDecoration: "underline", cursor: "pointer" }}
          >
            Reset All Layers
          </button>
        </div>

        {/* Category Toggle Chips & Layer Toggles */}
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
            <span>👑 Royal Ceremonies ({ceremonyCount})</span>
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

          {/* GIS Shapefile Layer Toggles */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setShowParks(!showParks)}
              style={{
                padding: "5px 9px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                border: "1px solid rgba(34, 197, 94, 0.5)",
                background: showParks ? "rgba(34, 197, 94, 0.25)" : "transparent",
                color: showParks ? "rgba(74, 222, 128, 1)" : "rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}
            >
              🦁 National Parks {showParks ? "ON" : "OFF"}
            </button>

            <button
              type="button"
              onClick={() => setShowRivers(!showRivers)}
              style={{
                padding: "5px 9px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                border: "1px solid rgba(14, 165, 233, 0.5)",
                background: showRivers ? "rgba(14, 165, 233, 0.25)" : "transparent",
                color: showRivers ? "rgba(56, 189, 248, 1)" : "rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}
            >
              🌊 Lakes & Rivers {showRivers ? "ON" : "OFF"}
            </button>

            <button
              type="button"
              onClick={() => setShowHighways(!showHighways)}
              style={{
                padding: "5px 9px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                border: "1px solid rgba(234, 179, 8, 0.5)",
                background: showHighways ? "rgba(234, 179, 8, 0.25)" : "transparent",
                color: showHighways ? "rgba(250, 204, 21, 1)" : "rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}
            >
              🛣️ Highways {showHighways ? "ON" : "OFF"}
            </button>

            <button
              type="button"
              onClick={() => setShowBorders(!showBorders)}
              style={{
                padding: "5px 9px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                border: "1px solid rgba(37, 211, 102, 0.5)",
                background: showBorders ? "rgba(37, 211, 102, 0.25)" : "transparent",
                color: showBorders ? "rgba(37, 211, 102, 1)" : "rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}
            >
              🗺️ Provinces {showBorders ? "ON" : "OFF"}
            </button>

            <button
              type="button"
              onClick={() => setShowLabels(!showLabels)}
              style={{
                padding: "5px 9px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                border: "1px solid rgba(255, 255, 255, 0.3)",
                background: showLabels ? "rgba(255, 255, 255, 0.2)" : "transparent",
                color: showLabels ? "var(--brand-white)" : "rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}
            >
              🏷️ Labels {showLabels ? "ON" : "OFF"}
            </button>

            <select
              value={selectedProvinceCode}
              onChange={(e) => setSelectedProvinceCode(e.target.value)}
              style={{ background: "rgba(16, 51, 51, 1)", color: "var(--brand-white)", border: "1px solid rgba(255,255,255,0.2)", padding: "5px 10px", borderRadius: "6px", fontSize: "11.5px", outline: "none", fontWeight: 700 }}
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

      {/* Main Map Body: Full-Width Stacked Responsive Layout */}
      <div className="zambiaMapBody">
        {/* Real Zambia SVG Map Canvas */}
        <div className="zambiaMapCanvasWrapper">
          {/* Compass Rose */}
          <div style={{ position: "absolute", top: "16px", left: "18px", opacity: 0.9, pointerEvents: "none", textAlign: "center", fontSize: "11px", fontWeight: 800, color: "rgba(37, 211, 102, 1)", zIndex: 5 }}>
            <span style={{ fontSize: "20px", display: "block" }}>🧭</span>
            <span>NORTH</span>
          </div>

          {/* Zoom & Reset Controls */}
          <div style={{ position: "absolute", top: "18px", right: "20px", display: "flex", flexDirection: "column", gap: "6px", zIndex: 10 }}>
            <button
              type="button"
              onClick={() => handleZoom(0.2)}
              title="Zoom In"
              style={{ width: "32px", height: "32px", borderRadius: "6px", background: "rgba(0,0,0,0.75)", color: "var(--brand-white)", border: "1px solid rgba(255,255,255,0.25)", fontSize: "16px", fontWeight: 800, cursor: "pointer" }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-0.2)}
              title="Zoom Out"
              style={{ width: "32px", height: "32px", borderRadius: "6px", background: "rgba(0,0,0,0.75)", color: "var(--brand-white)", border: "1px solid rgba(255,255,255,0.25)", fontSize: "16px", fontWeight: 800, cursor: "pointer" }}
            >
              −
            </button>
            <button
              type="button"
              onClick={resetZoom}
              title="Reset Zoom"
              style={{ width: "32px", height: "32px", borderRadius: "6px", background: "rgba(0,0,0,0.75)", color: "rgba(37, 211, 102, 1)", border: "1px solid rgba(255,255,255,0.25)", fontSize: "12px", fontWeight: 800, cursor: "pointer" }}
            >
              ⟲
            </button>
          </div>

          {/* Map Scale & Projection Bar */}
          <div style={{ position: "absolute", bottom: "16px", left: "20px", background: "rgba(0,0,0,0.8)", padding: "5px 10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.15)", fontSize: "10.5px", color: "rgba(255,255,255,0.85)", pointerEvents: "none", zIndex: 5 }}>
            <span>🗺️ WGS84 Geodetic · Zambia 752,618 km²</span>
          </div>

          {/* SVG Map Container with Zoom Transform */}
          <div style={{ width: "100%", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg
              viewBox="0 0 1000 780"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: isFullscreen ? "75vh" : "620px",
                filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.7))",
                pointerEvents: "auto",
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center center",
                transition: "transform 0.25s ease-out"
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
                <linearGradient id="parkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(34, 197, 94, 0.35)" />
                  <stop offset="100%" stopColor="rgba(21, 128, 61, 0.45)" />
                </linearGradient>
              </defs>

              {/* REAL AUTHENTIC ZAMBIA COUNTRY OUTLINE (Official Geodetic Border) */}
              <path
                d={ZAMBIA_COUNTRY_OUTLINE_PATH}
                fill="url(#zambiaLandGradient)"
                stroke="rgba(37, 211, 102, 0.95)"
                strokeWidth="3.5"
                filter="drop-shadow(0 0 12px rgba(37, 211, 102, 0.35))"
              />

              {/* 10 AUTHENTIC PROVINCIAL POLYGONS FROM REAL SHAPEFILES */}
              {showBorders && (
                <g opacity="0.95">
                  {ZAMBIA_PROVINCES_SHAPEFILES.map((prov) => {
                    const isHovered = hoveredProvince === prov.code;
                    const isSelected = selectedProvinceCode === prov.code;
                    return (
                      <path
                        key={prov.code}
                        d={prov.svgPath}
                        fill={
                          isSelected
                            ? "rgba(37, 211, 102, 0.35)"
                            : isHovered
                            ? "rgba(37, 211, 102, 0.22)"
                            : "rgba(255, 255, 255, 0.03)"
                        }
                        stroke={isSelected ? "rgba(37, 211, 102, 1)" : isHovered ? "rgba(52, 211, 153, 0.9)" : "rgba(255, 255, 255, 0.25)"}
                        strokeWidth={isSelected ? "2.5" : isHovered ? "2" : "1.2"}
                        strokeDasharray={isSelected ? "none" : "4 2"}
                        onMouseEnter={() => setHoveredProvince(prov.code)}
                        onMouseLeave={() => setHoveredProvince(null)}
                        onClick={() => setSelectedProvinceCode(selectedProvinceCode === prov.code ? "all" : prov.code)}
                        style={{ cursor: "pointer", transition: "fill 0.15s ease, stroke 0.15s ease" }}
                      >
                        <title>{prov.name} Province (Capital: {prov.capital})</title>
                      </path>
                    );
                  })}
                </g>
              )}

              {/* REAL NATIONAL PARKS SHAPEFILE LAYER */}
              {showParks && (
                <g>
                  {ZAMBIA_NATIONAL_PARKS_GIS.map((np) => (
                    <g key={np.id} opacity="0.9">
                      <path
                        d={np.path || ""}
                        fill="url(#parkGradient)"
                        stroke="rgba(74, 222, 128, 0.85)"
                        strokeWidth="1.8"
                        strokeDasharray="5 3"
                      />
                      {np.lat && np.lon && (
                        <text
                          x={projectGpsToSvg(np.lat, np.lon).x}
                          y={projectGpsToSvg(np.lat, np.lon).y}
                          fill="rgba(187, 247, 208, 0.95)"
                          fontSize="8.5"
                          fontWeight="800"
                          textAnchor="middle"
                          pointerEvents="none"
                        >
                          🦁 {np.name.split(" ")[0]} NP
                        </text>
                      )}
                    </g>
                  ))}
                </g>
              )}

              {/* REAL WATERWAYS & LAKES LAYER (Lake Tanganyika, Lake Kariba, Bangweulu, Mweru & Rivers) */}
              {showRivers && (
                <g>
                  {/* Lakes Polygons */}
                  {ZAMBIA_WATERBODIES_GIS.filter(w => w.type === "waterbody").map((lake) => (
                    <path
                      key={lake.id}
                      d={lake.path || ""}
                      fill="url(#waterGradient)"
                      stroke="rgba(56, 189, 248, 1)"
                      strokeWidth="1.8"
                    >
                      <title>{lake.name}: {lake.description}</title>
                    </path>
                  ))}

                  {/* Rivers Polyline Courses */}
                  {ZAMBIA_WATERBODIES_GIS.filter(w => w.type === "river").map((river) => (
                    <path
                      key={river.id}
                      d={river.path || ""}
                      fill="none"
                      stroke="rgba(14, 165, 233, 0.9)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>{river.name}: {river.description}</title>
                    </path>
                  ))}

                  {/* Lake Annotations */}
                  <text x="735" y="65" fill="rgba(56, 189, 248, 1)" fontSize="9.5" fontWeight="800">LAKE TANGANYIKA</text>
                  <text x="440" y="655" fill="rgba(56, 189, 248, 1)" fontSize="9.5" fontWeight="800">LAKE KARIBA</text>
                  <text x="560" y="270" fill="rgba(56, 189, 248, 0.95)" fontSize="9" fontWeight="800">L. BANGWEULU</text>
                  <text x="500" y="130" fill="rgba(56, 189, 248, 0.95)" fontSize="8.5" fontWeight="800">L. MWERU</text>
                </g>
              )}

              {/* HIGHWAYS & SAFARI CORRIDORS LAYER */}
              {showHighways && (
                <g opacity="0.85">
                  {ZAMBIA_HIGHWAYS_GIS.map((hwy) => (
                    <path
                      key={hwy.id}
                      d={hwy.path || ""}
                      fill="none"
                      stroke="rgba(250, 204, 21, 0.85)"
                      strokeWidth="2.2"
                      strokeDasharray="6 3"
                      strokeLinecap="round"
                    >
                      <title>{hwy.name}: {hwy.description}</title>
                    </path>
                  ))}
                </g>
              )}

              {/* PROVINCE LABELS & CAPITALS FROM REAL SHAPEFILE CENTROIDS */}
              {showLabels && (
                <g pointerEvents="none">
                  {ZAMBIA_PROVINCES_SHAPEFILES.map((prov) => (
                    <g key={`lbl-${prov.code}`}>
                      <text
                        x={prov.labelX}
                        y={prov.labelY}
                        fill="rgba(255, 255, 255, 0.55)"
                        fontSize="11.5"
                        fontWeight="800"
                        textAnchor="middle"
                        letterSpacing="0.06em"
                      >
                        {prov.name.toUpperCase()}
                      </text>
                      <text
                        x={prov.labelX}
                        y={prov.labelY + 12}
                        fill="rgba(37, 211, 102, 0.65)"
                        fontSize="8.5"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        Cap: {prov.capital.split(" ")[0]}
                      </text>
                    </g>
                  ))}
                </g>
              )}

              {/* REAL GPS INTERACTIVE DESTINATION & CEREMONY PINS */}
              {filteredPins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id;
                const isCeremony = pin.category === "ceremony";
                const coords = projectGpsToSvg(pin.latitude, pin.longitude);
                const pinColor =
                  pin.category === "ceremony" ? "rgba(245, 158, 11, 1)" :
                  pin.category === "stays" ? "rgba(234, 88, 12, 1)" :
                  pin.category === "tours" ? "rgba(16, 185, 129, 1)" :
                  pin.category === "nature" ? "rgba(6, 182, 212, 1)" :
                  pin.category === "culture" ? "rgba(236, 72, 153, 1)" : "rgba(168, 85, 247, 1)";

                return (
                  <g
                    key={pin.id}
                    transform={`translate(${coords.x}, ${coords.y})`}
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
          </div>

          {/* Real Circuits Strip */}
          <div className="zambiaMapCircuitsBar" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap", padding: "8px 12px", background: "rgba(0,0,0,0.65)", borderRadius: "8px", marginTop: "10px", fontSize: "11px", color: "rgba(255,255,255,0.85)" }}>
            <span style={{ fontWeight: 800, color: "rgba(37, 211, 102, 1)" }}>Safari Circuits:</span>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(245, 158, 11, 1)", display: "inline-block" }} />
              <span>👑 Traditional Ceremonies</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(16, 185, 129, 1)", display: "inline-block" }} />
              <span>Southern (Livingstone / Kariba)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(6, 182, 212, 1)", display: "inline-block" }} />
              <span>Luangwa Valley (Mfuwe)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(59, 130, 246, 1)", display: "inline-block" }} />
              <span>Northern Lakes (Tanganyika / Bangweulu)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(139, 92, 246, 1)", display: "inline-block" }} />
              <span>Greater Kafue & Barotseland</span>
            </div>
          </div>
        </div>

        {/* Selected Destination Preview Drawer with FULL GPS Details */}
        <div className="zambiaMapDetailPanel">
          {selectedPin ? (
            <div>
              <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", marginBottom: "12px", height: "160px", background: "rgba(0,0,0,1)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPin.imageUrl}
                  alt={selectedPin.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span style={{ position: "absolute", top: "8px", left: "8px", background: "rgba(0,0,0,0.85)", color: selectedPin.category === "ceremony" ? "rgba(251, 191, 36, 1)" : "rgba(37, 211, 102, 1)", fontSize: "10.5px", fontWeight: 800, padding: "3px 8px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)" }}>
                  {selectedPin.categoryIcon} {selectedPin.categoryName}
                </span>
                <span style={{ position: "absolute", bottom: "8px", right: "8px", background: "rgba(0,0,0,0.85)", color: "rgba(250, 204, 21, 1)", fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "6px" }}>
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
              <div className="zambiaGpsBadge" style={{ background: "rgba(0,0,0,0.4)", borderRadius: "6px", padding: "4px 8px", margin: "6px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10.5px", color: "rgba(255,255,255,0.85)" }}>
                <span>📍 GPS: {selectedPin.latitude.toFixed(4)}° S, {selectedPin.longitude.toFixed(4)}° E</span>
                <button
                  type="button"
                  onClick={() => handleCopyGps(selectedPin.latitude, selectedPin.longitude)}
                  style={{ background: "none", border: "none", color: "rgba(37, 211, 102, 1)", cursor: "pointer", fontSize: "10px", fontWeight: 700, padding: "0 2px" }}
                >
                  {copiedGps ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <h3 style={{ fontSize: "18px", margin: "8px 0 6px", color: "var(--brand-white)", fontWeight: 800, lineHeight: 1.3 }}>
                {selectedPin.name}
              </h3>

              {/* Royal Host if ceremony */}
              {selectedPin.royalHost && (
                <div style={{ background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "8px", padding: "7px 10px", margin: "8px 0", fontSize: "11.5px" }}>
                  <strong style={{ color: "rgba(251, 191, 36, 1)", display: "block", marginBottom: "2px" }}>👑 Royal Host & Palace:</strong>
                  <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>{selectedPin.royalHost}</span>
                </div>
              )}

              {/* Timing */}
              {selectedPin.season && (
                <div style={{ fontSize: "11.5px", color: "rgba(255, 255, 255, 0.8)", marginBottom: "6px" }}>
                  <strong style={{ color: "rgba(37, 211, 102, 1)" }}>📅 Season:</strong> {selectedPin.season}
                </div>
              )}

              <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: "0 0 12px" }}>
                {selectedPin.summary}
              </p>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ fontSize: "11.5px", color: "var(--brand-white)", display: "block", marginBottom: "4px" }}>
                  {selectedPin.category === "ceremony" ? "Ceremonial Highlights & Rituals:" : "Key Highlights & Activities:"}
                </strong>
                <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11.5px", color: "rgba(255,255,255,0.8)", lineHeight: 1.55 }}>
                  {selectedPin.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              {selectedPin.price && (
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.7)" }}>Visitor Access & Rates:</span>
                  <strong style={{ fontSize: "13px", color: selectedPin.category === "ceremony" ? "rgba(251, 191, 36, 1)" : "rgba(37, 211, 102, 1)" }}>{selectedPin.price}</strong>
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
                padding: "12px 18px",
                borderRadius: "10px",
                fontSize: "13.5px",
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
      <div className="zambiaMapCardsTray" style={{ padding: "12px 16px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(6, 20, 20, 0.95)" }}>
        <div className="zambiaMapCardsHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "16px" }}>📍</span>
            <strong style={{ fontSize: "13px", color: "var(--brand-white)" }}>
              All Map Points ({filteredPins.length} Locations Available):
            </strong>
          </div>
          <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
            Click any card to center and inspect details
          </span>
        </div>

        <div className="zambiaMapCardsScroll" style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "6px" }}>
          {filteredPins.map((pin) => {
            const isSelected = selectedPin?.id === pin.id;
            return (
              <div
                key={pin.id}
                className={`zambiaMiniCard ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedPin(pin)}
                style={{
                  flex: "0 0 170px",
                  background: isSelected ? "rgba(37, 211, 102, 0.15)" : "rgba(255,255,255,0.04)",
                  border: isSelected ? "1.5px solid rgba(37, 211, 102, 1)" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.15s ease, border-color 0.15s ease"
                }}
              >
                <div style={{ height: "80px", width: "100%", position: "relative", overflow: "hidden", background: "rgba(0,0,0,0.5)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pin.imageUrl}
                    alt={pin.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span style={{ position: "absolute", top: "5px", left: "5px", background: "rgba(0,0,0,0.85)", fontSize: "8.5px", fontWeight: 700, padding: "2px 5px", borderRadius: "4px", color: pin.category === "ceremony" ? "rgba(251, 191, 36, 1)" : "rgba(37, 211, 102, 1)" }}>
                    {pin.categoryIcon} {pin.category === "ceremony" ? "Ceremony" : pin.categoryName.split(" ")[0]}
                  </span>
                </div>
                <div style={{ padding: "8px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 700, fontSize: "11px", color: isSelected ? "rgba(37, 211, 102, 1)" : "var(--brand-white)", lineHeight: 1.3, marginBottom: "3px" }}>
                    {pin.name}
                  </div>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

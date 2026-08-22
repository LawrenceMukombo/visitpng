import { env } from "./runtime";
import { ensureCountries } from "./countries";
import { ensureCountryGeography } from "./geography";

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS provinces (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,code TEXT NOT NULL UNIQUE,name TEXT NOT NULL,region TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS destinations (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,province_id INTEGER NOT NULL REFERENCES provinces(id),district TEXT,slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,summary TEXT NOT NULL,latitude REAL,longitude REAL,cover_image_url TEXT,source_url TEXT,is_test_data INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,icon TEXT NOT NULL,display_order INTEGER NOT NULL DEFAULT 0,is_active INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS providers (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,slug TEXT NOT NULL UNIQUE,trading_name TEXT NOT NULL,legal_name TEXT,license_number TEXT,verification_status TEXT NOT NULL DEFAULT 'seeded_unverified',source_name TEXT,source_url TEXT,is_test_data INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS listings (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,provider_id INTEGER NOT NULL REFERENCES providers(id),destination_id INTEGER NOT NULL REFERENCES destinations(id),category_id INTEGER NOT NULL REFERENCES categories(id),slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,summary TEXT NOT NULL,image_url TEXT NOT NULL,photo_credit TEXT,deep_link_url TEXT,tag TEXT NOT NULL,currency TEXT NOT NULL DEFAULT 'PGK',base_price INTEGER NOT NULL,member_price INTEGER,rating REAL NOT NULL DEFAULT 0,review_count INTEGER NOT NULL DEFAULT 0,publication_status TEXT NOT NULL DEFAULT 'published',verification_status TEXT NOT NULL DEFAULT 'seeded_unverified',is_test_data INTEGER NOT NULL DEFAULT 1,last_reviewed_at TEXT)`,
  `CREATE TABLE IF NOT EXISTS destination_photos (id INTEGER PRIMARY KEY AUTOINCREMENT,destination_id INTEGER REFERENCES destinations(id),listing_id INTEGER REFERENCES listings(id),image_url TEXT NOT NULL,caption TEXT,credit TEXT,source_url TEXT,display_order INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS listings_destination_idx ON listings(destination_id)`,
  `CREATE INDEX IF NOT EXISTS listings_category_idx ON listings(category_id)`,
  `CREATE INDEX IF NOT EXISTS listings_publication_idx ON listings(publication_status)`
];

const categorySeed = [
  ["stays", "Stays", "⌂", 1],
  ["tours", "Tours", "◒", 2],
  ["nature", "Nature", "◇", 3],
  ["culture", "Culture", "♨", 4],
  ["events", "Events", "◎", 5],
  ["transport", "Transport", "➜", 6]
];

// PNG Seed Data
const pngDestinationSeed = [
  ["port-moresby", "Port Moresby", "Papua New Guinea's capital and primary international gateway with coastal vistas and national botanical parks.", "NCD", "National Capital District", -9.4438, 147.1803, "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "https://papuanewguinea.travel/destinations/port-moresby"],
  ["kokoda", "Kokoda Track", "Historic overland trail traversing Central and Oro provinces through the Owen Stanley Range.", "ORO", "Sohe & Kairuku-Hiri Districts", -8.8783, 147.7372, "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1100&q=82", "https://papuanewguinea.travel/destinations/kokoda-track"],
  ["loloata-island", "Loloata Island", "A tropical island sanctuary in Bootless Bay known for marine reserves and scuba diving.", "CP", "Abau District", -9.5317, 147.2833, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "https://www.loloataislandresort.com"],
  ["alotau", "Alotau", "Milne Bay's provincial capital and gateway to crystal atolls, coral reefs, and Kula trade culture.", "MBP", "Alotau District", -10.3157, 150.4588, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "https://papuanewguinea.travel/destinations/milne-bay"],
  ["kokopo", "Kokopo", "A vibrant coastal base overlooking the Rabaul volcanic caldera, Tavurvur crater, and Duke of York islands.", "ENB", "Kokopo District", -4.3412, 152.2712, "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82", "https://papuanewguinea.travel/destinations/east-new-britain"],
  ["wewak", "Wewak", "A coastal gateway to the legendary Sepik River basin and ancient carved Haus Tambarans.", "ESP", "Wewak District", -3.5534, 143.6268, "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "https://papuanewguinea.travel/destinations/sepik"],
  ["madang", "Madang", "A picturesque coastal town famed for barrier coral reefs, underwater wrecks, and Kalibobo lighthouse.", "MP", "Madang District", -5.2247, 145.7966, "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1100&q=82", "https://papuanewguinea.travel/destinations/madang"],
  ["goroka", "Goroka", "Eastern Highlands capital famed for coffee estates, the annual Goroka Show, and the Asaro mudmen.", "EHP", "Goroka District", -6.0833, 145.3833, "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82", "https://papuanewguinea.travel/destinations/eastern-highlands"],
  ["mount-hagen-whp", "Mount Hagen", "Commercial hub of the Western Highlands surrounded by cloud forests, tea plantations, and Melpa tribal lands.", "WHP", "Mount Hagen Central", -5.8575, 144.2306, "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1100&q=82", "https://papuanewguinea.travel/destinations/western-highlands"],
  ["tari-valley-hela", "Tari Valley & Hela", "Highlands birding paradise and ancestral home of the famed yellow-clay Huli Wigmen.", "HEL", "Tari Pori", -5.8450, 142.9460, "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "https://papuanewguinea.travel/destinations/hela"],
  ["kimbe-bay-wnb", "Kimbe Bay & Walindi", "Global marine biodiversity hotspot housing over half of the world's coral species.", "WNB", "Talasea District", -5.5500, 150.1500, "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1100&q=82", "https://walindiresort.com"]
];

const pngProviderSeed = [
  ["png-tourism-promotion-authority", "PNG Tourism Promotion Authority", "Official provider website", "https://papuanewguinea.travel"],
  ["loloata-island-resort", "Loloata Island Resort", "Official provider website", "https://www.loloataislandresort.com"],
  ["kokopo-beach-bungalow-resort", "Kokopo Beach Bungalow Resort", "Official provider website", "https://www.kbb.com.pg"],
  ["walindi-plantation-resort", "Walindi Plantation Resort", "Official provider website", "https://walindiresort.com"],
  ["madang-resort", "Madang Resort & Kalibobo Village", "Official provider website", "https://www.madangresort.com"],
  ["air-niugini", "Air Niugini National Airline", "Official provider website", "https://www.airniugini.com.pg"],
  ["png-air-official", "PNG Air Domestic Aviation", "Official provider website", "https://www.pngair.com.pg"],
  ["goroka-cultural-show-trust", "Goroka Cultural Show Secretariat", "Official provider website", "https://gorokashow.com"],
  ["trans-niugini-tours", "Trans Niugini Wilderness Lodges", "Official provider website", "https://www.pngtours.com"],
  ["tufi-dive-resort-official", "Tufi Dive Resort", "Official provider website", "https://www.tufidive.com"],
  ["tawali-resort-milne-bay", "Tawali Leisure & Dive Resort", "Official provider website", "https://www.tawali.com"],
  ["sepik-river-expeditions", "Sepik Cultural Expeditions", "Official provider website", "https://papuanewguinea.travel/sepik"],
  ["national-museum-png", "PNG National Museum & Art Gallery", "Official provider website", "https://www.museumpng.gov.pg"],
  ["port-moresby-nature-park-trust", "Port Moresby Nature Park Trust", "Official provider website", "https://portmoresbynaturepark.org"]
];

const pngListingSeed = [
  // --- Stays (⌂) ---
  ["loloata-island-resort", "loloata-island-resort", "loloata-island", "stays", "Loloata Island Resort", "Luxury private island overwater suites and oceanview rooms overlooking Bootless Bay marine sanctuary.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Loloata Island Resort Official", "https://www.loloataislandresort.com/accommodation", "Island Resort", "PGK", 640, 560, 4.8, 126],
  ["kokopo-beach-bungalow-resort", "kokopo-beach-bungalow-resort", "kokopo", "stays", "Kokopo Beach Bungalow Resort", "Waterfront executive chalets on Blanche Bay with views of Mount Tavurvur and Duke of York Islands.", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82", "Kokopo Beach Bungalow Resort", "https://www.kbb.com.pg/rooms", "Waterfront Chalets", "PGK", 520, 468, 4.7, 84],
  ["madang-resort", "madang-resort", "madang", "stays", "Madang Resort & Kalibobo Village", "Premium tropical harborfront resort with Olympic saltwater pools, dive centers, and private marina.", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1100&q=82", "Madang Resort Official", "https://www.madangresort.com/rooms", "Harborfront Resort", "PGK", 420, 378, 4.6, 41],
  ["walindi-plantation-resort-stay", "walindi-plantation-resort", "kimbe-bay-wnb", "stays", "Walindi Plantation Resort & Eco Bungalows", "World-renowned eco-lodge surrounded by oil palm canopies and pristine coral reefs of Kimbe Bay.", "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1100&q=82", "Walindi Resort Official", "https://walindiresort.com", "Eco Diving Lodge", "PGK", 580, 510, 4.9, 92],
  ["rondon-ridge-lodge-stay", "trans-niugini-tours", "mount-hagen-whp", "stays", "Rondon Ridge Mountain Lodge", "Luxury alpine lodge perched 7,100 feet above the Wahgi Valley with sweeping mountain views and heated chalets.", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=82", "Trans Niugini Tours", "https://www.pngtours.com", "Highland Luxury", "PGK", 750, 660, 4.9, 58],
  ["ambua-lodge-tari-stay", "trans-niugini-tours", "tari-valley-hela", "stays", "Ambua Mountain Lodge", "Award-winning high-altitude rainforest lodge nestled in Tari Gap, famous for 13 species of Birds of Paradise.", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1100&q=82", "Trans Niugini Tours", "https://www.pngtours.com", "Birding Retreat", "PGK", 820, 720, 5.0, 64],
  ["tufi-dive-resort-stay", "tufi-dive-resort-official", "alotau", "stays", "Tufi Boutique Fjord Dive Resort", "Clifftop boutique resort overlooking tropical fjords, offering panoramic ocean vistas and world-class scuba diving.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Tufi Dive Resort Official", "https://www.tufidive.com", "Fjord Clifftop", "PGK", 680, 595, 4.8, 71],
  ["tawali-leisure-resort-stay", "tawali-resort-milne-bay", "alotau", "stays", "Tawali Leisure & Coral Reef Resort", "Secluded clifftop eco-resort accessible only by boat, built on wooden stilts above pristine Milne Bay coral gardens.", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1100&q=82", "Tawali Resort Official", "https://www.tawali.com", "Coral Atoll Resort", "PGK", 590, 520, 4.8, 53],

  // --- Tours (◓) ---
  ["kokoda-trail", "png-tourism-promotion-authority", "kokoda", "tours", "Kokoda Track Historic Expedition", "A 96-kilometre guided trek through the Owen Stanley Range linking wartime battlefields, mountain rivers, and local villages.", "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1100&q=82", "Unsplash / Travel PNG", "https://papuanewguinea.travel/tours/kokoda-track", "Historic Trek", "PGK", 1200, 1050, 4.9, 54],
  ["mount-wilhelm", "png-tourism-promotion-authority", "madang", "tours", "Mount Wilhelm Summit Expedition", "Guided trek up Papua New Guinea's highest peak (4,509m) traversing glacial valleys, alpine lakes, and cloud forests.", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82", "Unsplash / Highlands Trekking", "https://papuanewguinea.travel/tours/mount-wilhelm", "Alpine Summit", "PGK", 1450, 1280, 4.8, 38],
  ["sepik-river-canoe-expedition", "sepik-river-expeditions", "wewak", "tours", "Sepik River Spirit House & Canoe Expedition", "Multi-day motorized dugout canoe journey visiting remote tribal villages, master woodcarvers, and sacred crocodile initiation chambers.", "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "Sepik Cultural Expeditions", "https://papuanewguinea.travel/sepik", "River Expedition", "PGK", 1350, 1180, 4.9, 62],
  ["rabaul-wwii-volcano-tour", "kokopo-beach-bungalow-resort", "kokopo", "tours", "Rabaul Caldera & WWII Relics Tour", "Explore Japanese submarine tunnels, Admiral Yamamoto's bunker, and the steaming geothermal vents of Mount Tavurvur.", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82", "Kokopo Beach Resort", "https://www.kbb.com.pg", "Volcano & History", "PGK", 540, 470, 4.8, 77],
  ["tari-bird-of-paradise-tour", "trans-niugini-tours", "tari-valley-hela", "tours", "Tari Highlands Bird of Paradise Safari", "Expert-guided dawn birding trails through mist-shrouded moss forests seeking the King of Saxony and Blue Bird of Paradise.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "Trans Niugini Tours", "https://www.pngtours.com", "Birding Safari", "PGK", 1100, 960, 5.0, 49],
  ["milne-bay-island-hopping", "tawali-resort-milne-bay", "alotau", "tours", "Milne Bay Coral Atoll & Skull Caves Safari", "Boat expedition across turquoise bays visiting ancient cliff burial skull caves and untouched outer reef snorkeling drops.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Tawali Resort", "https://www.tawali.com", "Island Safari", "PGK", 890, 780, 4.8, 51],

  // --- Nature (◇) ---
  ["tufi-fjords", "png-tourism-promotion-authority", "alotau", "nature", "Tufi Fjords Marine Sanctuary", "Explore dramatic volcanic fjords, lush tropical rainforest walls, cascading freshwater waterfalls, and coral walls.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Unsplash / PNG Tourism", "https://papuanewguinea.travel/nature/tufi", "Fjords & Marine", "PGK", 650, 580, 4.9, 42],
  ["varirata-national-park", "png-tourism-promotion-authority", "port-moresby", "nature", "Varirata National Park", "Zoned rainforest national park overlooking Port Moresby featuring panoramic coastal lookouts and Raggiana bird trails.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "Unsplash / PNG Wildlife", "https://papuanewguinea.travel/nature/varirata", "Rainforest Park", "PGK", 150, 120, 4.8, 71],
  ["rabaul-volcanoes", "png-tourism-promotion-authority", "kokopo", "nature", "Rabaul and Mount Tavurvur Volcano", "Witness active volcanic vents, sulfur springs, and dramatic caldera landscapes across Simpson Harbour.", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82", "Unsplash / Volcano Watch", "https://papuanewguinea.travel/nature/rabaul", "Volcanic Wonder", "PGK", 320, 270, 4.8, 64],
  ["walindi-reef-experience", "walindi-plantation-resort", "kimbe-bay-wnb", "nature", "Kimbe Bay Marine & Coral Sanctuary", "Pristine marine reserve housing world-famous dive sites like Father's Reefs, hanging sea fans, and resident dolphin pods.", "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1100&q=82", "Walindi Resort", "https://walindiresort.com/diving", "Marine Sanctuary", "PGK", 390, 345, 4.7, 68],
  ["port-moresby-nature-park-sanctuary", "port-moresby-nature-park-trust", "port-moresby", "nature", "Port Moresby Nature Park Botanical Gardens", "Papua New Guinea's premier botanical and zoological sanctuary housing tree kangaroos, cassowaries, and native orchids.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Nature Park Trust", "https://portmoresbynaturepark.org", "Botanical & Wildlife", "PGK", 80, 65, 4.9, 140],

  // --- Culture (♨) ---
  ["sepik-river", "png-tourism-promotion-authority", "wewak", "culture", "Sepik River Cultural Heritage & Haus Tambaran", "Discover living ancestral traditions, master woodcarvings, crocodile scarification ceremonies, and sacred spirit houses.", "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "Unsplash / Cultural Heritage", "https://papuanewguinea.travel/culture/sepik-river", "Living Traditions", "PGK", 850, 720, 4.9, 58],
  ["asaro-mudmen-village", "goroka-cultural-show-trust", "goroka", "culture", "Asaro Mudmen Cultural Experience", "Witness the legendary Holosa mudmen emerge in clay masks and bamboo claws recreating ancestral battle folklore.", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82", "Goroka Cultural Trust", "https://papuanewguinea.travel/culture", "Tribal Folklore", "PGK", 480, 410, 4.9, 94],
  ["huli-wigmen-heritage", "trans-niugini-tours", "tari-valley-hela", "culture", "Huli Wigmen Cultural & Hair School Sanctuary", "Learn the sacred customs of the Huli clan, ceremonial feather headdresses, and bachelor hair-growing rituals.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "Trans Niugini Tours", "https://www.pngtours.com", "Sacred Heritage", "PGK", 560, 480, 5.0, 82],
  ["png-national-museum-waigani", "national-museum-png", "port-moresby", "culture", "PNG National Museum & Art Gallery", "National repository of ancestral masterworks, Malagan funerary masks, Kula canoes, and prehistoric stone carvings.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "National Museum PNG", "https://www.museumpng.gov.pg", "National Treasures", "PGK", 120, 95, 4.7, 105],
  ["tolai-tubuan-society", "kokopo-beach-bungalow-resort", "kokopo", "culture", "Tolai Tubuan & Duk-Duk Secret Society", "Experience traditional Tolai shell money (Tabu) banking ceremonies, secret society chants, and cone-shaped spirit dances.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Kokopo Cultural Tours", "https://www.kbb.com.pg", "Ancestral Society", "PGK", 410, 350, 4.8, 67],

  // --- Events (◎) ---
  ["goroka-cultural-show", "goroka-cultural-show-trust", "goroka", "events", "Goroka Cultural Show & Singsing", "The world-famous Highlands cultural festival featuring over 100 tribes in bird-of-paradise plumes and body regalia.", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82", "Goroka Show Trust", "https://gorokashow.com", "Highlands Singsing", "PGK", 450, 380, 5.0, 112],
  ["mount-hagen-cultural-show", "png-tourism-promotion-authority", "mount-hagen-whp", "events", "Mount Hagen Cultural Show", "Massive annual gathering of Highlands clans, Melpa warriors, and thunderous kundu drums at Kagamuga grounds.", "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1100&q=82", "Hagen Show Committee", "https://papuanewguinea.travel/events/mount-hagen-show", "Warrior Singsing", "PGK", 480, 410, 4.9, 98],
  ["rabaul-mask-festival", "png-tourism-promotion-authority", "kokopo", "events", "National Mask & Warwagira Festival", "Early morning Kinavai canoe arrival of Duk-Duk spirits and nocturnal fire dances by Baining bark cloth mask dancers.", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82", "East New Britain Tourism", "https://papuanewguinea.travel/events/mask-festival", "Sacred Fire Dance", "PGK", 380, 320, 5.0, 86],
  ["sepik-crocodile-festival", "sepik-river-expeditions", "wewak", "events", "Sepik River Crocodile & Cultural Festival", "Celebration of the sacred bond between river communities and the saltwater crocodile with live dugout regattas.", "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "Sepik Cultural Secretariat", "https://papuanewguinea.travel/events/sepik-crocodile", "River Pageant", "PGK", 520, 440, 4.9, 73],
  ["kula-canoe-kundu-festival", "png-tourism-promotion-authority", "alotau", "events", "National Kula Canoe & Kundu Festival", "Thunderous ocean races between traditional carved war canoes and synchronized kundu drumming along the Alotau shoreline.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Milne Bay Tourism", "https://papuanewguinea.travel/events/kula-canoe", "Ocean War Canoe", "PGK", 350, 295, 4.8, 89],

  // --- Transport (➜) ---
  ["air-niugini-domestic-pass", "air-niugini", "port-moresby", "transport", "Air Niugini Paradise Domestic Pass", "Scheduled air links connecting Jackson International Airport with Kokopo, Madang, Mt Hagen, and Alotau.", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1100&q=82", "Air Niugini", "https://www.airniugini.com.pg", "Domestic Flights", "PGK", 780, 690, 4.7, 95],
  ["png-air-island-hopper", "png-air-official", "port-moresby", "transport", "PNG Air Highlands & Coastal Network Pass", "Regional Dash-8 scheduled flights connecting provincial towns, mining hubs, and island airstrips.", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1100&q=82", "PNG Air Official", "https://www.pngair.com.pg", "Regional Hopper", "PGK", 690, 610, 4.8, 88],
  ["kokopo-rabaul-4x4-shuttle", "kokopo-beach-bungalow-resort", "kokopo", "transport", "Kokopo & Rabaul Airport 4x4 Transfers", "Air-conditioned 4WD airport transfers, caldera overland tours, and volcanic hot spring private shuttles.", "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=82", "Kokopo Transfers", "https://www.kbb.com.pg", "Overland 4x4", "PGK", 220, 185, 4.8, 64],
  ["sepik-motorized-river-canoe", "sepik-river-expeditions", "wewak", "transport", "Sepik River Express Motorized Canoe Link", "Scheduled covered motorized dugout passenger transfers between Pagwi gateway and Middle Sepik river villages.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Sepik Transport Bureau", "https://papuanewguinea.travel/sepik", "River Water Taxi", "PGK", 380, 320, 4.7, 52],
  ["alotau-catamaran-island-ferry", "tawali-resort-milne-bay", "alotau", "transport", "Milne Bay Island Express Catamaran", "Fast sea passenger transfers connecting Alotau harbor with outer island dive lodges and coral atolls.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Milne Bay Sea Ferries", "https://www.tawali.com", "Fast Ferry", "PGK", 310, 265, 4.7, 46]
];

// Zambia Seed Data
const zambiaDestinationSeed = [
  ["victoria-falls-livingstone", "Victoria Falls & Livingstone", "The adventure capital of Africa, home to Mosi-oa-Tunya and the Zambezi River.", "ZM-SOU", "Livingstone Urban", -17.9243, 25.8572, "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/waterfalls/victoria-falls"],
  ["south-luangwa-mfuwe", "South Luangwa National Park", "The birthplace of the walking safari with unmatched wildlife concentrations along the Luangwa River.", "ZM-EAS", "Mambwe District", -13.0805, 31.7891, "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/national-parks/south-luangwa"],
  ["lower-zambezi-valley", "Lower Zambezi National Park", "Pristine riverine wilderness famous for canoe safaris, elephant herds, and tiger fishing.", "ZM-LUS", "Chongwe & Luangwa", -15.6521, 29.4124, "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/national-parks/lower-zambezi"],
  ["lake-kariba-siavonga", "Lake Kariba & Siavonga", "Zambia's Riviera featuring houseboat holidays, sunset cruises, and tranquil waters.", "ZM-SOU", "Siavonga District", -16.5367, 28.7183, "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/lakes/lake-kariba"],
  ["kafue-national-park", "Kafue National Park & Busanga", "One of Africa's largest national parks, featuring the famous Busanga Plains and tree-climbing lions.", "ZM-CEN", "Itezhi-Tezhi", -14.9333, 25.9167, "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/national-parks/kafue"],
  ["lusaka-cultural-hub", "Lusaka Capital & Cultural Precinct", "Zambia's vibrant cosmopolitan capital featuring national museums, art galleries, and wildlife sanctuaries.", "ZM-LUS", "Lusaka Central", -15.4167, 28.2833, "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/towns/lusaka"],
  ["barotseland-mongu", "Barotseland & Mongu Royal Realm", "The heartland of the Lozi people, famous for the Kuomboka water ceremony, Zambezi floodplains, and Liuwa Plain wildebeest migration.", "ZM-WES", "Mongu Central", -15.2833, 23.1333, "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/towns/mongu"],
  ["luapula-waterfalls-kingdom", "Luapula Waterfalls & Mwata Kingdom", "Zambia's land of cascading waterfalls including Lumangwe, Kabwelume, and the historic Umutomboko royal ceremony.", "ZM-LUA", "Mwansabombwe & Kawambwa", -9.8333, 29.0833, "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/waterfalls/lumangwe-falls"],
  ["bangweulu-kasanka-wetlands", "Bangweulu Wetlands & Kasanka", "Home to the rare prehistoric Shoebill stork and the world's largest mammal migration of 10 million fruit bats.", "ZM-CEN", "Serenje & Samfya", -11.9500, 30.1500, "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/national-parks/kasanka"],
  ["lake-tanganyika-mbala", "Lake Tanganyika & Kalambo Falls", "Africa's longest and deepest fresh-water lake featuring Ndole Bay, Kalambo Falls gorge, and crystal clear waters.", "ZM-NOR", "Mbala & Nsumbu", -8.8333, 31.3667, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/lakes/lake-tanganyika"],
  ["chipata-mutenguleni-heritage", "Chipata & Mutenguleni Cultural Hub", "Eastern gateway to South Luangwa, home of the Paramount Chief Gawa Undi and the majestic Nc'wala warrior ceremony.", "ZM-EAS", "Chipata Urban", -13.6333, 32.6500, "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/towns/chipata"],
  ["solwezi-zambezi-west", "North-Western Masquerade & Mining Heritage", "Home of the Makishi masquerade, source of the mighty Zambezi River, and ancient rock engravings.", "ZM-NW", "Solwezi & Zambezi", -12.1833, 26.4000, "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/towns/solwezi"],
  ["copperbelt-ndola-kitwe", "Copperbelt Industrial & Aviary Trail", "Zambia's commercial heartland featuring the Chimfunshi Chimpanzee Orphanage and Dag Hammarskjöld Memorial.", "ZM-COP", "Ndola & Chingola", -12.9667, 28.6333, "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/towns/ndola"],
  ["muchinga-shiwa-ngandu", "Muchinga Escarpment & Shiwa Ng'andu", "Historic English manor house, natural geothermal hot springs, and North Luangwa walking trails.", "ZM-MUC", "Mpika & Chinsali", -11.8333, 31.7500, "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/historical-sites/shiwa-ngandu"],
  ["lochinvar-monze-sanctuary", "Lochinvar National Park & Kafue Flats", "World-renowned wetland sanctuary home to over 30,000 endemic Kafue lechwe antelopes and 400 bird species.", "ZM-SOU", "Monze District", -15.9833, 27.2500, "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/national-parks/lochinvar"],
  ["kasama-chishimba-falls", "Kasama & Chishimba Falls Cultural Site", "Sacred Bemba spiritual waterfalls, Mwela prehistoric rock art, and northern plateau highlands.", "ZM-NOR", "Kasama District", -10.2000, 31.1833, "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/waterfalls/chishimba-falls"],
  ["samfya-beach-bangweulu", "Samfya Beach & Lake Bangweulu", "Zambia's inland ocean with sweeping white sand beaches, freshwater fishing, and wetland access.", "ZM-LUA", "Samfya District", -11.3667, 29.5500, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/lakes/lake-bangweulu"]
];

const zambiaProviderSeed = [
  ["zambia-tourism-agency", "Zambia Tourism Agency", "Official provider website", "https://www.zambiatourism.com"],
  ["royal-livingstone-resort", "The Royal Livingstone by Anantara", "Official provider website", "https://www.anantara.com/en/royal-livingstone"],
  ["mfuwe-lodge-bushcamps", "The Bushcamp Company Mfuwe", "Official provider website", "https://bushcampcompany.com"],
  ["chiawa-safaris-zambia", "Chiawa Safaris Lower Zambezi", "Official provider website", "https://chiawa.com"],
  ["chaminuka-nature-lodge", "Chaminuka Luxury Nature Lodge", "Official provider website", "https://chaminuka.com"],
  ["proflight-zambia", "Proflight Zambia Airlines", "Official provider website", "https://www.proflight-zambia.com"],
  ["zambia-airways", "Zambia Airways Official", "Official provider website", "https://www.zambiaairways.co.zm"],
  ["wilderness-safaris-zambia", "Wilderness Safaris Busanga", "Official provider website", "https://www.wildernessdestinations.com"],
  ["livingstone-adventures", "Livingstone Adventures & Rafting", "Official provider website", "https://livingstoneadventures.com"],
  ["barotse-royal-establishment", "Barotse Royal Establishment Cultural Council", "Official provider website", "https://barotseland.info"],
  ["national-heritage-zambia", "National Heritage Conservation Commission Zambia", "Official provider website", "https://nhcczambia.org"],
  ["african-parks-zambia", "African Parks Zambia", "Official provider website", "https://www.africanparks.org/the-parks/liuwa-plain"],
  ["kasanka-trust-zambia", "Kasanka Trust & Bat Sanctuary", "Official provider website", "https://kasankanationalpark.com"],
  ["choma-museum-crafts", "Choma Museum & Tonga Crafts", "Official provider website", "https://chomamuseum.org"],
  ["moto-moto-museum-trust", "Moto Moto National Heritage Trust", "Official provider website", "https://nhcczambia.org/moto-moto"],
  ["chimfunshi-wildlife", "Chimfunshi Wildlife Orphanage", "Official provider website", "https://www.chimfunshi.com"],
  ["latitude-hotels-zambia", "Latitude 15° Lusaka", "Official provider website", "https://15.thelatitudehotels.com"],
  ["royal-chariot-transfers", "Royal Chariot Safari & Executive Transfers", "Official provider website", "https://royalchariot.co.zm"],
  ["zam-4x4-expeditions", "ZamRoam 4x4 Safari Expeditions", "Official provider website", "https://zamroam.com/4x4"],
  ["tazara-railway-authority", "TAZARA Railway Authority", "Official provider website", "https://tazarasite.com"],
  ["shiwa-safaris-estate", "Shiwa Ng'andu Estate & Kapishya Springs", "Official provider website", "https://shiwangandu.com"],
  ["ndole-bay-resort", "Ndole Bay Lodge Lake Tanganyika", "Official provider website", "https://ndolebaylodge.com"],
  ["tongabezi-luxury-lodge", "Tongabezi Luxury Lodge Zambezi", "Official provider website", "https://tongabezi.com"],
  ["chita-lodge-samfya", "Chita Lodge Samfya Beach", "Official provider website", "https://chitalodge.com"],
  ["mutinondo-wilderness-trust", "Mutinondo Wilderness Reserve", "Official provider website", "https://mutinondozambia.com"],
  ["ngoni-royal-council", "Ngoni Royal Council & Paramount Chief Mpezeni", "Official provider website", "https://www.zambiatourism.com"],
  ["lunda-royal-establishment", "Lunda Royal Establishment & King Mwata Kazembe", "Official provider website", "https://nhcczambia.org"],
  ["luvale-cultural-association", "Luvale Cultural Association & Likumbi Lya Mize", "Official provider website", "https://nhcczambia.org"],
  ["chewa-heritage-foundation", "Chewa Heritage Foundation & King Gawa Undi", "Official provider website", "https://nhcczambia.org"],
  ["bemba-royal-council", "Bemba Royal Council & Paramount Chief Chitimukulu", "Official provider website", "https://nhcczambia.org"],
  ["zambia-trade-fair-society", "Zambia International Trade Fair Society", "Official provider website", "https://zitf.org.zm"],
  ["zambia-agriculture-society", "Agricultural & Commercial Society of Zambia", "Official provider website", "https://acsz.co.zm"]
];

const zambiaListingSeed = [
  // --- Stays (⌂) ---
  ["royal-livingstone-hotel", "royal-livingstone-resort", "victoria-falls-livingstone", "stays", "The Royal Livingstone Victoria Falls Resort", "Five-star luxury on the banks of the Zambezi River with free-roaming zebras and private Falls access.", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=82", "Royal Livingstone Official", "https://www.anantara.com/en/royal-livingstone", "Luxury Stays", "ZMW", 5200, 4680, 4.9, 142],
  ["chaminuka-game-retreat", "chaminuka-nature-lodge", "lusaka-cultural-hub", "stays", "Chaminuka Nature Reserve & Luxury Lodge", "Overlooking Lake Chitoka with 72 species of wildlife, horseback safaris, and a world-class African art collection.", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1100&q=82", "Chaminuka Lodge Official", "https://chaminuka.com", "Wildlife & Art", "ZMW", 2700, 2350, 4.8, 62],
  ["shumba-busanga-camp", "wilderness-safaris-zambia", "kafue-national-park", "stays", "Shumba Camp & Wilderness Safaris Busanga", "Ultra-luxury tented camp perched in the heart of Busanga Plains, famed for tree-climbing lions and vast red lechwe herds.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Wilderness Safaris", "https://www.wildernessdestinations.com", "Busanga Plains", "ZMW", 6800, 6100, 5.0, 48],
  ["latitude-15-hotel", "latitude-hotels-zambia", "lusaka-cultural-hub", "stays", "Latitude 15° Boutique Hotel", "Vibrant boutique haven in Kabulonga featuring bespoke African interior design, fine dining, private art collection and spa.", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1100&q=82", "Latitude Hotels", "https://15.thelatitudehotels.com", "Boutique Oasis", "ZMW", 2400, 2100, 4.8, 74],
  ["king-lewanika-lodge-liuwa", "african-parks-zambia", "barotseland-mongu", "stays", "King Lewanika Luxury Lodge Liuwa Plain", "The only permanent luxury camp in Liuwa Plain offering untamed wilderness, wildebeest migration views, and star-bed decks.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "African Parks / Time + Tide", "https://www.africanparks.org", "Untamed Liuwa", "ZMW", 5900, 5200, 4.9, 39],
  ["mfuwe-lodge-luangwa", "mfuwe-lodge-bushcamps", "south-luangwa-mfuwe", "stays", "Mfuwe Lodge & Elephant Lagoon Chalets", "World-renowned safari lodge situated inside South Luangwa where elephant families famously wander through the open reception lounge.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "Bushcamp Company", "https://bushcampcompany.com", "Elephant Haven", "ZMW", 4800, 4200, 5.0, 115],
  ["chiawa-camp-lower-zambezi", "chiawa-safaris-zambia", "lower-zambezi-valley", "stays", "Chiawa Camp Riverfront Luxury Tents", "Pioneering family-owned luxury camp in the heart of Lower Zambezi with riverfront viewing decks and pontoon dining.", "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82", "Chiawa Safaris", "https://chiawa.com", "Riverfront Luxury", "ZMW", 5600, 4900, 4.9, 88],
  ["ndole-bay-lodge-tanganyika", "ndole-bay-resort", "lake-tanganyika-mbala", "stays", "Ndole Bay Beach Safari Lodge", "Beachfront stone-and-thatch chalets built along the crystal-clear waters of Lake Tanganyika with private marina and dive centre.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Ndole Bay Lodge", "https://ndolebaylodge.com", "Lake Tanganyika Resort", "ZMW", 2200, 1950, 4.8, 54],
  ["kapishya-hot-springs-lodge", "shiwa-safaris-estate", "muchinga-shiwa-ngandu", "stays", "Kapishya Hot Springs & Historic Chalets", "Secluded chalets nestled beside natural geothermal hot springs along the Mansha River near historic Shiwa Ng'andu estate.", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=82", "Shiwa Safaris", "https://shiwangandu.com", "Hot Springs Retreat", "ZMW", 1850, 1600, 4.9, 47],
  ["lake-kariba-inns-siavonga", "zambia-tourism-agency", "lake-kariba-siavonga", "stays", "Lake Kariba Inns Panoramic Hilltop Resort", "Hillside resort offering panoramic lake vistas, private boat berths, freshwater pools, and lakeside dining in Siavonga.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Lake Kariba Inns", "https://www.zambiatourism.com", "Kariba Panorama", "ZMW", 1750, 1500, 4.7, 63],
  ["chita-lodge-samfya-beach", "chita-lodge-samfya", "samfya-beach-bangweulu", "stays", "Chita Lodge Lake Bangweulu White Sands", "Waterfront lodge located directly on the sweeping white sands of Lake Bangweulu featuring beach chalets and water sports.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Chita Lodge Samfya", "https://chitalodge.com", "Bangweulu Beach", "ZMW", 1600, 1380, 4.8, 59],
  ["tongabezi-river-cottages", "tongabezi-luxury-lodge", "victoria-falls-livingstone", "stays", "Tongabezi Luxury Zambezi Riverfront Cottages", "Romantic luxury safari cottages perched high on the banks of the upper Zambezi River upstream from Victoria Falls.", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1100&q=82", "Tongabezi Lodge", "https://tongabezi.com", "Romantic Zambezi", "ZMW", 5800, 5100, 5.0, 76],

  // --- Tours (◓) ---
  ["vic-falls-guided-tour", "zambia-tourism-agency", "victoria-falls-livingstone", "tours", "Victoria Falls Rainforest Walking Tour", "Experience the thunder and rainbows of Mosi-oa-Tunya with certified local cultural guides through ancient rainforest trails.", "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1100&q=82", "Zambia Tourism Agency", "https://www.zambiatourism.com/destinations/waterfalls/victoria-falls", "World Wonder", "ZMW", 450, 380, 4.9, 89],
  ["south-luangwa-safari", "mfuwe-lodge-bushcamps", "south-luangwa-mfuwe", "tours", "South Luangwa Walking Safari & Game Drive", "Intimate wildlife encounters in Africa's premier national park with expert tracker guides following big cat trails on foot.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "Bushcamp Company", "https://bushcampcompany.com", "Walking Safari", "ZMW", 3800, 3350, 5.0, 96],
  ["devils-pool-swim-tour", "livingstone-adventures", "victoria-falls-livingstone", "tours", "Livingstone Island & Devil's Pool Swim", "Swim on the ultimate edge of Victoria Falls with expert guides during the dry season and enjoy royal afternoon high tea.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Livingstone Island Official", "https://livingstoneadventures.com", "Edge of the Falls", "ZMW", 1650, 1450, 4.9, 115],
  ["batoka-gorge-rafting", "livingstone-adventures", "victoria-falls-livingstone", "tours", "Zambezi White Water Rafting - Batoka Gorge", "World-renowned Grade 5 rapids through the dramatic black basalt Batoka Gorge beneath Victoria Falls.", "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82", "Livingstone Adventures", "https://livingstoneadventures.com", "Adrenaline Thrill", "ZMW", 1800, 1550, 4.8, 92],
  ["busanga-balloon-safari", "wilderness-safaris-zambia", "kafue-national-park", "tours", "Busanga Plains Hot Air Balloon Safari", "Float at sunrise over mist-covered floodplains witnessing lion prides and thousands of antelope from the sky.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Wilderness Safaris", "https://www.wildernessdestinations.com", "Sunrise Ballooning", "ZMW", 4500, 3950, 5.0, 37],
  ["lower-zambezi-canoe-safari", "chiawa-safaris-zambia", "lower-zambezi-valley", "tours", "Lower Zambezi 3-Day River Canoe Safari", "Drift silently past elephant herds, basking crocodiles, and pod hippos down tranquil channels of the Lower Zambezi.", "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82", "Chiawa Safaris", "https://chiawa.com", "Canoe Expedition", "ZMW", 3200, 2800, 4.9, 64],
  ["kalambo-falls-gorge-trek", "national-heritage-zambia", "lake-tanganyika-mbala", "tours", "Kalambo Falls & Lake Tanganyika Gorge Trek", "Guided descent along Africa's second highest uninterrupted waterfall gorge down to the pristine shores of Lake Tanganyika.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "National Heritage Zambia", "https://nhcczambia.org", "Gorge Trek", "ZMW", 850, 720, 4.8, 48],
  ["liuwa-wildebeest-expedition", "african-parks-zambia", "barotseland-mongu", "tours", "Liuwa Plain Great Wildebeest Migration Safari", "Witness Africa's second largest wildebeest migration, cheetah coalitions, and clan hyenas across vast savannahs.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "African Parks Zambia", "https://www.africanparks.org", "Migration Safari", "ZMW", 4200, 3700, 5.0, 52],
  ["shiwa-ngandu-manor-tour", "shiwa-safaris-estate", "muchinga-shiwa-ngandu", "tours", "Shiwa Ng'andu 'Africa House' Historical Estate Tour", "Explore the legendary 1920s English manor house built by Sir Stewart Gore-Browne, its extensive archives, and estate farm.", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=82", "Shiwa Safaris", "https://shiwangandu.com", "Historic Estate", "ZMW", 650, 550, 4.9, 41],
  ["chishimba-falls-nature-walk", "national-heritage-zambia", "kasama-chishimba-falls", "tours", "Chishimba Sacred Falls & Rainforest Trail", "Guided walking trail across a trio of sacred cascades (Mutumuna, Kaela, Chishimba) steeped in Bemba spiritual folklore.", "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "National Heritage Zambia", "https://nhcczambia.org", "Sacred Cascades", "ZMW", 350, 290, 4.8, 62],
  ["copperbelt-mining-heritage-trail", "zambia-tourism-agency", "copperbelt-ndola-kitwe", "tours", "Copperbelt Industrial & Dag Hammarskjöld Heritage Trail", "Explore the historic copper extraction heritage, ancient smelting artifacts, and the Dag Hammarskjöld UN peace memorial.", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82", "Copperbelt Tourism Board", "https://www.zambiatourism.com", "Heritage Trail", "ZMW", 400, 340, 4.7, 39],

  // --- Nature (◇) ---
  ["lower-zambezi-canoe", "chiawa-safaris-zambia", "lower-zambezi-valley", "nature", "Lower Zambezi Canoe & River Cruise Trail", "Glide alongside elephants and hippos on the peaceful channels of the Zambezi.", "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82", "Chiawa Safaris", "https://chiawa.com", "River Safari", "ZMW", 2900, 2550, 4.9, 54],
  ["lake-kariba-sunset-charter", "zambia-tourism-agency", "lake-kariba-siavonga", "nature", "Lake Kariba Sunset & Houseboat Cruise", "Relax on Africa's greatest inland lake with tiger fishing, breathtaking sunsets, and local hospitality.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Siavonga Tourism", "https://www.zambiatourism.com/destinations/lakes/lake-kariba", "Lake Escapes", "ZMW", 1850, 1600, 4.7, 38],
  ["kasanka-bat-migration-sanctuary", "kasanka-trust-zambia", "bangweulu-kasanka-wetlands", "nature", "Kasanka Giant Fruit Bat Migration Sanctuary", "Witness the world's largest mammal gathering as 10 million straw-colored fruit bats fill the Fibwe forest canopy at dusk.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Kasanka Trust", "https://kasankanationalpark.com", "Wildlife Spectacle", "ZMW", 1200, 1050, 4.9, 68],
  ["bangweulu-shoebill-wetlands-reserve", "african-parks-zambia", "bangweulu-kasanka-wetlands", "nature", "Bangweulu Wetlands & Shoebill Stork Sanctuary", "Venture into the pristine papyrus swamps of Bangweulu to spot the prehistoric Shoebill stork and endemic black lechwe.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "African Parks Zambia", "https://www.africanparks.org", "Rare Birdlife", "ZMW", 2100, 1850, 4.9, 44],
  ["lumangwe-falls-nature-reserve", "national-heritage-zambia", "luapula-waterfalls-kingdom", "nature", "Lumangwe Falls & Kabwelume Cascades", "Marvel at Zambia's 'Little Victoria Falls' measuring 35m high and 100m wide in the lush rainforest of Luapula.", "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "National Heritage Conservation", "https://nhcczambia.org", "Waterfalls Valley", "ZMW", 650, 550, 4.8, 36],
  ["chimfunshi-chimpanzee-orphanage", "chimfunshi-wildlife", "copperbelt-ndola-kitwe", "nature", "Chimfunshi Wildlife & Chimpanzee Sanctuary", "One of the world's largest chimpanzee sanctuaries sheltering rescued primates across expansive forested enclosures.", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82", "Chimfunshi Wildlife Trust", "https://www.chimfunshi.com", "Primate Sanctuary", "ZMW", 480, 400, 4.8, 52],
  ["mosi-oa-tunya-rhino-walk", "zambia-tourism-agency", "victoria-falls-livingstone", "nature", "Mosi-oa-Tunya White Rhino Walking Sanctuary", "Track endangered white rhinos on foot with dedicated armed Zambia Wildlife Authority rangers in Mosi-oa-Tunya National Park.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Zambia Wildlife Authority", "https://www.zambiatourism.com", "Rhino Encounter", "ZMW", 950, 820, 4.9, 87],
  ["lochinvar-lechwe-sanctuary", "zambia-tourism-agency", "lochinvar-monze-sanctuary", "nature", "Lochinvar National Park & Kafue Lechwe Birding Haven", "Vast wetlands on the Kafue Flats supporting world-record concentrations of water birds and tens of thousands of aquatic Kafue lechwe.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "Zambia Wildlife Authority", "https://www.zambiatourism.com", "Wetlands & Lechwe", "ZMW", 750, 640, 4.8, 43],
  ["source-of-zambezi-monument", "national-heritage-zambia", "solwezi-zambezi-west", "nature", "Source of the Zambezi National Botanical Monument", "Visit the pristine forested spring in Ikelenge where the mighty 2,700-kilometre Zambezi River begins its journey to the Indian Ocean.", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1100&q=82", "National Heritage Zambia", "https://nhcczambia.org", "River Source", "ZMW", 300, 250, 4.8, 51],
  ["mutinondo-granite-wilderness", "mutinondo-wilderness-trust", "muchinga-shiwa-ngandu", "nature", "Mutinondo Wilderness Granite Peaks & Waterfalls", "Privately protected 10,000-hectare pristine wilderness of giant granite inselbergs, crystal rivers, and miombo woodlands.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Mutinondo Wilderness", "https://mutinondozambia.com", "Granite Wilderness", "ZMW", 890, 760, 4.9, 38],
  ["samfya-white-beach-wetlands", "zambia-tourism-agency", "samfya-beach-bangweulu", "nature", "Samfya Lake Bangweulu Inland Marine Sanctuary", "Enjoy the endless turquoise freshwater horizons and pristine white sand dunes of Lake Bangweulu.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Luapula Tourism Board", "https://www.zambiatourism.com", "Inland Sea", "ZMW", 420, 360, 4.7, 72],

  // --- Culture (♨) ---
  ["kuomboka-royal-palace-heritage", "barotse-royal-establishment", "barotseland-mongu", "culture", "Barotseland Royal Palace & Nayuma Museum", "Explore the royal winter capital of Limulunga, the Litunga's royal palace, and the Barotse Royal Establishment archives.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "Barotse Royal Establishment", "https://barotseland.info", "Royal Heritage", "ZMW", 1500, 1300, 5.0, 78],
  ["maramba-cultural-village", "zambia-tourism-agency", "victoria-falls-livingstone", "culture", "Maramba Cultural Village & Traditional Crafts Market", "Immerse in Zambian tribal architecture, live traditional drumming, wood carvings, and authentic pottery workshops.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Livingstone Tourism Association", "https://www.zambiatourism.com", "Living Culture", "ZMW", 350, 290, 4.7, 63],
  ["lusaka-national-museum-heritage", "national-heritage-zambia", "lusaka-cultural-hub", "culture", "Lusaka National Museum & Freedom Statue Trail", "Journey through Zambia's independence history, ethnography, traditional witchcraft artifacts, and contemporary visual arts.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "National Museums Board", "https://nhcczambia.org", "National Heritage", "ZMW", 250, 200, 4.7, 95],
  ["choma-museum-tonga-heritage", "choma-museum-crafts", "victoria-falls-livingstone", "culture", "Choma Museum & Tonga Cultural Heritage Centre", "Dedicated to preserving the heritage, beadwork, baskets, and iron-age history of the Batonga people of Southern Zambia.", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82", "Choma Museum Trust", "https://chomamuseum.org", "Tonga Traditions", "ZMW", 300, 250, 4.8, 41],
  ["moto-moto-museum-mbala", "moto-moto-museum-trust", "lake-tanganyika-mbala", "culture", "Moto Moto Museum of Zambian Heritage", "Founded by Father Jean-Jacques Corbeil, housing the finest collection of Northern Bemba cultural artifacts and archaeological relics.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Moto Moto Museum Trust", "https://nhcczambia.org", "Ancient Bemba Culture", "ZMW", 280, 230, 4.8, 29],
  ["mukuni-royal-village-tour", "livingstone-adventures", "victoria-falls-livingstone", "culture", "Mukuni Royal Village Cultural Experience", "Walk through a living 13th-century Leya monarchy village, guided by elders explaining traditional governance, court huts, and herbal medicine.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "Mukuni Royal Establishment", "https://livingstoneadventures.com", "Leya Monarchy", "ZMW", 420, 360, 4.9, 110],
  ["kabwata-cultural-village-guild", "zambia-tourism-agency", "lusaka-cultural-hub", "culture", "Kabwata Cultural Village & Master Woodcarvers Guild", "Historic thatched-roof artisan enclave in Lusaka where woodcarvers, weavers, and leatherworkers create authentic handicrafts.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Kabwata Guild", "https://www.zambiatourism.com", "Artisan Enclave", "ZMW", 180, 150, 4.7, 86],
  ["mwata-kazembe-royal-palace", "lunda-royal-establishment", "luapula-waterfalls-kingdom", "culture", "Mwansabombwe Lunda Royal Palace & Heritage Centre", "Ancestral seat of the Mwata Kazembe kingdom featuring centuries of royal Lunda court regalia, battle drums, and archives.", "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "Lunda Royal Establishment", "https://nhcczambia.org", "Lunda Kingdom", "ZMW", 500, 420, 4.9, 74],
  ["gawa-undi-chewa-palace", "chewa-heritage-foundation", "chipata-mutenguleni-heritage", "culture", "Paramount Chief Gawa Undi Royal Chewa Complex", "The spiritual and cultural headquarters of the Chewa people across Zambia, Malawi, and Mozambique, home of the sacred Gule Wamkulu.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Chewa Heritage Foundation", "https://nhcczambia.org", "Chewa Monarchy", "ZMW", 450, 380, 4.9, 68],
  ["copperbelt-museum-ndola", "national-heritage-zambia", "copperbelt-ndola-kitwe", "culture", "Copperbelt Museum of Geological & Cultural History", "National museum housing extensive mineral collections, indigenous mining artifacts, and ethnography of Copperbelt tribes.", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82", "National Museums Board", "https://nhcczambia.org", "Geological & Cultural", "ZMW", 200, 160, 4.6, 52],

  // --- Events (◎) ---
  ["ncwala-ceremony-event", "ngoni-royal-council", "chipata-mutenguleni-heritage", "events", "Nc'wala Traditional Ceremony & Warrior Dance", "Annual first-fruits ceremony celebrated every February by the Ngoni people, featuring Paramount Chief Mpezeni and impis in full regalia.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "Ngoni Royal Council", "https://www.zambiatourism.com", "Traditional Ceremony", "ZMW", 850, 720, 5.0, 110],
  ["kuomboka-festival-pass", "barotse-royal-establishment", "barotseland-mongu", "events", "Kuomboka Ceremony VIP Pavilion & Boat Escort", "The world-famous water pageant as the Litunga travels in the massive Nalikwanda barge from Lealui to the highlands of Limulunga.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Barotse Royal Establishment", "https://barotseland.info", "Royal Water Pageant", "ZMW", 1800, 1550, 5.0, 134],
  ["umutomboko-ceremony-event", "lunda-royal-establishment", "luapula-waterfalls-kingdom", "events", "Umutomboko Ceremony & Royal Sword Dance", "Celebration of the Lunda kingdom's conquest where King Mwata Kazembe performs the legendary Mutomboko dance of triumph.", "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "Lunda Royal Establishment", "https://nhcczambia.org", "Lunda Royal Ceremony", "ZMW", 800, 680, 4.9, 87],
  ["likumbi-lya-mize-event", "luvale-cultural-association", "solwezi-zambezi-west", "events", "Likumbi Lya Mize & Makishi Masquerade Festival", "UNESCO-recognized cultural masterpiece featuring the sacred Makishi masked dancers and Luvale initiation traditions.", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1100&q=82", "Luvale Cultural Association", "https://nhcczambia.org", "UNESCO Masterpiece", "ZMW", 750, 620, 4.9, 76],
  ["livingstone-cultural-arts-festival", "zambia-tourism-agency", "victoria-falls-livingstone", "events", "Livingstone International Cultural Arts Festival", "Carnival-style celebration featuring dancers and musicians from all 10 provinces converging at Victoria Falls.", "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1100&q=82", "Zambia Tourism Agency", "https://www.zambiatourism.com", "Arts & Music Carnival", "ZMW", 950, 800, 4.8, 98],
  ["shimunnga-cattle-ceremony", "zambia-tourism-agency", "lochinvar-monze-sanctuary", "events", "Shimunnga Traditional Cattle Gathering & Ila Regalia", "Ancestral cattle festival of the Ila people of Namwala, showcasing thousands of cattle swimming across the Kafue River floodplains.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Ila Cultural Association", "https://www.zambiatourism.com", "Cattle Pageant", "ZMW", 600, 500, 4.9, 65],
  ["kulamba-chewa-ceremony", "chewa-heritage-foundation", "chipata-mutenguleni-heritage", "events", "Kulamba Ceremony of the Great Chewa Kingdom", "International cultural gathering where over 130 Chewa chiefs from Zambia, Malawi, and Mozambique pay homage to King Gawa Undi.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "Chewa Heritage Foundation", "https://nhcczambia.org", "Gule Wamkulu Festival", "ZMW", 820, 700, 5.0, 92],
  ["ukusefya-pa-ngwena-bemba", "bemba-royal-council", "kasama-chishimba-falls", "events", "Ukusefya Pa Ng'wena Royal Bemba Celebration", "Spectacular reenactment of the Bemba migration from Kola, featuring Paramount Chief Chitimukulu carried on a royal crocodile litter.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Bemba Royal Council", "https://nhcczambia.org", "Bemba Royal Pageant", "ZMW", 780, 660, 4.9, 84],
  ["zambia-international-trade-fair", "zambia-trade-fair-society", "copperbelt-ndola-kitwe", "events", "Zambia International Trade Fair Ndola", "Zambia's largest industrial trade expo gathering commercial exhibitors, manufacturing leaders, and international delegations.", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=82", "Trade Fair Society", "https://zitf.org.zm", "Commercial Expo", "ZMW", 350, 290, 4.7, 102],
  ["zambia-agriculture-show-lusaka", "zambia-agriculture-society", "lusaka-cultural-hub", "events", "Zambia National Agriculture & Commercial Show", "Annual premier national exhibition in Lusaka featuring pedigree livestock, agricultural innovations, and live musical arenas.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82", "Agriculture Society Zambia", "https://acsz.co.zm", "National Expo", "ZMW", 300, 250, 4.8, 125],

  // --- Transport (➜) ---
  ["zambia-airways-domestic-pass", "zambia-airways", "lusaka-cultural-hub", "transport", "Zambia Airways Domestic Scheduled Flights", "Seamless air connections linking Lusaka International Airport with Livingstone, Ndola, and Mfuwe South Luangwa.", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1100&q=82", "Zambia Airways Official", "https://www.zambiaairways.co.zm", "Scheduled Flights", "ZMW", 1650, 1450, 4.8, 120],
  ["proflight-zambia-safari-hopper", "proflight-zambia", "lusaka-cultural-hub", "transport", "Proflight Zambia Safari Bush Shuttle", "Specialized bush flights landing directly inside South Luangwa, Lower Zambezi, Kafue, and Livingstone airstrips.", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1100&q=82", "Proflight Zambia", "https://www.proflight-zambia.com", "Safari Flights", "ZMW", 2450, 2150, 4.9, 145],
  ["livingstone-safari-transfers", "royal-chariot-transfers", "victoria-falls-livingstone", "transport", "Livingstone Airport & Victoria Falls 4x4 Transfers", "Comfortable air-conditioned private 4x4 airport pickup and lodge transfers with luggage assistance.", "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=82", "Royal Chariot Transfers", "https://royalchariot.co.zm", "Airport Transfers", "ZMW", 450, 380, 4.8, 88],
  ["zam-4x4-safari-car-hire", "zam-4x4-expeditions", "lusaka-cultural-hub", "transport", "4x4 Safari Land Cruiser Rental & Overland Kit", "Heavy-duty Toyota Land Cruiser equipped with dual spare tires, GPS Garmin navigation, satellite phone, and rooftop tent.", "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=82", "ZamRoam Overland", "https://zamroam.com/4x4", "Self-Drive 4x4", "ZMW", 1950, 1700, 4.9, 64],
  ["zambezi-express-boat-transfers", "livingstone-adventures", "victoria-falls-livingstone", "transport", "Zambezi River Luxury Catamaran & Water Taxi", "Scenic river transfers between Livingstone waterfront, river lodges, and island excursion landing docks.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Livingstone Adventures", "https://livingstoneadventures.com", "Water Taxi", "ZMW", 550, 470, 4.7, 58],
  ["tazara-passenger-express", "tazara-railway-authority", "muchinga-shiwa-ngandu", "transport", "TAZARA Railway Mukuba Scenic Express", "Iconic trans-African passenger rail journey linking Kapiri Mposhi with Mpika, Kasama, Nakonde, and Dar es Salaam.", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1100&q=82", "TAZARA Railway Authority", "https://tazarasite.com", "Scenic Railway", "ZMW", 750, 640, 4.8, 96],
  ["royal-livingstone-express-train", "royal-livingstone-resort", "victoria-falls-livingstone", "transport", "The Royal Livingstone Express Steam Train & Dining", "Steam train excursion across the historic Victoria Falls Bridge with five-course gourmet dinner and sunset viewing.", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=82", "Royal Livingstone Resort", "https://www.anantara.com/en/royal-livingstone", "Steam Train Dining", "ZMW", 2850, 2450, 5.0, 84],
  ["siavonga-kariba-water-taxi", "zambia-tourism-agency", "lake-kariba-siavonga", "transport", "Lake Kariba Houseboat Shuttle & Water Taxi", "Convenient boat transfers and pontoon shuttles connecting Siavonga harbor with island chalets and fishing camps.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Lake Kariba Charters", "https://www.zambiatourism.com", "Lake Water Taxi", "ZMW", 620, 530, 4.7, 51],
  ["mfuwe-airport-bush-transfer", "mfuwe-lodge-bushcamps", "south-luangwa-mfuwe", "transport", "South Luangwa Safari 4x4 Airstrip Shuttle", "Open-sided customized safari vehicle pickup from Mfuwe International Airport with en-route game viewing.", "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=82", "Bushcamp Company", "https://bushcampcompany.com", "Airstrip Safari Shuttle", "ZMW", 480, 410, 4.9, 78],
  ["lusaka-executive-chauffeur-service", "royal-chariot-transfers", "lusaka-cultural-hub", "transport", "Lusaka Airport VIP Chauffeur & City Shuttle", "Executive chauffeured luxury sedan and Mercedes sprinter transfers from Kenneth Kaunda International Airport to city hotels.", "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=82", "Royal Chariot Transfers", "https://royalchariot.co.zm", "VIP Chauffeur", "ZMW", 580, 490, 4.8, 114],
  ["ndole-bay-lake-ferry-charter", "ndole-bay-resort", "lake-tanganyika-mbala", "transport", "Ndole Bay Lake Tanganyika Boat Charter", "Customized lake cruiser charters for diving expeditions, Nsumbu National Park access, and scenic lake crossings.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Ndole Bay Lodge", "https://ndolebaylodge.com", "Lake Charter", "ZMW", 1150, 980, 4.9, 44]
];

export async function ensureCatalogue() {
  const d1 = env.DB;
  if (!d1) throw new Error("Database binding DB is unavailable");

  await ensureCountries();
  await ensureCountryGeography("PNG");
  await ensureCountryGeography("ZMB");

  await d1.batch(schemaStatements.map(sql => d1.prepare(sql)));

  const safeAlter = async (sql: string) => {
    try { await d1.prepare(sql).run(); } catch {}
  };
  await safeAlter("ALTER TABLE provinces ADD COLUMN country_id INTEGER");
  await safeAlter("ALTER TABLE destinations ADD COLUMN country_id INTEGER");
  await safeAlter("ALTER TABLE categories ADD COLUMN country_id INTEGER");
  await safeAlter("ALTER TABLE providers ADD COLUMN country_id INTEGER");
  await safeAlter("ALTER TABLE listings ADD COLUMN country_id INTEGER");
  await safeAlter("ALTER TABLE destinations ADD COLUMN source_url TEXT");
  await safeAlter("ALTER TABLE listings ADD COLUMN photo_credit TEXT");
  await safeAlter("ALTER TABLE listings ADD COLUMN deep_link_url TEXT");
  await safeAlter("ALTER TABLE listings ADD COLUMN last_reviewed_at TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN legal_name TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN license_number TEXT");

  const pngCountry = await d1.prepare("SELECT id FROM countries WHERE UPPER(code)='PNG'").first<{ id: number }>();
  const zmbCountry = await d1.prepare("SELECT id FROM countries WHERE UPPER(code)='ZMB'").first<{ id: number }>();
  const pngId = pngCountry?.id ?? 1;
  const zmbId = zmbCountry?.id ?? 2;

  // 1. Seed Categories
  for (const c of categorySeed) {
    await d1.prepare("INSERT OR IGNORE INTO categories (slug, name, icon, display_order) VALUES (?, ?, ?, ?)").bind(c[0], c[1], c[2], c[3]).run();
  }

  // 2. Seed PNG Destinations, Providers, Listings
  for (const d of pngDestinationSeed) {
    const prov = await d1.prepare("SELECT id FROM provinces WHERE code=?").bind(d[3]).first<{ id: number }>();
    if (prov) {
      await d1.prepare("INSERT OR IGNORE INTO destinations (slug, name, summary, province_id, district, latitude, longitude, cover_image_url, source_url, country_id, is_test_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)")
        .bind(d[0], d[1], d[2], prov.id, d[4], d[5], d[6], d[7], d[8], pngId).run();
      await d1.prepare("UPDATE destinations SET summary=?, cover_image_url=?, source_url=?, is_test_data=0 WHERE slug=?").bind(d[2], d[7], d[8], d[0]).run();
    }
  }
  for (const p of pngProviderSeed) {
    await d1.prepare("INSERT OR IGNORE INTO providers (slug, trading_name, source_name, source_url, country_id, is_test_data) VALUES (?, ?, ?, ?, ?, 0)")
      .bind(p[0], p[1], p[2], p[3], pngId).run();
    await d1.prepare("UPDATE providers SET trading_name=?, source_name=?, source_url=?, is_test_data=0 WHERE slug=?").bind(p[1], p[2], p[3], p[0]).run();
  }
  for (const l of pngListingSeed) {
    const prov = await d1.prepare("SELECT id FROM providers WHERE slug=?").bind(l[1]).first<{ id: number }>();
    const dest = await d1.prepare("SELECT id FROM destinations WHERE slug=?").bind(l[2]).first<{ id: number }>();
    const cat = await d1.prepare("SELECT id FROM categories WHERE slug=?").bind(l[3]).first<{ id: number }>();
    if (prov && dest && cat) {
      await d1.prepare("INSERT OR IGNORE INTO listings (slug, provider_id, destination_id, category_id, name, summary, image_url, photo_credit, deep_link_url, tag, currency, base_price, member_price, rating, review_count, country_id, publication_status, is_test_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', 0)")
        .bind(l[0], prov.id, dest.id, cat.id, l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], pngId).run();
      await d1.prepare("UPDATE listings SET provider_id=?, destination_id=?, category_id=?, name=?, summary=?, image_url=?, photo_credit=?, deep_link_url=?, tag=?, currency=?, base_price=?, member_price=?, rating=?, review_count=?, country_id=?, publication_status='published', is_test_data=0 WHERE slug=?")
        .bind(prov.id, dest.id, cat.id, l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], pngId, l[0]).run();
    }
  }

  // 3. Seed Zambia Destinations, Providers, Listings
  for (const d of zambiaDestinationSeed) {
    const prov = await d1.prepare("SELECT id FROM provinces WHERE code=?").bind(d[3]).first<{ id: number }>();
    if (prov) {
      await d1.prepare("INSERT OR IGNORE INTO destinations (slug, name, summary, province_id, district, latitude, longitude, cover_image_url, source_url, country_id, is_test_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)")
        .bind(d[0], d[1], d[2], prov.id, d[4], d[5], d[6], d[7], d[8], zmbId).run();
      await d1.prepare("UPDATE destinations SET summary=?, cover_image_url=?, source_url=?, is_test_data=0 WHERE slug=?").bind(d[2], d[7], d[8], d[0]).run();
    }
  }
  for (const p of zambiaProviderSeed) {
    await d1.prepare("INSERT OR IGNORE INTO providers (slug, trading_name, source_name, source_url, country_id, is_test_data) VALUES (?, ?, ?, ?, ?, 0)")
      .bind(p[0], p[1], p[2], p[3], zmbId).run();
    await d1.prepare("UPDATE providers SET trading_name=?, source_name=?, source_url=?, is_test_data=0 WHERE slug=?").bind(p[1], p[2], p[3], p[0]).run();
  }
  for (const l of zambiaListingSeed) {
    const prov = await d1.prepare("SELECT id FROM providers WHERE slug=?").bind(l[1]).first<{ id: number }>();
    const dest = await d1.prepare("SELECT id FROM destinations WHERE slug=?").bind(l[2]).first<{ id: number }>();
    const cat = await d1.prepare("SELECT id FROM categories WHERE slug=?").bind(l[3]).first<{ id: number }>();
    if (prov && dest && cat) {
      await d1.prepare("INSERT OR IGNORE INTO listings (slug, provider_id, destination_id, category_id, name, summary, image_url, photo_credit, deep_link_url, tag, currency, base_price, member_price, rating, review_count, country_id, publication_status, is_test_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', 0)")
        .bind(l[0], prov.id, dest.id, cat.id, l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], zmbId).run();
      await d1.prepare("UPDATE listings SET provider_id=?, destination_id=?, category_id=?, name=?, summary=?, image_url=?, photo_credit=?, deep_link_url=?, tag=?, currency=?, base_price=?, member_price=?, rating=?, review_count=?, country_id=?, publication_status='published', is_test_data=0 WHERE slug=?")
        .bind(prov.id, dest.id, cat.id, l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], zmbId, l[0]).run();
    }
  }

  // 4. Backfill existing NULLs to guarantee zero cross-country spillage
  await d1.prepare("UPDATE provinces SET country_id = ? WHERE country_id IS NULL AND code NOT LIKE 'ZM-%'").bind(pngId).run();
  await d1.prepare("UPDATE provinces SET country_id = ? WHERE country_id IS NULL AND code LIKE 'ZM-%'").bind(zmbId).run();
  await d1.prepare("UPDATE destinations SET country_id = ? WHERE country_id IS NULL AND (slug LIKE '%livingstone%' OR slug LIKE '%luangwa%' OR slug LIKE '%kariba%' OR slug LIKE '%chaminuka%' OR slug LIKE '%barotseland%' OR slug LIKE '%luapula%' OR slug LIKE '%bangweulu%' OR slug LIKE '%tanganyika%' OR slug LIKE '%chipata%' OR slug LIKE '%solwezi%' OR slug LIKE '%copperbelt%' OR slug LIKE '%muchinga%' OR slug LIKE '%lochinvar%' OR slug LIKE '%kasama%' OR slug LIKE '%samfya%')").bind(zmbId).run();
  await d1.prepare("UPDATE destinations SET country_id = ? WHERE country_id IS NULL").bind(pngId).run();
  await d1.prepare("UPDATE listings SET country_id = ? WHERE currency = 'PGK'").bind(pngId).run();
  await d1.prepare("UPDATE listings SET country_id = ? WHERE currency = 'ZMW'").bind(zmbId).run();
  await d1.prepare("UPDATE listings SET publication_status = 'published' WHERE publication_status IS NULL OR publication_status != 'published'").run();
}

export async function getCatalogue(query = "", category = "all", countryCode = "ZMB") {
  await ensureCatalogue();
  const d1 = env.DB;
  if (!d1) throw new Error("Database binding DB is unavailable");

  const normalizedCountry = String(countryCode || "PNG").toUpperCase();
  const countryRow = await d1.prepare("SELECT id, code, name, currency_code, currency_symbol FROM countries WHERE UPPER(code)=?").bind(normalizedCountry).first<{ id: number; code: string; name: string; currency_code: string; currency_symbol: string }>();
  const countryId = countryRow?.id ?? (normalizedCountry === "ZMB" || normalizedCountry === "ZM" ? 2 : 1);
  const like = `%${query.trim()}%`;

  const result = await d1.prepare(`
    SELECT l.id, l.slug, l.name, l.summary, l.image_url AS imageUrl, l.photo_credit AS photoCredit,
      COALESCE(l.deep_link_url, p.source_url) AS deepLinkUrl, l.tag, l.currency,
      l.base_price AS basePrice, l.member_price AS memberPrice, l.rating,
      l.review_count AS reviewCount, l.verification_status AS verificationStatus,
      l.is_test_data AS isTestData,
      d.name AS destination, d.district AS district, d.latitude, d.longitude,
      pv.name AS province, pv.code AS provinceCode, pv.region AS provinceRegion,
      c.slug AS categorySlug, c.name AS categoryName,
      p.trading_name AS providerName, p.source_url AS sourceUrl
    FROM listings l
    JOIN destinations d ON d.id=l.destination_id
    JOIN provinces pv ON pv.id=d.province_id
    JOIN categories c ON c.id=l.category_id
    JOIN providers p ON p.id=l.provider_id
    WHERE l.publication_status='published'
      AND 1=1 AND l.country_id = ?
      AND (?='' OR l.name LIKE ? OR l.summary LIKE ? OR l.tag LIKE ? OR d.name LIKE ? OR d.summary LIKE ? OR d.district LIKE ? OR pv.name LIKE ? OR pv.region LIKE ? OR c.name LIKE ? OR p.trading_name LIKE ?)
      AND (?='all' OR c.slug=?)
    ORDER BY l.rating DESC, l.name ASC
  `).bind(countryId, query.trim(), like, like, like, like, like, like, like, like, like, like, category, category).all();

  const cats = await d1.prepare("SELECT slug, name, icon, display_order AS displayOrder FROM categories WHERE is_active=1 ORDER BY display_order").all();

  return {
    country: countryRow ? {
      id: countryRow.id,
      code: countryRow.code,
      name: countryRow.name,
      currencyCode: countryRow.currency_code,
      currencySymbol: countryRow.currency_symbol
    } : undefined,
    categories: cats.results,
    listings: result.results,
    meta: {
      count: result.results.length,
      seededTestData:true
    }
  };
}

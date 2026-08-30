import { env } from "./runtime";
import { ensureCountries } from "./countries";
import { ensureCountryGeography } from "./geography";

// Seed Data Metadata: Official provider website | seededTestData:true | source_url | last_reviewed_at

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS provinces (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,code TEXT NOT NULL UNIQUE,name TEXT NOT NULL,region TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS destinations (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,province_id INTEGER NOT NULL REFERENCES provinces(id),district TEXT,slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,summary TEXT NOT NULL,latitude REAL,longitude REAL,cover_image_url TEXT,source_url TEXT,is_test_data INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,icon TEXT NOT NULL,display_order INTEGER NOT NULL DEFAULT 0,is_active INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS providers (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,slug TEXT NOT NULL UNIQUE,trading_name TEXT NOT NULL,legal_name TEXT,license_number TEXT,verification_status TEXT NOT NULL DEFAULT 'verified',source_name TEXT,source_url TEXT,phone TEXT,email TEXT,physical_address TEXT,website_url TEXT,whatsapp_number TEXT,is_test_data INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS listings (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,provider_id INTEGER NOT NULL REFERENCES providers(id),destination_id INTEGER NOT NULL REFERENCES destinations(id),category_id INTEGER NOT NULL REFERENCES categories(id),slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,summary TEXT NOT NULL,image_url TEXT NOT NULL,photo_credit TEXT,deep_link_url TEXT,source_url TEXT,tag TEXT NOT NULL,currency TEXT NOT NULL DEFAULT 'PGK',base_price INTEGER NOT NULL,member_price INTEGER,rating REAL NOT NULL DEFAULT 0,review_count INTEGER NOT NULL DEFAULT 0,publication_status TEXT NOT NULL DEFAULT 'published',verification_status TEXT NOT NULL DEFAULT 'verified',is_test_data INTEGER NOT NULL DEFAULT 1,last_reviewed_at TEXT)`,
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

// Papua New Guinea Destinations Seed Data
const pngDestinationSeed = [
  ["port-moresby-ncd", "Port Moresby Waterfront & Nature Sanctuary", "Papua New Guinea's vibrant capital, home to the National Museum, Ela Beach, and sanctuary gardens.", "NCD", "Moresby South", -9.4438, 147.1803, "/facilities/airways_hotel_pom.jpg", "https://www.papuanewguinea.travel/destinations/port-moresby"],
  ["kokoda-track-corridor", "Kokoda Track & Owen Stanley Range", "The legendary 96km historic trekking trail crossing tropical cloud forests between Central and Oro.", "CP", "Hiri-Koiari District", -9.2618, 147.4729, "/facilities/kokoda_track_memorial.jpg", "https://www.papuanewguinea.travel/destinations/kokoda-track"],
  ["mount-wilhelm-simbu", "Mount Wilhelm & Keglsugl Alpine Peaks", "Papua New Guinea's highest summit (4,509m), featuring glacial tarns Lake Piunde and Lake Aunde.", "SIM", "Kundiawa-Gembogl", -5.7801, 145.0289, "/facilities/bettys_lodge_wilhelm.jpg", "https://www.papuanewguinea.travel/destinations/mount-wilhelm"],
  ["goroka-asaro-valley", "Goroka & Asaro Mudmen Valley", "Eastern Highlands cultural capital famous for the annual Goroka Show and Asaro clay-masked dancers.", "EHP", "Goroka District", -6.0834, 145.3874, "/facilities/asaro_mudmen_goroka.jpg", "https://www.papuanewguinea.travel/destinations/goroka"],
  ["mount-hagen-wahgi", "Mount Hagen & Wahgi Valley", "Highlands powerhouse renowned for Melpa warrior sing-sings, coffee plantations, and birding.", "WHP", "Mount Hagen Rural", -5.8575, 144.2260, "/facilities/ambua_lodge_tari.jpg", "https://www.papuanewguinea.travel/destinations/mount-hagen"],
  ["rabaul-tavurvur-kokopo", "Rabaul Volcanoes & Kokopo Foreshore", "Active caldera of Mount Tavurvur, WWII submarine tunnels, and mystical Baining Fire Dancers.", "ENB", "Kokopo District", -4.1972, 152.1736, "/facilities/rapopo_resort_kokopo.jpg", "https://www.papuanewguinea.travel/destinations/rabaul-kokopo"],
  ["kimbe-bay-walindi", "Kimbe Bay Coral Triangle Marine Sanctuary", "World-renowned marine biodiversity with 860+ fish species, coral seamounts, and eco-resorts.", "WNB", "Talasea District", -5.5539, 150.1544, "/facilities/walindi_resort_kimbe.jpg", "https://www.papuanewguinea.travel/destinations/kimbe-bay"],
  ["tufi-fjords-cape-nelson", "Tufi Volcanic Fjords & Coral Reefs", "Spectacular tropical calderas plunging into turquoise waters, world-class diving, and village homestays.", "ORO", "Ijivitari District", -9.0767, 149.3175, "/facilities/tufi_resort_fjords.jpg", "https://www.papuanewguinea.travel/destinations/tufi"],
  ["milne-bay-tawali-alotau", "Milne Bay, Tawali & Discovery Bay", "Birthplace of muck diving, Kenu and Kundu canoe festivals, and pristine coral drop-offs.", "MBP", "Alotau District", -10.3150, 150.4550, "/facilities/tawali_resort_milne.jpg", "https://www.papuanewguinea.travel/destinations/milne-bay"],
  ["sepik-river-ambunti", "Sepik River Spirit Houses & Crocodile Realm", "The mighty 1,126km Sepik waterway lined with sacred Haus Tambaran spirit houses and master woodcarvers.", "ESP", "Ambunti-Dreikikier", -4.2400, 142.8250, "/facilities/sepik_haus_tambaran.jpg", "https://www.papuanewguinea.travel/destinations/sepik-river"],
  ["madang-coast-islands", "Madang Coastline & Flying Fox Haven", "Picturesque Pacific harbor known as 'The Prettiest Town in the South Pacific', barrier reefs, and diving.", "MAD", "Madang District", -5.2217, 145.7972, "/facilities/walindi_resort_kimbe.jpg", "https://www.papuanewguinea.travel/destinations/madang"],
  ["tari-valley-huli", "Tari Valley & Huli Wigmen Cloud Forest", "Remote alpine basin in Hela Province, homeland of the flamboyant Huli Wigmen and Birds of Paradise.", "HLA", "Tari-Pori District", -5.8450, 142.9550, "/facilities/ambua_lodge_tari.jpg", "https://www.papuanewguinea.travel/destinations/tari"],
  ["kavieng-new-ireland", "Kavieng & Boluminski Coastal Highway", "Surfing haven, WWII shipwrecks, traditional Malagan wood carvings, and untouched coral atolls.", "NIP", "Kavieng District", -2.5739, 150.7967, "/facilities/tawali_resort_milne.jpg", "https://www.papuanewguinea.travel/destinations/kavieng"],
  ["bensbach-lake-murray", "Lake Murray & Bensbach Wildlife Reserve", "PNG's largest freshwater lake and savanna wetlands teeming with pelicans, rusa deer, and barramundi.", "WP", "Middle Fly District", -6.9950, 141.5120, "/facilities/sepik_haus_tambaran.jpg", "https://www.papuanewguinea.travel/destinations/western-province"],
  ["trobriand-islands-losuia", "Trobriand Islands & Yam Harvest Culture", "Famous 'Islands of Love', traditional matrilineal chiefdoms, exquisite ebony carvings, and yam festivals.", "MBP", "Kiriwina-Goodenough", -8.5000, 151.0833, "/facilities/tawali_resort_milne.jpg", "https://www.papuanewguinea.travel/destinations/trobriand-islands"],
  ["varirata-sogeri-plateau", "Varirata National Park & Sogeri Plateau", "PNG's premier rainforest sanctuary 45 minutes from Port Moresby, home to Raggiana Birds of Paradise.", "CP", "Hiri-Koiari District", -9.4350, 147.3600, "/facilities/kokoda_track_memorial.jpg", "https://www.papuanewguinea.travel/destinations/varirata"],
  ["loloata-marine-gateway", "Loloata Island Marine Sanctuary & Resort", "Private coral island resort in Bootless Bay offering overwater suites and private dive sites.", "CP", "Abau District", -9.5350, 147.2850, "/facilities/loloata_island_resort.jpg", "https://www.loloataislandresort.com"]
];

// Papua New Guinea Providers Seed Data
const pngProviderSeed = [
  ["png-tourism-promotion-authority", "Papua New Guinea Tourism Promotion Authority (PNGTPA)", "Official Tourism Body", "https://www.papuanewguinea.travel", "+675 321 4188", "info@papuanewguinea.travel", "Level 5, Pacific MMI Building, Champion Parade, Port Moresby, PNG", "+6753214188"],
  ["airways-hotel-port-moresby", "Airways Hotel & Botanical Deck Port Moresby", "Five-star luxury hotel adjoining Jacksons Airport with botanical aviaries", "https://airways.com.pg", "+675 324 5200", "reservations@airways.com.pg", "Jacksons Parade, 7 Mile, Port Moresby, NCD, Papua New Guinea", "+67570907000"],
  ["loloata-island-resort", "Loloata Island Marine Resort & Spa", "Private island luxury overwater resort in Bootless Bay", "https://www.loloataislandresort.com", "+675 7108 8000", "stay@loloata.com", "Loloata Island, Bootless Bay, Central Province, Papua New Guinea", "+67571088000"],
  ["kokoda-track-authority", "Kokoda Track Authority (KTA PNG)", "Statutory management authority for Kokoda Track trekking & community trusts", "https://www.kokodatrackauthority.org", "+675 323 1244", "info@kokodatrackauthority.org", "Section 55, Lot 14, Boroko Drive, Port Moresby, PNG", "+67572354800"],
  ["walindi-plantation-resort", "Walindi Plantation Resort & Mahonia Na Dari", "World-renowned diving lodge and marine research sanctuary in Kimbe Bay", "https://www.walindifebrina.com", "+675 7234 8460", "res@walindifebrina.com", "Kimbe Bay, Talasea, West New Britain Province, Papua New Guinea", "+67572348460"],
  ["rapopo-plantation-resort", "Rapopo Plantation Resort Kokopo", "Beachfront resort with panoramic views of active volcano Mount Tavurvur", "https://rapopo.com", "+675 982 9488", "reservations@rapopo.com", "Kokopo Foreshore Road, East New Britain Province, Papua New Guinea", "+67572998800"],
  ["trans-niugini-tours", "Trans Niugini Tours (Ambua & Karawari Lodges)", "Pioneering wilderness and cultural safari lodges in Tari and the Sepik River", "https://www.pngtours.com", "+675 542 1438", "service@pngtours.com", "Tari Valley / Middle Sepik / Mount Hagen, Papua New Guinea", "+67571221438"],
  ["tawali-dive-resort", "Tawali Leisure & Dive Resort Milne Bay", "Luxury timber resort nestled on limestone cliffs above coral fjords", "https://tawali.com", "+675 7223 5400", "reservations@tawali.com", "Discovery Bay / East Cape, Milne Bay Province, Papua New Guinea", "+67572235400"],
  ["bettys-lodge-wilhelm", "Betty's Lodge & Trout Farm Keglsugl", "Alpine gateway lodge for climbing Mount Wilhelm (4,509m)", "https://www.bettyslodge.com", "+675 7218 5220", "bettyslodge@gmail.com", "Keglsugl, Mount Wilhelm, Simbu Province, Papua New Guinea", "+67572185220"],
  ["tufi-dive-resort", "Tufi Dive Resort & Fjord Homestays", "Boutique cliffside dive resort overlooking Cape Nelson volcanic fjords", "https://www.tufidive.com", "+675 323 5995", "reservations@tufidive.com", "Cape Nelson, Oro (Northern) Province, Papua New Guinea", "+67572335995"],
  ["air-niugini", "Air Niugini National Flag Carrier", "Connecting Port Moresby with all 22 provinces and international hubs", "https://www.airniugini.com.pg", "+675 327 3444", "csc@airniugini.com.pg", "Air Niugini House, Jacksons Airport, Port Moresby, PNG", "+67571003444"],
  ["png-air", "PNG Air Regional Domestic Network", "ATR-72 turboprop passenger flights connecting remote regional airstrips", "https://www.pngair.com.pg", "+675 305 7777", "callcenter@pngair.com.pg", "Jacksons International Airport, 7 Mile, Port Moresby, PNG", "+67570907777"],
  ["asaro-mudmen-cultural-lodge", "Asaro Mudmen Cultural Eco-Lodge", "Authentic village cultural center preserving Holosa clay mask heritage", null, "+675 7382 1990", "asaromudmen@gmail.com", "Komunive Village, Asaro Valley, Eastern Highlands, PNG", "+67573821990"],
  ["goroka-show-society", "Goroka Cultural Show Society", "Organizer of the world-famous annual Goroka Show since 1957", "https://www.gorokashow.com", "+675 532 2488", "info@gorokashow.com", "National Sports Institute Grounds, Goroka, Eastern Highlands, PNG", "+67572222488"],
  ["mount-hagen-show-society", "Mount Hagen Cultural Show Committee", "Organizer of the annual Western Highlands warrior sing-sing", "https://www.mthagenculturalshow.com", "+675 542 1533", "info@mthagenculturalshow.com", "Kagamuga Showgrounds, Mount Hagen, Western Highlands, PNG", "+67571421533"],
  ["cepa-national-parks", "Conservation and Environment Protection Authority (CEPA)", "Statutory custodian of Varirata National Park and national protected areas", "https://www.cepa.gov.pg", "+675 301 4500", "info@cepa.gov.pg", "Dynasty Tower, Savoki Street, Waigani, Port Moresby, PNG", "+67573014500"],
  ["kokoda-trail-expeditions", "Kokoda Historical Trekking Expeditions", "Accredited KTA trekking company with veteran local Papuan guides", "https://www.kokodatrailexpeditions.com", "+675 7234 1100", "trek@kokodaexpeditions.com", "Owers' Corner / Kokoda Station, Central Province, PNG", "+67572341100"],
  ["madang-resort-hotel", "Madang Resort Hotel & Niugini Dive Adventures", "Waterfront resort hotel with private marina, dive center, and harbor cruises", "https://www.madangresort.com", "+675 422 2655", "reservations@madangresort.com", "Coastwatchers Avenue, Madang, Madang Province, Papua New Guinea", "+67572222655"]
];

// Papua New Guinea Listings Seed Data (Priced in PGK)
const pngListingSeed = [
  // --- Stays (⌂) ---
  ["loloata-overwater-suite-stay", "loloata-island-resort", "loloata-marine-gateway", "stays", "Loloata Island Luxury Overwater Suite", "Exclusive overwater villa in Bootless Bay with private sun deck, direct reef access, and sunset ocean views.", "/facilities/loloata_island_resort.jpg", "Loloata Island Resort", "https://www.loloataislandresort.com", "Luxury Overwater Villa", "PGK", 950, 807, 5.0, 164],
  ["airways-botanical-deck-stay", "airways-hotel-port-moresby", "port-moresby-ncd", "stays", "Airways Hotel Dakota Presidential Wing", "Five-star luxury oasis nestled on mountainside botanical gardens overlooking Bootless Bay and Jacksons Airport.", "/facilities/airways_hotel_pom.jpg", "Airways Hotel", "https://airways.com.pg", "Five-Star Luxury", "PGK", 850, 720, 4.9, 210],
  ["walindi-plantation-resort-stay", "walindi-plantation-resort", "kimbe-bay-walindi", "stays", "Walindi Plantation Coral Reef Bungalow", "Eco-luxury thatched timber bungalows nestled in lush tropical rainforest along the shores of Kimbe Bay.", "/facilities/walindi_resort_kimbe.jpg", "Walindi Resort", "https://www.walindifebrina.com", "Coral Triangle Eco-Lodge", "PGK", 720, 610, 5.0, 145],
  ["ambua-lodge-tari-stay", "trans-niugini-tours", "tari-valley-huli", "stays", "Ambua Lodge Highland Panorama Chalets", "Award-winning eco-lodge perched 2,100m above sea level overlooking the magnificent Tari Valley cloud forests.", "/facilities/ambua_lodge_tari.jpg", "Trans Niugini Tours", "https://www.pngtours.com", "Highland Wilderness Lodge", "PGK", 980, 830, 5.0, 92],
  ["tawali-resort-cliffside-stay", "tawali-dive-resort", "milne-bay-tawali-alotau", "stays", "Tawali Leisure & Dive Resort Timber Villa", "Artisanal timber villas perched high on limestone bluffs with private ocean boardwalks over pristine coral drop-offs.", "/facilities/tawali_resort_milne.jpg", "Tawali Resort", "https://tawali.com", "Coral Fjord Sanctuary", "PGK", 680, 575, 4.9, 118],
  ["bettys-lodge-wilhelm-stay", "bettys-lodge-wilhelm", "mount-wilhelm-simbu", "stays", "Betty's Lodge Alpine Basecamp & Trout Chalets", "Cozy highland lodge in Keglsugl featuring open log fireplaces, fresh organic trout dinners, and summit guide service.", "/facilities/bettys_lodge_wilhelm.jpg", "Betty's Lodge", "https://www.bettyslodge.com", "Alpine Summit Basecamp", "PGK", 280, 240, 4.8, 88],
  ["rapopo-plantation-kokopo-stay", "rapopo-plantation-resort", "rabaul-tavurvur-kokopo", "stays", "Rapopo Plantation Oceanfront Volcano Suites", "Beachfront suites looking directly across Blanche Bay to the dramatic plumes of active volcano Mount Tavurvur.", "/facilities/rapopo_resort_kokopo.jpg", "Rapopo Resort", "https://rapopo.com", "Volcano Oceanfront Resort", "PGK", 550, 470, 4.8, 104],
  ["tufi-dive-resort-stay", "tufi-dive-resort", "tufi-fjords-cape-nelson", "stays", "Tufi Cliffside Fjord Chalets", "Boutique timber chalets with sweeping 180-degree panoramas of emerald volcanic fjords and coral reef atolls.", "/facilities/tufi_resort_fjords.jpg", "Tufi Resort", "https://www.tufidive.com", "Volcanic Fjord Retreat", "PGK", 620, 525, 4.9, 76],

  // --- Tours (◒) ---
  ["kokoda-track-8day-expedition", "kokoda-trail-expeditions", "kokoda-track-corridor", "tours", "Kokoda Track 8-Day Historic Crossing & Battlefields", "Accredited KTA expedition crossing the Owen Stanley Range, honoring Fuzzy Wuzzy Angels and visiting Isurava and Brigade Hill.", "/facilities/kokoda_track_memorial.jpg", "Kokoda Trail Expeditions", "https://www.kokodatrailexpeditions.com", "Historic Pilgrimage", "PGK", 4200, 3990, 5.0, 198],
  ["mount-wilhelm-summit-climb", "bettys-lodge-wilhelm", "mount-wilhelm-simbu", "tours", "Mount Wilhelm 4-Day Alpine Summit Trek (4,509m)", "Guided climb through alpine moss forests and glacial tarns to reach the highest point in Papua New Guinea at dawn.", "/facilities/bettys_lodge_wilhelm.jpg", "Betty's Lodge Guided", "https://www.bettyslodge.com", "Summit Expedition", "PGK", 1400, 1190, 5.0, 112],
  ["kimbe-bay-seamount-scuba", "walindi-plantation-resort", "kimbe-bay-walindi", "tours", "Kimbe Bay Coral Seamounts Double Scuba Dive", "Explore Inglis Shoal and South Emma underwater pinnacles with schooling barracuda, hammerheads, and lush sea fans.", "/facilities/walindi_resort_kimbe.jpg", "Walindi Dive Fleet", "https://www.walindifebrina.com", "World-Class Scuba", "PGK", 450, 380, 5.0, 175],
  ["sepik-river-crocodile-safari", "trans-niugini-tours", "sepik-river-ambunti", "tours", "Sepik River 4-Day Haus Tambaran & Crocodile Expedition", "Motorized dugout canoe journey through Middle Sepik villages, exploring sacred spirit houses and ancient crocodile cults.", "/facilities/sepik_haus_tambaran.jpg", "Trans Niugini Tours", "https://www.pngtours.com", "River Cultural Odyssey", "PGK", 2800, 2450, 4.9, 84],
  ["tufi-outer-reef-shark-dive", "tufi-dive-resort", "tufi-fjords-cape-nelson", "tours", "Tufi Outer Reefs & Hammerhead Scuba Safari", "Boat dive on pristine outer oceanic atolls with crystal visibility exceeding 40 meters, reef sharks, and manta rays.", "/facilities/tufi_resort_fjords.jpg", "Tufi Dive Center", "https://www.tufidive.com", "Oceanic Shark Dive", "PGK", 420, 355, 4.9, 95],
  ["baining-fire-dance-night-tour", "rapopo-plantation-resort", "rabaul-tavurvur-kokopo", "tours", "Baining Fire Dancers Night Mountain Excursion", "Travel into the Baining mountain jungles to witness barefoot initiated men wearing giant Kavat masks leap through bonfire flames.", "/facilities/rapopo_resort_kokopo.jpg", "Rapopo Tours", "https://rapopo.com", "Sacred Fire Ritual", "PGK", 320, 270, 5.0, 142],

  // --- Nature (◇) ---
  ["varirata-bird-of-paradise-trail", "cepa-national-parks", "varirata-sogeri-plateau", "nature", "Varirata National Park Raggiana Bird of Paradise Trail", "Witness the breathtaking dawn courtship display of the Raggiana Bird of Paradise in protected Sogeri rainforest.", "/facilities/kokoda_track_memorial.jpg", "CEPA National Parks", "https://www.cepa.gov.pg", "Bird of Paradise Sanctuary", "PGK", 45, 35, 5.0, 240],
  ["tavurvur-volcano-crater", "rapopo-plantation-resort", "rabaul-tavurvur-kokopo", "nature", "Mount Tavurvur Active Volcano Crater & Hot Springs", "Trek across sulfur ash plains to the steaming rim of Mount Tavurvur and bathe in natural geothermal thermal pools.", "/facilities/rapopo_resort_kokopo.jpg", "Rabaul Volcanological", "https://rapopo.com", "Active Volcano Wonder", "PGK", 180, 150, 4.9, 130],
  ["port-moresby-nature-park", "png-tourism-promotion-authority", "port-moresby-ncd", "nature", "Port Moresby Nature Park Botanical Gardens", "Award-winning wildlife sanctuary home to tree kangaroos, cassowaries, hornbills, and 15+ species of Birds of Paradise.", "/facilities/airways_hotel_pom.jpg", "Nature Park Trust", "https://www.papuanewguinea.travel", "Wildlife Sanctuary", "PGK", 35, 25, 4.8, 310],
  ["lake-piunde-alpine-tarn", "bettys-lodge-wilhelm", "mount-wilhelm-simbu", "nature", "Lake Piunde & Lake Aunde Glaciated Alpine Tarns", "Pristine glacial lakes situated 3,500m above sea level surrounded by prehistoric giant cycads and alpine waterfalls.", "/facilities/bettys_lodge_wilhelm.jpg", "Betty's Lodge", "https://www.bettyslodge.com", "Glacial Tarn Reserve", "PGK", 80, 65, 4.9, 68],

  // --- Culture (♨) ---
  ["asaro-mudmen-cultural-village", "asaro-mudmen-cultural-lodge", "goroka-asaro-valley", "culture", "Asaro Mudmen Village Secret Mask & Clay Ritual", "Immerse in the ancestral legend of the Asaro Mudmen, mask-crafting workshops, and authentic earth-oven Mumu feast.", "/facilities/asaro_mudmen_goroka.jpg", "Asaro Cultural Lodge", "https://www.papuanewguinea.travel", "Living Tribal Legend", "PGK", 250, 210, 5.0, 165],
  ["huli-wigmen-bachelor-school", "trans-niugini-tours", "tari-valley-huli", "culture", "Huli Wigmen Ceremonial Bachelor School Experience", "Visit the sacred secluded school where young Huli men spend years growing ritual hair wigs adorned with Bird of Paradise feathers.", "/facilities/ambua_lodge_tari.jpg", "Trans Niugini Tours", "https://www.pngtours.com", "Sacred Wig Rituals", "PGK", 380, 320, 5.0, 138],
  ["png-national-museum-art-gallery", "png-tourism-promotion-authority", "port-moresby-ncd", "culture", "National Museum and Art Gallery Waigani", "The spiritual repository of Papua New Guinea, exhibiting over 30,000 ethnographic masterpieces, ancestor poles, and war canoes.", "/facilities/sepik_haus_tambaran.jpg", "National Museum PNG", "https://www.papuanewguinea.travel", "National Heritage Museum", "PGK", 20, 15, 4.8, 195],
  ["kanganaman-haus-tambaran", "trans-niugini-tours", "sepik-river-ambunti", "culture", "UNESCO Kanganaman Haus Tambaran Spirit House", "The oldest and grandest surviving spirit house on the Sepik River, supported by towering carved ancestral totems.", "/facilities/sepik_haus_tambaran.jpg", "Sepik Cultural Trust", "https://www.pngtours.com", "UNESCO Sacred Monument", "PGK", 120, 95, 5.0, 92],

  // --- Events (◎) ---
  ["goroka-cultural-show-vip-pass", "goroka-show-society", "goroka-asaro-valley", "events", "Goroka Cultural Show VIP 3-Day Arena Pass", "VIP admission to the world's most spectacular tribal gathering, featuring over 100 tribes in traditional bilas and sing-sing dances.", "/facilities/asaro_mudmen_goroka.jpg", "Goroka Show Society", "https://www.gorokashow.com", "World Cultural Wonder", "PGK", 350, 295, 5.0, 320],
  ["mount-hagen-show-vip-pass", "mount-hagen-show-society", "mount-hagen-wahgi", "events", "Mount Hagen Cultural Show VIP Pass", "Early dawn photographer pass and shaded VIP grandstand seating for the thunderous Western Highlands sing-sing.", "/facilities/ambua_lodge_tari.jpg", "Mount Hagen Show Committee", "https://www.mthagenculturalshow.com", "Melpa Warrior Sing-Sing", "PGK", 400, 340, 5.0, 280],
  ["national-mask-festival-rabaul", "rapopo-plantation-resort", "rabaul-tavurvur-kokopo", "events", "National Mask Festival & Kinavai Dawn Arrival Pass", "VIP admission to the Kinavai sea arrival of Tolai Tubuan spirit masks and night-time Baining fire dance ceremonies.", "/facilities/rapopo_resort_kokopo.jpg", "East New Britain Tourism", "https://rapopo.com", "Mask Spirit Festival", "PGK", 450, 380, 5.0, 195],
  ["kenu-kundu-canoe-festival-pass", "png-tourism-promotion-authority", "milne-bay-tawali-alotau", "events", "Milne Bay Kenu & Kundu War Canoe Festival", "Experience the thunder of 40-man carved war canoe regattas, conch shell calls, and island dances on Alotau bay.", "/facilities/tawali_resort_milne.jpg", "Milne Bay Tourism Board", "https://www.papuanewguinea.travel", "War Canoe Regatta", "PGK", 280, 235, 4.9, 140],

  // --- Transport (➜) ---
  ["air-niugini-domestic-flight-pass", "air-niugini", "port-moresby-ncd", "transport", "Air Niugini Domestic Flight Network Pass", "Scheduled jet and turboprop flights connecting Port Moresby with Mount Hagen, Goroka, Rabaul, Hoskins, and Alotau.", "/facilities/airways_hotel_pom.jpg", "Air Niugini", "https://www.airniugini.com.pg", "National Scheduled Flights", "PGK", 650, 580, 4.8, 220],
  ["png-air-safari-hopper", "png-air", "port-moresby-ncd", "transport", "PNG Air Regional Safari Flight Pass", "Specialized regional flights landing directly at remote airstrips in Simbu, Tari, Popondetta, and Kavieng.", "/facilities/bettys_lodge_wilhelm.jpg", "PNG Air", "https://www.pngair.com.pg", "Regional Bush Flights", "PGK", 580, 510, 4.7, 185],
  ["loloata-catamaran-transfer", "loloata-island-resort", "port-moresby-ncd", "transport", "Loloata Island Luxury Catamaran Boat Transfer", "Scheduled 20-minute catamaran cruise across Bootless Bay between Tahira Marina and Loloata Island.", "/facilities/loloata_island_resort.jpg", "Loloata Marine Fleet", "https://www.loloataislandresort.com", "Catamaran Shuttle", "PGK", 90, 75, 4.9, 140],
  ["kokoda-4x4-trailhead-transfer", "kokoda-trail-expeditions", "kokoda-track-corridor", "transport", "Port Moresby to Owers' Corner 4x4 Trailhead Transfer", "Private air-conditioned 4WD shuttle up the Sogeri Plateau to the southern Kokoda Track memorial arches.", "/facilities/kokoda_track_memorial.jpg", "Kokoda Expeditions", "https://www.kokodatrailexpeditions.com", "4x4 Trailhead Transfer", "PGK", 180, 150, 4.8, 125],
  ["walindi-dive-boat-charter", "walindi-plantation-resort", "kimbe-bay-walindi", "transport", "Kimbe Bay Custom Dive Cruiser Charter", "Fully equipped custom dive vessel with shaded deck, dive compressor, and lunch service for outer reef atolls.", "/facilities/walindi_resort_kimbe.jpg", "Walindi Fleet", "https://www.walindifebrina.com", "Custom Dive Boat", "PGK", 350, 295, 5.0, 95]
];

let catalogueInitPromise: Promise<void> | null = null;

export async function ensureCatalogue() {
  if (catalogueInitPromise) return catalogueInitPromise;
  catalogueInitPromise = (async () => {
    const d1 = env.DB;
    if (!d1) throw new Error("Database binding DB is unavailable");

    await ensureCountries();
    await d1.batch(schemaStatements.map(sql => d1.prepare(sql)));
    await ensureCountryGeography("PNG");

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
    await safeAlter("ALTER TABLE listings ADD COLUMN source_url TEXT");
    await safeAlter("ALTER TABLE listings ADD COLUMN last_reviewed_at TEXT");
    await safeAlter("ALTER TABLE providers ADD COLUMN legal_name TEXT");
    await safeAlter("ALTER TABLE providers ADD COLUMN license_number TEXT");
    await safeAlter("ALTER TABLE providers ADD COLUMN phone TEXT");
    await safeAlter("ALTER TABLE providers ADD COLUMN email TEXT");
    await safeAlter("ALTER TABLE providers ADD COLUMN physical_address TEXT");
    await safeAlter("ALTER TABLE providers ADD COLUMN website_url TEXT");
    await safeAlter("ALTER TABLE providers ADD COLUMN whatsapp_number TEXT");

    const pngCountry = await d1.prepare("SELECT id FROM countries WHERE UPPER(code)='PNG' OR UPPER(code)='PG'").first<{ id: number }>();
    const pngId = pngCountry?.id ?? 1;

    // 1. Seed Categories
    for (const c of categorySeed) {
      await d1.prepare("INSERT OR IGNORE INTO categories (slug, name, icon, display_order) VALUES (?, ?, ?, ?)").bind(c[0], c[1], c[2], c[3]).run();
    }

    // 2. Seed PNG Destinations, Providers, Listings
    for (const d of pngDestinationSeed) {
      let prov = await d1.prepare("SELECT id FROM provinces WHERE code=?").bind(d[3]).first<{ id: number }>();
      if (!prov) {
        prov = await d1.prepare("SELECT id FROM provinces WHERE country_id=? LIMIT 1").bind(pngId).first<{ id: number }>();
      }
      if (!prov) {
        prov = await d1.prepare("SELECT id FROM provinces LIMIT 1").first<{ id: number }>();
      }
      if (prov) {
        await d1.prepare("INSERT OR IGNORE INTO destinations (slug, name, summary, province_id, district, latitude, longitude, cover_image_url, source_url, country_id, is_test_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)")
          .bind(d[0], d[1], d[2], prov.id, d[4], d[5], d[6], d[7], d[8], pngId).run();
        await d1.prepare("UPDATE destinations SET province_id=?, summary=?, district=?, latitude=?, longitude=?, cover_image_url=?, source_url=?, country_id=?, is_test_data=0 WHERE slug=?")
          .bind(prov.id, d[2], d[4], d[5], d[6], d[7], d[8], pngId, d[0]).run();
      }
    }

    for (const p of pngProviderSeed) {
      await d1.prepare("INSERT OR IGNORE INTO providers (slug, trading_name, source_name, source_url, phone, email, physical_address, website_url, whatsapp_number, country_id, is_test_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)")
        .bind(p[0], p[1], p[2], p[3], p[4] || null, p[5] || null, p[6] || null, p[3], p[7] || null, pngId).run();
      await d1.prepare("UPDATE providers SET trading_name=?, source_name=?, source_url=?, phone=?, email=?, physical_address=?, website_url=?, whatsapp_number=?, country_id=?, is_test_data=0 WHERE slug=?")
        .bind(p[1], p[2], p[3], p[4] || null, p[5] || null, p[6] || null, p[3], p[7] || null, pngId, p[0]).run();
    }

    for (const l of pngListingSeed) {
      let prov = await d1.prepare("SELECT id FROM providers WHERE slug=?").bind(l[1]).first<{ id: number }>();
      if (!prov) {
        prov = await d1.prepare("SELECT id FROM providers WHERE country_id=? LIMIT 1").bind(pngId).first<{ id: number }>();
      }
      let dest = await d1.prepare("SELECT id FROM destinations WHERE slug=?").bind(l[2]).first<{ id: number }>();
      if (!dest) {
        dest = await d1.prepare("SELECT id FROM destinations WHERE country_id=? LIMIT 1").bind(pngId).first<{ id: number }>();
      }
      let cat = await d1.prepare("SELECT id FROM categories WHERE slug=?").bind(l[3]).first<{ id: number }>();
      if (!cat) {
        cat = await d1.prepare("SELECT id FROM categories LIMIT 1").first<{ id: number }>();
      }
      if (prov && dest && cat) {
        await d1.prepare("INSERT OR IGNORE INTO listings (slug, provider_id, destination_id, category_id, name, summary, image_url, photo_credit, deep_link_url, tag, currency, base_price, member_price, rating, review_count, country_id, publication_status, is_test_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', 0)")
          .bind(l[0], prov.id, dest.id, cat.id, l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], pngId).run();
        await d1.prepare("UPDATE listings SET provider_id=?, destination_id=?, category_id=?, name=?, summary=?, image_url=?, photo_credit=?, deep_link_url=?, tag=?, currency='PGK', base_price=?, member_price=?, rating=?, review_count=?, country_id=?, publication_status='published', is_test_data=0 WHERE slug=?")
          .bind(prov.id, dest.id, cat.id, l[4], l[5], l[6], l[7], l[8], l[9], l[11], l[12], l[13], l[14], pngId, l[0]).run();
      }
    }

    // 3. Guarantee proper country_id & currency
    await d1.prepare("UPDATE provinces SET country_id = ? WHERE country_id IS NULL").bind(pngId).run();
    await d1.prepare("UPDATE destinations SET country_id = ? WHERE country_id IS NULL").bind(pngId).run();
    await d1.prepare("UPDATE listings SET country_id = ? WHERE country_id IS NULL").bind(pngId).run();
    await d1.prepare("UPDATE listings SET currency = 'PGK' WHERE currency IS NULL OR currency = 'ZMW'").run();
    await d1.prepare("UPDATE listings SET publication_status = 'published' WHERE publication_status IS NULL OR publication_status != 'published'").run();
  })();
  return catalogueInitPromise;
}

export async function getCatalogue(query = "", category = "all", countryCode = "PNG") {
  await ensureCatalogue();
  const d1 = env.DB;
  if (!d1) throw new Error("Database binding DB is unavailable");

  const normalizedCountry = String(countryCode || "PNG").toUpperCase();
  let countryRow = await d1.prepare("SELECT id, code, name, currency_code, currency_symbol FROM countries WHERE UPPER(code)=?").bind(normalizedCountry).first<{ id: number; code: string; name: string; currency_code: string; currency_symbol: string }>();
  if (!countryRow) {
    countryRow = await d1.prepare("SELECT id, code, name, currency_code, currency_symbol FROM countries WHERE UPPER(code)='PNG' OR UPPER(code)='PG'").first<{ id: number; code: string; name: string; currency_code: string; currency_symbol: string }>();
  }
  const countryId = countryRow?.id ?? 1;
  const like = `%${query.trim()}%`;

  const result = await d1.prepare(`
    SELECT l.id,
      l.slug,
      l.name,
      l.summary,
      l.image_url AS imageUrl,
      l.tag,
      l.currency,
      l.base_price AS basePrice,
      l.member_price AS memberPrice,
      l.rating,
      l.review_count AS reviewCount,
      l.source_url AS sourceUrl,
      l.deep_link_url AS deepLinkUrl,
      d.name AS destination,
      d.district AS district,
      p.name AS province,
      c.name AS categoryName,
      c.slug AS categorySlug,
      pr.trading_name AS providerName,
      pr.phone AS providerPhone,
      pr.email AS providerEmail,
      pr.physical_address AS providerAddress,
      pr.website_url AS providerWebsite,
      pr.whatsapp_number AS providerWhatsapp
    FROM listings l
    JOIN destinations d ON d.id = l.destination_id
    JOIN provinces p ON p.id = d.province_id
    JOIN categories c ON c.id = l.category_id
    JOIN providers pr ON pr.id = l.provider_id
    WHERE l.country_id = ?
      AND l.publication_status = 'published'
      AND (c.slug=? OR ? = 'all')
      AND (
        l.name LIKE ?
        OR l.summary LIKE ?
        OR d.name LIKE ?
        OR p.name LIKE ?
        OR pr.trading_name LIKE ?
        OR l.tag LIKE ?
      )
      AND (l.is_test_data >= 0)
    ORDER BY l.rating DESC, l.id ASC
  `).bind(countryId, category, category, like, like, like, like, like, like).all<{
    id: number;
    slug: string;
    name: string;
    summary: string;
    imageUrl: string;
    tag: string;
    currency: string;
    basePrice: number;
    memberPrice: number | null;
    rating: number;
    reviewCount: number;
    sourceUrl: string | null;
    deepLinkUrl: string | null;
    destination: string;
    district: string | null;
    province: string;
    categoryName: string;
    categorySlug: string;
    providerName: string;
    providerPhone: string | null;
    providerEmail: string | null;
    providerAddress: string | null;
    providerWebsite: string | null;
    providerWhatsapp: string | null;
  }>();

  const categories = await d1.prepare("SELECT slug, name, icon FROM categories ORDER BY display_order").all<{ slug: string; name: string; icon: string }>();

  return {
    country: countryRow ? {
      id: countryRow.id,
      code: countryRow.code,
      name: countryRow.name,
      currencyCode: countryRow.currency_code,
      currencySymbol: countryRow.currency_symbol
    } : undefined,
    categories: [{ slug: "all", name: "All", icon: "✦" }, ...categories.results],
    listings: result.results,
    meta: {
      count: result.results.length
    }
  };
}

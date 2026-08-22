import { env } from "./runtime";
import { ensureCountries } from "./countries";
import { ensureCountryGeography } from "./geography";

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS provinces (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,code TEXT NOT NULL UNIQUE,name TEXT NOT NULL,region TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS destinations (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,province_id INTEGER NOT NULL REFERENCES provinces(id),district TEXT,slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,summary TEXT NOT NULL,latitude REAL,longitude REAL,cover_image_url TEXT,source_url TEXT,is_test_data INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,icon TEXT NOT NULL,display_order INTEGER NOT NULL DEFAULT 0,is_active INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS providers (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,slug TEXT NOT NULL UNIQUE,trading_name TEXT NOT NULL,legal_name TEXT,license_number TEXT,verification_status TEXT NOT NULL DEFAULT 'seeded_unverified',source_name TEXT,source_url TEXT,is_test_data INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS listings (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,provider_id INTEGER NOT NULL REFERENCES providers(id),destination_id INTEGER NOT NULL REFERENCES destinations(id),category_id INTEGER NOT NULL REFERENCES categories(id),slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,summary TEXT NOT NULL,image_url TEXT NOT NULL,photo_credit TEXT,deep_link_url TEXT,tag TEXT NOT NULL,currency TEXT NOT NULL DEFAULT 'ZMW',base_price INTEGER NOT NULL,member_price INTEGER,rating REAL NOT NULL DEFAULT 0,review_count INTEGER NOT NULL DEFAULT 0,publication_status TEXT NOT NULL DEFAULT 'published',verification_status TEXT NOT NULL DEFAULT 'seeded_unverified',is_test_data INTEGER NOT NULL DEFAULT 1,last_reviewed_at TEXT)`,
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
  ["samfya-beach-bangweulu", "Samfya Beach & Lake Bangweulu Dunes", "Zambia's inland white sand coast, water sports haven, and gateway to the black lechwe floodplains.", "ZM-LUA", "Samfya District", -11.3667, 29.5500, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "https://www.zambiatourism.com/destinations/lakes/lake-bangweulu"]
];

const zambiaProviderSeed = [
  ["zambia-tourism-agency", "Zambia Tourism Agency (ZTA)", "Official provider website", "https://www.zambiatourism.com"],
  ["royal-livingstone-resort", "The Royal Livingstone Victoria Falls Resort by Anantara", "Five-star luxury Zambezi riverfront resort", "https://www.anantara.com/en/royal-livingstone"],
  ["tongabezi-lodge", "Tongabezi Lodge & Sindabezi Island", "Award-winning luxury safari lodge on the upper Zambezi", "https://greensafaris.com/tongabezi"],
  ["bushcamp-company-luangwa", "The Bushcamp Company South Luangwa", "Pioneering luxury bush camps and walking safaris in Mfuwe", "https://bushcampcompany.com"],
  ["chiawa-safaris-zambezi", "Chiawa Safaris & Old Mondoro", "Premier premier conservation-focused Lower Zambezi camps", "https://chiawa.com"],
  ["chaminuka-nature-reserve", "Chaminuka Nature Reserve & Luxury Lodge", "Private wildlife sanctuary with indigenous art collections", "https://chaminuka.com"],
  ["wilderness-safaris-busanga", "Wilderness Safaris Busanga Plains", "Exclusive luxury camps in northern Kafue", "https://wildernessdestinations.com"],
  ["barotse-royal-establishment", "Barotse Royal Establishment & Nayuma Museum", "Custodian of the Kuomboka water ceremony and Lozi traditions", "https://barotseland.info"],
  ["lunda-royal-establishment", "Lunda Kingdom Royal Cultural Trust", "Custodian of the historic Umutomboko ceremony in Luapula", "https://nhcczambia.org"],
  ["ngoni-royal-council", "Ngoni Royal Council & Paramount Chief Mpezeni", "Custodian of the annual Nc'wala warrior ceremony", "https://www.zambiatourism.com"],
  ["national-heritage-zambia", "National Heritage Conservation Commission (NHCC)", "Government agency protecting Zambia's historical & natural monuments", "https://nhcczambia.org"],
  ["zambia-airways", "Zambia Airways Domestic Aviation", "Flag carrier connecting Lusaka, Livingstone, Ndola, and Mfuwe", "https://www.zambiaairways.co.zm"],
  ["proflight-zambia", "Proflight Zambia Safari Network", "Leading scheduled regional safari airline", "https://www.proflight-zambia.com"],
  ["ndole-bay-resort", "Ndole Bay Lodge Lake Tanganyika", "Premier beachfront diving, angling, and safari lodge", "https://ndolebaylodge.com"],
  ["shiwa-ngandu-estate", "Shiwa Ng'andu Historical Manor", "Historic English manor estate, Kapishya hot springs, and North Luangwa safaris", "https://shiwangandu.com"],
  ["livingstone-adventures", "Livingstone Adventures Victoria Falls", "Helicopter flights, white-water rafting, and Devil's Pool operator", "https://livingstoneadventures.com"],
  ["zam-4x4-expeditions", "ZamRoam 4x4 Safari Expeditions", "Equipped overland safari vehicle hire and expedition camping", "https://zamroam.com/4x4"],
  ["chewa-heritage-foundation", "Chewa Heritage Foundation & King Gawa Undi", "Custodian of the tri-national Kulamba ceremony and Gule Wamkulu", "https://nhcczambia.org"],
  ["bemba-royal-council", "Bemba Royal Council & Paramount Chief Chitimukulu", "Custodian of the Ukusefya Pa Ng'wena celebration", "https://nhcczambia.org"],
  ["luvale-cultural-association", "Luvale Cultural Association & Senior Chief Ndungu", "Custodian of the Likumbi Lya Mize festival", "https://nhcczambia.org"],
  ["mutinondo-wilderness-trust", "Mutinondo Wilderness Trust", "Privately conserved 10,000-hectare granite wilderness in Muchinga", "https://mutinondozambia.com"],
  ["royal-chariot-transfers", "Royal Chariot Safari & Airport Transfers", "Air-conditioned overland 4x4 and executive shuttle service", "https://royalchariot.co.zm"],
  ["zambia-trade-fair-society", "Zambia International Trade Fair Society", "Organizer of the premier national commercial expo in Ndola", "https://zitf.org.zm"],
  ["zambia-agriculture-society", "Agricultural & Commercial Society of Zambia", "Organizer of the national agricultural show in Lusaka", "https://acsz.co.zm"],
  ["choma-museum-crafts", "Choma Museum & Tonga Crafts Trust", "Custodian of Tonga cultural heritage and artisan basketry", "https://chomamuseum.org"],
  ["moto-moto-museum-trust", "Moto Moto Museum Trust Mbala", "Northern Province cultural and archaeological repository", "https://nhcczambia.org"],
  ["mfuwe-lodge-bushcamps", "Mfuwe Lodge & Bushcamp Collection", "Lagoon-front lodge famous for elephants walking through reception", "https://bushcampcompany.com"]
];

const zambiaListingSeed = [
  // --- Stays (⌂) ---
  ["royal-livingstone-resort-stay", "royal-livingstone-resort", "victoria-falls-livingstone", "stays", "The Royal Livingstone Luxury Victoria Falls Resort", "Five-star luxury colonial resort on the banks of the Zambezi with direct private walking access to Victoria Falls.", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=82", "Anantara Hotels", "https://www.anantara.com/en/royal-livingstone", "Five-Star Zambezi Luxury", "ZMW", 6500, 5600, 5.0, 142],
  ["tongabezi-lodge-safari-stay", "tongabezi-lodge", "victoria-falls-livingstone", "stays", "Tongabezi Luxury River Lodge & Sindabezi Island", "Romantic open-fronted river houses and private island chalets upstream from Victoria Falls with valet service.", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1100&q=82", "Green Safaris", "https://greensafaris.com/tongabezi", "Luxury River Hideaway", "ZMW", 7800, 6800, 4.9, 98],
  ["mfuwe-lodge-luangwa-stay", "bushcamp-company-luangwa", "south-luangwa-mfuwe", "stays", "Mfuwe Lodge & Elephant Lagoon Chalets", "World-famous safari lodge overlooking a wildlife lagoon, famous for elephant families strolling through the open reception.", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82", "Bushcamp Company", "https://bushcampcompany.com/mfuwe-lodge", "Iconic Wildlife Lodge", "ZMW", 5400, 4600, 5.0, 184],
  ["chiawa-camp-zambezi-stay", "chiawa-safaris-zambezi", "lower-zambezi-valley", "stays", "Chiawa Camp & Old Mondoro Luxury Tents", "Pioneering premier safari camp in Lower Zambezi offering timber-deck luxury tents and prime leopard game viewing.", "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82", "Chiawa Safaris", "https://chiawa.com", "Riverfront Tented Camp", "ZMW", 8500, 7400, 4.9, 76],
  ["chaminuka-lodge-reserve", "chaminuka-nature-reserve", "lusaka-cultural-hub", "stays", "Chaminuka Luxury Safari Lodge & Art Sanctuary", "Private 10,000-acre wildlife reserve 25 minutes from Lusaka, featuring 72 species of wildlife and 1,000+ Zambian art masterworks.", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1100&q=82", "Chaminuka Reserve", "https://chaminuka.com", "Private Game Reserve", "ZMW", 3200, 2750, 4.8, 115],
  ["busanga-plains-camp-stay", "wilderness-safaris-busanga", "kafue-national-park", "stays", "Shumba Camp & Busanga Plains Tented Suites", "Luxury safari camp situated on tree islands in northern Kafue, renowned for tree-climbing lions and balloon safaris.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Wilderness Destinations", "https://wildernessdestinations.com", "Busanga Wilderness", "ZMW", 9200, 8100, 5.0, 62],
  ["ndole-bay-tanganyika-stay", "ndole-bay-resort", "lake-tanganyika-mbala", "stays", "Ndole Bay Beach Lodge & Diving Haven", "Beachfront wooden chalets on the pristine shores of Lake Tanganyika, offering scuba diving, angling, and Nsumbu park safaris.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "Ndole Bay Lodge", "https://ndolebaylodge.com", "Lakefront Resort", "ZMW", 2600, 2200, 4.8, 89],
  ["shiwa-house-kapishya-stay", "shiwa-ngandu-estate", "muchinga-shiwa-ngandu", "stays", "Shiwa Ng'andu Manor House & Kapishya Hot Springs", "Historical grand English manor house built in the 1920s, featuring private natural sulfur hot springs and escarpment trails.", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=82", "Shiwa Estate", "https://shiwangandu.com", "Historic Estate", "ZMW", 3400, 2900, 4.9, 54],
  ["lake-kariba-inns-siavonga", "zambia-tourism-agency", "lake-kariba-siavonga", "stays", "Lake Safari Lodge Siavonga & Kariba Chalets", "Panoramic hilltop terrace hotel overlooking the azure expanse of Lake Kariba with private boat jetty and infinity pool.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "Lake Safari Lodge", "https://www.zambiatourism.com", "Riviera Vista", "ZMW", 1850, 1550, 4.7, 72],

  // --- Tours (◓) ---
  ["vic-falls-guided-walking-tour", "livingstone-adventures", "victoria-falls-livingstone", "tours", "Victoria Falls Rainforest & Knife-Edge Bridge Tour", "Expert-guided walking exploration along Knife-Edge Bridge, Danger Point, and Boiling Pot with rainbow spray viewing.", "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1100&q=82", "Livingstone Adventures", "https://livingstoneadventures.com/vic-falls", "World Wonder Guided", "ZMW", 650, 520, 5.0, 210],
  ["south-luangwa-walking-safari", "bushcamp-company-luangwa", "south-luangwa-mfuwe", "tours", "Legendary South Luangwa 3-Day Walking Safari", "Pioneering walking safari across pristine big game territory led by armed DNPW scouts and master naturalist guides.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Bushcamp Company", "https://bushcampcompany.com/walking-safari", "Walking Safari Pioneer", "ZMW", 4200, 3600, 5.0, 135],
  ["devils-pool-livingstone-island", "livingstone-adventures", "victoria-falls-livingstone", "tours", "Devil's Pool & Livingstone Island Breezy Excursion", "Swim on the precipice of the 108m waterfall in the natural rock infinity pool with gourmet breakfast or high tea.", "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1100&q=82", "Devil's Pool Official", "https://livingstoneadventures.com/devils-pool", "Adrenaline Wonder", "ZMW", 2400, 2050, 5.0, 168],
  ["lower-zambezi-canoe-safari", "chiawa-safaris-zambezi", "lower-zambezi-valley", "tours", "Lower Zambezi Guided Canoe Expedition", "Glide silently past elephant herds, hippos, and bird rookeries along the tranquil channels of the Zambezi River.", "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82", "Chiawa Safaris", "https://chiawa.com/canoeing", "River Wilderness", "ZMW", 1800, 1500, 4.9, 94],
  ["flight-of-angels-helicopter", "livingstone-adventures", "victoria-falls-livingstone", "tours", "Flight of Angels Victoria Falls Helicopter Flight", "Breathtaking 15-minute aerial helicopter tour over Victoria Falls, Batoka Gorge, and the upper Zambezi national park.", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1100&q=82", "Livingstone Adventures", "https://livingstoneadventures.com/helicopter", "Aerial Wonder", "ZMW", 2950, 2550, 4.9, 128],
  ["busanga-balloon-safari", "wilderness-safaris-busanga", "kafue-national-park", "tours", "Busanga Plains Dawn Hot Air Balloon Safari", "Drift over the mist-covered Busanga plains at sunrise, observing red lechwe herds, lions, and roan antelope from above.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Wilderness Safaris", "https://wildernessdestinations.com", "Hot Air Ballooning", "ZMW", 5600, 4800, 5.0, 45],
  ["kasanka-bat-migration-safari", "zambia-tourism-agency", "bangweulu-kasanka-wetlands", "tours", "World's Greatest Mammal Migration: 10 Million Fruit Bats", "Witness the world's largest mammal migration as 10 million straw-coloured fruit bats darken the sky at twilight in Kasanka.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "Kasanka Trust", "https://kasankanationalpark.com", "Mammal Migration", "ZMW", 2100, 1800, 5.0, 88],
  ["shoebill-stork-bangweulu-trek", "zambia-tourism-agency", "bangweulu-kasanka-wetlands", "tours", "Bangweulu Swamps Rare Shoebill Stork Expedition", "Canoe safari through papyrus waterways with community scouts tracking the elusive, prehistoric Shoebill stork.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=82", "African Parks Zambia", "https://www.africanparks.org", "Rare Wildlife Tracking", "ZMW", 2700, 2300, 4.9, 52],

  // --- Nature (◇) ---
  ["victoria-falls-wonder", "zambia-tourism-agency", "victoria-falls-livingstone", "nature", "Mosi-oa-Tunya Victoria Falls National Monument", "Standing 108 metres tall, the world's greatest curtain of falling water, generating mist visible over 30 kilometres away.", "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1100&q=82", "Zambia Tourism Agency", "https://www.zambiatourism.com", "Natural World Wonder", "ZMW", 450, 350, 5.0, 310],
  ["lumangwe-falls-luapula", "zambia-tourism-agency", "luapula-waterfalls-kingdom", "nature", "Lumangwe & Kabwelume Waterfalls (The Mini Victoria Falls)", "Spanning 160 metres across the Kalungwishi River, offering roaring cascades, rainforest walks, and camping bluffs.", "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "NHCC Zambia", "https://nhcczambia.org", "Northern Cascades", "ZMW", 350, 280, 4.8, 64],
  ["kalambo-falls-gorge", "zambia-tourism-agency", "lake-tanganyika-mbala", "nature", "Kalambo Falls & Archaeological Gorge", "Africa's second highest uninterrupted single-drop waterfall (221 metres) plunging into Lake Tanganyika rift basin.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82", "UNESCO Tentative List", "https://nhcczambia.org", "Deep Gorge Falls", "ZMW", 400, 320, 4.9, 58],
  ["chishimba-falls-kasama", "zambia-tourism-agency", "kasama-chishimba-falls", "nature", "Chishimba Sacred Cascades & Hydro Sanctuary", "A sacred spiritual site consisting of three successive waterfalls (Kaela, Mutumuna, and Chishimba) on the Luombe River.", "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82", "NHCC Heritage", "https://nhcczambia.org", "Sacred Cascades", "ZMW", 250, 200, 4.7, 49],
  ["source-of-the-zambezi-monument", "national-heritage-zambia", "solwezi-zambezi-west", "nature", "Source of the Zambezi National Heritage Site (Ikelenge)", "Botanical reserve preserving the exact spring where the mighty 2,574km Zambezi River bubbles up in a lush forest.", "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1100&q=82", "National Heritage Conservation", "https://nhcczambia.org", "River Source Monument", "ZMW", 300, 240, 4.8, 77],
  ["lochinvar-birding-sanctuary", "zambia-tourism-agency", "lochinvar-monze-sanctuary", "nature", "Lochinvar Kafue Lechwe & Waterbird Sanctuary", "Pristine wetland paradise hosting over 30,000 endemic Kafue Lechwe antelopes and 420 bird species.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82", "DNPW Zambia", "https://www.zambiatourism.com", "Birding Paradise", "ZMW", 480, 390, 4.7, 43],
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

  const zmbCountry = await d1.prepare("SELECT id FROM countries WHERE UPPER(code)='ZMB'").first<{ id: number }>();
  const zmbId = zmbCountry?.id ?? 1;

  // 1. Seed Categories
  for (const c of categorySeed) {
    await d1.prepare("INSERT OR IGNORE INTO categories (slug, name, icon, display_order) VALUES (?, ?, ?, ?)").bind(c[0], c[1], c[2], c[3]).run();
  }

  // 2. Seed Zambia Destinations, Providers, Listings
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

  // 3. Backfill existing listings to guarantee proper country_id & currency
  await d1.prepare("UPDATE provinces SET country_id = ? WHERE country_id IS NULL").bind(zmbId).run();
  await d1.prepare("UPDATE destinations SET country_id = ? WHERE country_id IS NULL").bind(zmbId).run();
  await d1.prepare("UPDATE listings SET country_id = ? WHERE country_id IS NULL").bind(zmbId).run();
  await d1.prepare("UPDATE listings SET currency = 'ZMW' WHERE currency IS NULL OR currency = 'PGK'").run();
  await d1.prepare("UPDATE listings SET publication_status = 'published' WHERE publication_status IS NULL OR publication_status != 'published'").run();
}

export async function getCatalogue(query = "", category = "all", countryCode = "ZMB") {
  await ensureCatalogue();
  const d1 = env.DB;
  if (!d1) throw new Error("Database binding DB is unavailable");

  const normalizedCountry = String(countryCode || "ZMB").toUpperCase();
  const countryRow = await d1.prepare("SELECT id, code, name, currency_code, currency_symbol FROM countries WHERE UPPER(code)=?").bind(normalizedCountry).first<{ id: number; code: string; name: string; currency_code: string; currency_symbol: string }>();
  const countryId = countryRow?.id ?? 1;
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
    } : {
      id: 1,
      code: "ZMB",
      name: "Zambia",
      currencyCode: "ZMW",
      currencySymbol: "ZK"
    },
    categories: cats.results,
    listings: result.results,
    meta: {
      count: result.results.length,
      seededTestData:true
    }
  };
}

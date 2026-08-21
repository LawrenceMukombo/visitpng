import { env } from "./runtime";
const schemaStatements=[
`CREATE TABLE IF NOT EXISTS provinces (id INTEGER PRIMARY KEY AUTOINCREMENT,code TEXT NOT NULL UNIQUE,name TEXT NOT NULL,region TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS destinations (id INTEGER PRIMARY KEY AUTOINCREMENT,province_id INTEGER NOT NULL REFERENCES provinces(id),district TEXT,slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,summary TEXT NOT NULL,latitude REAL,longitude REAL,cover_image_url TEXT,source_url TEXT,is_test_data INTEGER NOT NULL DEFAULT 1)`,
`CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT,slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,icon TEXT NOT NULL,display_order INTEGER NOT NULL DEFAULT 0,is_active INTEGER NOT NULL DEFAULT 1)`,
`CREATE TABLE IF NOT EXISTS providers (id INTEGER PRIMARY KEY AUTOINCREMENT,slug TEXT NOT NULL UNIQUE,trading_name TEXT NOT NULL,legal_name TEXT,license_number TEXT,verification_status TEXT NOT NULL DEFAULT 'seeded_unverified',source_name TEXT,source_url TEXT,is_test_data INTEGER NOT NULL DEFAULT 1)`,
`CREATE TABLE IF NOT EXISTS listings (id INTEGER PRIMARY KEY AUTOINCREMENT,provider_id INTEGER NOT NULL REFERENCES providers(id),destination_id INTEGER NOT NULL REFERENCES destinations(id),category_id INTEGER NOT NULL REFERENCES categories(id),slug TEXT NOT NULL UNIQUE,name TEXT NOT NULL,summary TEXT NOT NULL,image_url TEXT NOT NULL,photo_credit TEXT,deep_link_url TEXT,tag TEXT NOT NULL,currency TEXT NOT NULL DEFAULT 'PGK',base_price INTEGER NOT NULL,member_price INTEGER,rating REAL NOT NULL DEFAULT 0,review_count INTEGER NOT NULL DEFAULT 0,publication_status TEXT NOT NULL DEFAULT 'published',verification_status TEXT NOT NULL DEFAULT 'seeded_unverified',is_test_data INTEGER NOT NULL DEFAULT 1,last_reviewed_at TEXT)`,
`CREATE TABLE IF NOT EXISTS destination_photos (id INTEGER PRIMARY KEY AUTOINCREMENT,destination_id INTEGER REFERENCES destinations(id),listing_id INTEGER REFERENCES listings(id),image_url TEXT NOT NULL,caption TEXT,credit TEXT,source_url TEXT,display_order INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL)`,
`CREATE INDEX IF NOT EXISTS listings_destination_idx ON listings(destination_id)`,`CREATE INDEX IF NOT EXISTS listings_category_idx ON listings(category_id)`,`CREATE INDEX IF NOT EXISTS listings_publication_idx ON listings(publication_status)`];
const categorySeed=[["stays","Stays","⌂",1],["tours","Tours","◒",2],["nature","Nature","◇",3],["culture","Culture","♨",4],["events","Events","◎",5],["transport","Transport","➜",6]];
const provinceSeed=[
["NCD","National Capital District","Southern"],
["CP","Central Province","Southern"],
["ORO","Oro (Northern) Province","Southern"],
["MBP","Milne Bay Province","Southern"],
["WP","Western Province","Southern"],
["GP","Gulf Province","Southern"],
["ENB","East New Britain","Islands"],
["WNB","West New Britain","Islands"],
["NIP","New Ireland","Islands"],
["MAN","Manus","Islands"],
["AROB","Bougainville","Islands"],
["ESP","East Sepik","Momase"],
["WSP","West Sepik (Sandaun)","Momase"],
["MP","Madang Province","Momase"],
["MOR","Morobe Province","Momase"],
["EHP","Eastern Highlands","Highlands"],
["WHP","Western Highlands","Highlands"],
["SHP","Southern Highlands","Highlands"],
["ENG","Enga","Highlands"],
["SIM","Simbu (Chimbu)","Highlands"],
["JIK","Jiwaka","Highlands"],
["HEL","Hela","Highlands"]
];
const destinationSeed=[
["port-moresby","Port Moresby","Papua New Guinea's capital and primary international gateway.","NCD","National Capital District",-9.4438,147.1803,"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82","https://papuanewguinea.travel/destinations/port-moresby"],
["kokoda","Kokoda Track","Historic overland trail traversing Central and Oro provinces through the Owen Stanley Range.","ORO","Sohe & Kairuku-Hiri Districts",-8.8783,147.7372,"https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1100&q=82","https://papuanewguinea.travel/destinations/kokoda-track"],
["loloata-island","Loloata Island","A small island destination near Port Moresby known for marine experiences.","CP","Abau District",-9.5317,147.2833,"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82","https://www.loloataislandresort.com"],
["alotau","Alotau","Milne Bay's provincial capital and a gateway to islands and reefs.","MBP","Alotau District",-10.3157,150.4588,"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82","https://papuanewguinea.travel/destinations/milne-bay"],
["kokopo","Kokopo","A coastal base for exploring East New Britain and the Rabaul caldera.","ENB","Kokopo District",-4.3412,152.2712,"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82","https://papuanewguinea.travel/destinations/east-new-britain"],
["wewak","Wewak","A coastal gateway to the Sepik region.","ESP","Wewak District",-3.5534,143.6268,"https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82","https://papuanewguinea.travel/destinations/sepik"],
["madang","Madang","A tropical coastal town known for islands, reefs and cultural experiences.","MP","Madang District",-5.2247,145.7966,"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1100&q=82","https://papuanewguinea.travel/destinations/madang"]
];
const providerSeed=[["png-tourism-promotion-authority","PNG Tourism Promotion Authority","Official Papua New Guinea travel website","https://papuanewguinea.travel"],["loloata-island-resort","Loloata Island Resort","Official provider website","https://www.loloataislandresort.com"],["kokopo-beach-bungalow-resort","Kokopo Beach Bungalow Resort","Official provider website","https://www.kbb.com.pg"],["walindi-plantation-resort","Walindi Plantation Resort","Official provider website","https://walindiresort.com"],["madang-resort","Madang Resort","Official provider website","https://www.madangresort.com"]];
const listingSeed=[
["kokoda-trail","png-tourism-promotion-authority","kokoda","tours","Kokoda Trail","A 96-kilometre historic trek through the Owen Stanley Range, linking Central and Oro provinces and important wartime sites.","https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1100&q=82","Unsplash / Travel PNG","https://papuanewguinea.travel/tours/kokoda-track","Historic trek",0,null,4.9,0],
["tufi-fjords","png-tourism-promotion-authority","alotau","nature","Tufi Fjords","Explore Tufi fjords, reefs, waterfalls and nearby village culture.","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82","Unsplash / PNG Tourism","https://papuanewguinea.travel/nature/tufi","Fjords and reefs",0,null,4.9,0],
["varirata-national-park","png-tourism-promotion-authority","port-moresby","nature","Varirata National Park","A forested park near Port Moresby with walking trails, viewpoints and birdwatching.","https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82","Unsplash / PNG Wildlife","https://papuanewguinea.travel/nature/varirata","Forest and birds",0,null,4.8,0],
["sepik-river","png-tourism-promotion-authority","wewak","culture","Sepik River","Discover river communities, carved art, spirit houses and living traditions of the Sepik.","https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82","Unsplash / Cultural Heritage","https://papuanewguinea.travel/culture/sepik-river","River culture",0,null,4.9,0],
["mount-wilhelm","png-tourism-promotion-authority","madang","tours","Mount Wilhelm","Plan a guided climb of Papua New Guinea highest mountain through the Highlands.","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82","Unsplash / Highlands Trekking","https://papuanewguinea.travel/tours/mount-wilhelm","Highlands trek",0,null,4.8,0],
["rabaul-volcanoes","png-tourism-promotion-authority","kokopo","nature","Rabaul and Mount Tavurvur","See Rabaul harbour, volcanic landscapes and the Mount Tavurvur area.","https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1100&q=82","Unsplash / Volcano Watch","https://papuanewguinea.travel/nature/rabaul","Volcanic landscape",0,null,4.8,0],
["loloata-island-resort","loloata-island-resort","loloata-island","stays","Loloata Island Resort","An island resort near Port Moresby offering accommodation and access to marine activities.","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82","Loloata Island Resort Official","https://www.loloataislandresort.com/accommodation","Island escape",640,560,4.8,126],
["kokopo-beach-bungalow-resort","kokopo-beach-bungalow-resort","kokopo","stays","Kokopo Beach Bungalow Resort","A waterfront accommodation base for exploring Kokopo and the Rabaul area.","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82","Kokopo Beach Bungalow Resort","https://www.kbb.com.pg/rooms","East New Britain",520,468,4.7,84],
["walindi-reef-experience","walindi-plantation-resort","kokopo","nature","Walindi Reef Experience","A seeded catalogue example representing reef and marine experiences in the New Britain region.","https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1100&q=82","Walindi Resort","https://walindiresort.com/diving","Marine experience",390,345,4.7,68],
["madang-resort","madang-resort","madang","stays","Madang Resort","A seeded accommodation listing for testing discovery and destination filtering in Madang.","https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1100&q=82","Madang Resort Official","https://www.madangresort.com/rooms","Madang coast",420,378,4.6,41]
];
export async function ensureCatalogue(){
  const d1=env.DB;if(!d1)throw new Error("D1 binding DB is unavailable");
  await d1.batch(schemaStatements.map(sql=>d1.prepare(sql)));
  const safeAlter=async(sql:string)=>{try{await d1.prepare(sql).run();}catch{}};
  await safeAlter("ALTER TABLE destinations ADD COLUMN district TEXT");
  await safeAlter("ALTER TABLE destinations ADD COLUMN cover_image_url TEXT");
  await safeAlter("ALTER TABLE destinations ADD COLUMN source_url TEXT");
  await safeAlter("ALTER TABLE listings ADD COLUMN photo_credit TEXT");
  await safeAlter("ALTER TABLE listings ADD COLUMN deep_link_url TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN legal_name TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN license_number TEXT");
  await d1.batch(categorySeed.map(x=>d1.prepare("INSERT OR IGNORE INTO categories (slug,name,icon,display_order) VALUES (?,?,?,?)").bind(...x)));
  await d1.batch(provinceSeed.map(x=>d1.prepare("INSERT OR IGNORE INTO provinces (code,name,region) VALUES (?,?,?)").bind(...x)));
  await d1.batch(destinationSeed.map(x=>d1.prepare("INSERT OR IGNORE INTO destinations (slug,name,summary,province_id,district,latitude,longitude,cover_image_url,source_url,is_test_data) SELECT ?,?,?,id,?,?,?,?,?,1 FROM provinces WHERE code=?").bind(x[0],x[1],x[2],x[4],x[5],x[6],x[7],x[8],x[3])));
  await d1.batch(providerSeed.map(x=>d1.prepare("INSERT OR IGNORE INTO providers (slug,trading_name,source_name,source_url,is_test_data) VALUES (?,?,?,?,1)").bind(...x)));
  await d1.batch(listingSeed.map(x=>d1.prepare(`INSERT OR IGNORE INTO listings (slug,provider_id,destination_id,category_id,name,summary,image_url,photo_credit,deep_link_url,tag,base_price,member_price,rating,review_count,is_test_data,last_reviewed_at) SELECT ?,p.id,d.id,c.id,?,?,?,?,?,?,?,?,?,?,1,? FROM providers p,destinations d,categories c WHERE p.slug=? AND d.slug=? AND c.slug=?`).bind(x[0],x[4],x[5],x[6],x[7],x[8],x[9],x[10],x[11],x[12],x[13],"2026-07-22",x[1],x[2],x[3])));
}
export async function getCatalogue(query="",category="all"){
  await ensureCatalogue();
  const d1=env.DB;
  const like=`%${query.trim()}%`;
  const result=await d1.prepare(`SELECT l.id,l.slug,l.name,l.summary,l.image_url AS imageUrl,l.photo_credit AS photoCredit,COALESCE(l.deep_link_url,p.source_url) AS deepLinkUrl,l.tag,l.currency,l.base_price AS basePrice,l.member_price AS memberPrice,l.rating,l.review_count AS reviewCount,l.verification_status AS verificationStatus,l.is_test_data AS isTestData,d.name AS destination,d.district AS district,d.latitude,d.longitude,pv.name AS province,pv.code AS provinceCode,pv.region AS provinceRegion,c.slug AS categorySlug,c.name AS categoryName,p.trading_name AS providerName,p.source_url AS sourceUrl FROM listings l JOIN destinations d ON d.id=l.destination_id JOIN provinces pv ON pv.id=d.province_id JOIN categories c ON c.id=l.category_id JOIN providers p ON p.id=l.provider_id WHERE l.publication_status='published' AND (?='' OR l.name LIKE ? OR l.summary LIKE ? OR l.tag LIKE ? OR d.name LIKE ? OR d.summary LIKE ? OR d.district LIKE ? OR pv.name LIKE ? OR pv.region LIKE ? OR c.name LIKE ? OR p.trading_name LIKE ?) AND (?='all' OR c.slug=?) ORDER BY l.rating DESC,l.name ASC`).bind(query.trim(),like,like,like,like,like,like,like,like,like,like,category,category).all();
  const cats=await d1.prepare("SELECT slug,name,icon,display_order AS displayOrder FROM categories WHERE is_active=1 ORDER BY display_order").all();
  return{categories:cats.results,listings:result.results,meta:{count:result.results.length,seededTestData:true}};
}

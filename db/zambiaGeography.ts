export type ZambiaRegion = "Southern & Lusaka" | "Copperbelt & North-Western" | "Central & Eastern" | "Northern & Luapula" | "Western";

export interface ZambiaDistrictData {
  name: string;
  category: "stays" | "nature" | "culture" | "adventure" | "marine" | "all";
  keyDestinations: string[];
}

export interface ZambiaProvinceData {
  code: string;
  name: string;
  capital: string;
  region: ZambiaRegion;
  districts: ZambiaDistrictData[];
}

export const ZAMBIA_REGIONS: { name: ZambiaRegion; label: string; description: string }[] = [
  {
    name: "Southern & Lusaka",
    label: "Southern & Lusaka Region",
    description: "Home to the thunderous Victoria Falls (Mosi-oa-Tunya), Lake Kariba, and the vibrant national capital."
  },
  {
    name: "Central & Eastern",
    label: "Central & Eastern Wildlife Region",
    description: "The birthplace of the walking safari in South Luangwa National Park, Luangwa Valley, and historic mining towns."
  },
  {
    name: "Northern & Luapula",
    label: "Northern Waterfalls & Lakes Region",
    description: "Spectacular waterfalls (Kalambo, Lumangwe, Kundalila), Lake Tanganyika, and ancient rock heritage."
  },
  {
    name: "Copperbelt & North-Western",
    label: "Copperbelt & North-Western Region",
    description: "The economic heartland, Source of the Zambezi River, West Lunga wilderness, and emerald mines."
  },
  {
    name: "Western",
    label: "Western Zambezi Region",
    description: "The vast Barotse Floodplain, Kuomboka traditional ceremony, and Liuwa Plain wildebeest migration."
  }
];

export const ZAMBIA_PROVINCES: ZambiaProvinceData[] = [
  // ================= 1. Southern Province (15 Districts) =================
  {
    code: "ZM-SOU",
    name: "Southern Province",
    capital: "Choma",
    region: "Southern & Lusaka",
    districts: [
      { name: "Livingstone Urban", category: "adventure", keyDestinations: ["Victoria Falls (Mosi-oa-Tunya National Park)", "Livingstone Island & Devil's Pool", "Batoka Gorge Rafting", "Livingstone Museum"] },
      { name: "Choma District", category: "culture", keyDestinations: ["Choma Museum & Crafts", "Provincial Administration Hub", "Macha Heritage Grounds"] },
      { name: "Siavonga District", category: "marine", keyDestinations: ["Lake Kariba Shoreline & Harbours", "Kariba Dam Wall Lookout", "Sandy Beach Houseboat Marina"] },
      { name: "Itezhi-Tezhi District", category: "nature", keyDestinations: ["Kafue National Park (Southern Sector)", "Itezhi-Tezhi Dam & Reservoir", "Lake Safari Camp"] },
      { name: "Monze District", category: "culture", keyDestinations: ["Lochinvar National Park (Kafue Lechwe)", "Gwisho Hot Springs", "Sebanzi Hill"] },
      { name: "Namwala District", category: "culture", keyDestinations: ["Shimunenga Traditional Cattle Ceremony", "Kafue Flats Floodplain", "Maala Sacred Grounds"] },
      { name: "Mazabuka District", category: "stays", keyDestinations: ["Sugar Cane Plantation Trails", "Kafue River Marina", "Munali Hills Historic Pass"] },
      { name: "Kazungula District", category: "adventure", keyDestinations: ["Kazungula Quadripoint Bridge (Zambia/Botswana/Namibia/Zimbabwe)", "Zambezi River Safari Crossing"] },
      { name: "Kalomo District", category: "culture", keyDestinations: ["First Colonial Capital Administrator's House", "Kalomo Grain Reserves", "Dundumwezi Gate (Kafue Entrance)"] },
      { name: "Sinazongwe District", category: "marine", keyDestinations: ["Lake Kariba Southern Fisheries", "Maamba Coal Basin", "Binga Waterway Ferry Post"] },
      { name: "Chikankata District", category: "nature", keyDestinations: ["Kafue Gorge Hydroelectric Scenic Canyon", "Chikankata Valley Views"] },
      { name: "Chirundu District", category: "nature", keyDestinations: ["Chirundu Fossil Forest National Monument", "Zambezi Lower Escarpment", "Chirundu Bridge Crossing"] },
      { name: "Gwembe District", category: "culture", keyDestinations: ["Gwembe Valley Heritage", "Lake Kariba Northern Hills"] },
      { name: "Pemba District", category: "culture", keyDestinations: ["Pemba Cultural Craft Hub", "Southern Agro-Tourism Belt"] },
      { name: "Zimba District", category: "stays", keyDestinations: ["Zimba Gateway Route", "Livingstone Safari Corridor"] }
    ]
  },

  // ================= 2. Lusaka Province (6 Districts) =================
  {
    code: "ZM-LUS",
    name: "Lusaka Province",
    capital: "Lusaka",
    region: "Southern & Lusaka",
    districts: [
      { name: "Lusaka Central", category: "culture", keyDestinations: ["Lusaka National Museum & Heritage Precinct", "Kabwata Cultural Village", "Lusaka National Park (Elephant Orphanage)", "EastPark & Arcades Centers"] },
      { name: "Chongwe District", category: "nature", keyDestinations: ["Chaminuka Nature Reserve & Art Sanctuary", "Lower Zambezi Gateway (Chongwe River)", "Protea Safari Valley"] },
      { name: "Luangwa (Feira) District", category: "adventure", keyDestinations: ["Zambezi & Luangwa Rivers Confluence (Feira)", "Red Cliff Fishing Camp", "Mozambique & Zimbabwe Tri-Border Vista"] },
      { name: "Kafue District", category: "stays", keyDestinations: ["Kafue River Gorge Marina & River Lodge", "Kafue Fisheries & Boat Basin"] },
      { name: "Chilanga District", category: "nature", keyDestinations: ["Munda Wanga Environmental Park & Botanical Gardens", "National Fisheries Research Institute"] },
      { name: "Rufunsa District", category: "nature", keyDestinations: ["Rufunsa Conservation Conservancy", "Great East Road Mountain Pass", "Chinyunyu Hot Springs"] }
    ]
  },

  // ================= 3. Eastern Province (15 Districts) =================
  {
    code: "ZM-EAS",
    name: "Eastern Province",
    capital: "Chipata",
    region: "Central & Eastern",
    districts: [
      { name: "Chipata District", category: "culture", keyDestinations: ["Paramount Chief Mpezeni Royal Palace", "Mutenguleni Nc'wala Arena", "Kanjala Hill Viewpoint"] },
      { name: "Mambwe District", category: "nature", keyDestinations: ["South Luangwa National Park (Mfuwe Sector)", "Mfuwe International Airport", "Luangwa River Walking Safaris", "Nsefu Wildlife Sector"] },
      { name: "Katete District", category: "culture", keyDestinations: ["King Kalonga Gawa Undi Mkaika Royal Capital", "Kulamba Traditional Ceremony Arena", "St. Francis Heritage Mission"] },
      { name: "Lundazi District", category: "culture", keyDestinations: ["The Castle Hotel (Norman Heritage Architecture)", "Lundazi River Dam", "Lundazi Craft Centre"] },
      { name: "Petauke District", category: "nature", keyDestinations: ["Petauke Hills Exploration", "Nyimba River Gateway", "Luangwa Valley South Access"] },
      { name: "Chadiza District", category: "culture", keyDestinations: ["Chadiza Granite Boulders & Rock Vistas", "Mozambique Border Heritage Belt"] },
      { name: "Nyimba District", category: "nature", keyDestinations: ["Nyimba Hot Springs", "Luangwa Bridge Gateway", "Kacholola Sacred Springs"] },
      { name: "Sinda District", category: "stays", keyDestinations: ["Sinda Trade Route", "Eastern Agro-Belt Stays"] },
      { name: "Vubwi District", category: "culture", keyDestinations: ["Vubwi Mountain Range", "Tri-Country Heritage Crossing (Zambia/Malawi/Mozambique)"] },
      { name: "Chasefu District", category: "nature", keyDestinations: ["Chasefu Forest Reserve", "Upper Lundazi Wilderness"] },
      { name: "Chipangali District", category: "culture", keyDestinations: ["Chipangali Community Conservancies", "Lupande Game Management Area"] },
      { name: "Kasenengwa District", category: "stays", keyDestinations: ["Kasenengwa Cultural Landscape", "Great East Safari Route"] },
      { name: "Lumezi District", category: "nature", keyDestinations: ["Lumezi Game Management Area", "Luangwa Valley Wildlife Buffer"] },
      { name: "Lusangazi District", category: "nature", keyDestinations: ["Lusangazi Wilderness", "South Luangwa Southern Flank"] }
    ]
  },

  // ================= 4. Central Province (11 Districts) =================
  {
    code: "ZM-CEN",
    name: "Central Province",
    capital: "Kabwe",
    region: "Central & Eastern",
    districts: [
      { name: "Kabwe District", category: "culture", keyDestinations: ["Broken Hill Man Discovery Site (Homo heidelbergensis)", "Kabwe Railway Heritage Museum", "Mulungushi Rock of Authority"] },
      { name: "Serenje District", category: "nature", keyDestinations: ["Kundalila Falls National Monument", "Kasanka National Park (Bat Migration Sector)", "Nsalu Cave Prehistoric Rock Art"] },
      { name: "Mkushi District", category: "adventure", keyDestinations: ["Mkushi River Canyons & Fly Fishing", "Muchinga Escarpment Hiking", "Forest Heights Eco Camps"] },
      { name: "Kapiri Mposhi District", category: "stays", keyDestinations: ["TAZARA Great Uhuru Railway Junction", "Central Transit Hub"] },
      { name: "Mumbwa District", category: "nature", keyDestinations: ["Mumbwa Caves Archaeological Site", "Kafue National Park Eastern Gate", "Nalubamba Game Reserve"] },
      { name: "Chibombo District", category: "stays", keyDestinations: ["Lukanga Swamps Ramsar Wetland", "Liteta Cultural Heritage"] },
      { name: "Chisamba District", category: "adventure", keyDestinations: ["Fringilla Agro-Tourism Complex", "Golden Valley Research Reserve"] },
      { name: "Chitambo District", category: "culture", keyDestinations: ["David Livingstone Memorial Monument", "Bangweulu Wetlands Southern Boundary"] },
      { name: "Luano District", category: "adventure", keyDestinations: ["Luano Valley Wilderness", "Lunsemfwa River Wonder Gorge & Bell Point"] },
      { name: "Ngabwe District", category: "nature", keyDestinations: ["Kafue River Meanders", "Lukanga Wetlands Western Edge"] },
      { name: "Shibuyunji District", category: "culture", keyDestinations: ["Sala Heritage Grounds", "Shibuyunji Cultural Landscape"] }
    ]
  },

  // ================= 5. Northern Province (12 Districts) =================
  {
    code: "ZM-NOR",
    name: "Northern Province",
    capital: "Kasama",
    region: "Northern & Luapula",
    districts: [
      { name: "Kasama District", category: "nature", keyDestinations: ["Chishimba Falls National Monument", "Mwela Rock Art Heritage Sanctuary (Over 1,000 Paintings)", "Kasama Botanical Reserve"] },
      { name: "Mbala District", category: "culture", keyDestinations: ["Moto Moto Cultural Museum", "Lake Chila Sunken Arms Historic Site", "WWI German Surrender Monument (Von Lettow-Vorbeck)"] },
      { name: "Mpulungu District", category: "marine", keyDestinations: ["Kalambo Falls (Africa's Second Highest Single-Drop Waterfall - 221m)", "Mpulungu International Port on Lake Tanganyika", "Nsumbu National Park Shoreline"] },
      { name: "Nsama District", category: "nature", keyDestinations: ["Nsumbu National Park (Ndole Bay, Nkamba Bay & Kasaba Bay)", "Lake Tanganyika Endemic Fish Sanctuaries"] },
      { name: "Mungwi District", category: "culture", keyDestinations: ["Paramount Chief Chitimukulu Royal Palace", "Ukusefya Pa Ng'wena Ceremony Arena", "Chambeshi River Crossing"] },
      { name: "Luwingu District", category: "nature", keyDestinations: ["Lake Mukubwe", "Chilubi Island Boat Basin", "Luwingu Waterfalls"] },
      { name: "Mporokoso District", category: "nature", keyDestinations: ["Kapuma Falls & Pweto Rapids", "Mporokoso Highland Plains"] },
      { name: "Chilubi District", category: "marine", keyDestinations: ["Lake Bangweulu Chilubi Island Archipelago", "Water Bird Sanctuaries"] },
      { name: "Kaputa District", category: "nature", keyDestinations: ["Lake Mweru Wantipa National Park", "Kaputa Salt Processing Springs"] },
      { name: "Lunte District", category: "nature", keyDestinations: ["Lunte River Rapids", "Northern Miombo Wilderness"] },
      { name: "Lupososhi District", category: "nature", keyDestinations: ["Lupososhi River Valley", "Lake Bangweulu Northern Marshes"] },
      { name: "Senga Hill District", category: "adventure", keyDestinations: ["Senga Hill Escarpment Trails", "Tanganyika Plateau Viewpoints"] }
    ]
  },

  // ================= 6. Luapula Province (12 Districts) =================
  {
    code: "ZM-LUA",
    name: "Luapula Province",
    capital: "Mansa",
    region: "Northern & Luapula",
    districts: [
      { name: "Mansa District", category: "culture", keyDestinations: ["Mansa Capital Heritage", "Mambilima Falls on the Luapula River", "Senama Crafts Market"] },
      { name: "Mwansabombwe District", category: "culture", keyDestinations: ["King Mwata Kazembe Royal Palace (Musumba)", "Umutomboko Royal Victory Ceremony Arena", "Ng'ona Sacred River"] },
      { name: "Samfya District", category: "marine", keyDestinations: ["Lake Bangweulu White Sand Beaches & Resorts", "Chilubi Island Ferry Terminal", "Kwala Island"] },
      { name: "Kawambwa District", category: "nature", keyDestinations: ["Lumangwe Falls (The Victoria Falls of the North)", "Kabwelume Cascading Waterfalls", "Ntumbachushi Falls Sanctuary", "Kawambwa Tea Estates"] },
      { name: "Nchelenge District", category: "marine", keyDestinations: ["Lake Mweru Shoreline & Isokwe Island", "Kilwa Island Historical Colony"] },
      { name: "Chienge District", category: "nature", keyDestinations: ["Lake Mweru Northern Tip", "Chienge Ancient Saltpans"] },
      { name: "Chembe District", category: "stays", keyDestinations: ["Luapula River Bridge Gateway (DRC Pedicle)", "Chembe Bird Sanctuary"] },
      { name: "Chifunabuli District", category: "marine", keyDestinations: ["Lake Chifunabuli Protected Bay", "Bangweulu Fishing Camps"] },
      { name: "Chipili District", category: "nature", keyDestinations: ["Chipili Rapids", "Luapula Escarpment Views"] },
      { name: "Lunga District", category: "nature", keyDestinations: ["Bangweulu Wetlands Core Swamps", "Shoebill Stork Breeding Sanctuaries", "Black Lechwe Herds"] },
      { name: "Milenge District", category: "adventure", keyDestinations: ["Luapula River Gorge Rapids", "Milenge Wilderness Trails"] },
      { name: "Mwense District", category: "nature", keyDestinations: ["Mambilima Rapids", "Munwa Stream Prehistoric Rock Engravings"] }
    ]
  },

  // ================= 7. Muchinga Province (8 Districts) =================
  {
    code: "ZM-MUC",
    name: "Muchinga Province",
    capital: "Chinsali",
    region: "Northern & Luapula",
    districts: [
      { name: "Chinsali District", category: "culture", keyDestinations: ["Simon Mwansa Kapwepwe Historical Monument", "Alice Lenshina Lumpa Church Ruins", "Chipoma Falls"] },
      { name: "Mpika District", category: "nature", keyDestinations: ["North Luangwa National Park (Black Rhino Sanctuary)", "Shiwa Ng'andu Historic English Manor House (The Africa House)", "Kapishya Natural Hot Springs", "Mutinondo Wilderness Reserve"] },
      { name: "Nakonde District", category: "stays", keyDestinations: ["Tanzania-Zambia Great North Road Border Gateway", "TAZARA Railway Corridor"] },
      { name: "Isoka District", category: "nature", keyDestinations: ["Mafinga Hills Foothills", "Isoka Mountain Waterfalls"] },
      { name: "Chama District", category: "nature", keyDestinations: ["Luangwa Valley Eastern Flank", "Chama Cotton & Wildlife Plains"] },
      { name: "Kanchibiya District", category: "nature", keyDestinations: ["Kanchibiya River Escarpment", "Bangweulu Eastern Marshes"] },
      { name: "Lavushimanda District", category: "nature", keyDestinations: ["Lavushi Manda National Park (Wilderness & Leopard Sanctuary)", "Lukulu River Pools"] },
      { name: "Mafinga District", category: "adventure", keyDestinations: ["Mafinga Central (Highest Peak in Zambia - 2,339m)", "Luangwa River Source Spring"] }
    ]
  },

  // ================= 8. Copperbelt Province (10 Districts) =================
  {
    code: "ZM-COP",
    name: "Copperbelt Province",
    capital: "Ndola",
    region: "Copperbelt & North-Western",
    districts: [
      { name: "Ndola District", category: "culture", keyDestinations: ["Dag Hammarskjöld Plane Crash Site Memorial (UNESCO Tentative)", "Copperbelt Museum", "Lake Chilengwa Sunken Wonder Crater"] },
      { name: "Kitwe District", category: "stays", keyDestinations: ["Mindolo Dam & Watersports Club", "Nkana Golf Heritage Sanctuary", "Kitwe Mining City Hub"] },
      { name: "Chingola District", category: "nature", keyDestinations: ["Chimfunshi Wildlife Orphanage (World's Largest Chimpanzee Sanctuary)", "Nchanga Open Cast Copper Mine Vista"] },
      { name: "Mufulira District", category: "stays", keyDestinations: ["Mufulira Underground Mine Tours", "Mokambo DRC Border Gateway"] },
      { name: "Luanshya District", category: "culture", keyDestinations: ["Roan Antelope Discovery Historic Site (1902)", "Makoma Dam & Leisure Park"] },
      { name: "Kalulushi District", category: "nature", keyDestinations: ["Chembe Bird Sanctuary & Nature Reserve", "Chibuluma Green Woodlands"] },
      { name: "Chililabombwe District", category: "stays", keyDestinations: ["Kasumbalesa International Trade Border Gate", "Konkola Mining Vista"] },
      { name: "Lufwanyama District", category: "adventure", keyDestinations: ["World-Famous Kagem Emerald Mines", "Lufwanyama River Wilderness"] },
      { name: "Masaiti District", category: "nature", keyDestinations: ["Lake Ishiba Ng'andu Cultural Lake", "Masaiti Botanical Buffer"] },
      { name: "Mpongwe District", category: "culture", keyDestinations: ["Lake Kashiba (The Sunken Lake of Secrets)", "Mpongwe Breadbasket Agro Farms"] }
    ]
  },

  // ================= 9. North-Western Province (11 Districts) =================
  {
    code: "ZM-NW",
    name: "North-Western Province",
    capital: "Solwezi",
    region: "Copperbelt & North-Western",
    districts: [
      { name: "Solwezi District", category: "culture", keyDestinations: ["Kifubwa Rock Stream Prehistoric Engravings Sanctuary", "Kansanshi Golf Estate", "Mutanda Falls"] },
      { name: "Mwinilunga District", category: "nature", keyDestinations: ["Source of the Zambezi River National Monument", "Zambezi Botanical Heritage Reserve", "West Lunga National Park Gateway", "Pineapple Plantation Agro Trails"] },
      { name: "Ikelenge District", category: "nature", keyDestinations: ["Zambezi Spring Source Point Zero", "Zambezi Rapids & Zengamina Hydro Wonder", "Hillwood Farm Wildlife Sanctuary"] },
      { name: "Zambezi District", category: "culture", keyDestinations: ["Senior Chief Ndungu Mize Capital (Likumbi Lya Mize UNESCO Masquerade)", "Senior Chief Ishindi Mukandakunda Royal Capital (Lunda Lubanza)"] },
      { name: "Chavuma District", category: "adventure", keyDestinations: ["Chavuma Falls on the Upper Zambezi", "Angola Border Vista & Rock Gorges"] },
      { name: "Kasempa District", category: "nature", keyDestinations: ["Kufukwila Cultural Ceremony Grounds", "Mukinge Hill Scenic Lookout", "Kafue National Park Northern Access Gate"] },
      { name: "Kabompo District", category: "culture", keyDestinations: ["Historic Kabompo House (Dr. Kenneth Kaunda Detention Site)", "Kabompo River Gorge"] },
      { name: "Kalumbila District", category: "nature", keyDestinations: ["Sentinel Wildlife Conservation Area", "Kalumbila Dam Marina"] },
      { name: "Manyinga District", category: "nature", keyDestinations: ["Manyinga River Wildlife Corridor", "Chikonkwelo Forest Reserve"] },
      { name: "Mufumbwe District", category: "nature", keyDestinations: ["West Lunga River Nature Reserve", "Lalafuta Game Management Area"] },
      { name: "Mushindamo District", category: "nature", keyDestinations: ["Mushindamo Forest Sanctuary", "Kipushi Historic Border Belt"] }
    ]
  },

  // ================= 10. Western Province (16 Districts) =================
  {
    code: "ZM-WES",
    name: "Western Province",
    capital: "Mongu",
    region: "Western",
    districts: [
      { name: "Mongu District", category: "culture", keyDestinations: ["Lealui Royal Palace (Litunga Summer Capital)", "Mongu Harbour", "Barotse Floodplain Overlook", "Barotse Royal Cashew & Mango Belt"] },
      { name: "Limulunga District", category: "culture", keyDestinations: ["Limulunga Royal Palace (Litunga Winter High Capital)", "Nayuma Museum", "Kuomboka Royal Landing Basin"] },
      { name: "Kalabo District", category: "nature", keyDestinations: ["Liuwa Plain National Park (Wildebeest Migration & Hyena Clans)", "Luanginga River Ferry Post", "Time + Tide King Lewanika Lodge"] },
      { name: "Senanga District", category: "marine", keyDestinations: ["Upper Zambezi World-Class Tiger Fishing Waters", "Senanga River Harbour", "Mambova Channel"] },
      { name: "Sesheke District", category: "nature", keyDestinations: ["Katima Mulilo Bridge (Namibia Border)", "Sioma Ngwezi National Park Access", "Sesheke River Lodges"] },
      { name: "Sioma District", category: "adventure", keyDestinations: ["Sioma (Ngonye) Falls on the Zambezi River", "Sioma Ngwezi National Park Wildlife Corridor"] },
      { name: "Kaoma District", category: "culture", keyDestinations: ["Kahare & Mutondo Royal Chiefdoms", "Kafue National Park Western Boundary"] },
      { name: "Luampa District", category: "culture", keyDestinations: ["Luampa Forest Reserves", "Traditional Agro-Belt"] },
      { name: "Lukulu District", category: "nature", keyDestinations: ["Upper Zambezi Deep River Channels", "Lukulu Sandbar Bird Sanctuaries"] },
      { name: "Mitete District", category: "nature", keyDestinations: ["Western Zambezi Floodplain Sanctuaries", "Barotse Cattle Grazing Plains"] },
      { name: "Mulobezi District", category: "culture", keyDestinations: ["Historic Mulobezi Teak Railway Route", "Sichifulo Game Reserve"] },
      { name: "Mwandi District", category: "culture", keyDestinations: ["Mwandi Royal Kuta Palace", "UCZ Historic Mission Hospital & Museum"] },
      { name: "Nalolo District", category: "culture", keyDestinations: ["Muoyo Royal Palace (The Litunga La Mboela / Southern Queen)", "Barotse Canals"] },
      { name: "Nkeyema District", category: "stays", keyDestinations: ["Nkeyema Tobacco & Grain Estates", "Lusaka-Mongu M9 Highway Rest Point"] },
      { name: "Shang'ombo District", category: "adventure", keyDestinations: ["Cuando River Wildlife Corridor (Angola Border)", "Luiana Transfrontier Route"] },
      { name: "Sikongo District", category: "nature", keyDestinations: ["Sikongo Grassy Plains", "Angola Cross-Border Cultural Corridor"] }
    ]
  }
];

export function findZambiaSmartHierarchy(query: string) {
  const queryLower = query.toLowerCase().trim();
  if (!queryLower) return null;

  for (const prov of ZAMBIA_PROVINCES) {
    for (const dist of prov.districts) {
      if (dist.name.toLowerCase().includes(queryLower)) {
        return {
          region: prov.region,
          province: prov.name,
          provinceCode: prov.code,
          district: dist.name,
          category: dist.category,
          keyDestinations: dist.keyDestinations
        };
      }
      for (const dest of dist.keyDestinations) {
        if (dest.toLowerCase().includes(queryLower)) {
          return {
            region: prov.region,
            province: prov.name,
            provinceCode: prov.code,
            district: dist.name,
            category: dist.category,
            keyDestinations: dist.keyDestinations,
            matchedDestination: dest
          };
        }
      }
    }
    if (prov.name.toLowerCase().includes(queryLower) || prov.capital.toLowerCase().includes(queryLower)) {
      return {
        region: prov.region,
        province: prov.name,
        provinceCode: prov.code,
        district: prov.districts[0].name,
        category: prov.districts[0].category,
        keyDestinations: prov.districts[0].keyDestinations
      };
    }
  }

  const matchedReg = ZAMBIA_REGIONS.find(r => r.name.toLowerCase().includes(queryLower) || r.label.toLowerCase().includes(queryLower));
  if (matchedReg) {
    const firstProv = ZAMBIA_PROVINCES.find(p => p.region === matchedReg.name);
    if (firstProv) {
      return {
        region: firstProv.region,
        province: firstProv.name,
        provinceCode: firstProv.code,
        district: firstProv.districts[0].name,
        category: firstProv.districts[0].category,
        keyDestinations: firstProv.districts[0].keyDestinations
      };
    }
  }

  return null;
}

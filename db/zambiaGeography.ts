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
  // ================= Southern Province =================
  {
    code: "ZM-SOU",
    name: "Southern Province",
    capital: "Choma",
    region: "Southern & Lusaka",
    districts: [
      {
        name: "Livingstone Urban",
        category: "adventure",
        keyDestinations: [
          "Victoria Falls (Mosi-oa-Tunya National Park)",
          "Livingstone Island & Devil's Pool",
          "Zambezi River Sunset Cruise Deck",
          "Livingstone Museum & Cultural Craft Market",
          "Royal Livingstone Resort & Safari Lodge",
          "Batoka Gorge White Water Rafting Gateway"
        ]
      },
      {
        name: "Siavonga District",
        category: "marine",
        keyDestinations: [
          "Lake Kariba Shoreline & Harbours",
          "Kariba Dam Wall Lookout",
          "Sandy Beach & Houseboat Marina",
          "Siavonga Leisure Lodge"
        ]
      },
      {
        name: "Itezhi-Tezhi District",
        category: "nature",
        keyDestinations: [
          "Kafue National Park (Southern Sector)",
          "Itezhi-Tezhi Dam & Reservoir",
          "Lake Itezhi-Tezhi Eco Safari Camp"
        ]
      },
      {
        name: "Choma District",
        category: "culture",
        keyDestinations: [
          "Choma Museum & Craft Centre",
          "Macha Heritage Grounds",
          "Southern Highlands Farm Estates"
        ]
      },
      {
        name: "Monze District",
        category: "culture",
        keyDestinations: [
          "Lochinvar National Park (Kafue Lechwe Sanctuary)",
          "Gwisho Hot Springs Heritage Site",
          "Sebanzi Hill Iron Age Site"
        ]
      }
    ]
  },

  // ================= Lusaka Province =================
  {
    code: "ZM-LUS",
    name: "Lusaka Province",
    capital: "Lusaka",
    region: "Southern & Lusaka",
    districts: [
      {
        name: "Lusaka Central",
        category: "culture",
        keyDestinations: [
          "Lusaka National Museum & Heritage Precinct",
          "Kabwata Cultural Village",
          "Lusaka National Park (Elephant Orphanage Project)",
          "Taj Pamodzi & Southern Sun Luxury Stays",
          "EastPark & Arcades Lifestyle Centers"
        ]
      },
      {
        name: "Chongwe District",
        category: "nature",
        keyDestinations: [
          "Lower Zambezi Gateway (Chongwe River Confluence)",
          "Chaminuka Nature Reserve & Art Sanctuary",
          "Protea Safari Lodge & Conservation Valley"
        ]
      },
      {
        name: "Luangwa (Feira) District",
        category: "adventure",
        keyDestinations: [
          "Zambezi & Luangwa Rivers Confluence (Feira)",
          "Red Cliff Fishing & Safari Camp",
          "Mozambique & Zimbabwe Border Vista"
        ]
      },
      {
        name: "Kafue District",
        category: "stays",
        keyDestinations: [
          "Kafue River Gorge Marina & River Lodge",
          "Kafue Fisheries & Boat Basin"
        ]
      }
    ]
  },

  // ================= Eastern Province =================
  {
    code: "ZM-EAS",
    name: "Eastern Province",
    capital: "Chipata",
    region: "Central & Eastern",
    districts: [
      {
        name: "Mambwe District",
        category: "nature",
        keyDestinations: [
          "South Luangwa National Park (Mfuwe Gateway)",
          "Mfuwe Lagoon & Wildlife Sanctuary",
          "Chichele Presidential Safari Lodge",
          "Tribal Textiles & Craft Village Mfuwe"
        ]
      },
      {
        name: "Chipata District",
        category: "culture",
        keyDestinations: [
          "Nc'wala Traditional Ceremony Grounds (Mutenguleni)",
          "Chipata Golf Club & Heritage Guesthouse",
          "Malawi Border Tourism Gateway"
        ]
      },
      {
        name: "Petauke District",
        category: "nature",
        keyDestinations: [
          "Kanyanja Falls & Petauke Hills",
          "Chimfunshi East Eco Reserve"
        ]
      }
    ]
  },

  // ================= Central Province =================
  {
    code: "ZM-CEN",
    name: "Central Province",
    capital: "Kabwe",
    region: "Central & Eastern",
    districts: [
      {
        name: "Serenje District",
        category: "adventure",
        keyDestinations: [
          "Kundalila Falls Scenic Wonder",
          "Nsalu Cave Ancient San Rock Paintings",
          "Kasanka National Park (World Famous Bat Migration)",
          "Wasa Safari Lodge Kasanka"
        ]
      },
      {
        name: "Mkushi District",
        category: "nature",
        keyDestinations: [
          "Mkushi River Farm Trails & Country Lodges",
          "Forest Reserve Birdwatching Valley"
        ]
      },
      {
        name: "Kabwe District",
        category: "culture",
        keyDestinations: [
          "Broken Hill Man (Homo rhodesiensis) Heritage Site",
          "Big Tree National Monument"
        ]
      }
    ]
  },

  // ================= Copperbelt Province =================
  {
    code: "ZM-COP",
    name: "Copperbelt Province",
    capital: "Ndola",
    region: "Copperbelt & North-Western",
    districts: [
      {
        name: "Ndola District",
        category: "culture",
        keyDestinations: [
          "Dag Hammarskjöld Crash Site Memorial",
          "Copperbelt Museum Ndola",
          "Lake Chilengwa Sunken Lake Wonder"
        ]
      },
      {
        name: "Kitwe District",
        category: "stays",
        keyDestinations: [
          "Mindolo Dam & Watersports Club",
          "Garden Court Kitwe",
          "Nkana Golf Heritage Sanctuary"
        ]
      },
      {
        name: "Chingola District",
        category: "nature",
        keyDestinations: [
          "Chimfunshi Chimpanzee Sanctuary",
          "Nchanga Open Cast Mine Vista"
        ]
      }
    ]
  },

  // ================= Northern Province =================
  {
    code: "ZM-NOR",
    name: "Northern Province",
    capital: "Kasama",
    region: "Northern & Luapula",
    districts: [
      {
        name: "Mbala District",
        category: "adventure",
        keyDestinations: [
          "Kalambo Falls (Africa's 2nd Highest Uninterrupted Waterfall)",
          "Lake Tanganyika Shoreline & Scuba Haven",
          "Moto Moto Museum of Zambian Culture",
          "Ndole Bay Beach Safari Lodge"
        ]
      },
      {
        name: "Kasama District",
        category: "nature",
        keyDestinations: [
          "Chishimba Falls Cultural Monument",
          "Mwela Rock Art Protected Heritage",
          "Kasama Highland Eco Resort"
        ]
      },
      {
        name: "Mpulungu District",
        category: "marine",
        keyDestinations: [
          "Mpulungu International Port & Harbor",
          "Lake Tanganyika Cichlid Marine Sanctuary",
          "Kambole Mission Escarpment"
        ]
      }
    ]
  },

  // ================= Luapula Province =================
  {
    code: "ZM-LUA",
    name: "Luapula Province",
    capital: "Mansa",
    region: "Northern & Luapula",
    districts: [
      {
        name: "Kawambwa District",
        category: "adventure",
        keyDestinations: [
          "Lumangwe Falls (Little Victoria Falls)",
          "Kabwelume Waterfalls Cascade",
          "Ntumbachushi Falls Sanctuary"
        ]
      },
      {
        name: "Samfya District",
        category: "marine",
        keyDestinations: [
          "Lake Bangweulu White Sand Beaches",
          "Bangweulu Wetlands (Shoebill Stork Sanctuary)",
          "Samfya Beach Resort & Chita Lodge"
        ]
      },
      {
        name: "Mansa District",
        category: "stays",
        keyDestinations: [
          "Mansa Heritage Palms Hotel",
          "Luapula River Rapids"
        ]
      }
    ]
  },

  // ================= Western Province =================
  {
    code: "ZM-WES",
    name: "Western Province",
    capital: "Mongu",
    region: "Western",
    districts: [
      {
        name: "Kalabo District",
        category: "nature",
        keyDestinations: [
          "Liuwa Plain National Park (Wildebeest Migration)",
          "Matamanene Safari Camp Liuwa",
          "Zambezi River Upper Expeditions"
        ]
      },
      {
        name: "Mongu District",
        category: "culture",
        keyDestinations: [
          "Kuomboka Royal Canal & Harbor",
          "Nayuma Royal Museum (Lozi Heritage)",
          "Barotse Floodplain Sunset Deck"
        ]
      },
      {
        name: "Senanga District",
        category: "marine",
        keyDestinations: [
          "Barotse Tiger Fishing Safari Lodges",
          "Sioma Ngwezi National Park",
          "Ngonye (Sioma) Falls Zambezi Wonder"
        ]
      }
    ]
  },

  // ================= North-Western Province =================
  {
    code: "ZM-NW",
    name: "North-Western Province",
    capital: "Solwezi",
    region: "Copperbelt & North-Western",
    districts: [
      {
        name: "Mwinilunga District",
        category: "nature",
        keyDestinations: [
          "Source of the Zambezi National Monument",
          "Zambezi Source Botanical Reserve",
          "West Lunga National Park Wildlife Sanctuary"
        ]
      },
      {
        name: "Solwezi District",
        category: "culture",
        keyDestinations: [
          "Kifubwa Rock Stream Engravings Sanctuary",
          "Kansanshi Luxury Golf Estate & Lodge"
        ]
      }
    ]
  },

  // ================= Muchinga Province =================
  {
    code: "ZM-MUC",
    name: "Muchinga Province",
    capital: "Chinsali",
    region: "Northern & Luapula",
    districts: [
      {
        name: "Mpika District",
        category: "nature",
        keyDestinations: [
          "North Luangwa National Park (Black Rhino Sanctuary)",
          "Mutinondo Wilderness Granite Peaks & Waterfalls",
          "Shiwa Ng'andu Historic Manor House & Hot Springs"
        ]
      },
      {
        name: "Lavushimanda District",
        category: "adventure",
        keyDestinations: [
          "Lavushi Manda National Park Rugged Escarpment",
          "Lulimala River Wilderness Camp"
        ]
      }
    ]
  }
];

export function findZambiaSmartHierarchy(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  for (const prov of ZAMBIA_PROVINCES) {
    for (const dist of prov.districts) {
      for (const dest of dist.keyDestinations) {
        if (dest.toLowerCase().includes(q) || q.includes(dest.toLowerCase())) {
          return {
            region: prov.region,
            provinceCode: prov.code,
            provinceName: prov.name,
            districtName: dist.name,
            destinationName: dest,
            matchedOn: "destination" as const
          };
        }
      }
      if (dist.name.toLowerCase().includes(q)) {
        return {
          region: prov.region,
          provinceCode: prov.code,
          provinceName: prov.name,
          districtName: dist.name,
          destinationName: dist.keyDestinations[0] || "",
          matchedOn: "district" as const
        };
      }
    }
    if (prov.name.toLowerCase().includes(q) || prov.code.toLowerCase() === q || prov.capital.toLowerCase().includes(q)) {
      return {
        region: prov.region,
        provinceCode: prov.code,
        provinceName: prov.name,
        districtName: prov.districts[0]?.name || "",
        destinationName: prov.districts[0]?.keyDestinations[0] || "",
        matchedOn: "province" as const
      };
    }
  }

  for (const reg of ZAMBIA_REGIONS) {
    if (reg.name.toLowerCase().includes(q) || reg.label.toLowerCase().includes(q)) {
      const firstProv = ZAMBIA_PROVINCES.find(p => p.region === reg.name);
      return {
        region: reg.name,
        provinceCode: firstProv?.code || "",
        provinceName: firstProv?.name || "",
        districtName: firstProv?.districts[0]?.name || "",
        destinationName: firstProv?.districts[0]?.keyDestinations[0] || "",
        matchedOn: "region" as const
      };
    }
  }

  return null;
}

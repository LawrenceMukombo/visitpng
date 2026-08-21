export type PngRegion="Southern"|"Momase"|"Highlands"|"Islands";

export interface PngProvinceData {
  code: string;
  name: string;
  capital: string;
  region: PngRegion;
  districts: {
    name: string;
    keyDestinations: string[];
  }[];
}

export const PNG_REGIONS: { name: PngRegion; label: string; description: string }[] = [
  {
    name: "Southern",
    label: "Southern (Papua) Region",
    description: "Encompasses the southern coastline, National Capital District, Central, Oro, Milne Bay, Western, and Gulf provinces."
  },
  {
    name: "Momase",
    label: "Momase Region",
    description: "The northern mainland coastal region comprising Morobe, Madang, East Sepik, and Sandaun (West Sepik) provinces."
  },
  {
    name: "Highlands",
    label: "Highlands Region",
    description: "The rugged interior mountain backbone including Eastern Highlands, Western Highlands, Simbu, Southern Highlands, Enga, Hela, and Jiwaka."
  },
  {
    name: "Islands",
    label: "Islands Region",
    description: "The Bismarck Archipelago and Bougainville including East New Britain, West New Britain, New Ireland, Manus, and AROB."
  }
];

export const PNG_PROVINCES: PngProvinceData[] = [
  // Southern Region
  {
    code: "NCD",
    name: "National Capital District",
    capital: "Port Moresby",
    region: "Southern",
    districts: [
      { name: "Moresby North-East", keyDestinations: ["Port Moresby", "Waigani Cultural Precinct", "National Museum & Art Gallery"] },
      { name: "Moresby North-West", keyDestinations: ["Hanuabada", "University Area"] },
      { name: "Moresby South", keyDestinations: ["Ela Beach", "Harbour Foreshore", "Paga Hill"] }
    ]
  },
  {
    code: "CP",
    name: "Central Province",
    capital: "Bautama / Port Moresby",
    region: "Southern",
    districts: [
      { name: "Hiri-Koiari District", keyDestinations: ["Owers' Corner (Kokoda Southern Gateway)", "Varirata National Park", "Sogeri Plateau", "Rouna Falls"] },
      { name: "Abau District", keyDestinations: ["Loloata Island", "Cloudy Bay", "Kupiano"] },
      { name: "Kairuku District", keyDestinations: ["Yule Island", "Bereina", "Hisiu Beach"] },
      { name: "Rigo District", keyDestinations: ["Kwikila", "Hood Lagoon"] }
    ]
  },
  {
    code: "ORO",
    name: "Oro (Northern) Province",
    capital: "Popondetta",
    region: "Southern",
    districts: [
      { name: "Sohe District", keyDestinations: ["Kokoda Station (Kokoda Northern Gateway)", "Kokoda Track Memorial", "Mount Lamington", "Kumusi River"] },
      { name: "Ijivitari District", keyDestinations: ["Tufi Fjords", "Cape Nelson Dive Sites", "Popondetta", "Buna Wartime Heritage Coast"] }
    ]
  },
  {
    code: "MBP",
    name: "Milne Bay Province",
    capital: "Alotau",
    region: "Southern",
    districts: [
      { name: "Alotau District", keyDestinations: ["Alotau Town", "Discovery Bay", "Tawali Reefs"] },
      { name: "Esa'ala District", keyDestinations: ["Normanby Island", "Fergusson Island Hot Springs", "Dobu Island"] },
      { name: "Kiriwina-Goodenough District", keyDestinations: ["Trobriand Islands (Islands of Love)", "Goodenough Island"] },
      { name: "Samarai-Murua District", keyDestinations: ["Samarai Island Historic Port", "Misima Island", "Woodlark Island"] }
    ]
  },
  {
    code: "WP",
    name: "Western (Fly River) Province",
    capital: "Daru",
    region: "Southern",
    districts: [
      { name: "Middle Fly District", keyDestinations: ["Lake Murray", "Bensbach Wildlife Reserve"] },
      { name: "North Fly District", keyDestinations: ["Kiunga Birdwatching", "Tabubil & Star Mountains"] },
      { name: "South Fly District", keyDestinations: ["Daru Island", "Fly River Delta"] }
    ]
  },
  {
    code: "GP",
    name: "Gulf Province",
    capital: "Kerema",
    region: "Southern",
    districts: [
      { name: "Kerema District", keyDestinations: ["Kerema Bay", "Purari River"] },
      { name: "Kikori District", keyDestinations: ["Kikori River Delta", "Vavoi Falls"] }
    ]
  },

  // Momase Region
  {
    code: "ESP",
    name: "East Sepik",
    capital: "Wewak",
    region: "Momase",
    districts: [
      { name: "Wewak District", keyDestinations: ["Wewak Waterfront", "Cape Wom War Memorial", "Muschu Island"] },
      { name: "Angoram District", keyDestinations: ["Lower Sepik River Arts", "Angoram Carvings"] },
      { name: "Ambunti-Drekikier District", keyDestinations: ["Middle Sepik Spirit Houses (Haus Tambaran)", "Pagwi River Gateway"] },
      { name: "Maprik District", keyDestinations: ["Maprik Yam Cult Heritage", "Abelam Villages"] },
      { name: "Yangoru-Saussia District", keyDestinations: ["Yangoru Cultural Sites"] },
      { name: "Wosera-Gawi District", keyDestinations: ["Chambri Lakes", "Aibom Pottery Village"] }
    ]
  },
  {
    code: "WSP",
    name: "West Sepik (Sandaun)",
    capital: "Vanimo",
    region: "Momase",
    districts: [
      { name: "Vanimo-Green River District", keyDestinations: ["Vanimo Surf Coast", "Lido Beach", "Border Market"] },
      { name: "Aitape-Lumi District", keyDestinations: ["Aitape Coast", "Tari Tano Eco-lodge"] },
      { name: "Telefomin District", keyDestinations: ["Telefomin Valley", "Hindenburg Wall"] }
    ]
  },
  {
    code: "MP",
    name: "Madang Province",
    capital: "Madang",
    region: "Momase",
    districts: [
      { name: "Madang District", keyDestinations: ["Madang Town & Harbour", "Coastwatchers Lighthouse", "Kranket Island", "Siassi Islands"] },
      { name: "Sumkar District", keyDestinations: ["Karkar Island Volcano", "Bagabag Island"] },
      { name: "Bogia District", keyDestinations: ["Hansa Bay WWII Wrecks", "Manam Island Volcano"] },
      { name: "Rai Coast District", keyDestinations: ["Rai Coast Culture", "Saidor"] },
      { name: "Usino Bundi District", keyDestinations: ["Bundi High Altitude Trekking"] }
    ]
  },
  {
    code: "MOR",
    name: "Morobe Province",
    capital: "Lae",
    region: "Momase",
    districts: [
      { name: "Lae District", keyDestinations: ["Lae Botanic Gardens", "Lae War Cemetery", "Rainforest Habitat"] },
      { name: "Huon Gulf District", keyDestinations: ["Salamaua Peninsula Historic Isthmus", "Labu Turtle Beaches"] },
      { name: "Bulolo District", keyDestinations: ["Wau & Bulolo Gold Rush Sites", "McAdam National Park"] },
      { name: "Finschhafen District", keyDestinations: ["Finschhafen Coast", "Tami Islands Woodcarvings"] }
    ]
  },

  // Highlands Region
  {
    code: "EHP",
    name: "Eastern Highlands",
    capital: "Goroka",
    region: "Highlands",
    districts: [
      { name: "Goroka District", keyDestinations: ["Goroka Show Grounds", "Asaro Mudmen Village", "JK McCarthy Museum"] },
      { name: "Daulo District", keyDestinations: ["Daulo Pass Mountain Lookout"] },
      { name: "Kainantu District", keyDestinations: ["Kainantu Pottery & Coffee Farms"] },
      { name: "Obura-Wonenara District", keyDestinations: ["Kratke Range Trekking"] }
    ]
  },
  {
    code: "WHP",
    name: "Western Highlands",
    capital: "Mount Hagen",
    region: "Highlands",
    districts: [
      { name: "Hagen Central District", keyDestinations: ["Mount Hagen Cultural Festival", "Kumul Game Sanctuary", "Wahgi Valley Orchids"] },
      { name: "Dei District", keyDestinations: ["Kuk Early Agricultural Site (UNESCO World Heritage)"] },
      { name: "Mul-Baiyer District", keyDestinations: ["Baiyer River Wildlife Sanctuary"] }
    ]
  },
  {
    code: "SIM",
    name: "Simbu (Chimbu)",
    capital: "Kundiawa",
    region: "Highlands",
    districts: [
      { name: "Kundiawa-Gembogl District", keyDestinations: ["Mount Wilhelm Base Camp (Keglsugl)", "Betty's Place & Trout Farm", "Iriketo Caves"] },
      { name: "Sinasina-Yonggomugl District", keyDestinations: ["Sinasina Cultural Sites"] },
      { name: "Kerowagi District", keyDestinations: ["Kerowagi Valley"] }
    ]
  },
  {
    code: "SHP",
    name: "Southern Highlands",
    capital: "Mendi",
    region: "Highlands",
    districts: [
      { name: "Mendi-Munihu District", keyDestinations: ["Mendi Valley", "Mount Giluwe (Volcanic Peak)"] },
      { name: "Ialibu-Pangia District", keyDestinations: ["Mount Ialibu", "Pangia Cultural Trails"] },
      { name: "Kagua-Erave District", keyDestinations: ["Erave Wilderness Trails"] }
    ]
  },
  {
    code: "ENG",
    name: "Enga",
    capital: "Wabag",
    region: "Highlands",
    districts: [
      { name: "Wabag District", keyDestinations: ["Wabag Cultural Centre", "Sand Painting Heritage"] },
      { name: "Wapenamanda District", keyDestinations: ["Tsak Valley Birdwatching"] },
      { name: "Porgera-Paiela District", keyDestinations: ["Porgera Alpine Scenery"] }
    ]
  },
  {
    code: "HEL",
    name: "Hela",
    capital: "Tari",
    region: "Highlands",
    districts: [
      { name: "Tari-Pori District", keyDestinations: ["Huli Wigmen Cultural Grounds", "Ambua Nature Sanctuary", "Tari Basin Bird of Paradise"] },
      { name: "Komo-Magarima District", keyDestinations: ["Lake Kutubu (Ramsar Wetland)"] }
    ]
  },
  {
    code: "JIK",
    name: "Jiwaka",
    capital: "Kurumul / Banz",
    region: "Highlands",
    districts: [
      { name: "North Waghi District", keyDestinations: ["Banz Coffee & Tea Plantations", "Wahgi River Gorge"] },
      { name: "Anglimp-South Waghi District", keyDestinations: ["Minj Cultural Centres"] }
    ]
  },

  // Islands Region
  {
    code: "ENB",
    name: "East New Britain",
    capital: "Kokopo",
    region: "Islands",
    districts: [
      { name: "Kokopo District", keyDestinations: ["Kokopo Town Beach", "Gazelle Peninsula", "War Museum Kokopo"] },
      { name: "Rabaul District", keyDestinations: ["Mount Tavurvur Active Volcano", "Rabaul Caldera Harbour", "Admiral Yamamoto Bunker", "Submarine Base"] },
      { name: "Gazelle District", keyDestinations: ["Baining Fire Dancers", "Kerevat Rainforest"] },
      { name: "Pomio District", keyDestinations: ["Jacquinot Bay", "Pomio Karst Caves"] }
    ]
  },
  {
    code: "WNB",
    name: "West New Britain",
    capital: "Kimbe",
    region: "Islands",
    districts: [
      { name: "Talasea District", keyDestinations: ["Kimbe Bay Coral Reefs", "Walindi Reef & Eco-Resort", "Garu Hot River & Thermal Springs"] },
      { name: "Kandrian-Gloucester District", keyDestinations: ["Kandrian Coast", "Cape Gloucester"] }
    ]
  },
  {
    code: "NIP",
    name: "New Ireland",
    capital: "Kavieng",
    region: "Islands",
    districts: [
      { name: "Kavieng District", keyDestinations: ["Kavieng World-Class Surf & Diving", "Boluminski Highway Cycling Trail", "Malagan Mask Carving Centers"] },
      { name: "Namatanai District", keyDestinations: ["Namatanai Heritage Coast", "Tanga Islands", "Lihir Island"] }
    ]
  },
  {
    code: "MAN",
    name: "Manus",
    capital: "Lorengau",
    region: "Islands",
    districts: [
      { name: "Manus District", keyDestinations: ["Lorengau Harbour", "Green Snail Shell Coast", "Los Negros Island", "St Andrew Islands"] }
    ]
  },
  {
    code: "AROB",
    name: "Bougainville",
    capital: "Buka",
    region: "Islands",
    districts: [
      { name: "North Bougainville", keyDestinations: ["Buka Passage & Island", "Sohano Island"] },
      { name: "Central Bougainville", keyDestinations: ["Arawa Coastal Town", "Panguna Valley", "Pokpok Island"] },
      { name: "South Bougainville", keyDestinations: ["Buin Wartime Heritage", "Torokina Coast"] }
    ]
  }
];

export function findLocationSmartHierarchy(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  for (const prov of PNG_PROVINCES) {
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

  for (const reg of PNG_REGIONS) {
    if (reg.name.toLowerCase().includes(q) || reg.label.toLowerCase().includes(q)) {
      const firstProv = PNG_PROVINCES.find(p => p.region === reg.name);
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

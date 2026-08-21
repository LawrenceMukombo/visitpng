export type PngRegion="Southern"|"Momase"|"Highlands"|"Islands";

export interface PngDistrictData {
  name: string;
  category: "stays" | "nature" | "culture" | "adventure" | "marine" | "all";
  keyDestinations: string[];
}

export interface PngProvinceData {
  code: string;
  name: string;
  capital: string;
  region: PngRegion;
  districts: PngDistrictData[];
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
  // ================= Southern Region =================
  {
    code: "NCD",
    name: "National Capital District",
    capital: "Port Moresby",
    region: "Southern",
    districts: [
      { name: "Moresby North-East", category: "culture", keyDestinations: ["Port Moresby Town", "Waigani Cultural Precinct", "National Museum & Art Gallery", "Port Moresby Nature Park Sanctuary", "The Sanctuary Hotel & Spa"] },
      { name: "Moresby North-West", category: "stays", keyDestinations: ["Hanuabada Stilt Village", "University Botanical Trail", "Airways Hotel & Botanical Deck"] },
      { name: "Moresby South", category: "marine", keyDestinations: ["Ela Beach Boardwalk", "Paga Hill Scenic Lookout", "Harbour City Marina", "Loloata Marine Gateway"] }
    ]
  },
  {
    code: "CP",
    name: "Central Province",
    capital: "Bautama",
    region: "Southern",
    districts: [
      { name: "Hiri-Koiari District", category: "adventure", keyDestinations: ["Owers' Corner (Kokoda Southern Gateway)", "Varirata National Park Rainforest", "Sogeri Plateau & River Camps", "Rouna Falls Lookout", "Kokoda Trail Motel & Retreat"] },
      { name: "Abau District", category: "stays", keyDestinations: ["Loloata Island Marine Resort", "Cloudy Bay Eco-Lodge", "Kupiano Coastal Guesthouse", "Cape Rodney Plantations"] },
      { name: "Kairuku District", category: "culture", keyDestinations: ["Yule Island French Catholic Mission", "Bereina Cultural Grounds", "Hisiu Beach Sands"] },
      { name: "Goilala District", category: "nature", keyDestinations: ["Mount Albert Edward Alpine Trek", "Tapini Mountain Valley", "Woitape Highland Station"] },
      { name: "Rigo District", category: "nature", keyDestinations: ["Kwikila Hills Retreat", "Hood Lagoon Marine Haven", "Hula Coastal Village"] }
    ]
  },
  {
    code: "ORO",
    name: "Oro (Northern) Province",
    capital: "Popondetta",
    region: "Southern",
    districts: [
      { name: "Sohe District", category: "adventure", keyDestinations: ["Kokoda Station (Northern Gateway)", "Kokoda Track Memorial Gardens", "Mount Lamington Volcano", "Kumusi River Crossing", "Kovelo Village Homestays"] },
      { name: "Ijivitari District", category: "marine", keyDestinations: ["Tufi Dive Resort & Fjords", "Cape Nelson Scuba Reefs", "Tufi Cultural Homestays", "Buna Wartime Heritage Beach", "Sanananda War Memorials"] },
      { name: "Popondetta Urban", category: "stays", keyDestinations: ["Popondetta Butterfly Sanctuary (Queen Alexandra's Birdwing)", "Higaturu Oil Palm Eco-Tours", "Oro Guesthouse"] }
    ]
  },
  {
    code: "MBP",
    name: "Milne Bay Province",
    capital: "Alotau",
    region: "Southern",
    districts: [
      { name: "Alotau District", category: "culture", keyDestinations: ["Alotau Canoe & Kundu Festival Grounds", "Tawali Leisure & Dive Resort", "Discovery Bay Heritage Site", "Driftwood Resort Alotau", "Top Town Cultural Crafts"] },
      { name: "Esa'ala District", category: "nature", keyDestinations: ["Deidei Thermal Springs & Geysers (Fergusson Island)", "Normanby Island Waterfall Treks", "Dobu Island Coral Reefs"] },
      { name: "Kiriwina-Goodenough District", category: "culture", keyDestinations: ["Trobriand Islands (Yam Harvest Culture)", "Losuia Village Lodges", "Kaibola White Beach", "Goodenough Island Peaks"] },
      { name: "Samarai-Murua District", category: "marine", keyDestinations: ["Samarai Historic Colonial Island", "Woodlark Island (Ebora Carvings)", "Misima Island Gold Heritage", "Doini Island Private Marine Resort"] }
    ]
  },
  {
    code: "WP",
    name: "Western (Fly River) Province",
    capital: "Daru",
    region: "Southern",
    districts: [
      { name: "Middle Fly District", category: "nature", keyDestinations: ["Lake Murray Eco-Lodge (PNG's Largest Lake)", "Middle Fly Wetland Birdwatching", "Miwa Village Sacred Carvings"] },
      { name: "North Fly District", category: "nature", keyDestinations: ["Kiunga Rainforest Bird of Paradise Trail", "Tabubil & Star Mountains Wilderness", "Kwatu River Wilderness Camp"] },
      { name: "South Fly District", category: "marine", keyDestinations: ["Daru Island Fishing & Heritage", "Fly River Estuary Wildlife Haven", "Bamu Delta Wetlands"] },
      { name: "Delta Fly District", category: "nature", keyDestinations: ["Bensbach Wilderness Lodge (Rusa Deer & Wildlife)", "Tonda Wildlife Management Area", "Torassi River Expeditions"] }
    ]
  },
  {
    code: "GP",
    name: "Gulf Province",
    capital: "Kerema",
    region: "Southern",
    districts: [
      { name: "Kerema District", category: "nature", keyDestinations: ["Kerema Bay Beaches", "Murua River Eco-Camps", "Gulf Coastline Boardwalks"] },
      { name: "Kikori District", category: "nature", keyDestinations: ["Kikori River Delta Mangroves", "Vavoi Falls Wilderness", "Baimuru Lagoon Wildlife"] }
    ]
  },

  // ================= Momase Region =================
  {
    code: "MOR",
    name: "Morobe Province",
    capital: "Lae",
    region: "Momase",
    districts: [
      { name: "Lae District", category: "stays", keyDestinations: ["Lae International Hotel & Gardens", "Lae Botanical Rainforest Gardens", "Lae War Cemetery", "Rainforest Habitat Sanctuary", "Huon Club & Marina"] },
      { name: "Huon Gulf District", category: "marine", keyDestinations: ["Salamaua Peninsula Historic Isthmus", "Labu Leatherback Turtle Beach", "Morobe Coastal Eco-Village"] },
      { name: "Bulolo District", category: "nature", keyDestinations: ["Bulolo & Wau Gold Heritage Reserves", "McAdam National Park Pine Forests", "Wau Ecology Institute"] },
      { name: "Finschhafen District", category: "culture", keyDestinations: ["Finschhafen Historic Mission Port", "Tami Islands Wooden Bowls & Coral Atolls", "Manga Beach Retreat"] },
      { name: "Markham District", category: "nature", keyDestinations: ["Markham Valley Cattle & Farming Trails", "Erap River Sanctuary"] },
      { name: "Menyamya District", category: "culture", keyDestinations: ["Menyamya Smoked Bodies of Aseki", "Anga Cultural Heritage Grounds"] },
      { name: "Nawae District", category: "nature", keyDestinations: ["Rawlinson Range Mountain Rainforests", "Boana High-Country Trails"] },
      { name: "Tewae-Siassi District", category: "marine", keyDestinations: ["Siassi Islands Volcanoes & Outrigger Canoes", "Umboi Island Volcanic Lakes"] },
      { name: "Kabwum District", category: "adventure", keyDestinations: ["Saruwaged Range Alpine Treks", "Yopno Valley Cloud Forests"] },
      { name: "Wau-Waria District", category: "adventure", keyDestinations: ["Black Cat Track Wilderness Trek", "Waria River Gold Panning Camps"] }
    ]
  },
  {
    code: "MP",
    name: "Madang Province",
    capital: "Madang",
    region: "Momase",
    districts: [
      { name: "Madang District", category: "marine", keyDestinations: ["Madang Resort & Kalibobo Village", "Coastwatchers Memorial Beacon", "Kranket & Siar Marine Reserves", "Niugini Dive Adventures Reefs", "Madang Country Club & Lagoon"] },
      { name: "Sumkar District", category: "nature", keyDestinations: ["Karkar Island Active Volcano & Cocoa Plantations", "Bagabag Island Coral Reefs"] },
      { name: "Bogia District", category: "nature", keyDestinations: ["Hansa Bay WWII Ship & Airplane Wrecks", "Manam Island Smoking Volcano", "Bogia Coconut Coast"] },
      { name: "Rai Coast District", category: "culture", keyDestinations: ["Rai Coast Miklouho-Maclay Heritage Trail", "Saidor Historical Airfield Coast", "Crown Island Turtle Sanctuary"] },
      { name: "Usino Bundi District", category: "adventure", keyDestinations: ["Bundi Highland-to-Coast Trek", "Ramu Sugar Valley Farms", "Brahm Wildlife Reserves"] },
      { name: "Middle Ramu District", category: "nature", keyDestinations: ["Simbai Mountain Pygmy Culture", "Middle Ramu Floodplain Birding"] }
    ]
  },
  {
    code: "ESP",
    name: "East Sepik",
    capital: "Wewak",
    region: "Momase",
    districts: [
      { name: "Wewak District", category: "stays", keyDestinations: ["Wewak Waterfront & Cape Wom War Memorial", "In Wewak Boutique Hotel", "Muschu Island Eco-Retreat", "Kairiru Island Hot Springs & Waterfalls"] },
      { name: "Angoram District", category: "culture", keyDestinations: ["Lower Sepik Master Woodcarvers", "Angoram Riverfront Haus Tambaran", "Kambaramba Stilt Village on Water"] },
      { name: "Ambunti-Drekikier District", category: "culture", keyDestinations: ["Middle Sepik Spirit Houses (Haus Tambaran)", "Pagwi River Expedition Port", "Ambunti Crocodile Festival Grounds", "Karawari Wilderness Lodge"] },
      { name: "Maprik District", category: "culture", keyDestinations: ["Abelam Giant Yam Cult Towers", "Maprik Cultural Centre & Artifacts", "Brikiti Village Grounds"] },
      { name: "Wosera-Gawi District", category: "nature", keyDestinations: ["Chambri Lakes Sacred Crocodile Waterways", "Aibom Pottery Village (Sacred Clay)"] },
      { name: "Yangoru-Saussia District", category: "nature", keyDestinations: ["Mount Hurun Sacred Peaks", "Yangoru Cultural Story Sites"] }
    ]
  },
  {
    code: "WSP",
    name: "West Sepik (Sandaun)",
    capital: "Vanimo",
    region: "Momase",
    districts: [
      { name: "Vanimo-Green River District", category: "marine", keyDestinations: ["Vanimo Surf Coast (Lido Beach & Waromo)", "Vanimo Beach Hotel & Surf Lodge", "Wutung Border Market & Coastal Cliffs"] },
      { name: "Aitape-Lumi District", category: "stays", keyDestinations: ["Aitape Coastal Guesthouses", "Tari Tano Eco-lodge", "Angriff Harbour & War Relics"] },
      { name: "Telefomin District", category: "adventure", keyDestinations: ["Telefomin Alpine Valley", "Hindenburg Wall Karst Escarpment", "Victor Emanuel Range Treks"] },
      { name: "Nuku District", category: "nature", keyDestinations: ["Nuku Orchid Forests", "Torricelli Mountains Tree Kangaroo Sanctuary"] }
    ]
  },

  // ================= Highlands Region =================
  {
    code: "EHP",
    name: "Eastern Highlands",
    capital: "Goroka",
    region: "Highlands",
    districts: [
      { name: "Goroka District", category: "culture", keyDestinations: ["Goroka Cultural Show Grounds", "Bird of Paradise Hotel & Suites", "Asaro Mudmen Cultural Village", "JK McCarthy Museum & Artifacts", "Raun Raun Theatre (Traditional Architecture)"] },
      { name: "Daulo District", category: "nature", keyDestinations: ["Daulo Pass Mountain Lookout (2,478m)", "Kabiufa Highlands Flora Sanctuary", "Daulo Mountain Guesthouses"] },
      { name: "Kainantu District", category: "stays", keyDestinations: ["Kainantu Lodge & Pottery Center", "Eastern Highlands Organic Coffee Plantations", "Arona Dam Lake Recreation"] },
      { name: "Obura-Wonenara District", category: "adventure", keyDestinations: ["Kratke Mountain Range Trekking", "Wonenara Valley Coffee Trails"] },
      { name: "Henganofi District", category: "culture", keyDestinations: ["Henganofi Cultural Center", "Dunantina Valley Organic Gardens"] },
      { name: "Lufa District", category: "nature", keyDestinations: ["Mount Michael Cloud Forests & Climbs", "Lufa Caves & Rock Art"] },
      { name: "Okapa District", category: "culture", keyDestinations: ["Okapa Highlands Plateau", "Fore Cultural Heritage Sites"] },
      { name: "Unggai-Bena District", category: "culture", keyDestinations: ["Bena Cane Swallowers Festival", "Unggai Mountain Viewpoint"] }
    ]
  },
  {
    code: "WHP",
    name: "Western Highlands",
    capital: "Mount Hagen",
    region: "Highlands",
    districts: [
      { name: "Hagen Central District", category: "culture", keyDestinations: ["Mount Hagen Cultural Festival Grounds", "Highlander Hotel Mount Hagen", "Kumul Game Sanctuary (Wild Birds of Paradise)", "Wahgi Valley Orchid & Tea Estates", "Rondon Ridge Luxury Eco-Lodge"] },
      { name: "Dei District", category: "culture", keyDestinations: ["Kuk Early Agricultural Site (UNESCO World Heritage)", "Dei Cultural Tea Plantations"] },
      { name: "Mul-Baiyer District", category: "nature", keyDestinations: ["Baiyer River Wildlife & Bird Sanctuary", "Mul Alpine Range Treks"] },
      { name: "Tambul-Nebilyer District", category: "nature", keyDestinations: ["Mount Giluwe Volcanic Ascent (2nd Highest in PNG)", "Nebilyer River Rapids & Trout Sanctuary"] }
    ]
  },
  {
    code: "SIM",
    name: "Simbu (Chimbu)",
    capital: "Kundiawa",
    region: "Highlands",
    districts: [
      { name: "Kundiawa-Gembogl District", category: "adventure", keyDestinations: ["Mount Wilhelm Base Camp (Keglsugl, 4,509m Highest Peak)", "Betty's Place Highland Eco-Lodge & Trout Farm", "Iriketo Limestone Caves", "Lake Piunde & Aunde High Glacial Lakes"] },
      { name: "Sinasina-Yonggomugl District", category: "culture", keyDestinations: ["Sinasina Cultural Singsing Grounds", "Yonggomugl High Mountain Coffee Trails"] },
      { name: "Kerowagi District", category: "nature", keyDestinations: ["Kerowagi Valley Orchids", "Mingende Historic Cathedral & Gardens"] },
      { name: "Chauve District", category: "nature", keyDestinations: ["Keu Limestone Caverns & Subterranean Rivers", "Chauve Cultural Lookouts"] },
      { name: "Gumine District", category: "adventure", keyDestinations: ["Mount Digine Trekking", "Gumine Valley Wilderness"] },
      { name: "Karimui-Nomane District", category: "nature", keyDestinations: ["Karimui Volcanic Plateau Rainforest Reserve", "Pio River Wilderness"] }
    ]
  },
  {
    code: "SHP",
    name: "Southern Highlands",
    capital: "Mendi",
    region: "Highlands",
    districts: [
      { name: "Mendi-Munihu District", category: "stays", keyDestinations: ["Mendi Valley & Karinz Guesthouses", "Mount Giluwe South Trail", "Mendi Cultural Center"] },
      { name: "Ialibu-Pangia District", category: "nature", keyDestinations: ["Mount Ialibu Conical Volcanic Peak", "Pangia Cultural Trails", "Walume River Scenic Parks"] },
      { name: "Kagua-Erave District", category: "adventure", keyDestinations: ["Erave Limestone Gorges", "Kagua High Plateau Treks"] },
      { name: "Imbonggu District", category: "culture", keyDestinations: ["Walum Cultural Grounds", "Imbonggu Alpine Botanical Trails"] },
      { name: "Nipa-Kutubu District", category: "nature", keyDestinations: ["Lake Kutubu (Ramsar Protected Wetland & Endemic Fish)", "Tubu Guesthouses on the Lake", "Kutubu Butterfly & Hornbill Haven"] }
    ]
  },
  {
    code: "ENG",
    name: "Enga",
    capital: "Wabag",
    region: "Highlands",
    districts: [
      { name: "Wabag District", category: "culture", keyDestinations: ["Wabag Cultural Centre & Museum", "Enga Sand Painting Gallery", "Wabag Lodge & Orchid Gardens"] },
      { name: "Wapenamanda District", category: "nature", keyDestinations: ["Tsak Valley Bird of Paradise Sanctuary", "Wapenamanda Agricultural Valleys"] },
      { name: "Kandep District", category: "nature", keyDestinations: ["Lake Hargy High-Altitude Swamps", "Kandep Cold-Climate Wildlife Plains"] },
      { name: "Kompiam-Ambum District", category: "nature", keyDestinations: ["Ambum Valley Ancient Stone Mortars Site", "Kompiam River Rapids"] },
      { name: "Lagaip-Porgera District", category: "nature", keyDestinations: ["Laiagam Botanical Orchid Reserve", "Surunki High Altitude Lake"] },
      { name: "Pogera-Paiela District", category: "adventure", keyDestinations: ["Porgera Alpine Lookouts", "Mount Kaijende Karst Tower Climbs"] }
    ]
  },
  {
    code: "HEL",
    name: "Hela",
    capital: "Tari",
    region: "Highlands",
    districts: [
      { name: "Tari-Pori District", category: "culture", keyDestinations: ["Huli Wigmen Traditional Ceremonial Grounds", "Ambua Nature Sanctuary & Eco-Lodge (13 Bird of Paradise Species)", "Tari Basin Cultural Homestays", "Lakwanda Village Traditional Spirit Huts"] },
      { name: "Komo-Hulia District", category: "nature", keyDestinations: ["Komo Valley Lookouts", "Hulia River Fishing Camps"] },
      { name: "Koroba-Kopiago District", category: "adventure", keyDestinations: ["Lake Kopiago Sacred Wetland", "Duna Cultural Heritage Valley"] }
    ]
  },
  {
    code: "JIK",
    name: "Jiwaka",
    capital: "Kurumul / Banz",
    region: "Highlands",
    districts: [
      { name: "North Waghi District", category: "stays", keyDestinations: ["Banz Coffee & Tea Plantation Eco-Lodge", "Wahgi River High Gorges", "Avi Botanical Grounds"] },
      { name: "Anglimp-South Waghi District", category: "culture", keyDestinations: ["Minj Cultural Festival Grounds", "Kudjip Botanical Gardens"] },
      { name: "Jimi District", category: "adventure", keyDestinations: ["Jimi River Valley Wilderness Treks", "Tabibuga Cloud Forest Reserves"] }
    ]
  },

  // ================= Islands Region =================
  {
    code: "ENB",
    name: "East New Britain",
    capital: "Kokopo",
    region: "Islands",
    districts: [
      { name: "Kokopo District", category: "stays", keyDestinations: ["Kokopo Beach Bungalows Resort", "Gazelle International Hotel", "War & Historical Museum Kokopo", "Bitapaka War Memorial Gardens", "Vunapope Historic Mission Cathedral"] },
      { name: "Rabaul District", category: "adventure", keyDestinations: ["Mount Tavurvur Active Volcano & Hot Springs", "Rabaul Caldera Harbor & Dive Wrecks", "Admiral Yamamoto Underground Bunker", "Submarine Base Japanese Tunnels", "Rabaul Hotel (Historic Heritage)"] },
      { name: "Gazelle District", category: "culture", keyDestinations: ["Baining Mountains Fire Dancers Ritual Grounds", "Kerevat National Rainforest Sanctuary", "Kabaira Beach Coral Bay"] },
      { name: "Pomio District", category: "nature", keyDestinations: ["Jacquinot Bay Wilderness", "Pomio Karst Underground Rivers & Caves", "Drina River Eco-Tours"] }
    ]
  },
  {
    code: "WNB",
    name: "West New Britain",
    capital: "Kimbe",
    region: "Islands",
    districts: [
      { name: "Talasea District", category: "marine", keyDestinations: ["Walindi Plantation Resort & Coral Bay", "Kimbe Bay Marine Sanctuary (Over 860 Coral Species)", "Garu Thermal Hot River & Geothermal Pools", "FeBrina & MV Oceania Liveaboard Diving", "Numundo Beef & Eco-Trails"] },
      { name: "Nakanai District", category: "adventure", keyDestinations: ["Nakanai Giant Karst Sinkholes (Minye & Nare)", "Mount Pago Active Volcanic Cone", "Hoskins Thermal Springs"] },
      { name: "Kandrian-Gloucester District", category: "nature", keyDestinations: ["Cape Gloucester Volcanic Coast", "Kandrian Coral Lagoons", "Whiteman Range Wilderness"] }
    ]
  },
  {
    code: "NIP",
    name: "New Ireland",
    capital: "Kavieng",
    region: "Islands",
    districts: [
      { name: "Kavieng District", category: "marine", keyDestinations: ["Nusa Island Retreat (Eco Over-Water Bungalows)", "Kavieng World-Class Surf Breaks (Nago & Ral)", "Boluminski Highway Coastal Cycling Route", "Malagan Mask Carving Cultural Centers", "Lissenung Island Private Dive Resort", "Echuca Patch & Albatross Passage Scuba Reefs"] },
      { name: "Namatanai District", category: "stays", keyDestinations: ["Namatanai Heritage Port & Hotel", "Lelet Plateau High-Altitude Organic Farms", "Tanga & Feni Tropical Islands", "Lihir Island Cultural Coastline"] }
    ]
  },
  {
    code: "MAN",
    name: "Manus",
    capital: "Lorengau",
    region: "Islands",
    districts: [
      { name: "Manus District", category: "marine", keyDestinations: ["Lorengau Harbour & Sea Kayaking", "Green Snail Shell Protected Beaches", "Los Negros Coral Island Resort", "St Andrew Islands Pristine Diving", "Ahus Island Traditional Woodcarvers", "Tuluman Volcanic Seamounts"] }
    ]
  },
  {
    code: "AROB",
    name: "Bougainville",
    capital: "Buka",
    region: "Islands",
    districts: [
      { name: "North Bougainville", category: "stays", keyDestinations: ["Buka Passage Waterway & Islands", "Kuri Village Resort Buka", "Sohano Island Historic Lookouts", "Hahon Cultural Village"] },
      { name: "Central Bougainville", category: "adventure", keyDestinations: ["Arawa Coastal Town & Lodges", "Panguna Mine Valley Geological Tours", "Pokpok Island Coral Snorkeling", "Mount Balbi Volcanic Crater Lakes"] },
      { name: "South Bougainville", category: "culture", keyDestinations: ["Buin WWII Relics & Yamamoto Crash Memorial", "Torokina Historic Allied Landing Beaches", "Siwai Cultural Weaving & Basketry"] }
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

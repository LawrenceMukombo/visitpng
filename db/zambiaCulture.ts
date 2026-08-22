export interface ZambianCeremony {
  slug: string;
  name: string;
  province: string;
  provinceCode: string;
  tribe: string;
  month: string;
  summary: string;
  significance: string;
  imageUrl: string;
}

export const ZAMBIAN_CEREMONIES: ZambianCeremony[] = [
  {
    slug: "kuomboka-ceremony",
    name: "Kuomboka Ceremony",
    province: "Western Province",
    provinceCode: "ZM-WES",
    tribe: "Lozi / Barotse",
    month: "April",
    summary: "The majestic migration of the Litunga (King of the Lozi) from the flooded plains of Lealui to the higher ground of Limulunga aboard the giant Nalikwanda barge.",
    significance: "One of Africa's most spectacular royal pageants, celebrated with giant drumbeats, black-and-white royal barges, and traditional red berets.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "ncwala-ceremony",
    name: "Nc'wala Ceremony",
    province: "Eastern Province",
    provinceCode: "ZM-EAS",
    tribe: "Ngoni",
    month: "February",
    summary: "Annual thanksgiving first-fruits harvest and warrior festival held at Mtenguleni in Chipata by Paramount Chief Mpezeni.",
    significance: "Warriors in leopard skins perform the vigorous Ingoma warrior dance and reenact historic migrations.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "likumbi-lya-mize",
    name: "Likumbi Lya Mize",
    province: "North-Western Province",
    provinceCode: "ZM-NWE",
    tribe: "Luvale",
    month: "August",
    summary: "A UNESCO-recognised cultural festival in Zambezi District featuring the iconic Makishi masked dancers.",
    significance: "Celebrates the graduation of young initiates with ancient wooden and fibre masks representing ancestral spirits.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "umutomboko-ceremony",
    name: "Umutomboko Ceremony",
    province: "Luapula Province",
    provinceCode: "ZM-LUA",
    tribe: "Lunda",
    month: "July",
    summary: "The celebration of the Lunda conquest and arrival in the Luapula Valley by Paramount Chief Mwata Kazembe in Mwansabombwe.",
    significance: "Features the legendary royal sword dance Mutomboko in elaborate skirts with gun salutes and traditional praise singing.",
    imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80"
  }
];

export interface SafariExperience {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  bestSeason: string;
  summary: string;
  highlights: string[];
}

export const ZAMBIAN_SAFARI_EXPERIENCES: SafariExperience[] = [
  {
    slug: "south-luangwa-walking-safari",
    title: "South Luangwa Pioneer Walking Safari",
    destination: "South Luangwa National Park",
    duration: "4 Days / 3 Nights",
    bestSeason: "June to October",
    summary: "Trek through the Valley of the Leopard on foot with armed wildlife scouts and master trackers.",
    highlights: ["Night game drives for leopards", "Bush camp dinners under the stars", "Bird watching along Luangwa riverbanks"]
  },
  {
    slug: "lower-zambezi-canoe-safari",
    title: "Lower Zambezi River Canoe & Island Camping",
    destination: "Lower Zambezi National Park",
    duration: "3 Days / 2 Nights",
    bestSeason: "May to November",
    summary: "Drift past bathing elephant herds and hippo pods along pristine channels overlooking the Mana Pools escarpment.",
    highlights: ["Drift past elephant families", "Catch & release tiger fishing", "Fly camping on private sand islands"]
  },
  {
    slug: "victoria-falls-devils-pool",
    title: "Victoria Falls Devil's Pool & Rainbow Flight",
    destination: "Livingstone / Mosi-oa-Tunya",
    duration: "1 Day Experience",
    bestSeason: "August to January",
    summary: "Swim at the edge of the world's greatest waterfall on Livingstone Island followed by a helicopter flight of angels.",
    highlights: ["Livingstone Island guided swim", "Scenic helicopter flight", "High tea at The Royal Livingstone"]
  }
];

export interface FestivalEvent {
  id: string;
  name: string;
  subtitle: string;
  month: string;
  dates: string;
  year: number;
  location: string;
  province: string;
  region: string;
  coverImage: string;
  description: string;
  featuredTribes: string[];
  ticketPricePgk: number;
  ticketPriceZmw?: number; // Backward compatibility
  vipPackagePricePgk: number;
  vipPackagePriceZmw?: number; // Backward compatibility
  etiquetteTips: string[];
  scheduleHighlights: { day: string; event: string; time: string }[];
}

export const PNG_FESTIVALS: FestivalEvent[] = [
  {
    id: "goroka-show",
    name: "Goroka Cultural Show",
    subtitle: "Papua New Guinea's oldest and grandest sing-sing gathering over 100 highland and coastal tribes",
    month: "September",
    dates: "September 18 – 20",
    year: 2026,
    location: "National Sports Institute Grounds, Goroka",
    province: "Eastern Highlands Province",
    region: "Highlands",
    coverImage: "/facilities/asaro_mudmen_goroka.jpg",
    description: "First held in 1957, the Goroka Show is an astonishing cultural spectacle where over 1,000 warriors, dancers, and musicians from across 100+ tribes assemble in elaborate bilas (traditional adornment), bird-of-paradise feather headdresses, and shell ornaments to sing, drum, and celebrate national identity during Independence weekend.",
    featuredTribes: ["Asaro Mudmen (Holosa)", "Orokolo Dancers", "Simbu Skeleton Dancers", "Huli Wigmen", "Bena Bena Cane Swallowers"],
    ticketPricePgk: 100,
    ticketPriceZmw: 100,
    vipPackagePricePgk: 350,
    vipPackagePriceZmw: 350,
    etiquetteTips: [
      "Always ask politely before taking close-up portraits of performers during preparation.",
      "Stay outside the active sing-sing dance circles to avoid obstructing ceremonial rhythms.",
      "Wear sturdy walking shoes, a sun hat, and apply high-SPF sunscreen; highland sun is intense.",
      "Support local artisans selling hand-woven Bilum string bags and traditional wood carvings."
    ],
    scheduleHighlights: [
      { day: "Friday Morning", event: "Early Morning Bilas Adornment & Asaro Mudmen Prelude", time: "07:30 AM" },
      { day: "Saturday All-Day", event: "Grand Arena Sing-Sing Procession & 100 Tribe Choreography", time: "09:00 AM – 04:30 PM" },
      { day: "Sunday Afternoon", event: "Traditional Archery, Bamboo Flute Melodies & Closing Ceremony", time: "01:00 PM – 05:00 PM" }
    ]
  },
  {
    id: "mount-hagen-show",
    name: "Mount Hagen Cultural Show",
    subtitle: "Vibrant Melpa warrior pageantry, Kundu drumming, and breathtaking highlands billas",
    month: "August",
    dates: "August 15 – 16",
    year: 2026,
    location: "Kagamuga Showgrounds, Mount Hagen",
    province: "Western Highlands Province",
    region: "Highlands",
    coverImage: "/facilities/ambua_lodge_tari.jpg",
    description: "Staged against the misty backdrop of Mount Hagen in the Wahgi Valley, this world-renowned show brings together rival tribes in an explosion of color, thundering kundu drums, Bird of Paradise plumes, and charcoal-painted Melpa warrior columns.",
    featuredTribes: ["Melpa Warriors of Western Highlands", "Huli Wigmen of Tari", "Jiwaka Feather Dancers", "Enga Sand Art Performers"],
    ticketPricePgk: 120,
    ticketPriceZmw: 120,
    vipPackagePricePgk: 400,
    vipPackagePriceZmw: 400,
    etiquetteTips: [
      "VIP passes provide early access from 07:30 AM to photograph performers applying natural face pigments.",
      "Do not touch delicate Bird of Paradise headdresses or ceremonial cassowary bone daggers.",
      "Keep valuable items secure in zippered bags amidst large spectator crowds."
    ],
    scheduleHighlights: [
      { day: "Saturday Dawn", event: "Photographers' Early Access & Traditional Face Painting", time: "07:30 AM" },
      { day: "Saturday Main Arena", event: "Thunderous Melpa Kundu Drum Entry & Mass Sing-Sing", time: "10:00 AM – 04:00 PM" },
      { day: "Sunday Finale", event: "Tribal Chants, Mumu Earth-Oven Feast & Artisan Awards", time: "09:30 AM – 03:30 PM" }
    ]
  },
  {
    id: "rabaul-mask-festival",
    name: "National Mask & Warwagira Festival",
    subtitle: "Mystical Tolai Duk-Duk and Tubuan mask spirits and exhilarating night-time Baining Fire Dancers",
    month: "July",
    dates: "July 8 – 12",
    year: 2026,
    location: "Kokopo Foreshore & Bainings Mountain Villages",
    province: "East New Britain Province",
    region: "Islands",
    coverImage: "/facilities/rapopo_resort_kokopo.jpg",
    description: "Celebrates the secret society rituals and mask-making traditions of the Gazelle Peninsula. The festival opens with the Kinavai dawn canoe arrival of sacred Duk-Duk and Tubuan spirit masks from Blanche Bay, and culminates in high mountain villages with the hypnotic Baining Fire Dance, where barefoot men leap through blazing bonfire embers.",
    featuredTribes: ["Tolai Duk-Duk Secret Society", "Tolai Tubuan Matriarch Spirits", "Baining Fire Dancers (Kavat & Vungvung Masks)", "Sulka Painted Bark-Cloth Masters"],
    ticketPricePgk: 150,
    ticketPriceZmw: 150,
    vipPackagePricePgk: 450,
    vipPackagePriceZmw: 450,
    etiquetteTips: [
      "Observe deep silence and respect during the dawn Kinavai spirit arrival on the beach.",
      "Do not attempt to touch the sacred Duk-Duk or Tubuan masks; they are living ancestral spirits in Tolai custom.",
      "Bring protective eyewear for ash drift when attending the Baining Fire Dance at night."
    ],
    scheduleHighlights: [
      { day: "Day 1 (05:00 AM)", event: "Kinavai Dawn Flotilla & Arrival of Tubuan Spirit Canoes on Kokopo Beach", time: "05:00 AM" },
      { day: "Day 2 & 3", event: "National Mask Exhibition, Traditional Bamboo Band Melodies & Shell Money Exchanges", time: "09:00 AM – 04:00 PM" },
      { day: "Day 4 Night", event: "Exhilarating Baining Fire Dance in Mountain Jungle Clearing", time: "07:30 PM – 11:00 PM" }
    ]
  },
  {
    id: "kenu-kundu-festival",
    name: "Kenu & Kundu Canoe Festival",
    subtitle: "War canoe racing, conch shell horn calls, and island dances across the azure waters of Milne Bay",
    month: "November",
    dates: "November 6 – 8",
    year: 2026,
    location: "Alotau Waterfront, Discovery Bay",
    province: "Milne Bay Province",
    region: "Southern",
    coverImage: "/facilities/tawali_resort_milne.jpg",
    description: "A maritime extravaganza celebrating ancient seafaring skills and Kula ring trade voyages. Spectacularly carved 40-man war canoes (Kenu) with towering prow splashboard carvings race across Alotau bay propelled by warriors chanting to synchronized Kundu drum beats.",
    featuredTribes: ["Suau Island Seafarers", "Trobriand Islands Yam Masters", "Misima Island Paddlers", "Dobu Island Dancers"],
    ticketPricePgk: 80,
    ticketPriceZmw: 80,
    vipPackagePricePgk: 280,
    vipPackagePriceZmw: 280,
    etiquetteTips: [
      "Cheer enthusiastically from shorelines during the competitive war canoe heats.",
      "Sample local Milne Bay delicacies like fresh sago, coconut mud crab, and roasted reef fish.",
      "Respect Kula ring exchange ceremonies and traditional shell valuables."
    ],
    scheduleHighlights: [
      { day: "Friday Morning", event: "Arrival of Ocean-Going War Canoes & Conch Shell Trumpet Fanfare", time: "08:30 AM" },
      { day: "Saturday", event: "Milne Bay War Canoe Racing Heats & Traditional Sailing Regatta", time: "10:00 AM – 03:30 PM" },
      { day: "Sunday Evening", event: "Trobriand Island Dances, Kundu Drum Symphonies & Trophy Presentation", time: "02:00 PM – 06:00 PM" }
    ]
  },
  {
    id: "sepik-crocodile-festival",
    name: "Sepik River Crocodile Festival",
    subtitle: "Sacred crocodile worship, spirit house (Haus Tambaran) ceremonies, and dugout canoe pageantry",
    month: "August",
    dates: "August 5 – 7",
    year: 2026,
    location: "Ambunti River Station, Middle Sepik",
    province: "East Sepik Province",
    region: "Momase",
    coverImage: "/facilities/sepik_haus_tambaran.jpg",
    description: "Celebrates the mystical bond between the Sepik people and the saltwater & freshwater crocodiles that rule their river ecosystem. Features canoe races, sacred Haus Tambaran flutes, intricate crocodile scarification presentations, and master woodcarver markets.",
    featuredTribes: ["Iatmul Crocodile Clan of Middle Sepik", "Ambunti River Dancers", "Kanganaman Spirit Guardians", "Blackwater Lagoon Tribes"],
    ticketPricePgk: 120,
    ticketPriceZmw: 120,
    vipPackagePricePgk: 380,
    vipPackagePriceZmw: 380,
    etiquetteTips: [
      "Never enter a Haus Tambaran (Spirit House) uninvited or without permission from village elders.",
      "Women should check with local guides regarding male-initiation spirit house zones.",
      "Purchase authentic Sepik masks and ancestral figures directly from master carvers."
    ],
    scheduleHighlights: [
      { day: "Day 1", event: "Grand Flotilla of Carved Crocodile Prow Canoes on the Sepik River", time: "09:00 AM" },
      { day: "Day 2", event: "Sacred Crocodile Clan Dances, Scarification Exhibits & Kundu Chants", time: "10:00 AM – 04:00 PM" },
      { day: "Day 3", event: "Sepik Master Woodcarving Exhibition & Riverbank Farewell Feast", time: "09:30 AM – 03:00 PM" }
    ]
  },
  {
    id: "enga-cultural-show",
    name: "Enga Cultural Show",
    subtitle: "Ancient sacred Sili Muli female dances, unique sand paintings, and highland oral epics",
    month: "August",
    dates: "August 7 – 9",
    year: 2026,
    location: "Wabag Primary School Showgrounds, Wabag",
    province: "Enga Province",
    region: "Highlands",
    coverImage: "/facilities/ambua_lodge_tari.jpg",
    description: "Enga Province is famous for preserving unique cultural practices not found anywhere else in PNG: the breathtaking Sili Muli dance performed by women wearing giant towering black-feather headdresses, intricate indigenous sand painting, and sacred ritual storytelling.",
    featuredTribes: ["Sili Muli Dancers of Enga", "Lagaip Valley Warriors", "Porgera Mountain Clans", "Wabag Traditional Guild"],
    ticketPricePgk: 90,
    ticketPriceZmw: 90,
    vipPackagePricePgk: 300,
    vipPackagePriceZmw: 300,
    etiquetteTips: [
      "Enga people are deeply proud of their cultural authenticity; appreciate performances respectfully.",
      "Witness the master sand painters create geometric ancestral art using crushed natural minerals."
    ],
    scheduleHighlights: [
      { day: "Friday", event: "Live Indigenous Sand Painting Demonstrations & Traditional Flute Melodies", time: "10:00 AM" },
      { day: "Saturday", event: "Grand Sili Muli Synchronized Dance & Warrior Column Parade", time: "09:30 AM – 04:00 PM" },
      { day: "Sunday", event: "Tee Ceremonial Gift Exchange Reenactment & Cultural Awards", time: "10:00 AM – 03:00 PM" }
    ]
  },
  {
    id: "hiri-moale-festival",
    name: "Hiri Moale Festival",
    subtitle: "Celebration of Motuan maritime trading voyages across the Gulf of Papua and the Hiri Hanenamo queen pageant",
    month: "September",
    dates: "September 15 – 16",
    year: 2026,
    location: "Ela Beach Waterfront & Sir Hubert Murray Stadium, Port Moresby",
    province: "National Capital District",
    region: "Southern",
    coverImage: "/facilities/airways_hotel_pom.jpg",
    description: "Commemorates the historic trading voyages undertaken by the Motu people of Central & NCD in massive multi-hulled lakatoi sailing canoes, trading clay pots for sago in the Gulf of Papua. Features lakatoi canoe arrivals at Ela Beach and the prestigious Hiri Hanenamo cultural pageant.",
    featuredTribes: ["Motu-Koitabu People of Hanuabada & Tubusereia", "Hiri Coastal Dancers", "Gulf Province Sago Traders"],
    ticketPricePgk: 60,
    ticketPriceZmw: 60,
    vipPackagePricePgk: 200,
    vipPackagePriceZmw: 200,
    etiquetteTips: [
      "Ela Beach viewing is free and open to the public; VIP seating is available for the cultural stage.",
      "Watch for the arrival of the grand Lakatoi canoe sailing through Walter Bay onto Ela Beach."
    ],
    scheduleHighlights: [
      { day: "Saturday Morning", event: "Spectacular Arrival of the Lakatoi Canoe at Ela Beach", time: "09:00 AM" },
      { day: "Saturday Evening", event: "Hiri Hanenamo Cultural Pageant & Traditional Bilas Judging", time: "06:30 PM" },
      { day: "Sunday", event: "Motu Cultural Dances, Craft Stalls & Canoe Paddling Competitions", time: "10:00 AM – 04:30 PM" }
    ]
  }
];

export const ALL_FESTIVALS: FestivalEvent[] = PNG_FESTIVALS;

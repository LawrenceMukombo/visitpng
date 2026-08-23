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
  ticketPriceZmw: number;
  ticketPricePgk?: number; // Backward compatibility
  vipPackagePriceZmw: number;
  vipPackagePricePgk?: number; // Backward compatibility
  etiquetteTips: string[];
  scheduleHighlights: { day: string; event: string; time: string }[];
}

export const ZAMBIA_FESTIVALS: FestivalEvent[] = [
  {
    id: "kuomboka-ceremony",
    name: "Kuomboka Royal Ceremony",
    subtitle: "The majestic migration of the Litunga (King of the Lozi) across the flooded Zambezi plains",
    month: "April",
    dates: "April 11 – 13",
    year: 2026,
    location: "Lealui to Limulunga, Mongu District",
    province: "Western Province",
    region: "Western",
    coverImage: "/ceremonies/kuomboka_nalikwanda_barge.jpg",
    description: "One of Africa's most ancient and magnificent royal pageants. When the Zambezi floodwaters rise, the Litunga boards the Nalikwanda, an enormous black-and-white striped barge rowed by 100 men in traditional red berets, accompanied by roaring royal Maoma war drums.",
    featuredTribes: ["Lozi / Barotse Nation", "Royal Nalikwanda Paddlers", "Mongu Traditional Troupe"],
    ticketPriceZmw: 450,
    ticketPricePgk: 450,
    vipPackagePriceZmw: 1200,
    vipPackagePricePgk: 1200,
    etiquetteTips: [
      "Wear the traditional Siziba (men) or Musisi (women) attire or respectful conservative clothing.",
      "Never turn your back on the Litunga when the royal barge approaches the high palace.",
      "Book flights to Mongu and river cruiser viewing boats months in advance."
    ],
    scheduleHighlights: [
      { day: "Day 1", event: "Royal Maoma Drums Awakened at Lealui Palace", time: "10:00 PM" },
      { day: "Day 2", event: "Nalikwanda Royal Barge Flotilla Departs across Floodplain", time: "08:00 AM" },
      { day: "Day 3", event: "Triumphant Arrival at Limulunga High Capital & Royal Dances", time: "03:00 PM" }
    ]
  },
  {
    id: "ncwala-ceremony",
    name: "Nc'wala Harvest Ceremony",
    subtitle: "Thanksgiving first-fruits harvest and warrior dances of the Ngoni nation",
    month: "February",
    dates: "February 27 – 28",
    year: 2026,
    location: "Mtenguleni Arena, Chipata",
    province: "Eastern Province",
    region: "Eastern",
    coverImage: "/ceremonies/ncwala_ngoni_warriors.jpg",
    description: "Led by Paramount Chief Mpezeni, Ngoni warriors dressed in leopard skins and wielding shields and spears gather at Mtenguleni to celebrate the first harvest with the thunderous Ingoma warrior dance.",
    featuredTribes: ["Ngoni Impis", "Eastern Province Cultural Guild", "Luangwa Traditional Choirs"],
    ticketPriceZmw: 350,
    ticketPricePgk: 350,
    vipPackagePriceZmw: 850,
    vipPackagePricePgk: 850,
    etiquetteTips: [
      "Follow designated spectator boundaries during warrior spear demonstrations.",
      "Support local artisans selling handmade beaded headbands and animal skin crafts."
    ],
    scheduleHighlights: [
      { day: "Saturday Morning", event: "Ngoni Warrior Procession & Chief Mpezeni Royal Inspection", time: "09:30 AM" },
      { day: "Saturday Afternoon", event: "Tasting of the First Harvest Sugarcane & Bull Sacrifice Rites", time: "01:30 PM" },
      { day: "Saturday Evening", event: "Mass Ingoma Dance & Cultural Chants", time: "04:00 PM" }
    ]
  },
  {
    id: "likumbi-lya-mize",
    name: "Likumbi Lya Mize Masked Festival",
    subtitle: "UNESCO-inscribed ancient Luvale Makishi masquerade dancers and cultural rites",
    month: "August",
    dates: "August 20 – 23",
    year: 2026,
    location: "Mize Capital, Zambezi District",
    province: "North-Western Province",
    region: "North-Western",
    coverImage: "/ceremonies/likumbi_lya_mize_makishi.jpg",
    description: "A world-renowned UNESCO cultural masterpiece. Features over 40 distinct Makishi masked spirit dancers representing ancestral protectors, performing acrobatics and pole-climbing dances along the banks of the Zambezi River.",
    featuredTribes: ["Luvale Mask Masters", "Makishi Spirit Dancers", "North-Western Drum Troupe"],
    ticketPriceZmw: 300,
    ticketPricePgk: 300,
    vipPackagePriceZmw: 750,
    vipPackagePricePgk: 750,
    etiquetteTips: [
      "Respect sacred Makishi mask traditions; do not touch ceremonial costumes.",
      "Photography is welcomed at open public arenas."
    ],
    scheduleHighlights: [
      { day: "Thursday", event: "Makishi Spirits Resurrect from the Zambezi River Banks", time: "02:00 PM" },
      { day: "Friday", event: "Acrobatic Pole Climbing & Sacred Initiation Dances", time: "10:00 AM – 04:00 PM" },
      { day: "Saturday", event: "Grand Royal Arena Showcase before Senior Chief Ndungu", time: "09:00 AM – 05:00 PM" }
    ]
  },
  {
    id: "umutomboko-ceremony",
    name: "Umutomboko Royal Ceremony",
    subtitle: "The triumphant royal victory dance of Mwata Kazembe and the Lunda Kingdom",
    month: "July",
    dates: "July 24 – 26",
    year: 2026,
    location: "Mwansabombwe Royal Capital, Kawambwa District",
    province: "Luapula Province",
    region: "Luapula",
    coverImage: "/ceremonies/umutomboko_mwata_kazembe.jpg",
    description: "Commemorating the great Lunda migration and conquest from the Mwata Yamvo Empire. The climax features the reigning Mwata Kazembe dressed in flowing Mukonzo robes wielding the sacred royal sword (Mpoko) in the thunderous Mutomboko victory dance.",
    featuredTribes: ["Lunda Kingdom", "Mwansabombwe Royal Drummers", "Luapula Cultural Guild"],
    ticketPriceZmw: 320,
    ticketPricePgk: 320,
    vipPackagePriceZmw: 800,
    vipPackagePricePgk: 800,
    etiquetteTips: [
      "Visitors must stand and remove hats when the Mwata Kazembe enters the main royal arena.",
      "Traditional clapping protocols must be observed when addressing palace elders."
    ],
    scheduleHighlights: [
      { day: "Friday", event: "Palace Homage & Sacred Chishingiliko Purification at Ng'ona River", time: "10:00 AM" },
      { day: "Saturday Morning", event: "Musumba Royal Palace Procession & Cannon Salute", time: "09:00 AM" },
      { day: "Saturday Afternoon", event: "The Grand Mutomboko Sword Dance by Mwata Kazembe", time: "02:30 PM" }
    ]
  },
  {
    id: "shimunenga-ceremony",
    name: "Shimunenga Cattle Ceremony",
    subtitle: "Spectacular traditional cattle drive across the Kafue Flats by the Ba-Ila warriors",
    month: "September",
    dates: "September 12 – 14",
    year: 2026,
    location: "Maala, Namwala District",
    province: "Southern Province",
    region: "Southern",
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82",
    description: "Celebrated by the Ba-Ila people on the Kafue Flats. Thousands of cattle are driven through flooded channels while spear-wielding warriors chant heroic poems honoring their ancestors.",
    featuredTribes: ["Ba-Ila Cattlemen", "Namwala Cultural Troupe", "Kafue River Choirs"],
    ticketPriceZmw: 280,
    ticketPricePgk: 280,
    vipPackagePriceZmw: 650,
    vipPackagePricePgk: 650,
    etiquetteTips: [
      "Keep clear of cattle crossing paths during the river drive.",
      "Photography is welcome during the grand warrior assembly."
    ],
    scheduleHighlights: [
      { day: "Day 1", event: "Shrine Prayers & Ancient Chants at Maala Sacred Grove", time: "09:00 AM" },
      { day: "Day 2", event: "Spectacular Cattle Drive & River Crossing Showcase", time: "08:30 AM – 02:00 PM" },
      { day: "Day 3", event: "Warrior Dances & Traditional Poetry Recitation", time: "10:00 AM – 03:30 PM" }
    ]
  },
  {
    id: "ukusefya-pa-ngwena-ceremony",
    name: "Ukusefya Pa Ng'wena Ceremony",
    subtitle: "Sacred Bemba royal celebration of victory and migration from Kola",
    month: "August",
    dates: "August 28 – 30",
    year: 2026,
    location: "Ng'wena Arena, Kasama District",
    province: "Northern Province",
    region: "Northern",
    coverImage: "/ceremonies/ukusefya_pa_ngwena_chitimukulu.jpg",
    description: "Spectacular royal gathering of the Bemba nation led by Paramount Chief Chitimukulu. Features reenactment of the crocodile totem discovery and royal court ceremonies.",
    featuredTribes: ["Bemba Royal Impis", "Kasama Cultural Dancers", "Northern Choirs"],
    ticketPriceZmw: 300,
    ticketPricePgk: 300,
    vipPackagePriceZmw: 700,
    vipPackagePricePgk: 700,
    etiquetteTips: [
      "Pay respect to Chitimukulu's royal court protocol.",
      "Sample traditional Bemba finger millet brew and dishes."
    ],
    scheduleHighlights: [
      { day: "Friday", event: "Royal Fire Lighting & Kola Migration Chants", time: "06:00 PM" },
      { day: "Saturday", event: "Grand Crocodile Litter Procession & Royal Dances", time: "10:00 AM – 04:30 PM" }
    ]
  },
  {
    id: "kulamba-ceremony",
    name: "Kulamba Traditional Ceremony",
    subtitle: "Tri-national gathering of Chewa chiefs honoring King Kalonga Gawa Undi",
    month: "August",
    dates: "August 29 – 31",
    year: 2026,
    location: "Mkaika Royal Capital, Katete",
    province: "Eastern Province",
    region: "Eastern",
    coverImage: "/ceremonies/kulamba_gawa_undi.jpg",
    description: "Over 130 Chewa subordinate chiefs from Zambia, Malawi, and Mozambique assemble at Mkaika to pay tribute to King Gawa Undi with sacred Gule Wamkulu masked spirit dances.",
    featuredTribes: ["Chewa Kingdom", "Gule Wamkulu Masked Dancers", "Katete Troupe"],
    ticketPriceZmw: 350,
    ticketPricePgk: 350,
    vipPackagePriceZmw: 850,
    vipPackagePricePgk: 850,
    etiquetteTips: [
      "Respect sacred Gule Wamkulu masked performers; do not obstruct dance circles."
    ],
    scheduleHighlights: [
      { day: "Saturday", event: "Arrival of International Chewa Delegations", time: "09:00 AM" },
      { day: "Sunday", event: "Grand Gule Wamkulu Masquerade & King's Address", time: "10:00 AM – 05:00 PM" }
    ]
  },
  {
    id: "lunda-lubanza-ceremony",
    name: "Lunda Lubanza Traditional Ceremony",
    subtitle: "Sacred annual royal gathering and heritage celebration of the Lunda people under Senior Chief Ishindi",
    month: "August",
    dates: "August 14 – 16",
    year: 2026,
    location: "Mukandakunda Royal Capital, Zambezi District",
    province: "North-Western Province",
    region: "North-Western",
    coverImage: "/ceremonies/lunda_lubanza_senior_chief_ishindi.jpg",
    description: "Celebrated annually by the Lunda people of Northwestern Zambia at Mukandakunda. Led by His Royal Highness Senior Chief Ishindi, the ceremony features vibrant royal processions, traditional Lunda drumming, cultural exhibits, and homage to ancestral heritage.",
    featuredTribes: ["Lunda of Senior Chief Ishindi", "Mukandakunda Royal Drummers", "North-Western Cultural Troupe"],
    ticketPriceZmw: 300,
    ticketPricePgk: 300,
    vipPackagePriceZmw: 750,
    vipPackagePricePgk: 750,
    etiquetteTips: [
      "Observe royal court etiquette and traditional salutations before Senior Chief Ishindi.",
      "Support local North-Western artisans selling traditional baskets and copper crafts."
    ],
    scheduleHighlights: [
      { day: "Day 1", event: "Palace Purification & Royal Fire Kindling at Mukandakunda", time: "06:00 PM" },
      { day: "Day 2", event: "Grand Procession of Senior Chief Ishindi & Royal Lunda War Dances", time: "09:30 AM – 04:00 PM" },
      { day: "Day 3", event: "Tribute by Subordinate Chiefs & Cultural Performances", time: "10:00 AM – 03:00 PM" }
    ]
  }
];

export const PNG_FESTIVALS: FestivalEvent[] = ZAMBIA_FESTIVALS;
export const ALL_FESTIVALS: FestivalEvent[] = ZAMBIA_FESTIVALS;

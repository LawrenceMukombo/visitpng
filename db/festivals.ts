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
  vipPackagePricePgk: number;
  etiquetteTips: string[];
  scheduleHighlights: { day: string; event: string; time: string }[];
}

export const PNG_FESTIVALS: FestivalEvent[] = [
  {
    id: "goroka-show",
    name: "Goroka Cultural Show",
    subtitle: "The world's largest gathering of indigenous tribes and singsing performers",
    month: "September",
    dates: "September 18 – 20",
    year: 2026,
    location: "National Sports Institute Grounds, Goroka",
    province: "Eastern Highlands",
    region: "Highlands",
    coverImage: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1100&q=82",
    description: "First held in 1957, the Goroka Show is Papua New Guinea's oldest and most spectacular cultural celebration. More than 100 tribes from across the Highlands and coastal regions gather in elaborate feathered headdresses (Bird of Paradise plumes), bilas face paint, and traditional grass skirts for three days of thunderous drumming and dancing.",
    featuredTribes: ["Asaro Mudmen (Holosa)", "Simbu Skeleton Dancers", "Huli Wigmen", "Goroka Highland Choirs"],
    ticketPricePgk: 150,
    vipPackagePricePgk: 450,
    etiquetteTips: [
      "Ask permission before taking close-up portraits of dancers during preparation.",
      "Never step inside the center of an active singsing performance circle.",
      "Stay hydrated and wear sunscreen; high-altitude equatorial sun is strong.",
      "Purchase authentic Bilum bags and beadwork directly from local artisan stalls."
    ],
    scheduleHighlights: [
      { day: "Friday", event: "Tribal Arrival & Bilas Face Painting Preparation", time: "08:30 AM" },
      { day: "Saturday", event: "Grand Arena Singsing Parade & Choral Chants", time: "09:00 AM – 04:30 PM" },
      { day: "Sunday", event: "Closing Ceremony, Archery Contest & Cultural Awards", time: "10:00 AM – 03:00 PM" }
    ]
  },
  {
    id: "mount-hagen-show",
    name: "Mount Hagen Cultural Show",
    subtitle: "Highlands tribal pride, feathered warriors, and thunderous kundu drums",
    month: "August",
    dates: "August 15 – 16",
    year: 2026,
    location: "Kagamuga Show Grounds, Mount Hagen",
    province: "Western Highlands",
    region: "Highlands",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82",
    description: "The Mount Hagen Cultural Show brings together the vibrant cultures of the Western Highlands, Enga, Hela, and Southern Highlands. Witness thousands of Melpa warriors wielding traditional wooden spears, accompanied by Huli Wigmen sporting elaborate hand-crafted human hair wigs and yellow ambua clay.",
    featuredTribes: ["Melpa Warriors", "Huli Wigmen (Tari)", "Wahgi Valley Dancers", "Enga Sili Muli"],
    ticketPricePgk: 180,
    vipPackagePricePgk: 500,
    etiquetteTips: [
      "Do not touch the sacred Bird of Paradise headdresses or ceremonial weapons.",
      "Official VIP photographer passes allow access into the inner arena ring.",
      "Carry cash (PGK) for local community food stalls and wood carvings."
    ],
    scheduleHighlights: [
      { day: "Saturday", event: "Morning Warrior Assembly & Opening Kundu Drums", time: "08:00 AM" },
      { day: "Saturday", event: "Main Singsing Arena Presentations", time: "10:30 AM – 04:00 PM" },
      { day: "Sunday", event: "Traditional Highlands Mock Battles & Prize Giving", time: "09:30 AM – 03:30 PM" }
    ]
  },
  {
    id: "rabaul-mask-festival",
    name: "National Mask & Warwagira Festival",
    subtitle: "Hypnotic Baining Fire Dancers and sacred Tolai Duk-Duk spirit masks",
    month: "July",
    dates: "July 10 – 14",
    year: 2026,
    location: "Kokopo Foreshore & Baining Mountain Villages",
    province: "East New Britain",
    region: "Islands",
    coverImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1100&q=82",
    description: "Celebrated on the shores of East New Britain, this festival honors the ancestral mask culture of Papua New Guinea. At dusk, the Baining Fire Dancers emerge to dance barefoot through blazing bonfires, kicking glowing coals into the night sky to rhythmic bamboo drumming.",
    featuredTribes: ["Baining Fire Dancers", "Tolai Duk-Duk & Tubuan Society", "New Ireland Malagan Dancers"],
    ticketPricePgk: 120,
    vipPackagePricePgk: 380,
    etiquetteTips: [
      "Tolai Tubuan masks represent sacred ancestor spirits; do not touch or enter restricted spirit enclosures.",
      "Night fire dances involve sparks and embers; maintain a safe viewing distance."
    ],
    scheduleHighlights: [
      { day: "Thursday", event: "Kinavai Dawn Flotilla of Duk-Duk Spirit Canoes", time: "05:30 AM" },
      { day: "Friday", event: "Daytime Mask Exhibition & Traditional Song Contests", time: "10:00 AM – 04:00 PM" },
      { day: "Saturday", event: "Night Baining Fire Dance Ritual", time: "07:00 PM – 10:30 PM" }
    ]
  },
  {
    id: "alotau-canoe-festival",
    name: "National Canoe & Kundu Festival",
    subtitle: "Traditional ocean-going war canoes and rhythmic island kundu drumming",
    month: "November",
    dates: "November 6 – 8",
    year: 2026,
    location: "Alotau Waterfront, Milne Bay",
    province: "Milne Bay Province",
    region: "Southern",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82",
    description: "The National Canoe and Kundu Festival celebrates the rich seafaring traditions of Milne Bay and the Kula Ring trade. Watch dozens of hand-carved war canoes (Gaba-gaba) manned by synchronized warriors race across the bay to the beat of echoing kundu drums.",
    featuredTribes: ["Milne Bay War Canoeists", "Trobriand Yam Dancers", "Samarai Island Singsing Groups"],
    ticketPricePgk: 100,
    vipPackagePricePgk: 320,
    etiquetteTips: [
      "Cheer on the canoe racing teams from the designated beach viewing zones.",
      "Respect local marine conservation rules in the bay."
    ],
    scheduleHighlights: [
      { day: "Friday", event: "War Canoe Grand Arrival & Flotilla Welcome", time: "09:00 AM" },
      { day: "Saturday", event: "Open Water Canoe Races & Kundu Drumming Heats", time: "08:30 AM – 05:00 PM" },
      { day: "Sunday", event: "Championship Finals & Island Feast Presentation", time: "10:00 AM – 04:00 PM" }
    ]
  },
  {
    id: "ambunti-crocodile-festival",
    name: "Ambunti Crocodile Festival",
    subtitle: "Honoring the sacred bond between the Sepik people and the river crocodile",
    month: "August",
    dates: "August 5 – 7",
    year: 2026,
    location: "Ambunti Station, Middle Sepik River",
    province: "East Sepik",
    region: "Momase",
    coverImage: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1100&q=82",
    description: "Along the winding Sepik River, the crocodile is revered as a symbol of spiritual power and manhood. The festival showcases traditional crocodile scarification ceremonies, sacred canoe parades, spirit house chants, and master woodcarving demonstrations.",
    featuredTribes: ["Middle Sepik River Dancers", "Iatmul Crocodile Initiates", "Chambri Lake Potters"],
    ticketPricePgk: 140,
    vipPackagePricePgk: 400,
    etiquetteTips: [
      "Certain parts of the Haus Tambaran (Spirit House) are reserved for initiated men.",
      "Always travel with a verified local Sepik guide on river motorized canoes."
    ],
    scheduleHighlights: [
      { day: "Wednesday", event: "Crocodile Spirit Canoe Procession on Sepik River", time: "09:00 AM" },
      { day: "Thursday", event: "Haus Tambaran Chants & Master Carving Contest", time: "10:00 AM – 04:00 PM" },
      { day: "Friday", event: "Traditional Storytelling & Cultural Feast", time: "10:00 AM – 03:00 PM" }
    ]
  },
  {
    id: "kutubu-kundu-festival",
    name: "Kutubu Kundu & Digaso Festival",
    subtitle: "Eco-cultural celebration on the shores of Lake Kutubu preserving sacred tree oil",
    month: "October",
    dates: "October 22 – 24",
    year: 2026,
    location: "Lake Kutubu, Southern Highlands",
    province: "Southern Highlands",
    region: "Highlands",
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82",
    description: "Set against pristine Lake Kutubu, this festival celebrates the extraction of valuable Digaso tree oil used in traditional body decoration and singsings. It combines environmental conservation awareness with traditional Highlands drumming.",
    featuredTribes: ["Foi & Fasu Clans", "Lake Kutubu Canoeists", "Southern Highlands Choirs"],
    ticketPricePgk: 90,
    vipPackagePricePgk: 280,
    etiquetteTips: [
      "Lake Kutubu is a Ramsar wetland site; leave no plastic or waste behind.",
      "Support local women's cooperatives selling handmade woven sago bags."
    ],
    scheduleHighlights: [
      { day: "Thursday", event: "Traditional Digaso Tree Oil Extraction Demonstration", time: "10:00 AM" },
      { day: "Friday", event: "Lake Canoe Singsing & Kundu Contests", time: "09:00 AM – 04:00 PM" },
      { day: "Saturday", event: "Forest Conservation Forum & Closing Celebration", time: "09:30 AM – 02:30 PM" }
    ]
  }
];

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
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82",
    description: "One of Africa's most ancient and magnificent royal pageants. When the Zambezi floodwaters rise, the Litunga boards the Nalikwanda, an enormous black-and-white striped barge rowed by 100 men in traditional red berets, accompanied by roaring royal Maoma war drums.",
    featuredTribes: ["Lozi / Barotse Nation", "Royal Nalikwanda Paddlers", "Mongu Traditional Troupe"],
    ticketPricePgk: 350,
    vipPackagePricePgk: 950,
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
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1100&q=82",
    description: "Led by Paramount Chief Mpezeni, Ngoni warriors dressed in leopard skins and wielding shields and spears gather at Mtenguleni to celebrate the first harvest with the thunderous Ingoma warrior dance.",
    featuredTribes: ["Ngoni Impis", "Eastern Province Cultural Guild", "Luangwa Traditional Choirs"],
    ticketPricePgk: 250,
    vipPackagePricePgk: 650,
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
    coverImage: "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1100&q=82",
    description: "A world-renowned UNESCO cultural masterpiece. Features over 40 distinct Makishi masked spirit dancers representing ancestral protectors, performing acrobatics and pole-climbing dances along the banks of the Zambezi River.",
    featuredTribes: ["Luvale Mask Masters", "Makishi Spirit Dancers", "North-Western Drum Troupe"],
    ticketPricePgk: 200,
    vipPackagePricePgk: 550,
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
    coverImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1100&q=82",
    description: "Commemorating the great Lunda migration and conquest from the Mwata Yamvo Empire. The climax features the reigning Mwata Kazembe dressed in flowing Mukonzo robes wielding the sacred royal sword (Mpoko) in the thunderous Mutomboko victory dance.",
    featuredTribes: ["Lunda Kingdom", "Mwansabombwe Royal Drummers", "Luapula Cultural Guild"],
    ticketPricePgk: 220,
    vipPackagePricePgk: 600,
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
    ticketPricePgk: 180,
    vipPackagePricePgk: 500,
    etiquetteTips: [
      "Keep clear of cattle crossing paths during the river drive.",
      "Photography is welcome during the grand warrior assembly."
    ],
    scheduleHighlights: [
      { day: "Day 1", event: "Shrine Prayers & Ancient Chants at Maala Sacred Grove", time: "09:00 AM" },
      { day: "Day 2", event: "Spectacular Cattle Drive & River Crossing Showcase", time: "08:30 AM – 02:00 PM" },
      { day: "Day 3", event: "Warrior Dances & Traditional Poetry Recitation", time: "10:00 AM – 03:30 PM" }
    ]
  }
];


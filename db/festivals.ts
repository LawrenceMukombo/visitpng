export interface FestivalEvent {
  id: string;
  name: string;
  subtitle: string;
  month: string;
  dates: string;
  year: number;
  location: string;
  province: string;
  region: "Highlands" | "Islands" | "Momase" | "Southern";
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

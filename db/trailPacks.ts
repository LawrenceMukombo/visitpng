export interface TrailWaypoint {
  name: string;
  elevationMeters: number;
  distanceKm: number;
  latitude: number;
  longitude: number;
  description: string;
  isCampsite?: boolean;
  waterAvailable?: boolean;
}

export interface TrailPack {
  id: string;
  name: string;
  subtitle: string;
  region: string;
  province: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Extreme Expedition";
  totalDistanceKm: number;
  durationDays: string;
  highestPointMeters: number;
  lowestPointMeters: number;
  elevationGainMeters: number;
  coverImage: string;
  overview: string;
  requiredPermits: string;
  emergencyFrequencies: string;
  waypoints: TrailWaypoint[];
  packingList: string[];
}

export const PNG_TRAIL_PACKS: TrailPack[] = [
  {
    id: "kokoda-track",
    name: "Kokoda Track Expedition",
    subtitle: "Historic 96km Owen Stanley Range crossing between Central & Oro provinces",
    region: "Southern",
    province: "Central & Oro (Northern)",
    difficulty: "Extreme Expedition",
    totalDistanceKm: 96,
    durationDays: "8 - 10 Days",
    highestPointMeters: 2190,
    lowestPointMeters: 380,
    elevationGainMeters: 6500,
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1100&q=82",
    overview: "The Kokoda Track is Papua New Guinea's premier historic pilgrimage, traversing rugged jungle terrain, moss forests, and creek crossings across the Owen Stanley mountain range where Australian soldiers and local Papuan 'Fuzzy Wuzzy Angels' fought WWII defensive battles.",
    requiredPermits: "Kokoda Track Authority (KTA) Trekking Permit & Landowner Access Pass",
    emergencyFrequencies: "VHF Ch 16 / HF 8161 kHz (Kokoda Ranger Radio Net) · Sat Phone: +675 323 1244",
    waypoints: [
      { name: "Owers' Corner (Start / Finish)", elevationMeters: 550, distanceKm: 0, latitude: -9.2618, longitude: 147.4729, description: "Southern gateway memorial arches and historic 25-pounder artillery gun." },
      { name: "Goldie River Crossing", elevationMeters: 380, distanceKm: 4, latitude: -9.2550, longitude: 147.4810, description: "River crossing and initial acclimatization point.", waterAvailable: true },
      { name: "Ua-Ule Creek Campsite", elevationMeters: 620, distanceKm: 14, latitude: -9.2310, longitude: 147.5100, description: "Popular Day 1 wilderness campsite alongside rushing creek.", isCampsite: true, waterAvailable: true },
      { name: "Ioribaiwa Ridge", elevationMeters: 890, distanceKm: 24, latitude: -9.2050, longitude: 147.5400, description: "Furthest south point of the Japanese advance in September 1942." },
      { name: "Menari Village", elevationMeters: 680, distanceKm: 41, latitude: -9.1620, longitude: 147.5950, description: "Traditional mountain village with airstrip and welcoming homestay grounds.", isCampsite: true, waterAvailable: true },
      { name: "Brigade Hill (Mission Ridge)", elevationMeters: 1450, distanceKm: 49, latitude: -9.1380, longitude: 147.6200, description: "Sacred memorial site commemorating the Battle of Brigade Hill." },
      { name: "Efogi Village", elevationMeters: 1100, distanceKm: 56, latitude: -9.1210, longitude: 147.6520, description: "Major Koiari village center with creek crossings and food gardens.", isCampsite: true, waterAvailable: true },
      { name: "Mount Bellamy (Highest Point)", elevationMeters: 2190, distanceKm: 65, latitude: -9.0850, longitude: 147.6890, description: "High cloud moss forest pass and pinnacle of the Kokoda Range." },
      { name: "Templeton's Crossing", elevationMeters: 1850, distanceKm: 72, latitude: -9.0480, longitude: 147.7120, description: "Historic campsite named in honour of Captain Sam Templeton.", isCampsite: true, waterAvailable: true },
      { name: "Alola Village", elevationMeters: 1390, distanceKm: 84, latitude: -8.9650, longitude: 147.7410, description: "Scenic cliffside village looking down into the Eora Creek valley.", isCampsite: true, waterAvailable: true },
      { name: "Kokoda Station (Gateway)", elevationMeters: 400, distanceKm: 96, latitude: -8.8783, longitude: 147.7372, description: "Northern end of the track featuring memorial museum, plateau airstrip, and hospital.", isCampsite: true, waterAvailable: true }
    ],
    packingList: ["Trekking boots (broken in)", "Electrolyte tablets", "Water purification filter", "Tropical mosquito net", "Lightweight poncho & dry bags", "Personal medical kit & malaria medication"]
  },
  {
    id: "mount-wilhelm",
    name: "Mount Wilhelm Summit Trek",
    subtitle: "Climb Papua New Guinea's highest peak (4,509m / 14,793ft) in the Simbu Bismarck Range",
    region: "Highlands",
    province: "Simbu (Chimbu)",
    difficulty: "Challenging",
    totalDistanceKm: 22,
    durationDays: "3 - 4 Days",
    highestPointMeters: 4509,
    lowestPointMeters: 2800,
    elevationGainMeters: 1710,
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=82",
    overview: "Mount Wilhelm is an alpine glaciated summit standing above the equatorial cloud lines. The route starts from Betty's Lodge in Keglsugl and climbs past glacial lakes Piunde and Aunde up to the iconic summit marker.",
    requiredPermits: "Keglsugl Community Guide & Conservation Fee",
    emergencyFrequencies: "Kundiawa Base Station VHF 148.55 MHz",
    waypoints: [
      { name: "Keglsugl (Betty's Lodge & Trout Farm)", elevationMeters: 2800, distanceKm: 0, latitude: -5.8320, longitude: 145.0970, description: "Highland village base with comfortable lodge accommodation.", isCampsite: true, waterAvailable: true },
      { name: "Lake Piunde & Base Camp Hut", elevationMeters: 3500, distanceKm: 5.5, latitude: -5.7950, longitude: 145.0530, description: "Stunning lower glacial lake with alpine wooden huts.", isCampsite: true, waterAvailable: true },
      { name: "Lake Aunde Lookout", elevationMeters: 3650, distanceKm: 7.0, latitude: -5.7860, longitude: 145.0480, description: "Upper glacial tarn encircled by cycads and giant groundsel plants.", waterAvailable: true },
      { name: "WWII B-24 Bomber Crash Site", elevationMeters: 4000, distanceKm: 9.2, latitude: -5.7780, longitude: 145.0350, description: "Historic wartime aircraft wreckage resting on the alpine scree ridge." },
      { name: "Trig Point Summit (4,509m)", elevationMeters: 4509, distanceKm: 11.0, latitude: -5.7801, longitude: 145.0289, description: "Summit of Papua New Guinea. Views stretch to both the northern and southern coastlines at dawn." }
    ],
    packingList: ["Thermal fleece & sub-zero sleeping bag", "Headlamp & spare batteries", "Waterproof alpine jacket", "Altitude hydration tabs", "Trekking poles"]
  },
  {
    id: "tufi-fjords",
    name: "Tufi Fjords Marine & Eco-Circuit",
    subtitle: "Tropical volcanic calderas, coral reef drop-offs, and rainforest waterways in Cape Nelson",
    region: "Southern",
    province: "Oro (Northern)",
    difficulty: "Moderate",
    totalDistanceKm: 18,
    durationDays: "2 - 3 Days",
    highestPointMeters: 120,
    lowestPointMeters: 0,
    elevationGainMeters: 320,
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82",
    overview: "Tufi is famous for its 30 dramatic basalt 'rias' (volcanic fjords) that plunge 90 meters into crystal clear waters lined with coral gardens, mangrove forests, and traditional coastal Oro communities.",
    requiredPermits: "Tufi Marine Protected Area Visitor Tag",
    emergencyFrequencies: "Tufi Resort Marine VHF Ch 16",
    waypoints: [
      { name: "Tufi Dive Resort Jetty", elevationMeters: 10, distanceKm: 0, latitude: -9.0817, longitude: 149.3183, description: "Fjord gateway with sea kayak fleet and dive boat marina." },
      { name: "MacLaren Fjord Mangrove Route", elevationMeters: 0, distanceKm: 4.5, latitude: -9.0720, longitude: 149.3300, description: "Paddle outrigger canoe deep into secluded rainforest fjords.", waterAvailable: true },
      { name: "Gobi Village Waterfall", elevationMeters: 45, distanceKm: 9.0, latitude: -9.0610, longitude: 149.3450, description: "Fresh mountain waterfall cascading straight into the ocean.", isCampsite: true, waterAvailable: true },
      { name: "Cyclone Reef Outer Drop-off", elevationMeters: 0, distanceKm: 14.0, latitude: -9.0400, longitude: 149.3700, description: "Pristine coral wall with manta rays and hammerhead sharks." },
      { name: "Cape Nelson Lighthouse Hill", elevationMeters: 120, distanceKm: 18.0, latitude: -9.0150, longitude: 149.3900, description: "Panoramic coastal viewpoint overlooking the Solomon Sea." }
    ],
    packingList: ["Reef-safe sunscreen", "Snorkel / mask", "Waterproof dry bag", "Lightweight hiking sandals", "Hat & rash guard"]
  },
  {
    id: "rabaul-tavurvur",
    name: "Rabaul Volcano & Caldera Rim Trek",
    subtitle: "Active volcano rim climb, geothermal hot springs, and historic WWII bunker tunnels",
    region: "Islands",
    province: "East New Britain",
    difficulty: "Moderate",
    totalDistanceKm: 12,
    durationDays: "1 - 2 Days",
    highestPointMeters: 688,
    lowestPointMeters: 0,
    elevationGainMeters: 688,
    coverImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1100&q=82",
    overview: "Ascend the smoking crater slopes of Mount Tavurvur and explore the sunken caldera of Simpson Harbour in East New Britain, surrounded by black volcanic sands and wartime submarine relics.",
    requiredPermits: "Matupit Island Community Volcanic Access Permit",
    emergencyFrequencies: "Rabaul Volcanological Observatory Radio 156.8 MHz",
    waypoints: [
      { name: "Matupit Island Hot Springs", elevationMeters: 2, distanceKm: 0, latitude: -4.2480, longitude: 152.1950, description: "Thermal mineral springs where locals cook megapode bird eggs in geothermal steam.", waterAvailable: true },
      { name: "Tavurvur Base Ash Plain", elevationMeters: 25, distanceKm: 2.5, latitude: -4.2420, longitude: 152.2040, description: "Black volcanic ash fields with dramatic views of sulfur vents." },
      { name: "Tavurvur Active Crater Rim (688m)", elevationMeters: 688, distanceKm: 5.5, latitude: -4.2389, longitude: 152.2089, description: "Active crater viewpoint overlooking Simpson Harbour and the Duke of York Islands." },
      { name: "Japanese Submarine Base Tunnels", elevationMeters: 15, distanceKm: 9.0, latitude: -4.2150, longitude: 152.1700, description: "Underground tunnel network dug into the caldera cliffs during WWII." },
      { name: "Rabaul Volcanological Observatory", elevationMeters: 210, distanceKm: 12.0, latitude: -4.1920, longitude: 152.1640, description: "Scientific observatory tracking seismology across the Bismarck volcanic arc." }
    ],
    packingList: ["Dust mask / bandana", "Sturdy trail shoes for hot volcanic rock", "Safety sunglasses", "Plenty of drinking water"]
  }
];

export const ZAMBIA_TRAIL_PACKS: TrailPack[] = [
  {
    id: "south-luangwa-walking-trail",
    name: "South Luangwa Pioneer Walking Safari Trail",
    subtitle: "Classic 4-Day bush camp trail through the Valley of the Leopard along the Luangwa River",
    region: "Central & Eastern",
    province: "Eastern Province",
    difficulty: "Moderate",
    totalDistanceKm: 42,
    durationDays: "4 Days",
    highestPointMeters: 620,
    lowestPointMeters: 510,
    elevationGainMeters: 280,
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1100&q=82",
    overview: "The quintessential African walking safari experience pioneered by Norman Carr. Follow wildlife game trails on foot accompanied by armed DNPW scouts and expert tracking guides, staying at intimate fly-camps under the African stars.",
    requiredPermits: "DNPW National Park Entry & Commercial Walking Safari Conservation Permit",
    emergencyFrequencies: "VHF Ch 04 (Luangwa Safari Net) · DNPW Mfuwe Command: +260 216 246022",
    waypoints: [
      { name: "Mfuwe Main Gate (Start)", elevationMeters: 550, distanceKm: 0, latitude: -13.1022, longitude: 31.7915, description: "Park headquarters and ranger verification point." },
      { name: "Kakumbi Oxbow Lagoon", elevationMeters: 535, distanceKm: 8, latitude: -13.0850, longitude: 31.8100, description: "Major hippo pool and waterbird haven.", waterAvailable: true },
      { name: "Luangwa River Sandbar Camp", elevationMeters: 520, distanceKm: 16, latitude: -13.0450, longitude: 31.8400, description: "Overnight fly camp on private riverbank sandbar.", isCampsite: true, waterAvailable: true },
      { name: "Ebony Grove Wildlife Corridor", elevationMeters: 560, distanceKm: 28, latitude: -12.9850, longitude: 31.8700, description: "Ancient riverine ebony forest frequented by Thornicroft's giraffes and leopards." },
      { name: "Nsefu Sector Ranger Outpost (Finish)", elevationMeters: 510, distanceKm: 42, latitude: -12.9200, longitude: 31.9100, description: "Historic Nsefu game sector and vehicle pickup point.", isCampsite: true, waterAvailable: true }
    ],
    packingList: ["Neutral/Khaki walking shirts & shorts", "Sturdy broken-in hiking boots", "Compact binoculars (8x42)", "Sunhat with wide brim", "High SPF sun lotion & insect repellent", "Refillable insulated water canteen"]
  },
  {
    id: "victoria-falls-gorge-trail",
    name: "Victoria Falls Rainforest & Batoka Gorge Trail",
    subtitle: "Spectacular rim trek overlooking the world's largest curtain of falling water",
    region: "Southern & Lusaka",
    province: "Southern Province",
    difficulty: "Easy",
    totalDistanceKm: 12,
    durationDays: "1 Day",
    highestPointMeters: 920,
    lowestPointMeters: 780,
    elevationGainMeters: 340,
    coverImage: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1100&q=82",
    overview: "Traverse the mist-drenched equatorial rainforest directly opposite the roaring chasm of Mosi-oa-Tunya Victoria Falls, then descend into the historic Batoka Gorge below the iconic 1905 railway bridge.",
    requiredPermits: "Victoria Falls National Heritage Site Pass (Included with ZamRoam Pass)",
    emergencyFrequencies: "Livingstone Tourism Police: +260 213 320115 · SES Medevac: +260 962 740300",
    waypoints: [
      { name: "Mosi-oa-Tunya Heritage Gate (Start)", elevationMeters: 890, distanceKm: 0, latitude: -17.9243, longitude: 25.8572, description: "Official entrance and David Livingstone statue." },
      { name: "Devil's Cataract & Chain Walk", elevationMeters: 880, distanceKm: 2, latitude: -17.9260, longitude: 25.8550, description: "Closest viewpoint to the thundering western cascade." },
      { name: "Main Falls & Rainbow Lookout", elevationMeters: 885, distanceKm: 4, latitude: -17.9250, longitude: 25.8590, description: "Permanent rainbows in the dense rainforest spray." },
      { name: "Knife-Edge Bridge", elevationMeters: 875, distanceKm: 7, latitude: -17.9280, longitude: 25.8640, description: "Suspension bridge with 360-degree spray views into the Eastern Cataract." },
      { name: "Batoka Gorge Boiling Pot Descent (Finish)", elevationMeters: 780, distanceKm: 12, latitude: -17.9300, longitude: 25.8670, description: "Descent to the base of the gorge where whitewater rafters launch.", isCampsite: false, waterAvailable: true }
    ],
    packingList: ["Waterproof poncho or rain jacket", "Waterproof drybag for phone & camera", "Grippy water-resistant sandals or light shoes", "UV sunglasses"]
  }
];

export function generateGpx(trail: TrailPack): string {
  const points = trail.waypoints.map(wp => `
    <wpt lat="${wp.latitude}" lon="${wp.longitude}">
      <ele>${wp.elevationMeters}</ele>
      <name>${wp.name.replace(/&/g, "&amp;")}</name>
      <desc>${wp.description.replace(/&/g, "&amp;")}</desc>
      <sym>${wp.isCampsite ? "Campground" : "Waypoint"}</sym>
    </wpt>`).join("");

  const trackPoints = trail.waypoints.map(wp => `
      <trkpt lat="${wp.latitude}" lon="${wp.longitude}">
        <ele>${wp.elevationMeters}</ele>
      </trkpt>`).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="ZamRoam / Visit PNG" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${trail.name.replace(/&/g, "&amp;")}</name>
    <desc>${trail.subtitle.replace(/&/g, "&amp;")}</desc>
    <author><name>Tourism Platform Expedition Guide</name></author>
  </metadata>
  ${points}
  <trk>
    <name>${trail.name.replace(/&/g, "&amp;")}</name>
    <trkseg>
      ${trackPoints}
    </trkseg>
  </trk>
</gpx>`;
}

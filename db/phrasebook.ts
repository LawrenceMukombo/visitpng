export interface TokPisinPhrase {
  id: string;
  category: "greetings" | "market" | "trekking" | "emergency" | "custom";
  categoryLabel: string;
  tokPisin: string;
  english: string;
  phonetic: string;
  culturalNote: string;
}

export const TOK_PISIN_PHRASEBOOK: TokPisinPhrase[] = [
  // Greetings & Respect
  {
    id: "greet-morning",
    category: "greetings",
    categoryLabel: "Greetings & Respect",
    tokPisin: "Gutpela moning tru",
    english: "Good morning / Warm morning greetings",
    phonetic: "Goot-peh-lah moh-ning troo",
    culturalNote: "A warm, respectful morning greeting used across all provinces in PNG. Always greet elders first when entering a village."
  },
  {
    id: "greet-afternoon",
    category: "greetings",
    categoryLabel: "Greetings & Respect",
    tokPisin: "Gutpela apinun",
    english: "Good afternoon / Good evening",
    phonetic: "Goot-peh-lah ah-pee-noon",
    culturalNote: "Used from midday until dusk. Handshakes in PNG are soft, warm, and often accompanied by gentle eye contact."
  },
  {
    id: "greet-how-are-you",
    category: "greetings",
    categoryLabel: "Greetings & Respect",
    tokPisin: "Yu stap gut?",
    english: "How are you? / Are you doing well?",
    phonetic: "Yoo stahp goot?",
    culturalNote: "Common friendly question. The usual polite reply is 'Mi stap gut, tenkyu' (I am well, thank you)."
  },
  {
    id: "greet-thank-you",
    category: "greetings",
    categoryLabel: "Greetings & Respect",
    tokPisin: "Tenkyu tru long helpim",
    english: "Thank you very much for your help",
    phonetic: "Tenk-yoo troo long hel-pim",
    culturalNote: "Expressing genuine gratitude creates immediate goodwill with local guides, porters, and village hosts."
  },
  {
    id: "greet-name",
    category: "greetings",
    categoryLabel: "Greetings & Respect",
    tokPisin: "Nem bilong mi em...",
    english: "My name is...",
    phonetic: "Nehm bee-long mee em...",
    culturalNote: "Introducing yourself openly helps establish a friendly personal connection ('wantok' kinship atmosphere)."
  },
  {
    id: "greet-see-you",
    category: "greetings",
    categoryLabel: "Greetings & Respect",
    tokPisin: "Lukim yu bihain",
    english: "See you later / Until next time",
    phonetic: "Loo-keem yoo bee-hyne",
    culturalNote: "A friendly parting phrase widely understood across the Highlands and Islands."
  },

  // Market & Trade
  {
    id: "market-price",
    category: "market",
    categoryLabel: "Market & Trade",
    tokPisin: "Hamas long dispela?",
    english: "How much is this?",
    phonetic: "Hah-mahs long dees-peh-lah?",
    culturalNote: "Used when buying fruit, carvings, or bilum bags. Local markets have fixed fair prices; heavy haggling is generally frowned upon."
  },
  {
    id: "market-buy",
    category: "market",
    categoryLabel: "Market & Trade",
    tokPisin: "Mi laik baim dispela bilum",
    english: "I would like to buy this bilum (woven bag)",
    phonetic: "Mee lyke bye-eem dees-peh-lah bee-loom",
    culturalNote: "Bilums are handcrafted woven bags carrying deep cultural meaning. Complimenting the artisan on the pattern is appreciated."
  },
  {
    id: "market-sweet",
    category: "market",
    categoryLabel: "Market & Trade",
    tokPisin: "Dispela kaikai i swit tru",
    english: "This food / fruit is very delicious",
    phonetic: "Dees-peh-lah kye-kye ee sweet troo",
    culturalNote: "'Kaikai' means food or meal. Praising local organic fruits (papaya, pineapple, kau kau sweet potato) brings big smiles."
  },
  {
    id: "market-small-money",
    category: "market",
    categoryLabel: "Market & Trade",
    tokPisin: "Yu gat senis?",
    english: "Do you have change?",
    phonetic: "Yoo gaht seh-nees?",
    culturalNote: "Market stallholders often lack change for large K100 notes. Always carry small K5, K10, and K20 notes."
  },

  // Trekking & Directions
  {
    id: "trek-where-road",
    category: "trekking",
    categoryLabel: "Trekking & Directions",
    tokPisin: "We stap rot i go long ples?",
    english: "Where is the path / trail leading to the village?",
    phonetic: "Weh stahp roht ee go long plehs?",
    culturalNote: "'Rot' refers to roads, bush tracks, and mountain trails. 'Ples' means home village or settlement."
  },
  {
    id: "trek-how-far",
    category: "trekking",
    categoryLabel: "Trekking & Directions",
    tokPisin: "Em i longwe liklik o klostu?",
    english: "Is it far away or close by?",
    phonetic: "Em ee long-weh leek-leek oh kloh-stoo?",
    culturalNote: "Distances in the jungle are often measured in walking time or mountain ridges rather than kilometers."
  },
  {
    id: "trek-water",
    category: "trekking",
    categoryLabel: "Trekking & Directions",
    tokPisin: "We stap gutpela wara bilong dring?",
    english: "Where is clean water for drinking?",
    phonetic: "Weh stahp goot-peh-lah wah-rah bee-long dring?",
    culturalNote: "Highland mountain streams are often pristine, but always verify with local guides whether water needs filtration."
  },
  {
    id: "trek-slow",
    category: "trekking",
    categoryLabel: "Trekking & Directions",
    tokPisin: "Yumi go isi isi",
    english: "Let's walk slowly / take it easy",
    phonetic: "Yoo-mee go ee-zee ee-zee",
    culturalNote: "'Isi isi' means gently or patiently. Critical on steep Kokoda or Mount Wilhelm muddy ascents."
  },

  // Emergency & Health
  {
    id: "emerg-help",
    category: "emergency",
    categoryLabel: "Emergency & Health",
    tokPisin: "Plis helpim mi!",
    english: "Please help me!",
    phonetic: "Plees hel-pim mee!",
    culturalNote: "Clear, universal plea for assistance in urgent situations. PNG villagers are exceptionally hospitable and will rally to assist."
  },
  {
    id: "emerg-sick",
    category: "emergency",
    categoryLabel: "Emergency & Health",
    tokPisin: "Mi pilim sik / Mi gat fiva",
    english: "I feel sick / I have a fever",
    phonetic: "Mee pee-leem seek / Mee gaht fee-vah",
    culturalNote: "Communicate clearly to your trek leader or village health aid post (Aid Post Orderly)."
  },
  {
    id: "emerg-doctor",
    category: "emergency",
    categoryLabel: "Emergency & Health",
    tokPisin: "We stap haus sik o dokta?",
    english: "Where is the clinic, hospital, or doctor?",
    phonetic: "Weh stahp hows seek oh dohk-tah?",
    culturalNote: "'Haus sik' is the Tok Pisin term for a health center or hospital."
  },

  // Custom & Village Etiquette
  {
    id: "custom-tambo",
    category: "custom",
    categoryLabel: "Customs & Village Etiquette",
    tokPisin: "Dispela em tambo ples?",
    english: "Is this area sacred / forbidden to enter?",
    phonetic: "Dees-peh-lah em tahm-boh plehs?",
    culturalNote: "'Tambo' (taboo) areas are sacred customary grounds, spirit houses (Haus Tambaran), or burial caves that must not be entered without permission."
  },
  {
    id: "custom-photo",
    category: "custom",
    categoryLabel: "Customs & Village Etiquette",
    tokPisin: "Inap mi kisim poto bilong yu?",
    english: "May I take a photo of you?",
    phonetic: "Ee-nahp mee kee-seem poh-toh bee-long yoo?",
    culturalNote: "Always ask before taking photos, particularly of dancers in ceremonial bilas or sacred ritual items."
  },
  {
    id: "custom-chief",
    category: "custom",
    categoryLabel: "Customs & Village Etiquette",
    tokPisin: "Mi laik toktok wantaim bikman bilong ples",
    english: "I would like to greet the village leader / elder",
    phonetic: "Mee lyke tohk-tohk wahn-tyme beek-mahn bee-long plehs?",
    culturalNote: "Acknowledging the village head ('bikman') or clan elder upon arrival shows utmost cultural respect and ensures a peaceful stay."
  }
];

export const VILLAGE_ETIQUETTE_RULES = [
  {
    title: "The 'Wantok' System & Clan Respect",
    description: "Wantok (one-talk) is the foundation of PNG community life, meaning mutual support and kinship. Approach every village as a guest of the community, not just a tourist."
  },
  {
    title: "Dress Codes & Modesty",
    description: "In rural villages and Highlands communities, modest attire covering shoulders and knees is customary and respected. Save swimsuits strictly for dive boats and beach resorts."
  },
  {
    title: "Customary Land & Tambo Grounds",
    description: "97% of land in Papua New Guinea is customary landowner property. Never wander off trails, pick fruit from trees, or enter forest enclosures without a local village guide."
  },
  {
    title: "Sundays & Church Protocol",
    description: "Sunday is a revered day of rest and church worship throughout PNG. Keep noise levels low in villages and participate in choral services if invited."
  }
];

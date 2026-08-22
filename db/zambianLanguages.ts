export interface ZambianPhrase {
  id: string;
  category: "greetings" | "safari" | "market" | "emergency" | "culture";
  english: string;
  localText: string;
  phonetic: string;
  literalMeaning?: string;
  culturalNote?: string;
}

export interface ZambianLanguageZone {
  code: string;
  name: string;
  nativeName: string;
  primaryProvinces: string[];
  regionLabel: string;
  speakerCount: string;
  description: string;
  culturalEtiquette: string[];
  phrases: ZambianPhrase[];
}

export const ZAMBIAN_LANGUAGE_ZONES: ZambianLanguageZone[] = [
  {
    code: "bemba",
    name: "Bemba (Ichibemba)",
    nativeName: "IchiBemba",
    primaryProvinces: ["Copperbelt Province", "Central Province", "Northern Province", "Luapula Province", "Muchinga Province"],
    regionLabel: "Copperbelt, Central, Northern, Luapula & Muchinga",
    speakerCount: "5.0 Million+",
    description: "The most widely spoken indigenous language in Zambia. Heard extensively across the Copperbelt commercial hub, Central mining towns, and the scenic northern waterfalls and Lake Tanganyika.",
    culturalEtiquette: [
      "Use both hands when giving or receiving an object from an elder or host.",
      "Say 'Mukwai' at the end of sentences as a polite honorific (like 'Sir/Madam').",
      "Clap twice gently when showing appreciation to hospitality staff."
    ],
    phrases: [
      { id: "bm-1", category: "greetings", english: "How are you? / Greetings", localText: "Muli shani mukwai?", phonetic: "moo-lee shah-nee moo-kwhy", culturalNote: "The universal Bemba greeting across northern & urban Zambia." },
      { id: "bm-2", category: "greetings", english: "I am fine / Peaceful", localText: "Bwino mukwai / Ndi bwino", phonetic: "bwee-noh moo-kwhy / n-dee bwee-noh" },
      { id: "bm-3", category: "greetings", english: "Thank you", localText: "Natotela mukwai", phonetic: "nah-toh-teh-lah moo-kwhy" },
      { id: "bm-4", category: "greetings", english: "Thank you very much", localText: "Natotela sana", phonetic: "nah-toh-teh-lah sah-nah" },
      { id: "bm-5", category: "greetings", english: "Welcome (to visitors)", localText: "Mwaiseni mukwai", phonetic: "mwah-ee-seh-nee moo-kwhy" },
      { id: "bm-6", category: "greetings", english: "Goodbye (Stay well)", localText: "Shalenipo mukwai", phonetic: "shah-leh-nee-poh moo-kwhy" },
      { id: "bm-7", category: "safari", english: "The waterfall is magnificent", localText: "Cipoma ici cili cisuma sana", phonetic: "chee-poh-mah ee-chee chee-lee chee-soo-mah sah-nah" },
      { id: "bm-8", category: "market", english: "How much is this?", localText: "Shinga ici?", phonetic: "sheen-gah ee-chee" },
      { id: "bm-9", category: "market", english: "Water / Nshima (staple meal)", localText: "Amenshi / Ubwali (Nshima)", phonetic: "ah-mehn-shee / oo-bwah-lee" },
      { id: "bm-10", category: "emergency", english: "Help me please", localText: "Nafweni mukwai", phonetic: "nah-fweh-nee moo-kwhy" }
    ]
  },
  {
    code: "nyanja",
    name: "Nyanja / Chewa (Chinyanja)",
    nativeName: "ChiNyanja",
    primaryProvinces: ["Eastern Province", "Lusaka Province"],
    regionLabel: "Eastern & Lusaka Province (Lusaka City, Chipata, South Luangwa)",
    speakerCount: "3.5 Million+",
    description: "The primary lingua franca of Lusaka Capital and Eastern Zambia (including South Luangwa National Park, Chipata, and the Nc'wala ceremony).",
    culturalEtiquette: [
      "Always greet people before asking for directions or ordering food.",
      "Use 'Bambo' (Sir) and 'Mayi' (Madam) for polite, respectful interaction.",
      "Say 'Zikomo' freely—it is the universal Zambian word for thank you and excuse me."
    ],
    phrases: [
      { id: "ny-1", category: "greetings", english: "How are you?", localText: "Muli bwanji?", phonetic: "moo-lee bwah-njee", culturalNote: "The most widely understood greeting in Lusaka." },
      { id: "ny-2", category: "greetings", english: "I am fine", localText: "Ndili bwino", phonetic: "n-dee-lee bwee-noh" },
      { id: "ny-3", category: "greetings", english: "Thank you / Excuse me", localText: "Zikomo", phonetic: "zee-koh-moh", culturalNote: "Universal polite expression heard everywhere in Zambia." },
      { id: "ny-4", category: "greetings", english: "Thank you very much", localText: "Zikomo kwambiri", phonetic: "zee-koh-moh kwahm-bee-ree" },
      { id: "ny-5", category: "greetings", english: "Welcome / Come in", localText: "Takulandirani", phonetic: "tah-koo-lahn-dee-rah-nee" },
      { id: "ny-6", category: "greetings", english: "Goodbye (Stay well)", localText: "Salani bwino", phonetic: "sah-lah-nee bwee-noh" },
      { id: "ny-7", category: "safari", english: "Walking Safari / Bush walk", localText: "Kuyenda m'thengo", phonetic: "koo-yen-dah m-ten-goh" },
      { id: "ny-8", category: "safari", english: "Elephant / Lion / Leopard", localText: "Njobvu / Mkango / Nyalugwe", phonetic: "n-johb-voo / m-kahn-goh / nyah-loog-weh" },
      { id: "ny-9", category: "market", english: "How much is this?", localText: "Ndi ndalama zingati?", phonetic: "n-dee n-dah-lah-mah zeen-gah-tee" },
      { id: "ny-10", category: "emergency", english: "Help me please", localText: "Nthandizeni chonde", phonetic: "n-tahn-dee-zeh-nee chohn-deh" }
    ]
  },
  {
    code: "tonga",
    name: "Tonga (Chitonga)",
    nativeName: "ChiTonga",
    primaryProvinces: ["Southern Province"],
    regionLabel: "Southern Province (Livingstone, Victoria Falls, Choma, Kariba)",
    speakerCount: "2.1 Million+",
    description: "The indigenous language of Southern Zambia, including Livingstone, Victoria Falls (Mosi-oa-Tunya), Choma, and Lake Kariba.",
    culturalEtiquette: [
      "A slight head bow or kneeling when greeting elders is a traditional sign of respect (Bulemu).",
      "Address elders as 'Taata' (Father/Sir) or 'Maama' (Mother/Madam).",
      "Respect local customs when visiting sacred natural gorges and Tonga cultural sites."
    ],
    phrases: [
      { id: "to-1", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwabuka buti?", phonetic: "mwah-boo-kah boo-tee", culturalNote: "Standard morning greeting in Livingstone." },
      { id: "to-2", category: "greetings", english: "I am fine / We woke well", localText: "Twabuka kabotu", phonetic: "twah-boo-kah kah-boh-too" },
      { id: "to-3", category: "greetings", english: "Good afternoon / How is the day?", localText: "Mwaswela buti?", phonetic: "mwah-sweh-lah boo-tee" },
      { id: "to-4", category: "greetings", english: "Thank you very much", localText: "Twalumba kapati", phonetic: "twah-loom-bah kah-pah-tee", culturalNote: "Extremely common in Victoria Falls curio markets." },
      { id: "to-5", category: "greetings", english: "Safe journey / Go well", localText: "Mweende kabotu", phonetic: "mwehn-deh kah-boh-too" },
      { id: "to-6", category: "safari", english: "The Smoke that Thunders (Victoria Falls)", localText: "Mosi-oa-Tunya", phonetic: "moh-see oh-ah toon-yah", literalMeaning: "The smoke that sounds/thunders." },
      { id: "to-7", category: "safari", english: "Lion / Leopard / Hippo", localText: "Syumbwa / Siluwe / Mvubu", phonetic: "shoom-bwah / see-loo-weh / m-voo-boo" },
      { id: "to-8", category: "market", english: "How much is this craft?", localText: "Mali nzi eeci?", phonetic: "mah-lee n-zee eh-chee" },
      { id: "to-9", category: "emergency", english: "Please help me", localText: "Ndigwasye kuli luse", phonetic: "n-dee-gwah-syeh koo-lee loo-seh" },
      { id: "to-10", category: "culture", english: "Welcome to our home", localText: "Mwamuka amulwii", phonetic: "mwah-moo-kah ah-moo-lwee" }
    ]
  },
  {
    code: "lozi",
    name: "Lozi (Silozi)",
    nativeName: "SiLozi",
    primaryProvinces: ["Western Province"],
    regionLabel: "Western Province (Barotseland & Mongu)",
    speakerCount: "1.2 Million+",
    description: "The language of the Lozi people of the upper Zambezi floodplain (Barotseland). Used throughout Mongu, Senanga, Sesheke, and during the majestic Kuomboka ceremony.",
    culturalEtiquette: [
      "Clap hands softly three times (Kushowelela) when greeting royal elders or chiefs.",
      "Address adult men respectfully as 'Bo-tate' and adult women as 'Bo-ma'.",
      "During Kuomboka, show reverence toward the Litunga's royal procession."
    ],
    phrases: [
      { id: "lz-1", category: "greetings", english: "Hello / Greetings", localText: "Mulumuheyilwe", phonetic: "moo-loo-moo-hey-eel-weh", culturalNote: "General respectful greeting to one or more people." },
      { id: "lz-2", category: "greetings", english: "How are you?", localText: "Mu zuhile hande?", phonetic: "moo zoo-hee-leh hahn-deh", literalMeaning: "Did you wake up well?" },
      { id: "lz-3", category: "greetings", english: "I am fine, thank you", localText: "Ni zuhile hande, lu itumezi", phonetic: "nee zoo-hee-leh hahn-deh, loo ee-too-meh-zee" },
      { id: "lz-4", category: "greetings", english: "Thank you very much", localText: "Ni itumezi hahulu", phonetic: "nee ee-too-meh-zee hah-hoo-loo" },
      { id: "lz-5", category: "greetings", english: "Goodbye (Stay well)", localText: "Mu siyale hande", phonetic: "moo see-yah-leh hahn-deh" },
      { id: "lz-6", category: "safari", english: "Look at the elephant", localText: "Mu bone tou", phonetic: "moo boh-neh toh-oo" },
      { id: "lz-7", category: "safari", english: "The Zambezi River is beautiful", localText: "Nuka ya Lyambai ki ye nde", phonetic: "noo-kah yah lyahm-bye kee yeh n-deh" },
      { id: "lz-8", category: "market", english: "How much is this?", localText: "Ki bukai se?", phonetic: "kee boo-kye seh" },
      { id: "lz-9", category: "market", english: "Water / Food", localText: "Mezi / Lico", phonetic: "meh-zee / lee-choh" },
      { id: "lz-10", category: "emergency", english: "Help me please", localText: "Mu ni tuse shangwe", phonetic: "moo nee too-seh shahng-weh" }
    ]
  },
  {
    code: "lunda",
    name: "Lunda (Chilunda)",
    nativeName: "ChiLunda",
    primaryProvinces: ["North-Western Province", "Copperbelt Province"],
    regionLabel: "North-Western (Mwinilunga, Ikelenge, Zambezi Source)",
    speakerCount: "600,000+",
    description: "The indigenous language spoken around the historic source of the mighty Zambezi River in Mwinilunga and Ikelenge, celebrated during the sacred Lunda Lubanza cultural ceremony and across the ancient Lunda Kingdom.",
    culturalEtiquette: [
      "Gently clap hands or place hand across the chest as a sign of deep respect when greeting elders.",
      "Address elders politely as 'Mwami' or 'Mwanami' (Sir/Elder).",
      "The Zambezi River Source is regarded as a national sacred site; treat local guides with honor."
    ],
    phrases: [
      { id: "lu-1", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwananguka mwani?", phonetic: "mwah-nahn-goo-kah mwah-nee", culturalNote: "Standard polite Lunda morning greeting." },
      { id: "lu-2", category: "greetings", english: "I woke well", localText: "Nanguka chachiwahi mwani", phonetic: "nahn-goo-kah chah-chee-wah-hee mwah-nee" },
      { id: "lu-3", category: "greetings", english: "How are you? / Greetings", localText: "Mudi ñahi mwani?", phonetic: "moo-dee nyah-hee mwah-nee" },
      { id: "lu-4", category: "greetings", english: "Thank you very much", localText: "Twasakilila nankashi mwani", phonetic: "twah-sah-kee-lee-lah nahn-kah-shee mwah-nee" },
      { id: "lu-5", category: "greetings", english: "Welcome / Come in", localText: "Enzenu mwani", phonetic: "ehn-zeh-noo mwah-nee" },
      { id: "lu-6", category: "greetings", english: "Goodbye (Go well)", localText: "Yenu chachiwahi", phonetic: "yeh-noo chah-chee-wah-hee" },
      { id: "lu-7", category: "safari", english: "Source of the Zambezi River", localText: "Nsulu ya Kalwiji Yezambezi", phonetic: "n-soo-loo yah kah-lwee-jee yeh-zahm-beh-zee", literalMeaning: "The spring source of the great river." },
      { id: "lu-8", category: "market", english: "How much is this?", localText: "Chidi nakingahi?", phonetic: "chee-dee nah-keen-gah-hee" },
      { id: "lu-9", category: "emergency", english: "Please help me", localText: "Nkwashiku mwani", phonetic: "n-kwah-shee-koo mwah-nee" },
      { id: "lu-10", category: "culture", english: "Peace and blessings", localText: "Kuunda nawa nkisu", phonetic: "koo-oon-dah nah-wah n-kee-soo" }
    ]
  },
  {
    code: "luvale",
    name: "Luvale (Chiluvale)",
    nativeName: "ChiLuvale",
    primaryProvinces: ["North-Western Province", "Western Province"],
    regionLabel: "North-Western & Western (Zambezi, Chavuma, Mize)",
    speakerCount: "500,000+",
    description: "The vibrant language of the Luvale people along the upper Zambezi in Chavuma and Zambezi District, world-famous for the UNESCO-inscribed Likumbi Lya Mize festival and sacred Makishi masquerade.",
    culturalEtiquette: [
      "Makishi masked spirits (Likishi) represent ancestral guardians and must be treated with solemn reverence during cultural rituals.",
      "Say 'Shikenu' when entering a village or homestead as a formal greeting of peace.",
      "Ask permission before photographing traditional masks, wood carvings, or initiation regalia."
    ],
    phrases: [
      { id: "lv-1", category: "greetings", english: "Hello / Peace to you", localText: "Shikenu mwane", phonetic: "shee-keh-noo mwah-neh", culturalNote: "The universal respectful Luvale greeting." },
      { id: "lv-2", category: "greetings", english: "How are you?", localText: "Munahanduka ngachilihi?", phonetic: "moo-nah-hahn-doo-kah n-gah-chee-lee-hee" },
      { id: "lv-3", category: "greetings", english: "I am fine / Peaceful", localText: "Ngunahanduka kanawa", phonetic: "n-goo-nah-hahn-doo-kah kah-nah-wah" },
      { id: "lv-4", category: "greetings", english: "Thank you very much", localText: "Tunasakwilila chikuma mwane", phonetic: "too-nah-sah-kwee-lee-lah chee-koo-mah mwah-neh" },
      { id: "lv-5", category: "greetings", english: "Welcome to our village", localText: "Mwazeza mwane", phonetic: "mwah-zeh-zah mwah-neh" },
      { id: "lv-6", category: "greetings", english: "Goodbye (Stay well)", localText: "Salenuho kanawa", phonetic: "sah-leh-noo-hoh kah-nah-wah" },
      { id: "lv-7", category: "culture", english: "Sacred Makishi Spirit Mask", localText: "Likishi lya Mukanda", phonetic: "lee-kee-shee lyah moo-kahn-dah", literalMeaning: "Ancestral masked spirit of the Mukanda institution." },
      { id: "lv-8", category: "safari", english: "Cross the river", localText: "Zambukenu kalwiji", phonetic: "zahm-boo-keh-noo kah-lwee-jee" },
      { id: "lv-9", category: "market", english: "How much is this carving?", localText: "Chingahi chino?", phonetic: "cheen-gah-hee chee-noh" },
      { id: "lv-10", category: "emergency", english: "Help me please", localText: "Ngukwasenuho mwane", phonetic: "n-goo-kwah-seh-noo-hoh mwah-neh" }
    ]
  },
  {
    code: "kaonde",
    name: "Kaonde (KiKaonde)",
    nativeName: "KiKaonde",
    primaryProvinces: ["North-Western Province", "Central Province"],
    regionLabel: "North-Western & Central (Solwezi, Kasempa, Kifubwa)",
    speakerCount: "700,000+",
    description: "Spoken across Solwezi, Kasempa, and Mumbwa. Home to the Kifubwa prehistoric rock art stream and the famous Ntongo and Kufukwila traditional cultural ceremonies.",
    culturalEtiquette: [
      "Say 'Mwaingilanyi' (How are you working / spending the day) as a warm, respectful greeting.",
      "Add 'Mwani' at the end of statements as a polite honorific (equivalent to 'Sir/Madam').",
      "Clap hands gently when expressing gratitude to elders and hosts."
    ],
    phrases: [
      { id: "kd-1", category: "greetings", english: "Hello / How are you?", localText: "Mwaingilanyi mwani?", phonetic: "mwah-een-gee-lah-nyee mwah-nee", culturalNote: "Respectful Kaonde greeting used throughout Solwezi and Kasempa." },
      { id: "kd-2", category: "greetings", english: "I am fine / Working well", localText: "Twaingila bulongo", phonetic: "twah-een-gee-lah boo-lohn-goh" },
      { id: "kd-3", category: "greetings", english: "Good morning", localText: "Mwalangukanyi mwani?", phonetic: "mwah-lahn-goo-kah-nyee mwah-nee" },
      { id: "kd-4", category: "greetings", english: "Thank you very much", localText: "Twasanta bingi mwani", phonetic: "twah-sahn-tah been-gee mwah-nee" },
      { id: "kd-5", category: "greetings", english: "Welcome", localText: "Mwatwelanyi mwani", phonetic: "mwah-tweh-lah-nyee mwah-nee" },
      { id: "kd-6", category: "greetings", english: "Goodbye (Stay well)", localText: "Shalaipo bulongo", phonetic: "shah-lah-ee-poh boo-lohn-goh" },
      { id: "kd-7", category: "safari", english: "Prehistoric Rock Art / Cave", localText: "Mabwe a kala a Kifubwa", phonetic: "mah-bweh ah kah-lah ah kee-foob-wah" },
      { id: "kd-8", category: "market", english: "How much is this?", localText: "Kiji shinga kino?", phonetic: "kee-jee sheen-gah kee-noh" },
      { id: "kd-9", category: "emergency", english: "Please help me", localText: "Nkwashai mwani", phonetic: "n-kwah-shah-ee mwah-nee" },
      { id: "kd-10", category: "culture", english: "Traditional Chiefdom Blessing", localText: "Mapesho a Bashikulu", phonetic: "mah-peh-shoh ah bah-shee-koo-loo" }
    ]
  }
];

export function getLanguageZoneByProvince(provinceName: string): ZambianLanguageZone {
  const norm = provinceName.toLowerCase();
  if (norm.includes("western") && !norm.includes("north")) {
    return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "lozi") || ZAMBIAN_LANGUAGE_ZONES[3];
  }
  if (norm.includes("southern")) {
    return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "tonga") || ZAMBIAN_LANGUAGE_ZONES[2];
  }
  if (norm.includes("north-western") || norm.includes("northwestern")) {
    return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "kaonde") || ZAMBIAN_LANGUAGE_ZONES[6];
  }
  if (norm.includes("eastern") || norm.includes("lusaka")) {
    return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "nyanja") || ZAMBIAN_LANGUAGE_ZONES[1];
  }
  // Copperbelt, Central, Northern, Luapula, Muchinga
  return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "bemba") || ZAMBIAN_LANGUAGE_ZONES[0];
}

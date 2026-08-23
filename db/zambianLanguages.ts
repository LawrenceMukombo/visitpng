export interface ZambianPhrase {
  id: string;
  category: "greetings" | "safari" | "market" | "navigation" | "emergency" | "culture";
  english: string;
  localText: string;
  phonetic: string;
  syllables?: string;
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
    primaryProvinces: ["Copperbelt Province", "Central Province", "Northern Province", "Luapula Province", "Muchinga Province", "Lusaka Province"],
    regionLabel: "Copperbelt, Northern, Luapula, Muchinga, Central & Urban Hubs",
    speakerCount: "5.5 Million+",
    description: "The most widely spoken indigenous language in Zambia. Heard extensively across the Copperbelt, Central mining towns, Northern waterfalls, Lake Tanganyika, and major urban centers.",
    culturalEtiquette: [
      "Use both hands when receiving or handing an item to an elder or host.",
      "Add 'Mukwai' at the end of sentences as an essential honorific (Sir/Madam).",
      "Clap twice gently with cupped hands when showing heartfelt appreciation."
    ],
    phrases: [
      { id: "bm-1", category: "greetings", english: "How are you? / Greetings", localText: "Muli shani mukwai?", phonetic: "moo-lee shah-nee moo-kwhy", syllables: "Mu-li sha-ni mu-kwai", culturalNote: "The universal polite Bemba greeting across northern & urban Zambia." },
      { id: "bm-2", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwaukeni mukwai?", phonetic: "mwah-oo-keh-nee moo-kwhy", syllables: "Mwa-u-ke-ni mu-kwai", culturalNote: "Traditional morning greeting used before midday." },
      { id: "bm-3", category: "greetings", english: "Good afternoon / How is the day?", localText: "Mwachibeni mukwai?", phonetic: "mwah-chee-beh-nee moo-kwhy", syllables: "Mwa-chi-be-ni mu-kwai", culturalNote: "Polite afternoon greeting." },
      { id: "bm-4", category: "greetings", english: "I am fine / Peaceful", localText: "Bwino mukwai / Ndi bwino", phonetic: "bwee-noh moo-kwhy / n-dee bwee-noh", syllables: "Bwi-no mu-kwai", culturalNote: "Standard response indicating peace and health." },
      { id: "bm-5", category: "greetings", english: "Thank you", localText: "Natotela mukwai", phonetic: "nah-toh-teh-lah moo-kwhy", syllables: "Na-to-te-la mu-kwai", culturalNote: "Standard expression of gratitude." },
      { id: "bm-6", category: "greetings", english: "Thank you very much", localText: "Natotela sana mukwai", phonetic: "nah-toh-teh-lah sah-nah moo-kwhy", syllables: "Na-to-te-la sa-na mu-kwai", culturalNote: "Deep appreciation for hospitality or kindness." },
      { id: "bm-7", category: "greetings", english: "Welcome (to visitors)", localText: "Mwaiseni mukwai", phonetic: "mwah-ee-seh-nee moo-kwhy", syllables: "Mwai-se-ni mu-kwai", culturalNote: "Warm hospitality welcome spoken to guests." },
      { id: "bm-8", category: "greetings", english: "Goodbye (to person staying / Stay well)", localText: "Shalenipo mukwai", phonetic: "shah-leh-nee-poh moo-kwhy", syllables: "Sha-le-ni-po mu-kwai", culturalNote: "Said by the person who is departing." },
      { id: "bm-9", category: "greetings", english: "Goodbye (to person leaving / Go safely)", localText: "Kabenipo bwino mukwai", phonetic: "kah-beh-nee-poh bwee-noh moo-kwhy", syllables: "Ka-be-ni-po bwi-no mu-kwai", culturalNote: "Said by the host wishing safe travel." },
      { id: "bm-10", category: "safari", english: "The waterfall is magnificent", localText: "Icipoma ici cili cisuma sana", phonetic: "ee-chee-poh-mah ee-chee chee-lee chee-soo-mah sah-nah", syllables: "I-ci-po-ma i-ci ci-li ci-su-ma sa-na", literalMeaning: "This great waterfall is very beautiful." },
      { id: "bm-11", category: "safari", english: "Lion / Elephant / Leopard", localText: "Inkalamo / Insofu / Imbwili", phonetic: "een-kah-lah-moh / een-soh-foo / eem-bwee-lee", syllables: "In-ka-la-mo / In-so-fu / Im-bwi-li", culturalNote: "Key wildlife names in northern wilderness areas." },
      { id: "bm-12", category: "navigation", english: "Where is the road to...?", localText: "Kuli kwi musebo uya ku...?", phonetic: "koo-lee kwee moo-seh-boh oo-yah koo", syllables: "Ku-li kwi mu-se-bo u-ya ku" },
      { id: "bm-13", category: "market", english: "How much is this?", localText: "Shinga ici mukwai?", phonetic: "sheen-gah ee-chee moo-kwhy", syllables: "Shin-ga i-ci mu-kwai" },
      { id: "bm-14", category: "market", english: "Drinking water / Nshima (staple meal)", localText: "Amenshi yakunwa / Ubwali", phonetic: "ah-mehn-shee yah-koon-wah / oo-bwah-lee", syllables: "A-men-shi ya-kun-wa / U-bwa-li" },
      { id: "bm-15", category: "market", english: "The food is very delicious", localText: "Icakulya ici cawama sana", phonetic: "ee-chah-kool-yah ee-chee chah-wah-mah sah-nah", syllables: "I-ca-ku-lya i-ci ca-wa-ma sa-na" },
      { id: "bm-16", category: "emergency", english: "Please help me", localText: "Nafweni mukwai / Njangweniko", phonetic: "nah-fweh-nee moo-kwhy / n-jahng-weh-nee-koh", syllables: "Na-fwe-ni mu-kwai" },
      { id: "bm-17", category: "emergency", english: "I need a doctor / clinic", localText: "Ndefwaya dokota / cipatala", phonetic: "n-deh-fwah-yah doh-koh-tah / chee-pah-tah-lah", syllables: "Nde-fwa-ya do-ko-ta / ci-pa-ta-la" }
    ]
  },
  {
    code: "nyanja",
    name: "Nyanja / Chewa (Chinyanja)",
    nativeName: "ChiNyanja",
    primaryProvinces: ["Eastern Province", "Lusaka Province"],
    regionLabel: "Lusaka Capital & Eastern Province (Chipata, South Luangwa, Katete)",
    speakerCount: "4.0 Million+",
    description: "The primary lingua franca of Lusaka Capital and Eastern Zambia (including South Luangwa National Park, Chipata, and the Nc'wala & Kulamba ceremonies).",
    culturalEtiquette: [
      "Always greet people with 'Muli bwanji' before asking for directions or ordering items.",
      "Use 'Bambo' (Sir/Father) and 'Mayi' (Madam/Mother) as respectful titles.",
      "Say 'Zikomo' freely—it is the universal Zambian word for thank you, excuse me, and pardon."
    ],
    phrases: [
      { id: "ny-1", category: "greetings", english: "How are you?", localText: "Muli bwanji?", phonetic: "moo-lee bwah-njee", syllables: "Mu-li bwa-nji", culturalNote: "The most widely understood greeting across Lusaka and Eastern Zambia." },
      { id: "ny-2", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwauka bwanji?", phonetic: "mwah-oo-kah bwah-njee", syllables: "Mwa-u-ka bwa-nji", culturalNote: "Standard morning greeting." },
      { id: "ny-3", category: "greetings", english: "Good afternoon / How is the day?", localText: "Mwaswela bwanji?", phonetic: "mwah-sweh-lah bwah-njee", syllables: "Mwa-swe-la bwa-nji", culturalNote: "Polite afternoon greeting." },
      { id: "ny-4", category: "greetings", english: "I am fine / Thank you", localText: "Ndili bwino, zikomo", phonetic: "n-dee-lee bwee-noh zee-koh-moh", syllables: "Ndi-li bwi-no, zi-ko-mo", culturalNote: "Standard polite answer." },
      { id: "ny-5", category: "greetings", english: "Thank you / Excuse me / Pardon", localText: "Zikomo", phonetic: "zee-koh-moh", syllables: "Zi-ko-mo", culturalNote: "Universal Zambian word for gratitude and politeness." },
      { id: "ny-6", category: "greetings", english: "Thank you very much", localText: "Zikomo kwambiri", phonetic: "zee-koh-moh kwahm-bee-ree", syllables: "Zi-ko-mo kwam-bi-ri", culturalNote: "Used to express deep appreciation." },
      { id: "ny-7", category: "greetings", english: "Welcome / Come in", localText: "Takulandirani", phonetic: "tah-koo-lahn-dee-rah-nee", syllables: "Ta-ku-lan-di-ra-ni", culturalNote: "Warm welcome extended to travelers." },
      { id: "ny-8", category: "greetings", english: "Goodbye (to person staying / Stay well)", localText: "Tsalani bwino", phonetic: "tsah-lah-nee bwee-noh", syllables: "Tsa-la-ni bwi-no", culturalNote: "Said by the traveler departing." },
      { id: "ny-9", category: "greetings", english: "Goodbye (to traveler / Travel safely)", localText: "Yendani bwino", phonetic: "yen-dah-nee bwee-noh", syllables: "Yen-da-ni bwi-no", culturalNote: "Said by the host wishing safe travel." },
      { id: "ny-10", category: "safari", english: "Walking Safari / Bush walk", localText: "Kuyenda m'thengo", phonetic: "koo-yen-dah m-ten-goh", syllables: "Ku-yen-da m-then-go", culturalNote: "Signature South Luangwa wildlife exploration." },
      { id: "ny-11", category: "safari", english: "Lion / Elephant / Leopard", localText: "Mkango / Njobvu / Nyalugwe", phonetic: "m-kahn-goh / n-johb-voo / nyah-loog-weh", syllables: "M-kan-go / Njo-bvu / Nya-lu-gwe" },
      { id: "ny-12", category: "navigation", english: "Where is...?", localText: "Kuli kuti...?", phonetic: "koo-lee koo-tee", syllables: "Ku-li ku-ti" },
      { id: "ny-13", category: "market", english: "How much is this?", localText: "Ndi ndalama zingati? / Ndi zingati?", phonetic: "n-dee n-dah-lah-mah zeen-gah-tee", syllables: "Ndi nda-la-ma zin-ga-ti" },
      { id: "ny-14", category: "market", english: "Drinking water / Nsima (staple food)", localText: "Madzi akumwa / Nsima", phonetic: "mahd-zee ah-koom-wah / n-see-mah", syllables: "Ma-dzi a-ku-mwa / Nsi-ma" },
      { id: "ny-15", category: "market", english: "The food is very delicious", localText: "Chakudya chakoma kwambiri", phonetic: "chah-kood-yah chah-koh-mah kwahm-bee-ree", syllables: "Cha-ku-dya cha-ko-ma kwam-bi-ri" },
      { id: "ny-16", category: "emergency", english: "Please help me", localText: "Nthandizeni chonde", phonetic: "n-tahn-dee-zeh-nee chohn-deh", syllables: "Nthan-di-ze-ni chon-de" },
      { id: "ny-17", category: "emergency", english: "I am not feeling well", localText: "Sindikumva bwino", phonetic: "seen-dee-koom-vah bwee-noh", syllables: "Sin-di-kum-va bwi-no" }
    ]
  },
  {
    code: "tonga",
    name: "Tonga (Chitonga)",
    nativeName: "ChiTonga",
    primaryProvinces: ["Southern Province", "Western Province"],
    regionLabel: "Southern Province (Livingstone, Victoria Falls, Choma, Monze, Lake Kariba)",
    speakerCount: "2.3 Million+",
    description: "The indigenous language of Southern Zambia, home to Livingstone, Victoria Falls (Mosi-oa-Tunya), Choma, Namwala, and Lake Kariba.",
    culturalEtiquette: [
      "A slight head bow when greeting is a traditional sign of deep respect (Bulemu).",
      "Address elders politely as 'Taata' (Father/Sir) or 'Maama' (Mother/Madam).",
      "Showing reverence at sacred gorges, shrines, and the Victoria Falls brings heartfelt goodwill."
    ],
    phrases: [
      { id: "to-1", category: "greetings", english: "How are you? / Greetings", localText: "Mwapona buti?", phonetic: "mwah-poh-nah boo-tee", syllables: "Mwa-po-na bu-ti", culturalNote: "General respectful Tonga greeting across Southern Province." },
      { id: "to-2", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwabuka buti?", phonetic: "mwah-boo-kah boo-tee", syllables: "Mwa-bu-ka bu-ti", culturalNote: "Standard morning greeting in Livingstone and rural Southern Zambia." },
      { id: "to-3", category: "greetings", english: "Good afternoon / How is the day?", localText: "Mwaswela buti?", phonetic: "mwah-sweh-lah boo-tee", syllables: "Mwa-swe-la bu-ti", culturalNote: "Polite afternoon greeting." },
      { id: "to-4", category: "greetings", english: "I am fine / We woke well", localText: "Kabotu / Twabuka kabotu", phonetic: "kah-boh-too / twah-boo-kah kah-boh-too", syllables: "Ka-bo-tu / Twa-bu-ka ka-bo-tu" },
      { id: "to-5", category: "greetings", english: "Thank you", localText: "Twalumba", phonetic: "twah-loom-bah", syllables: "Twa-lum-ba", culturalNote: "Universal word of appreciation in Tonga." },
      { id: "to-6", category: "greetings", english: "Thank you very much", localText: "Twalumba kapati", phonetic: "twah-loom-bah kah-pah-tee", syllables: "Twa-lum-ba ka-pa-ti", culturalNote: "Widely used in Livingstone markets and craft stalls." },
      { id: "to-7", category: "greetings", english: "Welcome / You are welcome", localText: "Mwatambula / Mwamusangana", phonetic: "mwah-tahm-boo-lah / mwah-moo-sahn-gah-nah", syllables: "Mwa-tam-bu-la", culturalNote: "Warm welcome to guests and tourists." },
      { id: "to-8", category: "greetings", english: "Goodbye (to person staying / Stay peacefully)", localText: "Mukakkale kabotu", phonetic: "moo-kahk-kah-leh kah-boh-too", syllables: "Mu-kak-ka-le ka-bo-tu" },
      { id: "to-9", category: "greetings", english: "Goodbye (to traveler / Travel safely)", localText: "Mweende kabotu", phonetic: "mwehn-deh kah-boh-too", syllables: "Mween-de ka-bo-tu" },
      { id: "to-10", category: "safari", english: "The Smoke that Thunders (Victoria Falls)", localText: "Mosi-oa-Tunya", phonetic: "moh-see oh-ah toon-yah", syllables: "Mo-si-oa-Tu-nya", literalMeaning: "The smoke that sounds/thunders." },
      { id: "to-11", category: "safari", english: "Lion / Elephant / Leopard / Hippo", localText: "Syumbwa / Muzovu / Siluwe / Mvubu", phonetic: "shoom-bwah / moo-zoh-voo / see-loo-weh / m-voo-boo", syllables: "Syum-bwa / Mu-zo-vu / Si-lu-we / Mvu-bu" },
      { id: "to-12", category: "navigation", english: "Where is the way to...?", localText: "Kuli kuli nzila iya ku...?", phonetic: "koo-lee koo-lee n-zee-lah ee-yah koo", syllables: "Ku-li ku-li nzi-la i-ya ku" },
      { id: "to-13", category: "market", english: "How much is this craft?", localText: "Mali nzi eeci?", phonetic: "mah-lee n-zee eh-chee", syllables: "Ma-li nzi ee-ci" },
      { id: "to-14", category: "market", english: "Drinking water / Nshima", localText: "Maansi aakunywa / Inshima", phonetic: "mahn-see ah-koon-wah / een-shee-mah", syllables: "Maan-si aa-ku-nywa / In-shi-ma" },
      { id: "to-15", category: "emergency", english: "Please help me", localText: "Ndigwasye kuli luse / Amundigwasye", phonetic: "n-dee-gwah-syeh koo-lee loo-seh", syllables: "Ndi-gwa-sye ku-li lu-se" }
    ]
  },
  {
    code: "lozi",
    name: "Lozi (Silozi)",
    nativeName: "SiLozi",
    primaryProvinces: ["Western Province", "Southern Province"],
    regionLabel: "Western Province (Barotseland, Mongu, Senanga, Sesheke)",
    speakerCount: "1.4 Million+",
    description: "The language of the Lozi people of the upper Zambezi floodplain (Barotseland). Used throughout Mongu, Senanga, Sesheke, and during the world-famous Kuomboka royal ceremony.",
    culturalEtiquette: [
      "Clap hands softly three times (Kushowelela) when greeting royal elders or traditional chiefs.",
      "Address adult men respectfully as 'Bo-tate' and adult women as 'Bo-ma'.",
      "During Kuomboka, show highest reverence toward the Litunga's royal procession."
    ],
    phrases: [
      { id: "lz-1", category: "greetings", english: "Hello / Respectful greetings", localText: "Mulumuhelwi bo-tate / bo-ma", phonetic: "moo-loo-moo-hehl-wee boh-tah-teh / boh-mah", syllables: "Mu-lu-mu-hel-wi bo-ta-te", culturalNote: "Respectful universal greeting addressed to elders or hosts." },
      { id: "lz-2", category: "greetings", english: "Good morning / Did you wake up well?", localText: "Mu zuhile hande?", phonetic: "moo zoo-hee-leh hahn-deh", syllables: "Mu zu-hi-le han-de", culturalNote: "Standard morning greeting in Barotseland." },
      { id: "lz-3", category: "greetings", english: "Good afternoon / Did you spend day well?", localText: "Mu tozi hande?", phonetic: "moo toh-zee hahn-deh", syllables: "Mu to-zi han-de", culturalNote: "Polite afternoon greeting." },
      { id: "lz-4", category: "greetings", english: "I woke well, thank you", localText: "Ni zuhile hande, lu itumezi", phonetic: "nee zoo-hee-leh hahn-deh, loo ee-too-meh-zee", syllables: "Ni zu-hi-le han-de, lu i-tu-me-zi" },
      { id: "lz-5", category: "greetings", english: "Thank you", localText: "Ni itumezi", phonetic: "nee ee-too-meh-zee", syllables: "Ni i-tu-me-zi", culturalNote: "Standard word for thank you in Silozi." },
      { id: "lz-6", category: "greetings", english: "Thank you very much", localText: "Lu itumezi hahulu", phonetic: "loo ee-too-meh-zee hah-hoo-loo", syllables: "Lu i-tu-me-zi ha-hu-lu", culturalNote: "Deep gratitude to a host or elder." },
      { id: "lz-7", category: "greetings", english: "Welcome / You are received", localText: "Mu amuhezwi", phonetic: "moo ah-moo-hehz-wee", syllables: "Mu a-mu-hez-wi", culturalNote: "Traditional warm welcome." },
      { id: "lz-8", category: "greetings", english: "Goodbye (to person staying / Stay well)", localText: "Mu siyale hande", phonetic: "moo see-yah-leh hahn-deh", syllables: "Mu si-ya-le han-de" },
      { id: "lz-9", category: "greetings", english: "Goodbye (to traveler / Go safely)", localText: "Mu zamaye hande", phonetic: "moo zah-mah-yeh hahn-deh", syllables: "Mu za-ma-ye han-de" },
      { id: "lz-10", category: "safari", english: "The Zambezi River", localText: "Nuka ya Lyambai", phonetic: "noo-kah yah lyahm-bye", syllables: "Nu-ka ya Lyam-bai", literalMeaning: "The ancestral Barotse name for the great Zambezi." },
      { id: "lz-11", category: "safari", english: "Lion / Elephant / Hippo", localText: "Tau / Tou / Kubu", phonetic: "tah-oo / toh-oo / koo-boo", syllables: "Tau / Tou / Ku-bu" },
      { id: "lz-12", category: "navigation", english: "Where is...?", localText: "I kai...?", phonetic: "ee kye", syllables: "I kai" },
      { id: "lz-13", category: "market", english: "How much is this?", localText: "Ki bukai se? / Ki masheleñi ama kai?", phonetic: "kee boo-kye seh / kee mah-sheh-leh-nyee ah-mah kye", syllables: "Ki bu-kai se" },
      { id: "lz-14", category: "market", english: "Drinking water / Food (Nshima / Buhobe)", localText: "Mezi a kunwa / Buhobe (Lico)", phonetic: "meh-zee ah koon-wah / boo-hoh-beh", syllables: "Me-zi a kun-wa / Bu-ho-be" },
      { id: "lz-15", category: "emergency", english: "Please help me", localText: "Mu ni tuse shangwe", phonetic: "moo nee too-seh shahng-weh", syllables: "Mu ni tu-se shang-we" }
    ]
  },
  {
    code: "lunda",
    name: "Lunda (Chilunda)",
    nativeName: "ChiLunda",
    primaryProvinces: ["North-Western Province", "Copperbelt Province"],
    regionLabel: "North-Western (Mwinilunga, Ikelenge, Zambezi Source, Solwezi)",
    speakerCount: "800,000+",
    description: "The language of the ancient Lunda Kingdom, spoken around the sacred Zambezi River Source in Mwinilunga and celebrated during the Lunda Lubanza royal ceremony.",
    culturalEtiquette: [
      "Gently touch the chest or clap softly when greeting elders as a sign of deep respect.",
      "Address elders politely as 'Mwami' or 'Mwanami' (Sir/Elder).",
      "The Zambezi River Source is regarded as a sacred heritage sanctuary; treat guides with honor."
    ],
    phrases: [
      { id: "lu-1", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwananguka mwani?", phonetic: "mwah-nahn-goo-kah mwah-nee", syllables: "Mwa-nan-gu-ka mwa-ni", culturalNote: "Standard polite Lunda morning greeting." },
      { id: "lu-2", category: "greetings", english: "How are you? / Greetings", localText: "Mudi ñahi mwani?", phonetic: "moo-dee nyah-hee mwah-nee", syllables: "Mu-di nya-hi mwa-ni", culturalNote: "Polite greeting used throughout the day." },
      { id: "lu-3", category: "greetings", english: "I woke well / I am fine", localText: "Nananguka chachiwahi mwani", phonetic: "nah-nahn-goo-kah chah-chee-wah-hee mwah-nee", syllables: "Na-nan-gu-ka cha-chi-wa-hi mwa-ni" },
      { id: "lu-4", category: "greetings", english: "Thank you", localText: "Twasakilila mwani", phonetic: "twah-sah-kee-lee-lah mwah-nee", syllables: "Twa-sa-ki-li-la mwa-ni", culturalNote: "Standard word of gratitude in Chilunda." },
      { id: "lu-5", category: "greetings", english: "Thank you very much", localText: "Twasakilila nankashi mwani", phonetic: "twah-sah-kee-lee-lah nahn-kah-shee mwah-nee", syllables: "Twa-sa-ki-li-la nan-ka-shi mwa-ni" },
      { id: "lu-6", category: "greetings", english: "Welcome / Come in", localText: "Enzenu mwani / Mwaza dehi", phonetic: "ehn-zeh-noo mwah-nee / mwah-zah deh-hee", syllables: "En-ze-nu mwa-ni" },
      { id: "lu-7", category: "greetings", english: "Goodbye (to person staying / Stay well)", localText: "Shalenu chachiwahi mwani", phonetic: "shah-leh-noo chah-chee-wah-hee mwah-nee", syllables: "Sha-le-nu cha-chi-wa-hi mwa-ni" },
      { id: "lu-8", category: "greetings", english: "Goodbye (to traveler / Travel safely)", localText: "Yenu chachiwahi mwani", phonetic: "yeh-noo chah-chee-wah-hee mwah-nee", syllables: "Ye-nu cha-chi-wa-hi mwa-ni" },
      { id: "lu-9", category: "safari", english: "Source of the Zambezi River", localText: "Nsulu ya Kalwiji Yezambezi", phonetic: "n-soo-loo yah kah-lwee-jee yeh-zahm-beh-zee", syllables: "Nsu-lu ya Ka-lwi-ji Ye-zam-be-zi", literalMeaning: "The freshwater spring source of the Zambezi River." },
      { id: "lu-10", category: "market", english: "How much is this?", localText: "Chidi nakingahi?", phonetic: "chee-dee nah-keen-gah-hee", syllables: "Chi-di na-kin-ga-hi" },
      { id: "lu-11", category: "market", english: "Drinking water / Food", localText: "Meji akunwa / Yakuda", phonetic: "meh-jee ah-koon-wah / yah-koo-dah", syllables: "Me-ji a-kun-wa / Ya-ku-da" },
      { id: "lu-12", category: "emergency", english: "Please help me", localText: "Nkwashiku mwani", phonetic: "n-kwah-shee-koo mwah-nee", syllables: "Nkwa-shi-ku mwa-ni" }
    ]
  },
  {
    code: "luvale",
    name: "Luvale (Chiluvale)",
    nativeName: "ChiLuvale",
    primaryProvinces: ["North-Western Province", "Western Province"],
    regionLabel: "North-Western & Western (Zambezi District, Chavuma, Mize)",
    speakerCount: "700,000+",
    description: "The vibrant language of the Luvale people along the upper Zambezi in Chavuma and Zambezi District, world-famous for the UNESCO-inscribed Likumbi Lya Mize festival and sacred Makishi masquerade.",
    culturalEtiquette: [
      "Makishi masked spirits (Likishi) represent ancestral guardians and must be treated with reverence during cultural rituals.",
      "Say 'Shikenu mwane' when entering a village or homestead as a formal greeting of peace.",
      "Always ask permission before photographing sacred masks or traditional initiation regalia."
    ],
    phrases: [
      { id: "lv-1", category: "greetings", english: "Hello / Peace to you", localText: "Shikenu mwane", phonetic: "shee-keh-noo mwah-neh", syllables: "Shi-ke-nu mwa-ne", culturalNote: "The universal respectful Luvale greeting." },
      { id: "lv-2", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwalauka ngachilihi mwane?", phonetic: "mwah-lah-oo-kah n-gah-chee-lee-hee mwah-neh", syllables: "Mwa-la-u-ka nga-chi-li-hi mwa-ne", culturalNote: "Polite morning greeting." },
      { id: "lv-3", category: "greetings", english: "How are you doing?", localText: "Munahanduka ngachilihi?", phonetic: "moo-nah-hahn-doo-kah n-gah-chee-lee-hee", syllables: "Mu-na-han-du-ka nga-chi-li-hi" },
      { id: "lv-4", category: "greetings", english: "I am fine / Peaceful", localText: "Ngunahanduka kanawa", phonetic: "n-goo-nah-hahn-doo-kah kah-nah-wah", syllables: "Ngu-na-han-du-ka ka-na-wa" },
      { id: "lv-5", category: "greetings", english: "Thank you", localText: "Tunasakwilila mwane", phonetic: "too-nah-sah-kwee-lee-lah mwah-neh", syllables: "Tu-na-sa-kwi-li-la mwa-ne" },
      { id: "lv-6", category: "greetings", english: "Thank you very much", localText: "Tunasakwilila chikuma mwane", phonetic: "too-nah-sah-kwee-lee-lah chee-koo-mah mwah-neh", syllables: "Tu-na-sa-kwi-li-la chi-ku-ma mwa-ne" },
      { id: "lv-7", category: "greetings", english: "Welcome to our village", localText: "Mwazeza mwane / Tambukenu", phonetic: "mwah-zeh-zah mwah-neh / tahm-boo-keh-noo", syllables: "Mwa-ze-za mwa-ne" },
      { id: "lv-8", category: "greetings", english: "Goodbye (to person staying / Stay well)", localText: "Salenuho kanawa mwane", phonetic: "sah-leh-noo-hoh kah-nah-wah mwah-neh", syllables: "Sa-le-nu-ho ka-na-wa mwa-ne" },
      { id: "lv-9", category: "greetings", english: "Goodbye (to traveler / Travel safely)", localText: "Yenuho kanawa mwane", phonetic: "yeh-noo-hoh kah-nah-wah mwah-neh", syllables: "Ye-nu-ho ka-na-wa mwa-ne" },
      { id: "lv-10", category: "culture", english: "Sacred Makishi Spirit Mask", localText: "Likishi lya Mukanda", phonetic: "lee-kee-shee lyah moo-kahn-dah", syllables: "Li-ki-shi lya Mu-kan-da", literalMeaning: "Ancestral masked spirit of the Mukanda cultural institution." },
      { id: "lv-11", category: "safari", english: "Crossing the river", localText: "Zambukenu kalwiji", phonetic: "zahm-boo-keh-noo kah-lwee-jee", syllables: "Zam-bu-ke-nu ka-lwi-ji" },
      { id: "lv-12", category: "market", english: "How much is this carving?", localText: "Chingahi chino?", phonetic: "cheen-gah-hee chee-noh", syllables: "Chin-ga-hi chi-no" },
      { id: "lv-13", category: "market", english: "Drinking water / Food", localText: "Meya akunwa / Kulya", phonetic: "meh-yah ah-koon-wah / kool-yah", syllables: "Me-ya a-kun-wa / Ku-lya" },
      { id: "lv-14", category: "emergency", english: "Please help me", localText: "Ngukwasenuho mwane", phonetic: "n-goo-kwah-seh-noo-hoh mwah-neh", syllables: "Ngu-kwa-se-nu-ho mwa-ne" }
    ]
  },
  {
    code: "kaonde",
    name: "Kaonde (KiKaonde)",
    nativeName: "KiKaonde",
    primaryProvinces: ["North-Western Province", "Central Province"],
    regionLabel: "North-Western & Central (Solwezi, Kasempa, Mumbwa, Kifubwa)",
    speakerCount: "900,000+",
    description: "Spoken across Solwezi, Kasempa, and Mumbwa. Home to the Kifubwa prehistoric rock art stream, Kansanshi, and the famous Ntongo and Kufukwila traditional cultural ceremonies.",
    culturalEtiquette: [
      "Say 'Mwaingilanyi mwani' (How are you spending the day/working) as a warm, respectful greeting.",
      "Add 'Mwani' at the end of statements as a polite honorific (equivalent to 'Sir/Madam').",
      "Clap hands gently when expressing gratitude to elders and hosts."
    ],
    phrases: [
      { id: "kd-1", category: "greetings", english: "Hello / How are you?", localText: "Mwaingilanyi mwani?", phonetic: "mwah-een-gee-lah-nyee mwah-nee", syllables: "Mwai-ngi-la-nyi mwa-ni", culturalNote: "Respectful Kaonde greeting used throughout Solwezi and Kasempa." },
      { id: "kd-2", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwalangukanyi mwani?", phonetic: "mwah-lahn-goo-kah-nyee mwah-nee", syllables: "Mwa-la-ngu-ka-nyi mwa-ni", culturalNote: "Standard morning greeting." },
      { id: "kd-3", category: "greetings", english: "I am fine / We are well", localText: "Twaingila bulongo mwani", phonetic: "twah-een-gee-lah boo-lohn-goh mwah-nee", syllables: "Twai-ngi-la bu-lon-go mwa-ni" },
      { id: "kd-4", category: "greetings", english: "Thank you", localText: "Twasanta mwani", phonetic: "twah-sahn-tah mwah-nee", syllables: "Twa-san-ta mwa-ni", culturalNote: "Standard word for thank you in Kikaonde." },
      { id: "kd-5", category: "greetings", english: "Thank you very much", localText: "Twasanta bingi mwani", phonetic: "twah-sahn-tah been-gee mwah-nee", syllables: "Twa-san-ta bin-gi mwa-ni", culturalNote: "Deep gratitude to a host." },
      { id: "kd-6", category: "greetings", english: "Welcome / Come inside", localText: "Mwatwelanyi mwani", phonetic: "mwah-tweh-lah-nyee mwah-nee", syllables: "Mwa-twe-la-nyi mwa-ni" },
      { id: "kd-7", category: "greetings", english: "Goodbye (to person staying / Stay well)", localText: "Shalaipo bulongo mwani", phonetic: "shah-lah-ee-poh boo-lohn-goh mwah-nee", syllables: "Sha-lai-po bu-lon-go mwa-ni" },
      { id: "kd-8", category: "greetings", english: "Goodbye (to traveler / Go safely)", localText: "Yangaipo bulongo mwani", phonetic: "yahn-gah-ee-poh boo-lohn-goh mwah-nee", syllables: "Yan-gai-po bu-lon-go mwa-ni" },
      { id: "kd-9", category: "safari", english: "Prehistoric Rock Art / Cave", localText: "Mabwe a kala a Kifubwa", phonetic: "mah-bweh ah kah-lah ah kee-foob-wah", syllables: "Ma-bwe a ka-la a Ki-fu-bwa" },
      { id: "kd-10", category: "safari", english: "Lion / Elephant / Leopard", localText: "Bokwe / Nzovu / Mukenge", phonetic: "boh-kweh / n-zoh-voo / moo-kehn-geh", syllables: "Bo-kwe / Nzo-vu / Mu-ken-ge" },
      { id: "kd-11", category: "market", english: "How much is this?", localText: "Mali anga ano?", phonetic: "mah-lee ahn-gah ah-noh", syllables: "Ma-li an-ga a-no" },
      { id: "kd-12", category: "market", english: "Drinking water / Food", localText: "Mema akunwa / Kajo", phonetic: "meh-mah ah-koon-wah / kah-joh", syllables: "Me-ma a-kun-wa / Ka-jo" },
      { id: "kd-13", category: "emergency", english: "Please help me", localText: "Nkwashai mwani", phonetic: "n-kwah-shah-ee mwah-nee", syllables: "Nkwa-shai mwa-ni" }
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

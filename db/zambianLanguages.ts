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
  // ================= 1. BEMBA (Ichibemba) =================
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
      { id: "bm-hello", category: "greetings", english: "Hello / General Greeting", localText: "Muli Shani", phonetic: "moo-lee shah-nee", syllables: "Mu-li Sha-ni", culturalNote: "The universal greeting across Bemba-speaking regions." },
      { id: "bm-how-informal", category: "greetings", english: "How are you? (Informal / Friends)", localText: "Uli shani?", phonetic: "oo-lee shah-nee", syllables: "U-li sha-ni", culturalNote: "Used among peers, friends, and younger people." },
      { id: "bm-how-polite", category: "greetings", english: "How are you? (Polite / Respectful)", localText: "Muli shani!", phonetic: "moo-lee shah-nee", syllables: "Mu-li sha-ni!", culturalNote: "Polite greeting for elders, professionals, and visitors." },
      { id: "bm-name", category: "greetings", english: "My name is...", localText: "Ishina lyandi ni ne...", phonetic: "ee-shee-nah lyahn-dee nee neh...", syllables: "I-shi-na lyan-di ni ne...", literalMeaning: "My name is indeed..." },
      { id: "bm-bye-informal", category: "greetings", english: "Goodbye / Stay well (Informal)", localText: "Shalapo", phonetic: "shah-lah-poh", syllables: "Sha-la-po", culturalNote: "Said when departing among peers." },
      { id: "bm-bye-polite", category: "greetings", english: "Goodbye / Stay well (Polite / Respectful)", localText: "Shalenipo mukwai", phonetic: "shah-leh-nee-poh moo-kwhy", syllables: "Sha-le-ni-po mu-kwai", culturalNote: "Formal farewell wishing peace to hosts or elders." },
      { id: "bm-thanks-informal", category: "greetings", english: "Thank you (Informal)", localText: "Natotela", phonetic: "nah-toh-teh-lah", syllables: "Na-to-te-la", culturalNote: "Everyday expression of gratitude." },
      { id: "bm-thanks-polite", category: "greetings", english: "Thank you (Polite / Respectful)", localText: "Natotela mukwai", phonetic: "nah-toh-teh-lah moo-kwhy", syllables: "Na-to-te-la mu-kwai", culturalNote: "Standard polite gratitude with respectful honorific." },
      { id: "bm-morning", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwaukeni mukwai?", phonetic: "mwah-oo-keh-nee moo-kwhy", syllables: "Mwa-u-ke-ni mu-kwai", culturalNote: "Traditional morning greeting used before midday." },
      { id: "bm-welcome", category: "greetings", english: "Welcome (to visitors)", localText: "Mwaiseni mukwai", phonetic: "mwah-ee-seh-nee moo-kwhy", syllables: "Mwai-se-ni mu-kwai", culturalNote: "Warm hospitality welcome spoken to guests." },
      { id: "bm-safari-waterfall", category: "safari", english: "The waterfall is magnificent", localText: "Icipoma ici cili cisuma sana", phonetic: "ee-chee-poh-mah ee-chee chee-lee chee-soo-mah sah-nah", syllables: "I-ci-po-ma i-ci ci-li ci-su-ma sa-na", literalMeaning: "This great waterfall is very beautiful." },
      { id: "bm-safari-animals", category: "safari", english: "Lion / Elephant / Leopard", localText: "Inkalamo / Insofu / Imbwili", phonetic: "een-kah-lah-moh / een-soh-foo / eem-bwee-lee", syllables: "In-ka-la-mo / In-so-fu / Im-bwi-li" },
      { id: "bm-market-price", category: "market", english: "How much is this?", localText: "Shinga ici mukwai?", phonetic: "sheen-gah ee-chee moo-kwhy", syllables: "Shin-ga i-ci mu-kwai" },
      { id: "bm-emergency-help", category: "emergency", english: "Please help me", localText: "Nafweni mukwai / Njangweniko", phonetic: "nah-fweh-nee moo-kwhy / n-jahng-weh-nee-koh", syllables: "Na-fwe-ni mu-kwai" }
    ]
  },

  // ================= 2. NYANJA / CHEWA (Chinyanja) =================
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
      "Say 'Dzikomo' freely—it is the universal Zambian word for thank you, excuse me, and pardon."
    ],
    phrases: [
      { id: "ny-hello", category: "greetings", english: "Hello / General Greeting", localText: "Bwanji", phonetic: "bwah-njee", syllables: "Bwa-nji", culturalNote: "Everyday greeting in markets and streets." },
      { id: "ny-how-informal", category: "greetings", english: "How are you? (Informal / Peers)", localText: "Uli bwanji?", phonetic: "oo-lee bwah-njee", syllables: "U-li bwa-nji?", culturalNote: "Informal greeting for friends." },
      { id: "ny-how-polite", category: "greetings", english: "How are you? (Polite / Respectful)", localText: "Muli bwanji!", phonetic: "moo-lee bwah-njee!", syllables: "Mu-li bwa-nji!", culturalNote: "The standard respectful greeting across Lusaka & Eastern Zambia." },
      { id: "ny-name", category: "greetings", english: "My name is...", localText: "Dzina langa ndine...", phonetic: "dzee-nah lahn-gah n-dee-neh...", syllables: "Dzi-na lan-ga ndi-ne...", literalMeaning: "My name I am..." },
      { id: "ny-bye", category: "greetings", english: "Goodbye (Go well / Stay well)", localText: "Pitani bwino / Salani bwino", phonetic: "pee-tah-nee bwee-noh / sah-lah-nee bwee-noh", syllables: "Pi-ta-ni bwi-no / Sa-la-ni bwi-no", culturalNote: "Pitani bwino (go well); Salani bwino (stay well)." },
      { id: "ny-thanks-informal", category: "greetings", english: "Thank you (Informal)", localText: "Dzikomo", phonetic: "dzee-koh-moh", syllables: "Dzi-ko-mo", culturalNote: "Universal expression of thanks." },
      { id: "ny-thanks-polite", category: "greetings", english: "Thank you (Polite / Very much)", localText: "Dzikomo kwambiri", phonetic: "dzee-koh-moh kwahm-bee-ree", syllables: "Dzi-ko-mo kwam-bi-ri", culturalNote: "Deep gratitude for hospitality or service." },
      { id: "ny-morning", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwauka bwanji?", phonetic: "mwah-oo-kah bwah-njee", syllables: "Mwa-u-ka bwa-nji" },
      { id: "ny-fine", category: "greetings", english: "I am fine, thank you", localText: "Ndili bwino, dzikomo", phonetic: "n-dee-lee bwee-noh, dzee-koh-moh", syllables: "Ndi-li bwi-no, dzi-ko-mo" },
      { id: "ny-safari-walk", category: "safari", english: "Walking Safari / Bush walk", localText: "Kuyenda m'thengo", phonetic: "koo-yen-dah m-ten-goh", syllables: "Ku-yen-da m-then-go", culturalNote: "Signature South Luangwa walking safari exploration." },
      { id: "ny-safari-animals", category: "safari", english: "Lion / Elephant / Leopard", localText: "Mkango / Njobvu / Nyalugwe", phonetic: "m-kahn-goh / n-johb-voo / nyah-loog-weh", syllables: "M-kan-go / Njo-bvu / Nya-lu-gwe" },
      { id: "ny-market-price", category: "market", english: "How much is this?", localText: "Ndi ndalama zingati? / Ndi zingati?", phonetic: "n-dee n-dah-lah-mah zeen-gah-tee", syllables: "Ndi nda-la-ma zin-ga-ti" },
      { id: "ny-emergency-help", category: "emergency", english: "Please help me", localText: "Nthandizeni chonde", phonetic: "n-tahn-dee-zeh-nee chohn-deh", syllables: "Nthan-di-ze-ni chon-de" }
    ]
  },

  // ================= 3. TONGA (Chitonga) =================
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
      { id: "to-hello-informal", category: "greetings", english: "Hello (Informal / Casual)", localText: "Wapona", phonetic: "wah-poh-nah", syllables: "Wa-po-na", culturalNote: "Casual greeting among friends." },
      { id: "to-hello-polite", category: "greetings", english: "Hello (Polite / Respectful)", localText: "Mwapona", phonetic: "mwah-poh-nah", syllables: "Mwa-po-na", culturalNote: "Standard respectful greeting across Southern Province." },
      { id: "to-how-polite", category: "greetings", english: "How are you? (Polite)", localText: "Muli buti?", phonetic: "moo-lee boo-tee", syllables: "Mu-li bu-ti?", culturalNote: "Polite inquiry of someone's wellbeing." },
      { id: "to-name", category: "greetings", english: "My name is...", localText: "Izyina lyangu ndime...", phonetic: "ee-zyee-nah lyahn-goo n-dee-meh...", syllables: "I-zyi-na lyan-gu ndi-me...", literalMeaning: "My name I am..." },
      { id: "to-bye", category: "greetings", english: "Goodbye (Stay well / Peacefully)", localText: "Muchaale kabotu", phonetic: "moo-chah-leh kah-boh-too", syllables: "Mu-chaa-le ka-bo-tu", culturalNote: "Traditional Tonga farewell blessing." },
      { id: "to-thanks-informal", category: "greetings", english: "Thank you (Informal / Individual)", localText: "Ndalumba", phonetic: "n-dah-loom-bah", syllables: "Nda-lum-ba", culturalNote: "I thank you." },
      { id: "to-thanks-polite", category: "greetings", english: "Thank you (Polite / Collective)", localText: "Twalumba / Twalumba kapati", phonetic: "twah-loom-bah / twah-loom-bah kah-pah-tee", syllables: "Twa-lum-ba / Twa-lum-ba ka-pa-ti", culturalNote: "We thank you / Thank you very much." },
      { id: "to-morning", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwabuka buti?", phonetic: "mwah-boo-kah boo-tee", syllables: "Mwa-bu-ka bu-ti" },
      { id: "to-vic-falls", category: "safari", english: "The Smoke that Thunders (Victoria Falls)", localText: "Mosi-oa-Tunya", phonetic: "moh-see oh-ah toon-yah", syllables: "Mo-si-oa-Tu-nya", literalMeaning: "The smoke that sounds/thunders." },
      { id: "to-safari-animals", category: "safari", english: "Lion / Elephant / Leopard / Hippo", localText: "Syumbwa / Muzovu / Siluwe / Mvubu", phonetic: "shoom-bwah / moo-zoh-voo / see-loo-weh / m-voo-boo", syllables: "Syum-bwa / Mu-zo-vu / Si-lu-we / Mvu-bu" },
      { id: "to-market-price", category: "market", english: "How much is this craft?", localText: "Mali nzi eeci?", phonetic: "mah-lee n-zee eh-chee", syllables: "Ma-li nzi ee-ci" },
      { id: "to-emergency-help", category: "emergency", english: "Please help me", localText: "Ndigwasye kuli luse / Amundigwasye", phonetic: "n-dee-gwah-syeh koo-lee loo-seh", syllables: "Ndi-gwa-sye ku-li lu-se" }
    ]
  },

  // ================= 4. LOZI (Silozi) =================
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
      { id: "lz-hello-general", category: "greetings", english: "Hello (General Greeting / Affirmation)", localText: "Eeni, sha", phonetic: "eh-nee shah", syllables: "Ee-ni, sha", culturalNote: "Warm, universally acknowledged Barotse greeting." },
      { id: "lz-hello-informal", category: "greetings", english: "Hello (Informal / Friendly)", localText: "Lumela", phonetic: "loo-meh-lah", syllables: "Lu-me-la", culturalNote: "Informal greeting among peers." },
      { id: "lz-hello-polite", category: "greetings", english: "Hello (Polite / Respectful to Elders)", localText: "Mu lumeleng' sha", phonetic: "moo loo-meh-leng shah", syllables: "Mu lu-me-leng sha", culturalNote: "Respectful plural/honorific greeting." },
      { id: "lz-name", category: "greetings", english: "My name is...", localText: "K'i na...", phonetic: "kee nah...", syllables: "K'i na...", literalMeaning: "It is I..." },
      { id: "lz-bye-informal", category: "greetings", english: "Goodbye / Stay here (Informal)", localText: "Siyala foo", phonetic: "see-yah-lah foh", syllables: "Si-ya-la foo", culturalNote: "Said to someone staying." },
      { id: "lz-bye-polite", category: "greetings", english: "Goodbye / Stay here (Polite / Respectful)", localText: "Basyale foo", phonetic: "bah-syah-leh foh", syllables: "Ba-sya-le foo", culturalNote: "Polite farewell addressed to elders." },
      { id: "lz-thanks-informal", category: "greetings", english: "Thank you (Informal)", localText: "Luitumezi", phonetic: "loo-ee-too-meh-zee", syllables: "Lu-i-tu-me-zi", culturalNote: "We thank you." },
      { id: "lz-thanks-polite", category: "greetings", english: "Thank you (Polite / Respectful)", localText: "Luitumezi shangwe", phonetic: "loo-ee-too-meh-zee shahng-weh", syllables: "Lu-i-tu-me-zi shang-we", culturalNote: "Thank you sir/madam (with deep respect)." },
      { id: "lz-morning", category: "greetings", english: "Good morning / Did you wake up well?", localText: "Mu zuhile cwani? / Mu zuhile hande?", phonetic: "moo zoo-hee-leh chwah-nee", syllables: "Mu zu-hi-le cwa-ni", culturalNote: "Standard morning greeting in Barotseland." },
      { id: "lz-safari-river", category: "safari", english: "The Zambezi River", localText: "Nuka ya Lyambai", phonetic: "noo-kah yah lyahm-bye", syllables: "Nu-ka ya Lyam-bai", literalMeaning: "The ancestral Barotse name for the great Zambezi." },
      { id: "lz-safari-animals", category: "safari", english: "Lion / Elephant / Hippo", localText: "Tau / Tou / Kubu", phonetic: "tah-oo / toh-oo / koo-boo", syllables: "Tau / Tou / Ku-bu" },
      { id: "lz-market-price", category: "market", english: "How much is this?", localText: "Ki bukai se? / Ki masheleñi ama kai?", phonetic: "kee boo-kye seh / kee mah-sheh-leh-nyee ah-mah kye", syllables: "Ki bu-kai se" },
      { id: "lz-emergency-help", category: "emergency", english: "Please help me", localText: "Mu ni tuse shangwe", phonetic: "moo nee too-seh shahng-weh", syllables: "Mu ni tu-se shang-we" }
    ]
  },

  // ================= 5. KIKAONDE (Kaonde) =================
  {
    code: "kaonde",
    name: "Kaonde (KiKaonde)",
    nativeName: "KiKaonde",
    primaryProvinces: ["North-Western Province", "Central Province"],
    regionLabel: "North-Western & Central (Solwezi, Kasempa, Mumbwa, Kifubwa)",
    speakerCount: "900,000+",
    description: "Spoken across Solwezi, Kasempa, and Mumbwa. Home to the Kifubwa prehistoric rock art stream, Kansanshi, and the famous Ntongo and Kufukwila traditional cultural ceremonies.",
    culturalEtiquette: [
      "Say 'Mwaingilanyi mwani' or 'Muji byepi' as a warm, respectful greeting.",
      "Add 'Mwane' or 'Mwani' at the end of statements as a polite honorific (Sir/Madam).",
      "Clap hands gently when expressing gratitude to elders and hosts."
    ],
    phrases: [
      { id: "kd-hello-informal", category: "greetings", english: "Hello (Informal)", localText: "Byepi?", phonetic: "byeh-pee?", syllables: "Bye-pi?", culturalNote: "Casual greeting among friends." },
      { id: "kd-hello-polite", category: "greetings", english: "Hello (Polite / Respectful)", localText: "Muji byepi", phonetic: "moo-jee byeh-pee", syllables: "Mu-ji bye-pi", culturalNote: "Respectful greeting." },
      { id: "kd-how-informal", category: "greetings", english: "How are you? (Informal)", localText: "Muji byepi?", phonetic: "moo-jee byeh-pee?", syllables: "Mu-ji bye-pi?", culturalNote: "Everyday inquiry of wellbeing." },
      { id: "kd-how-polite", category: "greetings", english: "How are you? (Polite / Respectful to Elders)", localText: "Baji byepi mwane?", phonetic: "bah-jee byeh-pee mwah-neh?", syllables: "Ba-ji bye-pi mwa-ne?", culturalNote: "Formal honorific greeting for elders and dignitaries." },
      { id: "kd-name", category: "greetings", english: "My name is...", localText: "Jizhina jami yami...", phonetic: "jee-zhee-nah jah-mee yah-mee...", syllables: "Ji-zhi-na ja-mi ya-mi...", literalMeaning: "My name is I..." },
      { id: "kd-bye-informal", category: "greetings", english: "Goodbye / Stay well (Informal)", localText: "Shalaipo", phonetic: "shah-lah-ee-poh", syllables: "Sha-lai-po", culturalNote: "Casual departure farewell." },
      { id: "kd-bye-polite", category: "greetings", english: "Goodbye / Stay well (Polite / Respectful)", localText: "Shalaipo mwane", phonetic: "shah-lah-ee-poh mwah-neh", syllables: "Sha-lai-po mwa-ne", culturalNote: "Respectful farewell blessing." },
      { id: "kd-thanks-informal", category: "greetings", english: "Thank you (Informal / Very much)", localText: "Nasanta bingi", phonetic: "nah-sahn-tah been-gee", syllables: "Na-san-ta bin-gi", culturalNote: "I thank you very much." },
      { id: "kd-thanks-polite", category: "greetings", english: "Thank you (Polite / Respectful)", localText: "Twasanta mwane", phonetic: "twah-sahn-tah mwah-neh", syllables: "Twa-san-ta mwa-ne", culturalNote: "We thank you with honorific." },
      { id: "kd-morning", category: "greetings", english: "Good morning / How did you wake?", localText: "Mwalangukanyi mwani?", phonetic: "mwah-lahn-goo-kah-nyee mwah-nee", syllables: "Mwa-la-ngu-ka-nyi mwa-ni" },
      { id: "kd-safari-rockart", category: "safari", english: "Prehistoric Rock Art / Cave", localText: "Mabwe a kala a Kifubwa", phonetic: "mah-bweh ah kah-lah ah kee-foob-wah", syllables: "Ma-bwe a ka-la a Ki-fu-bwa" },
      { id: "kd-safari-animals", category: "safari", english: "Lion / Elephant / Leopard", localText: "Bokwe / Nzovu / Mukenge", phonetic: "boh-kweh / n-zoh-voo / moo-kehn-geh", syllables: "Bo-kwe / Nzo-vu / Mu-ken-ge" },
      { id: "kd-market-price", category: "market", english: "How much is this?", localText: "Mali anga ano?", phonetic: "mah-lee ahn-gah ah-noh", syllables: "Ma-li an-ga a-no" },
      { id: "kd-emergency-help", category: "emergency", english: "Please help me", localText: "Nkwashai mwani", phonetic: "n-kwah-shah-ee mwah-nee", syllables: "Nkwa-shai mwa-ni" }
    ]
  },

  // ================= 6. LUVALE (Chiluvale) =================
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
      "Say 'Shikenu mwane' or 'Ngachili mwane' when entering a village or homestead as a formal greeting of peace.",
      "Always ask permission before photographing sacred masks or traditional initiation regalia."
    ],
    phrases: [
      { id: "lv-hello-informal", category: "greetings", english: "Hello (Informal)", localText: "Ngachili?", phonetic: "n-gah-chee-lee?", syllables: "Nga-chi-li?", culturalNote: "Casual greeting among friends in Zambezi & Chavuma." },
      { id: "lv-hello-polite", category: "greetings", english: "Hello (Polite / Respectful)", localText: "Ngachili mwane", phonetic: "n-gah-chee-lee mwah-neh", syllables: "Nga-chi-li mwa-ne", culturalNote: "Respectful greeting with honorific." },
      { id: "lv-how-informal", category: "greetings", english: "How are you? (Informal)", localText: "Ulingachili?", phonetic: "oo-leen-gah-chee-lee?", syllables: "U-li-nga-chi-li?", culturalNote: "Everyday inquiry among peers." },
      { id: "lv-how-polite", category: "greetings", english: "How are you? (Polite / Respectful)", localText: "Muli ngachili mwane?", phonetic: "moo-lee n-gah-chee-lee mwah-neh?", syllables: "Mu-li nga-chi-li mwa-ne?", culturalNote: "Polite inquiry for elders and visitors." },
      { id: "lv-name", category: "greetings", english: "My name is...", localText: "Lijina lyami yami...", phonetic: "lee-jee-nah lyah-mee yah-mee...", syllables: "Li-ji-na lya-mi ya-mi...", literalMeaning: "My name is I..." },
      { id: "lv-bye-informal", category: "greetings", english: "Goodbye / Stay well (Informal)", localText: "Musale kanawa / Tunasalisa / Salenuho", phonetic: "moo-sah-leh kah-nah-wah / too-nah-sah-lee-sah / sah-leh-noo-hoh", syllables: "Mu-sa-le ka-na-wa", culturalNote: "Informal departure farewell." },
      { id: "lv-bye-polite", category: "greetings", english: "Goodbye / Stay well (Polite / Respectful)", localText: "Musale kanawa mwane / Tunasalisa mwane / Salenuho mwane", phonetic: "moo-sah-leh kah-nah-wah mwah-neh", syllables: "Mu-sa-le ka-na-wa mwa-ne", culturalNote: "Respectful farewell blessing to elders." },
      { id: "lv-thanks-informal", category: "greetings", english: "Thank you (Informal)", localText: "Vulye / Tunasakwilila", phonetic: "voo-lyeh / too-nah-sah-kwee-lee-lah", syllables: "Vu-lye / Tu-na-sa-kwi-li-la", culturalNote: "Expression of thanks." },
      { id: "lv-thanks-polite", category: "greetings", english: "Thank you (Polite / Respectful)", localText: "Vulye mwane / Tunasakwilila chikuma mwane", phonetic: "voo-lyeh mwah-neh", syllables: "Vu-lye mwa-ne", culturalNote: "Respectful gratitude." },
      { id: "lv-welcome", category: "greetings", english: "Welcome / Enter peacefully", localText: "Shikenu mwane / Tambukenu", phonetic: "shee-keh-noo mwah-neh", syllables: "Shi-ke-nu mwa-ne" },
      { id: "lv-makishi", category: "culture", english: "Sacred Makishi Spirit Mask", localText: "Likishi lya Mukanda", phonetic: "lee-kee-shee lyah moo-kahn-dah", syllables: "Li-ki-shi lya Mu-kan-da" },
      { id: "lv-safari-river", category: "safari", english: "Crossing the river", localText: "Zambukenu kalwiji", phonetic: "zahm-boo-keh-noo kah-lwee-jee", syllables: "Zam-bu-ke-nu ka-lwi-ji" },
      { id: "lv-market-price", category: "market", english: "How much is this carving?", localText: "Chingahi chino?", phonetic: "cheen-gah-hee chee-noh", syllables: "Chin-ga-hi chi-no" },
      { id: "lv-emergency-help", category: "emergency", english: "Please help me", localText: "Ngukwasenuho mwane", phonetic: "n-goo-kwah-seh-noo-hoh mwah-neh", syllables: "Ngu-kwa-se-nu-ho mwa-ne" }
    ]
  },

  // ================= 7. LUNDA (Chilunda) =================
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
      { id: "lu-hello-informal", category: "greetings", english: "Hello (Informal)", localText: "Ngahi?", phonetic: "n-gah-hee?", syllables: "Nga-hi?", culturalNote: "Casual greeting among peers in Mwinilunga and Ikelenge." },
      { id: "lu-hello-polite", category: "greetings", english: "Hello (Polite / Respectful)", localText: "Ngahi mwani", phonetic: "n-gah-hee mwah-nee", syllables: "Nga-hi mwa-ni", culturalNote: "Respectful opening greeting with honorific." },
      { id: "lu-how-informal", category: "greetings", english: "How are you? (Informal)", localText: "Mudingâhi?", phonetic: "moo-deen-gah-hee?", syllables: "Mu-din-ga-hi?", culturalNote: "Casual wellbeing inquiry." },
      { id: "lu-how-polite", category: "greetings", english: "How are you? (Polite / Respectful)", localText: "Mundingâhi mwani?", phonetic: "moon-deen-gah-hee mwah-nee?", syllables: "Mun-din-ga-hi mwa-ni?", culturalNote: "Respectful inquiry of health and state." },
      { id: "lu-name", category: "greetings", english: "My name is...", localText: "Jina dami yami... / Ami yami...", phonetic: "jee-nah dah-mee yah-mee...", syllables: "Ji-na da-mi ya-mi...", literalMeaning: "My name is I..." },
      { id: "lu-bye-informal", category: "greetings", english: "Goodbye (Informal)", localText: "Chunahi", phonetic: "choo-nah-hee", syllables: "Chu-na-hi", culturalNote: "Casual departure farewell." },
      { id: "lu-bye-polite", category: "greetings", english: "Goodbye (Polite / Respectful)", localText: "Chunahi mwani / Shalenu chachiwahi mwani", phonetic: "choo-nah-hee mwah-nee", syllables: "Chu-na-hi mwa-ni", culturalNote: "Respectful farewell blessing to elders." },
      { id: "lu-thanks-informal", category: "greetings", english: "Thank you (Informal)", localText: "Vudye", phonetic: "voo-dyeh", syllables: "Vu-dye", culturalNote: "Direct word of gratitude." },
      { id: "lu-thanks-polite", category: "greetings", english: "Thank you (Polite / Respectful)", localText: "Vudye mwani / Nasakalili mwani", phonetic: "voo-dyeh mwah-nee / nah-sah-kah-lee-lee mwah-nee", syllables: "Vu-dye mwa-ni", culturalNote: "Formal gratitude with honorific." },
      { id: "lu-welcome", category: "greetings", english: "Welcome / Come in", localText: "Shikenu mwani / Menekenu mwani", phonetic: "shee-keh-noo mwah-nee / meh-neh-keh-noo mwah-nee", syllables: "Shi-ke-nu mwa-ni / Me-ne-ke-nu mwa-ni", culturalNote: "Standard polite welcome to guests and travelers in Chilunda." },
      { id: "lu-morning", category: "greetings", english: "Good morning (in passing)", localText: "Ntetamena mwani", phonetic: "n-teh-tah-meh-nah mwah-nee", syllables: "Nte-ta-me-na mwa-ni" },
      { id: "lu-evening", category: "greetings", english: "Good evening", localText: "Melela mwani", phonetic: "meh-leh-lah mwah-nee", syllables: "Me-le-la mwa-ni" },
      { id: "lu-fine", category: "greetings", english: "I am well / You're welcome", localText: "Nidi chachiwahi / Chachiwahi mwani", phonetic: "nee-dee chah-chee-wah-hee", syllables: "Ni-di cha-chi-wa-hi" },
      { id: "lu-sorry", category: "greetings", english: "I am sorry / Excuse me", localText: "Nanakeni mwani", phonetic: "nyah-nah-keh-nee mwah-nee", syllables: "Nya-na-ke-ni mwa-ni" },
      { id: "lu-yes-no", category: "greetings", english: "Yes / No", localText: "Eña / Nehi", phonetic: "eh-nyah / neh-hee", syllables: "E-nya / Ne-hi" },
      { id: "lu-working", category: "culture", english: "Greeting to people working", localText: "Mukalakalanga mwani", phonetic: "moo-kah-lah-kah-lahn-gah mwah-nee", syllables: "Mu-ka-la-ka-lan-ga mwa-ni", culturalNote: "Respectful encouragement spoken to workers, builders or farmers." },
      { id: "lu-learning", category: "culture", english: "I am trying to learn to speak Lunda!", localText: "Ami nakufwila kudiza kuhosha Lunda!", phonetic: "ah-mee nah-koo-fwee-lah koo-dee-zah koo-hoh-shah loon-dah", syllables: "A-mi na-ku-fwi-la ku-di-za ku-ho-sha Lun-da" },
      { id: "lu-slowly", category: "navigation", english: "Speak slowly please", localText: "Hoshaku chovu mwani", phonetic: "hoh-shah-koo choh-voo mwah-nee", syllables: "Ho-sha-ku cho-vu mwa-ni" },
      { id: "lu-repeat", category: "navigation", english: "Please say it again", localText: "Hoshenu cheñi mwani", phonetic: "hoh-sheh-noo chehn-yee mwah-nee", syllables: "Ho-she-nu che-nyi mwa-ni" },
      { id: "lu-help", category: "emergency", english: "Help me with... / Can I help you?", localText: "Ankwashuku na... / Nikukwashi tahindi?", phonetic: "ahn-kwah-shoo-koo nah... / nee-koo-kwah-shee tah-heen-dee?", syllables: "An-kwa-shu-ku na... / Ni-ku-kwa-shi ta-hin-di?" },
      { id: "lu-understand", category: "emergency", english: "I do not understand / Do you understand?", localText: "Hinachitiyuku / Wunachitiyi?", phonetic: "hee-nah-chee-tee-yoo-koo / woo-nah-chee-tee-yee?", syllables: "Hi-na-chi-ti-yu-ku / Wu-na-chi-ti-yi?" },
      { id: "lu-zambezi-source", category: "safari", english: "Source of the Zambezi River", localText: "Nsulu ya Kalwiji Yezambezi", phonetic: "n-soo-loo yah kah-lwee-jee yeh-zahm-beh-zee", syllables: "Nsu-lu ya Ka-lwi-ji Ye-zam-be-zi", literalMeaning: "Sacred springhead of the great Zambezi River in Ikelenge." }
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

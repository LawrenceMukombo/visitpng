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
      {
        id: "bm-1",
        category: "greetings",
        english: "How are you? / Greetings",
        localText: "Muli shani mukwai?",
        phonetic: "moo-lee shah-nee moo-kwhy",
        syllables: "Mu-li sha-ni mu-kwai",
        literalMeaning: "How are you, respectfully?",
        culturalNote: "Polite general Bemba greeting; mukwai adds respect."
      },
      {
        id: "bm-2",
        category: "greetings",
        english: "Good morning / How did you wake?",
        localText: "Mwaukeni mukwai?",
        phonetic: "mwah-oo-keh-nee moo-kwhy",
        syllables: "Mwa-u-ke-ni mu-kwai",
        literalMeaning: "How did you wake?",
        culturalNote: "Traditional morning greeting."
      },
      {
        id: "bm-3",
        category: "greetings",
        english: "Good afternoon / How is the day?",
        localText: "Mwachibeni mukwai?",
        phonetic: "mwah-chee-beh-nee moo-kwhy",
        syllables: "Mwa-chi-be-ni mu-kwai",
        literalMeaning: "How have you spent the day?",
        culturalNote: "Polite daytime/afternoon greeting."
      },
      {
        id: "bm-4",
        category: "greetings",
        english: "I am fine / Peaceful",
        localText: "Ndi bwino mukwai",
        phonetic: "n-dee bwee-noh moo-kwhy",
        syllables: "Ndi bwi-no mu-kwai",
        literalMeaning: "I am well/fine.",
        culturalNote: "Common polite response."
      },
      {
        id: "bm-5",
        category: "greetings",
        english: "Thank you",
        localText: "Natotela mukwai",
        phonetic: "nah-toh-teh-lah moo-kwhy",
        syllables: "Na-to-te-la mu-kwai",
        literalMeaning: "I thank you.",
        culturalNote: "Standard polite gratitude."
      },
      {
        id: "bm-6",
        category: "greetings",
        english: "Thank you very much",
        localText: "Natotela sana mukwai",
        phonetic: "nah-toh-teh-lah sah-nah moo-kwhy",
        syllables: "Na-to-te-la sa-na mu-kwai",
        literalMeaning: "I thank you very much.",
        culturalNote: "Used for strong appreciation."
      },
      {
        id: "bm-7",
        category: "greetings",
        english: "Welcome (to visitors)",
        localText: "Mwaiseni mukwai",
        phonetic: "mwah-ee-seh-nee moo-kwhy",
        syllables: "Mwa-i-se-ni mu-kwai",
        literalMeaning: "You are welcome / come in.",
        culturalNote: "Warm welcome to visitors."
      },
      {
        id: "bm-8",
        category: "greetings",
        english: "Goodbye (to person staying / Stay well)",
        localText: "Shalenipo bwino mukwai",
        phonetic: "shah-leh-nee-poh bwee-noh moo-kwhy",
        syllables: "Sha-le-ni-po bwi-no mu-kwai",
        literalMeaning: "Remain well.",
        culturalNote: "Said by the person who is leaving."
      },
      {
        id: "bm-9",
        category: "greetings",
        english: "Goodbye (to person leaving / Go safely)",
        localText: "Kabenipo bwino mukwai",
        phonetic: "kah-beh-nee-poh bwee-noh moo-kwhy",
        syllables: "Ka-be-ni-po bwi-no mu-kwai",
        literalMeaning: "Go/be well.",
        culturalNote: "Farewell to the person departing."
      },
      {
        id: "bm-10",
        category: "safari",
        english: "The waterfall is magnificent",
        localText: "Icipoma ici cawama sana",
        phonetic: "ee-chee-poh-mah ee-chee chah-wah-mah sah-nah",
        syllables: "I-ci-po-ma i-ci ca-wa-ma sa-na",
        literalMeaning: "This waterfall is very beautiful.",
        culturalNote: "Natural tourist compliment."
      },
      {
        id: "bm-11",
        category: "safari",
        english: "Lion / Elephant / Leopard",
        localText: "Inkalamo / Insofu / Ingwe",
        phonetic: "een-kah-lah-moh / een-soh-foo / een-gweh",
        syllables: "In-ka-la-mo / In-so-fu / In-gwe",
        literalMeaning: "Lion / Elephant / Leopard",
        culturalNote: "Wildlife vocabulary."
      },
      {
        id: "bm-12",
        category: "navigation",
        english: "Where is the road to...?",
        localText: "Musebo uya ku... uli kwi?",
        phonetic: "moo-seh-boh oo-yah koo oo-lee kwee",
        syllables: "Mu-se-bo u-ya ku u-li kwi",
        literalMeaning: "Where is the road that goes to...?",
        culturalNote: "Useful when asking directions."
      },
      {
        id: "bm-13",
        category: "market",
        english: "How much is this?",
        localText: "Ni shinga ici mukwai?",
        phonetic: "nee sheen-gah ee-chee moo-kwhy",
        syllables: "Ni shi-nga i-ci mu-kwai",
        literalMeaning: "How much is this?",
        culturalNote: "Polite market question."
      },
      {
        id: "bm-14",
        category: "market",
        english: "Drinking water / Nshima (staple meal)",
        localText: "Amenshi yakunwa / Ubwali",
        phonetic: "ah-mehn-shee yah-koon-wah / oo-bwah-lee",
        syllables: "A-men-shi ya-ku-nwa / U-bwa-li",
        literalMeaning: "Drinking water / Nshima",
        culturalNote: "Ubwali is the Bemba staple maize meal."
      },
      {
        id: "bm-15",
        category: "market",
        english: "The food is very delicious",
        localText: "Icakulya ici cawama sana",
        phonetic: "ee-chah-kool-yah ee-chee chah-wah-mah sah-nah",
        syllables: "I-ca-ku-lya i-ci ca-wa-ma sa-na",
        literalMeaning: "This food is very good.",
        culturalNote: "Compliment for food."
      },
      {
        id: "bm-16",
        category: "emergency",
        english: "Please help me",
        localText: "Nafweniko mukwai",
        phonetic: "nah-fweh-nee-koh moo-kwhy",
        syllables: "Na-fwe-ni-ko mu-kwai",
        literalMeaning: "Please help me.",
        culturalNote: "Polite request for assistance."
      },
      {
        id: "bm-17",
        category: "emergency",
        english: "I need a doctor / clinic",
        localText: "Ndefwaya dokota / ukuya ku cipatala",
        phonetic: "n-deh-fwah-yah doh-koh-tah / oo-yah koo chee-pah-tah-lah",
        syllables: "Nde-fwa-ya do-ko-ta / u-ya ku ci-pa-ta-la",
        literalMeaning: "I need/want a doctor / to go to a clinic or hospital.",
        culturalNote: "Emergency/health phrase."
      }
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
      "Say 'Zikomo' freely—it is the universal Zambian word for thank you, excuse me, and pardon."
    ],
    phrases: [
      {
        id: "ny-1",
        category: "greetings",
        english: "How are you? / Greetings",
        localText: "Muli bwanji?",
        phonetic: "moo-lee bwahn-jee",
        syllables: "Mu-li bwa-nji",
        literalMeaning: "How are you?",
        culturalNote: "Respectful/plural general greeting."
      },
      {
        id: "ny-2",
        category: "greetings",
        english: "Good morning / How did you wake?",
        localText: "Mwauka bwanji? / Mwadzuka bwanji?",
        phonetic: "mwah-oo-kah bwahn-jee / mwah-dzoo-kah bwahn-jee",
        syllables: "Mwa-u-ka bwa-nji / Mwa-dzu-ka bwa-nji",
        literalMeaning: "How have you woken?",
        culturalNote: "Standard morning greeting."
      },
      {
        id: "ny-3",
        category: "greetings",
        english: "Good afternoon / How is the day?",
        localText: "Mwasewela bwanji? / Mwachoma bwanji?",
        phonetic: "mwah-seh-weh-lah bwahn-jee / mwah-choh-mah bwahn-jee",
        syllables: "Mwa-se-we-la bwa-nji / Mwa-cho-ma bwa-nji",
        literalMeaning: "How is your afternoon/day?",
        culturalNote: "Afternoon forms vary by community."
      },
      {
        id: "ny-4",
        category: "greetings",
        english: "I am fine / Peaceful",
        localText: "Ndili bwino",
        phonetic: "n-dee-lee bwee-noh",
        syllables: "Ndi-li bwi-no",
        literalMeaning: "I am well.",
        culturalNote: "Standard response."
      },
      {
        id: "ny-5",
        category: "greetings",
        english: "Thank you",
        localText: "Zikomo",
        phonetic: "zee-koh-moh",
        syllables: "Zi-ko-mo",
        literalMeaning: "Thank you.",
        culturalNote: "Standard Nyanja gratitude."
      },
      {
        id: "ny-6",
        category: "greetings",
        english: "Thank you very much",
        localText: "Zikomo kwambiri",
        phonetic: "zee-koh-moh kwahm-bee-ree",
        syllables: "Zi-ko-mo kwa-mbi-ri",
        literalMeaning: "Thank you very much.",
        culturalNote: "Strong appreciation."
      },
      {
        id: "ny-7",
        category: "greetings",
        english: "Welcome (to visitors)",
        localText: "Mwalandiridwa",
        phonetic: "mwah-lahn-dee-ree-dwah",
        syllables: "Mwa-la-ndi-ri-dwa",
        literalMeaning: "You are welcome.",
        culturalNote: "Welcome to a visitor/guest."
      },
      {
        id: "ny-8",
        category: "greetings",
        english: "Goodbye (to person staying / Stay well)",
        localText: "Mutsale bwino",
        phonetic: "moo-tsah-leh bwee-noh",
        syllables: "Mu-tsa-le bwi-no",
        literalMeaning: "Remain well.",
        culturalNote: "Said to the person staying."
      },
      {
        id: "ny-9",
        category: "greetings",
        english: "Goodbye (to person leaving / Go safely)",
        localText: "Muyende bwino",
        phonetic: "moo-yehn-deh bwee-noh",
        syllables: "Mu-ye-nde bwi-no",
        literalMeaning: "Travel/go well.",
        culturalNote: "Said to the person leaving."
      },
      {
        id: "ny-10",
        category: "safari",
        english: "The waterfall is magnificent",
        localText: "Mathithi awa ndi okongola kwambiri",
        phonetic: "mah-thee-thee ah-wah n-dee oh-kohn-goh-lah kwahm-bee-ree",
        syllables: "Ma-thi-thi a-wa ndi o-ko-ngo-la kwa-mbi-ri",
        literalMeaning: "These waterfalls are very beautiful.",
        culturalNote: "Tourist compliment."
      },
      {
        id: "ny-11",
        category: "safari",
        english: "Lion / Elephant / Leopard",
        localText: "Mkango / Njovu / Kambuku",
        phonetic: "m-kahn-goh / n-joh-voo / kahm-boo-koo",
        syllables: "Mka-ngo / Njo-vu / Ka-mbu-ku",
        literalMeaning: "Lion / Elephant / Leopard",
        culturalNote: "Common wildlife names."
      },
      {
        id: "ny-12",
        category: "navigation",
        english: "Where is the road to...?",
        localText: "Njira yopita ku... ili kuti?",
        phonetic: "n-jee-rah yoh-pee-tah koo ee-lee koo-tee",
        syllables: "Nji-ra yo-pi-ta ku i-li ku-ti",
        literalMeaning: "Where is the road/path going to...?",
        culturalNote: "Useful direction question."
      },
      {
        id: "ny-13",
        category: "market",
        english: "How much is this?",
        localText: "Ichi ndi zingati?",
        phonetic: "ee-chee n-dee zeen-gah-tee",
        syllables: "I-chi ndi zi-nga-ti",
        literalMeaning: "How much is this?",
        culturalNote: "Market price question."
      },
      {
        id: "ny-14",
        category: "market",
        english: "Drinking water / Nshima (staple meal)",
        localText: "Madzi akumwa / Nsima",
        phonetic: "mahd-zee ah-koom-wah / n-see-mah",
        syllables: "Ma-dzi a-ku-mwa / Nsi-ma",
        literalMeaning: "Drinking water / Nshima",
        culturalNote: "Nsima is the staple maize meal."
      },
      {
        id: "ny-15",
        category: "market",
        english: "The food is very delicious",
        localText: "Chakudya ichi ndi chokoma kwambiri",
        phonetic: "chah-koo-dyah ee-chee n-dee choh-koh-mah kwahm-bee-ree",
        syllables: "Cha-ku-dya i-chi ndi cho-ko-ma kwa-mbi-ri",
        literalMeaning: "This food is very tasty.",
        culturalNote: "Food compliment."
      },
      {
        id: "ny-16",
        category: "emergency",
        english: "Please help me",
        localText: "Chonde ndithandizeni",
        phonetic: "chon-deh n-dee-thahn-dee-zeh-nee",
        syllables: "Cho-nde ndi-tha-ndi-ze-ni",
        literalMeaning: "Please help me.",
        culturalNote: "Polite emergency request."
      },
      {
        id: "ny-17",
        category: "emergency",
        english: "I need a doctor / clinic",
        localText: "Ndikufuna dokotala / chipatala",
        phonetic: "n-dee-koo-foo-nah doh-koh-tah-lah / chee-pah-tah-lah",
        syllables: "Ndi-ku-fu-na do-ko-ta-la / chi-pa-ta-la",
        literalMeaning: "I need/want a doctor / clinic or hospital.",
        culturalNote: "Health emergency phrase."
      }
    ]
  },

  // ================= 3. KAONDE (KiKaonde) =================
  {
    code: "kaonde",
    name: "Kaonde (KiKaonde)",
    nativeName: "KiKaonde",
    primaryProvinces: ["North-Western Province", "Central Province"],
    regionLabel: "North-Western & Central (Solwezi, Kasempa, Mumbwa, Kifubwa)",
    speakerCount: "900,000+",
    description: "Spoken across Solwezi, Kasempa, and Mumbwa. Home to the Kifubwa prehistoric rock art stream, Kansanshi, and the famous Ntongo and Kufukwila traditional cultural ceremonies.",
    culturalEtiquette: [
      "Say 'Mwaingilanyi mwani' or 'Muji byepi mwane' as a warm, respectful greeting.",
      "Add 'Mwane' or 'Mwani' at the end of statements as a polite honorific (Sir/Madam).",
      "Clap hands gently when expressing gratitude to elders and hosts."
    ],
    phrases: [
      {
        id: "kd-1",
        category: "greetings",
        english: "How are you? / Greetings",
        localText: "Muji byepi mwane?",
        phonetic: "moo-jee byeh-pee mwah-neh",
        syllables: "Mu-ji bye-pi mwa-ne",
        literalMeaning: "How are you, respectfully?",
        culturalNote: "Standard polite Kaonde greeting."
      },
      {
        id: "kd-2",
        category: "greetings",
        english: "Good morning / How did you wake?",
        localText: "Mwabuka byepi mwane?",
        phonetic: "mwah-boo-kah byeh-pee mwah-neh",
        syllables: "Mwa-bu-ka bye-pi mwa-ne",
        literalMeaning: "How did you wake?",
        culturalNote: "Respectful morning greeting."
      },
      {
        id: "kd-3",
        category: "greetings",
        english: "Good afternoon / How is the day?",
        localText: "Kimute mwane!",
        phonetic: "kee-moo-teh mwah-neh",
        syllables: "Ki-mu-te mwa-ne",
        literalMeaning: "Good afternoon.",
        culturalNote: "Established Kaonde afternoon greeting."
      },
      {
        id: "kd-4",
        category: "greetings",
        english: "I am fine / Peaceful",
        localText: "Njitu bulongo mwane",
        phonetic: "n-jee-too boo-lohn-goh mwah-neh",
        syllables: "Nji-tu bu-lo-ngo mwa-ne",
        literalMeaning: "I am well/fine.",
        culturalNote: "Standard response."
      },
      {
        id: "kd-5",
        category: "greetings",
        english: "Thank you",
        localText: "Nasanta mwane",
        phonetic: "nah-sahn-tah mwah-neh",
        syllables: "Na-san-ta mwa-ne",
        literalMeaning: "I thank you.",
        culturalNote: "Polite gratitude."
      },
      {
        id: "kd-6",
        category: "greetings",
        english: "Thank you very much",
        localText: "Nasanta bingi mwane",
        phonetic: "nah-sahn-tah been-gee mwah-neh",
        syllables: "Na-san-ta bi-ngi mwa-ne",
        literalMeaning: "I thank you very much.",
        culturalNote: "Strong appreciation."
      },
      {
        id: "kd-7",
        category: "greetings",
        english: "Welcome (to visitors)",
        localText: "Mwaiyai mwane",
        phonetic: "mwah-ee-yah-ee mwah-neh",
        syllables: "Mwa-i-ya-i mwa-ne",
        literalMeaning: "Welcome.",
        culturalNote: "Greeting used to welcome visitors."
      },
      {
        id: "kd-8",
        category: "greetings",
        english: "Goodbye (to person staying / Stay well)",
        localText: "Shalaipo bulongo mwane",
        phonetic: "shah-lah-ee-poh boo-lohn-goh mwah-neh",
        syllables: "Sha-lai-po bu-lo-ngo mwa-ne",
        literalMeaning: "Remain well.",
        culturalNote: "Farewell to a person staying."
      },
      {
        id: "kd-9",
        category: "greetings",
        english: "Goodbye (to person leaving / Go safely)",
        localText: "Endai bulongo mwane",
        phonetic: "ehn-dah-ee boo-lohn-goh mwah-neh",
        syllables: "En-da-i bu-lo-ngo mwa-ne",
        literalMeaning: "Go well.",
        culturalNote: "Farewell to a person leaving."
      },
      {
        id: "kd-10",
        category: "safari",
        english: "The waterfall is magnificent",
        localText: "Kipoma kiji bulongo bingi",
        phonetic: "kee-poh-mah kee-jee boo-lohn-goh been-gee",
        syllables: "Ki-po-ma ki-ji bu-lo-ngo bi-ngi",
        literalMeaning: "The waterfall is very beautiful.",
        culturalNote: "Tourism phrase; local wording should be audio-validated."
      },
      {
        id: "kd-11",
        category: "safari",
        english: "Lion / Elephant / Leopard",
        localText: "Nkhalamo / Nzovu / Nkashi",
        phonetic: "n-khah-lah-moh / n-zoh-voo / n-kah-shee",
        syllables: "Nkha-la-mo / Nzo-vu / Nka-shi",
        literalMeaning: "Lion / Elephant / Leopard",
        culturalNote: "Wildlife vocabulary; regional forms may vary."
      },
      {
        id: "kd-12",
        category: "navigation",
        english: "Where is the road to...?",
        localText: "Nzila ya kuya ku... iji kwepi?",
        phonetic: "n-zee-lah yah koo-yah koo ee-jee kweh-pee",
        syllables: "Nzi-la ya ku-ya ku i-ji kwe-pi",
        literalMeaning: "Where is the road to...?",
        culturalNote: "Direction phrase."
      },
      {
        id: "kd-13",
        category: "market",
        english: "How much is this?",
        localText: "Kino kiji bunga?",
        phonetic: "kee-noh kee-jee boon-gah",
        syllables: "Ki-no ki-ji bu-nga",
        literalMeaning: "How much is this?",
        culturalNote: "Price question; native-speaker validation recommended."
      },
      {
        id: "kd-14",
        category: "market",
        english: "Drinking water / Nshima (staple meal)",
        localText: "Meema a kunwa / Nshima",
        phonetic: "meh-mah ah koo-nwah / n-shee-mah",
        syllables: "Mee-ma a ku-nwa / Nshi-ma",
        literalMeaning: "Drinking water / Nshima",
        culturalNote: "Common everyday food vocabulary."
      },
      {
        id: "kd-15",
        category: "market",
        english: "The food is very delicious",
        localText: "Byakulya bino byawama bingi",
        phonetic: "byah-koo-lyah bee-noh byah-wah-mah been-gee",
        syllables: "Bya-ku-lya bi-no bya-wa-ma bi-ngi",
        literalMeaning: "This food is very good.",
        culturalNote: "Food compliment."
      },
      {
        id: "kd-16",
        category: "emergency",
        english: "Please help me",
        localText: "Ngafweniko mwane",
        phonetic: "n-gah-fweh-nee-koh mwah-neh",
        syllables: "Nga-fwe-ni-ko mwa-ne",
        literalMeaning: "Please help me.",
        culturalNote: "Emergency request; audio should be native-speaker checked."
      },
      {
        id: "kd-17",
        category: "emergency",
        english: "I need a doctor / clinic",
        localText: "Ngitonda dokota / chipatala",
        phonetic: "n-gee-tohn-dah doh-koh-tah / chee-pah-tah-lah",
        syllables: "Ngi-to-nda do-ko-ta / chi-pa-ta-la",
        literalMeaning: "I need a doctor / clinic.",
        culturalNote: "Health phrase; loanwords are widely understood."
      }
    ]
  },

  // ================= 4. LUNDA (Chilunda) =================
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
      {
        id: "lu-1",
        category: "greetings",
        english: "How are you? / Greetings",
        localText: "Mudi ngahi mwani?",
        phonetic: "moo-dee ngah-hee mwah-nee",
        syllables: "Mu-di nga-hi mwa-ni",
        literalMeaning: "How are you?",
        culturalNote: "Respectful Lunda greeting."
      },
      {
        id: "lu-2",
        category: "greetings",
        english: "Good morning / How did you wake?",
        localText: "Ntetemena mwani",
        phonetic: "n-teh-teh-meh-nah mwah-nee",
        syllables: "Nte-te-me-na mwa-ni",
        literalMeaning: "Good morning.",
        culturalNote: "Documented Lunda morning greeting."
      },
      {
        id: "lu-3",
        category: "greetings",
        english: "Good afternoon / How is the day?",
        localText: "Melela mwani",
        phonetic: "meh-leh-lah mwah-nee",
        syllables: "Me-le-la mwa-ni",
        literalMeaning: "Good day/evening.",
        culturalNote: "Common later-day greeting; usage varies locally."
      },
      {
        id: "lu-4",
        category: "greetings",
        english: "I am fine / Peaceful",
        localText: "Nidi chachiwahi mwani",
        phonetic: "nee-dee chah-chee-wah-hee mwah-nee",
        syllables: "Ni-di cha-chi-wa-hi mwa-ni",
        literalMeaning: "I am well.",
        culturalNote: "Standard response."
      },
      {
        id: "lu-5",
        category: "greetings",
        english: "Thank you",
        localText: "Nasakalili mwani",
        phonetic: "nah-sah-kah-lee-lee mwah-nee",
        syllables: "Na-sa-ka-li-li mwa-ni",
        literalMeaning: "Thank you.",
        culturalNote: "Standard gratitude."
      },
      {
        id: "lu-6",
        category: "greetings",
        english: "Thank you very much",
        localText: "Nasakalili nankashi mwani",
        phonetic: "nah-sah-kah-lee-lee nahn-kah-shee mwah-nee",
        syllables: "Na-sa-ka-li-li nan-ka-shi mwa-ni",
        literalMeaning: "Thank you very much.",
        culturalNote: "Strong appreciation; regional wording may vary."
      },
      {
        id: "lu-7",
        category: "greetings",
        english: "Welcome (to visitors)",
        localText: "Shikenu mwani",
        phonetic: "shee-keh-noo mwah-nee",
        syllables: "Shi-ke-nu mwa-ni",
        literalMeaning: "Welcome.",
        culturalNote: "Documented welcome greeting."
      },
      {
        id: "lu-8",
        category: "greetings",
        english: "Goodbye (to person staying / Stay well)",
        localText: "Mushalu chiwahi mwani",
        phonetic: "moo-shah-loo chee-wah-hee mwah-nee",
        syllables: "Mu-sha-lu chi-wa-hi mwa-ni",
        literalMeaning: "Stay well.",
        culturalNote: "Said to a person remaining."
      },
      {
        id: "lu-9",
        category: "greetings",
        english: "Goodbye (to person leaving / Go safely)",
        localText: "Mwenduhu chiwahi mwani",
        phonetic: "mwehn-doo-hoo chee-wah-hee mwah-nee",
        syllables: "Mwe-ndu-hu chi-wa-hi mwa-ni",
        literalMeaning: "Go well.",
        culturalNote: "Said to a person departing."
      },
      {
        id: "lu-10",
        category: "safari",
        english: "The waterfall is magnificent",
        localText: "Chipoma chidi chachiwahi nankashi",
        phonetic: "chee-poh-mah chee-dee chah-chee-wah-hee nahn-kah-shee",
        syllables: "Chi-po-ma chi-di cha-chi-wa-hi nan-ka-shi",
        literalMeaning: "The waterfall is very beautiful.",
        culturalNote: "Tourism phrase; native Ndembu/Lunda audio validation recommended."
      },
      {
        id: "lu-11",
        category: "safari",
        english: "Lion / Elephant / Leopard",
        localText: "Ntambu / Nzovu / Nkashi",
        phonetic: "n-tahm-boo / n-zoh-voo / n-kah-shee",
        syllables: "Nta-mbu / Nzo-vu / Nka-shi",
        literalMeaning: "Lion / Elephant / Leopard",
        culturalNote: "Wildlife terms may vary by Lunda variety."
      },
      {
        id: "lu-12",
        category: "navigation",
        english: "Where is the road to...?",
        localText: "Nzila ya kuya ku... yidi kwihi?",
        phonetic: "n-zee-lah yah koo-yah koo yee-dee kwee-hee",
        syllables: "Nzi-la ya ku-ya ku yi-di kwi-hi",
        literalMeaning: "Where is the road to...?",
        culturalNote: "Direction phrase."
      },
      {
        id: "lu-13",
        category: "market",
        english: "How much is this?",
        localText: "Chingahi mwani?",
        phonetic: "cheen-gah-hee mwah-nee",
        syllables: "Chi-nga-hi mwa-ni",
        literalMeaning: "How much is it?",
        culturalNote: "Documented price question."
      },
      {
        id: "lu-14",
        category: "market",
        english: "Drinking water / Nshima (staple meal)",
        localText: "Meji a kunwa / Nshima",
        phonetic: "meh-jee ah koo-nwah / n-shee-mah",
        syllables: "Me-ji a ku-nwa / Nshi-ma",
        literalMeaning: "Drinking water / Nshima",
        culturalNote: "Common everyday terms."
      },
      {
        id: "lu-15",
        category: "market",
        english: "The food is very delicious",
        localText: "Chakulya ichi chachiwahi nankashi",
        phonetic: "chah-koo-lyah ee-chee chah-chee-wah-hee nahn-kah-shee",
        syllables: "Cha-ku-lya i-chi cha-chi-wa-hi nan-ka-shi",
        literalMeaning: "This food is very good.",
        culturalNote: "Food compliment."
      },
      {
        id: "lu-16",
        category: "emergency",
        english: "Please help me",
        localText: "Ankwashuku mwani",
        phonetic: "ahn-kwah-shoo-koo mwah-nee",
        syllables: "An-kwa-shu-ku mwa-ni",
        literalMeaning: "Please help me.",
        culturalNote: "Polite request for help."
      },
      {
        id: "lu-17",
        category: "emergency",
        english: "I need a doctor / clinic",
        localText: "Ninatonda ndotolo / chipatala",
        phonetic: "nee-nah-tohn-dah n-doh-toh-loh / chee-pah-tah-lah",
        syllables: "Ni-na-to-nda ndo-to-lo / chi-pa-ta-la",
        literalMeaning: "I need a doctor / clinic.",
        culturalNote: "Health phrase; medical loanwords may vary."
      }
    ]
  },

  // ================= 5. LUVALE (Chiluvale) =================
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
      "Say 'Shikenu mwane' or 'Tambukenu mwane' when entering a village or homestead as a formal greeting of peace.",
      "Always ask permission before photographing sacred masks or traditional initiation regalia."
    ],
    phrases: [
      {
        id: "lv-1",
        category: "greetings",
        english: "How are you? / Greetings",
        localText: "Muli ngachili mwane? / Munayoyo mwane?",
        phonetic: "moo-lee n-gah-chee-lee mwah-neh / moo-nah-yoh-yoh mwah-neh",
        syllables: "Mu-li nga-chi-li mwa-ne / Mu-na-yo-yo mwa-ne",
        literalMeaning: "How are you?",
        culturalNote: "Respectful Luvale greeting."
      },
      {
        id: "lv-2",
        category: "greetings",
        english: "Good morning / How did you wake?",
        localText: "Chimene mwane",
        phonetic: "chee-meh-neh mwah-neh",
        syllables: "Chi-me-ne mwa-ne",
        literalMeaning: "Good morning.",
        culturalNote: "Established Luvale morning greeting."
      },
      {
        id: "lv-3",
        category: "greetings",
        english: "Good afternoon / How is the day?",
        localText: "Musana mwane",
        phonetic: "moo-sah-nah mwah-neh",
        syllables: "Mu-sa-na mwa-ne",
        literalMeaning: "Good afternoon.",
        culturalNote: "Established Luvale afternoon greeting."
      },
      {
        id: "lv-4",
        category: "greetings",
        english: "I am fine / Peaceful",
        localText: "Nguli kanawa mwane",
        phonetic: "n-goo-lee kah-nah-wah mwah-neh",
        syllables: "Ngu-li ka-na-wa mwa-ne",
        literalMeaning: "I am fine.",
        culturalNote: "Standard response."
      },
      {
        id: "lv-5",
        category: "greetings",
        english: "Thank you",
        localText: "Ngunasakwilila mwane",
        phonetic: "n-goo-nah-sah-kwee-lee-lah mwah-neh",
        syllables: "Ngu-na-sa-kwi-li-la mwa-ne",
        literalMeaning: "Thank you.",
        culturalNote: "Polite gratitude."
      },
      {
        id: "lv-6",
        category: "greetings",
        english: "Thank you very much",
        localText: "Ngunasakwilila chikuma mwane",
        phonetic: "n-goo-nah-sah-kwee-lee-lah chee-koo-mah mwah-neh",
        syllables: "Ngu-na-sa-kwi-li-la chi-ku-ma mwa-ne",
        literalMeaning: "Thank you very much.",
        culturalNote: "Strong appreciation."
      },
      {
        id: "lv-7",
        category: "greetings",
        english: "Welcome (to visitors)",
        localText: "Tambukenu mwane",
        phonetic: "tahm-boo-keh-noo mwah-neh",
        syllables: "Ta-mbu-ke-nu mwa-ne",
        literalMeaning: "Welcome.",
        culturalNote: "Common visitor welcome."
      },
      {
        id: "lv-8",
        category: "greetings",
        english: "Goodbye (to person staying / Stay well)",
        localText: "Salenuho kanawa mwane",
        phonetic: "sah-leh-noo-hoh kah-nah-wah mwah-neh",
        syllables: "Sa-le-nu-ho ka-na-wa mwa-ne",
        literalMeaning: "Stay well.",
        culturalNote: "Farewell to those remaining."
      },
      {
        id: "lv-9",
        category: "greetings",
        english: "Goodbye (to person leaving / Go safely)",
        localText: "Mwendenga kanawa mwane",
        phonetic: "mwehn-dehn-gah kah-nah-wah mwah-neh",
        syllables: "Mwe-nde-nga ka-na-wa mwa-ne",
        literalMeaning: "Go safely/well.",
        culturalNote: "Farewell to departing traveller."
      },
      {
        id: "lv-10",
        category: "safari",
        english: "The waterfall is magnificent",
        localText: "Chikuma cha mema ichi chawahe chikuma",
        phonetic: "chee-koo-mah chah meh-mah ee-chee chah-wah-heh chee-koo-mah",
        syllables: "Chi-ku-ma cha me-ma i-chi cha-wa-he chi-ku-ma",
        literalMeaning: "This waterfall is very beautiful.",
        culturalNote: "Tourism phrase; native-speaker validation recommended."
      },
      {
        id: "lv-11",
        category: "safari",
        english: "Lion / Elephant / Leopard",
        localText: "Ndumba / Nzovu / Nkashi",
        phonetic: "n-doom-bah / n-zoh-voo / n-kah-shee",
        syllables: "Ndu-mba / Nzo-vu / Nka-shi",
        literalMeaning: "Lion / Elephant / Leopard",
        culturalNote: "Wildlife terms can vary regionally."
      },
      {
        id: "lv-12",
        category: "navigation",
        english: "Where is the road to...?",
        localText: "Njila ya kuya ku... yili kulihi?",
        phonetic: "n-jee-lah yah koo-yah koo yee-lee koo-lee-hee",
        syllables: "Nji-la ya ku-ya ku yi-li ku-li-hi",
        literalMeaning: "Where is the road to...?",
        culturalNote: "Direction phrase."
      },
      {
        id: "lv-13",
        category: "market",
        english: "How much is this?",
        localText: "Jingahi mwane?",
        phonetic: "jeen-gah-hee mwah-neh",
        syllables: "Ji-nga-hi mwa-ne",
        literalMeaning: "How much?",
        culturalNote: "Documented Luvale price question."
      },
      {
        id: "lv-14",
        category: "market",
        english: "Drinking water / Nshima (staple meal)",
        localText: "Meji akumwa / Nshima",
        phonetic: "meh-jee ah-koom-wah / n-shee-mah",
        syllables: "Me-ji a-ku-mwa / Nshi-ma",
        literalMeaning: "Drinking water / Nshima",
        culturalNote: "Everyday food vocabulary."
      },
      {
        id: "lv-15",
        category: "market",
        english: "The food is very delicious",
        localText: "Chakulya ichi chawahe chikuma",
        phonetic: "chah-koo-lyah ee-chee chah-wah-heh chee-koo-mah",
        syllables: "Cha-ku-lya i-chi cha-wa-he chi-ku-ma",
        literalMeaning: "This food is very delicious/good.",
        culturalNote: "Food compliment."
      },
      {
        id: "lv-16",
        category: "emergency",
        english: "Please help me",
        localText: "Ngukwashenu mwane",
        phonetic: "n-goo-kwah-sheh-noo mwah-neh",
        syllables: "Ngu-kwa-she-nu mwa-ne",
        literalMeaning: "Please help me.",
        culturalNote: "Emergency request; native-speaker audio validation recommended."
      },
      {
        id: "lv-17",
        category: "emergency",
        english: "I need a doctor / clinic",
        localText: "Ngwatonda ndotolo / chipatela",
        phonetic: "n-gwah-tohn-dah n-doh-toh-loh / chee-pah-teh-lah",
        syllables: "Ngwa-to-nda ndo-to-lo / chi-pa-te-la",
        literalMeaning: "I need a doctor / clinic.",
        culturalNote: "Health phrase."
      }
    ]
  },

  // ================= 6. LOZI (Silozi) =================
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
      {
        id: "lz-1",
        category: "greetings",
        english: "How are you? / Greetings",
        localText: "Mucwani? / Mu zuhile cwani?",
        phonetic: "moo-chwah-nee / moo zoo-hee-leh chwah-nee",
        syllables: "Mu-cwa-ni / Mu zu-hi-le cwa-ni",
        literalMeaning: "How are you?",
        culturalNote: "Common siLozi greeting."
      },
      {
        id: "lz-2",
        category: "greetings",
        english: "Good morning / How did you wake?",
        localText: "Mu zuhile cwani?",
        phonetic: "moo zoo-hee-leh chwah-nee",
        syllables: "Mu zu-hi-le cwa-ni",
        literalMeaning: "How did you wake?",
        culturalNote: "Morning greeting."
      },
      {
        id: "lz-3",
        category: "greetings",
        english: "Good afternoon / How is the day?",
        localText: "Mu tozi cwani?",
        phonetic: "moo toh-zee chwah-nee",
        syllables: "Mu to-zi cwa-ni",
        literalMeaning: "How is your afternoon/day?",
        culturalNote: "Afternoon greeting."
      },
      {
        id: "lz-4",
        category: "greetings",
        english: "I am fine / Peaceful",
        localText: "Ni inzi hande / Ni iketile",
        phonetic: "nee een-zee hahn-deh / nee ee-keh-tee-leh",
        syllables: "Ni in-zi ha-nde / Ni i-ke-ti-le",
        literalMeaning: "I am well/fine.",
        culturalNote: "Standard response."
      },
      {
        id: "lz-5",
        category: "greetings",
        english: "Thank you",
        localText: "Luitumezi",
        phonetic: "loo-ee-too-meh-zee",
        syllables: "Lu-i-tu-me-zi",
        literalMeaning: "Thank you.",
        culturalNote: "Standard gratitude."
      },
      {
        id: "lz-6",
        category: "greetings",
        english: "Thank you very much",
        localText: "Ni itumezi hahulu",
        phonetic: "nee ee-too-meh-zee hah-hoo-loo",
        syllables: "Ni i-tu-me-zi ha-hu-lu",
        literalMeaning: "Thank you very much.",
        culturalNote: "Strong appreciation."
      },
      {
        id: "lz-7",
        category: "greetings",
        english: "Welcome (to visitors)",
        localText: "Mu amuhezwi",
        phonetic: "moo ah-moo-heh-zwee",
        syllables: "Mu a-mu-he-zwi",
        literalMeaning: "You are welcome.",
        culturalNote: "Visitor welcome."
      },
      {
        id: "lz-8",
        category: "greetings",
        english: "Goodbye (to person staying / Stay well)",
        localText: "Mu siyale hande",
        phonetic: "moo see-yah-leh hahn-deh",
        syllables: "Mu si-ya-le ha-nde",
        literalMeaning: "Remain well.",
        culturalNote: "Farewell to person staying."
      },
      {
        id: "lz-9",
        category: "greetings",
        english: "Goodbye (to person leaving / Go safely)",
        localText: "Mu zamaye hande",
        phonetic: "moo zah-mah-yeh hahn-deh",
        syllables: "Mu za-ma-ye ha-nde",
        literalMeaning: "Travel/go well.",
        culturalNote: "Farewell to person leaving."
      },
      {
        id: "lz-10",
        category: "safari",
        english: "The waterfall is magnificent",
        localText: "Mulapo wa mezi wo ki omunde hahulu",
        phonetic: "moo-lah-poh wah meh-zee woh kee oh-moon-deh hah-hoo-loo",
        syllables: "Mu-la-po wa me-zi wo ki o-mu-nde ha-hu-lu",
        literalMeaning: "The waterfall is very beautiful.",
        culturalNote: "Tourism phrase; native-speaker validation recommended."
      },
      {
        id: "lz-11",
        category: "safari",
        english: "Lion / Elephant / Leopard",
        localText: "Tau / Tlou / Nkwazi",
        phonetic: "tah-oo / tloh-oo / n-kwah-zee",
        syllables: "Ta-u / Tlou / Nkwa-zi",
        literalMeaning: "Lion / Elephant / Leopard",
        culturalNote: "Wildlife vocabulary; regional forms may vary."
      },
      {
        id: "lz-12",
        category: "navigation",
        english: "Where is the road to...?",
        localText: "Nzila ya kuya kwa... ki kai?",
        phonetic: "n-zee-lah yah koo-yah kwah kee kah-ee",
        syllables: "Nzi-la ya ku-ya kwa ki ka-i",
        literalMeaning: "Where is the road to...?",
        culturalNote: "Direction phrase."
      },
      {
        id: "lz-13",
        category: "market",
        english: "How much is this?",
        localText: "Ki bukai sesi?",
        phonetic: "kee boo-kah-ee seh-see",
        syllables: "Ki bu-ka-i se-si",
        literalMeaning: "How much is this?",
        culturalNote: "Market price question; wording varies."
      },
      {
        id: "lz-14",
        category: "market",
        english: "Drinking water / Nshima (staple meal)",
        localText: "Mezi a kunwa / Buhobe",
        phonetic: "meh-zee ah koo-nwah / boo-hoh-beh",
        syllables: "Me-zi a ku-nwa / Bu-ho-be",
        literalMeaning: "Drinking water / staple maize meal",
        culturalNote: "Buhobe is a common Lozi staple porridge."
      },
      {
        id: "lz-15",
        category: "market",
        english: "The food is very delicious",
        localText: "Lico ze ki ze nde hahulu",
        phonetic: "lee-choh zeh kee zeh n-deh hah-hoo-loo",
        syllables: "Li-co ze ki ze nde ha-hu-lu",
        literalMeaning: "The food is very good.",
        culturalNote: "Food compliment."
      },
      {
        id: "lz-16",
        category: "emergency",
        english: "Please help me",
        localText: "Ni tuseni, ni a kupa",
        phonetic: "nee too-seh-nee nee ah koo-pah",
        syllables: "Ni tu-se-ni / ni a ku-pa",
        literalMeaning: "Please help me.",
        culturalNote: "Polite request for assistance."
      },
      {
        id: "lz-17",
        category: "emergency",
        english: "I need a doctor / clinic",
        localText: "Ni tokwa dokota / sipatela",
        phonetic: "nee toh-kwah doh-koh-tah / see-pah-teh-lah",
        syllables: "Ni to-kwa do-ko-ta / si-pa-te-la",
        literalMeaning: "I need a doctor / clinic.",
        culturalNote: "Health emergency phrase."
      }
    ]
  },

  // ================= 7. TONGA (Chitonga) =================
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
      {
        id: "to-1",
        category: "greetings",
        english: "How are you? / Greetings",
        localText: "Muli buti? / Mwapona?",
        phonetic: "moo-lee boo-tee / mwah-poh-nah",
        syllables: "Mu-li bu-ti / Mwa-po-na",
        literalMeaning: "How are you?",
        culturalNote: "Respectful/general Tonga greeting."
      },
      {
        id: "to-2",
        category: "greetings",
        english: "Good morning / How did you wake?",
        localText: "Mwabuka buti?",
        phonetic: "mwah-boo-kah boo-tee",
        syllables: "Mwa-bu-ka bu-ti",
        literalMeaning: "How did you wake?",
        culturalNote: "Standard morning greeting."
      },
      {
        id: "to-3",
        category: "greetings",
        english: "Good afternoon / How is the day?",
        localText: "Mwayusa buti?",
        phonetic: "mwah-yoo-sah boo-tee",
        syllables: "Mwa-yu-sa bu-ti",
        literalMeaning: "How is your afternoon/day?",
        culturalNote: "Common afternoon greeting."
      },
      {
        id: "to-4",
        category: "greetings",
        english: "I am fine / Peaceful",
        localText: "Ndili kabotu",
        phonetic: "n-dee-lee kah-boh-too",
        syllables: "Ndi-li ka-bo-tu",
        literalMeaning: "I am well/fine.",
        culturalNote: "Standard response."
      },
      {
        id: "to-5",
        category: "greetings",
        english: "Thank you",
        localText: "Ndalumba / Twalumba",
        phonetic: "n-dah-loom-bah / twah-loom-bah",
        syllables: "Nda-lum-ba / Twa-lum-ba",
        literalMeaning: "I/we thank you.",
        culturalNote: "Standard gratitude."
      },
      {
        id: "to-6",
        category: "greetings",
        english: "Thank you very much",
        localText: "Ndalumba kapati / Twalumba kapati",
        phonetic: "n-dah-loom-bah kah-pah-tee / twah-loom-bah kah-pah-tee",
        syllables: "Nda-lum-ba ka-pa-ti / Twa-lum-ba ka-pa-ti",
        literalMeaning: "Thank you very much.",
        culturalNote: "Strong appreciation."
      },
      {
        id: "to-7",
        category: "greetings",
        english: "Welcome (to visitors)",
        localText: "Mwabonwa / Amusike",
        phonetic: "mwah-bohn-wah / ah-moo-see-keh",
        syllables: "Mwa-bo-nwa / A-mu-si-ke",
        literalMeaning: "Welcome.",
        culturalNote: "Established Tonga welcome forms."
      },
      {
        id: "to-8",
        category: "greetings",
        english: "Goodbye (to person staying / Stay well)",
        localText: "Muchaale kabotu",
        phonetic: "moo-chah-ah-leh kah-boh-too",
        syllables: "Mu-chaa-le ka-bo-tu",
        literalMeaning: "Remain well.",
        culturalNote: "Traditional farewell to those staying."
      },
      {
        id: "to-9",
        category: "greetings",
        english: "Goodbye (to person leaving / Go safely)",
        localText: "Muyende kabotu",
        phonetic: "moo-yehn-deh kah-boh-too",
        syllables: "Mu-ye-nde ka-bo-tu",
        literalMeaning: "Go/travel well.",
        culturalNote: "Farewell to departing traveller."
      },
      {
        id: "to-10",
        category: "safari",
        english: "The waterfall is magnificent",
        localText: "Mfula yamatalika eeyi njibotu kapati",
        phonetic: "m-foo-lah yah-mah-tah-lee-kah eh-yee n-jee-boh-too kah-pah-tee",
        syllables: "Mfu-la ya-ma-ta-li-ka ee-yi nji-bo-tu ka-pa-ti",
        literalMeaning: "This waterfall is very beautiful.",
        culturalNote: "Tourism phrase; local terminology should be native-speaker checked."
      },
      {
        id: "to-11",
        category: "safari",
        english: "Lion / Elephant / Leopard",
        localText: "Shumba / Nzovu / Nkaka",
        phonetic: "shoom-bah / n-zoh-voo / n-kah-kah",
        syllables: "Shu-mba / Nzo-vu / Nka-ka",
        literalMeaning: "Lion / Elephant / Leopard",
        culturalNote: "Wildlife vocabulary; dialect forms may vary."
      },
      {
        id: "to-12",
        category: "navigation",
        english: "Where is the road to...?",
        localText: "Nzila iinda ku... ili kuli?",
        phonetic: "n-zee-lah ee-n-dah koo ee-lee koo-lee",
        syllables: "Nzi-la i-nda ku i-li ku-li",
        literalMeaning: "Where is the road to...?",
        culturalNote: "Direction phrase."
      },
      {
        id: "to-13",
        category: "market",
        english: "How much is this?",
        localText: "Mali nzi eeci?",
        phonetic: "mah-lee n-zee eh-chee",
        syllables: "Ma-li nzi ee-ci",
        literalMeaning: "How much is this?",
        culturalNote: "Documented Tonga shopping phrase."
      },
      {
        id: "to-14",
        category: "market",
        english: "Drinking water / Nshima (staple meal)",
        localText: "Meenda akunwa / Bwali",
        phonetic: "meh-ehn-dah ah-koon-wah / bwah-lee",
        syllables: "Mee-nda a-ku-nwa / Bwa-li",
        literalMeaning: "Drinking water / staple maize meal",
        culturalNote: "Bwali is the staple maize meal."
      },
      {
        id: "to-15",
        category: "market",
        english: "The food is very delicious",
        localText: "Chakulya eeci nchibotu kapati",
        phonetic: "chah-koo-lyah eh-chee n-chee-boh-too kah-pah-tee",
        syllables: "Cha-ku-lya ee-ci nchi-bo-tu ka-pa-ti",
        literalMeaning: "This food is very good.",
        culturalNote: "Food compliment."
      },
      {
        id: "to-16",
        category: "emergency",
        english: "Please help me",
        localText: "Amundigwasye",
        phonetic: "ah-moon-dee-gwah-syeh",
        syllables: "A-mu-ndi-gwa-sye",
        literalMeaning: "Please help me.",
        culturalNote: "Polite request for help."
      },
      {
        id: "to-17",
        category: "emergency",
        english: "I need a doctor / clinic",
        localText: "Ndiyanda dotolo / chipatala",
        phonetic: "n-dee-yahn-dah doh-toh-loh / chee-pah-tah-lah",
        syllables: "Ndi-ya-nda do-to-lo / chi-pa-ta-la",
        literalMeaning: "I need a doctor / clinic.",
        culturalNote: "Health emergency phrase."
      }
    ]
  }
];

export function getLanguageZoneByProvince(provinceName: string): ZambianLanguageZone {
  const norm = provinceName.toLowerCase();
  if (norm.includes("western") && !norm.includes("north")) {
    return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "lozi") || ZAMBIAN_LANGUAGE_ZONES[5];
  }
  if (norm.includes("southern")) {
    return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "tonga") || ZAMBIAN_LANGUAGE_ZONES[6];
  }
  if (norm.includes("north-western") || norm.includes("northwestern")) {
    return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "kaonde") || ZAMBIAN_LANGUAGE_ZONES[2];
  }
  if (norm.includes("eastern") || norm.includes("lusaka")) {
    return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "nyanja") || ZAMBIAN_LANGUAGE_ZONES[1];
  }
  // Copperbelt, Central, Northern, Luapula, Muchinga
  return ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === "bemba") || ZAMBIAN_LANGUAGE_ZONES[0];
}

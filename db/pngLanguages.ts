import { TOK_PISIN_PHRASEBOOK, TokPisinPhrase } from "./phrasebook";

export interface PngPhrase {
  id: string;
  category: "greetings" | "market" | "trekking" | "emergency" | "custom" | "safari" | "culture" | "navigation";
  english: string;
  localText: string;
  phonetic: string;
  syllables?: string;
  literalMeaning?: string;
  culturalNote: string;
}

export interface PngLanguageZone {
  code: string;
  name: string;
  greeting: string;
  speakerCount: string;
  primaryProvinces: string[];
  description: string;
  phrases: PngPhrase[];
}

export const PNG_LANGUAGE_ZONES: PngLanguageZone[] = [
  {
    code: "tok-pisin",
    name: "Tok Pisin",
    greeting: "Gutpela moning tru (Good morning)",
    speakerCount: "6,000,000+ speakers",
    primaryProvinces: [
      "National Capital District",
      "Eastern Highlands",
      "Western Highlands",
      "Morobe",
      "Madang",
      "East Sepik",
      "West New Britain",
      "East New Britain",
      "Simbu"
    ],
    description: "The primary national lingua franca spoken across all 22 provinces, Highlands valleys, and island archipelagos.",
    phrases: TOK_PISIN_PHRASEBOOK.map((p) => ({
      id: p.id,
      category: p.category as PngPhrase["category"],
      english: p.english,
      localText: p.tokPisin,
      phonetic: p.phonetic,
      syllables: p.phonetic,
      literalMeaning: p.english,
      culturalNote: p.culturalNote
    }))
  },
  {
    code: "hiri-motu",
    name: "Hiri Motu",
    greeting: "Daba namona (Good morning)",
    speakerCount: "500,000+ speakers",
    primaryProvinces: ["Central Province", "National Capital District", "Gulf", "Western Province", "Milne Bay", "Oro"],
    description: "Historic trading language of the Papuan coast stemming from ancient annual Hiri voyage canoe trading expeditions.",
    phrases: [
      {
        id: "hm-morning",
        category: "greetings",
        english: "Good morning",
        localText: "Daba namona",
        phonetic: "Dah-bah nah-moh-nah",
        culturalNote: "Respectful morning greeting used in Hanuabada and coastal Papuan villages."
      },
      {
        id: "hm-afternoon",
        category: "greetings",
        english: "Good afternoon",
        localText: "Adorahi namona",
        phonetic: "Ah-doh-rah-hee nah-moh-nah",
        culturalNote: "Common greeting used from midday onwards."
      },
      {
        id: "hm-thanks",
        category: "greetings",
        english: "Thank you very much",
        localText: "Tanikiu bada herea",
        phonetic: "Tah-nee-kee-oo bah-dah heh-reh-ah",
        culturalNote: "Warm expression of heartfelt gratitude to hosts and boatmen."
      },
      {
        id: "hm-howareyou",
        category: "greetings",
        english: "How are you?",
        localText: "Oi namo?",
        phonetic: "Oy nah-moh?",
        culturalNote: "Friendly casual inquiry."
      },
      {
        id: "hm-food",
        category: "market",
        english: "This food is very good",
        localText: "Inai aniani be namo herea",
        phonetic: "Ee-nye ah-nee-ah-nee beh nah-moh heh-reh-ah",
        culturalNote: "Praising freshly caught ocean fish, sago, or garden bananas."
      }
    ]
  },
  {
    code: "kuanua-tolai",
    name: "Kuanua (Tolai)",
    greeting: "Boina malana (Good morning)",
    speakerCount: "120,000+ speakers",
    primaryProvinces: ["East New Britain", "Kokopo", "Rabaul", "Baining Mountains"],
    description: "Language of the Tolai and Duke of York islanders surrounding the active Tavurvur caldera and Blanche Bay.",
    phrases: [
      {
        id: "kn-morning",
        category: "greetings",
        english: "Good morning",
        localText: "Boina malana",
        phonetic: "Boy-nah mah-lah-nah",
        culturalNote: "Standard polite morning greeting across the Gazelle Peninsula."
      },
      {
        id: "kn-thanks",
        category: "greetings",
        english: "Thank you",
        localText: "Boina tuna",
        phonetic: "Boy-nah too-nah",
        culturalNote: "Deeply appreciated acknowledgement when receiving hospitality."
      },
      {
        id: "kn-tabu",
        category: "custom",
        english: "Traditional shell money (Tabu)",
        localText: "A tabu",
        phonetic: "Ah tah-boo",
        culturalNote: "Sacred shell money strings used in customary ceremonies and land settlements."
      }
    ]
  },
  {
    code: "melpa-enga",
    name: "Melpa & Enga",
    greeting: "Anga wai (Greetings / Peace)",
    speakerCount: "550,000+ speakers",
    primaryProvinces: ["Western Highlands", "Enga Province", "Wahgi Valley", "Mount Hagen"],
    description: "Highland indigenous languages spoken in the Wahgi Valley and high alpine valleys near Mount Hagen.",
    phrases: [
      {
        id: "mp-greetings",
        category: "greetings",
        english: "Greetings / Peace be with you",
        localText: "Anga wai",
        phonetic: "Ahng-gah wye",
        culturalNote: "Traditional warrior and elder greeting in Western Highlands villages."
      },
      {
        id: "mp-sing-sing",
        category: "culture",
        english: "Tribal festival dance (Sing-Sing)",
        localText: "Moka sing-sing",
        phonetic: "Moh-kah sing-sing",
        culturalNote: "Customary competitive exchange festival and plumage dance."
      }
    ]
  }
];

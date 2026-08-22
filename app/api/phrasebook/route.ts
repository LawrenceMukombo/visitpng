import {ZAMBIAN_LANGUAGE_ZONES} from "../../../db/zambianLanguages";
import {TOK_PISIN_PHRASEBOOK, VILLAGE_ETIQUETTE_RULES} from "../../../db/phrasebook";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const country = url.searchParams.get("country")?.toLowerCase() || "zmb";
  const zone = url.searchParams.get("zone")?.toLowerCase();
  const category = url.searchParams.get("category");
  const q = url.searchParams.get("q");

  if (country === "png") {
    let phrases = TOK_PISIN_PHRASEBOOK;
    if (category && category !== "all") {
      phrases = phrases.filter(p => p.category === category);
    }
    if (q && q.trim()) {
      const term = q.toLowerCase().trim();
      phrases = phrases.filter(p => 
        p.tokPisin.toLowerCase().includes(term) ||
        p.english.toLowerCase().includes(term) ||
        p.phonetic.toLowerCase().includes(term) ||
        p.culturalNote.toLowerCase().includes(term)
      );
    }
    return Response.json({
      success: true,
      country: "PNG",
      total: phrases.length,
      phrases,
      etiquetteRules: VILLAGE_ETIQUETTE_RULES
    });
  }

  // Zambia Default
  const selectedZone = zone ? ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === zone) : null;
  let allPhrases = selectedZone ? selectedZone.phrases : ZAMBIAN_LANGUAGE_ZONES.flatMap(z => z.phrases);

  if (category && category !== "all") {
    allPhrases = allPhrases.filter(p => p.category === category);
  }

  if (q && q.trim()) {
    const term = q.toLowerCase().trim();
    allPhrases = allPhrases.filter(p => 
      p.localText.toLowerCase().includes(term) ||
      p.english.toLowerCase().includes(term) ||
      p.phonetic.toLowerCase().includes(term) ||
      (p.culturalNote && p.culturalNote.toLowerCase().includes(term))
    );
  }

  return Response.json({
    success: true,
    country: "ZMB",
    total: allPhrases.length,
    zones: ZAMBIAN_LANGUAGE_ZONES.map(z => ({ name: z.name, code: z.code, regionLabel: z.regionLabel, primaryProvinces: z.primaryProvinces, speakerCount: z.speakerCount })),
    phrases: allPhrases
  });
}

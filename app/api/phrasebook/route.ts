import { PNG_LANGUAGE_ZONES } from "../../../db/pngLanguages";
import { TOK_PISIN_PHRASEBOOK, VILLAGE_ETIQUETTE_RULES } from "../../../db/phrasebook";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const zone = url.searchParams.get("zone")?.toLowerCase();
  const category = url.searchParams.get("category");
  const q = url.searchParams.get("q");

  if (!zone || zone === "tok-pisin") {
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
      zones: PNG_LANGUAGE_ZONES,
      etiquetteRules: VILLAGE_ETIQUETTE_RULES
    });
  }

  const selectedZone = PNG_LANGUAGE_ZONES.find(z => z.code === zone);
  let allPhrases = selectedZone ? selectedZone.phrases : PNG_LANGUAGE_ZONES.flatMap(z => z.phrases);

  if (category && category !== "all") {
    allPhrases = allPhrases.filter(p => p.category === category);
  }

  if (q && q.trim()) {
    const term = q.toLowerCase().trim();
    allPhrases = allPhrases.filter(p =>
      p.localText.toLowerCase().includes(term) ||
      p.english.toLowerCase().includes(term) ||
      p.phonetic.toLowerCase().includes(term) ||
      p.culturalNote.toLowerCase().includes(term)
    );
  }

  return Response.json({
    success: true,
    country: "PNG",
    zone: selectedZone?.code || "all",
    total: allPhrases.length,
    phrases: allPhrases,
    zones: PNG_LANGUAGE_ZONES,
    etiquetteRules: VILLAGE_ETIQUETTE_RULES
  });
}

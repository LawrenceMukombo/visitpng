import {TOK_PISIN_PHRASEBOOK, VILLAGE_ETIQUETTE_RULES} from "../../../db/phrasebook";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const q = url.searchParams.get("q");

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
    total: phrases.length,
    phrases,
    etiquetteRules: VILLAGE_ETIQUETTE_RULES
  });
}

import { PNG_LANGUAGE_ZONES, PngPhrase } from "../../../../db/pngLanguages";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json({
      success: true,
      zones: PNG_LANGUAGE_ZONES,
      totalZones: PNG_LANGUAGE_ZONES.length,
      totalPhrases: PNG_LANGUAGE_ZONES.reduce((acc, z) => acc + z.phrases.length, 0)
    });
  } catch {
    return Response.json({ success: false, error: "Failed to load language data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { zoneCode, phrase } = body;

    if (!zoneCode || !phrase || !phrase.english || !phrase.localText) {
      return Response.json({ success: false, error: "zoneCode, english, and localText are required" }, { status: 400 });
    }

    const targetZone = PNG_LANGUAGE_ZONES.find(z => z.code === zoneCode);
    if (!targetZone) {
      return Response.json({ success: false, error: `Language zone '${zoneCode}' not found` }, { status: 404 });
    }

    const existingIndex = targetZone.phrases.findIndex(p => p.id === phrase.id);
    if (existingIndex >= 0) {
      targetZone.phrases[existingIndex] = {
        ...targetZone.phrases[existingIndex],
        ...phrase
      };
    } else {
      const newId = phrase.id || `${zoneCode.slice(0, 2)}-${Date.now()}`;
      const newPhrase: PngPhrase = {
        id: newId,
        category: phrase.category || "greetings",
        english: phrase.english,
        localText: phrase.localText,
        phonetic: phrase.phonetic || phrase.localText,
        syllables: phrase.syllables || phrase.localText,
        literalMeaning: phrase.literalMeaning || "",
        culturalNote: phrase.culturalNote || ""
      };
      targetZone.phrases.push(newPhrase);
    }

    return Response.json({
      success: true,
      message: "Phrase saved successfully",
      zones: PNG_LANGUAGE_ZONES
    });
  } catch {
    return Response.json({ success: false, error: "Failed to save phrase" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { zoneCode, phraseId } = body;

    if (!zoneCode || !phraseId) {
      return Response.json({ success: false, error: "zoneCode and phraseId are required" }, { status: 400 });
    }

    const targetZone = PNG_LANGUAGE_ZONES.find(z => z.code === zoneCode);
    if (!targetZone) {
      return Response.json({ success: false, error: `Language zone '${zoneCode}' not found` }, { status: 404 });
    }

    targetZone.phrases = targetZone.phrases.filter(p => p.id !== phraseId);

    return Response.json({
      success: true,
      message: "Phrase deleted successfully",
      zones: PNG_LANGUAGE_ZONES
    });
  } catch {
    return Response.json({ success: false, error: "Failed to delete phrase" }, { status: 500 });
  }
}

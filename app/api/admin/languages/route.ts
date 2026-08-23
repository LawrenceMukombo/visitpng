import { ZAMBIAN_LANGUAGE_ZONES, ZambianPhrase } from "../../../../db/zambianLanguages";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json({
      success: true,
      zones: ZAMBIAN_LANGUAGE_ZONES,
      totalZones: ZAMBIAN_LANGUAGE_ZONES.length,
      totalPhrases: ZAMBIAN_LANGUAGE_ZONES.reduce((acc, z) => acc + z.phrases.length, 0)
    });
  } catch (error) {
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

    const targetZone = ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === zoneCode);
    if (!targetZone) {
      return Response.json({ success: false, error: `Language zone '${zoneCode}' not found` }, { status: 404 });
    }

    const existingIndex = targetZone.phrases.findIndex(p => p.id === phrase.id);
    if (existingIndex >= 0) {
      // Update
      targetZone.phrases[existingIndex] = {
        ...targetZone.phrases[existingIndex],
        ...phrase
      };
    } else {
      // Create
      const newId = phrase.id || `${zoneCode.slice(0, 2)}-${Date.now()}`;
      const newPhrase: ZambianPhrase = {
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
      zones: ZAMBIAN_LANGUAGE_ZONES
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save phrase";
    return Response.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const zoneCode = url.searchParams.get("zoneCode");
    const phraseId = url.searchParams.get("phraseId");

    if (!zoneCode || !phraseId) {
      return Response.json({ success: false, error: "zoneCode and phraseId parameters are required" }, { status: 400 });
    }

    const targetZone = ZAMBIAN_LANGUAGE_ZONES.find(z => z.code === zoneCode);
    if (!targetZone) {
      return Response.json({ success: false, error: "Zone not found" }, { status: 404 });
    }

    const initialLength = targetZone.phrases.length;
    targetZone.phrases = targetZone.phrases.filter(p => p.id !== phraseId);

    if (targetZone.phrases.length === initialLength) {
      return Response.json({ success: false, error: "Phrase ID not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: `Phrase ${phraseId} deleted successfully`,
      zones: ZAMBIAN_LANGUAGE_ZONES
    });
  } catch (error) {
    return Response.json({ success: false, error: "Failed to delete phrase" }, { status: 500 });
  }
}

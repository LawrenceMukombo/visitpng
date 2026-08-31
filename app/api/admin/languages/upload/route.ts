import { PNG_LANGUAGE_ZONES, PngPhrase } from "../../../../../db/pngLanguages";

export const dynamic = "force-dynamic";

function parseCsv(csvText: string): Array<Record<string, string>> {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ""));
  const rows: Array<Record<string, string>> = [];

  for (let i = 1; i < lines.length; i++) {
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(lines[i])) !== null) {
      let val = match[1] || "";
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1).replace(/""/g, '"');
      }
      matches.push(val.trim());
      if (regex.lastIndex >= lines[i].length) break;
    }

    if (matches.length > 0) {
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = matches[idx] || "";
      });
      rows.push(row);
    }
  }

  return rows;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let csvText = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      csvText = body.csvText || "";
    } else {
      csvText = await request.text();
    }

    if (!csvText || !csvText.trim()) {
      return Response.json({ success: false, error: "No CSV content provided." }, { status: 400 });
    }

    const rows = parseCsv(csvText);
    if (rows.length === 0) {
      return Response.json({ success: false, error: "No valid data rows found in CSV." }, { status: 400 });
    }

    let insertedCount = 0;
    let updatedCount = 0;

    for (const r of rows) {
      const zoneCode = (r.zonecode || r.zone_code || r.language || r.zone || "").trim().toLowerCase();
      const english = (r.english || r.phrase_english || "").trim();
      const localText = (r.localtext || r.local_text || r.tokpisin || r.tok_pisin || r.translation || "").trim();

      if (!zoneCode || !english || !localText) continue;

      const targetZone = PNG_LANGUAGE_ZONES.find(
        z => z.code === zoneCode || z.name.toLowerCase() === zoneCode
      );

      if (!targetZone) continue;

      const category = (r.category || "greetings").trim().toLowerCase() as PngPhrase["category"];
      const phonetic = (r.phonetic || localText).trim();
      const syllables = (r.syllables || phonetic).trim();
      const literalMeaning = (r.literalmeaning || r.literal_meaning || "").trim();
      const culturalNote = (r.culturalnote || r.cultural_note || "").trim();

      const existingIndex = targetZone.phrases.findIndex(
        p => p.english.toLowerCase() === english.toLowerCase()
      );

      if (existingIndex >= 0) {
        targetZone.phrases[existingIndex] = {
          ...targetZone.phrases[existingIndex],
          category,
          localText,
          phonetic,
          syllables,
          literalMeaning,
          culturalNote
        };
        updatedCount++;
      } else {
        targetZone.phrases.push({
          id: `${zoneCode.slice(0, 2)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          category,
          english,
          localText,
          phonetic,
          syllables,
          literalMeaning,
          culturalNote
        });
        insertedCount++;
      }
    }

    return Response.json({
      success: true,
      message: `CSV import completed: ${insertedCount} phrases added, ${updatedCount} updated.`,
      insertedCount,
      updatedCount,
      zones: PNG_LANGUAGE_ZONES
    });
  } catch (error) {
    return Response.json({ success: false, error: `Failed to process CSV: ${String(error)}` }, { status: 500 });
  }
}

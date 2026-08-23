import { ZAMBIAN_LANGUAGE_ZONES, ZambianPhrase } from "../../../../../db/zambianLanguages";

export const dynamic = "force-dynamic";

function parseCsv(csvText: string): Array<Record<string, string>> {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ""));
  const rows: Array<Record<string, string>> = [];

  for (let i = 1; i < lines.length; i++) {
    // Regex for CSV with quoted fields support
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

    for (const row of rows) {
      const zoneCode = (row["zone_code"] || row["zone"] || row["language"] || "").toLowerCase().trim();
      const english = (row["english"] || row["english_meaning"] || "").trim();
      const localText = (row["local_text"] || row["local"] || row["phrase"] || "").trim();

      if (!zoneCode || !english || !localText) continue;

      const targetZone = ZAMBIAN_LANGUAGE_ZONES.find(
        z => z.code.toLowerCase() === zoneCode || z.name.toLowerCase().includes(zoneCode)
      );

      if (!targetZone) continue;

      const rawCategory = (row["category"] || "greetings").toLowerCase().trim();
      const validCategories: Array<"greetings" | "safari" | "market" | "navigation" | "emergency" | "culture"> = [
        "greetings", "safari", "market", "navigation", "emergency", "culture"
      ];
      const category: "greetings" | "safari" | "market" | "navigation" | "emergency" | "culture" =
        validCategories.find(c => c === rawCategory) || "greetings";
      const phonetic = (row["phonetic"] || localText).trim();
      const syllables = (row["syllables"] || localText).trim();
      const literalMeaning = (row["literal_meaning"] || row["literal"] || "").trim();
      const culturalNote = (row["cultural_note"] || row["note"] || "").trim();

      const existingIndex = targetZone.phrases.findIndex(
        p => p.localText.toLowerCase() === localText.toLowerCase() || p.english.toLowerCase() === english.toLowerCase()
      );

      if (existingIndex >= 0) {
        targetZone.phrases[existingIndex] = {
          ...targetZone.phrases[existingIndex],
          category: ["greetings", "safari", "market", "navigation", "emergency", "culture"].includes(category) ? category : "greetings",
          english,
          localText,
          phonetic,
          syllables,
          literalMeaning,
          culturalNote
        };
        updatedCount++;
      } else {
        const newPhrase: ZambianPhrase = {
          id: `${zoneCode.slice(0, 2)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          category: ["greetings", "safari", "market", "navigation", "emergency", "culture"].includes(category) ? category : "greetings",
          english,
          localText,
          phonetic,
          syllables,
          literalMeaning,
          culturalNote
        };
        targetZone.phrases.push(newPhrase);
        insertedCount++;
      }
    }

    return Response.json({
      success: true,
      message: `Successfully processed CSV: ${insertedCount} phrases added, ${updatedCount} phrases updated.`,
      insertedCount,
      updatedCount,
      zones: ZAMBIAN_LANGUAGE_ZONES
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Failed to parse CSV upload.";
    return Response.json({ success: false, error: errorMsg }, { status: 400 });
  }
}

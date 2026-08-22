import { getCatalogue } from "../../../db/catalogue";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") ?? "";
    const category = url.searchParams.get("category") ?? "all";
    const country = url.searchParams.get("country") ?? "ZMB";
    const data = await getCatalogue(q, category, country);
    return Response.json(data, { headers: { "Cache-Control": "public, max-age=60" } });
  } catch (error) {
    console.error("catalogue_error", error);
    return Response.json({ error: "Catalogue data is not available right now." }, { status: 503 });
  }
}





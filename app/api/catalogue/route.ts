import { getCatalogue } from "../../../db/catalogue";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const category = url.searchParams.get("category") ?? "all";
  const country = url.searchParams.get("country") ?? "ZMB";

  try {
    const data = await getCatalogue(q, category, country);
    return Response.json(data, { headers: { "Cache-Control": "public, max-age=60" } });
  } catch (error) {
    console.error("catalogue_error_first_attempt", error);
    try {
      // Retry once in case of initial database migration lock
      const data = await getCatalogue(q, category, country);
      return Response.json(data, { headers: { "Cache-Control": "public, max-age=30" } });
    } catch (retryError) {
      console.error("catalogue_error_retry", retryError);
      return Response.json({ error: "Catalogue data is not available right now." }, { status: 503 });
    }
  }
}





import {PNG_FESTIVALS} from "../../../db/festivals";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const month = url.searchParams.get("month");
  const region = url.searchParams.get("region");

  if (id) {
    const festival = PNG_FESTIVALS.find(f => f.id === id);
    if (!festival) {
      return Response.json({ success: false, error: "Festival not found" }, { status: 404 });
    }
    return Response.json({ success: true, festival });
  }

  let filtered = PNG_FESTIVALS;
  if (month && month !== "all") {
    filtered = filtered.filter(f => f.month.toLowerCase() === month.toLowerCase());
  }
  if (region && region !== "all") {
    filtered = filtered.filter(f => f.region.toLowerCase() === region.toLowerCase());
  }

  return Response.json({
    success: true,
    total: filtered.length,
    festivals: filtered
  });
}

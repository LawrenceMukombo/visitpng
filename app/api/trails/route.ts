import {PNG_TRAIL_PACKS, generateGpx} from "../../../db/trailPacks";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id")?.toLowerCase();
  const format = url.searchParams.get("format")?.toLowerCase();

  if (id) {
    const trail = PNG_TRAIL_PACKS.find(t => t.id === id);
    if (!trail) {
      return Response.json({ success: false, error: "Trail pack not found" }, { status: 404 });
    }

    if (format === "gpx") {
      const gpxContent = generateGpx(trail);
      return new Response(gpxContent, {
        headers: {
          "Content-Type": "application/gpx+xml; charset=utf-8",
          "Content-Disposition": `attachment; filename="${trail.id}.gpx"`
        }
      });
    }

    return Response.json({ success: true, trail });
  }

  return Response.json({
    success: true,
    total: PNG_TRAIL_PACKS.length,
    trails: PNG_TRAIL_PACKS
  });
}

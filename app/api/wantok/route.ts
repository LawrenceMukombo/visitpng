import {CURATED_ITINERARIES, generateCustomItinerary} from "../../../db/wantokAi";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const it = CURATED_ITINERARIES.find(i => i.id === id);
    if (!it) {
      return Response.json({ success: false, error: "Itinerary not found" }, { status: 404 });
    }
    return Response.json({ success: true, itinerary: it });
  }

  return Response.json({
    success: true,
    itineraries: CURATED_ITINERARIES
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {interests, durationDays, travelStyle, fitnessLevel} = body;

    const itinerary = generateCustomItinerary(
      Array.isArray(interests) ? interests : [interests || "Culture"],
      Number(durationDays) || 7,
      travelStyle || "Cultural Immersion",
      fitnessLevel || "moderate"
    );

    return Response.json({
      success: true,
      itinerary
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Failed to generate itinerary";
    return Response.json({ success: false, error: errorMsg }, { status: 400 });
  }
}

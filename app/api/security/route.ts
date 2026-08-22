import { NextResponse } from "next/server";
import { EMERGENCY_CONTACTS, REGIONAL_ADVISORIES, SAFETY_GUIDELINES } from "@/db/securityAdvisory";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get("region");

  let advisories = REGIONAL_ADVISORIES;
  if (regionId && regionId !== "all") {
    advisories = advisories.filter((a) => a.regionId === regionId);
  }

  return NextResponse.json({
    success: true,
    data: {
      advisories,
      guidelines: SAFETY_GUIDELINES,
      emergencyContacts: EMERGENCY_CONTACTS,
      lastUpdated: "2026-08-22",
      nationalAdvisoryLevel: "exercise_high_caution",
      hotlineSummary: {
        ambulance: "111",
        police: "112",
        touristAssistance: "+675 321 4188"
      }
    }
  });
}

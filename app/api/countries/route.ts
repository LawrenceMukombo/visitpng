import { NextResponse } from "next/server";
import { getAllCountries, getCountryByCode } from "../../../db/countries";
import { ensureCountryGeography } from "../../../db/geography";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
      await ensureCountryGeography(code);
      const country = await getCountryByCode(code);
      if (!country) {
        return NextResponse.json({ error: "Country not found" }, { status: 404 });
      }
      return NextResponse.json({ country });
    }

    await ensureCountryGeography("PNG");
    await ensureCountryGeography("ZMB");
    const countries = await getAllCountries();
    return NextResponse.json({ countries });
  } catch (error) {
    console.error("Failed to load countries:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { PNG_PROVINCES_GEOJSON, PNG_DISTRICTS_GEOJSON, PNG_MAP_BOUNDS } from "../../../../db/pngShapefiles";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = (searchParams.get("level") || "adm1").toLowerCase();
    const provinceFilter = searchParams.get("province")?.toUpperCase();

    if (level === "adm0" || level === "country") {
      return NextResponse.json({
        type: "FeatureCollection",
        metadata: {
          title: "Papua New Guinea National Sovereign Boundary (ADM0)",
          isoAlpha3: "PNG",
          bounds: PNG_MAP_BOUNDS,
          source: "PNG National Mapping Bureau & GADM Standard"
        },
        features: [
          {
            type: "Feature",
            id: "PNG",
            properties: {
              iso3: "PNG",
              name: "Papua New Guinea",
              capital: "Port Moresby",
              provincesCount: 22,
              regionsCount: 4,
              currency: "PGK",
              bounds: PNG_MAP_BOUNDS
            },
            geometry: {
              type: "MultiPolygon",
              coordinates: PNG_PROVINCES_GEOJSON.features.flatMap(f => {
                if (f.geometry.type === "Polygon") return [f.geometry.coordinates as number[][][]];
                if (f.geometry.type === "MultiPolygon") return f.geometry.coordinates as number[][][][];
                return [];
              })
            }
          }
        ]
      });
    }

    if (level === "adm2" || level === "districts") {
      let filteredDistricts = PNG_DISTRICTS_GEOJSON.features;
      if (provinceFilter) {
        filteredDistricts = filteredDistricts.filter(f => f.properties.provinceCode.toUpperCase() === provinceFilter);
      }
      return NextResponse.json({
        type: "FeatureCollection",
        metadata: {
          level: "ADM2",
          title: "Papua New Guinea Administrative Districts",
          count: filteredDistricts.length,
          provinceFilter: provinceFilter || "ALL"
        },
        features: filteredDistricts
      });
    }

    // Default: ADM1 (22 Provinces)
    let filteredProvinces = PNG_PROVINCES_GEOJSON.features;
    if (provinceFilter) {
      filteredProvinces = filteredProvinces.filter(f => f.properties.code.toUpperCase() === provinceFilter);
    }

    return NextResponse.json({
      type: "FeatureCollection",
      metadata: {
        level: "ADM1",
        title: "Papua New Guinea 22 Provinces Boundaries",
        count: filteredProvinces.length,
        bounds: PNG_MAP_BOUNDS
      },
      features: filteredProvinces
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load GIS shapefile boundaries", details: String(error) },
      { status: 500 }
    );
  }
}

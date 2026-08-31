import { env } from "../../../db/runtime";
import { ensureCatalogue } from "../../../db/catalogue";
import { PNG_REGIONS, PNG_PROVINCES, findLocationSmartHierarchy as findPngSmartHierarchy } from "../../../db/pngGeography";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await ensureCatalogue();
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim().toLowerCase() || "";
  const province = url.searchParams.get("province")?.trim().toLowerCase() || "";
  const region = url.searchParams.get("region")?.trim().toLowerCase() || "";
  const format = url.searchParams.get("format")?.trim().toLowerCase() || "";

  if (q && format === "smart") {
    const match = findPngSmartHierarchy(q);
    return Response.json({ success: true, match });
  }

  const likeQ = `%${q}%`;
  const likeProv = `%${province}%`;
  const likeReg = `%${region}%`;

  const rows = await env.DB.prepare(`
    SELECT 
      d.id AS id,
      d.slug AS slug,
      d.name AS name,
      d.district AS district,
      d.summary AS summary,
      d.latitude AS latitude,
      d.longitude AS longitude,
      d.cover_image_url AS coverImageUrl,
      d.source_url AS sourceUrl,
      pv.id AS provinceId,
      pv.code AS provinceCode,
      pv.name AS provinceName,
      pv.region AS region,
      COUNT(l.id) AS facilityCount
    FROM destinations d
    JOIN provinces pv ON pv.id=d.province_id
    LEFT JOIN listings l ON l.destination_id=d.id AND l.publication_status='published'
    WHERE (?='' OR LOWER(d.name) LIKE ? OR LOWER(d.summary) LIKE ? OR LOWER(COALESCE(d.district,'')) LIKE ?)
      AND (?='' OR LOWER(pv.code)=? OR LOWER(pv.name) LIKE ?)
      AND (?='' OR LOWER(pv.region)=? OR LOWER(pv.region) LIKE ?)
    GROUP BY d.id
    ORDER BY pv.region, pv.name, d.name
  `).bind(q, likeQ, likeQ, likeQ, province, province, likeProv, region, region, likeReg).all();

  const provinces = await env.DB.prepare(`
    SELECT pv.id, pv.code, pv.name, pv.region, COUNT(d.id) AS destinationCount
    FROM provinces pv
    LEFT JOIN destinations d ON d.province_id=pv.id
    GROUP BY pv.id
    ORDER BY pv.region, pv.name
  `).all();

  const cascadeTree = PNG_REGIONS.map(reg => ({
    region: reg.name,
    label: reg.label,
    description: reg.description,
    provinces: PNG_PROVINCES.filter(p => p.region === reg.name).map(prov => {
      const dbDestinations = (rows.results as { provinceCode: string; name: string; slug: string; district: string | null }[])
        .filter(r => r.provinceCode === prov.code);
      return {
        code: prov.code,
        name: prov.name,
        capital: prov.capital,
        districts: prov.districts,
        registeredDestinations: dbDestinations
      };
    })
  }));

  return Response.json({
    success: true,
    data: {
      totalDestinations: rows.results.length,
      totalProvinces: provinces.results.length,
      destinations: rows.results,
      provinces: provinces.results,
      cascade: cascadeTree
    }
  });
}

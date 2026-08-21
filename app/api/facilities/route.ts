import {env} from "../../../db/runtime";
import {ensureCatalogue} from "../../../db/catalogue";

export const dynamic="force-dynamic";

export async function GET(request:Request){
  await ensureCatalogue();
  const url=new URL(request.url);
  const q=url.searchParams.get("q")?.trim().toLowerCase()||"";
  const category=url.searchParams.get("category")?.trim().toLowerCase()||"";
  const destination=url.searchParams.get("destination")?.trim().toLowerCase()||"";
  const province=url.searchParams.get("province")?.trim().toLowerCase()||"";

  const likeQ=`%${q}%`;
  const likeDest=`%${destination}%`;
  const likeProv=`%${province}%`;

  const rows=await env.DB.prepare(`
    SELECT 
      l.id,
      l.slug,
      l.name,
      l.summary,
      l.image_url AS imageUrl,
      l.photo_credit AS photoCredit,
      COALESCE(l.deep_link_url, p.source_url) AS deepLinkUrl,
      l.tag,
      l.currency,
      l.base_price AS basePrice,
      l.member_price AS memberPrice,
      l.rating,
      l.review_count AS reviewCount,
      l.verification_status AS verificationStatus,
      c.slug AS categorySlug,
      c.name AS categoryName,
      c.icon AS categoryIcon,
      d.id AS destinationId,
      d.slug AS destinationSlug,
      d.name AS destinationName,
      d.district AS district,
      d.latitude,
      d.longitude,
      pv.id AS provinceId,
      pv.code AS provinceCode,
      pv.name AS provinceName,
      pv.region AS provinceRegion,
      p.id AS providerId,
      p.slug AS providerSlug,
      p.trading_name AS providerName,
      p.source_url AS providerWebsiteUrl
    FROM listings l
    JOIN destinations d ON d.id=l.destination_id
    JOIN provinces pv ON pv.id=d.province_id
    JOIN categories c ON c.id=l.category_id
    JOIN providers p ON p.id=l.provider_id
    WHERE l.publication_status='published'
      AND (?='' OR LOWER(l.name) LIKE ? OR LOWER(l.summary) LIKE ? OR LOWER(l.tag) LIKE ? OR LOWER(d.name) LIKE ? OR LOWER(pv.name) LIKE ? OR LOWER(p.trading_name) LIKE ?)
      AND (?='' OR c.slug=?)
      AND (?='' OR LOWER(d.slug)=? OR LOWER(d.name) LIKE ?)
      AND (?='' OR LOWER(pv.code)=? OR LOWER(pv.name) LIKE ?)
    ORDER BY l.rating DESC, l.name ASC
  `).bind(
    q,likeQ,likeQ,likeQ,likeQ,likeQ,likeQ,
    category,category,
    destination,destination,likeDest,
    province,province,likeProv
  ).all();

  return Response.json({
    success: true,
    data: {
      total: rows.results.length,
      facilities: rows.results
    }
  });
}

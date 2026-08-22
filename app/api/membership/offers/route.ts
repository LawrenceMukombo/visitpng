import { getDiscoverableOffers } from "../../../../db/membershipEcosystem";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const categorySlug = searchParams.get("category") || undefined;
  const provinceCode = searchParams.get("province") || undefined;
  const tier = searchParams.get("tier") || undefined;

  try {
    const data = await getDiscoverableOffers({
      search,
      categorySlug,
      provinceCode,
      tier
    });
    return Response.json(data);
  } catch (error) {
    console.error("offers_error", error);
    return Response.json({ error: "Offers could not be retrieved." }, { status: 500 });
  }
}

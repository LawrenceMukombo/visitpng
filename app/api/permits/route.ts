import { PNG_PERMIT_TYPES, createPermit, IssuedPermit } from "../../../db/permits";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const typeId = url.searchParams.get("typeId");

  const allTypes = PNG_PERMIT_TYPES;

  if (typeId) {
    const type = allTypes.find(p => p.id === typeId);
    if (!type) {
      return Response.json({ success: false, error: "Permit type not found" }, { status: 404 });
    }
    return Response.json({ success: true, permitType: type });
  }

  return Response.json({
    success: true,
    types: allTypes
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {permitTypeId, holderName, passportOrId, visitorTier, countryOfOrigin, startDate, currencyPaid} = body;

    if (!permitTypeId) {
      return Response.json({ success: false, error: "Permit type is required" }, { status: 400 });
    }
    if (!holderName || !holderName.trim()) {
      return Response.json({ success: false, error: "Holder name is required" }, { status: 400 });
    }

    const permit: IssuedPermit = createPermit(
      permitTypeId,
      holderName,
      passportOrId || "PNG-PASS-PENDING",
      visitorTier || "international",
      countryOfOrigin || "International",
      startDate || new Date().toISOString().split("T")[0],
      currencyPaid || "PGK"
    );

    return Response.json({
      success: true,
      message: "Digital permit issued successfully",
      permit
    });
  } catch (error) {
    return Response.json({ success: false, error: `Failed to issue permit: ${String(error)}` }, { status: 500 });
  }
}

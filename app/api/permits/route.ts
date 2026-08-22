import {PNG_PERMIT_TYPES, createPermit, IssuedPermit} from "../../../db/permits";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const typeId = url.searchParams.get("typeId");

  if (typeId) {
    const type = PNG_PERMIT_TYPES.find(p => p.id === typeId);
    if (!type) {
      return Response.json({ success: false, error: "Permit type not found" }, { status: 404 });
    }
    return Response.json({ success: true, permitType: type });
  }

  return Response.json({
    success: true,
    types: PNG_PERMIT_TYPES
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {permitTypeId, holderName, passportOrId, countryOfOrigin, startDate, currencyPaid} = body;

    if (!permitTypeId) {
      return Response.json({ success: false, error: "Permit type is required" }, { status: 400 });
    }
    if (!holderName || !holderName.trim()) {
      return Response.json({ success: false, error: "Holder name is required" }, { status: 400 });
    }

    const permit: IssuedPermit = createPermit(
      permitTypeId,
      holderName,
      passportOrId || "PASSPORT-PNG",
      countryOfOrigin || "Papua New Guinea",
      startDate || new Date().toISOString().slice(0, 10),
      currencyPaid || "PGK"
    );

    return Response.json({
      success: true,
      message: "Digital permit issued successfully",
      permit
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Failed to issue permit";
    return Response.json({ success: false, error: errorMsg }, { status: 400 });
  }
}

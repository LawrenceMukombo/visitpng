import { getVisitPngUser } from "../../../auth";
import { verifyMemberForProvider, processProviderRedemption } from "../../../../db/membershipEcosystem";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (body.action === "verify") {
      const tokenOrNumber = String(body.tokenOrNumber || "").trim();
      const providerId = Number(body.providerId) || 1;
      const result = await verifyMemberForProvider(tokenOrNumber, providerId);
      return Response.json(result);
    }

    if (body.action === "confirm") {
      const user = await getVisitPngUser();
      const result = await processProviderRedemption({
        subscriptionId: Number(body.subscriptionId),
        userId: Number(body.userId),
        providerId: Number(body.providerId) || 1,
        offerId: Number(body.offerId),
        originalAmount: Number(body.originalAmount),
        branchName: body.branchName ? String(body.branchName) : undefined,
        staffName: user?.email ? user.email.split("@")[0] : (body.staffName ? String(body.staffName) : "Cashier"),
        verificationMethod: body.verificationMethod ? String(body.verificationMethod) : "dynamic_qr"
      });
      return Response.json(result);
    }

    return Response.json({ error: "Invalid action. Supported: verify, confirm" }, { status: 400 });
  } catch (error) {
    console.error("redemption_error", error);
    return Response.json({ error: (error as Error).message || "Redemption failed" }, { status: 400 });
  }
}

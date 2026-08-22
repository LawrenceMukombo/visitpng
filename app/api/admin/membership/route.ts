import { getVisitPngUser } from "../../../auth";
import { requireAdministrator } from "../../../../db/admin";
import { getAdminMembershipOverview, updateAdminOfferStatus, updateAdminCardStatus } from "../../../../db/membershipEcosystem";

export async function GET() {
  const user = await getVisitPngUser();
  if (!user) return Response.json({ error: "Please sign in" }, { status: 401 });

  try {
    await requireAdministrator(user);
    const data = await getAdminMembershipOverview();
    return Response.json(data);
  } catch (error) {
    console.error("admin_membership_get_error", error);
    return Response.json({ error: (error as Error).message || "Admin access required" }, { status: 403 });
  }
}

export async function POST(request: Request) {
  const user = await getVisitPngUser();
  if (!user) return Response.json({ error: "Please sign in" }, { status: 401 });

  try {
    await requireAdministrator(user);
    const body = (await request.json()) as Record<string, unknown>;

    if (body.action === "moderate_offer") {
      const offerId = Number(body.offerId);
      const status = body.status as "approved" | "rejected" | "suspended";
      await updateAdminOfferStatus(offerId, status, user.email);
    } else if (body.action === "update_card_status") {
      const cardId = Number(body.cardId);
      const status = body.status as "approved" | "printing" | "dispatched" | "delivered" | "cancelled";
      const trackingNumber = body.trackingNumber ? String(body.trackingNumber) : undefined;
      await updateAdminCardStatus(cardId, status, trackingNumber);
    } else {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }

    const data = await getAdminMembershipOverview();
    return Response.json({ success: true, ...data });
  } catch (error) {
    console.error("admin_membership_post_error", error);
    return Response.json({ error: (error as Error).message || "Admin action failed" }, { status: 400 });
  }
}

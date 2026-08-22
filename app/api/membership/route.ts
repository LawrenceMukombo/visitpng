import { getVisitPngUser } from "../../auth";
import { cancelMembership, getMembership, issueBenefit, selectPlan } from "../../../db/membership";
import { getTouristMembershipHub } from "../../../db/membershipEcosystem";
import { env } from "../../../db/runtime";
import { getOrCreateAccount } from "../../../db/accounts";

export async function GET() {
  const user = await getVisitPngUser();
  if (!user) return Response.json({ error: "Please sign in" }, { status: 401 });

  try {
    const legacy = await getMembership(user);
    const hub = await getTouristMembershipHub(user);
    return Response.json({
      ...legacy,
      ...hub
    });
  } catch (error) {
    console.error("membership_get_error", error);
    return Response.json({ error: "Membership not available right now" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const user = await getVisitPngUser();
  if (!user) return Response.json({ error: "Please sign in" }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (body.action === "select") {
      await selectPlan(user, Number(body.planId));
    } else if (body.action === "cancel") {
      await cancelMembership(user);
    } else if (body.action === "benefit") {
      await issueBenefit(user, Number(body.benefitId));
    } else if (body.action === "request_physical_card") {
      const account = await getOrCreateAccount(user);
      const sub = await env.DB.prepare(`
        SELECT id, member_number, membership_tier FROM membership_subscriptions
        WHERE user_id = ? AND status IN ('active','complimentary')
        ORDER BY created_at DESC LIMIT 1
      `).bind(account.id).first<{ id: number; member_number: string; membership_tier: string }>();

      if (!sub) throw new Error("Active membership required to request physical card");

      await env.DB.prepare(`
        INSERT INTO membership_cards (subscription_id, user_id, member_number, card_tier, delivery_address, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        sub.id, account.id, sub.member_number, sub.membership_tier || "explorer",
        String(body.deliveryAddress || "Port Moresby, Papua New Guinea"), new Date().toISOString()
      ).run();

      await env.DB.prepare(`
        UPDATE membership_subscriptions SET physical_card_status = 'requested' WHERE id = ?
      `).bind(sub.id).run();
    } else if (body.action === "add_family_member") {
      const account = await getOrCreateAccount(user);
      const sub = await env.DB.prepare(`
        SELECT id, member_number FROM membership_subscriptions
        WHERE user_id = ? AND status IN ('active','complimentary')
        ORDER BY created_at DESC LIMIT 1
      `).bind(account.id).first<{ id: number; member_number: string }>();

      if (!sub) throw new Error("Active Family Pass required to link members");

      const count = await env.DB.prepare("SELECT COUNT(*) as count FROM family_group_members WHERE primary_subscription_id = ?").bind(sub.id).first<{ count: number }>();
      if (Number(count?.count || 0) >= 4) throw new Error("Maximum 4 family members permitted on this pass");

      const famMemberNumber = `${sub.member_number}-F${Number(count?.count || 0) + 1}`;
      await env.DB.prepare(`
        INSERT INTO family_group_members (primary_subscription_id, full_name, relationship, member_number, created_at)
        VALUES (?, ?, ?, ?, ?)
      `).bind(sub.id, String(body.fullName || "Family Member"), String(body.relationship || "Dependant"), famMemberNumber, new Date().toISOString()).run();
    } else {
      return Response.json({ error: "Please choose an available option" }, { status: 400 });
    }

    const legacy = await getMembership(user);
    const hub = await getTouristMembershipHub(user);
    return Response.json({
      ...legacy,
      ...hub
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message || "Membership update failed" }, { status: 400 });
  }
}

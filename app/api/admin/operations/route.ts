import { NextRequest } from "next/server";
import { getVisitPngUser } from "../../../auth";
import { requireAdministrator } from "../../../../db/admin";
import { env } from "../../../../db/runtime";
import { ensureBookings } from "../../../../db/bookings";
import { ensureReviews } from "../../../../db/reviews";

export async function GET() {
  try {
    const user = await getVisitPngUser();
    if (!user) return Response.json({ error: "Please sign in" }, { status: 401 });

    const admin = await requireAdministrator(user);
    await ensureBookings();
    await ensureReviews();

    const bookings = await env.DB.prepare(`
      SELECT 
        b.id,
        b.reference,
        b.status,
        b.currency,
        b.subtotal,
        b.total,
        b.start_date AS startDate,
        b.end_date AS endDate,
        b.guest_count AS guestCount,
        b.contact_name AS contactName,
        b.contact_mobile AS contactMobile,
        b.created_at AS createdAt,
        b.updated_at AS updatedAt,
        u.email AS userEmail,
        bi.listing_id AS listingId,
        bi.listing_name AS listingName,
        bi.provider_name AS providerName,
        bi.quantity,
        bi.unit_price AS unitPrice,
        (SELECT status FROM payments p WHERE p.entity_type='booking' AND p.entity_id=b.id ORDER BY p.created_at DESC LIMIT 1) AS paymentStatus,
        (SELECT provider_reference FROM payments p WHERE p.entity_type='booking' AND p.entity_id=b.id ORDER BY p.created_at DESC LIMIT 1) AS paymentRef
      FROM bookings b
      LEFT JOIN users u ON u.id = b.user_id
      LEFT JOIN booking_items bi ON bi.booking_id = b.id
      ORDER BY b.created_at DESC
      LIMIT 200
    `).all();

    const reviews = await env.DB.prepare(`
      SELECT 
        r.id,
        r.overall_rating AS overallRating,
        r.value_rating AS valueRating,
        r.service_rating AS serviceRating,
        r.safety_rating AS safetyRating,
        r.title,
        r.body,
        r.verification_type AS verificationType,
        r.moderation_status AS moderationStatus,
        r.moderation_reason AS moderationReason,
        r.provider_response AS providerResponse,
        r.created_at AS createdAt,
        u.email AS authorEmail,
        COALESCE(u.preferred_name, u.full_name, 'Traveller') AS authorName,
        l.id AS listingId,
        l.name AS listingName
      FROM reviews r
      JOIN listings l ON l.id = r.listing_id
      LEFT JOIN users u ON u.id = r.user_id
      ORDER BY r.created_at DESC
      LIMIT 200
    `).all();

    const disputes = await env.DB.prepare(`
      SELECT 
        d.id,
        d.review_id AS reviewId,
        d.reason,
        d.status,
        d.resolution,
        d.created_at AS createdAt,
        u.email AS raisedByEmail,
        r.title AS reviewTitle
      FROM review_disputes d
      JOIN reviews r ON r.id = d.review_id
      LEFT JOIN users u ON u.id = d.raised_by_user_id
      ORDER BY d.created_at DESC
    `).all();

    return Response.json({
      admin: { email: admin.email },
      bookings: bookings.results,
      reviews: reviews.results,
      disputes: disputes.results
    });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getVisitPngUser();
    if (!user) return Response.json({ error: "Please sign in" }, { status: 401 });

    const admin = await requireAdministrator(user);
    await ensureBookings();
    await ensureReviews();

    const body = await req.json();
    const action = String(body.action || "");
    const now = new Date().toISOString();

    if (action === "update_booking_status") {
      const bookingId = Number(body.bookingId);
      const newStatus = String(body.status || "confirmed");
      if (!bookingId) return Response.json({ error: "Invalid booking ID" }, { status: 400 });

      await env.DB.prepare("UPDATE bookings SET status=?, updated_at=? WHERE id=?").bind(newStatus, now, bookingId).run();
      await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(
        admin.id,
        admin.email,
        "admin_update_booking_status",
        "booking",
        String(bookingId),
        JSON.stringify({ newStatus }),
        now
      ).run();

      return Response.json({ ok: true, message: `Booking status updated to ${newStatus}` });
    }

    if (action === "update_review_status") {
      const reviewId = Number(body.reviewId);
      const moderationStatus = String(body.moderationStatus || "published");
      const reason = String(body.reason || `Admin updated to ${moderationStatus}`);
      if (!reviewId) return Response.json({ error: "Invalid review ID" }, { status: 400 });

      await env.DB.prepare("UPDATE reviews SET moderation_status=?, moderation_reason=?, updated_at=? WHERE id=?").bind(moderationStatus, reason, now, reviewId).run();
      await env.DB.prepare("INSERT INTO review_moderation_events (review_id,actor_user_id,action,reason,created_at) VALUES (?,?,?,?,?)").bind(
        reviewId,
        admin.id,
        `admin_${moderationStatus}`,
        reason,
        now
      ).run();

      return Response.json({ ok: true, message: `Review status updated to ${moderationStatus}` });
    }

    if (action === "delete_review") {
      const reviewId = Number(body.reviewId);
      if (!reviewId) return Response.json({ error: "Invalid review ID" }, { status: 400 });

      await env.DB.prepare("DELETE FROM reviews WHERE id=?").bind(reviewId).run();
      await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(
        admin.id,
        admin.email,
        "admin_delete_review",
        "review",
        String(reviewId),
        JSON.stringify({ deletedBy: admin.email }),
        now
      ).run();

      return Response.json({ ok: true, message: "Review deleted successfully" });
    }

    if (action === "resolve_dispute") {
      const disputeId = Number(body.disputeId);
      const resolution = String(body.resolution || "Resolved by administrator");
      const status = String(body.status || "resolved");
      if (!disputeId) return Response.json({ error: "Invalid dispute ID" }, { status: 400 });

      await env.DB.prepare("UPDATE review_disputes SET status=?, resolution=?, updated_at=? WHERE id=?").bind(status, resolution, now, disputeId).run();
      return Response.json({ ok: true, message: "Dispute resolved successfully" });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

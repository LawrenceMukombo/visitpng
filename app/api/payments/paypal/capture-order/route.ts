import { NextRequest, NextResponse } from "next/server";
import { getVisitPngUser } from "../../../../auth";
import { confirmRealBookingPayment, confirmRealMembershipPayment } from "../../../../../db/bookings";

const PAYPAL_API_URL = process.env.PAYPAL_ENVIRONMENT === "sandbox"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com";

async function getPayPalAccessToken(): Promise<string | null> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.access_token || null;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getVisitPngUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in to complete payment" }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, itemType, itemId, amount, currency = "PGK" } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Missing PayPal Order ID" }, { status: 400 });
    }

    let transactionId = orderId;
    const token = await getPayPalAccessToken();

    if (token && !String(orderId).startsWith("ORDER-")) {
      const captureResponse = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!captureResponse.ok) {
        const errDetails = await captureResponse.text();
        console.error("PayPal Capture Error:", errDetails);
        return NextResponse.json({ error: "PayPal payment capture failed" }, { status: 400 });
      }

      const captureResult = await captureResponse.json();
      transactionId = captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.id || orderId;
    }

    // Update database records
    let confirmationResult: Record<string, unknown> = { success: true };

    if (itemType === "booking" && itemId) {
      confirmationResult = await confirmRealBookingPayment(user, Number(itemId), {
        provider: "paypal",
        providerReference: transactionId,
        amount: Number(amount) || 0,
        currency
      });
    } else if (itemType === "membership" && itemId) {
      confirmationResult = await confirmRealMembershipPayment(user, Number(itemId), {
        provider: "paypal",
        providerReference: transactionId,
        amount: Number(amount) || 0,
        currency
      });
    }

    return NextResponse.json({
      success: true,
      orderId,
      transactionId,
      status: "COMPLETED",
      details: confirmationResult
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Payment capture failed";
    console.error("PayPal Capture Order Exception:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

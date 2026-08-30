import { NextRequest, NextResponse } from "next/server";
import { getVisitPngUser } from "../../../../auth";

// PayPal REST API Base URLs
const PAYPAL_API_URL = process.env.PAYPAL_ENVIRONMENT === "sandbox"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com";

async function getPayPalAccessToken(): Promise<string | null> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  if (!response.ok) {
    console.error("Failed to retrieve PayPal access token", await response.text());
    return null;
  }

  const data = await response.json();
  return data.access_token || null;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getVisitPngUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in to proceed with checkout" }, { status: 401 });
    }

    const body = await req.json();
    const { amount, currency = "USD", itemType, itemId, description } = body;

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
    }

    // PayPal supports USD, EUR, GBP, AUD, etc. If PGK, convert approx to USD (1 USD ~ 4.08 PGK)
    const paypalCurrency = ["USD", "EUR", "GBP", "AUD", "CAD"].includes(String(currency).toUpperCase())
      ? String(currency).toUpperCase()
      : "USD";

    const convertedAmount = String(currency).toUpperCase() === "PGK" || String(currency).toUpperCase() === "ZMW"
      ? (Number(amount) / 4.08).toFixed(2)
      : Number(amount).toFixed(2);

    const token = await getPayPalAccessToken();

    // If server credentials are not yet set, return structured client-side order configuration
    if (!token) {
      return NextResponse.json({
        mock: true,
        orderId: `ORDER-PNG-${Date.now()}`,
        amount: convertedAmount,
        currency: paypalCurrency,
        originalAmount: amount,
        originalCurrency: currency
      });
    }

    const orderResponse = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: `REF-${itemType}-${itemId}-${Date.now()}`,
            description: description || `ZamRoam Official Reservation (${itemType})`,
            amount: {
              currency_code: paypalCurrency,
              value: convertedAmount
            },
            custom_id: JSON.stringify({ userEmail: user.email, itemType, itemId, originalAmount: amount, originalCurrency: currency })
          }
        ],
        application_context: {
          brand_name: "ZamRoam Zambia",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: "https://zamroam.com/payments/success",
          cancel_url: "https://zamroam.com/payments/cancel"
        }
      })
    });

    if (!orderResponse.ok) {
      const errText = await orderResponse.text();
      console.error("PayPal Create Order Error:", errText);
      return NextResponse.json({ error: "Failed to create PayPal order with gateway" }, { status: 500 });
    }

    const orderData = await orderResponse.json();
    return NextResponse.json({
      orderId: orderData.id,
      status: orderData.status,
      links: orderData.links,
      amount: convertedAmount,
      currency: paypalCurrency
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("PayPal Create Order Exception:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

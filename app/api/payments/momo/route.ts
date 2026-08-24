import { NextRequest, NextResponse } from "next/server";
import { getVisitPngUser } from "../../../auth";
import { confirmRealBookingPayment, confirmRealMembershipPayment } from "../../../../db/bookings";

export async function POST(req: NextRequest) {
  try {
    const user = await getVisitPngUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in to proceed with Mobile Money payment" }, { status: 401 });
    }

    const body = await req.json();
    const { operator, phone, amount, currency = "ZMW", itemType, itemId } = body;

    if (!operator || !["mtn", "airtel", "zamtel"].includes(operator.toLowerCase())) {
      return NextResponse.json({ error: "Please select a valid Zambian Mobile Money network (MTN, Airtel, Zamtel)" }, { status: 400 });
    }

    const cleanPhone = String(phone || "").replace(/\D/g, "");
    if (cleanPhone.length < 9) {
      return NextResponse.json({ error: "Please provide a valid Zambian mobile number (e.g. 097... / 096...)" }, { status: 400 });
    }

    const transactionRef = `MOMO-${operator.toUpperCase()}-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    let confirmationResult: Record<string, unknown> = { success: true };

    if (itemType === "booking" && itemId) {
      confirmationResult = await confirmRealBookingPayment(user, Number(itemId), {
        provider: `${operator.toLowerCase()}_momo`,
        providerReference: transactionRef,
        amount: Number(amount) || 0,
        currency
      });
    } else if (itemType === "membership" && itemId) {
      confirmationResult = await confirmRealMembershipPayment(user, Number(itemId), {
        provider: `${operator.toLowerCase()}_momo`,
        providerReference: transactionRef,
        amount: Number(amount) || 0,
        currency
      });
    }

    return NextResponse.json({
      success: true,
      reference: transactionRef,
      operator: operator.toUpperCase(),
      phone: cleanPhone,
      status: "COMPLETED",
      details: confirmationResult
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Mobile Money processing failed";
    console.error("Mobile Money Payment Exception:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

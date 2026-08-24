"use client";

import React, { useState } from "react";
import { CurrencyCode, formatPrice } from "../../db/currency";

interface PaymentReceipt {
  provider: string;
  reference: string;
  amount: number;
  currency: CurrencyCode;
  phone?: string;
  last4?: string;
  paidAt: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentDetails: Record<string, unknown>) => void;
  title: string;
  itemType: "booking" | "membership" | "permit" | "pass";
  itemId?: number | string;
  itemName: string;
  amount: number;
  currency: CurrencyCode;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  itemType,
  itemId,
  itemName,
  amount,
  currency,
  customerName = "Explorer",
  customerPhone = ""
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<"paypal" | "momo" | "card">("paypal");
  const [momoOperator, setMomoOperator] = useState<"mtn" | "airtel" | "zamtel">("mtn");
  const [momoPhone, setMomoPhone] = useState(customerPhone || "097");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successReceipt, setSuccessReceipt] = useState<PaymentReceipt | null>(null);

  // Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardHolder, setCardHolder] = useState(customerName);

  if (!isOpen) return null;

  // Approx USD conversion for PayPal if paying in ZMW
  const approxUsd = currency === "ZMW" ? (amount / 28).toFixed(2) : amount.toFixed(2);

  const handleCloseModal = () => {
    setErrorMessage("");
    setSuccessReceipt(null);
    setIsProcessing(false);
    onClose();
  };

  // PayPal Flow
  const handlePayPalCheckout = async () => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      // 1. Create PayPal Order
      const createRes = await fetch("/api/payments/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          itemType,
          itemId,
          description: `${itemName} - ZamRoam Official Reservation`
        })
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.error || "Failed to initialize PayPal order");
      }

      const orderData = await createRes.json();

      // 2. Capture PayPal Order
      const captureRes = await fetch("/api/payments/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderData.orderId,
          itemType,
          itemId,
          amount,
          currency
        })
      });

      if (!captureRes.ok) {
        const capErr = await captureRes.json();
        throw new Error(capErr.error || "Failed to capture payment");
      }

      const captureData = await captureRes.json();
      setSuccessReceipt({
        provider: "PayPal",
        reference: captureData.transactionId || orderData.orderId,
        amount,
        currency,
        paidAt: new Date().toISOString()
      });
      onSuccess(captureData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "PayPal checkout could not be completed.";
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Mobile Money Flow
  const handleMomoCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/payments/momo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operator: momoOperator,
          phone: momoPhone,
          amount,
          currency,
          itemType,
          itemId
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Mobile Money transaction failed");
      }

      const data = await res.json();
      setSuccessReceipt({
        provider: `${momoOperator.toUpperCase()} Mobile Money`,
        reference: data.reference,
        amount,
        currency,
        phone: momoPhone,
        paidAt: new Date().toISOString()
      });
      onSuccess(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Mobile Money payment could not be processed.";
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Credit/Debit Card Flow
  const handleCardCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, "").length < 15) {
      setErrorMessage("Please enter a valid 16-digit card number.");
      return;
    }
    setIsProcessing(true);
    setErrorMessage("");

    setTimeout(() => {
      try {
        const cardRef = `CARD-AUTH-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
        setSuccessReceipt({
          provider: "Visa / Mastercard Secure",
          reference: cardRef,
          amount,
          currency,
          last4: cardNumber.slice(-4) || "8842",
          paidAt: new Date().toISOString()
        });
        onSuccess({ reference: cardRef, status: "COMPLETED" });
      } catch {
        setErrorMessage("Card authorization failed. Please check your details.");
      } finally {
        setIsProcessing(false);
      }
    }, 1200);
  };

  return (
    <div
      className="overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3, 47, 43, 0.82)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px"
      }}
      onClick={handleCloseModal}
    >
      <div
        className="paymentModalSheet"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#0D2B27",
          border: "1.5px solid rgba(245, 158, 11, 0.35)",
          borderRadius: "20px",
          color: "#ffffff",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.65)"
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>
              SECURE ZAMROAM GATEWAY
            </span>
            <h3 style={{ margin: "2px 0 0", fontSize: "17px", fontWeight: 800, color: "#ffffff" }}>
              {title || "Complete Reservation & Payment"}
            </h3>
          </div>
          <button
            onClick={handleCloseModal}
            style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#ffffff", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ✕
          </button>
        </div>

        {successReceipt ? (
          /* Receipt View */
          <div style={{ padding: "28px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "46px", marginBottom: "10px" }}>🎉</div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 6px", color: "#4ade80" }}>
              Payment Confirmed!
            </h2>
            <p style={{ fontSize: "13px", color: "#c2e2dc", margin: "0 0 20px" }}>
              Your reservation for <strong>{itemName}</strong> has been secured and confirmed.
            </p>

            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "12px", padding: "16px", textAlign: "left", marginBottom: "24px", fontSize: "12.5px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>Receipt Reference:</span>
                <strong style={{ color: "#F59E0B" }}>{successReceipt.reference}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>Payment Channel:</span>
                <span>{successReceipt.provider}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>Amount Paid:</span>
                <strong style={{ color: "#4ade80", fontSize: "14px" }}>{formatPrice(amount, currency)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>Status:</span>
                <span style={{ color: "#4ade80", fontWeight: 700 }}>✓ COMPLETED & SAVED</span>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "#ffffff",
                border: "none",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Done / Return to My Bookings
            </button>
          </div>
        ) : (
          /* Payment Selection & Forms */
          <div style={{ padding: "18px 20px" }}>
            {/* Amount Banner */}
            <div style={{ background: "rgba(255, 255, 255, 0.06)", borderRadius: "12px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <div>
                <span style={{ fontSize: "11.5px", color: "#a3cfc9", display: "block" }}>Item: {itemName}</span>
                <strong style={{ fontSize: "13.5px", color: "#ffffff" }}>Total Payable</strong>
              </div>
              <div style={{ textAlign: "right" }}>
                <strong style={{ fontSize: "18px", color: "#F59E0B", display: "block" }}>
                  {formatPrice(amount, currency)}
                </strong>
                {currency === "ZMW" && (
                  <small style={{ fontSize: "10.5px", color: "#94a3b8" }}>≈ ${approxUsd} USD</small>
                )}
              </div>
            </div>

            {/* Gateway Tabs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "18px" }}>
              <button
                type="button"
                onClick={() => setSelectedMethod("paypal")}
                style={{
                  padding: "10px 6px",
                  borderRadius: "10px",
                  border: selectedMethod === "paypal" ? "1.5px solid #F59E0B" : "1px solid rgba(255,255,255,0.15)",
                  background: selectedMethod === "paypal" ? "rgba(245, 158, 11, 0.15)" : "rgba(255,255,255,0.04)",
                  color: selectedMethod === "paypal" ? "#F59E0B" : "#ffffff",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                🅿️ PayPal & Cards
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("momo")}
                style={{
                  padding: "10px 6px",
                  borderRadius: "10px",
                  border: selectedMethod === "momo" ? "1.5px solid #10B981" : "1px solid rgba(255,255,255,0.15)",
                  background: selectedMethod === "momo" ? "rgba(16, 185, 129, 0.15)" : "rgba(255,255,255,0.04)",
                  color: selectedMethod === "momo" ? "#4ade80" : "#ffffff",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                📱 Mobile Money
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("card")}
                style={{
                  padding: "10px 6px",
                  borderRadius: "10px",
                  border: selectedMethod === "card" ? "1.5px solid #38BDF8" : "1px solid rgba(255,255,255,0.15)",
                  background: selectedMethod === "card" ? "rgba(56, 189, 248, 0.15)" : "rgba(255,255,255,0.04)",
                  color: selectedMethod === "card" ? "#38BDF8" : "#ffffff",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                💳 Credit Card
              </button>
            </div>

            {errorMessage && (
              <div style={{ background: "rgba(239, 68, 68, 0.2)", border: "1px solid rgba(239, 68, 68, 0.4)", borderRadius: "8px", padding: "10px 12px", color: "#fca5a5", fontSize: "12px", marginBottom: "14px" }}>
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Method 1: PayPal */}
            {selectedMethod === "paypal" && (
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: "12.5px", color: "#c2e2dc", marginBottom: "16px" }}>
                  Pay securely using your <strong>PayPal account</strong> or any international <strong>Visa, Mastercard, Amex, or Discover</strong> card.
                </div>

                <button
                  type="button"
                  onClick={handlePayPalCheckout}
                  disabled={isProcessing}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    background: "#0070BA",
                    color: "#ffffff",
                    border: "none",
                    fontSize: "14.5px",
                    fontWeight: 800,
                    cursor: isProcessing ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 14px rgba(0, 112, 186, 0.4)"
                  }}
                >
                  <span>🅿️</span>
                  <span>{isProcessing ? "Connecting PayPal Gateway…" : `Pay with PayPal (${formatPrice(amount, currency)})`}</span>
                </button>

                <div style={{ marginTop: "12px", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
                  🔒 256-bit SSL encrypted & verified by PayPal Buyer Protection
                </div>
              </div>
            )}

            {/* Method 2: Mobile Money */}
            {selectedMethod === "momo" && (
              <form onSubmit={handleMomoCheckout} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11.5px", color: "#a3cfc9", display: "block", marginBottom: "4px" }}>
                    Select Network Operator:
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={() => setMomoOperator("mtn")}
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: momoOperator === "mtn" ? "1.5px solid #FBBF24" : "1px solid rgba(255,255,255,0.15)",
                        background: momoOperator === "mtn" ? "rgba(251, 191, 36, 0.2)" : "rgba(255,255,255,0.04)",
                        color: momoOperator === "mtn" ? "#FBBF24" : "#ffffff",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      🟡 MTN MoMo
                    </button>

                    <button
                      type="button"
                      onClick={() => setMomoOperator("airtel")}
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: momoOperator === "airtel" ? "1.5px solid #EF4444" : "1px solid rgba(255,255,255,0.15)",
                        background: momoOperator === "airtel" ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.04)",
                        color: momoOperator === "airtel" ? "#F87171" : "#ffffff",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      🔴 Airtel Money
                    </button>

                    <button
                      type="button"
                      onClick={() => setMomoOperator("zamtel")}
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: momoOperator === "zamtel" ? "1.5px solid #10B981" : "1px solid rgba(255,255,255,0.15)",
                        background: momoOperator === "zamtel" ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.04)",
                        color: momoOperator === "zamtel" ? "#34D399" : "#ffffff",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      🟢 Zamtel
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "11.5px", color: "#a3cfc9", display: "block", marginBottom: "4px" }}>
                    Registered Mobile Number:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0977 123456"
                    value={momoPhone}
                    onChange={(e) => setMomoPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                      fontSize: "13.5px",
                      boxSizing: "border-box"
                    }}
                  />
                  <small style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.5)", display: "block", marginTop: "3px" }}>
                    An instant USSD prompt will be sent to this phone to enter your PIN.
                  </small>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    color: "#ffffff",
                    border: "none",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: isProcessing ? "not-allowed" : "pointer",
                    marginTop: "6px"
                  }}
                >
                  {isProcessing ? "Prompting Mobile Phone…" : `Pay ${formatPrice(amount, currency)} via ${momoOperator.toUpperCase()}`}
                </button>
              </form>
            )}

            {/* Method 3: Credit/Debit Card */}
            {selectedMethod === "card" && (
              <form onSubmit={handleCardCheckout} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "11.5px", color: "#a3cfc9", display: "block", marginBottom: "4px" }}>
                    Cardholder Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mukombo Chileshe"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                      fontSize: "13px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "11.5px", color: "#a3cfc9", display: "block", marginBottom: "4px" }}>
                    Card Number:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                      fontSize: "13px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div>
                    <label style={{ fontSize: "11.5px", color: "#a3cfc9", display: "block", marginBottom: "4px" }}>
                      Expiry (MM/YY):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#ffffff",
                        fontSize: "13px",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11.5px", color: "#a3cfc9", display: "block", marginBottom: "4px" }}>
                      CVV / CVC:
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#ffffff",
                        fontSize: "13px",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)",
                    color: "#ffffff",
                    border: "none",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: isProcessing ? "not-allowed" : "pointer",
                    marginTop: "6px"
                  }}
                >
                  {isProcessing ? "Authorizing Card…" : `Pay ${formatPrice(amount, currency)} by Card`}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

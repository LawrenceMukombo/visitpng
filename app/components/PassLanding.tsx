"use client";
import React, { useState } from "react";

export interface PassPlan {
  id: number;
  name: string;
  tier: string;
  price: number;
  duration: string;
  badgeColor: string;
  features: string[];
  popular: boolean;
}

export interface IssuedPassRecord {
  id: string;
  holderName: string;
  email: string;
  phone: string;
  planId: number;
  planName: string;
  tier: string;
  price: number;
  currency: string;
  validUntil: string;
  issuedAt: string;
  status: string;
  invoiceNumber: string;
  qrToken: string;
}

export interface PassLandingProps {
  countryCode?: string;
  currency?: string;
  onSelectPlan?: (planId: number) => void;
  onClose?: () => void;
}

export function PassLanding({
  currency = "ZMW",
  onSelectPlan,
  onClose
}: PassLandingProps) {
  const brandName = "ZamRoam";
  const passName = "ZamRoam Pass";
  const currencySymbol = "ZK";
  const isZambia = true;

  const [activeTab, setActiveTab] = useState<"plans" | "card" | "faq">("plans");
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PassPlan | null>(null);
  const [issuedPass, setIssuedPass] = useState<IssuedPassRecord | null>(null);
  const [isActivating, setIsActivating] = useState(false);
  const [memberName, setMemberName] = useState("Lawrence Mukombo");
  const [memberEmail, setMemberEmail] = useState("info@lamtoninvestments.com");
  const [memberPhone, setMemberPhone] = useState("+260573506598");
  const [paymentMethod, setPaymentMethod] = useState<"mobile_money" | "card" | "simulator">("mobile_money");
  const [mobileProvider, setMobileProvider] = useState<"airtel" | "mtn" | "zamtel">("airtel");
  const [walletNotice, setWalletNotice] = useState("");

  const plans: PassPlan[] = [
    {
      id: 1,
      name: "Explorer Pass",
      tier: "Bronze",
      price: isZambia ? 299 : 149,
      duration: "30 Days",
      badgeColor: "#CD7F32",
      features: [
        "10% Average Partner Savings",
        "Instant Digital QR Card",
        "Access to Standard ZamDeals",
        "Mobile App & Offline Access",
        "Email Customer Support"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Traveller Pass",
      tier: "Silver",
      price: isZambia ? 599 : 299,
      duration: "90 Days",
      badgeColor: "#C0C0C0",
      features: [
        "15% Average Partner Savings",
        "Priority Booking Verification",
        "Exclusive VIP ZamDeals",
        "Free Digital Offline Map Packs",
        "24/7 Concierge Trip Assistance"
      ],
      popular: true
    },
    {
      id: 3,
      name: isZambia ? "Zambia Plus" : "PNG Plus",
      tier: "Gold",
      price: isZambia ? 999 : 499,
      duration: "1 Year",
      badgeColor: "#FFD700",
      features: [
        "20% Max Partner Discounts",
        "Complimentary Safari Welcome Drink",
        "Physical NFC Member Card Dispatch",
        "Dedicated Travel Advisor",
        "National Park Permit Fast-Tracking"
      ],
      popular: false
    },
    {
      id: 4,
      name: "Family & Group Pass",
      tier: "Platinum",
      price: isZambia ? 1499 : 799,
      duration: "1 Year",
      badgeColor: "#E5E4E2",
      features: [
        "Up to 5 Family Members Covered",
        "20% Savings on Stays & Safaris",
        "5x Digital NFC & QR Member Cards",
        "VIP Airport Transfer Discounts",
        "Personalized Custom Itinerary Design"
      ],
      popular: false
    }
  ];

  const handleStartCheckout = (plan: PassPlan) => {
    setSelectedPlanForCheckout(plan);
    onSelectPlan?.(plan.id);
  };

  const handleActivatePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForCheckout) return;

    setIsActivating(true);
    setTimeout(() => {
      const validityDays = selectedPlanForCheckout.duration.includes("Year") ? 365 : selectedPlanForCheckout.duration.includes("90") ? 90 : 30;
      const expiryDate = new Date(Date.now() + validityDays * 86400000).toISOString().slice(0, 10);
      const newPass = {
        id: `ZV-M-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        holderName: memberName || "Lawrence Mukombo",
        email: memberEmail,
        phone: memberPhone,
        planId: selectedPlanForCheckout.id,
        planName: selectedPlanForCheckout.name,
        tier: selectedPlanForCheckout.tier,
        price: selectedPlanForCheckout.price,
        currency: currencySymbol,
        validUntil: expiryDate,
        issuedAt: new Date().toISOString(),
        status: "ACTIVE",
        invoiceNumber: `ZV-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        qrToken: `PASS:${selectedPlanForCheckout.tier.toUpperCase()}:${Date.now()}`
      };

      try {
        localStorage.setItem("visitpng_active_pass", JSON.stringify(newPass));
        window.dispatchEvent(new Event("storage"));
      } catch {}

      setIssuedPass(newPass);
      setSelectedPlanForCheckout(null);
      setIsActivating(false);
    }, 600);
  };

  const handleAddToWallet = (walletType: "Apple" | "Google") => {
    setWalletNotice(`📲 Pass successfully configured for ${walletType} Wallet! Pass payload securely linked to Lamton Investments Ltd.`);
    setTimeout(() => setWalletNotice(""), 4500);
  };

  return (
    <div style={{
      maxWidth: "1140px",
      margin: "0 auto",
      padding: "2rem 1.5rem 4rem",
      fontFamily: "Ubuntu, sans-serif",
      color: "#1a2e2b"
    }}>
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "2rem" }}>{isZambia ? "🇿🇲" : "🇵🇬"}</span>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "800", color: "#1B6960" }}>
              {passName}
            </h1>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "#52796F" }}>
              Discover Zambia. Experience More. Save Everywhere.
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "#e8f3f1",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              fontWeight: "700",
              color: "#1B6960"
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1B6960 0%, #0d2b27 100%)",
        color: "#ffffff",
        padding: "2.5rem 2rem",
        borderRadius: "16px",
        marginBottom: "2.5rem",
        boxShadow: "0 10px 25px rgba(27, 105, 96, 0.2)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "2rem"
      }}>
        <div style={{ maxWidth: "600px" }}>
          <div style={{
            display: "inline-block",
            background: "#DE7739",
            color: "#ffffff",
            padding: "0.3rem 0.8rem",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "700",
            letterSpacing: "0.05em",
            marginBottom: "1rem"
          }}>
            OFFICIAL TOURIST MEMBERSHIP
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: "800", lineHeight: "1.2", margin: "0 0 1rem 0" }}>
            Explore More. Pay Less Across Zambia.
          </h2>
          <p style={{ fontSize: "1.05rem", lineHeight: "1.6", color: "#e6f4f1", margin: 0 }}>
            Unlock member-exclusive rates on luxury safari lodges, Victoria Falls adventures, guided walking safaris, car rentals, and dining across 10 provinces.
          </p>
        </div>

        {/* Digital Card Preview Widget */}
        <div style={{
          background: "linear-gradient(135deg, #1a2e2b 0%, #2D6A4F 100%)",
          padding: "1.5rem",
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          width: "280px",
          color: "#ffffff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#DE7739" }}>{passName}</span>
            <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.15)", padding: "0.2rem 0.5rem", borderRadius: "10px" }}>GOLD</span>
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "0.5rem" }}>Jane Doe</div>
          <div style={{ fontSize: "0.75rem", color: "#a3cfc9", marginBottom: "1rem" }}>ID: ZV-M-2026-00482</div>
          <div style={{
            background: "#ffffff",
            padding: "0.75rem",
            borderRadius: "8px",
            textAlign: "center",
            color: "#1a2e2b",
            fontWeight: "700",
            fontSize: "0.85rem"
          }}>
            [ 📱 Dynamic Secure QR ]<br />
            <span style={{ fontSize: "0.7rem", color: "#666", fontWeight: "400" }}>Refreshes every 60s</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "2px solid #e0eeea", paddingBottom: "0.5rem" }}>
        <button
          onClick={() => setActiveTab("plans")}
          style={{
            background: "none",
            border: "none",
            fontSize: "1rem",
            fontWeight: activeTab === "plans" ? "800" : "500",
            color: activeTab === "plans" ? "#1B6960" : "#6c757d",
            cursor: "pointer",
            borderBottom: activeTab === "plans" ? "3px solid #1B6960" : "none",
            paddingBottom: "0.5rem"
          }}
        >
          Membership Plans & Pricing
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          style={{
            background: "none",
            border: "none",
            fontSize: "1rem",
            fontWeight: activeTab === "faq" ? "800" : "500",
            color: activeTab === "faq" ? "#1B6960" : "#6c757d",
            cursor: "pointer",
            borderBottom: activeTab === "faq" ? "3px solid #1B6960" : "none",
            paddingBottom: "0.5rem"
          }}
        >
          How It Works & FAQs
        </button>
      </div>

      {/* Pricing Plans Grid */}
      {activeTab === "plans" && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          {plans.map(plan => (
            <div
              key={plan.id}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                border: plan.popular ? "2px solid #1B6960" : "1px solid #d8e8e4",
                padding: "1.75rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: plan.popular ? "0 8px 24px rgba(27, 105, 96, 0.12)" : "0 2px 8px rgba(0,0,0,0.04)"
              }}
            >
              {plan.popular && (
                <div style={{
                  position: "absolute",
                  top: "-12px",
                  right: "20px",
                  background: "#DE7739",
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "10px"
                }}>
                  MOST POPULAR
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: plan.badgeColor
                }} />
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "700", color: "#1B6960" }}>
                  {plan.name}
                </h3>
              </div>
              <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem" }}>
                Valid for {plan.duration}
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1a2e2b" }}>
                  {currencySymbol}{plan.price}
                </span>
                <span style={{ fontSize: "0.85rem", color: "#888" }}>/ {currency}</span>
              </div>

              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 1.5rem 0",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                flexGrow: 1
              }}>
                {plan.features.map((feat, idx) => (
                  <li key={idx} style={{ fontSize: "0.88rem", color: "#444", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ color: "#1B6960", fontWeight: "800" }}>✓</span> {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleStartCheckout(plan)}
                style={{
                  background: plan.popular ? "#1B6960" : "#e8f3f1",
                  color: plan.popular ? "#ffffff" : "#1B6960",
                  border: "none",
                  padding: "0.8rem 1rem",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  width: "100%",
                  transition: "background 0.2s"
                }}
              >
                Get {plan.name}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* FAQ Section */}
      {activeTab === "faq" && (
        <div style={{
          background: "#f9fcfb",
          borderRadius: "14px",
          padding: "2rem",
          border: "1px solid #e0eeea",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#1B6960" }}>
              How do I redeem ZamRoam Deals with my ZamRoam Pass?
            </h4>
            <p style={{ margin: 0, color: "#555", lineHeight: "1.5", fontSize: "0.95rem" }}>
              Simply open your ZamRoam app or digital wallet on your phone, navigate to your Pass, and show your rolling QR code to the cashier or guide upon arrival or payment.
            </p>
          </div>
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#1B6960" }}>
              Can I use the Pass without internet connection?
            </h4>
            <p style={{ margin: 0, color: "#555", lineHeight: "1.5", fontSize: "0.95rem" }}>
              Yes! Your Pass and offline wilderness trail maps are securely cached in local storage. You can present your digital card even in remote national parks with no cellular signal.
            </p>
          </div>
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#1B6960" }}>
              Who operates the {brandName} platform?
            </h4>
            <p style={{ margin: 0, color: "#555", lineHeight: "1.5", fontSize: "0.95rem" }}>
              {brandName} is a commercial tourism technology platform owned and operated by <strong>Lamton Investments Ltd</strong> (Address: Plot 10444, Great East Road, Rhodes Park, Lusaka, Zambia • Tel: +260573506598 • info@lamtoninvestments.com).
            </p>
          </div>
        </div>
      )}

      {/* Checkout / Activation Modal Sheet */}
      {selectedPlanForCheckout && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setSelectedPlanForCheckout(null)}>
          <div style={{ background: "#ffffff", color: "#1a2e2b", borderRadius: "16px", maxWidth: "560px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2.2rem", fontFamily: "Ubuntu, sans-serif" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", borderBottom: "2px solid #e0eeea", paddingBottom: "1rem" }}>
              <div>
                <span style={{ display: "inline-block", background: "#e8f3f1", color: "#1B6960", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  {selectedPlanForCheckout.tier} Tier Membership
                </span>
                <h2 style={{ margin: 0, color: "#1B6960", fontSize: "1.5rem" }}>{selectedPlanForCheckout.name}</h2>
                <div style={{ fontSize: "1.2rem", fontWeight: "800", color: "#DE7739", marginTop: "0.3rem" }}>
                  {currencySymbol}{selectedPlanForCheckout.price} <small style={{ fontSize: "0.8rem", color: "#666", fontWeight: "400" }}>({selectedPlanForCheckout.duration})</small>
                </div>
              </div>
              <button onClick={() => setSelectedPlanForCheckout(null)} style={{ background: "#e8f3f1", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontWeight: "700" }}>✕</button>
            </div>

            <form onSubmit={handleActivatePass} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.85rem", fontWeight: "700", color: "#444" }}>
                Full Legal Name of Member
                <input
                  type="text"
                  required
                  value={memberName}
                  onChange={e => setMemberName(e.target.value)}
                  style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #c2d8d3", fontSize: "0.95rem" }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.85rem", fontWeight: "700", color: "#444" }}>
                Email Address for Pass & Receipt
                <input
                  type="email"
                  required
                  value={memberEmail}
                  onChange={e => setMemberEmail(e.target.value)}
                  style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #c2d8d3", fontSize: "0.95rem" }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.85rem", fontWeight: "700", color: "#444" }}>
                Mobile Number (SMS / WhatsApp Delivery)
                <input
                  type="tel"
                  required
                  value={memberPhone}
                  onChange={e => setMemberPhone(e.target.value)}
                  style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #c2d8d3", fontSize: "0.95rem" }}
                />
              </label>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#444", marginBottom: "0.5rem" }}>
                  Payment / Activation Method
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mobile_money")}
                    style={{
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: paymentMethod === "mobile_money" ? "2px solid #1B6960" : "1px solid #d8e8e4",
                      background: paymentMethod === "mobile_money" ? "#e8f3f1" : "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    📱 Mobile Money (Airtel / MTN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    style={{
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: paymentMethod === "card" ? "2px solid #1B6960" : "1px solid #d8e8e4",
                      background: paymentMethod === "card" ? "#e8f3f1" : "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    💳 Card (Visa / MC)
                  </button>
                </div>
              </div>

              {paymentMethod === "mobile_money" && isZambia && (
                <div style={{ background: "#f0f7f5", padding: "0.8rem", borderRadius: "8px", border: "1px solid #c2d8d3", display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setMobileProvider("airtel")}
                    style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: mobileProvider === "airtel" ? "2px solid #DE7739" : "1px solid #ccc", background: mobileProvider === "airtel" ? "#fff" : "#eee", fontWeight: "700", fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    🔴 Airtel Money
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileProvider("mtn")}
                    style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: mobileProvider === "mtn" ? "2px solid #DE7739" : "1px solid #ccc", background: mobileProvider === "mtn" ? "#fff" : "#eee", fontWeight: "700", fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    🟡 MTN MoMo
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileProvider("zamtel")}
                    style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: mobileProvider === "zamtel" ? "2px solid #DE7739" : "1px solid #ccc", background: mobileProvider === "zamtel" ? "#fff" : "#eee", fontWeight: "700", fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    🟢 Zamtel Kwacha
                  </button>
                </div>
              )}

              <div style={{ background: "#f8f9fa", padding: "0.8rem", borderRadius: "8px", fontSize: "0.78rem", color: "#666", lineHeight: "1.4" }}>
                🔒 Official commercial transaction managed under <strong>Lamton Investments Ltd</strong>. Includes Instant Dynamic QR Card & Official Receipt.
              </div>

              <button
                type="submit"
                disabled={isActivating}
                style={{
                  background: "#1B6960",
                  color: "#ffffff",
                  border: "none",
                  padding: "0.9rem",
                  borderRadius: "8px",
                  fontWeight: "800",
                  fontSize: "1rem",
                  cursor: isActivating ? "not-allowed" : "pointer",
                  marginTop: "0.5rem",
                  boxShadow: "0 4px 12px rgba(27, 105, 96, 0.25)"
                }}
              >
                {isActivating ? "Issuing Digital Pass..." : `Complete & Issue My ${selectedPlanForCheckout.name} (${currencySymbol}${selectedPlanForCheckout.price})`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Activated Member Pass Success Screen */}
      {issuedPass && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "#ffffff", color: "#1a2e2b", borderRadius: "20px", maxWidth: "520px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2.2rem", fontFamily: "Ubuntu, sans-serif", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎉</div>
            <h2 style={{ color: "#1B6960", margin: "0 0 0.4rem 0", fontSize: "1.6rem" }}>
              Pass Issued & Activated!
            </h2>
            <p style={{ margin: "0 0 1.5rem 0", color: "#666", fontSize: "0.92rem" }}>
              Your official <strong>{issuedPass.planName}</strong> is now live and saved to your device.
            </p>

            {/* Live Pass Card */}
            <div style={{
              background: "linear-gradient(135deg, #0d2b27 0%, #1B6960 100%)",
              borderRadius: "16px",
              padding: "1.75rem",
              color: "#ffffff",
              textAlign: "left",
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.2)",
              marginBottom: "1.5rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#DE7739" }}>{passName}</span>
                <span style={{ background: "#DE7739", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "800" }}>
                  {issuedPass.tier.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: "900", color: "#ffffff" }}>{issuedPass.holderName}</div>
              <div style={{ fontSize: "0.8rem", color: "#a3cfc9", marginBottom: "1.25rem" }}>
                Member ID: <strong>{issuedPass.id}</strong> · Valid Until: <strong>{issuedPass.validUntil}</strong>
              </div>

              {/* Dynamic QR Box */}
              <div style={{
                background: "#ffffff",
                padding: "1rem",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                color: "#1a2e2b"
              }}>
                <div style={{
                  width: "70px",
                  height: "70px",
                  background: "#1B6960",
                  borderRadius: "8px",
                  display: "grid",
                  placeItems: "center",
                  color: "#ffffff",
                  fontSize: "2rem"
                }}>
                  📱
                </div>
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "#1B6960" }}>Dynamic Secure QR</div>
                  <div style={{ fontSize: "0.75rem", color: "#666" }}>Refreshes live · Token: {issuedPass.id.slice(-5)}</div>
                  <div style={{ fontSize: "0.75rem", color: "#2e7d32", fontWeight: "700", marginTop: "0.2rem" }}>
                    ● Active Status Verified
                  </div>
                </div>
              </div>
            </div>

            {walletNotice && (
              <div style={{ background: "#e8f5e9", color: "#2e7d32", padding: "0.75rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "1rem" }}>
                {walletNotice}
              </div>
            )}

            {/* Wallet & Invoice Actions */}
            <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.2rem" }}>
              <button
                type="button"
                onClick={() => handleAddToWallet("Apple")}
                style={{ flex: 1, padding: "0.7rem", borderRadius: "8px", background: "#000000", color: "#ffffff", border: "none", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
              >
                 Apple Wallet
              </button>
              <button
                type="button"
                onClick={() => handleAddToWallet("Google")}
                style={{ flex: 1, padding: "0.7rem", borderRadius: "8px", background: "#4285F4", color: "#ffffff", border: "none", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
              >
                G Google Wallet
              </button>
            </div>

            <button
              onClick={() => {
                setIssuedPass(null);
                if (onClose) onClose();
              }}
              style={{
                width: "100%",
                background: "#1B6960",
                color: "#ffffff",
                border: "none",
                padding: "0.85rem",
                borderRadius: "8px",
                fontWeight: "800",
                fontSize: "0.95rem",
                cursor: "pointer"
              }}
            >
              Done — Start Exploring ZamDeals
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

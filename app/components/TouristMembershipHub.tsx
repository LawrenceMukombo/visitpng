"use client";

import { useState, useEffect, useCallback } from "react";
import { formatPrice, type CurrencyCode } from "../../db/currency";
import PaymentModal from "./PaymentModal";

interface BenefitItem {
  id: number;
  code: string;
  name: string;
  description: string;
  usageLimit: number | null;
}

interface PlanItem {
  id: number;
  code: string;
  name: string;
  audience: string;
  billingPeriod: string;
  price: number;
  currency: string;
  description: string;
  isComplimentary: boolean;
  tierLevel: number;
  badgeColor: string;
  cardIncluded: boolean;
  maxFamilyMembers: number;
  isEventPass: boolean;
  benefits: BenefitItem[];
}

interface TouristMembershipHubProps {
  countryCode?: string;
  viewer: { signedIn: boolean; email?: string; displayName?: string; signInPath?: string };
  currency: CurrencyCode;
  onOpenRedemptionTerminal?: () => void;
}

const PNG_PASSPORT_STAMPS = [
  { name: "Kokoda Track", prov: "Central & Oro", icon: "🥾", desc: "Historic 96km Owen Stanley Pilgrimage" },
  { name: "Mount Wilhelm", prov: "Simbu", icon: "⛰️", desc: "Highest Peak in Papua New Guinea (4,509m)" },
  { name: "Goroka Valley", prov: "Eastern Highlands", icon: "♨", desc: "Asaro Mudmen & Cultural Sing-Sing" },
  { name: "Mount Hagen", prov: "Western Highlands", icon: "👑", desc: "Melpa Warrior Sing-Sing & Wahgi Valley" },
  { name: "Kimbe Bay", prov: "West New Britain", icon: "🤿", desc: "Coral Triangle Biodiversity Sanctuary" },
  { name: "Rabaul Volcano", prov: "East New Britain", icon: "🌋", desc: "Mount Tavurvur & Baining Fire Dancers" },
  { name: "Sepik River", prov: "East Sepik", icon: "🐊", desc: "Sacred Haus Tambaran & Crocodile Clans" },
  { name: "Tufi Fjords", prov: "Oro", icon: "⛵", desc: "Volcanic Calderas & Hammerhead Diving" },
  { name: "Milne Bay", prov: "Milne Bay", icon: "🌊", desc: "Tawali Coral Drop-offs & Kenu Regatta" },
  { name: "Varirata Park", prov: "Central", icon: "🦜", desc: "Raggiana Bird of Paradise Rainforest" }
];

function DigitalQrVisual({ token }: { token: string }) {
  const size = 21;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  const addFinder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[r0 + r][c0 + c] = true;
        }
      }
    }
  };

  addFinder(0, 0);
  addFinder(0, size - 7);
  addFinder(size - 7, 0);

  for (let i = 8; i < size - 8; i++) {
    if (i % 2 === 0) {
      matrix[6][i] = true;
      matrix[i][6] = true;
    }
  }

  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    hash = ((hash << 5) - hash + token.charCodeAt(i)) | 0;
  }
  let seed = Math.abs(hash) || 12345;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inFinder =
        (r < 8 && c < 8) ||
        (r < 8 && c >= size - 8) ||
        (r >= size - 8 && c < 8) ||
        (r === 6 || c === 6);
      if (!inFinder) {
        seed = (seed * 9301 + 49297) % 233280;
        matrix[r][c] = (seed / 233280) > 0.46;
      }
    }
  }

  return (
    <div className="digitalQrVisualWrapper">
      <svg viewBox="0 0 21 21" className="qrMatrixSvg" aria-label="Digital Membership QR Code">
        <rect width="21" height="21" fill="var(--brand-white)" rx="1" />
        {matrix.map((row, r) =>
          row.map((active, c) =>
            active ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="var(--brand-charcoal)" /> : null
          )
        )}
      </svg>
      <div className="qrLaserScanLine" />
    </div>
  );
}

function DynamicQrSecurityBox({ dynamicQr, onRefresh }: { dynamicQr: { token: string }; onRefresh: () => void }) {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onRefresh();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onRefresh]);

  return (
    <div className="dynamicQrSecurityBox">
      <div className="qrVisualPlaceholder">
        <DigitalQrVisual token={dynamicQr.token} />
        <span className="qrScanHint">Scan to Verify</span>
      </div>
      <div className="qrSecurityMeta">
        <div className="qrLiveBadge">
          <span className="liveDot" /> LIVE VERIFICATION
        </div>
        <strong className="tokenDisplayLabel">Code: <code>{dynamicQr.token}</code></strong>
        <div className="qrProgressRow">
          <div className="qrProgressBar">
            <div className="qrProgressFill" style={{ width: `${(countdown / 60) * 100}%` }} />
          </div>
          <small>Refreshes in <b>{countdown}s</b></small>
        </div>
        <span className="antiFraudBadge">🔒 Anti-Screenshot Protected · Server Encrypted</span>
      </div>
    </div>
  );
}

export default function TouristMembershipHub({ countryCode = "PNG", viewer, currency, onOpenRedemptionTerminal }: TouristMembershipHubProps) {
  const isZambia = (countryCode || "").toUpperCase() === "ZMB" || (countryCode || "").toUpperCase() === "ZM";
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState<"card" | "savings" | "offers" | "passport" | "family" | "plans">("card");
  const [offers, setOffers] = useState<Array<Record<string, unknown>>>([]);
  const [offerSearch, setOfferSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [physicalCardAddress, setPhysicalCardAddress] = useState("");
  const [isOrderingCard, setIsOrderingCard] = useState(false);
  const [familyForm, setFamilyForm] = useState({ fullName: "", relationship: "Spouse" });
  const [isAddingFamily, setIsAddingFamily] = useState(false);
  const [activePaymentPlan, setActivePaymentPlan] = useState<{ id: number; name: string; price: number; subscriptionId?: number } | null>(null);

  const loadHub = useCallback(() => {
    if (!viewer.signedIn) return;
    setLoading(true);
    fetch("/api/membership")
      .then(async r => {
        const x = await r.json();
        if (r.ok) {
          setData(x);
          setStatus("");
        } else {
          setStatus(x.error || "Failed to load membership hub.");
        }
      })
      .catch(() => setStatus("Network connection error."))
      .finally(() => setLoading(false));

    fetch("/api/membership/offers")
      .then(async r => {
        const x = await r.json();
        if (r.ok && x.offers) setOffers(x.offers);
      })
      .catch(() => {});
  }, [viewer.signedIn]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadHub();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadHub]);

  const refreshDynamicQr = useCallback(() => {
    if (!viewer.signedIn) return;
    fetch("/api/membership")
      .then(r => r.json())
      .then(x => {
        if (x.dynamicQr) setData(curr => curr ? { ...curr, dynamicQr: x.dynamicQr } : curr);
      })
      .catch(() => {});
  }, [viewer.signedIn]);

  const act = async (body: Record<string, unknown>) => {
    setStatus("Processing request…");
    try {
      const r = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const x = await r.json();
      if (r.ok) {
        setData(x);
        setStatus("Success! Your membership has been updated.");
        setIsOrderingCard(false);
        setIsAddingFamily(false);
      } else {
        setStatus(x.error || "Action failed.");
      }
    } catch {
      setStatus("Error communicating with server.");
    }
  };

  const testPay = async (subscriptionId: number) => {
    setStatus("Authorizing practice payment…");
    const r = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "testMembership", subscriptionId })
    });
    const x = await r.json();
    if (r.ok) {
      setStatus("Payment confirmed! Your membership card is now ACTIVE.");
      loadHub();
    } else {
      setStatus(x.error || "Practice payment failed.");
    }
  };

  if (!viewer.signedIn) {
    return (
      <section className="accountGuest">
        <div className="accountMark">👑</div>
        <p className="eyebrow lime">{isZambia ? "VISIT ZAMBIA NATIONAL MEMBERSHIP" : "VISIT PNG NATIONAL MEMBERSHIP"}</p>
        <h1>{isZambia ? "One membership unlocks better value across Zambia." : "One membership unlocks better value across Papua New Guinea."}</h1>
        <p>
          {isZambia
            ? "Sign in to activate your Digital Membership Card, save up to 20% on premier safari lodges and cultural experiences, and collect Zambia Safari Passport stamps."
            : "Sign in to activate your Digital Membership Card, save up to 20% on premier lodges and cultural treks, and collect PNG Passport stamps."}
        </p>
        <a href={viewer.signInPath}>Sign in to Join / View Membership</a>
      </section>
    );
  }

  const sub = data?.subscription as Record<string, unknown> | null;
  const plans = (data?.plans || []) as PlanItem[];
  const savings = (data?.savings || {}) as Record<string, unknown>;
  const stamps = (data?.passportStamps || []) as Array<Record<string, unknown>>;
  const redemptions = (data?.redemptions || []) as Array<Record<string, unknown>>;
  const familyMembers = (data?.familyMembers || []) as Array<Record<string, unknown>>;
  const physicalCard = data?.physicalCard as Record<string, unknown> | null;
  const dynamicQr = data?.dynamicQr as { token: string; expiresAt: number; formattedCode: string } | null;

  const isUsable = sub && ["active", "complimentary"].includes(sub.status as string);
  const currentTier = (sub?.planCode as string) || "visitor-free";
  const passportList = PNG_PASSPORT_STAMPS;
  const currencySymbol = "K";

  const getTierGradient = (code: string) => {
    if (code.includes("elite")) return "linear-gradient(135deg, var(--brand-deep-teal), var(--brand-charcoal))";
    if (code.includes("adventurer")) return "linear-gradient(135deg, var(--action-primary), var(--brand-deep-teal))";
    if (code.includes("family")) return "linear-gradient(135deg, var(--derived-teal-soft), var(--brand-deep-teal))";
    if (code.includes("explorer")) return "linear-gradient(135deg, var(--brand-deep-teal), var(--derived-teal-strong))";
    return "linear-gradient(135deg, var(--surface-card), var(--surface-selected))";
  };

  return (
    <section className="touristMembershipHubSection">
      {/* Header Banner */}
      <div className="hubHeaderBanner">
        <div>
          <p className="eyebrow lime">{isZambia ? "VISIT ZAMBIA TRAVELLER REWARDS & ECOSYSTEM" : "VISIT PNG TRAVELLER REWARDS & ECOSYSTEM"}</p>
          <h1>{data?.memberName ? `${data.memberName}’s Membership` : "My Travel Membership"}</h1>
          <p>{isZambia ? "National privileges, verified safari partner discounts, and your digital Zambia Passport." : "National privileges, verified partner discounts, and your digital PNG Passport."}</p>
        </div>
        <div className="hubPointsBadge">
          <small>Loyalty Balance</small>
          <strong>{Number(data?.pointsBalance || 0)}</strong>
          <span>Points</span>
        </div>
      </div>

      {loading && <div className="membershipStatusBanner">Loading membership hub…</div>}
      {status && <div className="membershipStatusBanner" aria-live="polite">{status}</div>}

      {/* Navigation Tabs */}
      <div className="hubNavTabs">
        <button className={activeTab === "card" ? "active" : ""} onClick={() => setActiveTab("card")}>
          💳 Digital Card
        </button>
        <button className={activeTab === "savings" ? "active" : ""} onClick={() => setActiveTab("savings")}>
          📊 My Savings ({savings.totalDiscounts ? `${currencySymbol} ${savings.totalDiscounts}` : `${currencySymbol} 0`})
        </button>
        <button className={activeTab === "offers" ? "active" : ""} onClick={() => setActiveTab("offers")}>
          🎁 Member Offers ({offers.length})
        </button>
        <button className={activeTab === "passport" ? "active" : ""} onClick={() => setActiveTab("passport")}>
          🛂 {isZambia ? "Zambia Passport" : "PNG Passport"} ({stamps.length} Stamps)
        </button>
        <button className={activeTab === "family" ? "active" : ""} onClick={() => setActiveTab("family")}>
          👨‍👩‍👧‍👦 Family Pass {familyMembers.length ? `(${familyMembers.length})` : ""}
        </button>
        <button className={activeTab === "plans" ? "active" : ""} onClick={() => setActiveTab("plans")}>
          ⚡ Compare Plans
        </button>
      </div>

      {/* TAB 1: DIGITAL & PHYSICAL MEMBERSHIP CARD */}
      {activeTab === "card" && (
        <div className="hubCardTabGrid">
          <div className="digitalCardContainer">
            {sub ? (
              <div className="collectibleDigitalCard" style={{ background: getTierGradient(currentTier) }}>
                <div className="cardWatermark">{isZambia ? "VISIT ZAMBIA" : "VISIT PNG"}</div>
                <div className="cardTopRow">
                  <div>
                    <span className="cardBrandLogo"><i>{isZambia ? "Z" : "V"}</i> {isZambia ? "VISIT ZAMBIA" : "VISIT PNG"}</span>
                    <small className="cardTierLabel">{(sub.planName as string) || "Explorer Member"}</small>
                  </div>
                  <span className={`cardStatusPill ${sub.status}`}>
                    {(sub.status as string).replaceAll("_", " ").toUpperCase()}
                  </span>
                </div>

                <div className="cardHolderRow">
                  <div className="holderMeta">
                    <small>MEMBER NAME</small>
                    <h3>{(data?.memberName as string) || viewer.displayName || "Valued Traveller"}</h3>
                    <div className="memberNumberBadge">
                      <small>MEMBERSHIP ID</small>
                      <code>{(sub.memberNumber as string)}</code>
                    </div>
                  </div>
                  {isUsable && dynamicQr && (
                    <div className="cardQrThumbnailBox">
                      <DigitalQrVisual token={dynamicQr.token} />
                    </div>
                  )}
                </div>

                {/* Dynamic Rotating QR Verification */}
                {isUsable && dynamicQr ? (
                  <DynamicQrSecurityBox dynamicQr={dynamicQr} onRefresh={refreshDynamicQr} />
                ) : (
                  <div className="cardInactiveNotice">
                    <small>Payment required to activate dynamic QR</small>
                  </div>
                )}

                <div className="cardFooterRow">
                  <div>
                    <small>VALID UNTIL</small>
                    <span>{sub.expiryDate ? new Date(sub.expiryDate as string).toLocaleDateString() : "Lifetime"}</span>
                  </div>
                  <div>
                    <small>TYPE</small>
                    <span>Digital & Mobile</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="noMembershipPromptCard">
                <span className="promptIcon">🎫</span>
                <h3>You don’t have an active membership yet</h3>
                <p>
                  {isZambia
                    ? "Join thousands of travellers exploring Zambia with member discounts and VIP safari privileges."
                    : "Join over thousands of travellers exploring PNG with member discounts and VIP partner privileges."}
                </p>
                <button className="activateFreePlanBtn" onClick={() => act({ action: "select", planId: 1 })}>
                  Activate Visitor Free Membership
                </button>
              </div>
            )}

            {sub?.status === "payment_due" && (
              <div className="paymentDueBanner">
                <div>
                  <strong>Membership Payment Pending</strong>
                  <p>Activate your membership to unlock your live QR card and member rates.</p>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", color: "#000000", fontWeight: 800 }}
                    onClick={() => setActivePaymentPlan({
                      id: Number(sub.planId),
                      name: String(sub.planName || "National Membership"),
                      price: Number((plans.find(p => p.id === sub.planId)?.price) || 450),
                      subscriptionId: Number(sub.id)
                    })}
                  >
                    💳 Pay via PayPal / MoMo / Card
                  </button>
                  <button type="button" onClick={() => testPay(Number(sub.id))}>Practice Payment</button>
                </div>
              </div>
            )}
          </div>

          {/* Physical Card Fulfillment & Actions */}
          <div className="cardSidebarInfo">
            <div className="physicalCardStatusCard">
              <p className="eyebrow">PHYSICAL CARD FULFILLMENT</p>
              <h4>Custom Embossed Membership Card</h4>
              <p className="cardDescText">Made with laser-engraved details and gold-foiled emblem.</p>
              {physicalCard ? (
                <div className="cardTrackingInfo">
                  <span className="trackingBadge">📦 Dispatched</span>
                  <p>Delivering to: <b>{String((physicalCard as { deliveryAddress?: string }).deliveryAddress || "Registered address")}</b></p>
                </div>
              ) : isOrderingCard ? (
                <div className="orderCardForm">
                  <input
                    placeholder="Enter postal or lodge delivery address..."
                    value={physicalCardAddress}
                    onChange={e => setPhysicalCardAddress(e.target.value)}
                  />
                  <button
                    className="confirmOrderBtn"
                    disabled={!physicalCardAddress.trim()}
                    onClick={() => act({ action: "order_physical_card", deliveryAddress: physicalCardAddress })}
                  >
                    Confirm Card Order (Free for Members)
                  </button>
                </div>
              ) : (
                <button className="orderPhysicalCardBtn" onClick={() => setIsOrderingCard(true)}>
                  Request Embossed Card
                </button>
              )}
            </div>

            {onOpenRedemptionTerminal && (
              <div className="partnerScanAccessCard">
                <p className="eyebrow">HOTEL / TOUR DESK PARTNER?</p>
                <h4>Redemption Scanner Terminal</h4>
                <p>Verify visiting member QR codes and process live discounts.</p>
                <button className="openTerminalBtn" onClick={onOpenRedemptionTerminal}>
                  Open Cashier Scanner ⚡
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MY SAVINGS & ROI LEDGER */}
      {activeTab === "savings" && (
        <div className="hubSavingsTab">
          <div className="savingsKpiGrid">
            <div className="savingsKpiCard">
              <small>Total Discounts Saved</small>
              <strong>{formatPrice(Number(savings.totalDiscounts || 0), currency)}</strong>
              <span>Across all partner visits</span>
            </div>
            <div className="savingsKpiCard">
              <small>Annual Membership Cost</small>
              <strong>{formatPrice(Number(savings.membershipCost || 0), currency)}</strong>
              <span>{(sub?.planName as string) || "Visitor Free"}</span>
            </div>
            <div className="savingsKpiCard highlight">
              <small>Net Member Benefit</small>
              <strong>{formatPrice(Math.max(0, Number(savings.netSavings || 0)), currency)}</strong>
              <span>{savings.valuableMessage as string}</span>
            </div>
            <div className="savingsKpiCard">
              <small>Redemptions Completed</small>
              <strong>{Number(savings.redemptionsCount || 0)}</strong>
              <span>Partner Transactions</span>
            </div>
          </div>

          <div className="redemptionsHistoryCard">
            <h3>Recent Discounts & Benefit Redemptions</h3>
            {redemptions.length > 0 ? (
              <div className="redemptionsTableWrapper">
                <table className="enterpriseDataTable">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Partner Provider</th>
                      <th>Offer / Benefit</th>
                      <th>Original</th>
                      <th>Discount</th>
                      <th>Final Paid</th>
                      <th>Receipt Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {redemptions.map((r, i) => (
                      <tr key={i}>
                        <td>{new Date(r.createdAt as string).toLocaleDateString()}</td>
                        <td><strong>{r.providerName as string}</strong></td>
                        <td>{r.benefitSummary as string}</td>
                        <td>{formatPrice(Number(r.originalAmount || 0), currency)}</td>
                        <td className="discountHighlight">-{formatPrice(Number(r.discountAmount || 0), currency)}</td>
                        <td><strong>{formatPrice(Number(r.finalAmount || 0), currency)}</strong></td>
                        <td><code>{r.redemptionRef as string}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="emptyStateText">No partner redemptions recorded yet. Present your QR card at participating hotels and tour operators to start saving!</p>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MEMBER OFFERS EXPLORER */}
      {activeTab === "offers" && (
        <div className="hubOffersTab">
          <div className="offersFilterBar">
            <input
              placeholder={isZambia ? "Search member discounts, safari lodges, or Zambezi tours..." : "Search member discounts, stays, lodges or tours..."}
              value={offerSearch}
              onChange={e => setOfferSearch(e.target.value)}
            />
            <select value={selectedDestination} onChange={e => setSelectedDestination(e.target.value)}>
              {isZambia ? (
                <>
                  <option value="all">All Zambia Destinations</option>
                  <option value="Livingstone">Livingstone & Victoria Falls</option>
                  <option value="South Luangwa">South Luangwa Valley</option>
                  <option value="Lower Zambezi">Lower Zambezi</option>
                  <option value="Kafue">Kafue National Park</option>
                  <option value="Lake Tanganyika">Lake Tanganyika</option>
                  <option value="Lusaka">Lusaka Capital</option>
                </>
              ) : (
                <>
                  <option value="all">All PNG Destinations</option>
                  <option value="Port Moresby">Port Moresby (NCD)</option>
                  <option value="Kokopo & Rabaul">Kokopo & Rabaul (ENB)</option>
                  <option value="Mount Hagen">Mount Hagen (Highlands)</option>
                  <option value="Madang Coast">Madang</option>
                  <option value="Sepik River">Sepik River</option>
                  <option value="Kokoda Trail">Kokoda Trail</option>
                </>
              )}
            </select>
          </div>

          <div className="offersCardGrid">
            {offers
              .filter(o => {
                if (selectedDestination !== "all" && !String(o.destinationName || "").includes(selectedDestination)) return false;
                if (offerSearch.trim()) {
                  const s = offerSearch.toLowerCase();
                  return String(o.title || "").toLowerCase().includes(s) || String(o.providerName || "").toLowerCase().includes(s);
                }
                return true;
              })
              .map((off, idx) => (
                <article key={idx} className="memberOfferCard">
                  {Boolean(off.imageUrl) && (
                    <div className="offerImgWrapper" style={{ backgroundImage: `url(${String(off.imageUrl)})` }}>
                      <span className="partnerTierTag">{String(off.badgeTitle || (isZambia ? "Visit Zambia Partner" : "VisitPNG Partner"))}</span>
                    </div>
                  )}
                  <div className="offerBody">
                    <div className="offerTopMeta">
                      <span>{String(off.providerName || "")} · {String(off.provinceName || "")}</span>
                      <strong className="benefitPill">
                        {off.discountPct ? `${off.discountPct}% OFF` : off.discountAmount ? `${currencySymbol} ${off.discountAmount} OFF` : "SPECIAL PERK"}
                      </strong>
                    </div>
                    <h4>{String(off.title || "")}</h4>
                    <p>{String(off.shortSummary || "")}</p>
                    
                    {Boolean(off.normalPrice && off.memberPrice) && (
                      <div className="offerPriceRow">
                        <div>
                          <small>Member Price</small>
                          <strong>{formatPrice(Number(off.memberPrice), currency)}</strong>
                        </div>
                        <del>{formatPrice(Number(off.normalPrice), currency)}</del>
                      </div>
                    )}

                    <div className="offerFooter">
                      <small className="termsSnippet">T&Cs: {off.termsConditions as string}</small>
                      <button className="claimOfferBtn" onClick={() => alert(`To redeem "${off.title}", present your Digital QR card at ${off.providerName}!`)}>
                        Redeem In Person 🎟️
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      )}

      {/* TAB 4: MY PNG PASSPORT STAMPS */}
      {activeTab === "passport" && (
        <div className="hubPassportTab">
          <div className="passportIntroBanner">
            <div>
              <p className="eyebrow lime">{isZambia ? "GAMIFIED ZAMBIA SAFARI PASSPORT" : "GAMIFIED PNG PASSPORT"}</p>
              <h3>{isZambia ? "Collect Destination Stamps Across Zambia" : "Collect Destination Stamps Across Papua New Guinea"}</h3>
              <p>
                {isZambia
                  ? "Each time you visit a national park, landmark, or partner lodge across Zambia, your digital passport unlocks an authentic collector’s stamp and 50 bonus loyalty points."
                  : "Each time you redeem a benefit at a verified partner in a new province or trail, your digital passport earns an authentic collector’s stamp and 50 bonus loyalty points."}
              </p>
            </div>
            <div className="passportStatBadge">
              <strong>{stamps.length}</strong>
              <small>Destinations Visited</small>
            </div>
          </div>

          <div className="passportStampsGrid">
            {passportList.map((dest: { name: string; prov: string; icon: string; desc: string }, i: number) => {
              const hasStamp = stamps.some(s => String(s.destinationName).toLowerCase().includes(dest.name.toLowerCase()));
              return (
                <div key={i} className={`passportStampCard ${hasStamp ? "unlocked" : "locked"}`}>
                  <div className="stampIconCircle">{dest.icon}</div>
                  <h4>{dest.name}</h4>
                  <small className="stampProv">{dest.prov}</small>
                  <p>{dest.desc}</p>
                  <span className="stampStatusTag">
                    {hasStamp ? "✓ STAMP UNLOCKED (+50 pts)" : "🔒 Unvisited"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: FAMILY & GROUP MEMBERS */}
      {activeTab === "family" && (
        <div className="hubFamilyTab">
          <div className="familyIntroCard">
            <p className="eyebrow">HOUSEHOLD PRIVILEGES</p>
            <h3>Family & Group Linked Passes</h3>
            <p>With a VisitPNG Family Pass, your spouse, children, or travelling companions each receive their own verified digital card and membership number linked to your shared account.</p>
          </div>

          <div className="familyMembersGrid">
            <div className="primaryMemberCard">
              <span className="memberRoleBadge">Primary Account Holder</span>
              <h4>{(data?.memberName as string) || "Primary Member"}</h4>
              <code>{(sub?.memberNumber as string) || "ZAM-000001"}</code>
              <small>Status: Active</small>
            </div>

            {familyMembers.map((fm, idx) => (
              <div key={idx} className="dependantMemberCard">
                <span className="memberRoleBadge dependant">{fm.relationship as string}</span>
                <h4>{fm.fullName as string}</h4>
                <code>{fm.memberNumber as string}</code>
                <small>Linked Dependant · Active</small>
              </div>
            ))}
          </div>

          {currentTier.includes("family") && familyMembers.length < 4 && (
            <div className="addFamilySection">
              {isAddingFamily ? (
                <div className="addFamilyForm">
                  <h4>Add Linked Family Member</h4>
                  <div className="formRowGrid">
                    <label>
                      Full Name
                      <input
                        placeholder="e.g. Maria Mukombo"
                        value={familyForm.fullName}
                        onChange={e => setFamilyForm({ ...familyForm, fullName: e.target.value })}
                      />
                    </label>
                    <label>
                      Relationship
                      <select
                        value={familyForm.relationship}
                        onChange={e => setFamilyForm({ ...familyForm, relationship: e.target.value })}
                      >
                        <option>Spouse / Partner</option>
                        <option>Child / Dependant</option>
                        <option>Parent</option>
                        <option>Travel Companion</option>
                      </select>
                    </label>
                  </div>
                  <button
                    className="saveFamilyBtn"
                    disabled={!familyForm.fullName.trim()}
                    onClick={() => act({ action: "add_family_member", fullName: familyForm.fullName, relationship: familyForm.relationship })}
                  >
                    Generate Dependant Digital Card
                  </button>
                </div>
              ) : (
                <button className="openAddFamilyBtn" onClick={() => setIsAddingFamily(true)}>
                  + Add Dependant Member ({familyMembers.length}/4 spots filled)
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: COMPARE PLANS & UPGRADE */}
      {activeTab === "plans" && (
        <div className="hubPlansTab">
          <div className="plansComparisonGrid">
            {plans.map(p => {
              const isCurrent = sub?.planId === p.id && sub?.status !== "cancelled";
              return (
                <article key={p.id} className={`planComparisonCard ${isCurrent ? "currentPlan" : ""}`}>
                  {p.tierLevel >= 3 && <div className="popularRibbon">MOST POPULAR</div>}
                  <div className="planCardHeader">
                    <small>{p.audience.toUpperCase()} · {p.billingPeriod}</small>
                    <h3>{p.name}</h3>
                    <div className="planPriceTag">
                      <strong>{p.price ? formatPrice(p.price, currency) : "Free"}</strong>
                      {p.price > 0 && <small>/{p.billingPeriod}</small>}
                    </div>
                  </div>
                  <p className="planDesc">{p.description}</p>
                  <ul className="planFeaturesList">
                    {p.benefits.map(b => (
                      <li key={b.id}>
                        <span className="checkIcon">✓</span>
                        <div>
                          <strong>{b.name}</strong>
                          <small>{b.description}</small>
                        </div>
                      </li>
                    ))}
                    {p.cardIncluded && <li><span className="checkIcon">✓</span><strong>Embossed Physical Card Included</strong></li>}
                    {p.maxFamilyMembers > 0 && <li><span className="checkIcon">✓</span><strong>Up to {p.maxFamilyMembers} Linked Family Members</strong></li>}
                  </ul>
                  <button
                    className="planActionBtn"
                    disabled={isCurrent}
                    onClick={() => {
                      if (p.price > 0) {
                        setActivePaymentPlan({ id: p.id, name: p.name, price: p.price });
                      } else {
                        if (confirm(`Switch to ${p.name}?`)) {
                          act({ action: "select", planId: p.id });
                        }
                      }
                    }}
                  >
                    {isCurrent ? "Current Plan" : p.price ? `Upgrade & Pay for ${p.name}` : "Select Free Plan"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {activePaymentPlan && (
        <PaymentModal
          isOpen={Boolean(activePaymentPlan)}
          onClose={() => {
            setActivePaymentPlan(null);
            loadHub();
          }}
          onSuccess={() => {
            setActivePaymentPlan(null);
            loadHub();
            setStatus("🎉 Membership payment verified! Your Digital Membership Card is now active.");
          }}
          title={`Activate ${activePaymentPlan.name}`}
          itemType="membership"
          itemId={Number(activePaymentPlan.subscriptionId || sub?.id || activePaymentPlan.id)}
          itemName={`VisitPNG ${activePaymentPlan.name}`}
          amount={activePaymentPlan.price}
          currency={currency}
          customerName={typeof data?.memberName === "string" ? data.memberName : "Explorer"}
        />
      )}
    </section>
  );
}

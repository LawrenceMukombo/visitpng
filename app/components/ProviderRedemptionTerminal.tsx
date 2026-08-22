"use client";

import { useState } from "react";
import { formatPrice, type CurrencyCode } from "../../db/currency";

interface OfferOption {
  id: number;
  title: string;
  shortSummary: string;
  benefitType: string;
  discountPct: number | null;
  discountAmount: number | null;
  normalPrice: number | null;
  memberPrice: number | null;
  complimentaryItem: string | null;
}

interface VerifiedMember {
  subscriptionId: number;
  userId: number;
  name: string;
  memberNumber: string;
  tier: string;
  tierName: string;
  badgeColor: string;
  status: string;
  expiryDate: string | null;
}

interface ProviderRedemptionTerminalProps {
  onClose: () => void;
  currency?: CurrencyCode;
}

export default function ProviderRedemptionTerminal({ onClose, currency = "PGK" }: ProviderRedemptionTerminalProps) {
  const [tokenInput, setTokenInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    reason?: string;
    member?: VerifiedMember;
    eligibleOffers?: OfferOption[];
  } | null>(null);

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [billAmount, setBillAmount] = useState<string>("500");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<{
    redemptionRef: string;
    originalAmount: number;
    discountAmount: number;
    finalAmount: number;
    benefitSummary: string;
    createdAt: string;
  } | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tokenInput.trim()) return;

    setIsVerifying(true);
    setStatusMessage("");
    setVerificationResult(null);
    setCompletedReceipt(null);

    try {
      const r = await fetch("/api/membership/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          tokenOrNumber: tokenInput.trim(),
          providerId: 1
        })
      });
      const data = await r.json();
      setVerificationResult(data);
      if (data.isValid && data.eligibleOffers && data.eligibleOffers.length > 0) {
        setSelectedOfferId(data.eligibleOffers[0].id);
      }
    } catch {
      setStatusMessage("Verification server error. Check local internet connection.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleConfirmRedemption = async () => {
    if (!verificationResult?.member || !selectedOfferId) return;

    setIsProcessing(true);
    setStatusMessage("");

    try {
      const r = await fetch("/api/membership/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "confirm",
          subscriptionId: verificationResult.member.subscriptionId,
          userId: verificationResult.member.userId,
          providerId: 1,
          offerId: selectedOfferId,
          originalAmount: Number(billAmount) || 0,
          branchName: "Front Desk Cashier",
          verificationMethod: tokenInput.startsWith("VPNGQR") ? "dynamic_qr" : "manual_lookup"
        })
      });
      const data = await r.json();
      if (r.ok && data.success) {
        setCompletedReceipt(data);
      } else {
        setStatusMessage(data.error || "Redemption failed.");
      }
    } catch {
      setStatusMessage("Error completing transaction.");
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedOffer = verificationResult?.eligibleOffers?.find(o => o.id === selectedOfferId);

  // Live bill & discount calculations
  const original = Number(billAmount) || 0;
  let estimatedDiscount = 0;
  if (selectedOffer) {
    if (selectedOffer.benefitType === "percentage_discount" && selectedOffer.discountPct) {
      estimatedDiscount = Math.round((original * (selectedOffer.discountPct / 100)) * 100) / 100;
    } else if (selectedOffer.benefitType === "fixed_discount" && selectedOffer.discountAmount) {
      estimatedDiscount = Math.min(original, selectedOffer.discountAmount);
    } else if (selectedOffer.benefitType === "member_price" && selectedOffer.normalPrice && selectedOffer.memberPrice) {
      estimatedDiscount = Math.max(0, selectedOffer.normalPrice - selectedOffer.memberPrice);
    }
  }
  const estimatedFinal = Math.max(0, original - estimatedDiscount);

  return (
    <div className="sheetOverlay" role="dialog" aria-modal="true">
      <div className="sheetCard terminalSheetCard">
        <header className="terminalSheetHeader">
          <div>
            <p className="eyebrow lime">VISIT PNG PARTNER REDEMPTION TERMINAL</p>
            <h2>Front Desk & Cashier Scanner</h2>
            <small>Verify dynamic QR cards and apply official member privileges</small>
          </div>
          <button className="closeSheetBtn" onClick={onClose} aria-label="Close Terminal">×</button>
        </header>

        {statusMessage && <div className="terminalStatusBanner">{statusMessage}</div>}

        {/* STEP 1: SCAN OR INPUT MEMBER # */}
        {!completedReceipt && (
          <form className="terminalInputForm" onSubmit={handleVerify}>
            <label>
              Scan Dynamic QR or Enter Member Number
              <div className="terminalInputRow">
                <input
                  required
                  placeholder="e.g. VPNGQR-VPNG-000001-... or VPNG-000001"
                  value={tokenInput}
                  onChange={e => setTokenInput(e.target.value)}
                />
                <button type="submit" disabled={isVerifying || !tokenInput.trim()}>
                  {isVerifying ? "Verifying…" : "Verify Member 🔍"}
                </button>
              </div>
            </label>
          </form>
        )}

        {/* STEP 2: VERIFICATION RESULT BANNER */}
        {verificationResult && !completedReceipt && (
          <div className="terminalVerificationBox">
            {verificationResult.isValid && verificationResult.member ? (
              <div className="verifiedMemberCard">
                <div className="verificationStatusBanner success">
                  <span>✓</span>
                  <strong>MEMBERSHIP VERIFIED & ACTIVE</strong>
                </div>

                <div className="memberDetailsRow">
                  <div>
                    <small>MEMBER NAME</small>
                    <h3>{verificationResult.member.name}</h3>
                    <code>{verificationResult.member.memberNumber}</code>
                  </div>
                  <div className="tierPillBadge">
                    <span className="tierTag">{verificationResult.member.tierName}</span>
                    <small>Valid until {verificationResult.member.expiryDate ? new Date(verificationResult.member.expiryDate).toLocaleDateString() : "Lifetime"}</small>
                  </div>
                </div>

                {/* OFFER SELECTION & BILL CALCULATOR */}
                <div className="redemptionCalculatorBox">
                  <h4>Select Applicable Member Privilege</h4>
                  <div className="offersRadioList">
                    {verificationResult.eligibleOffers?.map(off => (
                      <label key={off.id} className={`offerRadioCard ${selectedOfferId === off.id ? "selected" : ""}`}>
                        <input
                          type="radio"
                          name="selectedOffer"
                          checked={selectedOfferId === off.id}
                          onChange={() => setSelectedOfferId(off.id)}
                        />
                        <div>
                          <strong>{off.title}</strong>
                          <small>{off.shortSummary}</small>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="liveBillLedger">
                    <div className="billInputRow">
                      <label>Total Customer Bill (Gross Amount)</label>
                      <div className="billAmountInputWrapper">
                        <span>PGK</span>
                        <input
                          type="number"
                          value={billAmount}
                          onChange={e => setBillAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="ledgerSummaryTable">
                      <div className="summaryLine">
                        <span>Standard Bill:</span>
                        <strong>{formatPrice(original, currency)}</strong>
                      </div>
                      <div className="summaryLine discount">
                        <span>VisitPNG Member Privilege:</span>
                        <strong>-{formatPrice(estimatedDiscount, currency)}</strong>
                      </div>
                      <div className="summaryLine totalFinal">
                        <span>Collect From Guest:</span>
                        <strong className="finalCollect">{formatPrice(estimatedFinal, currency)}</strong>
                      </div>
                    </div>

                    <button
                      className="confirmRedemptionBtn"
                      disabled={isProcessing}
                      onClick={handleConfirmRedemption}
                    >
                      {isProcessing ? "Recording Redemption…" : "Confirm Discount & Issue Receipt 🎟️"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="verificationStatusBanner error">
                <span>✕</span>
                <div>
                  <strong>MEMBERSHIP NOT VALID</strong>
                  <p>{verificationResult.reason || "This QR code or member number is invalid or expired."}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: TRANSACTION SUCCESS RECEIPT */}
        {completedReceipt && (
          <div className="receiptSuccessView">
            <div className="receiptIconBadge">✓</div>
            <h3>Redemption Completed Successfully!</h3>
            <p>The member discount has been recorded in the VisitPNG national partner ledger.</p>

            <div className="receiptCard">
              <div className="receiptTopRow">
                <small>RECEIPT REFERENCE</small>
                <code>{completedReceipt.redemptionRef}</code>
              </div>
              <div className="receiptBodyRow">
                <div>
                  <small>GUEST PRIVILEGE</small>
                  <strong>{completedReceipt.benefitSummary}</strong>
                </div>
                <div>
                  <small>DISCOUNT VALUE</small>
                  <strong className="discountText">-{formatPrice(completedReceipt.discountAmount, currency)}</strong>
                </div>
                <div>
                  <small>FINAL PAID AMOUNT</small>
                  <strong>{formatPrice(completedReceipt.finalAmount, currency)}</strong>
                </div>
              </div>
              <div className="receiptFooter">
                <small>Time: {new Date(completedReceipt.createdAt).toLocaleString()}</small>
              </div>
            </div>

            <button
              className="newTransactionBtn"
              onClick={() => {
                setCompletedReceipt(null);
                setVerificationResult(null);
                setTokenInput("");
              }}
            >
              Scan Next Member 📲
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

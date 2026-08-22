"use client";

import { useState, useMemo } from "react";
import { calculateCommissionBreakdown } from "../../db/commission";

interface ProvinceOption {
  id: number;
  code: string;
  name: string;
  region: string;
}

interface ProviderRegistrationModalProps {
  provinces?: ProvinceOption[];
  onClose: () => void;
}

const PROVIDER_CATEGORIES = [
  { id: "tour_guide", label: "🥾 Tour Guide & Trekking Leader", desc: "Kokoda, Mt Wilhelm, Highlands & river trekking" },
  { id: "transport_charter", label: "🚐 Transport & Sea Charter", desc: "Private hire, boat transfers, 4WD wilderness transit" },
  { id: "cultural_artifacts", label: "🎨 Cultural Artifacts & Carvings", desc: "Sepik woodcarvings, Highlands bilums, shell necklaces" },
  { id: "scuba_diving", label: "🤿 Scuba Diving & Snorkeling", desc: "Coral reef charters, WWII wreck diving, liveaboards" },
  { id: "hotel_lodge", label: "🏡 Hotel, Eco-Lodge & Village Stay", desc: "Boutique resorts, customary homestays, rainforest cabins" },
  { id: "aviation_airline", label: "✈️ Airline & Charter Aviation", desc: "Domestic bush flights, helicopter charters, scenic tours" },
  { id: "restaurant_dining", label: "🍽️ Restaurant & Traditional Mumu", desc: "Local kai, island seafood, traditional earth oven dining" },
  { id: "cultural_performer", label: "🎭 Singsing Troupe & Cultural Events", desc: "Traditional performers, body painting, tribal festivals" }
];

const DEFAULT_PROVINCES: ProvinceOption[] = [
  { id: 1, code: "NCD", name: "National Capital District", region: "Southern" },
  { id: 2, code: "CP", name: "Central Province", region: "Southern" },
  { id: 3, code: "ORO", name: "Oro (Northern) Province", region: "Southern" },
  { id: 4, code: "MBP", name: "Milne Bay Province", region: "Southern" },
  { id: 5, code: "WP", name: "Western Province", region: "Southern" },
  { id: 6, code: "GP", name: "Gulf Province", region: "Southern" },
  { id: 7, code: "ENB", name: "East New Britain", region: "Islands" },
  { id: 8, code: "WNB", name: "West New Britain", region: "Islands" },
  { id: 9, code: "NIP", name: "New Ireland", region: "Islands" },
  { id: 10, code: "MAN", name: "Manus", region: "Islands" },
  { id: 11, code: "AROB", name: "Bougainville", region: "Islands" },
  { id: 12, code: "ESP", name: "East Sepik", region: "Momase" },
  { id: 13, code: "WSP", name: "West Sepik (Sandaun)", region: "Momase" },
  { id: 14, code: "MP", name: "Madang Province", region: "Momase" },
  { id: 15, code: "MOR", name: "Morobe Province", region: "Momase" },
  { id: 16, code: "EHP", name: "Eastern Highlands", region: "Highlands" },
  { id: 17, code: "WHP", name: "Western Highlands", region: "Highlands" },
  { id: 18, code: "SHP", name: "Southern Highlands", region: "Highlands" },
  { id: 19, code: "ENG", name: "Enga", region: "Highlands" },
  { id: 20, code: "SIM", name: "Simbu (Chimbu)", region: "Highlands" },
  { id: 21, code: "JIK", name: "Jiwaka", region: "Highlands" },
  { id: 22, code: "HEL", name: "Hela", region: "Highlands" }
];

export default function ProviderRegistrationModal({
  provinces = DEFAULT_PROVINCES,
  onClose
}: ProviderRegistrationModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [form, setForm] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    businessName: "",
    providerType: "tour_guide",
    provinceId: 1,
    villageOrTown: "",
    description: "",
    experienceYears: 2,
    licenseOrTpaNumber: "",
    clanOrReferenceContact: "",
    pricingSample: "",
    payoutMethod: "bank_transfer",
    payoutAccountDetails: "",
    agreedToCommission: false
  });

  const [sampleAmount, setSampleAmount] = useState<number>(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedRef, setSubmittedRef] = useState("");

  const commissionExample = useMemo(() => {
    return calculateCommissionBreakdown(sampleAmount, 0.05, 0.10);
  }, [sampleAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreedToCommission) {
      setError("Please agree to the platform commission terms.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/providers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setSubmittedRef(data.applicationReference || "APP-PNG-REGISTERED");
        setStep(5);
      } else {
        setError(data.error || "Failed to submit application. Please check your inputs.");
      }
    } catch {
      setError("Network connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="sheet providerRegSheet">
        <button className="close" onClick={onClose} aria-label="Close provider registration">×</button>

        {step < 5 && (
          <div className="wizardStepHeader">
            <span className="destinationPill">🤝 PARTNER WITH VISIT PNG</span>
            <h2>Register as a Verified Tourism Provider</h2>
            <p className="wizardLead">
              Publish your services, receive bookings, and connect with global travelers.
              Every provider is vetted to ensure safety and authenticity.
            </p>

            {/* Stepper Navigation */}
            <div className="wizardStepper">
              <div className={`stepItem ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}>
                <span>1</span>
                <small>Business</small>
              </div>
              <div className={`stepItem ${step === 2 ? "active" : step > 2 ? "completed" : ""}`}>
                <span>2</span>
                <small>Location</small>
              </div>
              <div className={`stepItem ${step === 3 ? "active" : step > 3 ? "completed" : ""}`}>
                <span>3</span>
                <small>Anti-Scam</small>
              </div>
              <div className={`stepItem ${step === 4 ? "active" : ""}`}>
                <span>4</span>
                <small>Payout & 5%</small>
              </div>
            </div>
          </div>
        )}

        {error && <p className="formStatus errorStatus" aria-live="polite">{error}</p>}

        <form onSubmit={handleSubmit} className="providerRegForm">
          {/* STEP 1: BUSINESS & SERVICE CATEGORY */}
          {step === 1 && (
            <div className="wizardStepContent">
              <h3>Step 1: Business Profile & Service Category</h3>
              <p className="stepDesc">Select what type of tourism experiences or products you provide.</p>

              <div className="providerCategorySelector">
                {PROVIDER_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`categoryOptionCard ${form.providerType === cat.id ? "selected" : ""}`}
                    onClick={() => setForm({ ...form, providerType: cat.id })}
                  >
                    <strong>{cat.label}</strong>
                    <small>{cat.desc}</small>
                  </button>
                ))}
              </div>

              <div className="formField">
                <label>Business / Operator Trading Name *</label>
                <input
                  required
                  placeholder="e.g. Highlands Trekking Wantoks or Sepik River Carvers"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                />
              </div>

              <div className="formRowGrid">
                <div className="formField">
                  <label>Primary Contact Name *</label>
                  <input
                    required
                    placeholder="e.g. John Kavi"
                    value={form.applicantName}
                    onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                  />
                </div>
                <div className="formField">
                  <label>Years in Operation</label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={form.experienceYears}
                    onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="wizardNavBtns">
                <button
                  type="button"
                  className="nextStepBtn"
                  disabled={!form.businessName || !form.applicantName}
                  onClick={() => {
                    setError("");
                    setStep(2);
                  }}
                >
                  Continue to Location →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: OPERATING BASE & LOCATION */}
          {step === 2 && (
            <div className="wizardStepContent">
              <h3>Step 2: Operating Base & Contact Channels</h3>
              <p className="stepDesc">Where do you welcome guests or craft your products?</p>

              <div className="formField">
                <label>Primary Operating Province *</label>
                <select
                  value={form.provinceId}
                  onChange={(e) => setForm({ ...form, provinceId: Number(e.target.value) })}
                >
                  {provinces.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.region} Region)
                    </option>
                  ))}
                </select>
              </div>

              <div className="formField">
                <label>Village, Town, or District Base *</label>
                <input
                  required
                  placeholder="e.g. Asaro Village, Goroka District or Alotau Waterfront"
                  value={form.villageOrTown}
                  onChange={(e) => setForm({ ...form, villageOrTown: e.target.value })}
                />
              </div>

              <div className="formRowGrid">
                <div className="formField">
                  <label>Contact Phone (Digicel / Bmobile) *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+675 7XXXXXXX"
                    value={form.applicantPhone}
                    onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })}
                  />
                </div>
                <div className="formField">
                  <label>Contact Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="operator@example.com"
                    value={form.applicantEmail}
                    onChange={(e) => setForm({ ...form, applicantEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="formField">
                <label>Detailed Description of Offerings *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your tour itineraries, accommodation amenities, traditional carving styles, or transport services..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="wizardNavBtns">
                <button type="button" className="prevStepBtn" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button
                  type="button"
                  className="nextStepBtn"
                  disabled={!form.villageOrTown || !form.applicantPhone || !form.applicantEmail || !form.description}
                  onClick={() => {
                    setError("");
                    setStep(3);
                  }}
                >
                  Continue to Anti-Scam Check →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ANTI-SCAM CREDENTIALS */}
          {step === 3 && (
            <div className="wizardStepContent">
              <h3>Step 3: Anti-Scam & Trust Credentials</h3>
              <p className="stepDesc">
                To protect tourists and genuine PNG operators from impostors, our team conducts a thorough review of your credentials before publishing your services.
              </p>

              <div className="antiScamNotice">
                <strong>🛡️ Anti-Scam Fact-Checking Standard</strong>
                <ul>
                  <li>TPA (PNG Tourism Promotion Authority) registration or local association membership</li>
                  <li>Customary land / Clan elder endorsement for village activities</li>
                  <li>Direct phone / video interview with our Port Moresby verification desk</li>
                </ul>
              </div>

              <div className="formField">
                <label>TPA License / IPA Number / Local Association Permit (Optional but recommended)</label>
                <input
                  placeholder="e.g. TPA-REG-2026-089 or IPA 1-12345"
                  value={form.licenseOrTpaNumber}
                  onChange={(e) => setForm({ ...form, licenseOrTpaNumber: e.target.value })}
                />
              </div>

              <div className="formField">
                <label>Clan Leader / Community Reference (Name & Contact)</label>
                <input
                  placeholder="e.g. Chief Raymond Sape (+675 7123 4567, Village Elder)"
                  value={form.clanOrReferenceContact}
                  onChange={(e) => setForm({ ...form, clanOrReferenceContact: e.target.value })}
                />
              </div>

              <div className="formField">
                <label>Sample Pricing Structure (PGK)</label>
                <input
                  placeholder="e.g. 150 PGK/day guide, 350 PGK/night stay, 80 PGK/bilum"
                  value={form.pricingSample}
                  onChange={(e) => setForm({ ...form, pricingSample: e.target.value })}
                />
              </div>

              <div className="wizardNavBtns">
                <button type="button" className="prevStepBtn" onClick={() => setStep(2)}>
                  ← Back
                </button>
                <button
                  type="button"
                  className="nextStepBtn"
                  onClick={() => {
                    setError("");
                    setStep(4);
                  }}
                >
                  Continue to Commission Agreement →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYOUT & 5% + GST COMMISSION AGREEMENT */}
          {step === 4 && (
            <div className="wizardStepContent">
              <h3>Step 4: Payout Details & 5% + GST Commission Terms</h3>
              <p className="stepDesc">Transparent pricing. No monthly listing fees. We only earn when you succeed.</p>

              {/* Commission Calculator Interactive Card */}
              <div className="commissionExplainerCard">
                <div className="commissionCardHeader">
                  <strong>💰 Platform Commission Breakdown</strong>
                  <span className="rateBadge">5% + GST</span>
                </div>
                <p className="commissionText">
                  Visit PNG charges a <strong>5% base platform commission</strong> + <strong>10% PNG GST</strong> on the commission (total 5.5% platform fee). You keep <strong>94.5%</strong> of every traveler booking or product sale!
                </p>

                <div className="interactiveCalc">
                  <div className="calcInputRow">
                    <label>Test Booking / Sale Amount (PGK):</label>
                    <input
                      type="number"
                      min={10}
                      max={50000}
                      value={sampleAmount}
                      onChange={(e) => setSampleAmount(Math.max(10, Number(e.target.value) || 10))}
                    />
                  </div>

                  <div className="calcLedger">
                    <div className="ledgerRow">
                      <span>Gross Booking / Sale:</span>
                      <strong>{commissionExample.grossAmount.toFixed(2)} PGK</strong>
                    </div>
                    <div className="ledgerRow">
                      <span>Platform Commission (5%):</span>
                      <span className="fee">- {commissionExample.baseCommission.toFixed(2)} PGK</span>
                    </div>
                    <div className="ledgerRow">
                      <span>PNG GST (10% on fee):</span>
                      <span className="fee">- {commissionExample.gstOnCommission.toFixed(2)} PGK</span>
                    </div>
                    <div className="ledgerRow totalRow">
                      <span>Your Net Payout:</span>
                      <strong className="netPayout">{commissionExample.netProviderPayout.toFixed(2)} PGK</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="formField">
                <label>Preferred Payout Method *</label>
                <select
                  value={form.payoutMethod}
                  onChange={(e) => setForm({ ...form, payoutMethod: e.target.value })}
                >
                  <option value="bank_transfer">🏦 Bank Transfer (BSP, Kina Bank, Westpac PNG)</option>
                  <option value="cellmoni_digicel">📱 Digicel CellMoni Mobile Wallet</option>
                  <option value="bsp_pay">💳 BSP Pay Merchant Account</option>
                </select>
              </div>

              <div className="formField">
                <label>Bank Account / CellMoni Number Details *</label>
                <input
                  required
                  placeholder="e.g. BSP Account: 1001234567, Branch: Port Moresby"
                  value={form.payoutAccountDetails}
                  onChange={(e) => setForm({ ...form, payoutAccountDetails: e.target.value })}
                />
              </div>

              <label className="agreementCheckbox">
                <input
                  type="checkbox"
                  required
                  checked={form.agreedToCommission}
                  onChange={(e) => setForm({ ...form, agreedToCommission: e.target.checked })}
                />
                <span>
                  I agree to the <strong>5% + GST platform commission terms</strong> and confirm that all details provided are accurate and genuine. I understand that an administrator will verify my application through a phone/video interview and fact-checking before activation.
                </span>
              </label>

              <div className="wizardNavBtns">
                <button type="button" className="prevStepBtn" onClick={() => setStep(3)}>
                  ← Back
                </button>
                <button
                  type="submit"
                  className="submitApplicationBtn"
                  disabled={isSubmitting || !form.agreedToCommission || !form.payoutAccountDetails}
                >
                  {isSubmitting ? "Submitting Application…" : "Submit Registration for Vetting →"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS & TRACKING REFERENCE */}
          {step === 5 && (
            <div className="wizardSuccessContent">
              <div className="successIconBadge">✓</div>
              <h2>Application Received!</h2>
              <p className="successMessage">
                Thank you for applying to become a verified Visit PNG partner. Your application has been logged into our secure anti-scam review queue.
              </p>

              <div className="appRefBox">
                <small>Application Reference:</small>
                <strong>{submittedRef}</strong>
              </div>

              <div className="nextStepsTimeline">
                <h4>What Happens Next:</h4>
                <ol>
                  <li>
                    <strong>Document & Credential Check</strong>: Our team verifies your TPA/IPA registration and community reference.
                  </li>
                  <li>
                    <strong>Verification Interview</strong>: Our team will contact you on <b>{form.applicantPhone}</b> to conduct a brief interview and confirm your services.
                  </li>
                  <li>
                    <strong>Publishing & Payout Activation</strong>: Upon approval, your verified profile and listings will go live on the app.
                  </li>
                </ol>
              </div>

              <button type="button" className="doneBtn" onClick={onClose}>
                Done & Return to App
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

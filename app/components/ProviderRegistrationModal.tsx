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
  countryCode?: string;
  provinces?: ProvinceOption[];
  onClose: () => void;
}

const ZAMBIA_PROVIDER_CATEGORIES = [
  { id: "tour_guide", label: "🥾 Safari Guide & Wildlife Walking Leader", desc: "South Luangwa walking safaris, Victoria Falls, Lower Zambezi canoe trails" },
  { id: "hotel_lodge", label: "🏡 Safari Lodge, Tented Camp & Chalet", desc: "Riverfront luxury camps, wilderness bush suites, beach chalets" },
  { id: "transport_charter", label: "🚐 4x4 Safari Transport & River Charter", desc: "Bush airport shuttles, Zambezi water taxis, self-drive Land Cruisers" },
  { id: "aviation_airline", label: "✈️ Bush Aviation & Scenic Air Charters", desc: "Proflight safari hops, Victoria Falls helicopter & microlight flights" },
  { id: "scuba_diving", label: "🌊 Lake Tanganyika Marine & Water Tours", desc: "Ndole Bay dive charters, Kalambo Falls gorge cruises, freshwater sports" },
  { id: "cultural_artifacts", label: "🎨 Master Woodcarvings & Zambian Crafts", desc: "Kabwata woodcarvings, Tonga baskets & beadwork, Chitenge fashion" },
  { id: "restaurant_dining", label: "🍽️ Zambian Cuisine & Boma Bush Dining", desc: "Traditional Nshima & Zambezi bream, outdoor boma braai, bush dinners" },
  { id: "cultural_performer", label: "🎭 Traditional Ceremony Troupe & Dancers", desc: "Makishi masquerade, Ngoni warrior dancers, royal drum ensembles" }
];

const DEFAULT_ZAMBIA_PROVINCES: ProvinceOption[] = [
  { id: 2344, code: "ZM-LUS", name: "Lusaka Province", region: "Southern & Lusaka" },
  { id: 2343, code: "ZM-SOU", name: "Southern Province", region: "Southern & Lusaka" },
  { id: 2347, code: "ZM-COP", name: "Copperbelt Province", region: "Copperbelt & North-Western" },
  { id: 2351, code: "ZM-NW", name: "North-Western Province", region: "Copperbelt & North-Western" },
  { id: 2346, code: "ZM-CEN", name: "Central Province", region: "Central & Eastern" },
  { id: 2345, code: "ZM-EAS", name: "Eastern Province", region: "Central & Eastern" },
  { id: 2348, code: "ZM-NOR", name: "Northern Province", region: "Northern & Luapula" },
  { id: 2349, code: "ZM-LUA", name: "Luapula Province", region: "Northern & Luapula" },
  { id: 2352, code: "ZM-MUC", name: "Muchinga Province", region: "Northern & Luapula" },
  { id: 2350, code: "ZM-WES", name: "Western Province", region: "Western" }
];

export default function ProviderRegistrationModal({
  provinces,
  onClose
}: ProviderRegistrationModalProps) {
  const activeProvinces = provinces || DEFAULT_ZAMBIA_PROVINCES;
  const categories = ZAMBIA_PROVIDER_CATEGORIES;
  const currencyCode = "ZMW";

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [form, setForm] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    businessName: "",
    providerType: "tour_guide",
    provinceId: activeProvinces[0]?.id || 2344,
    villageOrTown: "",
    description: "",
    experienceYears: 2,
    licenseOrTpaNumber: "",
    clanOrReferenceContact: "",
    pricingSample: "",
    nrcDocumentUrl: "",
    licenseDocumentUrl: "",
    endorsementDocumentUrl: "",
    antiFraudDeclared: false,
    payoutMethod: "bank_transfer",
    payoutAccountDetails: "",
    agreedToCommission: false
  });

  const [nrcFileName, setNrcFileName] = useState("");
  const [licenseFileName, setLicenseFileName] = useState("");
  const [endorsementFileName, setEndorsementFileName] = useState("");

  const [sampleAmount, setSampleAmount] = useState<number>(1500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedRef, setSubmittedRef] = useState("");

  const vatRate = 0.16;
  const commissionExample = useMemo(() => {
    return calculateCommissionBreakdown(sampleAmount, 0.05, vatRate);
  }, [sampleAmount]);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "nrcDocumentUrl" | "licenseDocumentUrl" | "endorsementDocumentUrl",
    setFileName: (name: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setForm(prev => ({ ...prev, [field]: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextToStep3 = () => {
    if (!form.villageOrTown.trim() || !form.applicantPhone.trim() || !form.applicantEmail.trim() || !form.description.trim()) {
      setError("Please complete all required location, contact, and description fields.");
      return;
    }
    setError("");
    setStep(3);
  };

  const handleNextToStep4 = () => {
    if (!form.licenseOrTpaNumber.trim()) {
      setError("Mandatory Anti-Scam Check: Please enter your ZTA License Number or PACRA Registration Number.");
      return;
    }
    if (!form.clanOrReferenceContact.trim()) {
      setError("Mandatory Anti-Scam Check: Please provide your Traditional Authority / Chiefdom Council / Community Reference.");
      return;
    }
    if (!form.nrcDocumentUrl) {
      setError("Mandatory Document Upload: Please attach a copy of your National Registration Card (NRC) or Passport.");
      return;
    }
    if (!form.licenseDocumentUrl) {
      setError("Mandatory Document Upload: Please attach a copy of your ZTA Tourism License or PACRA Registration Certificate.");
      return;
    }
    if (!form.antiFraudDeclared) {
      setError("Mandatory Legal Declaration: You must certify the strict Anti-Fraud Notice before proceeding.");
      return;
    }
    setError("");
    setStep(4);
  };

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
        setSubmittedRef(data.applicationReference || "APP-ZMB-REGISTERED");
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

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--brand-deep-teal, #0d3838)",
    marginBottom: "6px"
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 14px",
    fontSize: "14px",
    borderRadius: "10px",
    border: "1.5px solid rgba(0,0,0,0.15)",
    background: "#ffffff",
    color: "#1e293b",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s"
  };

  const formGroupStyle: React.CSSProperties = {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column"
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="sheet providerRegSheet" style={{ maxWidth: "780px", width: "95vw", maxHeight: "92vh", overflowY: "auto", borderRadius: "20px", padding: "28px" }}>
        <button className="close" onClick={onClose} aria-label="Close provider registration" style={{ position: "absolute", top: "18px", right: "18px", background: "rgba(0,0,0,0.06)", border: "none", borderRadius: "50%", width: "36px", height: "36px", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>

        {step < 5 && (
          <div className="wizardStepHeader" style={{ marginBottom: "24px" }}>
            <span className="destinationPill" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#059669", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "inline-block", marginBottom: "8px" }}>
              🤝 PARTNER WITH VISIT ZAMBIA
            </span>
            <h2 style={{ fontSize: "24px", color: "var(--brand-deep-teal, #0d3838)", margin: "0 0 8px", fontWeight: 800 }}>Register as a Verified Tourism Provider</h2>
            <p className="wizardLead" style={{ fontSize: "14px", color: "var(--text-secondary, #64748b)", margin: "0 0 20px", lineHeight: 1.5 }}>
              Publish your safari lodges, guided tours, cultural crafts, and transport services to connect with global travellers. Every Zambian provider is vetted for safety and authenticity.
            </p>

            {/* Stepper Navigation */}
            <div className="wizardStepper" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", background: "rgba(0,0,0,0.03)", padding: "8px", borderRadius: "14px" }}>
              <div style={{ textAlign: "center", padding: "8px 4px", borderRadius: "10px", background: step === 1 ? "var(--brand-deep-teal, #0d3838)" : step > 1 ? "#10b981" : "transparent", color: step >= 1 ? "#fff" : "#94a3b8", transition: "all 0.2s" }}>
                <span style={{ display: "block", fontWeight: 800, fontSize: "14px" }}>1</span>
                <small style={{ fontSize: "11px", fontWeight: 600 }}>Business</small>
              </div>
              <div style={{ textAlign: "center", padding: "8px 4px", borderRadius: "10px", background: step === 2 ? "var(--brand-deep-teal, #0d3838)" : step > 2 ? "#10b981" : "transparent", color: step >= 2 ? "#fff" : "#94a3b8", transition: "all 0.2s" }}>
                <span style={{ display: "block", fontWeight: 800, fontSize: "14px" }}>2</span>
                <small style={{ fontSize: "11px", fontWeight: 600 }}>Location</small>
              </div>
              <div style={{ textAlign: "center", padding: "8px 4px", borderRadius: "10px", background: step === 3 ? "var(--brand-deep-teal, #0d3838)" : step > 3 ? "#10b981" : "transparent", color: step >= 3 ? "#fff" : "#94a3b8", transition: "all 0.2s" }}>
                <span style={{ display: "block", fontWeight: 800, fontSize: "14px" }}>3</span>
                <small style={{ fontSize: "11px", fontWeight: 600 }}>Anti-Scam</small>
              </div>
              <div style={{ textAlign: "center", padding: "8px 4px", borderRadius: "10px", background: step === 4 ? "var(--brand-deep-teal, #0d3838)" : "transparent", color: step === 4 ? "#fff" : "#94a3b8", transition: "all 0.2s" }}>
                <span style={{ display: "block", fontWeight: 800, fontSize: "14px" }}>4</span>
                <small style={{ fontSize: "11px", fontWeight: 600 }}>Payout & 5%</small>
              </div>
            </div>
          </div>
        )}

        {error && <div style={{ background: "#fef2f2", border: "1.5px solid #ef4444", color: "#b91c1c", padding: "12px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, marginBottom: "20px" }} aria-live="polite">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="providerRegForm">
          {/* STEP 1: BUSINESS & SERVICE CATEGORY */}
          {step === 1 && (
            <div className="wizardStepContent">
              <h3 style={{ fontSize: "18px", color: "var(--brand-deep-teal, #0d3838)", margin: "0 0 6px", fontWeight: 700 }}>Step 1: Business Profile & Service Category</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary, #64748b)", margin: "0 0 16px" }}>Select what type of tourism experiences or products you provide in Zambia.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", marginBottom: "20px" }}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    style={{
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: form.providerType === cat.id ? "2px solid #10b981" : "1.5px solid rgba(0,0,0,0.1)",
                      background: form.providerType === cat.id ? "rgba(16, 185, 129, 0.08)" : "#fff",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px"
                    }}
                    onClick={() => setForm({ ...form, providerType: cat.id })}
                  >
                    <strong style={{ fontSize: "13px", color: "var(--brand-deep-teal, #0d3838)" }}>{cat.label}</strong>
                    <small style={{ fontSize: "11px", color: "#64748b", lineHeight: 1.4 }}>{cat.desc}</small>
                  </button>
                ))}
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Business / Operator Trading Name *</label>
                <input
                  required
                  style={inputStyle}
                  placeholder="e.g. South Luangwa Walking Guides, Mukambi Safari Lodge, or Royal Chariot Tours"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: "14px", marginBottom: "16px" }}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Primary Contact Person / Manager *</label>
                  <input
                    required
                    style={inputStyle}
                    placeholder="e.g. Mwansa Banda or Lawrence Mukombo"
                    value={form.applicantName}
                    onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                  />
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Years in Operation</label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    style={inputStyle}
                    value={form.experienceYears}
                    onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}
                  disabled={!form.businessName.trim() || !form.applicantName.trim()}
                  onClick={() => {
                    if (!form.businessName.trim() || !form.applicantName.trim()) {
                      setError("Please provide your Business Trading Name and Primary Contact Name.");
                      return;
                    }
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
              <h3 style={{ fontSize: "18px", color: "var(--brand-deep-teal, #0d3838)", margin: "0 0 6px", fontWeight: 700 }}>Step 2: Operating Base & Contact Channels</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary, #64748b)", margin: "0 0 16px" }}>Where do you welcome safari guests or craft your products in Zambia?</p>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Primary Operating Province *</label>
                <select
                  style={inputStyle}
                  value={form.provinceId}
                  onChange={(e) => setForm({ ...form, provinceId: Number(e.target.value) })}
                >
                  {activeProvinces.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.region} Region)
                    </option>
                  ))}
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Village, Town, or District Base *</label>
                <input
                  required
                  style={inputStyle}
                  placeholder="e.g. Mfuwe, Livingstone, Siavonga, Solwezi, Kasama, or Lusaka Urban"
                  value={form.villageOrTown}
                  onChange={(e) => setForm({ ...form, villageOrTown: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Contact Phone (MTN / Airtel / Zamtel) *</label>
                  <input
                    required
                    type="tel"
                    style={inputStyle}
                    placeholder="+260 97XXXXXXX or +260 96XXXXXXX"
                    value={form.applicantPhone}
                    onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })}
                  />
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Official Contact Email Address *</label>
                  <input
                    required
                    type="email"
                    style={inputStyle}
                    placeholder="operator@company.zm"
                    value={form.applicantEmail}
                    onChange={(e) => setForm({ ...form, applicantEmail: e.target.value })}
                  />
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Detailed Description of Offerings *</label>
                <textarea
                  rows={3}
                  required
                  style={{ ...inputStyle, minHeight: "85px", fontFamily: "inherit" }}
                  placeholder="Describe your safari itineraries, lodge accommodation, walking packages, or vehicle transport services..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
                <button type="button" style={{ background: "rgba(0,0,0,0.06)", border: "none", padding: "12px 20px", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }} onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button
                  type="button"
                  style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}
                  onClick={handleNextToStep3}
                >
                  Continue to Anti-Scam Check →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ANTI-SCAM CREDENTIALS & MANDATORY DOCUMENT UPLOADS */}
          {step === 3 && (
            <div className="wizardStepContent">
              <h3 style={{ fontSize: "18px", color: "var(--brand-deep-teal, #0d3838)", margin: "0 0 6px", fontWeight: 700 }}>Step 3: Anti-Scam & Legal Trust Credentials</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary, #64748b)", margin: "0 0 16px" }}>
                To protect tourists and authentic Zambian operators from fraud, all credentials and document copies are mandatory and fact-checked before listings go live.
              </p>

              {/* Strict Legal Warning Banner */}
              <div style={{ background: "#fff1f2", border: "2px solid #e11d48", borderRadius: "14px", padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "14px" }}>
                <span style={{ fontSize: "28px" }}>🚨</span>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "#9f1239", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    STRICT ANTI-FRAUD NOTICE & LEGAL DECLARATION
                  </h4>
                  <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#881337", lineHeight: 1.45 }}>
                    Submission of forged, counterfeit, altered, or misleading documentation is a serious criminal offense under the Penal Code Act (Cap 87) and Tourism and Hospitality Act No. 13 of the Laws of Zambia.
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#881337", fontWeight: 700, lineHeight: 1.45 }}>
                    ⚠️ <strong>Enforcement Action:</strong> Any provider submitting fake details or fraudulent documents will face <strong>immediate permanent blacklisting</strong> and will be <strong>reported directly to the Zambia Police Service (Cyber & Fraud Unit), Drug Enforcement Commission (DEC), and the Zambia Tourism Agency (ZTA) for criminal prosecution</strong>.
                  </p>
                </div>
              </div>

              {/* Mandatory Credentials Inputs */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>ZTA License Number / PACRA Registration Certificate Number *</label>
                <input
                  required
                  style={inputStyle}
                  placeholder="e.g. ZTA-2026-089 or PACRA 1202600123"
                  value={form.licenseOrTpaNumber}
                  onChange={(e) => setForm({ ...form, licenseOrTpaNumber: e.target.value })}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Community Reference / Royal Chiefdom / Local Leader (Name & Phone) *</label>
                <input
                  required
                  style={inputStyle}
                  placeholder="e.g. Headman Tembo (+260 977 123456, Kakumbi Chiefdom Mfuwe)"
                  value={form.clanOrReferenceContact}
                  onChange={(e) => setForm({ ...form, clanOrReferenceContact: e.target.value })}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Sample Standard Pricing Structure ({currencyCode})</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. 450 ZMW/day guide, 2400 ZMW/night chalet, 350 ZMW/transfer"
                  value={form.pricingSample}
                  onChange={(e) => setForm({ ...form, pricingSample: e.target.value })}
                />
              </div>

              {/* Document Upload Sections */}
              <div style={{ background: "rgba(0,0,0,0.02)", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: "14px", padding: "16px 18px", margin: "18px 0" }}>
                <strong style={{ fontSize: "13px", color: "var(--brand-deep-teal, #0d3838)", display: "block", marginBottom: "12px" }}>
                  📁 Mandatory Verification Document Copies (Upload PDF or Image)
                </strong>

                {/* Upload 1: NRC / Passport */}
                <div style={{ marginBottom: "12px", background: "#fff", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", display: "block" }}>1. National Registration Card (NRC) / Passport Copy *</label>
                    <small style={{ fontSize: "11px", color: "#64748b" }}>{nrcFileName ? `Attached: ${nrcFileName}` : "Format: PDF, JPG, PNG (Max 5MB)"}</small>
                  </div>
                  <label style={{ background: "var(--brand-deep-teal, #0d3838)", color: "#fff", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                    {nrcFileName ? "Change File" : "Upload NRC / Passport"}
                    <input type="file" accept="image/*,application/pdf" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "nrcDocumentUrl", setNrcFileName)} />
                  </label>
                </div>

                {/* Upload 2: ZTA / PACRA Certificate */}
                <div style={{ marginBottom: "12px", background: "#fff", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", display: "block" }}>2. ZTA License / PACRA Registration Document *</label>
                    <small style={{ fontSize: "11px", color: "#64748b" }}>{licenseFileName ? `Attached: ${licenseFileName}` : "Format: PDF, JPG, PNG (Max 5MB)"}</small>
                  </div>
                  <label style={{ background: "var(--brand-deep-teal, #0d3838)", color: "#fff", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                    {licenseFileName ? "Change File" : "Upload License / PACRA"}
                    <input type="file" accept="image/*,application/pdf" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "licenseDocumentUrl", setLicenseFileName)} />
                  </label>
                </div>

                {/* Upload 3: Proof of Location / Chiefdom Letter */}
                <div style={{ background: "#fff", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", display: "block" }}>3. Proof of Operating Location / Chiefdom Endorsement Letter</label>
                    <small style={{ fontSize: "11px", color: "#64748b" }}>{endorsementFileName ? `Attached: ${endorsementFileName}` : "Utility bill, lease, or chiefdom letter (Recommended)"}</small>
                  </div>
                  <label style={{ background: "rgba(0,0,0,0.08)", color: "#1e293b", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                    {endorsementFileName ? "Change File" : "Upload Proof"}
                    <input type="file" accept="image/*,application/pdf" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "endorsementDocumentUrl", setEndorsementFileName)} />
                  </label>
                </div>
              </div>

              {/* Mandatory Legal Certification Checkbox */}
              <div style={{ background: "#fffbeb", border: "1.5px solid #f59e0b", padding: "14px 16px", borderRadius: "10px", margin: "16px 0" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    required
                    checked={form.antiFraudDeclared}
                    onChange={(e) => setForm({ ...form, antiFraudDeclared: e.target.checked })}
                    style={{ marginTop: "3px", width: "18px", height: "18px" }}
                  />
                  <span style={{ fontSize: "12px", color: "#78350f", lineHeight: 1.45 }}>
                    <strong>Legal Declaration & Truthfulness Certification:</strong> I solemnly declare and certify under penalty of immediate permanent platform ban and criminal prosecution that all business details, licenses, and document copies uploaded are 100% genuine, authentic, and legally registered in the Republic of Zambia.
                  </span>
                </label>
              </div>

              <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
                <button type="button" style={{ background: "rgba(0,0,0,0.06)", border: "none", padding: "12px 20px", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }} onClick={() => setStep(2)}>
                  ← Back
                </button>
                <button
                  type="button"
                  style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}
                  onClick={handleNextToStep4}
                >
                  Continue to Commission Agreement →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYOUT & 5% + VAT COMMISSION AGREEMENT */}
          {step === 4 && (
            <div className="wizardStepContent">
              <h3 style={{ fontSize: "18px", color: "var(--brand-deep-teal, #0d3838)", margin: "0 0 6px", fontWeight: 700 }}>Step 4: Payout Details & 5% + VAT Commission Terms</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary, #64748b)", margin: "0 0 16px" }}>Transparent pricing. No monthly listing fees. We only earn when you receive verified guest bookings.</p>

              {/* Commission Calculator Interactive Card */}
              <div style={{ background: "#f8fafc", border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: "14px", padding: "16px 20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <strong style={{ fontSize: "14px", color: "var(--brand-deep-teal, #0d3838)" }}>💰 Platform Commission Breakdown</strong>
                  <span style={{ background: "#10b981", color: "#fff", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>5% + 16% VAT</span>
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 14px", lineHeight: 1.45 }}>
                  Visit Zambia charges a <strong>5% base platform commission</strong> + <strong>16% Zambia VAT</strong> on the commission (total 5.8% platform fee). You keep <strong>94.2%</strong> of every traveler booking or product sale!
                </p>

                <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "10px", padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>Test Booking Amount ({currencyCode}):</label>
                    <input
                      type="number"
                      min={10}
                      max={50000}
                      style={{ width: "120px", padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: 700, textAlign: "right" }}
                      value={sampleAmount}
                      onChange={(e) => setSampleAmount(Math.max(10, Number(e.target.value) || 10))}
                    />
                  </div>

                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "8px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                      <span>Gross Booking / Sale:</span>
                      <strong>{commissionExample.grossAmount.toFixed(2)} {currencyCode}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#dc2626" }}>
                      <span>Platform Commission (5%):</span>
                      <span>- {commissionExample.baseCommission.toFixed(2)} {currencyCode}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#dc2626" }}>
                      <span>Zambia VAT (16% on fee):</span>
                      <span>- {commissionExample.gstOnCommission.toFixed(2)} {currencyCode}</span>
                    </div>
                    <div style={{ borderTop: "1.5px solid #e2e8f0", paddingTop: "6px", display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 800, color: "#10b981" }}>
                      <span>Your Net Payout (94.2%):</span>
                      <span>{commissionExample.netProviderPayout.toFixed(2)} {currencyCode}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payout Banking Details */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>Payout Method *</label>
                <select
                  style={inputStyle}
                  value={form.payoutMethod}
                  onChange={(e) => setForm({ ...form, payoutMethod: e.target.value })}
                >
                  <option value="bank_transfer">Commercial Bank Transfer (Stanbic, Absa, Zanaco, Standard Chartered, FNB)</option>
                  <option value="mobile_money">Mobile Money (Airtel Money / MTN MoMo Merchant / Zamtel Kwacha)</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Bank / Mobile Money Account Settlement Details *</label>
                <textarea
                  rows={2}
                  required
                  style={{ ...inputStyle, minHeight: "65px", fontFamily: "inherit" }}
                  placeholder="e.g. Stanbic Bank Zambia · Account Name: Mukambi Safaris Ltd · Account: 913000452109 · Lusaka Branch"
                  value={form.payoutAccountDetails}
                  onChange={(e) => setForm({ ...form, payoutAccountDetails: e.target.value })}
                />
              </div>

              <div style={{ background: "#f0fdf4", border: "1.5px solid #10b981", padding: "14px 16px", borderRadius: "10px", margin: "16px 0" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    required
                    checked={form.agreedToCommission}
                    onChange={(e) => setForm({ ...form, agreedToCommission: e.target.checked })}
                    style={{ marginTop: "3px", width: "18px", height: "18px" }}
                  />
                  <span style={{ fontSize: "12px", color: "#14532d", lineHeight: 1.45 }}>
                    <strong>I agree to the 5% + 16% VAT Platform Commission Terms</strong> and authorize ZamRoam / Visit Zambia to settle net booking proceeds directly to my registered Zambian bank or mobile money account.
                  </span>
                </label>
              </div>

              <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
                <button type="button" style={{ background: "rgba(0,0,0,0.06)", border: "none", padding: "12px 20px", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }} onClick={() => setStep(3)}>
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !form.agreedToCommission || !form.payoutAccountDetails.trim()}
                  style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}
                >
                  {isSubmitting ? "Submitting Application…" : "Submit Official Provider Application 🚀"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: APPLICATION SUBMITTED CONFIRMATION */}
          {step === 5 && (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#10b981", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 16px" }}>✓</div>
              <h2 style={{ fontSize: "24px", color: "var(--brand-deep-teal, #0d3838)", fontWeight: 800, margin: "0 0 8px" }}>Application Received Successfully!</h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary, #64748b)", margin: "0 0 20px" }}>
                Your provider registration and anti-scam credentials have been queued for fact-checking by our Lusaka & Livingstone verification desk.
              </p>

              <div style={{ background: "#f8fafc", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: "12px", padding: "16px 20px", display: "inline-block", textAlign: "left", marginBottom: "24px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>APPLICATION TRACKING ID:</span>
                <strong style={{ display: "block", fontSize: "18px", color: "var(--brand-deep-teal, #0d3838)", letterSpacing: "0.05em" }}>{submittedRef}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{ background: "var(--brand-deep-teal, #0d3838)", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}
                >
                  Close & Return to Catalogue
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

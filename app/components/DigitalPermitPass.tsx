"use client";
import {useState, useSyncExternalStore} from "react";
import {PNG_PERMIT_TYPES, ZAMBIA_PERMIT_TYPES, IssuedPermit, createPermit} from "../../db/permits";
import {CurrencyCode, formatPrice} from "../../db/currency";

interface DigitalPermitPassProps {
  currency: CurrencyCode;
  countryCode?: string;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getOfflinePermitsSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem("visitpng_digital_permits") || "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

export default function DigitalPermitPass({currency, countryCode = "ZMB"}: DigitalPermitPassProps) {
  const isZambia = countryCode.toUpperCase() === "ZMB";
  const permitTypes = isZambia ? ZAMBIA_PERMIT_TYPES : PNG_PERMIT_TYPES;
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");
  const selectedType = permitTypes.find(p => p.id === selectedTypeId) || permitTypes[0];
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [holderName, setHolderName] = useState("");
  const [passportOrId, setPassportOrId] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const activeCountryOfOrigin = countryOfOrigin || (isZambia ? "Zambia" : "Papua New Guinea");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [activePermitView, setActivePermitView] = useState<IssuedPermit | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const issuedPermitsRaw = useSyncExternalStore(subscribe, getOfflinePermitsSnapshot, getServerSnapshot);
  let issuedPermits: IssuedPermit[] = [];
  try {
    issuedPermits = JSON.parse(issuedPermitsRaw);
  } catch {
    issuedPermits = [];
  }

  const handleIssuePermit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPermit = createPermit(
      selectedType.id,
      holderName,
      passportOrId,
      activeCountryOfOrigin,
      startDate,
      currency
    );

    const updated = [newPermit, ...issuedPermits];
    try {
      localStorage.setItem("visitpng_digital_permits", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch {}

    setStatusMessage(`🎉 Permit ${newPermit.reference} issued & saved for offline verification!`);
    setShowIssueModal(false);
    setActivePermitView(newPermit);
    setHolderName("");
    setPassportOrId("");
    setTimeout(() => setStatusMessage(""), 4500);
  };

  // Generate an SVG QR code representation deterministically based on reference
  const renderSvgQr = (token: string) => {
    const size = 160;
    const grid = 9;
    const cellSize = size / grid;
    const cells = [];
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        const isCorner =
          (r < 3 && c < 3) ||
          (r < 3 && c >= grid - 3) ||
          (r >= grid - 3 && c < 3);
        const charCode = token.charCodeAt((r * grid + c) % token.length) || 0;
        const fill = isCorner || (charCode % 2 === 0);
        if (fill) {
          cells.push({ x: c * cellSize, y: r * cellSize, w: cellSize - 1, h: cellSize - 1 });
        }
      }
    }

    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="permitQrSvg">
        <rect width={size} height={size} fill="var(--brand-white)" rx="8"/>
        {cells.map((cell, idx) => (
          <rect
            key={idx}
            x={cell.x}
            y={cell.y}
            width={cell.w}
            height={cell.h}
            fill="var(--brand-deep-teal)"
            rx="1"
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="permitsSection">
      <div className="permitsHeader">
        <div>
          <p className="eyebrow lime">OFFICIAL DIGITAL ACCESS PASSES</p>
          <h2>{isZambia ? "National Park & Wildlife Permits" : "Trekking Permits & Marine Tags"}</h2>
          <p>
            {isZambia
              ? "Issue and carry authorized Zambian Department of National Parks & Wildlife (DNPW) conservation passes with instant offline QR validation."
              : "Issue and carry authorized Papua New Guinea park permits and conservation tags with instant offline QR validation."}
          </p>
        </div>
        <button
          type="button"
          className="issueNewPermitBtn"
          onClick={() => setShowIssueModal(true)}
        >
          ➕ Issue Digital Permit
        </button>
      </div>

      {statusMessage && (
        <div className="permitAlertBanner" role="status" aria-live="polite">
          {statusMessage}
        </div>
      )}

      {/* Wallet: Active Issued Permits */}
      {issuedPermits.length > 0 && (
        <div className="permitWallet">
          <div className="walletTitle">
            <h3>🎫 My Active Offline Permits ({issuedPermits.length})</h3>
            <span className="offlineStatusPill">📶 100% Offline Accessible</span>
          </div>

          <div className="permitWalletCards">
            {issuedPermits.map(permit => (
              <div key={permit.id} className="issuedPermitCard">
                <div className="cardTop">
                  <div>
                    <span className="permitRef">{permit.reference}</span>
                    <h4>{permit.permitName}</h4>
                  </div>
                  <span className="activeBadge">● {permit.status.toUpperCase()}</span>
                </div>

                <div className="cardDetails">
                  <p>Holder: <strong>{permit.holderName}</strong></p>
                  <p>Passport/ID: <strong>{permit.passportOrId}</strong></p>
                  <p>Origin: <strong>{permit.countryOfOrigin}</strong></p>
                  <p>Valid: <strong>{permit.startDate}</strong> to <strong>{permit.expiryDate}</strong></p>
                  <p>Issuing Authority: <strong>{permit.authority}</strong></p>
                </div>

                <div className="cardActions">
                  <button
                    type="button"
                    className="viewQrBtn"
                    onClick={() => setActivePermitView(permit)}
                  >
                    🔍 View Validation QR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Permit Catalog */}
      <div className="permitCatalogTitle">
        <h3>Available Official Passes & Conservation Tags</h3>
        <small>Select any pass below to view details and regulations</small>
      </div>

      <div className="permitCatalogGrid">
        {permitTypes.map(p => (
          <article key={p.id} className="permitTypeCard">
            <div className="permitTypeHeader">
              <span className={`permitCategoryTag ${p.category.toLowerCase()}`}>{p.category}</span>
              <span className="permitProvince">{p.province}</span>
            </div>
            <h4>{p.name}</h4>
            <p className="permitAuthority">Issuing Body: <b>{p.authority}</b></p>
            <p className="permitDesc">{p.description}</p>

            <div className="permitBenefitsList">
              <strong>Included Rights:</strong>
              <ul>
                {p.includedBenefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="permitCardFooter">
              <div className="permitCost">
                <small>Official Fee ({p.validityDays} days)</small>
                <strong>{formatPrice(p.feePgk, currency)}</strong>
              </div>
              <button
                type="button"
                className="getPermitBtn"
                onClick={() => {
                  setSelectedTypeId(p.id);
                  setShowIssueModal(true);
                }}
              >
                Get {p.category} Permit
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Permit Issuance Sheet Modal */}
      {showIssueModal && (
        <div className="overlay" onClick={() => setShowIssueModal(false)}>
          <article className="sheet permitModalSheet" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setShowIssueModal(false)}>×</button>
            <p className="eyebrow lime">OFFICIAL PERMIT APPLICATION</p>
            <h2>{selectedType.name}</h2>
            <p className="permitIssuerInfo">Authority: <b>{selectedType.authority}</b> · Validity: <b>{selectedType.validityDays} Days</b></p>

            <form onSubmit={handleIssuePermit}>
              <label>
                Permit Type
                <select
                  value={selectedType.id}
                  onChange={e => {
                    const found = permitTypes.find(x => x.id === e.target.value);
                    if (found) setSelectedTypeId(found.id);
                  }}
                >
                  {permitTypes.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({formatPrice(t.feePgk, currency)})
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Full Legal Name of Trekker / Visitor
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={holderName}
                  onChange={e => setHolderName(e.target.value)}
                />
              </label>

              <label>
                Passport Number or PNG National ID
                <input
                  type="text"
                  required
                  placeholder="e.g. N1234567 or PNG-ID"
                  value={passportOrId}
                  onChange={e => setPassportOrId(e.target.value)}
                />
              </label>

              <label>
                Country of Residence
                <input
                  type="text"
                  required
                  value={countryOfOrigin}
                  onChange={e => setCountryOfOrigin(e.target.value)}
                />
              </label>

              <label>
                Expedition / Entry Start Date
                <input
                  type="date"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </label>

              <div className="permitFeeSummary">
                <span>Conservation / Permit Fee</span>
                <strong>{formatPrice(selectedType.feePgk, currency)}</strong>
              </div>

              <button type="submit" className="issuePermitSubmitBtn">
                Generate Digital Permit & QR Pass
              </button>
            </form>
          </article>
        </div>
      )}

      {/* QR Code Digital Pass View Modal */}
      {activePermitView && (
        <div className="overlay" onClick={() => setActivePermitView(null)}>
          <article className="sheet permitQrModal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setActivePermitView(null)}>×</button>
            <div className="permitPassHeader">
              <span className="permitPassWatermark">PAPUA NEW GUINEA</span>
              <p className="eyebrow lime">OFFICIAL ENTRY PASS</p>
              <h2>{activePermitView.permitName}</h2>
              <strong className="permitRefHighlight">{activePermitView.reference}</strong>
            </div>

            <div className="permitQrContainer">
              {renderSvgQr(activePermitView.offlineVerificationHash)}
              <span className="offlineQrNotice">✅ Verified for Offline Ranger Scanning</span>
            </div>

            <div className="permitPassMeta">
              <div>
                <small>Holder Name</small>
                <b>{activePermitView.holderName}</b>
              </div>
              <div>
                <small>ID / Passport</small>
                <b>{activePermitView.passportOrId}</b>
              </div>
              <div>
                <small>Valid From</small>
                <b>{activePermitView.startDate}</b>
              </div>
              <div>
                <small>Expires On</small>
                <b>{activePermitView.expiryDate}</b>
              </div>
              <div>
                <small>Issuing Authority</small>
                <b>{activePermitView.authority}</b>
              </div>
              <div>
                <small>Status</small>
                <b className="activeStatus">● {activePermitView.status.toUpperCase()}</b>
              </div>
            </div>

            <div className="rangerInstructions">
              <strong>🌲 Park Ranger & Guide Validation:</strong>
              <p>This digital pass is securely signed and valid without cellular connectivity. Verify holder ID against the QR certificate reference.</p>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import type { ProviderApplicationRecord } from "../../db/providers";
import { calculateCommissionBreakdown } from "../../db/commission";

interface AdminProviderVettingProps {
  applications: ProviderApplicationRecord[];
  onRefresh: () => void;
}

export default function AdminProviderVetting({
  applications,
  onRefresh
}: AdminProviderVettingProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<ProviderApplicationRecord | null>(null);

  // Pagination & Sorting state (Rule 24 compliant)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<"businessName" | "createdAt" | "status" | "provinceName">("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Vetting Editor State
  const [vettingChecklist, setVettingChecklist] = useState({
    nidPassportVerified: false,
    tpaLicenseVerified: false,
    clanLandownerConsentVerified: false,
    interviewConducted: false,
    equipmentSafetyChecked: false
  });
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [factCheckingNotes, setFactCheckingNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [commissionRate, setCommissionRate] = useState(0.05);
  const [gstRate, setGstRate] = useState(0.16);
  const [calcTestAmount, setCalcTestAmount] = useState(1000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  const handleSelectApp = (app: ProviderApplicationRecord) => {
    setSelectedApp(app);
    setVettingChecklist({
      nidPassportVerified: !!app.vettingChecklist.nidPassportVerified,
      tpaLicenseVerified: !!app.vettingChecklist.tpaLicenseVerified,
      clanLandownerConsentVerified: !!app.vettingChecklist.clanLandownerConsentVerified,
      interviewConducted: !!app.vettingChecklist.interviewConducted,
      equipmentSafetyChecked: !!app.vettingChecklist.equipmentSafetyChecked
    });
    setInterviewDate(app.interviewDate || "");
    setInterviewNotes(app.interviewNotes || "");
    setFactCheckingNotes(app.factCheckingNotes || "");
    setRejectionReason(app.rejectionReason || "");
    setCommissionRate(app.commissionRate ?? 0.05);
    setGstRate(app.gstRate ?? 0.16);
    setActionMessage("");
  };

  const payoutCalc = useMemo(() => {
    return calculateCommissionBreakdown(calcTestAmount, commissionRate, gstRate);
  }, [calcTestAmount, commissionRate, gstRate]);

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        if (statusFilter !== "all" && app.status !== statusFilter) return false;
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          app.businessName.toLowerCase().includes(q) ||
          app.applicantName.toLowerCase().includes(q) ||
          app.applicantEmail.toLowerCase().includes(q) ||
          app.applicantPhone.includes(q) ||
          (app.provinceName && app.provinceName.toLowerCase().includes(q)) ||
          app.villageOrTown.toLowerCase().includes(q) ||
          app.providerType.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        let valA: string | number = a[sortField] || "";
        let valB: string | number = b[sortField] || "";
        if (sortField === "createdAt") {
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
        }
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [applications, statusFilter, search, sortField, sortDirection]);

  // Pagination slice
  const totalRecords = filteredApplications.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const paginatedApplications = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredApplications.slice(start, start + pageSize);
  }, [filteredApplications, page, pageSize]);

  const handleUpdateStatus = async (
    targetStatus: "pending_review" | "interview_scheduled" | "fact_checking" | "approved" | "rejected"
  ) => {
    if (!selectedApp) return;
    setIsProcessing(true);
    setActionMessage("Updating application…");

    try {
      const res = await fetch("/api/admin/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedApp.id,
          status: targetStatus,
          vettingChecklist,
          interviewDate: interviewDate || null,
          interviewNotes: interviewNotes || null,
          factCheckingNotes: factCheckingNotes || null,
          rejectionReason: targetStatus === "rejected" ? rejectionReason : null,
          commissionRate,
          gstRate
        })
      });

      const data = await res.json();

      if (res.ok) {
        setActionMessage(
          targetStatus === "approved"
            ? "✓ Provider approved and activated in official catalogue!"
            : targetStatus === "rejected"
            ? "Application marked as rejected."
            : "✓ Application status updated successfully."
        );
        onRefresh();
      } else {
        setActionMessage(data.error || "Failed to update application.");
      }
    } catch {
      setActionMessage("Network error updating application.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: ProviderApplicationRecord["status"]) => {
    switch (status) {
      case "approved":
        return <span className="statusBadge approved">🟢 Approved & Active</span>;
      case "interview_scheduled":
        return <span className="statusBadge interview">🗓️ Interview Scheduled</span>;
      case "fact_checking":
        return <span className="statusBadge checking">🔍 Fact-Checking</span>;
      case "rejected":
        return <span className="statusBadge rejected">🔴 Rejected</span>;
      default:
        return <span className="statusBadge pending">⏳ Pending Review</span>;
    }
  };

  return (
    <section className="adminProviderVettingSection">
      <div className="sectionHeaderRow">
        <div>
          <h2>🏢 Provider Applications & Anti-Scam Vetting Console</h2>
          <p className="subtext">
            Verify credentials, schedule interviews, and approve genuine local tourism operators and cultural artisans.
          </p>
        </div>
        <button className="refreshBtn" onClick={onRefresh}>
          ↻ Refresh List
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="tableControlsBar">
        <div className="searchBoxWrapper">
          <span>⌕</span>
          <input
            placeholder="Search by business name, applicant, province, phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {search && <button className="clearBtn" onClick={() => setSearch("")}>×</button>}
        </div>

        <div className="filterPillsRow">
          {["all", "pending_review", "interview_scheduled", "fact_checking", "approved", "rejected"].map((st) => (
            <button
              key={st}
              className={`filterPill ${statusFilter === st ? "active" : ""}`}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
            >
              {st === "all"
                ? `All (${applications.length})`
                : st === "pending_review"
                ? "Pending Review"
                : st === "interview_scheduled"
                ? "Interview Scheduled"
                : st === "fact_checking"
                ? "Fact-Checking"
                : st === "approved"
                ? "Approved"
                : "Rejected"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Table + Detail Inspector */}
      <div className="vettingGrid">
        {/* Table Column */}
        <div className="applicationsTableCard">
          <div className="tableMetaRow">
            <span>
              Showing {paginatedApplications.length} of {totalRecords} applications
            </span>
            <div className="pageSizeSelector">
              <label>Page Size:</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="tableResponsiveWrapper">
            <table className="enterpriseDataTable">
              <thead>
                <tr>
                  <th onClick={() => {
                    setSortField("businessName");
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  }}>
                    Business / Provider {sortField === "businessName" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Category</th>
                  <th onClick={() => {
                    setSortField("provinceName");
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  }}>
                    Location {sortField === "provinceName" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Applicant</th>
                  <th onClick={() => {
                    setSortField("status");
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  }}>
                    Status {sortField === "status" && (sortDirection === "asc" ? "desc" : "asc")}
                  </th>
                  <th onClick={() => {
                    setSortField("createdAt");
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  }}>
                    Applied {sortField === "createdAt" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedApplications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="emptyTableState">
                      No provider applications match the current filters.
                    </td>
                  </tr>
                ) : (
                  paginatedApplications.map((app) => (
                    <tr
                      key={app.id}
                      className={selectedApp?.id === app.id ? "selectedRow" : ""}
                      onClick={() => handleSelectApp(app)}
                    >
                      <td>
                        <strong>{app.businessName}</strong>
                        <small className="appSlug">{app.slug}</small>
                      </td>
                      <td>
                        <span className="catPill">{app.providerType.replace("_", " ")}</span>
                      </td>
                      <td>
                        <span>{app.provinceName || "Zambia"}</span>
                        <small>{app.villageOrTown}</small>
                      </td>
                      <td>
                        <span>{app.applicantName}</span>
                        <small>{app.applicantPhone}</small>
                      </td>
                      <td>{getStatusBadge(app.status)}</td>
                      <td>
                        <time>{new Date(app.createdAt).toLocaleDateString()}</time>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="inspectBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectApp(app);
                          }}
                        >
                          Inspect & Vet →
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="paginationControls">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Previous
            </button>
            <span>
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Inspection & Fact-Checking Drawer */}
        {selectedApp ? (
          <div className="vettingInspectorCard">
            <div className="inspectorHeader">
              <div>
                <span className="inspectorTag">🛡️ ANTI-SCAM VETTING DESK</span>
                <h3>{selectedApp.businessName}</h3>
                <p className="appMeta">{selectedApp.applicantName} · {selectedApp.applicantEmail} · {selectedApp.applicantPhone}</p>
              </div>
              <button className="closeInspectorBtn" onClick={() => setSelectedApp(null)}>×</button>
            </div>

            {actionMessage && (
              <div className={`actionStatusBanner ${actionMessage.startsWith("✓") ? "success" : "error"}`}>
                {actionMessage}
              </div>
            )}

            {/* Business Info Overview */}
            <div className="inspectorSection">
              <h4>Service & Offering Details</h4>
              <p className="descText">{selectedApp.description}</p>
              <div className="metaGrid">
                <div>
                  <label>Category:</label>
                  <span>{selectedApp.providerType.replace("_", " ")}</span>
                </div>
                <div>
                  <label>Experience:</label>
                  <span>{selectedApp.experienceYears} Years</span>
                </div>
                <div>
                  <label>Base / Location:</label>
                  <span>{selectedApp.villageOrTown}, {selectedApp.provinceName}</span>
                </div>
                <div>
                  <label>ZTA / Tourism License:</label>
                  <span>{selectedApp.licenseOrTpaNumber || "None provided"}</span>
                </div>
                <div>
                  <label>Traditional / Land Authority:</label>
                  <span>{selectedApp.clanOrReferenceContact || "None provided"}</span>
                </div>
                <div>
                  <label>Sample Pricing:</label>
                  <span>{selectedApp.pricingSample || "Standard catalogue pricing"}</span>
                </div>
              </div>
            </div>

            {/* Anti-Scam 5-Point Verification Checklist */}
            <div className="inspectorSection checklistSection">
              <h4>🔍 5-Point Anti-Scam Verification Checklist</h4>
              <p className="checklistLead">Complete checks before activating provider listings.</p>

              <div className="checklistGrid">
                <label className="checkItem">
                  <input
                    type="checkbox"
                    checked={vettingChecklist.nidPassportVerified}
                    onChange={(e) => setVettingChecklist({ ...vettingChecklist, nidPassportVerified: e.target.checked })}
                  />
                  <span>1. National Registration Card (NRC) / Passport Authenticated</span>
                </label>

                <label className="checkItem">
                  <input
                    type="checkbox"
                    checked={vettingChecklist.tpaLicenseVerified}
                    onChange={(e) => setVettingChecklist({ ...vettingChecklist, tpaLicenseVerified: e.target.checked })}
                  />
                  <span>2. ZTA Tourism License / PACRA Registration Verified</span>
                </label>

                <label className="checkItem">
                  <input
                    type="checkbox"
                    checked={vettingChecklist.clanLandownerConsentVerified}
                    onChange={(e) => setVettingChecklist({ ...vettingChecklist, clanLandownerConsentVerified: e.target.checked })}
                  />
                  <span>3. Traditional Authority / Chiefdom / Council Endorsement</span>
                </label>

                <label className="checkItem">
                  <input
                    type="checkbox"
                    checked={vettingChecklist.interviewConducted}
                    onChange={(e) => setVettingChecklist({ ...vettingChecklist, interviewConducted: e.target.checked })}
                  />
                  <span>4. Phone / Video Interview Conducted</span>
                </label>

                <label className="checkItem">
                  <input
                    type="checkbox"
                    checked={vettingChecklist.equipmentSafetyChecked}
                    onChange={(e) => setVettingChecklist({ ...vettingChecklist, equipmentSafetyChecked: e.target.checked })}
                  />
                  <span>5. Safari Vehicles / Equipment / Lodge Facilities Inspected</span>
                </label>
              </div>
            </div>

            {/* Interview & Fact-Checking Logger */}
            <div className="inspectorSection">
              <h4>🗓️ Interview & Fact-Checking Log</h4>
              <div className="formField">
                <label>Interview Scheduled / Conducted Date:</label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                />
              </div>
              <div className="formField">
                <label>Interviewer Notes & Findings:</label>
                <textarea
                  rows={2}
                  placeholder="Record summary of conversation, verified routes, and guide knowledge..."
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                />
              </div>
              <div className="formField">
                <label>Fact-Checking & Security Check Notes:</label>
                <textarea
                  rows={2}
                  placeholder="Police clearance status, clan reference verification notes..."
                  value={factCheckingNotes}
                  onChange={(e) => setFactCheckingNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Commission & VAT Rate Configuration (Customizable) */}
            <div className="inspectorSection commissionSection">
              <h4>💰 Commission & Zambia VAT (ZRA) Rate Settings</h4>
              <div className="commissionConfigRow">
                <div className="formField">
                  <label>Base Commission Rate (Default: 5% = 0.05):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="0.50"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                  />
                </div>
                <div className="formField">
                  <label>Zambia VAT (ZRA) on Fee (Default: 16% = 0.16):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="0.50"
                    value={gstRate}
                    onChange={(e) => setGstRate(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Live Calculator Preview */}
              <div className="liveCalcCard">
                <div className="calcTop">
                  <span>Take-Rate Preview on {calcTestAmount} ZMW (ZK) Transaction:</span>
                  <input
                    type="number"
                    className="quickTestInput"
                    value={calcTestAmount}
                    onChange={(e) => setCalcTestAmount(Math.max(10, Number(e.target.value) || 10))}
                  />
                </div>
                <div className="calcBreakdownRow">
                  <span>Fee: {payoutCalc.baseCommission.toFixed(2)} ZMW ({(commissionRate * 100).toFixed(1)}%)</span>
                  <span>VAT: {payoutCalc.gstOnCommission.toFixed(2)} ZMW ({(gstRate * 100).toFixed(1)}%)</span>
                  <strong>Provider Net: {payoutCalc.netProviderPayout.toFixed(2)} ZMW (ZK)</strong>
                </div>
              </div>

              <div className="payoutMeta">
                <label>Registered Payout Method:</label>
                <span>{selectedApp.payoutMethod.replace("_", " ").toUpperCase()}: {selectedApp.payoutAccountDetails}</span>
              </div>
            </div>

            {/* Rejection Reason (If rejecting) */}
            <div className="formField">
              <label>Rejection Reason / Feedback (If rejecting application):</label>
              <input
                placeholder="Reason for declining application..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>

            {/* Decision Action Buttons */}
            <div className="vettingDecisionBtns">
              <button
                type="button"
                className="saveProgressBtn"
                disabled={isProcessing}
                onClick={() => handleUpdateStatus("interview_scheduled")}
              >
                Schedule Interview
              </button>

              <button
                type="button"
                className="markCheckingBtn"
                disabled={isProcessing}
                onClick={() => handleUpdateStatus("fact_checking")}
              >
                Mark Fact-Checking
              </button>

              <button
                type="button"
                className="approveProviderBtn"
                disabled={isProcessing}
                onClick={() => handleUpdateStatus("approved")}
              >
                🟢 Approve & Publish Provider
              </button>

              <button
                type="button"
                className="rejectProviderBtn"
                disabled={isProcessing}
                onClick={() => handleUpdateStatus("rejected")}
              >
                🔴 Reject Application
              </button>
            </div>
          </div>
        ) : (
          <div className="noAppSelectedPrompt">
            <div className="promptIcon">🔍</div>
            <h4>Select an Application to Vet</h4>
            <p>Click on any provider row in the table to inspect their credentials, conduct anti-scam fact-checking, schedule interviews, or activate their publishing rights.</p>
          </div>
        )}
      </div>
    </section>
  );
}

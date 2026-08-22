"use client";

import { useState, useMemo } from "react";

interface AdminMembershipData {
  stats: {
    activeTourists: number;
    activeProviders: number;
    totalRedemptions: number;
    totalMemberSavings: number;
    totalAssociatedSpend: number;
    pendingOffers: number;
    pendingCards: number;
  };
  touristSubs: Array<Record<string, unknown>>;
  providerSubs: Array<Record<string, unknown>>;
  offersQueue: Array<Record<string, unknown>>;
  cardQueue: Array<Record<string, unknown>>;
  redemptions: Array<Record<string, unknown>>;
}

interface AdminMembershipConsoleProps {
  data: AdminMembershipData | null;
  onRefresh: () => void;
}

export default function AdminMembershipConsole({ data, onRefresh }: AdminMembershipConsoleProps) {
  const [activeSection, setActiveSection] = useState<"overview" | "tourists" | "providers" | "offers" | "cards" | "redemptions">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionStatus, setActionStatus] = useState("");
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [trackingNumberInput, setTrackingNumberInput] = useState("");

  const handleModerateOffer = async (offerId: number, status: "approved" | "rejected" | "suspended") => {
    setActionStatus("Updating offer status…");
    try {
      const r = await fetch("/api/admin/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "moderate_offer", offerId, status })
      });
      if (r.ok) {
        setActionStatus(`Offer #${offerId} ${status} successfully.`);
        onRefresh();
      } else {
        setActionStatus("Action failed.");
      }
    } catch {
      setActionStatus("Network error.");
    }
  };

  const handleUpdateCard = async (cardId: number, status: "approved" | "printing" | "dispatched" | "delivered" | "cancelled") => {
    setActionStatus("Updating card status…");
    try {
      const r = await fetch("/api/admin/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_card_status", cardId, status, trackingNumber: trackingNumberInput })
      });
      if (r.ok) {
        setActionStatus(`Card #${cardId} marked as ${status}.`);
        setSelectedCardId(null);
        setTrackingNumberInput("");
        onRefresh();
      } else {
        setActionStatus("Action failed.");
      }
    } catch {
      setActionStatus("Network error.");
    }
  };

  // Export CSV Helper
  const exportRedemptionsCsv = () => {
    if (!data?.redemptions || !data.redemptions.length) return;
    const headers = ["Receipt Reference", "Date", "Provider", "Member Name", "Member Email", "Original (PGK)", "Discount (PGK)", "Final Paid (PGK)", "Privilege Summary"];
    const rows = data.redemptions.map(r => [
      r.redemptionRef,
      new Date(r.createdAt as string).toISOString(),
      `"${r.providerName}"`,
      `"${r.memberName}"`,
      r.memberEmail,
      r.originalAmount,
      r.discountAmount,
      r.finalAmount,
      `"${r.benefitSummary}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `VisitZambia_Redemptions_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered lists with pagination
  const filteredTourists = useMemo(() => {
    const list = data?.touristSubs || [];
    return list.filter(s => {
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return String(s.fullName || "").toLowerCase().includes(q) || String(s.email || "").toLowerCase().includes(q) || String(s.memberNumber || "").toLowerCase().includes(q);
      }
      return true;
    });
  }, [data?.touristSubs, statusFilter, searchTerm]);

  const pagedTourists = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTourists.slice(start, start + pageSize);
  }, [filteredTourists, currentPage, pageSize]);

  return (
    <section className="adminMembershipConsoleSection">
      {/* Top Banner & KPI Stat Counters */}
      <div className="sectionHeaderRow">
        <div>
          <p className="eyebrow lime">VISIT PNG NATIONAL ECOSYSTEM</p>
          <h2>Membership, Partner Rewards & Benefits Administration</h2>
          <p className="subtext">Configure plans, moderate partner offers, manage physical cards, and audit national redemptions.</p>
        </div>
        <button className="refreshBtn" onClick={onRefresh}>Refresh Data ⟳</button>
      </div>

      {actionStatus && <div className="actionStatusBanner success">{actionStatus}</div>}

      {/* KPI Cards */}
      <div className="adminMembershipKpiGrid">
        <div className="adminKpiCard">
          <small>Active Tourist Members</small>
          <strong>{data?.stats.activeTourists || 0}</strong>
          <span>Across all tiers</span>
        </div>
        <div className="adminKpiCard">
          <small>Partner Providers</small>
          <strong>{data?.stats.activeProviders || 0}</strong>
          <span>Listed to Platinum</span>
        </div>
        <div className="adminKpiCard highlight">
          <small>Total Tourist Savings</small>
          <strong>PGK {data?.stats.totalMemberSavings.toLocaleString() || 0}</strong>
          <span>Verified Redemptions</span>
        </div>
        <div className="adminKpiCard">
          <small>Associated Guest Spend</small>
          <strong>PGK {data?.stats.totalAssociatedSpend.toLocaleString() || 0}</strong>
          <span>Partner Gross Revenue</span>
        </div>
        <div className="adminKpiCard">
          <small>Pending Card Queue</small>
          <strong>{data?.stats.pendingCards || 0}</strong>
          <span>Orders to fulfill</span>
        </div>
        <div className="adminKpiCard">
          <small>Pending Offers Queue</small>
          <strong>{data?.stats.pendingOffers || 0}</strong>
          <span>Awaiting moderation</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="adminConsoleNavTabs">
        <button className={activeSection === "overview" ? "active" : ""} onClick={() => setActiveSection("overview")}>
          📊 Ecosystem Overview
        </button>
        <button className={activeSection === "tourists" ? "active" : ""} onClick={() => { setActiveSection("tourists"); setCurrentPage(1); }}>
          👥 Tourist Memberships ({data?.touristSubs.length || 0})
        </button>
        <button className={activeSection === "providers" ? "active" : ""} onClick={() => setActiveSection("providers")}>
          🏢 Partner Providers ({data?.providerSubs.length || 0})
        </button>
        <button className={activeSection === "offers" ? "active" : ""} onClick={() => setActiveSection("offers")}>
          🎁 Offer Moderation {data?.stats.pendingOffers ? `(${data.stats.pendingOffers} New)` : ""}
        </button>
        <button className={activeSection === "cards" ? "active" : ""} onClick={() => setActiveSection("cards")}>
          📬 Physical Cards Pipeline {data?.stats.pendingCards ? `(${data.stats.pendingCards} Req)` : ""}
        </button>
        <button className={activeSection === "redemptions" ? "active" : ""} onClick={() => setActiveSection("redemptions")}>
          🧾 Redemptions Audit ({data?.redemptions.length || 0})
        </button>
      </div>

      {/* TAB 1: ECOSYSTEM OVERVIEW */}
      {activeSection === "overview" && (
        <div className="adminOverviewGrid">
          <div className="overviewCard">
            <h3>Partner Provider Tier Distribution</h3>
            <p className="cardSubtext">Providers contributing to the national tourism value cycle.</p>
            <div className="tierDistributionList">
              <div className="tierDistRow">
                <span>Platinum Partners (15%+ VIP)</span>
                <strong>{data?.providerSubs.filter(p => String(p.tierName).includes("Platinum")).length || 0}</strong>
              </div>
              <div className="tierDistRow">
                <span>Gold Partners (10-15%)</span>
                <strong>{data?.providerSubs.filter(p => String(p.tierName).includes("Gold")).length || 0}</strong>
              </div>
              <div className="tierDistRow">
                <span>Silver Partners (5-10%)</span>
                <strong>{data?.providerSubs.filter(p => String(p.tierName).includes("Silver")).length || 0}</strong>
              </div>
              <div className="tierDistRow">
                <span>Listed Partners (Verified Base)</span>
                <strong>{data?.providerSubs.filter(p => String(p.tierName).includes("Listed")).length || 0}</strong>
              </div>
            </div>
          </div>

          <div className="overviewCard">
            <h3>Recent High-Value Redemptions</h3>
            <p className="cardSubtext">Real-time spend and savings transactions logged across PNG.</p>
            <div className="recentTransactionsFeed">
              {data?.redemptions.slice(0, 5).map((r, idx) => (
                <div key={idx} className="feedItem">
                  <div>
                    <strong>{r.providerName as string}</strong>
                    <small>{r.benefitSummary as string} · {r.memberName as string}</small>
                  </div>
                  <div className="feedNumbers">
                    <span className="savedPill">Saved PGK {Number(r.discountAmount)}</span>
                    <small>Bill: PGK {Number(r.originalAmount)}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TOURIST MEMBERSHIPS TABLE */}
      {activeSection === "tourists" && (
        <div className="enterpriseTableCard">
          <div className="tableControlsBar">
            <div className="searchBoxWrapper">
              <span>⌕</span>
              <input
                placeholder="Search member by name, email, or VPNG number..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <div className="filterPillsRow">
              {["all", "active", "complimentary", "payment_due", "cancelled"].map(st => (
                <button
                  key={st}
                  className={`filterPill ${statusFilter === st ? "active" : ""}`}
                  onClick={() => { setStatusFilter(st); setCurrentPage(1); }}
                >
                  {st.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="tableMetaRow">
            <span>Showing {pagedTourists.length} of {filteredTourists.length} members</span>
            <div className="pageSizeSelector">
              <label>Rows per page:
                <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>
          </div>

          <div className="tableResponsiveWrapper">
            <table className="enterpriseDataTable">
              <thead>
                <tr>
                  <th>Member Number</th>
                  <th>Full Name / Email</th>
                  <th>Plan Tier</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Expiry Date</th>
                  <th>Physical Card</th>
                </tr>
              </thead>
              <tbody>
                {pagedTourists.map((s, idx) => (
                  <tr key={idx}>
                    <td><code>{s.memberNumber as string}</code></td>
                    <td>
                      <strong>{s.fullName as string}</strong>
                      <small className="appSlug">{s.email as string}</small>
                    </td>
                    <td><span className="catPill">{s.planName as string}</span></td>
                    <td>PGK {Number(s.price || 0)}</td>
                    <td><span className={`statusBadge ${s.status}`}>{s.status as string}</span></td>
                    <td>{s.expiryDate ? new Date(s.expiryDate as string).toLocaleDateString() : "Lifetime"}</td>
                    <td><span className="cardStatusBadge">{s.physicalCardStatus as string || "None"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="paginationControls">
            <button disabled={currentPage <= 1} onClick={() => setCurrentPage(p => p - 1)}>Previous Page</button>
            <span>Page {currentPage} of {Math.ceil(filteredTourists.length / pageSize) || 1}</span>
            <button disabled={currentPage >= Math.ceil(filteredTourists.length / pageSize)} onClick={() => setCurrentPage(p => p + 1)}>Next Page</button>
          </div>
        </div>
      )}

      {/* TAB 3: PARTNER PROVIDERS TABLE */}
      {activeSection === "providers" && (
        <div className="enterpriseTableCard">
          <h3>Verified Tourism Partner Providers</h3>
          <div className="tableResponsiveWrapper">
            <table className="enterpriseDataTable">
              <thead>
                <tr>
                  <th>Provider Trading Name</th>
                  <th>Partner Subscription Tier</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Expiry Date</th>
                  <th>Trust Badge Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.providerSubs.map((p, idx) => (
                  <tr key={idx}>
                    <td><strong>{p.providerName as string}</strong></td>
                    <td><span className="catPill">{p.tierName as string}</span></td>
                    <td><span className="statusBadge approved">{p.status as string}</span></td>
                    <td>{new Date(p.startDate as string).toLocaleDateString()}</td>
                    <td>{p.expiryDate ? new Date(p.expiryDate as string).toLocaleDateString() : "Annual"}</td>
                    <td><span className="trustBadgePill">✓ Verified Partner</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: OFFER MODERATION QUEUE */}
      {activeSection === "offers" && (
        <div className="enterpriseTableCard">
          <h3>Provider Offers Moderation Queue</h3>
          <p className="cardSubtext">Review member discounts and verify pricing authenticity to protect tourists from fake discount inflation.</p>
          <div className="tableResponsiveWrapper">
            <table className="enterpriseDataTable">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Offer Title</th>
                  <th>Benefit Type</th>
                  <th>Normal Price</th>
                  <th>Member Price / Perk</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.offersQueue.map((o, idx) => (
                  <tr key={idx}>
                    <td><strong>{o.providerName as string}</strong></td>
                    <td>
                      <strong>{o.title as string}</strong>
                      <small className="appSlug">Benefit: {o.benefitType as string}</small>
                    </td>
                    <td><span className="catPill">{o.benefitType as string}</span></td>
                    <td>{o.normalPrice ? `PGK ${o.normalPrice}` : "N/A"}</td>
                    <td>
                      <strong className="discountHighlight">
                        {o.discountPct ? `${o.discountPct}% OFF` : o.memberPrice ? `PGK ${o.memberPrice}` : (o.complimentaryItem as string || "Perk")}
                      </strong>
                    </td>
                    <td><span className={`statusBadge ${o.approvalStatus}`}>{o.approvalStatus as string}</span></td>
                    <td>
                      <div className="tableActionsRow">
                        {o.approvalStatus !== "approved" && (
                          <button className="approveBtnMini" onClick={() => handleModerateOffer(Number(o.id), "approved")}>
                            Approve ✓
                          </button>
                        )}
                        {o.approvalStatus !== "rejected" && (
                          <button className="rejectBtnMini" onClick={() => handleModerateOffer(Number(o.id), "rejected")}>
                            Reject ✕
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: PHYSICAL CARDS FULFILLMENT PIPELINE */}
      {activeSection === "cards" && (
        <div className="enterpriseTableCard">
          <h3>Physical Membership Cards Production Queue</h3>
          <p className="cardSubtext">Manage embossed plastic and metal cards fulfillment from printing through postal dispatch.</p>
          <div className="tableResponsiveWrapper">
            <table className="enterpriseDataTable">
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Member Number</th>
                  <th>Card Tier</th>
                  <th>Delivery Address</th>
                  <th>Fulfillment Status</th>
                  <th>Tracking #</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.cardQueue.map((c, idx) => (
                  <tr key={idx}>
                    <td><strong>{c.memberName as string}</strong></td>
                    <td><code>{c.memberNumber as string}</code></td>
                    <td><span className="catPill">{c.cardTier as string}</span></td>
                    <td><small>{c.deliveryAddress as string}</small></td>
                    <td><span className={`statusBadge ${c.productionStatus}`}>{c.productionStatus as string}</span></td>
                    <td><code>{c.trackingNumber as string || "Not dispatched"}</code></td>
                    <td>
                      {selectedCardId === c.id ? (
                        <div className="cardDispatchInlineForm">
                          <input
                            placeholder="e.g. PNGPOST-2026-9912"
                            value={trackingNumberInput}
                            onChange={e => setTrackingNumberInput(e.target.value)}
                          />
                          <button onClick={() => handleUpdateCard(Number(c.id), "dispatched")}>Dispatch 📬</button>
                          <button onClick={() => setSelectedCardId(null)}>Cancel</button>
                        </div>
                      ) : (
                        <div className="tableActionsRow">
                          {c.productionStatus === "requested" && (
                            <button className="approveBtnMini" onClick={() => handleUpdateCard(Number(c.id), "printing")}>
                              Send to Print 🖨️
                            </button>
                          )}
                          {c.productionStatus === "printing" && (
                            <button className="approveBtnMini" onClick={() => setSelectedCardId(Number(c.id))}>
                              Mark Dispatched 📦
                            </button>
                          )}
                          {c.productionStatus === "dispatched" && (
                            <button className="approveBtnMini" onClick={() => handleUpdateCard(Number(c.id), "delivered")}>
                              Mark Delivered ✓
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: REDEMPTIONS AUDIT LEDGER */}
      {activeSection === "redemptions" && (
        <div className="enterpriseTableCard">
          <div className="tableHeaderWithExport">
            <div>
              <h3>National Partner Redemptions Ledger</h3>
              <p className="cardSubtext">Complete auditable record of all tourist benefits and discounts redeemed at participating providers.</p>
            </div>
            <button className="exportCsvBtn" onClick={exportRedemptionsCsv}>
              📥 Export Audit CSV
            </button>
          </div>

          <div className="tableResponsiveWrapper">
            <table className="enterpriseDataTable">
              <thead>
                <tr>
                  <th>Receipt Reference</th>
                  <th>Date & Time</th>
                  <th>Partner Provider</th>
                  <th>Member Name / Email</th>
                  <th>Original Bill</th>
                  <th>Discount Saved</th>
                  <th>Final Amount Paid</th>
                  <th>Benefit Summary</th>
                </tr>
              </thead>
              <tbody>
                {data?.redemptions.map((r, idx) => (
                  <tr key={idx}>
                    <td><code>{r.redemptionRef as string}</code></td>
                    <td>{new Date(r.createdAt as string).toLocaleString()}</td>
                    <td><strong>{r.providerName as string}</strong></td>
                    <td>
                      <strong>{r.memberName as string}</strong>
                      <small className="appSlug">{r.memberEmail as string}</small>
                    </td>
                    <td>PGK {Number(r.originalAmount)}</td>
                    <td className="discountHighlight">-PGK {Number(r.discountAmount)}</td>
                    <td><strong>PGK {Number(r.finalAmount)}</strong></td>
                    <td>{r.benefitSummary as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

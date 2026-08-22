"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { formatPrice, type CurrencyCode } from "../../db/currency";

interface BookingRecord {
  id: number;
  reference: string;
  status: string;
  currency: string;
  subtotal: number;
  total: number;
  startDate: string;
  endDate: string;
  guestCount: number;
  contactName: string;
  contactMobile: string | null;
  createdAt: string;
  updatedAt: string;
  userEmail: string | null;
  listingId: number;
  listingName: string;
  providerName: string;
  quantity: number;
  unitPrice: number;
  paymentStatus: string | null;
  paymentRef: string | null;
}

interface ReviewRecord {
  id: number;
  overallRating: number;
  valueRating: number | null;
  serviceRating: number | null;
  safetyRating: number | null;
  title: string;
  body: string;
  verificationType: string;
  moderationStatus: string;
  moderationReason: string | null;
  providerResponse: string | null;
  createdAt: string;
  authorEmail: string | null;
  authorName: string;
  listingId: number;
  listingName: string;
}

interface DisputeRecord {
  id: number;
  reviewId: number;
  reason: string;
  status: string;
  resolution: string | null;
  createdAt: string;
  raisedByEmail: string | null;
  reviewTitle: string;
}

interface AdminOperationsConsoleProps {
  initialTab?: "bookings" | "reviews" | "disputes";
  currency?: CurrencyCode;
}

export default function AdminOperationsConsole({ initialTab = "bookings", currency = "PGK" }: AdminOperationsConsoleProps) {
  const [activeTab, setActiveTab] = useState<"bookings" | "reviews" | "disputes">(initialTab);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [disputes, setDisputes] = useState<DisputeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  // Filters & Pagination for Bookings
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [bookingPage, setBookingPage] = useState(1);
  const [bookingPageSize, setBookingPageSize] = useState(10);
  const [bookingSortKey, setBookingSortKey] = useState<keyof BookingRecord>("createdAt");
  const [bookingSortDir, setBookingSortDir] = useState<"asc" | "desc">("desc");

  // Filters & Pagination for Reviews
  const [reviewSearch, setReviewSearch] = useState("");
  const [reviewStatusFilter, setReviewStatusFilter] = useState("all");
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewPageSize, setReviewPageSize] = useState(10);

  // Dispute resolution form
  const [resolvingDisputeId, setResolvingDisputeId] = useState<number | null>(null);
  const [resolutionText, setResolutionText] = useState("");

  const toggleBookingSort = (key: keyof BookingRecord) => {
    if (bookingSortKey === key) {
      setBookingSortDir(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setBookingSortKey(key);
      setBookingSortDir("asc");
    }
  };

  const loadData = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/operations")
      .then(async r => {
        const d = await r.json();
        if (r.ok) {
          setBookings(d.bookings || []);
          setReviews(d.reviews || []);
          setDisputes(d.disputes || []);
          setStatusMessage("");
        } else {
          setStatusMessage(d.error || "Failed to load operations data.");
        }
      })
      .catch(() => setStatusMessage("Network error loading operations."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/operations")
      .then(async r => {
        const d = await r.json();
        if (ignore) return;
        if (r.ok) {
          setBookings(d.bookings || []);
          setReviews(d.reviews || []);
          setDisputes(d.disputes || []);
          setStatusMessage("");
        } else {
          setStatusMessage(d.error || "Failed to load operations data.");
        }
      })
      .catch(() => {
        if (!ignore) setStatusMessage("Network error loading operations.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const updateBookingStatus = async (bookingId: number, status: string) => {
    setStatusMessage(`Updating booking #${bookingId} to ${status}…`);
    try {
      const res = await fetch("/api/admin/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_booking_status", bookingId, status })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Booking #${bookingId} updated to ${status}.`);
        loadData();
      } else {
        setStatusMessage(data.error || "Update failed.");
      }
    } catch {
      setStatusMessage("Network error updating booking.");
    }
  };

  const updateReviewStatus = async (reviewId: number, moderationStatus: string) => {
    setStatusMessage(`Updating review #${reviewId} to ${moderationStatus}…`);
    try {
      const res = await fetch("/api/admin/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_review_status", reviewId, moderationStatus })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Review #${reviewId} set to ${moderationStatus}.`);
        loadData();
      } else {
        setStatusMessage(data.error || "Update failed.");
      }
    } catch {
      setStatusMessage("Network error updating review.");
    }
  };

  const deleteReview = async (reviewId: number) => {
    if (!window.confirm(`Are you sure you want to permanently delete review #${reviewId}?`)) return;
    setStatusMessage(`Deleting review #${reviewId}…`);
    try {
      const res = await fetch("/api/admin/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_review", reviewId })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Review #${reviewId} deleted.`);
        loadData();
      } else {
        setStatusMessage(data.error || "Delete failed.");
      }
    } catch {
      setStatusMessage("Network error deleting review.");
    }
  };

  const resolveDispute = async (disputeId: number) => {
    if (!resolutionText.trim()) {
      setStatusMessage("Please enter resolution notes.");
      return;
    }
    setStatusMessage(`Resolving dispute #${disputeId}…`);
    try {
      const res = await fetch("/api/admin/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resolve_dispute", disputeId, resolution: resolutionText, status: "resolved" })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Dispute #${disputeId} resolved.`);
        setResolvingDisputeId(null);
        setResolutionText("");
        loadData();
      } else {
        setStatusMessage(data.error || "Resolution failed.");
      }
    } catch {
      setStatusMessage("Network error resolving dispute.");
    }
  };

  // Filtered & Sorted Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const q = bookingSearch.toLowerCase();
      const matchQ = !q || b.reference.toLowerCase().includes(q) || b.contactName.toLowerCase().includes(q) || b.listingName.toLowerCase().includes(q) || (b.userEmail && b.userEmail.toLowerCase().includes(q));
      const matchStatus = bookingStatusFilter === "all" || b.status === bookingStatusFilter;
      return matchQ && matchStatus;
    }).sort((a, b) => {
      const vA = a[bookingSortKey];
      const vB = b[bookingSortKey];
      if (vA === vB) return 0;
      if (vA === null || vA === undefined) return 1;
      if (vB === null || vB === undefined) return -1;
      if (bookingSortDir === "asc") {
        return vA > vB ? 1 : -1;
      }
      return vA < vB ? 1 : -1;
    });
  }, [bookings, bookingSearch, bookingStatusFilter, bookingSortKey, bookingSortDir]);

  const paginatedBookings = useMemo(() => {
    const start = (bookingPage - 1) * bookingPageSize;
    return filteredBookings.slice(start, start + bookingPageSize);
  }, [filteredBookings, bookingPage, bookingPageSize]);

  // Filtered Reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      const q = reviewSearch.toLowerCase();
      const matchQ = !q || r.title.toLowerCase().includes(q) || r.authorName.toLowerCase().includes(q) || r.listingName.toLowerCase().includes(q) || (r.authorEmail && r.authorEmail.toLowerCase().includes(q));
      const matchStatus = reviewStatusFilter === "all" || r.moderationStatus === reviewStatusFilter;
      return matchQ && matchStatus;
    });
  }, [reviews, reviewSearch, reviewStatusFilter]);

  const paginatedReviews = useMemo(() => {
    const start = (reviewPage - 1) * reviewPageSize;
    return filteredReviews.slice(start, start + reviewPageSize);
  }, [filteredReviews, reviewPage, reviewPageSize]);

  // KPIs
  const totalRevenue = bookings.reduce((sum, b) => (b.status === "confirmed" ? sum + b.total : sum), 0);
  const activeBookingsCount = bookings.filter(b => b.status === "confirmed" || b.status === "held").length;
  const pendingReviewsCount = reviews.filter(r => r.moderationStatus === "pending").length;
  const openDisputesCount = disputes.filter(d => d.status === "open").length;

  return (
    <div className="adminOperationsSection">
      {/* KPI Cards */}
      <div className="operationsKpiGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "20px" }}>
        <div className="opKpiCard" style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "14px", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <small style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>CONFIRMED REVENUE</small>
          <strong style={{ fontSize: "24px", color: "var(--brand-deep-teal)" }}>{formatPrice(totalRevenue, currency)}</strong>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Across all Zambian listings</span>
        </div>
        <div className="opKpiCard" style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "14px", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <small style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>ACTIVE BOOKINGS</small>
          <strong style={{ fontSize: "24px", color: "var(--brand-deep-teal)" }}>{activeBookingsCount}</strong>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Held & confirmed stays</span>
        </div>
        <div className="opKpiCard" style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "14px", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <small style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>PENDING REVIEWS</small>
          <strong style={{ fontSize: "24px", color: "var(--brand-deep-teal)" }}>{pendingReviewsCount}</strong>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Awaiting moderation</span>
        </div>
        <div className="opKpiCard" style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "14px", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <small style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>OPEN DISPUTES</small>
          <strong style={{ fontSize: "24px", color: "var(--brand-deep-teal)" }}>{openDisputesCount}</strong>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Provider / tourist resolutions</span>
        </div>
      </div>

      {statusMessage && <div className="adminStatus" style={{ margin: "14px 0" }}>{statusMessage}</div>}

      {/* Nav Tabs */}
      <div className="adminSubNavTabs" style={{ margin: "16px 0", display: "flex", gap: "8px" }}>
        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
          style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid var(--border-default)", background: activeTab === "bookings" ? "var(--brand-deep-teal)" : "var(--surface-card)", color: activeTab === "bookings" ? "var(--text-on-dark)" : "var(--text-primary)", fontWeight: 700, cursor: "pointer" }}
        >
          📅 Bookings & Reservations ({bookings.length})
        </button>
        <button
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
          style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid var(--border-default)", background: activeTab === "reviews" ? "var(--brand-deep-teal)" : "var(--surface-card)", color: activeTab === "reviews" ? "var(--text-on-dark)" : "var(--text-primary)", fontWeight: 700, cursor: "pointer" }}
        >
          ⭐ Reviews & Moderation ({reviews.length})
        </button>
        <button
          className={activeTab === "disputes" ? "active" : ""}
          onClick={() => setActiveTab("disputes")}
          style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid var(--border-default)", background: activeTab === "disputes" ? "var(--brand-deep-teal)" : "var(--surface-card)", color: activeTab === "disputes" ? "var(--text-on-dark)" : "var(--text-primary)", fontWeight: 700, cursor: "pointer" }}
        >
          ⚖️ Reputation Disputes ({disputes.length})
        </button>
      </div>

      {/* TAB 1: BOOKINGS ENTERPRISE TABLE */}
      {activeTab === "bookings" && (
        <div className="adminTableCard">
          <div className="tableToolbar">
            <div className="searchBox">
              <input
                type="text"
                placeholder="Search reference, guest, place, or email…"
                value={bookingSearch}
                onChange={e => { setBookingSearch(e.target.value); setBookingPage(1); }}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border-default)", minWidth: "260px" }}
              />
            </div>
            <div className="filterControls" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <select
                value={bookingStatusFilter}
                onChange={e => { setBookingStatusFilter(e.target.value); setBookingPage(1); }}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border-default)" }}
              >
                <option value="all">All Statuses ({bookings.length})</option>
                <option value="confirmed">Confirmed</option>
                <option value="held">Held (15m)</option>
                <option value="cancelled">Cancelled</option>
                <option value="expired">Expired</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={bookingPageSize}
                onChange={e => { setBookingPageSize(Number(e.target.value)); setBookingPage(1); }}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border-default)" }}
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p style={{ padding: "20px", textAlign: "center" }}>Loading reservations…</p>
          ) : paginatedBookings.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <h3>No bookings found</h3>
              <p style={{ color: "var(--text-secondary)" }}>Try changing the search filter or status selection.</p>
            </div>
          ) : (
            <div className="tableWrapper" style={{ overflowX: "auto" }}>
              <table className="enterpriseDataTable" style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px", fontSize: "12px" }}>
                <thead>
                  <tr style={{ background: "var(--surface-subtle)", textAlign: "left", borderBottom: "2px solid var(--border-default)" }}>
                    <th style={{ padding: "10px", cursor: "pointer" }} onClick={() => toggleBookingSort("reference")}>
                      Reference {bookingSortKey === "reference" ? (bookingSortDir === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th style={{ padding: "10px", cursor: "pointer" }} onClick={() => toggleBookingSort("listingName")}>
                      Facility / Place {bookingSortKey === "listingName" ? (bookingSortDir === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th style={{ padding: "10px", cursor: "pointer" }} onClick={() => toggleBookingSort("contactName")}>
                      Guest & Contact {bookingSortKey === "contactName" ? (bookingSortDir === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th style={{ padding: "10px", cursor: "pointer" }} onClick={() => toggleBookingSort("startDate")}>
                      Stay Dates {bookingSortKey === "startDate" ? (bookingSortDir === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th style={{ padding: "10px", cursor: "pointer" }} onClick={() => toggleBookingSort("total")}>
                      Total {bookingSortKey === "total" ? (bookingSortDir === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th style={{ padding: "10px", cursor: "pointer" }} onClick={() => toggleBookingSort("status")}>
                      Status {bookingSortKey === "status" ? (bookingSortDir === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th style={{ padding: "10px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBookings.map(b => (
                    <tr key={b.id} style={{ borderBottom: "1px solid var(--border-default)" }}>
                      <td style={{ padding: "10px" }}>
                        <strong style={{ color: "var(--brand-deep-teal)" }}>{b.reference}</strong>
                        <small style={{ display: "block", color: "var(--text-secondary)" }}>{new Date(b.createdAt).toLocaleDateString()}</small>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <strong>{b.listingName}</strong>
                        <small style={{ display: "block", color: "var(--text-secondary)" }}>Provider: {b.providerName}</small>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <div>{b.contactName} ({b.guestCount} {b.guestCount === 1 ? "guest" : "guests"})</div>
                        <small style={{ color: "var(--text-secondary)" }}>{b.userEmail || b.contactMobile || "Direct booking"}</small>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <span>{b.startDate} → {b.endDate}</span>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <strong style={{ color: "var(--brand-deep-teal)" }}>{formatPrice(b.total, currency)}</strong>
                        <small style={{ display: "block", color: "var(--text-secondary)" }}>Payment: {b.paymentStatus || "unpaid"}</small>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <span className={`adminBadge ${b.status === "confirmed" ? "published" : b.status === "cancelled" ? "hidden" : ""}`} style={{ textTransform: "uppercase" }}>
                          {b.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <select
                          value={b.status}
                          onChange={e => updateBookingStatus(b.id, e.target.value)}
                          style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", border: "1px solid var(--border-default)" }}
                        >
                          <option value="held">Held</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", padding: "8px 0" }}>
            <small style={{ color: "var(--text-secondary)" }}>
              Showing {filteredBookings.length ? (bookingPage - 1) * bookingPageSize + 1 : 0} to {Math.min(bookingPage * bookingPageSize, filteredBookings.length)} of {filteredBookings.length} records
            </small>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                disabled={bookingPage <= 1}
                onClick={() => setBookingPage(p => p - 1)}
                style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid var(--border-default)", background: "var(--surface-card)", cursor: "pointer" }}
              >
                Previous
              </button>
              <button
                disabled={bookingPage * bookingPageSize >= filteredBookings.length}
                onClick={() => setBookingPage(p => p + 1)}
                style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid var(--border-default)", background: "var(--surface-card)", cursor: "pointer" }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REVIEWS & MODERATION TABLE */}
      {activeTab === "reviews" && (
        <div className="adminTableCard">
          <div className="tableToolbar">
            <div className="searchBox">
              <input
                type="text"
                placeholder="Search review title, author, or place…"
                value={reviewSearch}
                onChange={e => { setReviewSearch(e.target.value); setReviewPage(1); }}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border-default)", minWidth: "260px" }}
              />
            </div>
            <div className="filterControls" style={{ display: "flex", gap: "8px" }}>
              <select
                value={reviewStatusFilter}
                onChange={e => { setReviewStatusFilter(e.target.value); setReviewPage(1); }}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border-default)" }}
              >
                <option value="all">All Moderation ({reviews.length})</option>
                <option value="published">Published</option>
                <option value="pending">Pending Review</option>
                <option value="rejected">Rejected / Hidden</option>
              </select>
              <select
                value={reviewPageSize}
                onChange={e => { setReviewPageSize(Number(e.target.value)); setReviewPage(1); }}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border-default)" }}
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p style={{ padding: "20px", textAlign: "center" }}>Loading reviews…</p>
          ) : paginatedReviews.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <h3>No reviews found</h3>
              <p style={{ color: "var(--text-secondary)" }}>No reviews match your current filters.</p>
            </div>
          ) : (
            <div className="tableWrapper" style={{ overflowX: "auto" }}>
              <table className="enterpriseDataTable" style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px", fontSize: "12px" }}>
                <thead>
                  <tr style={{ background: "var(--surface-subtle)", textAlign: "left", borderBottom: "2px solid var(--border-default)" }}>
                    <th style={{ padding: "10px" }}>Rating & Title</th>
                    <th style={{ padding: "10px" }}>Facility / Place</th>
                    <th style={{ padding: "10px" }}>Author</th>
                    <th style={{ padding: "10px" }}>Review Content</th>
                    <th style={{ padding: "10px" }}>Status</th>
                    <th style={{ padding: "10px" }}>Moderation Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReviews.map(r => (
                    <tr key={r.id} style={{ borderBottom: "1px solid var(--border-default)" }}>
                      <td style={{ padding: "10px", verticalAlign: "top" }}>
                        <div style={{ color: "var(--premium-accent)", fontWeight: 800 }}>{"★".repeat(r.overallRating)}{"☆".repeat(5 - r.overallRating)}</div>
                        <strong>{r.title}</strong>
                        <small style={{ display: "block", color: "var(--text-secondary)" }}>{r.verificationType === "verified_booking" ? "🛡️ Verified Stay" : "Unverified"}</small>
                      </td>
                      <td style={{ padding: "10px", verticalAlign: "top" }}>
                        <strong>{r.listingName}</strong>
                      </td>
                      <td style={{ padding: "10px", verticalAlign: "top" }}>
                        <div>{r.authorName}</div>
                        <small style={{ color: "var(--text-secondary)" }}>{r.authorEmail}</small>
                      </td>
                      <td style={{ padding: "10px", verticalAlign: "top", maxWidth: "320px" }}>
                        <p style={{ margin: "0 0 6px", lineHeight: "1.4" }}>{r.body}</p>
                        {r.moderationReason && <small style={{ color: "var(--status-warning)" }}>Flag: {r.moderationReason}</small>}
                      </td>
                      <td style={{ padding: "10px", verticalAlign: "top" }}>
                        <span className={`adminBadge ${r.moderationStatus === "published" ? "published" : r.moderationStatus === "rejected" ? "hidden" : ""}`}>
                          {r.moderationStatus}
                        </span>
                      </td>
                      <td style={{ padding: "10px", verticalAlign: "top" }}>
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          {r.moderationStatus !== "published" && (
                            <button
                              onClick={() => updateReviewStatus(r.id, "published")}
                              style={{ padding: "4px 8px", borderRadius: "6px", background: "var(--status-success)", color: "var(--text-on-dark)", border: 0, fontSize: "10px", fontWeight: 700, cursor: "pointer" }}
                            >
                              Approve
                            </button>
                          )}
                          {r.moderationStatus !== "rejected" && (
                            <button
                              onClick={() => updateReviewStatus(r.id, "rejected")}
                              style={{ padding: "4px 8px", borderRadius: "6px", background: "var(--status-warning)", color: "var(--brand-charcoal)", border: 0, fontSize: "10px", fontWeight: 700, cursor: "pointer" }}
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => deleteReview(r.id)}
                            style={{ padding: "4px 8px", borderRadius: "6px", background: "var(--status-danger-soft)", color: "var(--status-danger)", border: "1px solid var(--border-default)", fontSize: "10px", fontWeight: 700, cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DISPUTES RESOLVER */}
      {activeTab === "disputes" && (
        <div className="adminTableCard">
          <div style={{ padding: "12px", background: "var(--surface-subtle)", borderRadius: "10px", marginBottom: "16px" }}>
            <strong>PNG Tourism Reputation & Dispute Resolution Center</strong>
            <p style={{ margin: "4px 0 0", fontSize: "11px", color: "var(--text-secondary)" }}>
              Providers or tourists can dispute factual claims. Admin reviews evidence, interviews parties, and writes binding resolution notes.
            </p>
          </div>

          {disputes.length === 0 ? (
            <p style={{ textAlign: "center", padding: "30px", color: "var(--text-secondary)" }}>No open disputes at this time.</p>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {disputes.map(d => (
                <div key={d.id} style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--border-default)", background: "var(--surface-card)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span className={`adminBadge ${d.status === "resolved" ? "published" : ""}`}>{d.status}</span>
                      <h4 style={{ margin: "6px 0 2px" }}>Dispute on: “{d.reviewTitle}”</h4>
                      <small style={{ color: "var(--text-secondary)" }}>Raised by: {d.raisedByEmail} on {new Date(d.createdAt).toLocaleDateString()}</small>
                    </div>
                    {d.status !== "resolved" && (
                      <button
                        onClick={() => { setResolvingDisputeId(d.id); setResolutionText(d.resolution || ""); }}
                        style={{ padding: "6px 12px", borderRadius: "8px", background: "var(--brand-deep-teal)", color: "var(--text-on-dark)", border: 0, fontWeight: 700, fontSize: "11px", cursor: "pointer" }}
                      >
                        Resolve Dispute
                      </button>
                    )}
                  </div>
                  <p style={{ margin: "8px 0", fontSize: "12px", background: "var(--surface-subtle)", padding: "10px", borderRadius: "8px" }}>
                    <strong>Reason for Dispute:</strong> {d.reason}
                  </p>
                  {d.resolution && (
                    <div style={{ padding: "8px 12px", borderRadius: "8px", background: "var(--status-success-soft)", color: "var(--status-success)", fontSize: "11px" }}>
                      <strong>Administrative Resolution:</strong> {d.resolution}
                    </div>
                  )}

                  {resolvingDisputeId === d.id && (
                    <div style={{ marginTop: "12px", padding: "12px", borderRadius: "10px", border: "1px dashed var(--brand-deep-teal)", background: "var(--surface-page)" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>Enter Official Resolution Notes:</label>
                      <textarea
                        rows={3}
                        value={resolutionText}
                        onChange={e => setResolutionText(e.target.value)}
                        placeholder="e.g. Investigation completed with service provider. Verified refund was processed..."
                        style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid var(--border-default)", fontSize: "12px", marginBottom: "8px" }}
                      />
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => resolveDispute(d.id)}
                          style={{ padding: "8px 14px", borderRadius: "8px", background: "var(--status-success)", color: "var(--text-on-dark)", border: 0, fontWeight: 800, fontSize: "11px", cursor: "pointer" }}
                        >
                          Submit & Close Dispute
                        </button>
                        <button
                          onClick={() => setResolvingDisputeId(null)}
                          style={{ padding: "8px 14px", borderRadius: "8px", background: "var(--surface-card)", border: "1px solid var(--border-default)", fontSize: "11px", cursor: "pointer" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

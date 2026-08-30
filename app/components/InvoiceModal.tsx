"use client";
import React from "react";
import type { InvoiceRecord } from "../../db/invoices";

export interface InvoiceModalProps {
  invoice: InvoiceRecord;
  brandName?: string;
  onClose: () => void;
}

export function InvoiceModal({
  invoice,
  brandName = "VisitPNG",
  onClose
}: InvoiceModalProps) {
  const currencySymbol = invoice.currency === "PGK" ? "K " : invoice.currency === "USD" ? "$ " : "K ";
  const effectiveTaxRate = invoice.subtotal > 0 ? Math.round((invoice.taxAmount / invoice.subtotal) * 100) : 10;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "1rem"
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        maxWidth: "600px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        padding: "2.5rem",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
        fontFamily: "Ubuntu, sans-serif",
        color: "#1a2e2b"
      }}>
        {/* Invoice Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "2px solid #e0eeea",
          paddingBottom: "1.5rem",
          marginBottom: "1.5rem"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "1.4rem" }}>🇵🇬</span>
              <strong style={{ fontSize: "1.2rem", color: "#EA580C" }}>{invoice.organizationName || "VisitPNG Tourism Services Ltd"}</strong>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>
              Operating {brandName} Platform · Port Moresby, Papua New Guinea
            </div>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>
              Email: info@visitpng.com · Support: +675 321 4188
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span style={{
              display: "inline-block",
              background: "#dcfce7",
              color: "#15803d",
              padding: "0.3rem 0.8rem",
              borderRadius: "12px",
              fontWeight: "800",
              fontSize: "0.8rem",
              letterSpacing: "0.05em"
            }}>
              PAID RECEIPT
            </span>
            <div style={{ fontSize: "0.85rem", fontWeight: "700", marginTop: "0.5rem" }}>
              {invoice.invoiceNumber}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#888" }}>
              {invoice.issuedAt ? new Date(invoice.issuedAt).toLocaleDateString() : new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div style={{ marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          <strong style={{ color: "#032F2B" }}>Billed To:</strong>
          <div>{invoice.customerName}</div>
          <div style={{ color: "#666" }}>{invoice.customerEmail}</div>
          {invoice.billingAddress && <div style={{ color: "#666" }}>{invoice.billingAddress}</div>}
        </div>

        {/* Items Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ background: "#f0f7f5", textAlign: "left" }}>
              <th style={{ padding: "0.6rem 0.8rem", borderBottom: "1px solid #d4e8e3" }}>Description</th>
              <th style={{ padding: "0.6rem 0.8rem", borderBottom: "1px solid #d4e8e3", textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.75rem 0.8rem", borderBottom: "1px solid #f0f0f0" }}>
                {invoice.itemDescription}
              </td>
              <td style={{ padding: "0.75rem 0.8rem", borderBottom: "1px solid #f0f0f0", textAlign: "right", fontWeight: "600" }}>
                {currencySymbol}{invoice.subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0.8rem", color: "#666" }}>
                GST ({effectiveTaxRate}%)
              </td>
              <td style={{ padding: "0.5rem 0.8rem", textAlign: "right", color: "#666" }}>
                {currencySymbol}{invoice.taxAmount.toFixed(2)}
              </td>
            </tr>
            <tr style={{ fontWeight: "800", fontSize: "1.05rem", borderTop: "2px solid #032F2B" }}>
              <td style={{ padding: "0.75rem 0.8rem", color: "#032F2B" }}>Total Paid ({invoice.currency})</td>
              <td style={{ padding: "0.75rem 0.8rem", textAlign: "right", color: "#EA580C" }}>
                {currencySymbol}{invoice.totalAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Payment Meta */}
        <div style={{
          background: "#f9fcfb",
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          fontSize: "0.8rem",
          color: "#555",
          marginBottom: "1.5rem",
          border: "1px solid #e0eeea"
        }}>
          <div><strong>Transaction ID:</strong> {invoice.transactionRef}</div>
          <div><strong>Payment Method:</strong> {invoice.paymentMethod.replace(/_/g, " ").toUpperCase()}</div>
        </div>

        {/* Legal Footer Note */}
        <div style={{ fontSize: "0.75rem", color: "#888", textAlign: "center", lineHeight: "1.4", marginBottom: "1.5rem" }}>
          Thank you for choosing {brandName}. This official commercial receipt is issued by VisitPNG Tourism Services Ltd.
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
          <button
            onClick={() => window.print()}
            style={{
              background: "#e8f3f1",
              color: "#032F2B",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            🖨️ Print Receipt
          </button>
          <button
            onClick={onClose}
            style={{
              background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
              color: "#ffffff",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

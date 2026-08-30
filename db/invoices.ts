import { env } from "./runtime";

export interface InvoiceRecord {
  id: number;
  invoiceNumber: string;
  transactionRef: string;
  userId: number;
  customerName: string;
  customerEmail: string;
  organizationName: string;
  itemDescription: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "refunded";
  billingAddress: string | null;
  taxId: string | null;
  issuedAt: string;
  pdfUrl: string | null;
}

const invoiceSchema = `
  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number TEXT NOT NULL UNIQUE,
    transaction_ref TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    organization_name TEXT NOT NULL DEFAULT 'VisitPNG Tourism Services Ltd',
    item_description TEXT NOT NULL,
    subtotal REAL NOT NULL,
    tax_amount REAL NOT NULL,
    total_amount REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'PGK',
    payment_method TEXT NOT NULL DEFAULT 'credit_card',
    payment_status TEXT NOT NULL DEFAULT 'paid',
    billing_address TEXT,
    tax_id TEXT,
    issued_at TEXT NOT NULL,
    pdf_url TEXT
  );
`;

let invoiceInitPromise: Promise<void> | null = null;

export async function ensureInvoices() {
  if (invoiceInitPromise) return invoiceInitPromise;
  invoiceInitPromise = (async () => {
    await env.DB.prepare(invoiceSchema).run();
  })();
  return invoiceInitPromise;
}

export async function createCommercialInvoice(params: {
  userId: number;
  customerName: string;
  customerEmail: string;
  itemDescription: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency?: string;
  paymentMethod: string;
  billingAddress?: string;
  taxId?: string;
}): Promise<InvoiceRecord> {
  await ensureInvoices();

  const randomSeq = Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const invoiceNumber = `VP-INV-${dateStr}-${randomSeq}`;
  const transactionRef = `VP-TXN-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`;
  const issuedAt = new Date().toISOString();
  const currency = params.currency || "PGK";

  await env.DB.prepare(`
    INSERT INTO invoices (
      invoice_number, transaction_ref, user_id, customer_name, customer_email, organization_name,
      item_description, subtotal, tax_amount, total_amount, currency, payment_method,
      payment_status, billing_address, tax_id, issued_at
    ) VALUES (
      ?, ?, ?, ?, ?, 'VisitPNG Tourism Services Ltd',
      ?, ?, ?, ?, ?, ?,
      'paid', ?, ?, ?
    )
  `).bind(
    invoiceNumber,
    transactionRef,
    params.userId,
    params.customerName,
    params.customerEmail,
    params.itemDescription,
    params.subtotal,
    params.taxAmount,
    params.totalAmount,
    currency,
    params.paymentMethod,
    params.billingAddress || null,
    params.taxId || null,
    issuedAt
  ).run();

  const record = await env.DB.prepare("SELECT * FROM invoices WHERE invoice_number=?").bind(invoiceNumber).first<any>();
  return {
    id: record.id,
    invoiceNumber: record.invoice_number,
    transactionRef: record.transaction_ref,
    userId: record.user_id,
    customerName: record.customer_name,
    customerEmail: record.customer_email,
    organizationName: record.organization_name,
    itemDescription: record.item_description,
    subtotal: record.subtotal,
    taxAmount: record.tax_amount,
    totalAmount: record.total_amount,
    currency: record.currency,
    paymentMethod: record.payment_method,
    paymentStatus: record.payment_status,
    billingAddress: record.billing_address,
    taxId: record.tax_id,
    issuedAt: record.issued_at,
    pdfUrl: record.pdf_url
  };
}

export async function getUserInvoices(userId: number): Promise<InvoiceRecord[]> {
  await ensureInvoices();
  const rows = await env.DB.prepare("SELECT * FROM invoices WHERE user_id=? ORDER BY id DESC").bind(userId).all<any>();
  return rows.results.map((record: any) => ({
    id: record.id,
    invoiceNumber: record.invoice_number,
    transactionRef: record.transaction_ref,
    userId: record.user_id,
    customerName: record.customer_name,
    customerEmail: record.customer_email,
    organizationName: record.organization_name,
    itemDescription: record.item_description,
    subtotal: record.subtotal,
    taxAmount: record.tax_amount,
    totalAmount: record.total_amount,
    currency: record.currency,
    paymentMethod: record.payment_method,
    paymentStatus: record.payment_status,
    billingAddress: record.billing_address,
    taxId: record.tax_id,
    issuedAt: record.issued_at,
    pdfUrl: record.pdf_url
  }));
}

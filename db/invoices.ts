import { env } from "./runtime";

export interface InvoiceRecord {
  id: number;
  invoiceNumber: string;
  transactionNumber: string;
  countryCode: string;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  itemDescription: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: string;
  status: "paid" | "pending" | "refunded";
  legalEntity: string;
  createdAt: string;
}

const invoiceSchema = [
  `CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number TEXT NOT NULL UNIQUE,
    transaction_number TEXT NOT NULL UNIQUE,
    country_code TEXT NOT NULL DEFAULT 'ZMB',
    currency TEXT NOT NULL DEFAULT 'ZMW',
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    item_description TEXT NOT NULL,
    subtotal REAL NOT NULL,
    tax_rate REAL NOT NULL,
    tax_amount REAL NOT NULL,
    total_amount REAL NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'card',
    status TEXT NOT NULL DEFAULT 'paid',
    legal_entity TEXT NOT NULL DEFAULT 'Lamton Investments Ltd',
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS invoices_num_idx ON invoices(invoice_number)`,
  `CREATE INDEX IF NOT EXISTS invoices_email_idx ON invoices(customer_email)`
];

let invoicesInitPromise: Promise<void> | null = null;

export async function ensureInvoices() {
  if (invoicesInitPromise) return invoicesInitPromise;
  invoicesInitPromise = (async () => {
    const d1 = env.DB;
    await d1.batch(invoiceSchema.map(sql => d1.prepare(sql)));
  })();
  return invoicesInitPromise;
}

export async function createInvoice(input: {
  countryCode?: string;
  currency?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  itemDescription: string;
  subtotal: number;
  taxRate?: number;
  paymentMethod?: string;
}): Promise<InvoiceRecord> {
  await ensureInvoices();

  const countryCode = (input.countryCode || "ZMB").toUpperCase();
  const currency = input.currency || (countryCode === "ZMB" ? "ZMW" : "PGK");
  const taxRate = input.taxRate ?? (countryCode === "ZMB" ? 0.16 : 0.10);
  const taxAmount = Math.round(input.subtotal * taxRate * 100) / 100;
  const totalAmount = Math.round((input.subtotal + taxAmount) * 100) / 100;
  const now = new Date().toISOString();

  const randSuffix = Math.floor(10000 + Math.random() * 90000);
  const invoiceNumber = `ZV-INV-${new Date().getFullYear()}-${randSuffix}`;
  const transactionNumber = `ZV-TXN-${new Date().getFullYear()}-${randSuffix}`;

  await env.DB.prepare(`
    INSERT INTO invoices (
      invoice_number, transaction_number, country_code, currency, customer_name,
      customer_email, customer_phone, item_description, subtotal, tax_rate, tax_amount,
      total_amount, payment_method, status, legal_entity, created_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'paid','Lamton Investments Ltd',?)
  `).bind(
    invoiceNumber,
    transactionNumber,
    countryCode,
    currency,
    input.customerName,
    input.customerEmail,
    input.customerPhone || null,
    input.itemDescription,
    input.subtotal,
    taxRate,
    taxAmount,
    totalAmount,
    input.paymentMethod || "Mobile Money / Card",
    now
  ).run();

  const created = await env.DB.prepare(
    "SELECT * FROM invoices WHERE invoice_number = ? LIMIT 1"
  ).bind(invoiceNumber).first<InvoiceRecord>();

  if (!created) throw new Error("Invoice could not be generated");
  return created;
}

export async function getInvoicesByEmail(email: string): Promise<InvoiceRecord[]> {
  await ensureInvoices();
  const rows = await env.DB.prepare(
    "SELECT * FROM invoices WHERE customer_email = ? ORDER BY created_at DESC"
  ).bind(email).all();
  return rows.results as unknown as InvoiceRecord[];
}

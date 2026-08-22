import { env } from "./runtime";

export interface Organization {
  id: number;
  legalName: string;
  tradingName: string | null;
  registrationNumber: string | null;
  taxNumber: string | null;
  country: string;
  registeredAddress: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: number;
  organizationId: number;
  code: string;
  name: string;
  tagline: string;
  shortDescription: string;
  countryCode: string;
  primaryDomain: string;
  supportEmail: string;
  supportPhone: string;
  passName: string;
  partnerProgramName: string;
  verifiedBadgeName: string;
  dealsName: string;
  experiencesName: string;
  legalNotice: string;
  invoiceHeader: string;
  createdAt: string;
  updatedAt: string;
}

export interface FoundingPartnerCampaign {
  id: number;
  countryCode: string;
  name: string;
  totalSlots: number;
  allocatedSlots: number;
  promotionalPrice: number;
  regularPrice: number;
  currency: string;
  badgeLabel: string;
  priorityMonths: number;
  isActive: boolean;
  deadlineDate: string;
}

const brandSchema = [
  `CREATE TABLE IF NOT EXISTS organizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    legal_name TEXT NOT NULL UNIQUE,
    trading_name TEXT,
    registration_number TEXT,
    tax_number TEXT,
    country TEXT NOT NULL DEFAULT 'Zambia',
    registered_address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER NOT NULL REFERENCES organizations(id),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    short_description TEXT,
    country_code TEXT NOT NULL,
    primary_domain TEXT NOT NULL,
    support_email TEXT NOT NULL,
    support_phone TEXT,
    pass_name TEXT NOT NULL,
    partner_program_name TEXT NOT NULL,
    verified_badge_name TEXT NOT NULL,
    deals_name TEXT NOT NULL,
    experiences_name TEXT NOT NULL,
    legal_notice TEXT NOT NULL,
    invoice_header TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS founding_partner_campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    total_slots INTEGER NOT NULL DEFAULT 100,
    allocated_slots INTEGER NOT NULL DEFAULT 63,
    promotional_price REAL NOT NULL,
    regular_price REAL NOT NULL,
    currency TEXT NOT NULL,
    badge_label TEXT NOT NULL,
    priority_months INTEGER NOT NULL DEFAULT 12,
    is_active INTEGER NOT NULL DEFAULT 1,
    deadline_date TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`
];

export async function ensureBrands() {
  const d1 = env.DB;
  await d1.batch(brandSchema.map(sql => d1.prepare(sql)));

  const now = new Date().toISOString();

  // 1. Seed Parent Legal Entity: Lamton Investments Ltd
  await d1.prepare(`
    INSERT INTO organizations (
      legal_name, trading_name, registration_number, tax_number, country, registered_address, phone, email, website, status, created_at, updated_at
    ) VALUES (
      'Lamton Investments Ltd', 'Lamton Investments', 'LAM-ZM-2024-8891', 'TPIN-1002938482', 'Zambia', 'Plot 10444, Great East Road, Rhodes Park, Lusaka, Zambia', '+260573506598', 'info@lamtoninvestments.com', 'https://lamtoninvestments.com', 'active', ?, ?
    ) ON CONFLICT(legal_name) DO UPDATE SET phone=excluded.phone, email=excluded.email, updated_at=?
  `).bind(now, now, now).run();

  const org = await d1.prepare("SELECT id FROM organizations WHERE legal_name='Lamton Investments Ltd' LIMIT 1").first<{ id: number }>();
  const orgId = org?.id || 1;

  // 2. Seed Brand: ZamRoam (Zambia)
  await d1.prepare(`
    INSERT INTO brands (
      organization_id, code, name, tagline, short_description, country_code, primary_domain, support_email, support_phone, pass_name, partner_program_name, verified_badge_name, deals_name, experiences_name, legal_notice, invoice_header, created_at, updated_at
    ) VALUES (
      ?, 'zamroam', 'ZamRoam', 'Roam Zambia. Experience More.', 'A premier tourism discovery, membership, deals, experiences and provider marketplace connecting travellers with the best of Zambia.', 'ZMB', 'zamroam.com', 'info@zamroam.com', '+260573506598', 'ZamRoam Pass', 'ZamRoam Partners', 'ZamRoam Verified', 'ZamRoam Deals', 'ZamRoam Experiences', 'ZamRoam is a tourism technology platform owned and operated by Lamton Investments Ltd.', 'LAMTON INVESTMENTS LTD — Operating ZamRoam', ?, ?
    ) ON CONFLICT(code) DO UPDATE SET name=excluded.name, tagline=excluded.tagline, primary_domain=excluded.primary_domain, support_email=excluded.support_email, support_phone=excluded.support_phone, legal_notice=excluded.legal_notice, updated_at=excluded.updated_at
  `).bind(orgId, now, now).run();

  // 3. Seed Founding Partner Campaign for Zambia (100 Slots)
  await d1.prepare(`
    INSERT INTO founding_partner_campaigns (
      country_code, name, total_slots, allocated_slots, promotional_price, regular_price, currency, badge_label, priority_months, is_active, deadline_date, created_at, updated_at
    ) VALUES (
      'ZMB', '100 Founding ZamRoam Partners', 100, 63, 1499, 2999, 'ZMW', 'Founding Partner', 12, 1, '2026-12-31', ?, ?
    ) ON CONFLICT(country_code) DO UPDATE SET updated_at=excluded.updated_at
  `).bind(now, now).run();
}

export async function getBrandConfig(countryCode: string = "ZMB") {
  await ensureBrands();
  const brand = await env.DB.prepare(`
    SELECT b.id, b.code, b.name, b.tagline, b.short_description AS shortDescription, b.country_code AS countryCode,
           b.primary_domain AS primaryDomain, b.support_email AS supportEmail, b.support_phone AS supportPhone,
           b.pass_name AS passName, b.partner_program_name AS partnerProgramName, b.verified_badge_name AS verifiedBadgeName,
           b.deals_name AS dealsName, b.experiences_name AS experiencesName, b.legal_notice AS legalNotice,
           b.invoice_header AS invoiceHeader, o.legal_name AS legalOwner
    FROM brands b
    JOIN organizations o ON o.id = b.organization_id
    WHERE b.country_code = ? OR b.code = 'zamroam'
    ORDER BY CASE WHEN b.country_code = ? THEN 0 ELSE 1 END
    LIMIT 1
  `).bind(countryCode.toUpperCase(), countryCode.toUpperCase()).first<{
    id: number;
    code: string;
    name: string;
    tagline: string;
    shortDescription: string;
    countryCode: string;
    primaryDomain: string;
    supportEmail: string;
    supportPhone: string;
    passName: string;
    partnerProgramName: string;
    verifiedBadgeName: string;
    dealsName: string;
    experiencesName: string;
    legalNotice: string;
    invoiceHeader: string;
    legalOwner: string;
  }>();

  if (brand) return brand;

  // Fallback defaults
  return {
    id: 1,
    code: "zamroam",
    name: "ZamRoam",
    tagline: "Roam Zambia. Experience More.",
    shortDescription: "Tourism discovery, pass memberships, and provider marketplace across Zambia.",
    countryCode: "ZMB",
    primaryDomain: "zamroam.com",
    supportEmail: "info@zamroam.com",
    supportPhone: "+260573506598",
    passName: "ZamRoam Pass",
    partnerProgramName: "ZamRoam Partners",
    verifiedBadgeName: "ZamRoam Verified",
    dealsName: "ZamRoam Deals",
    experiencesName: "ZamRoam Experiences",
    legalNotice: "ZamRoam is a tourism technology platform owned and operated by Lamton Investments Ltd.",
    invoiceHeader: "LAMTON INVESTMENTS LTD — Operating ZamRoam",
    legalOwner: "Lamton Investments Ltd"
  };
}

export async function getFoundingPartnerCampaign(countryCode: string = "ZMB"): Promise<FoundingPartnerCampaign | null> {
  await ensureBrands();
  const row = await env.DB.prepare(`
    SELECT id, country_code AS countryCode, name, total_slots AS totalSlots, allocated_slots AS allocatedSlots,
           promotional_price AS promotionalPrice, regular_price AS regularPrice, currency,
           badge_label AS badgeLabel, priority_months AS priorityMonths, is_active AS isActive, deadline_date AS deadlineDate
    FROM founding_partner_campaigns
    WHERE (country_code = ? OR country_code = 'ZMB') AND is_active = 1
    LIMIT 1
  `).bind(countryCode.toUpperCase()).first<FoundingPartnerCampaign>();
  return row ?? null;
}

import { env } from "./runtime";
import { ensureCatalogue } from "./catalogue";
import type { VisitPngUser } from "../app/auth";
import { requireAdministrator } from "./admin";

export interface ProviderApplicationInput {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  businessName: string;
  providerType: string;
  provinceId: number;
  destinationId?: number | null;
  villageOrTown: string;
  description: string;
  experienceYears?: number;
  licenseOrTpaNumber: string;
  clanOrReferenceContact: string;
  pricingSample?: string;
  nrcDocumentUrl?: string | null;
  licenseDocumentUrl?: string | null;
  endorsementDocumentUrl?: string | null;
  antiFraudDeclared?: boolean;
  payoutMethod: string;
  payoutAccountDetails: string;
  agreedToCommission: boolean;
}

export interface ProviderApplicationRecord {
  id: number;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  businessName: string;
  slug: string;
  providerType: string;
  provinceId: number;
  provinceName?: string;
  provinceCode?: string;
  destinationId: number | null;
  destinationName?: string;
  villageOrTown: string;
  description: string;
  experienceYears: number;
  licenseOrTpaNumber: string | null;
  clanOrReferenceContact: string | null;
  pricingSample: string | null;
  nrcDocumentUrl?: string | null;
  licenseDocumentUrl?: string | null;
  endorsementDocumentUrl?: string | null;
  antiFraudDeclared?: boolean;
  payoutMethod: string;
  payoutAccountDetails: string;
  status: "pending_review" | "interview_scheduled" | "fact_checking" | "approved" | "rejected";
  vettingChecklist: {
    nidPassportVerified?: boolean;
    tpaLicenseVerified?: boolean;
    clanLandownerConsentVerified?: boolean;
    interviewConducted?: boolean;
    equipmentSafetyChecked?: boolean;
  };
  interviewDate: string | null;
  interviewNotes: string | null;
  factCheckingNotes: string | null;
  rejectionReason: string | null;
  commissionRate: number; // default 0.05 (5%)
  gstRate: number; // default 0.10 (10% GST on commission)
  createdAt: string;
  updatedAt: string;
  approvedAt: string | null;
}

const providerStatements = [
  `CREATE TABLE IF NOT EXISTS provider_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_phone TEXT NOT NULL,
    business_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    provider_type TEXT NOT NULL,
    province_id INTEGER NOT NULL REFERENCES provinces(id),
    destination_id INTEGER REFERENCES destinations(id),
    village_or_town TEXT NOT NULL,
    description TEXT NOT NULL,
    experience_years INTEGER NOT NULL DEFAULT 1,
    license_or_tpa_number TEXT,
    clan_or_reference_contact TEXT,
    pricing_sample TEXT,
    payout_method TEXT NOT NULL,
    payout_account_details TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending_review',
    vetting_checklist TEXT NOT NULL DEFAULT '{}',
    interview_date TEXT,
    interview_notes TEXT,
    fact_checking_notes TEXT,
    rejection_reason TEXT,
    commission_rate REAL NOT NULL DEFAULT 0.05,
    gst_rate REAL NOT NULL DEFAULT 0.10,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    approved_at TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS prov_app_status_idx ON provider_applications(status)`,
  `CREATE INDEX IF NOT EXISTS prov_app_email_idx ON provider_applications(applicant_email)`
];

let providerAppsInitPromise: Promise<void> | null = null;

export async function ensureProviderApplications() {
  if (providerAppsInitPromise) return providerAppsInitPromise;
  providerAppsInitPromise = (async () => {
    await ensureCatalogue();
    const d1 = env.DB;
    for (const sql of providerStatements) {
      await d1.prepare(sql).run();
    }
  const safeAlter = async (sql: string) => {
    try {
      await d1.prepare(sql).run();
    } catch {}
  };
  await safeAlter("ALTER TABLE providers ADD COLUMN provider_type TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN contact_name TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN contact_email TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN contact_phone TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN physical_address TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN province_id INTEGER");
  await safeAlter("ALTER TABLE providers ADD COLUMN destination_id INTEGER");
  await safeAlter("ALTER TABLE providers ADD COLUMN payout_details TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN commission_rate REAL DEFAULT 0.05");
  await safeAlter("ALTER TABLE providers ADD COLUMN gst_rate REAL DEFAULT 0.10");
  await safeAlter("ALTER TABLE providers ADD COLUMN interview_verified_at TEXT");
  await safeAlter("ALTER TABLE providers ADD COLUMN fact_checked_by TEXT");

  await safeAlter("ALTER TABLE provider_applications ADD COLUMN nrc_document_url TEXT");
  await safeAlter("ALTER TABLE provider_applications ADD COLUMN license_document_url TEXT");
  await safeAlter("ALTER TABLE provider_applications ADD COLUMN endorsement_document_url TEXT");
  await safeAlter("ALTER TABLE provider_applications ADD COLUMN anti_fraud_declared INTEGER DEFAULT 0");

  // Check if provider_applications has records; if not, seed realistic Zambian operator applications
  const countRow = await d1.prepare("SELECT COUNT(*) AS total FROM provider_applications").first<{ total: number }>();
  if (!countRow || countRow.total === 0) {
    const provSouthern = await d1.prepare("SELECT id FROM provinces WHERE code='ZM-SOU'").first<{ id: number }>();
    const provLusaka = await d1.prepare("SELECT id FROM provinces WHERE code='ZM-LUS'").first<{ id: number }>();
    const provEastern = await d1.prepare("SELECT id FROM provinces WHERE code='ZM-EAS'").first<{ id: number }>();
    const provWestern = await d1.prepare("SELECT id FROM provinces WHERE code='ZM-WES'").first<{ id: number }>();
    const provCentral = await d1.prepare("SELECT id FROM provinces WHERE code='ZM-CEN'").first<{ id: number }>();
    const provMuchinga = await d1.prepare("SELECT id FROM provinces WHERE code='ZM-MUC'").first<{ id: number }>();

    const seedApps = [
      {
        applicantName: "John Chilufya",
        applicantEmail: "j.chilufya@africanparks.org",
        applicantPhone: "+260 97 712 3456",
        businessName: "African Parks Zambia (Liuwa Plain & Bangweulu)",
        slug: "african-parks-zambia",
        providerType: "lodge_operator",
        provinceId: provWestern?.id || 1,
        villageOrTown: "Kalabo & Mongu Central",
        description: "Official non-profit conservation organisation managing Liuwa Plain National Park and Bangweulu Wetlands in public-private partnership with DNPW and the Barotse Royal Establishment. Offering world-class ecological walking safaris and migration expeditions.",
        experienceYears: 18,
        licenseOrTpaNumber: "ZTA-2026-AP01",
        clanOrReferenceContact: "Barotse Royal Establishment (BRE) & Department of National Parks (DNPW)",
        pricingSample: "ZMW 3,500 - ZMW 5,900 / night (all inclusive)",
        payoutMethod: "bank_transfer",
        payoutAccountDetails: "Stanbic Bank Zambia · Account: 913000452109 · Lusaka Main Branch",
        status: "fact_checking",
        checklist: { nidPassportVerified: true, tpaLicenseVerified: true, clanLandownerConsentVerified: true, interviewConducted: true, equipmentSafetyChecked: false },
        interviewNotes: "Comprehensive interview conducted with operations director. Validated concession agreements with Barotse Royal Establishment.",
        factCheckingNotes: "PACRA Certificate & ZTA Eco-Tourism Operators accreditation verified on DNPW registry."
      },
      {
        applicantName: "Grant Cumings",
        applicantEmail: "grant@chiawa.com",
        applicantPhone: "+260 21 126 1234",
        businessName: "Chiawa Safaris & Lower Zambezi Expeditions",
        slug: "chiawa-safaris-zambia",
        providerType: "safari_operator",
        provinceId: provLusaka?.id || 1,
        villageOrTown: "Chongwe & Lower Zambezi Valley",
        description: "Multi-award-winning family-owned safari outfit offering premier luxury tented camps, canoe trails, river cruises and conservation-driven walking safaris in Lower Zambezi National Park.",
        experienceYears: 32,
        licenseOrTpaNumber: "ZTA-2026-CH02",
        clanOrReferenceContact: "Chieftainess Chiawa Royal Council",
        pricingSample: "ZMW 4,900 - ZMW 6,800 / night",
        payoutMethod: "bank_transfer",
        payoutAccountDetails: "Barclays/Absa Bank Zambia · Account: 0140223901 · Lusaka",
        status: "pending_review",
        checklist: { nidPassportVerified: true, tpaLicenseVerified: true, clanLandownerConsentVerified: false, interviewConducted: false, equipmentSafetyChecked: false },
        interviewNotes: "",
        factCheckingNotes: "ZTA Class A Safari Operator license submitted."
      },
      {
        applicantName: "Mutale Mwamba",
        applicantEmail: "bookings@livingstoneadventures.com",
        applicantPhone: "+260 96 688 7711",
        businessName: "Livingstone Adventures & Batoka Rafting",
        slug: "livingstone-adventures",
        providerType: "adventure_operator",
        provinceId: provSouthern?.id || 1,
        villageOrTown: "Livingstone Urban & Batoka Gorge",
        description: "Specialist adventure expeditions including Devil's Pool guided swims, white water rafting in Batoka Gorge Rapid #1-23, Zambezi sunset cruises, and helicopter flights over Victoria Falls.",
        experienceYears: 15,
        licenseOrTpaNumber: "ZTA-2026-LA05",
        clanOrReferenceContact: "Mukuni Royal Village Council",
        pricingSample: "ZMW 450 - ZMW 1,850 per activity",
        payoutMethod: "bank_transfer",
        payoutAccountDetails: "First National Bank (FNB) Zambia · Account: 6289001423 · Livingstone",
        status: "interview_scheduled",
        checklist: { nidPassportVerified: true, tpaLicenseVerified: true, clanLandownerConsentVerified: true, interviewConducted: false, equipmentSafetyChecked: true },
        interviewNotes: "Scheduled video interview for Wednesday 10:00 CAT.",
        factCheckingNotes: "IRF International Rafting Federation safety certifications verified."
      },
      {
        applicantName: "Ton de Rooy",
        applicantEmail: "info@robinpopesafaris.net",
        applicantPhone: "+260 95 570 0012",
        businessName: "Robin Pope Safaris South Luangwa",
        slug: "robin-pope-safaris",
        providerType: "safari_operator",
        provinceId: provEastern?.id || 1,
        villageOrTown: "Mfuwe / Luangwa Valley",
        description: "Pioneers of authentic mobile walking safaris in South Luangwa and Nsefu Sector. Exceptional guiding standards and intimate wildlife encounters.",
        experienceYears: 36,
        licenseOrTpaNumber: "ZTA-2026-RPS04",
        clanOrReferenceContact: "Kakumbi Traditional Council",
        pricingSample: "ZMW 3,800 - ZMW 5,200 per night",
        payoutMethod: "bank_transfer",
        payoutAccountDetails: "Standard Chartered Zambia · Account: 0100123998 · Chipata",
        status: "pending_review",
        checklist: { nidPassportVerified: false, tpaLicenseVerified: false, clanLandownerConsentVerified: false, interviewConducted: false, equipmentSafetyChecked: false },
        interviewNotes: "",
        factCheckingNotes: ""
      },
      {
        applicantName: "Linda Van Blerk",
        applicantEmail: "reservations@mukambi.com",
        applicantPhone: "+260 97 442 8899",
        businessName: "Mukambi Safari Lodges & Kafue Bush Safaris",
        slug: "mukambi-safaris",
        providerType: "lodge_operator",
        provinceId: provCentral?.id || 1,
        villageOrTown: "Kafue River & Itezhi-Tezhi",
        description: "Gateway to the Kafue National Park with river chalets, Fig Tree Bush Camp, and Busanga Plains seasonal luxury tented expeditions.",
        experienceYears: 22,
        licenseOrTpaNumber: "ZTA-2026-MK03",
        clanOrReferenceContact: "Kafue Conservation Community Trust",
        pricingSample: "ZMW 2,800 - ZMW 4,600 per night",
        payoutMethod: "bank_transfer",
        payoutAccountDetails: "Zanaco Bank Zambia · Account: 5540098123 · Lusaka",
        status: "pending_review",
        checklist: { nidPassportVerified: true, tpaLicenseVerified: true, clanLandownerConsentVerified: false, interviewConducted: false, equipmentSafetyChecked: false },
        interviewNotes: "",
        factCheckingNotes: ""
      },
      {
        applicantName: "Lottie Chinyanta",
        applicantEmail: "mutinondozambia@gmail.com",
        applicantPhone: "+260 97 833 4455",
        businessName: "Mutinondo Wilderness Eco-Reserve",
        slug: "mutinondo-wilderness",
        providerType: "eco_lodge",
        provinceId: provMuchinga?.id || 1,
        villageOrTown: "Mpika District Escarpment",
        description: "Over 10,000 hectares of pristine privately protected Miombo woodland, crystal clear rivers, granite inselbergs, waterholes, and hiking trails in northern Muchinga.",
        experienceYears: 24,
        licenseOrTpaNumber: "ZTA-2026-MW06",
        clanOrReferenceContact: "Mpika Community Resource Board",
        pricingSample: "ZMW 1,200 - ZMW 2,200 per night",
        payoutMethod: "bank_transfer",
        payoutAccountDetails: "Zanaco Bank Zambia · Account: 1045567890 · Mpika Branch",
        status: "approved",
        checklist: { nidPassportVerified: true, tpaLicenseVerified: true, clanLandownerConsentVerified: true, interviewConducted: true, equipmentSafetyChecked: true },
        interviewNotes: "Verified eco-credentials and community benefit sharing agreements in Mpika.",
        factCheckingNotes: "Full verification passed and publishing privileges activated."
      }
    ];

    const now = new Date().toISOString();
    for (const app of seedApps) {
      await d1.prepare(`
        INSERT INTO provider_applications (
          applicant_name, applicant_email, applicant_phone, business_name, slug,
          provider_type, province_id, village_or_town, description,
          experience_years, license_or_tpa_number, clan_or_reference_contact, pricing_sample,
          payout_method, payout_account_details, status, vetting_checklist,
          interview_notes, fact_checking_notes, commission_rate, gst_rate, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0.05, 0.10, ?, ?)
      `).bind(
        app.applicantName, app.applicantEmail, app.applicantPhone, app.businessName, app.slug,
        app.providerType, app.provinceId, app.villageOrTown, app.description,
        app.experienceYears, app.licenseOrTpaNumber, app.clanOrReferenceContact, app.pricingSample,
        app.payoutMethod, app.payoutAccountDetails, app.status, JSON.stringify(app.checklist),
        app.interviewNotes, app.factCheckingNotes, now, now
      ).run();
    }
  }
  })();
  return providerAppsInitPromise;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export { calculateCommissionBreakdown } from "./commission";
export type { CommissionBreakdown } from "./commission";

export async function submitProviderRegistration(input: ProviderApplicationInput) {
  await ensureProviderApplications();
  const d1 = env.DB;

  const applicantName = String(input.applicantName || "").trim().slice(0, 120);
  const applicantEmail = String(input.applicantEmail || "").trim().toLowerCase().slice(0, 180);
  const applicantPhone = String(input.applicantPhone || "").trim().slice(0, 60);
  const businessName = String(input.businessName || "").trim().slice(0, 150);
  const providerType = String(input.providerType || "tour_guide").trim();
  const provinceId = Number(input.provinceId);
  const destinationId = input.destinationId ? Number(input.destinationId) : null;
  const villageOrTown = String(input.villageOrTown || "").trim().slice(0, 150);
  const description = String(input.description || "").trim().slice(0, 2000);
  const experienceYears = Math.max(1, Number(input.experienceYears) || 1);
  const licenseOrTpaNumber = String(input.licenseOrTpaNumber || "").trim().slice(0, 100);
  const clanOrReferenceContact = String(input.clanOrReferenceContact || "").trim().slice(0, 300);
  const pricingSample = input.pricingSample ? String(input.pricingSample).trim().slice(0, 500) : null;
  const nrcDocumentUrl = input.nrcDocumentUrl ? String(input.nrcDocumentUrl).trim() : null;
  const licenseDocumentUrl = input.licenseDocumentUrl ? String(input.licenseDocumentUrl).trim() : null;
  const endorsementDocumentUrl = input.endorsementDocumentUrl ? String(input.endorsementDocumentUrl).trim() : null;
  const antiFraudDeclared = Boolean(input.antiFraudDeclared);
  const payoutMethod = String(input.payoutMethod || "bank_transfer").trim();
  const payoutAccountDetails = String(input.payoutAccountDetails || "").trim().slice(0, 500);

  if (!applicantName || !applicantEmail || !applicantPhone || !businessName || !provinceId || !villageOrTown || !description) {
    throw new Error("Please complete all required fields (Name, Email, Phone, Business Name, Province, Village/Town, Description).");
  }

  if (!licenseOrTpaNumber) {
    throw new Error("Mandatory Anti-Scam field: Please provide your official ZTA License Number or PACRA Registration Number.");
  }

  if (!clanOrReferenceContact) {
    throw new Error("Mandatory Anti-Scam field: Please provide your Traditional Authority / Chiefdom / Community Reference details.");
  }

  if (!antiFraudDeclared) {
    throw new Error("Mandatory Legal Declaration: You must certify under penalty of law that all details and documents submitted are 100% genuine.");
  }

  if (!input.agreedToCommission) {
    throw new Error("You must agree to the 5% platform commission agreement.");
  }

  const baseSlug = slugify(businessName);
  let slug = baseSlug;
  const existing = await d1.prepare("SELECT id FROM provider_applications WHERE slug=?").bind(slug).first<{ id: number }>();
  if (existing) {
    slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
  }

  const now = new Date().toISOString();
  const initialChecklist = JSON.stringify({
    nidPassportVerified: false,
    tpaLicenseVerified: false,
    clanLandownerConsentVerified: false,
    interviewConducted: false,
    equipmentSafetyChecked: false
  });

  await d1.prepare(`
    INSERT INTO provider_applications (
      applicant_name, applicant_email, applicant_phone, business_name, slug,
      provider_type, province_id, destination_id, village_or_town, description,
      experience_years, license_or_tpa_number, clan_or_reference_contact, pricing_sample,
      nrc_document_url, license_document_url, endorsement_document_url, anti_fraud_declared,
      payout_method, payout_account_details, status, vetting_checklist,
      commission_rate, gst_rate, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_review', ?, 0.05, 0.10, ?, ?)
  `).bind(
    applicantName, applicantEmail, applicantPhone, businessName, slug,
    providerType, provinceId, destinationId, villageOrTown, description,
    experienceYears, licenseOrTpaNumber, clanOrReferenceContact, pricingSample,
    nrcDocumentUrl, licenseDocumentUrl, endorsementDocumentUrl, antiFraudDeclared ? 1 : 0,
    payoutMethod, payoutAccountDetails, initialChecklist, now, now
  ).run();

  return {
    success: true,
    applicationReference: slug,
    status: "pending_review",
    message: "Your application has been received and queued for anti-scam fact-checking and interview scheduling."
  };
}

export async function getProviderApplicationStatus(referenceOrEmail: string) {
  await ensureProviderApplications();
  const d1 = env.DB;
  const query = referenceOrEmail.trim().toLowerCase();

  const app = await d1.prepare(`
    SELECT pa.*, pv.name AS province_name, pv.code AS province_code, d.name AS destination_name
    FROM provider_applications pa
    LEFT JOIN provinces pv ON pv.id = pa.province_id
    LEFT JOIN destinations d ON d.id = pa.destination_id
    WHERE pa.slug = ? OR pa.applicant_email = ?
    ORDER BY pa.created_at DESC
  `).bind(query, query).first<Record<string, unknown>>();

  if (!app) return null;

  return mapApplicationRow(app);
}

function mapApplicationRow(row: Record<string, unknown>): ProviderApplicationRecord {
  let checklist = {};
  try {
    checklist = JSON.parse(String(row.vetting_checklist || "{}"));
  } catch {}

  return {
    id: Number(row.id),
    applicantName: String(row.applicant_name),
    applicantEmail: String(row.applicant_email),
    applicantPhone: String(row.applicant_phone),
    businessName: String(row.business_name),
    slug: String(row.slug),
    providerType: String(row.provider_type),
    provinceId: Number(row.province_id),
    provinceName: row.province_name ? String(row.province_name) : undefined,
    provinceCode: row.province_code ? String(row.province_code) : undefined,
    destinationId: row.destination_id ? Number(row.destination_id) : null,
    destinationName: row.destination_name ? String(row.destination_name) : undefined,
    villageOrTown: String(row.village_or_town),
    description: String(row.description),
    experienceYears: Number(row.experience_years || 1),
    licenseOrTpaNumber: row.license_or_tpa_number ? String(row.license_or_tpa_number) : null,
    clanOrReferenceContact: row.clan_or_reference_contact ? String(row.clan_or_reference_contact) : null,
    pricingSample: row.pricing_sample ? String(row.pricing_sample) : null,
    nrcDocumentUrl: row.nrc_document_url ? String(row.nrc_document_url) : null,
    licenseDocumentUrl: row.license_document_url ? String(row.license_document_url) : null,
    endorsementDocumentUrl: row.endorsement_document_url ? String(row.endorsement_document_url) : null,
    antiFraudDeclared: Boolean(row.anti_fraud_declared),
    payoutMethod: String(row.payout_method),
    payoutAccountDetails: String(row.payout_account_details),
    status: row.status as ProviderApplicationRecord["status"],
    vettingChecklist: checklist,
    interviewDate: row.interview_date ? String(row.interview_date) : null,
    interviewNotes: row.interview_notes ? String(row.interview_notes) : null,
    factCheckingNotes: row.fact_checking_notes ? String(row.fact_checking_notes) : null,
    rejectionReason: row.rejection_reason ? String(row.rejection_reason) : null,
    commissionRate: Number(row.commission_rate ?? 0.05),
    gstRate: Number(row.gst_rate ?? 0.10),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    approvedAt: row.approved_at ? String(row.approved_at) : null
  };
}

// Administrator functions
export async function getAdminProviderApplications(identity: VisitPngUser) {
  const admin = await requireAdministrator(identity);
  await ensureProviderApplications();
  const d1 = env.DB;

  const rows = await d1.prepare(`
    SELECT pa.*, pv.name AS province_name, pv.code AS province_code, d.name AS destination_name
    FROM provider_applications pa
    LEFT JOIN provinces pv ON pv.id = pa.province_id
    LEFT JOIN destinations d ON d.id = pa.destination_id
    ORDER BY 
      CASE pa.status 
        WHEN 'pending_review' THEN 1 
        WHEN 'interview_scheduled' THEN 2 
        WHEN 'fact_checking' THEN 3 
        WHEN 'approved' THEN 4 
        ELSE 5 
      END,
      pa.created_at DESC
  `).all<Record<string, unknown>>();

  return {
    admin,
    applications: (rows.results || []).map(mapApplicationRow),
    commissionDefaults: {
      baseCommissionRate: 0.05,
      gstRate: 0.10
    }
  };
}

export async function updateAdminProviderApplication(
  identity: VisitPngUser,
  input: {
    id: number;
    status?: "pending_review" | "interview_scheduled" | "fact_checking" | "approved" | "rejected";
    vettingChecklist?: Record<string, boolean>;
    interviewDate?: string | null;
    interviewNotes?: string | null;
    factCheckingNotes?: string | null;
    rejectionReason?: string | null;
    commissionRate?: number;
    gstRate?: number;
  }
) {
  const admin = await requireAdministrator(identity);
  await ensureProviderApplications();
  const d1 = env.DB;

  const app = await d1.prepare("SELECT * FROM provider_applications WHERE id=?").bind(input.id).first<Record<string, unknown>>();
  if (!app) throw new Error("Application not found");

  const now = new Date().toISOString();
  const checklistStr = input.vettingChecklist ? JSON.stringify(input.vettingChecklist) : String(app.vetting_checklist);
  const status = input.status || (String(app.status) as ProviderApplicationRecord["status"]);
  const interviewDate = input.interviewDate !== undefined ? input.interviewDate : (app.interview_date ? String(app.interview_date) : null);
  const interviewNotes = input.interviewNotes !== undefined ? input.interviewNotes : (app.interview_notes ? String(app.interview_notes) : null);
  const factCheckingNotes = input.factCheckingNotes !== undefined ? input.factCheckingNotes : (app.fact_checking_notes ? String(app.fact_checking_notes) : null);
  const rejectionReason = input.rejectionReason !== undefined ? input.rejectionReason : (app.rejection_reason ? String(app.rejection_reason) : null);
  const commissionRate = input.commissionRate !== undefined ? Number(input.commissionRate) : Number(app.commission_rate ?? 0.05);
  const gstRate = input.gstRate !== undefined ? Number(input.gstRate) : Number(app.gst_rate ?? 0.10);

  let approvedAt = app.approved_at ? String(app.approved_at) : null;

  // If approving, sync to official `providers` table!
  if (status === "approved") {
    approvedAt = now;
    const businessName = String(app.business_name);
    const slug = String(app.slug);
    const licenseNumber = app.license_or_tpa_number ? String(app.license_or_tpa_number) : null;
    const contactEmail = String(app.applicant_email);
    const contactPhone = String(app.applicant_phone);
    const providerType = String(app.provider_type);
    const provinceId = Number(app.province_id);
    const destinationId = app.destination_id ? Number(app.destination_id) : null;
    const payoutDetails = String(app.payout_account_details);

    // Upsert to providers table
    await d1.prepare(`
      INSERT INTO providers (
        slug, trading_name, legal_name, license_number, verification_status,
        source_name, source_url, is_test_data, provider_type, contact_email,
        contact_phone, province_id, destination_id, payout_details, commission_rate,
        gst_rate, interview_verified_at, fact_checked_by
      ) VALUES (?, ?, ?, ?, 'interview_verified_approved', 'Visit PNG Partner Network', NULL, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(slug) DO UPDATE SET
        trading_name=excluded.trading_name,
        verification_status='interview_verified_approved',
        contact_email=excluded.contact_email,
        contact_phone=excluded.contact_phone,
        commission_rate=excluded.commission_rate,
        gst_rate=excluded.gst_rate,
        interview_verified_at=excluded.interview_verified_at,
        fact_checked_by=excluded.fact_checked_by
    `).bind(
      slug, businessName, businessName, licenseNumber,
      providerType, contactEmail, contactPhone, provinceId, destinationId, payoutDetails, commissionRate,
      gstRate, now, identity.email
    ).run();
  }

  await d1.prepare(`
    UPDATE provider_applications SET
      status = ?,
      vetting_checklist = ?,
      interview_date = ?,
      interview_notes = ?,
      fact_checking_notes = ?,
      rejection_reason = ?,
      commission_rate = ?,
      gst_rate = ?,
      approved_at = ?,
      updated_at = ?
    WHERE id = ?
  `).bind(
    status, checklistStr, interviewDate, interviewNotes,
    factCheckingNotes, rejectionReason, commissionRate, gstRate,
    approvedAt, now, input.id
  ).run();

  // Record audit log
  await d1.prepare(`
    INSERT INTO audit_logs (user_id, actor_email, action, entity_type, entity_id, details, created_at)
    VALUES (?, ?, ?, 'provider_application', ?, ?, ?)
  `).bind(
    admin.id, identity.email, `provider_app_${status}`, String(input.id),
    JSON.stringify({ businessName: app.business_name, status, commissionRate }), now
  ).run();

  return getAdminProviderApplications(identity);
}

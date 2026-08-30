import { env } from "./runtime";
import type { VisitPngUser } from "../app/auth";
import { getOrCreateAccount } from "./accounts";
import { ensureMembership } from "./membership";

export interface TouristPlan {
  id: number;
  code: string;
  name: string;
  audience: string;
  billingPeriod: string;
  price: number;
  currency: string;
  description: string;
  isComplimentary: boolean;
  tierLevel: number;
  badgeColor: string;
  cardIncluded: boolean;
  maxFamilyMembers: number;
  isEventPass: boolean;
  shortTermDays: number | null;
  benefits: { id: number; code: string; name: string; description: string; usageLimit: number | null }[];
}

export interface ProviderPlan {
  id: number;
  code: string;
  name: string;
  tierLevel: number;
  annualFee: number;
  currency: string;
  discountExpectationPct: number;
  maxActiveOffers: number;
  badgeTitle: string;
  description: string;
  features: string[];
}

export interface ProviderOffer {
  id: number;
  providerId: number;
  providerName: string;
  providerTier: string;
  providerSlug: string;
  destinationName: string;
  provinceName: string;
  title: string;
  shortSummary: string;
  benefitType: string;
  discountPct: number | null;
  discountAmount: number | null;
  normalPrice: number | null;
  memberPrice: number | null;
  complimentaryItem: string | null;
  applicableTiers: string;
  minSpend: number | null;
  maxDiscount: number | null;
  startDate: string;
  endDate: string;
  dailyLimit: number | null;
  perMemberLimit: number | null;
  blackoutDates: string | null;
  daysOfWeek: string | null;
  bookingRequired: boolean;
  promoCode: string | null;
  termsConditions: string;
  imageUrl: string | null;
  approvalStatus: "draft" | "submitted" | "approved" | "rejected" | "suspended";
  isFeatured: boolean;
  createdAt: string;
}

export interface RedemptionRecord {
  id: number;
  redemptionRef: string;
  subscriptionId: number;
  userId: number;
  memberName: string;
  memberNumber: string;
  membershipTier: string;
  providerId: number;
  providerName: string;
  offerId: number;
  offerTitle: string;
  benefitType: string;
  branchName: string;
  staffName: string;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  benefitSummary: string;
  verificationMethod: string;
  status: string;
  createdAt: string;
}

export interface PassportStamp {
  id: number;
  destinationName: string;
  provinceName: string;
  stampTitle: string;
  iconBadge: string;
  pointsAwarded: number;
  unlockedAt: string;
}

export interface PhysicalCardRecord {
  id: number;
  subscriptionId: number;
  userId: number;
  memberName: string;
  memberNumber: string;
  cardTier: string;
  productionStatus: "requested" | "approved" | "printing" | "printed" | "dispatched" | "delivered" | "cancelled";
  dispatchedAt: string | null;
  trackingNumber: string | null;
  deliveryAddress: string;
  notes: string | null;
  createdAt: string;
}

const ecosystemSchemaStatements = [
  // 1. Extend membership_plans
  `CREATE TABLE IF NOT EXISTS membership_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    audience TEXT NOT NULL,
    billing_period TEXT NOT NULL,
    price INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'ZMW',
    description TEXT NOT NULL,
    is_complimentary INTEGER NOT NULL DEFAULT 0,
    tier_level INTEGER NOT NULL DEFAULT 1,
    badge_color TEXT NOT NULL DEFAULT 'teal',
    card_included INTEGER NOT NULL DEFAULT 0,
    max_family_members INTEGER NOT NULL DEFAULT 0,
    is_event_pass INTEGER NOT NULL DEFAULT 0,
    short_term_days INTEGER,
    is_active INTEGER NOT NULL DEFAULT 1,
    is_test_data INTEGER NOT NULL DEFAULT 1
  )`,

  // 2. Family Group Members
  `CREATE TABLE IF NOT EXISTS family_group_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    primary_subscription_id INTEGER NOT NULL,
    full_name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    member_number TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT NOT NULL
  )`,

  // 3. Membership Physical Cards Fulfillment Pipeline
  `CREATE TABLE IF NOT EXISTS membership_cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscription_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    member_number TEXT NOT NULL,
    card_tier TEXT NOT NULL,
    production_status TEXT NOT NULL DEFAULT 'requested',
    dispatched_at TEXT,
    tracking_number TEXT,
    delivery_address TEXT NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL
  )`,

  // 4. Partner Provider Subscription Plans
  `CREATE TABLE IF NOT EXISTS provider_subscription_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tier_level INTEGER NOT NULL,
    annual_fee INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'ZMW',
    discount_expectation_pct INTEGER NOT NULL,
    max_active_offers INTEGER NOT NULL DEFAULT 3,
    badge_title TEXT NOT NULL,
    description TEXT NOT NULL,
    features_json TEXT NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1
  )`,

  // 5. Provider Subscriptions
  `CREATE TABLE IF NOT EXISTS provider_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider_id INTEGER NOT NULL,
    plan_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    start_date TEXT NOT NULL,
    expiry_date TEXT,
    auto_renew INTEGER NOT NULL DEFAULT 1,
    verified_at TEXT,
    created_at TEXT NOT NULL
  )`,

  // 6. Provider Staff
  `CREATE TABLE IF NOT EXISTS provider_staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider_id INTEGER NOT NULL,
    user_id INTEGER,
    staff_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'cashier',
    pin_code TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL
  )`,

  // 7. Comprehensive Provider Offers & Benefits
  `CREATE TABLE IF NOT EXISTS provider_offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    short_summary TEXT NOT NULL,
    benefit_type TEXT NOT NULL,
    discount_pct REAL,
    discount_amount REAL,
    normal_price REAL,
    member_price REAL,
    complimentary_item TEXT,
    applicable_tiers TEXT NOT NULL DEFAULT 'all',
    min_spend REAL,
    max_discount REAL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    daily_limit INTEGER,
    per_member_limit INTEGER,
    blackout_dates TEXT,
    days_of_week TEXT,
    booking_required INTEGER NOT NULL DEFAULT 0,
    promo_code TEXT,
    terms_conditions TEXT NOT NULL,
    image_url TEXT,
    approval_status TEXT NOT NULL DEFAULT 'approved',
    approved_by TEXT,
    is_featured INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  )`,

  // 8. Partner Redemptions Ledger
  `CREATE TABLE IF NOT EXISTS partner_redemptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    redemption_ref TEXT NOT NULL UNIQUE,
    subscription_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    provider_id INTEGER NOT NULL,
    offer_id INTEGER NOT NULL,
    branch_name TEXT NOT NULL DEFAULT 'Main Branch',
    staff_name TEXT NOT NULL DEFAULT 'Front Desk Staff',
    original_amount REAL NOT NULL DEFAULT 0,
    discount_amount REAL NOT NULL DEFAULT 0,
    final_amount REAL NOT NULL DEFAULT 0,
    benefit_summary TEXT NOT NULL,
    verification_method TEXT NOT NULL DEFAULT 'dynamic_qr',
    status TEXT NOT NULL DEFAULT 'completed',
    fraud_risk_score REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  )`,

  // 9. My PNG Passport Stamps
  `CREATE TABLE IF NOT EXISTS passport_stamps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    destination_name TEXT NOT NULL,
    province_name TEXT NOT NULL,
    partner_provider_id INTEGER,
    stamp_title TEXT NOT NULL,
    icon_badge TEXT NOT NULL,
    points_awarded INTEGER NOT NULL DEFAULT 50,
    unlocked_at TEXT NOT NULL
  )`,

  // 10. Referrals
  `CREATE TABLE IF NOT EXISTS membership_referrals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    referrer_user_id INTEGER NOT NULL,
    referral_code TEXT NOT NULL UNIQUE,
    referee_email TEXT,
    referee_user_id INTEGER,
    status TEXT NOT NULL DEFAULT 'pending',
    reward_points INTEGER NOT NULL DEFAULT 100,
    created_at TEXT NOT NULL
  )`,

  // 11. Gift Memberships
  `CREATE TABLE IF NOT EXISTS gift_memberships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchaser_user_id INTEGER NOT NULL,
    recipient_name TEXT NOT NULL,
    recipient_email TEXT NOT NULL,
    plan_id INTEGER NOT NULL,
    gift_code TEXT NOT NULL UNIQUE,
    gift_message TEXT,
    is_redeemed INTEGER NOT NULL DEFAULT 0,
    redeemed_by_user_id INTEGER,
    redeemed_at TEXT,
    created_at TEXT NOT NULL
  )`,

  // 12. Fraud Flags
  `CREATE TABLE IF NOT EXISTS membership_fraud_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscription_id INTEGER,
    user_id INTEGER,
    provider_id INTEGER,
    flag_reason TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'medium',
    status TEXT NOT NULL DEFAULT 'open',
    created_at TEXT NOT NULL
  )`
];

// Default Tourist Plans (Configurable by admin)
const defaultTouristPlans = [
  {
    code: "visitor-free",
    name: "VisitPNG Visitor Free",
    audience: "individual",
    billingPeriod: "lifetime",
    price: 0,
    currency: "PGK",
    description: "Digital visitor profile, Papua New Guinea tourism directory access, save favourite destinations, and selected free-member offers.",
    isComplimentary: 1,
    tierLevel: 1,
    badgeColor: "gray",
    cardIncluded: 0,
    maxFamilyMembers: 0,
    isEventPass: 0,
    shortTermDays: null
  },
  {
    code: "explorer-annual",
    name: "VisitPNG Explorer",
    audience: "individual",
    billingPeriod: "annual",
    price: 120,
    currency: "PGK",
    description: "Standard national paid membership. Digital QR pass, member-only discounts, savings ledger, and optional physical card.",
    isComplimentary: 0,
    tierLevel: 2,
    badgeColor: "teal",
    cardIncluded: 0,
    maxFamilyMembers: 0,
    isEventPass: 0,
    shortTermDays: null
  },
  {
    code: "adventurer-annual",
    name: "VisitPNG Adventurer",
    audience: "individual",
    billingPeriod: "annual",
    price: 290,
    currency: "PGK",
    description: "Premium membership for frequent travellers. Higher-value offers, dive & trekking upgrades, priority tour bookings, and collectible physical card.",
    isComplimentary: 0,
    tierLevel: 3,
    badgeColor: "gold",
    cardIncluded: 1,
    maxFamilyMembers: 0,
    isEventPass: 0,
    shortTermDays: null
  },
  {
    code: "elite-annual",
    name: "VisitPNG Elite (Kumul Club)",
    audience: "executive",
    billingPeriod: "annual",
    price: 690,
    currency: "PGK",
    description: "VIP tier for luxury travellers & executives. VIP resort perks, airport lounge privileges, private Wantok concierge, and bespoke physical card.",
    isComplimentary: 0,
    tierLevel: 4,
    badgeColor: "purple",
    cardIncluded: 1,
    maxFamilyMembers: 0,
    isEventPass: 0,
    shortTermDays: null
  },
  {
    code: "family-annual",
    name: "VisitPNG Family Pass",
    audience: "family",
    billingPeriod: "annual",
    price: 420,
    currency: "PGK",
    description: "Shared membership for 1 primary traveller plus up to 4 family dependants with individual digital passes.",
    isComplimentary: 0,
    tierLevel: 3,
    badgeColor: "amber",
    cardIncluded: 1,
    maxFamilyMembers: 4,
    isEventPass: 0,
    shortTermDays: null
  },
  {
    code: "pass-7day",
    name: "7-Day VisitPNG Tourist Pass",
    audience: "visitor",
    billingPeriod: "7-days",
    price: 45,
    currency: "PGK",
    description: "Short-term pass for conference delegates, festival visitors, and island holidaymakers.",
    isComplimentary: 0,
    tierLevel: 2,
    badgeColor: "blue",
    cardIncluded: 0,
    maxFamilyMembers: 0,
    isEventPass: 1,
    shortTermDays: 7
  }
];

// Default Provider Subscription Plans
const defaultProviderPlans = [
  {
    code: "listed-partner",
    name: "Listed Partner",
    tierLevel: 1,
    annualFee: 0,
    discountExpectationPct: 5,
    maxActiveOffers: 2,
    badgeTitle: "VisitPNG Listed Partner",
    description: "Entry-level operator profile with verified badge, searchable directory listing, and basic redemption reporting.",
    featuresJson: JSON.stringify(["Official Partner Badge", "Searchable Listing", "Up to 2 Active Member Offers", "Basic Redemption Dashboard"])
  },
  {
    code: "silver-partner",
    name: "Silver Partner",
    tierLevel: 2,
    annualFee: 220,
    discountExpectationPct: 8,
    maxActiveOffers: 4,
    badgeTitle: "VisitPNG Silver Partner",
    description: "Enhanced directory ranking, 4 simultaneous member offers, seasonal campaign participation, and customer analytics.",
    featuresJson: JSON.stringify(["Silver Partner Badge", "Enhanced Search Placement", "4 Simultaneous Member Offers", "Redemption Analytics", "Campaign Participation"])
  },
  {
    code: "gold-partner",
    name: "Gold Partner",
    tierLevel: 3,
    annualFee: 480,
    discountExpectationPct: 12,
    maxActiveOffers: 8,
    badgeTitle: "VisitPNG Gold Partner",
    description: "Priority search discovery, destination campaign eligibility, geographic & member tier targeting, and multi-branch support.",
    featuresJson: JSON.stringify(["Gold Partner Badge", "Priority Search Discovery", "8 Active Member Offers", "Geographic & Tier Targeting", "Promotional Push Notifications", "Multi-Branch Support"])
  },
  {
    code: "platinum-partner",
    name: "Platinum Resort Partner",
    tierLevel: 4,
    annualFee: 950,
    discountExpectationPct: 15,
    maxActiveOffers: 20,
    badgeTitle: "VisitPNG Platinum Resort Partner",
    description: "Top-tier premium visibility, homepage spotlight campaigns, member segmentation insights, priority marketing support, and POS API readiness.",
    featuresJson: JSON.stringify(["Platinum Partner Status", "Homepage Feature & Top Discovery", "Unlimited Member Offers", "Advanced Customer Segment Analytics", "VIP Concierge Integration", "POS / PMS Integration Ready"])
  }
];

// Initial High-Value Seed Offers across Papua New Guinea
const seedProviderOffers = [
  {
    providerId: 1,
    title: "15% Off Overwater Villa Stays & Marine Snorkeling",
    shortSummary: "Enjoy 15% discount on deluxe overwater suites and guided coral reef snorkeling excursions.",
    benefitType: "percentage_discount",
    discountPct: 15,
    normalPrice: 950,
    memberPrice: 807,
    applicableTiers: "explorer,adventurer,elite,family,pass",
    termsConditions: "Valid on bookings of 2 nights or more at Loloata Island Resort. Advance reservation required.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    isFeatured: 1
  },
  {
    providerId: 2,
    title: "Free Airport Transfer & Varirata Rainforest Birding Guide",
    shortSummary: "Receive complimentary private 4WD airport transfers and a guided Bird of Paradise nature walk.",
    benefitType: "complimentary_service",
    complimentaryItem: "Private 4WD Airport Transfer + Birding Guide",
    applicableTiers: "adventurer,elite,family",
    termsConditions: "Applicable upon booking standard Central Province 3-day exploration package.",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80",
    isFeatured: 1
  },
  {
    providerId: 3,
    title: "K 150 Off Kokoda Track Expeditions & Porter Support",
    shortSummary: "Special member rebate on 8-day or 10-day Kokoda Track guided historical crossings.",
    benefitType: "fixed_discount",
    discountAmount: 150,
    normalPrice: 4200,
    memberPrice: 4050,
    applicableTiers: "all",
    termsConditions: "Valid on all direct Kokoda trekking bookings throughout the season.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    isFeatured: 1
  },
  {
    providerId: 4,
    title: "Complimentary Deluxe Coral Suite Upgrade & Welcome Coconut",
    shortSummary: "Free upgrade to Deluxe Oceanfront Bungalow and fresh Kulau welcome drink on arrival.",
    benefitType: "upgrade",
    complimentaryItem: "Deluxe Bungalow Upgrade + Fresh Coconut Welcome",
    applicableTiers: "adventurer,elite",
    termsConditions: "Subject to room availability at check-in. Valid for Explorer, Adventurer and Elite members.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    isFeatured: 1
  },
  {
    providerId: 5,
    title: "Buy 1 Traditional Mumu Cultural Feast, Get 1 Free",
    shortSummary: "Experience authentic Earth-Oven Mumu feast with traditional singing and Bamboo band music.",
    benefitType: "buy_x_get_y",
    normalPrice: 160,
    memberPrice: 80,
    applicableTiers: "all",
    termsConditions: "Valid on Friday & Saturday cultural feast nights. Reservation required 24 hours in advance.",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    isFeatured: 1
  }
];

let ecosystemInitPromise: Promise<void> | null = null;

export async function ensureMembershipEcosystem() {
  if (ecosystemInitPromise) return ecosystemInitPromise;
  ecosystemInitPromise = (async () => {
    await ensureMembership();
    const d1 = env.DB;
    for (const sql of ecosystemSchemaStatements) {
      await d1.prepare(sql).run();
    }

  // Safe additive column migrations on existing tables
  const safeAlter = async (sql: string) => {
    try { await d1.prepare(sql).run(); } catch {}
  };

  await safeAlter("ALTER TABLE membership_plans ADD COLUMN tier_level INTEGER DEFAULT 1");
  await safeAlter("ALTER TABLE membership_plans ADD COLUMN badge_color TEXT DEFAULT 'teal'");
  await safeAlter("ALTER TABLE membership_plans ADD COLUMN card_included INTEGER DEFAULT 0");
  await safeAlter("ALTER TABLE membership_plans ADD COLUMN max_family_members INTEGER DEFAULT 0");
  await safeAlter("ALTER TABLE membership_plans ADD COLUMN is_event_pass INTEGER DEFAULT 0");
  await safeAlter("ALTER TABLE membership_plans ADD COLUMN short_term_days INTEGER");

  await safeAlter("ALTER TABLE membership_subscriptions ADD COLUMN membership_tier TEXT DEFAULT 'visitor'");
  await safeAlter("ALTER TABLE membership_subscriptions ADD COLUMN qr_secret_salt TEXT");
  await safeAlter("ALTER TABLE membership_subscriptions ADD COLUMN physical_card_status TEXT DEFAULT 'none'");
  await safeAlter("ALTER TABLE membership_subscriptions ADD COLUMN payment_method TEXT DEFAULT 'test_gateway'");
  await safeAlter("ALTER TABLE membership_subscriptions ADD COLUMN gifted_by_user_id INTEGER");
  await safeAlter("ALTER TABLE membership_subscriptions ADD COLUMN corporate_id INTEGER");

  // Seed default tourist plans
  for (const p of defaultTouristPlans) {
    await d1.prepare(`
      INSERT OR IGNORE INTO membership_plans 
      (code, name, audience, billing_period, price, currency, description, is_complimentary, tier_level, badge_color, card_included, max_family_members, is_event_pass, short_term_days, is_active, is_test_data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)
    `).bind(
      p.code, p.name, p.audience, p.billingPeriod, p.price, p.currency, p.description,
      p.isComplimentary, p.tierLevel, p.badgeColor, p.cardIncluded, p.maxFamilyMembers, p.isEventPass, p.shortTermDays
    ).run();
  }

  // Seed default provider plans
  for (const pp of defaultProviderPlans) {
    await d1.prepare(`
      INSERT OR IGNORE INTO provider_subscription_plans
      (code, name, tier_level, annual_fee, currency, discount_expectation_pct, max_active_offers, badge_title, description, features_json, is_active)
      VALUES (?, ?, ?, ?, 'ZMW', ?, ?, ?, ?, ?, 1)
    `).bind(
      pp.code, pp.name, pp.tierLevel, pp.annualFee, pp.discountExpectationPct, pp.maxActiveOffers, pp.badgeTitle, pp.description, pp.featuresJson
    ).run();
  }

  // Seed sample provider subscriptions and high-value offers
  const provCount = await d1.prepare("SELECT COUNT(*) AS count FROM provider_offers").first<{ count: number }>();
  if (Number(provCount?.count || 0) === 0) {
    const now = new Date().toISOString();
    const oneYear = new Date(Date.now() + 365 * 86400000).toISOString();

    for (let i = 1; i <= 5; i++) {
      await d1.prepare(`
        INSERT OR IGNORE INTO provider_subscriptions (provider_id, plan_id, status, start_date, expiry_date, auto_renew, verified_at, created_at)
        VALUES (?, ?, 'active', ?, ?, 1, ?, ?)
      `).bind(i, (i % 4) + 1, now, oneYear, now, now).run();
    }

    for (const off of seedProviderOffers) {
      await d1.prepare(`
        INSERT INTO provider_offers 
        (provider_id, title, short_summary, benefit_type, discount_pct, discount_amount, normal_price, member_price, complimentary_item, applicable_tiers, terms_conditions, image_url, approval_status, is_featured, start_date, end_date, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved', ?, ?, ?, ?)
      `).bind(
        off.providerId, off.title, off.shortSummary, off.benefitType, off.discountPct || null, off.discountAmount || null,
        off.normalPrice || null, off.memberPrice || null, off.complimentaryItem || null, off.applicableTiers, off.termsConditions,
        off.imageUrl || null, off.isFeatured, now, oneYear, now
      ).run();
    }
  }
  })();
  return ecosystemInitPromise;
}

// -------------------------------------------------------------
// DYNAMIC SECURE QR TOKEN ENGINE (Anti-Screenshot Rotation)
// -------------------------------------------------------------
export function generateDynamicQrToken(memberNumber: string, secretSalt: string = "vpng_secure_2026"): { token: string; expiresAt: number; formattedCode: string } {
  const currentWindow = Math.floor(Date.now() / (60 * 1000)); // 60-second rotation window
  const rawPayload = `${memberNumber}:${secretSalt}:${currentWindow}`;
  
  // Simple deterministic hash for QR token
  let hash = 0;
  for (let i = 0; i < rawPayload.length; i++) {
    hash = ((hash << 5) - hash) + rawPayload.charCodeAt(i);
    hash |= 0;
  }
  const tokenHex = Math.abs(hash).toString(16).toUpperCase().padStart(8, "0");
  const expiresAt = (currentWindow + 1) * 60 * 1000;
  
  return {
    token: `VPNGQR-${memberNumber}-${tokenHex}`,
    expiresAt,
    formattedCode: `${memberNumber.slice(0, 10)}...${tokenHex}`
  };
}

export function verifyDynamicQrToken(token: string, secretSalt: string = "vpng_secure_2026"): { isValid: boolean; memberNumber: string | null } {
  const parts = token.split("-");
  if (parts.length < 3 || parts[0] !== "VPNGQR") {
    // If not a dynamic token, check if it's a raw member number lookup
    if (token.startsWith("VPNG-")) return { isValid: true, memberNumber: token };
    return { isValid: false, memberNumber: null };
  }

  const memberNumber = parts.slice(1, -1).join("-");
  const tokenHex = parts[parts.length - 1];

  // Allow current 60s window or previous 60s window (clock skew tolerance)
  const currentWindow = Math.floor(Date.now() / (60 * 1000));
  for (const win of [currentWindow, currentWindow - 1]) {
    const rawPayload = `${memberNumber}:${secretSalt}:${win}`;
    let hash = 0;
    for (let i = 0; i < rawPayload.length; i++) {
      hash = ((hash << 5) - hash) + rawPayload.charCodeAt(i);
      hash |= 0;
    }
    const expectedHex = Math.abs(hash).toString(16).toUpperCase().padStart(8, "0");
    if (expectedHex === tokenHex) {
      return { isValid: true, memberNumber };
    }
  }

  return { isValid: false, memberNumber };
}

// -------------------------------------------------------------
// TOURIST MEMBERSHIP PROFILE & SAVINGS ANALYTICS
// -------------------------------------------------------------
export async function getTouristMembershipHub(identity: VisitPngUser) {
  await ensureMembershipEcosystem();
  const user = await getOrCreateAccount(identity);
  const d1 = env.DB;

  // 1. Available Tourist Plans
  const plans = await d1.prepare(`
    SELECT id, code, name, audience, billing_period AS billingPeriod, price, currency, description,
           is_complimentary AS isComplimentary, tier_level AS tierLevel, badge_color AS badgeColor,
           card_included AS cardIncluded, max_family_members AS maxFamilyMembers, is_event_pass AS isEventPass,
           short_term_days AS shortTermDays
    FROM membership_plans
    WHERE is_active = 1
    ORDER BY tier_level ASC, price ASC
  `).all<TouristPlan>();

  // 2. User's Active Subscription
  const sub = await d1.prepare(`
    SELECT s.id, s.member_number AS memberNumber, s.status, s.start_date AS startDate, s.expiry_date AS expiryDate,
           s.auto_renew AS autoRenew, s.membership_tier AS membershipTier, s.physical_card_status AS physicalCardStatus,
           s.qr_secret_salt AS qrSecretSalt, p.id AS planId, p.name AS planName, p.code AS planCode,
           p.tier_level AS tierLevel, p.badge_color AS badgeColor, p.price AS planPrice
    FROM membership_subscriptions s
    JOIN membership_plans p ON p.id = s.plan_id
    WHERE s.user_id = ? AND s.status IN ('active', 'complimentary', 'payment_due', 'grace_period', 'trial')
    ORDER BY s.created_at DESC
    LIMIT 1
  `).bind(user.id).first<Record<string, unknown>>();

  // Generate dynamic rotating QR token for digital card
  let dynamicQr: { token: string; expiresAt: number; formattedCode: string } | null = null;
  if (sub && (sub.status === "active" || sub.status === "complimentary")) {
    const salt = (sub.qrSecretSalt as string) || `salt_${user.id}_vpng`;
    dynamicQr = generateDynamicQrToken(sub.memberNumber as string, salt);
  }

  // 3. Family / Group Members
  const familyMembers = sub ? await d1.prepare(`
    SELECT id, full_name AS fullName, relationship, member_number AS memberNumber, status, created_at AS createdAt
    FROM family_group_members
    WHERE primary_subscription_id = ?
    ORDER BY id ASC
  `).bind(sub.id).all() : { results: [] };

  // 4. Redemptions & Member Savings Calculation
  const redemptions = sub ? await d1.prepare(`
    SELECT r.id, r.redemption_ref AS redemptionRef, r.original_amount AS originalAmount,
           r.discount_amount AS discountAmount, r.final_amount AS finalAmount,
           r.benefit_summary AS benefitSummary, r.created_at AS createdAt,
           p.trading_name AS providerName, o.title AS offerTitle, o.benefit_type AS benefitType
    FROM partner_redemptions r
    JOIN providers p ON p.id = r.provider_id
    JOIN provider_offers o ON o.id = r.offer_id
    WHERE r.user_id = ?
    ORDER BY r.created_at DESC
    LIMIT 30
  `).bind(user.id).all<Record<string, unknown>>() : { results: [] };

  // Calculate Savings & ROI
  const totalDiscounts = redemptions.results.reduce((acc, r) => acc + (Number(r.discountAmount) || 0), 0);
  const membershipCost = Number(sub?.planPrice || 0);
  const netSavings = totalDiscounts - membershipCost;
  const roiMultiplier = membershipCost > 0 ? (totalDiscounts / membershipCost).toFixed(1) : "N/A";

  // 5. My PNG Passport Stamps
  const stamps = await d1.prepare(`
    SELECT id, destination_name AS destinationName, province_name AS provinceName,
           stamp_title AS stampTitle, icon_badge AS iconBadge, points_awarded AS pointsAwarded,
           unlocked_at AS unlockedAt
    FROM passport_stamps
    WHERE user_id = ?
    ORDER BY unlocked_at DESC
  `).bind(user.id).all<PassportStamp>();

  // 6. Reward Points Ledger
  const points = await d1.prepare("SELECT COALESCE(SUM(points), 0) AS balance FROM loyalty_ledger WHERE user_id = ?").bind(user.id).first<{ balance: number }>();

  // 7. Physical Card Order Status
  const physicalCard = sub ? await d1.prepare(`
    SELECT id, member_number AS memberNumber, card_tier AS cardTier, production_status AS productionStatus,
           dispatched_at AS dispatchedAt, tracking_number AS trackingNumber, delivery_address AS deliveryAddress,
           created_at AS createdAt
    FROM membership_cards
    WHERE user_id = ?
    ORDER BY id DESC
    LIMIT 1
  `).bind(user.id).first<PhysicalCardRecord>() : null;

  return {
    memberName: user.preferredName || user.fullName || identity.email,
    userEmail: identity.email,
    plans: plans.results,
    subscription: sub || null,
    dynamicQr,
    familyMembers: familyMembers.results,
    redemptions: redemptions.results,
    savings: {
      totalDiscounts: Math.round(totalDiscounts * 100) / 100,
      membershipCost,
      netSavings: Math.round(netSavings * 100) / 100,
      roiMultiplier,
      redemptionsCount: redemptions.results.length,
      valuableMessage: netSavings > 0 
        ? `You have saved K ${Math.round(netSavings)} more than your membership cost!`
        : `Use your card at participating partners to unlock great discounts across Zambia.`
    },
    passportStamps: stamps.results,
    pointsBalance: Number(points?.balance || 0),
    physicalCard
  };
}

// -------------------------------------------------------------
// PROVIDER OFFER DISCOVERY & DESTINATION BUNDLES
// -------------------------------------------------------------
export async function getDiscoverableOffers(params: {
  categorySlug?: string;
  provinceCode?: string;
  destinationSlug?: string;
  tier?: string;
  search?: string;
}) {
  await ensureMembershipEcosystem();
  const d1 = env.DB;

  let query = `
    SELECT o.id, o.provider_id AS providerId, o.title, o.short_summary AS shortSummary,
           o.benefit_type AS benefitType, o.discount_pct AS discountPct, o.discount_amount AS discountAmount,
           o.normal_price AS normalPrice, o.member_price AS memberPrice, o.complimentary_item AS complimentaryItem,
           o.applicable_tiers AS applicableTiers, o.terms_conditions AS termsConditions, o.image_url AS imageUrl,
           o.is_featured AS isFeatured, p.trading_name AS providerName, p.slug AS providerSlug,
           psp.name AS providerTier, psp.badge_title AS badgeTitle, d.name AS destinationName,
           prov.name AS provinceName, prov.region AS regionName
    FROM provider_offers o
    JOIN providers p ON p.id = o.provider_id
    LEFT JOIN provider_subscriptions ps ON ps.provider_id = p.id AND ps.status = 'active'
    LEFT JOIN provider_subscription_plans psp ON psp.id = ps.plan_id
    LEFT JOIN destinations d ON d.id = p.destination_id
    LEFT JOIN provinces prov ON prov.id = p.province_id
    WHERE o.approval_status = 'approved'
  `;

  const binds: unknown[] = [];
  if (params.search && params.search.trim()) {
    query += ` AND (o.title LIKE ? OR o.short_summary LIKE ? OR p.trading_name LIKE ? OR d.name LIKE ? OR prov.name LIKE ?)`;
    const s = `%${params.search.trim()}%`;
    binds.push(s, s, s, s, s);
  }

  query += ` ORDER BY o.is_featured DESC, psp.tier_level DESC, o.id DESC LIMIT 50`;
  const stmt = d1.prepare(query);
  const rows = binds.length ? await stmt.bind(...binds).all() : await stmt.all();

  return {
    offers: rows.results,
    destinations: [
      { name: "Port Moresby", province: "National Capital District", offerCount: 4, coverImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80" },
      { name: "Kokopo & Rabaul", province: "East New Britain", offerCount: 3, coverImg: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80" },
      { name: "Mount Hagen", province: "Western Highlands", offerCount: 2, coverImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80" },
      { name: "Madang Coast", province: "Madang", offerCount: 3, coverImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80" },
      { name: "Kokoda Trail", province: "Central / Oro", offerCount: 2, coverImg: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&auto=format&fit=crop&q=80" },
      { name: "Sepik River", province: "East Sepik", offerCount: 2, coverImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80" }
    ]
  };
}

// -------------------------------------------------------------
// PROVIDER REDEMPTION WORKFLOW & VERIFICATION TERMINAL
// -------------------------------------------------------------
export async function verifyMemberForProvider(tokenOrMemberNumber: string, providerId: number = 1) {
  await ensureMembershipEcosystem();
  const d1 = env.DB;

  const verifiedToken = verifyDynamicQrToken(tokenOrMemberNumber);
  if (!verifiedToken.isValid || !verifiedToken.memberNumber) {
    return {
      isValid: false,
      reason: "Invalid or expired QR verification token. Please ask member to present an active digital card."
    };
  }

  const memberNumber = verifiedToken.memberNumber;
  const sub = await d1.prepare(`
    SELECT s.id, s.member_number AS memberNumber, s.status, s.start_date AS startDate, s.expiry_date AS expiryDate,
           s.membership_tier AS membershipTier, u.id AS userId, u.full_name AS fullName, u.preferred_name AS preferredName,
           u.email, p.name AS planName, p.tier_level AS tierLevel, p.badge_color AS badgeColor
    FROM membership_subscriptions s
    JOIN users u ON u.id = s.user_id
    JOIN membership_plans p ON p.id = s.plan_id
    WHERE s.member_number = ?
    LIMIT 1
  `).bind(memberNumber).first<Record<string, unknown>>();

  if (!sub) {
    return { isValid: false, reason: "Membership number not found in system." };
  }

  const isCurrent = ["active", "complimentary"].includes(sub.status as string);
  if (!isCurrent) {
    return {
      isValid: false,
      reason: `Membership status is ${sub.status}. Renewal or payment required.`
    };
  }

  // Fetch applicable offers for this provider and this member tier
  const offers = await d1.prepare(`
    SELECT id, title, short_summary AS shortSummary, benefit_type AS benefitType,
           discount_pct AS discountPct, discount_amount AS discountAmount,
           normal_price AS normalPrice, member_price AS memberPrice,
           complimentary_item AS complimentaryItem, applicable_tiers AS applicableTiers,
           terms_conditions AS termsConditions
    FROM provider_offers
    WHERE provider_id = ? AND approval_status = 'approved'
  `).bind(providerId).all<Record<string, unknown>>();

  return {
    isValid: true,
    member: {
      subscriptionId: sub.id,
      userId: sub.userId,
      name: sub.preferredName || sub.fullName || sub.email,
      memberNumber: sub.memberNumber,
      tier: sub.membershipTier || "explorer",
      tierName: sub.planName,
      badgeColor: sub.badgeColor,
      status: sub.status,
      expiryDate: sub.expiryDate
    },
    eligibleOffers: offers.results
  };
}

export async function processProviderRedemption(input: {
  subscriptionId: number;
  userId: number;
  providerId: number;
  offerId: number;
  originalAmount: number;
  branchName?: string;
  staffName?: string;
  verificationMethod?: string;
}) {
  await ensureMembershipEcosystem();
  const d1 = env.DB;

  const offer = await d1.prepare(`
    SELECT id, title, benefit_type AS benefitType, discount_pct AS discountPct,
           discount_amount AS discountAmount, normal_price AS normalPrice,
           member_price AS memberPrice, complimentary_item AS complimentaryItem
    FROM provider_offers
    WHERE id = ?
  `).bind(input.offerId).first<Record<string, unknown>>();

  if (!offer) throw new Error("Offer not found");

  const original = Number(input.originalAmount) || Number(offer.normalPrice) || 0;
  let discount = 0;
  let summary = "";

  if (offer.benefitType === "percentage_discount" && offer.discountPct) {
    discount = Math.round((original * (Number(offer.discountPct) / 100)) * 100) / 100;
    summary = `${offer.discountPct}% Member Discount`;
  } else if (offer.benefitType === "fixed_discount" && offer.discountAmount) {
    discount = Math.min(original, Number(offer.discountAmount));
    summary = `K ${offer.discountAmount} Member Rebate`;
  } else if (offer.benefitType === "member_price" && offer.normalPrice && offer.memberPrice) {
    discount = Math.max(0, Number(offer.normalPrice) - Number(offer.memberPrice));
    summary = `Member Exclusive Rate (Saved K ${discount})`;
  } else {
    discount = 0;
    summary = (offer.complimentaryItem as string) || (offer.title as string);
  }

  const finalAmount = Math.max(0, Math.round((original - discount) * 100) / 100);
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randCode = Math.floor(100000 + Math.random() * 900000);
  const redemptionRef = `VPNG-RDM-${dateStr}-${randCode}`;

  await d1.prepare(`
    INSERT INTO partner_redemptions
    (redemption_ref, subscription_id, user_id, provider_id, offer_id, branch_name, staff_name,
     original_amount, discount_amount, final_amount, benefit_summary, verification_method, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed', ?)
  `).bind(
    redemptionRef, input.subscriptionId, input.userId, input.providerId, input.offerId,
    input.branchName || "Main Branch", input.staffName || "Cashier",
    original, discount, finalAmount, summary, input.verificationMethod || "dynamic_qr", now.toISOString()
  ).run();

  // Award 50 bonus loyalty points to member
  await d1.prepare(`
    INSERT INTO loyalty_ledger (user_id, points, reason, reference_type, reference_id, created_at)
    VALUES (?, 50, 'partner_redemption', 'redemption', ?, ?)
  `).bind(input.userId, redemptionRef, now.toISOString()).run();

  // Auto-award Passport Stamp if available for this destination
  const prov = await d1.prepare("SELECT destination_id FROM providers WHERE id = ?").bind(input.providerId).first<{ destination_id: number }>();
  if (prov?.destination_id) {
    const dest = await d1.prepare("SELECT d.name, p.name AS prov_name FROM destinations d JOIN provinces p ON p.id = d.province_id WHERE d.id = ?").bind(prov.destination_id).first<{ name: string; prov_name: string }>();
    if (dest) {
      const existingStamp = await d1.prepare("SELECT id FROM passport_stamps WHERE user_id = ? AND destination_name = ?").bind(input.userId, dest.name).first();
      if (!existingStamp) {
        await d1.prepare(`
          INSERT INTO passport_stamps (user_id, destination_name, province_name, partner_provider_id, stamp_title, icon_badge, points_awarded, unlocked_at)
          VALUES (?, ?, ?, ?, ?, '★', 50, ?)
        `).bind(input.userId, dest.name, dest.prov_name, input.providerId, `Explorer of ${dest.name}`, now.toISOString()).run();
      }
    }
  }

  return {
    success: true,
    redemptionRef,
    originalAmount: original,
    discountAmount: discount,
    finalAmount,
    benefitSummary: summary,
    createdAt: now.toISOString()
  };
}

// -------------------------------------------------------------
// ADMIN ECOSYSTEM CONTROL CENTER
// -------------------------------------------------------------
export async function getAdminMembershipOverview() {
  await ensureMembershipEcosystem();
  const d1 = env.DB;

  // 1. KPI Stats
  const touristCount = await d1.prepare("SELECT COUNT(*) AS count FROM membership_subscriptions WHERE status IN ('active','complimentary')").first<{ count: number }>();
  const providerCount = await d1.prepare("SELECT COUNT(*) AS count FROM provider_subscriptions WHERE status = 'active'").first<{ count: number }>();
  const redemptionStats = await d1.prepare("SELECT COUNT(*) AS count, COALESCE(SUM(discount_amount), 0) AS totalSaved, COALESCE(SUM(final_amount), 0) AS totalSpend FROM partner_redemptions").first<{ count: number; totalSaved: number; totalSpend: number }>();
  const pendingOffersCount = await d1.prepare("SELECT COUNT(*) AS count FROM provider_offers WHERE approval_status = 'submitted'").first<{ count: number }>();
  const cardRequestsCount = await d1.prepare("SELECT COUNT(*) AS count FROM membership_cards WHERE production_status = 'requested'").first<{ count: number }>();

  // 2. Tourist Subscriptions Table
  const touristSubs = await d1.prepare(`
    SELECT s.id, s.member_number AS memberNumber, s.status, s.start_date AS startDate, s.expiry_date AS expiryDate,
           s.membership_tier AS membershipTier, s.physical_card_status AS physicalCardStatus, u.full_name AS fullName,
           u.email, p.name AS planName, p.price AS price
    FROM membership_subscriptions s
    JOIN users u ON u.id = s.user_id
    JOIN membership_plans p ON p.id = s.plan_id
    ORDER BY s.created_at DESC
    LIMIT 50
  `).all<Record<string, unknown>>();

  // 3. Provider Subscriptions Table
  const providerSubs = await d1.prepare(`
    SELECT ps.id, p.trading_name AS providerName, p.slug AS providerSlug, psp.name AS tierName,
           psp.badge_title AS badgeTitle, ps.status, ps.start_date AS startDate, ps.expiry_date AS expiryDate
    FROM provider_subscriptions ps
    JOIN providers p ON p.id = ps.provider_id
    JOIN provider_subscription_plans psp ON psp.id = ps.plan_id
    ORDER BY ps.id DESC
    LIMIT 50
  `).all<Record<string, unknown>>();

  // 4. Provider Offers Moderation Queue
  const offersQueue = await d1.prepare(`
    SELECT o.id, o.title, o.benefit_type AS benefitType, o.discount_pct AS discountPct,
           o.discount_amount AS discountAmount, o.normal_price AS normalPrice, o.member_price AS memberPrice,
           o.complimentary_item AS complimentaryItem, o.approval_status AS approvalStatus,
           o.created_at AS createdAt, p.trading_name AS providerName
    FROM provider_offers o
    JOIN providers p ON p.id = o.provider_id
    ORDER BY CASE WHEN o.approval_status = 'submitted' THEN 0 ELSE 1 END, o.id DESC
    LIMIT 50
  `).all<Record<string, unknown>>();

  // 5. Physical Cards Queue
  const cardQueue = await d1.prepare(`
    SELECT c.id, c.member_number AS memberNumber, c.card_tier AS cardTier, c.production_status AS productionStatus,
           c.delivery_address AS deliveryAddress, c.tracking_number AS trackingNumber, c.created_at AS createdAt,
           u.full_name AS memberName, u.email
    FROM membership_cards c
    JOIN users u ON u.id = c.user_id
    ORDER BY CASE WHEN c.production_status = 'requested' THEN 0 ELSE 1 END, c.id DESC
    LIMIT 50
  `).all<Record<string, unknown>>();

  // 6. Redemptions Ledger
  const redemptions = await d1.prepare(`
    SELECT r.id, r.redemption_ref AS redemptionRef, r.original_amount AS originalAmount,
           r.discount_amount AS discountAmount, r.final_amount AS finalAmount,
           r.benefit_summary AS benefitSummary, r.branch_name AS branchName,
           r.status, r.created_at AS createdAt, p.trading_name AS providerName,
           u.full_name AS memberName, u.email AS memberEmail
    FROM partner_redemptions r
    JOIN providers p ON p.id = r.provider_id
    JOIN users u ON u.id = r.user_id
    ORDER BY r.id DESC
    LIMIT 50
  `).all<Record<string, unknown>>();

  return {
    stats: {
      activeTourists: touristCount?.count || 0,
      activeProviders: providerCount?.count || 0,
      totalRedemptions: redemptionStats?.count || 0,
      totalMemberSavings: Math.round(Number(redemptionStats?.totalSaved || 0)),
      totalAssociatedSpend: Math.round(Number(redemptionStats?.totalSpend || 0)),
      pendingOffers: pendingOffersCount?.count || 0,
      pendingCards: cardRequestsCount?.count || 0
    },
    touristSubs: touristSubs.results,
    providerSubs: providerSubs.results,
    offersQueue: offersQueue.results,
    cardQueue: cardQueue.results,
    redemptions: redemptions.results
  };
}

export async function updateAdminOfferStatus(offerId: number, status: "approved" | "rejected" | "suspended", adminEmail: string) {
  await ensureMembershipEcosystem();
  const d1 = env.DB;
  await d1.prepare(`
    UPDATE provider_offers
    SET approval_status = ?, approved_by = ?
    WHERE id = ?
  `).bind(status, adminEmail, offerId).run();
}

export async function updateAdminCardStatus(cardId: number, status: "approved" | "printing" | "dispatched" | "delivered" | "cancelled", trackingNumber?: string) {
  await ensureMembershipEcosystem();
  const d1 = env.DB;
  const now = new Date().toISOString();
  await d1.prepare(`
    UPDATE membership_cards
    SET production_status = ?, tracking_number = COALESCE(?, tracking_number),
        dispatched_at = CASE WHEN ? = 'dispatched' THEN ? ELSE dispatched_at END
    WHERE id = ?
  `).bind(status, trackingNumber || null, status, now, cardId).run();
}

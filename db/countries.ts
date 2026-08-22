import { env } from "./runtime";

export interface Country {
  id: number;
  code: string;
  name: string;
  currencyCode: string;
  currencySymbol: string;
  defaultLocale: string;
  phoneCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CountrySettings {
  id: number;
  countryId: number;
  domain: string | null;
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  brandColor: string;
  accentColor: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  mapCenterLat: number;
  mapCenterLng: number;
  mapDefaultZoom: number;
  taxRate: number;
  commissionRate: number;
  emergencyNumbers: string;
  supportEmail: string;
  supportPhone: string;
  featureFlags: string; // JSON string of feature flags
  createdAt: string;
  updatedAt: string;
}

export interface CountryWithSettings extends Country {
  settings: CountrySettings | null;
}

export async function ensureCountries(): Promise<void> {
  // 1. Create countries table
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS countries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      currency_code TEXT NOT NULL DEFAULT 'ZMW',
      currency_symbol TEXT NOT NULL DEFAULT 'ZK',
      default_locale TEXT NOT NULL DEFAULT 'en',
      phone_code TEXT NOT NULL DEFAULT '+260',
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `).run();

  // 2. Create country_settings table
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS country_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_id INTEGER NOT NULL UNIQUE REFERENCES countries(id) ON DELETE CASCADE,
      domain TEXT,
      hero_title TEXT NOT NULL,
      hero_subtitle TEXT NOT NULL,
      hero_eyebrow TEXT NOT NULL,
      brand_color TEXT NOT NULL DEFAULT '#1B6960',
      accent_color TEXT NOT NULL DEFAULT '#DE7739',
      logo_url TEXT,
      favicon_url TEXT,
      map_center_lat REAL NOT NULL DEFAULT -13.133897,
      map_center_lng REAL NOT NULL DEFAULT 27.849332,
      map_default_zoom INTEGER NOT NULL DEFAULT 6,
      tax_rate REAL NOT NULL DEFAULT 0.16,
      commission_rate REAL NOT NULL DEFAULT 0.05,
      emergency_numbers TEXT NOT NULL DEFAULT '{"police":"999","ambulance":"991","fire":"993"}',
      support_email TEXT NOT NULL DEFAULT 'info@zamroam.com',
      support_phone TEXT NOT NULL DEFAULT '+260573506598',
      feature_flags TEXT NOT NULL DEFAULT '{"memberships":true,"deals":true,"bookings":true,"events":true,"reviews":true,"wantokAi":true,"trails":true,"permits":true}',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `).run();

  // 3. Add additive country_id columns to existing tables if missing
  const tablesToScope = [
    "provinces",
    "destinations",
    "categories",
    "providers",
    "listings",
    "membership_plans",
    "provider_subscription_plans",
    "audit_logs"
  ];

  for (const table of tablesToScope) {
    try {
      await env.DB.prepare(`ALTER TABLE ${table} ADD COLUMN country_id INTEGER REFERENCES countries(id)`).run();
    } catch {
      // Column already exists, safe to ignore
    }
  }

  // 4. Seed Default Country: Zambia
  const now = new Date().toISOString();

  const zambiaExisting = await env.DB.prepare("SELECT id FROM countries WHERE UPPER(code)='ZMB' OR UPPER(code)='ZM'").first<{ id: number }>();
  let zambiaId = zambiaExisting?.id;
  if (!zambiaId) {
    await env.DB.prepare(`
      INSERT INTO countries (code, name, currency_code, currency_symbol, default_locale, phone_code, is_active, created_at, updated_at)
      VALUES ('ZMB', 'Zambia', 'ZMW', 'ZK', 'en', '+260', 1, ?, ?)
    `).bind(now, now).run();
    const created = await env.DB.prepare("SELECT id FROM countries WHERE UPPER(code)='ZMB'").first<{ id: number }>();
    zambiaId = created?.id || 1;
  }

  // Zambia Settings
  const zambiaSettingsExisting = await env.DB.prepare("SELECT id FROM country_settings WHERE country_id=?").bind(zambiaId).first();
  if (!zambiaSettingsExisting) {
    await env.DB.prepare(`
      INSERT INTO country_settings (
        country_id, domain, hero_title, hero_subtitle, hero_eyebrow,
        brand_color, accent_color, map_center_lat, map_center_lng, map_default_zoom,
        tax_rate, commission_rate, emergency_numbers, support_email, support_phone,
        feature_flags, created_at, updated_at
      ) VALUES (
        ?, 'zamroam.com', 'Discover the Wonders\nof Zambia.',
        'Experience the majestic Victoria Falls, world-class walking safaris, traditional ceremonies, and legendary African hospitality.',
        'THE REAL AFRICA', '#1B6960', '#DE7739', -13.133897, 27.849332, 6,
        0.16, 0.05, '{"police":"999","ambulance":"991","fire":"993"}', 'info@zamroam.com', '+260573506598',
        '{"memberships":true,"deals":true,"bookings":true,"events":true,"reviews":true,"wantokAi":true,"trails":true,"permits":true}',
        ?, ?
      )
    `).bind(zambiaId, now, now).run();
  }

  // 5. Backfill existing records with country_id = zambiaId if NULL
  if (zambiaId) {
    for (const table of tablesToScope) {
      try {
        await env.DB.prepare(`UPDATE ${table} SET country_id=? WHERE country_id IS NULL`).bind(zambiaId).run();
      } catch {
        // Safe skip
      }
    }
  }
}

export async function getAllCountries(): Promise<CountryWithSettings[]> {
  await ensureCountries();
  const countries = await env.DB.prepare(`
    SELECT id, code, name, currency_code AS currencyCode, currency_symbol AS currencySymbol,
           default_locale AS defaultLocale, phone_code AS phoneCode,
           is_active AS isActive, created_at AS createdAt, updated_at AS updatedAt
    FROM countries WHERE is_active=1 ORDER BY name
  `).all<Country>();

  const results: CountryWithSettings[] = [];
  for (const c of countries.results) {
    const settings = await env.DB.prepare(`
      SELECT id, country_id AS countryId, domain, hero_title AS heroTitle, hero_subtitle AS heroSubtitle,
             hero_eyebrow AS heroEyebrow, brand_color AS brandColor, accent_color AS accentColor,
             logo_url AS logoUrl, favicon_url AS faviconUrl, map_center_lat AS mapCenterLat,
             map_center_lng AS mapCenterLng, map_default_zoom AS mapDefaultZoom, tax_rate AS taxRate,
             commission_rate AS commissionRate, emergency_numbers AS emergencyNumbers,
             support_email AS supportEmail, support_phone AS supportPhone, feature_flags AS featureFlags,
             created_at AS createdAt, updated_at AS updatedAt
      FROM country_settings WHERE country_id=?
    `).bind(c.id).first<CountrySettings>();

    results.push({ ...c, isActive: Boolean(c.isActive), settings: settings ?? null });
  }

  return results;
}

export async function getCountryByCode(code: string): Promise<CountryWithSettings | null> {
  await ensureCountries();
  const normalized = (code || "ZMB").toUpperCase();
  let country = await env.DB.prepare(`
    SELECT id, code, name, currency_code AS currencyCode, currency_symbol AS currencySymbol,
           default_locale AS defaultLocale, phone_code AS phoneCode,
           is_active AS isActive, created_at AS createdAt, updated_at AS updatedAt
    FROM countries WHERE UPPER(code)=?
  `).bind(normalized).first<Country>();

  if (!country) {
    country = await env.DB.prepare(`
      SELECT id, code, name, currency_code AS currencyCode, currency_symbol AS currencySymbol,
             default_locale AS defaultLocale, phone_code AS phoneCode,
             is_active AS isActive, created_at AS createdAt, updated_at AS updatedAt
      FROM countries WHERE UPPER(code)='ZMB' OR UPPER(code)='ZM'
    `).first<Country>();
  }

  if (!country) return null;

  const settings = await env.DB.prepare(`
    SELECT id, country_id AS countryId, domain, hero_title AS heroTitle, hero_subtitle AS heroSubtitle,
           hero_eyebrow AS heroEyebrow, brand_color AS brandColor, accent_color AS accentColor,
           logo_url AS logoUrl, favicon_url AS faviconUrl, map_center_lat AS mapCenterLat,
           map_center_lng AS mapCenterLng, map_default_zoom AS mapDefaultZoom, tax_rate AS taxRate,
           commission_rate AS commissionRate, emergency_numbers AS emergencyNumbers,
           support_email AS supportEmail, support_phone AS supportPhone, feature_flags AS featureFlags,
           created_at AS createdAt, updated_at AS updatedAt
      FROM country_settings WHERE country_id=?
  `).bind(country.id).first<CountrySettings>();

  return { ...country, isActive: Boolean(country.isActive), settings: settings ?? null };
}

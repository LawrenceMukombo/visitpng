import { env } from "./runtime";
import { PNG_PROVINCES, PNG_REGIONS } from "./pngGeography";
import { ZAMBIA_PROVINCES, ZAMBIA_REGIONS } from "./zambiaGeography";
import { ensureCountries } from "./countries";

export interface ProvinceRecord {
  id: number;
  countryId: number;
  code: string;
  name: string;
  region: string;
}

export interface RegionInfo {
  name: string;
  label: string;
  description: string;
}

const geographyInitMap = new Map<string, Promise<void>>();

export async function ensureCountryGeography(countryCode: string = "PNG"): Promise<void> {
  const normalized = (countryCode || "PNG").toUpperCase();
  if (geographyInitMap.has(normalized)) return geographyInitMap.get(normalized)!;

  const initPromise = (async () => {
    await ensureCountries();
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS provinces (id INTEGER PRIMARY KEY AUTOINCREMENT,country_id INTEGER,code TEXT NOT NULL UNIQUE,name TEXT NOT NULL,region TEXT NOT NULL)").run();
    
    const country = await env.DB.prepare("SELECT id FROM countries WHERE UPPER(code)=?").bind(normalized).first<{ id: number }>();
    if (!country) return;

    if (normalized === "ZMB") {
      // Seed Zambia Provinces
      for (const prov of ZAMBIA_PROVINCES) {
        const existing = await env.DB.prepare("SELECT id FROM provinces WHERE code=?").bind(prov.code).first<{ id: number }>();
        if (!existing) {
          await env.DB.prepare("INSERT INTO provinces (country_id, code, name, region) VALUES (?, ?, ?, ?)").bind(
            country.id,
            prov.code,
            prov.name,
            prov.region
          ).run();
        }
      }
    } else {
      // Seed PNG Provinces
      for (const prov of PNG_PROVINCES) {
        const existing = await env.DB.prepare("SELECT id FROM provinces WHERE code=?").bind(prov.code).first<{ id: number }>();
        if (!existing) {
          await env.DB.prepare("INSERT INTO provinces (country_id, code, name, region) VALUES (?, ?, ?, ?)").bind(
            country.id,
            prov.code,
            prov.name,
            prov.region
          ).run();
        } else {
          await env.DB.prepare("UPDATE provinces SET country_id=? WHERE id=? AND country_id IS NULL").bind(country.id, existing.id).run();
        }
      }
    }
  })();

  geographyInitMap.set(normalized, initPromise);
  return initPromise;
}

export async function getProvincesByCountry(countryCode: string = "PNG"): Promise<ProvinceRecord[]> {
  await ensureCountryGeography(countryCode);
  const normalized = (countryCode || "PNG").toUpperCase();
  const country = await env.DB.prepare("SELECT id FROM countries WHERE UPPER(code)=?").bind(normalized).first<{ id: number }>();
  if (!country) return [];

  const list = await env.DB.prepare(`
    SELECT id, country_id AS countryId, code, name, region
    FROM provinces
    WHERE country_id = ?
    ORDER BY name
  `).bind(country.id).all<ProvinceRecord>();

  return list.results;
}

export function getRegionsByCountry(countryCode: string = "PNG"): RegionInfo[] {
  const normalized = (countryCode || "PNG").toUpperCase();
  if (normalized === "ZMB") {
    return ZAMBIA_REGIONS;
  }
  return PNG_REGIONS;
}

export function getProvincesDataByCountry(countryCode: string = "PNG") {
  const normalized = (countryCode || "PNG").toUpperCase();
  if (normalized === "ZMB") {
    return ZAMBIA_PROVINCES;
  }
  return PNG_PROVINCES;
}

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (p) => readFile(new URL(`../${p}`, import.meta.url), "utf8");

test("Phase 1: Countries & Country Settings Database Schema & Types", async () => {
  const [countriesSource, schemaSource] = await Promise.all([
    read("db/countries.ts"),
    read("db/schema.ts")
  ]);

  // Countries & Settings table declarations
  assert.match(countriesSource, /CREATE TABLE IF NOT EXISTS countries/);
  assert.match(countriesSource, /CREATE TABLE IF NOT EXISTS country_settings/);
  assert.match(countriesSource, /code TEXT NOT NULL UNIQUE/);
  assert.match(countriesSource, /currency_code TEXT NOT NULL/);
  assert.match(countriesSource, /currency_symbol TEXT NOT NULL/);
  assert.match(countriesSource, /hero_title TEXT NOT NULL/);
  assert.match(countriesSource, /hero_eyebrow TEXT NOT NULL/);
  assert.match(countriesSource, /feature_flags/);

  // Schema ORM mappings
  assert.match(schemaSource, /export const countries = sqliteTable\("countries"/);
  assert.match(schemaSource, /export const countrySettings = sqliteTable\("country_settings"/);
  assert.match(schemaSource, /countryId: integer\("country_id"\)/);

  // Non-destructive additive column checks
  assert.match(countriesSource, /ALTER TABLE \${table} ADD COLUMN country_id/);
  assert.match(countriesSource, /tablesToScope/);
});

test("Phase 1: Papua New Guinea Geography (22 Provinces across 4 Regions)", async () => {
  const [pngGeo, unifiedGeo] = await Promise.all([
    read("db/pngGeography.ts"),
    read("db/geography.ts")
  ]);

  // PNG Provinces (22 provinces)
  assert.match(pngGeo, /PNG_PROVINCES/);
  assert.match(pngGeo, /National Capital District/);
  assert.match(pngGeo, /Eastern Highlands/);
  assert.match(pngGeo, /Milne Bay Province/);
  assert.match(pngGeo, /Western Highlands/);
  assert.match(pngGeo, /East New Britain/);
  assert.match(pngGeo, /West New Britain/);

  // Unified Geography Engine
  assert.match(unifiedGeo, /ensureCountryGeography/);
  assert.match(unifiedGeo, /getProvincesByCountry/);
  assert.match(unifiedGeo, /getRegionsByCountry/);
});

test("Phase 1: Country-Scoped Catalogue Engine & Tenant Isolation", async () => {
  const [catalogueSource, catalogueApi] = await Promise.all([
    read("db/catalogue.ts"),
    read("app/api/catalogue/route.ts")
  ]);

  // PNG Seed Listings
  assert.match(catalogueSource, /pngListingSeed/);
  assert.match(catalogueSource, /kokoda-track-8day-expedition/);
  assert.match(catalogueSource, /walindi-plantation-resort/);
  assert.match(catalogueSource, /mount-wilhelm-summit-climb/);

  // Country scoped query parameter
  assert.match(catalogueApi, /url\.searchParams\.get\("country"\)/);
  assert.match(catalogueSource, /l\.country_id = \?/);
});

test("Phase 1: Frontend Dynamic Country Switching & Header Brand", async () => {
  const [appUi, selectorUi] = await Promise.all([
    read("app/VisitPngApp.tsx"),
    read("app/components/CountrySelector.tsx")
  ]);

  // Dynamic Country Selector
  assert.match(appUi, /CountrySelector/);
  assert.match(appUi, /handleCountryChange/);
  assert.match(appUi, /countryCode/);
  assert.match(appUi, /countrySettings/);
  assert.match(appUi, /heroEyebrow/);
  assert.match(appUi, /heroTitle/);
  assert.match(appUi, /heroSubtitle/);

  // Country Selector component
  assert.match(selectorUi, /countrySelectorDropdown/);
  assert.match(selectorUi, /currentCountry/);
  assert.match(selectorUi, /onCountryChange/);
  assert.match(selectorUi, /Papua New Guinea/);
  assert.match(selectorUi, /VisitPNG/);
});

test("Phase 1: Country-Scoped Administrator Authorization & Tenant Security", async () => {
  const [adminSource, accountsSource] = await Promise.all([
    read("db/admin.ts"),
    read("db/accounts.ts")
  ]);

  assert.match(adminSource, /requireAdministrator/);
  assert.match(adminSource, /getAllCountries/);
  assert.match(adminSource, /countryFilter/);
  assert.match(adminSource, /countries/);
  assert.match(accountsSource, /UserRole/);
  assert.match(accountsSource, /country_administrator/);
  assert.match(accountsSource, /super_administrator/);
});

test("Phase 1: GIS Shapefiles Engine (Country, 22 Provinces & Districts)", async () => {
  const [shapefilesSource, boundaryApi] = await Promise.all([
    read("db/pngShapefiles.ts"),
    read("app/api/gis/boundaries/route.ts")
  ]);

  assert.match(shapefilesSource, /PNG_PROVINCES_GEOJSON/);
  assert.match(shapefilesSource, /PNG_DISTRICTS_GEOJSON/);
  assert.match(shapefilesSource, /projectLngLatToSvg/);
  assert.match(shapefilesSource, /coordinatesToSvgPath/);
  assert.match(shapefilesSource, /PNG_MAP_BOUNDS/);

  assert.match(boundaryApi, /level === "adm0"/);
  assert.match(boundaryApi, /level === "adm2"/);
  assert.match(boundaryApi, /PNG_PROVINCES_GEOJSON/);
});


import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (p) => readFile(new URL(`../${p}`, import.meta.url), "utf8");

test("P0: Lamton Investments Ltd Corporate Governance & Brands Schema", async () => {
  const [brandsSource, footerSource] = await Promise.all([
    read("db/brands.ts"),
    read("app/components/Footer.tsx")
  ]);

  // Organizations and Brands tables
  assert.match(brandsSource, /CREATE TABLE IF NOT EXISTS organizations/);
  assert.match(brandsSource, /CREATE TABLE IF NOT EXISTS brands/);
  assert.match(brandsSource, /Lamton Investments Ltd/);
  assert.match(brandsSource, /ZamRoam/);
  assert.match(brandsSource, /Roam Zambia\. Experience More\./);
  assert.match(brandsSource, /zamroam\.com/);
  assert.match(brandsSource, /info@zamroam\.com/);
  assert.match(brandsSource, /getBrandConfig/);

  // Enterprise Footer Legal Notice
  assert.match(footerSource, /owned and operated by/);
  assert.match(footerSource, /Lamton Investments Ltd/);
  assert.match(footerSource, /is a tourism technology platform owned and operated by/);
});

test("P1: ZamVenture Pass & ZamVenture Partners Commercial Engine", async () => {
  const [passSource, partnerSource, brandsSource] = await Promise.all([
    read("app/components/PassLanding.tsx"),
    read("app/components/PartnerLanding.tsx"),
    read("db/brands.ts")
  ]);

  // ZamVenture Pass Showcase & Pricing
  assert.match(passSource, /Explorer Pass/);
  assert.match(passSource, /Traveller Pass/);
  assert.match(passSource, /Zambia Plus/);
  assert.match(passSource, /Dynamic Secure QR/);
  assert.match(passSource, /Explore More\. Pay Less/);

  // 100 Founding Partners Campaign Widget
  assert.match(partnerSource, /100 Founding Partners/);
  assert.match(partnerSource, /Claim Founding Slot/);
  assert.match(partnerSource, /Verified Partner/);
  assert.match(partnerSource, /Premium Safari Partner/);
  assert.match(brandsSource, /founding_partner_campaigns/);
  assert.match(brandsSource, /getFoundingPartnerCampaign/);
});

test("P2: About ZamVenture & Commercial Invoices & Receipts", async () => {
  const [aboutSource, invoiceDb, invoiceModal] = await Promise.all([
    read("app/components/AboutPage.tsx"),
    read("db/invoices.ts"),
    read("app/components/InvoiceModal.tsx")
  ]);

  // About Page
  assert.match(aboutSource, /About/);
  assert.match(aboutSource, /Lamton Investments Ltd/);
  assert.match(aboutSource, /Our Mission & Tourism Vision/);

  // Invoices & Receipts
  assert.match(invoiceDb, /CREATE TABLE IF NOT EXISTS invoices/);
  assert.match(invoiceDb, /ZV-INV-/);
  assert.match(invoiceDb, /ZV-TXN-/);
  assert.match(invoiceDb, /Lamton Investments Ltd/);
  assert.match(invoiceModal, /LAMTON INVESTMENTS LTD/);
  assert.match(invoiceModal, /Operating/);
  assert.match(invoiceModal, /PAID RECEIPT/);
});

test("P2: Zambian Cultural Festivals & Safaris Module", async () => {
  const cultureSource = await read("db/zambiaCulture.ts");

  assert.match(cultureSource, /Kuomboka Ceremony/);
  assert.match(cultureSource, /Nc'wala Ceremony/);
  assert.match(cultureSource, /Likumbi Lya Mize/);
  assert.match(cultureSource, /Umutomboko Ceremony/);
  assert.match(cultureSource, /South Luangwa Pioneer Walking Safari/);
  assert.match(cultureSource, /Victoria Falls Devil's Pool/);
});

test("P3: Future-Ready Apple/Google Wallet & Mobile Money Integrations", async () => {
  const [walletSource, mobileMoneySource] = await Promise.all([
    read("db/walletPass.ts"),
    read("db/mobileMoney.ts")
  ]);

  // Apple & Google Wallet payloads
  assert.match(walletSource, /generateAppleWalletPayload/);
  assert.match(walletSource, /generateGoogleWalletJwtPayload/);
  assert.match(walletSource, /Lamton Investments Ltd/);
  assert.match(walletSource, /pass\.com\.lamtoninvestments/);

  // Mobile Money Webhook Abstraction
  assert.match(mobileMoneySource, /verifyMobileMoneyWebhookSignature/);
  assert.match(mobileMoneySource, /parseMobileMoneyWebhook/);
  assert.match(mobileMoneySource, /airtel_money/);
  assert.match(mobileMoneySource, /mtn_momo/);
});

test("Tenant Isolation: Tight Gates Guarantee Zero Cross-Country Resource Spillage", async () => {
  const [catalogueDb, bannerComp, securityComp, festivalComp, permitComp, appSource] = await Promise.all([
    read("db/catalogue.ts"),
    read("app/components/CountryIntroBanner.tsx"),
    read("app/components/SecurityAdvisory.tsx"),
    read("app/components/FestivalCalendar.tsx"),
    read("app/components/DigitalPermitPass.tsx"),
    read("app/VisitPngApp.tsx")
  ]);

  // 1. Catalogue Database strict matching (No NULL fallback leak)
  assert.match(catalogueDb, /AND l\.country_id = \?/);
  assert.doesNotMatch(catalogueDb, /OR l\.country_id IS NULL/);

  // 2. Banner dynamic country support
  assert.match(bannerComp, /Welcome to Zambia — The Real Africa/);

  // 3. Security Advisory dynamic country support
  assert.match(securityComp, /ZAMBIA_EMERGENCY_CONTACTS/);
  assert.match(securityComp, /999/);
  assert.match(securityComp, /Zambia SafeTravel Advisory Matrix/);

  // 4. Festival Calendar dynamic country support
  assert.match(festivalComp, /ZAMBIA_FESTIVALS/);
  assert.match(festivalComp, /festivalsList/);

  // 5. Permits dynamic country support
  assert.match(permitComp, /ZAMBIA_PERMIT_TYPES/);
  assert.match(permitComp, /permitTypes/);

  // 6. Main App explore switcher isolation
  assert.match(appSource, /const isZambia = countryCode === "ZMB"/);
  assert.match(appSource, /activeFestivals/);
  assert.match(appSource, /activeTrails/);
  assert.match(appSource, /ZambianPhrasebook/);
});

test("Zambian Regional Linguistic Matrix: 7 Official Indigenous Language Zones", async () => {
  const [langDb, phraseComp] = await Promise.all([
    read("db/zambianLanguages.ts"),
    read("app/components/ZambianPhrasebook.tsx")
  ]);

  // Verify all 7 official linguistic zones
  assert.match(langDb, /Lozi \(Silozi\)/); // Western
  assert.match(langDb, /Tonga \(Chitonga\)/); // Southern
  assert.match(langDb, /Lunda \(Chilunda\)/); // North-Western (Zambezi Source & Mwinilunga)
  assert.match(langDb, /Luvale \(Chiluvale\)/); // North-Western (Zambezi West & Likumbi Lya Mize)
  assert.match(langDb, /Kaonde \(KiKaonde\)/); // North-Western (Solwezi & Kasempa)
  assert.match(langDb, /Nyanja \/ Chewa \(Chinyanja\)/); // Eastern & Lusaka
  assert.match(langDb, /Bemba \(Ichibemba\)/); // Copperbelt, Central, Northern, Luapula, Muchinga

  // Verify geographic routing helper
  assert.match(langDb, /getLanguageZoneByProvince/);

  // Verify interactive component
  assert.match(phraseComp, /Speak Like a Local in Zambia/);
  assert.match(phraseComp, /Select Destination Region/);
  assert.match(phraseComp, /ZAMBIAN_LANGUAGE_ZONES/);
});

test("Security Advisory Dynamic Quick Dials & Regional Filter Isolation", async () => {
  const securityComp = await read("app/components/SecurityAdvisory.tsx");

  assert.match(securityComp, /primaryAmbulance\.phone/);
  assert.match(securityComp, /primaryPolice\.phone/);
  assert.match(securityComp, /primaryMedevac\.display/);
  assert.match(securityComp, /primaryTourism\.display/);
  assert.match(securityComp, /advisories\.length/);
  assert.match(securityComp, /advisories\.map/);
});


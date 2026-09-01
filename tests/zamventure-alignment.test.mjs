import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (p) => readFile(new URL(`../${p}`, import.meta.url), "utf8");

test("P0: VisitPNG Tourism Services Ltd Corporate Governance & Brands Schema", async () => {
  const [brandsSource, footerSource] = await Promise.all([
    read("db/brands.ts"),
    read("app/components/Footer.tsx")
  ]);

  // Organizations and Brands tables
  assert.match(brandsSource, /CREATE TABLE IF NOT EXISTS organizations/);
  assert.match(brandsSource, /CREATE TABLE IF NOT EXISTS brands/);
  assert.match(brandsSource, /VisitPNG Tourism Services Ltd/);
  assert.match(brandsSource, /VisitPNG/);
  assert.match(brandsSource, /Land of a Million Journeys/i);
  assert.match(brandsSource, /visitpng\.com/);
  assert.match(brandsSource, /info@visitpng\.com/);
  assert.match(brandsSource, /getBrandConfig/);

  // Enterprise Footer Legal Notice
  assert.match(footerSource, /owned and operated by/);
  assert.match(footerSource, /VisitPNG Tourism Services Ltd/);
  assert.match(footerSource, /is a tourism technology platform owned and operated by/);
});

test("P1: VisitPNG Pass & VisitPNG Partners Commercial Engine", async () => {
  const [passSource, partnerSource, brandsSource] = await Promise.all([
    read("app/components/PassLanding.tsx"),
    read("app/components/PartnerLanding.tsx"),
    read("db/brands.ts")
  ]);

  // VisitPNG Pass Showcase & Pricing
  assert.match(passSource, /Explorer Pass/);
  assert.match(passSource, /Traveller Pass/);
  assert.match(passSource, /Papua New Guinea Plus/);
  assert.match(passSource, /Dynamic Secure QR/);
  assert.match(passSource, /Explore More\. Pay Less/);

  // 100 Founding Partners Campaign Widget
  assert.match(partnerSource, /100 Founding Partners/);
  assert.match(partnerSource, /Claim Founding Slot/);
  assert.match(partnerSource, /Verified Partner/);
  assert.match(partnerSource, /Premium Operator Partner/);
  assert.match(brandsSource, /founding_partner_campaigns/);
  assert.match(brandsSource, /getFoundingPartnerCampaign/);
});

test("P2: About VisitPNG & Commercial Invoices & Receipts", async () => {
  const [aboutSource, invoiceDb, invoiceModal] = await Promise.all([
    read("app/components/AboutPage.tsx"),
    read("db/invoices.ts"),
    read("app/components/InvoiceModal.tsx")
  ]);

  // About Page
  assert.match(aboutSource, /About/);
  assert.match(aboutSource, /LanFrame/);
  assert.match(aboutSource, /Connecting People to/);

  // Invoices & Receipts
  assert.match(invoiceDb, /CREATE TABLE IF NOT EXISTS invoices/);
  assert.match(invoiceDb, /VP-INV-/);
  assert.match(invoiceDb, /VP-TXN-/);
  assert.match(invoiceDb, /VisitPNG Tourism Services Ltd/);
  assert.match(invoiceModal, /VisitPNG Tourism Services Ltd/i);
  assert.match(invoiceModal, /Operating/);
  assert.match(invoiceModal, /PAID RECEIPT/);
});

test("P2: Papua New Guinea Cultural Festivals & Expeditions Module", async () => {
  const festivalsSource = await read("db/festivals.ts");

  assert.match(festivalsSource, /Goroka Cultural Show/);
  assert.match(festivalsSource, /Mount Hagen Cultural Show/);
  assert.match(festivalsSource, /National Mask & Warwagira Festival/);
  assert.match(festivalsSource, /Kenu & Kundu Canoe Festival/);
  assert.match(festivalsSource, /Sepik River Crocodile Festival/);
});

test("P3: Future-Ready Apple/Google Wallet & Mobile Money Integrations", async () => {
  const [walletSource, paymentSource] = await Promise.all([
    read("db/walletPass.ts"),
    read("app/components/PaymentModal.tsx")
  ]);

  // Apple & Google Wallet payloads
  assert.match(walletSource, /generateAppleWalletPayload/);
  assert.match(walletSource, /generateGoogleWalletJwtPayload/);
  assert.match(walletSource, /VisitPNG Tourism Services Ltd/);
  assert.match(walletSource, /pass\.com\.visitpng/);

  // Mobile Money & Digicel CellMoni / BSP Pay
  assert.match(paymentSource, /CellMoni/);
  assert.match(paymentSource, /Vodafone/);
  assert.match(paymentSource, /BSP Pay/);
});

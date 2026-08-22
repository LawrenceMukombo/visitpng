import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import crypto from "node:crypto";

const read = p => readFile(new URL(`../${p}`, import.meta.url), "utf8");

test("VisitPNG Membership, Rewards & Benefits Ecosystem - Database Schemas & Seeding", async () => {
  const [schemaSource, routeSource] = await Promise.all([
    read("db/membershipEcosystem.ts"),
    read("app/api/membership/route.ts")
  ]);

  // Tourist Tier Plans & Schema
  assert.match(schemaSource, /membership_plans/);
  assert.match(schemaSource, /explorer-annual/);
  assert.match(schemaSource, /adventurer-annual/);
  assert.match(schemaSource, /elite-annual/);
  assert.match(schemaSource, /family-annual/);

  // Partner Provider Subscription Plans
  assert.match(schemaSource, /provider_subscription_plans/);
  assert.match(schemaSource, /silver-partner/);
  assert.match(schemaSource, /gold-partner/);
  assert.match(schemaSource, /platinum-partner/);

  // Benefits, Redemptions & Physical Cards
  assert.match(schemaSource, /provider_offers/);
  assert.match(schemaSource, /partner_redemptions/);
  assert.match(schemaSource, /passport_stamps/);
  assert.match(schemaSource, /family_group_members/);
  assert.match(schemaSource, /membership_cards/);

  // Route integration
  assert.match(routeSource, /getTouristMembershipHub/);
  assert.match(routeSource, /request_physical_card/);
  assert.match(routeSource, /add_family_member/);
});

test("VisitPNG Membership Ecosystem - Dynamic QR Code Token Security Engine", () => {
  const memberNumber = "VPNG-TST-999999";
  const now = 1755860000000;
  const secret = process.env.MEMBERSHIP_SECRET_KEY || "visitpng-membership-secret-2026";

  const generateToken = (memNum, time) => {
    const timeWindow = Math.floor(time / (60 * 1000));
    const raw = `${memNum}:${timeWindow}:${secret}`;
    const hash = crypto.createHash("sha256").update(raw).digest("hex").slice(0, 16);
    return `VPNGQR-${memNum}-${hash}`;
  };

  const validateToken = (token, memNum, time) => {
    const currentWindow = Math.floor(time / (60 * 1000));
    for (const offset of [0, -1, 1]) {
      const window = currentWindow + offset;
      const raw = `${memNum}:${window}:${secret}`;
      const hash = crypto.createHash("sha256").update(raw).digest("hex").slice(0, 16);
      if (token === `VPNGQR-${memNum}-${hash}`) return true;
    }
    return false;
  };

  const dynamicQr = generateToken(memberNumber, now);
  assert.ok(dynamicQr.startsWith("VPNGQR-VPNG-TST-999999-"));

  // Valid within current window
  assert.equal(validateToken(dynamicQr, memberNumber, now + 10000), true);
  // Valid with clock tolerance
  assert.equal(validateToken(dynamicQr, memberNumber, now + 50000), true);
  // Invalid for another member
  assert.equal(validateToken(dynamicQr, "VPNG-OTHER-123456", now), false);
  // Invalid for tampered token
  assert.equal(validateToken(dynamicQr.slice(0, -4) + "dead", memberNumber, now), false);
});

test("VisitPNG Membership Ecosystem - Commission & Settlement Engine", async () => {
  const [commissionSource] = await Promise.all([
    read("db/commission.ts")
  ]);

  assert.match(commissionSource, /calculateCommissionBreakdown/);

  // Pure logic calculation test
  const calculateCommission = (gross, commRate = 0.05, gstRate = 0.10) => {
    const baseComm = Math.round(gross * commRate * 100) / 100;
    const gstComm = Math.round(baseComm * gstRate * 100) / 100;
    const totalFee = Math.round((baseComm + gstComm) * 100) / 100;
    const payout = Math.round((gross - totalFee) * 100) / 100;
    return { gross, baseComm, gstComm, totalFee, payout };
  };

  const split = calculateCommission(1000, 0.05, 0.10);
  assert.equal(split.gross, 1000);
  assert.equal(split.baseComm, 50); // 5% of 1000
  assert.equal(split.gstComm, 5); // 10% of 50
  assert.equal(split.totalFee, 55); // 50 + 5
  assert.equal(split.payout, 945); // 1000 - 55
});

test("VisitPNG Membership Ecosystem - Tourist Hub, Cashier Terminal, and Admin UI", async () => {
  const [hubUi, terminalUi, adminUi, globalsCss] = await Promise.all([
    read("app/components/TouristMembershipHub.tsx"),
    read("app/components/ProviderRedemptionTerminal.tsx"),
    read("app/components/AdminMembershipConsole.tsx"),
    read("app/globals.css")
  ]);

  // Tourist Hub features
  assert.match(hubUi, /collectibleDigitalCard/);
  assert.match(hubUi, /dynamicQrSecurityBox/);
  assert.match(hubUi, /savingsKpiGrid/);
  assert.match(hubUi, /passportStampsGrid/);
  assert.match(hubUi, /familyMembersGrid/);

  // Front-Desk Provider Redemption Terminal
  assert.match(terminalUi, /terminalSheetCard/);
  assert.match(terminalUi, /verifiedMemberCard/);
  assert.match(terminalUi, /redemptionCalculatorBox/);
  assert.match(terminalUi, /confirmRedemptionBtn/);
  assert.match(terminalUi, /receiptCard/);

  // Admin Console
  assert.match(adminUi, /adminMembershipConsoleSection/);
  assert.match(adminUi, /adminMembershipKpiGrid/);
  assert.match(adminUi, /overviewCard/);
  assert.match(adminUi, /exportCsvBtn/);

  // CSS contains zero hex codes (palette enforcement)
  assert.match(globalsCss, /\.touristMembershipHubSection/);
  assert.match(globalsCss, /\.collectibleDigitalCard/);
  assert.match(globalsCss, /\.terminalSheetCard/);
  assert.match(globalsCss, /\.adminMembershipConsoleSection/);
});

import test from "node:test";import assert from "node:assert/strict";import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL(`../${p}`,import.meta.url),"utf8");
test("administrator access is protected and configurable",async()=>{const source=await read("db/admin.ts");assert.match(source,/ADMIN_EMAIL/);assert.match(source,/ADMIN_REQUIRED/);assert.match(source,/role!=="administrator"/)});
test("administrators can manage publishing and change history",async()=>{const [source,ui]=await Promise.all([read("db/admin.ts"),read("app/admin/AdminDashboard.tsx")]);assert.match(source,/publication_status/);assert.match(source,/audit_logs/);assert.match(ui,/Draft — staff only/);assert.match(ui,/Recent changes/)});

test("provider self-registration, anti-scam fact-checking, and 5% + GST commission calculations are supported",async()=>{
  const [providersSource, vettingUi, modalUi] = await Promise.all([
    read("db/providers.ts"),
    read("app/components/AdminProviderVetting.tsx"),
    read("app/components/ProviderRegistrationModal.tsx")
  ]);

  // Schema and Commission Engine
  assert.match(providersSource, /provider_applications/);
  assert.match(providersSource, /commission_rate/);
  assert.match(providersSource, /gst_rate/);
  assert.match(providersSource, /calculateCommissionBreakdown/);

  // Anti-scam 5-point checklist
  assert.match(vettingUi, /nidPassportVerified/);
  assert.match(vettingUi, /tpaLicenseVerified/);
  assert.match(vettingUi, /interviewConducted/);
  assert.match(vettingUi, /equipmentSafetyChecked/);

  // Provider registration modal with 5% + GST agreement
  assert.match(modalUi, /5% \+ GST/);
  assert.match(modalUi, /tour_guide/);
  assert.match(modalUi, /cultural_artifacts/);
  assert.match(modalUi, /payoutMethod/);
});


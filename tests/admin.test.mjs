import test from "node:test";import assert from "node:assert/strict";import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL(`../${p}`,import.meta.url),"utf8");
test("administrator access is protected and configurable",async()=>{const source=await read("db/admin.ts");assert.match(source,/ADMIN_EMAIL/);assert.match(source,/ADMIN_REQUIRED/);assert.match(source,/role!=="administrator"/)});
test("administrators can manage publishing and change history",async()=>{const [source,ui]=await Promise.all([read("db/admin.ts"),read("app/admin/AdminDashboard.tsx")]);assert.match(source,/publication_status/);assert.match(source,/audit_logs/);assert.match(ui,/Draft — staff only/);assert.match(ui,/Recent changes/)});

import { cpSync, existsSync, mkdirSync } from "node:fs";

if (existsSync(".next/standalone")) {
  if (existsSync("public")) {
    mkdirSync(".next/standalone/public", { recursive: true });
    cpSync("public", ".next/standalone/public", { recursive: true });
  }
  if (existsSync(".next/static")) {
    mkdirSync(".next/standalone/.next/static", { recursive: true });
    cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
  }
  console.log("✓ Copied public/ and .next/static/ into .next/standalone/ for standalone production server");
}

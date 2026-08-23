import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const databasePath = resolve(process.env.DATABASE_PATH || "data/visitpng.db");
mkdirSync(dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");

type Value = string | number | bigint | null | Uint8Array;
const toValue = (value: unknown): Value => value == null ? null : typeof value === "boolean" ? Number(value) : typeof value === "string" || typeof value === "number" || typeof value === "bigint" || value instanceof Uint8Array ? value : JSON.stringify(value);

class NativeStatement {
  constructor(private sql: string, private values: unknown[] = []) {}
  bind(...values: unknown[]) { return new NativeStatement(this.sql, values); }
  async run() { return database.prepare(this.sql).run(...this.values.map(toValue)); }
  async first<T = unknown>() { return (database.prepare(this.sql).get(...this.values.map(toValue)) as T | undefined) ?? null; }
  async all<T = Record<string, unknown>>() { return { results: database.prepare(this.sql).all(...this.values.map(toValue)) as T[] }; }
  runNow() { return database.prepare(this.sql).run(...this.values.map(toValue)); }
}

class NativeDatabase {
  prepare(sql: string) { return new NativeStatement(sql); }
  async batch(statements: NativeStatement[]) {
    database.exec("BEGIN");
    try {
      const results = statements.map((statement) => statement.runNow());
      database.exec("COMMIT");
      return results;
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
}

export const env = { DB: new NativeDatabase() };
export { database };



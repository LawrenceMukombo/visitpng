import { env } from "./runtime";

export function getDb() {
  return env.DB;
}

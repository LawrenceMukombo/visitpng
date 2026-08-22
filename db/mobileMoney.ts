import { createHmac } from "node:crypto";

export interface MobileMoneyWebhookPayload {
  transactionId: string;
  externalReference: string;
  provider: "airtel_money" | "mtn_momo" | "zamtel_money";
  msisdn: string;
  amount: number;
  currency: string;
  status: "SUCCESSFUL" | "FAILED" | "PENDING";
  timestamp: string;
  signature?: string;
}

export function verifyMobileMoneyWebhookSignature(
  rawBody: string,
  signature: string,
  secretKey: string
): boolean {
  if (!signature || !secretKey) return false;
  const computed = createHmac("sha256", secretKey).update(rawBody).digest("hex");
  return computed.toLowerCase() === signature.toLowerCase();
}

export function parseMobileMoneyWebhook(payload: unknown): MobileMoneyWebhookPayload | null {
  if (!payload || typeof payload !== "object") return null;
  const p = payload as Record<string, unknown>;

  if (!p.transactionId || !p.amount || !p.status) return null;

  return {
    transactionId: String(p.transactionId),
    externalReference: String(p.externalReference || p.reference || ""),
    provider: (String(p.provider || "airtel_money") as MobileMoneyWebhookPayload["provider"]),
    msisdn: String(p.msisdn || p.phone || ""),
    amount: Number(p.amount),
    currency: String(p.currency || "ZMW"),
    status: (String(p.status).toUpperCase() as MobileMoneyWebhookPayload["status"]),
    timestamp: String(p.timestamp || new Date().toISOString()),
    signature: typeof p.signature === "string" ? p.signature : undefined
  };
}

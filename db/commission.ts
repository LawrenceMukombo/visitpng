// Pure, client-safe commission and GST calculation utilities

export interface CommissionBreakdown {
  grossAmount: number;
  commissionRate: number;
  commissionRatePct: string;
  baseCommission: number;
  gstRate: number;
  gstRatePct: string;
  gstOnCommission: number;
  totalPlatformFee: number;
  netProviderPayout: number;
  effectiveTakeRatePct: string;
}

export function calculateCommissionBreakdown(
  grossAmount: number,
  commissionRate: number = 0.05,
  gstRate: number = 0.10
): CommissionBreakdown {
  const baseCommission = Math.round(grossAmount * commissionRate * 100) / 100;
  const gstOnCommission = Math.round(baseCommission * gstRate * 100) / 100;
  const totalPlatformFee = Math.round((baseCommission + gstOnCommission) * 100) / 100;
  const netProviderPayout = Math.round((grossAmount - totalPlatformFee) * 100) / 100;
  const effectiveTakeRatePct = grossAmount > 0 
    ? Math.round(((totalPlatformFee / grossAmount) * 100) * 10) / 10 
    : 0;

  return {
    grossAmount,
    commissionRate,
    commissionRatePct: `${Math.round(commissionRate * 100)}%`,
    baseCommission,
    gstRate,
    gstRatePct: `${Math.round(gstRate * 100)}% GST`,
    gstOnCommission,
    totalPlatformFee,
    netProviderPayout,
    effectiveTakeRatePct: `${effectiveTakeRatePct}%`
  };
}

import { COUNTRIES } from "@/data/countries";

export interface TaxRefundResult {
  countryCode: string;
  countryName: string;
  flag: string;
  purchaseAmount: number;
  currencySymbol: string;
  refundAvailable: boolean;
  meetsMinimum: boolean;
  minPurchase: number;
  refundPercent: number;
  estimatedRefund: number;
  notes: string;
}

export function calculateTaxRefund(
  countryCode: string,
  purchaseAmount: number,
): TaxRefundResult | null {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  if (!country) return null;

  const { taxRefund } = country;

  if (!taxRefund.available) {
    return {
      countryCode: country.code,
      countryName: country.nameZh,
      flag: country.flag,
      purchaseAmount,
      currencySymbol: country.currencySymbol,
      refundAvailable: false,
      meetsMinimum: false,
      minPurchase: 0,
      refundPercent: 0,
      estimatedRefund: 0,
      notes: taxRefund.notes || "此國家無退稅制度",
    };
  }

  const minPurchase = taxRefund.minPurchase || 0;
  const meetsMinimum = purchaseAmount >= minPurchase;
  const refundPercent = taxRefund.refundPercent || 0;
  const estimatedRefund = meetsMinimum
    ? Math.round(purchaseAmount * refundPercent / 100)
    : 0;

  return {
    countryCode: country.code,
    countryName: country.nameZh,
    flag: country.flag,
    purchaseAmount,
    currencySymbol: country.currencySymbol,
    refundAvailable: true,
    meetsMinimum,
    minPurchase,
    refundPercent,
    estimatedRefund,
    notes: taxRefund.notes || "",
  };
}

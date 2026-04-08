import { STATIC_EXCHANGE_RATES } from "@/data/constants";
import type { CurrencyConversion } from "@/types";

/**
 * 匯率換算：TWD → 外幣 或 外幣 → TWD
 * rate = 1 TWD 可換多少外幣（如 JPY 4.67 表示 1 TWD = 4.67 JPY）
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates?: Record<string, number>,
): CurrencyConversion {
  const rateTable = rates || STATIC_EXCHANGE_RATES;

  let rate: number;

  if (fromCurrency === "TWD") {
    // TWD → 外幣：amount / 該外幣對台幣匯率
    const toRate = rateTable[toCurrency];
    rate = toRate ? 1 / toRate : 1;
  } else if (toCurrency === "TWD") {
    // 外幣 → TWD：amount × 該外幣對台幣匯率
    rate = rateTable[fromCurrency] || 1;
  } else {
    // 外幣 → 外幣：先轉 TWD 再轉目標
    const fromRate = rateTable[fromCurrency] || 1;
    const toRate = rateTable[toCurrency] || 1;
    rate = fromRate / toRate;
  }

  return {
    from: fromCurrency,
    to: toCurrency,
    amount,
    rate,
    result: amount * rate,
    updatedAt: new Date().toISOString(),
  };
}

/** 取得 1 外幣 = ? TWD 的匯率 */
export function getExchangeRateToTWD(currency: string, rates?: Record<string, number>): number {
  const rateTable = rates || STATIC_EXCHANGE_RATES;
  return rateTable[currency] || 1;
}

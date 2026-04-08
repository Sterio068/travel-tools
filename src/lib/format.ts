/** 金額格式化（加千分位） */
export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("zh-TW", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/** 金額格式化（含小數） */
export function formatMoneyDecimal(amount: number, digits = 2): string {
  return new Intl.NumberFormat("zh-TW", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

/** 格式化各國貨幣金額 */
export function formatCurrency(amount: number, symbol: string): string {
  return `${symbol} ${formatMoney(amount)}`;
}

/** 匯率格式化（最多 4 位小數） */
export function formatRate(rate: number): string {
  if (rate >= 1) {
    return new Intl.NumberFormat("zh-TW", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(rate);
  }
  return new Intl.NumberFormat("zh-TW", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 6,
  }).format(rate);
}

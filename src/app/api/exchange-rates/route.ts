import { NextResponse } from "next/server";
import { STATIC_EXCHANGE_RATES } from "@/data/constants";

// ISR: 每小時重新驗證一次
export const revalidate = 3600;

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

export async function GET() {
  // 沒有 API Key 時回傳靜態匯率
  if (!API_KEY) {
    return NextResponse.json({
      rates: STATIC_EXCHANGE_RATES,
      updatedAt: new Date().toISOString(),
      source: "static",
    });
  }

  try {
    const res = await fetch(`${BASE_URL}/${API_KEY}/latest/TWD`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();

    // ExchangeRate-API 回傳 1 TWD = X 外幣
    // 我們需要 1 外幣 = X TWD，所以取倒數
    const rawRates = data.conversion_rates || {};
    const rates: Record<string, number> = {};

    const currencies = Object.keys(STATIC_EXCHANGE_RATES);
    for (const currency of currencies) {
      if (rawRates[currency]) {
        rates[currency] = 1 / rawRates[currency];
      }
    }

    return NextResponse.json({
      rates,
      updatedAt: new Date().toISOString(),
      source: "api",
    });
  } catch {
    // API 失敗時 fallback 到靜態匯率
    return NextResponse.json({
      rates: STATIC_EXCHANGE_RATES,
      updatedAt: new Date().toISOString(),
      source: "static-fallback",
    });
  }
}

"use client";

import { useState, useMemo, useEffect } from "react";
import { COUNTRIES } from "@/data/countries";
import { convertCurrency } from "@/lib/calculations/currency";
import { STATIC_EXCHANGE_RATES } from "@/data/constants";
import { formatMoney, formatRate } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const QUICK_AMOUNTS = [1000, 5000, 10000, 50000];

export default function CurrencyConverter() {
  const [currencyCode, setCurrencyCode] = useState("JPY");
  const [amount, setAmount] = useState("1000");
  const [direction, setDirection] = useState<"twdToForeign" | "foreignToTwd">("twdToForeign");
  const [liveRates, setLiveRates] = useState<Record<string, number> | null>(null);
  const [rateSource, setRateSource] = useState<string>("static");

  useEffect(() => {
    fetch("/api/exchange-rates")
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) {
          setLiveRates(data.rates);
          setRateSource(data.source);
        }
      })
      .catch(() => {});
  }, []);

  const rates = liveRates || STATIC_EXCHANGE_RATES;

  const country = useMemo(
    () => COUNTRIES.find((c) => c.currency === currencyCode) || COUNTRIES[0],
    [currencyCode],
  );

  const countryOptions = useMemo(
    () => COUNTRIES.map((c) => ({ value: c.currency, label: `${c.flag} ${c.nameZh} (${c.currency})` })),
    [],
  );

  const numericAmount = parseFloat(amount) || 0;

  const result = useMemo(() => {
    const from = direction === "twdToForeign" ? "TWD" : country.currency;
    const to = direction === "twdToForeign" ? country.currency : "TWD";
    return convertCurrency(numericAmount, from, to, rates);
  }, [numericAmount, country.currency, direction, rates]);

  const toSymbol = direction === "twdToForeign" ? country.currencySymbol : "NT$";
  const fromLabel = direction === "twdToForeign" ? "TWD 新台幣" : `${country.currency} ${country.currencyName}`;
  const toLabel = direction === "twdToForeign" ? `${country.currency} ${country.currencyName}` : "TWD 新台幣";

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <Select
            label="選擇國家 / 貨幣"
            options={countryOptions}
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-brand-800">{fromLabel}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDirection((d) => d === "twdToForeign" ? "foreignToTwd" : "twdToForeign")}
            >
              ⇄ 切換
            </Button>
            <span className="text-sm font-medium text-brand-800">{toLabel}</span>
          </div>

          <Input
            label="金額"
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="請輸入金額"
          />

          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((val) => (
              <Button
                key={val}
                variant="ghost"
                size="sm"
                onClick={() => { setAmount(String(val)); setDirection("twdToForeign"); }}
              >
                {val.toLocaleString()} TWD
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-brand-50 to-white">
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-500">換算結果</p>
          <p className="text-4xl font-extrabold text-brand-600">
            {toSymbol} {formatMoney(result.result)}
          </p>
          <div className="pt-3 border-t border-brand-100">
            <p className="text-xs text-slate-500">
              匯率：1 {country.currency} ≈{" "}
              <span className="font-semibold text-gold-600">{formatRate(result.rate)}</span>{" "}
              TWD
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {rateSource === "api" ? "匯率每小時自動更新" : "匯率僅供參考，實際以銀行牌告為準"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
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
  const [rateStatus, setRateStatus] = useState<"loading" | "live" | "fallback">("loading");

  const loadRates = useCallback(async () => {
    setRateStatus("loading");
    try {
      const res = await fetch("/api/exchange-rates");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.source === "api" && data.rates) {
        setLiveRates(data.rates);
        setRateStatus("live");
      } else {
        setLiveRates(null);
        setRateStatus("fallback");
      }
    } catch {
      setLiveRates(null);
      setRateStatus("fallback");
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const isLoadingRates = rateStatus === "loading";
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
              disabled={isLoadingRates}
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
                disabled={isLoadingRates}
                onClick={() => { setAmount(String(val)); setDirection("twdToForeign"); }}
              >
                {val.toLocaleString()} TWD
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="bg-brand-50/70 border-brand-200">
        {isLoadingRates ? (
          <div className="text-center space-y-3" role="status" aria-label="匯率載入中">
            <p className="text-sm text-slate-500">換算結果</p>
            <div className="animate-pulse space-y-3">
              <div className="mx-auto h-10 w-48 rounded-lg bg-brand-100" />
              <div className="pt-3 border-t border-brand-100 space-y-2">
                <div className="mx-auto h-3 w-40 rounded bg-brand-100" />
                <div className="mx-auto h-3 w-32 rounded bg-brand-100" />
              </div>
            </div>
            <p className="text-xs text-slate-400">正在取得最新匯率…</p>
          </div>
        ) : (
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
                {rateStatus === "live" ? "匯率每小時自動更新" : "匯率僅供參考，實際以銀行牌告為準"}
              </p>
            </div>
            {rateStatus === "fallback" && (
              <div className="mt-2 flex flex-col items-center gap-2 rounded-lg border border-gold-100 bg-gold-50/60 px-4 py-3 sm:flex-row sm:justify-between">
                <p className="text-xs text-slate-600 text-left">
                  即時匯率暫時無法取得，目前改用昨日牌告匯率。
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isLoadingRates}
                  onClick={loadRates}
                >
                  重試
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

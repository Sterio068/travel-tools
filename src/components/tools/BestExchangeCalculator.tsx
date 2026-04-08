"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { STATIC_EXCHANGE_RATES } from "@/data/constants";
import { formatMoney, formatRate } from "@/lib/format";

const CURRENCY_OPTIONS = [
  { value: "JPY", label: "日幣 JPY" },
  { value: "KRW", label: "韓元 KRW" },
  { value: "USD", label: "美元 USD" },
  { value: "EUR", label: "歐元 EUR" },
  { value: "GBP", label: "英鎊 GBP" },
  { value: "THB", label: "泰銖 THB" },
  { value: "VND", label: "越南盾 VND" },
  { value: "SGD", label: "新加坡幣 SGD" },
  { value: "HKD", label: "港幣 HKD" },
  { value: "AUD", label: "澳幣 AUD" },
];

interface ExchangeMethod {
  name: string;
  description: string;
  foreignAmount: number;
  effectiveRate: number;
}

function calcMethods(currency: string, twdAmount: number): ExchangeMethod[] {
  const baseRate = STATIC_EXCHANGE_RATES[currency];
  if (!baseRate || twdAmount <= 0) return [];

  return [
    {
      name: "臺灣銀行臨櫃",
      description: "匯率最佳、價差最小，適合大額換匯",
      effectiveRate: baseRate * 0.997,
      foreignAmount: twdAmount / (baseRate * 0.997),
    },
    {
      name: "機場換匯",
      description: "方便但匯率較差，適合臨時小額需求",
      effectiveRate: baseRate * 0.99,
      foreignAmount: twdAmount / (baseRate * 0.99),
    },
    {
      name: "海外 ATM 提領",
      description: "匯率普通，另收固定手續費 100 元",
      effectiveRate: baseRate * 0.985,
      foreignAmount: Math.max(0, twdAmount - 100) / (baseRate * 0.985),
    },
    {
      name: "信用卡海外刷卡",
      description: "匯率略優但含 1.5% 手續費，有回饋可抵",
      effectiveRate: baseRate * 1.005,
      foreignAmount: twdAmount / (baseRate * 1.005),
    },
  ];
}

export default function BestExchangeCalculator() {
  const [currency, setCurrency] = useState("JPY");
  const [twdAmount, setTwdAmount] = useState(10000);

  const methods = useMemo(
    () => calcMethods(currency, twdAmount),
    [currency, twdAmount],
  );

  const sorted = useMemo(
    () => [...methods].sort((a, b) => b.foreignAmount - a.foreignAmount),
    [methods],
  );

  const best = sorted[0]?.foreignAmount ?? 0;
  const worst = sorted[sorted.length - 1]?.foreignAmount ?? 0;
  const savings = best - worst;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="選擇幣別"
            options={CURRENCY_OPTIONS}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          <Input
            label="台幣金額 (TWD)"
            type="number"
            value={twdAmount}
            onChange={(e) => setTwdAmount(Number(e.target.value) || 0)}
            placeholder="輸入台幣金額"
          />
        </div>
      </Card>

      {sorted.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            換匯方式比較（由多到少排序）
          </h3>
          {sorted.map((method, idx) => {
            const isWinner = idx === 0;
            return (
              <Card
                key={method.name}
                className={`relative p-5 transition-shadow ${
                  isWinner
                    ? "border-2 border-brand-500 shadow-lg"
                    : "border border-gray-200"
                }`}
              >
                {isWinner && (
                  <span className="absolute -top-3 left-4 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-bold text-white">
                    最佳方案
                  </span>
                )}
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      {method.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {method.description}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      參考匯率：{formatRate(method.effectiveRate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-2xl font-bold ${
                        isWinner ? "text-brand-500" : "text-gray-800"
                      }`}
                    >
                      {formatMoney(method.foreignAmount)} {currency}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

          {savings > 0 && (
            <Card className="border-accent-500 bg-accent-500/5 p-4">
              <p className="text-center text-sm font-medium text-accent-500">
                最佳 vs 最差方案差距：
                <span className="text-lg font-bold">
                  {" "}
                  {formatMoney(savings)} {currency}
                </span>
              </p>
            </Card>
          )}
        </div>
      )}

      <p className="text-xs text-gray-400">
        ※ 以上匯率皆為估算值，實際匯率依各機構當日公告為準。信用卡海外刷卡之回饋比例依各銀行方案而異，建議換匯前多方比較。
      </p>
    </div>
  );
}

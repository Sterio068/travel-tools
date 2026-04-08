"use client";

import { useState, useMemo, useCallback } from "react";
import { COUNTRIES } from "@/data/countries";
import { calculateBudget } from "@/lib/calculations/budget";
import { formatMoney } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { BudgetEstimate } from "@/types";

type TravelStyle = "budget" | "moderate" | "luxury";

const STYLE_CONFIG: { value: TravelStyle; label: string; desc: string }[] = [
  { value: "budget", label: "省錢型", desc: "背包客 / 青旅" },
  { value: "moderate", label: "舒適型", desc: "三四星飯店" },
  { value: "luxury", label: "奢華型", desc: "五星級享受" },
];

const BREAKDOWN_LABELS: Record<keyof BudgetEstimate["breakdown"], string> = {
  flights: "機票",
  accommodation: "住宿",
  food: "餐飲",
  transport: "交通",
  activities: "活動",
  shopping: "購物",
  insurance: "保險",
  misc: "雜支",
};

function BreakdownRow({
  label,
  amount,
  total,
}: {
  label: string;
  amount: number;
  total: number;
}) {
  const pct = total > 0 ? (amount / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="w-12 text-sm text-slate-600 shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-brand-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.max(pct, 1)}%` }}
        />
      </div>
      <span className="w-24 text-right text-sm font-medium text-brand-900 shrink-0">
        NT$ {formatMoney(amount)}
      </span>
      <span className="w-12 text-right text-xs text-slate-400 shrink-0">
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

export default function BudgetCalculator() {
  const [countryCode, setCountryCode] = useState(COUNTRIES[0].code);
  const [days, setDays] = useState("5");
  const [travelers, setTravelers] = useState("2");
  const [style, setStyle] = useState<TravelStyle>("moderate");
  const [result, setResult] = useState<BudgetEstimate | null>(null);

  const countryOptions = useMemo(
    () =>
      COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.nameZh}`,
      })),
    [],
  );

  const handleCalculate = useCallback(() => {
    const d = Math.min(30, Math.max(1, parseInt(days, 10) || 1));
    const t = Math.min(10, Math.max(1, parseInt(travelers, 10) || 1));
    setDays(String(d));
    setTravelers(String(t));
    const estimate = calculateBudget(countryCode, d, t, style);
    setResult(estimate);
  }, [countryCode, days, travelers, style]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="目的地"
            options={countryOptions}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
          <Input
            label="天數"
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            suffix="天"
            hint="1 - 30 天"
          />
          <Input
            label="人數"
            type="number"
            min={1}
            max={10}
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            suffix="人"
            hint="1 - 10 人"
          />
        </div>

        {/* Travel style toggle */}
        <div className="mt-5">
          <p className="block text-sm font-semibold text-brand-900 mb-2">
            旅遊風格
          </p>
          <div className="grid grid-cols-3 gap-2">
            {STYLE_CONFIG.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStyle(s.value)}
                className={`rounded-[12px] px-3 py-3 text-center transition-all cursor-pointer ${
                  style === s.value
                    ? "bg-brand-500 text-white shadow-md"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                <span className="block text-sm font-bold">{s.label}</span>
                <span
                  className={`block text-xs mt-0.5 ${
                    style === s.value ? "text-white/80" : "text-slate-400"
                  }`}
                >
                  {s.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <Button onClick={handleCalculate} size="lg" className="w-full">
            計算預算
          </Button>
        </div>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Total */}
          <Card>
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-1">
                {result.destination} {result.days} 天 {result.travelers} 人 ·{" "}
                {STYLE_CONFIG.find((s) => s.value === result.style)?.label}
              </p>
              <p className="text-sm text-slate-500">預估總花費</p>
              <p className="text-4xl md:text-5xl font-extrabold text-brand-900 mt-1">
                NT${" "}
                <span className="text-brand-600">
                  {formatMoney(result.totalTWD)}
                </span>
              </p>
              <p className="text-sm text-slate-500 mt-2">
                每人每天約 NT$ {formatMoney(result.perPersonPerDay)}
              </p>
            </div>
          </Card>

          {/* Breakdown table */}
          <Card>
            <h3 className="text-sm font-semibold text-brand-700 mb-3">
              費用明細
            </h3>
            <div className="divide-y divide-brand-50">
              {(
                Object.entries(result.breakdown) as [
                  keyof BudgetEstimate["breakdown"],
                  number,
                ][]
              ).map(([key, amount]) => (
                <BreakdownRow
                  key={key}
                  label={BREAKDOWN_LABELS[key]}
                  amount={amount}
                  total={result.totalTWD}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-200">
              <span className="text-sm font-bold text-brand-900">合計</span>
              <span className="text-lg font-bold text-brand-900">
                NT$ {formatMoney(result.totalTWD)}
              </span>
            </div>
          </Card>

          <p className="text-xs text-slate-400 text-center">
            以上為概估金額，實際花費依個人消費習慣、旅遊季節、匯率波動而異。機票價格為參考值，建議以實際查詢為準。
          </p>
        </div>
      )}
    </div>
  );
}

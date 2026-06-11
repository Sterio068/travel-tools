"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { COUNTRIES } from "@/data/countries";
import { compareEsimPlans, type EsimDataUse } from "@/lib/calculations/esim";
import { formatMoney } from "@/lib/format";

const DATA_USE_OPTIONS = [
  { value: "light", label: "輕量：地圖、訊息、少量社群" },
  { value: "standard", label: "一般：地圖、社群、短影音" },
  { value: "heavy", label: "重度：熱點分享、影片、遠端工作" },
] satisfies Array<{ value: EsimDataUse; label: string }>;

const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.code,
  label: `${country.flag} ${country.nameZh}`,
}));

export default function EsimComparisonTool() {
  const [countryCode, setCountryCode] = useState("JP");
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(1);
  const [dataUse, setDataUse] = useState<EsimDataUse>("standard");
  const [deviceSupportsEsim, setDeviceSupportsEsim] = useState(true);
  const [needsLocalCalls, setNeedsLocalCalls] = useState(false);
  const [hotspotDevices, setHotspotDevices] = useState(0);

  const result = useMemo(
    () =>
      compareEsimPlans({
        countryCode,
        days,
        travelers,
        dataUse,
        deviceSupportsEsim,
        needsLocalCalls,
        hotspotDevices,
      }),
    [
      countryCode,
      days,
      travelers,
      dataUse,
      deviceSupportsEsim,
      needsLocalCalls,
      hotspotDevices,
    ],
  );

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="目的地"
            options={COUNTRY_OPTIONS}
            value={countryCode}
            onChange={(event) => setCountryCode(event.target.value)}
          />
          <Select
            label="上網用量"
            options={DATA_USE_OPTIONS}
            value={dataUse}
            onChange={(event) => setDataUse(event.target.value as EsimDataUse)}
          />
          <Input
            label="旅行天數"
            type="number"
            min={1}
            value={days}
            onChange={(event) => setDays(Number(event.target.value) || 0)}
            suffix="天"
          />
          <Input
            label="同行人數"
            type="number"
            min={1}
            value={travelers}
            onChange={(event) => setTravelers(Number(event.target.value) || 0)}
            suffix="人"
          />
          <Input
            label="需要一起連網的平板/筆電"
            type="number"
            min={0}
            value={hotspotDevices}
            onChange={(event) => setHotspotDevices(Number(event.target.value) || 0)}
            suffix="台"
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="flex items-start gap-3 rounded-[8px] border border-brand-100 bg-brand-50/35 p-3">
            <input
              type="checkbox"
              checked={deviceSupportsEsim}
              onChange={(event) => setDeviceSupportsEsim(event.target.checked)}
              className="mt-1 h-5 w-5 rounded border-brand-200 text-brand-500 focus:ring-brand-500"
            />
            <span>
              <span className="block text-sm font-semibold text-brand-900">
                手機支援 eSIM
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                iPhone XS/XR 之後與多數新 Android 支援，仍需確認台灣版本。
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-[8px] border border-brand-100 bg-brand-50/35 p-3">
            <input
              type="checkbox"
              checked={needsLocalCalls}
              onChange={(event) => setNeedsLocalCalls(event.target.checked)}
              className="mt-1 h-5 w-5 rounded border-brand-200 text-brand-500 focus:ring-brand-500"
            />
            <span>
              <span className="block text-sm font-semibold text-brand-900">
                需要當地電話號碼
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                叫車、訂餐或飯店聯絡常用電話者，可偏向實體 SIM。
              </span>
            </span>
          </label>
        </div>
      </Card>

      {result ? (
        <>
          <Card className="border-brand-300 bg-brand-50/50 p-5">
            <div className="text-sm font-semibold text-brand-700">建議優先看</div>
            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-2xl font-bold text-brand-900">
                  {result.recommendation.name}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  估計全程需要約 {result.totalDataGB}GB，平均每天每人約{" "}
                  {result.dailyDataGB}GB。此建議依使用情境排序，不代表特定供應商價格。
                </p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-xs text-slate-500">適配分數</div>
                <div className="text-3xl font-bold text-brand-700">
                  {result.recommendation.fitScore}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-3 lg:grid-cols-3">
            {result.plans.map((plan) => (
              <Card
                key={plan.type}
                className={`p-5 ${
                  plan.type === result.recommendation.type
                    ? "border-2 border-brand-400"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-brand-900">{plan.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      估算費用 NT$ {formatMoney(plan.estimatedCostTWD)}
                    </p>
                  </div>
                  <span className="rounded-[8px] bg-brand-50 px-2.5 py-1 text-sm font-bold text-brand-700">
                    {plan.fitScore}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                    適合原因
                  </div>
                  <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-700">
                    {plan.strengths.map((item) => (
                      <li key={item}>✓ {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                    注意
                  </div>
                  <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-600">
                    {plan.cautions.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card className="border-warning-100 bg-warning-50 p-5">
          <p className="font-semibold text-brand-900">請輸入有效天數、人數與裝置數。</p>
        </Card>
      )}
    </div>
  );
}

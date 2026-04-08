"use client";

import { useState, useMemo, useEffect } from "react";
import { COUNTRIES } from "@/data/countries";
import { getTimezoneInfo, convertTime } from "@/lib/calculations/timezone";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";

const POPULAR_CODES = ["JP", "KR", "TH", "US", "GB"];

export default function TimezoneChecker() {
  const [countryCode, setCountryCode] = useState("JP");
  const [twHour, setTwHour] = useState("12");
  const [twMinute, setTwMinute] = useState("00");
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const countryOptions = useMemo(
    () => COUNTRIES.map((c) => ({ value: c.code, label: `${c.flag} ${c.nameZh}` })),
    [],
  );

  const tzInfo = useMemo(() => getTimezoneInfo(countryCode), [countryCode]);

  const converted = useMemo(() => {
    const h = parseInt(twHour) || 0;
    const m = parseInt(twMinute) || 0;
    return convertTime(h, m, countryCode);
  }, [twHour, twMinute, countryCode]);

  const popularTimes = useMemo(
    () => POPULAR_CODES.map((code) => ({ code, info: getTimezoneInfo(code) })).filter((p) => p.info),
    [],
  );

  return (
    <div className="space-y-6">
      <Card>
        <Select
          label="選擇國家"
          options={countryOptions}
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        />
      </Card>

      {tzInfo && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-brand-50 to-white">
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-500">{tzInfo.flag} {tzInfo.countryName} 現在時間</p>
                <p className="text-4xl font-extrabold text-brand-600 tabular-nums">{tzInfo.localTime}</p>
              </div>
            </Card>
            <Card>
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-500">🇹🇼 台灣現在時間</p>
                <p className="text-4xl font-extrabold text-brand-900 tabular-nums">{tzInfo.twTime}</p>
              </div>
            </Card>
          </div>

          <Card>
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-1">時差</p>
              <p className="text-lg font-semibold text-accent-600">{tzInfo.description}</p>
            </div>
          </Card>
        </>
      )}

      <Card>
        <h3 className="text-sm font-semibold text-brand-900 mb-4">指定台灣時間換算</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-slate-500 mb-1">台灣時間</p>
            <div className="flex gap-2">
              <Input type="number" value={twHour} onChange={(e) => setTwHour(e.target.value)} suffix="時" />
              <Input type="number" value={twMinute} onChange={(e) => setTwMinute(e.target.value)} suffix="分" />
            </div>
          </div>
          <span className="text-slate-400 pt-5">→</span>
          <div className="flex-1 text-center">
            <p className="text-xs text-slate-500 mb-1">{tzInfo?.countryName || "目的地"}時間</p>
            {converted ? (
              <>
                <p className="text-2xl font-extrabold text-brand-600 tabular-nums">
                  {String(converted.localHour).padStart(2, "0")}:{String(converted.localMinute).padStart(2, "0")}
                </p>
                {converted.nextDay && <p className="text-xs text-accent-600 mt-1">+1 天（隔天）</p>}
                {converted.prevDay && <p className="text-xs text-accent-600 mt-1">-1 天（前一天）</p>}
              </>
            ) : (
              <p className="text-lg text-slate-400">--:--</p>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-brand-900 mb-4">熱門國家現在時間</h3>
        <div className="divide-y divide-brand-100">
          {popularTimes.map((p) => (
            <div key={p.code} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{p.info!.flag}</span>
                <span className="text-sm text-brand-800">{p.info!.countryName}</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-brand-900 tabular-nums">{p.info!.localTime}</p>
                <p className="text-xs text-slate-400">{p.info!.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

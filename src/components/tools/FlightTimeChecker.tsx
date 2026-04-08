"use client";

import { useState, useMemo } from "react";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { COUNTRIES } from "@/data/countries";

type FlightGroup = "短程" | "中程" | "長程";

function getGroup(hours: number): FlightGroup {
  if (hours < 4) return "短程";
  if (hours <= 8) return "中程";
  return "長程";
}

const GROUP_ORDER: FlightGroup[] = ["短程", "中程", "長程"];
const GROUP_LABELS: Record<FlightGroup, string> = {
  短程: "短程（4 小時以內）",
  中程: "中程（4 – 8 小時）",
  長程: "長程（8 小時以上）",
};
const GROUP_COLORS: Record<FlightGroup, string> = {
  短程: "bg-emerald-500",
  中程: "bg-brand-500",
  長程: "bg-accent-500",
};

export default function FlightTimeChecker() {
  const [selected, setSelected] = useState("");

  const sorted = useMemo(
    () => [...COUNTRIES].sort((a, b) => a.flightHours - b.flightHours),
    [],
  );

  const maxHours = useMemo(
    () => Math.max(...sorted.map((c) => c.flightHours)),
    [sorted],
  );

  const grouped = useMemo(() => {
    const map: Record<FlightGroup, typeof sorted> = {
      短程: [],
      中程: [],
      長程: [],
    };
    for (const c of sorted) {
      map[getGroup(c.flightHours)].push(c);
    }
    return map;
  }, [sorted]);

  const selectedCountry = COUNTRIES.find((c) => c.code === selected);

  return (
    <div className="space-y-6">
      {/* 選擇目的地 */}
      <Card className="p-6">
        <Select
          label="選擇目的地國家"
          options={[
            { value: "", label: "-- 請選擇 --" },
            ...sorted.map((c) => ({
              value: c.code,
              label: `${c.flag} ${c.nameZh}（${c.nameEn}）`,
            })),
          ]}
          value={selected}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelected(e.target.value)
          }
        />

        {selectedCountry && (
          <div className="mt-4 rounded-lg bg-brand-500/10 p-4 text-center">
            <span className="text-4xl">{selectedCountry.flag}</span>
            <p className="mt-2 text-lg font-semibold">
              台灣 → {selectedCountry.nameZh}
            </p>
            <p className="text-3xl font-bold text-brand-500">
              約 {selectedCountry.flightHours} 小時
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {getGroup(selectedCountry.flightHours)}航線（直飛預估）
            </p>
          </div>
        )}
      </Card>

      {/* 所有國家依群組顯示 */}
      {GROUP_ORDER.map((group) => {
        const countries = grouped[group];
        if (countries.length === 0) return null;
        return (
          <Card key={group} className="p-6">
            <h3 className="mb-4 text-lg font-bold">{GROUP_LABELS[group]}</h3>
            <div className="space-y-2">
              {countries.map((c) => {
                const pct = (c.flightHours / maxHours) * 100;
                const isSelected = c.code === selected;
                return (
                  <div
                    key={c.code}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                      isSelected
                        ? "bg-brand-500/10 ring-2 ring-brand-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="w-8 text-center text-xl">{c.flag}</span>
                    <span className="w-28 shrink-0 text-sm font-medium">
                      {c.nameZh}
                    </span>
                    <div className="flex-1">
                      <div className="h-5 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${GROUP_COLORS[group]} transition-all`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-16 text-right text-sm font-semibold tabular-nums text-gray-700">
                      {c.flightHours}h
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

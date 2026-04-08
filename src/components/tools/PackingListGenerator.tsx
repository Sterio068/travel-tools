"use client";

import { useState, useMemo, useCallback } from "react";
import {
  generatePackingList,
  CATEGORY_LABELS,
} from "@/lib/calculations/packing";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { PackingItem } from "@/types";

type Climate = "tropical" | "temperate" | "cold";
type Duration = "short" | "long";

const CLIMATE_OPTIONS: { value: Climate; label: string; icon: string }[] = [
  { value: "tropical", label: "熱帶", icon: "🌴" },
  { value: "temperate", label: "溫帶", icon: "🍂" },
  { value: "cold", label: "寒帶", icon: "❄️" },
];

const CATEGORY_ICONS: Record<string, string> = {
  documents: "📄",
  electronics: "🔌",
  clothing: "👕",
  toiletries: "🧴",
  medicine: "💊",
  misc: "🎒",
};

const CATEGORY_ORDER = [
  "documents",
  "electronics",
  "clothing",
  "toiletries",
  "medicine",
  "misc",
] as const;

export default function PackingListGenerator() {
  const [climate, setClimate] = useState<Climate>("tropical");
  const [duration, setDuration] = useState<Duration>("short");
  const [days, setDays] = useState<number>(5);
  const [items, setItems] = useState<PackingItem[] | null>(null);

  const handleDaysChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Math.max(1, Math.min(90, parseInt(e.target.value) || 1));
      setDays(val);
      const newDuration: Duration = val <= 5 ? "short" : "long";
      setDuration(newDuration);
    },
    []
  );

  const handleDurationToggle = useCallback((d: Duration) => {
    setDuration(d);
    if (d === "short" && 1) setDays((prev) => (prev > 5 ? 5 : prev));
    if (d === "long") setDays((prev) => (prev < 6 ? 7 : prev));
  }, []);

  const handleGenerate = useCallback(() => {
    const list = generatePackingList({ climate, duration, days });
    setItems(list);
  }, [climate, duration, days]);

  const handleToggle = useCallback((id: string) => {
    setItems((prev) =>
      prev
        ? prev.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
        : null
    );
  }, []);

  /* Group items by category */
  const grouped = useMemo(() => {
    if (!items) return null;
    const map = new Map<string, PackingItem[]>();
    for (const cat of CATEGORY_ORDER) {
      const catItems = items.filter((i) => i.category === cat);
      if (catItems.length > 0) map.set(cat, catItems);
    }
    return map;
  }, [items]);

  const totalCount = items?.length ?? 0;
  const checkedCount = items?.filter((i) => i.checked).length ?? 0;

  return (
    <div className="space-y-6">
      {/* Settings */}
      <Card>
        <div className="space-y-5">
          {/* Climate */}
          <div>
            <label className="block text-sm font-semibold text-brand-900 mb-2">
              氣候類型
            </label>
            <div className="flex gap-2">
              {CLIMATE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setClimate(opt.value)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    climate === opt.value
                      ? "bg-brand-500 text-white shadow-md"
                      : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                  }`}
                >
                  <span className="block text-lg mb-0.5">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-brand-900 mb-2">
              旅行長度
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleDurationToggle("short")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  duration === "short"
                    ? "bg-brand-500 text-white shadow-md"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                短程（1-5 天）
              </button>
              <button
                onClick={() => handleDurationToggle("long")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  duration === "long"
                    ? "bg-brand-500 text-white shadow-md"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                長程（6 天以上）
              </button>
            </div>
          </div>

          {/* Days */}
          <div>
            <label
              htmlFor="days-input"
              className="block text-sm font-semibold text-brand-900 mb-2"
            >
              天數
            </label>
            <input
              id="days-input"
              type="number"
              inputMode="numeric"
              min={1}
              max={90}
              value={days}
              onChange={handleDaysChange}
              className="w-full rounded-[10px] border border-brand-200 bg-brand-50/30 px-4 py-2.5 text-base text-brand-900 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all"
            />
          </div>

          {/* Generate */}
          <Button onClick={handleGenerate} className="w-full" size="lg">
            產生打包清單
          </Button>
        </div>
      </Card>

      {/* Packing list result */}
      {items && grouped && (
        <>
          {/* Progress card */}
          <Card className="bg-gradient-to-br from-brand-50 to-white border border-brand-200">
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-1">打包進度</p>
              <p className="text-2xl font-bold text-brand-500">
                已打包 {checkedCount}{" "}
                <span className="text-base font-normal text-slate-400">
                  / 共 {totalCount} 項
                </span>
              </p>
              {/* Progress bar */}
              <div className="mt-3 h-2 rounded-full bg-brand-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent-500 transition-all duration-300"
                  style={{
                    width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%`,
                  }}
                />
              </div>
              {checkedCount === totalCount && totalCount > 0 && (
                <p className="text-sm text-accent-500 font-semibold mt-2">
                  全部打包完成！祝旅途愉快！
                </p>
              )}
            </div>
          </Card>

          {/* Categories */}
          {Array.from(grouped.entries()).map(([category, catItems]) => (
            <Card key={category}>
              <h3 className="text-base font-bold text-brand-900 mb-3 flex items-center gap-2">
                <span className="text-xl">
                  {CATEGORY_ICONS[category] ?? "📦"}
                </span>
                {CATEGORY_LABELS[category] ?? category}
                <span className="text-xs font-normal text-slate-400 ml-auto">
                  {catItems.filter((i) => i.checked).length} / {catItems.length}
                </span>
              </h3>
              <ul className="space-y-1">
                {catItems.map((item) => (
                  <li key={item.id}>
                    <label className="flex items-center gap-3 py-1.5 px-2 -mx-2 rounded-lg hover:bg-brand-50/50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleToggle(item.id)}
                        className="h-4.5 w-4.5 rounded border-brand-300 text-brand-500 focus:ring-brand-200 accent-brand-500 cursor-pointer"
                      />
                      <span
                        className={`text-sm flex-1 ${
                          item.checked
                            ? "line-through text-slate-400"
                            : "text-slate-700"
                        }`}
                      >
                        {item.name}
                      </span>
                      {item.essential && (
                        <span
                          className="text-xs shrink-0"
                          title="必備物品"
                          aria-label="必備物品"
                        >
                          ⭐
                        </span>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

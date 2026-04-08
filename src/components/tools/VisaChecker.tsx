"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { COUNTRIES } from "@/data/countries";

type FilterType = "all" | "visa-free" | "visa-required";

export default function VisaChecker() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const filteredCountries = useMemo(() => {
    let list = [...COUNTRIES];

    // 搜尋過濾
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.nameZh.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q),
      );
    }

    // 簽證狀態過濾
    if (filter === "visa-free") {
      list = list.filter((c) => !c.visaRequired);
    } else if (filter === "visa-required") {
      list = list.filter((c) => !!c.visaRequired);
    }

    // 免簽排前面
    list.sort((a, b) => {
      if (!a.visaRequired && !!b.visaRequired) return -1;
      if (!!a.visaRequired && !b.visaRequired) return 1;
      return a.nameZh.localeCompare(b.nameZh, "zh-Hant");
    });

    return list;
  }, [filter, search]);

  const counts = useMemo(() => {
    const visaFree = COUNTRIES.filter((c) => !c.visaRequired).length;
    return {
      all: COUNTRIES.length,
      visaFree,
      visaRequired: COUNTRIES.length - visaFree,
    };
  }, []);

  const filterButtons: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "全部", count: counts.all },
    { key: "visa-free", label: "免簽", count: counts.visaFree },
    { key: "visa-required", label: "需簽證", count: counts.visaRequired },
  ];

  return (
    <div className="space-y-6">
      {/* 統計摘要 */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-brand-500">{counts.all}</p>
          <p className="text-xs text-gray-500">收錄國家</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{counts.visaFree}</p>
          <p className="text-xs text-gray-500">免簽國家</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-red-500">
            {counts.visaRequired}
          </p>
          <p className="text-xs text-gray-500">需簽證</p>
        </Card>
      </div>

      {/* 搜尋與篩選 */}
      <Card className="p-4 space-y-3">
        <input
          type="text"
          placeholder="搜尋國家名稱..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
        />

        <div className="flex gap-2">
          {filterButtons.map((fb) => (
            <Button
              key={fb.key}
              variant={filter === fb.key ? "primary" : "ghost"}
              size="sm"
              onClick={() => setFilter(fb.key)}
              className={
                filter === fb.key
                  ? "bg-brand-500 text-white"
                  : "hover:border-brand-500 hover:text-brand-500"
              }
            >
              {fb.label}（{fb.count}）
            </Button>
          ))}
        </div>
      </Card>

      {/* 國家卡片網格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredCountries.map((country) => (
          <Card
            key={country.code}
            className="p-4 flex flex-col items-center text-center gap-2 hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">{country.flag}</span>
            <p className="font-medium text-sm text-gray-900 leading-tight">
              {country.nameZh}
            </p>

            {/* 簽證狀態 badge */}
            {!country.visaRequired ? (
              <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                免簽
              </span>
            ) : (
              <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-600">
                需簽證
              </span>
            )}

            {/* 免簽天數 */}
            {!country.visaRequired && country.visaFreeDays && (
              <p className="text-xs text-gray-500">
                {country.visaFreeDays} 天
              </p>
            )}

            {/* 入境條件 */}
            {country.entryRequirements && (
              <p className="text-xs text-gray-400 leading-snug">
                {country.entryRequirements}
              </p>
            )}
          </Card>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <Card className="p-6 text-center text-gray-400">
          <p>找不到符合條件的國家</p>
        </Card>
      )}
    </div>
  );
}

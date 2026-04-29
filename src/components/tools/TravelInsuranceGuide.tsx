"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

interface InsuranceType {
  id: string;
  name: string;
  icon: string;
  description: string;
  covers: string[];
  costRange: string;
  recommended: string;
}

const INSURANCE_TYPES: InsuranceType[] = [
  {
    id: "travel",
    name: "旅平險",
    icon: "🛡️",
    description: "旅遊平安保險，保障旅途中的意外傷害與身故。",
    covers: [
      "意外身故及失能",
      "意外傷害醫療",
      "海外突發疾病醫療",
      "緊急救援服務",
    ],
    costRange: "NT$100 – 500 / 天",
    recommended: "所有出國旅客，特別是自由行旅客",
  },
  {
    id: "inconvenience",
    name: "不便險",
    icon: "⏱️",
    description: "旅遊不便保險，保障班機延誤、行李遺失等突發狀況的額外花費。",
    covers: [
      "班機延誤（通常 4 小時以上）",
      "行李延誤或遺失",
      "行程取消或縮短",
      "旅行文件遺失補辦費用",
    ],
    costRange: "NT$50 – 300 / 天",
    recommended: "轉機行程多、旅程較長的旅客",
  },
  {
    id: "creditcard",
    name: "信用卡旅遊險",
    icon: "💳",
    description:
      "刷卡購買機票或團費後自動附贈的保險，保障範圍依發卡銀行與卡別而異。",
    covers: [
      "基本旅遊平安險（依卡別）",
      "部分卡別含不便險",
      "公共運輸意外險",
      "保額通常較低",
    ],
    costRange: "免費（需刷卡支付旅費）",
    recommended: "預算有限或短途旅行者，建議搭配旅平險補強",
  },
];

const COMPARISON_ROWS = [
  {
    label: "保費",
    travel: "依天數計費",
    inconvenience: "依天數計費",
    creditcard: "免費（刷卡附贈）",
  },
  {
    label: "意外醫療",
    travel: "✅ 含",
    inconvenience: "❌ 不含",
    creditcard: "⚠️ 依卡別",
  },
  {
    label: "班機延誤",
    travel: "❌ 不含",
    inconvenience: "✅ 含",
    creditcard: "⚠️ 依卡別",
  },
  {
    label: "行李遺失",
    travel: "❌ 不含",
    inconvenience: "✅ 含",
    creditcard: "⚠️ 依卡別",
  },
  {
    label: "海外疾病",
    travel: "✅ 可加保",
    inconvenience: "❌ 不含",
    creditcard: "❌ 通常不含",
  },
  {
    label: "保額彈性",
    travel: "高",
    inconvenience: "中",
    creditcard: "低（固定）",
  },
  {
    label: "理賠速度",
    travel: "中",
    inconvenience: "中",
    creditcard: "慢",
  },
];

interface CheckItem {
  id: string;
  label: string;
}

const CHECKLIST: CheckItem[] = [
  { id: "days", label: "確認旅遊天數（保險期間需涵蓋完整行程）" },
  { id: "dest", label: "確認目的地國家（部分地區保費較高）" },
  { id: "activity", label: "確認是否有高風險活動（潛水、滑雪等需加保）" },
  { id: "medical", label: "確認個人病史（既往症通常不理賠）" },
  { id: "family", label: "同行家人是否也需要投保" },
  { id: "existing", label: "檢查信用卡既有保障範圍，避免重複投保" },
  { id: "docs", label: "準備護照影本與緊急聯絡人資訊" },
];

export default function TravelInsuranceGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-8">
      {/* 三種保險卡片 */}
      <div className="grid gap-4 md:grid-cols-3">
        {INSURANCE_TYPES.map((ins) => (
          <Card key={ins.id} className="flex flex-col p-6">
            <div className="mb-3 text-center text-4xl">{ins.icon}</div>
            <h3 className="mb-2 text-center text-xl font-bold">{ins.name}</h3>
            <p className="mb-4 text-sm text-gray-600">{ins.description}</p>

            <div className="mb-4">
              <h4 className="mb-1 text-sm font-semibold text-gray-700">
                保障範圍
              </h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {ins.covers.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-brand-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-2 border-t pt-4">
              <div>
                <span className="text-xs text-gray-500">費用參考</span>
                <p className="font-semibold text-accent-500">
                  {ins.costRange}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500">推薦對象</span>
                <p className="text-sm">{ins.recommended}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 比較表 */}
      <Card className="overflow-x-auto p-6">
        <h3 className="mb-4 text-lg font-bold">三種保險比較</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-2 pr-4">項目</th>
              <th className="pb-2 pr-4">🛡️ 旅平險</th>
              <th className="pb-2 pr-4">⏱️ 不便險</th>
              <th className="pb-2">💳 信用卡險</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.label} className="border-b last:border-0">
                <td className="py-2 pr-4 font-medium">{row.label}</td>
                <td className="py-2 pr-4">{row.travel}</td>
                <td className="py-2 pr-4">{row.inconvenience}</td>
                <td className="py-2">{row.creditcard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 投保前確認清單 */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold">投保前確認清單</h3>
        <div className="space-y-3">
          {CHECKLIST.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={() => toggle(item.id)}
                className="h-5 w-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
              />
              <span
                className={
                  checked[item.id] ? "text-gray-400 line-through" : ""
                }
              >
                {item.label}
              </span>
            </label>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          已完成 {Object.values(checked).filter(Boolean).length} /{" "}
          {CHECKLIST.length} 項
        </p>
      </Card>

      {/* CTA */}
      <Card className="bg-brand-500/5 p-6 text-center">
        <p className="mb-3 text-lg font-semibold">出國旅遊，保障不能少！</p>
        <p className="mb-4 text-sm text-gray-600">
          建議至少投保旅平險＋不便險，讓旅途更安心。
        </p>
        <Link
          href="/articles/travel-insurance-guide"
          className="inline-flex items-center px-6 py-3 rounded-[12px] bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors"
        >
          閱讀投保指南 →
        </Link>
      </Card>
    </div>
  );
}

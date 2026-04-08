"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Tab = "inbound" | "outbound";

interface RegulationItem {
  icon: string;
  title: string;
  details: string[];
  category: string;
}

const INBOUND_REGULATIONS: RegulationItem[] = [
  {
    icon: "💰",
    title: "免稅額度 — 外幣現金",
    details: ["每人可攜帶等值 USD 20,000 之外幣入境", "超過須向海關申報"],
    category: "免稅額度",
  },
  {
    icon: "🚬",
    title: "免稅額度 — 菸品",
    details: [
      "捲菸 200 支（1 條）",
      "或雪茄 25 支",
      "或菸絲 1 磅",
      "三者擇一，不得合併計算",
    ],
    category: "免稅額度",
  },
  {
    icon: "🍷",
    title: "免稅額度 — 酒類",
    details: ["酒類 1 公升（不限瓶數）", "超過須課稅"],
    category: "免稅額度",
  },
  {
    icon: "🚫",
    title: "禁止攜帶入境",
    details: [
      "新鮮水果及蔬菜",
      "肉類製品（含真空包裝、肉乾、肉鬆）",
      "活體動物及植物",
      "未經核可之動植物產品",
      "毒品及管制藥品",
    ],
    category: "禁止攜帶",
  },
  {
    icon: "📋",
    title: "需主動申報",
    details: [
      "超額外幣現金（等值 USD 10,000 以上）",
      "黃金（價值 USD 20,000 以上）",
      "有價證券（總面額 USD 10,000 以上）",
      "超量菸酒",
      "攜帶物品總價值超過免稅限額 TWD 20,000",
    ],
    category: "需申報",
  },
  {
    icon: "💊",
    title: "藥品限量規定",
    details: [
      "非處方藥：每種最多 12 瓶/盒，合計不超過 36 瓶/盒",
      "處方藥：需攜帶處方箋或醫師證明",
      "種類以 6 種為限",
      "中藥材：每種最多 1 公斤，合計 12 種以內",
    ],
    category: "特殊規定",
  },
];

const OUTBOUND_REGULATIONS: RegulationItem[] = [
  {
    icon: "💵",
    title: "現金攜帶限制 — 新台幣",
    details: ["新台幣現金不得超過 NTD 100,000", "超過須向央行申請核准"],
    category: "現金限制",
  },
  {
    icon: "💴",
    title: "現金攜帶限制 — 人民幣",
    details: ["人民幣現金不得超過 CNY 20,000", "超過部分須主動存入海關保管"],
    category: "現金限制",
  },
  {
    icon: "💲",
    title: "現金攜帶限制 — 外幣",
    details: [
      "外幣現金等值 USD 10,000 以下免申報",
      "超過須向海關申報",
      "未申報者超額部分將被沒入",
    ],
    category: "現金限制",
  },
  {
    icon: "📜",
    title: "有價證券",
    details: [
      "有價證券總面額等值 USD 10,000 以下免申報",
      "超過須向海關申報",
    ],
    category: "現金限制",
  },
  {
    icon: "🚫",
    title: "禁止攜帶出境",
    details: [
      "偽造貨幣及有價證券",
      "毒品及管制藥品",
      "槍砲彈藥刀械",
      "保育類野生動植物及其產製品",
      "未經授權之智慧財產權商品",
    ],
    category: "禁止攜帶",
  },
];

export default function CustomsChecker() {
  const [tab, setTab] = useState<Tab>("inbound");
  const [searchTerm, setSearchTerm] = useState("");

  const regulations =
    tab === "inbound" ? INBOUND_REGULATIONS : OUTBOUND_REGULATIONS;

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return regulations;
    const q = searchTerm.trim().toLowerCase();
    return regulations.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.details.some((d) => d.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q),
    );
  }, [regulations, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Tab buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => {
            setTab("inbound");
            setSearchTerm("");
          }}
          className={
            tab === "inbound"
              ? "bg-brand-500 text-white"
              : "bg-gray-100 text-gray-600"
          }
        >
          入境台灣
        </Button>
        <Button
          onClick={() => {
            setTab("outbound");
            setSearchTerm("");
          }}
          className={
            tab === "outbound"
              ? "bg-brand-500 text-white"
              : "bg-gray-100 text-gray-600"
          }
        >
          出境台灣
        </Button>
      </div>

      {/* Search */}
      <Input
        type="text"
        placeholder="搜尋項目（例如：菸、酒、藥品、現金...）"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />

      {/* Regulations */}
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-gray-400">
          找不到符合「{searchTerm}」的規定
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((item) => (
            <Card key={item.title} className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label={item.title}>
                  {item.icon}
                </span>
                <h3 className="text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
              <span className="mb-3 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                {item.category}
              </span>
              <ul className="space-y-1">
                {item.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        ※ 以上資訊僅供參考，實際規定以財政部關務署及相關主管機關最新公告為準。出入境前請務必確認最新法規。
      </p>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { COUNTRIES } from "@/data/countries";
import { calculateTip, type TipResult } from "@/lib/calculations/tip";

const QUICK_TIPS = [10, 15, 18, 20] as const;

export default function TipCalculator() {
  const [countryCode, setCountryCode] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [customPercent, setCustomPercent] = useState<string>("");
  const [activeQuick, setActiveQuick] = useState<number | null>(null);

  const result: TipResult | null = useMemo(() => {
    if (!countryCode || !billAmount) return null;
    const amount = parseFloat(billAmount);
    if (isNaN(amount) || amount <= 0) return null;
    const tipPct = customPercent ? parseFloat(customPercent) : undefined;
    return calculateTip(
      countryCode,
      amount,
      tipPct !== undefined && !isNaN(tipPct) ? tipPct : undefined,
    );
  }, [countryCode, billAmount, customPercent]);

  const handleQuickTip = (pct: number) => {
    setActiveQuick(pct);
    setCustomPercent(String(pct));
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPercent(e.target.value);
    setActiveQuick(null);
  };

  return (
    <div className="space-y-6">
      {/* 輸入區 */}
      <Card className="p-6 space-y-4">
        <Select
          label="選擇國家"
          options={[
            { value: "", label: "請選擇國家" },
            ...COUNTRIES.map((c) => ({
              value: c.code,
              label: `${c.flag} ${c.nameZh}`,
            })),
          ]}
          value={countryCode}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCountryCode(e.target.value)
          }
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            帳單金額（當地貨幣）
          </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="輸入帳單金額"
            value={billAmount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBillAmount(e.target.value)
            }
          />
        </div>

        {/* 快捷小費按鈕 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            快捷小費比例
          </label>
          <div className="flex gap-2">
            {QUICK_TIPS.map((pct) => (
              <Button
                key={pct}
                variant={activeQuick === pct ? "primary" : "ghost"}
                size="sm"
                onClick={() => handleQuickTip(pct)}
                className={
                  activeQuick === pct
                    ? "bg-brand-500 text-white"
                    : "hover:border-brand-500 hover:text-brand-500"
                }
              >
                {pct}%
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            自訂小費比例（選填）
          </label>
          <Input
            type="number"
            min="0"
            max="100"
            step="1"
            placeholder="例如 12"
            value={customPercent}
            onChange={handleCustomChange}
          />
        </div>
      </Card>

      {/* 結果區 */}
      {result && (
        <Card className="p-6 space-y-4">
          {/* 小費文化 */}
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-medium">
              {result.tippingCulture}
            </span>
            <span className="text-gray-500">
              建議小費 {result.suggestedPercent}%
            </span>
          </div>

          {/* 金額顯示 */}
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="text-center p-4 bg-accent-500/5 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">小費金額</p>
              <p className="text-3xl font-bold text-accent-500">
                {result.currencySymbol}
                {result.tipAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="text-center p-4 bg-brand-500/5 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">含小費總計</p>
              <p className="text-3xl font-bold text-brand-500">
                {result.currencySymbol}
                {result.totalWithTip.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* 文化建議 */}
          {result.advice && (
            <div className="p-3 bg-gold-500/5 border border-gold-500/20 rounded-lg">
              <p className="text-sm font-medium text-gold-500 mb-1">
                當地小費文化
              </p>
              <p className="text-sm text-gray-600">{result.advice}</p>
            </div>
          )}
        </Card>
      )}

      {/* 空狀態 */}
      {!result && (
        <Card className="p-6 text-center text-gray-400">
          <p>選擇國家並輸入帳單金額即可計算小費</p>
        </Card>
      )}
    </div>
  );
}

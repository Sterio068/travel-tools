"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { COUNTRIES } from "@/data/countries";
import {
  calculateTaxRefund,
  type TaxRefundResult,
} from "@/lib/calculations/tax-refund";

export default function TaxRefundCalculator() {
  const [countryCode, setCountryCode] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");

  const result: TaxRefundResult | null = useMemo(() => {
    if (!countryCode || !purchaseAmount) return null;
    const amount = parseFloat(purchaseAmount);
    if (isNaN(amount) || amount <= 0) return null;
    return calculateTaxRefund(countryCode, amount);
  }, [countryCode, purchaseAmount]);

  const statusColor = result
    ? result.refundAvailable && result.meetsMinimum
      ? "text-green-600 bg-green-50 border-green-200"
      : result.refundAvailable && !result.meetsMinimum
        ? "text-yellow-600 bg-yellow-50 border-yellow-200"
        : "text-gray-500 bg-gray-50 border-gray-200"
    : "";

  const statusLabel = result
    ? result.refundAvailable && result.meetsMinimum
      ? "可申請退稅"
      : result.refundAvailable && !result.meetsMinimum
        ? "未達最低消費門檻"
        : "該國無退稅制度"
    : "";

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
            消費金額（當地貨幣）
          </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="輸入消費金額"
            value={purchaseAmount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPurchaseAmount(e.target.value)
            }
          />
        </div>
      </Card>

      {/* 結果區 */}
      {result && (
        <Card className={`p-6 border-2 ${statusColor}`}>
          {/* 狀態標籤 */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                result.refundAvailable && result.meetsMinimum
                  ? "bg-green-500"
                  : result.refundAvailable
                    ? "bg-yellow-500"
                    : "bg-gray-400"
              }`}
            />
            <span className="font-semibold text-lg">{statusLabel}</span>
          </div>

          {/* 退稅金額 */}
          {result.refundAvailable && result.meetsMinimum && (
            <div className="text-center my-6">
              <p className="text-sm text-gray-500 mb-1">預估退稅金額</p>
              <p className="text-4xl font-bold text-green-600">
                {result.currencySymbol}
                {result.estimatedRefund.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                退稅比例 {result.refundPercent}%
              </p>
            </div>
          )}

          {/* 詳細資訊 */}
          <div className="space-y-2 text-sm">
            {result.refundAvailable && !result.meetsMinimum && (
              <p>
                最低消費門檻：{result.currencySymbol}
                {result.minPurchase.toLocaleString()} （尚差{" "}
                {result.currencySymbol}
                {(
                  result.minPurchase - parseFloat(purchaseAmount)
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                ）
              </p>
            )}

            {result.refundAvailable && result.meetsMinimum && (
              <p>
                最低消費門檻：{result.currencySymbol}
                {result.minPurchase.toLocaleString()} ✓
              </p>
            )}

            {result.notes && (
              <div className="mt-3 p-3 bg-white/60 rounded-lg">
                <p className="font-medium mb-1">注意事項</p>
                <p className="text-gray-600">{result.notes}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 空狀態提示 */}
      {!result && (
        <Card className="p-6 text-center text-gray-400">
          <p>選擇國家並輸入消費金額即可計算退稅</p>
        </Card>
      )}
    </div>
  );
}

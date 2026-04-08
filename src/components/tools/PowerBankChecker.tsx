"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface ReferenceRow {
  label: string;
  mAh: number;
  voltage: number;
  wh: number;
}

const REFERENCE_TABLE: ReferenceRow[] = [
  { label: "小型行動電源", mAh: 5000, voltage: 3.7, wh: 18.5 },
  { label: "標準行動電源", mAh: 10000, voltage: 3.7, wh: 37 },
  { label: "大容量行動電源", mAh: 20000, voltage: 3.7, wh: 74 },
  { label: "超大容量行動電源", mAh: 26800, voltage: 3.6, wh: 96.5 },
  { label: "筆電行動電源", mAh: 30000, voltage: 3.7, wh: 111 },
];

type Status = "ok" | "warn" | "danger";

function getStatus(wh: number): { status: Status; label: string; desc: string } {
  if (wh <= 0) return { status: "ok", label: "", desc: "" };
  if (wh <= 100)
    return {
      status: "ok",
      label: "可隨身攜帶，不可託運 ✅",
      desc: "符合航空規定，可放入隨身行李登機。",
    };
  if (wh <= 160)
    return {
      status: "warn",
      label: "需經航空公司同意，限隨身攜帶 ⚠️",
      desc: "容量介於 100–160Wh，須事先取得航空公司同意，且僅限隨身攜帶，不可託運。每人最多攜帶 2 個。",
    };
  return {
    status: "danger",
    label: "禁止攜帶上飛機 ❌",
    desc: "超過 160Wh 的鋰電池，無論隨身或託運皆禁止攜帶上飛機。",
  };
}

const STATUS_STYLES: Record<Status, string> = {
  ok: "border-green-500 bg-green-50 text-green-800",
  warn: "border-gold-500 bg-yellow-50 text-yellow-800",
  danger: "border-red-500 bg-red-50 text-red-800",
};

export default function PowerBankChecker() {
  const [mAh, setMAh] = useState(20000);
  const [voltage, setVoltage] = useState(3.7);

  const wh = useMemo(() => (mAh * voltage) / 1000, [mAh, voltage]);
  const result = useMemo(() => getStatus(wh), [wh]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              電池容量 (mAh)
            </label>
            <Input
              type="number"
              min={0}
              value={mAh}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMAh(Number(e.target.value) || 0)
              }
              placeholder="例如 20000"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              電壓 (V)
            </label>
            <Input
              type="number"
              min={0}
              step={0.1}
              value={voltage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVoltage(Number(e.target.value) || 0)
              }
              placeholder="預設 3.7"
            />
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          計算公式：Wh = mAh × V ÷ 1000 ={" "}
          <span className="font-semibold text-gray-800">{wh.toFixed(1)} Wh</span>
        </p>
      </Card>

      {/* Result */}
      {wh > 0 && (
        <Card className={`border-2 p-5 ${STATUS_STYLES[result.status]}`}>
          <p className="text-xl font-bold">{result.label}</p>
          <p className="mt-1 text-sm">{result.desc}</p>
          <p className="mt-2 text-lg font-semibold">
            你的行動電源：{mAh.toLocaleString()} mAh / {voltage}V ={" "}
            {wh.toFixed(1)} Wh
          </p>
        </Card>
      )}

      {/* Reference Table */}
      <Card className="overflow-hidden p-0">
        <h3 className="px-5 pt-5 text-base font-semibold text-gray-800">
          常見行動電源容量參考
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-gray-500">
                <th className="px-5 py-2 font-medium">類型</th>
                <th className="px-5 py-2 font-medium">容量</th>
                <th className="px-5 py-2 font-medium">電壓</th>
                <th className="px-5 py-2 font-medium">Wh</th>
                <th className="px-5 py-2 font-medium">可否登機</th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE_TABLE.map((row) => {
                const s = getStatus(row.wh);
                return (
                  <tr key={row.label} className="border-b last:border-b-0">
                    <td className="px-5 py-3 font-medium text-gray-800">
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {row.mAh.toLocaleString()} mAh
                    </td>
                    <td className="px-5 py-3 text-gray-600">{row.voltage}V</td>
                    <td className="px-5 py-3 text-gray-600">
                      {row.wh.toFixed(1)} Wh
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          s.status === "ok"
                            ? "bg-green-100 text-green-700"
                            : s.status === "warn"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {s.status === "ok"
                          ? "可隨身"
                          : s.status === "warn"
                            ? "需申請"
                            : "禁止"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Important Rules */}
      <Card className="p-5">
        <h3 className="mb-3 text-base font-semibold text-gray-800">
          登機鋰電池重要規定
        </h3>
        <ul className="space-y-2">
          {[
            "行動電源必須放在隨身行李，嚴禁託運",
            "電池端子（接頭）需以絕緣膠帶或保護蓋保護",
            "每人最多攜帶 2 個備用鋰電池（100–160Wh 需航空公司同意）",
            "行動電源上須清楚標示容量（mAh 或 Wh），無標示者可能被拒絕登機",
            "飛行途中禁止使用行動電源為裝置充電（部分航空公司規定）",
            "損壞、膨脹或召回的電池禁止攜帶登機",
          ].map((rule) => (
            <li key={rule} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
              {rule}
            </li>
          ))}
        </ul>
      </Card>

      <p className="text-xs text-gray-400">
        ※ 以上規定依據國際民航組織（ICAO）及台灣民航局公告整理，各航空公司可能有更嚴格的規定，建議出發前向航空公司確認。
      </p>
    </div>
  );
}

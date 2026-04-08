"use client";

import { useState, useMemo, useCallback } from "react";
import { COUNTRIES } from "@/data/countries";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

/* Taiwan baseline */
const TW_PLUG_TYPES = ["A", "B"];
const TW_VOLTAGE = 110;
const TW_FREQUENCY = 60;

type Compatibility = "compatible" | "adapter" | "converter";

function getCompatibility(
  plugTypes: string[],
  voltage: number
): Compatibility {
  const plugMatch = plugTypes.some((p) => TW_PLUG_TYPES.includes(p));
  const voltageMatch =
    Math.abs(voltage - TW_VOLTAGE) <= 10; /* 100-120 V is safe */

  if (plugMatch && voltageMatch) return "compatible";
  if (!voltageMatch) return "converter";
  return "adapter";
}

const COMPAT_CONFIG: Record<
  Compatibility,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  compatible: {
    label: "直接使用，無需轉接",
    color: "text-accent-500",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "checkmark",
  },
  adapter: {
    label: "需要轉接頭",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "warning",
  },
  converter: {
    label: "需要變壓器 + 轉接頭",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "danger",
  },
};

function getAdvice(
  plugTypes: string[],
  voltage: number,
  frequency: number,
  compat: Compatibility
): string[] {
  const tips: string[] = [];
  const plugMatch = plugTypes.some((p) => TW_PLUG_TYPES.includes(p));

  if (compat === "compatible") {
    tips.push("台灣電器可以直接使用，不需任何轉換設備。");
    tips.push("手機、筆電等充電器通常支援 100-240V 寬電壓，可放心充電。");
  } else {
    if (!plugMatch) {
      const foreignTypes = plugTypes.filter(
        (p) => !TW_PLUG_TYPES.includes(p)
      );
      tips.push(
        `當地使用 Type ${foreignTypes.join(", ")} 插頭，與台灣的 Type A/B 不同，需要準備轉接頭。`
      );
      tips.push("建議購買萬用轉接頭，一個就能應付多國規格。");
    }

    if (Math.abs(voltage - TW_VOLTAGE) > 10) {
      tips.push(
        `當地電壓 ${voltage}V，與台灣 110V 差距大。吹風機、電捲棒等「發熱類」電器需要變壓器，否則可能燒毀。`
      );
      tips.push(
        "手機充電器、筆電變壓器通常標示 100-240V，可直接使用不需變壓器（請確認標示）。"
      );
    }

    if (frequency !== TW_FREQUENCY) {
      tips.push(
        `當地頻率 ${frequency}Hz，台灣為 60Hz。一般電器不受影響，但含馬達的電器（如電動刮鬍刀）可能轉速不同。`
      );
    }
  }

  return tips;
}

const PLUG_TYPE_NAMES: Record<string, string> = {
  A: "兩扁腳（台灣/美國）",
  B: "兩扁腳+圓地線（台灣/美國）",
  C: "兩圓腳（歐洲）",
  D: "三大圓腳（印度）",
  E: "兩圓腳+圓地腳（法國）",
  F: "兩圓腳+夾片地線（德國）",
  G: "三方腳（英國）",
  I: "斜八字腳（澳洲）",
  L: "三直排圓腳（義大利）",
};

export default function PlugVoltageChecker() {
  const [selectedCode, setSelectedCode] = useState(COUNTRIES[0].code);

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === selectedCode) ?? COUNTRIES[0],
    [selectedCode]
  );

  const countryOptions = useMemo(
    () =>
      COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.nameZh}（${c.nameEn}）`,
      })),
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCode(e.target.value);
    },
    []
  );

  const compat = getCompatibility(country.plugType, country.voltage);
  const config = COMPAT_CONFIG[compat];
  const advice = getAdvice(
    country.plugType,
    country.voltage,
    country.frequency,
    compat
  );

  return (
    <div className="space-y-6">
      {/* Country selector */}
      <Card>
        <Select
          label="選擇目的地國家"
          options={countryOptions}
          value={selectedCode}
          onChange={handleChange}
        />
      </Card>

      {/* Plug type display */}
      <Card>
        <h2 className="text-sm font-semibold text-brand-900 mb-4">
          {country.flag} {country.nameZh} 插頭與電壓規格
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Plug types */}
          <div className="text-center p-4 rounded-xl bg-brand-50/50">
            <p className="text-xs text-slate-500 mb-1">插頭類型</p>
            <p className="text-2xl font-bold text-brand-500">
              {country.plugType.map((t) => `Type ${t}`).join(", ")}
            </p>
            <div className="mt-2 space-y-0.5">
              {country.plugType.map((t) => (
                <p key={t} className="text-xs text-slate-500">
                  {PLUG_TYPE_NAMES[t] ?? t}
                </p>
              ))}
            </div>
          </div>

          {/* Voltage */}
          <div className="text-center p-4 rounded-xl bg-brand-50/50">
            <p className="text-xs text-slate-500 mb-1">電壓</p>
            <p className="text-2xl font-bold text-brand-500">
              {country.voltage}V
            </p>
            <p className="text-xs text-slate-500 mt-2">
              台灣：{TW_VOLTAGE}V
            </p>
          </div>

          {/* Frequency */}
          <div className="text-center p-4 rounded-xl bg-brand-50/50">
            <p className="text-xs text-slate-500 mb-1">頻率</p>
            <p className="text-2xl font-bold text-brand-500">
              {country.frequency}Hz
            </p>
            <p className="text-xs text-slate-500 mt-2">
              台灣：{TW_FREQUENCY}Hz
            </p>
          </div>
        </div>
      </Card>

      {/* Compatibility result */}
      <Card className={`${config.bg} border ${config.border}`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">
            {compat === "compatible" && "✅"}
            {compat === "adapter" && "⚠️"}
            {compat === "converter" && "🔴"}
          </span>
          <div>
            <h3 className={`text-lg font-bold ${config.color}`}>
              {config.label}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {compat === "compatible" &&
                "台灣電器在這個國家可以直接使用，插頭和電壓都相容。"}
              {compat === "adapter" &&
                "插頭規格不同但電壓接近，只需要轉接頭即可。"}
              {compat === "converter" &&
                "電壓差異大，發熱類電器（吹風機、電捲棒等）需要變壓器，否則會燒毀。"}
            </p>
          </div>
        </div>
      </Card>

      {/* Spec comparison */}
      <Card>
        <h2 className="text-sm font-semibold text-brand-900 mb-3">
          台灣 vs {country.nameZh} 規格比較
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100">
                <th className="text-left py-2 text-slate-500 font-medium">
                  項目
                </th>
                <th className="text-center py-2 text-slate-500 font-medium">
                  台灣
                </th>
                <th className="text-center py-2 text-slate-500 font-medium">
                  {country.flag} {country.nameZh}
                </th>
                <th className="text-center py-2 text-slate-500 font-medium">
                  相容
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-brand-50">
                <td className="py-2.5 text-brand-900">插頭</td>
                <td className="py-2.5 text-center text-slate-600">
                  Type A, B
                </td>
                <td className="py-2.5 text-center text-slate-600">
                  Type {country.plugType.join(", ")}
                </td>
                <td className="py-2.5 text-center">
                  {country.plugType.some((p) => TW_PLUG_TYPES.includes(p))
                    ? "✅"
                    : "❌"}
                </td>
              </tr>
              <tr className="border-b border-brand-50">
                <td className="py-2.5 text-brand-900">電壓</td>
                <td className="py-2.5 text-center text-slate-600">
                  {TW_VOLTAGE}V
                </td>
                <td className="py-2.5 text-center text-slate-600">
                  {country.voltage}V
                </td>
                <td className="py-2.5 text-center">
                  {Math.abs(country.voltage - TW_VOLTAGE) <= 10 ? "✅" : "❌"}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-brand-900">頻率</td>
                <td className="py-2.5 text-center text-slate-600">
                  {TW_FREQUENCY}Hz
                </td>
                <td className="py-2.5 text-center text-slate-600">
                  {country.frequency}Hz
                </td>
                <td className="py-2.5 text-center">
                  {country.frequency === TW_FREQUENCY ? "✅" : "⚠️"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Practical advice */}
      <Card>
        <h2 className="text-sm font-semibold text-brand-900 mb-3">
          實用建議
        </h2>
        <ul className="space-y-2">
          {advice.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-accent-500 mt-0.5 shrink-0">
                &#x25B6;
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

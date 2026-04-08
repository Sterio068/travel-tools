"use client";

import { useState, useMemo } from "react";
import { AIRLINES } from "@/data/airlines";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import type { AirlineBaggage } from "@/types";

type CabinClass = "economy" | "premium-economy" | "business";

const CABIN_OPTIONS: { value: CabinClass; label: string }[] = [
  { value: "economy", label: "經濟艙" },
  { value: "premium-economy", label: "豪華經濟艙" },
  { value: "business", label: "商務艙" },
];

function TypeBadge({ type }: { type: AirlineBaggage["type"] }) {
  const isLowCost = type === "low-cost";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
        isLowCost
          ? "bg-accent-100 text-accent-700"
          : "bg-brand-100 text-brand-700"
      }`}
    >
      {isLowCost ? "廉價航空" : "全服務航空"}
    </span>
  );
}

function BagInfo({
  label,
  pieces,
  weight,
  dimensions,
  highlight,
}: {
  label: string;
  pieces: number;
  weight: number;
  dimensions?: string;
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "border-2 border-accent-300" : ""}>
      <h3 className="text-sm font-semibold text-brand-700 mb-3">{label}</h3>
      {pieces === 0 ? (
        <div className="text-center py-4">
          <p className="text-accent-600 font-bold text-lg">需另行加購</p>
          <p className="text-sm text-slate-500 mt-1">
            此航空公司基本票價不含免費託運行李
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-slate-500">件數</p>
            <p className="text-xl font-bold text-brand-900">
              {pieces} <span className="text-sm font-normal">件</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">重量</p>
            <p className="text-xl font-bold text-brand-900">
              {weight} <span className="text-sm font-normal">kg / 件</span>
            </p>
          </div>
          {dimensions && (
            <div className="col-span-2">
              <p className="text-xs text-slate-500">尺寸限制</p>
              <p className="text-sm font-medium text-brand-800">{dimensions}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function AirlineDetail({
  airline,
  cabinClass,
}: {
  airline: AirlineBaggage;
  cabinClass: CabinClass;
}) {
  const checkedBag = airline.checkedBag[cabinClass] || airline.checkedBag["economy"];
  const isLowCost = airline.type === "low-cost";
  const needsPurchase = checkedBag.pieces === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-bold text-brand-900">{airline.nameZh}</h2>
        <span className="text-sm text-slate-500">{airline.nameEn}</span>
        <TypeBadge type={airline.type} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BagInfo
          label="手提行李"
          pieces={airline.cabinBag.pieces}
          weight={airline.cabinBag.weightKg}
          dimensions={airline.cabinBag.dimensions}
        />
        <BagInfo
          label={`託運行李（${CABIN_OPTIONS.find((c) => c.value === cabinClass)?.label}）`}
          pieces={checkedBag.pieces}
          weight={checkedBag.weightKgPerPiece}
          highlight={isLowCost && needsPurchase}
        />
      </div>

      {/* Max dimensions */}
      <Card padding="sm">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">單件行李最大重量</span>
          <span className="font-semibold text-brand-900">
            {airline.maxSinglePieceKg} kg
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-slate-500">最大尺寸</span>
          <span className="font-semibold text-brand-900">
            {airline.maxDimensionsCm}
          </span>
        </div>
      </Card>

      {/* Notes */}
      {airline.notes.length > 0 && (
        <Card padding="sm">
          <h3 className="text-sm font-semibold text-brand-700 mb-2">
            注意事項
          </h3>
          <ul className="space-y-1">
            {airline.notes.map((note, i) => (
              <li
                key={i}
                className={`text-sm flex items-start gap-2 ${
                  isLowCost && note.includes("加購")
                    ? "text-accent-600 font-medium"
                    : "text-slate-600"
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {isLowCost && note.includes("加購") ? "!" : "-"}
                </span>
                {note}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Link */}
      <p className="text-xs text-slate-400">
        <a
          href={airline.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-500 transition-colors underline"
        >
          前往 {airline.nameZh} 官網查看完整規定
        </a>
      </p>
    </div>
  );
}

export default function BaggageChecker() {
  const [selectedCode, setSelectedCode] = useState(AIRLINES[0].code);
  const [compareCode, setCompareCode] = useState("");
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy");
  const [showCompare, setShowCompare] = useState(false);

  const airlineOptions = useMemo(
    () =>
      AIRLINES.map((a) => ({
        value: a.code,
        label: `${a.nameZh} ${a.nameEn}${a.type === "low-cost" ? " [廉航]" : ""}`,
      })),
    [],
  );

  const cabinOptions = useMemo(() => {
    const airline = AIRLINES.find((a) => a.code === selectedCode);
    if (!airline) return CABIN_OPTIONS;
    return CABIN_OPTIONS.filter((opt) => opt.value in airline.checkedBag);
  }, [selectedCode]);

  const selectedAirline = useMemo(
    () => AIRLINES.find((a) => a.code === selectedCode) || AIRLINES[0],
    [selectedCode],
  );

  const compareAirline = useMemo(
    () => (compareCode ? AIRLINES.find((a) => a.code === compareCode) : null),
    [compareCode],
  );

  const compareOptions = useMemo(
    () => [
      { value: "", label: "-- 選擇航空公司 --" },
      ...AIRLINES.filter((a) => a.code !== selectedCode).map((a) => ({
        value: a.code,
        label: `${a.nameZh} ${a.nameEn}${a.type === "low-cost" ? " [廉航]" : ""}`,
      })),
    ],
    [selectedCode],
  );

  const handleAirlineChange = (code: string) => {
    setSelectedCode(code);
    const airline = AIRLINES.find((a) => a.code === code);
    if (airline && !(cabinClass in airline.checkedBag)) {
      setCabinClass("economy");
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="航空公司"
            options={airlineOptions}
            value={selectedCode}
            onChange={(e) => handleAirlineChange(e.target.value)}
          />
          <Select
            label="艙等"
            options={cabinOptions}
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value as CabinClass)}
          />
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              setShowCompare(!showCompare);
              if (showCompare) setCompareCode("");
            }}
            className="text-sm text-brand-500 hover:text-brand-700 font-medium transition-colors cursor-pointer"
          >
            {showCompare ? "- 取消比較" : "+ 比較另一家航空公司"}
          </button>

          {showCompare && (
            <div className="mt-3">
              <Select
                label="比較對象"
                options={compareOptions}
                value={compareCode}
                onChange={(e) => setCompareCode(e.target.value)}
              />
            </div>
          )}
        </div>
      </Card>

      {/* Results */}
      {showCompare && compareAirline ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-brand-50/40 rounded-[16px] p-4 md:p-6">
            <AirlineDetail airline={selectedAirline} cabinClass={cabinClass} />
          </div>
          <div className="bg-brand-50/40 rounded-[16px] p-4 md:p-6">
            <AirlineDetail airline={compareAirline} cabinClass={cabinClass} />
          </div>
        </div>
      ) : (
        <AirlineDetail airline={selectedAirline} cabinClass={cabinClass} />
      )}

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 text-center mt-8">
        資料來源：各航空公司官網，更新日期 2026-04-08。實際規定以航空公司公告為準，行李政策可能因航線、票種而異。
      </p>
    </div>
  );
}

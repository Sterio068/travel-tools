import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { COUNTRIES, getCountryCodes } from "@/data/countries";
import { AIRLINES } from "@/data/airlines";
import { STATIC_EXCHANGE_RATES } from "@/data/constants";
import { buildPageMetadata, type FaqItem } from "@/lib/seo";
import { formatMoney, formatRate } from "@/lib/format";
import { FaqSection } from "@/components/seo/FaqSection";
import type { CountryInfo } from "@/types";

function buildCountryFaqs(country: CountryInfo, rate: number | undefined): FaqItem[] {
  const faqs: FaqItem[] = [];
  faqs.push({
    question: `台灣人去${country.nameZh}需要簽證嗎？`,
    answer: country.visaRequired
      ? `需要。台灣護照前往${country.nameZh}需事先辦理簽證。${country.entryRequirements}`
      : `不需要。台灣護照可免簽進入${country.nameZh}${country.visaFreeDays ? `，停留最多 ${country.visaFreeDays} 天` : ""}。${country.entryRequirements}`,
  });
  faqs.push({
    question: `${country.nameZh}跟台灣差幾個小時？`,
    answer:
      country.timeDiffFromTW > 0
        ? `${country.nameZh}比台灣快 ${country.timeDiffFromTW} 小時。例如台灣中午 12:00，${country.nameZh}是 ${12 + country.timeDiffFromTW}:00。`
        : country.timeDiffFromTW < 0
          ? `${country.nameZh}比台灣慢 ${Math.abs(country.timeDiffFromTW)} 小時。例如台灣中午 12:00，${country.nameZh}是 ${12 + country.timeDiffFromTW}:00。`
          : `${country.nameZh}與台灣同時區，沒有時差。`,
  });
  if (rate) {
    faqs.push({
      question: `1 ${country.currency} 等於多少台幣？`,
      answer: `以最近更新的匯率計算，1 ${country.currency} 約等於 ${formatRate(rate)} 台幣。實際兌換金額會依銀行、換匯管道而異。`,
    });
  }
  faqs.push({
    question: `${country.nameZh}插頭和台灣一樣嗎？`,
    answer: `${country.nameZh}使用 Type ${country.plugType.join("/")} 插頭，電壓 ${country.voltage}V、${country.frequency}Hz。${
      country.plugType.includes("A") && country.voltage === 110
        ? "和台灣相同，不需轉接頭。"
        : country.plugType.includes("A") || country.plugType.includes("B")
          ? "插頭相容但電壓不同，雙電壓電器（手機、筆電）可直接用。"
          : "需要準備萬用轉接頭，手機筆電通常支援寬電壓可直接使用。"
    }`,
  });
  faqs.push({
    question: `${country.nameZh}需要給小費嗎？`,
    answer:
      country.tippingCulture === "none"
        ? `${country.nameZh}沒有小費文化，不需要額外給小費。`
        : country.tippingCulture === "expected"
          ? `${country.nameZh}有強烈的小費文化，餐廳一般給 ${country.tippingPercent}%，計程車也需要給小費。`
          : `${country.nameZh}的小費是可給可不給，一般在 ${country.tippingPercent ?? 10}% 左右，服務滿意可酌給。`,
  });
  if (country.taxRefund.available) {
    faqs.push({
      question: `${country.nameZh}怎麼退稅？`,
      answer: `${country.nameZh}退稅門檻${country.taxRefund.minPurchase ? ` ${country.currencySymbol} ${formatMoney(country.taxRefund.minPurchase)}` : "依店家而定"}，退稅比例約 ${country.taxRefund.refundPercent}%。${country.taxRefund.notes || ""}`,
    });
  }
  faqs.push({
    question: `從台灣飛${country.nameZh}要多久？`,
    answer: `台灣桃園機場直飛${country.nameZh}約 ${country.flightHours} 小時。加上機場往返、出入境，實際門到門時間要再加 3-5 小時。`,
  });
  faqs.push({
    question: `${country.nameZh}最佳旅遊季節是什麼時候？`,
    answer: `建議在 ${country.bestMonths.map((m) => `${m}月`).join("、")} 前往${country.nameZh}，這幾個月氣候最舒適、適合觀光。`,
  });
  return faqs;
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-brand-100 last:border-0">
      <span className="text-xl shrink-0">{icon}</span>
      <div>
        <dt className="text-sm text-slate-500">{label}</dt>
        <dd className="font-semibold text-brand-900">{value}</dd>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return getCountryCodes().map((code) => ({ code: code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const country = COUNTRIES.find((c) => c.code === code.toUpperCase());
  if (!country) return {};
  return buildPageMetadata({
    title: `${country.flag} ${country.nameZh}旅遊速查 — 簽證、匯率、時差、插頭一頁看完`,
    description: `${country.nameZh}旅遊必看：簽證規定、${country.currencyName}匯率、時差、插頭電壓、退稅規定等實用資訊。`,
    keywords: [`${country.nameZh}旅遊`, `${country.nameZh}簽證`, `${country.currencyName}匯率`, `${country.nameZh}自由行`],
    path: `/countries/${code.toLowerCase()}`,
  });
}

export default async function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const country = COUNTRIES.find((c) => c.code === code.toUpperCase());
  if (!country) notFound();

  const rate = STATIC_EXCHANGE_RATES[country.currency];
  const relatedAirlines = AIRLINES.filter((a) => {
    if (country.code === "JP") return ["CI", "BR", "JX", "JL", "NH", "IT", "MM"].includes(a.code);
    if (country.code === "KR") return ["CI", "BR", "JX", "KE", "OZ", "IT", "7C"].includes(a.code);
    if (country.code === "TH") return ["CI", "BR", "IT", "TR", "AK", "VJ"].includes(a.code);
    return a.type === "full-service";
  }).slice(0, 6);

  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    name: `台灣到${country.nameZh}旅遊`,
    toLocation: {
      "@type": "Country",
      name: country.nameEn,
    },
  };

  const faqs = buildCountryFaqs(country, rate);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={schema} />
      <Breadcrumb items={[
        { label: "首頁", href: "/" },
        { label: "國家速查", href: "/countries" },
        { label: country.nameZh },
      ]} />

      {/* 國家標題 */}
      <div className="text-center mb-8">
        <span className="text-6xl block mb-3">{country.flag}</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900">
          {country.nameZh}旅遊速查
        </h1>
        <p className="text-brand-700 mt-2">{country.nameEn} · 從台灣直飛約 {country.flightHours} 小時</p>
      </div>

      {/* 速查卡 */}
      <div className="bg-white rounded-[16px] p-6 md:p-8 shadow-[0_1px_3px_rgba(8,51,68,0.06)] mb-6">
        <h2 className="text-xl font-bold text-brand-900 mb-4">基本資訊</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <InfoRow icon="🛂" label="簽證" value={country.visaRequired ? "需辦簽證" : `免簽 ${country.visaFreeDays || ""} 天`} />
          <InfoRow icon="💱" label="貨幣" value={`${country.currencyName} (${country.currency}) ${country.currencySymbol}`} />
          <InfoRow icon="💰" label="匯率" value={rate ? `1 ${country.currency} ≈ NT$ ${formatRate(rate)}` : "請查詢最新匯率"} />
          <InfoRow icon="🕐" label="時差" value={country.timeDiffFromTW > 0 ? `比台灣快 ${country.timeDiffFromTW} 小時` : country.timeDiffFromTW < 0 ? `比台灣慢 ${Math.abs(country.timeDiffFromTW)} 小時` : "與台灣相同"} />
          <InfoRow icon="🔌" label="插頭" value={`Type ${country.plugType.join(", ")} · ${country.voltage}V ${country.frequency}Hz`} />
          <InfoRow icon="🗣️" label="語言" value={country.languages.join(", ")} />
          <InfoRow icon="🍺" label="飲酒年齡" value={`${country.drinkingAge} 歲`} />
          <InfoRow icon="🚗" label="駕駛方向" value={country.drivingSide === "left" ? "靠左行駛" : "靠右行駛"} />
          <InfoRow icon="💵" label="小費" value={country.tippingCulture === "none" ? "不需要小費" : country.tippingCulture === "optional" ? `可給可不給（約 ${country.tippingPercent || 10}%）` : `需要小費（約 ${country.tippingPercent || 15}%）`} />
          <InfoRow icon="📞" label="緊急電話" value={country.emergencyNumber} />
          <InfoRow icon="📋" label="入境需求" value={country.entryRequirements} />
          <InfoRow icon="📅" label="最佳旅遊月份" value={country.bestMonths.map((m) => `${m}月`).join(", ")} />
        </dl>
      </div>

      {/* 退稅資訊 */}
      <div className="bg-white rounded-[16px] p-6 md:p-8 shadow-[0_1px_3px_rgba(8,51,68,0.06)] mb-6">
        <h2 className="text-xl font-bold text-brand-900 mb-4">🧾 退稅資訊</h2>
        {country.taxRefund.available ? (
          <div className="space-y-2">
            <p className="text-brand-800">
              退稅比例：<strong>{country.taxRefund.refundPercent}%</strong>
            </p>
            {country.taxRefund.minPurchase && (
              <p className="text-brand-800">
                最低消費：<strong>{country.currencySymbol} {formatMoney(country.taxRefund.minPurchase)}</strong>
              </p>
            )}
            {country.taxRefund.notes && (
              <p className="text-sm text-slate-500">{country.taxRefund.notes}</p>
            )}
          </div>
        ) : (
          <p className="text-slate-500">{country.taxRefund.notes || "此國家無退稅制度"}</p>
        )}
      </div>

      <AdBanner slot="country-mid" />

      {/* 相關航空行李規定 */}
      {relatedAirlines.length > 0 && (
        <div className="bg-white rounded-[16px] p-6 md:p-8 shadow-[0_1px_3px_rgba(8,51,68,0.06)] mb-6">
          <h2 className="text-xl font-bold text-brand-900 mb-4">🧳 飛{country.nameZh}的航空行李規定</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-200">
                  <th className="text-left py-2 px-3 font-semibold text-brand-900">航空</th>
                  <th className="text-left py-2 px-3 font-semibold text-brand-900">類型</th>
                  <th className="text-left py-2 px-3 font-semibold text-brand-900">手提</th>
                  <th className="text-left py-2 px-3 font-semibold text-brand-900">經濟艙託運</th>
                </tr>
              </thead>
              <tbody>
                {relatedAirlines.map((a) => {
                  const eco = a.checkedBag.economy;
                  return (
                    <tr key={a.code} className="border-b border-brand-100">
                      <td className="py-2 px-3 font-medium text-brand-900">{a.nameZh}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${a.type === "full-service" ? "bg-brand-100 text-brand-700" : "bg-accent-100 text-accent-700"}`}>
                          {a.type === "full-service" ? "傳統" : "廉航"}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-700">{a.cabinBag.weightKg}kg</td>
                      <td className="py-2 px-3 text-slate-700">
                        {eco && eco.pieces > 0
                          ? `${eco.pieces}件×${eco.weightKgPerPiece}kg`
                          : "需加購"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3">資料來源：各航空公司官網，更新日期 2026-04-08</p>
        </div>
      )}

      {/* 工具連結 */}
      <div className="bg-white rounded-[16px] p-6 shadow-[0_1px_3px_rgba(8,51,68,0.06)] mb-6">
        <h2 className="text-xl font-bold text-brand-900 mb-4">相關工具</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link href="/tools/currency" className="p-3 rounded-[12px] bg-brand-50 hover:bg-brand-100 text-center transition-colors">
            <span className="text-2xl block mb-1">💱</span>
            <span className="text-sm font-medium text-brand-700">{country.currencyName}匯率換算</span>
          </Link>
          <Link href="/tools/timezone" className="p-3 rounded-[12px] bg-brand-50 hover:bg-brand-100 text-center transition-colors">
            <span className="text-2xl block mb-1">🕐</span>
            <span className="text-sm font-medium text-brand-700">{country.nameZh}時差查詢</span>
          </Link>
          <Link href="/tools/baggage" className="p-3 rounded-[12px] bg-brand-50 hover:bg-brand-100 text-center transition-colors">
            <span className="text-2xl block mb-1">🧳</span>
            <span className="text-sm font-medium text-brand-700">行李規定速查</span>
          </Link>
          <Link href="/tools/budget" className="p-3 rounded-[12px] bg-brand-50 hover:bg-brand-100 text-center transition-colors">
            <span className="text-2xl block mb-1">💰</span>
            <span className="text-sm font-medium text-brand-700">{country.nameZh}旅遊預算</span>
          </Link>
          <Link href="/tools/plug-voltage" className="p-3 rounded-[12px] bg-brand-50 hover:bg-brand-100 text-center transition-colors">
            <span className="text-2xl block mb-1">🔌</span>
            <span className="text-sm font-medium text-brand-700">插頭電壓查詢</span>
          </Link>
          <Link href="/tools/packing-list" className="p-3 rounded-[12px] bg-brand-50 hover:bg-brand-100 text-center transition-colors">
            <span className="text-2xl block mb-1">📋</span>
            <span className="text-sm font-medium text-brand-700">打包清單</span>
          </Link>
        </div>
      </div>

      <FaqSection title={`${country.nameZh}旅遊常見問題`} faqs={faqs} />

      <AdBanner slot="country-btm" />
    </div>
  );
}

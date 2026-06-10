import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { COUNTRIES } from "@/data/countries";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "國家旅遊速查",
  description: "20 個台灣旅客熱門目的地的旅遊速查卡：簽證、匯率、時差、插頭、退稅資訊一頁看完。",
  keywords: ["國家旅遊", "旅遊資訊", "簽證查詢", "各國旅遊須知"],
  path: "/countries",
});

export default function CountriesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "國家速查" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-2">國家旅遊速查</h1>
      <p className="text-brand-700 mb-8">點擊國家查看完整旅遊資訊：簽證、匯率、時差、插頭、退稅⋯⋯</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {COUNTRIES.map((c) => (
          <Link
            key={c.code}
            href={`/countries/${c.code.toLowerCase()}`}
            className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <span className="text-5xl block mb-3">{c.flag}</span>
            <h2 className="font-bold text-brand-900 text-lg">{c.nameZh}</h2>
            <p className="text-xs text-slate-500 mt-1">{c.nameEn}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-brand-100 text-brand-700">
                {c.visaRequired ? "需簽證" : `免簽${c.visaFreeDays ? ` ${c.visaFreeDays}天` : ""}`}
              </span>
              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-gold-50 text-gold-600">
                {c.currency}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

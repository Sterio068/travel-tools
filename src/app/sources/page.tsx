import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "資料來源 — 簽證、入境、匯率、行李與旅遊規定查核",
  description:
    "旅遊實用工具站的資料來源中心，整理簽證入境、匯率換匯、行李、退稅、保險與旅遊安全資訊的查核方式。",
  keywords: ["旅遊資料來源", "簽證資料", "入境規定", "行李規定", "旅遊工具來源"],
  path: "/sources",
});

const sourceCategories = [
  {
    title: "簽證、入境與海關",
    description:
      "以台灣外交部領事事務局、各國移民與海關機關、航空公司登機要求為主要查核基礎。",
    examples: ["外交部領事事務局", "各國移民署與電子簽證網站", "財政部關務署", "農業部防檢署"],
  },
  {
    title: "匯率、退稅與支付成本",
    description:
      "匯率工具以 API 與銀行公開資料交叉檢查；退稅、換匯與刷卡成本則以公開條款與旅客實務流程整理。",
    examples: ["ExchangeRate-API", "台灣銀行牌告匯率", "Global Blue", "Planet Tax Free"],
  },
  {
    title: "行李、航空與電池規範",
    description:
      "行李限重、隨身液體、行動電源與鋰電池資訊，優先參考航空公司與航空安全規範。",
    examples: ["航空公司官方行李政策", "IATA 鋰電池運輸規範", "機場安檢公告"],
  },
  {
    title: "保險、住宿與目的地資訊",
    description:
      "旅遊保險與目的地攻略會標示限制條件，並提醒讀者以保單條款、官方公告和實際訂房條件為準。",
    examples: ["保險公司公開保單條款", "信用卡旅遊險公開說明", "各國官方旅遊網站"],
  },
];

const toolSourceRows = Object.values(TOOL_PAGE_CONTENT)
  .map((content) => ({
    href: content.href,
    title: content.title,
    updatedAt: content.updatedAt,
    sources: content.sources,
  }))
  .sort((a, b) => a.title.localeCompare(b.title, "zh-Hant"));

const uniqueSources = new Set(toolSourceRows.flatMap((row) => row.sources));

export default function SourcesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "資料來源" }]} />

      <header className="mb-10">
        <p className="text-sm font-semibold text-brand-600 mb-3">Source Center</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-4">
          資料來源與查核方式
        </h1>
        <p className="max-w-3xl text-brand-700 leading-8">
          旅遊資訊變動很快，尤其是入境、簽證、行李、退稅、匯率與保險條款。本站的原則是把複雜規定轉成可操作的工具與檢查清單，同時保留「出發前仍要以官方最新公告為準」的判斷界線。
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Card padding="lg">
          <p className="text-3xl font-extrabold text-brand-600">{toolSourceRows.length}</p>
          <p className="mt-2 text-sm font-semibold text-brand-900">個工具頁已標示來源</p>
          <p className="mt-2 text-sm text-brand-600 leading-6">
            工具頁會列出估算邏輯、使用限制與主要參考資料。
          </p>
        </Card>
        <Card padding="lg">
          <p className="text-3xl font-extrabold text-brand-600">{uniqueSources.size}</p>
          <p className="mt-2 text-sm font-semibold text-brand-900">組來源說明</p>
          <p className="mt-2 text-sm text-brand-600 leading-6">
            涵蓋官方公告、航空政策、API、保險與旅遊實務。
          </p>
        </Card>
        <Card padding="lg">
          <p className="text-3xl font-extrabold text-brand-600">0</p>
          <p className="mt-2 text-sm font-semibold text-brand-900">強迫廣告點擊文案</p>
          <p className="mt-2 text-sm text-brand-600 leading-6">
            廣告和主要內容分離，不用點擊廣告也能使用所有工具。
          </p>
        </Card>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-brand-900 mb-4">主要來源類型</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sourceCategories.map((category) => (
            <Card key={category.title} padding="lg">
              <h3 className="text-xl font-bold text-brand-900 mb-2">
                {category.title}
              </h3>
              <p className="text-brand-700 leading-7 mb-4">{category.description}</p>
              <ul className="space-y-2 text-sm text-brand-700">
                {category.examples.map((example) => (
                  <li key={example} className="flex gap-2">
                    <span className="text-brand-500" aria-hidden="true">
                      ✓
                    </span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-brand-900 mb-4">工具頁來源索引</h2>
        <div className="space-y-4">
          {toolSourceRows.map((row) => (
            <Card key={row.href} padding="lg">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-brand-900">
                    <Link href={row.href} className="hover:text-brand-600">
                      {row.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-brand-600">
                    最近更新：{row.updatedAt}；已標示 {row.sources.length} 組來源或查核基礎
                  </p>
                </div>
                <Link
                  href={row.href}
                  className="text-sm font-semibold text-brand-600 hover:underline"
                >
                  查看工具
                </Link>
              </div>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-brand-700">
                {row.sources.map((source) => (
                  <li key={`${row.href}-${source}`}>{source}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-6 md:p-8">
        <h2 className="text-xl font-bold text-brand-900 mb-3">
          查到更新或想補來源？
        </h2>
        <p className="text-brand-700 leading-7 mb-4">
          若你發現簽證、入境、行李、退稅、保險或旅遊安全資訊已更新，請提供頁面網址、錯誤位置與可查官方來源。我們會優先處理會影響出發、通關、金錢損失或旅遊安全的內容。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[8px] bg-brand-500 px-5 py-3 text-sm font-bold text-slate-50 hover:bg-brand-600"
          >
            聯絡我們
          </Link>
          <Link
            href="/editorial-policy"
            className="inline-flex items-center justify-center rounded-[8px] border border-brand-200 bg-white px-5 py-3 text-sm font-bold text-brand-700 hover:bg-brand-50"
          >
            查看編輯政策
          </Link>
        </div>
      </section>
    </div>
  );
}

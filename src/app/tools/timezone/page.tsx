import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import { webApplicationSchema } from "@/lib/seo";
import TimezoneChecker from "@/components/tools/TimezoneChecker";
import { TOOL_FAQS } from "@/data/tool-faqs";

export const metadata: Metadata = buildPageMetadata({
  title: "時差查詢 - 世界各國時差換算",
  description:
    "查詢台灣與世界各國的時差，即時顯示目的地當地時間。支援日本、韓國、泰國、美國、英國等熱門旅遊國家，出國前掌握時差資訊。",
  path: "/tools/timezone",
});

export default function TimezonePage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "時差查詢",
          description: "台灣與世界各國時差即時查詢工具",
          path: "/tools/timezone",
        })}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "旅遊工具", href: "/tools" },
            { label: "時差查詢" },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">時差查詢</h1>
          <p className="text-gray-600">
            即時查看台灣與各國的時差，快速換算當地時間。出國旅遊、商務洽公必備工具。
          </p>
        </header>

        <TimezoneChecker />

        <AdBanner slot="tool-result" className="mt-8" />

        {/* SEO long-form content */}
        <article className="mt-16 prose prose-gray max-w-none">
          <h2>認識時差：出國旅遊必知常識</h2>
          <p>
            時差是因為地球自轉，不同經度的地區有不同的當地時間。國際上以格林威治標準時間（GMT/UTC）為基準，台灣的時區為
            UTC+8。了解時差有助於安排航班接駁、預約行程，以及與台灣的家人朋友保持聯繫。
          </p>

          <h2>熱門旅遊國家時差整理</h2>
          <p>
            日本和韓國比台灣快1小時（UTC+9），是時差最小的熱門旅遊目的地。泰國比台灣慢1小時（UTC+7），越南也是
            UTC+7。歐洲國家如英國為 UTC+0（夏令時間 UTC+1），與台灣相差7到8小時。美國則橫跨多個時區，東岸（紐約）為
            UTC-5，西岸（洛杉磯）為 UTC-8，與台灣相差13到16小時。
          </p>

          <h2>如何克服時差帶來的不適？</h2>
          <p>
            長途旅行跨越多個時區時，容易產生「時差反應」（Jet
            Lag），症狀包括疲倦、失眠、注意力不集中等。建議在出發前幾天逐步調整作息，飛行途中多喝水、避免酒精和咖啡因，抵達後盡量配合當地時間活動，白天多曬太陽有助於調整生理時鐘。
          </p>

          <h2>日光節約時間（夏令時間）注意事項</h2>
          <p>
            部分國家實施日光節約時間，在特定月份將時鐘撥快一小時。例如美國通常在3月第二個星期日開始夏令時間，11月第一個星期日結束。歐洲也有類似制度。前往這些國家旅遊時，需特別留意時差是否因夏令時間而有所變動，以免影響行程安排。
          </p>

          <h2>實用建議：善用時差查詢工具</h2>
          <p>
            出發前先用時差查詢工具確認目的地的當地時間，可以幫助你更好地規劃行程。例如預訂餐廳、安排導覽、或是和在台灣的家人視訊通話，都需要對照雙方的時間。建議將常去的國家時間加入手機的世界時鐘，方便隨時查看。
          </p>
        </article>

        <FaqSection faqs={TOOL_FAQS["timezone"]} />

        <AdBanner slot="tool-bottom" className="mt-12" />
      </div>
    </>
  );
}

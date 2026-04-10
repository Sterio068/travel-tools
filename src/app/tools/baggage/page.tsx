import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import BaggageChecker from "@/components/tools/BaggageChecker";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = buildPageMetadata({
  title: "行李規定速查 - 各航空公司行李限制一覽",
  description:
    "快速查詢各大航空公司手提行李與託運行李規定，包含件數、重量、尺寸限制。支援華航、長榮、星宇、虎航、酷航等台灣旅客常搭航空公司，出國前必查。",
  keywords: [
    "行李規定",
    "航空公司行李",
    "手提行李",
    "託運行李",
    "行李重量",
    "廉航行李",
    "行李限制",
  ],
  path: "/tools/baggage",
});

export default function BaggagePage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "行李規定速查",
          description:
            "各大航空公司手提行李與託運行李規定查詢工具，支援全服務與廉價航空",
          path: "/tools/baggage",
        })}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "實用工具", href: "/tools" },
            { label: "行李規定速查" },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            行李規定速查
          </h1>
          <p className="text-gray-600">
            選擇航空公司與艙等，立即查看手提行李與託運行李的件數、重量及尺寸規定。支援兩家航空公司並排比較，讓你出發前輕鬆掌握行李規範。
          </p>
        </header>

        <BaggageChecker />

        <AdBanner slot="tool-result" className="mt-8" />

        {/* SEO long-form content */}
        <article className="mt-16 prose prose-gray max-w-none">
          <h2>出國行李怎麼帶？各航空公司行李規定總整理</h2>
          <p>
            出國旅遊最怕的就是到機場才發現行李超重或超件，被收取高額超重費。不同航空公司、不同艙等的行李規定都不一樣，提前查清楚才能安心出發。以下整理台灣旅客最常搭乘的航空公司行李規定重點。
          </p>

          <h2>全服務航空 vs. 廉價航空：行李規定差在哪？</h2>
          <p>
            全服務航空（如華航、長榮、星宇、日航、全日空等）的機票通常已包含免費託運行李，經濟艙一般可託運一至兩件各 23 公斤的行李。而廉價航空（如虎航、酷航、樂桃、捷星等）的基本票價通常不含免費託運行李，需要另外加購。搭乘廉航時建議在訂票時一併購買行李額度，現場加購通常比較貴。
          </p>

          <h2>手提行李注意事項</h2>
          <p>
            手提行李（登機箱）的尺寸與重量限制各家航空略有不同，常見標準為 56x36x23 公分、7 至 10 公斤。搭機時除了登機箱，通常還可攜帶一個隨身小包（如手提包或筆電包）。要注意的是液體容器不得超過 100 毫升，且需裝在透明夾鏈袋中。行動電源必須隨身攜帶，不得託運。
          </p>

          <h2>廉航行李加購省錢秘訣</h2>
          <p>
            搭乘廉價航空時，行李費用是一筆不小的開銷。以下幾個省錢技巧可以參考：在官網訂票時就加購行李，通常比出發前或現場加購便宜；善用手提行李額度，尤其是短程旅遊，10 公斤手提行李已相當充足；選擇含行李的票種組合（如酷航的 ScootPlus、虎航的 combo 票），有時比單買行李更划算；回程如果購物較多，可以只加購單程託運行李。
          </p>

          <h2>行李超重怎麼辦？</h2>
          <p>
            如果到機場才發現行李超重，各航空公司的超重費計算方式不同，但通常都相當昂貴。建議出發前在家先用行李秤確認重量，並預留一些餘裕給回程的伴手禮。若真的超重，可以嘗試穿上最重的衣物、將重物移至手提行李（注意不要超過手提限重），或者當場在機場寄送包裹回家。
          </p>
        </article>

        <FaqSection faqs={TOOL_FAQS["baggage"]} />

        <RelatedTools currentHref="/tools/baggage" />

        <AdBanner slot="tool-bottom" className="mt-12" />
      </div>
    </>
  );
}

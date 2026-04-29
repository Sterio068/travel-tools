import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";
import FlightTimeChecker from "@/components/tools/FlightTimeChecker";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "台灣飛各國飛行時間查詢｜直飛幾小時一覽",
  description: "查詢從台灣出發到世界各國的飛行時間，日本2-3小時、歐洲13-14小時、美國14-16小時。直飛與轉機時間比較。",
  path: "/tools/flight-time",
  keywords: ["飛行時間", "台灣飛日本幾小時", "台灣飛歐洲", "台灣飛美國", "直飛時間", "飛行時數", "航班時間"],
});

const jsonLd = webApplicationSchema({
  name: "飛行時間查詢",
  description: "從台灣出發到各國的飛行時間查詢與比較工具",
  path: "/tools/flight-time",
});

export default function FlightTimePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "旅行工具", href: "/tools" },
          { label: "飛行時間查詢" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">飛行時間查詢</h1>
        <p className="mb-8 text-gray-600">
          從台灣桃園機場出發，查看到各國的預估直飛飛行時間，並依航程長短分類比較。
        </p>

        <FlightTimeChecker />

        <AdBanner slot="tool-bottom" className="my-8" />

        <article className="prose prose-gray max-w-none">
          <h2>搭長途飛機的實用建議</h2>
          <p>
            長途飛行前做好準備，能讓旅途更舒適。以下整理幾個常見的搭機技巧與時差調整建議。
          </p>

          <h3>行前準備</h3>
          <ul>
            <li>出發前幾天逐步調整睡眠時間，靠近目的地的時區。</li>
            <li>穿著寬鬆舒適的衣物，方便在機上活動與休息。</li>
            <li>準備頸枕、眼罩和耳塞，提升睡眠品質。</li>
          </ul>

          <h3>機上舒適技巧</h3>
          <ul>
            <li>定時起身走動，避免久坐造成的不適。</li>
            <li>多補充水分，機艙濕度通常偏低。</li>
            <li>避免過量飲酒與咖啡因，以免影響睡眠品質。</li>
          </ul>

          <h3>時差調整方法</h3>
          <p>
            抵達後盡量配合當地作息，白天多接觸陽光有助於重設生理時鐘。短程旅行（時差
            3 小時以內）通常不需特別調整；長程旅行建議抵達後第一天避免午睡超過
            30 分鐘。
          </p>

          <h3>短程 vs. 長程航線差異</h3>
          <p>
            短程航線（如日韓、東南亞）飛行時間約 2–5
            小時，適合週末快閃行程。中長程航線（如歐美、紐澳）則需 8
            小時以上，建議選擇舒適座位並準備娛樂與休息用品。
          </p>
        </article>

        <RelatedTools currentHref="/tools/flight-time" />

        <FaqSection faqs={TOOL_FAQS["flight-time"]} />
      </div>
    </>
  );
}

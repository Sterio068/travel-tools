import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import VisaChecker from "@/components/tools/VisaChecker";
import { webApplicationSchema } from "@/lib/seo";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = {
  title: "簽證需求查詢 — 台灣護照免簽國家一覽",
  description:
    "查詢台灣護照持有人前往各國的簽證需求，包含免簽天數、入境條件等資訊，出國前必看。",
};

const jsonLd = webApplicationSchema({
  name: "簽證需求查詢",
  description: "查詢台灣護照免簽國家與簽證需求，含入境條件與停留天數",
  path: "/tools/visa",
});

export default function VisaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "旅行工具", href: "/tools" },
            { label: "簽證需求查詢" },
          ]}
        />

        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
          簽證需求查詢
        </h1>
        <p className="text-gray-500 mb-8">
          台灣護照持有人前往各國的簽證需求與免簽資訊
        </p>

        <AdBanner slot="visa-top" />

        <VisaChecker />

        <AdBanner slot="visa-bottom" />

        {/* SEO 文章 */}
        <article className="prose prose-gray max-w-none mt-12">
          <h2>台灣護照免簽國家完整指南</h2>

          <h3>台灣護照的免簽優勢</h3>
          <p>
            中華民國（台灣）護照目前可免簽或落地簽前往全球超過 140
            個國家和地區，在全球護照排名中名列前茅。持台灣護照出國旅遊相當便利，但出發前仍需確認目的地的最新簽證規定。
          </p>

          <h3>熱門免簽目的地</h3>
          <ul>
            <li>
              <strong>日本</strong>：免簽停留 90 天，是台灣旅客最愛的目的地之一。
            </li>
            <li>
              <strong>韓國</strong>：免簽停留 90 天，K-ETA 電子旅行許可已免除。
            </li>
            <li>
              <strong>歐洲申根區</strong>：免簽停留 90 天（180 天內累計），涵蓋
              27 個歐洲國家。
            </li>
            <li>
              <strong>英國</strong>：免簽停留 6 個月。
            </li>
            <li>
              <strong>加拿大</strong>：需申請 eTA 電子旅行證。
            </li>
            <li>
              <strong>美國</strong>：需申請 ESTA 電子簽證。
            </li>
          </ul>

          <h3>出國前的簽證確認事項</h3>
          <ol>
            <li>
              <strong>護照效期</strong>：多數國家要求護照剩餘效期至少 6
              個月以上。
            </li>
            <li>
              <strong>回程機票</strong>：免簽入境通常需要出示回程或續程機票。
            </li>
            <li>
              <strong>住宿證明</strong>：部分國家入境時可能要求提供住宿訂房紀錄。
            </li>
            <li>
              <strong>財力證明</strong>：部分國家會要求旅客證明有足夠旅費。
            </li>
            <li>
              <strong>疫苗接種</strong>：某些國家可能要求特定疫苗接種證明。
            </li>
          </ol>

          <h3>需要簽證的主要國家</h3>
          <p>
            前往中國大陸、印度、俄羅斯、巴西等國家仍需事先申請簽證。建議至少在出發前一個月開始辦理簽證，以預留足夠的審核時間。部分國家提供電子簽證（e-Visa）服務，可線上申請較為便利。
          </p>

          <h3>免簽不等於免審查</h3>
          <p>
            即使是免簽國家，入境時海關仍有權拒絕入境。保持良好的旅行紀錄、攜帶完整的旅行文件、誠實回答海關問題，是順利入境的不二法門。
          </p>
        </article>

        <FaqSection faqs={TOOL_FAQS["visa"]} />
      </div>
    </>
  );
}

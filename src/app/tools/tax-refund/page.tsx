import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";
import TaxRefundCalculator from "@/components/tools/TaxRefundCalculator";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "退稅計算機｜日本、韓國、歐洲購物退稅金額試算",
  description: "快速計算各國旅遊購物退稅金額，包含最低消費門檻與退稅比例。日本、韓國、歐洲退稅怎麼算？一鍵試算不吃虧。",
  path: "/tools/tax-refund",
  keywords: ["退稅計算", "日本退稅", "歐洲退稅", "韓國退稅", "Tax Refund", "免稅", "購物退稅"],
});

const jsonLd = webApplicationSchema({
  name: "退稅計算機",
  description: "計算各國旅遊購物退稅金額，含最低消費門檻與退稅比例試算",
  path: "/tools/tax-refund",
});

export default function TaxRefundPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "旅行工具", href: "/tools" },
            { label: "退稅計算機" },
          ]}
        />

        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
          退稅計算機
        </h1>
        <p className="text-gray-500 mb-8">
          選擇國家、輸入消費金額，立即算出可退稅金額
        </p>

        <AdBanner slot="tax-refund-top" />

        <TaxRefundCalculator />

        <AdBanner slot="tax-refund-bottom" />

        {/* SEO 文章 */}
        <article className="prose prose-gray max-w-none mt-12">
          <h2>出國購物退稅完整攻略</h2>

          <h3>什麼是退稅？</h3>
          <p>
            退稅（Tax Refund）是指非居民旅客在特定國家購物後，可以申請退還商品中所含的消費稅或增值稅（VAT）。大多數歐洲國家、日本、韓國、澳洲等熱門旅遊目的地都提供退稅服務。
          </p>

          <h3>退稅基本條件</h3>
          <ul>
            <li>必須為非該國居民的外國旅客</li>
            <li>單筆或同店消費需達到最低退稅門檻</li>
            <li>商品需在購買後的特定期限內攜帶出境</li>
            <li>需在機場或指定退稅點辦理退稅手續</li>
          </ul>

          <h3>如何提高退稅成功率？</h3>
          <ol>
            <li>
              <strong>集中消費</strong>：在同一間店鋪累積消費金額，更容易達到退稅門檻。
            </li>
            <li>
              <strong>保留收據</strong>：確保收據完整且清晰，退稅單據需妥善保管。
            </li>
            <li>
              <strong>提前到機場</strong>：退稅手續可能需要排隊等候，建議預留充足時間。
            </li>
            <li>
              <strong>選擇退稅方式</strong>：信用卡退稅通常比現金退稅的比例更高。
            </li>
            <li>
              <strong>商品勿先使用</strong>：部分國家海關會檢查商品，確保商品為未使用狀態。
            </li>
          </ol>

          <h3>常見退稅陷阱</h3>
          <p>
            退稅代辦公司（如 Global Blue、Planet Tax
            Free）會收取手續費，實際退稅金額通常低於法定退稅比例。建議事先了解各國退稅規定，選擇手續費較低的退稅管道。
          </p>
        </article>

        <FaqSection faqs={TOOL_FAQS["tax-refund"]} />
      </div>
    </>
  );
}

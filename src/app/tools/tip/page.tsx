import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";
import TipCalculator from "@/components/tools/TipCalculator";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "小費計算機｜美國、歐洲各國小費怎麼給？",
  description: "出國旅遊不知道給多少小費？輸入國家與帳單金額立即計算建議金額，含美國、歐洲、東南亞各國小費文化說明。",
  path: "/tools/tip",
  keywords: ["小費計算", "美國小費", "日本小費", "歐洲小費", "tip calculator", "餐廳小費", "小費怎麼給"],
});

const jsonLd = webApplicationSchema({
  name: "小費計算機",
  description: "根據各國小費文化計算建議小費金額，含當地習慣說明",
  path: "/tools/tip",
});

export default function TipPage() {
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
            { label: "小費計算機" },
          ]}
        />

        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
          小費計算機
        </h1>
        <p className="text-gray-500 mb-8">
          了解各國小費文化，快速算出合適的小費金額
        </p>

        <AdBanner slot="tip-top" />

        <TipCalculator />

        <AdBanner slot="tip-bottom" />

        {/* SEO 文章 */}
        <article className="prose prose-gray max-w-none mt-12">
          <h2>各國小費文化指南</h2>

          <h3>為什麼要給小費？</h3>
          <p>
            小費文化因國而異。在美國、加拿大等國家，小費是服務人員重要的收入來源，不給小費被視為失禮；但在日本、韓國等國家，給小費反而可能被視為不禮貌的行為。出國前了解當地小費習慣，能避免不必要的尷尬。
          </p>

          <h3>各地區小費慣例</h3>
          <ul>
            <li>
              <strong>北美</strong>：餐廳一般給 15%–20%，計程車和酒吧也需給小費。
            </li>
            <li>
              <strong>歐洲</strong>：多數餐廳已含服務費，額外給 5%–10%
              表示滿意即可。
            </li>
            <li>
              <strong>東南亞</strong>：非必要但受歡迎，5%–10% 為常見範圍。
            </li>
            <li>
              <strong>日本</strong>：不需要給小費，服務費已包含在價格內。
            </li>
            <li>
              <strong>中東</strong>：餐廳通常給 10%–15%，是當地文化的一部分。
            </li>
          </ul>

          <h3>小費計算小撇步</h3>
          <ol>
            <li>
              <strong>看帳單</strong>：先確認帳單是否已包含服務費（Service
              Charge），避免重複給予。
            </li>
            <li>
              <strong>以稅前金額計算</strong>：在美國等國家，小費應以稅前金額為基準。
            </li>
            <li>
              <strong>準備零錢</strong>：在小費文化盛行的國家，隨身攜帶當地小額紙鈔或硬幣會很方便。
            </li>
            <li>
              <strong>團體用餐</strong>：大型團體用餐時，餐廳可能自動加收
              18%–20% 的服務費。
            </li>
          </ol>

          <h3>什麼時候不用給小費？</h3>
          <p>
            速食店、自助餐廳、外帶服務通常不需要給小費。此外，若服務品質明顯不佳，在多數國家降低小費比例也是可以接受的。
          </p>
        </article>

        <RelatedTools currentHref="/tools/tip" />

        <FaqSection faqs={TOOL_FAQS["tip"]} />
      </div>
    </>
  );
}

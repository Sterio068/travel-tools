import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";
import TravelInsuranceGuide from "@/components/tools/TravelInsuranceGuide";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "旅遊保險怎麼選？旅平險、不便險完整比較 2026",
  description: "比較旅平險、不便險與信用卡旅遊險的保障範圍與費用，附投保前確認清單。出國必備旅遊保險選購指南。",
  path: "/tools/travel-insurance",
  keywords: ["旅平險", "旅遊保險", "不便險", "保險比較", "出國保險", "旅遊意外險", "信用卡旅遊險"],
});

const jsonLd = webApplicationSchema({
  name: "旅遊保險比較",
  description: "旅平險、不便險、信用卡旅遊險保障比較與投保建議工具",
  path: "/tools/travel-insurance",
});

export default function TravelInsurancePage() {
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
          { label: "旅遊保險比較" },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">旅遊保險比較</h1>
        <p className="mb-8 text-gray-600">
          出國旅遊前，了解不同保險的保障範圍，選擇最適合自己的保險組合。
        </p>

        <TravelInsuranceGuide />

        <AdBanner className="my-8" />

        <article className="prose prose-gray max-w-none">
          <h2>旅遊保險怎麼選？</h2>
          <p>
            出國旅遊最怕遇到突發狀況，提前準備好適當的保險能讓旅途更安心。以下整理幾個常見問題與建議。
          </p>

          <h3>旅平險與不便險的差別</h3>
          <p>
            旅平險主要保障「人身安全」，包括意外傷害醫療與身故失能；不便險則保障「行程不便」，例如班機延誤、行李遺失等額外花費。兩者保障範圍不同，建議搭配投保。
          </p>

          <h3>信用卡旅遊險夠用嗎？</h3>
          <p>
            信用卡附贈的旅遊險保額通常較低，且理賠條件較嚴格。適合短途、低風險的行程作為基本保障，但長途或有高風險活動的旅程建議額外加保。
          </p>

          <h3>高風險活動需要加保嗎？</h3>
          <p>
            潛水、滑雪、高空彈跳等活動通常不在一般旅平險的保障範圍內，需要額外加購「特定活動附加條款」。出發前務必確認保障內容是否涵蓋你的行程活動。
          </p>

          <h3>投保時機建議</h3>
          <p>
            建議在出發前 1–3
            天完成投保，預留時間確認保單內容。部分保險公司提供機場臨櫃投保，但選擇較少且費率可能較高。
          </p>

          <h3>理賠注意事項</h3>
          <ul>
            <li>保留所有收據與醫療證明文件。</li>
            <li>班機延誤需取得航空公司的延誤證明。</li>
            <li>行李遺失需在機場填寫 PIR 報告。</li>
            <li>回國後盡早申請理賠，注意理賠申請期限。</li>
          </ul>
        </article>

        <RelatedTools currentHref="/tools/travel-insurance" />

        <FaqSection faqs={TOOL_FAQS["travel-insurance"]} />
      </div>
    </>
  );
}

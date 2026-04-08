import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { webApplicationSchema } from "@/lib/seo";
import CurrencyConverter from "@/components/tools/CurrencyConverter";

export const metadata: Metadata = buildPageMetadata({
  title: "匯率換算機 - 台幣即時匯率換算",
  description:
    "即時匯率換算工具，支援台幣對日圓、美元、韓元、泰銖等多國貨幣換算。出國旅遊前快速查詢匯率，掌握最佳換匯時機。",
  path: "/tools/currency",
});

export default function CurrencyPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "匯率換算機",
          description: "台幣對多國貨幣即時匯率換算工具",
          path: "/tools/currency",
        })}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "旅遊工具", href: "/tools" },
            { label: "匯率換算機" },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">匯率換算機</h1>
          <p className="text-gray-600">
            即時查詢台幣與各國貨幣的匯率，輸入金額立即換算。支援日圓、美元、韓元、泰銖等熱門旅遊貨幣。
          </p>
        </header>

        <CurrencyConverter />

        <AdBanner slot="tool-result" className="mt-8" />

        {/* SEO long-form content */}
        <article className="mt-16 prose prose-gray max-w-none">
          <h2>出國換匯怎麼換最划算？</h2>
          <p>
            出國旅遊時，換匯是一項重要的行前準備。匯率每天都在波動，選對時機和管道可以省下不少旅費。以下整理幾個常見的換匯方式與注意事項，幫助你用最划算的方式準備外幣。
          </p>

          <h2>常見換匯管道比較</h2>
          <p>
            台灣旅客常用的換匯管道包括：銀行臨櫃、線上結匯、外幣ATM提領，以及機場換匯。其中銀行臨櫃和線上結匯的匯率通常最優惠，而機場換匯因為便利性較高，匯率相對較差，建議只作為備用選項。
          </p>

          <h2>什麼時候換匯最好？</h2>
          <p>
            匯率受到國際經濟情勢、央行政策、市場供需等因素影響。一般建議在出發前一到兩個月就開始關注匯率走勢，當匯率來到近期相對低點時分批換匯，避免一次全部兌換的風險。也可以設定匯率到價通知，在理想價位時即時換匯。
          </p>

          <h2>旅遊熱門貨幣匯率小知識</h2>
          <p>
            日圓、韓元、泰銖、美元是台灣旅客最常使用的外幣。日圓和韓元面額較大，換算時容易混淆；美元和歐元則是國際通用貨幣，在許多國家都能直接使用。建議出發前先用匯率換算工具熟悉匯率，到當地消費時才能快速判斷價格是否合理。
          </p>

          <h2>信用卡海外刷卡 vs. 現金</h2>
          <p>
            除了兌換現金，信用卡海外刷卡也是常見的支付方式。多數信用卡會收取1.5%左右的海外交易手續費，但部分銀行提供海外消費回饋，實際成本可能比換現金更低。建議根據目的地的刷卡普及程度，搭配適量現金和信用卡使用。
          </p>
        </article>

        <AdBanner slot="tool-bottom" className="mt-12" />
      </div>
    </>
  );
}

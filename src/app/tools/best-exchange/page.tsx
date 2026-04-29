import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";
import BestExchangeCalculator from "@/components/tools/BestExchangeCalculator";
import { buildPageMetadata, webApplicationSchema, howToSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildPageMetadata({
  title: "最佳換匯管道比較｜銀行、機場、ATM哪個划算？",
  description: "輸入金額即時比較臺灣銀行臨櫃、機場換匯、海外ATM提領、信用卡刷卡四種方式，找出最划算換匯管道。",
  path: "/tools/best-exchange",
  keywords: ["換匯比較", "最佳換匯", "機場換匯划算嗎", "海外ATM", "銀行換匯", "哪裡換外幣", "換錢"],
});

const jsonLd = webApplicationSchema({
  name: "最佳換匯試算",
  description:
    "比較臺灣銀行臨櫃、機場換匯、海外ATM提領、信用卡海外刷卡的匯率差異，幫你找出最省錢的換匯方式。",
  path: "/tools/best-exchange",
});

const howToJsonLd = howToSchema({
  name: "如何比較換匯管道找出最划算選擇",
  description: "出國換匯前，比較銀行、機場、ATM、信用卡四種方式找出最省錢的換匯管道",
  steps: [
    { name: "決定換匯金額", text: "估算旅途需要的外幣總金額，考慮現金使用比例" },
    { name: "輸入金額與幣別", text: "在換匯試算工具輸入台幣金額與目標外幣幣別" },
    { name: "比較四種管道", text: "對比臺灣銀行臨櫃、機場換匯、海外ATM提領、信用卡刷卡的實際手續費" },
    { name: "選擇最划算方式", text: "大額選銀行臨櫃；小額隨時用ATM；日常消費選海外回饋信用卡" },
  ],
});

export default function BestExchangePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={howToJsonLd} />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "旅行工具", href: "/tools" },
            { label: "最佳換匯試算" },
          ]}
        />

        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          最佳換匯試算
        </h1>

        <BestExchangeCalculator />

        <AdBanner slot="tool-bottom" className="my-8" />

        <article className="prose prose-gray max-w-none">
          <h2>出國換匯怎麼換最划算？</h2>
          <p>
            出國旅遊前，換匯是每位旅人必須面對的課題。不同的換匯管道在匯率與手續費上有顯著差異，選擇正確的方式可以省下不少旅費。
          </p>

          <h3>四種常見換匯方式比較</h3>
          <p>
            <strong>臺灣銀行臨櫃</strong>
            通常提供最接近市場中間價的匯率，價差最小，適合大額換匯。建議在出發前數天至銀行辦理，可搭配外幣帳戶更加靈活。
          </p>
          <p>
            <strong>機場換匯</strong>
            雖然方便但匯率通常較差，價差可達 1%
            以上。僅建議換少量現金以備急用。
          </p>
          <p>
            <strong>海外 ATM 提領</strong>
            匯率介於銀行與機場之間，但需注意每筆固定手續費。提領金額越大，手續費佔比越低，建議一次提領較多金額。
          </p>
          <p>
            <strong>信用卡海外刷卡</strong>
            雖然有 1.5%
            海外交易手續費，但國際組織匯率通常優於現鈔匯率。若搭配高海外回饋的信用卡（如
            2.5% 以上），實際成本可能是最低的。
          </p>

          <h3>換匯小技巧</h3>
          <ul>
            <li>大額換匯選銀行臨櫃，小額零用選信用卡刷卡</li>
            <li>出發前可先在網路銀行掛單，等到好匯率再成交</li>
            <li>避免在觀光區的私人換匯所換錢，匯率通常最差</li>
            <li>攜帶多種支付方式，靈活搭配最省錢</li>
          </ul>
        </article>

        <RelatedTools currentHref="/tools/best-exchange" />

        <FaqSection faqs={TOOL_FAQS["best-exchange"]} />
      </div>
    </>
  );
}

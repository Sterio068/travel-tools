import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";
import ExpenseTracker from "@/components/tools/ExpenseTracker";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "旅遊記帳工具｜旅行花費追蹤，多幣別自動換算",
  description: "記錄旅行中的每筆花費，依分類統計並自動換算台幣。支援日圓、韓元、美元等多國貨幣，資料存在瀏覽器不需註冊。",
  path: "/tools/expense-tracker",
  keywords: ["旅遊記帳", "旅行花費追蹤", "出國花費", "旅遊支出統計", "記帳app", "多幣別換算"],
});

const jsonLd = webApplicationSchema({
  name: "行程花費追蹤",
  description: "旅行花費記錄與多幣別換算追蹤工具",
  path: "/tools/expense-tracker",
});

export default function ExpenseTrackerPage() {
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
          { label: "行程花費追蹤" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">行程花費追蹤</h1>
        <p className="mb-8 text-gray-600">
          記錄旅途中的每一筆花費，依類別分組統計，並自動換算成台幣，輕鬆掌握旅行預算。
        </p>

        <ExpenseTracker />

        <AdBanner className="my-8" />

        <article className="prose prose-gray max-w-none">
          <h2>旅行記帳的實用建議</h2>
          <p>
            出國旅行時掌握花費狀況，能幫助你控制預算、避免超支。以下分享幾個實用的旅行記帳技巧。
          </p>

          <h3>為什麼要旅行記帳？</h3>
          <ul>
            <li>即時掌握花費進度，避免旅程後半段預算不足。</li>
            <li>了解各類別花費比例，作為下次旅行的預算參考。</li>
            <li>外幣消費容易失去金錢感覺，換算台幣後更有實感。</li>
          </ul>

          <h3>記帳分類建議</h3>
          <p>
            本工具將花費分為六大類：餐飲、住宿、交通、景點娛樂、購物與其他。消費後立即記錄最不容易遺漏，養成「花完就記」的習慣。
          </p>

          <h3>旅行預算分配參考</h3>
          <p>
            一般建議的預算分配比例為：住宿 30–40%、餐飲 20–25%、交通
            15–20%、景點娛樂 10–15%、購物與其他
            10–15%。實際比例會依目的地和旅行風格有所不同。
          </p>

          <h3>省錢小技巧</h3>
          <ul>
            <li>善用當地交通卡或周遊券，交通費可省下不少。</li>
            <li>嘗試當地市場或超市的熟食，比餐廳經濟實惠。</li>
            <li>提前購買景點門票，通常有早鳥折扣。</li>
            <li>換匯時比較匯率，避免在機場換取大額外幣。</li>
          </ul>

          <h3>關於匯率換算</h3>
          <p>
            本工具使用靜態參考匯率進行換算，僅供預算估算參考，不代表即時匯率。實際花費金額請以信用卡帳單或銀行匯率為準。
          </p>
        </article>

        <FaqSection faqs={TOOL_FAQS["expense-tracker"]} />
      </div>
    </>
  );
}

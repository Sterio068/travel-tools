import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";
import CustomsChecker from "@/components/tools/CustomsChecker";
import { buildPageMetadata, webApplicationSchema, howToSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildPageMetadata({
  title: "台灣海關規定速查｜入境可帶什麼？免稅額度一覽",
  description: "快速查詢台灣入出境攜帶物品規定，包含免稅額度、菸酒限量、現金申報門檻、禁止攜帶品清單。",
  path: "/tools/customs",
  keywords: ["台灣海關", "入境規定", "免稅額度", "攜帶現金", "禁止攜帶", "海關申報", "菸酒限量"],
});

const jsonLd = webApplicationSchema({
  name: "入境攜帶物品查詢",
  description:
    "一站查詢台灣出入境海關攜帶物品規定，涵蓋外幣現金額度、菸酒免稅量、藥品限量、禁止攜帶品清單。",
  path: "/tools/customs",
});

const howToJsonLd = howToSchema({
  name: "如何查詢台灣入境海關規定",
  description: "出國前了解台灣入境攜帶物品規定，避免違規被罰款或沒收",
  steps: [
    { name: "確認攜帶物品", text: "整理旅途中購買或準備帶回的物品清單" },
    { name: "查詢限量規定", text: "使用工具查看菸酒免稅額度、現金申報門檻及禁止攜帶品清單" },
    { name: "超量物品申報", text: "超過免稅額度的物品須走紅線通道主動申報，繳納稅款" },
    { name: "禁止攜帶品處理", text: "肉類製品、新鮮水果等禁止攜帶入境，出發前先消耗或丟棄" },
  ],
});

export default function CustomsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={howToJsonLd} />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "旅行工具", href: "/tools" },
            { label: "入境攜帶物品查詢" },
          ]}
        />

        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          入境攜帶物品查詢
        </h1>

        <CustomsChecker />

        <AdBanner className="my-8" />

        <article className="prose prose-gray max-w-none">
          <h2>台灣海關攜帶物品規定須知</h2>
          <p>
            無論是出國旅遊還是返台入境，了解海關攜帶物品規定是每位旅客的基本功課。違規攜帶不僅可能被沒收物品，嚴重者還可能面臨罰鍰。
          </p>

          <h3>入境台灣重點提醒</h3>
          <p>
            入境台灣時最常見的違規項目是肉類製品與新鮮水果。自 2019
            年非洲豬瘟防疫期間起，違規攜帶肉類製品入境的罰鍰大幅提高，初犯即可處新台幣
            20 萬元罰鍰，切勿心存僥倖。
          </p>
          <p>
            菸酒免稅額度為每人捲菸 200 支或雪茄 25 支或菸絲 1
            磅（三者擇一），酒類 1
            公升。超量部分需主動向海關申報並繳納稅捐。
          </p>

          <h3>出境台灣注意事項</h3>
          <p>
            出境時最需注意的是現金攜帶限額。新台幣上限為 10
            萬元，人民幣上限為 2
            萬元，外幣等值美金 1
            萬元以上須申報。未依規定申報者，超額部分將被海關沒入。
          </p>

          <h3>申報方式</h3>
          <p>
            入出境時如有需申報物品，請走「紅線」（應申報）通道，填寫海關申報單後交由海關人員查驗。無須申報者走「綠線」（免申報）通道即可。
          </p>
        </article>

        <FaqSection faqs={TOOL_FAQS["customs"]} />
      </div>
    </>
  );
}

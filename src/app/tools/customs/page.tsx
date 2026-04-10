import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { FaqSection } from "@/components/seo/FaqSection";
import { TOOL_FAQS } from "@/data/tool-faqs";
import CustomsChecker from "@/components/tools/CustomsChecker";
import { webApplicationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "入境攜帶物品查詢 — 台灣海關規定速查",
  description:
    "快速查詢台灣入出境攜帶物品規定，包含免稅額度、菸酒限量、現金申報、禁止攜帶品等海關法規。",
};

const jsonLd = webApplicationSchema({
  name: "入境攜帶物品查詢",
  description:
    "一站查詢台灣出入境海關攜帶物品規定，涵蓋外幣現金額度、菸酒免稅量、藥品限量、禁止攜帶品清單。",
  path: "/tools/customs",
});

export default function CustomsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

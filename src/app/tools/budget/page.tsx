import type { Metadata } from "next";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import BudgetCalculator from "@/components/tools/BudgetCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "旅遊預算計算機 - 出國花費預估工具",
  description:
    "輸入目的地、天數、人數與旅遊風格，立即估算出國旅遊預算。包含機票、住宿、餐飲、交通、活動、購物等費用明細，幫你掌握旅費預算。",
  keywords: [
    "旅遊預算",
    "出國費用",
    "旅費計算",
    "自由行預算",
    "旅遊花費",
    "旅遊預算計算機",
  ],
  path: "/tools/budget",
});

export default function BudgetPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "旅遊預算計算機",
          description:
            "依目的地、天數、人數與旅遊風格估算出國旅費，含各項費用明細",
          path: "/tools/budget",
        })}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "實用工具", href: "/tools" },
            { label: "旅遊預算計算機" },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            旅遊預算計算機
          </h1>
          <p className="text-gray-600">
            選擇目的地、天數、人數和旅遊風格，一鍵估算出國旅費。從機票到零用錢，各項開銷一目了然，讓你的旅遊規劃更有底。
          </p>
        </header>

        <BudgetCalculator />

        <AdBanner slot="tool-result" className="mt-8" />

        {/* SEO long-form content */}
        <article className="mt-16 prose prose-gray max-w-none">
          <h2>出國旅遊要準備多少錢？預算規劃完整指南</h2>
          <p>
            規劃出國旅遊時，預算是最重要的考量之一。提前估算各項花費，不僅能避免旅途中手忙腳亂，更能讓你在有限的預算內玩得更盡興。以下整理幾個實用的預算規劃重點。
          </p>

          <h2>旅遊預算的主要組成</h2>
          <p>
            一趟出國旅行的花費主要包含：機票、住宿、餐飲、交通、門票與活動、購物、旅遊保險以及雜支。其中機票和住宿通常占總花費的一半以上，也是最有省錢空間的項目。提早預訂、善用比價網站，往往能省下可觀的費用。
          </p>

          <h2>不同旅遊風格的預算差異</h2>
          <p>
            省錢型旅遊（背包客風格）以青年旅館、街邊小吃和大眾運輸為主，花費最低但體驗獨特。舒適型旅遊選擇三四星飯店、餐廳用餐和偶爾包車，適合大多數旅客。奢華型旅遊則入住五星飯店、享受米其林餐廳和私人導遊，花費最高但體驗最豐富。選擇適合自己的旅遊風格，才能花得值得。
          </p>

          <h2>各國旅遊花費排行</h2>
          <p>
            亞洲國家中，日本和韓國的花費中等偏高，東南亞的泰國、越南、菲律賓等則相對便宜。歐美國家的物價普遍較高，尤其是住宿和餐飲。不過即使是高物價國家，透過善用免費景點、自炊、購買交通通票等方式，也能有效控制預算。
          </p>

          <h2>省錢旅遊實用技巧</h2>
          <p>
            選擇淡季或平日出發，機票和住宿通常較便宜。提前三到六個月預訂機票，往往能搶到優惠票價。善用旅遊信用卡的海外消費回饋，累積下來也是一筆可觀的節省。到當地後多利用大眾運輸和步行，既省錢又能深入體驗在地生活。
          </p>
        </article>

        <AdBanner slot="tool-bottom" className="mt-12" />
      </div>
    </>
  );
}

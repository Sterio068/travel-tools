import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { webApplicationSchema } from "@/lib/seo";
import PackingListGenerator from "@/components/tools/PackingListGenerator";

export const metadata: Metadata = buildPageMetadata({
  title: "打包清單產生器 - 出國行李打包不遺漏",
  description:
    "依照氣候、天數自動產生旅行打包清單，含證件、電子產品、衣物、藥品等分類，勾選追蹤打包進度。台灣旅客出國前必用的免費工具。",
  keywords: [
    "打包清單",
    "旅行打包",
    "出國行李",
    "行李清單",
    "旅遊必備物品",
    "出國必帶",
    "打包檢查表",
    "行前準備",
  ],
  path: "/tools/packing-list",
});

export default function PackingListPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "打包清單產生器",
          description:
            "依照氣候與天數產生旅行打包清單，勾選追蹤打包進度",
          path: "/tools/packing-list",
        })}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "實用工具", href: "/tools" },
            { label: "打包清單產生器" },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            打包清單產生器
          </h1>
          <p className="text-gray-600">
            選擇目的地氣候和旅行天數，自動產生完整的打包清單。勾選已準備的物品，輕鬆追蹤打包進度，確保出門不遺漏。
          </p>
        </header>

        <PackingListGenerator />

        <AdBanner slot="tool-result" className="mt-8" />

        {/* SEO long-form content */}
        <article className="mt-16 prose prose-gray max-w-none">
          <h2>出國打包的黃金法則</h2>
          <p>
            打包行李是出國前最重要的準備工作之一。建議在出發前兩到三天開始打包，先列出清單再依序放入行李箱。採用「分類裝袋」的方式，用收納袋將衣物、盥洗用品、電子產品分開，不僅方便找東西，也能避免液體外漏弄髒其他物品。
          </p>

          <h2>行李打包技巧：捲衣法 vs 平放法</h2>
          <p>
            捲衣法適合 T 恤、內衣褲等休閒衣物，可以節省空間並減少皺摺。正式服裝和外套則建議平放或使用衣物收納袋。褲子可以沿著行李箱邊緣鋪放，中間的空間塞入捲好的衣物，空隙再塞襪子和小物，這樣能最大化利用行李箱空間。
          </p>

          <h2>隨身行李 vs 託運行李怎麼分？</h2>
          <p>
            護照、手機、充電線、行動電源、錢包和貴重物品一定要放隨身行李。行動電源依規定不能託運，必須隨身攜帶。液體類物品如果放隨身行李，每瓶不能超過
            100ml，且必須裝在透明夾鏈袋中。超過
            100ml
            的液體（防曬乳、洗髮精等）請放託運行李。
          </p>

          <h2>依氣候調整打包清單</h2>
          <p>
            去熱帶國家記得帶防曬乳、太陽眼鏡、薄外套（室內冷氣很強）和防蚊液。溫帶地區建議洋蔥式穿搭，帶一件薄外套和一件防風外套。寒帶旅遊則需要保暖內衣、羽絨衣、手套、圍巾和保暖帽，護唇膏和保濕乳液也很重要。
          </p>

          <h2>常被忘記但很重要的物品</h2>
          <p>
            根據經驗，最容易被遺忘的物品包括：萬用轉接頭、常備藥品、原子筆（填入境卡用）、夾鏈袋（液體分裝）、以及護照影本（建議與正本分開放，另存一份電子檔在手機）。出發前對照清單再檢查一次，可以大幅降低遺漏的機率。
          </p>
        </article>

        <AdBanner slot="tool-bottom" className="mt-12" />
      </div>
    </>
  );
}

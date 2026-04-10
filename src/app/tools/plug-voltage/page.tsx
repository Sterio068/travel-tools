import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import { webApplicationSchema } from "@/lib/seo";
import PlugVoltageChecker from "@/components/tools/PlugVoltageChecker";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = buildPageMetadata({
  title: "插頭 / 電壓查詢 - 各國插座規格與轉接頭指南",
  description:
    "查詢世界各國插頭類型與電壓規格，一鍵比對台灣電器相容性。告訴你需不需要轉接頭或變壓器，出國前必查的實用工具。",
  keywords: [
    "插頭類型",
    "電壓查詢",
    "轉接頭",
    "變壓器",
    "各國插座",
    "旅遊轉接頭",
    "出國電壓",
    "萬用轉接頭",
    "Type A",
    "Type C",
    "Type G",
  ],
  path: "/tools/plug-voltage",
});

export default function PlugVoltagePage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "插頭 / 電壓查詢",
          description: "查詢各國插頭類型與電壓，比對台灣電器相容性",
          path: "/tools/plug-voltage",
        })}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "實用工具", href: "/tools" },
            { label: "插頭電壓查詢" },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            插頭 / 電壓查詢
          </h1>
          <p className="text-gray-600">
            選擇目的地國家，立即查看插頭類型、電壓頻率，以及台灣電器是否相容。出國前確認是否需要轉接頭或變壓器，避免電器損壞。
          </p>
        </header>

        <PlugVoltageChecker />

        <AdBanner slot="tool-result" className="mt-8" />

        {/* SEO long-form content */}
        <article className="mt-16 prose prose-gray max-w-none">
          <h2>全球插頭類型總覽</h2>
          <p>
            世界各國使用的插頭規格並不統一，常見的插頭類型包括
            Type A、B（台灣、美國、日本）、Type C、E、F（歐洲大陸）、Type
            G（英國、新加坡、馬來西亞、香港）、Type I（澳洲、紐西蘭）等。出國前了解目的地的插頭規格，才能準備正確的轉接頭。
          </p>

          <h2>轉接頭怎麼買？</h2>
          <p>
            如果你經常出國旅遊，建議直接購買一個「萬用轉接頭」，一個就能對應全球主要插座規格。選購時注意是否支援接地腳（三孔），以及額定電流是否足夠（建議至少
            10A）。品質好的萬用轉接頭附有安全擋片和保險絲，使用更安心。
          </p>

          <h2>什麼時候需要變壓器？</h2>
          <p>
            台灣使用 110V / 60Hz
            電壓。如果目的地是歐洲、韓國、東南亞等使用
            220-240V
            的國家，「發熱類」電器（吹風機、電捲棒、電熨斗）必須搭配變壓器使用，否則會因為電壓過高而燒毀。但手機充電器和筆電變壓器通常標示
            100-240V 寬電壓，可以直接使用不需要變壓器。
          </p>

          <h2>日本旅遊的電壓注意事項</h2>
          <p>
            日本使用 Type A/B 插頭，與台灣相同，但電壓為 100V（台灣
            110V）。兩者差距很小，大部分台灣電器都可以直接使用。不過日本東部（東京）和西部（大阪）的頻率不同：東部
            50Hz、西部 60Hz，但這對一般旅遊電器幾乎沒有影響。
          </p>

          <h2>出國前的電器檢查清單</h2>
          <p>
            出發前建議檢查每個要攜帶的電器背面標示：如果寫著 100-240V
            就是寬電壓、全球通用；如果只寫 110V
            就要特別注意目的地電壓。同時確認攜帶的行動電源容量符合航空公司規定（通常限制
            100Wh / 27,000mAh 以下），且行動電源必須隨身攜帶，不能託運。
          </p>
        </article>

        <FaqSection faqs={TOOL_FAQS["plug-voltage"]} />

        <RelatedTools currentHref="/tools/plug-voltage" />

        <AdBanner slot="tool-bottom" className="mt-12" />
      </div>
    </>
  );
}

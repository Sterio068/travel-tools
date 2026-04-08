import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import PowerBankChecker from "@/components/tools/PowerBankChecker";
import { webApplicationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "行動電源規定查詢 — 搭飛機可以帶行動電源嗎？",
  description:
    "輸入行動電源容量，立即查詢是否符合航空公司登機規定。含常見行動電源 Wh 對照表及鋰電池攜帶須知。",
};

const jsonLd = webApplicationSchema({
  name: "行動電源規定查詢",
  description:
    "輸入行動電源的 mAh 容量與電壓，自動計算 Wh 並判斷是否可攜帶登機，附常見容量對照表。",
  path: "/tools/power-bank",
});

export default function PowerBankPage() {
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
            { label: "行動電源規定查詢" },
          ]}
        />

        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          行動電源規定查詢
        </h1>

        <PowerBankChecker />

        <AdBanner className="my-8" />

        <article className="prose prose-gray max-w-none">
          <h2>搭飛機可以帶行動電源嗎？完整規定說明</h2>
          <p>
            行動電源（充電寶）內含鋰電池，屬於航空安全管制品。根據國際民航組織規定，鋰電池依其能量密度（以
            Wh 瓦時計算）分為三個等級，適用不同的攜帶規定。
          </p>

          <h3>如何計算行動電源的 Wh？</h3>
          <p>
            大部分行動電源標示的是 mAh（毫安培小時），需要換算成 Wh（瓦時）才能判斷是否符合規定。計算公式為：
          </p>
          <p>
            <strong>Wh = mAh x V / 1000</strong>
          </p>
          <p>
            其中 V 為電池標稱電壓，一般鋰電池為 3.7V。例如一顆 20000mAh 的行動電源：20000 x 3.7 / 1000 = 74Wh，屬於可自由攜帶的範圍。
          </p>

          <h3>三級管制標準</h3>
          <p>
            <strong>100Wh 以下</strong>：可自由放入隨身行李，無需申請。市面上絕大多數行動電源（26800mAh 以下）皆屬此類。
          </p>
          <p>
            <strong>100Wh 至 160Wh</strong>：須事先獲得航空公司同意，每人限帶 2 個，僅限隨身攜帶。常見於筆電型大容量行動電源。
          </p>
          <p>
            <strong>超過 160Wh</strong>：無論隨身或託運皆禁止攜帶上飛機。
          </p>

          <h3>常見問題</h3>
          <p>
            <strong>行動電源可以託運嗎？</strong>
            不行。所有含鋰電池的行動電源一律禁止放入託運行李，必須隨身攜帶。
          </p>
          <p>
            <strong>沒有標示容量的行動電源可以帶嗎？</strong>
            機場安檢人員可能會拒絕無法辨識容量的行動電源登機。建議攜帶有清楚標示的產品，或隨身備妥產品規格資料。
          </p>
          <p>
            <strong>飛行中可以用行動電源充電嗎？</strong>
            部分航空公司允許在飛行中使用，但也有航空公司全程禁止。建議出發前查閱航空公司相關規定。
          </p>
        </article>
      </div>
    </>
  );
}

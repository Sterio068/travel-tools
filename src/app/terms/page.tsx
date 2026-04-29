import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "服務條款",
  description: "旅遊實用工具站的服務條款與使用規範。",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "服務條款" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-6">服務條款</h1>

      <div className="space-y-6 text-brand-800 text-base leading-relaxed">
        <p>最後更新日期：2026 年 4 月 8 日</p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">服務內容</h2>
        <p>旅遊實用工具站提供免費的出國旅遊實用工具與資訊，包括匯率換算、時差查詢、行李規定速查、旅遊預算計算等功能。</p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">免責聲明</h2>
        <p>本站所有計算工具的結果及旅遊資訊僅供參考。匯率為即時估算值，實際兌換金額以銀行或換匯機構的牌告匯率為準。各國簽證、入境規定、航空行李規定等可能隨時變更，出發前請以各官方網站最新公告為準。本站不對因使用本站資訊所造成的任何損失負責。</p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">智慧財產權</h2>
        <p>本站的所有原創內容（包括文字、設計、程式碼）均受著作權法保護。未經授權不得轉載或複製。</p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">外部連結</h2>
        <p>本站可能包含外部網站的連結（如航空公司官網、旅遊平台等），我們不對這些外部網站的內容或安全性負責。</p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">廣告與商業內容</h2>
        <p>
          本站可能顯示第三方廣告或合作內容。廣告內容由第三方服務提供，使用者應自行判斷廣告商品或服務是否符合需求。
          本站不會要求、暗示或鼓勵使用者點擊廣告。
        </p>
      </div>
    </div>
  );
}

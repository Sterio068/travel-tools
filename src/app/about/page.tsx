import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "關於旅遊實用工具站",
  description: "旅遊實用工具站的使命、資料來源與團隊介紹。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "關於我們" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-6">關於旅遊實用工具站</h1>

      <div className="space-y-6 text-brand-800 text-base md:text-lg leading-relaxed">
        <p>
          旅遊實用工具站是專為台灣旅客打造的免費出國工具網站。我們整合了匯率換算、時差查詢、行李規定、旅遊預算計算等最常用的旅遊工具，讓你出國前的準備工作更加輕鬆。
        </p>

        <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">我們的使命</h2>
        <p>
          台灣每年有超過 1,700 萬人次出國旅遊，但旅遊相關資訊往往分散在各個網站。我們希望提供一個簡單、好用的一站式平台，讓每個旅客都能快速找到需要的資訊。
        </p>

        <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">資料來源</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>匯率資料：即時匯率 API + 台灣銀行牌告匯率</li>
          <li>行李規定：各航空公司官方網站（定期更新）</li>
          <li>簽證資訊：外交部領事事務局</li>
          <li>國家資訊：各國官方旅遊網站</li>
        </ul>
        <p>
          更完整的查核方式與廣告揭露，請參考本站的資料來源與編輯政策。
        </p>

        <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">營運方式</h2>
        <p>
          本站以免費工具和旅遊資訊服務讀者，可能透過廣告或合作內容支持網站維運。
          廣告不會影響旅遊資訊的整理原則，本站也不會要求或鼓勵使用者點擊廣告。
        </p>

        <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">免責聲明</h2>
        <p>
          本站提供的所有資訊僅供參考。匯率會即時波動、各國規定可能隨時調整、航空公司行李政策也會變更。出發前請務必以各官方網站的最新資訊為準。
        </p>

        <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">聯絡我們</h2>
        <p>
          如果你發現資料有誤、有功能建議，或有任何合作洽詢，歡迎來信：
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-[12px] bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
        >
          前往聯絡頁
        </a>
      </div>
    </div>
  );
}

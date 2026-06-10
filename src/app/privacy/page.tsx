import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "隱私權政策",
  description: "旅遊實用工具站的隱私權政策與資料處理說明。",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "隱私權政策" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-6">隱私權政策</h1>

      <div className="space-y-6 text-brand-800 text-base leading-relaxed">
        <p>最後更新日期：2026 年 5 月 25 日</p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">資料收集</h2>
        <p>本站不要求使用者註冊或登入。我們透過 Google Analytics 收集匿名的瀏覽統計資料（如頁面瀏覽次數、使用者所在地區等），用於改善網站內容與使用體驗。</p>
        <p>
          若你透過 Email 主動聯絡我們，來信內容會用於回覆、查核資料、修正頁面或處理合作洽詢；除法律要求、網站安全或必要服務處理外，我們不會出售或出租你的個人資料。
        </p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">Cookie 使用</h2>
        <p>本站使用 Google Analytics 和 Google AdSense 的 Cookie。這些 Cookie 用於分析網站流量和提供相關廣告。您可以透過瀏覽器設定管理或停用 Cookie。</p>
        <p>
          Google 可能依照使用者的瀏覽器、裝置、廣告設定與其他訊號顯示個人化或非個人化廣告。
          你可以透過 Google 廣告設定或瀏覽器隱私設定管理廣告個人化與 Cookie。
        </p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">第三方服務</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Google Analytics — 網站流量分析</li>
          <li>Google AdSense — 廣告投放</li>
          <li>Vercel — 網站託管</li>
        </ul>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">工具資料</h2>
        <p>
          部分工具可能在你的瀏覽器本機儲存資料，例如旅行花費追蹤、清單或偏好設定。這些資料通常不會上傳到本站伺服器；清除瀏覽器資料或更換裝置後，資料可能消失。
        </p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">廣告審查與顯示</h2>
        <p>
          本站可能保留 AdSense 帳戶驗證、ads.txt 或必要技術標記。若正式顯示廣告，廣告會與主要內容保持區隔，且不會要求或鼓勵使用者點擊。
        </p>

        <h2 className="text-xl font-bold text-brand-900 mt-6 mb-3">聯絡我們</h2>
        <p>如對隱私權政策有任何疑問，歡迎透過聯絡頁與我們聯繫。</p>
      </div>
    </div>
  );
}

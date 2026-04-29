import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "資料來源與編輯政策",
  description: "旅遊實用工具站如何查核、更新與揭露旅遊資訊及廣告內容。",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "資料來源與編輯政策" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-6">
        資料來源與編輯政策
      </h1>

      <div className="space-y-6 text-brand-800 text-base md:text-lg leading-relaxed">
        <p>最後更新日期：2026 年 4 月 30 日</p>
        <p>
          旅遊實用工具站以台灣旅客的行前準備需求為核心，整理匯率、簽證、時差、行李、退稅、插頭電壓等資訊。
          我們的目標是提供好理解、可查證、方便使用的旅遊工具與文章，但所有資訊仍可能因各國政策或服務條款變動而調整。
        </p>

        <section>
          <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">主要資料來源</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>各國政府、移民、海關、觀光與稅務機關公開資訊</li>
            <li>航空公司官方行李與運送規定</li>
            <li>台灣外交部、領事事務局與相關官方公告</li>
            <li>匯率與時區資料 API，以及銀行或金融機構公開資料</li>
            <li>實際旅遊情境整理、讀者回報與人工查核</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">更新與查核方式</h2>
          <p>
            高變動資訊會定期檢查，包含簽證、入境、行李、退稅、匯率與保險相關內容。
            當官方公告或讀者回報指出資訊需要修正時，我們會重新查核來源並更新頁面。
          </p>
          <p className="mt-3">
            文章和工具頁的資訊僅供旅遊規劃參考。實際出發、購買、申請或通關前，請以官方網站、航空公司、銀行、保險公司或主管機關的最新公告為準。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">廣告與商業揭露</h2>
          <p>
            本站可能透過 Google AdSense 或其他合作方式顯示廣告，以支持網站維運與內容製作。
            廣告不會影響我們對旅遊資訊的整理原則，也不會要求或鼓勵使用者點擊廣告。
          </p>
          <p className="mt-3">
            若未來出現業配、推薦連結或商業合作內容，我們會在相關頁面清楚標示，讓讀者能分辨一般編輯內容與商業內容。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">錯誤回報</h2>
          <p>
            如果你發現任何內容需要更正，請透過聯絡頁提供頁面網址、問題描述與可參考的官方來源。
            我們會依資訊影響程度安排查核與更新。
          </p>
        </section>
      </div>
    </div>
  );
}

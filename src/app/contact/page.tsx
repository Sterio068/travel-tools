import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "聯絡我們",
  description: "旅遊實用工具站的聯絡方式、資料更正與合作洽詢管道。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "聯絡我們" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-6">聯絡我們</h1>

      <div className="space-y-6 text-brand-800 text-base md:text-lg leading-relaxed">
        <p>
          如果你發現旅遊資訊需要更正、想建議新工具，或有合作洽詢，歡迎透過電子郵件與我們聯繫。
          我們會優先處理影響旅客判斷的資料錯誤，例如簽證、入境、行李、退稅與安全相關資訊。
        </p>

        <section className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-6">
          <h2 className="text-xl font-bold text-brand-900 mb-3">電子郵件</h2>
          <p className="mb-4 text-brand-700">
            來信時請附上相關頁面網址、你看到的問題，以及可參考的官方來源連結，方便我們查核。
          </p>
          <a
            href="mailto:sterio068@gmail.com"
            className="inline-flex items-center px-5 py-2.5 rounded-[8px] bg-brand-500 text-slate-50 font-semibold hover:bg-brand-600 transition-colors"
          >
            sterio068@gmail.com
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">可聯絡事項</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>資料錯誤回報或官方來源更新</li>
            <li>旅遊工具功能建議</li>
            <li>文章主題建議與讀者回饋</li>
            <li>品牌合作、媒體或商務洽詢</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">
            回報資料錯誤時請附上
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>問題頁面的網址與錯誤段落。</li>
            <li>你查到的官方來源、航空公司公告、銀行或保險條款連結。</li>
            <li>若是工具結果異常，請附上輸入條件與截圖。</li>
            <li>若是政策變更，請標出公告日期與適用對象。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">回覆時間</h2>
          <p>
            一般來信會在 3 至 7 個工作天內回覆。若是重大政策變更或安全相關資訊，我們會優先查核並更新頁面。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">
            我們無法代辦的事項
          </h2>
          <p>
            本站無法代辦簽證、保險理賠、訂票、退稅、海關申報或緊急救援。若已在旅途中遇到入境、事故、遺失護照、醫療或人身安全問題，請優先聯絡航空公司、保險公司、當地警政機關、台灣駐外館處或官方緊急窗口。
          </p>
        </section>
      </div>
    </div>
  );
}

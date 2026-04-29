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

        <section className="bg-white rounded-[16px] p-6 shadow-[0_1px_3px_rgba(8,51,68,0.06)]">
          <h2 className="text-xl font-bold text-brand-900 mb-3">電子郵件</h2>
          <p className="mb-4 text-brand-700">
            來信時請附上相關頁面網址、你看到的問題，以及可參考的官方來源連結，方便我們查核。
          </p>
          <a
            href="mailto:sterio068@gmail.com"
            className="inline-flex items-center px-5 py-2.5 rounded-[12px] bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
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
          <h2 className="text-2xl font-bold text-brand-900 mt-8 mb-4">回覆時間</h2>
          <p>
            一般來信會在 3 至 7 個工作天內回覆。若是重大政策變更或安全相關資訊，我們會優先查核並更新頁面。
          </p>
        </section>
      </div>
    </div>
  );
}

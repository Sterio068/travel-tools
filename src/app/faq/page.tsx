import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, faqSchema, type FaqItem } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "常見問題 FAQ — 出國工具、資料來源與使用限制",
  description:
    "旅遊實用工具站常見問題，說明匯率、簽證、行李、退稅、保險、資料來源、廣告與隱私權處理方式。",
  keywords: ["旅遊 FAQ", "出國常見問題", "旅遊工具說明", "資料來源"],
  path: "/faq",
});

const FAQS: FaqItem[] = [
  {
    question: "本站的旅遊工具可以取代官方資訊嗎？",
    answer:
      "不行。本站工具適合行前估算、整理與檢查，但簽證、入境、行李、退稅、保險與安全規定仍需以官方網站、航空公司、銀行、保險公司或主管機關最新公告為準。",
  },
  {
    question: "匯率換算結果和銀行實際匯率為什麼不同？",
    answer:
      "匯率工具用於快速估算，實際交易會受到銀行牌告匯率、信用卡組織匯率、海外交易手續費、ATM 手續費與交易時間影響。大額換匯建議再查銀行或信用卡實際費率。",
  },
  {
    question: "簽證與免簽資訊多久更新一次？",
    answer:
      "本站會優先更新熱門目的地與高變動頁面，但各國入境規定可能臨時調整。出發前請再確認外交部領事事務局、目的地移民機關與航空公司登機要求。",
  },
  {
    question: "行李、行動電源和液體規定為什麼常有例外？",
    answer:
      "航空公司、機場安檢、票種、艙等與航線都可能造成差異。本站會整理常見規則，但實際託運與登機仍以航空公司和機場現場規定為準。",
  },
  {
    question: "退稅計算結果可以當成實際退款金額嗎？",
    answer:
      "退稅工具只能估算。實際退款會受到最低消費門檻、商品類型、退稅公司手續費、店家流程、機場海關查驗與付款方式影響。",
  },
  {
    question: "旅行花費追蹤器會把資料傳到伺服器嗎？",
    answer:
      "不會。花費追蹤資料儲存在你的瀏覽器 localStorage，不需登入，也不會上傳到本站伺服器。清除瀏覽器資料或更換裝置後，資料可能消失。",
  },
  {
    question: "本站是否會為了廣告修改工具結果或文章結論？",
    answer:
      "不會。本站可能透過廣告維持營運，但廣告不會決定工具假設、文章結論或來源選擇，也不會要求或鼓勵讀者點擊廣告。",
  },
  {
    question: "我發現資料錯誤，應該怎麼回報？",
    answer:
      "請透過聯絡頁提供頁面網址、錯誤位置、你看到的問題，以及可查證的官方來源連結。我們會優先處理會影響出發、通關、安全或金錢損失的內容。",
  },
  {
    question: "本站適合哪些旅客使用？",
    answer:
      "本站主要為台灣自由行旅客設計，適合用來估算旅費、換匯、時差、行李、退稅、保險和入境準備。商務、長期居留、留學或移民需求仍應查專門機關與專業服務。",
  },
  {
    question: "為什麼有些內容不是即時資料？",
    answer:
      "部分資訊如簽證、航空政策、保險條款與退稅制度需要人工查核；即使頁面顯示最近更新日期，也可能晚於官方臨時公告。重要行程請在出發前再次確認。",
  },
];

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "常見問題" }]} />

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-4">
            常見問題 FAQ
          </h1>
          <p className="text-brand-700 leading-8">
            這裡整理本站工具、資料來源、使用限制、廣告與隱私權相關問題。若你正在準備實際出發，請把本站當成行前整理工具，最後仍以官方最新資訊為準。
          </p>
        </header>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-semibold text-brand-900 hover:bg-brand-50">
                <span>{faq.question}</span>
                <span
                  className="text-xl text-brand-500 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="border-t border-brand-100 px-5 py-4 text-brand-700 leading-7">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}

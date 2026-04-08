import Link from "next/link";
import { TOOLS } from "@/data/constants";
import { COUNTRIES } from "@/data/countries";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);
  const popularCountries = COUNTRIES.slice(0, 8);
  const primaryTools = TOOLS.slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero */}
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-900 mb-4 leading-tight">
          出國旅遊，一站搞定 ✈️
        </h1>
        <p className="text-lg md:text-xl text-brand-700 max-w-2xl mx-auto mb-6">
          匯率換算、行李規定、時差查詢、旅遊預算⋯⋯台灣旅客出國前的免費實用工具站
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center px-6 py-3 rounded-[12px] bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors shadow-sm hover:shadow-md"
          >
            開始使用工具
          </Link>
          <Link
            href="/countries"
            className="inline-flex items-center px-6 py-3 rounded-[12px] bg-white text-brand-600 font-semibold border border-brand-200 hover:bg-brand-50 transition-colors"
          >
            查詢國家資訊
          </Link>
        </div>
      </section>

      {/* 實用工具 */}
      <section className="mb-12 md:mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-900">實用工具</h2>
          <Link href="/tools" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {primaryTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-white rounded-[16px] p-5 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow"
            >
              <span className="text-3xl mb-3 block">{tool.icon}</span>
              <h3 className="font-bold text-brand-900 mb-1">{tool.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 熱門國家 */}
      <section className="mb-12 md:mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-900">熱門目的地</h2>
          <Link href="/countries" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {popularCountries.map((c) => (
            <Link
              key={c.code}
              href={`/countries/${c.code.toLowerCase()}`}
              className="bg-white rounded-[16px] p-4 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow text-center"
            >
              <span className="text-4xl block mb-2">{c.flag}</span>
              <h3 className="font-bold text-brand-900">{c.nameZh}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {c.visaRequired ? "需簽證" : `免簽 ${c.visaFreeDays} 天`} · {c.currency}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新文章 */}
      <section className="mb-12 md:mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-900">旅遊攻略</h2>
          <Link href="/articles" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-[16px] p-5 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow"
            >
              <h3 className="font-bold text-brand-900 mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-3">{article.description}</p>
              <span className="text-xs text-brand-600 font-medium">
                {article.readingMinutes} 分鐘閱讀
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 關於 */}
      <section className="bg-white rounded-[16px] p-8 shadow-[0_1px_3px_rgba(8,51,68,0.06)] text-center">
        <h2 className="text-2xl font-bold text-brand-900 mb-3">出國不再手忙腳亂</h2>
        <p className="text-brand-700 max-w-2xl mx-auto">
          旅遊實用工具站整合了台灣旅客最常需要的出國資訊與計算工具。
          從匯率換算到行李規定，從時差查詢到旅遊預算，所有資訊一站搞定。
          所有工具完全免費，資料定期更新，讓你專心享受旅程。
        </p>
      </section>
    </div>
  );
}

import Link from "next/link";
import { TopicClusterSection } from "@/components/seo/TopicClusterSection";
import { ToolListItem } from "@/components/tools/ToolListItem";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COUNTRIES } from "@/data/countries";
import {
  FEATURED_HOME_HREFS,
  QUICK_TASKS,
  TOOL_GROUPS,
  getToolByHref,
  getToolsByHrefs,
} from "@/data/tool-groups";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);
  const popularCountries = COUNTRIES.slice(0, 8);
  const heroTools = getToolsByHrefs(FEATURED_HOME_HREFS);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <section className="mb-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="pt-2">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-500">
            TripKit Travel Tools
          </p>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-brand-900 md:text-5xl">
            出國前，把該查的事一次排好
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-700 md:text-lg">
            從匯率與預算開始，接著確認簽證、行李、時差和目的地規定。這裡不是文章入口，而是台灣旅客的行前準備工作台。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-[8px] bg-brand-500 px-6 py-3 font-semibold text-slate-50 shadow-sm transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              依任務找工具
            </Link>
            <Link
              href="/topics"
              className="inline-flex items-center justify-center rounded-[8px] border border-brand-200 bg-[var(--color-surface-card)] px-6 py-3 font-semibold text-brand-600 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              看出國準備路線
            </Link>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-slate-500">常見查詢</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_TASKS.map((task) => (
                <Link
                  key={task.href}
                  href={task.href}
                  className="rounded-full border border-brand-100 bg-[var(--color-surface-card)] px-3 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  {task.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-[8px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-brand-900">先完成這四件事</h2>
              <p className="mt-1 text-sm leading-relaxed text-brand-700">
                多數行程都會用到，先查完再往下規劃。
              </p>
            </div>
            <span className="rounded-full bg-[var(--color-surface-card)] px-3 py-1 text-xs font-bold text-brand-600">
              行前
            </span>
          </div>
          <div className="space-y-2">
            {heroTools.map((tool) => (
              <ToolListItem
                key={tool.href}
                tool={tool}
                density="compact"
                showArrow={false}
              />
            ))}
          </div>
        </aside>
      </section>

      <section className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Workflow"
          title="用出國流程整理工具"
          description="使用者通常不是在找一堆工具，而是在處理一個出國任務。這裡依照行前順序分組，降低選擇負擔。"
          action={
            <Link
              href="/tools"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              查看全部工具 →
            </Link>
          }
        />

        <ol className="overflow-hidden rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)]">
          {TOOL_GROUPS.map((group) => {
            const primaryTool = getToolByHref(group.primaryHref);
            const supportingTools = getToolsByHrefs(
              group.hrefs.filter((href) => href !== group.primaryHref).slice(0, 3),
            );

            if (!primaryTool) return null;

            return (
              <li
                key={group.id}
                className="grid gap-4 border-b border-brand-100 p-4 last:border-b-0 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] md:p-5"
              >
                <div>
                  <span className="text-xs font-bold tracking-[0.14em] text-brand-400">
                    {group.step}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-brand-900">{group.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-700">
                    {group.summary}
                  </p>
                </div>
                <div className="grid gap-2">
                  <ToolListItem tool={primaryTool} density="compact" />
                  <div className="grid gap-2 sm:grid-cols-3">
                    {supportingTools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="rounded-[8px] border border-brand-100 bg-brand-50/40 px-3 py-2 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                      >
                        {tool.icon} {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <TopicClusterSection
        className="mb-12 md:mb-16"
        title="主題式準備路線"
        description="如果你已經有目的地或任務，可以直接走完整路線，工具、文章與目的地資訊會串在一起。"
        limit={3}
      />

      <section className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Destination"
          title="熱門目的地速查"
          description="先確認簽證、貨幣、時差與插頭，再決定需要哪些工具。"
          action={
            <Link
              href="/countries"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              查看全部目的地 →
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {popularCountries.map((country) => (
            <Link
              key={country.code}
              href={`/countries/${country.code.toLowerCase()}`}
              className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-3 text-left transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <span className="block text-3xl">{country.flag}</span>
              <h3 className="mt-2 text-sm font-bold text-brand-900 sm:text-base">
                {country.nameZh}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {country.visaRequired ? "需簽證" : `免簽 ${country.visaFreeDays} 天`} · {country.currency}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Guides"
          title="最新旅遊攻略"
          description="攻略文章作為補充說明，協助理解規定、流程與實務細節。"
          action={
            <Link
              href="/articles"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              查看全部攻略 →
            </Link>
          }
        />
        <div className="overflow-hidden rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)]">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block border-b border-brand-100 p-4 transition-colors last:border-b-0 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
            >
              <h3 className="font-bold text-brand-900">{article.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {article.description}
              </p>
              <span className="mt-3 inline-flex text-xs font-semibold text-brand-600">
                {article.readingMinutes} 分鐘閱讀
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-brand-200 pt-8 text-center">
        <h2 className="text-2xl font-bold text-brand-900">免費工具，清楚標示廣告</h2>
        <p className="mx-auto mt-3 max-w-2xl text-brand-700">
          TripKit 以免費工具和旅遊資訊服務讀者，廣告不會偽裝成查詢結果，也不會要求或鼓勵使用者點擊。
        </p>
      </section>
    </div>
  );
}

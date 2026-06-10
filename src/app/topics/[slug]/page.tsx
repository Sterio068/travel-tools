import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { COUNTRIES } from "@/data/countries";
import { TOOLS } from "@/data/constants";
import {
  TOPIC_CLUSTERS,
  getTopicCluster,
  getTopicClusterPath,
  resolveTopicClusterItems,
} from "@/data/topic-clusters";
import { ARTICLES, CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/articles";
import { buildPageMetadata, topicClusterSchema } from "@/lib/seo";

export function generateStaticParams() {
  return TOPIC_CLUSTERS.map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getTopicCluster(slug);
  if (!cluster) return {};

  return buildPageMetadata({
    title: cluster.title,
    description: cluster.description,
    keywords: cluster.keywords,
    path: getTopicClusterPath(cluster),
  });
}

export default async function TopicClusterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cluster = getTopicCluster(slug);
  if (!cluster) notFound();

  const items = resolveTopicClusterItems(cluster, {
    tools: TOOLS,
    articles: ARTICLES,
    countries: COUNTRIES,
  });
  const path = getTopicClusterPath(cluster);
  const itemUrls = [
    ...items.tools.map((tool) => tool.href),
    ...items.articles.map((article) => `/articles/${article.slug}`),
    ...items.countries.map((country) => `/countries/${country.code.toLowerCase()}`),
  ];
  const decisionRows = cluster.planningSteps.map((step, index) => ({
    stage: `第 ${index + 1} 步`,
    title: step.title,
    checkpoint: cluster.checkpoints[index] || cluster.intent,
    toolName: items.tools[index]?.name || items.tools[0]?.name || "旅遊工具",
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={topicClusterSchema({
          title: cluster.title,
          description: cluster.description,
          path,
          itemUrls,
          keywords: cluster.keywords,
        })}
      />
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "旅遊主題攻略", href: "/topics" },
          { label: cluster.shortTitle },
        ]}
      />

      <header className="mb-8">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3">
          {cluster.primaryKeyword}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-3 leading-tight">
          {cluster.title}
        </h1>
        <p className="max-w-3xl text-brand-700 leading-relaxed">{cluster.description}</p>
      </header>

      <section className="mb-10 rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5 md:p-6">
        <h2 className="text-xl font-bold text-brand-900 mb-2">這個主題適合誰</h2>
        <p className="text-brand-800 leading-relaxed">{cluster.intent}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {cluster.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5 md:p-6">
          <h2 className="text-xl font-bold text-brand-900 mb-3">
            {cluster.primaryKeyword}快速答案
          </h2>
          <p className="leading-7 text-brand-800">
            {cluster.description}
            建議依序完成「{cluster.planningSteps.map((step) => step.title).join("、")}」，
            再用本頁工具與攻略補齊目的地細節。
          </p>
        </article>
        <aside
          className="rounded-[8px] border border-brand-100 bg-brand-50/55 p-5"
          data-analytics-location="topic_next_step_anchors"
        >
          <h2 className="text-lg font-bold text-brand-900 mb-3">下一步入口</h2>
          <div className="grid gap-2 text-sm font-medium">
            <a href="#tools" className="text-brand-700 hover:text-brand-900">
              查看必用工具
            </a>
            <a href="#articles" className="text-brand-700 hover:text-brand-900">
              閱讀延伸攻略
            </a>
            {items.countries.length > 0 ? (
              <a href="#countries" className="text-brand-700 hover:text-brand-900">
                查目的地資訊
              </a>
            ) : null}
          </div>
        </aside>
      </section>

      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-2">
            {cluster.primaryKeyword}判斷表
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-600">
            先確認旅程階段，再對照檢查重點與工具；這樣比較容易把預算、文件與目的地資訊排進同一份行程。
          </p>
        </div>
        <div className="overflow-x-auto rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)]">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-brand-50 text-xs font-bold text-brand-700">
              <tr>
                <th scope="col" className="px-4 py-3">
                  階段
                </th>
                <th scope="col" className="px-4 py-3">
                  先做什麼
                </th>
                <th scope="col" className="px-4 py-3">
                  判斷重點
                </th>
                <th scope="col" className="px-4 py-3">
                  搭配工具
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 text-brand-800">
              {decisionRows.map((row) => (
                <tr key={row.stage} className="align-top">
                  <th scope="row" className="whitespace-nowrap px-4 py-4 font-bold text-brand-900">
                    {row.stage}
                  </th>
                  <td className="px-4 py-4 font-semibold text-brand-900">{row.title}</td>
                  <td className="min-w-72 px-4 py-4 leading-6 text-slate-600">{row.checkpoint}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-brand-700">{row.toolName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">規劃步驟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cluster.planningSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5"
            >
              <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {index + 1}
              </span>
              <h3 className="font-bold text-brand-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5 md:p-6">
        <h2 className="text-xl font-bold text-brand-900 mb-4">出發前檢查重點</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cluster.checkpoints.map((checkpoint) => (
            <li key={checkpoint} className="flex items-start gap-3 text-sm text-brand-800 leading-relaxed">
              <span className="mt-0.5 text-brand-500" aria-hidden="true">✓</span>
              <span>{checkpoint}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="tools" className="mb-10 scroll-mt-24" data-analytics-location="topic_tools">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">必用工具</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <span className="text-3xl mb-3 block">{tool.icon}</span>
              <h3 className="font-bold text-brand-900 mb-1">{tool.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="articles" className="mb-10 scroll-mt-24" data-analytics-location="topic_articles">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">延伸攻略</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="flex flex-col rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <span
                className={`self-start px-3 py-1 rounded-[20px] text-xs font-semibold mb-3 ${CATEGORY_COLORS[article.category]}`}
              >
                {CATEGORY_LABELS[article.category]}
              </span>
              <h3 className="font-bold text-brand-900 mb-2 line-clamp-2 flex-1">
                {article.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                {article.description}
              </p>
              <span className="text-xs text-slate-400">{article.readingMinutes} 分鐘閱讀</span>
            </Link>
          ))}
        </div>
      </section>

      {items.countries.length > 0 && (
        <section
          id="countries"
          className="mb-10 scroll-mt-24"
          data-analytics-location="topic_countries"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">目的地速查</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {items.countries.map((country) => (
              <Link
                key={country.code}
                href={`/countries/${country.code.toLowerCase()}`}
                className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <span className="text-4xl block mb-2">{country.flag}</span>
                <h3 className="font-bold text-brand-900">{country.nameZh}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {country.visaRequired ? "需簽證" : `免簽 ${country.visaFreeDays} 天`} · {country.currency}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <FaqSection title="主題常見問題" faqs={cluster.faqs} />
    </div>
  );
}

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

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={topicClusterSchema({
          title: cluster.title,
          description: cluster.description,
          path,
          itemUrls,
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

      <section className="mb-10 rounded-[16px] bg-white p-5 md:p-6 shadow-[0_1px_3px_rgba(8,51,68,0.06)]">
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

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">必用工具</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-white rounded-[16px] p-5 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow"
            >
              <span className="text-3xl mb-3 block">{tool.icon}</span>
              <h3 className="font-bold text-brand-900 mb-1">{tool.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">延伸攻略</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-[16px] p-5 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow flex flex-col"
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
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">目的地速查</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {items.countries.map((country) => (
              <Link
                key={country.code}
                href={`/countries/${country.code.toLowerCase()}`}
                className="bg-white rounded-[16px] p-4 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow text-center"
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

import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ARTICLES, CATEGORY_LABELS, CATEGORY_COLORS, getRelatedArticles } from "@/lib/articles";
import { buildPageMetadata, articleSchema, SITE_URL } from "@/lib/seo";
import { RelatedTools } from "@/components/tools/RelatedTools";
import Link from "next/link";

const CATEGORY_TOOLS: Record<string, string[]> = {
  currency: ["/tools/currency", "/tools/best-exchange", "/tools/tax-refund"],
  visa: ["/tools/visa", "/countries", "/tools/travel-insurance"],
  packing: ["/tools/packing-list", "/tools/baggage", "/tools/power-bank"],
  transport: ["/tools/flight-time", "/tools/timezone"],
  insurance: ["/tools/travel-insurance", "/tools/visa", "/tools/budget"],
  budget: ["/tools/budget", "/tools/currency", "/tools/expense-tracker"],
  destination: ["/countries", "/tools/timezone", "/tools/plug-voltage"],
  tips: ["/tools/packing-list", "/tools/customs", "/tools/budget"],
  safety: ["/tools/travel-insurance", "/tools/visa", "/tools/baggage"],
  tech: ["/tools/plug-voltage", "/tools/power-bank"],
};

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return buildPageMetadata({
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    path: `/articles/${slug}`,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);
  const articleUrl = `${SITE_URL}/articles/${slug}`;

  let Content;
  try {
    Content = (await import(`@/content/articles/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          path: `/articles/${slug}`,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
        })}
      />
      <Breadcrumb items={[
        { label: "首頁", href: "/" },
        { label: "旅遊攻略", href: "/articles" },
        { label: article.title },
      ]} />

      <article>
        <header className="mb-8">
          <span className={`inline-block px-3 py-1 rounded-[20px] text-xs font-semibold mb-3 ${CATEGORY_COLORS[article.category]}`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-3 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>{article.publishedAt}</span>
            <span>{article.readingMinutes} 分鐘閱讀</span>
          </div>
        </header>

        <div className="prose-travel">
          <Content />
        </div>

        <ShareButtons title={article.title} url={articleUrl} />
      </article>

      <RelatedTools
        currentHref={`/articles/${slug}`}
        relatedHrefs={CATEGORY_TOOLS[article.category] ?? []}
      />

      <AdBanner slot="article-bottom" />

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-brand-900 mb-4">相關文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/articles/${r.slug}`}
                className="bg-white rounded-[16px] p-4 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow"
              >
                <h3 className="font-bold text-brand-900 text-sm line-clamp-2">{r.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{r.readingMinutes} 分鐘閱讀</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

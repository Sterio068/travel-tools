import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getAllArticles, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/articles";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "旅遊攻略文章",
  description: "出國旅遊攻略：匯率換匯技巧、簽證申請教學、行李打包秘訣、各國旅遊預算分享。",
  keywords: ["旅遊攻略", "出國攻略", "自由行教學", "旅遊資訊"],
  path: "/articles",
});

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "旅遊攻略" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-2">旅遊攻略</h1>
      <p className="text-brand-700 mb-8">實用的出國旅遊知識與技巧，讓你的旅程更順利</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="bg-white rounded-[16px] p-5 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow flex flex-col"
          >
            <span className={`self-start px-3 py-1 rounded-[20px] text-xs font-semibold mb-3 ${CATEGORY_COLORS[article.category]}`}>
              {CATEGORY_LABELS[article.category]}
            </span>
            <h2 className="font-bold text-brand-900 mb-2 line-clamp-2 flex-1">{article.title}</h2>
            <p className="text-sm text-slate-500 line-clamp-2 mb-3">{article.description}</p>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{article.publishedAt}</span>
              <span>{article.readingMinutes} 分鐘閱讀</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

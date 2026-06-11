import Link from "next/link";
import type { ArticleToolRecommendation } from "@/lib/article-tool-recommendations";

interface ArticleToolCardsProps {
  recommendations: ArticleToolRecommendation[];
}

export function ArticleToolCards({ recommendations }: ArticleToolCardsProps) {
  if (recommendations.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="article-tool-cards-title">
      <div className="mb-4">
        <p className="text-sm font-semibold text-brand-600">下一步</p>
        <h2 id="article-tool-cards-title" className="text-2xl font-bold text-brand-900">
          用工具把攻略變成行動
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {recommendations.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex h-full flex-col rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-brand-50 text-2xl">
              {tool.icon}
            </span>
            <span className="mt-4 block text-base font-bold text-brand-900">
              {tool.name}
            </span>
            <span className="mt-2 block flex-1 text-sm leading-6 text-slate-600">
              {tool.reason}
            </span>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-700 group-hover:text-brand-900">
              {tool.cta}
              <span className="ml-1" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

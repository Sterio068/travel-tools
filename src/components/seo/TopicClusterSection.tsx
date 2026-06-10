import Link from "next/link";
import {
  getTopicClusterPath,
  getTopicClusters,
  type TopicCluster,
} from "@/data/topic-clusters";

interface TopicClusterSectionProps {
  title?: string;
  description?: string;
  limit?: number;
  clusters?: TopicCluster[];
  className?: string;
}

export function TopicClusterSection({
  title = "依主題規劃旅程",
  description = "把工具、目的地速查與攻略文章整理成完整路線，從需求出發更快找到下一步。",
  limit,
  clusters,
  className = "",
}: TopicClusterSectionProps) {
  const visibleClusters = (clusters ?? getTopicClusters()).slice(0, limit);

  return (
    <section className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-900">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-brand-700 leading-relaxed">
            {description}
          </p>
        </div>
        <Link href="/topics" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
          查看全部 →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleClusters.map((cluster) => (
          <Link
            key={cluster.slug}
            href={getTopicClusterPath(cluster)}
            className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3">
              {cluster.primaryKeyword}
            </span>
            <h3 className="font-bold text-lg text-brand-900 mb-2">{cluster.shortTitle}</h3>
            <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
              {cluster.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              <span>{cluster.toolHrefs.length} 個工具</span>
              <span>·</span>
              <span>{cluster.articleSlugs.length} 篇攻略</span>
              <span>·</span>
              <span>{cluster.countryCodes.length} 個目的地</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

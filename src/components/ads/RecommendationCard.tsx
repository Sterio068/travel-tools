interface RecommendationCardProps {
  title: string;
  platform: string;
  href: string;
  label?: string;
  className?: string;
}

export function RecommendationCard({
  title,
  platform,
  href,
  label = "查看優惠",
  className = "",
}: RecommendationCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`block rounded-[8px] border border-accent-200 bg-[var(--color-surface-card)] p-5 transition-colors hover:border-accent-300 hover:bg-accent-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-brand-900">{title}</p>
          <p className="text-xs text-slate-500 mt-1">透過 {platform} 預訂</p>
        </div>
        <span className="inline-flex items-center px-4 py-2 rounded-[8px] bg-accent-500 text-slate-50 text-sm font-semibold hover:bg-accent-600 transition-colors">
          {label} →
        </span>
      </div>
    </a>
  );
}

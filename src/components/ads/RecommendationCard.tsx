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
      className={`block bg-white rounded-[16px] p-5 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow border border-accent-200 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-brand-900">{title}</p>
          <p className="text-xs text-slate-500 mt-1">透過 {platform} 預訂</p>
        </div>
        <span className="inline-flex items-center px-4 py-2 rounded-[12px] bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors">
          {label} →
        </span>
      </div>
    </a>
  );
}

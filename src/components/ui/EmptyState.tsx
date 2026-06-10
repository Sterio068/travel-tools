import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex min-h-48 flex-col items-center justify-center rounded-[8px] border border-dashed border-slate-300 bg-surface px-5 py-8 text-center ${className}`}
    >
      {icon ? <div className="mb-3 text-brand-600">{icon}</div> : null}
      <h2 className="text-lg font-extrabold text-slate-950">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}


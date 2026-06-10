import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-500">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold text-brand-900 md:text-3xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-700 md:text-base">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

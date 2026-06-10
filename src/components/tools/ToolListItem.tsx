import Link from "next/link";
import type { ToolInfo } from "@/types";

interface ToolListItemProps {
  tool: ToolInfo;
  className?: string;
  density?: "compact" | "comfortable";
  showArrow?: boolean;
}

export function ToolListItem({
  tool,
  className = "",
  density = "comfortable",
  showArrow = true,
}: ToolListItemProps) {
  const densityClass = density === "compact" ? "p-3" : "p-4";

  return (
    <Link
      href={tool.href}
      className={`group flex items-start gap-3 rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] ${densityClass} transition-colors hover:border-brand-300 hover:bg-brand-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${className}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-brand-50 text-2xl">
        {tool.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-brand-900">{tool.name}</span>
        <span className="mt-1 block text-sm leading-relaxed text-slate-500">
          {tool.description}
        </span>
      </span>
      {showArrow && (
        <span
          className="mt-1 text-brand-300 transition-colors group-hover:text-brand-600"
          aria-hidden="true"
        >
          →
        </span>
      )}
    </Link>
  );
}

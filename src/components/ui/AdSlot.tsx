import type { ReactNode } from "react";

interface AdSlotProps {
  label?: string;
  minHeight?: number;
  className?: string;
  children?: ReactNode;
}

export function AdSlot({
  label = "廣告",
  minHeight = 280,
  className = "",
  children,
}: AdSlotProps) {
  return (
    <div
      className={`flex w-full items-center justify-center overflow-hidden rounded-[8px] border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-400 ${className}`}
      style={{ minHeight }}
      aria-label={label}
    >
      {children ?? <span>{label}</span>}
    </div>
  );
}

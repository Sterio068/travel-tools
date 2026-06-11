import Link from "next/link";
import { TOOLS } from "@/data/constants";

interface Props {
  currentHref: string;
  relatedHrefs?: string[];
}

/** 每個工具的相關工具預設配置 */
const RELATED_MAP: Record<string, string[]> = {
  "/tools/currency": ["/tools/best-exchange", "/tools/budget", "/tools/tax-refund"],
  "/tools/best-exchange": ["/tools/currency", "/tools/budget", "/tools/expense-tracker"],
  "/tools/budget": ["/tools/currency", "/tools/expense-tracker", "/tools/flight-time"],
  "/tools/expense-tracker": ["/tools/budget", "/tools/currency", "/tools/best-exchange"],
  "/tools/timezone": ["/tools/flight-time", "/countries"],
  "/tools/baggage": ["/tools/power-bank", "/tools/packing-list", "/tools/customs"],
  "/tools/packing-list": ["/tools/baggage", "/tools/power-bank", "/tools/customs"],
  "/tools/power-bank": ["/tools/baggage", "/tools/packing-list"],
  "/tools/customs": ["/tools/baggage", "/tools/packing-list", "/tools/tax-refund"],
  "/tools/plug-voltage": ["/tools/esim", "/tools/power-bank", "/tools/baggage"],
  "/tools/visa": ["/countries", "/tools/flight-time", "/tools/travel-insurance"],
  "/tools/esim": ["/tools/plug-voltage", "/tools/power-bank", "/tools/budget"],
  "/tools/flight-time": ["/tools/timezone", "/tools/visa", "/tools/budget"],
  "/tools/tax-refund": ["/tools/currency", "/tools/budget"],
  "/tools/tip": ["/tools/currency", "/tools/budget"],
  "/tools/travel-insurance": ["/tools/visa", "/tools/baggage"],
  "/countries": ["/tools/visa", "/tools/timezone", "/tools/currency"],
};

export function RelatedTools({ currentHref, relatedHrefs }: Props) {
  const hrefs = relatedHrefs ?? RELATED_MAP[currentHref] ?? [];
  const tools = hrefs
    .map((href) => TOOLS.find((t) => t.href === href))
    .filter(Boolean) as typeof TOOLS;

  if (tools.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-brand-900 mb-4">相關工具</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex items-start gap-3 rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <span className="text-2xl shrink-0">{tool.icon}</span>
            <div className="min-w-0">
              <div className="font-semibold text-brand-900 text-sm">{tool.name}</div>
              <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{tool.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

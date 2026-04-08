import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TOOLS } from "@/data/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "旅遊實用工具",
  description: "匯率換算、時差查詢、行李規定速查、旅遊預算計算、插頭電壓查詢、打包清單產生器⋯⋯台灣旅客出國前必用的免費工具。",
  keywords: ["旅遊工具", "出國工具", "匯率換算", "行李規定", "時差查詢"],
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "實用工具" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-2">旅遊實用工具</h1>
      <p className="text-brand-700 mb-8">出國前用得到的免費工具，點擊立即使用</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-white rounded-[16px] p-6 shadow-[0_1px_3px_rgba(8,51,68,0.06)] hover:shadow-[0_10px_25px_rgba(8,51,68,0.1)] transition-shadow"
          >
            <span className="text-3xl mb-3 block">{tool.icon}</span>
            <h2 className="text-lg font-bold text-brand-900 mb-1">{tool.name}</h2>
            <p className="text-sm text-slate-500">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

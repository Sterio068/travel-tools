import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ToolListItem } from "@/components/tools/ToolListItem";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TOOL_GROUPS, getToolByHref, getToolsByHrefs } from "@/data/tool-groups";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "旅遊實用工具",
  description: "匯率換算、時差查詢、行李規定速查、旅遊預算計算、插頭電壓查詢、打包清單產生器⋯⋯台灣旅客出國前必用的免費工具。",
  keywords: ["旅遊工具", "出國工具", "匯率換算", "行李規定", "時差查詢"],
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "實用工具" }]} />

      <header className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-500">
            Tool Library
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-brand-900 md:text-4xl">
            依照出國任務找工具
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-brand-700">
            工具已依行前流程整理：先估金額、確認入境、整理行李，再處理時差與飛行時間。
          </p>
        </div>
        <nav
          className="grid grid-cols-2 gap-2 rounded-[8px] border border-brand-100 bg-brand-50/50 p-2"
          aria-label="工具分類"
        >
          {TOOL_GROUPS.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-[8px] bg-[var(--color-surface-card)] px-3 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {group.step} {group.shortTitle}
            </a>
          ))}
        </nav>
      </header>

      <div className="space-y-10">
        {TOOL_GROUPS.map((group) => {
          const primaryTool = getToolByHref(group.primaryHref);
          const tools = getToolsByHrefs(group.hrefs.filter((href) => href !== group.primaryHref));

          if (!primaryTool) return null;

          return (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <SectionHeader
                eyebrow={group.step}
                title={group.title}
                description={group.summary}
              />
              <div className="grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]">
                <ToolListItem
                  tool={primaryTool}
                  className="h-fit border-brand-200 bg-brand-50/60"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {tools.map((tool) => (
                    <ToolListItem key={tool.href} tool={tool} density="compact" />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-12 rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-brand-900">還不知道該從哪裡開始？</h2>
            <p className="mt-1 text-sm leading-relaxed text-brand-700">
              從主題攻略進入，系統會把工具、目的地和文章排成完整準備路線。
            </p>
          </div>
          <Link
            href="/topics"
            className="inline-flex items-center justify-center rounded-[8px] bg-brand-500 px-5 py-2.5 text-sm font-semibold text-slate-50 transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            查看主題攻略
          </Link>
        </div>
      </section>
    </div>
  );
}

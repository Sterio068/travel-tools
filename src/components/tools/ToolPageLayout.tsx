import type { ReactNode } from "react";
import Link from "next/link";
import { AdBanner } from "@/components/ads/AdBanner";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolInteractionTracker } from "@/components/tools/ToolInteractionTracker";
import { TOOL_FAQS } from "@/data/tool-faqs";
import { getToolsByHrefs, TOOL_GROUPS } from "@/data/tool-groups";
import type { ToolPageContent } from "@/data/tool-page-content";
import { howToSchema, webApplicationSchema } from "@/lib/seo";

interface ToolPageLayoutProps {
  content: ToolPageContent;
  children: ReactNode;
}

export function ToolPageLayout({ content, children }: ToolPageLayoutProps) {
  const group = TOOL_GROUPS.find((item) => item.id === content.groupId);
  const groupTools = group
    ? getToolsByHrefs(group.hrefs)
        .filter((tool) => tool.href !== content.href)
        .slice(0, 4)
    : [];
  const faqs = TOOL_FAQS[content.faqKey] ?? [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <JsonLd
        data={webApplicationSchema({
          name: content.title,
          description: content.schemaDescription,
          path: content.href,
          featureList: content.steps.map((step) => step.name),
          dateModified: content.updatedAt,
        })}
      />
      <JsonLd
        data={howToSchema({
          name: `${content.title}使用流程`,
          description: content.schemaDescription,
          steps: content.steps,
        })}
      />
      <ToolInteractionTracker
        toolId={content.slug}
        toolName={content.title}
        toolGroup={content.groupId}
      />

      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "實用工具", href: "/tools" },
          { label: content.title },
        ]}
      />

      <header className="grid gap-6 border-b border-brand-100 pb-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
        <div>
          <div className="text-sm font-semibold text-brand-600">
            {content.eyebrow}
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-brand-900 sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {content.description}
          </p>
        </div>
        <aside className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            使用重點
          </div>
          <div className="mt-3 text-lg font-semibold text-brand-900">
            {content.primaryAction}
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">工具分類</dt>
              <dd className="font-medium text-brand-800">
                {group?.shortTitle ?? content.eyebrow}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">內容更新</dt>
              <dd className="font-medium text-brand-800">{content.updatedAt}</dd>
            </div>
          </dl>
        </aside>
      </header>

      <main className="mt-8">
        <section
          id="tool"
          data-tool-id={content.slug}
          data-tool-interactive
          aria-labelledby={`${content.slug}-tool-title`}
          className="overflow-hidden rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] shadow-sm"
        >
          <div className="border-b border-brand-100 bg-brand-50/45 px-4 py-4 sm:px-5">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-600">
              Interactive tool
            </div>
            <h2
              id={`${content.slug}-tool-title`}
              className="mt-1 text-xl font-bold text-brand-900"
            >
              開始使用
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {content.primaryAction}，結果會在本頁即時顯示。
            </p>
          </div>
          <div className="p-4 sm:p-5">{children}</div>
        </section>

        <AdBanner slot="tool-result" format="horizontal" className="mt-8" />

        <section className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5">
            <h2 className="text-2xl font-bold text-brand-900">
              {content.answerTitle}
            </h2>
            <p className="mt-3 leading-7 text-slate-700">{content.answer}</p>

            <h3 className="mt-7 text-lg font-bold text-brand-900">使用流程</h3>
            <ol className="mt-4 grid gap-4">
              {content.steps.map((step, index) => (
                <li key={step.name} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-brand-900">
                      {step.name}
                    </div>
                    <p className="mt-1 leading-6 text-slate-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <aside className="grid gap-5 content-start">
            <section className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5">
              <h2 className="text-lg font-bold text-brand-900">
                使用前先知道
              </h2>
              <ul className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
                {content.checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-5">
              <h2 className="text-lg font-bold text-brand-900">
                資料來源與限制
              </h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                {content.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                本工具提供旅行規劃參考；簽證、海關、保險與航空公司規定仍以官方或服務提供者最新公告為準。
              </p>
            </section>
          </aside>
        </section>

        {groupTools.length > 0 && group ? (
          <section className="mt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-brand-600">
                  同一階段
                </div>
                <h2 className="text-2xl font-bold text-brand-900">
                  {group.title}
                </h2>
              </div>
              <Link
                href="/tools"
                className="text-sm font-semibold text-brand-700 hover:text-brand-900"
              >
                查看全部工具
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {groupTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-[8px] border border-brand-100 bg-[var(--color-surface-card)] p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  <div className="text-2xl" aria-hidden="true">
                    {tool.icon}
                  </div>
                  <div className="mt-3 font-semibold text-brand-900">
                    {tool.name}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <FaqSection title={`${content.title}常見問題`} faqs={faqs} />
        <RelatedTools currentHref={content.href} />
        <AdBanner slot="tool-bottom" format="horizontal" className="mt-10" />
      </main>
    </div>
  );
}

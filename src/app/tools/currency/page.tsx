import type { Metadata } from "next";
import CurrencyConverter from "@/components/tools/CurrencyConverter";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT.currency;

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function CurrencyPage() {
  return (
    <ToolPageLayout content={content}>
      <CurrencyConverter />
    </ToolPageLayout>
  );
}

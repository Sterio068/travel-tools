import type { Metadata } from "next";
import TipCalculator from "@/components/tools/TipCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT.tip;

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function TipPage() {
  return (
    <ToolPageLayout content={content}>
      <TipCalculator />
    </ToolPageLayout>
  );
}

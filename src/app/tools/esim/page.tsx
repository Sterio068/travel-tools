import type { Metadata } from "next";
import EsimComparisonTool from "@/components/tools/EsimComparisonTool";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT.esim;

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function EsimPage() {
  return (
    <ToolPageLayout content={content}>
      <EsimComparisonTool />
    </ToolPageLayout>
  );
}

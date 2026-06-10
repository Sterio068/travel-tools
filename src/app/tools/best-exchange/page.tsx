import type { Metadata } from "next";
import BestExchangeCalculator from "@/components/tools/BestExchangeCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT["best-exchange"];

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function BestExchangePage() {
  return (
    <ToolPageLayout content={content}>
      <BestExchangeCalculator />
    </ToolPageLayout>
  );
}

import type { Metadata } from "next";
import TaxRefundCalculator from "@/components/tools/TaxRefundCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT["tax-refund"];

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function TaxRefundPage() {
  return (
    <ToolPageLayout content={content}>
      <TaxRefundCalculator />
    </ToolPageLayout>
  );
}

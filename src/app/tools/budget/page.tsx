import type { Metadata } from "next";
import BudgetCalculator from "@/components/tools/BudgetCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT.budget;

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function BudgetPage() {
  return (
    <ToolPageLayout content={content}>
      <BudgetCalculator />
    </ToolPageLayout>
  );
}

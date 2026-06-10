import type { Metadata } from "next";
import ExpenseTracker from "@/components/tools/ExpenseTracker";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT["expense-tracker"];

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function ExpenseTrackerPage() {
  return (
    <ToolPageLayout content={content}>
      <ExpenseTracker />
    </ToolPageLayout>
  );
}

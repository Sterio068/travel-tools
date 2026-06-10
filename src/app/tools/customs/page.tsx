import type { Metadata } from "next";
import CustomsChecker from "@/components/tools/CustomsChecker";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT.customs;

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function CustomsPage() {
  return (
    <ToolPageLayout content={content}>
      <CustomsChecker />
    </ToolPageLayout>
  );
}

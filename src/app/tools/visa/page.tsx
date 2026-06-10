import type { Metadata } from "next";
import VisaChecker from "@/components/tools/VisaChecker";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT.visa;

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function VisaPage() {
  return (
    <ToolPageLayout content={content}>
      <VisaChecker />
    </ToolPageLayout>
  );
}

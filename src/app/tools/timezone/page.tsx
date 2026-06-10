import type { Metadata } from "next";
import TimezoneChecker from "@/components/tools/TimezoneChecker";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT.timezone;

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function TimezonePage() {
  return (
    <ToolPageLayout content={content}>
      <TimezoneChecker />
    </ToolPageLayout>
  );
}

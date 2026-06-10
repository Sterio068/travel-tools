import type { Metadata } from "next";
import BaggageChecker from "@/components/tools/BaggageChecker";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT.baggage;

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function BaggagePage() {
  return (
    <ToolPageLayout content={content}>
      <BaggageChecker />
    </ToolPageLayout>
  );
}

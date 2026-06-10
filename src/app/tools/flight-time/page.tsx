import type { Metadata } from "next";
import FlightTimeChecker from "@/components/tools/FlightTimeChecker";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT["flight-time"];

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function FlightTimePage() {
  return (
    <ToolPageLayout content={content}>
      <FlightTimeChecker />
    </ToolPageLayout>
  );
}

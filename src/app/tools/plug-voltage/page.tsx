import type { Metadata } from "next";
import PlugVoltageChecker from "@/components/tools/PlugVoltageChecker";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT["plug-voltage"];

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function PlugVoltagePage() {
  return (
    <ToolPageLayout content={content}>
      <PlugVoltageChecker />
    </ToolPageLayout>
  );
}

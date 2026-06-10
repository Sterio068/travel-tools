import type { Metadata } from "next";
import PowerBankChecker from "@/components/tools/PowerBankChecker";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT["power-bank"];

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function PowerBankPage() {
  return (
    <ToolPageLayout content={content}>
      <PowerBankChecker />
    </ToolPageLayout>
  );
}

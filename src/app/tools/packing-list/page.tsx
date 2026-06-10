import type { Metadata } from "next";
import PackingListGenerator from "@/components/tools/PackingListGenerator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT["packing-list"];

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function PackingListPage() {
  return (
    <ToolPageLayout content={content}>
      <PackingListGenerator />
    </ToolPageLayout>
  );
}

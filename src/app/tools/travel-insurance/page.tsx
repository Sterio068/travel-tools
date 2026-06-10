import type { Metadata } from "next";
import TravelInsuranceGuide from "@/components/tools/TravelInsuranceGuide";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { buildPageMetadata } from "@/lib/seo";

const content = TOOL_PAGE_CONTENT["travel-insurance"];

export const metadata: Metadata = buildPageMetadata(content.metadata);

export default function TravelInsurancePage() {
  return (
    <ToolPageLayout content={content}>
      <TravelInsuranceGuide />
    </ToolPageLayout>
  );
}

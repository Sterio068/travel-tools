export const siteKitContract = {
  version: 1,
  updatedAt: "2026-06-11",
  scope: "portfolio-content-sites",
  canonicalSources: {
    seoBuilder: {
      repo: "skill-exam-hub",
      path: "src/lib/seo.ts",
      status: "single-source-reference",
    },
    uiApi: {
      repo: "travel-tools",
      path: "src/components/ui",
      status: "api-canonical-style-local",
    },
  },
  primitives: {
    Button: "api-aligned-style-local",
    Card: "api-aligned-style-local",
    Input: "api-aligned-style-local",
    Select: "api-aligned-style-local",
    Tag: "api-aligned-style-local",
    SectionHeader: "api-aligned-style-local",
    EmptyState: "exact-shared",
    ErrorCard: "exact-shared",
    Breadcrumb: "exact-shared",
    AdSlot: "exact-shared",
  },
  adoptionRule:
    "Keep component props compatible across travel-tools, taiwan-labor-tools, and pet-care-platform. Preserve site-local brand tokens until a shared package exists.",
} as const;

export type SiteKitPrimitive = keyof typeof siteKitContract.primitives;

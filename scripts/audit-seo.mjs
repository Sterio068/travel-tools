import { existsSync, readFileSync } from "node:fs";

const checks = [];

function record(level, label, message = "") {
  checks.push({ level, label, message });
}

function pass(label) {
  record("PASS", label);
}

function fail(label, message) {
  record("FAIL", label, message);
}

function read(path) {
  if (!existsSync(path)) {
    fail("Missing file", path);
    return "";
  }
  return readFileSync(path, "utf8");
}

const seo = read("src/lib/seo.ts");
const sitemap = read("src/app/sitemap.ts");
const robots = read("src/app/robots.ts");
const sourcesPage = read("src/app/sources/page.tsx");
const toolContent = read("src/data/tool-page-content.ts");
const articlesPage = read("src/app/articles/[slug]/page.tsx");

if (
  seo.includes("mainEntityOfPage") &&
  seo.includes("isAccessibleForFree") &&
  seo.includes("image:")
) {
  pass("Article schema includes rich-result authority fields");
} else {
  fail("Article schema authority fields", "Expected mainEntityOfPage, image, and isAccessibleForFree in src/lib/seo.ts");
}

if (seo.includes("SearchAction") && seo.includes("Organization") && seo.includes("WebSite")) {
  pass("Sitewide Organization and WebSite schema helpers exist");
} else {
  fail("Sitewide schema helpers", "Expected Organization, WebSite, and SearchAction schema helpers");
}

if (!sitemap.includes("new Date().toISOString()") && sitemap.includes("SITE_LASTMOD")) {
  pass("Sitemap uses stable content lastmod instead of build time");
} else {
  fail("Sitemap freshness", "Avoid marking every page fresh on every build");
}

if (robots.includes("sitemap:") || robots.includes("sitemap")) {
  pass("Robots exposes sitemap");
} else {
  fail("Robots sitemap", "robots.ts should point at sitemap.xml");
}

for (const route of ["about", "contact", "editorial-policy", "sources", "faq", "privacy", "terms"]) {
  if (existsSync(`src/app/${route}/page.tsx`)) {
    pass(`Trust page exists: /${route}`);
  } else {
    fail("Missing trust page", `/${route}`);
  }
}

if (sourcesPage.includes("TOOL_PAGE_CONTENT") && sourcesPage.includes("資料來源")) {
  pass("Sources page aggregates tool source signals");
} else {
  fail("Sources page", "Expected /sources to explain tool data provenance");
}

const sourceBlocks = [...toolContent.matchAll(/sources:\s*\[([\s\S]*?)\]/g)];
const emptySourceBlocks = sourceBlocks.filter((match) => !/"[^"]+"/.test(match[1]));
if (sourceBlocks.length > 0 && emptySourceBlocks.length === 0) {
  pass(`Tool pages expose source notes (${sourceBlocks.length})`);
} else {
  fail("Tool source notes", "Every tool content block should include at least one source note");
}

if (articlesPage.includes("更新") && articlesPage.includes("article.updatedAt")) {
  pass("Article pages expose freshness when updatedAt exists");
} else {
  fail("Article freshness display", "Article page should show updatedAt when present");
}

for (const check of checks) {
  const detail = check.message ? ` - ${check.message}` : "";
  console.log(`${check.level} ${check.label}${detail}`);
}

if (checks.some((check) => check.level === "FAIL")) {
  process.exitCode = 1;
}

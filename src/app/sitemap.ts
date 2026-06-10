import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { TOOLS } from "@/data/constants";
import { COUNTRIES } from "@/data/countries";
import { TOOL_PAGE_CONTENT } from "@/data/tool-page-content";
import { TOPIC_CLUSTERS } from "@/data/topic-clusters";
import { SITE_URL } from "@/lib/env";

const SITE_LASTMOD = "2026-05-27";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: SITE_LASTMOD, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tools`, lastModified: SITE_LASTMOD, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/countries`, lastModified: SITE_LASTMOD, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/articles`, lastModified: SITE_LASTMOD, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/topics`, lastModified: SITE_LASTMOD, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/about`, lastModified: SITE_LASTMOD, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: SITE_LASTMOD, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/editorial-policy`, lastModified: SITE_LASTMOD, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/sources`, lastModified: SITE_LASTMOD, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/faq`, lastModified: SITE_LASTMOD, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: SITE_LASTMOD, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/terms`, lastModified: SITE_LASTMOD, changeFrequency: "yearly", priority: 0.1 },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS
    .filter((t) => t.href !== "/countries")
    .map((tool) => ({
      url: `${SITE_URL}${tool.href}`,
      lastModified:
        Object.values(TOOL_PAGE_CONTENT).find((content) => content.href === tool.href)
          ?.updatedAt ?? SITE_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const countryPages: MetadataRoute.Sitemap = COUNTRIES.map((c) => ({
    url: `${SITE_URL}/countries/${c.code.toLowerCase()}`,
    lastModified: SITE_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const topicPages: MetadataRoute.Sitemap = TOPIC_CLUSTERS.map((cluster) => ({
    url: `${SITE_URL}/topics/${cluster.slug}`,
    lastModified: SITE_LASTMOD,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...toolPages, ...countryPages, ...articlePages, ...topicPages];
}

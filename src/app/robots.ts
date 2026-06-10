import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

const AI_CRAWLER_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "Applebot-Extended",
  "Google-Extended",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

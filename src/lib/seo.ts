import type { Metadata } from "next";
import { SITE_URL } from "@/lib/env";

export { SITE_URL };
export const SITE_NAME = "旅遊實用工具站";

export interface PageMetaInput {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
}

export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "zh_TW",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function webApplicationSchema(tool: {
  name: string;
  description: string;
  path: string;
  featureList?: string[];
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}${tool.path}`,
    applicationCategory: "TravelApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TWD",
    },
    inLanguage: "zh-TW",
    featureList: tool.featureList,
    dateModified: tool.dateModified,
    mainEntityOfPage: `${SITE_URL}${tool.path}`,
  };
}

export function breadcrumbSchema(
  items: Array<{ label: string; href?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: "台灣旅客的免費出國實用工具與旅遊資訊",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "zh-TW",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export interface HowToStep {
  name: string;
  text: string;
}

export function howToSchema(input: {
  name: string;
  description: string;
  steps: HowToStep[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  const url = `${SITE_URL}${article.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: article.image || `${SITE_URL}/opengraph-image`,
    inLanguage: "zh-TW",
    isAccessibleForFree: true,
  };
}

export function topicClusterSchema(input: {
  title: string;
  description: string;
  path: string;
  itemUrls: string[];
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.title,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    inLanguage: "zh-TW",
    keywords: input.keywords,
    about: input.keywords?.map((keyword) => ({
      "@type": "Thing",
      name: keyword,
    })),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.itemUrls.map((url, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${url}`,
      })),
    },
  };
}

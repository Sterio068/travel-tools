"use client";

export type AnalyticsParamValue = string | number | boolean | undefined | null;
export type AnalyticsParams = Record<string, AnalyticsParamValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export interface NavigationEventClassification {
  eventName: string;
  contentType: string;
  contentGroup: string;
}

function cleanAnalyticsParams(params: AnalyticsParams): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [
        key,
        typeof value === "string" ? value.slice(0, 100) : value,
      ]),
  ) as Record<string, string | number | boolean>;
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || !eventName.trim()) {
    return;
  }

  const payload = cleanAnalyticsParams(params);
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
    return;
  }

  window.dataLayer.push({ event: eventName, ...payload });
}

export function classifyInternalNavigation(pathname: string): NavigationEventClassification | undefined {
  if (/^\/tools\/[^/]+/.test(pathname)) {
    return { eventName: "tool_selected", contentType: "tool", contentGroup: "tools" };
  }

  if (pathname === "/tools") {
    return { eventName: "tool_directory_selected", contentType: "directory", contentGroup: "tools" };
  }

  if (/^\/articles\/[^/]+/.test(pathname)) {
    return { eventName: "article_selected", contentType: "article", contentGroup: "articles" };
  }

  if (pathname === "/articles") {
    return { eventName: "article_directory_selected", contentType: "directory", contentGroup: "articles" };
  }

  if (/^\/countries\/[^/]+/.test(pathname)) {
    return { eventName: "country_selected", contentType: "country", contentGroup: "countries" };
  }

  if (pathname === "/countries") {
    return { eventName: "country_directory_selected", contentType: "directory", contentGroup: "countries" };
  }

  if (/^\/topics\/[^/]+/.test(pathname)) {
    return { eventName: "topic_selected", contentType: "topic", contentGroup: "topics" };
  }

  if (pathname === "/topics") {
    return { eventName: "topic_directory_selected", contentType: "directory", contentGroup: "topics" };
  }

  return undefined;
}

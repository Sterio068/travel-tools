"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { classifyInternalNavigation, trackEvent } from "@/lib/analytics";

function getLinkText(anchor: HTMLAnchorElement): string {
  const visibleText = anchor.innerText.replace(/\s+/g, " ").trim();
  return visibleText || anchor.getAttribute("aria-label") || anchor.href;
}

function getLinkLocation(anchor: HTMLAnchorElement): string {
  if (anchor.closest("[data-analytics-location]")) {
    return anchor.closest("[data-analytics-location]")?.getAttribute("data-analytics-location") || "content";
  }
  if (anchor.closest("header")) return "header";
  if (anchor.closest("footer")) return "footer";
  if (anchor.closest("nav")) return "nav";
  if (anchor.closest("main")) return "main";
  return "content";
}

export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const anchor = event.target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) {
        return;
      }

      const linkText = getLinkText(anchor);
      const linkLocation = getLinkLocation(anchor);

      if (rawHref.startsWith("mailto:")) {
        trackEvent("contact_clicked", {
          method: "email",
          link_text: linkText,
          link_location: linkLocation,
        });
        return;
      }

      if (rawHref.startsWith("tel:")) {
        trackEvent("contact_clicked", {
          method: "phone",
          link_text: linkText,
          link_location: linkLocation,
        });
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) {
        trackEvent("external_link_clicked", {
          link_text: linkText,
          link_url: url.href,
          link_location: linkLocation,
        });
        return;
      }

      if (url.pathname === pathname) {
        return;
      }

      const classification = classifyInternalNavigation(url.pathname);
      if (!classification) {
        return;
      }

      trackEvent(classification.eventName, {
        content_type: classification.contentType,
        content_group: classification.contentGroup,
        link_text: linkText,
        link_url: url.href,
        destination_path: url.pathname,
        link_location: linkLocation,
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}

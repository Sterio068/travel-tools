"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT_ID, resolveAdSenseSlot } from "@/lib/env";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "square" | "vertical" | "auto";
  className?: string;
}

export function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  const resolvedSlot = resolveAdSenseSlot(slot);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !resolvedSlot) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Unable to render AdSense unit.", error);
      }
    }
  }, [resolvedSlot]);

  if (!ADSENSE_CLIENT_ID || !resolvedSlot) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={`my-6 p-4 rounded-[12px] border-2 border-dashed border-brand-200 bg-brand-50/30 text-center text-xs text-slate-400 ${className}`}
          aria-label="廣告位置"
        >
          [Ad · {format}]
        </div>
      );
    }
    return null;
  }

  const heights = {
    horizontal: "h-24 md:h-[90px]",
    square: "h-[250px]",
    vertical: "h-[600px]",
    auto: "min-h-[100px]",
  };

  return (
    <div className={`my-6 ${className}`} aria-label="廣告">
      <ins
        className={`adsbygoogle block ${heights[format]}`}
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={resolvedSlot}
        data-ad-format={format === "auto" ? "auto" : undefined}
        data-full-width-responsive="true"
      />
    </div>
  );
}

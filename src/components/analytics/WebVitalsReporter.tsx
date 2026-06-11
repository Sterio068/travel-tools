"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { trackWebVital } from "@/lib/analytics";

export function WebVitalsReporter() {
  const pathname = usePathname();
  const reportWebVital = useCallback<Parameters<typeof useReportWebVitals>[0]>(
    (metric) => {
      trackWebVital(metric, pathname || "/");
    },
    [pathname],
  );

  useReportWebVitals(reportWebVital);

  return null;
}

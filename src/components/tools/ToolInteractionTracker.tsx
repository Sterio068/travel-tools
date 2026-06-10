"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

interface ToolInteractionTrackerProps {
  toolId: string;
  toolName: string;
  toolGroup: string;
}

export function ToolInteractionTracker({
  toolId,
  toolName,
  toolGroup,
}: ToolInteractionTrackerProps) {
  const startedRef = useRef(false);
  const resultViewedRef = useRef(false);

  useEffect(() => {
    const baseParams = {
      tool_id: toolId,
      tool_name: toolName,
      tool_group: toolGroup,
      content_group: "tools",
      page_path: window.location.pathname,
    };

    trackEvent("tool_viewed", baseParams);

    const root = document.querySelector<HTMLElement>(
      `[data-tool-id="${toolId}"]`,
    );
    if (!root) {
      return;
    }

    const markInteraction = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const interactiveElement = target.closest(
        "button,input,select,textarea,[role='button']",
      );
      if (!interactiveElement) {
        return;
      }

      if (!startedRef.current) {
        startedRef.current = true;
        trackEvent("tool_started", {
          ...baseParams,
          interaction_type: event.type,
        });
      }

      if (resultViewedRef.current) {
        return;
      }

      window.setTimeout(() => {
        if (resultViewedRef.current) {
          return;
        }

        resultViewedRef.current = true;
        trackEvent("tool_result_viewed", {
          ...baseParams,
          interaction_type: event.type,
        });
      }, 600);
    };

    root.addEventListener("click", markInteraction, true);
    root.addEventListener("change", markInteraction, true);
    root.addEventListener("input", markInteraction, true);

    return () => {
      root.removeEventListener("click", markInteraction, true);
      root.removeEventListener("change", markInteraction, true);
      root.removeEventListener("input", markInteraction, true);
    };
  }, [toolGroup, toolId, toolName]);

  return null;
}

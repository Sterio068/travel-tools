import { afterEach, describe, expect, it, vi } from "vitest";
import { trackWebVital } from "./analytics";

describe("analytics web vitals", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends GA4 web_vital events with the required stable params", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", {
      dataLayer: [],
      gtag,
      location: { pathname: "/tools/currency", search: "?from=ad", hash: "#rate" },
    });

    trackWebVital({
      id: "v3-123",
      name: "LCP",
      value: 2468.44,
      rating: "needs-improvement",
    });

    expect(gtag).toHaveBeenCalledWith("event", "web_vital", {
      name: "LCP",
      value: 2468.44,
      rating: "needs-improvement",
      id: "v3-123",
      path: "/tools/currency",
    });
  });

  it("falls back to dataLayer when gtag is not ready", () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal("window", {
      dataLayer,
      location: { pathname: "/tools/tax-refund" },
    });

    trackWebVital(
      {
        id: "cls-1",
        name: "CLS",
        value: 0.08,
        rating: "good",
      },
      "/tools/tax-refund",
    );

    expect(dataLayer).toEqual([
      {
        event: "web_vital",
        name: "CLS",
        value: 0.08,
        rating: "good",
        id: "cls-1",
        path: "/tools/tax-refund",
      },
    ]);
  });

  it("ignores invalid metrics instead of sending noisy RUM events", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", {
      dataLayer: [],
      gtag,
      location: { pathname: "/tools" },
    });

    trackWebVital({ id: "bad", name: "", value: Number.NaN, rating: "poor" });

    expect(gtag).not.toHaveBeenCalled();
  });
});

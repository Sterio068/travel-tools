import { describe, expect, it } from "vitest";
import { calculateBudget } from "./budget";
import { convertCurrency, getExchangeRateToTWD } from "./currency";
import { generatePackingList } from "./packing";
import { calculateTaxRefund } from "./tax-refund";
import { convertTime, getTimezoneInfo } from "./timezone";
import { calculateTip } from "./tip";

describe("travel calculation helpers", () => {
  describe("calculateBudget", () => {
    it("estimates budget with a stable category breakdown", () => {
      const result = calculateBudget("JP", 3, 2, "budget");

      expect(result).toMatchObject({
        destination: "日本",
        days: 3,
        travelers: 2,
        style: "budget",
      });
      expect(result?.breakdown).toEqual({
        flights: 12000,
        accommodation: 5400,
        food: 5400,
        transport: 2700,
        activities: 1800,
        shopping: 900,
        insurance: 300,
        misc: 900,
      });
      expect(result?.totalTWD).toBe(29400);
      expect(result?.perPersonPerDay).toBe(4900);
    });

    it("returns null for unknown destinations and non-positive trip sizes", () => {
      expect(calculateBudget("XX", 3, 2, "budget")).toBeNull();
      expect(calculateBudget("JP", 0, 2, "budget")).toBeNull();
      expect(calculateBudget("JP", 3, 0, "budget")).toBeNull();
      expect(calculateBudget("JP", -1, 2, "budget")).toBeNull();
      expect(calculateBudget("JP", 3, -1, "budget")).toBeNull();
    });
  });

  describe("currency", () => {
    const rates = { JPY: 0.2, USD: 32 };

    it("converts between TWD and foreign currencies", () => {
      expect(convertCurrency(1000, "TWD", "JPY", rates).result).toBe(5000);
      expect(convertCurrency(100, "USD", "TWD", rates).result).toBe(3200);
      expect(convertCurrency(100, "USD", "JPY", rates).result).toBe(16000);
    });

    it("handles zero amounts and unknown currencies deterministically", () => {
      expect(convertCurrency(0, "TWD", "JPY", rates).result).toBe(0);
      expect(convertCurrency(100, "ABC", "TWD", rates).result).toBe(100);
      expect(getExchangeRateToTWD("USD", rates)).toBe(32);
      expect(getExchangeRateToTWD("ABC", rates)).toBe(1);
    });
  });

  describe("generatePackingList", () => {
    it("includes climate and duration specific items", () => {
      const tropicalLong = generatePackingList({
        climate: "tropical",
        duration: "long",
        days: 10,
      });

      expect(tropicalLong.some((item) => item.id === "hat-sun")).toBe(true);
      expect(tropicalLong.some((item) => item.id === "swimsuit")).toBe(true);
      expect(tropicalLong.some((item) => item.id === "neck-pillow")).toBe(true);
      expect(tropicalLong.some((item) => item.id === "winter-coat")).toBe(false);
      expect(tropicalLong.every((item) => item.checked === false)).toBe(true);
    });

    it("keeps cold-only items out of temperate short trips", () => {
      const temperateShort = generatePackingList({
        climate: "temperate",
        duration: "short",
        days: 3,
      });

      expect(temperateShort.some((item) => item.id === "jacket")).toBe(true);
      expect(temperateShort.some((item) => item.id === "winter-coat")).toBe(false);
      expect(temperateShort.some((item) => item.id === "neck-pillow")).toBe(false);
    });
  });

  describe("calculateTaxRefund", () => {
    it("calculates refunds when purchase amount reaches the minimum", () => {
      const result = calculateTaxRefund("JP", 12000);

      expect(result).toMatchObject({
        countryCode: "JP",
        refundAvailable: true,
        meetsMinimum: true,
        minPurchase: 5000,
        refundPercent: 10,
        estimatedRefund: 1200,
      });
    });

    it("returns zero refund below minimum or unavailable countries", () => {
      expect(calculateTaxRefund("JP", 4999)?.estimatedRefund).toBe(0);
      expect(calculateTaxRefund("HK", 10000)).toMatchObject({
        refundAvailable: false,
        meetsMinimum: false,
        estimatedRefund: 0,
      });
      expect(calculateTaxRefund("XX", 10000)).toBeNull();
    });
  });

  describe("timezone", () => {
    it("converts Taiwan time across day boundaries", () => {
      expect(convertTime(23, 30, "JP")).toEqual({
        localHour: 0,
        localMinute: 30,
        nextDay: true,
        prevDay: false,
      });
      expect(convertTime(0, 15, "US")).toEqual({
        localHour: 11,
        localMinute: 15,
        nextDay: false,
        prevDay: true,
      });
      expect(convertTime(8, 0, "XX")).toBeNull();
    });

    it("describes timezone differences from Taiwan", () => {
      expect(getTimezoneInfo("JP")).toMatchObject({
        countryCode: "JP",
        timeDiffFromTW: 1,
        description: "比台灣快 1 小時",
      });
      expect(getTimezoneInfo("SG")).toMatchObject({
        countryCode: "SG",
        timeDiffFromTW: 0,
        description: "與台灣相同時區",
      });
      expect(getTimezoneInfo("XX")).toBeNull();
    });
  });

  describe("calculateTip", () => {
    it("uses country default tipping culture", () => {
      expect(calculateTip("US", 100)?.tipAmount).toBe(20);
      expect(calculateTip("US", 100)?.totalWithTip).toBe(120);
      expect(calculateTip("JP", 1000)).toMatchObject({
        tippingCulture: "none",
        suggestedPercent: 0,
        tipAmount: 0,
        totalWithTip: 1000,
      });
    });

    it("allows a custom percent and returns null for unknown countries", () => {
      expect(calculateTip("TH", 1000, 12)).toMatchObject({
        suggestedPercent: 12,
        tipAmount: 120,
        totalWithTip: 1120,
      });
      expect(calculateTip("XX", 1000)).toBeNull();
    });
  });
});

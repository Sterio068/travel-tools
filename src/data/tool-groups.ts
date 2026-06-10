import { TOOLS } from "@/data/constants";
import type { ToolInfo } from "@/types";

export interface ToolGroup {
  id: string;
  step: string;
  title: string;
  shortTitle: string;
  summary: string;
  primaryHref: string;
  hrefs: string[];
}

export const QUICK_TASKS = [
  { label: "日幣匯率", href: "/tools/currency" },
  { label: "手提行李限制", href: "/tools/baggage" },
  { label: "台灣護照免簽", href: "/tools/visa" },
  { label: "日本插頭", href: "/tools/plug-voltage" },
  { label: "行動電源上飛機", href: "/tools/power-bank" },
  { label: "美國小費", href: "/tools/tip" },
] as const;

export const TOOL_GROUPS: ToolGroup[] = [
  {
    id: "money",
    step: "01",
    title: "先估金額",
    shortTitle: "金額",
    summary: "把匯率、預算、退稅、小費與旅途中記帳先整理好，避免到了當地才臨時換算。",
    primaryHref: "/tools/currency",
    hrefs: [
      "/tools/currency",
      "/tools/best-exchange",
      "/tools/budget",
      "/tools/expense-tracker",
      "/tools/tax-refund",
      "/tools/tip",
    ],
  },
  {
    id: "entry",
    step: "02",
    title: "確認入境",
    shortTitle: "入境",
    summary: "先看簽證、國家速查、海關規定與保險，降低登機前或入境時卡關的風險。",
    primaryHref: "/tools/visa",
    hrefs: ["/tools/visa", "/countries", "/tools/customs", "/tools/travel-insurance"],
  },
  {
    id: "packing",
    step: "03",
    title: "整理行李",
    shortTitle: "行李",
    summary: "行李限重、打包清單、行動電源與插頭電壓放在同一組，出發前逐項核對。",
    primaryHref: "/tools/baggage",
    hrefs: [
      "/tools/baggage",
      "/tools/packing-list",
      "/tools/power-bank",
      "/tools/plug-voltage",
    ],
  },
  {
    id: "timing",
    step: "04",
    title: "抓準時間",
    shortTitle: "時間",
    summary: "時差與飛行時間能協助安排抵達日、轉機、會合時間與返程節奏。",
    primaryHref: "/tools/timezone",
    hrefs: ["/tools/timezone", "/tools/flight-time"],
  },
];

export const FEATURED_HOME_HREFS = [
  "/tools/currency",
  "/tools/baggage",
  "/tools/visa",
  "/tools/budget",
] as const;

export function getToolByHref(href: string): ToolInfo | undefined {
  return TOOLS.find((tool) => tool.href === href);
}

export function getToolsByHrefs(hrefs: readonly string[]): ToolInfo[] {
  return hrefs
    .map((href) => getToolByHref(href))
    .filter((tool): tool is ToolInfo => Boolean(tool));
}

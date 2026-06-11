import { COUNTRIES } from "@/data/countries";
import { TOOLS } from "@/data/constants";
import type { ArticleCategory, ArticleMeta } from "@/types";

export interface ArticleToolRecommendation {
  href: string;
  name: string;
  description: string;
  icon: string;
  reason: string;
  cta: string;
}

const CATEGORY_TOOL_HREFS = {
  currency: ["/tools/currency", "/tools/best-exchange", "/tools/tax-refund"],
  visa: ["/tools/visa", "/countries", "/tools/travel-insurance"],
  packing: ["/tools/packing-list", "/tools/baggage", "/tools/power-bank"],
  transport: ["/tools/flight-time", "/tools/timezone", "/tools/budget"],
  insurance: ["/tools/travel-insurance", "/tools/visa", "/tools/budget"],
  budget: ["/tools/budget", "/tools/currency", "/tools/expense-tracker"],
  destination: ["/countries", "/tools/timezone", "/tools/plug-voltage"],
  tips: ["/tools/packing-list", "/tools/customs", "/tools/budget"],
  safety: ["/tools/travel-insurance", "/tools/visa", "/tools/baggage"],
  tech: ["/tools/esim", "/tools/plug-voltage", "/tools/power-bank"],
} satisfies Record<ArticleCategory, readonly string[]>;

const ARTICLE_TOOL_OVERRIDES: Partial<Record<string, readonly string[]>> = {
  "best-exchange-method": ["/tools/best-exchange", "/tools/currency", "/tools/budget"],
  "credit-card-overseas-tips": ["/tools/best-exchange", "/tools/currency", "/tools/expense-tracker"],
  "japan-tax-refund-guide": ["/tools/tax-refund", "/tools/currency", "/tools/budget"],
  "europe-tax-refund": ["/tools/tax-refund", "/tools/currency", "/tools/customs"],
  "cash-limit-entry": ["/tools/customs", "/tools/currency", "/tools/budget"],
  "taiwan-customs-rules": ["/tools/customs", "/tools/baggage", "/tools/tax-refund"],
  "power-bank-flight-rules": ["/tools/power-bank", "/tools/baggage", "/tools/packing-list"],
  "budget-airline-baggage-tips": ["/tools/baggage", "/tools/packing-list", "/tools/budget"],
  "visit-japan-web-guide": ["/tools/visa", "/tools/customs", "/tools/flight-time"],
  "korea-entry-requirements": ["/tools/visa", "/tools/flight-time", "/tools/customs"],
  "jr-pass-guide-2026": ["/tools/flight-time", "/tools/budget", "/tools/timezone"],
  "passport-lost-overseas": ["/tools/travel-insurance", "/tools/visa", "/countries"],
  "esim-vs-sim-card": ["/tools/esim", "/tools/plug-voltage", "/tools/power-bank"],
};

const TOOL_CTA_COPY: Record<string, { reason: string; cta: string }> = {
  "/tools/currency": {
    reason: "把文中的外幣金額換成台幣，出發前先抓現金與刷卡比例。",
    cta: "換算匯率",
  },
  "/tools/best-exchange": {
    reason: "比較銀行、機場、ATM 與刷卡成本，選出更適合的付款組合。",
    cta: "比較換匯",
  },
  "/tools/tax-refund": {
    reason: "輸入購物金額，先估是否達退稅門檻與可能拿回多少。",
    cta: "試算退稅",
  },
  "/tools/budget": {
    reason: "把目的地、天數與旅行風格轉成可檢查的旅費明細。",
    cta: "估算旅費",
  },
  "/tools/expense-tracker": {
    reason: "旅途中記錄每筆支出，避免現金與刷卡花費失控。",
    cta: "開始記帳",
  },
  "/tools/visa": {
    reason: "確認台灣護照簽證、免簽天數與入境前文件。",
    cta: "查簽證",
  },
  "/tools/customs": {
    reason: "回台或入境前先檢查現金、食品、藥品與免稅限制。",
    cta: "查海關",
  },
  "/tools/travel-insurance": {
    reason: "對照旅平險、不便險與信用卡保障，補齊出發前風險缺口。",
    cta: "檢查保險",
  },
  "/tools/esim": {
    reason: "依目的地、天數、用量與裝置條件比較 eSIM、實體 SIM 與 Wi-Fi 分享器。",
    cta: "比較上網方案",
  },
  "/tools/baggage": {
    reason: "依航空公司確認手提、託運尺寸與重量，減少現場加價。",
    cta: "查行李",
  },
  "/tools/packing-list": {
    reason: "把證件、電子用品、衣物與藥品整理成可勾選清單。",
    cta: "產生清單",
  },
  "/tools/power-bank": {
    reason: "用容量換算瓦時，確認行動電源能否帶上飛機。",
    cta: "檢查電池",
  },
  "/tools/flight-time": {
    reason: "先估飛行與轉機時間，讓抵達日行程不要排太滿。",
    cta: "查飛行時間",
  },
  "/tools/timezone": {
    reason: "對照目的地時間，安排抵達、通話與第一天行程。",
    cta: "查時差",
  },
  "/tools/plug-voltage": {
    reason: "確認插頭型式與電壓，避免轉接頭或充電器帶錯。",
    cta: "查插頭",
  },
  "/tools/tip": {
    reason: "用帳單金額估小費，避免在有小費文化的國家手忙腳亂。",
    cta: "算小費",
  },
  "/countries": {
    reason: "先看目的地簽證、匯率、時差、插頭與退稅摘要。",
    cta: "看國家速查",
  },
};

function uniqueHrefs(hrefs: readonly string[]) {
  return hrefs.filter((href, index) => hrefs.indexOf(href) === index);
}

function getCountryRecommendation(article: ArticleMeta): ArticleToolRecommendation | undefined {
  if (!article.country) return undefined;

  const country = COUNTRIES.find((item) => item.code === article.country);
  if (!country) return undefined;

  return {
    href: `/countries/${country.code.toLowerCase()}`,
    name: `${country.nameZh}旅遊速查`,
    description: `簽證、匯率、時差、插頭與退稅重點一次看。`,
    icon: country.flag,
    reason: `出發前先確認${country.nameZh}的入境與旅遊基本條件。`,
    cta: "查看目的地",
  };
}

function getToolRecommendation(href: string): ArticleToolRecommendation | undefined {
  const tool = TOOLS.find((item) => item.href === href);
  if (!tool) return undefined;

  const copy = TOOL_CTA_COPY[href] ?? {
    reason: tool.description,
    cta: "開啟工具",
  };

  return {
    href: tool.href,
    name: tool.name,
    description: tool.description,
    icon: tool.icon,
    reason: copy.reason,
    cta: copy.cta,
  };
}

export function getArticleToolRecommendations(
  article: ArticleMeta,
  limit = 3,
): ArticleToolRecommendation[] {
  const countryRecommendation = getCountryRecommendation(article);
  const candidateHrefs = uniqueHrefs([
    ...(ARTICLE_TOOL_OVERRIDES[article.slug] ?? []),
    ...CATEGORY_TOOL_HREFS[article.category],
  ]);

  const toolRecommendations = candidateHrefs
    .map((href) => getToolRecommendation(href))
    .filter((item): item is ArticleToolRecommendation => Boolean(item));

  return uniqueHrefs([
    ...(countryRecommendation ? [countryRecommendation.href] : []),
    ...toolRecommendations.map((item) => item.href),
  ])
    .map((href) =>
      href === countryRecommendation?.href
        ? countryRecommendation
        : toolRecommendations.find((item) => item.href === href),
    )
    .filter((item): item is ArticleToolRecommendation => Boolean(item))
    .slice(0, limit);
}

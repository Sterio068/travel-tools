const DEFAULT_SITE_URL = "https://example.com";

function cleanEnvValue(value: string | undefined): string | undefined {
  const cleaned = value?.trim();
  return cleaned && cleaned.length > 0 ? cleaned : undefined;
}

function normalizeSiteUrl(value: string | undefined): string {
  const cleaned = cleanEnvValue(value) || DEFAULT_SITE_URL;
  return cleaned.replace(/\/+$/, "");
}

function normalizeAdSenseClientId(value: string | undefined): string | undefined {
  const cleaned = cleanEnvValue(value);
  return cleaned && /^ca-pub-\d+$/.test(cleaned) ? cleaned : undefined;
}

function normalizeAdSlot(value: string | undefined): string | undefined {
  const cleaned = cleanEnvValue(value);
  return cleaned && /^\d+$/.test(cleaned) ? cleaned : undefined;
}

const AD_SLOT_ENV_BY_KEY: Record<string, string | undefined> = {
  "article-bottom": process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM,
  "country-btm": process.env.NEXT_PUBLIC_ADSENSE_SLOT_COUNTRY_BOTTOM,
  "country-mid": process.env.NEXT_PUBLIC_ADSENSE_SLOT_COUNTRY_MIDDLE,
  "tax-refund-bottom": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TAX_REFUND_BOTTOM,
  "tax-refund-top": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TAX_REFUND_TOP,
  "tip-bottom": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TIP_BOTTOM,
  "tip-top": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TIP_TOP,
  "tool-bottom": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM,
  "tool-result": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_RESULT,
  "visa-bottom": process.env.NEXT_PUBLIC_ADSENSE_SLOT_VISA_BOTTOM,
  "visa-top": process.env.NEXT_PUBLIC_ADSENSE_SLOT_VISA_TOP,
};

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const GOOGLE_ANALYTICS_ID = cleanEnvValue(process.env.NEXT_PUBLIC_GA_ID);
export const ADSENSE_CLIENT_ID = normalizeAdSenseClientId(
  process.env.NEXT_PUBLIC_ADSENSE_ID,
);

export function resolveAdSenseSlot(slot: string | undefined): string | undefined {
  if (!slot) {
    return undefined;
  }

  return normalizeAdSlot(AD_SLOT_ENV_BY_KEY[slot] || slot);
}

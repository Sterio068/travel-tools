import type { ArticleMeta, ArticleCategory } from "@/types";

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  currency: "匯率換匯",
  visa: "簽證入境",
  packing: "行李打包",
  transport: "交通",
  insurance: "旅遊保險",
  budget: "預算省錢",
  destination: "目的地攻略",
  tips: "旅遊技巧",
  safety: "安全須知",
  tech: "科技網路",
};

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  currency: "bg-gold-50 text-gold-600",
  visa: "bg-brand-100 text-brand-700",
  packing: "bg-accent-100 text-accent-700",
  transport: "bg-brand-100 text-brand-600",
  insurance: "bg-danger-50 text-danger-600",
  budget: "bg-gold-50 text-gold-600",
  destination: "bg-accent-50 text-accent-600",
  tips: "bg-brand-50 text-brand-600",
  safety: "bg-danger-50 text-danger-500",
  tech: "bg-slate-100 text-slate-700",
};

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "jpy-exchange-tips",
    title: "2026 日幣匯率走勢：什麼時候換最划算？",
    description: "分析日幣匯率趨勢，教你掌握最佳換匯時機，出發前不再糾結。",
    category: "currency",
    keywords: ["日幣匯率", "換日幣", "日幣走勢", "什麼時候換日幣"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
    country: "JP",
  },
  {
    slug: "japan-tax-refund-guide",
    title: "日本退稅完全指南：流程、門檻、注意事項",
    description: "2026 最新日本退稅攻略，一次搞懂免稅與退稅的差別、消費門檻和退稅流程。",
    category: "currency",
    keywords: ["日本退稅", "免稅", "Tax Free", "日本購物"],
    publishedAt: "2026-04-08",
    readingMinutes: 8,
    country: "JP",
  },
  {
    slug: "visit-japan-web-guide",
    title: "Visit Japan Web 2026 最新教學：圖文手把手填寫",
    description: "入境日本必填的 Visit Japan Web 完整教學，含截圖步驟說明。",
    category: "visa",
    keywords: ["Visit Japan Web", "入境日本", "日本入境", "VJW"],
    publishedAt: "2026-04-08",
    readingMinutes: 10,
    country: "JP",
  },
  {
    slug: "packing-checklist-ultimate",
    title: "出國行李打包終極清單：再也不怕忘東忘西",
    description: "最完整的出國打包清單，依類別整理，可勾選確認，適用各種旅行。",
    category: "packing",
    keywords: ["出國行李清單", "打包", "行李打包", "出國必帶"],
    publishedAt: "2026-04-08",
    readingMinutes: 6,
  },
  {
    slug: "budget-airline-baggage-tips",
    title: "廉航行李怎麼買最划算？虎航/酷航/樂桃比較",
    description: "比較各家廉航的行李加購方案，教你用最少錢帶最多行李。",
    category: "packing",
    keywords: ["廉航行李", "虎航行李", "酷航行李", "樂桃行李", "行李加購"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
  },
  {
    slug: "power-bank-flight-rules",
    title: "行動電源可以託運嗎？2026 飛機電池規定",
    description: "行動電源上飛機的完整規定，瓦時計算、容量限制、注意事項一次搞懂。",
    category: "packing",
    keywords: ["行動電源", "託運", "電池規定", "鋰電池", "瓦時"],
    publishedAt: "2026-04-08",
    readingMinutes: 6,
  },
  {
    slug: "taiwan-passport-visa-free",
    title: "台灣護照免簽國家完整清單 2026",
    description: "台灣護照可以免簽或落地簽前往的國家完整清單，含停留天數與注意事項。",
    category: "visa",
    keywords: ["免簽國家", "台灣護照", "免簽", "落地簽"],
    publishedAt: "2026-04-08",
    readingMinutes: 8,
  },
  {
    slug: "travel-insurance-guide",
    title: "旅平險怎麼選？5 分鐘搞懂旅遊保險",
    description: "旅平險、不便險、信用卡旅遊險差在哪？教你選對保險安心出發。",
    category: "insurance",
    keywords: ["旅平險", "旅遊保險", "不便險", "保險推薦"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
  },
  {
    slug: "japan-budget-breakdown",
    title: "日本自由行花多少？5天4夜預算完整拆解",
    description: "從機票、住宿到餐飲交通，一項項算給你看日本旅遊到底要花多少錢。",
    category: "budget",
    keywords: ["日本花費", "日本預算", "日本自由行", "東京花費"],
    publishedAt: "2026-04-08",
    readingMinutes: 8,
    country: "JP",
  },
  {
    slug: "korea-entry-requirements",
    title: "韓國入境規定 2026：K-ETA 還需要嗎？",
    description: "台灣人入境韓國的最新規定，K-ETA 取消後的入境流程完整說明。",
    category: "visa",
    keywords: ["韓國入境", "K-ETA", "韓國簽證", "韓國免簽"],
    publishedAt: "2026-04-08",
    readingMinutes: 6,
    country: "KR",
  },
  {
    slug: "plug-voltage-guide",
    title: "各國插頭電壓懶人包：一篇搞定轉接頭",
    description: "日本、韓國、歐洲、東南亞各國插頭類型與電壓整理，出國前必看。",
    category: "tips",
    keywords: ["各國插頭", "轉接頭", "電壓", "充電"],
    publishedAt: "2026-04-08",
    readingMinutes: 6,
  },
  {
    slug: "esim-vs-sim-card",
    title: "eSIM vs 實體 SIM 卡：出國上網怎麼選？",
    description: "eSIM 和實體 SIM 的優缺點比較，教你依目的地和需求選出最適合的上網方式。",
    category: "tech",
    keywords: ["eSIM", "出國上網", "SIM卡", "WiFi分享器"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
  },
  {
    slug: "best-exchange-method",
    title: "機場換匯 vs 銀行換匯 vs 線上換匯：哪個最划算？",
    description: "比較各種換匯管道的匯率和手續費，找出最省錢的換匯方式。",
    category: "currency",
    keywords: ["換匯", "哪裡換錢", "機場換匯", "銀行換匯"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
  },
  {
    slug: "tipping-guide-worldwide",
    title: "各國小費文化完整指南：該給多少？怎麼給？",
    description: "美國、日本、泰國、歐洲的小費文化與建議金額，避免尷尬。",
    category: "tips",
    keywords: ["小費", "小費怎麼給", "各國小費", "美國小費"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
  },
  {
    slug: "travel-inconvenience-insurance",
    title: "旅遊不便險理賠實戰：班機延誤怎麼申請？",
    description: "班機延誤、行李遺失的不便險理賠流程與注意事項。",
    category: "insurance",
    keywords: ["不便險", "班機延誤", "理賠", "行李遺失"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
  },
  {
    slug: "cash-limit-entry",
    title: "出國可以帶多少現金？各國入境現金限制",
    description: "台灣出境與各國入境的現金攜帶限制，超過要申報。",
    category: "safety",
    keywords: ["入境現金限制", "帶多少現金", "外幣限額", "申報"],
    publishedAt: "2026-04-08",
    readingMinutes: 6,
  },
  {
    slug: "jr-pass-guide-2026",
    title: "JR Pass 2026 最新攻略：值不值得買？",
    description: "JR Pass 全國版與地區版比較，教你計算是否划算、購買方式與使用技巧。",
    category: "transport",
    keywords: ["JR Pass", "日本交通", "新幹線", "日本鐵路"],
    publishedAt: "2026-04-08",
    readingMinutes: 9,
    country: "JP",
  },
  {
    slug: "bangkok-budget-breakdown",
    title: "曼谷自由行 5 天花多少？超詳細預算分享",
    description: "曼谷自由行的住宿、交通、餐飲、按摩等各項花費詳細拆解。",
    category: "budget",
    keywords: ["曼谷花費", "泰國預算", "曼谷自由行", "泰國花費"],
    publishedAt: "2026-04-08",
    readingMinutes: 8,
    country: "TH",
  },
  {
    slug: "europe-tax-refund",
    title: "歐洲退稅 3 步驟：Global Blue/Planet 教學",
    description: "歐洲退稅的完整流程，從購物到機場退稅，一步步教你拿回退稅金。",
    category: "currency",
    keywords: ["歐洲退稅", "Global Blue", "退稅流程"],
    publishedAt: "2026-04-08",
    readingMinutes: 8,
  },
  {
    slug: "taiwan-customs-rules",
    title: "回台灣可以帶什麼？海關規定完整整理",
    description: "入境台灣的免稅額度、禁止攜帶物品、需申報物品完整整理。",
    category: "safety",
    keywords: ["入境台灣", "海關規定", "免稅額度", "禁止攜帶"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
  },
  {
    slug: "tokyo-free-travel-guide",
    title: "東京自由行新手攻略：交通、住宿、行程規劃",
    description: "第一次去東京的完整攻略，從成田機場到市區、住宿區域選擇到行程安排。",
    category: "destination",
    keywords: ["東京自由行", "東京攻略", "東京景點", "東京交通"],
    publishedAt: "2026-04-08",
    readingMinutes: 10,
    country: "JP",
  },
  {
    slug: "seoul-free-travel-guide",
    title: "首爾自由行新手攻略：交通、住宿、必去景點",
    description: "首爾自由行完整攻略，弘大、明洞、景福宮，地鐵交通與住宿推薦。",
    category: "destination",
    keywords: ["首爾自由行", "首爾攻略", "韓國景點", "首爾交通"],
    publishedAt: "2026-04-08",
    readingMinutes: 9,
    country: "KR",
  },
  {
    slug: "passport-lost-overseas",
    title: "護照遺失怎麼辦？海外緊急補發完整流程",
    description: "在國外護照遺失或被偷的緊急處理步驟，從報案到補發入國證明書。",
    category: "safety",
    keywords: ["護照遺失", "緊急求助", "海外補發", "入國證明書"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
  },
  {
    slug: "credit-card-overseas-tips",
    title: "出國刷哪張卡最划算？海外信用卡回饋攻略",
    description: "海外消費信用卡回饋比較，DCC 陷阱提醒，教你刷卡省更多。",
    category: "budget",
    keywords: ["海外信用卡", "海外回饋", "DCC", "信用卡推薦"],
    publishedAt: "2026-04-08",
    readingMinutes: 7,
  },
];

export function getAllArticles(): ArticleMeta[] {
  return [...ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): ArticleMeta[] {
  return ARTICLES.filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  return ARTICLES
    .filter((a) => a.slug !== slug && a.category === current.category)
    .slice(0, limit);
}

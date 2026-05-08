import type { ArticleMeta, CountryInfo, ToolInfo } from "@/types";
import type { FaqItem } from "@/lib/seo";

export interface TopicCluster {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intent: string;
  primaryKeyword: string;
  keywords: string[];
  toolHrefs: string[];
  articleSlugs: string[];
  countryCodes: string[];
  faqs: FaqItem[];
}

export interface TopicClusterItems {
  tools: ToolInfo[];
  articles: ArticleMeta[];
  countries: CountryInfo[];
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    slug: "japan-travel-planning",
    title: "日本自由行出發前完整準備",
    shortTitle: "日本自由行",
    description:
      "從日幣匯率、Visit Japan Web、退稅、交通票券到免費景點，整理台灣旅客規劃日本自由行最常用的工具與攻略。",
    intent: "正在規劃日本自由行、需要一次確認預算、入境、購物退稅與行程細節的旅客。",
    primaryKeyword: "日本自由行準備",
    keywords: ["日本自由行", "日本旅遊準備", "Visit Japan Web", "日本退稅", "日幣匯率"],
    toolHrefs: ["/tools/currency", "/tools/budget", "/tools/tax-refund", "/tools/plug-voltage", "/tools/flight-time"],
    articleSlugs: [
      "jpy-exchange-tips",
      "visit-japan-web-guide",
      "japan-tax-refund-guide",
      "japan-budget-breakdown",
      "jr-pass-guide-2026",
      "tokyo-free-travel-guide",
    ],
    countryCodes: ["JP"],
    faqs: [
      {
        question: "第一次去日本自由行，出發前最先確認什麼？",
        answer:
          "建議先確認護照效期、Visit Japan Web、機票與住宿，再用預算、匯率、退稅與插頭電壓工具補齊旅途會用到的細節。",
      },
      {
        question: "日本旅遊需要先換日幣嗎？",
        answer:
          "建議保留少量現金支付交通儲值、街邊小店或緊急用途，其餘可依匯率與信用卡海外手續費比較後分批換匯。",
      },
    ],
  },
  {
    slug: "exchange-budget",
    title: "出國換匯與旅遊預算規劃",
    shortTitle: "換匯預算",
    description:
      "把匯率換算、換匯方式比較、旅遊預算與行程記帳放在同一條規劃路徑，適合想控制旅費與現金配置的旅客。",
    intent: "需要估算總旅費、比較換匯方式、降低海外刷卡與現金成本的自由行旅客。",
    primaryKeyword: "出國旅遊預算",
    keywords: ["旅遊預算", "換匯", "匯率換算", "海外刷卡", "旅遊記帳"],
    toolHrefs: ["/tools/currency", "/tools/best-exchange", "/tools/budget", "/tools/expense-tracker", "/tools/tip"],
    articleSlugs: [
      "best-exchange-method",
      "jpy-exchange-tips",
      "credit-card-overseas-tips",
      "japan-budget-breakdown",
      "bangkok-budget-breakdown",
      "cash-limit-entry",
    ],
    countryCodes: ["JP", "KR", "TH", "SG", "US", "FR"],
    faqs: [
      {
        question: "旅遊預算要抓多少才不會太緊？",
        answer:
          "先估機票與住宿，再依目的地物價、天數、交通方式和購物預算分開計算，最後保留 10% 到 20% 的緊急預備金。",
      },
      {
        question: "換匯、ATM 提款、信用卡哪個比較划算？",
        answer:
          "要同時比較匯率、手續費、現金需求與信用卡回饋；短程旅遊通常可混合少量現金與海外刷卡，長天數行程則適合分批換匯。",
      },
    ],
  },
  {
    slug: "visa-entry",
    title: "簽證、免簽與入境規定速查",
    shortTitle: "簽證入境",
    description:
      "整理台灣護照免簽、各國入境表單、現金申報與護照遺失處理，降低出發前文件漏填或入境卡關風險。",
    intent: "出發前需要確認簽證、免簽天數、電子入境表單與入境限制的旅客。",
    primaryKeyword: "台灣護照簽證查詢",
    keywords: ["簽證查詢", "免簽國家", "入境規定", "台灣護照", "電子入境卡"],
    toolHrefs: ["/tools/visa", "/countries", "/tools/flight-time", "/tools/customs"],
    articleSlugs: [
      "taiwan-passport-visa-free",
      "visit-japan-web-guide",
      "korea-entry-requirements",
      "cash-limit-entry",
      "passport-lost-overseas",
    ],
    countryCodes: ["JP", "KR", "SG", "TH", "US", "GB", "FR"],
    faqs: [
      {
        question: "免簽是不是代表不用準備任何入境資料？",
        answer:
          "不是。免簽通常只代表不用事先申請簽證，仍可能需要電子入境卡、回程機票、住宿資料或足夠旅費證明。",
      },
      {
        question: "入境可以帶多少現金？",
        answer:
          "各國申報門檻不同，常見做法是超過一定金額需主動申報；出發前應以目的地海關或移民機關公告為準。",
      },
    ],
  },
  {
    slug: "baggage-packing",
    title: "行李打包與飛機攜帶規定",
    shortTitle: "行李打包",
    description:
      "串起行李限重、打包清單、行動電源瓦時、海關禁帶品與廉航加購策略，適合出發前整理行李的人。",
    intent: "想避免超重、託運錯誤、漏帶必需品或攜帶違禁品的旅客。",
    primaryKeyword: "出國行李規定",
    keywords: ["行李規定", "打包清單", "手提行李", "行動電源上飛機", "海關規定"],
    toolHrefs: ["/tools/baggage", "/tools/packing-list", "/tools/power-bank", "/tools/customs", "/tools/plug-voltage"],
    articleSlugs: [
      "packing-checklist-ultimate",
      "budget-airline-baggage-tips",
      "power-bank-flight-rules",
      "taiwan-customs-rules",
      "plug-voltage-guide",
    ],
    countryCodes: ["JP", "KR", "TH", "SG", "US"],
    faqs: [
      {
        question: "行動電源可以放託運行李嗎？",
        answer:
          "通常鋰電池與行動電源需放在手提行李，不能託運；容量限制要以航空公司與機場安檢規定為準。",
      },
      {
        question: "廉航行李應該出發前買還是到機場再買？",
        answer:
          "多數廉航出發前加購比較便宜，到機場臨櫃加購通常價格較高，建議先估重量並預留回程購物空間。",
      },
    ],
  },
  {
    slug: "travel-insurance-safety",
    title: "旅遊保險與海外安全準備",
    shortTitle: "保險安全",
    description:
      "從旅平險、不便險、護照遺失、海關限制到入境現金申報，整理出國前降低風險的必查清單。",
    intent: "需要評估保險保障、航班延誤、行李遺失與海外突發狀況處理方式的旅客。",
    primaryKeyword: "旅遊保險怎麼選",
    keywords: ["旅遊保險", "旅平險", "不便險", "護照遺失", "海外安全"],
    toolHrefs: ["/tools/travel-insurance", "/tools/customs", "/tools/visa", "/tools/expense-tracker"],
    articleSlugs: [
      "travel-insurance-guide",
      "travel-inconvenience-insurance",
      "passport-lost-overseas",
      "taiwan-customs-rules",
      "cash-limit-entry",
    ],
    countryCodes: ["JP", "KR", "TH", "US", "GB", "FR"],
    faqs: [
      {
        question: "旅平險和不便險差在哪？",
        answer:
          "旅平險多聚焦醫療與意外保障，不便險則常涵蓋班機延誤、行李延誤或遺失等旅途不便，投保時要分開看保障項目與理賠條件。",
      },
      {
        question: "護照在海外遺失怎麼辦？",
        answer:
          "先報警取得證明，再聯繫台灣駐外館處或相關辦事處辦理返國旅行文件；建議出發前備份護照影本與緊急聯絡資訊。",
      },
    ],
  },
  {
    slug: "destination-essentials",
    title: "熱門目的地出國前速查",
    shortTitle: "目的地速查",
    description:
      "依目的地快速查時差、插頭電壓、小費文化、飛行時間、簽證與實用攻略，適合已決定國家但還沒整理細節的人。",
    intent: "已選好目的地、想在一頁內檢查各國出國前注意事項的旅客。",
    primaryKeyword: "目的地旅遊資訊",
    keywords: ["國家旅遊資訊", "時差查詢", "插頭電壓", "小費文化", "飛行時間"],
    toolHrefs: ["/countries", "/tools/timezone", "/tools/plug-voltage", "/tools/tip", "/tools/flight-time"],
    articleSlugs: [
      "tokyo-free-travel-guide",
      "seoul-free-travel-guide",
      "plug-voltage-guide",
      "tipping-guide-worldwide",
      "esim-vs-sim-card",
    ],
    countryCodes: ["JP", "KR", "TH", "SG", "US", "GB", "FR", "IT"],
    faqs: [
      {
        question: "已經決定目的地後，還需要查哪些資訊？",
        answer:
          "建議至少確認簽證或入境表單、時差、插頭電壓、交通支付方式、小費文化、緊急電話與最佳旅遊月份。",
      },
      {
        question: "各國插頭電壓都能用萬用轉接頭解決嗎？",
        answer:
          "轉接頭只解決插座形狀，不一定處理電壓差；吹風機、電棒捲等高功率電器仍要確認是否支援目的地電壓。",
      },
    ],
  },
];

export function getTopicClusters(): TopicCluster[] {
  return TOPIC_CLUSTERS;
}

export function getTopicCluster(slug: string): TopicCluster | undefined {
  return TOPIC_CLUSTERS.find((cluster) => cluster.slug === slug);
}

export function getTopicClusterPath(cluster: Pick<TopicCluster, "slug">): string {
  return `/topics/${cluster.slug}`;
}

export function resolveTopicClusterItems(
  cluster: TopicCluster,
  source: {
    tools: ToolInfo[];
    articles: ArticleMeta[];
    countries: CountryInfo[];
  },
): TopicClusterItems {
  const tools = cluster.toolHrefs
    .map((href) => source.tools.find((tool) => tool.href === href))
    .filter((tool): tool is ToolInfo => Boolean(tool));
  const articles = cluster.articleSlugs
    .map((slug) => source.articles.find((article) => article.slug === slug))
    .filter((article): article is ArticleMeta => Boolean(article));
  const countries = cluster.countryCodes
    .map((code) => source.countries.find((country) => country.code === code))
    .filter((country): country is CountryInfo => Boolean(country));

  return { tools, articles, countries };
}

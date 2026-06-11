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
  planningSteps: {
    title: string;
    body: string;
  }[];
  checkpoints: string[];
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
    planningSteps: [
      {
        title: "先完成入境與基本條件",
        body: "確認護照效期、停留天數、Visit Japan Web 與住宿資料，避免到了機場才發現文件或入境資訊還沒準備好。",
      },
      {
        title: "再估旅費與付款組合",
        body: "用日幣匯率、旅遊預算與信用卡海外手續費一起看，決定要先換多少現金、哪些支出交給信用卡或電子支付。",
      },
      {
        title: "最後整理購物與交通細節",
        body: "出發前把日本退稅門檻、JR Pass 或城市交通票券、插頭電壓與免費景點整理好，旅途中比較不會臨時查資料。",
      },
    ],
    checkpoints: [
      "護照效期至少覆蓋完整旅程，並保留電子影本。",
      "Visit Japan Web、住宿地址、回程機票資料已整理在同一處。",
      "已估算每日餐飲、交通、購物與備用金，不只看機票住宿。",
      "已確認退稅門檻、可退稅品項與機場退稅時間。",
    ],
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
    planningSteps: [
      {
        title: "先拆出固定與浮動成本",
        body: "機票、住宿、保險屬於出發前可確定的成本；餐飲、交通、購物與活動則要依目的地物價與旅行風格估算。",
      },
      {
        title: "比較現金、ATM 與刷卡",
        body: "不要只看牌告匯率，也要把手續費、海外交易費、提款限制與信用卡回饋一起算進去。",
      },
      {
        title: "旅途中持續記帳校正",
        body: "抵達後每天簡單記錄大項支出，能及早發現超支類別，也能為下一趟旅程留下真實預算資料。",
      },
    ],
    checkpoints: [
      "已分開計算機票、住宿、餐飲、交通、活動、購物與保險。",
      "現金需求有覆蓋交通儲值、小店付款與緊急用途。",
      "信用卡海外手續費與回饋已比較，不只看匯率。",
      "已保留 10% 到 20% 緊急預備金。",
    ],
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
    planningSteps: [
      {
        title: "先確認簽證與停留天數",
        body: "免簽、落地簽、電子簽與傳統簽證的條件不同，應以目的地官方公告與航空公司登機要求為準。",
      },
      {
        title: "補齊電子入境表單",
        body: "許多免簽國仍要求線上填表，例如入境卡、健康申報或旅遊授權；出發前完成能減少入境排隊與補件風險。",
      },
      {
        title: "整理海關與現金申報",
        body: "攜帶大量現金、食品、藥品或高價物品時，應先確認申報門檻與禁止攜帶項目。",
      },
    ],
    checkpoints: [
      "護照效期、簽證類型與停留天數已確認。",
      "電子入境卡或旅遊授權已填寫並截圖保存。",
      "回程機票、住宿地址與旅費證明可隨時出示。",
      "現金、藥品、食品與免稅品符合入境規定。",
    ],
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
    planningSteps: [
      {
        title: "先看航空公司行李規格",
        body: "傳統航空與廉航的手提件數、重量、尺寸和託運規則不同，轉機或多段票也要看最嚴格的一段。",
      },
      {
        title: "把禁帶品與電池分開檢查",
        body: "液體、刀具、行動電源、備用鋰電池與藥品常有特殊規定，不能只靠一般打包清單。",
      },
      {
        title: "依行程產生可勾選清單",
        body: "把證件、電子產品、藥品、衣物、盥洗用品與回程購物空間分開整理，打包速度更快也更不容易漏。",
      },
    ],
    checkpoints: [
      "手提與託運重量、件數、尺寸都已對照航空公司規定。",
      "行動電源與備用鋰電池放手提，不放託運。",
      "液體、藥品、食品與高價品已確認安檢或海關限制。",
      "回程購物空間與重量已預留。",
    ],
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
    planningSteps: [
      {
        title: "先分清楚旅平險與不便險",
        body: "旅平險偏向醫療與意外保障，不便險偏向班機延誤、行李延誤或行程變更，兩者要分開檢查理賠條件。",
      },
      {
        title: "用目的地風險調整保障",
        body: "長途、轉機、多城市、滑雪、租車或高醫療費目的地，通常需要比短程城市旅遊更完整的保障。",
      },
      {
        title: "保存緊急處理資料",
        body: "保單號碼、海外急難電話、護照影本、信用卡客服與駐外館處資訊，建議出發前就整理成離線可用版本。",
      },
    ],
    checkpoints: [
      "旅平險醫療額度、不便險延誤與行李條款已分開確認。",
      "信用卡附贈保險是否需要刷全額機票已確認。",
      "護照影本、保單、緊急電話已離線保存。",
      "高風險活動或租車是否納入保障已確認。",
    ],
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
    planningSteps: [
      {
        title: "先用國家速查建立目的地概況",
        body: "簽證、貨幣、時差、插頭、緊急電話與最佳旅遊月份是出發前最常漏掉但最容易影響行程的資訊。",
      },
      {
        title: "再補交通與付款習慣",
        body: "同樣是自由行，不同目的地在交通卡、現金比例、小費文化與網路方案上的差異很大，建議出發前一次確認。",
      },
      {
        title: "最後接上目的地攻略",
        body: "把免費景點、城市移動、SIM/eSIM 與插頭電壓攻略放在同一條路徑，能減少搜尋來回切換。",
      },
    ],
    checkpoints: [
      "目的地簽證、入境表單與停留天數已確認。",
      "時差、飛行時間與第一天抵達安排已估算。",
      "插頭電壓、網路方案與交通支付方式已準備。",
      "小費文化與緊急電話已記下。",
    ],
    toolHrefs: ["/countries", "/tools/timezone", "/tools/esim", "/tools/plug-voltage", "/tools/flight-time"],
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

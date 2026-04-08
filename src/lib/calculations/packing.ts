import type { PackingItem } from "@/types";

type Climate = "tropical" | "temperate" | "cold";
type Duration = "short" | "long";

interface PackingOptions {
  climate: Climate;
  duration: Duration;
  days: number;
}

const BASE_ITEMS: Omit<PackingItem, "checked">[] = [
  // 證件
  { id: "passport", category: "documents", name: "護照（效期 6 個月以上）", essential: true },
  { id: "passport-copy", category: "documents", name: "護照影本（與正本分開放）", essential: true },
  { id: "id-card", category: "documents", name: "身分證", essential: true },
  { id: "flight-ticket", category: "documents", name: "電子機票／登機證", essential: true },
  { id: "hotel-booking", category: "documents", name: "住宿訂房確認", essential: true },
  { id: "insurance-doc", category: "documents", name: "旅平險保單", essential: true },
  { id: "visa", category: "documents", name: "簽證（如需要）", essential: false },
  { id: "itinerary", category: "documents", name: "行程表", essential: false },
  { id: "emergency-contact", category: "documents", name: "緊急聯絡資訊", essential: true },

  // 電子產品
  { id: "phone", category: "electronics", name: "手機 + 充電線", essential: true },
  { id: "charger", category: "electronics", name: "充電器", essential: true },
  { id: "power-bank", category: "electronics", name: "行動電源（需隨身攜帶）", essential: true },
  { id: "adapter", category: "electronics", name: "萬用轉接頭", essential: true },
  { id: "earphones", category: "electronics", name: "耳機", essential: false },
  { id: "camera", category: "electronics", name: "相機 + 記憶卡", essential: false },
  { id: "esim", category: "electronics", name: "eSIM / Wi-Fi 分享器", essential: true },

  // 衣物
  { id: "underwear", category: "clothing", name: "內衣褲", essential: true },
  { id: "socks", category: "clothing", name: "襪子", essential: true },
  { id: "tops", category: "clothing", name: "上衣", essential: true },
  { id: "bottoms", category: "clothing", name: "褲子／裙子", essential: true },
  { id: "sleepwear", category: "clothing", name: "睡衣", essential: false },
  { id: "walking-shoes", category: "clothing", name: "好走的鞋子", essential: true },
  { id: "jacket", category: "clothing", name: "外套", essential: false, conditions: { climate: "temperate" } },
  { id: "winter-coat", category: "clothing", name: "保暖外套 / 羽絨衣", essential: true, conditions: { climate: "cold" } },
  { id: "hat-sun", category: "clothing", name: "遮陽帽", essential: false, conditions: { climate: "tropical" } },
  { id: "hat-warm", category: "clothing", name: "保暖帽", essential: false, conditions: { climate: "cold" } },
  { id: "umbrella", category: "clothing", name: "摺疊傘", essential: true },
  { id: "swimsuit", category: "clothing", name: "泳衣", essential: false, conditions: { climate: "tropical" } },

  // 盥洗用品
  { id: "toothbrush", category: "toiletries", name: "牙刷 + 牙膏", essential: true },
  { id: "shampoo", category: "toiletries", name: "洗髮精（旅行瓶）", essential: false },
  { id: "sunscreen", category: "toiletries", name: "防曬乳", essential: true },
  { id: "skincare", category: "toiletries", name: "保養品（小瓶裝）", essential: false },
  { id: "tissue", category: "toiletries", name: "面紙 / 濕紙巾", essential: true },
  { id: "lip-balm", category: "toiletries", name: "護唇膏", essential: false, conditions: { climate: "cold" } },

  // 藥品
  { id: "personal-medicine", category: "medicine", name: "個人常備藥", essential: true },
  { id: "cold-medicine", category: "medicine", name: "感冒藥", essential: false },
  { id: "stomach-medicine", category: "medicine", name: "腸胃藥", essential: true },
  { id: "band-aids", category: "medicine", name: "OK 繃", essential: false },
  { id: "motion-sickness", category: "medicine", name: "暈車藥", essential: false },
  { id: "insect-repellent", category: "medicine", name: "防蚊液", essential: false, conditions: { climate: "tropical" } },

  // 其他
  { id: "cash", category: "misc", name: "當地現金 / 台幣", essential: true },
  { id: "credit-card", category: "misc", name: "信用卡", essential: true },
  { id: "bag-lock", category: "misc", name: "行李鎖", essential: false },
  { id: "neck-pillow", category: "misc", name: "頸枕", essential: false, conditions: { duration: "long" } },
  { id: "eye-mask", category: "misc", name: "眼罩 + 耳塞", essential: false, conditions: { duration: "long" } },
  { id: "ziplock-bags", category: "misc", name: "夾鏈袋（液體分裝）", essential: true },
  { id: "pen", category: "misc", name: "原子筆（填入境卡用）", essential: true },
];

export function generatePackingList(options: PackingOptions): PackingItem[] {
  return BASE_ITEMS
    .filter((item) => {
      if (!item.conditions) return true;
      if (item.conditions.climate && item.conditions.climate !== options.climate) return false;
      if (item.conditions.duration && item.conditions.duration !== options.duration) return false;
      return true;
    })
    .map((item) => ({
      ...item,
      checked: false,
    }));
}

export const CATEGORY_LABELS: Record<string, string> = {
  documents: "證件文件",
  electronics: "電子產品",
  clothing: "衣物",
  toiletries: "盥洗用品",
  medicine: "藥品",
  misc: "其他",
};

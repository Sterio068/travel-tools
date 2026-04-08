import type { AirlineBaggage } from "@/types";

export const AIRLINES: AirlineBaggage[] = [
  {
    code: "CI", nameZh: "中華航空", nameEn: "China Airlines",
    type: "full-service",
    cabinBag: { pieces: 1, weightKg: 7, dimensions: "56×36×23 cm" },
    checkedBag: {
      economy: { pieces: 1, weightKgPerPiece: 23, method: "piece" },
      "premium-economy": { pieces: 2, weightKgPerPiece: 23, method: "piece" },
      business: { pieces: 2, weightKgPerPiece: 32, method: "piece" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "158 cm（長+寬+高）",
    notes: ["嬰兒可攜帶折疊式推車", "樂器需購買額外座位或託運"],
    url: "https://www.china-airlines.com/tw/zh/fly/prepare-for-the-ستفlight/baggage",
  },
  {
    code: "BR", nameZh: "長榮航空", nameEn: "EVA Air",
    type: "full-service",
    cabinBag: { pieces: 1, weightKg: 7, dimensions: "56×36×23 cm" },
    checkedBag: {
      economy: { pieces: 1, weightKgPerPiece: 23, method: "piece" },
      "premium-economy": { pieces: 2, weightKgPerPiece: 23, method: "piece" },
      business: { pieces: 2, weightKgPerPiece: 32, method: "piece" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "158 cm（長+寬+高）",
    notes: ["持菁英卡以上可加 1 件託運"],
    url: "https://www.evaair.com/zh-tw/fly-prepare/baggage/",
  },
  {
    code: "JX", nameZh: "星宇航空", nameEn: "STARLUX Airlines",
    type: "full-service",
    cabinBag: { pieces: 1, weightKg: 7, dimensions: "56×36×23 cm" },
    checkedBag: {
      economy: { pieces: 1, weightKgPerPiece: 23, method: "piece" },
      "premium-economy": { pieces: 2, weightKgPerPiece: 23, method: "piece" },
      business: { pieces: 2, weightKgPerPiece: 32, method: "piece" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "158 cm（長+寬+高）",
    notes: ["經濟艙可加購至 2 件"],
    url: "https://www.starlux-airlines.com/zh-TW",
  },
  {
    code: "CX", nameZh: "國泰航空", nameEn: "Cathay Pacific",
    type: "full-service",
    cabinBag: { pieces: 1, weightKg: 7, dimensions: "56×36×23 cm" },
    checkedBag: {
      economy: { pieces: 1, weightKgPerPiece: 23, method: "piece" },
      "premium-economy": { pieces: 2, weightKgPerPiece: 23, method: "piece" },
      business: { pieces: 2, weightKgPerPiece: 32, method: "piece" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "158 cm（長+寬+高）",
    notes: ["Marco Polo 會員享額外行李額度"],
    url: "https://www.cathaypacific.com/",
  },
  {
    code: "JL", nameZh: "日本航空", nameEn: "Japan Airlines",
    type: "full-service",
    cabinBag: { pieces: 1, weightKg: 10, dimensions: "55×40×25 cm" },
    checkedBag: {
      economy: { pieces: 2, weightKgPerPiece: 23, method: "piece" },
      business: { pieces: 3, weightKgPerPiece: 32, method: "piece" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "203 cm（長+寬+高）",
    notes: ["日本國內線與國際線規定不同", "手提行李含隨身物品共 2 件"],
    url: "https://www.jal.co.jp/",
  },
  {
    code: "NH", nameZh: "全日空", nameEn: "ANA",
    type: "full-service",
    cabinBag: { pieces: 1, weightKg: 10, dimensions: "55×40×25 cm" },
    checkedBag: {
      economy: { pieces: 2, weightKgPerPiece: 23, method: "piece" },
      business: { pieces: 2, weightKgPerPiece: 32, method: "piece" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "158 cm（長+寬+高）",
    notes: ["超級票價限 1 件 23kg"],
    url: "https://www.ana.co.jp/",
  },
  {
    code: "KE", nameZh: "大韓航空", nameEn: "Korean Air",
    type: "full-service",
    cabinBag: { pieces: 1, weightKg: 10, dimensions: "55×40×20 cm" },
    checkedBag: {
      economy: { pieces: 1, weightKgPerPiece: 23, method: "piece" },
      business: { pieces: 2, weightKgPerPiece: 32, method: "piece" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "158 cm（長+寬+高）",
    notes: ["SKYPASS 會員享額外行李"],
    url: "https://www.koreanair.com/",
  },
  {
    code: "OZ", nameZh: "韓亞航空", nameEn: "Asiana Airlines",
    type: "full-service",
    cabinBag: { pieces: 1, weightKg: 10, dimensions: "55×40×20 cm" },
    checkedBag: {
      economy: { pieces: 1, weightKgPerPiece: 23, method: "piece" },
      business: { pieces: 2, weightKgPerPiece: 32, method: "piece" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "158 cm（長+寬+高）",
    notes: ["已與大韓航空合併，規定可能調整"],
    url: "https://flyasiana.com/",
  },
  {
    code: "IT", nameZh: "台灣虎航", nameEn: "Tigerair Taiwan",
    type: "low-cost",
    cabinBag: { pieces: 2, weightKg: 10, dimensions: "54×38×23 cm" },
    checkedBag: {
      economy: { pieces: 0, weightKgPerPiece: 0, method: "weight" },
    },
    maxSinglePieceKg: 30, maxDimensionsCm: "203 cm（長+寬+高）",
    notes: ["託運行李需加購（15/20/25/30kg）", "手提含隨身物品共 2 件 10kg"],
    url: "https://www.tigerairtw.com/",
  },
  {
    code: "TR", nameZh: "酷航", nameEn: "Scoot",
    type: "low-cost",
    cabinBag: { pieces: 1, weightKg: 10, dimensions: "54×38×23 cm" },
    checkedBag: {
      economy: { pieces: 0, weightKgPerPiece: 0, method: "weight" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "158 cm（長+寬+高）",
    notes: ["託運行李需加購（20/25/30/35/40kg）", "ScootPlus 含 30kg 託運"],
    url: "https://www.flyscoot.com/",
  },
  {
    code: "MM", nameZh: "樂桃航空", nameEn: "Peach Aviation",
    type: "low-cost",
    cabinBag: { pieces: 2, weightKg: 7, dimensions: "50×40×25 cm" },
    checkedBag: {
      economy: { pieces: 0, weightKgPerPiece: 0, method: "weight" },
    },
    maxSinglePieceKg: 20, maxDimensionsCm: "203 cm（三邊合計）",
    notes: ["託運行李需加購（20kg 起跳）", "Value Peach 含 1 件 20kg"],
    url: "https://www.flypeach.com/",
  },
  {
    code: "3K", nameZh: "捷星航空", nameEn: "Jetstar",
    type: "low-cost",
    cabinBag: { pieces: 1, weightKg: 7, dimensions: "56×36×23 cm" },
    checkedBag: {
      economy: { pieces: 0, weightKgPerPiece: 0, method: "weight" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "158 cm（長+寬+高）",
    notes: ["託運行李需加購（15/20/25/30/40kg）"],
    url: "https://www.jetstar.com/",
  },
  {
    code: "AK", nameZh: "亞洲航空", nameEn: "AirAsia",
    type: "low-cost",
    cabinBag: { pieces: 1, weightKg: 7, dimensions: "56×36×23 cm" },
    checkedBag: {
      economy: { pieces: 0, weightKgPerPiece: 0, method: "weight" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "119×119×81 cm",
    notes: ["託運行李需加購（15/20/25/30/40kg）", "Value Pack 含 20kg 託運"],
    url: "https://www.airasia.com/",
  },
  {
    code: "7C", nameZh: "濟州航空", nameEn: "Jeju Air",
    type: "low-cost",
    cabinBag: { pieces: 1, weightKg: 10, dimensions: "55×40×20 cm" },
    checkedBag: {
      economy: { pieces: 1, weightKgPerPiece: 15, method: "weight" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "203 cm（三邊合計）",
    notes: ["基本含 15kg 託運", "可加購至 40kg"],
    url: "https://www.jejuair.net/",
  },
  {
    code: "VJ", nameZh: "越捷航空", nameEn: "VietJet Air",
    type: "low-cost",
    cabinBag: { pieces: 1, weightKg: 7, dimensions: "56×36×23 cm" },
    checkedBag: {
      economy: { pieces: 0, weightKgPerPiece: 0, method: "weight" },
    },
    maxSinglePieceKg: 32, maxDimensionsCm: "203 cm（三邊合計）",
    notes: ["託運行李需加購（20/25/30/40kg）", "SkyBoss 含 30kg 託運"],
    url: "https://www.vietjetair.com/",
  },
];

export function getAirlineByCode(code: string): AirlineBaggage | undefined {
  return AIRLINES.find((a) => a.code === code);
}

export function getFullServiceAirlines(): AirlineBaggage[] {
  return AIRLINES.filter((a) => a.type === "full-service");
}

export function getLowCostAirlines(): AirlineBaggage[] {
  return AIRLINES.filter((a) => a.type === "low-cost");
}

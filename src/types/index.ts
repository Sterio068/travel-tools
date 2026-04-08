export interface CountryInfo {
  code: string;
  flag: string;
  nameZh: string;
  nameEn: string;
  currency: string;
  currencyName: string;
  currencySymbol: string;
  timezone: string;
  utcOffset: number;
  timeDiffFromTW: number;
  plugType: string[];
  voltage: number;
  frequency: number;
  visaRequired: boolean;
  visaFreeDays?: number;
  tippingCulture: "none" | "optional" | "expected";
  tippingPercent?: number;
  drinkingAge: number;
  emergencyNumber: string;
  drivingSide: "left" | "right";
  languages: string[];
  flightHours: number;
  bestMonths: number[];
  entryRequirements: string;
  taxRefund: {
    available: boolean;
    minPurchase?: number;
    refundPercent?: number;
    notes?: string;
  };
}

export interface AirlineBaggage {
  code: string;
  nameZh: string;
  nameEn: string;
  type: "full-service" | "low-cost";
  cabinBag: {
    pieces: number;
    weightKg: number;
    dimensions: string;
  };
  checkedBag: {
    [cabin: string]: {
      pieces: number;
      weightKgPerPiece: number;
      method: "piece" | "weight";
    };
  };
  maxSinglePieceKg: number;
  maxDimensionsCm: string;
  notes: string[];
  url: string;
}

export interface CurrencyConversion {
  from: string;
  to: string;
  amount: number;
  rate: number;
  result: number;
  updatedAt: string;
}

export interface BudgetEstimate {
  destination: string;
  days: number;
  travelers: number;
  style: "budget" | "moderate" | "luxury";
  breakdown: {
    flights: number;
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    shopping: number;
    insurance: number;
    misc: number;
  };
  totalTWD: number;
  totalLocal: number;
  perPersonPerDay: number;
}

export interface PackingItem {
  id: string;
  category: "documents" | "electronics" | "clothing" | "toiletries" | "medicine" | "misc";
  name: string;
  essential: boolean;
  checked: boolean;
  conditions?: {
    climate?: "tropical" | "temperate" | "cold";
    duration?: "short" | "long";
    purpose?: "business" | "leisure" | "adventure";
  };
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  keywords: string[];
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  country?: string;
}

export type ArticleCategory =
  | "currency"
  | "visa"
  | "packing"
  | "transport"
  | "insurance"
  | "budget"
  | "destination"
  | "tips"
  | "safety"
  | "tech";

export interface ToolInfo {
  name: string;
  description: string;
  href: string;
  icon: string;
  keywords: string[];
}

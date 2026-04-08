import { COUNTRIES } from "@/data/countries";

export interface TipResult {
  countryCode: string;
  countryName: string;
  flag: string;
  tippingCulture: "none" | "optional" | "expected";
  suggestedPercent: number;
  tipAmount: number;
  totalWithTip: number;
  currencySymbol: string;
  advice: string;
}

export function calculateTip(
  countryCode: string,
  billAmount: number,
  customPercent?: number,
): TipResult | null {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  if (!country) return null;

  const percent = customPercent ?? country.tippingPercent ?? 0;
  const tipAmount = Math.round(billAmount * percent / 100);

  let advice: string;
  switch (country.tippingCulture) {
    case "none":
      advice = "此國家沒有小費文化，不需要額外給小費。在日本給小費甚至可能被視為不禮貌。";
      break;
    case "optional":
      advice = `小費非必要但受歡迎，一般給消費金額的 ${percent}% 左右。高級餐廳或滿意服務時可酌給。`;
      break;
    case "expected":
      advice = `此國家有小費文化，餐廳一般給 ${percent}%。服務費未含在帳單中時務必給小費。`;
      break;
  }

  return {
    countryCode: country.code,
    countryName: country.nameZh,
    flag: country.flag,
    tippingCulture: country.tippingCulture,
    suggestedPercent: percent,
    tipAmount,
    totalWithTip: billAmount + tipAmount,
    currencySymbol: country.currencySymbol,
    advice,
  };
}

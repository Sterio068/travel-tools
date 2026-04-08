import { DAILY_BUDGET_REFERENCE, FLIGHT_COST_REFERENCE, STATIC_EXCHANGE_RATES } from "@/data/constants";
import { COUNTRIES } from "@/data/countries";
import type { BudgetEstimate } from "@/types";

export function calculateBudget(
  countryCode: string,
  days: number,
  travelers: number,
  style: "budget" | "moderate" | "luxury",
): BudgetEstimate | null {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  const dailyRef = DAILY_BUDGET_REFERENCE[countryCode];
  const flightRef = FLIGHT_COST_REFERENCE[countryCode];

  if (!country || !dailyRef || !flightRef) return null;

  const dailyBudget = dailyRef[style];
  const flightCost = style === "luxury"
    ? flightRef.moderate * 1.8
    : style === "moderate"
      ? flightRef.moderate
      : flightRef.budget;

  // 各項佔比拆解
  const accommodationRatio = style === "budget" ? 0.30 : style === "moderate" ? 0.35 : 0.40;
  const foodRatio = style === "budget" ? 0.30 : style === "moderate" ? 0.25 : 0.20;
  const transportRatio = 0.15;
  const activitiesRatio = style === "budget" ? 0.10 : 0.15;
  const shoppingRatio = style === "budget" ? 0.05 : 0.10;

  const dailyTotal = dailyBudget;
  const accommodation = Math.round(dailyTotal * accommodationRatio * days * travelers);
  const food = Math.round(dailyTotal * foodRatio * days * travelers);
  const transport = Math.round(dailyTotal * transportRatio * days * travelers);
  const activities = Math.round(dailyTotal * activitiesRatio * days * travelers);
  const shopping = Math.round(dailyTotal * shoppingRatio * days * travelers);
  const flights = Math.round(flightCost * travelers);
  const insurance = Math.round(days * 50 * travelers);
  const misc = Math.round(dailyTotal * 0.05 * days * travelers);

  const totalTWD = accommodation + food + transport + activities + shopping + flights + insurance + misc;

  const exchangeRate = STATIC_EXCHANGE_RATES[country.currency] || 1;
  const totalLocal = Math.round(totalTWD / exchangeRate);
  const perPersonPerDay = Math.round(totalTWD / travelers / days);

  return {
    destination: country.nameZh,
    days,
    travelers,
    style,
    breakdown: {
      flights,
      accommodation,
      food,
      transport,
      activities,
      shopping,
      insurance,
      misc,
    },
    totalTWD,
    totalLocal,
    perPersonPerDay,
  };
}

export type EsimDataUse = "light" | "standard" | "heavy";

export interface EsimComparisonInput {
  countryCode: string;
  days: number;
  travelers: number;
  dataUse: EsimDataUse;
  deviceSupportsEsim: boolean;
  needsLocalCalls: boolean;
  hotspotDevices: number;
}

export interface EsimPlanEstimate {
  type: "esim" | "physical-sim" | "wifi-router";
  name: string;
  estimatedCostTWD: number;
  dataAllowanceGB: number;
  fitScore: number;
  strengths: string[];
  cautions: string[];
}

export interface EsimComparisonResult {
  countryCode: string;
  days: number;
  travelers: number;
  totalDataGB: number;
  dailyDataGB: number;
  recommendation: EsimPlanEstimate;
  plans: EsimPlanEstimate[];
}

interface DestinationConnectivityProfile {
  market: "asia" | "longhaul" | "premium";
  physicalSimAvailable: boolean;
  wifiRouterDailyTWD: number;
}

const DATA_USE_PER_DAY: Record<EsimDataUse, number> = {
  light: 1,
  standard: 2.5,
  heavy: 5,
};

const DESTINATION_PROFILES: Record<string, DestinationConnectivityProfile> = {
  JP: { market: "asia", physicalSimAvailable: true, wifiRouterDailyTWD: 180 },
  KR: { market: "asia", physicalSimAvailable: true, wifiRouterDailyTWD: 170 },
  TH: { market: "asia", physicalSimAvailable: true, wifiRouterDailyTWD: 150 },
  VN: { market: "asia", physicalSimAvailable: true, wifiRouterDailyTWD: 140 },
  SG: { market: "premium", physicalSimAvailable: true, wifiRouterDailyTWD: 190 },
  HK: { market: "asia", physicalSimAvailable: true, wifiRouterDailyTWD: 160 },
  US: { market: "longhaul", physicalSimAvailable: true, wifiRouterDailyTWD: 230 },
  GB: { market: "longhaul", physicalSimAvailable: true, wifiRouterDailyTWD: 220 },
  FR: { market: "longhaul", physicalSimAvailable: true, wifiRouterDailyTWD: 220 },
  IT: { market: "longhaul", physicalSimAvailable: true, wifiRouterDailyTWD: 220 },
  DE: { market: "longhaul", physicalSimAvailable: true, wifiRouterDailyTWD: 220 },
  AU: { market: "longhaul", physicalSimAvailable: true, wifiRouterDailyTWD: 230 },
};

const MARKET_ESIM_BASE: Record<DestinationConnectivityProfile["market"], number> = {
  asia: 260,
  longhaul: 430,
  premium: 360,
};

const MARKET_PHYSICAL_SIM_BASE: Record<DestinationConnectivityProfile["market"], number> = {
  asia: 220,
  longhaul: 360,
  premium: 320,
};

function getProfile(countryCode: string): DestinationConnectivityProfile {
  return (
    DESTINATION_PROFILES[countryCode] ?? {
      market: "longhaul",
      physicalSimAvailable: true,
      wifiRouterDailyTWD: 220,
    }
  );
}

function roundToNearestTen(value: number) {
  return Math.round(value / 10) * 10;
}

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function estimatePlanCosts(
  input: EsimComparisonInput,
  totalDataGB: number,
  profile: DestinationConnectivityProfile,
) {
  const dataBlocks = Math.max(1, Math.ceil(totalDataGB / 5));
  const travelerMultiplier = Math.max(1, input.travelers);

  return {
    esim: roundToNearestTen(
      (MARKET_ESIM_BASE[profile.market] + dataBlocks * 70) * travelerMultiplier,
    ),
    physicalSim: roundToNearestTen(
      (MARKET_PHYSICAL_SIM_BASE[profile.market] + dataBlocks * 55) * travelerMultiplier,
    ),
    wifiRouter: roundToNearestTen(
      profile.wifiRouterDailyTWD * Math.max(1, input.days) +
        Math.max(0, travelerMultiplier - 1) * 30 * Math.max(1, input.days),
    ),
  };
}

export function compareEsimPlans(input: EsimComparisonInput): EsimComparisonResult | null {
  if (
    !Number.isFinite(input.days) ||
    !Number.isFinite(input.travelers) ||
    !Number.isFinite(input.hotspotDevices) ||
    input.days <= 0 ||
    input.travelers <= 0 ||
    input.hotspotDevices < 0
  ) {
    return null;
  }

  const profile = getProfile(input.countryCode);
  const dailyDataGB = DATA_USE_PER_DAY[input.dataUse];
  const totalDataGB = Math.ceil(dailyDataGB * input.days * input.travelers);
  const costs = estimatePlanCosts(input, totalDataGB, profile);

  const esimScore = clampScore(
    78 +
      (input.deviceSupportsEsim ? 12 : -45) +
      (input.needsLocalCalls ? -16 : 6) +
      (input.travelers === 1 ? 8 : -2) +
      (input.hotspotDevices > 0 ? -4 : 0),
  );
  const physicalScore = clampScore(
    70 +
      (profile.physicalSimAvailable ? 8 : -35) +
      (input.needsLocalCalls ? 14 : 0) +
      (input.deviceSupportsEsim ? -4 : 8),
  );
  const wifiScore = clampScore(
    62 +
      (input.travelers >= 3 ? 18 : 0) +
      (input.hotspotDevices >= 2 ? 14 : 0) +
      (input.dataUse === "heavy" ? 10 : 0) -
      (input.needsLocalCalls ? 8 : 0),
  );

  const unsortedPlans: EsimPlanEstimate[] = [
    {
      type: "esim",
      name: "旅遊 eSIM",
      estimatedCostTWD: costs.esim,
      dataAllowanceGB: totalDataGB,
      fitScore: esimScore,
      strengths: ["免換實體卡", "可保留台灣門號收簡訊", "出發前可先完成安裝"],
      cautions: [
        input.deviceSupportsEsim ? "安裝後通常不可轉移到另一支手機" : "目前裝置不支援 eSIM，需改選其他方案",
        input.needsLocalCalls ? "多數旅遊 eSIM 不含當地電話號碼" : "多為上網方案，不適合大量撥打當地電話",
      ],
    },
    {
      type: "physical-sim",
      name: "當地實體 SIM",
      estimatedCostTWD: costs.physicalSim,
      dataAllowanceGB: totalDataGB,
      fitScore: physicalScore,
      strengths: ["常有較低價格", "部分方案含當地電話號碼", "老手機也能使用"],
      cautions: ["需更換 SIM 卡並保管台灣 SIM", "抵達後可能要排隊或手動設定 APN"],
    },
    {
      type: "wifi-router",
      name: "Wi-Fi 分享器",
      estimatedCostTWD: costs.wifiRouter,
      dataAllowanceGB: totalDataGB,
      fitScore: wifiScore,
      strengths: ["多人或多裝置可共用", "不需要更換手機 SIM", "適合平板、筆電一起上網"],
      cautions: ["需要充電與歸還設備", "同行者分開行動時會有人沒有網路"],
    },
  ];
  const plans = [...unsortedPlans].sort(
    (a, b) => b.fitScore - a.fitScore || a.estimatedCostTWD - b.estimatedCostTWD,
  );

  return {
    countryCode: input.countryCode,
    days: input.days,
    travelers: input.travelers,
    totalDataGB,
    dailyDataGB,
    recommendation: plans[0],
    plans,
  };
}

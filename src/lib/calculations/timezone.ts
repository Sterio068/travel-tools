import { COUNTRIES } from "@/data/countries";

export interface TimezoneResult {
  countryCode: string;
  countryName: string;
  flag: string;
  timezone: string;
  utcOffset: number;
  timeDiffFromTW: number;
  localTime: string;
  twTime: string;
  description: string;
}

/** 取得目的地現在時間 */
export function getTimezoneInfo(countryCode: string): TimezoneResult | null {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  if (!country) return null;

  const now = new Date();

  const twFormatter = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const localFormatter = new Intl.DateTimeFormat("zh-TW", {
    timeZone: country.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const diff = country.timeDiffFromTW;
  let description: string;
  if (diff > 0) {
    description = `比台灣快 ${diff} 小時`;
  } else if (diff < 0) {
    description = `比台灣慢 ${Math.abs(diff)} 小時`;
  } else {
    description = "與台灣相同時區";
  }

  return {
    countryCode: country.code,
    countryName: country.nameZh,
    flag: country.flag,
    timezone: country.timezone,
    utcOffset: country.utcOffset,
    timeDiffFromTW: diff,
    localTime: localFormatter.format(now),
    twTime: twFormatter.format(now),
    description,
  };
}

/** 時差對照表：指定台灣時間，顯示目的地時間 */
export function convertTime(
  twHour: number,
  twMinute: number,
  countryCode: string,
): { localHour: number; localMinute: number; nextDay: boolean; prevDay: boolean } | null {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  if (!country) return null;

  let localHour = twHour + country.timeDiffFromTW;
  let nextDay = false;
  let prevDay = false;

  if (localHour >= 24) {
    localHour -= 24;
    nextDay = true;
  } else if (localHour < 0) {
    localHour += 24;
    prevDay = true;
  }

  return { localHour, localMinute: twMinute, nextDay, prevDay };
}

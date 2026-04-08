import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "旅遊實用工具站",
    short_name: "旅遊工具站",
    description: "免費出國旅遊工具：匯率換算、時差查詢、行李規定速查、旅遊預算計算",
    start_url: "/",
    display: "standalone",
    background_color: "#F0FDFA",
    theme_color: "#0891B2",
  };
}

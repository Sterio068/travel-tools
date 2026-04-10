import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "旅遊實用工具站 — 出國旅遊一站搞定";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0891B2 0%, #0E7490 50%, #083344 100%)",
          fontFamily: "sans-serif",
          color: "white",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 180, lineHeight: 1 }}>✈️</div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          旅遊實用工具站
        </div>
        <div
          style={{
            fontSize: 44,
            opacity: 0.92,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          出國旅遊，一站搞定
        </div>
        <div
          style={{
            fontSize: 30,
            opacity: 0.75,
            marginTop: 40,
            display: "flex",
            gap: 32,
          }}
        >
          <span>💱 匯率</span>
          <span>🕐 時差</span>
          <span>🧳 行李</span>
          <span>🔌 插頭</span>
          <span>💰 預算</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 28,
            opacity: 0.6,
          }}
        >
          tripkit.org
        </div>
      </div>
    ),
    { ...size },
  );
}

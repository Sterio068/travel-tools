import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { ADSENSE_CLIENT_ID, GOOGLE_ANALYTICS_ID, SITE_URL } from "@/lib/env";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "旅遊實用工具站 — 匯率換算、行李規定、時差查詢一站搞定",
    template: "%s | 旅遊實用工具站",
  },
  description:
    "免費出國旅遊工具：匯率換算、時差查詢、行李規定速查、旅遊預算計算、插頭電壓、打包清單。台灣旅客出國前必看的實用工具站。",
  keywords: [
    "旅遊工具",
    "匯率換算",
    "日幣匯率",
    "時差查詢",
    "行李規定",
    "旅遊預算",
    "出國必備",
    "自由行",
    "打包清單",
    "退稅",
  ],
  authors: [{ name: "旅遊實用工具站" }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: SITE_URL,
    siteName: "旅遊實用工具站",
    title: "旅遊實用工具站 — 匯率換算、行李規定、時差查詢一站搞定",
    description:
      "免費出國旅遊工具：匯率換算、時差查詢、行李規定速查、旅遊預算計算。",
  },
  twitter: {
    card: "summary_large_image",
    title: "旅遊實用工具站",
    description: "台灣旅客的免費出國實用工具",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "roZED8LHEvKCh8gH7NSBpjiAbjh5h7M6DfBjeBqSXus",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${inter.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F0FDFA] text-brand-900">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GOOGLE_ANALYTICS_ID}');`}
            </Script>
          </>
        )}
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}

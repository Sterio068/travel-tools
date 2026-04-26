import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // www → non-www 301 永久重導（解決 GSC 重複頁問題）
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tripkit.org" }],
        destination: "https://tripkit.org/:path*",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);

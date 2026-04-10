"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    threads: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const btnBase =
    "inline-flex items-center gap-2 px-4 py-2 rounded-[12px] text-sm font-medium transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2 my-6">
      <span className="text-sm text-slate-500 mr-2">分享到：</span>

      <a
        href={shareLinks.line}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-[#06C755] text-white hover:bg-[#05B54B]`}
        aria-label="分享到 LINE"
      >
        LINE
      </a>

      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-[#1877F2] text-white hover:bg-[#166FE5]`}
        aria-label="分享到 Facebook"
      >
        Facebook
      </a>

      <a
        href={shareLinks.threads}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-brand-900 text-white hover:bg-brand-800`}
        aria-label="分享到 Threads"
      >
        Threads
      </a>

      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-slate-900 text-white hover:bg-slate-800`}
        aria-label="分享到 X (Twitter)"
      >
        X
      </a>

      <button
        type="button"
        onClick={copyLink}
        className={`${btnBase} bg-brand-100 text-brand-700 hover:bg-brand-200`}
      >
        {copied ? "已複製 ✓" : "複製連結"}
      </button>
    </div>
  );
}

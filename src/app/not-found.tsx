import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      <span className="text-6xl mb-6 block">🗺️</span>
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-4">
        找不到頁面
      </h1>
      <p className="text-brand-700 mb-8">
        看起來你迷路了！這個頁面不存在，讓我們幫你找到方向。
      </p>
      <div className="flex justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-[12px] bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
        >
          回首頁
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center px-6 py-3 rounded-[12px] bg-white text-brand-600 font-semibold border border-brand-200 hover:bg-brand-50 transition-colors"
        >
          瀏覽工具
        </Link>
      </div>
    </div>
  );
}

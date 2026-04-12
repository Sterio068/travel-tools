import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-900 text-brand-100 pb-24 md:pb-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <span className="text-2xl" aria-hidden="true">✈️</span>
              <span>旅遊實用工具站</span>
            </div>
            <p className="text-sm text-brand-300 leading-relaxed">
              台灣旅客的免費出國實用工具，匯率換算、行李規定、時差查詢、旅遊預算一站搞定。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-brand-100">實用工具</h3>
            <ul className="columns-2 gap-x-6 space-y-2 text-sm text-brand-300">
              <li><Link href="/tools/currency" className="hover:text-white">匯率換算</Link></li>
              <li><Link href="/tools/timezone" className="hover:text-white">時差查詢</Link></li>
              <li><Link href="/tools/baggage" className="hover:text-white">行李規定</Link></li>
              <li><Link href="/tools/budget" className="hover:text-white">旅遊預算</Link></li>
              <li><Link href="/tools/plug-voltage" className="hover:text-white">插頭電壓</Link></li>
              <li><Link href="/tools/packing-list" className="hover:text-white">打包清單</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-brand-100">關於</h3>
            <ul className="space-y-2 text-sm text-brand-300">
              <li><Link href="/about" className="hover:text-white">關於我們</Link></li>
              <li><Link href="/articles" className="hover:text-white">旅遊攻略</Link></li>
              <li><Link href="/countries" className="hover:text-white">國家速查</Link></li>
              <li><a href="mailto:sterio068@gmail.com" className="hover:text-white">聯絡我們</a></li>
            </ul>
          </div>
        </div>
        {/* 電子報訂閱 */}
        <div className="mt-10 pt-8 border-t border-brand-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-brand-100 mb-1">訂閱旅遊資訊更新</h3>
              <p className="text-sm text-brand-300">最新匯率趨勢、免簽政策變動、旅遊攻略，不定期寄送</p>
            </div>
            <a
              href="mailto:sterio068@gmail.com?subject=訂閱旅遊實用工具站更新&body=您好，我想訂閱旅遊實用工具站的更新通知。"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold transition-colors"
            >
              ✉️ 訂閱更新
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-700 text-xs text-brand-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} 旅遊實用工具站 · 本站內容僅供參考，出發前請以官方資訊為準
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">隱私權政策</Link>
            <Link href="/terms" className="hover:text-white">服務條款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

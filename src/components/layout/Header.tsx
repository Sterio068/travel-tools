import Link from "next/link";
import { SearchDialog } from "@/components/search/SearchDialog";

const NAV_LINKS = [
  { href: "/tools", label: "實用工具" },
  { href: "/countries", label: "國家速查" },
  { href: "/articles", label: "旅遊攻略" },
  { href: "/about", label: "關於" },
];

export function Header() {
  return (
    <header className="hidden md:block sticky top-0 z-40 bg-[#F0FDFA]/90 backdrop-blur-sm border-b border-brand-200">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl" aria-hidden="true">✈️</span>
            <span className="text-brand-800">旅遊實用工具站</span>
          </Link>
          <div className="flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-[10px] text-brand-700 font-medium hover:bg-brand-100 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-2 pl-2 border-l border-brand-200">
              <SearchDialog />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

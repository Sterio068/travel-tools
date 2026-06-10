"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchDialog } from "@/components/search/SearchDialog";

const NAV_LINKS = [
  { href: "/tools", label: "實用工具" },
  { href: "/countries", label: "國家速查" },
  { href: "/articles", label: "旅遊攻略" },
  { href: "/topics", label: "主題攻略" },
  { href: "/about", label: "關於" },
];

export function Header() {
  const pathname = usePathname();

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
                    className={`px-4 py-2 rounded-[8px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      pathname === link.href || pathname.startsWith(`${link.href}/`)
                        ? "bg-brand-100 text-brand-700"
                        : "text-brand-700 hover:bg-brand-100 hover:text-brand-600"
                    }`}
                    aria-current={
                      pathname === link.href || pathname.startsWith(`${link.href}/`)
                        ? "page"
                        : undefined
                    }
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

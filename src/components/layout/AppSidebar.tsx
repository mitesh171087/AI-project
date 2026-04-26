"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  ClipboardCheck,
  BookOpen,
  Users2,
  Calendar,
  Settings,
  Search,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/framework", label: "Framework Explorer", icon: FolderTree },
  { href: "/assessment", label: "Maturity Assessment", icon: ClipboardCheck },
  { href: "/evidence", label: "Evidence Library", icon: BookOpen },
  { href: "/raci", label: "RACI Library", icon: Users2 },
  { href: "/roadmap", label: "Roadmap Generator", icon: Calendar },
  { href: "/search", label: "Global Search", icon: Search },
  { href: "/admin", label: "Admin / Content", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-slate-900 text-white overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 shrink-0">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-white leading-tight">SAMA ITGF</span>
          <span className="text-xs text-slate-400 truncate">Compliance Advisor</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto sidebar-scroll">
        <div className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                  isActive
                    ? "bg-blue-700 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="h-3.5 w-3.5 text-blue-300" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-800">
        <div className="text-xs text-slate-500">
          <p className="font-medium text-slate-400">SAMA ITGF v2024</p>
          <p className="mt-0.5">Saudi Arabian banking compliance framework advisor. Not legal or regulatory advice.</p>
        </div>
      </div>
    </aside>
  );
}

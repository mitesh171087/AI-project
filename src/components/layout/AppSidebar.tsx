"use client";
import { Link, useLocation } from "react-router-dom";
import deloitteLogo from "@/assets/deloitte-logo.png";
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
  const { pathname } = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex flex-col w-64 overflow-hidden" style={{ backgroundColor: "#003d24" }}>
      {/* Logo / App header */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "#005230" }}>
        <div className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style={{ backgroundColor: "#006B3F" }}>
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-white leading-tight">SAMA ITGF</span>
          <span className="text-xs truncate" style={{ color: "#a7c4b0" }}>Compliance Advisor</span>
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
                to={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                  isActive
                    ? "text-white"
                    : "hover:text-white"
                )}
                style={isActive
                  ? { backgroundColor: "#006B3F" }
                  : { color: "#a7c4b0" }
                }
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#005230";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                }}
              >
                <Icon className={cn("h-4 w-4 shrink-0")} style={{ color: isActive ? "#ffffff" : "#6ea882" }} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="h-3.5 w-3.5" style={{ color: "#86BC25" }} />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Deloitte branding footer */}
      <div className="px-5 py-4 border-t" style={{ borderColor: "#005230" }}>
        <div className="flex items-center gap-2 mb-2">
          <img
            src={deloitteLogo}
            alt="Deloitte"
            width={80}
            height={45}
            className="object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div className="text-xs" style={{ color: "#6ea882" }}>
          <p className="font-medium" style={{ color: "#a7c4b0" }}>SAMA ITGF v1.0</p>
          <p className="mt-0.5">Saudi Arabian banking IT governance framework advisor. Not legal or regulatory advice.</p>
        </div>
      </div>
    </aside>
  );
}

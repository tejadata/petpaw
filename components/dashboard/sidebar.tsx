"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Dog,
  Heart,
  Bell,
  Settings,
  PawPrint,
  LogOut,
  FileText,
  Menu,
  X,
  Syringe,
} from "lucide-react";
import { signOutAndRedirect } from "@/lib/auth-actions";
import { APP_NAME } from "@/lib/constants";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/pets", icon: PawPrint, label: "My Pets" },
  { href: "/dashboard/dogs", icon: Dog, label: "My Dogs" },
  { href: "/dashboard/favorites", icon: Heart, label: "Favorites" },
  { href: "/dashboard/reminders", icon: Bell, label: "Reminders" },
  { href: "/dashboard/vaccinations", icon: Syringe, label: "Vaccinations" },
  { href: "/dashboard/reports", icon: FileText, label: "Reports" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await signOutAndRedirect("/login");
  }

  return (
    <>
      {/* ── Desktop sidebar (hidden on mobile) ── */}
      <aside className="hidden lg:flex h-full w-64 flex-col border-r bg-card">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <PawPrint className="h-6 w-6 text-primary" />
          <Link href="/" className="text-lg font-bold">
            {APP_NAME}
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <NavLinks pathname={pathname} />
        </nav>

        <div className="border-t p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b bg-card px-4">
        <div className="flex items-center gap-2">
          <PawPrint className="h-5 w-5 text-primary" />
          <Link href="/" className="text-base font-bold">
            {APP_NAME}
          </Link>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={cn(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-72 flex-col bg-card shadow-xl transition-transform duration-300",
          mobileOpen ? "flex translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-primary" />
            <span className="text-base font-bold">{APP_NAME}</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </nav>

        <div className="border-t p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Store,
  Dog,
  ShoppingBag,
  Settings,
  PawPrint,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { ApprovalStatusBadge } from "@/components/vendor/approval-status-badge";
import type { VendorApprovalStatus } from "@/types/vendor";
import { signOutAndRedirect } from "@/lib/auth-actions";

const navItems = [
  { href: "/vendor/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/vendor/dashboard/store", icon: Store, label: "Store Profile" },
  { href: "/vendor/dashboard/puppies", icon: Dog, label: "Puppy Listings" },
  { href: "/vendor/dashboard/products", icon: ShoppingBag, label: "Products" },
  { href: "/vendor/dashboard/settings", icon: Settings, label: "Settings" },
];

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/vendor/dashboard" && pathname.startsWith(item.href));
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

interface VendorSidebarProps {
  approvalStatus?: VendorApprovalStatus;
}

export function VendorSidebar({ approvalStatus }: VendorSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await signOutAndRedirect("/vendor/login");
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-full w-64 flex-col border-r bg-card">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <PawPrint className="h-6 w-6 text-primary" />
          <Link href="/" className="text-lg font-bold">
            PawMatch
          </Link>
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            Vendor
          </span>
        </div>

        {approvalStatus && (
          <div className="border-b px-6 py-3">
            <p className="mb-1 text-xs text-muted-foreground">Account Status</p>
            <ApprovalStatusBadge status={approvalStatus} />
          </div>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <NavLinks pathname={pathname} />
        </nav>

        <div className="space-y-1 border-t p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <PawPrint className="h-4 w-4" />
            Back to Site
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b bg-card px-4">
        <div className="flex items-center gap-2">
          <PawPrint className="h-5 w-5 text-primary" />
          <Link href="/" className="text-base font-bold">
            PawMatch
          </Link>
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            Vendor
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-72 flex-col bg-card shadow-xl transition-transform duration-300",
          mobileOpen ? "flex translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-primary" />
            <span className="text-base font-bold">PawMatch</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {approvalStatus && (
          <div className="border-b px-4 py-3">
            <p className="mb-1 text-xs text-muted-foreground">Account Status</p>
            <ApprovalStatusBadge status={approvalStatus} />
          </div>
        )}

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

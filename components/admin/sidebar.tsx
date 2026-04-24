"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Dog,
  FileText,
  ShoppingBag,
  HelpCircle,
  Stethoscope,
  Users,
  ClipboardList,
  PawPrint,
  LogOut,
  ArrowLeft,
  Store,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/breeds", icon: Dog, label: "Breeds" },
  { href: "/admin/articles", icon: FileText, label: "Articles" },
  { href: "/admin/products", icon: ShoppingBag, label: "Products" },
  { href: "/admin/faqs", icon: HelpCircle, label: "FAQs" },
  { href: "/admin/symptoms", icon: Stethoscope, label: "Symptoms" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/vendors", icon: Store, label: "Vendors" },
  { href: "/admin/logs", icon: ClipboardList, label: "Activity Logs" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <PawPrint className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold">Admin</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

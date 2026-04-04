"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { useAuthGuard } from "@/lib/hooks/use-auth-guard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuthGuard();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Top padding on mobile to clear the fixed header bar */}
        <div className="p-4 pt-[4.5rem] lg:pt-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

"use client";

import { VendorSidebar } from "@/components/vendor/vendor-sidebar";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  const { vendor, loading } = useVendorAuthGuard();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <VendorSidebar approvalStatus={vendor?.approvalStatus} />
      <main className="flex-1 overflow-y-auto">
        <div className="px-3 py-4 pt-[4.5rem] sm:px-4 lg:px-8 lg:pt-6 lg:pb-8">{children}</div>
      </main>
    </div>
  );
}

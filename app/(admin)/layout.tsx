"use client";

import { AdminSidebar } from "@/components/admin/sidebar";
import { useAuthGuard } from "@/lib/hooks/use-auth-guard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuthGuard(true);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

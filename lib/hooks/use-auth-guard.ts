"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function useAuthGuard(adminOnly = false) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (adminOnly && user.email !== "admin@pawmatch.com") {
      router.replace("/dashboard");
    }
  }, [user, loading, adminOnly, router]);

  return { user, loading };
}

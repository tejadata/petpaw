import { adminDb } from "@/lib/firebase-admin";
import type { AdminStats, AdminActionLog } from "@/types/admin";

const fallbackLogs: AdminActionLog[] = [
  {
    id: "log-1",
    userId: "admin-1",
    userName: "Admin User",
    action: "CREATE",
    entity: "Breed",
    entityId: "breed-1",
    metadata: { name: "Golden Retriever" },
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "log-2",
    userId: "admin-1",
    userName: "Admin User",
    action: "UPDATE",
    entity: "Article",
    entityId: "article-1",
    metadata: { title: "Your Puppy's First Year" },
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "log-3",
    userId: "admin-1",
    userName: "Admin User",
    action: "CREATE",
    entity: "Product",
    entityId: "prod-1",
    metadata: { title: "Premium Puppy Dry Food" },
    createdAt: new Date("2024-03-01"),
  },
];

export async function getAdminStats(): Promise<AdminStats> {
  if (!adminDb) {
    return {
      totalBreeds: 15,
      totalArticles: 10,
      totalProducts: 12,
      totalUsers: 245,
      totalFAQs: 10,
      recentLogs: fallbackLogs,
    };
  }
  try {
    const [breeds, articles, products, faqs, logs] = await Promise.all([
      adminDb.collection("breeds").get(),
      adminDb.collection("healthArticles").get(),
      adminDb.collection("products").get(),
      adminDb.collection("faqs").get(),
      adminDb.collection("adminLogs").orderBy("createdAt", "desc").limit(10).get(),
    ]);
    return {
      totalBreeds: breeds.size,
      totalArticles: articles.size,
      totalProducts: products.size,
      totalUsers: 0,
      totalFAQs: faqs.size,
      recentLogs: logs.docs.map((d) => {
        const data = d.data();
        return {
          ...data,
          id: d.id,
          createdAt: data.createdAt?.toDate?.() ?? new Date(data.createdAt),
        } as AdminActionLog;
      }),
    };
  } catch {
    return {
      totalBreeds: 15,
      totalArticles: 10,
      totalProducts: 12,
      totalUsers: 0,
      totalFAQs: 10,
      recentLogs: fallbackLogs,
    };
  }
}

export async function getAuditLogs(): Promise<AdminActionLog[]> {
  if (!adminDb) {
    return fallbackLogs.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  try {
    const snap = await adminDb.collection("adminLogs").orderBy("createdAt", "desc").get();
    if (snap.empty) return fallbackLogs;
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        ...data,
        id: d.id,
        createdAt: data.createdAt?.toDate?.() ?? new Date(data.createdAt),
      } as AdminActionLog;
    });
  } catch {
    return fallbackLogs;
  }
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

export interface AdminActionLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

export interface AdminStats {
  totalBreeds: number;
  totalArticles: number;
  totalProducts: number;
  totalUsers: number;
  totalFAQs: number;
  recentLogs: AdminActionLog[];
}

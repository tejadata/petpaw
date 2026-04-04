export interface HealthCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  order: number;
}

export interface HealthArticle {
  id: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  ageGroup: "Puppy" | "Adult" | "Senior" | "All";
  vetReviewed: boolean;
  publishedAt: Date;
  featured: boolean;
}

export interface Symptom {
  id: string;
  name: string;
  slug: string;
  description: string;
  severity: "Mild" | "Moderate" | "Severe" | "Emergency";
}

export interface SymptomWarningResult {
  severity: "Mild" | "Moderate" | "Severe" | "Emergency";
  isEmergency: boolean;
  warningMessage: string;
  guidance: string;
  selectedSymptoms: Symptom[];
}

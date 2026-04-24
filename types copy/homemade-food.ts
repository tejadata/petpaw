export interface HomemadeFoodIngredient {
  name: string;
  grams: number;
  notes?: string;
}

export interface HomemadeFoodNutritionEstimate {
  servingSizeGrams: number;
  caloriesKcal: number;
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
  fiberGrams: number;
  moistureGrams: number;
}

export interface HomemadeFoodArticle {
  id: string;
  title: string;
  slug: string;
  dietType: "Veg" | "Non-Veg";
  ageGroup: "Puppy" | "Middle Age" | "Senior";
  excerpt: string;
  ingredients: HomemadeFoodIngredient[];
  servings: number;
  nutritionEstimate: HomemadeFoodNutritionEstimate;
  prepNotes: string[];
  content: string;
  publishedAt: Date;
  featured: boolean;
}

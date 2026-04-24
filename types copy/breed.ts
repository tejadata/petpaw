export interface Breed {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  temperament: string[];
  sizeCategory: "Small" | "Medium" | "Large" | "Giant";
  exerciseNeeds: number; // 1-5
  trainability: number; // 1-5
  groomingNeeds: number; // 1-5
  sheddingLevel: number; // 1-5
  barkingTendency: number; // 1-5
  lifespanMin: number;
  lifespanMax: number;
  healthConsiderations: string;
  familyFriendliness: number; // 1-5
  apartmentSuitability: number; // 1-5
  firstTimeOwnerSuitability: number; // 1-5
  climateSuitability: string[];
  estimatedMonthlyCost: number;
  weightMin: number; // lbs
  weightMax: number; // lbs
  coatType: string; // "short" | "long" | "double" | "wire" | "curly" | "hairless"
  goodWithOtherDogs: number; // 1-5
  separationAnxiety: number; // 1-5
  breedGroup: string; // AKC group
  idealOwnerProfile: string;
  adoptionNotes: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BreedWithScore extends Breed {
  score: number;
  explanation: string;
}

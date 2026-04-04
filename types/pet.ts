export type PetGender = "Male" | "Female";
export type ActivityLevel = "Low" | "Moderate" | "High" | "Very High";

export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: string; // Dog, Cat, Bird, etc.
  breed: string | null;
  dateOfBirth: Date | null;
  age: number | null; // derived or manually entered
  gender: PetGender | null;
  weight: number | null; // in lbs
  color: string | null;
  profileImageUrl: string | null;
  profileImagePath: string | null; // Firebase Storage path for deletion
  isNeuteredOrSpayed: boolean;
  allergies: string | null;
  medicalConditions: string | null;
  medications: string | null;
  feedingNotes: string | null;
  activityLevel: ActivityLevel | null;
  emergencyContact: string | null;
  createdAt: Date;
  updatedAt: Date;
}

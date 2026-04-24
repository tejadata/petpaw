export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export interface DogProfile {
  id: string;
  userId: string;
  name: string;
  breedId: string | null;
  breedName: string | null;
  age: number | null;
  sex: "Male" | "Female" | null;
  weight: number | null;
  neuteredSpayed: boolean;
  activityLevel: string | null;
  foodNotes: string | null;
  healthNotes: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

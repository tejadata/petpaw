import type { Breed } from "@/types/breed";
import type { QuizAnswers } from "@/types/quiz";

interface TraitScore {
  trait: string;
  weight: number;
  score: number;
}

interface ScoredResult {
  breed: Breed;
  totalScore: number;
  traitScores: TraitScore[];
}

/**
 * Score breeds based on quiz answers.
 * Returns breeds sorted by match quality (highest score first).
 * Scores are 0-100 where 100 is a perfect match.
 */
export function scoreBreeds(answers: QuizAnswers, breeds: Breed[]): ScoredResult[] {
  return breeds
    .map((breed) => {
      const traitScores = calculateTraitScores(answers, breed);
      const totalWeight = traitScores.reduce((sum, t) => sum + t.weight, 0);
      const weightedSum = traitScores.reduce((sum, t) => sum + t.score * t.weight, 0);
      const totalScore = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) : 50;

      return { breed, totalScore, traitScores };
    })
    .sort((a, b) => b.totalScore - a.totalScore);
}

function calculateTraitScores(answers: QuizAnswers, breed: Breed): TraitScore[] {
  const scores: TraitScore[] = [];

  // Living space → apartment suitability
  if (answers.livingSpace) {
    const target = answers.livingSpace === "apartment" ? 5 : answers.livingSpace === "house-small" ? 3 : 1;
    scores.push({
      trait: "apartmentSuitability",
      weight: 1.5,
      score: 1 - Math.abs(target - breed.apartmentSuitability) / 4,
    });
  }

  // Activity level → exercise needs
  if (answers.activityLevel) {
    const map: Record<string, number> = { sedentary: 1, moderate: 2.5, active: 4, "very-active": 5 };
    const target = map[answers.activityLevel] ?? 3;
    scores.push({
      trait: "exerciseNeeds",
      weight: 2,
      score: 1 - Math.abs(target - breed.exerciseNeeds) / 4,
    });
  }

  // Experience → first-time owner suitability
  if (answers.experience) {
    const map: Record<string, number> = { "first-time": 5, some: 3, experienced: 1 };
    const target = map[answers.experience] ?? 3;
    scores.push({
      trait: "firstTimeOwnerSuitability",
      weight: 1.5,
      score: 1 - Math.abs(target - breed.firstTimeOwnerSuitability) / 4,
    });
  }

  // Family with kids → family friendliness
  if (answers.familyKids) {
    const map: Record<string, number> = { "no-kids": 2, "older-kids": 4, "young-kids": 5, toddlers: 5 };
    const target = map[answers.familyKids] ?? 3;
    scores.push({
      trait: "familyFriendliness",
      weight: answers.familyKids === "no-kids" ? 0.5 : 2,
      score: 1 - Math.abs(target - breed.familyFriendliness) / 4,
    });
  }

  // Time available → exercise needs (secondary)
  if (answers.timeAvailable) {
    const map: Record<string, number> = { minimal: 1, moderate: 2.5, plenty: 4, extensive: 5 };
    const target = map[answers.timeAvailable] ?? 3;
    scores.push({
      trait: "timeForExercise",
      weight: 1.5,
      score: 1 - Math.abs(target - breed.exerciseNeeds) / 4,
    });
  }

  // Grooming tolerance → grooming needs
  if (answers.groomingTolerance) {
    const map: Record<string, number> = { minimal: 1, moderate: 3, extensive: 5 };
    const target = map[answers.groomingTolerance] ?? 3;
    scores.push({
      trait: "groomingNeeds",
      weight: 1,
      score: 1 - Math.abs(target - breed.groomingNeeds) / 4,
    });
  }

  // Climate
  if (answers.climate) {
    const climateMap: Record<string, string> = { cold: "Cold", temperate: "Temperate", hot: "Hot" };
    const userClimate = climateMap[answers.climate] ?? "Temperate";
    const match = breed.climateSuitability.includes(userClimate) || breed.climateSuitability.includes("Any");
    scores.push({
      trait: "climateSuitability",
      weight: 1,
      score: match ? 1 : 0.2,
    });
  }

  // Budget → estimated monthly cost
  if (answers.budget) {
    const budgetMax: Record<string, number> = { low: 100, moderate: 150, comfortable: 200, flexible: 999 };
    const max = budgetMax[answers.budget] ?? 150;
    scores.push({
      trait: "budget",
      weight: 1,
      score: breed.estimatedMonthlyCost <= max ? 1 : Math.max(0, 1 - (breed.estimatedMonthlyCost - max) / 100),
    });
  }

  // Size preference
  if (answers.sizePreference && answers.sizePreference !== "no-preference") {
    const sizeMap: Record<string, string> = { small: "Small", medium: "Medium", large: "Large", giant: "Giant" };
    const match = breed.sizeCategory === sizeMap[answers.sizePreference];
    scores.push({
      trait: "sizePreference",
      weight: 1.5,
      score: match ? 1 : 0.3,
    });
  }

  // Barking tolerance
  if (answers.barkingTolerance) {
    const map: Record<string, number> = { quiet: 1, some: 3, "doesnt-matter": 5 };
    const target = map[answers.barkingTolerance] ?? 3;
    scores.push({
      trait: "barkingTendency",
      weight: 1,
      score: 1 - Math.max(0, breed.barkingTendency - target) / 4,
    });
  }

  // Trainability preference
  if (answers.trainabilityPreference) {
    const map: Record<string, number> = { "very-important": 5, somewhat: 3, "not-important": 1 };
    const target = map[answers.trainabilityPreference] ?? 3;
    scores.push({
      trait: "trainability",
      weight: 1,
      score: 1 - Math.abs(target - breed.trainability) / 4,
    });
  }

  // Shedding tolerance
  if (answers.sheddingTolerance) {
    const map: Record<string, number> = { none: 1, some: 3, lots: 5 };
    const target = map[answers.sheddingTolerance] ?? 3;
    scores.push({
      trait: "sheddingLevel",
      weight: 1,
      score: 1 - Math.max(0, breed.sheddingLevel - target) / 4,
    });
  }

  // Guard dog preference → barking + trainability + family friendliness combo
  if (answers.guardDog) {
    const wantsGuard = answers.guardDog === "yes" ? 1 : answers.guardDog === "somewhat" ? 0.6 : 0;
    const breedGuardScore = (breed.barkingTendency + (5 - breed.familyFriendliness)) / 10;
    scores.push({
      trait: "guardDog",
      weight: 0.8,
      score: 1 - Math.abs(wantsGuard - breedGuardScore),
    });
  }

  // Companion dog preference → family friendliness + low-exercise correlation
  if (answers.companionDog) {
    const map: Record<string, number> = { velcro: 5, balanced: 3, independent: 1 };
    const target = map[answers.companionDog] ?? 3;
    scores.push({
      trait: "companionDog",
      weight: 0.8,
      score: 1 - Math.abs(target - breed.familyFriendliness) / 4,
    });
  }

  // Clamp all scores between 0 and 1
  return scores.map((s) => ({
    ...s,
    score: Math.max(0, Math.min(1, s.score)),
  }));
}

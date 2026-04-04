import type { Breed } from "@/types/breed";
import type { QuizAnswers } from "@/types/quiz";

/**
 * Generate a natural-language explanation for why a breed matches the user's answers.
 */
export function generateExplanation(breed: Breed, answers: QuizAnswers, score: number): string {
  const points: string[] = [];

  // Living space
  if (answers.livingSpace === "apartment" && breed.apartmentSuitability >= 4) {
    points.push(`${breed.name} adapts well to apartment living`);
  } else if (answers.livingSpace !== "apartment" && breed.exerciseNeeds >= 4) {
    points.push(`${breed.name} will thrive with the space you have for outdoor activity`);
  }

  // Activity level
  if (answers.activityLevel === "active" || answers.activityLevel === "very-active") {
    if (breed.exerciseNeeds >= 4) {
      points.push("their high energy level matches your active lifestyle");
    }
  } else if (answers.activityLevel === "sedentary" || answers.activityLevel === "moderate") {
    if (breed.exerciseNeeds <= 3) {
      points.push("their moderate exercise needs fit your daily routine");
    }
  }

  // Experience
  if (answers.experience === "first-time" && breed.firstTimeOwnerSuitability >= 4) {
    points.push("they are an excellent choice for first-time dog owners");
  }

  // Family
  if (answers.familyKids !== "no-kids" && breed.familyFriendliness >= 4) {
    points.push("they are known for being great with children");
  }

  // Grooming
  if (answers.groomingTolerance === "minimal" && breed.groomingNeeds <= 2) {
    points.push("they have low grooming requirements");
  } else if (answers.groomingTolerance === "extensive" && breed.groomingNeeds >= 4) {
    points.push("you'll enjoy the grooming bond — they need regular coat care");
  }

  // Shedding
  if (answers.sheddingTolerance === "none" && breed.sheddingLevel <= 2) {
    points.push("they shed very little, which suits your preference");
  }

  // Training
  if (answers.trainabilityPreference === "very-important" && breed.trainability >= 4) {
    points.push("they are highly trainable and eager to learn");
  }

  // Size
  if (answers.sizePreference && answers.sizePreference !== "no-preference") {
    const sizeMap: Record<string, string> = { small: "Small", medium: "Medium", large: "Large", giant: "Giant" };
    if (breed.sizeCategory === sizeMap[answers.sizePreference]) {
      points.push(`their ${breed.sizeCategory.toLowerCase()} size is exactly what you're looking for`);
    }
  }

  // Climate
  if (answers.climate) {
    const climateMap: Record<string, string> = { cold: "Cold", temperate: "Temperate", hot: "Hot" };
    if (breed.climateSuitability.includes(climateMap[answers.climate])) {
      points.push(`they are well-suited to your ${answers.climate} climate`);
    }
  }

  // Barking
  if (answers.barkingTolerance === "quiet" && breed.barkingTendency <= 2) {
    points.push("they tend to be quiet, which is important to you");
  }

  // Budget
  if (answers.budget === "low" && breed.estimatedMonthlyCost <= 100) {
    points.push("their care costs fit within your budget");
  }

  // Build the explanation
  if (points.length === 0) {
    return `${breed.name} is a ${score}% match based on your preferences. While not a perfect match on every criterion, they may still be worth considering for their unique qualities.`;
  }

  const intro = score >= 80
    ? `${breed.name} is a strong match for you!`
    : score >= 60
      ? `${breed.name} is a good match for your lifestyle.`
      : `${breed.name} could work for you with some considerations.`;

  const details = points.length === 1
    ? points[0]
    : points.slice(0, -1).join(", ") + ", and " + points[points.length - 1];

  return `${intro} Specifically, ${details}.`;
}

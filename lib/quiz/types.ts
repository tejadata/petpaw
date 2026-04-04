export interface QuizTraitMapping {
  trait: string;
  answerMap: Record<string, number>;
  weight: number;
}

export interface ScoredBreed {
  breedId: string;
  score: number;
  traitScores: Record<string, number>;
}

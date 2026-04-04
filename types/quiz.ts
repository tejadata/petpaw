export interface QuizQuestion {
  id: string;
  questionText: string;
  description?: string;
  options: QuizOption[];
  trait: string;
}

export interface QuizOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface QuizAnswers {
  [questionId: string]: string;
}

export interface QuizResult {
  breed: import("./breed").Breed;
  score: number;
  explanation: string;
  rank: number;
}

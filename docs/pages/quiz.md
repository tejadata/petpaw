# Quiz Module

## Purpose

A 12+ question breed matching quiz that helps users find dog breeds suited to their lifestyle, living situation, and preferences. Uses a scoring engine to rank all breeds and present personalized recommendations.

## Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/quiz` | `app/(public)/quiz/page.tsx` | Server | Quiz landing/intro page |
| `/quiz/questions` | `app/(public)/quiz/questions/page.tsx` | Client | Interactive quiz form |
| `/quiz/results` | `app/(public)/quiz/results/page.tsx` | Client | Scored breed recommendations |

## Key Files

| File | Purpose |
|---|---|
| `app/(public)/quiz/page.tsx` | Landing page with metadata |
| `app/(public)/quiz/questions/page.tsx` | Question flow UI |
| `app/(public)/quiz/results/page.tsx` | Results display |
| `lib/quiz/engine.ts` | `scoreBreeds()` — scoring algorithm |
| `lib/quiz/explanations.ts` | `generateExplanation()` — human-readable match reasons |
| `lib/quiz/types.ts` | `QuizTraitMapping`, `ScoredBreed` interfaces |
| `lib/datasets/quiz-questions.ts` | Question definitions (12+ questions) |
| `lib/validations/quiz.ts` | `quizAnswersSchema` (14 answer fields) |
| `types/quiz.ts` | `QuizQuestion`, `QuizOption`, `QuizAnswers`, `QuizResult` |
| `components/quiz/recommendation-card.tsx` | Result card component |

## Components Used

- `RecommendationCard` — displays a breed match with score, image, key traits, and explanation

## Data Sources

- **Questions:** `lib/datasets/quiz-questions.ts` → 12+ questions with pre-defined options
- **Breeds:** `lib/datasets/breeds.ts` → all 29 breeds scored against answers
- **Scoring:** `lib/quiz/engine.ts` → `scoreBreeds(answers, breeds)` returns breeds scored 0–100

## How the Quiz Works

1. **Landing page** (`/quiz`) explains the quiz and invites user to start
2. **Questions page** (`/quiz/questions`) presents questions one at a time:
   - Living space, exercise availability, grooming tolerance
   - Experience level, family situation, climate
   - Budget, size preference, energy preference
   - Each answer maps to breed trait weights
3. **Results page** (`/quiz/results`) shows top scored breeds:
   - `scoreBreeds()` compares answers against each breed's traits
   - Each trait mismatch reduces the breed's score
   - Top matches get `generateExplanation()` text
   - Results display as ranked `RecommendationCard` components

## Scoring Algorithm

`scoreBreeds()` in `lib/quiz/engine.ts`:
- Starts each breed at 100 points
- For each quiz trait mapping, compares user answer to breed value
- Penalizes mismatches proportionally (larger difference = bigger penalty)
- Returns `ScoredBreed[]` sorted by score descending

## User Flow

1. `/quiz` → Read intro, click "Start Quiz"
2. `/quiz/questions` → Answer 12+ questions sequentially
3. `/quiz/results` → View ranked breed matches with scores and explanations
4. Click a breed → navigate to `/breeds/[slug]` for full details

## How to Edit

| Change | File |
|---|---|
| Add/edit quiz questions | `lib/datasets/quiz-questions.ts` |
| Change scoring algorithm | `lib/quiz/engine.ts` → `scoreBreeds()` |
| Change match explanations | `lib/quiz/explanations.ts` → `generateExplanation()` |
| Change result card design | `components/quiz/recommendation-card.tsx` |
| Change quiz validation | `lib/validations/quiz.ts` → `quizAnswersSchema` |
| Change quiz landing page | `app/(public)/quiz/page.tsx` |
| Change quiz question UI | `app/(public)/quiz/questions/page.tsx` |
| Change results page | `app/(public)/quiz/results/page.tsx` |

## Notes

- Quiz data is passed between pages via URL search params or client state
- No authentication required — quiz is fully public
- Quiz results are not saved to Firestore (could be enhanced)
- Adding a new breed to `lib/datasets/breeds.ts` automatically includes it in quiz scoring

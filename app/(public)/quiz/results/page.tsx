"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getBreeds } from "@/lib/data/breeds";
import { scoreBreeds } from "@/lib/quiz/engine";
import { generateExplanation } from "@/lib/quiz/explanations";
import { Container } from "@/components/layout/container";
import { RecommendationCard } from "@/components/quiz/recommendation-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { RotateCcw, Heart } from "lucide-react";
import type { QuizAnswers } from "@/types/quiz";
import type { BreedWithScore } from "@/types/breed";

export default function QuizResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<BreedWithScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const answers: QuizAnswers = {};
    searchParams.forEach((value, key) => {
      if (value) answers[key] = value;
    });

    if (Object.keys(answers).length === 0) {
      router.replace("/quiz");
      return;
    }

    getBreeds().then((breeds) => {
      const scored = scoreBreeds(answers, breeds);
      const top: BreedWithScore[] = scored.slice(0, 5).map((s) => ({
        ...s.breed,
        score: s.totalScore,
        explanation: generateExplanation(s.breed, answers, s.totalScore),
      }));
      setResults(top);
      setLoading(false);
    });
  }, [searchParams, router]);

  if (loading) {
    return (
      <Container className="py-16 sm:py-20">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Your Top Breed Matches
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Based on your answers, here are the breeds most compatible with your lifestyle.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {results.map((breed, i) => (
            <RecommendationCard key={breed.id} breed={breed} rank={i + 1} />
          ))}
        </div>

        <Card className="mt-10">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              These recommendations are based on general breed characteristics. Individual dogs
              may vary. We recommend meeting a dog before making your decision.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline" className="gap-1">
            <Link href="/quiz/questions">
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </Link>
          </Button>
          <Button asChild>
            <Link href="/breeds">Explore All Breeds</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}

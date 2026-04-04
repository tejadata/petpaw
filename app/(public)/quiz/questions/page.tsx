"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/lib/datasets/quiz-questions";
import type { QuizAnswers } from "@/types/quiz";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function QuizQuestionsPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const question = quizQuestions[current];
  const total = quizQuestions.length;
  const progress = ((current + 1) / total) * 100;
  const currentAnswer = answers[question.id];

  function selectAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function next() {
    if (current < total - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      // Submit — encode answers in URL search params
      const params = new URLSearchParams();
      Object.entries(answers).forEach(([k, v]) => params.set(k, v));
      router.push(`/quiz/results?${params.toString()}`);
    }
  }

  function prev() {
    if (current > 0) setCurrent((prev) => prev - 1);
  }

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Question {current + 1} of {total}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="mt-2" />
        </div>

        {/* Question */}
        <h1 className="text-2xl font-bold">{question.questionText}</h1>
        {question.description && (
          <p className="mt-2 text-muted-foreground">{question.description}</p>
        )}

        {/* Options */}
        <div className="mt-6 grid gap-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => selectAnswer(option.value)}
              className={`w-full rounded-lg border p-4 text-left transition-all ${
                currentAnswer === option.value
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <p className="font-medium">{option.label}</p>
              {option.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {option.description}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prev}
            disabled={current === 0}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={next}
            disabled={!currentAnswer}
            className="gap-1"
          >
            {current === total - 1 ? "See Results" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Container>
  );
}

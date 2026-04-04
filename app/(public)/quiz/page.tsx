import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ClipboardCheck, Clock, PawPrint, Sparkles } from "lucide-react";

export const metadata = createMetadata({
  title: "Breed Quiz",
  description:
    "Take our free breed recommendation quiz. Answer 14 questions about your lifestyle and we'll match you with compatible dog breeds.",
  path: "/quiz",
});

export default function QuizLandingPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <PawPrint className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          Find Your Perfect Dog Breed
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Answer a few questions about your lifestyle, living situation, and preferences. Our
          recommendation engine will match you with breeds that are truly compatible with your life.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
          {[
            {
              icon: ClipboardCheck,
              title: "14 Questions",
              description: "Covering lifestyle, space, experience, family, budget, and preferences",
            },
            {
              icon: Clock,
              title: "5 Minutes",
              description: "Quick and easy — no account required to take the quiz",
            },
            {
              icon: Sparkles,
              title: "Personalized Results",
              description: "Scored recommendations with explanations for each breed match",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-5">
                <item.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button asChild size="lg" className="mt-10">
          <Link href="/quiz/questions">Start the Quiz</Link>
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          Free • No account required • Results in seconds
        </p>
      </div>
    </Container>
  );
}

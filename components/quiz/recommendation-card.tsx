import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PawPrint } from "lucide-react";
import type { BreedWithScore } from "@/types/breed";

interface RecommendationCardProps {
  breed: BreedWithScore;
  rank: number;
}

export function RecommendationCard({ breed, rank }: RecommendationCardProps) {
  const scoreColor =
    breed.score >= 80
      ? "text-success"
      : breed.score >= 60
        ? "text-primary"
        : "text-warning";

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 aspect-square sm:aspect-auto bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center shrink-0">
          <div className="text-center">
            <span className="text-4xl font-bold text-primary/30">#{rank}</span>
            <PawPrint className="h-10 w-10 text-primary/20 mx-auto mt-2" />
          </div>
        </div>
        <CardContent className="p-5 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">{breed.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{breed.sizeCategory}</Badge>
                <span className="text-sm text-muted-foreground">
                  {breed.lifespanMin}–{breed.lifespanMax} years lifespan
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className={`text-3xl font-bold ${scoreColor}`}>{breed.score}%</span>
              <p className="text-xs text-muted-foreground">match</p>
            </div>
          </div>

          <div className="mt-3">
            <Progress value={breed.score} className="h-2" />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{breed.explanation}</p>

          <div className="mt-4">
            <Link
              href={`/breeds/${breed.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View full breed profile →
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Baby, Heart, Clock, Shield, Apple, Dumbbell, Scissors, Smile, Brain } from "lucide-react";
import type { HealthCategory } from "@/types/health";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Baby,
  Heart,
  Clock,
  Shield,
  Apple,
  Dumbbell,
  Scissors,
  Smile,
  Brain,
};

interface HealthCategoryCardProps {
  category: HealthCategory;
  articleCount?: number;
}

export function HealthCategoryCard({ category, articleCount }: HealthCategoryCardProps) {
  const Icon = iconMap[category.iconName] ?? Heart;

  return (
    <Link href={`/health/category/${category.slug}`}>
      <Card className="transition-all hover:shadow-lg hover:-translate-y-1 group h-full">
        <CardContent className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold group-hover:text-primary transition-colors">{category.name}</h3>
          {articleCount !== undefined && articleCount > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">{articleCount} {articleCount === 1 ? 'article' : 'articles'}</p>
          )}
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

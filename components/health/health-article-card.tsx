import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { FileText, Shield } from "lucide-react";
import type { HealthArticle } from "@/types/health";

interface HealthArticleCardProps {
  article: HealthArticle;
}

export function HealthArticleCard({ article }: HealthArticleCardProps) {
  const hasImage = article.imageUrl && !article.imageUrl.includes("placeholder");

  return (
    <Link href={`/health/${article.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 group h-full">
        <div className="aspect-video bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center relative overflow-hidden">
          {hasImage ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <FileText className="h-12 w-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
          )}
        </div>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">{article.categoryName}</Badge>
            {article.ageGroup !== "All" && (
              <Badge variant="outline" className="text-xs">{article.ageGroup}</Badge>
            )}
            {article.vetReviewed && (
              <Badge variant="success" className="text-xs flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Vet Reviewed
              </Badge>
            )}
          </div>
          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
          <p className="mt-3 text-xs text-muted-foreground">{formatDate(article.publishedAt)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

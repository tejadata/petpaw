import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Soup } from "lucide-react";
import type { HomemadeFoodArticle } from "@/types/homemade-food";

interface HomemadeFoodArticleCardProps {
  article: HomemadeFoodArticle;
}

export function HomemadeFoodArticleCard({ article }: HomemadeFoodArticleCardProps) {
  return (
    <Link href={`/homemade-food/${article.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 group h-full">
        <div className="aspect-video bg-gradient-to-br from-success/10 to-warning/10 flex items-center justify-center">
          <Soup className="h-12 w-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
        </div>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={article.dietType === "Veg" ? "secondary" : "outline"} className="text-xs">
              {article.dietType}
            </Badge>
            <Badge variant="outline" className="text-xs">{article.ageGroup}</Badge>
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

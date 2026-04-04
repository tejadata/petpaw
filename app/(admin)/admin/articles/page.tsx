import { getHealthArticles } from "@/lib/data/health";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, CheckCircle } from "lucide-react";

export default async function AdminArticlesPage() {
  const articles = await getHealthArticles();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="mt-1 text-muted-foreground">
            Manage health articles ({articles.length} articles).
          </p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add Article
        </Button>
      </div>

      <Card className="mt-8">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Age Group</th>
                  <th className="px-4 py-3 text-left font-medium">Vet Reviewed</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/health/${article.slug}`}
                        className="font-medium hover:underline"
                      >
                        {article.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{article.categoryName}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{article.ageGroup}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {article.vetReviewed && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

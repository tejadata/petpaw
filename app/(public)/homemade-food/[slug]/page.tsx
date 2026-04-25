import { notFound } from "next/navigation";
import {
  getHomemadeFoodArticleBySlug,
  getHomemadeFoodArticles,
} from "@/lib/data/homemade-food";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/shared/json-ld";
import { foodArticleSchema, breadcrumbSchema } from "@/lib/schema";
import { APP_URL } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { HomemadeFoodArticleContent } from "@/components/homemade-food/homemade-food-article-content";
import Link from "next/link";
import { ArrowLeft, Calendar, Scale, ClipboardList } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getHomemadeFoodArticleBySlug(slug);
  if (!article) return {};
  return createMetadata({
    title: `${article.title} — Homemade Dog Food India`,
    description: article.excerpt,
    path: `/homemade-food/${article.slug}`,
    type: "article",
    publishedTime:
      article.publishedAt instanceof Date
        ? article.publishedAt.toISOString()
        : new Date(article.publishedAt).toISOString(),
    keywords: [
      "homemade dog food India",
      `${article.dietType === "Veg" ? "vegetarian" : "non-vegetarian"} dog food`,
      `dog food for ${article.ageGroup.toLowerCase()}`,
      "dog nutrition India",
    ],
  });
}

export async function generateStaticParams() {
  const articles = await getHomemadeFoodArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function HomemadeFoodArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getHomemadeFoodArticleBySlug(slug);
  if (!article) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <JsonLd schema={foodArticleSchema(article)} />
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: APP_URL },
        { name: "Homemade Food", url: `${APP_URL}/homemade-food` },
        { name: article.title, url: `${APP_URL}/homemade-food/${article.slug}` },
      ])} />
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/homemade-food" className="hover:text-foreground">Homemade Food</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium" aria-current="page">{article.title}</li>
          </ol>
        </nav>
        <Link
          href="/homemade-food"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Homemade Food
        </Link>

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={article.dietType === "Veg" ? "secondary" : "outline"}>
              {article.dietType}
            </Badge>
            <Badge variant="outline">{article.ageGroup}</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">{article.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{article.excerpt}</p>
          <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <DisclaimerBlock className="mt-8" variant="warning" />

        <Separator className="my-8" />

        <section className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-4 w-4 text-primary" />
                Ingredients ({article.servings} serving)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {article.ingredients.map((item) => (
                  <li key={item.name}>
                    <span className="font-medium text-foreground">{item.name}</span> - {item.grams} g
                    {item.notes ? ` (${item.notes})` : ""}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardList className="h-4 w-4 text-primary" />
                Nutrition Estimate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Serving Size: {article.nutritionEstimate.servingSizeGrams} g</li>
                <li>Calories: {article.nutritionEstimate.caloriesKcal} kcal</li>
                <li>Protein: {article.nutritionEstimate.proteinGrams} g</li>
                <li>Fat: {article.nutritionEstimate.fatGrams} g</li>
                <li>Carbs: {article.nutritionEstimate.carbsGrams} g</li>
                <li>Fiber: {article.nutritionEstimate.fiberGrams} g</li>
                <li>Moisture: {article.nutritionEstimate.moistureGrams} g</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {article.prepNotes.length > 0 && (
          <section className="mb-8 rounded-xl border bg-muted/30 p-5">
            <h2 className="text-lg font-semibold">Prep Notes</h2>
            <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
              {article.prepNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        )}

        <HomemadeFoodArticleContent
          slug={article.slug}
          fallbackContent={article.content || undefined}
        />
      </div>
    </Container>
  );
}

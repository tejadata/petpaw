import { notFound } from "next/navigation";
import { getHealthArticleBySlug, getHealthArticles } from "@/lib/data/health";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { Separator } from "@/components/ui/separator";
import { createMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/json-ld";
import { healthArticleSchema, breadcrumbSchema } from "@/lib/schema";
import { APP_URL } from "@/lib/constants";
import { HealthArticleContent } from "@/components/health/health-article-content";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getHealthArticleBySlug(slug);
  if (!article) return {};
  return createMetadata({
    title: `${article.title} — Dog Health Guide India`,
    description: article.excerpt,
    path: `/health/${article.slug}`,
    type: "article",
    publishedTime:
      article.publishedAt instanceof Date
        ? article.publishedAt.toISOString()
        : new Date(article.publishedAt).toISOString(),
    image: article.imageUrl || undefined,
    keywords: [article.categoryName, "dog health India", "pet care", article.ageGroup],
  });
}

export async function generateStaticParams() {
  const articles = await getHealthArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function HealthArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getHealthArticleBySlug(slug);
  if (!article) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <JsonLd schema={healthArticleSchema(article)} />
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: APP_URL },
        { name: "Health Resources", url: `${APP_URL}/health` },
        { name: article.categoryName, url: `${APP_URL}/health/category/${article.categorySlug}` },
        { name: article.title, url: `${APP_URL}/health/${article.slug}` },
      ])} />
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/health" className="hover:text-foreground">Health Resources</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/health/category/${article.categorySlug}`} className="hover:text-foreground">{article.categoryName}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium" aria-current="page">{article.title}</li>
          </ol>
        </nav>
        <Link
          href="/health"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Health Center
        </Link>

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              <Link href={`/health/category/${article.categorySlug}`}>
                {article.categoryName}
              </Link>
            </Badge>
            <Badge variant="outline">{article.ageGroup}</Badge>
            {article.vetReviewed && (
              <Badge className="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle className="h-3 w-3" />
                Vet Reviewed
              </Badge>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            {article.title}
          </h1>
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

        <DisclaimerBlock className="mt-8" />

        <Separator className="my-8" />

        <HealthArticleContent
          slug={article.slug}
          fallbackContent={article.content || undefined}
        />
      </div>
    </Container>
  );
}

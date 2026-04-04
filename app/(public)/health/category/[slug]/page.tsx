import { notFound } from "next/navigation";
import {
  getHealthCategoryBySlug,
  getArticlesByCategory,
  getHealthCategories,
} from "@/lib/data/health";
import { Container } from "@/components/layout/container";
import { HealthArticleCard } from "@/components/health/health-article-card";
import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { EmptyState } from "@/components/shared/empty-state";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cat = await getHealthCategoryBySlug(slug);
  if (!cat) return {};
  return createMetadata({
    title: cat.name,
    description: cat.description,
    path: `/health/category/${cat.slug}`,
  });
}

export async function generateStaticParams() {
  const categories = await getHealthCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function HealthCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getHealthCategoryBySlug(slug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(slug);

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/health"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Health Center
      </Link>

      <div className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{category.description}</p>
      </div>

      <DisclaimerBlock className="mt-8" />

      {articles.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <HealthArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No articles yet"
          description="We're working on adding content to this category. Check back soon!"
          className="mt-10"
        />
      )}
    </Container>
  );
}

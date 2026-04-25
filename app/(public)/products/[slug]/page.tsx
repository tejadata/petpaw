import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/data/products";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { JsonLd } from "@/components/shared/json-ld";
import { createMetadata } from "@/lib/metadata";
import { productSchema } from "@/lib/schema";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return createMetadata({
    title: product.title,
    description: product.summary,
    path: `/products/${product.slug}`,
  });
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <JsonLd schema={productSchema(product)} />
      <div className="mx-auto max-w-3xl">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{product.categoryName}</Badge>
            <Badge variant="outline">{product.ageSuitability}</Badge>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border bg-muted">
            <Image
              src={product.imageUrl}
              alt={`${product.title} product image`}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {product.title}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <RatingStars rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating}/5
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-2xl font-bold text-primary">
            <span className="text-xl">₹</span>
            {product.price.toLocaleString("en-IN")}
          </div>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {product.summary}
          </p>
        </div>

        <Separator className="my-8" />

        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold text-green-700 dark:text-green-400">
                Pros
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    {pro}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold text-red-700 dark:text-red-400">
                Cons
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    {con}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <section>
          <h2 className="text-xl font-bold">Suitability</h2>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm font-medium">Breeds</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {product.breedSuitability.map((b) => (
                  <Badge key={b} variant="outline">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Sizes</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {product.sizeSuitability.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <p className="mt-12 text-sm text-muted-foreground">
          Product recommendations may include affiliate links. This does not
          affect our editorial selections.
        </p>
      </div>
    </Container>
  );
}

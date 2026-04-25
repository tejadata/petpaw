/**
 * Reusable JSON-LD schema builders.
 * All builders return plain objects that get serialised by <JsonLd />.
 *
 * Because schema data is passed into Server Components rendered at
 * build time, structured data appears in the static HTML — no JS
 * execution required for Googlebot.
 */

import {
  APP_NAME,
  APP_URL,
  APP_DESCRIPTION,
  APP_OG_IMAGE,
  APP_CONTACT_EMAIL,
} from "@/lib/constants";
import type { HealthArticle } from "@/types/health";
import type { HomemadeFoodArticle } from "@/types/homemade-food";
import type { Breed } from "@/types/breed";
import type { FAQ } from "@/types/admin";
import type { Product } from "@/types/product";

type SchemaBase = Record<string, unknown>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toISOString(d: Date | string): string {
  return d instanceof Date ? d.toISOString() : new Date(d).toISOString();
}

// ─── Organization ─────────────────────────────────────────────────────────────

export function organizationSchema(): SchemaBase {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: APP_URL,
    logo: { "@type": "ImageObject", url: `${APP_URL}/favicon.svg` },
    image: { "@type": "ImageObject", url: APP_OG_IMAGE },
    description: APP_DESCRIPTION,
    email: APP_CONTACT_EMAIL,
    address: { "@type": "PostalAddress", addressCountry: "IN" },
  };
}

// ─── WebSite (enables Google Sitelinks Searchbox) ────────────────────────────

export function websiteSchema(): SchemaBase {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: APP_URL,
    description: APP_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${APP_URL}/breeds?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): SchemaBase {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Article — health articles ────────────────────────────────────────────────

export function healthArticleSchema(article: HealthArticle): SchemaBase {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    ...(article.imageUrl && {
      image: [{ "@type": "ImageObject", url: article.imageUrl }],
    }),
    datePublished: toISOString(article.publishedAt),
    dateModified: toISOString(article.publishedAt),
    author: { "@type": "Organization", name: APP_NAME, url: APP_URL },
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      url: APP_URL,
      logo: { "@type": "ImageObject", url: `${APP_URL}/favicon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${APP_URL}/health/${article.slug}`,
    },
    keywords: [article.categoryName, "dog health India", "pet care", article.ageGroup],
    ...(article.vetReviewed && {
      reviewedBy: { "@type": "Organization", name: "Veterinary Review Team" },
    }),
  };
}

// ─── Article — homemade food articles ────────────────────────────────────────

export function foodArticleSchema(article: HomemadeFoodArticle): SchemaBase {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: toISOString(article.publishedAt),
    dateModified: toISOString(article.publishedAt),
    author: { "@type": "Organization", name: APP_NAME, url: APP_URL },
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      url: APP_URL,
      logo: { "@type": "ImageObject", url: `${APP_URL}/favicon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${APP_URL}/homemade-food/${article.slug}`,
    },
    keywords: [
      "homemade dog food India",
      `dog food for ${article.ageGroup.toLowerCase()}`,
      article.dietType === "Veg" ? "vegetarian dog food" : "non-vegetarian dog food",
      "dog nutrition India",
    ],
  };
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────

export function faqPageSchema(faqs: FAQ[]): SchemaBase {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

// ─── Breed page ───────────────────────────────────────────────────────────────

export function breedPageSchema(breed: Breed): SchemaBase {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${breed.name} Dog Breed — Complete Guide for India`,
    description: breed.description.slice(0, 300),
    ...(breed.imageUrl && {
      image: [{ "@type": "ImageObject", url: breed.imageUrl }],
    }),
    datePublished: toISOString(breed.createdAt),
    dateModified: toISOString(breed.updatedAt),
    author: { "@type": "Organization", name: APP_NAME, url: APP_URL },
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      url: APP_URL,
      logo: { "@type": "ImageObject", url: `${APP_URL}/favicon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${APP_URL}/breeds/${breed.slug}`,
    },
    keywords: [
      `${breed.name} dog`,
      `${breed.name} breed India`,
      `${breed.name} price India`,
      `${breed.name} temperament`,
      `${breed.breedGroup} dog breed`,
    ],
    about: {
      "@type": "Thing",
      name: breed.name,
      description: breed.description.slice(0, 300),
    },
  };
}

export function productSchema(product: Product): SchemaBase {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    image: [{ "@type": "ImageObject", url: product.imageUrl }],
    sku: product.id,
    brand: {
      "@type": "Organization",
      name: APP_NAME,
      url: APP_URL,
    },
    offers: {
      "@type": "Offer",
      url: `${APP_URL}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      reviewCount: 12,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${APP_URL}/products/${product.slug}`,
    },
    category: product.categoryName,
    additionalProperty: product.sizeSuitability.map((size) => ({
      "@type": "PropertyValue",
      name: "Suitable size",
      value: size,
    })),
  };
}

// ─── ItemList ─────────────────────────────────────────────────────────────────

export interface ItemListEntry {
  name: string;
  url: string;
  position: number;
  description?: string;
  image?: string;
}

export function itemListSchema(
  name: string,
  description: string,
  items: ItemListEntry[]
): SchemaBase {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
      ...(item.description && { description: item.description }),
      ...(item.image && { image: { "@type": "ImageObject", url: item.image } }),
    })),
  };
}

/**
 * Reusable JSON-LD structured data component.
 * Renders a <script type="application/ld+json"> block into the page.
 *
 * Because this is a Server Component (no "use client"), the JSON-LD
 * is embedded directly in the static HTML at build time — Googlebot
 * reads it without executing JavaScript.
 *
 * Usage:
 *   import { JsonLd } from "@/components/shared/json-ld";
 *   import { breadcrumbSchema } from "@/lib/schema";
 *   ...
 *   <JsonLd schema={breadcrumbSchema([...])} />
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

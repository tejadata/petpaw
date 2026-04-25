/**
 * Generates robots.txt at build time for static export.
 * Output: out/robots.txt
 */
import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/dashboard/", "/vendor/", "/api/", "/quiz/questions", "/quiz/results"],
      },
    ],
    host: APP_URL,
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}

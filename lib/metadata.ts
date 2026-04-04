import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION, APP_URL } from "./constants";

type MetadataParams = {
  /**
   * Bare page title. The root layout template "%s | PawMatch" appends the
   * site name automatically — do NOT include "| PawMatch" here.
   * Leave undefined on the homepage (it sets its own absolute title).
   */
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  /** Set to "article" for health and homemade-food article pages. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description = APP_DESCRIPTION,
  path = "",
  image = "/og-image.png",
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
}: MetadataParams = {}): Metadata {
  const url = `${APP_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${APP_URL}${image}`;

  return {
    // Pass the bare title — root layout template handles "Title | PawMatch"
    title: title ?? undefined,
    description,
    keywords,
    openGraph: {
      title: title ?? APP_NAME,
      description,
      url,
      siteName: APP_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title ?? APP_NAME }],
      type,
      ...(type === "article" && { publishedTime, modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? APP_NAME,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

import type { Metadata } from "next";
import {
  APP_NAME,
  APP_DESCRIPTION,
  APP_URL,
  APP_OG_IMAGE,
} from "./constants";

type MetadataParams = {
  /**
   * Bare page title. The root layout template appends the
   * site name automatically — do NOT include the site name here.
   * Leave undefined on the homepage (it sets its own absolute title).
   */
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  canonical?: string;
  /** Set to "article" for health and homemade-food article pages. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = APP_DESCRIPTION,
  path = "",
  image = APP_OG_IMAGE,
  canonical,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
  noIndex = false,
}: MetadataParams = {}): Metadata {
  const url = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${APP_URL}${canonical}`
    : `${APP_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${APP_URL}${image}`;

  return {
    // Pass the bare title — root layout template handles the site suffix.
    title: title ?? undefined,
    description,
    keywords,
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: title ?? APP_NAME,
      description,
      url,
      siteName: APP_NAME,
      locale: "en_IN",
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

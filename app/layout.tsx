import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  APP_NAME,
  APP_DESCRIPTION,
  APP_URL,
  APP_OG_IMAGE,
} from "@/lib/constants";
import { AuthProvider } from "@/lib/auth-context";
import { JsonLd } from "@/components/shared/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  alternates: {
    canonical: APP_URL,
  },
  keywords: [
    "dog breeds India",
    "pet care India",
    "puppies for sale India",
    "pet products India",
    "dog health guide India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: APP_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - dog breeds, pet care, puppies, and pet products in India`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [APP_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* Site-wide structured data — embedded in every static HTML page */}
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

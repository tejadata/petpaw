import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { AuthProvider } from "@/lib/auth-context";
import { JsonLd } from "@/components/shared/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
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
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {/* Site-wide structured data — embedded in every static HTML page */}
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

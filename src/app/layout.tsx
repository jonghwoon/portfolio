import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "LEE JONGHOON | Portfolio",
  description:
    "High-performance web architecture and technical leadership that drives measurable business outcomes.",
  keywords: [
    "web developer",
    "frontend engineer",
    "backend engineer",
    "full-stack engineer",
    "Java",
    "go",
    "Spring",
    "Spring Boot",
    "aws",
    "gcp",
    "React",
    "Next.js",
    "portfolio",
  ],
  openGraph: {
    title: "LEE JONGHOON | Portfolio",
    description: "High-performance web architecture and technical leadership.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

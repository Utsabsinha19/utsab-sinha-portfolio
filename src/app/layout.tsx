import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import InitialLoader from "@/components/ui/InitialLoader";
import AnimeFloatingParticles from "@/components/ui/AnimeFloatingParticles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Base URL for the portfolio - update this for your deployment
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://utsabsinha.com";

export const metadata: Metadata = {
  title: "Utsab Sinha — AI/ML Developer",
  description:
    "AI/ML developer building intelligent systems across NLP, computer vision, generative AI, and data intelligence.",
  openGraph: {
    title: "Utsab Sinha — AI/ML Developer",
    description:
      "AI/ML developer building intelligent systems across NLP, computer vision, generative AI, and data intelligence.",
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Utsab Sinha - AI/ML Developer Portfolio",
      },
    ],
    siteName: "Utsab Sinha - AI/ML Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsab Sinha — AI/ML Developer",
    description:
      "AI/ML developer building intelligent systems across NLP, computer vision, generative AI, and data intelligence.",
    images: [`${baseUrl}/api/og`],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jbmono.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="bg-app text-ink antialiased relative">
        <ThemeProvider>
          <InitialLoader />
          <CustomCursor />
          <AnimeFloatingParticles />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
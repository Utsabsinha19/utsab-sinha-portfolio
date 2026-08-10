import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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

export const metadata: Metadata = {
  title: "Utsab Sinha — AI/ML Developer",
  description:
    "AI/ML developer building intelligent systems across NLP, computer vision, generative AI, data intelligence and production-ready AI engineering.",
  openGraph: {
    title: "Utsab Sinha — AI/ML Developer",
    description:
      "AI/ML developer building intelligent systems across NLP, computer vision, generative AI, and data intelligence.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utsab Sinha — AI/ML Developer",
    description:
      "AI/ML developer building intelligent systems across NLP, computer vision, generative AI, and data intelligence.",
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
  const themeScript = `
    (function() {
      try {
        var stored = localStorage.getItem('portfolio-theme');
        var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var isDark = stored === 'dark' || (!stored && supportDarkMode) || (stored === 'system' && supportDarkMode);
        var root = document.documentElement;
        if (isDark) {
          root.classList.add('dark');
          root.classList.remove('light');
          root.setAttribute('data-theme', 'dark');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
          root.setAttribute('data-theme', 'light');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" className={`${inter.variable} ${jbmono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-app text-ink antialiased custom-cursor">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

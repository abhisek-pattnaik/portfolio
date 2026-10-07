import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/data/portfolioData";
import UnseenCursor from "@/components/UnseenCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} | Full Stack Developer • Web, Mobile & Backend`,
  description: `${PERSONAL_INFO.title} building resilient applications with Next.js, React, Flutter, Kotlin, FastAPI, and C# / .NET. Explore fintech and SaaS case studies.`,
  keywords: [
    "Abhisek",
    "Full Stack Developer",
    "Web Developer",
    "Mobile Developer",
    "Flutter",
    "FastAPI",
    "C# .NET",
    "Next.js",
    "React",
    "Kotlin",
    "Fintech Developer",
    "Portfolio",
    "Three.js 3D",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: "https://abhisek.dev" }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhisek.dev",
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    title: `${PERSONAL_INFO.name} | Full Stack Developer`,
    description: PERSONAL_INFO.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} | Full Stack Developer`,
    description: PERSONAL_INFO.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.fullName,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.bio,
    knowsAbout: [
      "Full Stack Development",
      "Next.js",
      "React",
      "Flutter",
      "Kotlin",
      "FastAPI",
      "C#",
      ".NET",
      "PostgreSQL",
      "Redis",
      "Fintech Platforms",
      "Three.js",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Manipal University Jaipur",
      },
      {
        "@type": "EducationalOrganization",
        name: "Berhampur University",
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans bg-[#fbf7f4] text-stone-900 antialiased selection:bg-rose-200 selection:text-stone-900`}
      >
        <UnseenCursor />
        {children}
      </body>
    </html>
  );
}

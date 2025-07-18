import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { PersonSchema, WebsiteSchema, ProfessionalServiceSchema } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Franck - Senior Full-Stack Developer | React & TypeScript Expert",
    template: "%s | Franck - Full-Stack Developer"
  },
  description: "Senior Full-Stack Developer with 5+ years experience building scalable web applications. Specializing in React, TypeScript, Next.js, and modern web technologies. Available for freelance projects and full-time opportunities.",
  keywords: ["Full-Stack Developer", "React Developer", "TypeScript", "Next.js", "Web Development", "Frontend", "Backend", "JavaScript", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS", "Docker", "Kubernetes"],
  authors: [{ name: "Francisco", url: "https://portfolio-4u8c.vercel.app" }],
  creator: "Franck",
  publisher: "Franck",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://portfolio-4u8c.vercel.app"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/blog/rss",
    },
  },
  openGraph: {
    title: "Franck - Senior Full-Stack Developer | React & TypeScript Expert",
    description: "Senior Full-Stack Developer with 5+ years experience building scalable web applications. Specializing in React, TypeScript, Next.js, and modern web technologies.",
    url: "https://portfolio-4u8c.vercel.app",
    siteName: "Franck Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Franck - Senior Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Franck - Senior Full-Stack Developer | React & TypeScript Expert",
    description: "Senior Full-Stack Developer with 5+ years experience building scalable web applications. Specializing in React, TypeScript, Next.js, and modern web technologies.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <PersonSchema 
          name="Franck"
          jobTitle="Senior Full-Stack Developer"
          description="Senior Full-Stack Developer with 5+ years experience building scalable web applications. Specializing in React, TypeScript, Next.js, and modern web technologies."
          url="https://portfolio-4u8c.vercel.app"
          image="https://portfolio-4u8c.vercel.app/franck.jpg"
          email="franck@example.com"
          sameAs={[
            "https://github.com/franck",
            "https://linkedin.com/in/franck",
            "https://twitter.com/franck"
          ]}
        />
        <WebsiteSchema 
          name="Franck Portfolio"
          description="Professional portfolio showcasing full-stack development expertise"
          url="https://portfolio-4u8c.vercel.app"
          author="Franck"
          potentialAction={{
            "@type": "SearchAction",
            target: "https://portfolio-4u8c.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }}
        />
        <ProfessionalServiceSchema />
        <Header />
        <main className="flex-1">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

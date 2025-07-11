import Script from 'next/script';

interface BlogPostingSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  url: string;
  image?: string;
  tags?: string[];
  wordCount?: number;
  readingTime?: string;
}

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image?: string;
  email?: string;
  sameAs?: string[];
}

interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
  foundingDate?: string;
  email?: string;
  sameAs?: string[];
}

interface WebsiteSchemaProps {
  name: string;
  description: string;
  url: string;
  author: string;
  potentialAction?: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

export function BlogPostingSchema({ 
  title, 
  description, 
  datePublished, 
  dateModified, 
  authorName, 
  authorUrl, 
  url, 
  image, 
  tags, 
  wordCount, 
  readingTime 
}: BlogPostingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl || "https://portfolio-4u8c.vercel.app"
    },
    publisher: {
      "@type": "Person",
      name: authorName,
      url: authorUrl || "https://portfolio-4u8c.vercel.app"
    },
    url,
    image,
    keywords: tags?.join(", "),
    wordCount,
    timeRequired: readingTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    articleSection: "Technology",
    inLanguage: "en-US"
  };

  return (
    <Script
      id="blog-posting-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export function PersonSchema({ name, jobTitle, description, url, image, email, sameAs }: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url,
    image,
    email,
    sameAs,
    worksFor: {
      "@type": "Organization",
      name: "Freelance Developer"
    },
    knowsAbout: [
      "Web Development",
      "React.js",
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes"
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Computer Science Education"
    }
  };

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export function OrganizationSchema({ name, description, url, logo, foundingDate, email, sameAs }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url,
    logo,
    foundingDate,
    email,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Remote",
      addressCountry: "US"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Professional Services",
      email
    }
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export function WebsiteSchema({ name, description, url, author, potentialAction }: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    author: {
      "@type": "Person",
      name: author
    },
    potentialAction,
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    genre: "Portfolio",
    keywords: "Full-Stack Developer, React, TypeScript, Web Development, Portfolio"
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://portfolio-4u8c.vercel.app/#organization",
    name: "Franck - Full-Stack Development Services",
    description: "Professional web development services specializing in React, TypeScript, and modern web technologies",
    url: "https://portfolio-4u8c.vercel.app",
    founder: {
      "@type": "Person",
      name: "Franck",
      jobTitle: "Senior Full-Stack Developer"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Remote",
      addressCountry: "US"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://portfolio-4u8c.vercel.app/contact"
    },
    sameAs: [
      "https://github.com/francisco",
      "https://linkedin.com/in/francisco"
    ]
  };

  return (
    <Script
      id="professional-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
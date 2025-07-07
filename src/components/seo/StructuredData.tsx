import Script from 'next/script';

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
      addressCountry: "Global"
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
    "@type": "ProfessionalService",
    name: "Francisco - Full-Stack Development Services",
    description: "Professional web development services specializing in React, TypeScript, and modern web technologies",
    provider: {
      "@type": "Person",
      name: "Francisco",
      jobTitle: "Senior Full-Stack Developer"
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Web Development",
            description: "Complete web application development using React, TypeScript, and Node.js"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Frontend Development",
            description: "Modern responsive web interfaces using React, Next.js, and Tailwind CSS"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Backend Development",
            description: "Scalable server-side applications using Node.js, PostgreSQL, and cloud technologies"
          }
        }
      ]
    },
    url: "https://portfolio-4u8c.vercel.app",
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
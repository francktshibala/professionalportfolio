interface BlogCategorySchemaProps {
  category: string;
  posts: Array<{
    title: string;
    slug: string;
    date: string;
    description: string;
  }>;
}

interface BlogTagSchemaProps {
  tag: string;
  posts: Array<{
    title: string;
    slug: string;
    date: string;
    description: string;
  }>;
}

export function BlogCategorySchema({ category, posts }: BlogCategorySchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${category} - Blog Posts`,
    description: `Blog posts in the ${category} category`,
    url: `https://portfolio-4u8c.vercel.app/blog?category=${encodeURIComponent(category)}`,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://portfolio-4u8c.vercel.app/blog/${post.slug}`,
      datePublished: post.date,
      description: post.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogTagSchema({ tag, posts }: BlogTagSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${tag} - Tagged Posts`,
    description: `Blog posts tagged with ${tag}`,
    url: `https://portfolio-4u8c.vercel.app/blog?tag=${encodeURIComponent(tag)}`,
    keywords: [tag],
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://portfolio-4u8c.vercel.app/blog/${post.slug}`,
      datePublished: post.date,
      description: post.description,
      keywords: [tag],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogArchiveSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Blog Archive',
    description: 'Archive of all blog posts organized by date',
    url: 'https://portfolio-4u8c.vercel.app/blog/archive',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://portfolio-4u8c.vercel.app',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://portfolio-4u8c.vercel.app/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Archive',
          item: 'https://portfolio-4u8c.vercel.app/blog/archive',
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
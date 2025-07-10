import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
  noIndex?: boolean;
}

const baseUrl = 'https://portfolio-4u8c.vercel.app';
const defaultImage = '/og-image.jpg';

export function createMetadata({
  title,
  description,
  image = defaultImage,
  url = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  author = 'Franck',
  noIndex = false,
}: PageMetadata): Metadata {
  const fullUrl = `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    keywords: tags?.join(', '),
    authors: [{ name: author, url: baseUrl }],
    creator: author,
    publisher: author,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Franck Portfolio',
      locale: 'en_US',
      type: type === 'article' ? 'article' : 'website',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author],
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@franck',
      site: '@franck',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(type === 'article' && {
      articleSection: 'Technology',
      articleTag: tags,
    }),
  };
}
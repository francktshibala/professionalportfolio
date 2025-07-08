export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  readingTime: string;
  published: boolean;
  content: string | React.ReactNode;
  image?: string;
  featured?: boolean;
}

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  published: boolean;
  image?: string;
  featured?: boolean;
}

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}

export interface BlogFilterOptions {
  tag?: string;
  category?: string;
  search?: string;
}
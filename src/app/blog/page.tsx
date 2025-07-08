import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { BlogClientPage } from '@/components/blog/BlogClientPage';
import { getPaginatedBlogPosts, getAllTags, getAllCategories } from '@/lib/blog';

interface BlogPageProps {
  searchParams: {
    page?: string;
    tag?: string;
    category?: string;
    search?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || '1');
  const currentTag = searchParams.tag;
  const currentCategory = searchParams.category;
  const currentSearch = searchParams.search;

  const [paginatedPosts, tags, categories] = await Promise.all([
    getPaginatedBlogPosts(currentPage, {
      tag: currentTag,
      category: currentCategory,
      search: currentSearch,
    }),
    getAllTags(),
    getAllCategories(),
  ]);

  return (
    <Container className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h1" className="mb-4">
            Blog
          </Typography>
          <Typography variant="body" className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts about web development, design, and technology.
          </Typography>
        </div>

        <BlogClientPage
          initialPosts={paginatedPosts}
          tags={tags}
          categories={categories}
          currentPage={currentPage}
          currentTag={currentTag}
          currentCategory={currentCategory}
          currentSearch={currentSearch}
        />
      </div>
    </Container>
  );
}
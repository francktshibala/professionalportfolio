import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { BlogArchive } from '@/components/blog/BlogArchive';
import { BlogArchiveSchema } from '@/components/seo/BlogStructuredData';
import { getArchiveByDate } from '@/lib/blog';

export default async function ArchivePage() {
  const archive = await getArchiveByDate();

  return (
    <>
      <BlogArchiveSchema />
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h1" className="mb-4">
              Blog Archive
            </Typography>
            <Typography variant="body" className="text-gray-600 dark:text-gray-400">
              Browse all blog posts organized by date
            </Typography>
          </div>

          <BlogArchive archive={archive} />
        </div>
      </Container>
    </>
  );
}
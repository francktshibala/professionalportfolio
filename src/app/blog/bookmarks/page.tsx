'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bookmark, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface BookmarkedPost {
  title: string;
  url: string;
  date: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedPost[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarked-posts');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const removeBookmark = (url: string) => {
    const updated = bookmarks.filter(bookmark => bookmark.url !== url);
    setBookmarks(updated);
    localStorage.setItem('bookmarked-posts', JSON.stringify(updated));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('bookmarked-posts');
  };

  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bookmark size={24} className="text-yellow-500" />
            <Typography variant="h1">
              Bookmarked Posts
            </Typography>
          </div>
          <Typography variant="body" className="text-gray-600 dark:text-gray-400">
            Your saved blog posts for later reading
          </Typography>
        </div>

        {bookmarks.length === 0 ? (
          <Card className="p-8 text-center">
            <Bookmark size={48} className="mx-auto mb-4 text-gray-400" />
            <Typography variant="h3" className="mb-2">
              No bookmarks yet
            </Typography>
            <Typography variant="body" className="text-gray-600 dark:text-gray-400 mb-4">
              Start bookmarking blog posts to save them for later reading
            </Typography>
            <Link href="/blog">
              <Button variant="primary">
                Browse Blog Posts
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="body" className="text-gray-600 dark:text-gray-400">
                {bookmarks.length} bookmarked post{bookmarks.length !== 1 ? 's' : ''}
              </Typography>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllBookmarks}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>

            {bookmarks.map((bookmark, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link
                      href={bookmark.url}
                      className="block hover:text-blue-600 transition-colors"
                    >
                      <Typography variant="h3" className="text-lg font-semibold mb-2">
                        {bookmark.title}
                      </Typography>
                    </Link>
                    <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                      Bookmarked on {new Date(bookmark.date).toLocaleDateString()}
                    </Typography>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBookmark(bookmark.url)}
                    className="text-red-600 hover:text-red-700 ml-4"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
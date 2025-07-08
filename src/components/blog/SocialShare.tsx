'use client';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Mail, Printer, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  description: string;
  url: string;
}

export function SocialShare({ title, description, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${fullUrl}`)}`,
  };

  const handleCopyLink = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarked-posts') || '[]');
      if (!bookmarked) {
        bookmarks.push({ title, url, date: new Date().toISOString() });
        localStorage.setItem('bookmarked-posts', JSON.stringify(bookmarks));
      } else {
        const filtered = bookmarks.filter((bookmark: { url: string }) => bookmark.url !== url);
        localStorage.setItem('bookmarked-posts', JSON.stringify(filtered));
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Typography variant="small" className="text-gray-600 dark:text-gray-400">
        Share this post:
      </Typography>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => typeof window !== 'undefined' && window.open(shareUrls.twitter, '_blank')}
          className="p-2"
        >
          <Twitter size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => typeof window !== 'undefined' && window.open(shareUrls.linkedin, '_blank')}
          className="p-2"
        >
          <Linkedin size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => typeof window !== 'undefined' && window.open(shareUrls.facebook, '_blank')}
          className="p-2"
        >
          <Facebook size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => typeof window !== 'undefined' && window.open(shareUrls.email, '_blank')}
          className="p-2"
          title="Share via Email"
        >
          <Mail size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="p-2"
          title="Copy Link"
        >
          <LinkIcon size={16} />
          {copied && <span className="ml-1 text-xs">Copied!</span>}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrint}
          className="p-2"
          title="Print"
        >
          <Printer size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookmark}
          className={`p-2 ${bookmarked ? 'text-yellow-500' : ''}`}
          title={bookmarked ? 'Remove Bookmark' : 'Bookmark'}
        >
          <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
        </Button>
      </div>
    </div>
  );
}
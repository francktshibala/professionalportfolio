'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';

const LanguageToggle = () => {
  const pathname = usePathname();
  const isFrench = pathname === '/francais';

  return (
    <Link
      href={isFrench ? '/' : '/francais'}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors text-sm font-medium"
      aria-label={isFrench ? 'Switch to English' : 'Basculer en français'}
    >
      <span className="text-lg">{isFrench ? '🇬🇧' : '🇫🇷'}</span>
      <span>{isFrench ? 'EN' : 'FR'}</span>
    </Link>
  );
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-bold text-lg">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Navigation />
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-accent rounded-md"
              aria-label="Toggle menu"
            >
              <HamburgerIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
}

const HamburgerIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);
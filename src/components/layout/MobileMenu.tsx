'use client';

import { useEffect } from 'react';
import { Navigation } from './Navigation';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className={cn(
        'fixed top-16 left-0 right-0 bg-background border-b border-border z-50 md:hidden',
        'transform transition-transform duration-200 ease-in-out',
        isOpen ? 'translate-y-0' : '-translate-y-full'
      )}>
        <div className="px-4 py-6">
          <Navigation 
            className="flex-col items-start space-x-0 space-y-4"
            onItemClick={onClose}
          />
        </div>
      </div>
    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';

export function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsVisible(true);
      }
    };

    const handleBlur = () => {
      setIsVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('blur', handleBlur);
    };
  }, []);

  const skipToMain = () => {
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      onClick={skipToMain}
      className={`fixed top-4 left-4 z-50 transition-transform duration-200 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      variant="primary"
      size="sm"
    >
      Skip to main content
    </Button>
  );
}
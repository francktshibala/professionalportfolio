'use client';

import { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Typography } from './Typography';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Settings, Eye, Type, Zap, Volume2 } from 'lucide-react';

export function AccessibilityPreferences() {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, updatePreference } = useUserPreferences();

  const fontSizeOptions = [
    { value: 'small', label: 'Small', class: 'text-sm' },
    { value: 'medium', label: 'Medium', class: 'text-base' },
    { value: 'large', label: 'Large', class: 'text-lg' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '🖥️' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="primary"
        size="sm"
        className="rounded-full p-3 shadow-lg"
        aria-label="Open accessibility preferences"
      >
        <Settings size={16} />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-12 right-0 w-80 p-6 shadow-xl border">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h3" className="flex items-center gap-2">
              <Eye size={20} />
              Accessibility
            </Typography>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              aria-label="Close accessibility preferences"
            >
              ×
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <Typography variant="body" className="flex items-center gap-2 mb-3">
                <Type size={16} />
                Font Size
              </Typography>
              <div className="grid grid-cols-3 gap-2">
                {fontSizeOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => updatePreference('fontSize', option.value as 'small' | 'medium' | 'large')}
                    variant={preferences.fontSize === option.value ? 'primary' : 'secondary'}
                    size="sm"
                    className={option.class}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Typography variant="body" className="flex items-center gap-2 mb-3">
                <Zap size={16} />
                Motion
              </Typography>
              <div className="flex items-center justify-between">
                <Typography variant="small">Reduce motion</Typography>
                <Button
                  onClick={() => updatePreference('reducedMotion', !preferences.reducedMotion)}
                  variant={preferences.reducedMotion ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {preferences.reducedMotion ? 'On' : 'Off'}
                </Button>
              </div>
            </div>

            <div>
              <Typography variant="body" className="flex items-center gap-2 mb-3">
                <Volume2 size={16} />
                Reading Mode
              </Typography>
              <div className="flex items-center justify-between">
                <Typography variant="small">Enhanced reading</Typography>
                <Button
                  onClick={() => updatePreference('readingMode', !preferences.readingMode)}
                  variant={preferences.readingMode ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {preferences.readingMode ? 'On' : 'Off'}
                </Button>
              </div>
            </div>

            <div>
              <Typography variant="body" className="mb-3">Theme</Typography>
              <div className="grid grid-cols-3 gap-2">
                {themeOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => updatePreference('theme', option.value as 'light' | 'dark' | 'system')}
                    variant={preferences.theme === option.value ? 'primary' : 'secondary'}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <span>{option.icon}</span>
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Typography variant="small" className="text-gray-600 dark:text-gray-400 text-center">
                Preferences are saved locally
              </Typography>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  readingMode: boolean;
  searchHistory: string[];
  bookmarkedPosts: Array<{
    title: string;
    url: string;
    date: string;
  }>;
  language: 'en' | 'es' | 'fr';
  notifications: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  fontSize: 'medium',
  reducedMotion: false,
  readingMode: false,
  searchHistory: [],
  bookmarkedPosts: [],
  language: 'en',
  notifications: true,
};

const STORAGE_KEY = 'user-preferences';

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const savePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving user preferences:', error);
      }
      return updated;
    });
  }, []);

  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    savePreferences({ [key]: value });
  }, [savePreferences]);

  const addToSearchHistory = useCallback((query: string) => {
    if (!query.trim()) return;
    
    setPreferences(prev => {
      const newHistory = [query, ...prev.searchHistory.filter(q => q !== query)].slice(0, 10);
      const updated = { ...prev, searchHistory: newHistory };
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error updating search history:', error);
      }
      
      return updated;
    });
  }, []);

  const clearSearchHistory = useCallback(() => {
    updatePreference('searchHistory', []);
  }, [updatePreference]);

  const addBookmark = useCallback((post: { title: string; url: string }) => {
    const bookmark = {
      ...post,
      date: new Date().toISOString(),
    };
    
    setPreferences(prev => {
      const newBookmarks = [bookmark, ...prev.bookmarkedPosts.filter(b => b.url !== post.url)];
      const updated = { ...prev, bookmarkedPosts: newBookmarks };
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error adding bookmark:', error);
      }
      
      return updated;
    });
  }, []);

  const removeBookmark = useCallback((url: string) => {
    setPreferences(prev => {
      const newBookmarks = prev.bookmarkedPosts.filter(b => b.url !== url);
      const updated = { ...prev, bookmarkedPosts: newBookmarks };
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error removing bookmark:', error);
      }
      
      return updated;
    });
  }, []);

  const isBookmarked = useCallback((url: string) => {
    return preferences.bookmarkedPosts.some(bookmark => bookmark.url === url);
  }, [preferences.bookmarkedPosts]);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error resetting preferences:', error);
    }
  }, []);

  const exportPreferences = useCallback(() => {
    const dataStr = JSON.stringify(preferences, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'portfolio-preferences.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [preferences]);

  const importPreferences = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          savePreferences(imported);
          resolve();
        } catch (error) {
          reject(new Error('Invalid preferences file'));
        }
      };
      
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  }, [savePreferences]);

  return {
    preferences,
    isLoading,
    updatePreference,
    addToSearchHistory,
    clearSearchHistory,
    addBookmark,
    removeBookmark,
    isBookmarked,
    resetPreferences,
    exportPreferences,
    importPreferences,
  };
}
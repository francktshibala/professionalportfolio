'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  lastFetch: number | null;
}

export interface AsyncStateOptions<T> {
  initialData?: T | null;
  retryCount?: number;
  retryDelay?: number;
  cacheTime?: number;
}

export function useAsyncState<T>(
  asyncFunction: () => Promise<T>,
  deps: unknown[] = [],
  options: AsyncStateOptions<T> = {}
) {
  const { initialData = null, retryCount = 3, retryDelay = 1000, cacheTime = 5 * 60 * 1000 } = options;
  
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: null,
    lastFetch: null,
  });

  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  const execute = useCallback(
    async (attempt = 0): Promise<void> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      setState(prev => ({
        ...prev,
        loading: true,
        error: attempt === 0 ? null : prev.error,
      }));

      try {
        const result = await asyncFunction();
        
        if (!abortControllerRef.current.signal.aborted) {
          setState({
            data: result,
            loading: false,
            error: null,
            lastFetch: Date.now(),
          });
        }
      } catch (error) {
        if (!abortControllerRef.current.signal.aborted) {
          const errorObj = error instanceof Error ? error : new Error(String(error));
          
          if (attempt < retryCount) {
            retryTimeoutRef.current = setTimeout(() => {
              execute(attempt + 1);
            }, retryDelay * Math.pow(2, attempt));
          } else {
            setState(prev => ({
              ...prev,
              loading: false,
              error: errorObj,
            }));
          }
        }
      }
    },
    [asyncFunction, retryCount, retryDelay, ...deps]
  );

  const refresh = useCallback(() => {
    execute(0);
  }, [execute]);

  const isStale = useCallback(() => {
    if (!state.lastFetch) return true;
    return Date.now() - state.lastFetch > cacheTime;
  }, [state.lastFetch, cacheTime]);

  useEffect(() => {
    if (isStale()) {
      execute(0);
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [execute, isStale]);

  return {
    ...state,
    refresh,
    isStale: isStale(),
  };
}

export function useAsyncCallback<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  deps: unknown[] = []
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
    lastFetch: null,
  });

  const abortControllerRef = useRef<AbortController>();

  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const result = await asyncFunction(...args);
        
        if (!abortControllerRef.current.signal.aborted) {
          setState({
            data: result,
            loading: false,
            error: null,
            lastFetch: Date.now(),
          });
          return result;
        }
        return null;
      } catch (error) {
        if (!abortControllerRef.current.signal.aborted) {
          const errorObj = error instanceof Error ? error : new Error(String(error));
          setState(prev => ({
            ...prev,
            loading: false,
            error: errorObj,
          }));
        }
        return null;
      }
    },
    [asyncFunction, ...deps]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      lastFetch: null,
    });
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
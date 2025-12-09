/**
 * useAsync Hook
 *
 * Handle async operations with loading, error, and data states.
 * Simplifies common async patterns in React components.
 */

import { useState, useEffect, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: () => Promise<void>;
  reset: () => void;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: immediate,
  });

  const execute = useCallback(async () => {
    setState({ data: null, error: null, isLoading: true });

    try {
      const data = await asyncFunction();
      setState({ data, error: null, isLoading: false });
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false });
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, reset };
}

// Example usage:
// const { data, error, isLoading, execute } = useAsync(
//   async () => await authService.getCurrentUser(),
//   false // don't execute immediately
// );
//
// <Button onPress={execute} disabled={isLoading}>
//   Refresh
// </Button>

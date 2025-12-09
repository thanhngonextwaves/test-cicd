/**
 * useDebounce Hook
 *
 * Debounces a value by a specified delay.
 * Useful for search inputs, API calls, etc.
 */

import { useState, useEffect } from 'react';
import { APP_CONFIG } from '@constants/config';

export function useDebounce<T>(value: T, delay: number = APP_CONFIG.DEBOUNCE_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Example usage:
// const [searchQuery, setSearchQuery] = useState('');
// const debouncedSearchQuery = useDebounce(searchQuery, 500);
//
// useEffect(() => {
//   // Perform search with debouncedSearchQuery
// }, [debouncedSearchQuery]);

/**
 * usePrevious Hook
 *
 * Returns the previous value of a state or prop.
 * Useful for comparing current and previous values.
 */

import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Example usage:
// const [count, setCount] = useState(0);
// const previousCount = usePrevious(count);
//
// console.log(`Current: ${count}, Previous: ${previousCount}`);

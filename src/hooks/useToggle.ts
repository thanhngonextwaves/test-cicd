/**
 * useToggle Hook
 *
 * Simplifies boolean state management with toggle functionality.
 */

import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}

// Example usage:
// const [isOpen, toggleOpen, setIsOpen] = useToggle(false);
//
// <Button onPress={toggleOpen}>Toggle</Button>
// <Button onPress={() => setIsOpen(true)}>Open</Button>
// <Button onPress={() => setIsOpen(false)}>Close</Button>

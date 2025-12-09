/**
 * useKeyboard Hook
 *
 * Monitor keyboard visibility and height.
 * Useful for adjusting UI when keyboard appears.
 */

import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';

interface KeyboardInfo {
  isVisible: boolean;
  height: number;
}

export function useKeyboard(): KeyboardInfo {
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardInfo>({
    isVisible: false,
    height: 0,
  });

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const handleKeyboardShow = (event: KeyboardEvent) => {
      setKeyboardInfo({
        isVisible: true,
        height: event.endCoordinates.height,
      });
    };

    const handleKeyboardHide = () => {
      setKeyboardInfo({
        isVisible: false,
        height: 0,
      });
    };

    const showSubscription = Keyboard.addListener(showEvent, handleKeyboardShow);
    const hideSubscription = Keyboard.addListener(hideEvent, handleKeyboardHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardInfo;
}

// Example usage:
// const { isVisible, height } = useKeyboard();
//
// <View style={{ paddingBottom: isVisible ? height : 0 }}>
//   {/* Content */}
// </View>

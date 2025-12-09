/**
 * Root Layout
 *
 * This is the root layout for the app using expo-router.
 * It wraps the entire app with global providers (context, theme, etc.)
 * and handles initial loading, splash screen, and navigation setup.
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import global providers
import { AppProvider } from '@contexts/AppContext';
import { AuthProvider } from '@contexts/AuthContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Prepare app (load fonts, check auth, etc.)
    prepareApp();
  }, []);

  const prepareApp = async () => {
    try {
      // Add any initialization logic here:
      // - Load custom fonts
      // - Check authentication status
      // - Load cached data
      // - etc.

      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error preparing app:', error);
    } finally {
      // Hide splash screen
      await SplashScreen.hideAsync();
    }
  };

  return (
    <SafeAreaProvider>
      <AppProvider>
        <AuthProvider>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            {/* Main app screens */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Modal screens */}
            <Stack.Screen
              name="modal"
              options={{
                presentation: 'modal',
                headerShown: true,
                title: 'Modal',
              }}
            />
          </Stack>
        </AuthProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}

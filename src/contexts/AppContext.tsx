/**
 * App Context
 *
 * Global application state management using React Context.
 * Manages theme, settings, loading states, and other app-wide state.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getItem, setItem, STORAGE_KEYS } from '@utils/storage';
import type { AppSettings, ThemeMode } from '@types';

interface AppContextValue {
  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Loading
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Error
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const defaultSettings: AppSettings = {
  theme: 'auto',
  notifications: true,
  language: 'en',
};

export function AppProvider({ children }: AppProviderProps) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load settings from storage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedSettings = await getItem<AppSettings>(STORAGE_KEYS.PREFERENCES);
      if (storedSettings) {
        setSettings(storedSettings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const setTheme = async (theme: ThemeMode) => {
    const newSettings = { ...settings, theme };
    setSettings(newSettings);
    await setItem(STORAGE_KEYS.PREFERENCES, newSettings);
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    await setItem(STORAGE_KEYS.PREFERENCES, updatedSettings);
  };

  const clearError = () => setError(null);

  const value: AppContextValue = {
    theme: settings.theme,
    setTheme,
    settings,
    updateSettings,
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

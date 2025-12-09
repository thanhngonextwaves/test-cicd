/**
 * Storage Utility
 *
 * Wrapper around AsyncStorage for type-safe local storage.
 * Use this for storing user preferences, auth tokens, cached data, etc.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  REFRESH_TOKEN: '@refresh_token',
  USER_DATA: '@user_data',
  PREFERENCES: '@preferences',
  ONBOARDING_COMPLETE: '@onboarding_complete',
} as const;

/**
 * Store data in AsyncStorage
 */
export const setItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
    throw error;
  }
};

/**
 * Get data from AsyncStorage
 */
export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all AsyncStorage data
 */
export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

/**
 * Get multiple items at once
 */
export const multiGet = async (keys: string[]): Promise<Record<string, any>> => {
  try {
    const keyValuePairs = await AsyncStorage.multiGet(keys);
    const result: Record<string, any> = {};

    keyValuePairs.forEach(([key, value]) => {
      if (value) {
        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = value;
        }
      }
    });

    return result;
  } catch (error) {
    console.error('Error reading multiple items:', error);
    return {};
  }
};

/**
 * Set multiple items at once
 */
export const multiSet = async (keyValuePairs: [string, any][]): Promise<void> => {
  try {
    const serializedPairs: [string, string][] = keyValuePairs.map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(serializedPairs);
  } catch (error) {
    console.error('Error setting multiple items:', error);
    throw error;
  }
};

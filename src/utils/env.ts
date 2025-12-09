/**
 * Environment Variables Utility
 *
 * Access environment variables from app.config.js via expo-constants.
 * All environment variables are loaded through EAS Secrets.
 */

import Constants from 'expo-constants';

interface AppConfig {
  apiUrl: string;
  apiKey: string;
  environment: 'development' | 'preview' | 'production';
  enableAnalytics: boolean;
  enableCrashReporting: boolean;
}

// Type-safe access to environment variables
export const ENV: AppConfig = {
  apiUrl: Constants.expoConfig?.extra?.apiUrl || 'https://api.production.com',
  apiKey: Constants.expoConfig?.extra?.apiKey || '',
  environment: Constants.expoConfig?.extra?.environment || 'production',
  enableAnalytics: Constants.expoConfig?.extra?.enableAnalytics || false,
  enableCrashReporting: Constants.expoConfig?.extra?.enableCrashReporting || false,
};

// Helper to check environment
export const isDevelopment = ENV.environment === 'development';
export const isPreview = ENV.environment === 'preview';
export const isProduction = ENV.environment === 'production';

// Log environment in development
if (__DEV__) {
  console.log('[ENV]', ENV);
}

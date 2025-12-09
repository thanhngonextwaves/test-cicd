/**
 * App Configuration with Environment Variables
 *
 * This file extends app.json with dynamic configuration
 * based on environment variables from EAS Secrets.
 *
 * Set secrets with: eas secret:create --scope project --name SECRET_NAME --value secret_value
 */

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

export default ({ config }) => {
  const appVariant = process.env.APP_VARIANT || 'production';

  // Modify app name based on environment
  let appName = 'Expo Mobile App';
  let bundleIdentifier = 'com.yourcompany.expomobileapp';
  let androidPackage = 'com.yourcompany.expomobileapp';

  if (IS_DEV) {
    appName = '[DEV] Expo Mobile App';
    bundleIdentifier = 'com.yourcompany.expomobileapp.dev';
    androidPackage = 'com.yourcompany.expomobileapp.dev';
  } else if (IS_PREVIEW) {
    appName = '[PREVIEW] Expo Mobile App';
    bundleIdentifier = 'com.yourcompany.expomobileapp.preview';
    androidPackage = 'com.yourcompany.expomobileapp.preview';
  }

  return {
    ...config,
    name: appName,
    extra: {
      ...config.extra,
      // Add your environment variables here
      // These will be accessible via expo-constants
      apiUrl: process.env.API_URL || 'https://api.production.com',
      apiKey: process.env.API_KEY || '',
      environment: appVariant,
      // Feature flags
      enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
      enableCrashReporting: process.env.ENABLE_CRASH_REPORTING === 'true',
    },
    ios: {
      ...config.ios,
      bundleIdentifier,
    },
    android: {
      ...config.android,
      package: androidPackage,
    },
  };
};

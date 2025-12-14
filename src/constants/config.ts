/**
 * App Configuration Constants
 *
 * Central place for app-wide configuration values.
 */

export const APP_CONFIG = {
  // API
  API_TIMEOUT: 30000, // 30 seconds
  API_RETRY_ATTEMPTS: 3,
  API_RETRY_DELAY: 1000, // 1 second

  // Pagination
  DEFAULT_PAGE_SIZE: 4,
  MAX_PAGE_SIZE: 99,

  // Cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_CACHE_SIZE: 50, // Maximum number of cached items

  // UI
  DEBOUNCE_DELAY: 300, // milliseconds
  ANIMATION_DURATION: 200, // milliseconds
  TOAST_DURATION: 3000, // 3 seconds

  // Validation
  MIN_PASSWORD_LENGTH: 8,
  MAX_BIO_LENGTH: 500,
  MAX_USERNAME_LENGTH: 30,

  // Feature Flags (can be overridden by remote config)
  FEATURES: {
    enableBiometrics: true,
    enablePushNotifications: true,
    enableAnalytics: true,
    enableDarkMode: true,
  },
} as const;

export const COLORS = {
  // Primary
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#4DA2FF',

  // Secondary
  secondary: '#5856D6',
  secondaryDark: '#3634A3',
  secondaryLight: '#7C7AE8',

  // Semantic
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // Neutral
  black: '#000000',
  white: '#FFFFFF',
  gray1: '#8E8E93',
  gray2: '#AEAEB2',
  gray3: '#C7C7CC',
  gray4: '#D1D1D6',
  gray5: '#E5E5EA',
  gray6: '#F2F2F7',

  // Background
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',

  // Text
  textPrimary: '#000000',
  textSecondary: '#8E8E93',
  textTertiary: '#C7C7CC',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

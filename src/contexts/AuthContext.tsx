/**
 * Auth Context
 *
 * Authentication state management using React Context.
 * Manages user authentication, login, logout, and token management.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getItem, setItem, removeItem, STORAGE_KEYS } from '@utils/storage';
import { authService } from '@services/api';
import type { User, LoginRequest, RegisterRequest } from '@types';

interface AuthContextValue {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  signIn: (credentials: LoginRequest) => Promise<void>;
  signUp: (data: RegisterRequest) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check if user is authenticated on app start
   */
  const checkAuth = async () => {
    try {
      const token = await getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
      const storedUser = await getItem<User>(STORAGE_KEYS.USER_DATA);

      if (token && storedUser) {
        // Verify token is still valid by fetching current user
        try {
          const response = await authService.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          // Token is invalid, clear auth
          await clearAuth();
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign in user
   */
  const signIn = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);

      // Store tokens and user data
      await setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      await setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      await setItem(STORAGE_KEYS.USER_DATA, response.data.user);

      setUser(response.data.user);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign up new user
   */
  const signUp = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      const response = await authService.register(data);

      // Store tokens and user data
      await setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      await setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      await setItem(STORAGE_KEYS.USER_DATA, response.data.user);

      setUser(response.data.user);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign out user
   */
  const signOut = async () => {
    try {
      setIsLoading(true);
      // Call logout endpoint (optional - token will be invalidated)
      await authService.logout();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      await clearAuth();
      setIsLoading(false);
    }
  };

  /**
   * Update user data in state and storage
   */
  const updateUser = async (updatedUser: User) => {
    setUser(updatedUser);
    await setItem(STORAGE_KEYS.USER_DATA, updatedUser);
  };

  /**
   * Refresh authentication (useful after app comes to foreground)
   */
  const refreshAuth = async () => {
    try {
      const token = await getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        const response = await authService.getCurrentUser();
        setUser(response.data);
        await setItem(STORAGE_KEYS.USER_DATA, response.data);
      }
    } catch (error) {
      console.error('Refresh auth error:', error);
      await clearAuth();
    }
  };

  /**
   * Clear all auth data
   */
  const clearAuth = async () => {
    setUser(null);
    await removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    await removeItem(STORAGE_KEYS.USER_DATA);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

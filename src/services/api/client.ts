/**
 * API Client
 *
 * Axios client with interceptors for authentication, error handling, and logging.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { ENV } from '@utils/env';
import { APP_CONFIG } from '@constants/config';
import { getItem, setItem, STORAGE_KEYS } from '@utils/storage';
import type { ApiError, ApiResponse } from './types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: ENV.apiUrl,
      timeout: APP_CONFIG.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add auth token to requests
        const token = await getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (__DEV__) {
          console.log('[API Request]', config.method?.toUpperCase(), config.url);
        }

        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Log response in development
        if (__DEV__) {
          console.log('[API Response]', response.status, response.config.url);
        }

        return response;
      },
      async (error: AxiosError<ApiError>) => {
        // Handle errors
        const originalRequest = error.config;

        // Log error in development
        if (__DEV__) {
          console.error('[API Error]', error.response?.status, error.config?.url);
        }

        // Handle 401 Unauthorized - attempt token refresh
        if (error.response?.status === 401 && originalRequest) {
          try {
            const refreshToken = await getItem<string>(STORAGE_KEYS.REFRESH_TOKEN);
            if (refreshToken) {
              // Attempt to refresh token
              const response = await this.post<{ token: string }>('/auth/refresh', {
                refreshToken,
              });

              if (response.data.token) {
                await setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);

                // Retry original request with new token
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                }
                return this.client(originalRequest);
              }
            }
          } catch (refreshError) {
            // Refresh failed, clear auth and redirect to login
            await this.clearAuth();
            // You might want to emit an event here to redirect to login
            console.error('Token refresh failed:', refreshError);
          }
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private normalizeError(error: AxiosError<ApiError>): ApiError {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data?.message || 'An error occurred',
        code: error.response.data?.code,
        status: error.response.status,
        errors: error.response.data?.errors,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
      };
    }
  }

  private async clearAuth() {
    const { removeItem, STORAGE_KEYS } = await import('@utils/storage');
    await removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    await removeItem(STORAGE_KEYS.USER_DATA);
  }

  // HTTP Methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

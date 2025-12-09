/**
 * API Endpoints
 *
 * Service layer for making API calls.
 * Each service method corresponds to an API endpoint.
 */

import { apiClient } from './client';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UpdateProfileRequest,
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PaginatedResponse,
  PaginationParams,
} from './types';

/**
 * Auth Service
 */
export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest) => {
    return apiClient.post<LoginResponse>('/auth/login', credentials);
  },

  /**
   * Register new user
   */
  register: async (data: RegisterRequest) => {
    return apiClient.post<LoginResponse>('/auth/register', data);
  },

  /**
   * Logout user
   */
  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    return apiClient.get<User>('/auth/me');
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string) => {
    return apiClient.post<{ token: string; refreshToken: string }>('/auth/refresh', {
      refreshToken,
    });
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string) => {
    return apiClient.post('/auth/reset-password', { token, password: newPassword });
  },
};

/**
 * User Service
 */
export const userService = {
  /**
   * Get user profile by ID
   */
  getProfile: async (userId: string) => {
    return apiClient.get<User>(`/users/${userId}`);
  },

  /**
   * Update current user profile
   */
  updateProfile: async (data: UpdateProfileRequest) => {
    return apiClient.patch<User>('/users/me', data);
  },

  /**
   * Delete user account
   */
  deleteAccount: async () => {
    return apiClient.delete('/users/me');
  },

  /**
   * Upload avatar
   */
  uploadAvatar: async (imageUri: string) => {
    const formData = new FormData();
    formData.append('avatar', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    } as any);

    return apiClient.post<{ avatarUrl: string }>('/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

/**
 * Posts Service (Example content service)
 */
export const postsService = {
  /**
   * Get all posts with pagination
   */
  getPosts: async (params?: PaginationParams) => {
    return apiClient.get<PaginatedResponse<Post>>('/posts', {
      params,
    });
  },

  /**
   * Get single post by ID
   */
  getPost: async (postId: string) => {
    return apiClient.get<Post>(`/posts/${postId}`);
  },

  /**
   * Create new post
   */
  createPost: async (data: CreatePostRequest) => {
    return apiClient.post<Post>('/posts', data);
  },

  /**
   * Update existing post
   */
  updatePost: async (postId: string, data: UpdatePostRequest) => {
    return apiClient.patch<Post>(`/posts/${postId}`, data);
  },

  /**
   * Delete post
   */
  deletePost: async (postId: string) => {
    return apiClient.delete(`/posts/${postId}`);
  },

  /**
   * Get posts by user
   */
  getUserPosts: async (userId: string, params?: PaginationParams) => {
    return apiClient.get<PaginatedResponse<Post>>(`/users/${userId}/posts`, {
      params,
    });
  },
};

/**
 * Example: Search Service
 */
export const searchService = {
  /**
   * Search across all content
   */
  search: async (query: string, params?: PaginationParams) => {
    return apiClient.get<PaginatedResponse<any>>('/search', {
      params: { q: query, ...params },
    });
  },
};

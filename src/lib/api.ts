import axios from 'axios';
import { toast } from 'react-hot-toast';
import type { ApiResponse } from '@/types/primitiveTypes';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  timeout: 10000,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
  if (config.headers?.skipAuth) {
    delete config.headers.skipAuth;
    return config;
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      // toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || error.message || 'Something went wrong';

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[API Error]', {
        status,
        message,
        url: error?.config?.url,
        method: error?.config?.method,
        error: error?.response?.data,
      });
    }

    if (status === 401) {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      toast.error('Network Error: Unable to connect to server');
    } else if (status === 404) {
      toast.error('Resource not found');
    } else if (status === 500) {
      toast.error('Server error. Please try again later.');
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

// Helper functions
export async function apiGet<T>(
  url: string,
  options?: { skipAuth?: boolean },
): Promise<T> {
  const res = await api.get<ApiResponse<T>>(url, {
    headers: options?.skipAuth ? { skipAuth: true } : undefined,
  });
  // console.log('[apiGet] Data fetched from', url, ':', res.data);
  return res.data;
}

export async function apiPost<T>(
  url: string,
  data?: unknown,
  options?: { skipAuth?: boolean; headers?: Record<string, string> },
): Promise<T> {
  const headers: Record<string, string> = {};
  if (options?.skipAuth) headers.skipAuth = 'true';
  if (options?.headers) Object.assign(headers, options.headers);
  const res = await api.post<ApiResponse<T>>(url, data, {
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });
  return res.data;
}

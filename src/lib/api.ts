import axios from 'axios';
import { toast } from 'react-hot-toast';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
  timeout: 10000,
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
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || 'Something went wrong';

    if (status === 401) {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

// Helper functions
export async function apiGet<T>(url: string, options?: { skipAuth?: boolean }): Promise<T> {
  const res = await api.get<T>(url, {
    headers: options?.skipAuth ? { skipAuth: true } : undefined,
  });
  return res.data;
}

export async function apiPost<T>(
  url: string,
  data?: unknown,
  options?: { skipAuth?: boolean },
): Promise<T> {
  const res = await api.post<T>(url, data, {
    headers: options?.skipAuth ? { skipAuth: true } : undefined,
  });
  return res.data;
}

import { Event } from './eventTypes';

export type ApiResponse<T> = { data: T; message?: string };

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

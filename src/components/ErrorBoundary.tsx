'use client';

import React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '@/types/primitiveTypes';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-8">
          <div className="max-w-lg w-full text-center bg-white rounded-xl shadow p-8 border">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-2">An unexpected error occurred. Please try refreshing the page.</p>
            <details
              className="text-sm text-red-600 whitespace-pre-wrap"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {this.state.error?.message}
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

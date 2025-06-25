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
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-primary p-8">
          <div className="card max-w-lg w-full text-center">
            <h1 className="heading-xl mb-4">Something went wrong</h1>
            <p className="mb-2">An unexpected error occurred. Please try refreshing the page.</p>
            <details
              className="text-sm text-error whitespace-pre-wrap"
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

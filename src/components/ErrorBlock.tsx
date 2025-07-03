'use client';

interface ErrorBlockProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorBlock({
  title = 'Something went wrong',
  message = 'Please try again later',
  onRetry,
}: ErrorBlockProps) {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-semibold text-red-500 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

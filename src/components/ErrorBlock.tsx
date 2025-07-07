'use client';

interface ErrorBlockProps {
  title?: string;
  message?: string;
}

export function ErrorBlock({
  title = 'Something went wrong',
  message = 'Please try again later',
}: ErrorBlockProps) {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-semibold text-red-500 mb-2">{title}</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

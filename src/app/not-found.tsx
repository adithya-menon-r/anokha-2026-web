import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-8">
      <div className="max-w-lg w-full text-center mx-auto bg-white rounded-xl shadow p-8 border">
        <h1 className="text-3xl font-bold mb-4">404 — Page Not Found</h1>
        <p className="mb-2">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}

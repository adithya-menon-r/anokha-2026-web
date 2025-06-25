import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-primary p-8">
      <div className="card max-w-lg w-full text-center">
        <h1 className="heading-xl mb-4">404 — Page Not Found</h1>
        <p className="mb-2">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="btn-primary mt-4 inline-block">
          Go Home
        </Link>
      </div>
    </div>
  );
}

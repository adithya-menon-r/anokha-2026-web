import '@/styles/globals.css';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import AuthInit from '@/app/AuthInit';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Footer from '@/components/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import QueryProvider from './QueryProvider';

export const metadata = {
  title: 'Anokha 2025',
  description: 'Tech Fair of Amrita Vishwa Vidyapeetham, Coimbatore',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-x-hidden mt-20">
        <Toaster position="bottom-center" />
        <ErrorBoundary>
          <QueryProvider>
            <AuthInit />
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <main className="flex-grow">{children}</main>
            <Footer />
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
